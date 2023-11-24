import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { useFormik } from "formik";
import DashboardHeader from "../components/dashboard/header/DashboardHeader";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { toast, ToastContainer } from 'react-toastify';
import {
  useGetArtfairMoreInfoMutation
} from "../Store/Store";
import { Link, useParams } from 'react-router-dom'

const EditArtfair = () => {
  const { id } = useParams();
  const [showCategory, setShowCategory] = useState({});
  const [editdates, responseInfo2] = useGetArtfairMoreInfoMutation();
  const getOneData = async () => {
    const updateUserDetails = await editdates({ "Id": id }).then(res => setShowCategory(res?.data?.info, "res"))
    console.log(updateUserDetails, "details")
  }
  useEffect(()=>{
    getOneData();
  },[])
  return (
    <>
      <div className="admin-wrapper">
        <ToastContainer></ToastContainer>
        <div className="">
          <div className="row g-4 justify-content-center">
                    <div className='d-flex flex-wrap justify-content-end px-5'>
                        <div className=''>
                            <div className='btn-right'>
                                <Link className="btn btn-danger  btn-sm w-10" to="/artfair" >
                                <i class="bi bi-chevron-double-left"></i>Back
                                </Link>
                            </div>
                        </div>
                    </div>

            <div className="col-12">
              <Tabs className="border-0 mb-3 settings-tabs px-3">
                <Tab eventKey="" title="Artfair More Info">
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col">
                                    <label className="labes">Title</label>
                                </div>
                                <div className="col">
                                    <p className='text-white'>{showCategory?.Title}</p>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col">
                                    <label className="labes">Location</label>
                                </div>
                                <div className="col">
                                    <p className='text-white'>{showCategory?.Location}</p>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col">
                                    <label className="labes">Year</label>
                                </div>
                                <div className="col">
                                    <p className='text-white'>{showCategory?.Year}</p>
                                </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col">
                                    <label className="labes">Image</label>
                                </div>
                                <div className="col">
                                    <p className='text-white'><img className="banner-image-pre" src={showCategory?.Image?.Local}/></p>
                                </div>
                            </div>
                        </div>
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

export default EditArtfair