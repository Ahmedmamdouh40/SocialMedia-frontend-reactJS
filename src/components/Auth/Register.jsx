import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { useAlert } from 'react-alert'
import Cookies from 'universal-cookie';
const cookies = new Cookies();
var Joi = require('joi-browser');
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
//style 
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Register(props) {
    const classes = useStyles();
    const alert = useAlert()
    const [state, setState] = React.useState({
        name: "",
        email: "",
        password: "",
        errors: {}
    });
    //schema of joi
    const schema = {
        name: Joi.string().alphanum().min(3).max(30).required(),
        password: Joi.string().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/),
        email: Joi.string().email(),
    };
    const handleChange = ({ target }) => {
        setState({ ...state, [target.name]: target.value });
    };

    const submitRequest = (e) => {
        e.preventDefault();

        const errors = validate();

        if (errors) return;
        axios.post('http://localhost:8000/api/register', state).then((res) => {
                cookies.set('token', res.data.token, { path: '/' });
                cookies.set('userData', res.data.user, { path: '/' });
                props.history.replace('/')

            
        }).catch((error) => {
            if(error.response.status==422)
            {
                const errors=error.response.data.errors;
                for(let err in errors)
                {
                    alert.error(errors[err]);
                }

            }
            else{

                alert.error("Error In Server, Check That You Running The Server");
            }
            
        });

    }
    const validate = () => {
        const errors = {};
        //Clone State
        const data = { ...state };
        delete data.errors;
        const res = Joi.validate(data, schema, { abortEarly: false });
        if (res.error === null) {
            setState({ data, errors: {} });
            return null;
        }

        for (const error of res.error.details) {
            errors[error.path] = error.message;
        }

        //Set State
        setState({ ...data, errors });
        return errors;
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
        </Typography>
                <form className={classes.form} noValidate onSubmit={submitRequest}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                autoComplete="name"
                                name="name"
                                variant="outlined"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                                value={state.name}
                                onChange={handleChange}
                            />
                            {state.errors.name && (
                                <div>
                                    <br />
                                    <Alert severity="error">{state.errors.name}</Alert>
                                </div>
                            )}

                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                value={state.email}
                                onChange={handleChange}
                            />
                            {state.errors.email && (
                                <div>
                                    <br />
                                    <Alert severity="error">{state.errors.email}</Alert>
                                </div>

                            )}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"

                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoFocus
                                value={state.password}
                                onChange={handleChange}
                            />
                            {state.errors.password && (
                                <div>
                                    <br />
                                    <Alert severity="error">{state.errors.password}</Alert>
                                </div>

                            )}
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}