import React,{useState,useEffect} from 'react'
import DashboardHeader from '../../../components/dashboard/header/DashboardHeader'
import { useParams } from 'react-router-dom'
import { useGetSingleContactUsQuery } from '../../../Store/Store'
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { toast,ToastContainer } from "react-toastify";
import { useEditContactUsMutation } from '../../../Store/Store';

const EditContactUs = () => {
    const {id}=useParams();
    const initialState = {
        contactus_id:id,
        name: "",
        email: "",
        phone: "",
        address: "",
      };
      const [formValue, setFormValue] = useState(initialState);
      const { name, email, phone, address } = formValue;

    const {data,responseInfo}=useGetSingleContactUsQuery(id);
    console.log("single terms data",data)
    const [editContactUs,editInfo]=useEditContactUsMutation();
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
        editContactUs(formValue)

    }

    useEffect(() => {

        if(editInfo?.data?.status === true) {
            toast?.success(editInfo?.data?.message)
            setTimeout(() => (window.location.href = "/contact-us"), 2000);
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
                 <Tab eventKey="" title="Contact Us">
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
                               name="email"
                               placeholder="Email..."
                               defaultValue={data?.result?.email}
                               onChange={handleInputChanges}
                             />
                           </div>
                           <div className="col-12">
                             <input
                               className="form-control bg-gray border-0"
                               type="number"
                               id="name"
                               name="phone"
                               placeholder="Phone..."
                               defaultValue={data?.result?.phone}
                               onChange={handleInputChanges}
                             />
                           </div>
                           <div className="col-12">
                             <input
                               className="form-control bg-gray border-0"
                               type="text"
                               id="name"
                               name="address"
                               placeholder="Address..."
                               defaultValue={data?.result?.address}
                               onChange={handleInputChanges}
                             />
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

export default EditContactUs