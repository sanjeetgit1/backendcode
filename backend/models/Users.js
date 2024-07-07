import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        required:[true, "please Enter Email"],

    },
    password:{
        type:String,
        required:[true,"please Enter Password"],
        select:false,
    },

    timeline:[
        {
            title:String,
            description:String,
            date:Date,
        }
    ], 
    skills:{
        image1:{
            public_id:String,
            url:String,

        },
        image2:{
            public_id:String,
            url:String,

        },
        image3:{
            public_id:String,
            url:String,

        },
        image4:{
            public_id:String,
            url:String,

        },
        image5:{
            public_id:String,
            url:String,

        },
        image6:{
            public_id:String,
            url:String,

        },

    },
    youtube:[
        {
            url:String,
            tittle:String,
            image:{
                public_id:String,
                url:String,
            },

        },
    ],

    projects:[
        {
            url:String,
            tittle:String,
            image:{
                public_id:String,
                url:String,

            },
            description:String,
            techStack:String,
        },
    ],
    about:{
        name:String,
        tittle:String,
        subtitle:String,
        description:String,
        quote:String,
        avatar: {
            public_id: String,
            url: String,
          },
    },

});
export const User = mongoose.model("User",userSchema);