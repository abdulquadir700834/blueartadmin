import React from 'react'
import { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import {
  useAddNewsMutation, useGetNewsListAuthorQuery
} from "../Store/Store";
import { Link, useNavigate } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Editor from '../components/CkEditor/CkEditor';
import Select from "react-select";
import Loader from '../components/loader/Loader';

const AddNews = () => {
  let navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState({ value: '', label: 'Select Author Name' });
  const handleChangeSelect = (e) => {
    setSelectedOption(e)
  }
  useEffect(() => {
    console.log(selectedOption, "selectedOption")
  }, [selectedOption])

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const info = useGetNewsListAuthorQuery({
    page: currentPage,
    search: searchTerm,
  });

  const AuthorUserlist = info?.data?.data?.map((user, index) => {
    return {
      label: user.Name,
      value: user._id,
      key: index
    }
  })
  //ck
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  //ck
  const [categoryTitle, setCategoryTitle] = useState("");
  const [logoFile, setLogoFile] = useState("");
  const [inputImage, setInputImage] = useState("")
  const [addMaterial, responseInfo] = useAddNewsMutation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!categoryTitle) {
      setIsLoading(false)
      toast.error("Please enter News Title");
      return;
    }
    fetchData()
  }

  const ImagehandleChange = (e) => {
    setLogoFile(e.target.files[0])
    setInputImage(URL.createObjectURL(e.target.files[0]));
  }

  useEffect(() => {
    if (responseInfo?.data?.status) {
      setIsLoading(false);
      toast?.success(responseInfo?.data?.info)
      setTimeout(() => navigate("/news"), 2000);
    } else if (responseInfo?.data?.info) {
      setIsLoading(false);
      toast?.error(responseInfo?.data?.info)
    }
  }, [responseInfo])

  const fetchData = async () => {
    setIsLoading(true);
    const token = sessionStorage.getItem('myToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    var formData = new FormData();
    formData.append("Type", "ArtistCategory")
    if (logoFile) {
      formData.append("Image", logoFile);
    }
    if (!selectedOption || !selectedOption.value) {
      toast?.error("Selected option is empty or value is missing");
      return;
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}UpdateArtistCategoryImage`, formData, config)
      .then((res) => {
        const newPost = {
          "Title": categoryTitle,
          "Content": data,
          "Image": logoFile ? res.data?.Image : "",
          "Author": selectedOption.value
        }
        addMaterial(newPost);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

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
                  <Link className="btn btn-danger  btn-sm w-10" to="/news" >
                    <i class="bi bi-chevron-double-left"></i>Back
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
              <Tabs className="border-0 mb-3 settings-tabs">
                <Tab eventKey="" title="Add News">
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                      <Form onSubmit={handleSubmit}>
                        <div className="row g-4">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className='col-4'>
                              <p>Name</p>
                            </div>
                            <div className='col-8'>
                              <input
                                className="form-control card shadow"
                                type="text"
                                id="name"
                                name="title"
                                placeholder="Enter your Title"
                                onChange={e => setCategoryTitle(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className='d-flex justify-content-between align-items-center'>
                            <div className='col-4'>
                              <p>Content</p>
                            </div>
                            <div className='col-8'>
                              <Editor value={data}
                                name="description"
                                onChange={(data) => {
                                  setData(data);
                                }}
                                editorLoaded={editorLoaded}
                              />
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
                          <div className='d-flex justify-content-between align-items-center'>
                            <div className='col-4'>
                              <p>Author Name</p>
                            </div>
                            <div className='col-8'>
                              <Select
                                options={AuthorUserlist}
                                placeholder="Select a brand"
                                value={selectedOption}
                                onChange={(e) => handleChangeSelect(e)}
                              />
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

export default AddNews;
