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

    const classes = useStyles()

    useEffect(() => {
        props.fetchEquipmentById(id)
        props.fetchCheckpointsByIdEquipment(id)
    }, [])

    useEffect(() => {
        setEquipment(renderEquipment())
        setCheckpoints(renderCheckpoints())
    }, [equipment, props.checkpointsByIdEquipment])

    const renderEquipment = () => {
        if (!_.isEmpty(props.equipmentById)) {
            return props.equipmentById
        }
        return null
    }

    const renderCheckpoints = () => {
        if (!_.isEmpty(props.checkpointsByIdEquipment)) {
            return _.map(props.checkpointsByIdEquipment, (checkpoint, key) => checkpoint.photo ? <Tooltip title={checkpoint.name ? checkpoint.name : null} key={key}><Card classes={{ root: classes.card }}><SimpleImg src={checkpoint.photo} height={105} className="img-beeldi-min" /></Card></Tooltip> : null)
        }
        return <h4>No checkpoint(s) available</h4>
    }

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
                equipment
                    ? (
                        <Card>
                            <div className="container">
                                <div className="img-container"><SimpleImg src={equipment.photo} height={400} className="img-beeldi-detail" /></div>
                                <div className="text-container">
                                    <p><span className="bold">Nom de l'équipement: </span>{equipment.name}</p>
                                    <p><span className="bold">Domaine technique: </span>{equipment.domain}</p>
                                    <p><span className="bold">Nombre de défauts sur l'équipement: </span>{equipment.nbFaults}</p>
                                    <p><span className="bold">Marque: </span>{equipment.brand}</p>
                                    <p><span className="bold">Modèle: </span>{equipment.model}</p>
                                    <p><span className="bold">Dernier statut constaté: </span>{equipment.status}</p>
                                    <p className="p-flex-column"><span className="bold marginBottom">Prise de notes: </span><span>{equipment.notes}</span></p>
                                    <div className="container-img-beeldi-min">
                                        {checkpoints}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ) : <CircularProgress className={classes.progress} />
            }
        </div>
    )
}

const mapStateToProps = ({ equipmentById, checkpointsByIdEquipment }) => {
    return {
        equipmentById,
        checkpointsByIdEquipment
    }
}

export default connect(mapStateToProps, actions)(EquipmentById)
