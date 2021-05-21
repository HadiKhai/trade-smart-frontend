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
import {
    GetDiscussion,
    GetDiscussionMessages,
    GetDiscussions,
    GetStocks,
    postDiscussion,
    postMessage
} from "../../api/queries";
import {useAuth} from "../../store/hooks/auth/useAuth";
import {useParams} from "react-router";
import {useUser} from "../../store/hooks/user/useUser";
import Pagination from "@material-ui/lab/Pagination";
import {number} from "prop-types";

export default function Discussion() {

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
        commentCard: {
            marginTop: '15px',
            marginBottom: '5px',
        },
        customPaginator: {
            marginTop: '20px',
            paddingLeft: "15px",
            "& .MuiPaginationItem-rounded": {
                backgroundColor: "rgba(255,255,255,0.5)"
            },
            "& .MuiPaginationItem-page.Mui-selected": {
                backgroundColor: "#fff"
            },
            "& .MuiPaginationItem-rounded:hover": {
                backgroundColor: "#fff"
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
    const {userName} = useUser()

    const [openModal, setOpenModal] = useState(false);
    const {id} = useAuth()
    const {discussionId} = useParams();

    const [discussionInfo, setDiscussionInfo] = useState([])
    const [messages, setMessages] = useState([])
    const [comment, setComment] = useState("")
    const [page, setPage] = useState(0)

    let fetchMessages = false;
    const sendComment = (content) => {
        postMessage({content,discussionId}).then(()=>{
            GetMessages(page)
            GetDiscussion(discussionId).then((messages)=>{
                setDiscussionInfo(messages)
            })
        })
        fetchMessages = !fetchMessages
    }

    const GetMessages = (page) => {
        console.log(page)
        GetDiscussionMessages(discussionId, page).then((messages) => {
            setMessages(messages)
            console.log(messages)
        })
    }
    useEffect(()=> {
        GetDiscussion(discussionId).then((messages)=>{
            setDiscussionInfo(messages)
            console.log(messages)
        })
    },[])
    useEffect(()=> {
        GetDiscussionMessages(discussionId,0).then((messages)=>{
            console.log("HEY2")
            setMessages(messages)
            console.log(messages)
        })
    },[])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // const refreshData = (stock, search, onlySubscribed) => {
    //     let stockId = stock.id==undefined?"":stock.id
    //     if(onlySubscribed) {
    //         GetDiscussions({stockId, search}).then((res) => {
    //             setDiscussions(res)
    //             console.log(res)
    //         })
    //     }
    //     else{
    //         GetDiscussions({stockId, search}).then((res) => {
    //             setDiscussions(res)
    //             console.log(res)
    //         })
    //     }
    // }


    return (
      <GridContainer style={{paddingRight: '20px'}}>
          <GridItem xs={12} sm={12} md={12}>
              <Card variant="outlined"
                    onClick={() => console.log("clicked Card:"+discussionInfo.id)}
                    className={classes.discussionCard}>
                  <CardContent>
                      <GridContainer>
                          <GridItem>
                              <Typography color="textSecondary" gutterBottom>
                                  <span>Posted by </span>
                              </Typography>
                          </GridItem>
                          <GridItem>
                              <Typography color="textSecondary" gutterBottom>
                                  {discussionInfo.createdAt}
                              </Typography>
                          </GridItem>
                      </GridContainer>
                      <Typography className={classes.title}>
                          {discussionInfo.title}
                          <br />
                      </Typography>
                      <Grid xs={12} md={12} lg={12} className={classesCustom.textf}>
                            {discussionInfo.description}
                      </Grid>
                  </CardContent>
                  <CardActions>
                      <Button size="large">{discussionInfo.messageCount} Comments</Button>
                      <Button size="large" onClick={(e) => {
                          e.stopPropagation()
                          console.log("Share Discussion:"+discussionInfo.id)
                      }}>
                          Share</Button>
                  </CardActions>
              </Card>
          </GridItem>
          {messages.map((message) => (
          <GridItem xs={12} sm={12} md={12}>
              <Card variant="outlined" className={classes.commentCard}>
                  <CardContent>
                      <GridContainer>
                        <GridItem>
                            <Typography color="textSecondary" gutterBottom>
                                <span onClick={(e) => {
                                    e.stopPropagation()
                                    console.log("clicked Author" + message.senderId)
                                }}
                                      className={classes.clickable}>{message.senderUsername}</span>
                            </Typography>
                        </GridItem>
                        <GridItem>
                            <Typography color="textSecondary" gutterBottom>
                                {message.timestamp}
                            </Typography>
                        </GridItem>
                      </GridContainer>
                      <Typography className={classes.content}>
                          {message.content}
                          <br />
                      </Typography>
                  </CardContent>
              </Card>
          </GridItem>
          ))}
          <Pagination count={Math.ceil(discussionInfo.messageCount/10)} className={classes.customPaginator}
                      variant="outlined" shape="rounded" onChange={(event, page)=>
          {
              setPage(page-1)
              GetMessages(page-1)
          }}/>
          <GridItem xs={12} sm={12} md={12}>
              <Card variant="outlined"
                    onClick={() => console.log("clicked Card:"+discussionInfo.id)}
                    className={classes.discussionCard}>
                  <CardContent>
                      <GridContainer>
                          <GridItem>
                              <Typography color="textSecondary" gutterBottom style={{paddingRight:'3px'}}>
                                  Comment as {userName}
                              </Typography>
                          </GridItem>
                      </GridContainer>
                      <Typography>
                          <TextField
                              className={classesCustom.textf}
                              id="description"
                              label="Description"
                              multiline
                              rows={6}
                              variant="outlined"
                              onChange={(newValue) => setComment(newValue.target.value)}
                              value={comment}
                          />
                      </Typography>
                      <Button size="large" onClick={()=>{sendComment(comment)}} >Comment</Button>
                  </CardContent>

              </Card>
          </GridItem>
      </GridContainer>


  )
}
