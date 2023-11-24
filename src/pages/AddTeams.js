import React from 'react'
import { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import {
  useAddTeamMutation, useGetNewsListAuthorQuery
} from "../Store/Store";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Editor from '../components/CkEditor/CkEditor';
import Select from "react-select";
import Loader from '../components/loader/Loader';

const AddTeams = () => {
  const [selectedOption, setSelectedOption] = useState({ value: '', label: 'Select Author Name' });
  let navigate = useNavigate();
  useEffect(() => {
    console.log(selectedOption, "selectedOption")
  }, [selectedOption])
  const info = useGetNewsListAuthorQuery();
  const options = [];
  if (info?.data?.info.length !== 0) {
    info?.data?.info.map((val) => {
      options.push({ value: val._id, label: val.Name });
    })
  }

  //ck
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  //ck
  const [categoryTitle, setCategoryTitle] = useState("");
  const [Position, setPosition] = useState("");
  const [Facebook, setFacebook] = useState("");
  const [Linkedin, setLinkedin] = useState("");
  const [Instagram, setInstagram] = useState("");
  const [logoFile, setLogoFile] = useState("");
  const [inputImage, setInputImage] = useState("")
  const [addMaterial, responseInfo] = useAddTeamMutation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!categoryTitle) {
      setIsLoading(false)
      toast.error("Please enter Name");
      return;
    }

    else if (!Position) {
      setIsLoading(false)
      toast.error("Please enter a Position");
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
      setIsLoading(false)
      toast?.success(responseInfo?.data?.info)
      setTimeout(() => navigate("/teams"), 2000);
    } else if (responseInfo?.data?.info) {
      setIsLoading(false)
      toast?.error(responseInfo?.data?.info)
    }
  }, [responseInfo])

  const fetchData = async () => {
    setIsLoading(true)
    const token = sessionStorage.getItem('myToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    var formData = new FormData();
    formData.append("Type", "Teams")
    if (logoFile) {
      formData.append("Image", logoFile);
    }

    axios.post(`${process.env.REACT_APP_BACKEND_URL}UpdateTeamImage`, formData, config)
      .then((res) => {
        const newPost = {
          "Name": categoryTitle,
          "Info": data,
          "Position": Position,
          "Facebook": Facebook,
          "Linkedin": Linkedin,
          "Instagram": Instagram,
          "Image": logoFile ? res.data?.Image : ""
        }
        addMaterial(newPost);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
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
                  <Link className="btn btn-danger  btn-sm w-10" to="/teams" >
                    <i class="bi bi-chevron-double-left"></i>Back
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
              <Tabs className="border-0 mb-3 settings-tabs">
                <Tab eventKey="" title="Add Team Members">
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
                          <div className="d-flex justify-content-between align-items-center">
                            <div className='col-4'>
                              <p>Position</p>
                            </div>
                            <div className='col-8'>
                              <input
                                className="form-control card shadow"
                                type="text"
                                id="position"
                                name="position"
                                placeholder="Enter Position"
                                onChange={e => setPosition(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className='col-4'>
                              <p>Facebook</p>
                            </div>
                            <div className='col-8'>
                              <input
                                className="form-control card shadow"
                                type="text"
                                id="facebook"
                                name="facebook"
                                placeholder="Enter Facebook"
                                onChange={e => setFacebook(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className='col-4'>
                              <p>Linkedin</p>
                            </div>
                            <div className='col-8'>
                              <input
                                className="form-control card shadow"
                                type="text"
                                id="linkedin"
                                name="linkedin"
                                placeholder="Enter Linkedin"
                                onChange={e => setLinkedin(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center">
                            <div className='col-4'>
                              <p>Instagram</p>
                            </div>
                            <div className='col-8'>
                              <input
                                className="form-control card shadow"
                                type="text"
                                id="instagram"
                                name="instagram"
                                placeholder="Enter Instagram"
                                onChange={e => setInstagram(e.target.value)}
                              />

                            </div>
                          </div>
                          <div className='d-flex justify-content-between align-items-center'>
                            <div className='col-4'>
                              <p>Info</p>
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

export default AddTeams;
