import Layout from '../../components/Layout';
import { useState, useEffect } from 'react';
import Router from 'next/router';

export default () => {
  // State declaration
  const [gig, setGig] = useState({
    title: '',
    technologies: '',
    budget: '',
    description: '',
    contact_email: '',
  });
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  /* Is called when there is a change in input data.
  stores the input data in the corresponding 'gig' state property */
  const change = e => {
    const name = e.target.name;
    const value = e.target.value;
    gig[name] = value;
    setGig({ ...gig });
  };

  // Is called when the form is submited
  const submit = e => {
    e.preventDefault();
    fetch('/api/gigs/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(gig),
    })
      .then(async res => {
        // If the course is created...
        if (res.status === 201) {
          console.log(`Success!`);
          Router.push('/');
        } else {
          const data = await res.json();
          // Error message for invalid inputs is stored in 'errors'
          setErrors(data.errors);
        }
      })
      .then(() => setLoading(false))
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const { title, technologies, budget, description, contact_email } = gig;

  return (
    <Layout>
      <div className='container'>
        <section id='add' className='container'>
          <div className='form-wrap'>
            <h1>Add A Gig</h1>
            <p>Your contact email will be shared with registered users to apply to your gig</p>
            {!loading &&
              errors.length &&
              errors.map(error => {
                return (
                  <div className='error'>
                    <p>{error}</p>
                  </div>
                );
              })}
            <form onSubmit={submit}>
              <div className='input-group'>
                <label htmlFor='title'>Gig Title</label>
                <input
                  type='text'
                  name='title'
                  id='title'
                  className='input-box'
                  placeholder='eg. Small Wordpress website, React developer'
                  maxLength='100'
                  required
                  value={title}
                  onChange={change}
                />
              </div>
              <div className='input-group'>
                <label htmlFor='technologies'>Technologies Needed</label>
                <input
                  type='text'
                  name='technologies'
                  id='technologies'
                  className='input-box'
                  placeholder='eg. javascript, react, PHP'
                  maxLength='100'
                  value={technologies}
                  onChange={change}
                />
              </div>
              <div className='input-group'>
                <label htmlFor='budget'>Budget (Leave blank for unknown)</label>
                <input
                  type='number'
                  name='budget'
                  id='budget'
                  className='input-box'
                  placeholder='eg. 500, 5000, 10000'
                  value={budget}
                  onChange={change}
                />
              </div>
              <div className='input-group'>
                <label htmlFor='description'>Gig Description</label>
                <textarea
                  name='description'
                  id='description'
                  className='input-box'
                  placeholder='Describe the details of the gig'
                  rows='10'
                  value={description}
                  onChange={change}
                  required
                ></textarea>
              </div>
              <div className='input-group'>
                <label htmlFor='budget'>Contact Email</label>
                <input
                  type='email'
                  name='contact_email'
                  id='contactemail'
                  className='input-box'
                  placeholder='Enter an email'
                  value={contact_email}
                  onChange={change}
                  required
                />
              </div>
              <input type='submit' value='Add Gig' className='btn btn-reverse' />
            </form>
          </div>
        </section>
      </div>
    </Layout>
  );
};
