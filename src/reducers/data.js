import {
    FETCH_EQUIPMENTS,
    FETCH_EQUIPMENT_BY_ID,
    FETCH_CHECKPOINTS_BY_ID_EQUIPMENT
} from '../actions'

export const equipments = (state = {}, action) => {
    switch (action.type) {
        case FETCH_EQUIPMENTS:
            return action.payload
        default:
            return state
    }
}

export const equipmentById = (state = {}, action) => {
    switch (action.type) {
        case FETCH_EQUIPMENT_BY_ID:
            return action.payload
        default:
            return state
    }
}

export const checkpointsByIdEquipment = (state = {}, action) => {
    switch (action.type) {
        case FETCH_CHECKPOINTS_BY_ID_EQUIPMENT:
            return action.payload
        default:
            return state
    }
}
