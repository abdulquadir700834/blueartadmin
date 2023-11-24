import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import ScrollAnimation from 'react-animate-on-scroll';
import { useGetTensalesQuery } from '../../../Store/Store';
const StatisticsChart = (props) => {
    const { title, subTitle } = props;

    const tenrecords = useGetTensalesQuery();
    const [tenSales, setTenSales] = useState([])
    const [chartData] = useState({
        series: [{
            data: tenSales
        }],
        options: {
            chart: {
                sparkline: {
                    enabled: true
                }
            },
            colors: ['#dc4135'],
            stroke: {
                show: true,
                curve: 'smooth',
                width: 3
            },
            tooltip: {
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function (seriesName) {
                            return ''
                        }
                    }
                },
                marker: {
                    show: false
                }
            }
        }
    });
    console.log("tenSales",tenSales);
    useEffect(() => {
        if(tenrecords.status === "fulfilled"){
            console.log("tenrecords",tenrecords?.data?.data?.item_count)
            if(tenrecords?.data?.data?.item_count?.length > 0){
                tenrecords?.data?.data?.item_count?.map((elem,index) => {
                    tenSales.push(elem.price)
                })
                
            }
        }
        
    },[tenrecords])
    return (
        <>
            <div className="col-12 col-sm-12">

                <div className="card border-0 shadow-sm">
                    <div className="card-body p-4">
                        <div className="d-flex align-items-center justify-content-between">
                            <div>
                                <h5 className="mb-2">
                                    {title}
                                </h5>
                                <span>
                                    {subTitle}
                                </span>
                            </div>

                            <Chart
                                className="ms-auto"
                                options={chartData.options}
                                series={chartData.series}
                                type="line"
                                width={100}
                                height={42}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default StatisticsChart;