import { assert, expect } from 'chai'
import sinon from 'sinon'
import User from '../src/user'

describe('Validating records', () => {
    it('requires a user name', (done) => {
        const user = new User({ name: undefined })
        const validationResult = user.validateSync()
        const { message } = validationResult.errors.name
        assert.equal(message, 'Name is required')
        done()
    })

    it('requires a user name with more than two characters', (done) => {
        const user = new User({name: 'Al'})
        const validationResult = user.validateSync()
        const { message } = validationResult.errors.name
        assert.equal(message, 'Name must be longer than two characters')
        done()
    })

    it('disallows invalid records from being saved', (done) => {
        const user = new User({name: 'Al'})
        user.save()
        .catch((validationResult) => {
            const { message } = validationResult.errors.name
            assert.equal(message, 'Name must be longer than two characters')
            done()
        })
    })
})