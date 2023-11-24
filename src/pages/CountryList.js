import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import PaginationNew from "./PaginationNew";
import { useGetCountryListQuery, useGetEditCountrylistMutation } from "../Store/Store";
import Loader from "../components/loader/Loader";
import { useNavigate } from "react-router-dom";

const CountryList = () => {
    let navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [countryStatus, responseInfo2] = useGetEditCountrylistMutation();
    const [countrySta, setCountryStatus] = useState({})

    const countryData = useGetCountryListQuery({
        page: currentPage,
        search: searchTerm,
    });

    useEffect(() => {
        setLoading(true)
        console.log("countryData:", countryData.status)
        if (countryData.status == 'fulfilled') {
            setLoading(false)
            setPosts(countryData?.data)
        }
        console.log("countryData:", countryData?.data?.count)
    }, [countryData]);

    const totalCount = countryData?.data?.count;
    const totalPages = Math.ceil(totalCount / postsPerPage);
    const currentPosts = posts?.data?.filter((value) => {
        if (searchTerm === "") {
            return true;
        } else {
            for (const property in value) {
                if (
                    value[property] &&
                    value[property].toString().toLowerCase().includes(searchTerm.toLowerCase())
                ) {
                    return true;
                }
            }
            return false;
        }
    })?.slice(0, 10) || [];
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSubmit = (event) => {
        event.preventDefault();
        setCurrentPage(1);
    };


    const getCountryStatusVal = async (id,) => {
        const statusVal = currentPosts.find((item) => item.id === id).Status
        console.log("statusValue:", !statusVal)

        const countryDataItem = await countryStatus({
            "Id": id,
            "Status": !statusVal
        }).then(res => setCountryStatus(res?.data, "ress"))
        console.log(countryDataItem, "details")
    }

    useEffect(() => {
        if (responseInfo2?.data?.status === true) {
            console.log("responseInfoIII:", responseInfo2?.data?.info)
            toast?.success(responseInfo2?.data?.info)
            setTimeout(() => navigate("/country-list"), 1000);
        } else if (responseInfo2?.data?.status === false) {
            toast?.error(responseInfo2?.data?.info)
        }
    }, [responseInfo2])

    return (
        <>
            <ToastContainer></ToastContainer>
            {isLoading && <Loader />}
            <div className="admin-wrapper-table">
                <div className="container" >
                    <div className="row">
                        <div className='col-md-4'>
                            <form onSubmit={handleSubmit}
                                class="example"
                                action="">
                                <input
                                    type="text"
                                    placeholder="Search.."
                                    autoFocus="autoFocus"
                                    value={searchTerm}
                                    onChange={(event) => {
                                        setSearchTerm(event.target.value);
                                    }}
                                    name="search2"
                                />
                                <button
                                    type="submit" >
                                    <i class="fa fa-search"></i>
                                </button>
                            </form>
                        </div>

                    </div>
                    <div className="table-responsive border shadow-sm dashboard-table activity-table min-ht">
                        <table className="table">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Code</th>
                                    <th scope="col">Country Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentPosts?.map((datas, index) => {
                                        return (
                                            <tr>
                                                <th scope="row">{index + 1}</th>
                                                <td>{datas.name}</td>
                                                <td>{datas.code}</td>
                                                <td className="text-center">
                                                    <td className="text-center">
                                                        {datas && datas.Status ? (
                                                            <i className="bi-unlock" onClick={() => getCountryStatusVal(datas?.id)}></i>
                                                        ) : (
                                                            <i className="bi-lock" onClick={() => getCountryStatusVal(datas?.id)}></i>
                                                        )}
                                                    </td>

                                                </td>
                                            </tr>
                                        )
                                    })}
                                {currentPosts?.length === 0 && <tr><td colSpan={5} scope="col" className="text-center">No Records Found</td></tr>}
                            </tbody>
                        </table>

                        <div className="container" style={{ marginTop: "2rem" }}>
                            <PaginationNew
                                postsPerPage={postsPerPage}
                                totalPosts={totalCount}
                                totalPages={totalPages}
                                currentPage={currentPage}
                                paginate={paginate}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CountryList;