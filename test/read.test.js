import { assert, expect } from 'chai'
import sinon from 'sinon'
import User from '../src/user'

describe('Reading users out of the database', () => {
    let lae, maria, alex, zach;

    beforeEach((done) => {
        lae = new User({ name: 'Lae' })
        maria = new User({ name: 'Maria' })
        alex = new User({ name: 'Alex' })
        zach = new User({ name: 'Zach' })
        Promise.all([lae.save(), maria.save(), alex.save(), zach.save()])
            .then(() => done())
    })

    it('find all the users with name of \'Lae\'', (done) => {
        User.find({ name: 'Lae' })
            .then((users) => {
                assert.isTrue(users[0]._id.toString() === lae._id.toString())
                expect(users).to.be.an('array')
                expect(users[0]).to.include({ name: 'Lae' });
                expect(users[0].name).to.be.a('string')
                done()
            })
    })

    it('find a user with a particular id', (done) => {
        User.findOne({ _id: lae._id })
            .then((user) => {
                assert.isTrue(user.name === 'Lae')
                expect(user.name).to.be.a('string')
                done()
            })
    })
    it('can skip and limit the result set', (done) => {
        // get all users, skip the first one, and limit pagination to 2
        User.find({})
            .sort({ name: 1 }) //sort by name property in ascending fashion
            .skip(1)
            .limit(2)
            .then((users) => {
                expect(users).to.be.an('array')
                assert.isTrue(users.length === 2)
                assert.equal(users[0].name, 'Lae')
                assert.equal(users[1].name, 'Maria')
                done()
            })



    })
})