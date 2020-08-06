import React from 'react';
import { Radar as RadarChart } from 'react-chartjs-2';
import styled from 'styled-components';
import { ShopUIInterface } from '../../modules/detail';
import palette, { hexToRGB } from '../../styles/palette';

const RadarContainer = styled.div`
  background-color: white;
  border-radius: 20px;
  padding: 15px;
  margin: 30px 0;

  -webkit-box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 20px -1px rgba(0, 0, 0, 0.1);
`;

interface RadarProps {
  shop: ShopUIInterface;
}

function Radar({ shop }: RadarProps) {
  return (
    <RadarContainer>
      <RadarChart
        height={220}
        data={{
          labels: ['분위기', '가성비', '단체', '혼밥', '밥약', '매워요'],
          datasets: [
            {
              data: [
                shop.keyword.atmosphere,
                shop.keyword.costRatio,
                shop.keyword.group,
                shop.keyword.individual,
                shop.keyword.riceAppointment,
                shop.keyword.spicy,
              ],
              borderColor: hexToRGB(palette.mainRed, 0.8),
              borderWidth: 1.5,
              backgroundColor: hexToRGB(palette.mainRed, 0.2),
              pointRadius: 2.5,
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
            },
          },
        }}
      />
    </RadarContainer>
  );
}

export default Radar;
