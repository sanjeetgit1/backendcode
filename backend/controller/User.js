import { User } from "../models/Users.js";
import jwt from "jsonwebtoken";
import { sendMail } from "../middlewares/sendMail.js";
import cloudinary from "cloudinary";

//login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 600000),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged In Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//Logout
export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Logged out Successfully",
      });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne().select("-password -email");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const userMessage = `Hii, I am ${name} , my email is ${email}and my Message is ${message}, `;
    await sendMail(userMessage);

    return res.status(200).json({
      success: true,
      message: "message send successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { name, email, password, skills, about } = req.body;
    if (name) {
      user.name = name;
    }
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }

    if (skills) {
      //image1
      if (skills.image1) {
        await cloudinary.v2.uploader.destroy(user.skills.image1.public_id);
       
        const myCloud = await cloudinary.v2.uploader.upload(skills.image1, {
          folder: "backendcode",
        });
        user.skills.image1 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      //image2
      if (skills.image2) {
        await cloudinary.v2.uploader.destroy(user.skills.image2.public_id);
      
        const myCloud = await cloudinary.v2.uploader.upload(skills.image2, {
          folder: "backendcode",
        });
        user.skills.image2 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      // image 3

      if (skills.image3) {
        await cloudinary.v2.uploader.destroy(user.skills.image3.public_id);
       
        const myCloud = await cloudinary.v2.uploader.upload(skills.image3, {
          folder: "backendcode",
        });
        user.skills.image3 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      // image 4
      if (skills.image4) {
        await cloudinary.v2.uploader.destroy(user.skills.image4.public_id);
       
        const myCloud = await cloudinary.v2.uploader.upload(skills.image4, {
          folder: "backendcode",
        });
        user.skills.image4 = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      // image 5
          
          if (skills.image5) {
            await cloudinary.v2.uploader.destroy(user.skills.image4.public_id);
           
            const myCloud = await cloudinary.v2.uploader.upload(skills.image5, {
              folder: "backendcode",
            });
            user.skills.image5 = {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            };
          }

      // image 6
                      if (skills.image6) {
            await cloudinary.v2.uploader.destroy(user.skills.image4.public_id);
           
            const myCloud = await cloudinary.v2.uploader.upload(skills.image6, {
              folder: "backendcode",
            });
            user.skills.image6 = {
              public_id: myCloud.public_id,
              url: myCloud.secure_url,
            };
          }
    }

    if (about) {
      // name:String,
      // tittle:String,
      // subtitle:String,
      // description:String,
      // quote:String,
      // avatar:{
      //     public_id:String,
      //     url:String,
      // },

      if (about.name) {
        user.about.name = about.name;
      }
      if (about.title) {
        user.about.title = about.title;
      }
      if (about.subtitle) {
        user.about.subtitle = about.subtitle;
      }

      if (about.description) {
        user.about.description = about.description;
      }
      if (about.quote) {
        user.about.quote = about.quote;
      }
      if (about.avatar) {
        await cloudinary.v2.uploader.destroy(user.about.avatar.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(about.avatar, {
          folder: "portfolio",
        });

        user.about.avatar = {
          public_id: myCloud.public_id,
        url: myCloud.secure_url,
        };
      }
    };

    await user.save();

    res.status(200).json({
      success: true,
      message: "User  updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//addTimeline

export const addTimeline = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    const user = await User.findById(req.user._id);

    user.timeline.unshift({
      title,
      description,
      date,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added to timeline",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// addyoutube

export const addyoutube = async (req, res) => {
  try {
    const { url, title, image } = req.body;
    const user = await User.findById(req.user._id);

    const myCloud = await cloudinary.uploader.upload(image, {
      folder: "portfolio",
    });

    user.youtube.unshift({
      url,
      title,
       image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added to youtube",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// addproject

export const addProject = async (req, res) => {
  try {
    const { url, tittle, image, description, techstack } = req.body;
    const user = await User.findById(req.user._id);

    const myCloud = await cloudinary.uploader.upload(image, {
      folder: "portfolio",
    });

    user.projects.unshift({
      url,
      tittle,
      description,
      techstack,
      image: {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      },
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Added to addproject",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// deleteTimeline

export const deleteTimeline = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);

    user.timeline = user.timeline.filter((item)=> item._id !=id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Delete  from timeline",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// deleteyoutube

export const deleteyoutube = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
const video =user.youtube.find((video)=> video._id == id);
await cloudinary.v2.uploader.destroy(video.image.public_id);
  

    user.youtube = user.youtube.filter((video)=> video._id !=id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Delete  from youtube",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// deleteProject
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
const project =user.projects.find((item)=> item._id ==id);
await cloudinary.v2.uploader.destroy(project.image.public_id);
  

    user.projects = user.projects.filter((item)=> item._id !=id);

    await user.save();

    res.status(200).json({
      success: true,
      message: "Delete  from Project",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

