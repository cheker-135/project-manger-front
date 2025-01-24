import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/userActions';

import { Grid, Typography, TextField, Button ,InputAdornment,IconButton,} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { toast } from "react-hot-toast";
import AuthFormPanel from '../AuthFormPanel';
import Loader from '../Loader';
import Helmet from '../Helmet';

const useStyles = makeStyles(() => ({
  gridContainer: {
    backgroundColor: '#fff',
      border:'3px solid #00bcd4',
    borderRadius: 23,
    display: 'flex',
    justifyContent: 'flex-end',
    height: 550,

    '@media (max-width: 768px)': {
      flexDirection: 'column-reverse',
      height: 'auto',
    },
  },
  mainContainer: {
    padding: '50px',

    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& h1': {
      fontSize: '2.5rem',
      color: '#00bcd4',
      fontFamily: 'Segoe UI',
      fontWeight: 400,
    },
    '@media (max-width: 768px)': {
      width: '100%',
      padding: '20px 50px',
    },
    '@media (min-width: 768px) and (max-width: 1500px)': {
      padding: '50px 20px',
    },
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  inputField: {
    marginBottom: 10,
    '& input': {
      padding: '11px 10px',
    },
    '& label': {
      transform: 'translate(10px, 13px) scale(1)',
    },
    '&:first-child': {
      marginTop: 20,
    },
    '&:nth-of-type(3)': {
      marginBottom: 10,
      display: 'flex',
      alignItems: 'center',
    },
  },
  customError: {
    color: '#f44336',
    marginBottom: 10,
  },
  smallText: {
    textAlign: 'center',
    fontSize: '.75rem',
    margin: '5px 0 0 0',
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { loading, error, userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
     if (userInfo && userInfo.isAdmin) {
       history.push('/admin'); // Redirect to admin dashboard if user is admin
     } else if (userInfo && userInfo.isAgent) {
       history.push('/'); // Redirect to Responsable dashboard for non-admin users
     } else if (userInfo) {
       history.push('/'); // Redirect to user dashboard for non-admin users
     }
   }, [userInfo, history]);

  const validate = () => {
    let returnVal = true;
    // eslint-disable-next-line
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email.toLowerCase())) {
      returnVal = false;
      setEmailError('Please use full email address (i.e., john@example.com)');
    } else {
      returnVal = returnVal ? returnVal : false;
      setEmailError('');
    }
    if (password === '') {
      returnVal = false;
      setPasswordError('Cannot be empty!');
    } else {
    }
    return returnVal;
  };

  const emailChange = (e) => {
    setEmailError('');
    setEmail(e.target.value);
  };
  const passwordChange = (e) => {
    setPasswordError('');
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validation = validate();
    if (validation)

     await dispatch(login(email, password));
     toast.success("Signed In Successfully");
  };

  return (
    <div>
      <Helmet title={'Login'} />
      <Grid
        container
        justify='center'
        alignItems='center'
        style={{ height: '100vh' }}
      >
        <Grid
          item
          lg={5}
          md={7}
          sm={9}
          xs={9}
          className={classes.gridContainer}
        >
          <AuthFormPanel />
          <div className={classes.mainContainer}>
            <Typography variant='h1' style={{ fontFamily: 'Segoe UI' }}>
              Connexion
            </Typography>
            <form className={classes.formContainer} onSubmit={handleSubmit}>
              <TextField
                name='email'
                type='email'
                label='Email'
                variant='outlined'
                fullWidth
                error={Boolean(emailError)}
                helperText={emailError}
                onChange={emailChange}
                value={email}
                className={classes.inputField}
              />
              <TextField
                name='password'
                type={showPassword ? 'text' : 'password'}
                label='Mot de passe'
                variant='outlined'
                fullWidth
                error={Boolean(passwordError)}
                helperText={passwordError}
                onChange={passwordChange}
                value={password}
                className={classes.inputField}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        style={{ padding: 8 }}
                        aria-label='toggle password visibility'
                        onClick={() => setShowPassword((prevVal) => !prevVal)}
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {error && (
                <Typography variant='body2' className={classes.customError}>
                  {error}
                </Typography>
              )}

              <Button
                type='submit'
                variant='contained'
              color='primary'
                disabled={loading}
                style={{
                  borderRadius: 15,
                  boxShadow: "1px 1px 5px #fff",

                  "&:hover": {
                    color: "white",

                    borderRadius: 50,
                    boxShadow: "10px 10px 50px #000",
                  },
                }}
              >
                S'authentifer
                {loading && <Loader button />}
              </Button>
            </form>
            <p className={classes.smallText}>
              Vous n'avez pas un compte? <Link to='/register'>Creer un compte</Link>
            </p>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default SignIn;
