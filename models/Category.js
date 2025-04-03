const mongoose = require("mongoose");

// Define the Tags schema
const categorySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: { type: String },
	// check wheter its task or challneges??
	Taskes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Task",
		},
	],
});

// Export the Tags model
module.exports = mongoose.model("Category", categorySchema);