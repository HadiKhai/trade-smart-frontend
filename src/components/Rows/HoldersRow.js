import React  from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});


export function HoldersRow({row,balances}) {
    const classes = useRowStyles();


    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell component="th" scope="row"><Link to={"/admin/address/" + row.address}>{row.address.slice(2,7)}...{row.address.slice(row.address.length-3)}</Link></TableCell>
                <TableCell>{parseFloat(row.balance.replace(',', '')).toFixed(2)}</TableCell>
                <TableCell>{row.percentage}</TableCell>
            </TableRow>
        </React.Fragment>
    );
}

