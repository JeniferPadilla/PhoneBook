import phoneBook from "../models/phoneBook.js";
import nContact from "../services/phoneBook.js";

const registerPhoneBook = async (req, res) => {

  const schemaPhoneBook = new phoneBook({
    name: "phoneBookSiesa",
  });

  const result = await schemaPhoneBook.save();

  return !result
    ? res.status(500).send({ message: "Error - Please restart" })
    : res.status(200).send({ message: "Welcome" });
};

const directoryFull = async (req, res) => {
  const count = await nContact.countContacts(req.body.phoneBook);
  return count
    ? res.status(200).send({ message: "The directory is full" })
    : res.status(200).send({ message: "The directory is not full" });
};

const freespaces = async (req, res) => {
  const count = await nContact.contactNumero(req.body.phoneBook);
  return res.status(200).send({
    message: "The directory has " + (10 - count) + " spaces available",
  });
};



export default { registerPhoneBook, directoryFull, freespaces };
