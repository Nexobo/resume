import Section from './Section';
import propTypes from 'prop-types';

const renderEducation = (data) => (
  <>
    {data && (
      <>
        {console.log(data)}
        <h2>Education</h2>
        {data.map((string, index) => (
          <p key={index}>{string.name}</p>
        ))}
      </>
    )}
  </>
);

const Education = ({ id, className }) => {
  return (
    <Section
      endpoint='education'
      render={renderEducation}
      id={id}
      className={className}
    />
  );
};

//proptypes validation
Education.propTypes = {
  id: propTypes.string,
  className: propTypes.string,
};

export default Education;
