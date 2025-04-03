const Tag= require("../models/tags");

//create tag handeler funtion
exports.createTag= async(req,res)=>{
    try{
        //fetch data
        const {name,description}=req.body;
        //validation
        if(!name || !description){
            return  res.status(400).json({success:false,
                msg:"Please enter all fields"});
        }
        //create entry in db
        const tagDetails= await Tag.create({
            name:name,
            description:description,
        });
        console.log(tagDetails);
        
        //send response to client side
       return res.status(201).json({
            success:true,
            data:tagDetails
        })
    }
    catch(error){
        return  res.status(500).json({success:false,message:error.message,})
    }
}


//get all tags

exports.showAlltags=async(req,res)=>{
    try{
        const allTags=await Tag.find({},{name:true,description:true});
        return res.status(201).json({
            success:true,
            message:"all tags return succesfully",
            allTags,
        });
    }
    catch(error){
        return  res.status(500).json({success:false,message:error.message,})

    }
}