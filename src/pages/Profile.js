import React,{useState} from 'react'
import axios from 'axios';
import DashboardHeader from '../components/dashboard/header/DashboardHeader'
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useSingleUserDetailsQuery, useUpdateUserMutation } from '../Store/Store';
import { useEffect } from 'react';

const Profile = () => {

    const [createPost, responseInfo] = useUpdateUserMutation();
    const userid = sessionStorage?.getItem("userId")
    const data = useSingleUserDetailsQuery(userid);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [first_name, setFirst_Name] = useState("")
    const [last_name, setLast_Name] = useState("")
    const [profile, setProfile] = useState("")
    const [profileImg, setProfileImg] = useState(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
      );


      const handleInputChange= (e) => { 
        e.preventDefault()
        setTimeout(() => {
          var formData = new FormData();
          formData.append('file', e.target.files[0]);
          axios
              .post(`${process.env.REACT_APP_BACKEND_URL}media/avatar`, formData, {
              })
              .then((res) => {
                  console.log(res, "789")
                  setProfile(res?.data?.filepath);
              })

      }, [1500])
      }

  useEffect(() => {
    setName(data?.data?.result?.username)
    setEmail(data?.data?.result?.email)
    setFirst_Name(data?.data?.result?.first_name)
    setLast_Name(data?.data?.result?.last_name)
}, [])


console.log(profile, "test")


const handleSubmit = (e) => {
  e.preventDefault()
  createPost({ 
    "name": name,
    "profile_image": profile,
    "user_id": userid
  })
}


  return (
   <>
   <div className="admin-wrapper-table">
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
              <Tabs className="border-0 mb-3 settings-tabs">
                <Tab eventKey="" title="Add Profile">
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                      <Form onSubmit={""}>
                        <div className="row g-4">

                        <div className="col-12">
                            <label>Name</label>
                            <input
                              className="form-control bg-gray border-0"
                              type="text"
                              id="currency"
                              name="defaultCurrencies"
                              placeholder="Your Currency Name..."
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>

                        <div className='col-md-6 m-auto' >
                        <div className="img-holder">
                            <img
                              src={profileImg}
                              alt=""
                              id="img"
                              className="img"
                            />
                          </div>
                        
                          <input
                            type="file"
                            accept="image/*"
                            name="logo"
                            id="input1"
                            onChange={() => handleInputChange()}
                          />
                          <div className="label">
                            <label className="image-upload" htmlFor="input1">
                              Choose your Logo
                            </label>
                          </div>
                        </div>
                          <div className="col-md-4 col-12 m-auto">
                            <input
                              className="btn btn-primary w-100 rounded-pill"
                              type="submit"
                              onClick={(e) => handleSubmit(e)}
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

export default Profile