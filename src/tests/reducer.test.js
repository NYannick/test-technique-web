import { equipments } from '../reducers/data'

describe('equipments', () => {
    it('return the initial state', () => {
        expect(equipments(undefined, {})).toMatchSnapshot()
    })

    it('fetch equipments from firebase', () => {

    })
})
