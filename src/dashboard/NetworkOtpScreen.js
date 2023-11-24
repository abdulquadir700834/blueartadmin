import React, { useState } from "react"
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as yup from "yup";
import Loader from "../components/loader/Loader";
import { Link, useNavigate, useParams } from 'react-router-dom'
import {useGetNetworkverifyMutation} from '../Store/Store'
import CryptoJS from 'crypto-js';

export default function NetworkOtpScreen(props) {
    const { id } = useParams();
  let navigate = useNavigate();

  const encryptedItemId = CryptoJS.AES.encrypt(id.toString(), process.env.REACT_APP_SECRET_PASS).toString();
  console.log("encryptedItemId:", id)

    
  const [createPost, responseInfo] = useGetNetworkverifyMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const tokenVal = sessionStorage.getItem("networkToken")
  console.log("tokenVal:", tokenVal)

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
        let otpValue = parseInt(values.otp);
        let postData = {
            Token: sessionStorage.getItem("networkToken"),
            OTP: otpValue
        }
        console.log("postData:", postData)
        createPost(postData).then(res => {
            console.log("networkOTP", res.data);
            if (res.data.status === true) {
                setIsLoading(false);
                toast.success(res.data.message)
                setTimeout(() => (navigate(`/network-edit/${encodeURIComponent(id)}`)), 2000);
            } else if (res.data.status === false) {
                setIsLoading(false);
                toast.error(res.data.message)
            }
        }) .catch(error => {
            setIsLoading(false);
            console.log("errorResponse:" , error)
            // Check if the error is a server error (status code 500)
            if (error.response && error.response.status === 500) {
                toast.error('Server error. Please try again later.');
            } else {
                toast.error('An error occurred. Please try again.');
            }
            console.error('Error:', error);
        });
    },
});

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
                                    <h2>Network 2FA</h2>
                                </div>
                                {/* 2FA Form */}
                                <div className="register-form mt-5">
                                    <Form  onSubmit={formik.handleSubmit}>
                                        <Form.Group className=" form-group">
                                        <label className="label-psswd" onClick={togglePassword} htmlFor="registerPassword"> {passwordShow ? "Hide" : "Show"}
                                            </label>
                                            <Form.Control type={passwordShow ? "text" : "password"} name="otp" onChange={formik.handleChange} value={formik.values.otp} id="registerPassword" placeholder="Enter the OTP" />
                                        </Form.Group>
                                        <div className="form-error">{formik.errors.otp}</div>

                                        <br />
                                        <button className="btn btn-success w-100" type="submit">
                                            Submit
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