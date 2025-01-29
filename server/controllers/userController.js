import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { userGenerateToken } from "../middlewares/userProtect.js";


export const createUser = expressAsyncHandler(async (req, res) => {
    const {name,userName, email, password , role} = req.body;
    // sending everything in body and in plaintext
    try{
        // saving this as plaintext
        const user = new User({name,userName, email, password , role});

        // now we call save method on the user object , password is automatically hashed and stored.
        const createdUser = await user.save();

        res.status(201).json(createdUser);
        // response will not have password as it is removed in the toJSON method of the user model.

    }catch (e) {
        res.status(500).json({ message: e.message });
    }
});
