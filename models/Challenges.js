// Import the Mongoose library
const mongoose = require("mongoose");

// Define the user schema using the Mongoose Schema constructor
const ChallengeSchema = new mongoose.Schema(
	{
        name: { type: String, required: true },
        description: {type: String},
        customTask:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Task",
        },
        studentsEnrolled: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: "user",
            },
        ],
    }

);

// Export the Mongoose model for the user schema, using the name "user"
module.exports = mongoose.model("Challenges", ChallengeSchema);