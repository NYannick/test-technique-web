import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { useHistory } from 'react-router-dom'
import './ItemEquipment.scss'

const ItemEquipment = props => {
    let history = useHistory()
    return (
        <TableRow className="tablerow-equipment" onClick={() => history.push(`/${props.id}`)} hover>
            <TableCell>{props.name}</TableCell>
            <TableCell>{props.domain}</TableCell>
            <TableCell>{props.nbFaults}</TableCell>
            <TableCell><img src={props.photo} alt="img beeldi" className="img-beeldi" /></TableCell>
        </TableRow>
    )
}

export default ItemEquipment
