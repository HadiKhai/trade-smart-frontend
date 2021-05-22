/*eslint-disable*/
import React, {useEffect, useState} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components

import styles from "assets/jss/material-dashboard-react/components/sidebarStyle.js";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Identicon from "identicon.js";
import {FormGroup, withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";;
import {infoColor} from "../../assets/jss/material-dashboard-react";
import Switch from "@material-ui/core/Switch";
const useStyles = makeStyles(styles);

const useStyleWallet = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        background:"#181a1f"
    },
    wallet:{
        width: "auto",
        transition: "all 300ms linear",
        margin: "10px 15px 0",
        borderRadius: "3px",
        position: "relative",
        padding: "10px 15px",
        backgroundColor: "transparent",
        color: infoColor[0],
        borderColor: infoColor[0],
        textDecoration: "none",
    },
    container: {
        position: "unset",
        listStyle: "none",
        marginTop: 20,
        paddingTop: 0,
        paddingLeft: 0,
        marginBottom: 0,
        paddingBottom: 0,
    },
    switch: {
        margin: "10px 15px;"
    },
    upperContainer:{
        margin: "0 !important"
    }
}));



const AntSwitch = withStyles((theme) => ({
    root: {
        width: 50,
        height: 30,
        padding: 2,
        display: 'flex',
        color: infoColor[0]
    },
    switchBase: {
        padding: 10,
        color: infoColor[0],
        '&$checked': {
            transform: 'translateX(12px)',
            color: theme.palette.common.white,
            '& + $track': {
                opacity: 1,
                backgroundColor: infoColor[0],
                borderColor: infoColor[0],
            },
        },
    },
    thumb: {
        width: 12,
        height: 12,
        boxShadow: 'none',
    },
    track: {
        border: `1px solid ${infoColor[0]}`,
        borderRadius: 30 / 2,
        opacity: 1,
        backgroundColor: theme.palette.common.white,
    },
    checked: {},
}))(Switch);


export default function Sidebar(props) {
  const classes = useStyles();

  const walletClasses = useStyleWallet()



  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }
  const { color, logoText, routes } = props;
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {

          const path = prop.path


          let temp = "/"+path.split("/")[1]
          // con
          //     "/"+prop.path.split("/")[1]
          //

          const listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.layout + temp)
        });

        const whiteFontClasses = classNames({
          [" " + classes.blueFont]: !activeRoute(prop.layout + temp)
        });

        if(temp!=="/discussion") {
            return (
                <NavLink
                    to={prop.layout + prop.path}
                    className={classes.item}
                    activeClassName="active"
                    key={key}
                >
                    <ListItem button className={classes.itemLink + listItemClasses}>
                        <prop.icon
                            className={classNames(classes.itemIcon, whiteFontClasses)}
                        />
                        <ListItemText
                            primary={prop.name}
                            className={classNames(classes.itemText, whiteFontClasses)}
                            disableTypography={true}
                        />
                    </ListItem>
                </NavLink>
            );
        }
      })}

    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a
        href="#"
        className={classNames(classes.logoLink, {
          [classes.logoLinkRTL]: props.rtlActive
        })}
        target="_blank"
      >
        TradeSmart.AI
      </a>
    </div>
  );

  const profile = () => {
      if (connected) {
          return (
              <Grid container className={walletClasses.container}>
              <Button
                    variant="outlined"
                    className={walletClasses.wallet}
                    onClick={() => disconnectWallet(web3, web3Modal)}
                    startIcon={
                        <Avatar
                            src={`data:image/png;base64,${new Identicon(
                                address,
                                30,
                            ).toString()}`}
                        />
                    }
                >
                    {publicKey()}
                </Button>
              </Grid>
            );
        }
        return (
            <List className={classes.list}>
            <Grid container className={walletClasses.container}>
                <Button
                    variant="outlined"
                    className={walletClasses.wallet}
                    onClick={() => connectWallet(web3Modal)}
                >
                    Connect your Wallet
                </Button>
            </Grid>
            </List>

        );
    };

    const handleChange = () => {
        const temp = tokenSelected
        setTokenSelected(!temp)
        changeToken({globalToken})
    }

    return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={props.rtlActive ? "left" : "right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {links}
          </div>

        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor={props.rtlActive ? "right" : "left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper, {
              [classes.drawerPaperRTL]: props.rtlActive
            })
          }}
        >
          {brand}
            <div className={classes.root}>
            </div>
          <div className={classes.sidebarWrapper}>
              {links}
          </div>
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool
};
