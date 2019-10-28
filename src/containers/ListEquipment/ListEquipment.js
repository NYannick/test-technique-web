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
import SearchEquipment from '../../components/SearchEquipment/SearchEquipment'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        progress: {
            margin: theme.spacing(2)
        }
    })
)

const ListEquipment = props => {
    let infiniteScroll = useInfiniteScroll()
    const [equipments, setEquipments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState(['name', 'domain', 'nbFaults', 'photo'])

    const classes = useStyles()

    useEffect(() => {
        setIsLoading(true)
        props.fetchEquipments()
    }, [])

    useEffect(() => {
        setEquipments(props.equipment.Equipments)
        return () => {
            setIsLoading(false)
        }
    }, [props.equipment])

    // const renderHeadEquipment = () => {
    //
    // }

    const renderBodyEquipement = () => {
        const data = _.map(equipments, (equipment, key) => {
            return (
                <ItemEquipment
                    key={key}
                    name={equipment.name}
                    domain={equipment.domain}
                    nbFaults={equipment.nbFaults}
                    photo={equipment.photo}
                />
            )
        }).slice(0, infiniteScroll)
        if (!_.isEmpty(data)) {
            return data
        }
        return <TableRow><TableCell>{isLoading ? <CircularProgress className={classes.progress} /> : <h4>No equipments</h4>}</TableCell></TableRow>
    }

    return (
        <div>
            <SearchEquipment />
            <Table>
                <TableBody>
                    {renderBodyEquipement()}
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
