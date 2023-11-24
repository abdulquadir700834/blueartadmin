import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import DashboardHeader from "../components/dashboard/header/DashboardHeader";
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
import { Link, useNavigate, useParams } from 'react-router-dom'
import Loader from '../components/loader/Loader';
import CryptoJS from 'crypto-js';


const EditNetwork = () => {
const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  console.log("idNetwork:", id)
  let navigate = useNavigate();
  const [createPost2, responseInfo2] = useGetNetworkOneMutation()
  const [getOneSpecificData, setGetOneSpecificData] = useState()
  const [privateKeyAddress, setPrivateKeyAddress] = useState("")

const decryptedCategory = CryptoJS.AES.decrypt(id, process.env.REACT_APP_SECRET_PASS);
const decryptedItemId = decryptedCategory.toString(CryptoJS.enc.Utf8);
console.log('encryptedItemIdIII:', decodeURIComponent(decryptedItemId));

  const { data } = useUpdateCategoryQuery(id);
  const [createPost, responseInfo] = useUpdateNetworkMutation();
  console.log("category data", data)

  const getOneData = async () => {
    setIsLoading(true)
    const updateUserDetails = await createPost2({ "Id": decodeURIComponent(decryptedItemId) })
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
  console.log('feeAddress:', getOneSpecificData?.FeeAddress)

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
        GiftAbiArray:getOneSpecificData?.GiftAbiArray,
        GiftContract:getOneSpecificData?.GiftContract,
        FeeAddress: getOneSpecificData?.FeeAddress,
        AdminKey: privateKeyAddress
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
                // AdminKey: "string",
                RpcUrl: values.RpcUrl,
                ChainID: values.ChainID,
                BlockExplorer: values.BlockExplorer,
                FactoryContract: values.FactoryContract,
                MultiContract: values.MultiContract,
                MultiAbiArray: values.MultiAbiArray,
                FactoryAbiArray: values.FactoryAbiArray,
                AdminCommission: values.AdminCommission,
                GiftAbiArray: values. GiftAbiArray,
                GiftContract:values.GiftContract,
                FeeAddress: getOneSpecificData?.FeeAddress,
                AdminKey: privateKeyAddress,
                Id:decodeURIComponent(decryptedItemId)

        }

        createPost(postData).then(res => {
            if(res?.data?.status !== false) {
                toast.success(res?.data?.message)
                setIsLoading(false);
                setTimeout(() => navigate("/network"), 1500);

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
                <Tab eventKey="" title="Update Network">
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                      <Form onSubmit={formik.handleSubmit}>
                        <div className="row g-4">
                                        
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Name</label>
                                                </div>
                                                <div className="col">
                                                    <input
                                                    className="form-control card shadow"
                                                    type="text"
                                                    id="Name"
                                                    name="Name"
                                                    placeholder="Name"
                                                    value={formik.values.Name}
                                                    onChange={formik.handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className='formik-error'>{formik.errors.Name}</div>
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">AdminAddress</label>
                                                </div>
                                                <div className="col">
                                                    <input
                                                    className="form-control card shadow"
                                                    type="text"
                                                    id="AdminAddress"
                                                    name="AdminAddress"
                                                    placeholder="AdminAddress"
                                                    value={formik.values.AdminAddress}
                                                    onChange={formik.handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className='formik-error'>{formik.errors.AdminAddress}</div>
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">AdminCommission</label>
                                                </div>
                                                <div className="col">
                                                    <input
                                                    className="form-control card shadow"
                                                    type="text"
                                                    id="AdminCommission"
                                                    name="AdminCommission"
                                                    placeholder="AdminCommission"
                                                    value={formik.values.AdminCommission}
                                                    onChange={formik.handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className='formik-error'>{formik.errors.AdminCommission}</div>
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">BlockExplorer</label>
                                                </div>
                                                <div className="col">
                                                    <input
                                                    className="form-control card shadow"
                                                    type="text"
                                                    id="BlockExplorer"
                                                    name="BlockExplorer"
                                                    placeholder="BlockExplorer"
                                                    value={formik.values.BlockExplorer}
                                                    onChange={formik.handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className='formik-error'>{formik.errors.BlockExplorer}</div>
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">ChainID</label>
                                                </div>
                                                <div className="col">
                                                    <input
                                                    className="form-control card shadow"
                                                    type="text"
                                                    id="ChainID"
                                                    name="ChainID"
                                                    placeholder="ChainID"
                                                    value={formik.values.ChainID}
                                                    onChange={formik.handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className='formik-error'>{formik.errors.ChainID}</div>
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Currency</label>
                                                </div>
                                                <div className="col">
                                                    <input
                                                    className="form-control card shadow"
                                                    type="text"
                                                    id="Currency"
                                                    name="Currency"
                                                    placeholder="Currency"
                                                    value={formik.values.Currency}
                                                    />
                                                </div>
                                            </div>
                                            <div className='formik-error'>{formik.errors.Currency}</div>

                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Fee Address</label>
                                                </div>
                                                <div className="col">
                                                    <input
                                                    className="form-control card shadow"
                                                    type="text"
                                                    id="FeeAddress"
                                                    name="FeeAddress"
                                                    placeholder="Fee Address"
                                                    value={formik.values.FeeAddress}
                                                    onChange={formik.handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className='formik-error'>{formik.errors.FeeAddress}</div>

                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">FactoryContract</label>
                                                </div>
                                                <div className="col">
                                                    <input
                                                    className="form-control card shadow"
                                                    type="text"
                                                    id="FactoryContract"
                                                    name="FactoryContract"
                                                    placeholder="FactoryContract"
                                                    value={formik.values.FactoryContract}
                                                    onChange={formik.handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className='formik-error'>{formik.errors.FactoryContract}</div>

                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">MultiContract</label>
                                                </div>
                                                <div className="col">
                                                    <input
                                                    className="form-control card shadow"
                                                    type="text"
                                                    id="MultiContract"
                                                    name="MultiContract"
                                                    placeholder="MultiContract"
                                                    value={formik.values.MultiContract}
                                                    onChange={formik.handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className='formik-error'>{formik.errors.MultiContract}</div>

                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">RpcUrl</label>
                                                </div>
                                                <div className="col">
                                                    <input
                                                    className="form-control card shadow"
                                                    type="text"
                                                    id="RpcUrl"
                                                    name="RpcUrl"
                                                    placeholder="RpcUrl"
                                                    value={formik.values.RpcUrl}
                                                    onChange={formik.handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className='formik-error'>{formik.errors.RpcUrl}</div>

                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">FactoryAbiArray</label>
                                                </div>
                                                <div className="col">
                                                    <input
                                                    className="form-control card shadow"
                                                    type="text"
                                                    id="FactoryAbiArray"
                                                    name="FactoryAbiArray"
                                                    placeholder="FactoryAbiArray"
                                                    value={formik.values.FactoryAbiArray}
                                                    onChange={formik.handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className='formik-error'>{formik.errors.FactoryAbiArray}</div>

                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">MultiAbiArray</label>
                                                </div>
                                                <div className="col">
                                                    <input
                                                    className="form-control card shadow"
                                                    type="text"
                                                    id="MultiAbiArray"
                                                    name="MultiAbiArray"
                                                    placeholder="MultiAbiArray"
                                                    value={formik.values.MultiAbiArray}
                                                    onChange={formik.handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">GiftAbiArray</label>
                                                </div>
                                                <div className="col">
                                                    <input
                                                    className="form-control card shadow"
                                                    type="text"
                                                    id="GiftAbiArray"
                                                    name="GiftAbiArray"
                                                    placeholder="GiftAbiArray"
                                                    value={formik.values.GiftAbiArray}
                                                    onChange={formik.handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">GiftContract</label>
                                                </div>
                                                <div className="col">
                                                    <input
                                                    className="form-control card shadow"
                                                    type="text"
                                                    id="GiftContract"
                                                    name="GiftContract"
                                                    placeholder="GiftContract"
                                                    value={formik.values.GiftContract}
                                                    onChange={formik.handleChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className='formik-error'>{formik.errors.MultiAbiArray}</div>

                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Admin Private Key</label>
                                                </div>
                                                <div className="col">
                                                    <input
                                                    className="form-control card shadow"
                                                    type="text"
                                                    id="GiftAbiArray"
                                                    name="GiftAbiArray"
                                                    placeholder="Admin Private Key"
                                                    onChange={(e) => setPrivateKeyAddress(e.target.value)}
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
    </>
  )
}

export default EditNetwork