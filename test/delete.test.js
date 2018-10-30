import { assert, expect } from 'chai'
import User from '../src/user'

describe('Deleting a user from the database', () => {
    let lae;
    
    beforeEach((done) => {
        lae = new User({ name: 'Lae' })
        lae.save().then(() => done())
    })

    it('model instance remove', (done) => {
        lae.remove()
            .then(() => User.findOne({ name: 'Lae' }))
            .then((user) => {
                assert.isNull(user)
                expect(user).to.be.a('null')
                done()
            })
    })

    it('class method remove', (done) => {
        //remove a bunch of records with some given criteria
        User.remove({ name: 'Lae' })
            .then(() => User.findOne({ name: 'Lae' }))
            .then((user) => {
                assert.isNull(user)
                expect(user).to.be.a('null')
                done()
            })
    })

    it('class method findOneAndRemove', (done) => {
        User.findOneAndRemove({ name: 'Lae' })
        .then(() => User.findOne({ name: 'Lae' }))
        .then((user) => {
            assert.isNull(user)
            expect(user).to.be.a('null')
            done()
        })
    })

    it('class method findByIdAndRemove', (done) => {
        User.findByIdAndRemove(lae._id)
        .then(() => User.findOne({ name: 'Lae' }))
        .then((user) => {
            assert.isNull(user)
            expect(user).to.be.a('null')
            done()
        })
    })
})