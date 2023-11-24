import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useGetItemViewsByMonthQuery } from '../../../Store/Store';
const ItemViewsByMonthQuery = (props) => {
    const monthdata = useGetItemViewsByMonthQuery();
    console.log("monthdataByMonth:", monthdata)

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
            console.log("count", Object.keys(graphData));
            console.log(graphData, "graphData");

            const categories = Object.keys(graphData);
            const counts = Object.values(graphData);

            const updatedOptions = {
                ...chartOptions,
                series: [
                    {
                        ...chartOptions.series[0],
                        data: counts,
                    },
                ],
                options: {
                    ...chartOptions.options,
                    xaxis: {
                        ...chartOptions.options.xaxis,
                        categories: categories,
                    },
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

export default ItemViewsByMonthQuery;