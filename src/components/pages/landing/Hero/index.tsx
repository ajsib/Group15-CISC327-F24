/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';

// CSS styles
const heroContainerStyle = css`
  position: relative;
  width: 100%;
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  background-color: #000; /* Fallback for background image */
`;

const heroImageStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  object-fit: cover;
`;

const overlayStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

const contentStyle = css`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  color: #fff;
  padding: 40px 20px;
`;

const titleStyle = css`
  font-size: 3rem;
  font-weight: bold;
`;

const iconStyle = css`
  font-size: 4rem;
  margin: 20px 0;
`;

const subtitleStyle = css`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

export default function Hero() {
  return (
    <section css={heroContainerStyle}>
      {/* Background image */}
      <Image
        src="/images/banner.jpeg"
        alt="Hero background"
        layout="fill"
        css={heroImageStyle}
        priority
      />
      
      {/* Dark overlay */}
      <div css={overlayStyle}></div>
      
      {/* Content */}
      <div css={contentStyle}>
        <h1 css={titleStyle}>Your Airline Name</h1>
        <p css={subtitleStyle}>Find your next dream destination</p>
      </div>
    </section>
  );
}
