import React, {useEffect, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import DateFnsUtils from "@date-io/date-fns";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import {useFetchTransactionData} from "../../store/hooks/vault/useFetchTransactionData";
import tokens from "../../contracts/tokens"
import {useFetchBalances} from "../../store/hooks/vault/useFetchBalances";
import {Summary_Table} from "../../store/types";
import {useConnectWallet} from "../../store/hooks/wallet";
import styles2 from "assets/jss/material-dashboard-react/components/tableStyle.js";
import {Checkbox, FormControlLabel, TableCell, TableContainer, TableFooter, TablePagination} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {TransactionRow} from "../../components/Rows/TransactionRow";
import TableBody from "@material-ui/core/TableBody";
import Table from "@material-ui/core/Table";
import {useChangeToken} from "../../store/hooks/globalSettings/useChangeToken";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

const useStyle = makeStyles((theme)=> ({
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
}));


export default function TransactionTable({table,operation,defaultTime,title,sold,bought}) {
    const [presetStarting, setPresetStarting] = useState(()=> {
        if (defaultTime) {
            return defaultTime
        } else {
            return 0
        }
    })

    const [customStarting, setCustomStarting] = useState(new Date());
    const [starting, setStarting] = useState(
        ()=> {
            if (defaultTime) {
                return  Math.round(new Date().getTime() / 1000) - defaultTime
            } else {
                return 0
            }
        }
    );
    const [customFlag, setCustomFlag] = useState(false);
    const [limit, setLimit] = useState(10)
    const [sortBy, setSortBy] = useState(()=>{
        if(operation){
            return operation
        }
        else{
            return "volume"
        }
    });
    const [page, setPage] = useState(0)
    const [addresses, setAddresses] = useState([])
    const [count, setCount] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [blacklist,setBlacklist] = useState(false)

    const {globalTokenAddress,globalPair}=useChangeToken()
    const {fetchTransactionData,fetchTransactionCountData,allData}  = useFetchTransactionData();
    const {Data,Count} = allData[table];

    const {allBalances, fetchBalances, fetchBalancesPending} = useFetchBalances();
    const balances = allBalances[table];

    const { web3 } = useConnectWallet();


    useEffect(() => {
        if(blacklist) {
            fetchTransactionData({pair:globalPair, token:globalTokenAddress, limit, page, starting, sortBy, blacklist:0,table}).then(
                (e) => {
                    setAddresses(e.map((a) => {
                        return a.address
                    }))
                }
            )
            fetchTransactionCountData({pair:globalPair, token:globalTokenAddress, starting,blacklist:0})
        }else{
            fetchTransactionData({pair:globalPair, token:globalTokenAddress, limit, page, starting, sortBy, blacklist:1,table}).then(
                (e) => {
                    setAddresses(e.map((a) => {
                        return a.address
                    }))
                }
            )
            fetchTransactionCountData({pair:globalPair, token:globalTokenAddress, starting,blacklist:1,table})
        }
    },[page, limit, globalPair, globalTokenAddress, starting, sortBy,blacklist]);

    useEffect(() => {
        setAddresses(Data.map((a)=> {
            return a.address
        }));
        if(Count.length!==0) {
            setCount(Count[0].count)
        }
    },[Data,Count])

    useEffect(() => {
        if(web3!==null) {
            fetchBalances({addresses, web3, table})
        }
    },[addresses,web3])
    const presetStartingChange = (event) => {
        setPresetStarting(event.target.value);
        if (event.target.value === -1) {
            setCustomFlag(true)
        } else if (event.target.value === 0) {
            setCustomFlag(false);
            setStarting(event.target.value);
        } else {
            setCustomFlag(false);
            setStarting(Math.round(new Date().getTime() / 1000) - event.target.value);
        }
    };


    const customStartingChange = (event) => {
        setCustomStarting(event);
        if (customStarting)
            setStarting(Math.round(event.getTime() / 1000));
        else
            setStarting(0)
    };

    const sortByChange = (event) => {
        setSortBy(event.target.value);
        setPage(0);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setLimit(event.target.value)
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const tokenIds = tokens.map((token) => {
        return `${token[0].id}(${token[1].id})`
    });

    const classes = useStyle();

    const handleBlackListChange = () => {
        const temp = blacklist
        setBlacklist(!temp)
    }


    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="info">
                        <h4 className={classes.cardTitleWhite}>{title}</h4>
                    </CardHeader>
                    <CardBody>
                        { operation===undefined &&
                            <FormControl className={classes.formControl}>
                                <InputLabel id="input-data-chart-label">Sort By</InputLabel>
                                <Select
                                    labelId="select-data-chart"
                                    id="data-chart"
                                    value={sortBy}
                                    onChange={(e) => {
                                        sortByChange(e);
                                    }}
                                >
                                    <MenuItem value={'total_bought'}>Bought</MenuItem>
                                    <MenuItem value={'total_sold'}>Sold</MenuItem>
                                    <MenuItem value={'net'}>Net</MenuItem>
                                    <MenuItem value={'volume'}>Volume</MenuItem>
                                </Select>
                            </FormControl>
                        }
                        <FormControl className={classes.formControl}>
                            <InputLabel id="input-time-scale-label">Starting</InputLabel>
                            <Select
                                labelId="select-time-scale"
                                id="time-scale"
                                value={presetStarting}
                                onChange={presetStartingChange}
                            >
                                <MenuItem value={-1}>Custom</MenuItem>
                                <MenuItem value={0}>All Time</MenuItem>
                                <MenuItem value={3600}>Last Hour</MenuItem>
                                <MenuItem value={14400}>Last 4 Hours</MenuItem>
                                <MenuItem value={43200}>Last 12 Hours</MenuItem>
                                <MenuItem value={86400}>Last Day</MenuItem>
                                <MenuItem value={259200}>Last 3 Days</MenuItem>
                                <MenuItem value={604800}>Last Week</MenuItem>
                                <MenuItem value={1209600}>Last 2 Weeks</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControlLabel className={classes.formControl}
                                          control={<Checkbox checked={blacklist} onChange={handleBlackListChange} name="Blacklist" />}
                                          label="Show Blacklist"
                        />
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DateTimePicker
                                clearable
                                value={customStarting}
                                onChange={customStartingChange}
                                style={{
                                    borderRadius: 5,
                                    paddingTop: 10,
                                    background: "white",
                                    display: customFlag ? "inline-flex" : "none"
                                }}
                            />
                        </MuiPickersUtilsProvider>
                        <TableContainer>
                            <Table stickyHeader style={{backgroundColor: "#f0f0f0"}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell/>
                                        <TableCell>Address</TableCell>
                                        { bought && <TableCell>Total Bought</TableCell>}
                                        { sold && <TableCell>Total Sold</TableCell>}
                                        {/*<TableCell>Net</TableCell>*/}
                                        {/*<TableCell>Volume</TableCell>*/}
                                        {tokenIds.map((globalToken) => (
                                            <TableCell>{globalToken}</TableCell>
                                        ))}
                                        <TableCell>BNB</TableCell>
                                        <TableCell>Total Balance</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Starred</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.keys(balances).length !== 0 &&
                                    Data.map((row) => (
                                        <TransactionRow bought={bought} sold={sold} id={row.address} key={row.address} row={row} balances={balances[row.address]} />
                                    ))
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10]}
                                    colSpan={3}
                                    count={(count)} //to make it an int
                                    rowsPerPage={rowsPerPage}
                                    onChangeRowsPerPage={handleChangeRowsPerPage}
                                    page={page}

                                    onChangePage={handleChangePage}
                                    SelectProps={{
                                        inputProps: {'aria-label': 'rows per page'},
                                        native: true,
                                    }}
                                />
                            </TableRow>
                        </TableFooter>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}
