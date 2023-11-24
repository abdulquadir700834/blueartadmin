import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {  useFormik } from 'formik';
import * as yup from "yup";
import { useForgotPasswordMutationMutation } from "../../Store/Store";

export default function ForgetPasswordContent(props) {
    const { title, subTitle, button, image } = props;
    const schema = yup.object().shape({
        email: yup.string().email("Please type valid email").required("Email is required"),
    });
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: schema,
        onSubmit: values => {
            let postData = {
                Email: values.email
            }
            createPost(postData).then(res => {
                if (res.data.status == true) {
                    toast.success(res.data.message)
                }
            });
        },
    });

    const [createPost, responseInfo] = useForgotPasswordMutationMutation();
    return (

        <div className="register-area">
            <ToastContainer></ToastContainer>
            <div className="container">
                <div className="row g-4 g-lg-5 align-items-center justify-content-between">
                    <div className="col-12 col-md-6 col-xl-5">
                        <div className="register-card">

                            {/* Form */}
                            <div className="register-form mt-5">
                                <Form onSubmit={formik.handleSubmit}>
                                    <Form.Group className="mb-4">
                                        <Form.Control type="email" name="email" placeholder="Email or Username" onChange={formik.handleChange} value={formik.values.email} />
                                        <div className="form-error">{formik.errors.email}</div>
                                    </Form.Group>
                                    <button className="btn btn-warning w-100" type="submit">Reset Password</button>
                                </Form>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="register-thumbnail mt-5 mt-md-0">
                            <img src={`${process.env.PUBLIC_URL}/${image}`} alt="Forget" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}