const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    projects: [
        {
            projectId: {
                type: Schema.Types.ObjectId,
                ref: 'Project'
            },
            role: {
                type: String, enum: ['creator', 'member'],
                required: true
            }
        }
    ]
},
    { timestamps: true });


// Pre-save hook to hash the password before saving the user
userSchema.pre('save', async function (next) {
    const user = this;

    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    } catch (err) {
        next(err);
    }
});

// Method to compare a given password with the database hash
userSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
};


const User = mongoose.model('User', userSchema);

module.exports = User;