import Paper from "@material-ui/core/Paper";
import {Field, Form} from "react-final-form";
import TextInput from "../../components/TextInput/TextInput";
import CheckBox from "../../components/Checkbox/Checkbox";
import Button from "@material-ui/core/Button";
import React from "react";
import {fetchLogIn} from "../../state/authorization/authActions";
import {connect} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import {makeStyles} from "@material-ui/core/styles";
import styles from "./styles";

function validate(values) {
    const errors = {};
    const requiredFields = [
        'password',
        'username',
    ];
    requiredFields.forEach((field) => {
        if (!values[field]) {
            errors[field] = 'Būtinas laukas';
        }
    });
    return errors;
}

function handleSubmit(values, fetchLogIn) {
    console.log(JSON.stringify(values));
    fetchLogIn(values.username, values.password)
}

const useStyles = makeStyles(styles);

function LogIn(props) {
    const classes = useStyles();
    return (
        <Paper className={classes.paper}>
            <Form onSubmit={(values) => {handleSubmit(values, props.fetchLogIn)}}
                  validate={validate}
                  render={({ handleSubmit, values }) => (
                      <form onSubmit={handleSubmit} noValidate className={classes.form}>
                          <h1 className={classes.title}>Prisijungti</h1>
                          {props.error && (
                              <p className={classes.error}>{props.error}</p>
                          )}
                          <Field
                              fullWidth
                              name={'username'}
                              label={'Vartotojo vardas'}
                              variant={'outlined'}
                              // size={'small'}
                              component={TextInput}
                          />
                          <Field
                              fullWidth
                              name={'password'}
                              label={'Slaptažodis'}
                              type="password"
                              variant={'outlined'}
                              // size={'small'}
                              component={TextInput}
                          />
                          {/*<div className={classes.checkboxDiv}>*/}
                          {/*    <CheckBox*/}
                          {/*        label='Prisiminti mane'*/}
                          {/*        name={`rememberMe`}*/}
                          {/*    />*/}
                          {/*</div>*/}
                          <div className={classes.buttonsDiv}>
                              {props.loading ? (
                                  <div className={classes.loading}>
                                      <CircularProgress/>
                                  </div>
                                  ) : (
                                      <Button
                                          variant="contained"
                                          color={'primary'}
                                          type="submit"
                                          className={classes.button}
                                      >
                                          Prisijungti
                                      </Button>
                                  )
                              }
                          </div>
                      </form>
                  )}/>
        </Paper>
    )
}


const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
    fetchLogIn: (userName, password) => dispatch(fetchLogIn(userName, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);