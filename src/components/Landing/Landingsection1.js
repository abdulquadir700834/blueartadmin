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

const LandingSection1 = ({ setting, module }) => {
  const [isLoading, setIsLoading] = useState(false);
  function isVideoFile(url) {
    const videoExtensions = ["mp4", "avi", "mov", "mkv"];
    const extension = url.split(".").pop();
    return videoExtensions.includes(extension.toLowerCase());
  }

  let navigate = useNavigate();
  const [logoFile, setLogoFile] = useState("");
  const [inputImage, setInputImage] = useState("");
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
      formData.append("Type", "LandingSection1");
      if (logoFile) {
        formData.append("Section1Image", logoFile);
      }
      const requestBody = Object.fromEntries(formData);

      setIsLoading(true);
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}UpdateLandingSection1Image`,
          formData,
          config,
          {}
        )
        .then((res) => {
          console.log(res, "789");
          if (res?.data?.status) {
            let obj = {
              Image: res.data.Image,
            };
            axios
              .post(
                `${process.env.REACT_APP_BACKEND_URL}UpdateLandingSection1`,
                obj,
                config,
                {}
              )
              .then((res) => {
                setInputImage(res.data.Image);
              });
            setIsLoading(false);
            toast.success(res?.data?.message);
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
    console.log("inputImage:", inputImage)
    console.log(process.env.REACT_APP_BACKEND_URL, "backendUrl");
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
                Landing Section 1 Image{" "}
              </p>
              <div className="card">
                <div className="card-body p-4 p-sm-5">
                  <Form onSubmit={formik.handleSubmit}>
                    <div className="container">
                      <div className="row align-items-center">
                        <div className="col">
                          <label className="labes">Image or Video</label>
                        </div>
                        <div className="col">
                          <input
                            className="form-control card shadow w-100"
                            type="file"
                            name="Image"
                            placeholder="Image"
                            id="Image"
                            value={formik.values?.Image}
                            onChange={(e) => ImagehandleChange(e)}
                          />
                          {inputImage === "" ? (
                            setting[0]?.Section1Image &&
                            setting[0]?.Section1Image? (
                              isVideoFile(setting[0]?.Section1Image) ? (
                                <video className="banner-video-pre" controls>
                                  <source
                                    src={setting[0]?.Section1Image}
                                    type="video/mp4"
                                  />
                                </video>
                              ) : (
                                <img
                                  className="banner-image-pre"
                                  alt=""
                                  src={setting[0]?.Section1Image}
                                />
                              )
                            ) : (
                              <p>No image or video available</p>
                            )
                          ) : (
                            <div>
                        {logoFile.type === "video/mp4" ? (
                          <video className="banner-video-pre" controls>
                            <source
                              src={decodeURIComponent(inputImage)}
                              type="video/mp4"
                            />
                          </video>
                        ) : (
                          <img
                            alt=""
                            className="banner-image-pre"
                            type="image/jpeg"
                            src={inputImage}
                          />
                        )}
                      </div>
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

export default LandingSection1;
