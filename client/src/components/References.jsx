import Section from './Section';
import propTypes from 'prop-types';

const renderReferences = (data) => (
  <>
    {data && (
      <>
        {console.log(data)}
        <h2>References</h2>
        <ul>
          {data.map((reference, index) => (
            <li key={index}>
              <h3>{reference.name}</h3>
              <h4>{reference.role}</h4>
              {reference.contact.phone && (
                <div>
                  <img src='./iconBase.svg' className='icon' />
                  <a href={`tel:${reference.contact.phone}`}>
                    {reference.contact.phone}
                  </a>
                </div>
              )}
              {reference.contact.email && (
                <div>
                  <img src='./iconBase.svg' className='icon' />
                  <a href={`mailto:${reference.contact.email}`}>
                    {reference.contact.email}
                  </a>
                </div>
              )}
            </li>
          ))}
        </ul>
      </>
    )}
  </>
);

const References = ({ id, className }) => {
  return (
    <Section
      endpoint='references'
      render={renderReferences}
      id={id}
      className={className}
    />
  );
};

//proptypes validation
References.propTypes = {
  id: propTypes.string,
  className: propTypes.string,
};

export default References;
