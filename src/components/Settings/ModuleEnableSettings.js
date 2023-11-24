import { useState, useEffect, useRef } from "react";
import Form from 'react-bootstrap/Form';
import { useFormik } from "formik";
import CreateNewButton from "../dashboard/createNew/CreateNewButton";
import { useSingleUserDetailsQuery, useUpdateModuleEnableSettingMutationMutation, useUpdateUserMutation } from "../../Store/Store";
import * as yup from "yup";
import $ from "jquery";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";

window.jQuery = window.$ = $;
require("jquery-nice-select");

const ModuleEnableSettings = ({ setting, module }) => {
    console.log("settingmodule:",setting)
    let navigate = useNavigate();
    const [inputImage, setInputImage] = useState(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    );

    const [createPost, responseInfo] = useUpdateModuleEnableSettingMutationMutation();
    const [isLoading, setIsLoading] = useState(false);
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

    const schema = yup.object().shape({
        Register: yup.boolean().required("Register is required"),
        Login: yup.boolean().required("Login is required"),
        ProfileUpdate: yup.boolean().required("ProfileUpdate is required"),
        KycUpdate: yup.boolean().required("KycUpdate is required"),
        Admin2FA: yup.boolean().required("Admin2FA is required"),
    });

    const formik = useFormik({
        initialValues: {
            Register: setting?.data?.info?.Register,
            Login: setting?.data?.info?.Login,
            ProfileUpdate: setting?.data?.info?.ProfileUpdate,
            KycUpdate: setting?.data?.info?.KycUpdate,
            Admin2FA: setting?.data?.info?.Admin2FA,
        },
        enableReinitialize: true,
        validationSchema: schema,
        onSubmit: (values) => {
            setIsLoading(true)
            let postData = {
                Register: values.Register,
                Login: values.Login,
                ProfileUpdate: values.ProfileUpdate,
                KycUpdate: values.KycUpdate,
                Admin2FA: values.Admin2FA,
            }
            createPost(postData).then(res => {
                if (res?.data?.status !== false) {
                    toast.success(res?.data?.info)
                    setIsLoading(false)
                    setTimeout(() => (window.location.href = "/settings"), 1500);
                } else {
                    toast.error(res?.data?.message)
                    setIsLoading(false)
                }
            })
        },
    });

    console.log(formik.values.Login, setting?.data?.info?.Register, "register")

    return (
        <>
            {isLoading && <Loader />}
            <CreateNewButton />
            <ToastContainer></ToastContainer>
            <div className="">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-sm-12">
                            <p style={{ marginLeft: "50px", fontSize: "2rem", color: "#fff", fontWeight: "800" }}>Module Enable Settings</p>

                            <div className="card">
                                <div className="card-body p-4 p-sm-5">
                                    <Form onSubmit={formik.handleSubmit}>
                                        <div className="container my-5">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Register</label>
                                                </div>
                                                <div className="col">
                                                    <div className='row'>
                                                        <div className="row">
                                                            <div className="col-3">
                                                                <Form.Check
                                                                    className="mb-4 mb-md-0"
                                                                    type="radio"
                                                                    label="True"
                                                                    id="register-true"
                                                                    name="Register"
                                                                    value="true"
                                                                    onChange={formik.handleChange}
                                                                    checked={formik.values.Register === true ? "true" : null}
                                                                />
                                                            </div>
                                                            <div className="col-3">
                                                                <Form.Check
                                                                    className="mb-4 mb-md-0"
                                                                    type="radio"
                                                                    label="False"
                                                                    id="register-false"
                                                                    name="Register"
                                                                    value="false"
                                                                    onChange={formik.handleChange}
                                                                    checked={formik.values.Register === false ? "false" : null}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>{formik.errors.Register}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container my-5">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Login</label>
                                                </div>
                                                <div className="col">
                                                    <div className='row'>
                                                        <div className="row">
                                                            <div className="col-3">
                                                                <Form.Check
                                                                    className="mb-4 mb-md-0"
                                                                    type="radio"
                                                                    label="True"
                                                                    id="login-true"
                                                                    name="Login"
                                                                    value="true"
                                                                    onChange={formik.handleChange}
                                                                    checked={formik.values.Login === true ? "true" : null}
                                                                />
                                                            </div>
                                                            <div className="col-3">
                                                                <Form.Check
                                                                    className="mb-4 mb-md-0"
                                                                    type="radio"
                                                                    label="False"
                                                                    id="login-false"
                                                                    name="Login"
                                                                    value="false"
                                                                    onChange={formik.handleChange}
                                                                    checked={formik.values.Login === false ? "false" : null}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container my-5">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Profile Update</label>
                                                </div>
                                                <div className="col">
                                                    <div className='row'>
                                                        <div className="col-3">
                                                            <Form.Check
                                                                className="mb-4 mb-md-0"
                                                                type="radio"
                                                                label="True"
                                                                id="ProfileUpdate-true"
                                                                name="ProfileUpdate"
                                                                value="true"
                                                                onChange={formik.handleChange}
                                                                checked={formik.values.ProfileUpdate === true ? "true" : null}
                                                            />
                                                        </div>
                                                        <div className="col-3">
                                                            <Form.Check
                                                                className="mb-4 mb-md-0"
                                                                type="radio"
                                                                label="False"
                                                                id="ProfileUpdate-false"
                                                                name="ProfileUpdate"
                                                                value="false"
                                                                onChange={formik.handleChange}
                                                                checked={formik.values.ProfileUpdate === false ? "false" : null}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container my-5">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Kyc Update</label>
                                                </div>
                                                <div className="col">
                                                    <div className='row'>
                                                        <div className="col-3">
                                                            <Form.Check
                                                                className="mb-4 mb-md-0"
                                                                type="radio"
                                                                label="True"
                                                                id="KycUpdate-true"
                                                                name="KycUpdate"
                                                                value="true"
                                                                onChange={formik.handleChange}
                                                                checked={formik.values.KycUpdate === true ? "true" : null}
                                                            />
                                                        </div>
                                                        <div className="col-3">
                                                            <Form.Check
                                                                className="mb-4 mb-md-0"
                                                                type="radio"
                                                                label="False"
                                                                id="KycUpdate-false"
                                                                name="KycUpdate"
                                                                value="false"
                                                                onChange={formik.handleChange}
                                                                checked={formik.values.KycUpdate === false ? "false" : null}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            module?.SettingsModule?.Write &&

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
        </>
    )
}

export default ModuleEnableSettings;