import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useGetItemDetailQueryQuery } from '../../../Store/Store';

const ArtWorkDetailChart = (props) => {
  const monthdata = useGetItemDetailQueryQuery();
  console.log("artworkMOnthChart:", monthdata)
  const [chartOptions, setChartOptions] = useState({
    series: [],
    options: {
      chart: {
        type: 'donut',
        foreColor: '#ffffff',
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.6,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
    },
  });

  useEffect(() => {
    if (monthdata.data) {
      const graphData = monthdata.data;

      const labels = Object.keys(graphData).filter(key => key !== 'status');;
      const values = Object.values(graphData).filter((val, index) => Object.keys(graphData)[index] !== 'status')
 
      console.log("artValues:", values)
      const updatedOptions = {
        series: values,
        options: {
          chart: {
            width: 380,
            type: 'donut',
            foreColor: '#ffffff',
          },
          dataLabels: {
            enabled: false
          },
          labels: labels,
          colors: ['#00308F', '#008FFB', '#3457D5', '#72A0C1'], // Adjust colors as needed
          legend: {
            show: true,
          },
        },
      };

      setChartOptions(updatedOptions);
    }
  }, [monthdata]);

  return (
    <div className="col-6 col-xxl-6">

      <div className="card border-0 shadow-sm" style={{display:'inline-flex'}}>
        <div className="card-body p-4 pb-0">
          <h5 className="ms-3">{props.title}</h5>
            <Chart
              options={chartOptions.options}
              series={chartOptions.series}
              type="donut"
              width="380"
              height={320}
            />
        </div>
      </div>

    </div>
  )
}

export default ArtWorkDetailChart;