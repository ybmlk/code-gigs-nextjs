import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';

export default () => {
  // State declaration
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [term, setTerm] = useState('');

  const change = e => {
    const value = e.target.value;
    setTerm(value);
  };

  const submit = e => {
    e.preventDefault();
    fetch(`/api/gigs/search?term=${term}`)
      .then(data => data.json())
      .then(data => setGigs(data))
      .then(() => setLoading(false))
      .catch(err => console.log(err));
  };

  if (gigs.length) {
    return (
      <Layout>
        <br />

        <div className='container'>

          <form className='search-form' onSubmit={submit}>
            <i className='fas fa-search'></i>
            <input
              type='search'
              // name='term'
              placeholder='Javascript, PHP, Rails, etc...'
              value={term}
              onChange={change}
            />
            <input type='submit' value='Search' />
          </form>
          
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
  } else {
    return (
      <Layout>
        <section id='search' className='search-wrap'>
          <h1>Find A Coding Gig</h1>
          <form className='search-form' onSubmit={submit}>
            <i className='fas fa-search'></i>
            <input
              type='search'
              // name='term'
              placeholder='Javascript, PHP, Rails, etc...'
              value={term}
              onChange={change}
            />
            <input type='submit' value='Search' />
          </form>
        </section>
      </Layout>
    );
  }
};
