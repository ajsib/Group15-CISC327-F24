/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import { Airplane } from 'phosphor-react';

// CSS styles
const heroContainerStyle = css`
  position: relative;
  width: 100%;
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #000; /* Fallback for background image */
  padding-bottom: 80px;
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
  justify-content: center;
  align-items: center;
  color: #fff; /* Ensure text is white */
`;

const titleStyle = css`
  font-size: 3rem;
  font-weight: bold;
  color: #fff; /* Ensure title is white */
`;

const iconStyle = css`
  color: #fff; /* Ensure icon is white */
`;

const subtitleStyle = css`
  font-size: 1.3rem;
  color: #fff; /* Ensure subtitle is white */
`;

export default function Hero() {
  return (
    <section css={heroContainerStyle}>
      {/* Background image */}
      <Image
        src="/images/banner2.jpg"
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
        <Airplane css={iconStyle} size={64} weight="bold" />
        <p css={subtitleStyle}>Find your next dream destination</p>
      </div>
    </section>
  );
}
