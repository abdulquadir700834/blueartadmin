import { useEffect, useState } from "react";
import Chart from 'react-apexcharts';
import { useGetPriceHistoryQuery } from '../../../Store/Store';

const PriceHistory = (props) => {
    const { title, icon } = props;
    const PriceHistoryData = useGetPriceHistoryQuery();
    const [priceHistory, setpriceHistory] = useState([])
    const [priceHistory_xaxis, setpriceHistory_xaxis] = useState([])
    const [chartData, setchartData] = useState({
        series: [{
            name: 'BNB',
            data: priceHistory
        },
        ],
        options: {
            colors: ["#0d6efd", "#0db7f0"],
            chart: {
                zoom: {
                    autoScaleYaxis: true
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '14px',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 500,
                labels: {
                    colors: ["#8480ae"],
                },
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'datetime',
                categories: priceHistory_xaxis,
                labels: {
                    style: {
                        colors: ["#8480ae"],
                        fontFamily: 'DM Sans, sans-serif',
                    },
                },
                tooltip: {
                    enabled: false,
                },
            },
            yaxis: {
                labels: {
                    style: {
                        colors: ["#8480ae"],
                        fontFamily: 'DM Sans, sans-serif',
                    },
                },
                title: {
                    style: {
                        fontSize: '12px',
                        fontFamily: 'DM Sans, sans-serif',
                    },
                },
                crosshairs: {
                    stroke: {
                        color: '#8480ae',
                    },
                },
            },
            tooltip: {
                theme: 'dark',
                x: {
                    format: 'dd/MM/yy HH:mm'
                },
                style: {
                    fontSize: '12px',
                    fontFamily: 'DM Sans, sans-serif',
                },
            },
            grid: {
                show: true,
                borderColor: '#8480ae',
                position: 'back',
            }
        }
    });
    useEffect(() => {
        if (PriceHistoryData.status === "fulfilled") {

            if (PriceHistoryData?.data?.data?.item_count?.length > 0) {
                PriceHistoryData?.data?.data?.item_count?.map((elem, index) => {
                    priceHistory.push(elem.price)
                    priceHistory_xaxis.push(elem.created_date)
                })
                setchartData({
                    series: [{
                        name: 'BNB',
                        data: priceHistory
                    },
                    ],
                    options: {
                        colors: ["#0d6efd", "#0db7f0"],
                        chart: {
                            zoom: {
                                autoScaleYaxis: true
                            },
                            toolbar: {
                                show: false
                            }
                        },
                        dataLabels: {
                            enabled: false
                        },
                        legend: {
                            show: true,
                            position: 'top',
                            fontSize: '14px',
                            fontFamily: 'DM Sans, sans-serif',
                            fontWeight: 500,
                            labels: {
                                colors: ["#8480ae"],
                            },
                        },
                        stroke: {
                            curve: 'smooth'
                        },
                        xaxis: {
                            type: 'datetime',
                            categories: priceHistory_xaxis,
                            labels: {
                                style: {
                                    colors: ["#8480ae"],
                                    fontFamily: 'DM Sans, sans-serif',
                                },
                            },
                            tooltip: {
                                enabled: false,
                            },
                        },
                        yaxis: {
                            labels: {
                                style: {
                                    colors: ["#8480ae"],
                                    fontFamily: 'DM Sans, sans-serif',
                                },
                            },
                            title: {
                                style: {
                                    fontSize: '12px',
                                    fontFamily: 'DM Sans, sans-serif',
                                },
                            },
                            crosshairs: {
                                stroke: {
                                    color: '#8480ae',
                                },
                            },
                        },
                        tooltip: {
                            theme: 'dark',
                            x: {
                                format: 'dd/MM/yy HH:mm'
                            },
                            style: {
                                fontSize: '12px',
                                fontFamily: 'DM Sans, sans-serif',
                            },
                        },
                        grid: {
                            show: true,
                            borderColor: '#8480ae',
                            position: 'back',
                        }
                    }
                })

            }
        }

    }, [PriceHistoryData])
    console.log("PriceHistoryData", PriceHistoryData);
    return (
        <div className="col-12 col-xl-12">

            <div className="card border-0 shadow-sm">
                <div className="card-body p-4 pb-3">
                    <div className="d-flex align-items-center">
                        <img className="me-1" src={`${process.env.PUBLIC_URL}/${icon}`} alt="" />
                        <h5 className="mb-0">
                            {title}
                        </h5>
                    </div>

                    <Chart
                        options={chartData.options}
                        series={chartData.series}
                        type="area"
                        width="100%"
                        height={300}
                    />
                </div>
            </div>
        </div>
    )
}

export default PriceHistory;