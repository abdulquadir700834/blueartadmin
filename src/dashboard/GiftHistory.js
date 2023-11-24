import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useGetGiftNFTHistoryListQuery } from "../Store/Store";
import PaginationNew from "../pages/PaginationNew";
import Loader from "../components/loader/Loader";

const GiftHistory = ({ module }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, isLoading } = useGetGiftNFTHistoryListQuery({
        page: currentPage
    });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [postsPerPage, setPostsPerPage] = useState(10);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setPosts(data?.data);
        }
        fetchPosts()
    }, [data])

    const totalCount = data?.count;
    const totalPages = Math.ceil(totalCount / postsPerPage);
    const currentPosts = posts?.slice(0, 10) || [];
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <ToastContainer></ToastContainer>
            {isLoading && <Loader />}
            <div className="admin-wrapper-table">
                <div className="container" >
                    <p style={{ fontSize: "2rem", color: "#fff", fontWeight: "800" }}>Gift History</p>
                    <div className="table-responsive border shadow-sm dashboard-table activity-table min-ht">
                        <table className="table">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">ItemName</th>
                                    <th scope="col" className="text-center">Email</th>
                                    <th scope="col">Created At</th>
                                    <th scope="col">Updated At</th>
                                    <th scope="col">HistoryType</th>
                                    <th scope="col">Price</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    currentPosts?.map((datas, index) => (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{datas.ItemName}</td>
                                            <td className="text-center">{datas.Email}</td>
                                            <td>{datas.createdAt}</td>
                                            <td>{datas.updatedAt}</td>
                                            <td>{datas.HistoryType}</td>
                                            <td>{datas.Price}</td>
                                        </tr>
                                    ))}
                                {currentPosts?.length === 0 && <tr><td colSpan={7} scope="col" className="text-center">No Records Found</td></tr>}
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

export default GiftHistory;