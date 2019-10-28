import React from 'react'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import { createStyles, makeStyles } from '@material-ui/core/styles'

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

const SearchEquipment = props => {
    const search = e => {
        console.log(e)
    }
    const classes = useStyles()
    return (
        <Paper className={classes.root} elevation={1}>
            <InputBase className={classes.input} placeholder="Search..." onChange={search} />
            <Divider className={classes.divider} />
            <IconButton className={classes.iconButton} aria-label="Search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}

export default SearchEquipment
