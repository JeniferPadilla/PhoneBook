import contact from "../models/contact.js";
import phoneBook from "../models/phoneBook.js";

const existContact = async (req, res, next) => {
  if (!req.body.name)
    return res.status(400).send({ message: "Incomplete data" });

  const existingName = await contact.findOne({ name: req.body.name });
  if (existingName)
    return res
      .status(400)
      .send({ message: "The contact is already registered" });

  next();
};

const existingPhoneBook = async (req, res, next) => {
  const phoneBookId = await phoneBook.findOne({ name: "phoneBookSiesa" });

  if (!phoneBookId)
    return res
      .status(500)
      .send({ message: "You have not initialized the directory" });

  next();
};

const existContactUp = async (req, res, next) => {
  if (!req.body.name)
    return res.status(400).send({ message: "Incomplete data" });

  const existingName = await contact.findOne({ name: req.body.name });
  if (existingName && req.body._id != existingName._id)
    return res
      .status(400)
      .send({ message: "The contact is already registered" });

  next();
};

export default { existContact, existingPhoneBook, existContactUp };
