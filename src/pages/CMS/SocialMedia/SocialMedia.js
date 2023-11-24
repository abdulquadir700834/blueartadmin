import React, { useState,useEffect } from 'react'
import DashboardHeader from '../../../components/dashboard/header/DashboardHeader'
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useGetSocialMediaLinksQuery } from '../../../Store/Store';
import { toast,ToastContainer } from "react-toastify";
import { useAddSocialMediaMutation } from '../../../Store/Store';

const SocialMedia = () => {

    const {data}=useGetSocialMediaLinksQuery();
    console.log(data);
    const [addSocialMedia,responseInfo]=useAddSocialMediaMutation();
    const id=data?.data?._id;
    console.log("social id",id);

    const initialState = {
        socialId:"636503f31d70c1453073eff8",
        facebook: "",  
        twitter: "",
        linkedin: "",
        pintrest: "",
        youtube: "",
        instagram: "",
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
        addSocialMedia(formValue)

    }

    useEffect(() => {
    
      if(responseInfo?.data?.status === true) {
          toast?.success(responseInfo?.data?.message)
          setTimeout(() => (window.location.href = "/social-media"), 2000);
      } else {
          toast?.error(responseInfo?.data?.message)           
      }
  
  }, [responseInfo])
 
  return (
    <>
    <div className="admin-wrapper ">
        <ToastContainer></ToastContainer>
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
              <Tabs className="border-0 mb-3 settings-tabs">
                <Tab eventKey="" title="Social Media">
                  <div className="card ">
                    <div className="card-body p-4 p-sm-5 ">
                      <Form onSubmit={handleSubmit} >
                        <div className="">
                          <div className="col-12">
                            <label>Facebook</label>
                            <input
                              className="form-control bg-gray border-0"
                              type="text"
                              id="facebook"
                              name="facebook"
                              placeholder="Facebook"
                              defaultValue={data?.data?.facebook}
                              onChange={handleInputChanges}
                            />
                          </div> 
                          <div className="col-12">
                          <label>Twitter</label>
                            <input
                              className="form-control bg-gray border-0"
                              type="text"
                              id="twitter"
                              name="twitter"
                              placeholder="twitter"
                              defaultValue={data?.data?.twitter}
                              onChange={handleInputChanges}
                            />
                          </div>
                          <div className="col-12">
                          <label>LinkedIn</label>
                            <input
                              className="form-control bg-gray border-0"
                              type="text"
                              id="linkedin"
                              name="linkedin"
                              placeholder="LinkedIn"
                              defaultValue={data?.data?.linkedin}
                              onChange={handleInputChanges}
                            />
                          </div>
                          <div className="col-12">
                          <label>Pinternet</label>
                            <input
                              className="form-control bg-gray border-0"
                              type="text"
                              id="pinterest"
                              name="pinterest"
                              placeholder="Pinterest"
                              defaultValue={data?.data?.pinterest}
                              onChange={handleInputChanges}
                            />
                          </div>
                          <div className="col-12">
                          <label>Youtube</label>
                            <input
                              className="form-control bg-gray border-0"
                              type="text"
                              id="youtube"
                              name="youtube"
                              placeholder="Youtube"
                              defaultValue={data?.data?.youtube}
                              onChange={handleInputChanges}
                            />
                          </div>
                          <div className="col-12">
                          <label>Instagram</label>
                            <input
                              className="form-control bg-gray border-0"
                              type="text"
                              id="instagram"
                              name="instagram"
                              placeholder="Instagram"
                              defaultValue={data?.data?.instagram}
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
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SocialMedia