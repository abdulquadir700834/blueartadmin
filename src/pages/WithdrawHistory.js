import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import PaginationNew from "../pages/PaginationNew";
import { useWithdrawHistoryQuery } from "../Store/Store";
import Loader from "../components/loader/Loader";

const WithdrawHistory = ({ }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const { data, isLoading } = useWithdrawHistoryQuery({
        page: currentPage,
        search: searchTerm,
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
    const currentPosts = posts?.filter((value) => {
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
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        setCurrentPage(1); // Reset the current page to 1
    };

    return (
        <>
            <ToastContainer></ToastContainer>
            {isLoading && <Loader />}
            <div className="admin-wrapper-table">
                <div className="container" >
                    <p style={{ fontSize: "2rem", color: "#fff", fontWeight: "800" }}>Withdraw History List</p>
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
                    <div className="table-responsive border shadow-sm dashboard-table activity-table min-ht">
                        <table className="table">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Amount</th>
                                    <th scope="col">Currency</th>
                                    <th scope="col" className="text-center">From</th>
                                    <th scope="col" className="text-center">To</th>
                                    <th scope="col" className="text-center">TransactionHash</th>
                                    <th scope="col" className="text-center">createdAt</th>
                                    <th scope="col" className="text-center">updatedAt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentPosts?.map((datas, index) => (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{datas.Amount}</td>
                                            <td>{datas.Currency}</td>
                                            <td>{datas.From}</td>
                                            <td>{datas.To}</td>
                                            <td>{datas.TransactionHash}</td>
                                            <td>{datas.createdAt}</td>
                                            <td>{datas.updatedAt}</td>
                                        </tr>
                                    ))}
                                {currentPosts?.length === 0 && <tr><td colSpan={8} scope="col" className="text-center">No Records Found</td></tr>}
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

export default WithdrawHistory;