const mongoose = require("mongoose");

// Define the Courses schema
const TaskSchema = new mongoose.Schema({
	TaskName: { type: String },
	TaskDescription: { type: String },
	instructor: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "User",
	},
	// whatYouWillLearn: {
	// 	type: String,
	// },
	TaskContent: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Section",
		},
	],
	ratingAndReviews: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "RatingAndReview",
		},
	],
	// price: {
	// 	type: Number,
	// },
	// thumbnail: {
	// 	type: String,
	// },
	tag: {
		type: [String],
		required: true,
	},
	category: {
		type: mongoose.Schema.Types.ObjectId,
		// required: true,
		ref: "Category",
	},
	studentsEnrolled: [
		{
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "user",
		},
	],
	// instructions: {
	// 	type: [String],
	// },
	// status: {
	// 	type: String,
	// 	enum: ["Draft", "Published"],
	// },
});

// Export the Courses model
module.exports = mongoose.model("Task", TaskSchema);