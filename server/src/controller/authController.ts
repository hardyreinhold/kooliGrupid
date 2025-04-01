import { Request, Response } from "express";
import { db } from "../service/firebase";

export const googleLogin = async (req: Request, res: Response) => {
  try {
    const { token, user } = req.body;
    req.session.token = token;

    console.log("Received token:", token);
    console.log("Received user:", user);

    await db.collection("userdata").add({
      username: user.displayName,
      email: user.email,
    });

    res.json({
      message: "User authenticated successfully",
      redirectUrl: "/opetaja/dashboard",
    });
  } catch (error) {
    console.error("Error adding user data:", error);

    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to save user data" });
    }
  }
};
