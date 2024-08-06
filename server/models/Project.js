const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    project_id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    members: [
        {
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            joinedAt: {
                type: Date,
                default: Date.now
            },
            role: {
                type: String,
                enum: ['creator', 'member'],
                required: true
            },
            username: {
                type: String
            }
        }
    ],
    tasks: [
        {
            description: {
                type: String,
                required: true
            },
            assignedTo: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            assignedUsername: {
                type: String
            },
            status: {
                type: String,
                enum: ['pending', 'in progress', 'completed'],
                default: 'pending'
            },
            deadline: {
                type: Date
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    code: {
        type: String,
        default: '' // Initialize with empty string or any default code
    }
}, { timestamps: true });

// Hash the password before saving the document
projectSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
