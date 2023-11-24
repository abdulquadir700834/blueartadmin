import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { useLoginMutationMutation } from "../../Store/Store";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as yup from "yup";
import Breadcrumb from "../breadcrumb/Breadcrumb";
import Loader from "../loader/Loader";

const clientId = "739442081003-to9tu3grl07eddrge6pqf5uddav8obpv.apps.googleusercontent.com";

const LoginContent = (props) => {
    let naviagte = useNavigate();
    const { title, subTitle, button, image } = props;
    const [passwordShow, setPasswordShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const schema = yup.object().shape({
        email: yup.string().email("Please type valid email").required("Email is required"),
        password: yup.string().required("Password is required")
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: schema,
        onSubmit: values => {
            setIsLoading(true);
            let postData = {
                Email: values.email,
                Password: values.password
            }
            createPost(postData).then(res => {
                if (res?.error?.data?.status !== true) {
                    setIsLoading(false);
                    toast.error(res?.error?.data?.response)
                }
                if (res?.data?.status == true) {
                    setIsLoading(false);
                    toast.success("Please Enter the OTP which is shared to your Email")
                    sessionStorage.setItem("token", res?.data?.response);
                    if (res?.data?.auth2 !== false) {
                        setIsLoading(false);
                        setTimeout(() => naviagte("/verifyotp"), 1500);
                    } else {
                        setTimeout(() => naviagte("/dashboard"), 1500);
                    }
                } else if (res?.data?.status == false) {
                    setIsLoading(false);
                    toast.error(res?.data?.response)
                }
            });
        },
    });

    const [showloginButton, setShowloginButton] = useState(true);
    const [createPost, responseInfo] = useLoginMutationMutation();

    const togglePassword = () => {
        setPasswordShow(!passwordShow);
    };

    return (
        <div className="register-area">
            {isLoading && <Loader />}
            <ToastContainer></ToastContainer>
            <div className="container">
                <div className="row g-4 g-lg-5 align-items-center justify-content-center">
                    <Breadcrumb
                        breadcrumbTitle="Administrator Login"
                        breadcrumbNav={[
                            {
                                navText: "Home",
                                path: "/login"
                            }
                        ]}
                    />
                    <div className="col-12 col-md-6">
                        <div className="register-card ">
                            <h2>{title}</h2>
                            <p>{subTitle}
                                <Link className="ms-1 hover-primary" to={button[0].path} >
                                    {button[0].text}
                                </Link>
                            </p>

                            {/* Login Form */}
                            <div className="register-form mt-5">
                                <Form onSubmit={formik.handleSubmit} autoComplete="off">
                                    <Form.Group className="">
                                        <Form.Control type="email" name="email" onChange={formik.handleChange} value={formik.values.email} placeholder="Email" />

                                    </Form.Group>
                                    <div className="form-error">{formik.errors.email}</div>
                                    <br />
                                    <Form.Group className=" form-group">
                                        <label className="label-psswd" onClick={togglePassword} htmlFor="registerPassword"> {passwordShow ? "Hide" : "Show"}
                                        </label>
                                        <Form.Control autoComplete="password" type={passwordShow ? "text" : "password"} name="password" onChange={formik.handleChange} value={formik.values.password} id="registerPassword" placeholder="Password" />
                                    </Form.Group>
                                    <div className="form-error">{formik.errors.password}</div>
                                    <br />
                                    <p><Link to="/forgot-password">Forgot Password ? </Link></p>
                                    <button className="btn btn-success w-100" type="submit">
                                        Log In
                                    </button>
                                    <div
                                        style={{ marginTop: "1rem" }}>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginContent;
