import { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import axios from "axios";
import CreateNewButton from "../dashboard/createNew/CreateNewButton";
import {
  useSingleUserDetailsQuery,
} from "../../Store/Store";
import $ from "jquery";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../loader/Loader";
import { useNavigate } from "react-router-dom";
window.jQuery = window.$ = $;
require("jquery-nice-select");

const LandingSection3 = ({ setting, module }) => {
  function isVideoFile(url) {
    const videoExtensions = ["mp4", "avi", "mov", "mkv"];
    const extension = url.split(".").pop();
    return videoExtensions.includes(extension.toLowerCase());
  }
  const [isLoading, setIsLoading] = useState(false);
  const [logoFile, setLogoFile] = useState("");
  const [inputImage, setInputImage] = useState("");
  const [sectTitle, setSectTitle] = useState("");
  const [sectText, setSectText] = useState("");
  let navigate = useNavigate();

  const handleChange = (e) => {
    setSectTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setSectText(e.target.value);
  };

  const selectTimezone = useRef();
  const selectWeekStart = useRef();

  const userid = sessionStorage?.getItem("userId");

  const data = useSingleUserDetailsQuery(userid);
  useEffect(() => {
    $(selectTimezone.current).niceSelect();
  }, []);

  useEffect(() => {
    $(selectWeekStart.current).niceSelect();
  }, []);
  const formik = useFormik({
    initialValues: {
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("myToken")}`,
        },
      };

      var formData = new FormData();
      setIsLoading(true);
      formData.append("Type", "LandingSection1");
      if (logoFile) {
        formData.append("Section3Image", logoFile);
      }
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}UpdateLandingSection3Image`,
          formData,
          config,
          {}
        )
        .then((res) => {
          if (res?.data?.status) {
            let obj = {
              Image: res.data.Image,
              Section3Title: sectTitle || setting[0]?.Section3Title,
              Section3Text: sectText || setting[0]?.Section3Text,
            };
            axios
              .post(
                `${process.env.REACT_APP_BACKEND_URL}UpdateLandingSection3`,
                obj,
                config,
                {}
              )
              .then((res) => {
                setInputImage(res.data.Image);
              });
            toast.success(res?.data?.message);
            setIsLoading(false);
             setTimeout(() => navigate("/landing"), 1500);
          } else {
            toast.error(res?.data?.message);
            setIsLoading(false);
          }
        });
    },
  });

  const ImagehandleChange = (e) => {
    setLogoFile(e.target.files[0]);
    setInputImage(URL.createObjectURL(e.target.files[0]));
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
              <p
                style={{
                  marginLeft: "50px",
                  fontSize: "2rem",
                  color: "#fff",
                  fontWeight: "800",
                }}
              >
                Landing Section 3 Image{" "}
              </p>
              <div className="card">
                <div className="card-body p-4 p-sm-5">
                  <Form onSubmit={formik.handleSubmit}>

                    <div className="container">
                      <div className="row align-items-center">
                        <div className="col">
                          <label className="labes">Section3 Title</label>
                        </div>
                        <div className="col">
                          <input
                            className="form-control card shadow"
                            type="text"
                            id="name"
                            name="Section3Title"
                            placeholder="Your Section2Title..."
                            defaultValue={setting[0]?.Section3Title}
                          onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="container">
                      <div className="row align-items-center">
                        <div className="col">
                          <label className="labes">Section3 Text</label>
                        </div>
                        <div className="col">
                          <input
                            className="form-control card shadow"
                            type="text"
                            id="name"
                            name="Section3Title"
                            placeholder="Your Section3Title..."
                            defaultValue={setting[0]?.Section3Text}
                          onChange={handleTextChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="container">
                      <div className="row align-items-center">
                        <div className="col">
                          <label className="labes">Image</label>
                        </div>
                        <div className="col">
                          <input
                            className="form-control card shadow w-100"
                            type="file"
                            name="Image"
                            placeholder="Image"
                            id="Image"
                            value={formik.values.Logo}
                            onChange={(e) => ImagehandleChange(e)}
                          />
                          {inputImage === "" ? (
                            setting[0]?.Section3Image &&
                              setting[0]?.Section3Image ? (
                              isVideoFile(setting[0]?.Section3Image) ? (
                                <video className="banner-video-pre" controls>
                                  <source
                                    src={setting[0]?.Section3Image}
                                    type="video/mp4"
                                  />
                                </video>
                              ) : (
                                <img
                                  className="banner-image-pre"
                                  alt=""
                                  src={setting[0]?.Section3Image}
                                />
                              )
                            ) : (
                              <p>No image or video available</p>
                            )
                          ) : (
                            <img
                              alt=""
                              className="banner-image-pre"
                              src={inputImage}
                            />
                          )}
                          <div className="formik-error">
                            {formik.errors.Logo}
                          </div>
                        </div>
                      </div>
                    </div>
                    {module?.LandingModule?.Write && (
                      <div className="col-12" style={{ margin: "20px 0" }}>
                        <button
                          className="btn btn-primary w-100 rounded-pill"
                          type="submit"
                        >
                          <i className="bi bi-sd-card-fill me-1" />
                          Save changes
                        </button>
                      </div>
                    )}
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingSection3;
