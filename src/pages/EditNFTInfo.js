import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import DashboardHeader from "../components/dashboard/header/DashboardHeader";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { toast, ToastContainer } from 'react-toastify';
import {
    useEditNFTBlockchainInfoMutation,
    useGetOneNFTBlockchainInfoMutation
} from "../Store/Store";
import { useParams } from 'react-router-dom'
import Editor from '../components/CkEditor/CkEditor';
import { NavLink,Link } from "react-router-dom";
import Loader from '../components/loader/Loader';

const EditNFTBlockchainInfo= () => {
  const { id } = useParams();
  const [showCategory, setShowCategory] = useState({}); 
  const [editdates, responseInfo2] = useGetOneNFTBlockchainInfoMutation();
  const [editCategory, responseInfo] = useEditNFTBlockchainInfoMutation();
  const [isLoading, setIsLoading] = useState(false);

  const getOneData = async () => {
    setIsLoading(true)
    const updateUserDetails = await editdates({ "Id": id }).then(res => {
      setShowCategory(res?.data?.info, "res")
      setIsLoading(false)})
    console.log(updateUserDetails, "details")
  }
  //ck
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [data, setData] = useState("");
  useEffect(() => {
    setEditorLoaded(true);
  }, []);
  //ck
  const newPost = {
    "Id": id,
    "Title": showCategory.Title,
    "Content": data
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
      setTimeout(() => (window.location.href = "/nft-info"), 2000);
    } else {
      toast?.error(responseInfo?.data?.info)
    }

  }, [responseInfo])
  useEffect(()=>{
    getOneData();
  },[])

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
                <Tab eventKey="" title="Edit NFT Info">
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
                                  Title:e.target.value
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

export default EditNFTBlockchainInfo