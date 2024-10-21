/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const headerStyles = css`
  padding: 20px;
  text-align: center;

  h1 {
    margin: 0;
    font-size: 2rem;
  }
`;

const SearchResultsHeader = () => {
  return (
    <div css={headerStyles}>
      <h1>Search Results</h1>
    </div>
  );
};

export default SearchResultsHeader;
