import { combineReducers } from 'redux'
import { equipments, equipmentById, checkpointsByIdEquipment } from './data'

export default combineReducers({
    equipments,
    equipmentById,
    checkpointsByIdEquipment
})
