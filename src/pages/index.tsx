/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import CTA from '../components/pages/landing/CTA';
import Hero from '../components/pages/landing/Hero';

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function HomePage() {
  return (
    <div css={containerStyle}>
      <Hero />
      <CTA />
    </div>
  );
}
