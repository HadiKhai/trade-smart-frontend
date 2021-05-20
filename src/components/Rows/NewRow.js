import React, {useEffect, useState} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import BigNumber from "bignumber.js";
import {GetPrice, PostAddFavorite, PostDeleteFavorite} from "../../api/queries";
import tokens from "../../contracts/tokens";
import moment from "moment";
import {useChangeToken} from "../../store/hooks/globalSettings/useChangeToken";
import {ACS} from "../../store/types/constants";
import {TextField} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import {useConnectWallet} from "../../store/hooks/wallet";
import {useFetchStarred} from "../../store/hooks/vault/useFetchStarred";
const useRowStyles = makeStyles({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
});


export function NewRow({row,balances}) {
    const classes = useRowStyles();
    const [favorite,setFavorite] = useState(false)
    const [description,setDescription] = useState("")
    const { address } = useConnectWallet();
    const { starred,addressFavList,fetchStarred } = useFetchStarred()

    const byDecimals = (number, tokenDecimals = 18) => {
        const decimals = new BigNumber(10).exponentiatedBy(tokenDecimals);
        return new BigNumber(number).dividedBy(decimals);
    }

    const tokenIds = tokens.map((token) => {
        return token[0].id
    });

    const tokenVaultTokenIds = tokens.map((token) => {
        return token[1].id
    });

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

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell component="th" scope="row"><Link to={"/admin/address/" + row.address}>{row.address.slice(2,7)}...{row.address.slice(row.address.length-3)}</Link></TableCell>
                <TableCell>{row.total.toFixed(2)}</TableCell>
                <TableCell>{row.tx_count}</TableCell>
                <TableCell>{moment(parseInt(row.first_op_date)*1000).format('D.MM H:mm')}</TableCell>
                {/* <TableCell>{price.toFixed(2)}</TableCell> */}
                {/* <TableCell>{balances? byDecimals(balances[acsToken.id]).toFixed(2) : null}</TableCell> */}
                {balances && tokenIds.map((token,key) => (
                    <TableCell>{byDecimals(balances[token]).toFixed(2)}({byDecimals(balances[tokenVaultTokenIds[key]]).toFixed(2)})</TableCell>
                ))}
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
        </React.Fragment>
    );
}

