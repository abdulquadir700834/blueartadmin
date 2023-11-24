import { useEffect, useState } from "react";
import DashboardHeader from "../components/dashboard/header/DashboardHeader";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Pagination from "../pages/Pagination";
import Loader from "../components/loader/Loader";
import { useGetArtcollectionListQuery } from "../Store/Store";

const ArtCollection = ({module}) => {

    const [currentPage, setCurrentPage] = useState(1);

    const { data , isLoading} = useGetArtcollectionListQuery({
        page: currentPage,
      });
    console.log("data",data)
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [postsPerPage, setPostsPerPage] = useState(10);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setPosts(data?.info);
            console.log("all posts", posts)
        }
        fetchPosts()
    }, [data])

    const totalCount = data?.count;
    const totalPages = Math.ceil(totalCount / postsPerPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexofFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data?.data?.slice(0, 10) || [];
    console.log("currentPostsCollection",currentPosts)
    const paginate = pageNumber => setCurrentPage(pageNumber);
    
  
    return (
        <>
            <ToastContainer></ToastContainer>
            {isLoading && <Loader />}
            <div className="admin-wrapper-table">
                <div className="container" >
                <p style={{fontSize: "2rem", color: "#fff", fontWeight: "800" }}>ArtCollection</p>
                        <div className="table-responsive border shadow-sm dashboard-table activity-table min-ht">
                            <table className="table">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">UserName</th>
                                        <th scope="col">Email</th>
                                        <th scope="col" className="text-center">More Info</th>
                                        </tr>
                                </thead>
                                <tbody>

                                    {
                                        currentPosts?.map((datas, index) => (
                                            <tr>
                                                <th scope="row">{index + 1}</th>
                                                <td>{datas.UserName}</td>
                                                <td>{datas.Email }</td>
                                                <td className="text-center">
                                                    <Link
                                                to={`/artcollection-list-info/${datas._id}`}
                                                >
                                                    <i class="bi bi-info-circle text-white"></i>
                                                </Link></td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>

                            <div className="container" style={{ marginTop: "2rem" }}>
                                <Pagination
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

export default ArtCollection;