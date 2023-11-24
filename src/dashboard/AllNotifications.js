import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Pagination from "../pages/Pagination";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Loader from "../components/loader/Loader";
import { useGetNotificationsQuery } from "../Store/Store";

const AllNotifications = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const { data, isLoading } = useGetNotificationsQuery({
        page: currentPage,
        search: searchTerm,
    });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [popup, setpopup] = useState({
        show: false,
        data: null
    });
    const handleShow = (index) => {
        console.log(index);
        setpopup({ show: true, data: index });
    };

    const handleClose = () => {
        setpopup({ show: false, data: null });
    };

    const [postsPerPage, setPostsPerPage] = useState(5);

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
                <div className='col-md-4' style={{ margin: "15px" }}>
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
                <div className="container col-10 d-flex flex-column justify-content-center" >
                    {
                        currentPosts?.map((datas, index) => (
                            <div key={index}>
                                <Button
                                    className="d-flex  w-100 justify-content-between align-items-center my-3"
                                    onClick={() => {
                                        handleShow(index)
                                    }}
                                >
                                    <div className="d-flex flex-column align-items-start col-4">
                                        <h4 className="text-capitalize">{datas.ItemName}</h4>
                                        <p className="mb-0 my-2">Name: {datas.UserName}</p>
                                        <p className="mb-0">Email: {datas.Email}</p>
                                    </div>
                                    <div className="d-flex flex-column align-items-center col-4">
                                        <p className="mb-0 my-2">Price: {datas.Price}</p>
                                        <p className="mb-0">Type: {datas.Type}</p>
                                    </div>
                                    <div className="col-4">
                                        <i className="bi bi-info-circle"></i>
                                    </div>
                                </Button>
                            </div>
                        ))
                    }

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

            {popup.data != null && (
                <Modal show={popup.show} onHide={handleClose} backdrop="static" keyboard={false} centered>
                    <Modal.Header closeButton>
                        <Modal.Title style={{ display: 'contents' }}>
                            <span>{currentPosts[popup.data].ItemName}</span>
                            <i class="bi-x" onClick={handleClose}></i>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p> Email : {currentPosts[popup.data].ToEmail}</p>
                        <p>User Id : {currentPosts[popup.data].UserId}</p>
                        <p>Created At : {currentPosts[popup.data].createdAt}</p>
                        <p>updated At : {currentPosts[popup.data].updatedAt}</p>
                    </Modal.Body>
                </Modal>
            )}
        </>
    )
}

export default AllNotifications;