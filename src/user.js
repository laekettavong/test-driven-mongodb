import mongoose from 'mongoose'
import PostSchema from './post'
import { runInNewContext } from 'vm';

const Schema = mongoose.Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        validate: {
            validator: (name) => name.length > 2,
            message: 'Name must be longer than two characters'
        }
    },
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'blogpost'
    }]

})

UserSchema.virtual('postCount').get(function () {
    return this.posts.length
})

//Defining mongo middleware to clean up any blogposts associated with the user before user is removed
UserSchema.pre('remove', function (next) {
    //not using => notation here due to lexical scoping issue since this === 'lae' user
    const blogPost = mongoose.model('blogpost')
    //go through all the IDs in blogPosts array and remove them
    blogPost.remove({ _id: { $in: this.blogPosts } })
        .then(() => next()) //once this middle is done, go on to the next one, if one exists, else remove the user
})

const User = mongoose.model('user', UserSchema)
module.exports = User