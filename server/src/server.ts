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
        const { groupName, groupCode } = req.body as {groupName: string, groupCode : string}

        console.log("Received groupname: ", groupName )
        console.log("Recived groupCode: ", groupCode)
    } catch (error) {
        console.error("Error adding group data: ", error);
    }
})


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});