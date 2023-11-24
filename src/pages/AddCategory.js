import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { toast, ToastContainer } from 'react-toastify';
import {
  useAddCategoryMutation,
} from "../Store/Store";
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/loader/Loader';

const AddCategory = () => {
let navigate = useNavigate()
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryStatus, setCategoryStatus] = useState("Active");
  const [isLoading, setIsLoading] = useState(false);
  const [addCategory, responseInfo] = useAddCategoryMutation();
  const [inputImage, setInputImage] = useState("");
  const [logoFile, setLogoFile] = useState("");

  const ImagehandleChange = (e) => {
    setLogoFile(e.target.files[0])
    setInputImage(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!categoryTitle) {
      setIsLoading(false)
      toast.error("Please enter a Category");
      return;
    }
    fetchData()
  }

  const fetchData = async () => {
    setIsLoading(true);
    const token = sessionStorage.getItem('myToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    var formData = new FormData();
    formData.append("Type", "ArtCategory")
    if (logoFile) {
      formData.append("Image", logoFile);
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}UpdateArtCategoryImage`, formData, config)
      .then((res) => {
        const newPost = {
          "Title": categoryTitle,
          "Status": categoryStatus,
          "Image": res.data?.Image
        }
        addCategory(newPost)
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (responseInfo?.data?.status) {
      debugger;
      toast?.success(responseInfo?.data?.info)
      setTimeout(() => navigate("/my-category"), 2000);
    } else if (responseInfo?.data?.info) {
      toast?.error(responseInfo?.data?.info)
    }
  }, [responseInfo])

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
                  <Link className="btn btn-danger  btn-sm w-10" to="/my-category" >
                    <i class="bi bi-chevron-double-left"></i>Back
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
              <Tabs className="border-0 mb-3 settings-tabs">
                <Tab eventKey="" title="Add Category">
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
                              placeholder="Your Category Title..."
                              onChange={e => setCategoryTitle(e.target.value)}
                            />
                          </div>

                          <div className="col-12">
                            <select className="filter-select bg-gray w-100" name="status"
                              onChange={e => setCategoryStatus(e.target.value)}
                            >
                              <option  >Active</option>
                              <option  >Inactive</option>
                            </select>
                          </div>

                          <div className="container pt-3">
                            <div className="row align-items-center">
                              <div className="col">
                                <label className="labes">Image</label>
                              </div>
                              <div className="col">
                                <input className="form-control card shadow w-100"
                                  type="file" name="Image"
                                  placeholder="Image"
                                  id="Image"
                                  required
                                  onChange={(e) => ImagehandleChange(e)}
                                />
                                {inputImage === "" ? "" : <img alt="" className="banner-image-pre" src={inputImage}></img>}
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <input
                              className="btn btn-primary w-100 rounded-pill"
                              type="submit"
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

export default AddCategory
