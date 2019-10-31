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
            margin: theme.spacing(1)
        },
        card: {
            marginRight: 10
        }
    })
)

const EquipmentById = props => {
    let { id } = useParams()
    const { equipment } = props
    const [equipments, setEquipments] = useState([])
    const [checkpoints, setCheckpoints] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const classes = useStyles()

    useEffect(() => {
        setIsLoading(true)
        props.fetchEquipments()
    }, [])

    useEffect(() => {
        setEquipments(equipment.Equipments)
        setCheckpoints(equipment.Checkpoints)
        return () => {
            setIsLoading(false)
        }
    }, [equipment])

    const renderEquipment = () => {
        const dataCheckpoint = _.filter(checkpoints, checkpoint => checkpoint.equipmentKey === id)
        const dataEquipment = _.map(equipments, (equipment, key) => {
            if (id === key) {
                return (
                    <Card key={key}>
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
                                    {
                                        dataCheckpoint.map((checkpoint, key) => checkpoint.photo ? <Tooltip title={checkpoint.name ? checkpoint.name : null} key={key}><Card classes={{ root: classes.card }}><SimpleImg src={checkpoint.photo} height={105} className="img-beeldi-min" /></Card></Tooltip> : null)
                                    }
                                </div>
                            </div>
                        </div>
                    </Card>
                )
            }
        })
        return (
            <div className="container-btn-data">
                <Button
                    variant="contained"
                    className={classes.button}
                    startIcon={<ArrowBack />}
                >
                    <Link to="/">Retour</Link>
                </Button>
                {
                    isLoading
                        ? <CircularProgress className={classes.progress} />
                        : !_.isEmpty(dataEquipment)
                            ? dataEquipment
                            : <h4>No equipment available</h4>
                }
            </div>
        )
    }

    return renderEquipment()
}

const mapStateToProps = ({ equipment }) => {
    return {
        equipment
    }
}

export default connect(mapStateToProps, actions)(EquipmentById)
