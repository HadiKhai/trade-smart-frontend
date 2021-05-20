import React from "react";
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

export default function Discussion() {
    const discussions = [
        {
            id:1,
            title: "What happened in the market this week, everything is crashing",
            creator: "Georgio Yammine",
            stock: "All",
            created_at: "2020-05-05",
            nbOfComments: 20

        },
        {
            id:2,
            title: "helo",
            creator: "Georgio Yammine",
            stock: "GME",
            created_at: "2020-05-05",
            nbOfComments: 20

        },
        {
            id:2,
            title: "e",
            creator: "Georgio Yammine",
            stock: "GME",
            created_at: "2020-05-05",
            nbOfComments: 20

        },
        {
            id:1,
            title: "What happened in the market this week, everything is crashing",
            creator: "Georgio Yammine",
            stock: "All",
            created_at: "2020-05-05",
            nbOfComments: 20

        },
        {
            id:2,
            title: "helo",
            creator: "Georgio Yammine",
            stock: "GME",
            created_at: "2020-05-05",
            nbOfComments: 20

        },
        {
            id:2,
            title: "e",
            creator: "Georgio Yammine",
            stock: "GME",
            created_at: "2020-05-05",
            nbOfComments: 20

        },
    ]



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

    const [state, setState] = React.useState({
        checked: false,
    });
    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    const handleSwitch = (event) => {
        console.log(event.target.name);
        setState({ ...state, [event.target.name]: event.target.checked });
    }

    return (
      <GridContainer style={{paddingRight: '20px'}}>
          <GridItem xs={5} sm={5} md={5}>
              <SearchBar style={{minHeight: '56px'}}></SearchBar>
          </GridItem>
          <GridItem xs={2} sm={2} md={2}>
              <FormControl variant="outlined" fullWidth={true} >
                  <InputLabel>Filter</InputLabel>
                  <Select style={{backgroundColor: 'white'}}
                      onChange={handleChange}
                      label="Filter"
                  >
                      <MenuItem value="">
                          <em>None</em>
                      </MenuItem>
                      {[...new Set(discussions.map((discussion) => (discussion.stock)))].map((category) => (
                          <MenuItem value={category}>{category}</MenuItem>
                      ))}
                  </Select>
              </FormControl>
          </GridItem>
          <GridItem xs={2} sm={2} md={2}>
              <FormControlLabel
                  label="View Subscribed"
                  control={
                      <Switch
                          checked={state.checked}
                          onChange={handleSwitch}
                          name="checked"
                          color="primary"
                      />
                  }

              />
          </GridItem>
          <GridItem xs={3} sm={3} md={3}>
          <Button variant="contained" size="large" className={classes.createNew}>Create New Discussion</Button>
          </GridItem>
          {discussions.map((discussion) => (
          <GridItem xs={12} sm={12} md={12}>
              <Card variant="outlined" className={classes.discussionCard}>
                  <CardContent>
                      <GridContainer>
                        <GridItem>
                            <Typography className={classes.clickable} color="textSecondary" gutterBottom>
                                {discussion.stock}
                            </Typography>
                        </GridItem>
                        <GridItem>
                            <Typography color="textSecondary" gutterBottom>
                                <span>Posted by </span>
                                <span className={classes.clickable}>{discussion.creator}</span>
                            </Typography>
                        </GridItem>
                        <GridItem>
                            <Typography color="textSecondary" gutterBottom>
                                {discussion.created_at}
                            </Typography>
                        </GridItem>
                      </GridContainer>
                      <Typography className={classes.title}>
                          {discussion.title}
                          <br />
                      </Typography>
                  </CardContent>
                  <CardActions>
                      <Button size="large">{discussion.nbOfComments} Comments</Button>
                      <Button size="large">Share</Button>
                  </CardActions>
              </Card>
          </GridItem>
          ))}

      </GridContainer>
  )
}
