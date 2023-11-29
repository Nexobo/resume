import Section from './Section';
import propTypes from 'prop-types';

const renderSkills = (data) => (
  <>
    {data && (
      <>
        {console.log(data)}
        <h2>Skills</h2>
        <ul>
          {data.map((string, index) => (
            <li key={index}>{string}</li>
          ))}
        </ul>
      </>
    )}
  </>
);

const Skills = ({ id, className }) => {
  return (
    <Section
      endpoint='skills'
      render={renderSkills}
      id={id}
      className={className}
    />
  );
};

//proptypes validation
Skills.propTypes = {
  id: propTypes.string,
  className: propTypes.string,
};

export default Skills;
