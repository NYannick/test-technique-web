import React from 'react'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import _ from 'lodash'

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '30%',
            marginRight: 24,
            marginLeft: 24
        },
        input: {
            marginLeft: 8,
            flex: 1
        },
        iconButton: {
            padding: 10
        },
        divider: {
            width: 1,
            height: 28,
            margin: 4
        }
    })
)
let search = null
const SearchEquipment = props => {
    const searchValue = e => {
        e.stopPropagation()

        clearTimeout(search)
        const match = e.target.value
        const filtered = {}
        search = setTimeout(() => {
            _.filter(props.equipments, (item, key) => {
                return Object.entries(item).filter(value => {
                    return value[0] === 'domain' || value[0] === 'name'
                }).find(value => {
                    if (String(value[1]).toLowerCase().includes(match)) {
                        return Object.assign(filtered, { [key]: item })
                    }
                    return false
                })
            })
            props.getEquipments(match !== '' ? filtered : props.equipments)
        }, 1000)
    }
    const classes = useStyles()
    return (
        <Paper className={classes.root} elevation={1}>
            <InputBase className={classes.input} placeholder="Search..." onChange={searchValue} />
            <Divider className={classes.divider} />
            <IconButton className={classes.iconButton} aria-label="Search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}

export default SearchEquipment
