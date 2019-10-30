import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import CircularProgress from '@material-ui/core/CircularProgress'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import _ from 'lodash'
import './EquipmentById.scss'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        progress: {
            margin: theme.spacing(2)
        }
    })
)

const EquipmentById = props => {
    let { id } = useParams()
    const { equipment } = props
    const [equipments, setEquipments] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const classes = useStyles()

    useEffect(() => {
        setIsLoading(true)
        props.fetchEquipments()
    }, [])

    useEffect(() => {
        setEquipments(equipment.Equipments)
        return () => {
            setIsLoading(false)
        }
    }, [equipment])

    const renderEquipment = () => {
        const data = _.map(equipments, (equipment, key) => {
            if (id === key) {
                return (
                    <Card key={key}>
                        <div className="container">
                            <div className="img-container"><img src={equipment.photo} alt="img beeldi" className="img-beeldi-detail" /></div>
                            <div className="text-container">
                                <p><span className="bold">Nom de l'équipement: </span>{equipment.name}</p>
                                <p><span className="bold">Domaine technique: </span>{equipment.domain}</p>
                                <p><span className="bold">Nombre de défauts sur l'équipement: </span>{equipment.nbFaults}</p>
                                <p><span className="bold">Marque: </span>{equipment.brand}</p>
                                <p><span className="bold">Modèle: </span>{equipment.model}</p>
                                <p><span className="bold">Dernier statut constaté: </span>{equipment.status}</p>
                                <p className="p-flex-column"><span className="bold marginBottom">Prise de notes: </span><span>{equipment.notes}</span></p>
                            </div>
                        </div>
                    </Card>
                )
            }
        })
        if (!_.isEmpty(data)) {
            return data
        }
        return <div>{isLoading ? <CircularProgress className={classes.progress} /> : <h4>No equipment available</h4>}</div>
    }

    return renderEquipment()
}

const mapStateToProps = ({ equipment }) => {
    return {
        equipment
    }
}

export default connect(mapStateToProps, actions)(EquipmentById)
