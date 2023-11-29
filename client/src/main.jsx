import React from 'react';
import ReactDOM from 'react-dom/client';
import Title from './components/Title';
import Contact from './components/Contact';
import ProfilePic from './components/ProfilePic';
import Profile from './components/Profile';
import Education from './components/Education';
import Experience from './components/Experience';
import References from './components/References';
import Skills from './components/Skills';
import Traits from './components/Traits';
import './scss/reset.scss';
import './scss/app.scss';

ReactDOM.createRoot(document.getElementById('container')).render(
  <React.StrictMode>
    <>
      <ProfilePic id='profile-pic' className='header' />
      <Title id='title' className='header' />
      <Contact id='contact' className='header' />
      <Profile id='profile' className='profile' />
      <Education id='education' className='education' />
      <Experience id='experience' className='experience' />
      <References id='references' className='references' />
      <Skills id='skills' className='skills' />
      <Traits id='traits' className='traits' />
    </>
  </React.StrictMode>
);
