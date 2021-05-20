 import React from "react";
import TradingViewWidget, {BarStyles, Themes} from 'react-tradingview-widget';

// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// core components
import {infoColor} from "../../assets/jss/material-dashboard-react";
import {TextField,} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

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


    return (
        <Box display="flex" align="left" flexdirection="row" className={classes.main}>
            <Box>
                <TradingViewWidget symbol="NASDAQ:AAPL"
                                   style={BarStyles.LINE}
                                   theme={Themes.DARK}
                />
            </Box>
            <Box flexGrow={1} display="flex" align="center" flexdirection="column" className={classes.bet}>

                <Box p={3} flexGrow={1}>
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


    );
}

