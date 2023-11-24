import { useState, useEffect, useRef } from "react";
import Form from 'react-bootstrap/Form';
import { useFormik } from "formik";
import axios from "axios";
import {useNavigate } from "react-router-dom";
import CreateNewButton from "../dashboard/createNew/CreateNewButton";
import { useSingleUserDetailsQuery } from "../../Store/Store";
import $ from "jquery";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../loader/Loader";
import { Modal } from 'react-bootstrap';

window.jQuery = window.$ = $;
require("jquery-nice-select");


const LandingSection2 = ({ setting, module }) => {
    let navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [Image1, setImage1] = useState("");
    const [Image2, setImage2] = useState("");
    const [Image3, setImage3] = useState("");
    const [Image4, setImage4] = useState("");

    const [Image1Con, setImage1Con] = useState("");
    const [Image2Con, setImage2Con] = useState("");
    const [Image3Con, setImage3Con] = useState("");
    const [Image4Con, setImage4Con] = useState("");

    const [isImageBig, setIsImageBig] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [sectTitle, setSectTitle] = useState("");
    const [sectText, setSectText] = useState("");
    const [sectDesc, setSectDesc] = useState("");

    const toggleImageSize = () => {
        setIsImageBig(!isImageBig);
    };

    const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc);
        setIsImageBig(true);
    };

    const handleChange = (e) => {
        setSectTitle(e.target.value);
    };

    const handleDescChange = (e) => {
        setSectDesc(e.target.value);
    };

    const handleTextChange = (e) => {
        setSectText(e.target.value);
    };

    const selectTimezone = useRef();
    const selectWeekStart = useRef();

    const handleConvert = async (imageUrl, type) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const file = new File([blob], 'image.jpg', { type: blob.type });
            return file;
        } catch (error) {
        }
    };

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
        },
        enableReinitialize: true,
        onSubmit: async (values) => {
            const config = {
                headers: { Authorization: `Bearer ${sessionStorage.getItem("myToken")}` }
            };

            var formData = new FormData();
            formData.append("Type", "LandingSection2")
            if (Image1) {
                formData.append("Image1", Image1);
            }
            else {
                const readfile = await handleConvert(setting[0]?.Section2Images?.Image1?.Local, "image1");
                formData.append("Image1", readfile);
            }
            if (Image2) {
                formData.append("Image2", Image2);
            }
            else {
                const readfile = await handleConvert(setting[0]?.Section2Images?.Image2?.Local, "image2");
                formData.append("Image2", readfile);
            }
            if (Image3) {
                formData.append("Image3", Image3);
            }
            else {
                const readfile = await handleConvert(setting[0]?.Section2Images?.Image3?.Local, "image3");
                formData.append("Image3", readfile);
            }
            if (Image4) {
                formData.append("Image4", Image4);
            }
            else {
                const readfile = await handleConvert(setting[0]?.Section2Images?.Image4?.Local, "image4");
                formData.append("Image4", readfile);
            }
            setIsLoading(true);
            axios
                .post(`${process.env.REACT_APP_BACKEND_URL}UpdateLandingSection2Image`, formData, config, {
                })
                .then((res) => {
                    if (res?.data?.status) {
                        let obj = {
                            Section2Title: sectTitle || setting[0]?.Section2Title,
                            Section2Text: sectText || setting[0]?.Section2Text,
                            Section2Description: "Revolutionising Art & Design with NFT authentication for Physical masterpieces, Designer Furniture, and Lighting",
                            Image1: res.data.Image1,
                            Image2: res.data.Image2,
                            Image3: res.data.Image3,
                            Image4: res.data.Image4
                        }
                        axios
                            .post(`${process.env.REACT_APP_BACKEND_URL}UpdateLandingSection2`, obj, config, {
                            })
                            .then((res) => {
                                setImage1Con(res.data.Image1);
                                setImage2Con(res.data.Image2);
                                setImage3Con(res.data.Image3);
                                setImage4Con(res.data.Image4);
                            });
                        setIsLoading(false);
                        toast.success(res?.data?.message)
                        setTimeout(() => navigate("/landing"), 1500);
                    } else {
                        toast.error(res?.data?.message);
                        setIsLoading(false);
                    }
                })
        },
    });


    const Image1Change = (e) => {
        setImage1(e.target.files[0])
        setImage1Con(URL.createObjectURL(e.target.files[0]));
    }
    const Image2Change = (e) => {
        setImage2(e.target.files[0])
        setImage2Con(URL.createObjectURL(e.target.files[0]));
    }
    const Image3Change = (e) => {
        setImage3(e.target.files[0])
        setImage3Con(URL.createObjectURL(e.target.files[0]));
    }
    const Image4Change = (e) => {
        setImage4(e.target.files[0])
        setImage4Con(URL.createObjectURL(e.target.files[0]));
    }
    return (
        <>   {isLoading && <Loader />}
            <CreateNewButton />
            <ToastContainer></ToastContainer>
            <div className="">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-sm-12">
                            <p style={{ marginLeft: "50px", fontSize: "2rem", color: "#fff", fontWeight: "800" }}>Landing Section 2 Image</p>
                            <div className="card">
                                <div className="card-body p-4 p-sm-5">
                                    <Form onSubmit={formik.handleSubmit}>
                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Section2 Title</label>
                                                </div>
                                                <div className="col">
                                                    <input
                                                        className="form-control card shadow"
                                                        type="text"
                                                        id="name"
                                                        name="Section2Title"
                                                        placeholder="Your Section2Title..."
                                                        defaultValue={setting[0]?.Section2Title}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Section2 Text</label>
                                                </div>
                                                <div className="col">
                                                    <input
                                                        className="form-control card shadow"
                                                        type="text"
                                                        id="name"
                                                        name="Section3Title"
                                                        placeholder="Your Section2Title..."
                                                        defaultValue={setting[0]?.Section2Text}
                                                        onChange={handleTextChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Section2 Description</label>
                                                </div>
                                                <div className="col">
                                                    <textarea
                                                        type="text"
                                                        className="form-control bg-gray border-0"
                                                        autoComplete="off"
                                                        name="Description"
                                                        id="Description"
                                                        placeholder="Description"
                                                        value={setting[0]?.Section2Description}
                                                        onChange={handleDescChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Image 1</label>
                                                </div>
                                                <div className="col">
                                                    <input className="form-control card shadow w-100"
                                                        type="file" name="Image1"
                                                        placeholder="Image1"
                                                        id="Image1"
                                                        value={formik.values.Image1}
                                                        onChange={(e) => Image1Change(e)}
                                                    />
                                                    {Image1Con === "" ? <img className="banner-image-pre" alt="" src={setting[0]?.Section2Images?.Image1}
                                                        onClick={() => handleImageClick(setting[0]?.Section2Images?.Image1)}></img> : <img alt="" className="banner-image-pre" src={Image1Con} onClick={() => handleImageClick(Image1Con)}></img>}
                                                    <div className="formik-error">{formik.errors.Logo}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Image 2</label>
                                                </div>
                                                <div className="col">
                                                    <input className="form-control card shadow w-100"
                                                        type="file" name="Image2"
                                                        placeholder="Image2"
                                                        value={formik.values.Image2}
                                                        onChange={(e) => Image2Change(e)}
                                                    />
                                                    {Image2Con === "" ? <img className="banner-image-pre" alt="" src={setting[0]?.Section2Images?.Image2}
                                                        onClick={() => handleImageClick(setting[0]?.Section2Images?.Image2)}></img> : <img alt="" className="banner-image-pre" src={Image2Con} onClick={() => handleImageClick(Image2Con)}></img>}
                                                    <div className="formik-error">{formik.errors.Favicon}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Image 3</label>
                                                </div>
                                                <div className="col">
                                                    <input className="form-control card shadow w-100"
                                                        type="file" name="Image3"
                                                        placeholder="Image3"
                                                        value={formik.values.Image3}
                                                        onChange={(e) => Image3Change(e)}
                                                    />
                                                    {Image3Con === "" ? <img className="banner-image-pre" alt="" src={setting[0]?.Section2Images?.Image3}
                                                        onClick={() => handleImageClick(setting[0]?.Section2Images?.Image3)}></img> : <img alt="" className="banner-image-pre" src={Image3Con} onClick={() => handleImageClick(Image3Con)}></img>}
                                                    <div className="formik-error">{formik.errors.Favicon}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Image 4</label>
                                                </div>
                                                <div className="col">
                                                    <input className="form-control card shadow w-100"
                                                        type="file" name="Image4"
                                                        placeholder="Image4"
                                                        value={formik.values.Image4}
                                                        onChange={(e) => Image4Change(e)}
                                                    />
                                                    {Image4Con === "" ? <img className="banner-image-pre" alt="" src={setting[0]?.Section2Images?.Image4}
                                                        onClick={() => handleImageClick(setting[0]?.Section2Images?.Image4)}></img> : <img alt="" className="banner-image-pre" src={Image4Con} onClick={() => handleImageClick(Image4Con)}></img>}
                                                    <div className="formik-error">{formik.errors.Favicon}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {
                                            module?.LandingModule?.Write &&
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
                                alt="Expanded"
                            />
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default LandingSection2;