import { useState, useEffect, useRef } from "react";
import Form from 'react-bootstrap/Form';
import { useFormik } from "formik";
import * as yup from "yup";
import CreateNewButton from "../dashboard/createNew/CreateNewButton";
import { useSingleUserDetailsQuery, useUpdateSocialMediaSettingsMutationMutation, useUpdateUserMutation } from "../../Store/Store";
import $ from "jquery";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";
window.jQuery = window.$ = $;
require("jquery-nice-select");

const SocialMediaSettings = ({ setting, module }) => {
    let navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [createPost, responseInfo] = useUpdateSocialMediaSettingsMutationMutation();
    const selectTimezone = useRef();
    const selectWeekStart = useRef();

    const userid = sessionStorage?.getItem("userId")

    const data = useSingleUserDetailsQuery(userid);

    console.log(data, "data")

    useEffect(() => {
        $(selectTimezone.current).niceSelect();
    }, []);

    useEffect(() => {
        $(selectWeekStart.current).niceSelect();
    }, []);

    const schema = yup.object().shape({
        Facebook: yup.string().min(3, "Facebook url must be atleast 3 letter").required("Facebook url is required"),
        Twitter: yup.string().min(3, "Twitter url must be atleast 3 letter").required("Twitter url is required"),
        Linkedin: yup.string().min(3, "Linkedin url must be atleast 3 letter").required("Linkedin url is required"),
        Pinterest: yup.string().min(3, "Pinterest url must be atleast 3 letter").required("Pinterest url is required"),
        Youtube: yup.string().min(3, "Youtube url must be atleast 3 letter").required("Youtube url is required"),
        Instagram: yup.string().min(3, "Instagram url must be atleast 3 letter").required("Instagram url is required")
    });

    const formik = useFormik({
        initialValues: {
            Facebook: setting?.data?.info?.SocialLinks?.Facebook,
            Twitter: setting?.data?.info?.SocialLinks?.Twitter,
            Linkedin: setting?.data?.info?.SocialLinks?.Linkedin,
            Pinterest: setting?.data?.info?.SocialLinks?.Pinterest,
            Youtube: setting?.data?.info?.SocialLinks?.Youtube,
            Instagram: setting?.data?.info?.SocialLinks?.Instagram
        },
        enableReinitialize: true,
        validationSchema: schema,
        onSubmit: (values) => {
            setIsLoading(true)
            let postData = {
                Facebook: values.Facebook,
                Twitter: values.Twitter,
                Linkedin: values.Linkedin,
                Pinterest: values.Pinterest,
                Youtube: values.Youtube,
                Instagram: values.Instagram
            }

            createPost(postData).then(res => {
                if (res?.data?.status !== false) {
                    toast.success(res?.data?.info)
                    setIsLoading(false)
                    setTimeout(() => navigate("/settings"), 1500);

                } else {
                    toast.error(res?.data?.message)
                    setIsLoading(false)
                }
            })
            console.log(responseInfo, postData, "response")
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
                            <p style={{ marginLeft: "50px", fontSize: "2rem", color: "#fff", fontWeight: "800" }}>Social Media Settings</p>
                            <div className="card">
                                <div className="card-body p-4 p-sm-5">
                                    <Form onSubmit={formik.handleSubmit}>
                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Facebook</label>
                                                </div>
                                                <div className="col">
                                                    <input className="form-control card shadow w-100"
                                                        type="text" name="Facebook"
                                                        placeholder="Facebook"
                                                        id="Facebook"
                                                        value={formik.values.Facebook}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <div className="formik-error">{formik.errors.Facebook}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Instagram</label>
                                                </div>
                                                <div className="col">
                                                    <input className="form-control card shadow w-100"
                                                        type="text" name="Instagram"
                                                        placeholder="Instagram"
                                                        value={formik.values.Instagram}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <div className="formik-error">{formik.errors.Instagram}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Linkedin</label>
                                                </div>
                                                <div className="col">
                                                    <input className="form-control card shadow w-100"
                                                        type="text" name="Linkedin"
                                                        placeholder="Linkedin"
                                                        value={formik.values.Linkedin}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <div className="formik-error">{formik.errors.Linkedin}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Pinterest</label>
                                                </div>
                                                <div className="col">
                                                    <input className="form-control card shadow w-100"
                                                        type="text" name="Pinterest"
                                                        placeholder="Pinterest"
                                                        value={formik.values.Pinterest}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <div className="formik-error">{formik.errors.Pinterest}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Twitter</label>
                                                </div>
                                                <div className="col">
                                                    <input className="form-control card shadow w-100"
                                                        type="text" name="Twitter"
                                                        placeholder="Twitter"
                                                        value={formik.values.Twitter}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <div className="formik-error">{formik.errors.Twitter}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Youtube</label>
                                                </div>
                                                <div className="col">
                                                    <input className="form-control card shadow w-100"
                                                        type="text" name="Youtube"
                                                        placeholder="Youtube"
                                                        value={formik.values.Youtube}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <div className="formik.errors">{formik.errors.Youtube}</div>
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

export default SocialMediaSettings;