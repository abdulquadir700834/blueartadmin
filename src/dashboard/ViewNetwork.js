import React from 'react'
import { useState, useEffect } from 'react'
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useFormik } from "formik";
import { toast, ToastContainer } from 'react-toastify';
import * as yup from "yup";
import {
    useUpdateCategoryQuery,
    useUpdateNetworkMutation,
    useGetNetworkOneMutation,
} from "../Store/Store";
import { Link, useParams } from 'react-router-dom'
import CryptoJS from 'crypto-js';
import Loader from '../components/loader/Loader';

const ViewNetwork = () => {
    const { id } = useParams();
    const [createPost2, responseInfo2] = useGetNetworkOneMutation()
    const [getOneSpecificData, setGetOneSpecificData] = useState()
    const { data } = useUpdateCategoryQuery(id);
    const [createPost, responseInfo] = useUpdateNetworkMutation();
    const [isLoading, setIsLoading] = useState(false);

    const decryptedItem = CryptoJS.AES.decrypt(id, process.env.REACT_APP_SECRET_PASS).toString(CryptoJS.enc.Utf8);


    const getOneData = async () => {
        setIsLoading(true)
        const updateUserDetails = await createPost2({ "Id": decodeURIComponent(decryptedItem) })
        .then(res => {
            setGetOneSpecificData(res?.data?.info, "res")
            setIsLoading(false)
        })
        console.log(updateUserDetails, "details")
    }

    useEffect(() => {
        getOneData()
    }, [createPost2, id])

    console.log()

    const schema = yup.object().shape({
        Name: yup.string().required("Enter the name")
    });

    console.log(id, "categ")

    const formik = useFormik({
        initialValues: {
            Name: getOneSpecificData?.Name,
            AdminAddress: getOneSpecificData?.AdminAddress,
            AdminCommission: getOneSpecificData?.AdminCommission,
            BlockExplorer: getOneSpecificData?.BlockExplorer,
            ChainID: getOneSpecificData?.ChainID,
            Currency: getOneSpecificData?.Currency,
            FactoryContract: getOneSpecificData?.FactoryContract,
            MultiContract: getOneSpecificData?.MultiContract,
            RpcUrl: getOneSpecificData?.RpcUrl,
            FactoryAbiArray: getOneSpecificData?.FactoryAbiArray,
            MultiAbiArray: getOneSpecificData?.MultiAbiArray,
            GiftAbiArray: getOneSpecificData?.GiftAbiArray,
            GiftContract: getOneSpecificData?.GiftContract,
            FeeAddress: getOneSpecificData?.FeeAddress,
        },
        enableReinitialize: true,
        validationSchema: schema,
        onSubmit: (values) => {
            setIsLoading(true);
            debugger
            let postData = {
                Name: values.Name,
                Currency: values.Currency,
                AdminAddress: values.AdminAddress,
                AdminKey: "string",
                RpcUrl: values.RpcUrl,
                ChainID: values.ChainID,
                BlockExplorer: values.BlockExplorer,
                FactoryContract: values.FactoryContract,
                MultiContract: values.MultiContract,
                MultiAbiArray: values.MultiAbiArray,
                FactoryAbiArray: values.FactoryAbiArray,
                AdminCommission: values.AdminCommission,
                GiftAbiArray: values.GiftAbiArray,
                GiftContract: values.GiftContract,
                FeeAddress: getOneSpecificData?.FeeAddress,

            }

            createPost(postData).then(res => {
                if (res?.data?.status !== false) {
                    toast.success(res?.data?.info)
                    setIsLoading(false);
                    setTimeout(() => (window.location.href = "/network"), 1500);
                } else {
                    toast.error(res?.data?.message)
                    setIsLoading(false);
                }
            })
            console.log(responseInfo, postData, "response")
        },
    });

    return (
        <>
        {isLoading && <Loader />}
            <div className="admin-wrapper">
                <ToastContainer></ToastContainer>
                <div className="">
                    <div className="row g-4 justify-content-center">
                        <div className='d-flex flex-wrap justify-content-end px-5'>
                            <div className=''>
                                <div className='btn-right'>
                                    <Link className="btn btn-danger  btn-sm w-10" to="/network" >
                                        <i class="bi bi-chevron-double-left"></i>Back
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <Tabs className="border-0 mb-3 settings-tabs px-3">
                                <Tab eventKey="" title="View Network">
                                    <div className="card">
                                        <div className="card-body p-4 p-sm-5">
                                            <Form onSubmit={formik.handleSubmit}>
                                                <div className="row g-4">

                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                            <h6 className="labes">Name</h6>
                                                        </div>
                                                        <div className="col">
                                                            <p className='text-white'>{formik.values.Name}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                            <h6 className="labes">AdminAddress</h6>
                                                        </div>
                                                        <div className="col">
                                                            <p className='text-white'>{formik.values.AdminAddress}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                            <h6 className="labes">AdminCommission</h6>
                                                        </div>
                                                        <div className="col">
                                                            <p className='text-white'>{formik.values.AdminCommission}</p>
                                                        </div>
                                                    </div>
                                                    <div className='formik-error'>{formik.errors.AdminCommission}</div>
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                            <h6 className="labes">BlockExplorer</h6>
                                                        </div>
                                                        <div className="col">
                                                            <p className='text-white'>{formik.values.BlockExplorer}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                            <h6 className="labes">ChainID</h6>
                                                        </div>
                                                        <div className="col">
                                                            <p className='text-white'>{formik.values.ChainID}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                            <h6 className="labes">Currency</h6>
                                                        </div>
                                                        <div className="col">
                                                            <p className='text-white'>{formik.values.Currency}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                            <h6 className="labes">Fee Address</h6>
                                                        </div>
                                                        <div className="col">
                                                            <p className='text-white'>{formik.values.FeeAddress}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                            <h6 className="labes">FactoryContract</h6>
                                                        </div>
                                                        <div className="col">
                                                            <p className='text-white'>{formik.values.FactoryContract}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                            <h6 className="labes">MultiContract</h6>
                                                        </div>
                                                        <div className="col">
                                                            <p className='text-white'>{formik.values.MultiContract}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                            <h6 className="labes">RpcUrl</h6>
                                                        </div>
                                                        <div className="col">
                                                            <p className='text-white'>{formik.values.RpcUrl}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-6">
                                                            <h6 className="labes">FactoryAbiArray</h6>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className='text-white'>{formik.values.FactoryAbiArray}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-6">
                                                            <h6 className="labes">MultiAbiArray</h6>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className='text-white'>{formik.values.MultiAbiArray}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-6">
                                                            <h6 className="labes">GiftAbiArray</h6>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className='text-white'>{formik.values.GiftAbiArray}</p>
                                                        </div>
                                                    </div>
                                                    <div className="row align-items-center">
                                                        <div className="col-6">
                                                            <h6 className="labes">GiftContract</h6>
                                                        </div>
                                                        <div className="col-6">
                                                            <p className='text-white'>{formik.values.GiftContract}</p>
                                                        </div>
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

export default ViewNetwork