import AppBar from "@material-ui/core/AppBar";
import {Toolbar} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import React from "react";
import styles from "./styles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {push} from 'react-router-redux'
import {connect} from "react-redux";
import ExitIcon from '@material-ui/icons/ExitToApp';
import {logOut} from "../../state/authorization/authActions";
import {withCookies} from "react-cookie";



const useStyles = makeStyles(styles);

function NavBar(props) {
    const classes = useStyles();
    return (
        <AppBar position="static">
            <Toolbar className={classes.mainDiv}>
                <b className={classes.title}>Prano Mašioto progimnazijos seminarų svetainė</b>
                <div className={classes.buttonDiv}>
                    <Button
                        className={classes.button}
                        onClick={() => props.push('/seminars')}
                    >
                        Seminarai
                    </Button>
                    {props.admin && (
                        <Button
                            className={classes.button}
                            onClick={() => props.push('/users')}
                        >
                            Vartotojai
                        </Button>
                    )}
                </div>
                <div className={classes.sideButtons}>
                    <Button
                        className={classes.button}
                        onClick={() => {props.push('/userInfo')}}
                    >
                        {props.user.name}
                    </Button>
                    <Button
                        className={classes.button}
                        onClick={() => {
                            props.cookies.remove('user');
                            props.logOut()
                        }}
                    >
                        <ExitIcon/>
                    </Button>
                </div>
            </Toolbar>
        </AppBar>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
    push: (to) => dispatch(push(to)),
    logOut: () => dispatch(logOut()),
});

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(NavBar));