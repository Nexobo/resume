import { useState } from 'react';

import Section from './Section';
import Chat from './Chat';

import propTypes from 'prop-types';

const Contact = ({ id, className }) => {
  const [showChat, setShowChat] = useState(false);
  const toggleChatPopup = () => {
    setShowChat(!showChat);
  };
  const renderContact = (data) => (
    <>
      <h3>Contact</h3>
      <address>
        <a href={data.mapsLink} target='_blank' rel='noopener noreferrer'>
          {data.addressLine1}
          <br />
          {data.addressLine2}
        </a>
      </address>
      <ul>
        <li>
          <a href={`tel:${data.phone}`}>{data.phone}</a>
          {/* <img src='./iconBase.svg' className='icon' alt='Phone' /> */}
        </li>
        <li>
          <a href={`mailto:${data.email}`}>{data.email}</a>
          {/* <img src='./iconBase.svg' className='icon' alt='Email' /> */}
        </li>
        <li>
          <a
            href={`http://${data.website}`}
            target='_blank'
            rel='noopener noreferrer'>
            {data.website}
          </a>
          {/* <img src='./iconBase.svg' className='icon' alt='Website' /> */}
        </li>
      </ul>
      <button onClick={toggleChatPopup}>Chat with me</button>
      {renderChatPopup()}
    </>
  );
  const renderChatPopup = () => {
    if (!showChat) return null;

    return <Chat className='chat-popup' togglePopup={toggleChatPopup} />;
  };
  return (
    <Section
      endpoint='contact'
      render={renderContact}
      id={id}
      className={className}
    />
  );
};

//proptypes validation
Contact.propTypes = {
  id: propTypes.string,
  className: propTypes.string,
};

export default Contact;
