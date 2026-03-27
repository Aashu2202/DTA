import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from './Navbar';
import AnnouncementBar from './AnnouncementBar';
import Footer from './Footer';
import ChatWidget from './ChatWidget';

function MainLayout() {
  return (
    <>
      <Navbar />
      <AnnouncementBar />
      <Outlet />
      <Footer />
      <ChatWidget />
    </>
  );
}

export default MainLayout;
