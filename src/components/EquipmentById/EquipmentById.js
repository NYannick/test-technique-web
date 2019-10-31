import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import CircularProgress from '@material-ui/core/CircularProgress'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import ArrowBack from '@material-ui/icons/ArrowBack';
import _ from 'lodash'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import Tooltip from '@material-ui/core/Tooltip'
import { SimpleImg } from 'react-simple-img'
import './EquipmentById.scss'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        progress: {
            margin: theme.spacing(2)
        },
        button: {
            marginBottom: theme.spacing(1)
        },
        card: {
            marginRight: 10
        }
    })
)

const EquipmentById = props => {
    let { id } = useParams()
    const [equipment, setEquipment] = useState([])
    const [checkpoints, setCheckpoints] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const classes = useStyles()

    useEffect(() => {
        setIsLoading(true)
        // if (Object.entries(props.equipments).length === 0 && props.equipments.constructor === Object) {
            props.fetchEquipmentById(id)
            props.fetchCheckpointsByIdEquipment(id)
        // }
    }, [])

    useEffect(() => {
        setEquipment(props.equipmentById)
    }, [equipment])

    useEffect(() => {
        setCheckpoints(props.checkpointsByIdEquipment)
        return () => {
            setIsLoading(false)
        }
    }, [checkpoints])

    const renderEquipment = () => {
        return (
            <div className="container-btn-data">
                <Link to="/" className="link-back">
                    <Button
                        variant="contained"
                        className={classes.button}
                        startIcon={<ArrowBack />}
                    >
                        Retour
                    </Button>
                </Link>
                {
                    isLoading
                        ? <CircularProgress className={classes.progress} />
                        : !_.isEmpty(props.equipmentById)
                            ? (
                                <Card>
                                    <div className="container">
                                        <div className="img-container"><SimpleImg src={props.equipmentById.photo} height={400} className="img-beeldi-detail" /></div>
                                        <div className="text-container">
                                            <p><span className="bold">Nom de l'équipement: </span>{props.equipmentById.name}</p>
                                            <p><span className="bold">Domaine technique: </span>{props.equipmentById.domain}</p>
                                            <p><span className="bold">Nombre de défauts sur l'équipement: </span>{props.equipmentById.nbFaults}</p>
                                            <p><span className="bold">Marque: </span>{props.equipmentById.brand}</p>
                                            <p><span className="bold">Modèle: </span>{props.equipmentById.model}</p>
                                            <p><span className="bold">Dernier statut constaté: </span>{props.equipmentById.status}</p>
                                            <p className="p-flex-column"><span className="bold marginBottom">Prise de notes: </span><span>{props.equipmentById.notes}</span></p>
                                            <div className="container-img-beeldi-min">
                                                {
                                                    !_.isEmpty(props.checkpointsByIdEquipment)
                                                        ? _.map(checkpoints, (checkpoint, key) => checkpoint.photo ? <Tooltip title={checkpoint.name ? checkpoint.name : null} key={key}><Card classes={{ root: classes.card }}><SimpleImg src={checkpoint.photo} height={105} className="img-beeldi-min" /></Card></Tooltip> : null)
                                                        : <h4>No checkpoints available</h4>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ) : <h4>No equipment available</h4>
                }
            </div>
        )
    }

    return renderEquipment()
}

const mapStateToProps = ({ equipmentById, checkpointsByIdEquipment }) => {
    return {
        equipmentById,
        checkpointsByIdEquipment
    }
}

export default connect(mapStateToProps, actions)(EquipmentById)
