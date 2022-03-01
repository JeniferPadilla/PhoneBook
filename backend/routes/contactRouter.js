import express from "express";
import contactController from "../controllers/contact.js";
import contactMidd from "../middleware/contact.js";
import phoneBookMidd from "../middleware/phoneBook.js";

const router = express.Router();

router.post(
  "/registerContact",
  contactMidd.existContact,
  phoneBookMidd.checkPhoneBook,
  contactController.registerContact
);
router.get(
  "/listContact",
  phoneBookMidd.checkPhoneBook,
  contactController.listContacts
);
router.get(
  "/searchContact/:name",
  contactMidd.existingPhoneBook,
  contactController.searchContact
);
router.get(
  "/existContact/:name",
  contactMidd.existingPhoneBook,
  contactController.existContact
);
router.delete(
  "/delete/:name",
  contactMidd.existingPhoneBook,
  contactController.deleteContact
);

router.get(
  "/searchContactUp/:name",
  contactMidd.existingPhoneBook,
  contactController.searchContact
);
router.put(
  "/updateContact",
  contactMidd.existContactUp,
  contactController.updateContact
  );

export default router;
