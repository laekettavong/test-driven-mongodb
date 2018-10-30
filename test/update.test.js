import { assert, expect } from 'chai'
import sinon from 'sinon'
import User from '../src/user'

describe('Updating records', () => {
    let lae;

    beforeEach((done) => {
        lae = new User({ name: 'Lae', likes: 0 })
        lae.save().then(() => done())
    })

    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                expect(users).to.be.an('array')
                assert.isTrue(users.length === 1)
                assert.isTrue(users[0].name === 'Tristan')
                done()
            })
    }

    it('instance type using set and save', (done) => {
        lae.set('name', 'Tristan')
        assertName(lae.save(), done)
    })

    it('model instance update', (done) => {
        assertName(lae.update({ name: 'Tristan' }), done)
    })

    it('model class update', (done) => {
        assertName(
            User.update({ name: 'Lae' }, { name: 'Tristan' }),
            done)
    })

    it('model class update one record', (done) => {
        assertName(
            User.findOneAndUpdate({ name: 'Lae' }, { name: 'Tristan' }),
            done)
    })

    it('model class find a record with an ID and update', (done) => {
        assertName(
            User.findByIdAndUpdate(lae._id, { name: 'Tristan' }),
            done)
    })

    it('user likes incremented by 10', (done) => {
        User.update({ name: 'Lae' }, { $inc: { likes: 10 } })
            .then(() => User.findOne({ name: 'Lae' }))
            .then((user => {
                assert.equal(user.likes, 10)
                done()
            }))

    })
})