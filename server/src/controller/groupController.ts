import { Request, Response } from "express";
import { db, FieldValue } from "../service/firebase";
import { signOut } from "firebase/auth";

export const createGroup = async (req: Request, res: Response) => {
  try {
    const { groupName, groupCode } = req.body;
    if (!groupName || !groupCode) {
        return res.status(400).json({ message: "Missing member or groupCode" });
      }
    await db.collection("groups").add({
      name: groupName,
      members: [],
      code: groupCode,
      courses: [],
    });
    res.status(200).json({ message: "Group created successfully" });
  } catch (error) {
    console.error("Error adding group data:", error);
    res.status(500).json({ message: "Error adding group data" });
  }
};

export const getGroups = async (_req: Request, res: Response) => {
  try {
    const snapshot = await db.collection("groups").get();

    if (snapshot.empty) {
      return res.status(404).json({ message: "No groups found" });
    }

    const groups = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      .sort((a: any, b: any) => a.name.localeCompare(b.name));

    res.json(groups);
  } catch (error) {
    res.status(500).json({ error: "Error fetching documents", details: error });
  }
};

export const joinGroup = async (req: Request, res: Response) => {
  try {
    const { groupCode, personName } = req.body;
    const groupQuery = await db
      .collection("groups")
      .where("code", "==", groupCode)
      .limit(1)
      .get();

    if (groupQuery.empty) {
      return res.status(404).json({ message: "Code is wrong" });
    }

    const groupDoc = groupQuery.docs[0];
    const members = groupDoc.data().members || [];

    if (members.includes(personName)) {
      return res.status(400).json({ message: "Person is already in the group" });
    }

    await groupDoc.ref.update({
      members: FieldValue.arrayUnion(personName),
    });

    res.status(200).json({ message: "Joined the group successfully!" });
  } catch (error) {
    console.error("Error joining group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removePerson = async (req: Request, res: Response) => {
  try {
    const { groupId, member } = req.body;

    if (!groupId || !member) {
      return res.status(400).json({ message: "Missing groupId or member" });
    }

    const groupRef = db.collection("groups").doc(groupId);
    const doc = await groupRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Group not found" });
    }

    await groupRef.update({
      members: FieldValue.arrayRemove(member),
    });

    res.status(200).json({ message: "Person removed successfully" });
  } catch (error) {
    console.error("Error removing person:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCourses = async (req: Request, res: Response) => {
    try {
      const snapshot = await db.collection("courses").get();
      const courses = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch courses", error });
    }
  };
  

  export const addCourseToGroup = async (req: Request, res: Response) => {
    try {
      const { groupId, courseId } = req.body;
  
      if (!groupId || !courseId) {
        return res.status(400).json({ message: "Missing groupId or courseId" });
      }
  
      const groupRef = db.collection("groups").doc(groupId);
      await groupRef.update({
        courses: FieldValue.arrayUnion(courseId),
      });
  
      res.status(200).json({ message: "Course added to group" });
    } catch (error) {
      res.status(500).json({ message: "Failed to add course", error });
    }
  };