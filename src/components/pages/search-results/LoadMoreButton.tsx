// components/pages/search-results/LoadMoreButton.tsx

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface LoadMoreButtonProps {
  onClick: () => void;
}

const buttonContainerStyles = css`
  display: flex;
  justify-content: center;
  padding: 16px;
`;

const buttonStyles = css`
  padding: 12px 24px;
  background-color: var(--color-primary);
  color: var(--color-component-bg);
  border: none;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: var(--color-secondary);
  }
`;

export default function LoadMoreButton({ onClick }: LoadMoreButtonProps) {
  return (
    <div css={buttonContainerStyles}>
      <button css={buttonStyles} onClick={onClick}>
        Load More
      </button>
    </div>
  );
}
