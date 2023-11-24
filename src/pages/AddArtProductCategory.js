import React from 'react'
import { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import {
  useAddArtProductCategoryMutation
} from "../Store/Store";
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../components/loader/Loader';

const AddArtProductCategory = () => {
  let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryStatus, setCategoryStatus] = useState("Active");
  const [addMaterial, responseInfo] = useAddArtProductCategoryMutation();
  const [inputImage, setInputImage] = useState("");
  const [logoFile, setLogoFile] = useState("");

  const ImagehandleChange = (e) => {
    setLogoFile(e.target.files[0])
    setInputImage(URL.createObjectURL(e.target.files[0]));
  }

  const fetchData = async () => {
    setIsLoading(true);
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
          "Status": categoryStatus,
          "Image": res.data?.Image
        }
        addMaterial(newPost)
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!categoryTitle) {
      setIsLoading(false)
      toast.error("Please enter a Product Category");
      return;
    }
    fetchData();
  }


  useEffect(() => {
    if (responseInfo?.data?.status) {
      toast?.success(responseInfo?.data?.info)
      setIsLoading(false);
      setTimeout(() => navigate("/artproductcategory"), 1000);
    } else {
      toast?.error(responseInfo?.data?.info);
      setIsLoading(false);
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
                  <Link className="btn btn-danger  btn-sm w-10" to="/artproductcategory" >
                    <i class="bi bi-chevron-double-left"></i>Back
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
              <h3>Add Art Product Category</h3>

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
                          placeholder="Categories Name..."
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddArtProductCategory;
