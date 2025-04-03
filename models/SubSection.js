const mongoose = require("mongoose");

const SubSectionSchema = new mongoose.Schema({
	title: { type: String },

	//time to kaam nhi hai to comment kre ya nhi
	timeDuration: { type: String },
	description: { type: String },
	// videoUrl: { type: String },
	whattodo:{type : [String]},  // array of strings for multiple lines in description
});

module.exports = mongoose.model("SubSection", SubSectionSchema);