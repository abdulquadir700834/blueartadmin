import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useGetsalesDetailQuery } from '../../../Store/Store';

const SalesDetailChart = (props) => {
  const monthdata = useGetsalesDetailQuery();
  console.log("salesMonth:", monthdata)
  const [chartOptions, setChartOptions] = useState({
    series: [
      {
        name: 'AdminCommission',
        data: [],
      },
      {
        name: 'Listed',
        data: [],
      },
      {
        name: 'Royalty',
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
      stroke: {
        curve: 'smooth'
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
      const graphData = monthdata.data.Total;
      const categories = graphData.map(data => data.month_year); 

      const adminCommissionData = graphData
        .filter(data => data.HistoryType === 'AdminCommission')
        .map(data => ({
          x: data.month_year,
          y: parseInt(data.cumulative_sum),
        }));

      const listedData = graphData
        .filter(data => data.HistoryType === 'Listed')
        .map(data => ({
          x: data.month_year,
          y: parseInt(data.cumulative_sum),
        }));

      const royaltyData = graphData
        .filter(data => data.HistoryType === 'Royalty')
        .map(data => ({
          x: data.month_year,
          y: parseInt(data.cumulative_sum),
        }));

      console.log("adminCommissionData:", royaltyData)

      const updatedOptions = {
        series: [{
          name: 'AdminCommission',
          data: adminCommissionData
        },
        {
          name: 'Listed',
          data: listedData
        },
        {
          name: 'Royalty',
          data: royaltyData
        }
        ],
        options: {
          chart: {
            type: 'area',
            height: 350,
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: categories,
          },
          colors: ['#3F00FF', '#008FFB', '#0039a6'],
        },
      };

      setChartOptions(updatedOptions);
    }
  }, [monthdata]);

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
  )
}

export default SalesDetailChart;