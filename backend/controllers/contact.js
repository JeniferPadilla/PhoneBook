import contact from "../models/contact.js";
import nContact from "../services/phoneBook.js";

const registerContact = async (req, res) => {
  const count = await nContact.countContacts(req.body.phoneBook);
  if (count)
    return res.status(400).send({ message: "The directory is full" });

  const schemaContact = new contact({
    name: req.body.name,
    tel: req.body.tel,
    cel: req.body.cel,
    phoneBook: req.body.phoneBook,
  });

  const results = await schemaContact.save();

  return !results
    ? res.status(500).send({ message: "Error to register contact" })
    : res.status(200).send({ results });
};

const listContacts = async (req, res) => {
  const contacts = await contact.find({ phoneBook: req.body.phoneBook });
  if (contacts.length === 0)
    return res.status(400).send({ message: "No search results" });
  return res.status(200).send({ contacts });
};

const searchContact = async (req, res) => {

  const contacts = await contact
    .findOne({ name: req.params["name"] })
    .populate("phoneBook")
    .exec();
  return !contacts
    ? res.status(400).send({ message: "No search results" })
    : res.status(200).send({ contacts });
};

const deleteContact = async (req, res) => {
  if (!req.params["name"])
    return res.status(400).send({ message: "Incomplete data" });

  const contacts = await contact.findOneAndDelete({
    name: req.params["name"],
  });

  return !contacts
    ? res.status(400).send({ message: "Error deleting contact" })
    : res.status(200).send({ message: "Contact deleted" });
};

const existContact = async (req, res) => {
  const contacts = await contact.findOne({ name: req.params["name"] });
  return !contacts
    ? res.status(200).send({ message: "Contact does not exist" })
    : res.status(200).send({ message: "Contact already exists" });
};

const updateContact = async(req, res)=>{

  const editContact = await contact.findByIdAndUpdate(req.body._id,{
      name: req.body.name,
      tel: req.body.tel,
      cel: req.body.cel,
  });

  if (!editContact)return res.status(500).send({message:"Error editing contact "})
  return res.status(200).send({message:"Contact update"});
};

export default {
  registerContact,
  listContacts,
  searchContact,
  existContact,
  deleteContact,
  updateContact
};
