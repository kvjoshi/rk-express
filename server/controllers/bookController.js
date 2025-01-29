import expressAsyncHandler from "express-async-handler";
import  Book  from "../models/bookModel.js";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";


// _req is suggested when we are not refrenceing the request object
// req can be used but eslint will give a warning
// expressAsyncHandler is used to handle async errors


export const createBook = expressAsyncHandler(async (req, res) => {
    const {book_name, info } = req.body;
    const user = req.user;
    const added_by = new ObjectId(user._id);
    try{
        const book = new Book({book_name,info,added_by});
        const createdBook = await book.save();
        res.status(201).json(createdBook);
    }catch (e) {
        res.status(500).json({ message: e.message });
    }
});

export const booksByUser = expressAsyncHandler(async (req, res) => {
    try {
        const user = req.user;
        console.log("user", user);

        const userId =  new ObjectId(user._id);
        const books = await Book.aggregate([
            { $match: { added_by: userId } }, // FIND
            {
                $lookup: {
                    from: "users",
                    localField: "added_by",
                    foreignField: "_id",
                    as: "userDetails" 
                } // BOOK.ADDED_BY == USER._ID
                // RESPONSE WILL BE ARRY
            },
            { $unwind: "$userDetails" }, // UNWIND TO OBJECT
            {
                $project: {
                    book_name: 1,
                    info: 1,
                    added_by: 1,
                    userDetails: {
                        _id: 1,
                        name: 1,
                        email: 1
                    }
                }
            }
        ]);
        res.json(books);
    } catch (e) {
        res.status(404).json({ message: e.message });
    }
});