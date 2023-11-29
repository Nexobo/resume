import Section from './Section';
import propTypes from 'prop-types';

const renderProfile = (data) => (
  <>
    {data && (
      <>
        {console.log(data)}
        <h2>Profile</h2>
        {data.map((string, index) => (
          <p key={index}>{string}</p>
        ))}
      </>
    )}
  </>
);

const Profile = ({ id, className }) => {
  return (
    <Section
      endpoint='profile'
      render={renderProfile}
      id={id}
      className={className}
    />
  );
};

//proptypes validation
Profile.propTypes = {
  id: propTypes.string,
  className: propTypes.string,
};

export default Profile;
