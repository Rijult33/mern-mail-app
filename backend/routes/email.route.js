import express from "express";
import {
  createEmail,
  softDeleteEmail,
  permanentlyDeleteEmail,
  getAllEmailById,
  getReceivedEmails,
  recoverEmail,
  getEmailsInBin,
  getAllMails,
  markAsViewed,
  getEmailById // Import the new controller function
} from "../controllers/email.controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createEmail);
router.route("/soft-delete/:id").put(isAuthenticated, softDeleteEmail);
router.route("/permanent-delete/:id").delete(isAuthenticated, permanentlyDeleteEmail);
router.route("/get-all-sent-emails").get(isAuthenticated, getAllEmailById);
router.route("/get-received-emails").get(isAuthenticated, getReceivedEmails);
router.route("/get-emails-in-bin").get(isAuthenticated, getEmailsInBin);
router.route("/get-all-mails").get(isAuthenticated, getAllMails);
router.route("/recover/:id").put(isAuthenticated, recoverEmail);
router.route("/mark-as-viewed/:id").put(isAuthenticated, markAsViewed);
router.route("/:id").get(isAuthenticated, getEmailById); // New route for getting email by ID

export default router;