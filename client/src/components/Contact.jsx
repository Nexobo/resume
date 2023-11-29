import Section from './Section';
import propTypes from 'prop-types';

const renderContact = (data) => (
  <div>
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
        <img src='./iconBase.svg' className='icon' alt='Phone' />
      </li>
      <li>
        <a href={`mailto:${data.email}`}>{data.email}</a>
        <img src='./iconBase.svg' className='icon' alt='Email' />
      </li>
      <li>
        <a
          href={`http://${data.website}`}
          target='_blank'
          rel='noopener noreferrer'>
          {data.website}
        </a>
        <img src='./iconBase.svg' className='icon' alt='Website' />
      </li>
    </ul>
  </div>
);

const Contact = ({ id, className }) => {
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
