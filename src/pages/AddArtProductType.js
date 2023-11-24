import React from 'react'
import { useState, useEffect } from 'react'
import DashboardHeader from "../components/dashboard/header/DashboardHeader";
import Form from "react-bootstrap/Form";
import { toast, ToastContainer } from 'react-toastify';
import { useAddArtProductNameMutation } from "../Store/Store";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/loader/Loader';

const AddArtProductType = () => {
  let navigate = useNavigate()
  const [logoFile, setLogoFile] = useState("");
  const [inputImage, setInputImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryNameType, setCategoryNameType] = useState("Furniture");
  const [categoryStatus, setCategoryStatus] = useState("Active");
  const [addMaterial, responseInfo] = useAddArtProductNameMutation();

  const fetchData = async () => {
    setIsLoading(true)
    const token = sessionStorage.getItem('myToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    var formData = new FormData();
    formData.append("Type", "ArtProductCategory")
    if (logoFile) {
      formData.append("Image", logoFile);
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}UpdateArtProductImage`, formData, config)
      .then((res) => {
        const newPost = {
          "Title": categoryTitle,
          "Type": categoryNameType,
          "Image": logoFile ? res.data?.Image : "",
          "Status": categoryStatus
        }
        addMaterial(newPost);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };
  const handleSubmit = async (e) => {
    setIsLoading(true);
    fetchData()
    e.preventDefault();
  }

  const ImagehandleChange = (e) => {
    setLogoFile(e.target.files[0])
    setInputImage(URL.createObjectURL(e.target.files[0]));
  }

  useEffect(() => {
    if (responseInfo?.data?.status) {
      setIsLoading(false);
      toast.success(responseInfo?.data?.info);
      setTimeout(() => navigate("/artproducttype"), 1000);
    } else if (responseInfo?.data?.info) {
      setIsLoading(false);
      toast.error(responseInfo?.data?.info);
    } else if (responseInfo?.error?.data) {
      setIsLoading(false);
      toast.error(responseInfo?.error?.data?.message);
    }
  }, [responseInfo]);

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
                  <Link className="btn btn-danger  btn-sm w-10" to="/artproducttype" >
                    <i class="bi bi-chevron-double-left"></i>Back
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
              <Tabs className="border-0 mb-3 settings-tabs">
                <Tab eventKey="" title="Add Art Product Category Name">
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                      <Form onSubmit={handleSubmit}>
                        <div className="row g-4">

                          <div className="d-flex justify-content-between align-items-center">
                            <div className='col-4'>
                              <p className='text-white'>Title</p>
                            </div>
                            <div className='col-8'>
                              <input
                                className="form-control card shadow"
                                type="text"
                                id="name"
                                name="title"
                                placeholder="Category Name..."
                                onChange={e => setCategoryTitle(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="d-flex justify-content-between align-items-center">
                            <div className='col-4'>
                              <p className="text-white">Select Type</p>
                            </div>
                            <div className='col-8'>
                              <select className="filter-select bg-gray w-100" name="type"
                                onChange={e => setCategoryNameType(e.target.value)}
                              >
                                <option>Furniture</option>
                                <option>Furnishing</option>
                                <option>Lighting</option>
                              </select>
                            </div>
                          </div>

                          <div className="d-flex justify-content-between align-items-center">
                            <div className='col-4'>
                              <p className='text-white'>Status</p>
                            </div>
                            <div className='col-8'>
                              <select className="filter-select bg-gray w-100" name="status"
                                onChange={e => setCategoryStatus(e.target.value)}
                              >
                                <option>Active</option>
                                <option>Inactive</option>
                              </select>
                            </div>
                          </div>
                          <div className="container pt-3">
                            <div className="row align-items-center">
                              <div className="col-4">
                                <label className="labes">Image</label>
                              </div>
                              <div className="col-8">
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

export default AddArtProductType;
