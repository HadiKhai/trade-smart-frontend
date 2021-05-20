import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    },
}));

export default function Address() {
    const classes = useStyles();

    const [balance, setBalance] = useState()
    const [type, setType] = useState('net');
    const [time, setTime] = useState('day');
    const [rows, setRows] = useState([])
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0)
    const [count, setCount] = useState(1)
    const [limit, setLimit] = useState(10)
    const [address,setAddress] = useState('')

    return (
        <></>
    )
}
