import React, {useEffect, useState} from "react";

import { makeStyles } from "@material-ui/core/styles";

// core components

import {useSelector} from "react-redux";
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Button from "@material-ui/core/Button";
import {infoColor} from "../../assets/jss/material-dashboard-react";
import {CheckEmail, CheckUsername, DeleteDevKey, GenerateDevKey, GetStocks, SendPrediction} from "../../api/queries";
import {Backdrop, Fade, InputAdornment, Modal, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
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
    wallet: {
      width: "auto",
      transition: "all 300ms linear",
      borderRadius: "3px",
      position: "relative",
      backgroundColor: "transparent",
      color: infoColor[0],
      borderColor: infoColor[0],
      textDecoration: "none",
    },
  centerText: {
    width: "100%",
    textAlign: "center"
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '4px solid #5eb5f8',
    borderRadius: 20,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width:"30%"
  },
  textf: {
    margin: theme.spacing(0, 1, 3, 1),
    width: "95%"
  },
}));



export default function Signals() {
  const classes = useStyles();

  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1)

  const [stocks, setStocks] = useState([])
  const [date, setDate] = useState(tomorrow)
  const [closingPrice, setClosingPrice] = useState(0)
  const [stock, setStock] = useState({})
  const [openModal, setOpenModal] = useState(false);
  const [statusDev, setStatusDev] = useState(false)
  const [devKey, setDevKey] = useState("")

  useEffect(()=> {
    GetStocks().then((res)=>{
      setStocks(res)
    })
  },[])

  const openPredictions = (dev) => {
    setStatusDev(dev)
    setOpenModal(true)
  }

  const submitPrediction = () => {
    console.log(stock)
    console.log(date)
    console.log(closingPrice)

    let day = date.getDate()
    let month = date.getMonth()+1
    let year = date.getFullYear()

    console.log({ day, month, year, closingPrice})
    SendPrediction(stock.id, day, month, year, closingPrice).then(() => {setClosingPrice(0)})
  }

  const generateDevKey = () => {
    GenerateDevKey().then((key) => {
      console.log(key.devToken)
      setDevKey(key.devToken)
    })
  }

  const deleteDevKey = () => {
    DeleteDevKey().then(()=>{setDevKey("")})

  }

  return (
      <GridContainer>
        <GridItem xs={2} sm={2} md={2} >
          <Button
              variant="outlined"
              className={classes.wallet}
              onClick={() => {openPredictions(false)}
              }
          >
            Send Prediction
          </Button>
        </GridItem>
        <GridItem xs={2} sm={2} md={2} >
          <Button
              variant="outlined"
              className={classes.wallet}
              onClick={() => {openPredictions(true)}}
          >
            I am a developer
          </Button>
        </GridItem>


        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={openModal}
            onClose={() => setOpenModal(false)}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
        >
          <Fade in={openModal}>
            <div className={classes.paper}>
              {!statusDev &&
              <>
                <h2 className={classes.centerText}>Submit Prediction</h2>
                <GridContainer
                    className={classes.container} maxWidth="xs">
                  <Grid xs={12} md={12} lg={12}>
                    <FormControl variant="outlined"  className={classes.textf}>
                      <InputLabel>Stock</InputLabel>
                      <Select
                          label="Stock"
                          onChange={(newValue) => setStock(newValue.target.value)}
                          value={stock.abbreviation }
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        {stocks.map((stock) => (
                            <MenuItem value={stock}>{stock.abbreviation}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid xs={12} md={12} lg={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                      style={{ marginBottom: "40px", width: "100%", marginLeft: "8px", paddingRight: "8px"}}
                      minDate={tomorrow}
                      margin="normal"
                      id="date-picker-dialog"
                      label="Date picker dialog"
                      format="MM/dd/yyyy"
                      value={date}
                      onChange={(date) => setDate(date)}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                  />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid xs={12} md={12} lg={12}>
                    <TextField
                        className={classes.textf}
                        label='Closing price'
                        number
                        variant="outlined"
                        onChange={(newValue) => setClosingPrice(newValue.target.value)}
                        value={closingPrice}
                    />
                  </Grid>
                </GridContainer>
                <GridContainer
                    direction="column"
                    alignItems="center"
                    justify="center"
                >

                  <Grid xs={12} md={12} lg={12}>
                    <Button
                        variant="outlined"
                        className={classes.login}
                        onClick={() => submitPrediction()}
                    >
                      Submit Prediction
                    </Button>
                  </Grid>
                </GridContainer>
              </>}
              {
                statusDev &&
                <>
                  <h2 className={classes.centerText}>Dev Key and public API</h2>
                  <GridContainer
                      direction={"column"}
                      className={classes.container} maxWidth="xs">
                    <Grid xs={12} md={12} lg={12}>
                      <div>Public api</div>
                      <p>
                        POST https://smart-trade-ai.herokuapp.com/api/Prediction/Dev
                        <br/>
                        body: <br/>
                        &#123;
                        <br/>
                        "devKey": "string",
                        <br/>
                        "stockAbbrev": "string",
                          <br/>
                        "day": 0,
                            <br/>
                        "month": 0,
                              <br/>
                        "year": 0,
                                <br/>
                        "closingPrice": 0
                                  <br/>
                        }


                      </p>
                    </Grid>
                    <Grid xs={12} md={12} lg={12}>
                      {devKey}
                    </Grid>
                    <Grid xs={12} md={12} lg={12}>
                      <Button
                          variant="outlined"
                          className={classes.login}
                          onClick={() => {generateDevKey()}}
                      >
                        Generate Dev Key
                      </Button>
                      <span></span>
                      <Button
                          variant="outlined"
                          className={classes.login}
                          onClick={() => {deleteDevKey()}}
                      >
                        Delete Dev Key
                      </Button>
                    </Grid>
                  </GridContainer>
                </>
              }
            </div>


          </Fade>
        </Modal>


      </GridContainer>
  );
}
