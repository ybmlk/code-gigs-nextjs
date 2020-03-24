export default ({ id }) => {
  return <div>b {id}</div>;
};

export async function getServerSideProps({ query: { id } }) {
  // Pass data to the page via props
  return { props: { id } };
}
