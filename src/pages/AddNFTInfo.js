import React from 'react'
import { useState, useEffect } from 'react'
import DashboardHeader from "../components/dashboard/header/DashboardHeader";
import Form from "react-bootstrap/Form";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import {
  useAddNFTBlockchainInfoMutation
} from "../Store/Store";
import { NavLink, Link } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Editor from '../components/CkEditor/CkEditor';
import Loader from '../components/loader/Loader';

const AddNFTBlockchainInfo = () => {
  //ck
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  //ck
  const [categoryTitle, setCategoryTitle] = useState("");
  const [categoryStatus, setCategoryStatus] = useState("Active");
  const [isLoading, setIsLoading] = useState(false);
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');

  const [addMaterial, responseInfo] = useAddNFTBlockchainInfoMutation();
  const newPost = {
    "Title": categoryTitle,
    "Content": data,
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check title and content length before submitting
    if (categoryTitle.length < 3) {
      setTitleError('Please enter at least 3 letters for the title.');
    } else {
      setTitleError('');
    }

    if (data.length < 20) {
      setContentError('Please enter at least 20 characters for the content.');
    } else {
      setContentError('');
    }

    if (categoryTitle.length >= 3 && data.length >= 20) {
      setIsLoading(true);
      addMaterial(newPost);
    }
  };

  const handleContentChange = (data) => {
    setData(data);

    if (data.length >= 20) {
      setContentError(''); // Clear the content error message when it meets the required length
    }
  };

  useEffect(() => {
    if (responseInfo?.data?.status) {
      setIsLoading(false);
      toast.success(responseInfo?.data?.info);
      setTimeout(() => (window.location.href = "/nft-info"), 2000);
    } else if (responseInfo?.data?.message) {
      setIsLoading(false);
      toast.error(responseInfo?.data?.message);
      console.log("AddNftBlockChain:", responseInfo?.data?.message);
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
                  <Link className="btn btn-danger  btn-sm w-10" to="/nft-info" >
                    <i class="bi bi-chevron-double-left"></i>Back
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
              <Tabs className="border-0 mb-3 settings-tabs">
                <Tab eventKey="" title="Add NFT Blockchain Info">

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
                              placeholder="Enter your Title"
                              onChange={e => {
                                setCategoryTitle(e.target.value)
                                setTitleError('');
                              }}
                            />
                            {titleError && <div className="text-danger">{titleError}</div>}
                          </div>
                          <Editor value={data}
                            name="description"
                            onChange={handleContentChange}
                            editorLoaded={editorLoaded}
                          />
                          {contentError && <div className="text-danger">{contentError}</div>}

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

export default AddNFTBlockchainInfo;
