import React from 'react'
import { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { toast, ToastContainer } from 'react-toastify';
import {
  useEditMediumlimitMutation,
  useGetOneMediaLimitMutation
} from "../../Store/Store";
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../../components/loader/Loader';
import CryptoJS from 'crypto-js';

const EditMediaList = () => {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [showCategory, setShowCategory] = useState({});
  const [editdates, responseInfo2] = useGetOneMediaLimitMutation();
  const [editCategory, responseInfo] = useEditMediumlimitMutation();

  const decryptedItem = CryptoJS.AES.decrypt(id, process.env.REACT_APP_SECRET_PASS).toString(CryptoJS.enc.Utf8);

  const getOneData = async () => {
    setIsLoading(true)
    const updateUserDetails = await editdates({ "Id": decodeURIComponent(decryptedItem) })
    .then(res => {
      setShowCategory(res?.data?.info, "res")
      setIsLoading(false)
    })
  }

  const newPost = {
    "Id": decodeURIComponent(decryptedItem),
    "Width": showCategory.Width,
    "Height": showCategory.Height,
    "Size": showCategory.Size
  }

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    await editCategory(newPost);
  }
  useEffect(() => {
    getOneData();
  }, [])

  useEffect(() => {
    if (responseInfo?.data?.status) {
      setIsLoading(false);
      toast?.success(responseInfo?.data?.info)
      setTimeout(() => navigate("/media-list"), 1000);
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
                  <Link className="btn btn-danger  btn-sm w-10" to="/media-list" >
                    <i class="bi bi-chevron-double-left"></i>Back
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
              <Tabs className="border-0 mb-3 settings-tabs">
                <Tab eventKey="" title="Edit Media List">
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                      <Form onSubmit={handleSubmit}>
                        <div className="row g-4">
                          <div className="col-12">
                            <label>Width</label>
                            <input
                              className="form-control card shadow"
                              type="text"
                              id="name"
                              name="Width"
                              placeholder="Width"
                              value={showCategory.Width}
                              onChange={e => {
                                setShowCategory({
                                  ...showCategory,
                                  Width: e.target.value
                                })
                              }}
                            />
                          </div>

                          <div className="col-12">
                            <label>Height</label>
                            <input
                              className="form-control card shadow"
                              type="text"
                              id="name"
                              name="title"
                              placeholder="Height"
                              value={showCategory.Height}
                              onChange={e => {
                                setShowCategory({
                                  ...showCategory,
                                  Height: e.target.value
                                })
                              }}
                            />
                          </div>

                          <div className="col-12">
                            <label>Size</label>
                            <input
                              className="form-control card shadow"
                              type="text"
                              id="name"
                              name="title"
                              placeholder="Size"
                              value={showCategory.Size}
                              onChange={e => {
                                setShowCategory({
                                  ...showCategory,
                                  Size: e.target.value
                                })
                              }}
                            />
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

export default EditMediaList