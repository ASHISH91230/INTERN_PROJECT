const Section = require("../models/Section");
const Challenges = require("../models/Challenges");
const Task = require("../models/Task")
// CREATE a new section
exports.createSection = async (req, res) => {
	try {
		// Extract the required properties from the request body
		const { sectionName, TaskId } = req.body;

		// Validate the input
		if (!sectionName || !TaskId) {
		 	return res.status(400).json({
				success: false,
				message: "Missing required properties",
			});
		}

		// Create a new section with the given name
		const newSection = await Section.create({ sectionName });

		// Add the new section to the task's content array
		const updatedTask = await Task.findByIdAndUpdate(
			TaskId,
			{
				$push: {
					TaskContent: newSection._id,
				},
			},
			{ new: true }
		)
		//populate ke karan course mein section or subsection ka data store ya diskha sakte haii
			.populate({
				path: "TaskContent",
				populate: {
					path: "subSection",
				},
			})
			.exec();

		// Return the updated course object in the response
		res.status(200).json({
			success: true,
			message: "Section created successfully",
			updatedTask,
		});
	} catch (error) {
		// Handle errors
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
};

// UPDATE a section
exports.updateSection = async (req, res) => {
	try {
		const { sectionName, sectionId } = req.body;
		const section = await Section.findByIdAndUpdate(
			sectionId,
			{ sectionName },
			{ new: true }
		);
		res.status(200).json({
			success: true,
			message: section,
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};

// DELETE a section
exports.deleteSection = async (req, res) => {
	try {
		const { sectionId } = req.params;
		await Section.findByIdAndDelete(sectionId);
		res.status(200).json({
			success: true,
			message: "Section deleted",
		});
	} catch (error) {
		console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};