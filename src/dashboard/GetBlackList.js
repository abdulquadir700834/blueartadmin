import { useEffect, useState } from "react";
import LiveBidsData from "../data/dashboard/live-bids-data.json";
import Pagination from "../pages/Pagination";
import { ToastContainer, toast } from "react-toastify";
import { useDeleteCategoryMutation, useGetBlockListQueryQuery } from "../Store/Store";


const Activities = () => {

    const [count, setCount] = useState(8);
    const [category, setCategory] = useState("");
    const [noMorePost, setNoMorePost] = useState(false);
    const countSlice = LiveBidsData.slice(0, count);
    const [image, setImage] = useState('');
    const HtmlToReactParser = require('html-to-react').Parser
    const data = useGetBlockListQueryQuery();
    const [deleteCategory, responseInfo] = useDeleteCategoryMutation();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    console.log(data, "data")

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setPosts(data?.data?.info);
            console.log("all posts", posts)
        }
        fetchPosts()
    }, [data])

    const indexOfLastPost = currentPage * postsPerPage;
    const indexofFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts?.slice(indexofFirstPost, indexOfLastPost)

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            <ToastContainer></ToastContainer>
            <div className="admin-wrapper-table">
                <div className="container" >
                    <div className='row'>
                    </div>

                    <div className="table-responsive border shadow-sm dashboard-table activity-table min-ht">
                        <table className="table">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Token</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentPosts?.map((datas, index) => (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{datas.Type}</td>
                                            <td>{datas?.Value}</td>


                                        </tr>
                                    ))}
                            </tbody>
                        </table>


                        <div className="container" style={{ marginTop: "2rem" }}>
                            <Pagination
                                postsPerPage={postsPerPage}
                                totalPosts={posts?.length}
                                paginate={paginate}
                            />
                        </div>


                    </div>

                </div>
            </div>
        </>
    )
}

export default Activities