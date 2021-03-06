/*!

=========================================================
* Material Stocks React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import WarningIcon from '@material-ui/icons/Warning';
import BarChartIcon from '@material-ui/icons/BarChart';
import TableChartIcon from '@material-ui/icons/TableChart';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import DeveloperBoardOutlinedIcon from '@material-ui/icons/DeveloperBoardOutlined';
import ForumOutlinedIcon from '@material-ui/icons/ForumOutlined';
import AccessibilityOutlinedIcon from '@material-ui/icons/AccessibilityOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import ShowChartOutlinedIcon from '@material-ui/icons/ShowChartOutlined';
import ListIcon from '@material-ui/icons/List';
// core components/views for Admin layout
import SignalPage from "views/Stocks/Stocks.js";
import Chart from "views/Chart/Chart.js";
import Discussion from "views/Discussion/Discussion.js";
import Home from "views/Home/Home";
import Portfolio from "views/Portfolio/Portfolio";
import Trade from "./views/Trade/Trade";
import DiscussionID from "./views/Discussion/DiscussionID";
import {Equalizer} from "@material-ui/icons";
import Leaderboard from "./views/Leaderboard/Leaderboard";
// core components/views for RTL layout

const dashboardRoutes = [

    {
    path: "/home",
    name: "Home",
    icon: HomeOutlinedIcon,
    component: Home,
    layout: "/app"
  },
    {
        path: "/stocks",
        name: "Stocks",
        icon: ListIcon,
        component: SignalPage,
        layout: "/app"
    },
    {
        path: "/trade/:stockId?",
        name: "Trade",
        icon: ShowChartOutlinedIcon,
        component: Trade,
        layout: "/app"
    },
  {
    path: "/predictions",
    name: "Prediction",
    icon: DeveloperBoardOutlinedIcon,
    component: Chart,
    layout: "/app"
  },
  {
    path: "/discussions",
    name: "Discussions",
    icon: ForumOutlinedIcon,
    component: Discussion,
    layout: "/app"
  },
    {
        path: "/discussion/:discussionId?",
        name: "DiscussionDetail",
        icon: ShowChartOutlinedIcon,
        component: DiscussionID,
        layout: "/app"
    },
  {
    path: "/portfolio",
    name: "Portfolio",
    icon: MonetizationOnOutlinedIcon,
    component: Portfolio,
    layout: "/app"
  },
    {
        path: "/leaderboard",
        name: "Leaderboard",
        icon: Equalizer,
        component: Leaderboard,
        layout: "/app"
    },

];

export default dashboardRoutes;
