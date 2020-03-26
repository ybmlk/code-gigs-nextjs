import React from 'react';
import Layout from '../components/layout';

export default () => {
  return (
    <Layout>
      <section id='search' className='search-wrap'>
        <h1>Find A Coding Gig</h1>
        <form action='gigs.html' className='search-form'>
          <i className='fas fa-search'></i>
          <input type='search' name='term' placeholder='Javascript, PHP, Rails, etc...' />
          <input type='submit' value='Search' />
        </form>
      </section>
    </Layout>
  );
};
