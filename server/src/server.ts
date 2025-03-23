import express, { Request, Response } from "express";
import cors from "cors";
import { loginWithGoogle } from "./functions/login";

const app = express();
const PORT = 4000;
const admin = require('firebase-admin');
const serviceAccount = require('./service/serviceAccountKey.json');
app.use(cors()); 
app.use(express.json());


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

const db = admin.firestore();


// funktsioon salvestab kasutaja database-i
app.post('/googleLogin', async (req: Request, res: Response) => {
    try {
        const { token, user } = req.body as { token: string; user: any };

        console.log("Received token:", token);
        console.log("Received user:", user);

        //add the logged in user to the database
        await db.collection("userdata").add({ 
            username: user.displayName,
            email: user.email,
        });
        res.json({ message: "User authenticated successfully", redirectUrl: "/opetaja/dashboard" }); 

    } catch (error) {
        console.error("Error adding user data:", error);

        if (!res.headersSent) {
            res.status(500).json({ error: "Failed to save user data" });
        }
    }
});


// post method for recieving group name and code
app.post('/createGroup', async (req: Request, res: Response) => {
    try {
        const { personName, groupCode } = req.body as {personName: string, groupCode : string}

        console.log("Received groupname: ", personName )
        console.log("Recived groupCode: ", groupCode)

        await db.collection("groups").add({ 
            name: personName,
            members:[],
            code:groupCode
        });

    } catch (error) {
        console.error("Error adding group data: ", error);
    }
})

app.get("/getFirestoreObject", async (req: Request, res: Response) => {
    try {
      const docRef = db.collection("groups"); // Reference to the collection
      const docSnap = await docRef.get(); // Get all documents in the collection
  
      if (docSnap.empty) {
        return res.status(404).json({ message: "No groups found" });
      }
  
      // Convert each document to an object
      const groups = docSnap.docs.map((doc) => ({
        id: doc.id, // Firestore document ID
        ...doc.data(), // Merge document data
      })).sort((a: String, b: String) => a.name.localeCompare(b.name));
  
      res.json(groups); // Send the array of groups
    } catch (error) {
      res.status(500).json({ error: "Error fetching documents", details: error });
    }
  });

  app.post("/joinGroup", async (req: Request, res: Response) => {
    const { groupCode, personName } = req.body as { personName?: string; groupCode?: string };
  
    if (!personName || !groupCode) {
      return res.status(400).json({ message: "Missing personName or groupCode" });
    }
  
    const groupsRef = db.collection("groups");
    const groupQuery = await groupsRef.where("code", "==", groupCode).limit(1).get();
  

    if (groupQuery.empty) {
      return res.status(404).json({ message: "Code is wrong" });
    }
  
    const groupDoc = groupQuery.docs[0];
    const groupData = groupDoc.data();
    const members: string[] = Array.isArray(groupData.members) ? groupData.members : [];

    if (members.includes(personName)) {
      return res.status(400).json({ message: "Person is already in the group" });
    }

    await groupDoc.ref.update({
      members: admin.firestore.FieldValue.arrayUnion(personName),
    });
  
    return res.status(200).json({ message: "Joined the group successfully!" });
  });
  


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});