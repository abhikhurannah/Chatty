import User from "../models/user.model.js"
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersForSidebar= async(req,res)=>{
   try {
      const loggedInUserId = req.user._id;
      const filteredUsers = await User.find({_id: {$ne: loggedInUserId}}).select("-password")
      res.status(200).json(filteredUsers);
   } catch (error) {
     console.log("error in getUsersForSidebar", error.message);
      res.status(500).json({message: "server error"}); 
    
   }
}

export const getMessages = async (req,res) => {
    try {
      const {id:userToChatId} = req.params;
      const myId = req.user._id;

      const messages = await Message.find({
        $or: [{ sender: myId, recipient: userToChatId },
             { sender: userToChatId, recipient: myId }],
      })
      res.status(200).json(messages);


    } catch (error) {
      console.log("error in getMessages", error.message);
      res.status(500).json({ message: "server error" });
    }
  }

export const sendMessage = async (req,res) =>{
    try {
        const {text,image} =req.body;
        const {id:recieverId} = req.params;
        const senderId = req.user._id;
        


        let ImageUrl;
        if(image){
            const uploadresponse = await cloudinary.uploader.upload(image)
            ImageUrl = uploadresponse.secure_url;
        }

        const newMessage = new Message({
            senderId: senderId,
            recieverId: recieverId,
            text: text,
            image: ImageUrl,
        })
        await newMessage.save();

        //realtime functionality here using socket.io

        res.status(201).json(newMessage);


    } catch (error) {
        console.log("error in sendMessage controller", error.message);
        res.status(500).json({ message: "server error" });
        
    }
}
