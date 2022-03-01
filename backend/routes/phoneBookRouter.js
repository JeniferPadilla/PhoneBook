import express from "express";
import phoneBook from "../controllers/phoneBook.js";
import phoneBookMidd from "../middleware/phoneBook.js";

const router = express.Router();

router.get(
  "/initPhoneBook",
  phoneBookMidd.existingPhoneBook,
  phoneBook.registerPhoneBook
);

router.get(
  "/directorioLleno",
  phoneBookMidd.checkPhoneBook,
  phoneBook.directoryFull
);
router.get(
  "/espaciosLibres",
  phoneBookMidd.checkPhoneBook,
  phoneBook.freespaces
);
export default router;
