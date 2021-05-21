import React, {useEffect, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import {
    Checkbox,
    FormControlLabel,
    TableCell,
    TableContainer,
    TableFooter,
    TablePagination
} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import Button from "@material-ui/core/Button";
import {GetStockInfo, GetStocks} from "../../api/queries";
import {useParams} from "react-router";
import {Link} from "react-router-dom";
import {useStocks} from "../../store/hooks/stocks/useStocks";

const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
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
    bet: {
        width: "100%"
    },
    search: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    main: {
        height: 50
    },
    cell:{

    }
};

const useStyles = makeStyles(styles);


export default function StockTable({filter}) {
    const classes = useStyles();

    const [stocksInfo,setStocksInfo] = useState({})
    const [filteredStocks,setFilteredStock] = useState([])
    const {stocks} = useStocks()

    useEffect(()=> {

            setFilteredStock(stocks)

        async function fetchMyAPI() {
            let obj = {}
            for (const stock of stocks) {
                const symbol = stock.abbreviation
                const resp =await GetStockInfo({symbol})
                obj[symbol]=resp
            }
            setStocksInfo(obj)
        }
        fetchMyAPI()

    },[stocks])

    useEffect(()=> {
        const temp = stocks.filter((e) => e.name.startsWith(filter))
        setFilteredStock(temp)
    },[filter])

    const colorChange = (stock) => {
        const currentPrice = stocksInfo[stock.abbreviation].c
        const closingPrice = stocksInfo[stock.abbreviation].pc
        if((currentPrice-closingPrice)<0){
            return "#FF605C"
        }
        else{
            return "#00CA4E"
        }
    }

    return (
        <TableContainer>
            <Table  stickyHeader style={{backgroundColor: "#f0f0f0"}}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Stock Name</TableCell>
                        <TableCell align="center">Stock Symbol</TableCell>
                        <TableCell align="center">Current Price</TableCell>
                        <TableCell align="center">Highest</TableCell>
                        <TableCell align="center">Lowest</TableCell>
                        <TableCell align="center">Opening Price</TableCell>
                        <TableCell align="center">Previous Closing Price</TableCell>
                        <TableCell align="center">Change</TableCell>
                        <TableCell align="center">Trade</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.keys(stocksInfo).length !==0 &&
                    filteredStocks.map((stock) => (
                        <TableRow  className={classes.root}>
                            <TableCell align="center">{stock.name} </TableCell>
                            <TableCell align="center">{stock.abbreviation} </TableCell>
                            <TableCell align="center">{stocksInfo[stock.abbreviation].c}</TableCell>
                            <TableCell align="center">{stocksInfo[stock.abbreviation].h}</TableCell>
                            <TableCell align="center">{stocksInfo[stock.abbreviation].l}</TableCell>
                            <TableCell align="center">{stocksInfo[stock.abbreviation].o}</TableCell>
                            <TableCell align="center">{stocksInfo[stock.abbreviation].pc}</TableCell>
                            <TableCell align="center" style={{color:colorChange(stock)}}>{((stocksInfo[stock.abbreviation].c-stocksInfo[stock.abbreviation].pc)*100/stocksInfo[stock.abbreviation].pc).toPrecision(2)}%</TableCell>
                            <TableCell align="center">
                                <Link
                                to={"/app/trade/" + stock.id}>
                                    Trade
                                </Link>
                            </TableCell>


                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
