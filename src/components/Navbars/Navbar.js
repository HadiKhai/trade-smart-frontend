import React, {useState} from "react";
import {useForm} from 'react-hook-form';
import {Backdrop, createMuiTheme, Fade, InputAdornment, Modal, TextField, ThemeProvider} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
// core components
import styles from "assets/jss/material-dashboard-react/components/headerStyle.js";
import GridContainer from "../Grid/GridContainer";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {infoColor} from "../../assets/jss/material-dashboard-react";
import Box from "@material-ui/core/Box";
import {useAuth} from "../../store/hooks/auth/useAuth";
import {CheckUsername} from "../../api/queries";


const useStyles = makeStyles(styles);

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
    width:"30%"
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

const theme = createMuiTheme();

theme.typography.subtitle2 = {
  color: "grey",
  fontSize: '0.875rem',
};

export default function Header(props) {
  const classes = useStyles();
  const classesCustom = useCustomStyle();

  const onSubmit = values => console.log(values);

  const {login,register,logout,id} = useAuth()

  const {color} = props;

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [status, setStatus] = useState("login")

  const [username, setUsername] = useState("")
  const [usernameError,setUsernameError] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError,setPasswordError] = useState("");

  const [usernameRegister, setUsernameRegister] = useState("");
  const [usernameErrorRegister,setUsernameErrorRegister] = useState("")
  const [firstnameRegister, setFirstnameRegister] = useState("");
  const [firstnameErrorRegister,setFirstnameErrorRegistrer] = useState("")
  const [lastnameRegister, setLastnameRegister] = useState("");
  const [lastnameErrorRegister,setLastnameErrorRegistrer] = useState("")
  const [emailRegister, setEmailRegister] = useState("");
  const [emailErrorRegister, setEmailErrorRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [passwordErrorRegister, setPasswordErrorRegister] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);


  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });

  const checkEmail = (email) => {
    let regemail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/
    if (!regemail.test(email) && email !== "") {
      setEmailErrorRegister("Incorrect Email")

    } else {
      setEmailErrorRegister("")

    }
    setEmailRegister(email)
  }
  const checkPasswordRegister = (password) => {
    let message = "";
    if(password.length < 10)
      message += "be at least 10 characters";
    let lower = /.*[a-z].*/
    let include = "";
    if(!lower.test(password)){
        include += "lowercase"
    }
    let upper = /.*[A-Z].*/
    if(!upper.test(password)){
      if (include !== "") {
        include += ", "
      }
      include += "uppercase"
    }
    let numbers = /.*[0-9].*/
    if(!numbers.test(password)){
      if (include !== "") {
        include += ", "
      }
      include += "numbers"
    }
    let special = /.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~].*/
    if(!special.test(password)){
      if (include !== "") {
        include += ", "
      }
      include += "special characters"
    }

    if (include !== "") {
      include = "include " + include;
    }
    if(message !== ""){
      message = message + " and "+ include;
    }
    else{
      message = include;
    }
    if (message !== "") {
      setPasswordErrorRegister("Password should "+ message)

    } else {
      setPasswordErrorRegister("")

    }
    setPasswordRegister(password)
  }

  const loginSubmit = () => {
    login({username,password})
    setOpenModal(false)
  }

  const registerSubmit = () => {
    register({ email:emailRegister,
      password:passwordRegister,
      userName:usernameRegister,
      lastName:lastnameRegister,
      firstName:firstnameRegister,}).then(()=> {
          login({username:usernameRegister,password:passwordRegister})
        }
    ).catch((err)=>{
      console.log(err)
    })
    setOpenModal(false)
  }

  return (
      <div style={{
        background: "#edebf8"
      }}>
        <AppBar className={classes.appBar + appBarClasses}>

          <Toolbar className={classes.container}>
            {/* Here we create navbar brand, based on route name */}
            <div className={classes.flex}>
              <Box display="flex" p={1} flexDirection="row">
                <Box p={1} flexGrow={1}>
                  <ThemeProvider theme={theme}>
                    <Typography variant="subtitle2">&nbsp;&nbsp;AAPL: 123</Typography>
                  </ThemeProvider>
                </Box>
                <Box>
                  {id !== ""?
                      <Button
                          variant="outlined"
                          className={classesCustom.wallet}
                          onClick={() => logout()}
                      >
                        Logout
                      </Button>:
                      <Button
                          variant="outlined"
                          className={classesCustom.wallet}
                          onClick={() => setOpenModal(!openModal)}
                      >
                        Login
                      </Button>
                  }
                </Box>
              </Box>
              {/*<GridContainer spacing={3} margin={3}>*/}
              {/*  <Grid className={classesCustom.centerText} item xs={2} md lg >*/}
              {/*    <ThemeProvider theme={theme}>*/}
              {/*      <Typography variant="subtitle2">&nbsp;&nbsp;AAPL: 123</Typography>*/}
              {/*    </ThemeProvider>*/}
              {/*  </Grid>*/}
              {/*  <Grid item xs={2} md lg justify="flex-end" >*/}
              {/*    <Button*/}
              {/*        variant="outlined"*/}
              {/*        className={classesCustom.wallet}*/}
              {/*    >*/}
              {/*      Login*/}
              {/*    </Button>*/}
              {/*  </Grid>*/}
              {/*</GridContainer>*/}
            </div>
          </Toolbar>
        </AppBar>
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
              {status == "login" &&
              <>
                <h2 className={classesCustom.centerText}>Login</h2>
                <GridContainer
                    className={classes.container} maxWidth="xs">
                  <Grid xs={12} md={12} lg={12}>
                    <TextField
                        className={classesCustom.textf}
                        id="emailLogin"
                        onChange={(newValue) => setUsername(newValue.target.value)}
                        label="Username"
                        variant="outlined"
                        value={username}
                        onBlur={console.log("B")}
                        error={usernameError!==""}
                        helperText={usernameError}
                    />
                  </Grid>
                  <Grid xs={12} md={12} lg={12}>
                    <TextField
                        className={classesCustom.textf}
                        label='Password'
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        onChange={(newValue) => setPassword(newValue.target.value)}
                        value={password}
                        InputProps={{
                          endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? <Visibility/> : <VisibilityOff/>}
                                </IconButton>
                              </InputAdornment>
                          )
                        }}
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
                        className={classesCustom.login}
                        onClick={() => loginSubmit()}
                    >
                      Login
                    </Button>
                  </Grid>
                  <span className={classesCustom.span}
                        onClick={() => setStatus("register")}><a>Create an account</a></span>
                </GridContainer>
              </>}
              {
                status == "register" &&
                <>
                  <h2 className={classesCustom.centerText}>Register</h2>
                  <GridContainer
                      direction={"column"}
                      className={classes.container} maxWidth="xs">
                    <Grid xs={12} md={12} lg={12}>
                      <TextField
                          className={classesCustom.textf}
                          id="firstnameReg"
                          onChange={(newValue) => setFirstnameRegister(newValue.target.value)}
                          label="Firstname"
                          variant="outlined"
                          value={firstnameRegister}
                          required
                          onBlur={()=>{
                            setFirstnameErrorRegistrer(firstnameRegister===""?"First Name is required!":"")}}
                          error={firstnameErrorRegister!==""}
                          helperText={firstnameErrorRegister}
                      />
                    </Grid>
                    <Grid xs={12} md={12} lg={12}>
                      <TextField
                          className={classesCustom.textf}
                          id="lastnameReg"
                          onChange={(newValue) => setLastnameRegister(newValue.target.value)}
                          label="Lastname"
                          variant="outlined"
                          value={lastnameRegister}
                          required
                          onBlur={()=>{
                            setLastnameErrorRegistrer(lastnameRegister===""?"Last Name is required!":"")}}
                          error={lastnameErrorRegister!==""}
                          helperText={lastnameErrorRegister}
                      />
                    </Grid>
                    <Grid xs={12} md={12} lg={12}>
                      <TextField
                          className={classesCustom.textf}
                          id="usernameReg"
                          onChange={(newValue) => setUsernameRegister(newValue.target.value)}
                          label="Username"
                          variant="outlined"
                          value={usernameRegister}
                          required
                          onBlur={() => {
                            setUsernameErrorRegister(usernameRegister.length>0?"":"Username is required!")
                            if(usernameRegister!==""){
                              CheckUsername(usernameRegister).then((res)=>{
                                if(res.exists)
                                  setUsernameErrorRegister("Username already exists!")
                                else
                                  setUsernameErrorRegister("")
                              })
                            }
                          }}
                          error={usernameErrorRegister!==""}
                          helperText={usernameErrorRegister}
                      />
                    </Grid>
                    <Grid xs={12} md={12} lg={12}>
                      <TextField
                          className={classesCustom.textf}
                          id="emailReg"
                          onChange={(newValue) => checkEmail(newValue.target.value)}
                          label="Email"
                          variant="outlined"
                          value={emailRegister}
                          required
                          onBlur={() => {
                            if(emailRegister==="")
                              setEmailErrorRegister("Email is required!")
                            if(emailRegister!=="" && emailErrorRegister===""){
                              CheckUsername(emailRegister).then((res)=>{
                                console.log(res.exists())
                                if(res.exists)
                                  setEmailErrorRegister("Email already exists!")
                                else
                                  setEmailErrorRegister("")
                              })
                            }
                          }}
                          error={emailErrorRegister!==""}
                          helperText={emailErrorRegister}
                      />
                    </Grid>
                    <Grid xs={12} md={12} lg={12}>
                      <TextField
                          className={classesCustom.textf}
                          id="passwordReg"
                          label='Password'
                          variant="outlined"
                          type={showPassword ? "text" : "password"}
                          onChange={(newValue) => checkPasswordRegister(newValue.target.value)}
                          error={passwordErrorRegister!==""}
                          helperText={passwordErrorRegister}
                          value={passwordRegister}
                          onBlur={(newValue) => checkPasswordRegister(newValue.target.value)}
                          required
                          InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                  >
                                    {showPassword ? <Visibility/> : <VisibilityOff/>}
                                  </IconButton>
                                </InputAdornment>
                            )
                          }}
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
                          className={classesCustom.login}
                          onClick={() => registerSubmit()}
                      >
                        Create Account
                      </Button>
                    </Grid>
                    <span className={classesCustom.span}
                          onClick={() => setStatus("login")}><a>Create an account</a></span>
                  </GridContainer>
                </>
              }
            </div>


          </Fade>
        </Modal>
      </div>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  rtlActive: PropTypes.bool,
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object)
};
