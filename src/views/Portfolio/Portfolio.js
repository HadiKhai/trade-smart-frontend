import React, {useEffect, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {useUser} from "../../store/hooks/user/useUser";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Card from "../../components/Card/Card";
import Icon from "@material-ui/core/Icon";
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import EmailIcon from '@material-ui/icons/Email';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {TableContainer} from "@material-ui/core";
import {useStocks} from "../../store/hooks/stocks/useStocks";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";

// core components
const useStyle = makeStyles((theme) => ({
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
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        myCard: {
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '32px',
            marginBottom: '33px',
            fontSize: '20px',
            fontWeight: '600'
        },
        myCardWrapper: {
            margin: '10px',
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
    }
))



export default function Portfolio({filter}) {
    const classes = useStyle();

    const {userName, firstName, lastName, email, balance} = useUser();

    const [filteredStocks,setFilteredStock] = useState([])
    const {stocks} = useStocks()

    useEffect(()=> {
        const temp = stocks.filter((e) => e.name.startsWith(filter))
        setFilteredStock(temp)
    },[filter,stocks])

    const colorChange = (stock) => {
        const currentPrice = stock.c
        const closingPrice =stock.pc
        if((currentPrice-closingPrice)<0){
            return "#FF605C"
        }
        else{
            return "#00CA4E"
        }
    }


    return (

        <GridContainer style={{paddingRight: '20px'}}>
            <GridItem xs={3} sm={3} md={3} className={classes.myCardWrapper}>
                <div variant="outlined" className={classes.myCard}>
                    <AccountCircleIcon style={{transform: 'scale(1.3) translateY(4px) translateX(-4px)'}}/>
                    {userName}
                </div>
            </GridItem>
            <GridItem xs={3} sm={3} md={3} className={classes.myCardWrapper}>
                <div variant="outlined" className={classes.myCard}>
                    <EmailIcon style={{transform: 'scale(1.3) translateY(4px) translateX(-4px)'}}/>
                    {email}
                </div>
            </GridItem>
            <GridItem xs={3} sm={3} md={3} className={classes.myCardWrapper}>
                <div variant="outlined" className={classes.myCard}>
                    <AccountBalanceWalletIcon style={{transform: 'scale(1.3) translateY(3px) translateX(-4px)'}}/>
                    ${balance}
                </div>
            </GridItem>


            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="info">
                        <h4 className={classes.cardTitleWhite}>Owned Shares</h4>
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
                        {stocks.length !==0 &&
                        filteredStocks.map((stock) => (
                            <TableRow  className={classes.root}>
                                <TableCell align="center">{stock.name} </TableCell>
                                <TableCell align="center">{stock.abbreviation} </TableCell>
                                <TableCell align="center">{stock.c}</TableCell>
                                <TableCell align="center">{stock.h}</TableCell>
                                <TableCell align="center">{stock.l}</TableCell>
                                <TableCell align="center">{stock.o}</TableCell>
                                <TableCell align="center">{stock.pc}</TableCell>
                                <TableCell align="center" style={{color:colorChange(stock)}}>{((stock.c-stock.pc)*100/stock.pc).toPrecision(2)}%</TableCell>
                                <TableCell align="center">
                                    <Link
                                        to={"/app/trade/" + stock.id}>
                                        <Button>
                                            Trade</Button>
                                    </Link>
                                </TableCell>


                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
                    </CardBody>
                </Card>
            </GridItem>

            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="info">
                        <h4 className={classes.cardTitleWhite}>Transactions</h4>
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
                                    {stocks.length !==0 &&
                                    filteredStocks.map((stock) => (
                                        <TableRow  className={classes.root}>
                                            <TableCell align="center">{stock.name} </TableCell>
                                            <TableCell align="center">{stock.abbreviation} </TableCell>
                                            <TableCell align="center">{stock.c}</TableCell>
                                            <TableCell align="center">{stock.h}</TableCell>
                                            <TableCell align="center">{stock.l}</TableCell>
                                            <TableCell align="center">{stock.o}</TableCell>
                                            <TableCell align="center">{stock.pc}</TableCell>
                                            <TableCell align="center" style={{color:colorChange(stock)}}>{((stock.c-stock.pc)*100/stock.pc).toPrecision(2)}%</TableCell>
                                            <TableCell align="center">
                                                <Link
                                                    to={"/app/trade/" + stock.id}>
                                                    <Button>
                                                        Trade</Button>
                                                </Link>
                                            </TableCell>


                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </CardBody>
                </Card>
            </GridItem>

        </GridContainer>
    );
}
