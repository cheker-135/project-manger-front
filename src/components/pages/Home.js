import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, makeStyles } from '@material-ui/core';
import Helmet from '../Helmet';
import TypingAnim from '../typingAnim';
import TypingAnimAfter from '../typingAnimAfterLogin';
import PolygonBackground from '../../images/PolygonBackground.jpg';

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundImage: `url(${PolygonBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backdropFilter: 'blur(10px)',
  //  backgroundColor: 'rgba(255, 255, 255, 1)',
    margin: 'auto 0 auto 0',
    display: 'flex',
    borderRadius:35 ,
    border : '2px solid #fff' ,
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '3.5em',
    justifyContent: 'center',
    padding: 10,
    textAlign: 'center',
    height: '100vh', // Set the height to 100vh
    '& h1,h2,h6': {
      margin: 0,
    },
    '& h6': {
      color: '#fff',
      fontWeight: 100,
      fontSize: '1.2rem',
    },
    '& h1,h2': {
      color: '#fff',
      [theme.breakpoints.down('xs')]: {
        fontSize: '1.2em',
      },
    },
    '& p': {
      fontSize: '.875rem',
      color: '#fff',
      '& a': {
        color: '#fff',
        fontSize: '.675rem',
      },
    },
  },
  galaxyButton: {
    border: '0.5px solid #fff',
    borderRadius: 20,
    color: '#fff',
    fontWeight: 'bold',
    padding: '10px 20px',
    fontSize: '1.2rem',
    textTransform: 'lowercase',
    transition: 'all 0.3s ease',
    '&:hover': {
      border: '3px solid #fff',
      color: '#fff',
      backgroundColor: 'red',
    textTransform: 'uppercase',
      boxShadow: "1px 1px 20px #fff",
    },
  },
}));

const Home = () => {
  const classes = useStyles();

  // Get the token from localStorage
  const token = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).token : null;
  console.log("token:", token);
  // Check if token exists
  const isAuthenticated = token !== null;

  const welcomeMessage = isAuthenticated ? 'Re-Bonjour!' : 'Bonjour!';
  const welcomeContent = isAuthenticated ? (
    <>
    
      <TypingAnimAfter />
      <Link
        to='/boards'
        style={{ textDecoration: 'none', marginTop: '10px', fontSize: 0 }}
      >
        <Button className={classes.galaxyButton} size='large'>
          Boards
        </Button>
      </Link>
    </>
  ) : (
    <>
      <TypingAnim />
      <Link
        to='/register'
        style={{ textDecoration: 'none', marginTop: '10px', fontSize: 0 }}
      >
        <Button className={classes.galaxyButton} size='large'>
          Commencer
        </Button>
      </Link>
      <p className={classes.paragraph}>
        Abonne Deja? <Link to='/signin'>Se Connecter</Link>
      </p>
    </>
  );

  return (
    <div className={classes.container} >
      <Helmet title={welcomeMessage} />
      {welcomeContent}
    </div>
  );
};
export default Home;
