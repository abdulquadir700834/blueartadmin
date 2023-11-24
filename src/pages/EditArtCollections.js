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
    useGetOneArtcollectionInfoMutation
} from "../Store/Store";
import { useParams } from 'react-router-dom'
const EditArtCollection = () => {
    const { id } = useParams();

    const [showCategory, setShowCategory] = useState({});
    const [editdates, responseInfo2] = useGetOneArtcollectionInfoMutation();
    const getOneData = async () => {
        const updateUserDetails = await editdates({ "Id": id }).then(res => setShowCategory(res?.data?.info, "res"))
        console.log(updateUserDetails, "details")
    }
    useEffect(() => {
        getOneData();
    }, [])
    return (
        <>
            <div className="admin-wrapper">
                <ToastContainer></ToastContainer>
                <div className="">
                    <div className="row g-4 justify-content-center">
                        <div className="col-12">
                            <Tabs className="border-0 mb-3 settings-tabs px-3">
                                <Tab eventKey="" title="ArtCollection More Info">
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
                                                        <label className="labes">Created At</label>
                                                    </div>
                                                    <div className="col">
                                                        <p className='text-white'>
                                                            {new Date(showCategory?.createdAt).toLocaleString('en-US', {
                                                                day: '2-digit',
                                                                month: '2-digit',
                                                                year: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                                hour12: true
                                                            })}

                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="container">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        <label className="labes">Updated At</label>
                                                    </div>
                                                    <div className="col">
                                                        <p className='text-white'>
                                                            {new Date(showCategory?.updatedAt).toLocaleString('en-US', {
                                                                day: '2-digit',
                                                                month: '2-digit',
                                                                year: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit',
                                                                hour12: true
                                                            })}</p>
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

export default EditArtCollection