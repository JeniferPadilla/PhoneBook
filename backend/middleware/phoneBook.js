import phoneBook from "../models/phoneBook.js";

const existingPhoneBook = async (req,res,next)=>{

    const existingName = await phoneBook.findOne({name: "phoneBookSiesa"});
    if (existingName) return res.status(200).send({ message: "Welcome" });
    next();
};

const checkPhoneBook = async (req,res,next)=>{

    const phoneBookId = await phoneBook.findOne({name: "phoneBookSiesa"});
    if (!phoneBookId) return res.status(400).send({ message: "You have not initialized the directory" });

    req.body.phoneBook = phoneBookId._id;
    next();
};

export default {existingPhoneBook, checkPhoneBook};