import { useState, useEffect, useRef } from "react";
import Form from 'react-bootstrap/Form';
import { useFormik } from "formik";
import * as yup from "yup";
import { useSingleUserDetailsQuery, useUpdateFooterLinkDetailsMutation } from "../../Store/Store";
import $ from "jquery";
import { toast, ToastContainer } from "react-toastify";
window.jQuery = window.$ = $;
require("jquery-nice-select");
const FooterSettings = ({ setting, module }) => {
    const [createPost, responseInfo] = useUpdateFooterLinkDetailsMutation();
    const userid = sessionStorage?.getItem("userId");
    const data = useSingleUserDetailsQuery(userid);
    const schema = yup.object().shape({
        Aboutus: yup.string().url("Invalid Aboutus URL").required("Aboutus URL is required"),
        Events: yup.string().url("Invalid Events URL").required("Events URL is required"),
        Features: yup.string().url("Invalid Features URL").required("Features URL is required"),
        Followus: yup.string().url("Invalid Followus URL").required("Followus URL is required"),
        Press: yup.string().url("Invalid Press URL").required("Press URL is required"),
        Privacy: yup.string().url("Invalid Privacy URL").required("Privacy URL is required"),
        Support: yup.string().url("Invalid Support URL").required("Support URL is required"),
        Terms: yup.string().url("Invalid Terms URL").required("Terms URL is required"),
    });
    const formik = useFormik({
        initialValues: {
            Aboutus: setting?.data?.info?.FooterLinks?.Aboutus,
            Events: setting?.data?.info?.FooterLinks?.Events,
            Features: setting?.data?.info?.FooterLinks?.Features,
            Followus: setting?.data?.info?.FooterLinks?.Followus,
            Press: setting?.data?.info?.FooterLinks?.Press,
            Privacy: setting?.data?.info?.FooterLinks?.Privacy,
            Support: setting?.data?.info?.FooterLinks?.Support,
            Terms: setting?.data?.info?.FooterLinks?.Terms,
        },
        enableReinitialize: true,
        validationSchema: schema,
        onSubmit: (values) => {
            let postData = {
                Aboutus: values.Aboutus,
                Events: values.Events,
                Features: values.Features,
                Followus: values.Followus,
                Press: values.Press,
                Privacy: values.Privacy,
                Support: values.Support,
                Terms: values.Terms,
            }

            createPost(postData).then(res => {
                if (res?.data?.status !== false) {
                    toast.success(res?.data?.info)
                    setTimeout(() => (window.location.href = "/settings"), 1500);

                } else {
                    toast.error(res?.data?.message)
                }
            })
        },
    });

    return (
        <>
            <ToastContainer></ToastContainer>
            <div className="">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-sm-12">
                            <p style={{ marginLeft: "50px", fontSize: "2rem", color: "#fff", fontWeight: "800" }}>Footer Link Setting</p>
                            <div className="card">
                                <div className="card-body p-4 p-sm-5">
                                    <Form onSubmit={formik.handleSubmit}>

                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Aboutus</label>
                                                </div>
                                                <div className="col">
                                                    <input className="form-control card shadow w-100"
                                                        type="text" name="Aboutus"
                                                        placeholder="Aboutus"
                                                        id="Aboutus"
                                                        value={formik.values.Aboutus}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <div className="formik-error">{formik.errors.Aboutus}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Events</label>
                                                </div>
                                                <div className="col">
                                                    <input className="form-control card shadow w-100"
                                                        type="text" name="Events"
                                                        placeholder="Events"
                                                        value={formik.values.Events}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <div className="formik-error">{formik.errors.Events}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Features</label>
                                                </div>
                                                <div className="col">
                                                    <input className="form-control card shadow w-100"
                                                        type="text" name="Features"
                                                        placeholder="Features"
                                                        value={formik.values.Features}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <div className="formik-error">{formik.errors.Features}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Followus</label>
                                                </div>
                                                <div className="col">
                                                    <input className="form-control card shadow w-100"
                                                        type="text" name="Followus"
                                                        placeholder="Followus"
                                                        value={formik.values.Followus}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <div className="formik-error">{formik.errors.Followus}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Press</label>
                                                </div>
                                                <div className="col">
                                                    <input className="form-control card shadow w-100"
                                                        type="text" name="Press"
                                                        placeholder="Press"
                                                        value={formik.values.Press}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <div className="formik-error">{formik.errors.Press}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Privacy</label>
                                                </div>
                                                <div className="col">
                                                    <input className="form-control card shadow w-100"
                                                        type="text" name="Privacy"
                                                        placeholder="Privacy"
                                                        value={formik.values.Privacy}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <div className="formik-error">{formik.errors.Privacy}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Support</label>
                                                </div>
                                                <div className="col">
                                                    <input className="form-control card shadow w-100"
                                                        type="text" name="Support"
                                                        placeholder="Support"
                                                        value={formik.values.Support}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <div className="formik-error">{formik.errors.Support}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Terms</label>
                                                </div>
                                                <div className="col">
                                                    <input className="form-control card shadow w-100"
                                                        type="text" name="Terms"
                                                        placeholder="Terms"
                                                        value={formik.values.Terms}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <div className="formik-error">{formik.errors.Terms}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {
                                            module?.SettingsModule?.Write &&
                                            <div className="col-12" style={{ margin: "20px 0" }}>
                                                <button className="btn btn-primary w-100 rounded-pill" type="submit">
                                                    <i className="bi bi-sd-card-fill me-1" />Save changes
                                                </button>
                                            </div>}
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

export default FooterSettings;