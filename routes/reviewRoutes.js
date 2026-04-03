import express from "express";
import Review from "../models/reviewModel.js";

const router = express.Router();


// Get Reviews
router.get("/", async (req, res) => {
const reviews = await Review.find().sort({ createdAt: -1 });
res.json(reviews);
});


// Add Review
router.post("/", async (req, res) => {
const review = new Review(req.body);
await review.save();
res.json(review);
});

export default router;