export default ({ id }) => {
  return <div>a {id}</div>;
};

export async function getServerSideProps({ query: { id } }) {
  // Pass data to the page via props
  return { props: { id } };
}
