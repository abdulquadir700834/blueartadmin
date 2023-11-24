import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LiveBidsData from "../data/dashboard/live-bids-data.json";
import Pagination from "../pages/Pagination";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import Loader from "../components/loader/Loader";
import { useGetUserRoleInfoQuery, useDeleteCategoryMutation } from "../Store/Store";
import CryptoJS from 'crypto-js';

const UserRole = ({ module }) => {

    const [count, setCount] = useState(8);
    const countSlice = LiveBidsData.slice(0, count);
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading } = useGetUserRoleInfoQuery({
        page: currentPage,
    });
    console.log("all data posts", data)

    const [deleteCategory, responseInfo] = useDeleteCategoryMutation();
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
    console.log("currentPosts", currentPosts)
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    console.log("category data", data);

    useEffect(() => {
        console.log(responseInfo, "responseInfo");
        if (responseInfo?.data?.status === true) {
            toast?.success(responseInfo?.data?.message)
        } else {
            toast?.error(responseInfo?.data?.message)
        }
    }, [responseInfo])
    return (
        <>
            <ToastContainer></ToastContainer>
            {isLoading && <Loader />}
            <div className="admin-wrapper-table">
                <div className="container" >
                    <p style={{ fontSize: "2rem", color: "#fff", fontWeight: "800" }}>User Role & Agreement Management</p>
                    <div className="table-responsive border shadow-sm dashboard-table activity-table min-ht">
                        <table className="table">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Role</th>
                                    {
                                        module?.UserRoleModule?.Write &&
                                        <th scope="col" className="text-center">Edit</th>
                                    }
                                    {
                                        module?.UserRoleModule?.Read &&
                                        <th scope="col" className="text-center">View</th>
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentPosts?.map((datas, index) => {
                                        const encryptedItemId = CryptoJS.AES.encrypt(datas?._id.toString(), process.env.REACT_APP_SECRET_PASS).toString();
                                        return (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{datas.Role}</td>
                                            {
                                                module?.UserRoleModule?.Write && (
                                                    <td className="text-center">
                                                        <Link to={`/edit-user-role/${encodeURIComponent(encryptedItemId)}`}>
                                                            <i class="bi bi-pencil"></i>
                                                        </Link>
                                                    </td>
                                                )
                                            }
                                            {
                                                module?.UserRoleModule?.Read && (
                                                    <td className="text-center">
                                                        <Link to={`/view-user-role/${encodeURIComponent(encryptedItemId)}`}>
                                                            <i class="bi bi-eye-fill"></i>
                                                        </Link>
                                                    </td>
                                                )
                                            }
                                        </tr>
                                    )
                                })}
                                {currentPosts?.length === 0 && <tr><td colSpan={4} scope="col" className="text-center">No Records Found</td></tr>}
                            </tbody>
                        </table>

                        <div className="container" style={{ marginTop: "2rem" }}>
                            <Pagination
                                postsPerPage={postsPerPage}
                                totalPosts={data?.data?.length}
                                paginate={paginate}
                                totalPages={totalPages}
                                currentPage={currentPage}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserRole;