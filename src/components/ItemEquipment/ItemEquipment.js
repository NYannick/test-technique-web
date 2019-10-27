import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import './ItemEquipment.scss'

const ItemEquipment = props => {
    return (
        <TableRow>
            <TableCell>{props.name}</TableCell>
            <TableCell>{props.domain}</TableCell>
            <TableCell>{props.nbFaults}</TableCell>
            <TableCell><img src={props.photo} alt="img beeldi" className="img-beeldi" /></TableCell>
        </TableRow>
    )
}

export default ItemEquipment