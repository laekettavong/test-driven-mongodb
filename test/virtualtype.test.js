import { assert } from 'chai'
import User from '../src/user'


describe('Virtual types', () => {
    it('post count returns number of posts', (done) => {
        const lae = new User({
            name: 'Lae',
            posts: [{ title: 'New Post' }]
        })

        lae.save()
            .then(() => User.findOne({ name: 'Lae' }))
            .then((user) => {
                assert.equal(user.postCount, 1)
                done()
            })
    })
})