import React from 'react'
import { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { toast, ToastContainer } from 'react-toastify';
import {
  useEditCategoryMutation,
  useUpdateCategorySectionMutation
} from "../Store/Store";
import { Link, useParams } from 'react-router-dom'
import { Modal } from 'react-bootstrap';
import CryptoJS from 'crypto-js';
import Loader from '../components/loader/Loader';

const ViewCategory = () => {
  const { id } = useParams();
  const [showCategory, setShowCategory] = useState({});
  const [editdates, responseInfo2] = useUpdateCategorySectionMutation();
  const [editCategory, responseInfo] = useEditCategoryMutation();
  const [isImageBig, setIsImageBig] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const decryptedItem = CryptoJS.AES.decrypt(id, process.env.REACT_APP_SECRET_PASS).toString(CryptoJS.enc.Utf8);

  const getOneData = async () => {
    setIsLoading(true)
    const updateUserDetails = await editdates({ "Id": decodeURIComponent(decryptedItem) })
    .then(res => {
      setShowCategory(res?.data?.info, "res")
      setIsLoading(false)
    })
    console.log(updateUserDetails, "details")
  }
  const newPost = {
    "Id": decodeURIComponent(decryptedItem),
    "Title": showCategory.Title,
    "Status": showCategory.Status
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editCategory(newPost);
  }

  const toggleImageSize = () => {
    setIsImageBig(!isImageBig);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsImageBig(true);
  };

  useEffect(() => {
    getOneData();
  }, [])

  useEffect(() => {
    if (responseInfo?.data?.status) {
      toast?.success(responseInfo?.data?.info)
      setTimeout(() => (window.location.href = "/my-category"), 2000);
    } else {
      toast?.error(responseInfo?.data?.info)
    }
  }, [responseInfo])

  return (
    <>
     {isLoading && <Loader />}
      <div className="admin-wrapper">
        <ToastContainer></ToastContainer>
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className='d-flex flex-wrap justify-content-end px-5'>
              <div className=''>
                <div className='btn-right'>
                  <Link className="btn btn-danger  btn-sm w-10" to="/my-category" >
                    <i class="bi bi-chevron-double-left"></i>Back
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
              <Tabs className="border-0 mb-3 settings-tabs">
                <Tab eventKey="" title="view Category">
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                      <Form onSubmit={handleSubmit}>
                        <div className="row g-4">
                          <div className="col-12 d-flex flex-wrap align-items-center">
                            <div className="col-6">
                              <h6>Title</h6>
                            </div>
                            <div className='col-6'>
                              <input
                                className="form-control card shadow"
                                type="text"
                                id="name"
                                name="title"
                                readOnly
                                placeholder="Your Category Title..."
                                value={showCategory.Title}
                                onChange={e => {
                                  setShowCategory({
                                    ...showCategory,
                                    Title: e.target.value
                                  })
                                }}
                              />
                            </div>
                          </div>

                          <div className="col-12 d-flex flex-wrap align-items-center">
                            <div className='col-6'>
                              <h6>Status</h6>
                            </div>
                            <div className='col-6'>
                              <p className='text-white'>{showCategory.Status}</p>
                            </div>
                          </div>

                          <div className="col-12 d-flex flex-wrap align-items-center">
                            <div className='col-6'>
                              <h6>Image</h6>
                            </div>
                            <div className='col-6'>
                              <img src={showCategory?.Image}
                              alt=""
                                onClick={() => handleImageClick(showCategory?.Image)}
                              />
                            </div>
                          </div>
                        </div>
                      </Form>
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
                alt="Expanded"
              />
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ViewCategory