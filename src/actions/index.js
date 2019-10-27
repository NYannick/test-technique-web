import { database } from '../firebase'
export const FETCH_EQUIPMENTS = 'FETCH_EQUIPMENTS'

export const fetchEquipments = () => async dispatch => {
    database.ref().on('value', snapshot => {
        dispatch({
            type: FETCH_EQUIPMENTS,
            payload: snapshot.val()
        })
    })
}
