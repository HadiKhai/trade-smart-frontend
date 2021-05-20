import React, {useEffect, useState} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import {Link} from "react-router-dom";
import BigNumber from "bignumber.js";
import {acsToken} from "../../contracts/tokens/acsToken";
import {acsAcsToken} from "../../contracts/tokens/acsAcsToken";
import {GetPrice} from "../../api/queries";
import tokens from "../../contracts/tokens";
import moment from "moment";
const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});


export function StatsRow({row,balances}) {
    const classes = useRowStyles();
    

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell component="th" scope="row">{row.date}</TableCell>  
                <TableCell>{parseFloat(row.amount).toFixed(2)}</TableCell>
            </TableRow>
        </React.Fragment>
    );
}

