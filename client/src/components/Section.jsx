// client/src/components/Section.jsx
import { useState, useEffect } from 'react';
import propTypes from 'prop-types';

const Section = ({ endpoint, render, id, className }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (endpoint) {
      fetch(`${import.meta.env.VITE_API_URL}/${endpoint}`) // Update the URL to match your server's URL
        .then((response) => {
          //check if response is .jpeg file
          if (response.headers.get('content-type').includes('image/jpeg')) {
            console.log('jpeg');
            return response.blob();
          }
          console.log('json');
          const data = response.json();
          return data;
        })
        .then((data) => {
          console.log(`endpoint: ${endpoint}: ${data}`);
          setData(data);
        })
        .catch((error) => console.error(`Error fetching ${endpoint}:`, error));
    } else {
      console.log('no endpoint');
      setData(true);
    }
  }, [endpoint]);

  return (
    <section id={id || undefined} className={className || undefined}>
      {data ? render(data) : <p>Loading...</p>}
    </section>
  );
};
//proptypes validation
Section.propTypes = {
  endpoint: propTypes.string.isRequired,
  render: propTypes.func.isRequired,
  id: propTypes.string,
  className: propTypes.string,
};

export default Section;
