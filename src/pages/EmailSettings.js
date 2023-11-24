import React, { useState,useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import DashboardHeader from '../components/dashboard/header/DashboardHeader'
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useGetEmailSettingsQuery } from '../Store/Store';
import { toast,ToastContainer } from "react-toastify";
import { useAddEmailSettingsMutation } from '../Store/Store';

const EmailSettings = () => {
        let navigate = useNavigate();
        const {data}=useGetEmailSettingsQuery();
        console.log(data);
        const id=data?.data?.id
        console.log("emailSettings Id",id);

        const [addEmailSettings,responseInfo]=useAddEmailSettingsMutation();

    const initialState = {
        emailSettingsId:"6365f7ddcf725c7cc4d68023",
        driver:"",
        host: "", 
        port: "",
        fromAddress: "",
        fromName: "",
        encryption: "",
        username: "",
        password: "",
      };
      const [formValue, setFormValue] = useState(initialState);


    const handleInputChanges=(e)=>{
        e.preventDefault();
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });  
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(formValue);
        addEmailSettings(formValue)

    }

    useEffect(() => {
    
        if(responseInfo?.data?.status === true) {
            toast?.success(responseInfo?.data?.message)
            setTimeout(() => navigate("/email-settings"), 2000);
        } else {
            toast?.error(responseInfo?.data?.message)           
        }
    
    }, [responseInfo])
  return (
    <>
    <div className="admin-wrapper">
        <ToastContainer></ToastContainer>
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
                <h3>Email Settings</h3>
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                      <Form onSubmit={handleSubmit} >
                        <div className="">
                          <div className="col-12">
                            <label>Driver</label>
                            <input
                              className="form-control card shadow"
                              type="text"
                              id="driver"
                              name="driver"
                              placeholder="Driver"
                              defaultValue={data?.data?.driver}
                              onChange={handleInputChanges}
                            />
                          </div> 
                          <div className="col-12">
                          <label>Host</label>
                            <input
                              className="form-control card shadow"
                              type="text"
                              id="host"
                              name="host"
                              placeholder="Host"
                              defaultValue={data?.data?.host}
                              onChange={handleInputChanges}
                            />
                          </div>
                          <div className="col-12">
                          <label>Port</label>
                            <input
                              className="form-control card shadow"
                              type="text"
                              id="port"
                              name="port"
                              placeholder="Port"
                              defaultValue={data?.data?.port}
                              onChange={handleInputChanges}
                            />
                          </div>
                          <div className="col-12">
                          <label>From Address</label>
                            <input
                              className="form-control card shadow"
                              type="text"
                              id="fromAddress"
                              name="fromAddress"
                              placeholder="From Address"
                              defaultValue={data?.data?.fromAddress}
                              onChange={handleInputChanges}
                            />
                          </div>
                          <div className="col-12">
                          <label>From Name</label>
                            <input
                              className="form-control card shadow"
                              type="text"
                              id="fromName"
                              name="fromName"
                              placeholder="From Name"
                              defaultValue={data?.data?.fromName}
                              onChange={handleInputChanges}
                            />
                          </div>
                          <div className="col-12">
                          <label>Encryption</label>
                            <input
                              className="form-control card shadow"
                              type="text"
                              id="encryption"
                              name="encryption"
                              placeholder="Encryption"
                              defaultValue={data?.data?.encryption}
                              onChange={handleInputChanges}
                            />
                          </div>
                          <div className="col-12">
                          <label>Username</label>
                            <input
                              className="form-control card shadow"
                              type="text"
                              id="username"
                              name="username"
                              placeholder="Username"
                              defaultValue={data?.data?.username}
                              onChange={handleInputChanges}
                            />
                          </div>
                          <div className="col-12">
                          <label>Password</label>
                            <input
                              className="form-control card shadow"
                              type="text"
                              id="password"
                              name="password"
                              placeholder="Password"
                              defaultValue={data?.data?.password}
                              onChange={handleInputChanges}
                            />
                          </div>
                          <div className="col-12">
                            <input
                              className="btn btn-primary w-100 rounded-pill"
                              type="submit"
                              value={"Save"}
                            />
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
             
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default EmailSettings