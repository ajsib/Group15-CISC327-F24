// pages/search-results/index.tsx

import { useRouter } from 'next/router';
import FlightSearchResults from '@/components/pages/search-results/FlightSearchResults';

export default function SearchResultsPage() {
  const router = useRouter();
  const query = router.query;

  return <FlightSearchResults query={query} />;
}
