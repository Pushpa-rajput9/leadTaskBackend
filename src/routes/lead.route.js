import express from "express";
import {
  addLead,
  deleteLead,
  getAllLeads,
  getLeadById,
  getLeadByName,
  updateLead,
} from "../controllers/lead.controller.js";

const router = express.Router();

router.get("/get", getAllLeads);
router.get("/:id", getLeadById);
router.get("/name/:name", getLeadByName);
router.post("/add", addLead);
router.put("/update/:id", updateLead);
router.delete("/delete/:id", deleteLead);
export default router;
