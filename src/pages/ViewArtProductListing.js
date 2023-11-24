import React from 'react'
import { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";
import { toast, ToastContainer } from 'react-toastify';
import {
    useGetArtworksMoreInfoMutation, useGetEditartItemAccountMoreInfoMutation,
    useGetArtEditionMoreInfoMutation
} from "../Store/Store";
import { Link, useParams } from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import { Modal } from 'react-bootstrap';
import Pagination from './Pagination';
import CryptoJS from 'crypto-js';
import Loader from '../components/loader/Loader';

const ViewArtProductListing = ({ setting, module }) => {
    const { id } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [showCategory, setShowCategory] = useState({});
    const [editionData, setEditionData] = useState({});
    const [editdates, responseInfo2] = useGetArtworksMoreInfoMutation();
    const [editEdition, responseInfo3] = useGetArtEditionMoreInfoMutation({
        page: currentPage
    });
    const [editartItem, responseInfo] = useGetEditartItemAccountMoreInfoMutation();
    const [editCategory, setEditCategory] = useState({});
    const [approveStatus, setApproveStatus] = useState(false);
    const [isImageBig, setIsImageBig] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [postsPerPage, setPostsPerPage] = useState(10);

    const toggleImageSize = () => {
        setIsImageBig(!isImageBig);
    };

    const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc);
        setIsImageBig(true);
    };

    const decryptedItem = CryptoJS.AES.decrypt(id, process.env.REACT_APP_SECRET_PASS).toString(CryptoJS.enc.Utf8);

    const getOneData = async () => {
        setIsLoading(true)
        const updateUserDetails = await editdates({ "Id": decodeURIComponent(decryptedItem), })
        .then(res => {
            setShowCategory(res?.data?.info, "res")
            setIsLoading(false)
        })
        setApproveStatus(showCategory[0]?.ApproveStatus)
    }

    const getEditionData = async (page = 1) => {
        const getEditionDetails = await editEdition({
            "Id": decodeURIComponent(decryptedItem),
            "page": page,
            "limit": 10,
        }).then(res => setEditionData(res?.data?.info, "res"))
    }

    const totalCount = responseInfo3?.data?.count;
    const totalPages = Math.ceil(totalCount / postsPerPage);
    const currentPosts = responseInfo3.data?.data?.slice(0, 10) || [];
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const getEditArtItem = async (status) => {
        const updateEditItem = await editartItem({
            "Id": decodeURIComponent(decryptedItem),
            "ApproveStatus": status
        }).then(res => setEditCategory(res?.data, "ress"))
    }

    const handleClick = () => {
        const newApproveStatus = !approveStatus; // Toggle the approveStatus value
        setApproveStatus(newApproveStatus); // Update the state
        localStorage.setItem('approveStatus', String(newApproveStatus));
        // Call the API with the newApproveStatus value only when "Approved" is selected
        if (newApproveStatus) {
            getEditArtItem(newApproveStatus);
        }
    };

    useEffect(() => {
        if (responseInfo?.data?.status) {
            toast?.success(responseInfo?.data?.info)
            setTimeout(() => (window.location.href = "/artproductlisting"), 1000);
        } else {
            toast?.error(responseInfo?.data?.message)
        }
    }, [responseInfo])

    useEffect(() => {
        getOneData();
        getEditionData();
    }, [])
    return (
        <>
         {isLoading && <Loader />}
            <div className="admin-wrapper">
                <ToastContainer></ToastContainer>
                <div className="">
                    <div className="row g-4 justify-content-center">
                        <div className='d-flex flex-wrap justify-content-end px-5'>
                            <div className=''>
                                <div className='btn-right'>
                                    <Link className="btn btn-danger  btn-sm w-10" to="/artproductlisting" >
                                        <i class="bi bi-chevron-double-left"></i>Back
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <Tab.Container id="left-tabs-example" defaultActiveKey="General">
                            <Row>
                                <Col sm={3} className="py-4">
                                    <Nav variant="pills" className="flex-column">
                                        <p style={{ fontSize: "2rem", color: "#fff", fontWeight: "800" }}>Art Product Listing</p>
                                        <div className="card">
                                            <div className="card-body">
                                                <Nav.Item>
                                                    <Nav.Link eventKey="General">General Info</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="Artist">Artist Details</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="Pricing">Pricing</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="Logistics">Logistics</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="Image">Image</Nav.Link>
                                                </Nav.Item>
                                                <Nav.Item>
                                                    <Nav.Link eventKey="Edition">Edition</Nav.Link>
                                                </Nav.Item>
                                            </div>
                                        </div>
                                    </Nav>
                                </Col>
                                <Col sm={9}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="General">
                                            <p style={{ marginLeft: "50px", fontSize: "2rem", color: "#fff", fontWeight: "800" }}>General Info</p>
                                            <div className="card">
                                                <div className="card-body p-4 p-sm-5">
                                                    <Form >
                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Title</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.Title}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Year of Creation</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.CreationYear}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Medium ( Art Category )</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.ProductCategory}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Brand</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.ProductBrand}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Fabric</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.ProductFabric}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Material</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{String(showCategory[0]?.ProductMaterial)}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Name</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{String(showCategory[0]?.ProductName)}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Shape</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.ProductShape}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Size</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.ProductSize}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Type</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.ProductType}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Technique</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.ProductTechnique}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Publisher</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.Publisher}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Height</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.Height} {showCategory[0]?.Dimension}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Width</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.Width} {showCategory[0]?.Dimension}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Depth</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.Depth} {showCategory[0]?.Dimension}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className="col">
                                                                    <label className="labes">Approve Status</label>
                                                                </div>

                                                                <div className="col">
                                                                    <select className="btn btn-primary" name="status"
                                                                        onClick={handleClick}
                                                                        value={showCategory[0]?.ApproveStatus ? "Approved" : "Penidng"}
                                                                        disabled={showCategory[0]?.ApproveStatus}
                                                                    >
                                                                        <option value="Pending">Pending</option>
                                                                        <option value="Approved">Approved</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </Form>
                                                </div>
                                            </div>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="Artist">
                                            <p style={{ marginLeft: "50px", fontSize: "2rem", color: "#fff", fontWeight: "800" }}>Artist Details</p>
                                            <div className="card">
                                                <div className="card-body p-4 p-sm-5">
                                                    <Form >
                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Figurative/Abstract</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{String(showCategory[0]?.Figurative ? 'Yes' : 'No')}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Artwork part of the series</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.Series}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Condition report</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.Condition}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Signature, date, additional labels</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.Signature}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Description</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.Description}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                </div>
                                            </div>
                                        </Tab.Pane>

                                        <Tab.Pane eventKey="Pricing">
                                            <p style={{ marginLeft: "50px", fontSize: "2rem", color: "#fff", fontWeight: "800" }}>Pricing</p>
                                            <div className="card">
                                                <div className="card-body p-4 p-sm-5">
                                                    <Form >
                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Physical Art price</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{String(showCategory[0]?.PhysicalPrice)} {showCategory[0]?.Currency}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Digital Art price</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.DigitalPrice} {showCategory[0]?.Currency}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Price negotiation</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.PriceDisplay ? 'Yes' : 'No'}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Price transparency</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.PriceTransparency}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                </div>
                                            </div>
                                        </Tab.Pane>

                                        <Tab.Pane eventKey="Logistics">
                                            <p style={{ marginLeft: "50px", fontSize: "2rem", color: "#fff", fontWeight: "800" }}>Logistics</p>
                                            <div className="card">
                                                <div className="card-body p-4 p-sm-5">
                                                    <Form >
                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Framed</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{String(showCategory[0]?.Framed ? 'Yes' : 'No')}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Panel</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.Panel}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Packaging</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.Packaging}</p>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Package Height</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.PackageHeight} {showCategory[0]?.PackageDimension}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Package Width</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.PackageWidth} {showCategory[0]?.PackageDimension}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Package Depth</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.Depth} {showCategory[0]?.PackageDimension}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Package Weight</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.PackageWeightValue} {showCategory[0]?.PackageWeight}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>AutoAcceptOffers</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{showCategory[0]?.AutoAcceptOffers ? 'Yes' : 'No'}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>AutoRejectOffers</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <p className='text-white'>{String(showCategory[0]?.AutoRejectOffers ? 'Yes' : 'No')}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                </div>
                                            </div>
                                        </Tab.Pane>

                                        <Tab.Pane eventKey="Image">
                                            <p style={{ marginLeft: "50px", fontSize: "2rem", color: "#fff", fontWeight: "800" }}>Image</p>
                                            <div className="card">
                                                <div className="card-body p-4 p-sm-5">
                                                    <Form >
                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Thumb</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <img
                                                                        className="banner-image-pre"
                                                                        alt=""
                                                                        src={showCategory[0]?.Thumb}
                                                                        onClick={() => handleImageClick(showCategory[0]?.Thumb)}
                                                                    ></img>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Media</p>
                                                                </div>
                                                                <div className='col-6'>
                                                                    <img
                                                                        className="banner-image-pre"
                                                                        alt=""
                                                                        src={showCategory[0]?.Media}
                                                                        onClick={() => handleImageClick(showCategory[0]?.Media)}
                                                                    ></img>                                                                                        </div>
                                                            </div>
                                                        </div>
                                                    </Form>
                                                </div>
                                            </div>
                                        </Tab.Pane>

                                        <Tab.Pane eventKey="Edition">
                                            <p style={{ marginLeft: "50px", fontSize: "2rem", color: "#fff", fontWeight: "800" }}>Edition</p>
                                            <div className="card">
                                                <div className="card-body p-4 p-sm-5">
                                                    <Form >
                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className='col-6'>
                                                                    <p className='text-white'>Edition</p>
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div className="table-responsive border shadow-sm dashboard-table activity-table min-ht">
                                                            <table className="table">
                                                                <thead className="table-dark">
                                                                    <tr>
                                                                        <th scope="col">Edition</th>
                                                                        <th scope="col">PhysicalArt</th>
                                                                        <th scope="col">Price</th>
                                                                        <th scope="col">HasOffer</th>
                                                                        <th scope="col">HasBid</th>
                                                                        <th scope="col">Current Owner</th>
                                                                    </tr>
                                                                </thead>

                                                                <tbody>
                                                                    {currentPosts?.map((datas, index) => (
                                                                        <tr>
                                                                            <td>Edition {datas?.Edition}</td>
                                                                            <td>{datas?.PhysicalArt === true ? "Physical Art" : "Digital Art"}</td>
                                                                            <td>{datas?.Price}</td>
                                                                            <td>{datas?.HasOffer === true ? "Yes" : "No"}</td>
                                                                            <td>{datas?.HasBid === true ? "Yes" : "No"}</td>
                                                                            <td>{datas?.UserName}</td>
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
                                                    </Form>
                                                </div>
                                            </div>
                                        </Tab.Pane>

                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </div>
                </div>
            </div>

            <Modal show={isImageBig} onHide={toggleImageSize} centered>
                <Modal.Body>
                    {selectedImage && (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <img
                                src={selectedImage}
                                style={{ maxWidth: "100%", }}
                                alt="Expanded Image"
                            />
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ViewArtProductListing