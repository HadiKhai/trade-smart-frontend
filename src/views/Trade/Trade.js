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
import CardHeader from "../../components/Card/CardHeader"
import CardBody from "../../components/Card/CardBody";
import Card from "../../components/Card/Card";
import StockTable from "../../components/Table/StockTable";
import {useParams} from "react-router";
import TradingViewWidget, {BarStyles, Themes} from "react-tradingview-widget";
import {TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {GetStocks} from "../../api/queries";
import {infoColor} from "../../assets/jss/material-dashboard-react";
import {useStocks} from "../../store/hooks/stocks/useStocks";

const useStyle = makeStyles((theme) => ({
        cardCategoryWhite: {
            "&,& a,& a:hover,& a:focus": {
                color: "rgba(255,255,255,.62)",
                margin: "0",
                fontSize: "14px",
                marginTop: "0",
                marginBottom: "0"
            },
            "&:hover": {
                color: "#FFFFFF"
            }
        },
        textf: {
            marginBottom: 10,
            width: "100%",
            color: "white",
            "&,& a,& a:hover,& a:focus": {
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
        buy: {
            borderRadius: "3px",
            backgroundColor: '#00CA4E',
            color: "white",
            textDecoration: "none",
            marginLeft: 2,
            marginRight: 1,
            '&:hover': {
                backgroundColor: 'transparent',
                color: '#00CA4E',
            },
            width: "60%"
        },
        sell: {
            borderRadius: "3px",
            width: "60%",
            color: "white",
            backgroundColor: '#FF605C',
            textDecoration: "none",
            marginLeft: 1,
            marginRight: 2,
            '&:hover': {
                backgroundColor: 'transparent',
                color: '#FF605C',
            }

        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        radio: {
            '&$checked': {
                color: infoColor[0]
            }
        },
        bet: {
            alignSelf: "center",
            backgroundColor: "#292d35",
            border: "1px solid",
            width: "100%"
        },
        label: {

            color: "white",
            margin: "2",
            padding: 2
        },

        input: {

            top: 2,

            padding: 2,

            paddingLeft: 10,

            color: "white",

            border: `1px solid ${infoColor[0]}`,

            outline: `1px solid transparent`, // we use a transparent outline here so the component doesn't move when focused


            borderRadius: "4px",

            "&$focused": {

                border: `1px solid ${infoColor[0]}`,

                borderRadius: "4px",


            }

        },
        focused: {},
        searchStock: {
            width: "100%"
        },
        search: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        main: {
            height: 50,
            margin:10,
            marginBottom:20
        },
    }
))



export default function Trade() {
    const classes = useStyle();
    const {stocks} = useStocks()
    const [stockSearch, setStockSearch] = useState('');
    const [search, setSearch] = useState(false)
    const {stockId} = useParams();

    const [id,setId] = useState(stockId)
    const [symbol,setSymbol] = useState("")



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
    // useEffect(()=> {
    //     console.log(stockId)
    //     if(stocks.length!==0 && stockId!==":stockId") {
    //         const temp = stocks.filter((e) => e.id == stockId)[0]
    //         setSymbol(temp.abbreviation)
    //     }
    //
    // },[stocks])
    //

    const findStockByName = (name) => {
        return stocks.find((x) => {
            return x.abbreviation === name
        })
    }

    const findStockById = (id) => {
        return stocks.find((x) => {
            return x.id === id
        })
    }


    const showGraphs = () => {
        if(findStockByName(stockSearch) || findStockById(id)){
            return true
        }
        return false
    }

    const findStock = () => {
        const stockBySearch = findStockByName(stockSearch)
        const stockById = findStockById(id)

        if(stockBySearch){
            return stockBySearch
        }
        if(id!=="") {
            return stockById
        }
    }

    console.log(findStock())
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12} >
                <Box display="flex" align="left" flexdirection="row" className={classes.main}>
                    <Box className={classes.search}>
                        {icon()}

                    </Box>
                    <Box className={classes.searchStock}>
                        {search && <SearchBar
                            value={stockSearch}
                            onChange={(newValue) => {
                                setStockSearch(newValue)
                                setId("")
                            }}
                            onRequestSearch={(newValue) => setStockSearch(newValue)}
                            onCancelSearch={(() => setStockSearch(""))}
                            style={{marginRight: 10, marginLeft: 10}}
                        />}
                    </Box>
                </Box>
            </GridItem>
            {showGraphs() &&
            <GridItem xs={12} sm={12} md={12}>
                <Box display="flex" align="left" flexdirection="row">
                    <Box>
                        <TradingViewWidget symbol={`NASDAQ:${findStock().abbreviation}`}
                                           style={BarStyles.LINE}
                                           theme={Themes.DARK}
                        />
                    </Box>
                    <Box flexGrow={1} display="flex" align="center" flexdirection="column" className={classes.bet}>

                        <Box p={3} flexGrow={1}>
                            <h3>
                                {findStock().c} $
                            </h3>
                            <TextField
                                id="standard-basic"
                                className={classes.textf}
                                InputLabelProps={{
                                    classes: {
                                        root: classes.label
                                    }
                                }}
                                placeholder="Amount"
                                InputProps={{
                                    classes: {
                                        root: classes.input,
                                        focused: classes.focused // we can't forget to pass this in or &$focused in our input class won't work
                                    },
                                }}
                            />
                            <Box display="flex" align="center" flexdirection="row">
                                <Box flexGrow={1}>
                                    <Button
                                        className={classes.buy}
                                        variant="contained"
                                    >
                                        Buy
                                    </Button>
                                </Box>
                                <Box flexGrow={1}>
                                    <Button
                                        className={classes.sell}
                                        variant="contained"
                                    >
                                        Sell
                                    </Button></Box>
                            </Box>

                        </Box>
                    </Box>
                </Box>
            </GridItem>
            }
        </GridContainer>
    );
}

