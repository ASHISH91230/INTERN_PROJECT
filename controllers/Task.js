const Task = require("../models/Task");//challenge,tags also kya task ke jagah task hoga ya challenegs

const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
// Function to create a new task


//createchallenge
exports.createTask = async (req, res) => {
	try {
		// Get user ID from request object
		const userId = req.user.id;

		// Get all required fields from request body
		let {
			TaskName,//challenge name
			TaskDescription,//chalenge description optional
			whatYouWillLearn,//can be used when predefined
			
			tag: _tag,
			category,
			
			
		} = req.body;

		// Get thumbnail image from request files
		// const thumbnail = req.files.thumbnailImage;

		// Check if any of the required fields are missing
		if (
			!TaskName ||
			!TaskDescription ||
			!whatYouWillLearn ||
			
			!_tag ||
			
			 !category
		) {
			return res.status(400).json({
				success: false,
				message: "All Fields are Mandatory",
			});
		}
					// if (!status || status === undefined) {
					// 	status = "Draft";
					// }
		//Check if the user is an instructor
				const userDetails = await User.findById(userId, {
					accountType: "Student",
				});

				if (!userDetails) {
					return res.status(404).json({
						success: false,
						message: "Student Details Not Found",
					});
				}

		// Check if the tag given is valid
		const categoryDetails = await Category.findById(category);
		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category Details Not Found",
			});
		}
		// Upload the Thumbnail to Cloudinary
		// const thumbnailImage = await uploadImageToCloudinary(
		// 	thumbnail,
		// 	process.env.FOLDER_NAME
		// );
		// console.log(thumbnailImage);
		// Create a new task with the given details
		const newtask = await Task.create({
			TaskName,
			TaskDescription,
			// instructor: userDetails._id,
			whatYouWillLearn: whatYouWillLearn,
	
			tag: _tag,
			category: categoryDetails._id,
			// thumbnail: thumbnailImage.secure_url,
			
			// instructions: instructions,
		});

		// Add the new task to the User Schema of the Instructor
		await User.findByIdAndUpdate(
			{
				_id: userDetails._id,
			},
			{
				$push: {
					taskes: newtask._id,
				},
			},
			{ new: true }
		);
		// Add the new task to the Categories
		await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					task: newtask._id,
				},
			},
			{ new: true }
		);
		// Return the new task and a success message
		res.status(200).json({
			success: true,
			data: newtask,
			message: "task Created Successfully",
		});
	} catch (error) {
		// Handle any errors that occur during the creation of the task
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create task",
			error: error.message,
		});
	}
};

exports.getAlltasks = async (req, res) => {
	try {
		const alltasks = await Task.find(
			{},
			{
				taskName: true,
				instructor: true,
				ratingAndReviews: true,
				studentsEnroled: true,
			}
		)
			.populate("instructor")
			.exec();
		return res.status(200).json({
			success: true,
			data: alltasks,
		});
	} catch (error) {
		console.log(error);
		return res.status(404).json({
			success: false,
			message: `Can't Fetch task Data`,
			error: error.message,
		});
	}
};

//gettaskDetails
exports.gettaskDetails = async (req, res) => {
    try {
            //get id
            const {taskId} = req.body;
            //find task details
            const taskDetails = await Task.findOne(
                                        {_id:taskId})
                                        .populate(
                                            {
                                                path:"instructor",
                                                populate:{
                                                    path:"additionalDetails",
                                                },
                                            }
                                        )
                                        .populate("category")
                                        // .populate("ratingAndreviews")
                                        .populate({
                                            path:"TaskContent",
                                            populate:{
                                                path:"subSection",
                                            },
                                        })
                                        .exec();

                //validation
                if(!taskDetails) {
                    return res.status(400).json({
                        success:false,
                        message:`Could not find the task with ${taskId}`,
                    });
                }
                //return response
				console.log(taskDetails);
                return res.status(200).json({
                    success:true,
                    message:"task Details fetched successfully",
                    data:taskDetails,
                })

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}



// exports.getTaskDetails = async (req, res) => {
// 	try {
// 	  const { taskId } = req.body
// 	  const taskDetails = await Task.findOne({
// 		_id: taskId,
// 	  })
// 		.populate({
// 		  path: "instructor",
// 		  populate: {
// 			path: "additionalDetails",
// 		  },
// 		})
// 		.populate("category")
// 		.populate("ratingAndReviews")
// 		.populate({
// 		  path: "taskContent",
// 		  populate: {
// 			path: "subSection",
// 			select: "-videoUrl",
// 		  },
// 		})
// 		.exec()
  
// 	  if (!courseDetails) {
// 		return res.status(400).json({
// 		  success: false,
// 		  message: Could not find course with id: ${courseId},
// 		})
// 	  }