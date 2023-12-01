import Section from './Section';
import propTypes from 'prop-types';
import CircleBullet from './mcomponents/CircleBullet';

const renderExperience = (data) => (
  <>
    {data && (
      <>
        {console.log(data)}
        <h2>Experience</h2>

        <ul>
          {data.map((string, index) => (
            <li key={index}>
              <CircleBullet />
              <h3>{string.company}</h3>
              <ul>
                {string.positions.map((position, index) => (
                  <li key={index}>
                    <CircleBullet />
                    <h4>{position.role}</h4>
                    <p className='dates'>{position.duration}</p>
                    <p>{position.description}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </>
    )}
  </>
);

const Experience = ({ id, className }) => {
  return (
    <Section
      endpoint='experience'
      render={renderExperience}
      id={id}
      className={className}
    />
  );
};

//proptypes validation
Experience.propTypes = {
  id: propTypes.string,
  className: propTypes.string,
};

export default Experience;
