import React from "react";
import TextInput from "../../components/TextInput/TextInput";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import styles from "./styles";
import {
    Form, Field,
} from 'react-final-form';
import {postUser, editUser} from '../../state/users/usersActions';
import {connect} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckBox from "../../components/Checkbox/Checkbox";
import withStyles from "@material-ui/core/styles/withStyles";

const useStyles = makeStyles(styles);

function validate(values, isEdit) {
    const errors = {};
    const requiredFields = [
        'name',
        'username',
    ];
    if(!isEdit) requiredFields.push('password');
    else if(values.password && values.password.length < 8) errors['password'] = 'Ne trumpesnis nei 8 simboliai';
    requiredFields.forEach((field) => {
        if (!values[field]) {
            errors[field] = 'Būtinas laukas';
        } else if(values[field].length < 8){
            errors[field] = 'Ne trumpesnis nei 8 simboliai';
        }
    });
    return errors;
}

function handleSubmit(values, postUser, editUser, isEdit, handleClose, filterParams) {
    const postValues = { ...values};
    if(isEdit) editUser(postValues, values.id, filterParams, handleClose);
    else postUser(postValues, filterParams, handleClose);
}

function CreateUser(props) {
    const {handleClose, user, isEdit, UsersIsLoading, error, filterParams} = props;
    let initialValues = {isAdmin: false};
    if(isEdit) {
        const {privilege, ...tempValues} = user;
        initialValues = {
            ...tempValues,
            isAdmin: privilege === 'ADMIN',
        };
    }
    const classes = useStyles();
    return (
        <div className={classes.mainDiv}>
            {error && (
                <p className={classes.error}>{error}</p>
            )}
            {UsersIsLoading ? (
                <CircularProgress/>
            ) : (
                <Form onSubmit={(values) => {handleSubmit(values, props.postUser, props.editUser, isEdit, handleClose, filterParams)}}
                      validate={(values) => validate(values, isEdit)}
                      initialValues={initialValues}
                      render={({ handleSubmit, values }) => (
                          <form onSubmit={handleSubmit} noValidate>
                              <Field
                                  required
                                  fullWidth
                                  name={'name'}
                                  label={'Vardas'}
                                  variant={'outlined'}
                                  // size={'small'}
                                  component={TextInput}
                              />
                              <Field
                                  required
                                  fullWidth
                                  name={'username'}
                                  label={'Vartotojo Vardas'}
                                  variant={'outlined'}
                                  // size={'small'}
                                  component={TextInput}
                              />
                              <Field
                                  required={!isEdit}
                                  fullWidth
                                  name={'password'}
                                  label={isEdit ? 'Naujas Slaptažodis' : 'Slaptažodis'}
                                  variant={'outlined'}
                                  // size={'small'}
                                  component={TextInput}
                              />
                              <CheckBox
                                  label='Administratorius'
                                  name={`isAdmin`}
                              />
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
    UsersIsLoading: state.users.isLoading,
    error: state.users.error,
});

const mapDispatchToProps = (dispatch) => ({
    postUser: (seminar, filterParams, handleClose) => dispatch(postUser(seminar, filterParams, handleClose)),
    editUser: (seminar, seminarId, filterParams, handleClose) => dispatch(editUser(seminar, seminarId, filterParams, handleClose)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(CreateUser));