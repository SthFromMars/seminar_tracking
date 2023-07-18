import React from 'react';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {KeyboardDatePicker} from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Paper from "@material-ui/core/Paper";
import styles from "./styles";
import { withStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

class Filters extends React.Component {
    render() {
        const { filterByStartDate, filterByEndDate, filterByUser, startDateBegin, startDateEnd, endDateBegin, endDateEnd } = this.props.filterInfo;
        const { onChange, onCheckboxChange, users, classes, isLoading, error, admin } = this.props;
        return(
            <Paper className={classes.paper}>
                <h1 className={classes.title}>Filtrai</h1>
                {isLoading ? (
                    <CircularProgress/>
                ) : (
                    error ? (
                        <div className={classes.errorDiv}>
                            <p className={classes.error}>{error}</p>
                        </div>
                    ) : (
                        <div className={classes.mainDiv}>
                            <div className={classes.filterDiv}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={filterByStartDate}
                                            onChange={() => onCheckboxChange('filterByStartDate')}
                                            color="primary"
                                        />
                                    }
                                    label="Pagal pradžios datą"
                                /><br/>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format={'yyyy/MM/dd'}
                                    margin="normal"
                                    disabled={!filterByStartDate}
                                    invalidDateMessage={'Neteisinga Data'}
                                    minDateMessage={'Neteisinga Data'}
                                    maxDateMessage={'Neteisinga Data'}
                                    // id="date-picker-inline"
                                    label="Nuo"
                                    value={startDateBegin}
                                    onChange={(e) => onChange(e, 'startDateBegin')}
                                /><br/>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format={'yyyy/MM/dd'}
                                    margin="normal"
                                    disabled={!filterByStartDate}
                                    invalidDateMessage={'Neteisinga Data'}
                                    minDateMessage={'Neteisinga Data'}
                                    maxDateMessage={'Neteisinga Data'}
                                    // id="date-picker-inline"
                                    label="Iki"
                                    value={startDateEnd}
                                    onChange={(e) => onChange(e, 'startDateEnd')}
                                />
                            </div>
                            <div className={classes.filterDiv}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={filterByEndDate}
                                            onChange={() => onCheckboxChange('filterByEndDate')}
                                            color="primary"
                                        />
                                    }
                                    label="Pagal pabaigos datą"
                                /><br/>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format={'yyyy/MM/dd'}
                                    margin="normal"
                                    disabled={!filterByEndDate}
                                    invalidDateMessage={'Neteisinga Data'}
                                    minDateMessage={'Neteisinga Data'}
                                    maxDateMessage={'Neteisinga Data'}
                                    // id="date-picker-inline"
                                    label="Nuo"
                                    value={endDateBegin}
                                    onChange={(e) => onChange(e, 'endDateBegin')}
                                /><br/>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format={'yyyy/MM/dd'}
                                    margin="normal"
                                    disabled={!filterByEndDate}
                                    invalidDateMessage={'Neteisinga Data'}
                                    minDateMessage={'Neteisinga Data'}
                                    maxDateMessage={'Neteisinga Data'}
                                    // id="date-picker-inline"
                                    label="Iki"
                                    value={endDateEnd}
                                    onChange={(e) => onChange(e, 'endDateEnd')}
                                />
                            </div>
                            {admin && (
                                <div className={classes.filterDiv}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={filterByUser}
                                                onChange={() => onCheckboxChange('filterByUser')}
                                                color="primary"
                                            />
                                        }
                                        label="Pagal vartotojus"
                                    /><br/>
                                    <Autocomplete
                                        className={classes.userSelect}
                                        multiple
                                        onChange={(e, values) => onChange(values, 'users')}
                                        options={users}
                                        getOptionLabel={user => user.name}
                                        defaultValue={[]}
                                        disabled={!filterByUser}
                                        renderInput={params => (
                                            <TextField
                                                {...params}
                                                variant="standard"
                                                label="Vartotojai"
                                                className={classes.userSelect}
                                                // fullWidth
                                            />
                                        )}
                                    />
                                </div>
                            )}
                        </div>
                    )
                )}
            </Paper>
        )
    }
}

export default withStyles(styles)(Filters);