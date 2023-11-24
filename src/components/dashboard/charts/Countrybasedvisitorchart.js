import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useGetProfileViewsByCountryQuery } from '../../../Store/Store';

const GetProfileViewsByCountry = (props) => {
  const monthdata = useGetProfileViewsByCountryQuery();
  const [chartOptions, setChartOptions] = useState({
    series: [
      {
        name: 'Visitors',
        data: [],
      },
    ],
    options: {
      chart: {
        type: 'area',
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        labels: {
          style: {
            colors: ['#8480ae'],
            fontFamily: 'DM Sans, sans-serif',
          },
        },
        title: {
          style: {
            fontSize: '12px',
            fontFamily: 'DM Sans, sans-serif',
          },
        },
      },
      tooltip: {
        theme: 'dark',
        x: {
          show: false,
        },
        style: {
          fontSize: '12px',
          fontFamily: 'DM Sans, sans-serif',
        },
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
      grid: {
        yaxis: {
          lines: {
            show: false
          }
        }
      },
    },
  });

  useEffect(() => {
    if (monthdata.data) {
      const graphData = monthdata.data.info;
      const categories = graphData.map(data => data.country);  // Unique country names for x-axis
      const seriesData = graphData.map(data => parseInt(data.count));  // Count for y-axis

      const graphUsername = graphData.map(data => data.user_info)

      const updatedOptions = {
        series: [
          {
            name: 'Visitors',
            data: seriesData,
          },
        ],
        options: {
          chart: {
            type: 'area',
          },
          xaxis: {
            categories: categories,
          },
          tooltip: {
            theme: 'dark',
            x: {
              show: false,
            },
            style: {
              fontSize: '12px',
              fontFamily: 'DM Sans, sans-serif',
            },
            custom: ({ seriesIndex, dataPointIndex, w }) => {
              const selectedData = graphUsername?.[dataPointIndex];
              const userDetails = selectedData
                ? `UserName: ${selectedData.username}`
                : '';

              return `<div class="custom-tooltip">${userDetails}</div>`;
            },
          },
        },
      };

      setChartOptions(updatedOptions);
    }
  }, [monthdata]);

  // Render the chart
  return (
    <div className="col-6 col-xxl-6">
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4 pb-0">
          <h5 className="ms-3">{props.title}</h5>
          <Chart
            options={chartOptions.options}
            series={chartOptions.series}
            type="area"
            width="100%"
            height={320}
          />
        </div>
      </div>
    </div>
  );
}

export default GetProfileViewsByCountry;

