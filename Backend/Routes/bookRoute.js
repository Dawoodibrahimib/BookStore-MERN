const express = require("express");
const Router = express.Router();
const Book = require("../models/bookmodel");

// Search all books
Router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});
        
        res.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Find book by ID
Router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(200).json({ book });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// Add a book to the database
Router.post("/", async (req, res) => {
    try {
        // Check for required fields
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: "Send all the required fields: Title, Author, publishYear"
            });
        }

        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        });

        await newBook.save(); // Save the book to the database

        res.status(201).send({ message: "Book created successfully!" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Update book by ID
Router.put("/:id", async (req, res) => {
    try {
        // Check for required fields
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: "Send all required fields: Title, Author, publishYear"
            });
        }

        const { id } = req.params;

        // Attempt to update the book
        const updatedBook = await Book.findByIdAndUpdate(id, req.body);

        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).send({ message: "Book updated successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Delete book by ID
Router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).send({ message: "Book deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = Router;
