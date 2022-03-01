import contact from "../models/contact.js";

const contactNumero = async (idPhoneBook) => {
  const contacts = await contact.find({ phoneBook: idPhoneBook });
  let quantityContacts = contacts.length;
  return quantityContacts;
};

const countContacts = async (idPhoneBook) => {
  let message = false;
  let numberOfRecords = 10;
  const quantity = await contactNumero(idPhoneBook);
  return quantity == numberOfRecords ? (message = true) : message;
};

export default { contactNumero, countContacts };
