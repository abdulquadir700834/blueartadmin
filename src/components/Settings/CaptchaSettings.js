import { useState, useEffect, useRef } from "react";
import Form from 'react-bootstrap/Form';
import { useFormik } from "formik";
import * as yup from "yup";
import CreateNewButton from "../dashboard/createNew/CreateNewButton";
import { useSingleUserDetailsQuery, useUpdateCaptchaSettingMutationMutation, } from "../../Store/Store";
import $ from "jquery";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
window.jQuery = window.$ = $;
require("jquery-nice-select");

const CaptchaSettings = ({ setting, module }) => {
    let navigate = useNavigate();
    const [createPost, responseInfo] = useUpdateCaptchaSettingMutationMutation();
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
        SiteKey: yup.string().min(3, "Facebook url must be atleast 3 letter").required("Facebook url is required"),
        SecretKey: yup.string().min(3, "Twitter url must be atleast 3 letter").required("Twitter url is required"),
    });

    const formik = useFormik({
        initialValues: {
            SiteKey: setting?.data?.info?.Captcha?.SiteKey,
            SecretKey: setting?.data?.info?.Captcha?.SecretKey,
        },
        enableReinitialize: true,
        validationSchema: schema,
        onSubmit: (values) => {
            setIsLoading(true)
            let postData = {
                SiteKey: values.SiteKey,
                SecretKey: values.SecretKey,
            }
            createPost(postData).then(res => {
                if (res?.data?.status !== false) {
                    toast.success(res?.data?.info)
                    setIsLoading(false)
                    setTimeout(() => navigate("/settings/captcha-settings"), 1500);

                } else {
                    toast.error(res?.data?.message)
                    setIsLoading(false)
                }
            })
        },
    });

    return (
        <>
        {isLoading && <Loader />}
            <CreateNewButton />
            <ToastContainer></ToastContainer>
            <div className="">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-sm-12">
                            <p style={{ marginLeft: "50px", fontSize: "2rem", color: "#fff", fontWeight: "800" }}>Captcha Settings</p>
                            <div className="card">
                                <div className="card-body p-4 p-sm-5">
                                    <Form onSubmit={formik.handleSubmit}>
                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">SecretKey</label>
                                                </div>
                                                <div className="col">
                                                    <input className="form-control card shadow w-100"
                                                        type="text" name="SecretKey"
                                                        placeholder="SecretKey"
                                                        id="SecretKey"
                                                        value={formik.values.SecretKey}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <div className="formik-error">{formik.errors.SecretKey}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">SiteKey</label>
                                                </div>
                                                <div className="col">
                                                    <input className="form-control card shadow w-100"
                                                        type="text" name="SiteKey"
                                                        placeholder="SiteKey"
                                                        value={formik.values.SiteKey}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <div className="formik-error">{formik.errors.SiteKey}</div>
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

export default CaptchaSettings;