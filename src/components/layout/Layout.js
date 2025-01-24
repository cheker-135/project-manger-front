import React from 'react';
import { useSelector } from 'react-redux';
import VerticalNav from './VerticalNav';

const Layout = ({ children }) => {
  const { loading, userInfo } = useSelector((state) => state.userLogin);

  // Check if loading and userInfo are available and user is an admin
  const isAdmin = userInfo && userInfo.isAdmin;

  return (
    <>
      {isAdmin ? (
        <div style={{ display: 'flex' }}>

          <div style={{ width: '100%' }}>
            <main className='container'>{children}</main>
          </div>
        </div>
      ) : (
        <div style={{ display: 'flex' }}>
          <VerticalNav />
          <div style={{ width: '100%' }}>
            <main className='container'>{children}</main>
          </div>
        </div>
      )}
    </>
  );
};

export default Layout;
