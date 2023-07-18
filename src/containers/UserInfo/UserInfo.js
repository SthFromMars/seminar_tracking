import React from "react";
import TextInput from "../../components/TextInput/TextInput";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import styles from "./styles";
import {
    Form, Field,
} from 'react-final-form';
import {editUser} from '../../state/users/usersActions';
import {connect} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import {push} from "react-router-redux";

const useStyles = makeStyles(styles);

function validate(values) {
    const errors = {};
    const requiredFields = [
        'name',
        'username',
    ];
    if(values.password && values.password.length < 8) errors['password'] = 'Ne trumpesnis nei 8 simboliai';
    requiredFields.forEach((field) => {
        if (!values[field]) {
            errors[field] = 'Būtinas laukas';
        } else if(values[field].length < 8){
            errors[field] = 'Ne trumpesnis nei 8 simboliai';
        }
    });
    return errors;
}

function handleSubmit(values, editUser, push) {
    const postValues = { ...values};
    editUser(postValues, values.id, [
        {label: 'startIndex', value: 0},
        {label: 'entryNr', value: 10},
        {label: 'orderBy', value: 'name'},
        {label: 'orderDir', value: 'desc'},
    ], () => {push('/')});
}

function UserInfo(props) {
    const {UsersIsLoading, error} = props;
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <div className={classes.mainDiv}>
                {error && (
                    <p className={classes.error}>{error}</p>
                )}
                {UsersIsLoading ? (
                    <CircularProgress/>
                ) : (
                    <Form onSubmit={(values) => {handleSubmit(values, props.editUser, props.push)}}
                          validate={(values) => validate(values)}
                          initialValues={props.user}
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
                                      fullWidth
                                      name={'password'}
                                      label='Naujas Slaptažodis'
                                      variant={'outlined'}
                                      component={TextInput}
                                  />
                                  <div className={classes.buttonsDiv}>
                                      <Button
                                          variant="contained"
                                          color={'primary'}
                                          type="submit"
                                      >
                                          Išsaugoti
                                      </Button>
                                  </div>
                              </form>
                          )}/>
                )}
            </div>
        </Paper>
    );
}

const mapStateToProps = (state) => ({
    UsersIsLoading: state.users.isLoading,
    error: state.users.error,
    user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
    editUser: (seminar, seminarId, filterParams, handleClose) => dispatch(editUser(seminar, seminarId, filterParams, handleClose)),
    push: (link) => dispatch(push(link))
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(UserInfo));