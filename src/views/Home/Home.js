 import React, {useEffect, useState} from "react";
import TradingViewWidget, {BarStyles, Themes} from 'react-tradingview-widget';

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// core components
import {infoColor} from "../../assets/jss/material-dashboard-react";
import {TableCell, TableContainer, TextField,} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
 import {useStocks} from "../../store/hooks/stocks/useStocks";
 import {GetStockInfo} from "../../api/queries";
 import GridContainer from "../../components/Grid/GridContainer";
 import GridItem from "../../components/Grid/GridItem";
 import Table from "@material-ui/core/Table";
 import TableHead from "@material-ui/core/TableHead";
 import TableRow from "@material-ui/core/TableRow";
 import TableBody from "@material-ui/core/TableBody";
 import {Link} from "react-router-dom";
 import CardHeader from "../../components/Card/CardHeader";
 import CardBody from "../../components/Card/CardBody";
 import StockTable from "../../components/Table/StockTable";
 import Card from "../../components/Card/Card";

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
    }
))

export default function Home() {
    const classes = useStyle();

    const {stocks} = useStocks()


    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="info">
                        <h4 className={classes.cardTitleWhite}>Hottest Stocks</h4>
                    </CardHeader>
                    <CardBody>
                        <TableContainer>
                            <Table  stickyHeader style={{backgroundColor: "#f0f0f0"}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Stock Name</TableCell>
                                        <TableCell align="center">Current Price</TableCell>
                                        <TableCell align="center">Change</TableCell>
                                        <TableCell align="center">Trade</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {stocks.length !==0 &&
                                    stocks.sort((a, b) => parseFloat(b.change) - parseFloat(a.change)).slice(0, 2).map((stock) => (
                                        <TableRow  className={classes.root}>
                                            <TableCell align="center">{stock.name} </TableCell>
                                            <TableCell align="center">{stock.c}</TableCell>
                                            <TableCell align="center">{stock.change}%</TableCell>
                                            <TableCell align="center">
                                                <Link
                                                    to={"/app/trade/" + stock.id}>
                                                    <Button>Trade</Button>
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
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
            </GridItem>
        </GridContainer>
    );
}

