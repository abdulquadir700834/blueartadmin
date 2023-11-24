import { useState, useEffect, useRef } from "react";
import Form from 'react-bootstrap/Form';
import { useFormik } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";
import CreateNewButton from "../dashboard/createNew/CreateNewButton";
import { useSingleUserDetailsQuery, useUpdateUserMutation } from "../../Store/Store";
import $ from "jquery";
import { toast, ToastContainer } from "react-toastify";
window.jQuery = window.$ = $;
require("jquery-nice-select");

const ProjectSettings = () => {
    const [key, setKey] = useState('general');
    const [logoFile, setLogoFile] = useState("");
    const [inputImage, setInputImage] = useState(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    );
    const [createPost, responseInfo] = useUpdateUserMutation();

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
            first_name: "",
            last_name: "",
            email: "",
            username: "",
            password: "",
            profile_image: null

        },

        onSubmit: (values) => {
            let postData = {
                "user_id": userid,
                "email": values.email,
                "first_name": values.first_name,
                "last_name": values.last_name,
                "profile_image": logoFile,
                "status": "active",
                "username": values.username
            }

            createPost(postData).then(res => {
                if (res?.data?.status !== false) {
                    toast.success(res?.data?.message)
                    setTimeout(() => (window.location.href = "/settings"), 1500);

                } else {
                    toast.error(res?.data?.message)
                }
            })

        },
    });


    useEffect(() => {

        if (data.status === "fulfilled") {

            formik.setFieldValue("first_name", data?.data?.result?.first_name)
            formik.setFieldValue("last_name", data?.data?.result?.last_name)
            formik.setFieldValue("email", data?.data?.result?.email)
            formik.setFieldValue("username", data?.data?.result?.username)
            formik.setFieldValue("password", data?.data?.result?.password)
            formik.setFieldValue("profile_image", data?.data?.result?.profile_image)

        }
        console.log("data", data);
    }, [data])

    const ImagehandleChange = (e) => {
        setInputImage(URL.createObjectURL(e.target.files[0]));
        setTimeout(() => {
            var formData = new FormData();
            formData.append('file', e.target.files[0]);

            axios
                .post(`https://api.nugennft.com/media/avatar`, formData, {
                })
                .then((res) => {

                    setLogoFile(res?.data?.filepath)
                })
        }, [1000])
    }


    return (
        <>
            <CreateNewButton />
            <ToastContainer></ToastContainer>
            <div className="admin-wrapper">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-sm-3">
                            <p style={{ marginLeft: "50px", fontWeight: "800" }}>General settings</p>
                            <div className="card">
                                <div className="card-body p-4 p-sm-5">
                                    <Form onSubmit={formik.handleSubmit}>
                                        <div className="row g-4">
                                            <div className="col-12">
                                                <label><Link to="/settings/project-settings">Project Details</Link></label>
                                            </div>

                                            <div className="col-12">
                                                <label><Link to="/settings/modulenable-settings">Module Enable</Link></label>
                                            </div>

                                            <div className="col-12">
                                                <label><Link to="/settings/uploadimage-settings">Upload image</Link></label>
                                            </div>

                                            <div className="col-12">
                                                <label><Link to="/settings/socialmedia-settings" >Social Media</Link></label>
                                            </div>
                                            <div className="col-12">
                                                <label><Link to="/settings/email-settings"> Email Settings</Link></label>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-9">
                            <p style={{ marginLeft: "50px", fontWeight: "800" }}>Project Settings</p>
                            <div className="card">
                                <div className="card-body p-4 p-sm-5">
                                    <Form onSubmit={formik.handleSubmit}>
                                        <div className="row g-4">
                                            <div className="col-12">
                                                <label>First Name</label>
                                                <input className="form-control card shadow"
                                                    type="text" name="fullname"
                                                    placeholder="Full Name"
                                                    value={formik.values.first_name}
                                                    onChange={formik.handleChange}
                                                />
                                            </div>

                                            <div className="col-12">
                                                <label>Last Name</label>
                                                <input className="form-control card shadow"
                                                    type="text" name="fullname"
                                                    placeholder="Full Name"
                                                    value={formik.values.last_name}
                                                    onChange={formik.handleChange}
                                                />
                                            </div>

                                            <div className="col-12">
                                                <label>Email Address</label>
                                                <input className="form-control card shadow"
                                                    type="email" name="email"
                                                    placeholder="Email Address"
                                                    value={formik.values.email}
                                                    onChange={formik.handleChange}
                                                />
                                            </div>

                                            <div className="col-12">
                                                <label>Username</label>
                                                <input className="form-control card shadow"
                                                    type="text" name="username"
                                                    placeholder="Username"
                                                    value={formik.values.username}
                                                    onChange={formik.handleChange}
                                                />
                                            </div>

                                            <div className='col-12'>
                                                <div className="img-holder">
                                                    <img

                                                        alt=""
                                                        id="img"
                                                        className="img"
                                                        src={data?.data?.result?.profile_image !== "" ? `${process.env.REACT_APP_BACKEND_URL}/${formik.values.profile_image}` : inputImage}
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
                                                        Choose your Profile
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <button className="btn btn-primary w-100 rounded-pill" type="submit">
                                                    <i className="bi bi-sd-card-fill me-1" />Save changes
                                                </button>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectSettings;