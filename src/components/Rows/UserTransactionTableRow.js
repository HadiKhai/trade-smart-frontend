import React,{useState, useEffect} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {makeStyles} from "@material-ui/core/styles";
import {GetPrice} from "../../api/queries";
import moment from "moment";
import {useChangeToken} from "../../store/hooks/globalSettings/useChangeToken";
import {ACS} from "../../store/types/constants";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});


export function UserTransactionTableRow(props) {
    const {row} = props;
    const [price, setPrice] = useState(0)
    const classes = useRowStyles();

    const {globalToken} = useChangeToken()

    const getPrice = async()=>{
        const unix = new Date(row.datetime).getTime() / 1000;
        let dollar;
        if(globalToken===ACS) {
            dollar = await GetPrice(unix.toString(), "acryptos");
        }
        else{
            dollar = await GetPrice(unix.toString(), "acryptosi");
        }
        setPrice(dollar)
    }

    useEffect(() => {
        getPrice()
    }, [row.hash,globalToken])

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell component="th" scope="row"><a
                    href={'https://bscscan.com/tx/' + row.hash}>{row.hash.slice(2,7)}...{row.hash.slice(row.hash.length-3)}</a></TableCell>
                <TableCell>{moment(row.datetime).format('D.M H:mm')}</TableCell>
                <TableCell>{row.value.toFixed(2)}</TableCell>
                <TableCell>{price.toFixed(2)}</TableCell>
            </TableRow>
        </React.Fragment>
    );
}

