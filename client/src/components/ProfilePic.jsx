import Section from './Section';
import propTypes from 'prop-types';

const renderProfilePic = (data) => {
  //data is actually the jpeg blob
  const url = URL.createObjectURL(data);
  return <img src={url} alt='profile pic' />;
};

const ProfilePic = ({ id, className }) => {
  return (
    <Section
      endpoint='profile-pic'
      render={renderProfilePic}
      id={id}
      className={className}
    />
  );
};

ProfilePic.propTypes = {
  id: propTypes.string,
  className: propTypes.string,
};

export default ProfilePic;
