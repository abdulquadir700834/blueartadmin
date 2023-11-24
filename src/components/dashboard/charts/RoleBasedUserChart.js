import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useGetUserDetailQueryQuery } from '../../../Store/Store';

const RoleBasedUserChart = (props) => {
  const monthdata = useGetUserDetailQueryQuery();
  console.log("rulesMOnthChart:", monthdata)
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
      const graphData = monthdata.data.Total;

      const roles = graphData.map(data => {
        if (data.Role === 'Collector') {
          return 'Private Collector';
        }
        return data.Role;
      });
      const userCounts = graphData.map(data => parseInt(data.UserCount));

      console.log("userCounts:", userCounts, roles)


      const updatedOptions = {
        series: userCounts,
        options: {
          chart: {
            width: 380,
            type: 'donut',
            foreColor: '#ffffff',
          },
          dataLabels: {
            enabled: false
          },
          labels: roles,
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
    <div className="col-12 col-xxl-6">

      <div className="card border-0 shadow-sm">
        <div className="card-body p-4 pb-0">
          <h5 className="ms-3">{props.title}</h5>

          <div  style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
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

    </div>
  )
}

export default RoleBasedUserChart;