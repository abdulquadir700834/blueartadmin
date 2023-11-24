import React from 'react'
import { useState, useEffect } from 'react'
import { NavLink, Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { toast, ToastContainer } from 'react-toastify';
import {
  useGetOneArtistLabelMutation,
  useEditArtistLabelMutation
} from "../Store/Store";
import { useParams } from 'react-router-dom'
import Loader from '../components/loader/Loader';
import CryptoJS from 'crypto-js';

const EditArtistLabels = () => {
  const { id } = useParams();
  let navigate = useNavigate()
  const [showCategory, setShowCategory] = useState({});
  const [editdates, responseInfo2] = useGetOneArtistLabelMutation();
  const [editCategory, responseInfo] = useEditArtistLabelMutation();
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
    setIsLoading(true)
    e.preventDefault();
    editCategory(newPost);
  }
  useEffect(() => {
    if (responseInfo?.data?.status) {
      setIsLoading(false)
      toast?.success(responseInfo?.data?.info)
      setTimeout(() => navigate("/artist-label"), 1000);
    } else {
      toast?.error(responseInfo?.data?.info)
    }
  }, [responseInfo])

  useEffect(() => {
    getOneData();
  }, [])

  return (
    <>
      <div className="admin-wrapper">
        <ToastContainer></ToastContainer>
        {isLoading && <Loader />}
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className='d-flex flex-wrap justify-content-end px-5'>
              <div className=''>
                <div className='btn-right'>
                  <Link className="btn btn-danger  btn-sm w-10" to="/artist-label" >
                    <i class="bi bi-chevron-double-left"></i>Back
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
              <Tabs className="border-0 mb-3 settings-tabs">
                <Tab eventKey="" title="Edit Artist Label">
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                      <Form onSubmit={handleSubmit}>
                        <div className="row g-4">
                          <div className="col-12">
                            <input
                              className="form-control card shadow"
                              type="text"
                              id="name"
                              name="title"
                              placeholder="Your Artist Label..."
                              value={showCategory.Title}
                              onChange={e => {
                                setShowCategory({
                                  ...showCategory,
                                  Title: e.target.value
                                })
                              }}
                            />
                          </div>
                          <div className="col-12">
                            <select className="filter-select bg-gray w-100" name="status"
                              onChange={e => setShowCategory({
                                ...showCategory,
                                Status: e.target.value
                              })}
                              value={showCategory.Status}
                            >
                              <option>Active</option>
                              <option>Inactive</option>
                            </select>
                          </div>
                          <div className="col-12">
                            <input
                              className="btn btn-primary w-100 rounded-pill"
                              type="submit"
                              value={"Update"}
                            />
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
    </>
  )
}

export default EditArtistLabels;