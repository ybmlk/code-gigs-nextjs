export default ({ id }) => {
  return <div>Gigs {id}</div>;
};

export async function getServerSideProps({ query: { id } }) {
  return { props: { id } };
}
