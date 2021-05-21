import React, {useEffect, useState} from "react";
import GridItem from "../../components/Grid/GridItem";
import SearchBar from "material-ui-search-bar";
import GridContainer from "../../components/Grid/GridContainer";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Card from "../../components/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {infoColor} from "../../assets/jss/material-dashboard-react";
import {Backdrop, createMuiTheme, Fade, InputAdornment, Modal, TextField} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {GetDiscussions, GetStocks, postDiscussion} from "../../api/queries";
import {useAuth} from "../../store/hooks/auth/useAuth";
import {Link} from "react-router-dom";

export default function Discussion() {
    const [openModal, setOpenModal] = useState(false);
    const {id} = useAuth()

    const useStyles = makeStyles((theme) => ({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        clickable: {
            cursor: 'pointer',
            '&:hover': {
                textDecoration: 'underline',
            },
        },
        title: {
            fontSize: '20px',
            fontWeight: '500',

        },
        discussionCard: {
            marginTop: '15px',
            marginBottom: '5px',
            // border: '2px solid transparent',
            '&:hover': {
                cursor: 'pointer',
                transform: 'scale(1.005)',
                // borderColor: infoColor[0]
            },
        },
        createNew: {
            backgroundColor: infoColor[0],
            color: 'white',
            float: 'right',
            minHeight: '56px',
            '&:hover': {
                backgroundColor: infoColor[0],
            }
        }
    }));
    const classes = useStyles();

    const theme = createMuiTheme();

    const useCustomStyle = makeStyles(() => ({
        centerText: {
            width: "100%",
            textAlign: "center"
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
            width:"40%"
        },
        textf: {
            margin: theme.spacing(0, 1, 3, 1),
            width: "95%"
        },
        login: {
            margin: theme.spacing(0, 1, 3, 1),
            width: "100%",
            borderRadius: "3px",
            position: "relative",
            backgroundColor: "transparent",
            color: infoColor[0],
            borderColor: infoColor[0],
            textDecoration: "none",
            alignItems: 'center',
            justifyContent: 'center',
        },
        span: {
            cursor: "pointer",
            color: infoColor[0]
        },
        error: {
            color: "red"
        }

    }));
    const classesCustom = useCustomStyle();

    const [stocks, setStocks] = useState([])
    const [discussions, setDiscussions] = useState([])
    const [discussionName, setDiscussionName] = useState("")
    const [discussionNameError, setDiscussionNameError] = useState("")
    const [discussionStock,setDiscussionStock] = useState({})
    const [discussionDescription, setDiscussionDescription] = useState("")

    const [resultsFilter, setResultsFilter] = useState({})
    const [resultsSearchFilter, setResultsSearchFilter] = useState("")
    const [subscribedOnly, setSubscribedOnly] = useState({})

    const createDiscussion = () => {
        let title = discussionName
        let stockId = discussionStock.id
        postDiscussion({title, stockId}).then((res)=> {
            setOpenModal(false)
        }).catch((err)=> {
        })

    }

    useEffect(()=> {
        GetStocks().then((res)=>{
            setStocks(res)
        })
    },[])

    useEffect(()=> {
        let stockId = ""
        let search = ""
        GetDiscussions({stockId, search}).then((res)=>{
            setDiscussions(res)
        })
    },[])

    const refreshData = (stock, search, onlySubscribed) => {
        let stockId = stock.id==undefined?"":stock.id
        if(onlySubscribed) {
            GetDiscussions({stockId, search}).then((res) => {
                setDiscussions(res)
            })
        }
        else{
            GetDiscussions({stockId, search}).then((res) => {
                setDiscussions(res)
            })
        }
    }


    return (
      <GridContainer style={{paddingRight: '20px'}}>
          <GridItem xs={5} sm={5} md={5}>
              <SearchBar style={{minHeight: '56px'}}
                value={resultsSearchFilter}
                onChange={(newValue) => setResultsSearchFilter(newValue)}
                onRequestSearch={(text) => {
                    refreshData(resultsFilter, text, subscribedOnly)
                }}
              />
          </GridItem>
          <GridItem xs={2} sm={2} md={2}>
              <FormControl variant="outlined" fullWidth={true} >
                  <InputLabel>Filter</InputLabel>
                  <Select style={{backgroundColor: 'white'}}
                          onChange={(newValue) => {
                              setResultsFilter(newValue.target.value)
                              refreshData(newValue.target.value, resultsSearchFilter, subscribedOnly)
                          }}
                          value={resultsFilter}
                          label="Filter"
                  >
                      <MenuItem value="">
                          <em>None</em>
                      </MenuItem>
                      {/*{[...new Set(myDiscussions.map((discussion) => (discussion.stock)))].map((category) => (*/}
                      {/*    // <MenuItem value={category}>{category}</MenuItem>*/}
                      {/*// ))}*/}
                      {stocks.map((stock) => (
                          <MenuItem value={stock}>{stock.abbreviation}</MenuItem>
                      ))}
                  </Select>
              </FormControl>
          </GridItem>
          <GridItem xs={2} sm={2} md={2}>
              <FormControlLabel
                  label="View Only Subscribed"
                  control={
                      <Switch
                          checked={subscribedOnly.checked}
                          onChange={(newValue) => {
                              setSubscribedOnly(newValue.target.value)
                              refreshData(resultsFilter, resultsSearchFilter, true)
                          }
                          }
                          disabled={!id}
                          name="subscribedOnly"
                          color="primary"
                      />
                  }

              />
          </GridItem>
          <GridItem xs={2} sm={2} md={2}>
          <Button variant="contained" size="large" className={classes.createNew}
                  onClick={() => setOpenModal(!openModal)}
          disabled={!id}>
              Create New Discussion</Button>
          </GridItem>
          {discussions.map((discussion) => (
          <GridItem xs={12} sm={12} md={12}>
              <Link
                  to={"/app/discussion/" + discussion.id}>
              <Card variant="outlined"
                    onClick={() => {
                        console.log("clicked Card:"+discussion.id)

                    }}
                    className={classes.discussionCard}>
                  <CardContent>
                      <GridContainer>
                        <GridItem>
                            <Typography className={classes.clickable} color="textSecondary" gutterBottom
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            console.log("clicked Stock")
                                        }}>
                                {discussion.stockAbrv}
                            </Typography>
                        </GridItem>
                        <GridItem>
                            <Typography color="textSecondary" gutterBottom>
                                <span>Posted by </span>
                                <span onClick={(e) => {
                                    e.stopPropagation()
                                    console.log("clicked Author" + discussion.creatorUsername)
                                }}
                                      className={classes.clickable}>{discussion.creatorUsername}</span>
                            </Typography>
                        </GridItem>
                        <GridItem>
                            <Typography color="textSecondary" gutterBottom>
                                {discussion.createdAt}
                            </Typography>
                        </GridItem>
                      </GridContainer>
                      <Typography className={classes.title}>
                          {discussion.title}
                          <br />
                      </Typography>
                  </CardContent>
                  <CardActions>
                      <Button size="large">{discussion.messageCount} Comments</Button>
                      <Button size="large" onClick={(e) => {
                          e.stopPropagation()
                          console.log("Share Discussion:"+discussion.id)
                      }}>
                      Share</Button>
                  </CardActions>
              </Card>
              </Link>
          </GridItem>
          ))}

          <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classesCustom.modal}
              open={openModal}
              onClose={() => setOpenModal(false)}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                  timeout: 500,
              }}
          >
              <Fade in={openModal}>
                  <div className={classesCustom.paper}>
                          <h3 className={classesCustom.centerText}>Create a discussion</h3>
                          <GridContainer
                              className={classes.container} maxWidth="xs">
                              <Grid xs={12} md={12} lg={12}>
                                  <TextField
                                      className={classesCustom.textf}
                                      id="discussionTitle"
                                      onChange={(newValue) => setDiscussionName(newValue.target.value)}
                                      label="Title"
                                      variant="outlined"
                                      required
                                      value={discussionName}
                                      onBlur={(event) => setDiscussionNameError(discussionName.length>0?"":"Title is required!")}
                                      error={discussionNameError!==""}
                                      helperText={discussionNameError}
                                  />
                              </Grid>
                              <Grid xs={12} md={12} lg={12}>
                                  <TextField
                                      className={classesCustom.textf}
                                      id="description"
                                      label="Description"
                                      multiline
                                      rows={4}
                                      variant="outlined"
                                      onChange={(newValue) => setDiscussionDescription(newValue.target.value)}
                                      value={discussionDescription}
                                  />
                                  <FormControl variant="outlined"  className={classesCustom.textf}>
                                      <InputLabel>Stock</InputLabel>
                                      <Select
                                              label="Stock"
                                              onChange={(newValue) => setDiscussionStock(newValue.target.value)}
                                              value={discussionStock.abbreviation }
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
                          </GridContainer>
                          <GridContainer
                              direction="column"
                              alignItems="center"
                              justify="center"
                          >

                              <Grid xs={12} md={12} lg={12}>
                                  <Button
                                      variant="outlined"
                                      className={classesCustom.login}
                                      onClick={() => {
                                          createDiscussion()
                                      }}
                                      disabled={discussionName===""}
                                  >
                                      Create Discussion
                                  </Button>
                              </Grid>
                          </GridContainer>
                  </div>
              </Fade>
          </Modal>

      </GridContainer>
  )
}
