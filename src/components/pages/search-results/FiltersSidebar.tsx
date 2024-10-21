/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const sidebarStyles = css`
  width: 250px;
  padding: 20px;
  border-right: 1px solid #ccc;
`;

const FiltersSidebar = () => {
  return (
    <div css={sidebarStyles}>
      <h3>Filters</h3>
      {/* Add filter components here */}
    </div>
  );
};

export default FiltersSidebar;
