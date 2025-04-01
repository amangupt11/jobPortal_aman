import express from "express";
import { getAdminJobs, getAllJobs, getJobById, postJob, updateJob } from "../controllers/job.controller.js";
import isAuthenticated from "../midddlewares/isAuthenticated.js";

const router = express.Router();

router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(isAuthenticated,getAllJobs);
router.route("/get/:id").get(isAuthenticated,getJobById);
router.route("/getadminjobs").get(isAuthenticated,getAdminJobs);
router.route("/update/:id").put(isAuthenticated,updateJob);

export default router;