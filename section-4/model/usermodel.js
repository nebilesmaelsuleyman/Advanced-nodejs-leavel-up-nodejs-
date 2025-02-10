const mongoose =require('mongoose')

const userSchema = mongoose.Schema(
    {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
    },
    },
    {
    timestamps: true,
    }
);
userSchema.statics.isEmailTaken= async function(email){
    const user= await this.findOne({email})
    // return true if user found
    return !!user
}
const User= mongoose.model('USer',userSchema)
module.exports= User;