import React from 'react';
import Landing from '../components/Landing';

export default () => {
  return (
    <Landing>
      <section id='search' className='search-wrap'>
        <h1>Find A Coding Gig</h1>
        <form action='gigs.html' className='search-form'>
          <i className='fas fa-search'></i>
          <input type='search' name='term' placeholder='Javascript, PHP, Rails, etc...' />
          <input type='submit' value='Search' />
        </form>
      </section>
    </Landing>
  );
};
