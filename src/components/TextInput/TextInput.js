import React from 'react';
import TextField from '@material-ui/core/TextField';
// import { makeStyles } from '@material-ui/core/styles';
// import { MenuItem } from '@material-ui/core';

export default function TextInput(props) {
    // const styles = props.classes ? props.classes : {};
    // const useStyles = makeStyles(styles);
    // const classes = useStyles();

    const {
        label,
        meta: { touched, invalid, error },
        select,
        input,
        // multiline,
        // rows,
        required,
        disabled,
        // renderTitle,
        // fieldsetValue,
        number,
        fullWidth,
    } = props;
    let onChange = props.input.onChange;
    if(number){
        onChange = (e) => {
            if(!/[^0-9]/.test(e.target.value)) props.input.onChange(e);
        }
    }
    return (
        <TextField
            label={label}
            select={select}
            // SelectProps={ disabled && {
            //     // eslint-disable-next-line react/display-name
            //     renderValue: () => <MenuItem value={fieldsetValue}>{renderTitle}</MenuItem>,
            // }}
            error={touched && invalid}
            helperText={touched && error}
            // multiline={multiline}
            // rows={rows}
            required={required}
            disabled={disabled}
            {...input}
            margin="normal"
            fullWidth={fullWidth}
            onChange={onChange}
            // variant="outlined"
            // className={classes.root}
        >
            {props.children}
        </TextField>
    );
}