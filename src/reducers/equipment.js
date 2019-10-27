import { FETCH_EQUIPMENTS } from '../actions'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_EQUIPMENTS:
            return action.payload
        default:
            return state
    }
}
