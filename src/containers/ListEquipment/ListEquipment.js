import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import ItemEquipment from '../../components/ItemEquipment/ItemEquipment'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import _ from 'lodash'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        progress: {
            margin: theme.spacing(2)
        }
    })
)

const ListEquipment = (props) => {
    const [equipment, setEquipment] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const classes = useStyles()

    useEffect(() => {
        getEquipment()
    }, [])

    const getEquipment = () => {
        setIsLoading(true)
        props.fetchEquipments()
    }

    const renderEquipement = () => {
        const equipments = _.map(props.equipment.Equipments, (equipment, key) => {
            return (
                <ItemEquipment
                    key={key}
                    name={equipment.name}
                    domain={equipment.domain}
                    nbFaults={equipment.nbFaults}
                    photo={equipment.photo}
                />
            )
        })
        if (!_.isEmpty(equipments)) {
            return equipments
        }
        return <TableRow><TableCell><h4>No equipments</h4></TableCell></TableRow>
    }

    return (
        <div>
            <Table>
                <TableBody>
                    {renderEquipement()}
                </TableBody>
            </Table>
        </div>
    )
}

const mapStateToProps = ({ equipment }) => {
    return {
        equipment
    }
}

export default connect(mapStateToProps, actions)(ListEquipment)
