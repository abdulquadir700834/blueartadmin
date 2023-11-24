import { useState } from "react";
import Form from 'react-bootstrap/Form';
import { useResetpasswordMutationMutation } from "../../Store/Store";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from "yup";
import Breadcrumb from "../breadcrumb/Breadcrumb";

const clientId = "739442081003-to9tu3grl07eddrge6pqf5uddav8obpv.apps.googleusercontent.com";

const Newpassword = (props) => {
    const [passwordShow, setPasswordShow] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false)
    const [password, setPassword] = useState("");
    const [createPost, responseInfo] = useResetpasswordMutationMutation();

    const schema = Yup.object().shape({

        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 10 characters long')
            .matches(/^(?=.*[a-zA-Z])(?=.*\d)/,
                'Password must contain at least One Uppercase, One Lowercase and one number with 10 characters long'
            ),
        confirmPassword: Yup.string()
            .required('Confirm Password is required')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    });
    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ""
        },
        validationSchema: schema,
        onSubmit: values => {
            const lastValue = window.location.pathname.split("/").pop()
            let postData =
            {
                "ResetToken": lastValue,
                "NewPassword": values.password
            }
            createPost(postData).then(res => {
                if (res.data.status == true) {
                    toast.success("Reset Password Successfully")
                    setTimeout(() => (window.location.href = "/"), 1500);
                }
            });
        },
    });

    const togglePassword = () => {
        setPasswordShow(!passwordShow);
    };

    const [showloginButton, setShowloginButton] = useState(true);

    const handleChange = () => {
        setForgotPassword(true)
    }

    return (
        <div className="register-area">
            <ToastContainer></ToastContainer>
            <div className="container">
                <div className="row g-4 g-lg-5 align-items-center justify-content-center">
                    <Breadcrumb
                        breadcrumbTitle="Reset Password"
                        breadcrumbNav={[
                            {
                                navText: "Home",
                                path: "/login"
                            }
                        ]}
                    />
                    <div className="col-12 col-md-6">
                        <div className="register-card ">

                            {/* New Password Form */}
                            <div className="register-form mt-5">
                                <Form onSubmit={formik.handleSubmit}>
                                    <Form.Group className="">
                                        <Form.Control type={passwordShow ? "text" : "password"} name="password" onChange={formik.handleChange} value={formik.values.password} placeholder="New Password" id="password" />
                                    </Form.Group>
                                    <div className="form-error">{formik.errors.password}</div>
                                    <br />
                                    <Form.Group className=" form-group">
                                        <label className="label-psswd" onClick={togglePassword} htmlFor="registerPassword"> {passwordShow ? "Hide" : "Show"}
                                        </label>

                                        <Form.Control type={passwordShow ? "text" : "password"} name="confirmPassword" onChange={formik.handleChange} value={formik.values.confirmPassword} placeholder="confirmPassword" id="confirmPassword" />
                                    </Form.Group>
                                    <div className="form-error">{formik.errors.confirmPassword}</div>
                                    <br />
                                    <button className="btn btn-success w-100" type="submit">
                                        Reset
                                    </button>
                                    <div
                                        style={{ marginTop: "1rem" }}
                                    >
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

export default Newpassword;