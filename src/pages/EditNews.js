import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { NavLink, Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Select from "react-select";
import { toast, ToastContainer } from 'react-toastify';
import {
  useEditNewsMutation,
  useGetOneNewsMutation,
  useGetNewsListAuthorQuery
} from "../Store/Store";
import { useParams } from 'react-router-dom'
import Editor from '../components/CkEditor/CkEditor';
import { Modal } from 'react-bootstrap';
import Loader from '../components/loader/Loader';
import CryptoJS from 'crypto-js';

const EditNews = () => {
  let navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const info = useGetNewsListAuthorQuery({
    page: currentPage,
    search: searchTerm,
  });
  const options = [];
  if (info?.data?.data?.length !== 0) {
    info?.data?.data?.map((val) => {
      options.push({ value: val._id, label: val.Name });
    })
  }
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showCategory, setShowCategory] = useState({});
  const [editdates, responseInfo2] = useGetOneNewsMutation();
  const [editCategory, responseInfo] = useEditNewsMutation();
  const [inputImage, setInputImage] = useState("");
  const [logoFile, setLogoFile] = useState("");
  const [isImageBig, setIsImageBig] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const toggleImageSize = () => {
    setIsImageBig(!isImageBig);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsImageBig(true);
  };

  const decryptedItem = CryptoJS.AES.decrypt(id, process.env.REACT_APP_SECRET_PASS).toString(CryptoJS.enc.Utf8);

  const getOneData = async () => {
    setIsLoading(true);
    const updateUserDetails = await editdates({ "Id": decodeURIComponent(decryptedItem) }).then(res => {
      setShowCategory(res?.data?.info, "res")
      setIsLoading(false)
    })
    console.log(updateUserDetails, "details")
  }
  const [selectedOption, setSelectedOption] = useState({ value: "", label: "" });
  useEffect(() => {
    setSelectedOption({ value: showCategory.AuthorId, label: showCategory.AuthorName });
  }, [showCategory]);
  const handleChangeSelect = (e) => {
    setSelectedOption(e)
  }
  useEffect(() => {
    console.log(selectedOption, "selectedOption")
  }, [selectedOption])
  const ImagehandleChange = (e) => {
    setLogoFile(e.target.files[0])
    setInputImage(URL.createObjectURL(e.target.files[0]));
  }
  //ck
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  //ck
  const fetchData = async () => {
    setIsLoading(true)
    const token = sessionStorage.getItem('myToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    var formData = new FormData();
    formData.append("Type", "ArtistCategory")
    if (logoFile) {
      formData.append("Image", logoFile);
    }
    axios.post(`${process.env.REACT_APP_BACKEND_URL}UpdateNewsImage`, formData, config)
      .then((res) => {
        const newPost = {
          "Id": decodeURIComponent(decryptedItem),
          "Title": showCategory.Title,
          "Content": data,
          "Image": logoFile ? res.data?.Image : showCategory.Image,
          "Author": selectedOption.value
        }
        editCategory(newPost);
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
  useEffect(() => {
    if (responseInfo?.data?.status) {
      setIsLoading(false);
      toast?.success(responseInfo?.data?.info)
      setTimeout(() => navigate("/news"), 2000);
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
                  <Link className="btn btn-danger  btn-sm w-10" to="/news" >
                    <i class="bi bi-chevron-double-left"></i>Back
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
              <Tabs className="border-0 mb-3 settings-tabs">
                <Tab eventKey="" title="Edit News">
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
                              value={showCategory.Title}
                              onChange={e => {
                                setShowCategory({
                                  ...showCategory,
                                  Title: e.target.value
                                })
                              }}
                            />
                          </div>
                          <Editor value={showCategory.Content}
                            name="description"
                            onChange={(data) => {
                              setData(data);
                            }}
                            editorLoaded={editorLoaded}
                          />
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
                                  onChange={(e) => ImagehandleChange(e)}
                                />
                                {inputImage === "" ? <img className="banner-image-pre" alt="" src={showCategory?.Image}
                                  onClick={() => handleImageClick(showCategory?.Image)}></img> : <img alt="" className="banner-image-pre" src={inputImage} onClick={() => handleImageClick(inputImage)}></img>}
                              </div>
                            </div>
                          </div>
                          <div className='d-flex justify-content-between align-items-center'>
                            <div className='col-4'>
                              <p>Author Name</p>
                            </div>
                            <div className='col-8'>
                              <Select options={options} placeholder="Select a brand"
                                value={selectedOption}
                                onChange={(e) => handleChangeSelect(e)}
                              />
                            </div>
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

export default EditNews