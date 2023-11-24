import { useState, useEffect, useRef } from "react";
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import { useFormik } from "formik";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import Select from 'react-select';
import * as yup from "yup";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import CreateNewButton from "../components/dashboard/createNew/CreateNewButton";
import { useSingleUserDetailsQuery, useUpdateProjectDetailsMutationMutation } from "../Store/Store";
import $ from "jquery";
import { toast, ToastContainer } from "react-toastify";
import ModuleEnableSettings from "../components/Settings/ModuleEnableSettings";
import SocialMediaSettings from "../components/Settings/SocialMediaSettings";
import UploadImageSettings from "../components/Settings/UploadImageSettings";
import CaptchaSettings from "../components/Settings/CaptchaSettings";
import EmailSettings from "../components/Settings/EmailSettings";
import FooterSettings from "../components/Settings/FooterlinkSettings";
import Loader from "../components/loader/Loader";

window.jQuery = window.$ = $;
require("jquery-nice-select");

const options = [
    { value: 'active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
]

const DashboardSettings = ({ setting, module }) => {
    const [createPost, responseInfo] = useUpdateProjectDetailsMutationMutation();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState({ value: 'active', label: 'Active' });
    const selectTimezone = useRef();
    const selectWeekStart = useRef();
    const userid = sessionStorage?.getItem("userId")
    const data = useSingleUserDetailsQuery(userid);

    const handleChange = (e) => {
        setSelectedOption(e)
    }

    useEffect(() => {
        $(selectTimezone.current).niceSelect();
    }, []);

    useEffect(() => {
        $(selectWeekStart.current).niceSelect();
    }, []);

    console.log(setting?.data?.info?.ProjectDetails?.ProjectName, "settings")

    const schema = yup.object().shape({

        ProjectName: yup.string().min(3, "ProjectName url must be atleast 3 letter").required("ProjectName url is required"),
        CopyrightYear: yup.string().min(3, "CopyrightYear url must be atleast 3 letter").required("CopyrightYear url is required"),
        ContactEmail: yup.string().min(3, "ContactEmail url must be atleast 3 letter").required("ContactEmail url is required"),
        Weblink: yup.string().min(3, "Weblink url must be atleast 3 letter").required("Weblink url is required"),
    });

    const formik = useFormik({
        initialValues: {
            ProjectName: setting?.data?.info?.ProjectDetails?.ProjectName,
            GoogleRecaptchaStatus: setting?.data?.info?.ProjectDetails?.GoogleRecaptchaStatus,
            CopyrightYear: setting?.data?.info?.ProjectDetails?.CopyrightYear,
            ContactEmail: setting?.data?.info?.ProjectDetails?.ContactEmail,
            Weblink: setting?.data?.info?.ProjectDetails?.Weblink,
        },
        enableReinitialize: true,
        validationSchema: schema,
        onSubmit: (values) => {
            setIsLoading(true)
            let postData = {
                ProjectName: values.ProjectName,
                GoogleRecaptchaStatus: selectedOption?.value,
                CopyrightYear: values.CopyrightYear,
                ContactEmail: values.ContactEmail,
                Weblink: values.Weblink,
            }
            createPost(postData).then(res => {
                if (res?.data?.status !== false) {
                    toast.success(res?.data?.info)
                    setIsLoading(false)
                    setTimeout(() => (window.location.href = "/settings"), 2000);
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
            <div className="admin-wrapper left-tabs-example">
                <div className="container-fluid">
                    <div className="row justify-content-center d-none">
                        <div className="col-sm-4">
                            <p style={{ fontSize: "2rem", color: "#fff", fontWeight: "800" }}>General Settings</p>
                            <div className="card">
                                <div className="card-body p-4 p-sm-5">
                                    <ul>
                                        <li><NavLink to='/settings/modulenable-settings'>Module Enable</NavLink></li>
                                        <li><NavLink to='/settings/socialmedia-settings'>SocialMedia Settings</NavLink></li>
                                        <li><NavLink to='/settings/uploadimage-settings'>Update Logo & Favicon</NavLink></li>
                                        <li><NavLink to='/settings/email-settings' >Email Settings</NavLink></li>
                                        <li><NavLink to='/settings/captcha-settings' >Captcha Settings</NavLink></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-8">
                            <p style={{ marginLeft: "50px", fontSize: "2rem", color: "#fff", fontWeight: "800" }}>General Settings</p>
                            <div className="card">
                                <div className="card-body p-4 p-sm-5">
                                    <Form onSubmit={formik.handleSubmit}>

                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Project Name</label>
                                                </div>
                                                <div className="col">
                                                    <input className="form-control card shadow w-100"
                                                        type="text" name="ProjectName"
                                                        placeholder="ProjectName"
                                                        id="ProjectName"
                                                        value={formik.values.ProjectName}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <div className="formik-error">{formik.errors.ProjectName}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container my-4">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Google Recaptcha Status</label>
                                                </div>
                                                <div className="col">
                                                    <Select options={options} placeholder="Select a brand"
                                                        value={selectedOption}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Copyright Year</label>
                                                </div>
                                                <div className="col">
                                                    <input className="form-control card shadow w-100"
                                                        type="text" name="CopyrightYear"
                                                        placeholder="CopyrightYear"
                                                        value={formik.values.CopyrightYear}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <div className="formik-error">{formik.errors.CopyrightYear}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Contact Email</label>
                                                </div>
                                                <div className="col">
                                                    <input className="form-control card shadow w-100"
                                                        type="text" name="ContactEmail"
                                                        placeholder="ContactEmail"
                                                        value={formik.values.ContactEmail}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <div className="formik-error">{formik.errors.ContactEmail}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Weblink</label>
                                                </div>
                                                <div className="col">
                                                    <input className="form-control card shadow w-100"
                                                        type="text" name="Weblink"
                                                        placeholder="Weblink"
                                                        value={formik.values.Weblink}
                                                        onChange={formik.handleChange}
                                                    />
                                                    <div className="formik-error">{formik.errors.Weblink}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12" style={{ margin: "20px 0" }}>
                                            <button className="btn btn-primary w-100 rounded-pill" type="submit">
                                                <i className="bi bi-sd-card-fill me-1" />Save changes
                                            </button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="General">
                        <Row>
                            <Col sm={3} className="py-4">
                                <Nav variant="pills" className="flex-column">
                                    <p style={{ fontSize: "2rem", color: "#fff", fontWeight: "800" }}>General Settings</p>
                                    <div className="card">
                                        <div className="card-body">
                                            <Nav.Item>
                                                <Nav.Link eventKey="General">General</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="Module">Module Enable</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="SocialMedia">SocialMedia Settings</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="Upload">Update Logo & Favicon</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="Email">Email Settings</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="Captcha">Captcha Settings</Nav.Link>
                                            </Nav.Item>
                                        </div>
                                    </div>
                                </Nav>
                            </Col>
                            <Col sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="General">
                                        <p style={{ marginLeft: "50px", fontSize: "2rem", color: "#fff", fontWeight: "800" }}>General Settings Form</p>
                                        <div className="card">
                                            <div className="card-body p-4 p-sm-5">
                                                <Form onSubmit={formik.handleSubmit}>

                                                    <div className="container">
                                                        <div className="row align-items-center">
                                                            <div className="col">
                                                                <label className="labes">Project Name</label>
                                                            </div>
                                                            <div className="col">
                                                                <input className="form-control card shadow w-100"
                                                                    type="text" name="ProjectName"
                                                                    placeholder="ProjectName"
                                                                    id="ProjectName"
                                                                    value={formik.values.ProjectName}
                                                                    onChange={formik.handleChange}
                                                                />
                                                                <div className="formik-error">{formik.errors.ProjectName}</div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="container my-4">
                                                        <div className="row align-items-center">
                                                            <div className="col">
                                                                <label className="labes">Google Recaptcha Status</label>
                                                            </div>
                                                            <div className="col">
                                                                <Select options={options} placeholder="Select a brand"
                                                                    value={selectedOption}
                                                                    onChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="container">
                                                        <div className="row align-items-center">
                                                            <div className="col">
                                                                <label className="labes">Copyright Year</label>
                                                            </div>
                                                            <div className="col">
                                                                <input className="form-control card shadow w-100"
                                                                    type="text" name="CopyrightYear"
                                                                    placeholder="CopyrightYear"
                                                                    value={formik.values.CopyrightYear}
                                                                    onChange={formik.handleChange}
                                                                />
                                                                <div className="formik-error">{formik.errors.CopyrightYear}</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="container">
                                                        <div className="row align-items-center">
                                                            <div className="col">
                                                                <label className="labes">Contact Email</label>
                                                            </div>
                                                            <div className="col">
                                                                <input className="form-control card shadow w-100"
                                                                    type="text" name="ContactEmail"
                                                                    placeholder="ContactEmail"
                                                                    value={formik.values.ContactEmail}
                                                                    onChange={formik.handleChange}
                                                                />
                                                                <div className="formik-error">{formik.errors.ContactEmail}</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="container">
                                                        <div className="row align-items-center">
                                                            <div className="col">
                                                                <label className="labes">Weblink</label>
                                                            </div>
                                                            <div className="col">
                                                                <input className="form-control card shadow w-100"
                                                                    type="text" name="Weblink"
                                                                    placeholder="Weblink"
                                                                    value={formik.values.Weblink}
                                                                    onChange={formik.handleChange}
                                                                />
                                                                <div className="formik-error">{formik.errors.Weblink}</div>
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
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="Module">
                                        <ModuleEnableSettings setting={setting} module={module} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="SocialMedia">
                                        <SocialMediaSettings setting={setting} module={module} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="Upload">
                                        <UploadImageSettings setting={setting} module={module} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="Email">
                                        <EmailSettings setting={setting} module={module} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="Captcha">
                                        <CaptchaSettings setting={setting} module={module} />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="Footer">
                                        <FooterSettings setting={setting} module={module} />
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            </div>
        </>
    )
}

export default DashboardSettings;