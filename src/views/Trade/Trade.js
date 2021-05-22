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
import {Divider, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {GetStockNews, GetStocks, PostTrade} from "../../api/queries";
import {infoColor} from "../../assets/jss/material-dashboard-react";
import {useStocks} from "../../store/hooks/stocks/useStocks";
import {useUser} from "../../store/hooks/user/useUser";
import {useTrade} from "../../store/hooks/trade/useTrade";
import {useAuth} from "../../store/hooks/auth/useAuth";

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
    const [share,setShare] = useState(0)
    const [id,setId] = useState(stockId)
    const [symbol,setSymbol] = useState("")
    const {ownStocks,getOwnStocks} = useStocks()
    const {balance,getUserDetails} = useUser()
    const {trades,getTrade} =useTrade()
    const {id:userId} = useAuth()
    const [amountBuy,setAmountBuy] = useState('')
    const [amountBuyUSD,setAmountBuyUSD] = useState('')
    const [amountSell,setAmountSell] = useState('')
    const [amountSellUSD,setAmountSellUSD] = useState('')
    const [news,setNews] = useState([])
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
    //     // let a = 0
    //     // if(findStock() && ownStocks) {
    //     //     const temp = ownStocks.find((e)=>(e.id===findStock().id))
    //     //     if(temp){
    //     //         a = temp
    //     //     }
    //     // }
    //     // setShare(a)
    //     console.log("render")
    // },[findStock()])




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
        if(id!=="" && id!==":stockId") {
            return stockById
        }
    }

    useEffect(()=> {
        let a = 0
        const stockBySearch = findStockByName(stockSearch)
        const stockById = findStockById(stockId)


        if(stockById) {
            if(ownStocks.find((e)=>(e.id===stockById.id))){
                a = ownStocks.find((e) => (e.id === stockById.id)).share
            }
            else{
                a = 0
            }
        }

        if(stockBySearch){
            if(ownStocks.find((e)=>(e.id===stockBySearch.id))) {
                a = ownStocks.find((e) => (e.id === stockBySearch.id)).share
            }else{
                a = 0
            }
        }

        setShare(a)
    },[stocks,stockSearch,trades,ownStocks])

    const postYourTradeBuy = () => {
        PostTrade({type:"buy",stockId:findStock().id,quantity:amountBuy}).then(()=> {
            console.log("done")
            getTrade()
            getOwnStocks()
            getUserDetails({id:userId})
        })
    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    useEffect( () => {
        let today = new Date();
        let yesterday = new Date();
        yesterday.setDate(today. getDate() - 1);
        if(findStock()) {
            GetStockNews({
                symbol: findStock().abbreviation,
                from: formatDate(yesterday),
                to: formatDate(today)
            }).then((e) => {
                setNews(e)
                if(e.length===0){
                    setNews([])
                }
            })
        }
    },[stocks,stockSearch,trades,ownStocks])

    const postYourTradeSell = () => {
        PostTrade({type:"sell",stockId:findStock().id,quantity:amountSell}).then(()=> {
            console.log("done")
            getTrade()
            getOwnStocks()
            getUserDetails({id:userId})
        })
    }

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
                <>
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
                            <h4>
                                Current Price: {findStock().c} $
                            </h4>
                            <p>
                                Shares: {share.toPrecision(3)}

                            </p>
                            <GridContainer>
                                <GridItem xs={6} md={6} lg={6} style={{
                                    marginRight:0
                                }}>
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
                                            value={amountBuy}
                                            onChange={(newValue)=> {
                                                const temp = parseFloat(balance/findStock().c)
                                                console.log(temp)
                                                if(newValue.target.value>temp){

                                                    setAmountBuy(temp.toFixed(2))
                                                    setAmountBuyUSD(balance)
                                                }
                                                else {
                                                    const a = parseFloat(newValue.target.value * findStock().c)
                                                    setAmountBuy(newValue.target.value)
                                                    setAmountBuyUSD(a.toFixed(2))
                                                }
                                            }}
                                        />
                                        <TextField
                                            id="standard-basic"
                                            className={classes.textf}
                                            InputLabelProps={{
                                                classes: {
                                                    root: classes.label
                                                }
                                            }}
                                            placeholder="USD Amount"
                                            InputProps={{
                                                classes: {
                                                    root: classes.input,
                                                    focused: classes.focused // we can't forget to pass this in or &$focused in our input class won't work
                                                },
                                            }}
                                            value={amountBuyUSD}
                                            onChange={(newValue)=> {
                                                const temp = balance/findStock().c
                                                if(newValue.target.value>balance){
                                                    setAmountBuy(temp.toFixed(2))
                                                    setAmountBuyUSD(balance.toFixed(2))
                                                }
                                                else {
                                                    setAmountBuyUSD(newValue.target.value)
                                                    setAmountBuy(parseFloat(newValue.target.value / findStock().c).toFixed(2))
                                                }
                                            }}
                                        />
                                    <Button
                                        className={classes.buy}
                                        variant="contained"
                                        onClick={() => {
                                            postYourTradeBuy()
                                            setAmountBuyUSD(0)
                                            setAmountBuy(0)
                                        }}
                                    >
                                        Buy
                                    </Button>
                                </GridItem>
                                <GridItem xs={6} md={6} lg={6} style={{
                                    marginRight:0
                                }}>
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
                                        value={amountSell}
                                        onChange={(newValue)=> {
                                            if(newValue.target.value>share){
                                                setAmountSell(share.toFixed(2))
                                                setAmountSellUSD(parseFloat(share*findStock().c).toFixed(2))
                                            }
                                            else {
                                                setAmountSellUSD(parseFloat(newValue.target.value*findStock().c).toFixed(2))
                                                setAmountSell(newValue.target.value)
                                            }

                                        }}
                                    />
                                    <TextField
                                        id="standard-basic"
                                        className={classes.textf}
                                        InputLabelProps={{
                                            classes: {
                                                root: classes.label
                                            }
                                        }}
                                        placeholder="USD Amount"
                                        InputProps={{
                                            classes: {
                                                root: classes.input,
                                                focused: classes.focused // we can't forget to pass this in or &$focused in our input class won't work
                                            },
                                        }}
                                        value={amountSellUSD}
                                        onChange={(newValue)=> {
                                            if(newValue.target.value>share*findStock().c){
                                                setAmountSell(share.toFixed(2))
                                                setAmountSellUSD(parseFloat(share*findStock().c).toFixed(2))
                                            }
                                            else {
                                                setAmountSellUSD(newValue.target.value)
                                                setAmountSell(parseFloat(newValue.target.value / findStock().c).toFixed(2))
                                            }
                                        }}
                                    />
                                    <Button
                                        className={classes.sell}
                                        variant="contained"
                                        onClick={() => {
                                            postYourTradeSell()
                                            setAmountSellUSD(0)
                                            setAmountSell(0)
                                        }}
                                    >
                                        sell
                                    </Button>
                                </GridItem>
                            </GridContainer>

                        </Box>
                    </Box>
                </Box>
            </GridItem>
            <GridItem xs={12} md={12} lg={12} style={{
                marginRight:15
            }}>
                <Card>

                    <CardHeader color="info">
                        <h4 className={classes.cardTitleWhite}>{findStock().name} News</h4>
                    </CardHeader>
                    <CardBody>
                        {
                            news.length!==0 &&
                                findStock() &&
                            news.slice(0,3).map((e)=> (
                                <>
                                    <h3>
                                        <a href={e.url} target="_blank"> {e.headline}
                                        </a>
                                    </h3>
                                    <p>{e.summary}</p>
                                    <Divider/>
                                </>


                            ))
                        }
                    </CardBody>
                </Card>
            </GridItem>
            </>
            }
        </GridContainer>
    );
}

