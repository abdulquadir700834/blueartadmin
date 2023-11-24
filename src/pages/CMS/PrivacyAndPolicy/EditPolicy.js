import React,{useState,useEffect} from 'react'
import DashboardHeader from '../../../components/dashboard/header/DashboardHeader'
import { useParams } from 'react-router-dom'
import { useGetSinglePrivacyPolicyQuery } from '../../../Store/Store'
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { toast,ToastContainer } from "react-toastify";
import { useEditPrivacyPolicyMutation } from '../../../Store/Store';

const EditPolicy = () => {

    const {id}=useParams();
    const initialState = {
        id:id,
        name: "",
        url: "",
        status: "",
      };
      const [formValue, setFormValue] = useState(initialState);
      const { name, url, status } = formValue;

    const {data,responseInfo}=useGetSinglePrivacyPolicyQuery(id);
    console.log("single terms data",data)
    const [editPolicy,editInfo]=useEditPrivacyPolicyMutation();
    console.log("edit info",editInfo)


    const handleInputChanges=(e)=>{
        e.preventDefault();
        let { name, value } = e.target;
        setFormValue({ ...formValue, [name]: value });  
        console.log("edit values",formValue);
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(formValue);
        editPolicy(formValue)

    }

    useEffect(() => {

        if(editInfo?.data?.status === true) {
            toast?.success(editInfo?.data?.message)
            setTimeout(() => (window.location.href = "/privacy-policy-list"), 2000);
        } else {
            toast?.error(editInfo?.data?.message)           
        }
    
    }, [editInfo])
  return (
    <>
    <div className="admin-wrapper">
      <ToastContainer></ToastContainer>
      <div className="container">
        <div className="row g-4 justify-content-center">
          <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
            <Tabs className="border-0 mb-3 settings-tabs">
              <Tab eventKey="" title="Update Privacy and Policy">
                <div className="card">
                  <div className="card-body p-4 p-sm-5">
                    <Form onSubmit={handleSubmit} >
                      <div className="row g-4">
                        <div className="col-12">
                          <input
                            className="form-control bg-gray border-0"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name..."
                            defaultValue={data?.result?.name}
                            onChange={handleInputChanges}
                          />
                        </div>
                        <div className="col-12">
                          <input
                            className="form-control bg-gray border-0"
                            type="text"
                            id="name"
                            name="url"
                            placeholder="URL..."
                            defaultValue={data?.result?.url}
                            onChange={handleInputChanges}
                          />
                        </div>

                        <div className="col-12">
                          <select className="filter-select bg-gray w-100" name="status"  defaultValue={data?.result?.status}  onChange={handleInputChanges} >
                            <option  >active</option>
                            <option  >inactive</option>

                          </select>
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

export default EditPolicy