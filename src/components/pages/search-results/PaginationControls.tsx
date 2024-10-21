/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const paginationStyles = css`
  display: flex;
  justify-content: center;
  padding: 20px;

  button {
    margin: 0 10px;
    padding: 10px 15px;
    border: none;
    background-color: #0070f3;
    color: white;
    cursor: pointer;

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PaginationControls = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div css={paginationStyles}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
