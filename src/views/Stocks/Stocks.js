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
        height: 50,
        margin:10
    },
};

const useStyles = makeStyles(styles);

export default function Stocks() {
    const classes = useStyles();
    const [stockSearch, setStockSearch] = useState('')
    const [search, setSearch] = useState(false)
    const {stockId} = useParams();

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
                <Card>
                    <CardHeader color="info">
                        <h4 className={classes.cardTitleWhite}>Stocks</h4>
                    </CardHeader>
                    <CardBody>
                        <StockTable filter={stockSearch}/>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>

    );
}

