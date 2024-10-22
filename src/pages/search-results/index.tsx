// pages/search-results/index.tsx

import FlightSearchResults from '@/components/pages/search-results/';

export default function SearchResultsPage({ query }: { query: any }) {
  return <FlightSearchResults query={query} />;
}

// Use getServerSideProps to fetch the query parameters from the server-side
export async function getServerSideProps(context: any) {
  const { query } = context;
  
  // Return the query parameters as props to the component
  return {
    props: {
      query,
    },
  };
}
