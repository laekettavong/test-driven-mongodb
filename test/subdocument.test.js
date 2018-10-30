import { assert } from 'chai'
import User from '../src/user'

describe('Subdocument', () => {
    it('can create a subdocument', (done) => {
        const lae = new User({
            name: 'Lae',
            posts: [{ title: 'Advanced ES6' }]
        })

        lae.save()
            .then(() => User.findOne({ name: 'Lae' }))
            .then((user) => {
                assert.equal(user.posts[0].title, 'Advanced ES6')
                done()
            })
    })

    it('can add subdocuments to an existing record', (done) => {
        const lae = new User({
            name: 'Lae',
            posts: []
        })

        lae.save()
            .then(() => User.findOne({ name: 'Lae' }))
            .then((user) => {
                user.posts.push({ title: 'New Post' })
                return user.save()
            })
            .then(() => User.findOne({ name: 'Lae' }))
            .then((user) => {
                assert.equal(user.posts[0].title, 'New Post')
                done()
            })
    })

    it('can remove an existing subdocument', (done) => {
        const lae = new User({
            name: 'Lae',
            posts: [{title :'Advanced ES6'}]
        })
        lae.save()
            .then(() => User.findOne({ name: 'Lae' }))
            .then((user) => {
                user.posts[0].remove()
                return user.save()
            })
            .then(() => User.findOne({ name: 'Lae' }))
            .then((user) => {
                assert.equal(user.posts.length, 0)
                done()
            })
    })
})