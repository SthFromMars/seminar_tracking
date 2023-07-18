import React from "react";
import styles from "./styles";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(styles);

export default function (props) {
    const classes = useStyles();
    return(
        <div className={classes.mainDiv}>
            Ar tikrai norite ištrinti {props.user ? 'vartotoją' : 'seminarą'} {props.getName(props.object)}?<br/>
            {props.user && 'Tai ištrins ir visus jo seminarus.'}
            <div className={classes.buttonsDiv}>
                <Button
                    variant="contained"
                    type="button"
                    onClick={props.handleClose}
                >
                    Ne
                </Button>
                <Button
                    variant="contained"
                    color={'primary'}
                    onClick={props.handleConfirm}
                >
                    Taip
                </Button>
            </div>
        </div>
    )
}