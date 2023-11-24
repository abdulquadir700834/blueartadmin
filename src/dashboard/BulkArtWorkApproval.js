import React from 'react'
import { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Select from "react-select";
import { toast, ToastContainer } from 'react-toastify';
import {
    useGetUserlistDetailsQuery,
    useGetBulkArtworkApprovalMutation
} from "../Store/Store";
import { useNavigate } from 'react-router-dom';

const options = [
    { value: 'Artwork', label: 'ArtWork' },
    { value: 'ArtProduct', label: 'ArtProduct' },
]

const BulkArtWorkApproval = () => {
    let navigate = useNavigate();
    const [showCategory, setShowCategory] = useState({});
    const [selectedOptionUser, setSelectedOptionUser] = useState({ value: 'User', label: 'User' });
    const [selectedOption, setSelectedOption] = useState(
        {
            value: 'Artwork',
            label: 'ArtWork'
        });

    const handleChangeSelectUser = (e) => {
        setSelectedOptionUser(e)
    }

    const getUserList = useGetUserlistDetailsQuery();

    const userList = getUserList?.data?.info?.map((user, index) => {
        return {
            label: user.Email,
            value: user._id,
            key: index
        }
    })
    const handleChangeSelect = (e) => {
        setSelectedOption(e)
    }

    const [bulkArtlist, responseInfo] = useGetBulkArtworkApprovalMutation()

    const getBulkArtwork = async () => {
        const Artworkdetails = await bulkArtlist({
            "AuthorId": selectedOptionUser.value,
            "ApproveStatus": true,
            "Type": selectedOption.value,
        }).then(res => setShowCategory(res?.data, "res"))
        console.log(Artworkdetails, "details")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        getBulkArtwork()
    }

    useEffect(() => {
        if (responseInfo?.data?.status) {
            toast?.success(responseInfo?.data?.info)
            setTimeout(() => navigate("/bulkartwork-approval"), 1000);
        } else {
            toast?.error(responseInfo?.data?.info)
        }
    }, [responseInfo])

    return (
        <>
            <div className="admin-wrapper">
                <ToastContainer></ToastContainer>
                <div className="container">
                    <div className="row g-4 justify-content-center">
                        <div className='d-flex flex-wrap justify-content-end px-5'>
                            <div className=''>
                            </div>
                        </div>
                        <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
                            <Tabs className="border-0 mb-3 settings-tabs">
                                <Tab eventKey="">
                                    <div className="card">
                                        <div className="card-body p-4 p-sm-5">
                                            <Form
                                                onSubmit={handleSubmit}
                                            >
                                                <div className="row g-4">
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        <div className='col-4'>
                                                            <p>Users</p>
                                                        </div>
                                                        <div className='col-8'>
                                                            <Select
                                                                options={userList}
                                                                placeholder="Select a User"
                                                                value={selectedOptionUser}
                                                                onChange={(e) => handleChangeSelectUser(e)}
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="row g-4">
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <div className='col-4'>
                                                                <p>Type</p>
                                                            </div>
                                                            <div className='col-8' style={{ marginLeft: '10px' }}>
                                                                <Select
                                                                    options={options}
                                                                    placeholder="Select a Type"
                                                                    value={selectedOption}
                                                                    onChange={(e) => handleChangeSelect(e)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-12">
                                                        <button
                                                            className="btn btn-primary w-100 rounded-pill"
                                                            type="submit"
                                                            onClick={getBulkArtwork}
                                                        >
                                                            <i className="bi bi-sd-card-fill me-1" />
                                                            Approve
                                                        </button>
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

export default BulkArtWorkApproval;