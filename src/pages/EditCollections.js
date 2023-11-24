import React from 'react'
import { useState, useEffect } from 'react'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import {ToastContainer } from 'react-toastify';
import {
    useGetCollectionsMoreInfoMutation
} from "../Store/Store";
import { Link, useParams } from 'react-router-dom'
import { Modal } from 'react-bootstrap';
import CryptoJS from 'crypto-js';
import Loader from '../components/loader/Loader';
import { sassFalse } from 'sass';

const EditCollections = () => {
    const { id } = useParams();
    const [showCategory, setShowCategory] = useState({});
    const [editdates, responseInfo2] = useGetCollectionsMoreInfoMutation();
    const [isImageBig, setIsImageBig] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const decryptedItem = CryptoJS.AES.decrypt(id, process.env.REACT_APP_SECRET_PASS).toString(CryptoJS.enc.Utf8);

    const toggleImageSize = () => {
        setIsImageBig(!isImageBig);
    };

    const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc);
        setIsImageBig(true);
    };
    const getOneData = async () => {
        setIsLoading(true)
        const updateUserDetails = await editdates({ "Id": decodeURIComponent(decryptedItem) })
        .then(res => {
            setShowCategory(res?.data?.info, "res")
            setIsLoading(false)
        })
    }
    useEffect(() => {
        getOneData();
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
                                    <Link className="btn btn-danger  btn-sm w-10" to="/collections" >
                                        <i class="bi bi-chevron-double-left"></i>Back
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <Tabs className="border-0 mb-3 settings-tabs px-3">
                                <Tab eventKey="" title="Collection Info">
                                    <div className="card">
                                        <div className="card-body p-4 p-sm-5">
                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <label className="labes">Name</label>
                                                    </div>
                                                    <div className="col">
                                                        <p className='text-white'>{showCategory?.Name}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col-6">
                                                        <label className="labes">Description</label>
                                                    </div>
                                                    <div className="col-6">
                                                        <p className='text-white'>{showCategory?.Description}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <label className="labes">Currency</label>
                                                    </div>
                                                    <div className="col">
                                                        <p className='text-white'>{showCategory?.Currency}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <label className="labes">ContractSymbol</label>
                                                    </div>
                                                    <div className="col">
                                                        <p className='text-white'>{showCategory?.ContractSymbol}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <label className="labes">ContractAddress</label>
                                                    </div>
                                                    <div className="col">
                                                        <p className='text-white'>{showCategory?.ContractAddress}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <label className="labes">Banner</label>
                                                    </div>
                                                    <div className="col">
                                                        {
                                                            showCategory?.Banner ?

                                                                <div class="d-flex flex-wrap">
                                                                    {
                                                                        showCategory?.Banner ?
                                                                            <img src={showCategory?.Banner} className='banner-image-pre' onClick={() => handleImageClick(showCategory?.Banner)} />
                                                                            :
                                                                            showCategory?.Banner ?
                                                                                <img src={showCategory?.Banner} className='banner-image-pre' onClick={() => handleImageClick(showCategory?.Banner)} />
                                                                                :
                                                                                <img src={showCategory?.Banner} className='banner-image-pre' onClick={() => handleImageClick(showCategory?.Banner)} />
                                                                    }
                                                                </div>
                                                                :
                                                                <p className='text-white'>No Banner images</p>
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <label className="labes">Thumb</label>
                                                    </div>
                                                    <div className="col">
                                                        {showCategory?.Thumb ?
                                                            <div class="d-flex flex-wrap">
                                                                {
                                                                    showCategory?.Thumb ?
                                                                        <img src={showCategory?.Thumb} className='banner-image-pre' onClick={() => handleImageClick(showCategory?.Thumb)} />
                                                                        :
                                                                        showCategory?.Thumb ?
                                                                            <img src={showCategory?.Thumb} className='banner-image-pre' onClick={() => handleImageClick(showCategory?.Thumb)} />
                                                                            :
                                                                            <img src={showCategory?.Thumb} className='banner-image-pre' onClick={() => handleImageClick(showCategory?.Thumb)} />
                                                                }
                                                            </div>
                                                            :
                                                            <p className='text-white'>No Thumb images</p>

                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <label className="labes">Royalties</label>
                                                    </div>
                                                    <div className="col">
                                                        <p className='text-white'>{showCategory?.Royalties} %</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <label className="labes">VolumeTraded</label>
                                                    </div>
                                                    <div className="col">
                                                        <p className='text-white'>{showCategory?.VolumeTraded}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <label className="labes">ItemCount</label>
                                                    </div>
                                                    <div className="col">
                                                        <p className='text-white'>{showCategory?.ItemCount}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <label className="labes">Status</label>
                                                    </div>
                                                    <div className="col">
                                                        {showCategory?.Status == 1 ?
                                                            <p className='text-white'>Active</p> :
                                                            <p className='text-white'>Inactive</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
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

export default EditCollections