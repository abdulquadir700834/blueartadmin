import React , {useState,useEffect} from 'react'
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useGetGeneralSettingsQuery } from '../Store/Store';
import axios from 'axios';
import { useEditGeneralSettingsMutation } from '../Store/Store';
import { ToastContainer,toast } from 'react-toastify';

const GeneralSettings = () => {
    const [inputImage, setInputImage] = useState(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

      );
    const [bannerImage, setBannerImage] = useState(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
      );
      const [createPost,responseInfo]=useEditGeneralSettingsMutation();
      const [defaultCurrencies,setDefaultCurrencies]=useState("");
      const [defaultLanguage,setDefaultLanguage]=useState("");
      const [logoFile, setLogoFile] = useState("");
      const [bannerFile, setBannerFile] = useState('');

      const {data}=useGetGeneralSettingsQuery();
      console.log("general setting",data)

      const ImagehandleChange = (e) => {
        setInputImage(URL.createObjectURL(e.target.files[0]));
        setTimeout(() => {

            var formData = new FormData();
            formData.append('file', e.target.files[0]);
            
             axios
             .post(`https://nugennftapi.stsblockchain.xyz/media/generalLogo`, formData, {
             })
             .then((res) => {
                
                 setLogoFile(res?.data?.filepath)
             })

        }, [1000])
    }

    
    const bannerhandleChange = (e) => {
      setBannerImage(URL.createObjectURL(e.target.files[0]));
      setTimeout(() => {
          var formData = new FormData();
          formData.append('file', e.target.files[0]);
           axios
           .post(`https://nugennftapi.stsblockchain.xyz/media/generalfavicon`, formData, {
           })
           .then((res) => {
               setBannerFile(res?.data?.filepath)
           })

      }, [1000])
  }

  const newPost = {
    _id:"6374cad87cfdb66d376888bd",
    "defaultCurrencies":defaultCurrencies,
    "defaultLanguage":defaultLanguage,
    "logo": logoFile,
    "favicon": bannerFile,
}

const handleSubmit = (e) => {
  e.preventDefault();
  createPost(newPost)
}

useEffect(() => {
  setDefaultCurrencies(data?.data?.defaultCurrencies)
  setDefaultLanguage(data?.data?.defaultLanguage)
  setInputImage(data?.data?.result?.image)
  setBannerFile(data?.data?.result?.banner)
}, [data])

    useEffect(() => {
      if(responseInfo?.data?.status === true) {
          toast?.success(responseInfo?.data?.message)
      } else {
          toast?.error(responseInfo?.data?.message)           
      }
  }, [responseInfo])



  return (
    <>
    <div className="admin-wrapper-table">
      <ToastContainer></ToastContainer>
    <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
              <Tabs className="border-0 mb-3 settings-tabs">
                <Tab eventKey="" title="General Settings">
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                      <Form onSubmit={handleSubmit}>
                        <div className="row g-4">
                          <div className="col-12">
                            <label>Default Currency</label>
                            <input
                              className="form-control bg-gray border-0"
                              type="text"
                              id="currency"
                              name="defaultCurrencies"
                              placeholder="Your Currency Name..."
                              value={defaultCurrencies}
                              onChange={e => setDefaultCurrencies(e.target.value)}
                            />
                          </div>
                            <lable>Default Language</lable>
                          <div className="col-12">
                            <input
                              className="form-control bg-gray border-0"
                              type="text"
                              id="language"
                              name="defaultLanguage"
                              placeholder="Your Language name..."
                              value={defaultLanguage}
                              onChange={e => setDefaultLanguage(e.target.value)}
                            />
                          </div>
                        <div className='row' >
                            <div className='col-md-6'>
                        <div className="img-holder">
                            <img
                              src={inputImage}
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
                            onChange={ImagehandleChange}
                          />
                          <div className="label">
                            <label className="image-upload" htmlFor="input1">
                              Choose your Logo
                            </label>
                          </div>
                        </div>
                        <div className='container' style={{
                                position: "absolute",
                                bottom: "8.7rem",
                                left: "10rem"
                        }} >
                          </div>

                          <div className='col-md-6'>
                        <div className="img-holder">
                            <img
                              src={bannerImage}
                              alt=""
                              id="img"
                              className="img"
                            />
                          </div>
                        
                          <input
                            type="file"
                            accept="image/*"
                            name="favicon"
                            id="input2"
                            onChange={bannerhandleChange}
                          />
                          <div className="label">
                            <label className="image-upload" htmlFor="input2">
                              Choose your Favicon
                            </label>
                          </div>
                        </div>
                              </div>

                          <div className="col-md-4 col-12 m-auto">
                            <input
                              className="btn btn-primary w-100 rounded-pill"
                              type="submit"
                              value={ "Save"}
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

export default GeneralSettings