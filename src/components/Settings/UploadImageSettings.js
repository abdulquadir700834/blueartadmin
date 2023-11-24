import React, { useState, useEffect, useRef } from "react";
import Form from 'react-bootstrap/Form';
import { useFormik } from "formik";
import axios from "axios";
import CreateNewButton from "../dashboard/createNew/CreateNewButton";
import { useSingleUserDetailsQuery, useUpdateUserMutation } from "../../Store/Store";
import $ from "jquery";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../loader/Loader";
import { Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

window.jQuery = window.$ = $;
require("jquery-nice-select");

const UploadImageSettings = ({ setting, module }) => {
  let navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState('general');
  const [logoFile, setLogoFile] = useState("");
  const [favIconFile, setFavIconFile] = useState("");
  const [inputImage, setInputImage] = useState("");
  const [faviconInput, setFavIconInput] = useState("");
  const [createPost, responseInfo] = useUpdateUserMutation();
  const [isImageBig, setIsImageBig] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const selectTimezone = useRef();
  const selectWeekStart = useRef();

  const userid = sessionStorage?.getItem("userId")

  const data = useSingleUserDetailsQuery(userid);

  useEffect(() => {
    $(selectTimezone.current).niceSelect();
  }, []);

  useEffect(() => {
    $(selectWeekStart.current).niceSelect();
  }, []);

  const formik = useFormik({
    initialValues: {
      Logo: "",
      Favicon: "",
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      setIsLoading(true);
      if (!logoFile || !favIconFile) {
        toast.error("Please select both the logo and favicon.");
        setIsLoading(false);
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("myToken")}` }
      };

      var formData = new FormData();
      formData.append("Type", "LogoFavicon");
      formData.append("Logo", logoFile);
      formData.append("Favicon", favIconFile);

      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}LogoFavFilesUpload`, formData, config)
        .then((res) => {
          console.log(res, "789")
          if (res?.data?.status) {
            let obj = {
              Favicon: res.data.Favicon,
              Logo: res.data.Logo
            };

            axios
              .post(`${process.env.REACT_APP_BACKEND_URL}UpdateLogoFavicon`, obj, config)
              .then((res) => {
                setInputImage(res.data.filepathLogo.CLocal);
                setFavIconInput(res.data.filepathFavicon.CLocal);
                toast.success(res?.data?.info);
                setIsLoading(false);
              });
            toast.success(res?.data?.info);
            setTimeout(() => (window.location.href = "/settings"), 1500);
          } else {
            toast.error(res?.data?.info);
            setIsLoading(false);
          }
          setIsLoading(false);
        });
    },
  });


  const ImagehandleChange = (e) => {
    setLogoFile(e.target.files[0]);
    setInputImage(URL.createObjectURL(e.target.files[0]));
    console.log(process.env.REACT_APP_BACKEND_URL, "backendUrl");
  };

  const faviconImage = (e) => {
    setFavIconFile(e.target.files[0]);
    setFavIconInput(URL.createObjectURL(e.target.files[0]));
    console.log(process.env.REACT_APP_BACKEND_URL, "backendUrl");
  };

  const toggleImageSize = () => {
    setIsImageBig(!isImageBig);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsImageBig(true);
  };

  return (
    <>
      {isLoading && <Loader />}
      <CreateNewButton />
      <ToastContainer></ToastContainer>
      <div className="">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-sm-12">
              <p style={{ marginLeft: "50px", fontSize: "2rem", color: "#fff", fontWeight: "800" }}>Update Image Settings</p>
              <div className="card">
                <div className="card-body p-4 p-sm-5">
                  <Form onSubmit={formik.handleSubmit}>
                    <div className="container">
                      <div className="row align-items-center">
                        <div className="col">
                          <label className="labes">Logo</label>
                        </div>
                        <div className="col">
                          <input
                            className="form-control card shadow w-100"
                            type="file"
                            name="Logo"
                            placeholder="Logo"
                            id="Logo"
                            value={formik.values.Logo}
                            onChange={(e) => ImagehandleChange(e)}
                          />
                          {inputImage === "" ? <img className="banner-image-pre" alt="" src={setting?.data?.info?.ProjectDetails?.Logo}
                            onClick={() => handleImageClick(setting?.data?.info?.ProjectDetails?.Logo)}></img> : <img alt="" className="banner-image-pre" src={inputImage} onClick={() => handleImageClick(inputImage)}></img>}
                          <div className="formik-error">{formik.errors.Logo}</div>
                        </div>
                      </div>
                    </div>

                    <div className="cmaterialmaterialontainer">
                      <div className="row align-items-center">
                        <div className="col">
                          <label className="labes">Favicon</label>
                        </div>
                        <div className="col">
                          <input
                            className="form-control card shadow w-100"
                            type="file"
                            name="Favicon"
                            placeholder="Favicon"
                            value={formik.values.Favicon}
                            onChange={(e) => faviconImage(e)}
                          />
                          {faviconInput === "" ? <img className="banner-image-pre" alt="" src={setting?.data?.info?.ProjectDetails?.Favicon}
                            onClick={() => handleImageClick(setting?.data?.info?.ProjectDetails?.Favicon)}></img> : <img className="banner-image-pre" alt="" src={faviconInput}></img>}
                          <div className="formik-error">{formik.errors.Favicon}</div>
                        </div>
                      </div>
                    </div>

                    {module?.SettingsModule?.Write &&
                      <div className="col-12" style={{ margin: "20px 0" }}>
                        <button className="btn btn-primary w-100 rounded-pill" type="submit">
                          <i className="bi bi-sd-card-fill me-1" />Save changes
                        </button>
                      </div>
                    }
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal show={isImageBig} onHide={toggleImageSize} centered>
        <Modal.Body>
          {selectedImage && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={selectedImage}
                style={{ maxWidth: "100%", }}
                alt="Expanded Image"
              />
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UploadImageSettings;