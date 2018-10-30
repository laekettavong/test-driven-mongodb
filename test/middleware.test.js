import mongoose from 'mongoose'
import User from '../src/user'
import BlogPost from '../src/blogpost'
import { assert, expect } from 'chai'

describe('Middleware Test', () => {
    let user, blogPost

    beforeEach((done) => {
        user = new User({ name: 'Lae' })
        blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' })
        user.blogPosts.push(blogPost)
        Promise.all([user.save(), blogPost.save()])
            .then(() => {
                done()
            })
    })

    it('users clean up dangling blogposts on remove', (done) => {
        user.remove()
            .then(() => BlogPost.count())
            .then((count) => {
                assert.equal(count, 0)
                done()
            })
    })
})