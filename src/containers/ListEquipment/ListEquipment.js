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
        },
        head: {
            fontWeight: 600,
            position: 'sticky',
            top: 0,
            zIndex: 1,
            background: 'white'
        }
    })
)

const ListEquipment = props => {
    let infiniteScroll = useInfiniteScroll()
    const [equipments, setEquipments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const title = { name: "Nom de l'équipement", domain: "Domaine technique", nbFaults: "Nombre de défauts sur l'équipement", photo: "Photo de l'équipement" }

    const classes = useStyles()

    useEffect(() => {
        setIsLoading(true)
        props.fetchEquipments()
    }, [])

    useEffect(() => {
        setEquipments(props.equipments)
        return () => {
            setIsLoading(false)
        }
    }, [props.equipments])

    const renderBodyEquipement = () => {
        const data = _.map(equipments, (equipment, key) => {
            return (
                <ItemEquipment
                    key={key}
                    id={key}
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
        return <TableRow><TableCell>{isLoading ? <CircularProgress className={classes.progress} /> : <h4>No equipment(s)</h4>}</TableCell></TableRow>
    }

    const getEquipments = (equipments) => {
        setIsLoading(true)
        setEquipments(equipments)
        setIsLoading(false)
    }

    return (
        <div>
            <SearchEquipment equipments={props.equipments} getEquipments={getEquipments} />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell classes={{ head: classes.head }}>{title.name}</TableCell>
                        <TableCell classes={{ head: classes.head }}>{title.domain}</TableCell>
                        <TableCell classes={{ head: classes.head }}>{title.nbFaults}</TableCell>
                        <TableCell classes={{ head: classes.head }}>{title.photo}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderBodyEquipement()}
                </TableBody>
            </Table>
        </div>
    )
}

const mapStateToProps = ({ equipments }) => {
    return {
        equipments
    }
}

export default connect(mapStateToProps, actions)(ListEquipment)
