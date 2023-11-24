import React ,{useState,useEffect}from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetSingleHomePageBannerQuery } from '../../../Store/Store'
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { toast,ToastContainer } from "react-toastify";
import { useEditHomePageBannerMutation } from '../../../Store/Store';
import DashboardHeader from '../../../components/dashboard/header/DashboardHeader';


const EditHomeBanner = () => {
    const {id}=useParams();
    let navigate = useNavigate();
    const initialState = {
        id:id,
        banner_image: "",
        banner_title: "",
        banner_description: "",
        status:"",
      };
      const [formValue, setFormValue] = useState(initialState);
      const { banner_image, banner_title, banner_description,status } = formValue;

    const {data,responseInfo}=useGetSingleHomePageBannerQuery(id);
    console.log("single home page banner data",data)
    const [editHomePageBanner,editInfo]=useEditHomePageBannerMutation();
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
        editHomePageBanner(formValue)

    }

    useEffect(() => {

        if(editInfo?.data?.status === true) {
            toast?.success(editInfo?.data?.message)
            setTimeout(() => navigate("/homepage-list"), 2000);
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
                <Tab eventKey="" title="Add Terms & Conditions">
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                      <Form onSubmit={handleSubmit} >
                        <div className="row g-4">
                          <div className="col-12">
                            <input
                              className="form-control bg-gray border-0"
                              type="text"
                              id="name"
                              name="banner_image"
                              placeholder="Banner Image"
                              defaultValue={data?.result?.banner_image}
                              onChange={handleInputChanges}
                            />
                          </div>
                          <div className="col-12">
                            <input
                              className="form-control bg-gray border-0"
                              type="text"
                              id="name"
                              name="banner_title"
                              placeholder="Banner Title"
                              defaultValue={data?.result?.banner_title}
                              onChange={handleInputChanges}
                            />
                          </div>
                          <div className="col-12">
                            <input
                              className="form-control bg-gray border-0"
                              type="text"
                              id="name"
                              name="banner_description"
                              placeholder="Banner Description"
                              defaultValue={data?.result?.banner_description}
                              onChange={handleInputChanges}
                            />
                          </div>
                          <div className="col-12">
                            <select className="filter-select bg-gray w-100" name="status" defaultValue={data?.result?.status} onChange={handleInputChanges} >
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

export default EditHomeBanner