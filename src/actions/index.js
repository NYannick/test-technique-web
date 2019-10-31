import { database } from '../firebase'
import _ from 'lodash'

export const FETCH_EQUIPMENTS = 'FETCH_EQUIPMENTS'
export const FETCH_EQUIPMENT_BY_ID = 'FETCH_EQUIPMENT_BY_ID'
export const FETCH_CHECKPOINTS_BY_ID_EQUIPMENT = 'FETCH_CHECKPOINTS_BY_ID_EQUIPMENT'

export const fetchEquipments = () => async dispatch => {
    const equipment = database.ref('Equipments')
    equipment.on('value', snapshot => {
        dispatch({
            type: FETCH_EQUIPMENTS,
            payload: snapshot.val()
        })
    })
}

export const fetchEquipmentById = id => async dispatch => {
    const equipmentById = database.ref('/Equipments/' + id)
    equipmentById.on('value', snapshot => {
        dispatch({
            type: FETCH_EQUIPMENT_BY_ID,
            payload: snapshot.val()
        })
    })
}

export const fetchCheckpointsByIdEquipment = id => async dispatch => {
    const checkpointsByIdEquipment = database.ref('Checkpoints')
    const filtered = {}
    checkpointsByIdEquipment.on('value', snapshot => {
        _.filter(snapshot.val(), (checkpoint, key) => {
            if (checkpoint.equipmentKey === id) {
                return Object.assign(filtered, { [key]: checkpoint })
            }
        })
        dispatch({
            type: FETCH_CHECKPOINTS_BY_ID_EQUIPMENT,
            payload: filtered
        })
    })
}
