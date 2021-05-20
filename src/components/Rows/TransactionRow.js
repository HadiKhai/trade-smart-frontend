import React, {useEffect, useState} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import {Link} from "react-router-dom";
import Collapse from "@material-ui/core/Collapse";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import tokens from "../../contracts/tokens";
import BigNumber from "bignumber.js";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import {useConnectWallet} from "../../store/hooks/wallet";
import {TextField} from "@material-ui/core";
import {GetAddressTotalBalance, PostAddFavorite, PostDeleteFavorite} from "../../api/queries";
import {useFetchStarred} from "../../store/hooks/vault/useFetchStarred";
import CardHeader from "../Card/CardHeader";

const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});


export function TransactionRow(props) {
    const {row, balances,bought,sold} = props;
    const [open, setOpen] = useState(false);
    const [favorite,setFavorite] = useState(false)
    const [description,setDescription] = useState("")
    const classes = useRowStyles();
    const { web3, address } = useConnectWallet();
    const { starred,addressFavList,fetchStarred } = useFetchStarred()
    const [bnbBalance,setBnbBalance] = useState("0")
    const [totalBalance,setTotalBalance] = useState("fetching")
    const tokenIds = tokens.map((token) => {
        return token[0].id
    });

    const tokenVaultTokenIds = tokens.map((token) => {
        return token[1].id
    });

    const byDecimals = (number, tokenDecimals = 18) => {
        const decimals = new BigNumber(10).exponentiatedBy(tokenDecimals);
        return new BigNumber(number).dividedBy(decimals);
    }

    const starAddress = () => {
        if(!favorite) {
            PostAddFavorite(address, row.address, description).then(r => {
                    setFavorite(true)
                    fetchStarred({address})
                }
            )
        }
        else{
            PostDeleteFavorite(address,row.address).then(r=> {
                setFavorite(false)
                setDescription("")
                fetchStarred({address})
            })
        }
    }

    useEffect(()=> {
        if(addressFavList.includes(row.address)){
            setFavorite(true)
            const temp = starred.filter((a)=> {
                return a.favorited_address === row.address
            })
            setDescription(temp[0].address_description)
        }
    },[starred])

    useEffect(()=>{
        if(web3!==null) {
            web3.eth.getBalance(row.address).then((a) => {
                    setBnbBalance(a)
                }
            )
        }
        GetAddressTotalBalance(row.address).then((a)=> setTotalBalance(a.data))
    },[])
    return (
        <React.Fragment>
            <TableRow  className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row"><Link
                    to={"/admin/address/" + row.address}>{row.address.slice(2,7)}...{row.address.slice(row.address.length-3)}</Link></TableCell>
                {bought && <TableCell>{row.total_bought.toFixed(2)}</TableCell>}
                {sold && <TableCell>{row.total_sold.toFixed(2)}</TableCell>}
                {/*<TableCell>{row.net}</TableCell>*/}
                {/*<TableCell>{row.volume}</TableCell>*/}
                {balances && tokenIds.map((token,key) => (
                    <TableCell>{byDecimals(balances[token]).toFixed(2)}({byDecimals(balances[tokenVaultTokenIds[key]]).toFixed(2)})</TableCell>
                ))}
                <TableCell>
                    {byDecimals(bnbBalance).toFixed(2)}
                </TableCell>
                <TableCell>
                    {totalBalance}
                </TableCell>
                <TableCell>
                    { !favorite &&
                        <TextField
                            onChange={(e) => setDescription(e.target.value)}
                            variant="outlined"
                            value={description}
                        />
                    }
                    { favorite
                        &&
                    <h4 >{description}</h4>
                    }
                </TableCell>
                <TableCell>
                    <IconButton size="small" onClick={starAddress}>
                        {favorite ? <StarIcon/> : <StarBorderIcon/>}
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Details
                            </Typography>
                            <Typography>
                                {row.address}
                            </Typography>
                            <TableCell>Latest buy
                                date: {new Date(row.latest_buy_date * 1000).toLocaleDateString("en-US")}</TableCell>
                            <TableCell>Latest sell
                                date: {row.latest_sell_date===null? <span>Never Sold</span>:
                                new Date(row.latest_sell_date * 1000).toLocaleDateString("en-US")}</TableCell>
                            <TableCell>Buy Transaction Count:
                                {row.buy_tx_count}</TableCell>
                            <TableCell>Sell Transaction Count:
                                { row.sell_tx_count}</TableCell>
                            <TableCell>Total Transaction Count:
                                {row.total_tx_count}</TableCell>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

TransactionRow.propTypes = {
    row: PropTypes.shape({
        address: PropTypes.string,
        total_bought: PropTypes.number,
        total_sold: PropTypes.number,
        net: PropTypes.number,
        volume: PropTypes.number,
        buy_tx_count: PropTypes.string,
        sell_tx_count: PropTypes.string,
        total_tx_count: PropTypes.string,
        latest_buy_date: PropTypes.string,
        latest_sell_date: PropTypes.string,

    }).isRequired,
};
