import React, {useEffect, useState} from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {makeStyles} from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import {Link} from "react-router-dom";
import BigNumber from "bignumber.js";
import {acsToken} from "../../contracts/tokens/acsToken";
import {acsAcsToken} from "../../contracts/tokens/acsAcsToken";
import {GetPrice, PostAddFavorite, PostDeleteFavorite} from "../../api/queries";
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


export function SignalRow({row,balances}) {
    const classes = useRowStyles();
    const [price, setPrice] = useState(0)
    const [favorite,setFavorite] = useState(false)
    const [description,setDescription] = useState("")
    const { address } = useConnectWallet();
    const { starred,addressFavList,fetchStarred } = useFetchStarred()

    const {globalToken} = useChangeToken()

    const getPrice = async()=>{
        const unix = new Date(row.datetime).getTime() / 1000;
        let dollar;
        if(globalToken===ACS) {
            dollar = await GetPrice(unix.toString(), "acryptos");
        }
        else{
            dollar = await GetPrice(unix.toString(), "acryptosi");
        }
        setPrice(dollar)
    }

    useEffect(() => {
        getPrice()
    }, [row.hash,globalToken])


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

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell><Chip label="" color="secondary"/></TableCell>
                <TableCell component="th" scope="row"><Link to={"/admin/address/" + row.address}>{row.address.slice(2,7)}...{row.address.slice(row.address.length-3)}</Link></TableCell>
                <TableCell>{moment(row.datetime).format('D.MM H:mm')}</TableCell>
                <TableCell>{row.value.toFixed(2)}</TableCell>
                <TableCell>{price?price.toFixed(2):'0'}</TableCell>
                <TableCell>{balances? byDecimals(balances[acsToken.id]).toFixed(2) : null}</TableCell>
                <TableCell>{balances? byDecimals(balances[acsAcsToken.id]).toFixed(2) : null}</TableCell>
                <TableCell component="th" scope="row"><a href={'https://bscscan.com/tx/'+row.hash}>{row.hash.slice(2,7)}...{row.hash.slice(row.hash.length-3)}</a></TableCell>
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

