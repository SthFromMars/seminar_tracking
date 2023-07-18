import {
    KeyboardDatePicker,
} from '@material-ui/pickers';
import React from 'react';

export default function DatePickerWrapper(props) {
    const {
        input: {
            name, onChange, value,
            // ...restInput
        },
        meta,
        ...rest
    } = props;

    const showError = ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error)
        && meta.touched;

    if(showError){
        return (
            <KeyboardDatePicker
                {...rest}
                disableToolbar
                autoOk
                name={name}
                helperText={showError ? meta.error || meta.submitError : undefined}
                error={showError}
                variant="inline"
                format={'yyyy/MM/dd'}
                margin="normal"
                // disabled={!filterByStartDate}
                invalidDateMessage={'Neteisinga Data'}
                minDateMessage={'Neteisinga Data'}
                maxDateMessage={'Neteisinga Data'}
                // id="date-picker-inline"
                // label="Nuo"
                onChange={onChange}
                value={value === '' ? null : value}
            />
        );
    }
    return (
        <KeyboardDatePicker
            {...rest}
            disableToolbar
            autoOk
            name={name}
            // helperText={showError ? meta.error || meta.submitError : undefined}
            // error={showError}
            variant="inline"
            format={'yyyy/MM/dd'}
            margin="normal"
            // disabled={!filterByStartDate}
            invalidDateMessage={'Neteisinga Data'}
            minDateMessage={'Neteisinga Data'}
            maxDateMessage={'Neteisinga Data'}
            // id="date-picker-inline"
            // label="Nuo"
            onChange={onChange}
            value={value === '' ? null : value}
        />
    );
}