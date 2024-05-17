import mongoose from "mongoose";
import Post from "./post";

const commentSchema = mongoose.Schema({
    PostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        index: true
    },
    comments: {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            index: true
        },
        authorName: {
            type: String,
        },
        authorUsername: {
            type: String,
        },
        comment: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
});

commentSchema.set('timestamps', {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
