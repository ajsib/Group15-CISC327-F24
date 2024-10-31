/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import CTA from '../components/pages/landing/CTA';
import Hero from '../components/pages/landing/Hero';
import Footer from '@/components/shared/Footer';

const containerStyles = css`
  position: relative;
  overflow: hidden; /* Prevents scrolling */
  height: 100vh; /* Ensures it takes up the full viewport height */
`;

const ctaContainerStyles = css`
  position: absolute;
  top: 45%; /* Adjust this to move it down */
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000; /* Ensure it's on top of the content */
  width: 100%;
  max-width: 800px;
`;

export default function HomePage() {
  return (
    <>
    <div css={containerStyles}>
      <Hero />
      <div css={ctaContainerStyles}>
        <CTA />
      </div>
    </div>
    {/* <Footer /> */}
    </>
  );
}
