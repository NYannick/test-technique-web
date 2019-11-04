import React, { useState, useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import ItemEquipment from '../../components/ItemEquipment/ItemEquipment'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import _ from 'lodash'
import SearchEquipment from '../../components/SearchEquipment/SearchEquipment'
import MuiDropdown from '../../components/MuiDropdown/MuiDropdown'
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll'
import uniq from 'lodash/uniq'
import './ListEquipment.scss'

const useStyles = makeStyles(theme =>
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
    const [options, setOptions] = useState([])
    const [value, setValue] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [disabledSearch, setDisabledSearch] = useState(false)
    const [disabledDropDown, setDisabledDropDown] = useState(false)
    const title = { name: "Nom de l'équipement", domain: "Domaine technique", brand: "Marque",nbFaults: "Nombre de défauts sur l'équipement", photo: "Photo de l'équipement" }

    const classes = useStyles()

    useEffect(() => {
        setIsLoading(true)
        props.fetchEquipments()
    }, [])

    useEffect(() => {
        setEquipments(props.equipments)
        optionsBrand(props.equipments)
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
                    brand={equipment.brand}
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

    const getEquipments = (equipments, disabled) => {
        setIsLoading(true)
        setDisabledDropDown(disabled)
        setEquipments(equipments)
        setIsLoading(false)
    }

    const optionsBrand = equipments => {
        const data = []
        const optionsBrand = []
        _.map(equipments, (equipment, key) => {
            if (equipment.brand) {
                data.push(equipment.brand)
            }
        })
        uniq(data).map((e, key) => optionsBrand.push({ value: key, label: e }))
        setOptions(optionsBrand)
    }

    const handleChange = value => {
        setValue(value)
        filterBrand(value, props.equipments)
    }

    const filterBrand = (value, equipments) => {
        const filtered = {}
        value.map(v => {
            return _.filter(equipments, (item, key) => {
                return Object.entries(item).filter(value => {
                    return value[0] === 'brand'
                }).find(value => {
                    if (String(value[1]).includes(v.label)) {
                        return Object.assign(filtered, { [key]: item })
                    }
                    return false
                })
            })
        })
        if (Object.entries(filtered).length === 0 && filtered.constructor === Object) {
            setEquipments(props.equipments)
            setDisabledSearch(false)
        } else {
            setEquipments(filtered)
            setDisabledSearch(true)
        }
    }

    return (
        <div>
            <div className="filter">
                <SearchEquipment equipments={props.equipments} getEquipments={getEquipments} disabled={disabledSearch} />
                <MuiDropdown
                    placeholder="Marque"
                    isMulti
                    isLoading={isLoading}
                    onChange={handleChange}
                    options={options}
                    value={value}
                    disabled={disabledDropDown}
                />
            </div>
            <div className="table-overflow">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell classes={{ head: classes.head }}>{title.name}</TableCell>
                            <TableCell classes={{ head: classes.head }}>{title.domain}</TableCell>
                            <TableCell classes={{ head: classes.head }}>{title.brand}</TableCell>
                            <TableCell classes={{ head: classes.head }}>{title.nbFaults}</TableCell>
                            <TableCell classes={{ head: classes.head }}>{title.photo}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderBodyEquipement()}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

const mapStateToProps = ({ equipments }) => {
    return {
        equipments
    }
}

export default connect(mapStateToProps, actions)(ListEquipment)
