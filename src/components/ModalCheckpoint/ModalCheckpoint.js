import React, { Fragment } from 'react'
import Dialog from '@material-ui/core/Dialog'
import Card from '@material-ui/core/Card'
import { SimpleImg } from 'react-simple-img'
import './ModalCheckpoint.scss'

const ModalCheckpoint = (props) => {
    return (
        <Dialog open={props.open} scroll="body" onClose={props.handleClose}>
            <Card>
                <div className="container">
                    <div className="img-container"><SimpleImg src={props.checkpoint.photo} height={400} className="img-beeldi-detail" /></div>
                    <div className="text-container">
                        <p className="p-flex-column"><span className="bold marginBottom">Nom du point de contrôle: </span><span>{props.checkpoint.name}</span></p>
                        {
                            props.checkpoint.fault
                                ? (
                                    <Fragment>
                                        <p className="p-flex-column"><span className="bold marginBottom">Nom du défaut: </span><span>{props.checkpoint.fault}</span></p>
                                        <p className="p-flex-column"><span className="bold marginBottom">Préconisation: </span><span>{props.checkpoint.recommandation}</span></p>
                                    </Fragment>
                                ) : null
                        }
                    </div>
                </div>
            </Card>
        </Dialog>
    )
}

export default ModalCheckpoint
