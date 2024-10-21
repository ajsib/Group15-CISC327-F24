// components/pages/search-results/InfoBanner.tsx

/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AirplaneTakeoff, AirplaneLanding } from 'phosphor-react';

interface InfoBannerProps {
  query: any;
  isReturn: boolean;
}

const bannerStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  max-width: 800px;
  margin: 0 auto;
`;

const titleStyles = css`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 24px;
`;

const subtitleStyles = css`
  font-size: 14px;
  color: var(--color-muted);
`;

export default function InfoBanner({ query, isReturn }: InfoBannerProps) {
  const Icon = isReturn ? AirplaneLanding : AirplaneTakeoff;
  const titleText = isReturn ? 'Select Return Flight' : 'Select Departing Flight';
  const flightInfo = `${query.origin} to ${query.destination} | ${query.departureDate}`;

  return (
    <div css={bannerStyles}>
      <div css={titleStyles}>
        <Icon size={32} />
        <span>{titleText}</span>
      </div>
      <div css={subtitleStyles}>{flightInfo}</div>
    </div>
  );
}
