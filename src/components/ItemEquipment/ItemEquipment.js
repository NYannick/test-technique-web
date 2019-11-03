import React from 'react'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { useHistory } from 'react-router-dom'
import { SimpleImg } from 'react-simple-img'
import './ItemEquipment.scss'

const ItemEquipment = props => {
    let history = useHistory()
    return (
        <TableRow className="tablerow-equipment" onClick={() => history.push(`/${props.id}`)} hover>
            <TableCell>{props.name}</TableCell>
            <TableCell>{props.domain}</TableCell>
            <TableCell>{props.brand}</TableCell>
            <TableCell>{props.nbFaults}</TableCell>
            <TableCell><SimpleImg height={200} src={props.photo} className="img-beeldi" /></TableCell>
        </TableRow>
    )
}

export default ItemEquipment
