import React, {useEffect, useState} from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// core components
import SearchBar from "material-ui-search-bar";
import SearchIcon from '@material-ui/icons/Search';
import Box from "@material-ui/core/Box";
import CloseIcon from '@material-ui/icons/Close';
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import CardHeader from "../../components/Card/CardHeader";
import {TableCell, TableContainer, TableFooter} from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import CardBody from "../../components/Card/CardBody";
import Card from "../../components/Card/Card";
import {GetStockInfo, GetStocks} from "../../api/queries";
import Button from "@material-ui/core/Button";

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

export default function Stocks() {
    const classes = useStyles();

    const [stockSearch, setStockSearch] = useState('')
    const [search, setSearch] = useState(false)
    const [stocks, setStocks] = useState([])
    const [stocksInfo,setStocksInfo] = useState({})

    const icon = () => {
        if (search) {
            return (<CloseIcon onClick={() => {
                setSearch(false)
            }} style={{cursor: "pointer"}}/>)
        }
        return (<SearchIcon onClick={() => {
            setSearch(true)
        }} style={{cursor: "pointer"}}/>)
    }

    useEffect(()=> {
        GetStocks().then((res)=>{
            setStocks(res)
        })
    },[])

    useEffect(()=> {
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

    console.log(stocksInfo)
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Box display="flex" align="left" flexdirection="row" className={classes.main}>
                    <Box className={classes.search}>
                        {icon()}

                    </Box>
                    <Box className={classes.bet}>
                        {search && <SearchBar
                            value={stockSearch}
                            onChange={(newValue) => setStockSearch(newValue)}
                            onRequestSearch={(newValue) => setStockSearch(newValue)}
                            onCancelSearch={(() => setStockSearch(""))}
                            style={{marginRight: 10, marginLeft: 10}}
                        />}
                    </Box>
                </Box>
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="info">
                            <h4 className={classes.cardTitleWhite}>Stocks</h4>
                        </CardHeader>
                        <CardBody>
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
                                        stocks.map((stock) => (
                                         <TableRow  className={classes.root}>
                                            <TableCell align="center">{stock.name} </TableCell>
                                            <TableCell align="center">{stock.abbreviation} </TableCell>
                                            <TableCell align="center">{stocksInfo[stock.abbreviation].c}</TableCell>
                                            <TableCell align="center">{stocksInfo[stock.abbreviation].h}</TableCell>
                                            <TableCell align="center">{stocksInfo[stock.abbreviation].l}</TableCell>
                                            <TableCell align="center">{stocksInfo[stock.abbreviation].o}</TableCell>
                                            <TableCell align="center">{stocksInfo[stock.abbreviation].pc}</TableCell>
                                            <TableCell align="center" style={{color:colorChange(stock)}}>{((stocksInfo[stock.abbreviation].c-stocksInfo[stock.abbreviation].pc)*100/stocksInfo[stock.abbreviation].pc).toPrecision(2)}%</TableCell>
                                            <TableCell align="center"><Button>
                                                Trade
                                            </Button>
                                            </TableCell>


                                         </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TableFooter>
                                {/*<TableRow>*/}
                                {/*    <TablePagination*/}
                                {/*        rowsPerPageOptions={[5, 10]}*/}
                                {/*        colSpan={3}*/}
                                {/*        count={(count)} //to make it an int*/}
                                {/*        rowsPerPage={rowsPerPage}*/}
                                {/*        onChangeRowsPerPage={handleChangeRowsPerPage}*/}
                                {/*        page={page}*/}

                                {/*        onChangePage={handleChangePage}*/}
                                {/*        SelectProps={{*/}
                                {/*            inputProps: {'aria-label': 'rows per page'},*/}
                                {/*            native: true,*/}
                                {/*        }}*/}
                                {/*    />*/}
                                {/*</TableRow>*/}
                            </TableFooter>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridItem>
        </GridContainer>

    );
}

