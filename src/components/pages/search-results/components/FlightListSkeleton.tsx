/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';

const shimmer = keyframes`
  0% {
    background-position: -400px 0;
  }
  100% {
    background-position: 400px 0;
  }
`;

const skeletonListStyles = css`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 0;
`;

const skeletonCardStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: var(--color-background);
  border-radius: 8px;
  height: 100px;  /* Slightly taller */
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    90deg,
    var(--color-background) 25%,
    var(--color-muted) 50%,
    var(--color-background) 75%
  );
  background-size: 1000px 100%;
  animation: ${shimmer} 1.5s infinite linear;
`;

const skeletonTextStyles = css`
  width: 150px;
  height: 16px;
  background-color: var(--color-muted);
  border-radius: 4px;
  margin-bottom: 8px;
`;

const skeletonButtonStyles = css`
  width: 100px;
  height: 40px;
  background-color: var(--color-muted);
  border-radius: 4px;
`;

interface FlightListSkeletonProps {
  count?: number; // Allowing dynamic skeleton count
}

export default function FlightListSkeleton({ count = 5 }: FlightListSkeletonProps) {
  const skeletonItems = new Array(count).fill(null); // Dynamically create 'count' skeleton items

  return (
    <div css={skeletonListStyles}>
      {skeletonItems.map((_, index) => (
        <div key={index} css={skeletonCardStyles}>
          <div>
            <div css={skeletonTextStyles} />
            <div css={skeletonTextStyles} style={{ width: '100px' }} />
          </div>
          <div css={skeletonButtonStyles} />
        </div>
      ))}
    </div>
  );
}
