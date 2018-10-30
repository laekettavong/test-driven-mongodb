import mongoose from 'mongoose'
import User from '../src/user'
import Comment from '../src/comment'
import BlogPost from '../src/blogpost'
import { assert, expect } from 'chai'

describe('Association', () => {
    let user, blogPost, comment

    beforeEach((done) => {
        user = new User({ name: 'Lae' })
        blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' })
        comment = new Comment({ content: 'Congrats on a great post' })
        user.blogPosts.push(blogPost)
        blogPost.comments.push(comment)
        comment.user = user
        Promise.all([user.save(), blogPost.save(), comment.save()])
            .then(() => {
                done()
            })

    })

    it('saves a relation between a user and a blogpost', (done) => {
        User.findOne({ name: 'Lae' })
            .populate('blogPosts')
            .then((user) => {
                assert.equal(user.blogPosts[0].title, 'JS is Great')
                done()
            })
    })

    it('saves a full relation graph', (done) => {
        User.findOne({ name: 'Lae' })
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert.equal(user.name, 'Lae')
                assert.equal(user.blogPosts[0].title, 'JS is Great')
                assert.equal(user.blogPosts[0].comments[0].content, 'Congrats on a great post')
                assert.equal(user.blogPosts[0].comments[0].user.name, 'Lae')
                done()
            })
    })
})