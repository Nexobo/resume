import Section from './Section';
import propTypes from 'prop-types';

const renderTitle = (data) => (
  <>
    <h1>
      {data.firstName} <span>{data.lastName}</span>
    </h1>
    <h2>{data.role}</h2>
    <p>{data.description}</p>
    <div className='buttons'>
      <button>Print</button>
      <button>Download PDF</button>
      <button>github</button>
    </div>
  </>
);

const Title = ({ id, className }) => {
  return (
    <Section
      endpoint='title'
      render={renderTitle}
      id={id}
      className={className}
    />
  );
};
Title.propTypes = {
  id: propTypes.string,
  className: propTypes.string,
};

export default Title;
