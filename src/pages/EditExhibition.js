import React from 'react'
import { useState, useEffect } from 'react'
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { toast, ToastContainer } from 'react-toastify';
import {
  useGetExhibitionMoreInfoMutation
} from "../Store/Store";
import { Link, useParams } from 'react-router-dom'
import { Modal } from 'react-bootstrap';
import CryptoJS from 'crypto-js';
import Loader from '../components/loader/Loader';

const EditExhibition = () => {
  const { id } = useParams();
  const [showCategory, setShowCategory] = useState({});
  const [editdates, responseInfo2] = useGetExhibitionMoreInfoMutation();
  const [isImageBig, setIsImageBig] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    const updateUserDetails = await editdates({ "Id": decodeURIComponent(decryptedItem) })
    .then(res => {
      setShowCategory(res?.data?.info, "res")
      setIsLoading(false)
    })
    console.log(updateUserDetails, "details")
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
                  <Link className="btn btn-danger  btn-sm w-10" to="/exhibition" >
                    <i class="bi bi-chevron-double-left"></i>Back
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12">
              <Tabs className="border-0 mb-3 settings-tabs px-3">
                <Tab eventKey="" title="Exhibition More Info">
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                      <div className="container">
                        <div className="row align-items-center">
                          <div className="col">
                            <label className="labes">Title</label>
                          </div>
                          <div className="col">
                            <p className='text-white'>{showCategory?.Title}</p>
                          </div>
                        </div>
                      </div>
                      <div className="container">
                        <div className="row align-items-center">
                          <div className="col">
                            <label className="labes">Type</label>
                          </div>
                          <div className="col">
                            <p className='text-white'>{showCategory?.Type}</p>
                          </div>
                        </div>
                      </div>
                      <div className="container">
                        <div className="row align-items-center">
                          <div className="col">
                            <label className="labes">Institute</label>
                          </div>
                          <div className="col">
                            <p className='text-white'>{showCategory?.Institude}</p>
                          </div>
                        </div>
                      </div>

                      <div className="container">
                        <div className="row align-items-center">
                          <div className="col">
                            <label className="labes">Location</label>
                          </div>
                          <div className="col">
                            <p className='text-white'>{showCategory?.Location}</p>
                          </div>
                        </div>
                      </div>
                      <div className="container">
                        <div className="row align-items-center">
                          <div className="col">
                            <label className="labes">Year</label>
                          </div>
                          <div className="col">
                            <p className='text-white'>{showCategory?.Year}</p>
                          </div>
                        </div>
                      </div>
                      <div className="container">
                        <div className="row align-items-center">
                          <div className="col">
                            <label className="labes">Image</label>
                          </div>
                          <div className="col">
                            <p className='text-white'><img className="banner-image-pre" src={showCategory?.Image}
                              onClick={() => handleImageClick(showCategory?.Image)} /></p>
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

export default EditExhibition