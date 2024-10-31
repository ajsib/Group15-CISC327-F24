/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { AirplaneTakeoff, AirplaneLanding } from 'phosphor-react';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import destinationsData from '@/public/dummy_data/destinations.json';

interface InfoBannerProps {
  query: any;
  isReturn: boolean;
}

const bannerContainerStyles = css`
  padding: 40px;
  color: var(--color-text);
  text-align: left;
  max-width: 800px;
  margin: 0 auto 40px auto;
  background-color: transparent;
`;

const titleStyles = css`
  font-size: 36px;
  font-weight: bold;
  color: var(--color-text);
  margin-bottom: 16px;
`;

const flightDetailsStyles = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  color: var(--color-accent);
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--color-border);
`;

const flightTypeStyles = css`
  font-size: 28px;
  font-weight: bold;
  color: var(--color-text);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const dateTextStyles = css`
  font-size: 16px;
  color: var(--color-accent);
`;

const getCityNameByCode = (code: string) => {
  const destination = destinationsData.Destinations.find((dest) => dest.code === code);
  return destination ? destination.city : code;
};

export default function InfoBanner({ query, isReturn }: InfoBannerProps) {
  const Icon = isReturn ? AirplaneLanding : AirplaneTakeoff;
  const titleText = isReturn ? 'Select Return Flight' : 'Select Departing Flight';

  const originCity = getCityNameByCode(query.origin_code);
  const destinationCity = getCityNameByCode(query.destination_code);

  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // Only format the date on the client side
    setFormattedDate(format(new Date(query.departureDate), 'EEEE, MMMM do, yyyy'));
  }, [query.departureDate]);

  return (
    <div css={bannerContainerStyles}>
      <div css={flightTypeStyles}>
        <Icon size={36} />
        <span>{titleText}</span>
      </div>

      <div css={flightDetailsStyles}>
        <span>
          {originCity} ({query.origin_code}) to {destinationCity} ({query.destination_code})
        </span>
        <div css={dateTextStyles}>{formattedDate}</div>
      </div>
    </div>
  );
}
