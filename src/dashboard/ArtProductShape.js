import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import PaginationNew from "../pages/PaginationNew";
import { useGetArtProductShapeQuery } from "../Store/Store";
import Loader from "../components/loader/Loader";
import CryptoJS from 'crypto-js';

const ArtProductShape = ({ module }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const { data, isLoading } = useGetArtProductShapeQuery({
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
            console.log("all posts", posts)
        }
        fetchPosts()
    }, [data])

    const totalCount = data?.count;
    const totalPages = Math.ceil(totalCount / postsPerPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexofFirstPost = indexOfLastPost - postsPerPage;

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
    console.log("currentPosts", currentPosts)
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSubmit = (event) => {
        event.preventDefault(); 
        setCurrentPage(1);
    };

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

                        <div className='col-md-4 ms-auto'>
                            <div className='btn-right'>
                                <Link className="btn btn-warning rounded-pill btn-sm w-10" to="/add-artproductshape">
                                    Add Art Product Shape
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive border shadow-sm dashboard-table activity-table min-ht">
                        <table className="table">
                            <thead className="table-dark">
                                <tr>
                                    <th scope="col">S.No</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Status</th>
                                    {
                                        module?.MaterialModule?.Write &&
                                        <th scope="col" className="text-center">Edit</th>
                                    }
                                    {
                                        module?.MaterialModule?.Read &&
                                        <th scope="col" className="text-center">View</th>
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentPosts?.map((datas, index) => {
                                        const encryptedItemId = CryptoJS.AES.encrypt(datas._id.toString(), process.env.REACT_APP_SECRET_PASS).toString();
                                        return(
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{datas.Title}</td>
                                            <td>{datas.Status}</td>
                                            {
                                                module?.MaterialModule?.Write && (
                                                    <td className="text-center">
                                                        <Link to={`/edit-artproductshape/${encodeURIComponent(encryptedItemId)}`}>
                                                            <i class="bi bi-pencil"></i>
                                                        </Link>
                                                    </td>
                                                )
                                            }
                                            {
                                                module?.MaterialModule?.Read && (
                                                    <td className="text-center">
                                                        <Link to={`/view-artproductshape/${encodeURIComponent(encryptedItemId)}`}>
                                                            <i class="bi bi-eye-fill"></i>
                                                        </Link>
                                                    </td>
                                                )
                                            }
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

export default ArtProductShape;