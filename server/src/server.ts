import express from "express";
import cors from "cors";
import session from "express-session";
import authRoutes from "./routes/authRoutes";
import groupRoutes from "./routes/groupRoutes";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

// Register routes
app.use("/", authRoutes);
app.use("/", groupRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

