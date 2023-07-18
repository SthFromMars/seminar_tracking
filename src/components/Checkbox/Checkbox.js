import { Field } from 'react-final-form';
import { Checkbox } from 'final-form-material-ui';
import { FormControlLabel } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

export default function CheckBox(props) {
    const {
        label,
        name,
        value,
        disabled,
        required,
    } = props;

    const generateLabel = () => (
        <div style={{ display: 'flex' }}>
            {required && <span style={{ color: 'red', textAlign: 'left' }}>*&nbsp;</span>}
            {label}
        </div>
    );

    return (
        <FormControlLabel
            style={{ display: 'flex', alignItems: 'baseline' }}
            label={generateLabel()}
            control={
                <div>
                    <Field
                        name={name}
                        color='primary'
                        component={Checkbox}
                        type="checkbox"
                        value={value}
                        disabled={disabled}
                    />
                </div>
            }
        />
    );
}

CheckBox.propTypes = {
    label: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]).isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
};
