import React, { useState } from "react"
import Form from 'react-bootstrap/Form';
import { useVerifyTOFAMutation } from "../../Store/Store";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as yup from "yup";
import Loader from "../loader/Loader";

export default function Resetpassword(props) {
    const [passwordShow, setPasswordShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const schema = yup.object().shape({
        otp: yup.string().required("OTP is required")
    });
    const formik = useFormik({
        initialValues: {
            otp: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            setIsLoading(true);
            var config = {
                headers: { Authorization: `Bearer ${sessionStorage.getItem("myToken")}` }
            };
            let postData = {
                Token: sessionStorage.getItem("token"),
                OTP: values.otp
            }
            createPost(postData).then(res => {
                console.log(res.data);
                if (res.data.status == true) {
                    setIsLoading(false);
                    toast.success("Login Successful")
                    sessionStorage.setItem("myToken", res?.data?.response);
                    sessionStorage.setItem("Id", res?.data?.AuthId);
                    sessionStorage.setItem("userId", res?.data?.AuthId);
                    setTimeout(() => (window.location.href = "/dashboard"), 2000);
                } else if (res.data.status == false) {
                    setIsLoading(false);
                    toast.error("Incorrect OTP")
                }
            });
        },
    });

    const [createPost, responseInfo] = useVerifyTOFAMutation();

    const togglePassword = () => {
        setPasswordShow(!passwordShow);
    };

    return (

        <>
            <div className="register-area">
                <ToastContainer></ToastContainer>
                {isLoading && <Loader />}
                <div className="container">
                    <div className="row g-4 g-lg-5 align-items-center justify-content-center">
                        <div className="col-12 col-md-6">
                            <div className="register-card ">
                                <div style={{ textAlign: "center", margin: "100px 0" }}>
                                    <h2>Verify TO 2FA</h2>
                                </div>
                                {/* 2FA Form */}
                                <div className="register-form mt-5">
                                    <Form onSubmit={formik.handleSubmit}>
                                        <Form.Group className=" form-group">
                                            <label className="label-psswd" onClick={togglePassword} htmlFor="registerPassword"> {passwordShow ? "Hide" : "Show"}
                                            </label>
                                            <Form.Control type={passwordShow ? "text" : "password"} name="otp" onChange={formik.handleChange} value={formik.values.otp} id="registerPassword" placeholder="Enter the OTP" />
                                        </Form.Group>
                                        <div className="form-error">{formik.errors.otp}</div>
                                        <br />
                                        <button className="btn btn-success w-100" type="submit">
                                            Log In
                                        </button>
                                        <div style={{ marginTop: "1rem" }}>
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