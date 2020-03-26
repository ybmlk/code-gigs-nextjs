import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';

export default () => {
  // State declaration
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/gigs')
      .then(data => data.json())
      .then(data => setGigs(data))
      .then(() => setLoading(false))
      .catch(err => console.log(err));
  }, []);

  return (
    <Layout>
      <div className='container'>
        <section id='gigs' className='container'>
          <h1>All Gigs</h1>
          {!loading && gigs.length ? (
            gigs.map(({ id, title, description, budget, contact_email, technologies }) => {
              return (
                <div className='gig' key={id}>
                  <h3>{title}</h3>
                  <p>{description}</p>
                  <ul>
                    <li>Budget: ${budget}</li>
                    <li>
                      <a
                        href={`mailto:${contact_email}`}
                        className='btn btn-reverse'
                        target='_blank'
                      >
                        Apply Now
                      </a>
                    </li>
                  </ul>
                  <div className='tech'>
                    <small>
                      Technologies Needed: <span>{technologies}</span>
                    </small>
                  </div>
                </div>
              );
            })
          ) : (
            <p>No gigs available</p>
          )}
        </section>
      </div>
    </Layout>
  );
};
