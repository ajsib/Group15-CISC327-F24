/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

interface LoadMoreButtonProps {
  onClick: () => void;
}

const buttonContainerStyles = css`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 800px;
  margin: 16px auto;
`;

const buttonStyles = css`
  padding: 12px 24px;
  background-color: var(--color-primary);
  color: var(--color-component-bg);
  border: none;
  cursor: pointer;
  border-radius: 4px;
  width: 100%;

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
