import React, { Fragment, Children } from 'react'
import Select from 'react-select'
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles'
import NoSsr from '@material-ui/core/NoSsr'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import Checkbox from '@material-ui/core/Checkbox'
import ArrowDropDown from '@material-ui/icons/ArrowDropDown'
import Close from "@material-ui/icons/Close"
import Done from "@material-ui/icons/Done"
import CircularProgress from '@material-ui/core/CircularProgress'
import Tooltip from '@material-ui/core/Tooltip'
import { VariableSizeList as List } from 'react-window'
import './MuiDropdown.scss'

const useStyles = makeStyles(theme => createStyles({
    root: {
        width: 200
    },
    label: {
        color: 'white !important'
    },
    input: {
        display: 'flex',
        padding: 0,
        height: 'auto'
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden'
    },
    noOptionsMessage: {
        padding: theme.spacing(1, 2),
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        bottom: 6,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing(1),
        left: 0,
        right: 0,
    },
    rootIconDropdown: {
        color: 'rgba(0, 0, 0, 0.54)'
    },
    customWidth: {
        maxWidth: 300
    },
    focused: {
        background: 'lightgrey'
    }
}))

const inputComponent = ({ inputRef, ...props }) => <div ref={inputRef} {...props} />

const Control = ({ children, innerProps, innerRef, selectProps: { classes, TextFieldProps } }) => (
    <TextField
        fullWidth={true}
        InputProps={{
            inputComponent,
            inputProps: {
                className: classes.input,
                ref: innerRef,
                children,
                ...innerProps,
            },
        }}
        {...TextFieldProps}
    />
)

const DropdownIndicator = props => <ArrowDropDown classes={{ root: props.selectProps.classes.rootIconDropdown }} style={{ cursor: 'pointer' }} />
const LoadingIndicator = props => <CircularProgress size={20} />
const IndicatorSeparator = props => null

const ITEM_HEIGHT = 46
const GROUP_HEADER_HEIGHT = 19

const MenuList = ({ options, children, getValue, width, selectProps }) => {
    const [value] = getValue()
    const initialOffset = options.indexOf(value) * ITEM_HEIGHT
    const child = Children.toArray(children)

    const getOptionSize = option => {
        if (option && option.options) {
            return option.options.length * ITEM_HEIGHT + GROUP_HEADER_HEIGHT
        }
        return ITEM_HEIGHT
    }

    const getItemSize = i => {
        return getOptionSize(options[i])
    }

    const totalHeight = options.reduce((height, option) => {
        return height + getOptionSize(option)
    }, 0)

    const estimatedItemSize = totalHeight / options.length

    return (
        <Fragment>
            <List
                height={Math.min(totalHeight, 300)}
                itemCount={child.length}
                itemSize={getItemSize}
                estimatedItemSize={estimatedItemSize}
                initialScrollOffset={initialOffset}
                width={width}
                style={{
                    height: 'auto',
                    maxHeight: 300
                }}
            >
                {({ index, style }) => <div style={style}>{child[index]}</div>}
            </List>
            {
                selectProps.isMultiMetas && selectProps.hasChanges &&
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
                <Close style={{ cursor: 'pointer', color: 'grey', margin: '0 9px', padding: '9px 0', width: '50%', borderRight: '1px solid grey' }} fontSize={'small'} onClick={() => {
                    selectProps.onMenuClose()
                    selectProps.toggleModal('cancel')
                }}/>
                <Done style={{ cursor: 'pointer', color: 'green', margin: '0 9px', padding: '9px 0', width: '50%' }} fontSize={'small'} onClick={() => {
                    selectProps.onMenuClose()
                    selectProps.toggleModal('modal')
                }}/>
            </div>
            }
        </Fragment>
    )
}

const Option = props => (
    <MenuItem
        buttonRef={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{ background: props.isSelected ? 'rgba(0, 0, 0, 0.14)' : '', height: 46, minHeight: 46, borderBottom: props.value === -9 ? '1px solid grey' : null }}
        {...props.innerProps}
        disabled={props.selectProps.DisabledSelectedProps.disabledSelected ? disabledOption(props.data, props.selectProps.DisabledSelectedProps.disabledSelected, props.selectProps.isVariant) : false}
    >
        {props.isMulti ? (<Fragment><Checkbox checked={props.isSelected} /><p className='overflowText'>{props.children}</p></Fragment>) : <p className='overflowText'>{props.children}</p>}
    </MenuItem>
)

const disabledOption = (option, disabledSelected, isVariant) => {
    let disabled = false
    if (isVariant) {
        return disabled = disabledSelected.indexOf(option.value) > -1
    } else {
        disabledSelected.map((item) => {
            if (Array.isArray(item.status)) {
                return !!item.status.find((selected) => {
                    return disabled = (selected.elemId === option.value) && (selected.statusId !== 4)
                })
            } else {
                if (item.status && option.value === item.id) {
                    return disabled = item.status.statusId !== 4
                }
                return disabled
            }
        })
    }

    return disabled
}

const MultiValueRemove = props => <div />

const MultiValue = props => {
    const children = props.hasValue ? props.children[0].map(child => child.props.children).filter(c => c !== 'Select all' && c).join(', ') : null
    return (
        <div ref={props.innerRef} {...props.innerProps} className='dropdown-mui'>
            {
                props.hasValue
                    ? (
                        <Fragment>
                            {
                                !props.selectProps.inputValue
                                    && (
                                        <div className='dropdown-mui-child'>{
                                            typeof children === 'string'
                                                && (<Tooltip title={children} placement='bottom-start' classes={{ tooltip: props.selectProps.classes.customWidth }}>
                                                    <span className={props.selectProps.TextFieldProps.span ? 'colorInput' : ''}>
                                                        {children}
                                                    </span>
                                                </Tooltip>)
                                        }
                                        </div>
                                    )
                            }
                            {props.children[1]}
                        </Fragment>
                    )
                    : props.children
            }
        </div>
    )
}

const ValueContainer = props => {
    return props.isMulti ? <MultiValue {...props} /> : <div ref={props.innerRef} {...props.innerProps} className='dropdown-mui'>{props.children}</div>
}

const Menu = props => <div ref={props.innerRef} {...props.innerProps} style={props.getStyles('menu', props)}>{props.children}</div>

const components = {
    Control,
    Option,
    MenuList,
    MultiValueRemove,
    ValueContainer,
    DropdownIndicator,
    IndicatorSeparator,
    LoadingIndicator,
    Menu
}

const MuiDropdown = props => {
    const classes = useStyles()
    const theme = useTheme()

    const selectStyles = {
        input: base => ({
            ...base,
            color: props.colorInput ? props.colorInput : theme.palette.text.primary,
            '& input': {
                font: 'inherit',
            },
        }),
        noOptionsMessage: base => ({
            ...base,
            paddingTop: 14,
            paddingBottom: 14
        }),
        loadingMessage: base => ({
            ...base,
            paddingTop: 14,
            paddingBottom: 14
        }),
        menu: base => ({
            ...base,
            zIndex: 2,
            opacity: 1,
            transition: 'opacity 281ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 187ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
        }),
        singleValue: base => ({
            ...base,
            color: props.colorInput ? 'white' : ''
        }),
        menuPortal: base => ({
            ...base,
            zIndex: 9999
        }),
        clearIndicator: base => ({
            ...base,
            cursor: 'pointer'
        })
    }

    const shrink = {
        shrink: true,
        classes: { root: props.colorInput ? classes.label : '' }
    }
    const noShrink = { classes: { root: props.colorInput ? classes.label : '' } }

    return (
        <div className={classes.root}>
            <NoSsr>
                <Select
                    TextFieldProps={{
                        label: props.placeholder,
                        InputLabelProps: props.value.length > 0 ? shrink : noShrink,
                        span: props.colorInput ? 'colorInput' : null,
                    }}
                    placeholder=''
                    classes={classes}
                    styles={selectStyles}
                    options={props.options}
                    components={components}
                    onChange={props.onChange}
                    isMulti={props.isMulti}
                    isLoading={props.isLoading}
                    isClearable={true}
                    isDisabled={props.disabled}
                    closeMenuOnSelect={!props.isMulti}
                    backspaceRemovesValue={false}
                    className="basic-multi-select"
                    hideSelectedOptions={false}
                    value={props.value}
                    DisabledSelectedProps={{
                        disabledSelected: props.disabledSelected
                    }}
                    onMenuClose={props.onMenuClose}
                    menuPlacement="auto"
                    menuPosition="absolute"
                    menuPortalTarget={document.body}
                    isMultiMetas={props.isMultiMetas}
                    isVariant={props.isVariant}
                />
            </NoSsr>
        </div>
    )
}

export default MuiDropdown
