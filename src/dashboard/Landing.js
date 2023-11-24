import { useState, useEffect, useRef } from "react";
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";
import { useFormik } from "formik";
import { settingSchema } from "../pages/Schema";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
import Select from "react-select";
import * as yup from "yup";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import CreateNewButton from "../components/dashboard/createNew/CreateNewButton";
import {
  useSingleUserDetailsQuery,
  useUpdateProjectDetailsMutationMutation,
  useUpdateUserMutation,
} from "../Store/Store";
import Loader from "../components/loader/Loader";
import $ from "jquery";
import { toast, ToastContainer } from "react-toastify";
import LandingSection1 from "../components/Landing/Landingsection1";
import LandingSection3 from "../components/Landing/LandingSection3";
import LandingSection2 from "../components/Landing/LandingSection2";
window.jQuery = window.$ = $;
require("jquery-nice-select");

const options = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

const Landing = ({ module }) => {
  const [key, setKey] = useState("general");
  const [logoFile, setLogoFile] = useState("");
  const [imagedata, setimagedata] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [inputImage, setInputImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );

  const [createPost, responseInfo] = useUpdateProjectDetailsMutationMutation();

  console.log(options, "options");

  const [selectedOption, setSelectedOption] = useState({
    value: "active",
    label: "Active",
  });

  const selectTimezone = useRef();
  const selectWeekStart = useRef();

  const userid = sessionStorage?.getItem("userId");

  const data = useSingleUserDetailsQuery(userid);

  console.log(data, "data");
  const handleChange = (e) => {
    console.log(e, "option");
    setSelectedOption(e);
  };

  useEffect(() => {
    $(selectTimezone.current).niceSelect();
  }, []);

  useEffect(() => {
    $(selectWeekStart.current).niceSelect();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const token = sessionStorage.getItem("myToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}GetLandingPageDetails`,
          config
        )
        .then((res) => {
          setimagedata(res.data.Info);
          setIsLoading(false)
        })
        .catch((error) => {
          setIsLoading(false)
          console.error(error);
        });
    };
    fetchData();
  }, []);

  const schema = yup.object().shape({
    ProjectName: yup
      .string()
      .min(3, "ProjectName url must be atleast 3 letter")
      .required("ProjectName url is required"),
    GoogleAnalyticsCode: yup
      .string()
      .min(3, "GoogleAnalyticsCode url must be atleast 3 letter")
      .required("GoogleAnalyticsCode url is required"),
    CopyrightYear: yup
      .string()
      .min(3, "CopyrightYear url must be atleast 3 letter")
      .required("CopyrightYear url is required"),
    ContactEmail: yup
      .string()
      .min(3, "ContactEmail url must be atleast 3 letter")
      .required("ContactEmail url is required"),
    Weblink: yup
      .string()
      .min(3, "Weblink url must be atleast 3 letter")
      .required("Weblink url is required"),
    MediaStoragePreference: yup
      .string()
      .min(3, "MediaStoragePreference url must be atleast 3 letter")
      .required("MediaStoragePreference url is required"),
  });
  const formik = useFormik({
    initialValues: {},
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      let postData = {
        ProjectName: values.ProjectName,
        GoogleAnalyticsCode: values.GoogleAnalyticsCode,
        GoogleRecaptchaStatus: selectedOption?.value,
        CopyrightYear: values.CopyrightYear,
        ContactEmail: values.ContactEmail,
        Weblink: values.Weblink,
        MediaStoragePreference: values.MediaStoragePreference,
      };
      createPost(postData).then((res) => {
        if (res?.data?.status !== false) {
          toast.success(res?.data?.info);
          setTimeout(() => (window.location.href = "/settings"), 1500);
        } else {
          toast.error(res?.data?.message);
        }
      });
      console.log(responseInfo, postData, "response");
    },
  });

  return (
    <>

      <CreateNewButton />
      <ToastContainer></ToastContainer>
      {isLoading && <Loader />}
      <div className="admin-wrapper left-tabs-example">
        <div className="container-fluid">
          <Tab.Container id="left-tabs-example" defaultActiveKey="Section1">
            <Row>
              <Col sm={3} className="py-4">
                <Nav variant="pills" className="flex-column">
                  <p
                    style={{
                      fontSize: "2rem",
                      color: "#fff",
                      fontWeight: "800",
                    }}
                  >
                    Landing
                  </p>
                  <div className="card">
                    <div className="card-body">
                      <Nav.Item>
                        <Nav.Link eventKey="Section1">
                          Landing Section 1
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="Section2">
                          Landing Section 2
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="Section3">
                          Landing Section 3
                        </Nav.Link>
                      </Nav.Item>
                    </div>
                  </div>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="Section1">
                    <LandingSection1 setting={imagedata} module={module} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="Section2">
                    <LandingSection2 setting={imagedata} module={module} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="Section3">
                    <LandingSection3 setting={imagedata} module={module} />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    </>
  );
};

export default Landing;
