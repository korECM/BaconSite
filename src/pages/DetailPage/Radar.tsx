import React, { Suspense } from 'react';
import styled from 'styled-components';
import { ShopUIInterface } from '../../modules/detail';
import palette, { hexToRGB } from '../../styles/palette';
import { GridLoader } from 'react-spinners';

const RadarContainer = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 15px;
  margin: 30px 0;

  -webkit-box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
`;

const Loader = styled.div`
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface RadarProps {
  shop: ShopUIInterface;
}

const RadarChart = React.lazy(() => import('./RadarProxy'));

function Radar({ shop }: RadarProps) {
  let max =
    Math.max(shop.keyword.atmosphere, shop.keyword.costRatio, shop.keyword.group, shop.keyword.individual, shop.keyword.riceAppointment, shop.keyword.spicy) |
    1;

  return (
    <RadarContainer>
      <Suspense
        fallback={
          <Loader>
            <GridLoader color={palette.mainRed} />
          </Loader>
        }
      >
        <RadarChart
          height={220}
          data={{
            labels: ['분위기', '가성비', '단체', '혼밥', '밥약', '매워요'],
            datasets: [
              {
                data: [
                  shop.keyword.atmosphere / max,
                  shop.keyword.costRatio / max,
                  shop.keyword.group / max,
                  shop.keyword.individual / max,
                  shop.keyword.riceAppointment / max,
                  shop.keyword.spicy / max,
                ],
                borderColor: hexToRGB(palette.mainRed, 0.8),
                borderWidth: 1.5,
                backgroundColor: hexToRGB(palette.mainRed, 0.2),
                pointRadius: 0,
                pointBackgroundColor: hexToRGB(palette.mainRed, 0.8),
              },
            ],
          }}
          options={{
            legend: {
              display: false,
            },
            scale: {
              ticks: {
                display: false,
                stepSize: 0.2,
              },
              gridLines: {
                // color: 'transparent',
              },
              angleLines: {
                // color: 'transparent',
              },
            },
          }}
        />
      </Suspense>
    </RadarContainer>
  );
}

export default Radar;
