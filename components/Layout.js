import Head from 'next/head';
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <link
          rel='stylesheet'
          href='https://use.fontawesome.com/releases/v5.3.1/css/all.css'
          integrity='sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU'
          crossOrigin='anonymous'
        />

        <link rel='stylesheet' href='/css/style.css' />
        <title>CodeGig</title>
      </Head>

      <header className='inner'>
        <h2>
          <Link href='/'>
            <a>
              <i className='fas fa-code'></i> CodeGig
            </a>
          </Link>
        </h2>

        <nav>
          <ul>
            <li>
              <Link href='/'>
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href='/gigs'>
                <a>All Gigs</a>
              </Link>
            </li>
            <li>
              <Link href='/gigs/add'>
                <a>Add Gig</a>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className='container'>{children}</div>
    </div>
  );
};

export default Layout;
