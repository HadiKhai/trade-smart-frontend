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
import {useTrade} from "../../store/hooks/trade/useTrade";
import {GetLeaderboard} from "../../api/queries";

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
    }
))



export default function Leaderboard() {
    const classes = useStyle();

    const [leaderboard,setLeaderboard] = useState([])

    GetLeaderboard(0).then(res => setLeaderboard(res))

    return (
        <GridContainer style={{paddingRight: '20px'}}>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="info">
                        <h4 className={classes.cardTitleWhite}>Leaderboard</h4>
                    </CardHeader>
                    <CardBody>
                        <TableContainer>
                            <Table  stickyHeader style={{backgroundColor: "#f0f0f0"}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Rank</TableCell>
                                        <TableCell align="center">Username</TableCell>
                                        <TableCell align="center">Score</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {leaderboard?.length !==0 && leaderboard?.length !==0 &&
                                    leaderboard?.map((user) => (
                                        <TableRow key={user.userId} className={classes.root}>
                                            <TableCell align="center">{leaderboard.indexOf(user)+1} </TableCell>
                                            <TableCell align="center">{user.username} </TableCell>
                                            <TableCell align="center">{user.score} </TableCell>
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
