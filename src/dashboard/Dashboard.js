import { Link } from "react-router-dom";
import GetItemViewsByCountry from "../components/dashboard/charts/CountrybasedArtworkChart";
import GetProfileViewsByCountry from "../components/dashboard/charts/Countrybasedvisitorchart";
import GetVisitors from "../components/dashboard/charts/Getvisitor";
import ItemViewsByMonthQuery from "../components/dashboard/charts/MonthlyArtViewChart";
import MonthlyVisitorChart from "../components/dashboard/charts/MonthlyVisitorChart";
import CreateNewButton from "../components/dashboard/createNew/CreateNewButton";
import axios from 'axios';
import { useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import SalesDetailChart from "../components/dashboard/charts/SalesDetailChart";
import RoleBasedUserChart from "../components/dashboard/charts/RoleBasedUserChart";
import ArtWorkDetailChart from "../components/dashboard/charts/ArtWorkDetailChart";
import ArtProductDetailChart from "../components/dashboard/charts/ArtproductDetailChart";

const Dashboard = ({ setting }) => {
    const [data, setdata] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     setIsLoading(true)
    //     const config = {
    //         headers: { Authorization: `Bearer ${sessionStorage.getItem("myToken")}` }
    //     };
    //     axios.get(`${process.env.REACT_APP_BACKEND_URL}Dashboard`, config)
    //         .then(response => {
    //             console.log(response.data);
    //             setdata(response.data);
    //             setIsLoading(false)
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
          
            const config = {
                headers: { Authorization: `Bearer ${sessionStorage.getItem("myToken")}` }
            };
            axios.get(`${process.env.REACT_APP_BACKEND_URL}Dashboard`, config)
                .then(response => {
                    console.log(response.data);
                    setdata(response.data);
                    setIsLoading(false)
                })
                .catch(error => {
                    console.error(error);
                });
        };
        fetchData();
      }, []);

    return (
        <>
         {isLoading && <Loader />}
            <CreateNewButton />
            <div className="admin-wrapper">
                <div className="container">
                    <div className="d-flex flex-wrap mb-2">
                        <div className="col-4 my-2 p-2 " >
                            <Link to="/userkyc">
                                <div className="box-content-dasboard d-flex justify-content-between align-items-center p-2">
                                    <div>
                                        <h3>Total Artist</h3>
                                        <p className="mb-0">{data.ArtistCount}</p>
                                    </div>
                                    <div>
                                        <i class="bi bi-person-circle"></i>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-4 my-2 p-2 " >
                            <Link to="/userkyc">
                                <div className="box-content-dasboard d-flex justify-content-between align-items-center p-2">
                                    <div>
                                        <h3>Total Buyer</h3>
                                        <p className="mb-0">{data.BuyerCount}</p>
                                    </div>
                                    <div>
                                        <i class="bi bi-person-circle"></i>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-4 my-2 p-2 " >
                            <Link to="/userkyc">
                                <div className="box-content-dasboard d-flex justify-content-between align-items-center p-2">
                                    <div>
                                        <h3>Total Private Collector</h3>
                                        <p className="mb-0">{data.CollectorCount}</p>
                                    </div>
                                    <div>
                                        <i class="bi bi-person-circle"></i>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-4 my-2 p-2 " >
                            <Link to="/userkyc">
                                <div className="box-content-dasboard d-flex justify-content-between align-items-center p-2">
                                    <div>
                                        <h3>Total Corporate Collector</h3>
                                        <p className="mb-0">{data.CorperateCollectorCount}</p>
                                    </div>
                                    <div>
                                        <i class="bi bi-person-circle"></i>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-4 my-2 p-2 " >
                            <Link to="/collections">
                                <div className="box-content-dasboard d-flex justify-content-between align-items-center p-2">
                                    <div>
                                        <h3>Total Collections</h3>
                                        <p className="mb-0">{data.TotalCollections}</p>
                                    </div>
                                    <div>
                                        <i class="bi bi-bookmark-star"></i>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-4 my-2 p-2 " >
                            <Link to="/artwork">
                                <div className="box-content-dasboard d-flex justify-content-between align-items-center p-2">
                                    <div>
                                        <h3>Total Artworks</h3>
                                        <p className="mb-0">{data.TotalArtItem}</p>
                                    </div>
                                    <div>
                                        <i class="bi bi-bookmark-check"></i>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-4 my-2 p-2 " >
                            <Link to="/artproductlisting">
                                <div className="box-content-dasboard d-flex justify-content-between align-items-center p-2">
                                    <div>
                                        <h3>Total Art Products</h3>
                                        <p className="mb-0">{data.TotalProductItem}</p>
                                    </div>
                                    <div>
                                        <i class="bi bi-bookmark-check"></i>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="col-4 my-2 p-2 " >
                            <Link to="/gift">
                                <div className="box-content-dasboard d-flex justify-content-between align-items-center p-2">
                                    <div>
                                        <h3>Total Gift NFTS</h3>
                                        <p className="mb-0">{data.TotalGift}</p>
                                    </div>
                                    <div>
                                        <i class="bi bi-boxes"></i>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="row g-4">

                        <div className="col-12 col-xxl-6 d-none">
                            <div className="row g-4">
                            </div>
                        </div>

                        <div className="row g-4">
                            {/* Monthly Visitor Chart */}
                            <MonthlyVisitorChart
                                title="Monthly Profile Visitors"
                            />

                            <ItemViewsByMonthQuery
                                title="Monthly Artwork Visitors"
                            />
                        </div>

                        <div className="row g-4">
                            <GetProfileViewsByCountry title="Country Based Profile Visitors" />

                            <GetItemViewsByCountry title="Country Based Artwork Visitors" />
                        </div>

                        <div className="row g-4">

                            <GetVisitors title="Visitor List" />

                            <SalesDetailChart title="Sales Detail" />
                        </div>

                        <div style={{ display: 'flex' }}>

                            <ArtWorkDetailChart title="ArtWork Details" />

                            <ArtProductDetailChart title="ArtProduct Details" />
                        </div>
                        <RoleBasedUserChart title="Role Based User Details" />

                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;