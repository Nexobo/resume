import Section from './Section';
import propTypes from 'prop-types';

const renderTraits = (data) => (
  <>
    {data && (
      <>
        {console.log(data)}
        <h2>Traits</h2>
        <ul>
          {data.map((string, index) => (
            <li key={index}>{string}</li>
          ))}
        </ul>
      </>
    )}
  </>
);

const Traits = ({ id, className }) => {
  return (
    <Section
      endpoint='traits'
      render={renderTraits}
      id={id}
      className={className}
    />
  );
};

//proptypes validation
Traits.propTypes = {
  id: propTypes.string,
  className: propTypes.string,
};

export default Traits;
