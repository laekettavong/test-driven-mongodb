import { assert, expect } from 'chai'
import User from '../src/user'

describe('Create Test', () => {
    //insert a new record into collection
    it('should save a user to database', (done) => {
        const lae = new User({ name: 'Lae' })
        lae.save().then(() =>{
            //once persisted, 'lae' is no longer new
            assert.isFalse(lae.isNew)
            done()
        })
    })
})