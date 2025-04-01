import express from "express";
import {
  createGroup,
  getGroups,
  joinGroup,
  removePerson,
  getCourses,
  addCourseToGroup,
} from "../controller/groupController";

const router = express.Router();

router.post("/createGroup", createGroup);
router.get("/getFirestoreObject", getGroups);
router.post("/joinGroup", joinGroup);
router.post("/removePerson", removePerson);
router.get("/getCourses", getCourses);
router.post("/addCourseToGroup", addCourseToGroup);

export default router;
