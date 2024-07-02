import Email from '../models/email.model.js';
import User from '../models/user.model.js';

// Create a new email
export const createEmail = async (req, res) => {
    try {
        const userId = req.id;
        const { to, subject, message } = req.body;

        if (!to || !subject || !message) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        // Find the recipient user by email
        const recipient = await User.findOne({ email: to });
        if (!recipient) {
            return res.status(404).json({ message: "Recipient not found", success: false });
        }

        // Create the email with the recipient's _id
        const email = await Email.create({
            to: recipient._id,
            subject,
            message,
            userId
        });

        return res.status(200).json({ email, message: "Email sent successfully", success: true });
    } catch (error) {
        console.error("Error in createEmail controller:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

// Soft delete an email (move to bin)
export const softDeleteEmail = async (req, res) => {
    try {
        const emailId = req.params.id;
        const userId = req.id; // Assuming this is set by your authentication middleware

        if (!emailId) {
            return res.status(400).json({ message: "Email ID is required", success: false });
        }

        const email = await Email.findById(emailId);

        if (!email) {
            return res.status(404).json({ message: "Email not found", success: false });
        }

        // Check if the email has already been soft deleted by this user
        if (!email.deletedBy.includes(userId)) {
            email.deletedBy.push(userId);
            await email.save();
        }

        return res.status(200).json({ message: "Email moved to bin successfully", success: true });
    } catch (error) {
        console.error("Error in softDeleteEmail controller:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};


// Permanently delete an email
export const permanentlyDeleteEmail = async (req, res) => {
    try {
        const emailId = req.params.id;
        const userId = req.id;

        if (!emailId) {
            return res.status(400).json({ message: "Email ID is required", success: false });
        }

        const email = await Email.findById(emailId);

        if (!email) {
            return res.status(404).json({ message: "Email not found", success: false });
        }

        if (!email.permanentlyDeletedBy.includes(userId)) {
            email.permanentlyDeletedBy.push(userId);
            await email.save();
        }

        return res.status(200).json({ message: "Email permanently deleted successfully", success: true });
    } catch (error) {
        console.error("Error in permanentlyDeleteEmail controller:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

// Get all sent emails by the user
export const getAllEmailById = async (req, res) => {
    try {
        const userId = req.id;
        const emails = await Email.find({ userId, deletedBy: { $ne: userId }, permanentlyDeletedBy: { $ne: userId } })
        .populate('userId', 'email')
        .populate('to', 'email');

            const emailsWithSender = emails.map(email => ({
                _id: email._id,
                to: email.to.email,
                subject: email.subject,
                message: email.message,
                senderId: email.userId._id,
                senderEmail: email.userId.email,
                createdAt: email.createdAt,
                updatedAt: email.updatedAt
            }));

        return res.status(200).json({ emails: emailsWithSender });
    } catch (error) {
        console.error("Error in getAllEmailById controller:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

// Get all received emails for the user
export const getReceivedEmails = async (req, res) => {
    try {
        const userId = req.id;
        const emails = await Email.find({ to: userId, deletedBy: { $ne: userId }, permanentlyDeletedBy: { $ne: userId } })
        .populate('userId', 'email')
        .populate('to', 'email');

            const emailsWithSender = emails.map(email => ({
                _id: email._id,
                to: email.to.email,
                subject: email.subject,
                message: email.message,
                senderId: email.userId._id,
                senderEmail: email.userId.email,
                createdAt: email.createdAt,
                updatedAt: email.updatedAt
            }));

        return res.status(200).json({ emails: emailsWithSender });
    } catch (error) {
        console.error("Error in getReceivedEmails controller:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const recoverEmail = async (req, res) => {
    try {
        const emailId = req.params.id;
        const userId = req.id; // Assuming this is set by your authentication middleware

        if (!emailId) {
            return res.status(400).json({ message: "Email ID is required", success: false });
        }

        const email = await Email.findById(emailId);

        if (!email) {
            return res.status(404).json({ message: "Email not found", success: false });
        }

        // Check if the email has been soft deleted by this user
        if (email.deletedBy.includes(userId)) {
            email.deletedBy = email.deletedBy.filter(id => id.toString() !== userId);
            await email.save();
        }

        return res.status(200).json({ message: "Email recovered successfully", success: true });
    } catch (error) {
        console.error("Error in recoverEmail controller:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const markAsViewed = async (req, res) => {
    try {
      const emailId = req.params.id;
      const email = await Email.findById(emailId);
  
      if (!email) {
        return res.status(404).json({ message: "Email not found", success: false });
      }
  
      email.viewed = true;
      await email.save();
  
      return res.status(200).json({ message: "Email marked as viewed", success: true });
    } catch (error) {
      console.error("Error marking email as viewed", error);
      return res.status(500).json({ message: "Internal Server Error", success: false });
    }
  };


// Get emails in bin
export const getEmailsInBin = async (req, res) => {
    try {
        const userId = req.id;
        const emails = await Email.find({ deletedBy: userId, permanentlyDeletedBy: { $ne: userId } })
        .populate('userId', 'email')
        .populate('to', 'email');

            const emailsWithSender = emails.map(email => ({
                _id: email._id,
                to: email.to.email,
                subject: email.subject,
                message: email.message,
                senderId: email.userId._id,
                senderEmail: email.userId.email,
                createdAt: email.createdAt,
                updatedAt: email.updatedAt,
                
            }));

        return res.status(200).json({ emails: emailsWithSender });
    } catch (error) {
        console.error("Error in getEmailsInBin controller:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};








// Get all mails (sent and received) excluding deleted mails
export const getAllMails = async (req, res) => {
    try {
        const userId = req.id;

        const emails = await Email.find({
            $or: [{ userId }, { to: userId }],
            deletedBy: { $ne: userId },
            permanentlyDeletedBy: { $ne: userId }
        })
        .populate('userId', 'email')
        .populate('to', 'email');

        const emailsWithSender = emails.map(email => ({
            _id: email._id,
            to: email.to.email,
            subject: email.subject,
            message: email.message,
            senderId: email.userId._id,
            senderEmail: email.userId.email,
            createdAt: email.createdAt,
            updatedAt: email.updatedAt
        }));

        return res.status(200).json({ emails: emailsWithSender });
    } catch (error) {
        console.error("Error in getAllMails controller:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

export const getEmailById = async (req, res) => {
    try {
      const emailId = req.params.id;
      const userId = req.id; // Assuming this is set by your authentication middleware
  
      const email = await Email.findById(emailId)
        .populate('userId', 'email fullName')
        .populate('to', 'email fullName');
  
      if (!email) {
        return res.status(404).json({ message: "Email not found", success: false });
      }
  
      // Check if the user is either the sender or the recipient
      if (email.userId._id.toString() !== userId && email.to._id.toString() !== userId) {
        return res.status(403).json({ message: "You are not authorized to view this email", success: false });
      }
  
      const emailWithSender = {
        _id: email._id,
        to: {
          email: email.to.email,
          fullName: email.to.fullName,
        },
        subject: email.subject,
        message: email.message,
        senderId: email.userId._id,
        senderEmail: email.userId.email,
        senderName: email.userId.fullName,
        createdAt: email.createdAt,
        updatedAt: email.updatedAt
      };
  
      console.log(email);
      return res.status(200).json({ email: emailWithSender });
    } catch (error) {
      console.error("Error in getEmailById controller:", error);
      return res.status(500).json({ message: "Internal Server Error", success: false });
    }
  };
  