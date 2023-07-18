import React from "react";
import TextInput from "../../components/TextInput/TextInput";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import styles from "./styles";
import {
    Form, Field,
} from 'react-final-form';
import DatePicker from "../../components/DatePicker/DatePicker";
import MenuItem from "@material-ui/core/MenuItem";
import {
    postSeminar,
    editSeminar,
} from "../../state/seminars/seminarsActions";
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import dateFormat from "./utils/dateFormat";
import CircularProgress from "@material-ui/core/CircularProgress";
import Collapse from "@material-ui/core/Collapse";

const useStyles = makeStyles(styles);

function validate(values) {
    const errors = {};
    const requiredFields = [
        'seminarName',
        'certNr',
        'length',
        'startDate',
        'endDate',
        'location',
        'userId',
    ];
    requiredFields.forEach((field) => {
        if (!values[field]) {
            errors[field] = 'Būtinas laukas';
        }
    });
    return errors;
}

function handleSubmit(values, postSeminar, editSeminar, isEdit, handleClose, filterParams) {
    const postValues = { ...values};
    if(isNaN(values.startDate.getFullYear()) || isNaN(values.endDate.getFullYear())) return;
    postValues.startDate = dateFormat(values.startDate);
    postValues.endDate = dateFormat(values.endDate);
    if(isEdit) editSeminar(postValues, values.id, filterParams, handleClose);
    else postSeminar(postValues, filterParams, handleClose);
}

function CreateSeminar(props) {
    const {handleClose, users, seminar, isEdit, SeminarsIsLoading, UsersIsLoading, SeminarsError, UsersError, filterParams} = props;
    let initialValues = {userId: props.user.id};
    if(isEdit) {
        const {userName, startDate, endDate, ...tempValues} = seminar;
        initialValues = {
            ...tempValues,
            startDate: new Date(startDate),
            endDate: new Date(endDate),
        };
    }
    const errorMessage = SeminarsError ? SeminarsError : UsersError;
    const classes = useStyles();
    return (
        <div className={classes.mainDiv}>
            {errorMessage && (
                <p className={classes.error}>{errorMessage}</p>
            )}
            {SeminarsIsLoading || UsersIsLoading ? (
                <CircularProgress/>
            ) : (
                <Form onSubmit={(values) => {handleSubmit(values, props.postSeminar, props.editSeminar, isEdit, handleClose, filterParams)}}
                      validate={validate}
                      initialValues={initialValues}
                      render={({ handleSubmit, values }) => (
                          <form onSubmit={handleSubmit} noValidate>
                              <Field
                                  required
                                  fullWidth
                                  name={'seminarName'}
                                  label={'Pavadinimas'}
                                  variant={'outlined'}
                                  // size={'small'}
                                  component={TextInput}
                              />
                              <Field
                                  required
                                  fullWidth
                                  name={'certNr'}
                                  label={'Pažymėjimo nr.'}
                                  variant={'outlined'}
                                  // size={'small'}
                                  component={TextInput}
                              />
                              <Field
                                  required
                                  fullWidth
                                  name={'length'}
                                  label={'Trukmė'}
                                  number
                                  variant={'outlined'}
                                  // size={'small'}
                                  component={TextInput}
                              />
                              <Field
                                  required
                                  fullWidth
                                  name={'startDate'}
                                  label={'Pradžia'}
                                  // size={'small'}
                                  component={DatePicker}
                              />
                              <Field
                                  required
                                  fullWidth
                                  name={'endDate'}
                                  label={'Pabaiga'}
                                  variant={'outlined'}
                                  // size={'small'}
                                  component={DatePicker}
                              />
                              <Field
                                  required
                                  fullWidth
                                  name={'location'}
                                  label={'Išdavėjas'}
                                  variant={'outlined'}
                                  // size={'small'}
                                  component={TextInput}
                              />
                              <Field
                                  fullWidth
                                  required
                                  name="userId"
                                  label="Vartotojas"
                                  component={TextInput}
                                  select
                                  // value={isReviewMode && definition.fieldSet}
                                  // renderTitle={isReviewMode && definition.fieldSet.title}
                                  disabled={isEdit || props.user.privilege !== 'ADMIN'}
                              >
                                  {users.map((user) => (
                                      <MenuItem key={user.id} value={user.id}>
                                          {user.name}
                                      </MenuItem>
                                  ))}
                              </Field>
                              <div className={classes.buttonsDiv}>
                                  <Button
                                      variant="contained"
                                      type="button"
                                      onClick={handleClose}
                                  >
                                      Uždaryti
                                  </Button>
                                  <Button
                                      variant="contained"
                                      color={'primary'}
                                      type="submit"
                                  >
                                      Pateikti
                                  </Button>
                              </div>
                          </form>
                      )}/>
            )}

        </div>
    );
}

const mapStateToProps = (state) => ({
    SeminarsIsLoading: state.seminars.isLoading,
    SeminarsError: state.seminars.error,
    UsersIsLoading: state.users.isLoading,
    UsersError: state.users.error,
    user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
    postSeminar: (seminar, filterParams, handleClose) => dispatch(postSeminar(seminar, filterParams, handleClose)),
    editSeminar: (seminar, seminarId, filterParams, handleClose) => dispatch(editSeminar(seminar, seminarId, filterParams, handleClose)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CreateSeminar));