import React from 'react';
import {Bar} from 'react-chartjs-2';
import {CategoryScale} from 'chart.js'; 
import Chart from 'chart.js/auto';

Chart.register(CategoryScale);

function ApexChart(props) {
    const data = {
        labels: props.dat[1],
        datasets: [
          {
            label: 'expenses',
            data: props.dat[0],
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',

          }
        ]
      };
  return (
    <div>
        <h2>______My expenses______</h2>
        <Bar
          data={data}
          width={700}
          height={400}
          options={{
            maintainAspectRatio: false,responsive:false
          }}
        />
    </div>
  );
}
export default ApexChart;