import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useFormik } from "formik";
import { toast, ToastContainer } from 'react-toastify';
import * as yup from "yup";
import {
  useUpdateCategoryQuery,
  useAddAdminRoleMutationMutation,
} from "../Store/Store";
import { useParams } from 'react-router-dom'
import Loader from '../components/loader/Loader';

const AddRole = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  let navigate = useNavigate();
  const { data } = useUpdateCategoryQuery(id);
  const [createPost, responseInfo] = useAddAdminRoleMutationMutation();

  const schema = yup.object().shape({
    Role: yup.string().min(3, "Role url must be atleast 3 letter").required("Role url is required"),
  });

  const formik = useFormik({
    initialValues: {

      Role: "",
      Modules: {
        UserModule: {
          "Read": "",
          "Write": ""
        },
        SettingsModule: {
          "Read": "",
          "Write": ""
        },
        EmailTemplateModule: {
          "Read": "",
          "Write": ""
        },
        BioModule: {
          "Read": "",
          "Write": ""
        },
        TestimonialModule: {
          "Read": "",
          "Write": ""
        },
        ExhibitionModule: {
          "Read": "",
          "Write": ""
        },
        CategoriesModule: {
          "Read": "",
          "Write": ""
        },
        CMSModule: {
          "Read": "",
          "Write": ""
        },
        MediumModule: {
          "Read": "",
          "Write": ""
        },
        MaterialModule: {
          "Read": "",
          "Write": ""
        },
        KeywordModule: {
          "Read": "",
          "Write": ""
        },
        NewsModule: {
          "Read": "",
          "Write": ""
        },
        StylesModule: {
          "Read": "",
          "Write": ""
        },
        CollectionModule: {
          "Read": "",
          "Write": ""
        },
        ArtworkModule: {
          "Read": "",
          "Write": ""
        },
        NetworkModule: {
          "Read": "",
          "Write": ""
        },
        LandingModule: {
          "Read": "",
          "Write": ""
        },
        HistoryModule: {
          "Read": "",
          "Write": ""
        },
        BidModule: {
          "Read": "",
          "Write": ""
        },
        OfferModule: {
          "Read": "",
          "Write": ""
        },
        UserRoleModule: {
          "Read": "",
          "Write": ""
        },
        MediaModule: {
          "Read": "",
          "Write": ""
        },
        ArtistCategoryModule: {
          "Read": "",
          "Write": ""
        },
        ArtistStyleModule: {
          "Read": true,
          "Write": true
        },
        ArtistMediumModule: {
          "Read": true,
          "Write": true
        },
        GiftModule: {
          "Read": true,
          "Write": true
        }
      }
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values) => {
      setIsLoading(true);
      let moduleData = {};
      for (const [moduleName, moduleValue] of Object.entries(values.Modules)) {
        moduleData[moduleName] = {
          Read: formik.values?.[moduleName]?.Read || false,
          Write: formik.values?.[moduleName]?.Write || false
        };
      }
      let postData = {
        Role: values.Role,
        Modules: moduleData
      };
      createPost(postData).then(res => {
        if (res?.data?.status) {
          toast.success(res?.data?.info)
          setTimeout(() => navigate("/role-admin"), 1500);
          setIsLoading(false);
        } else {
          toast.error(res?.error?.data?.info);
          setIsLoading(false);
        }
      })
    },
  });

  return (
    <>
      {isLoading && <Loader />}
      <div className="admin-wrapper">
        <ToastContainer></ToastContainer>
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className='d-flex flex-wrap justify-content-end px-5'>
              <div className=''>
                <div className='btn-right'>
                  <Link className="btn btn-danger  btn-sm w-10" to="/role-admin" >
                    <i class="bi bi-chevron-double-left"></i>Back
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
              <Tabs className="border-0 mb-3 settings-tabs">
                <Tab eventKey="" title="Add Role">
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                      <Form onSubmit={formik.handleSubmit}>
                        <div className="row g-4">
                          <div className="col-12">
                            <input
                              className="form-control card shadow"
                              type="text"
                              id="Role"
                              name="Role"
                              placeholder="Your Role Title..."
                              value={formik.values.Role}
                              onChange={formik.handleChange}
                            />
                          </div>
                          <div className='module-data'>
                            {Object.entries(formik.values.Modules).map(([moduleName, moduleValue]) => (
                              <div key={moduleName} className="col-12 d-flex my-3">
                                <label className="col-6">{moduleName.replace("Module", " Module")}</label>
                                <div className="col-6 d-flex justify-content-between">
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id={`${moduleName}Read`}
                                      name={`${moduleName}.Read`}
                                      checked={formik.values?.[moduleName]?.Read}
                                      onChange={() =>
                                        formik.setFieldValue(`${moduleName}.Read`, !formik.values[moduleName]?.Read)
                                      }
                                    />
                                    <label className="form-check-label" htmlFor={`${moduleName}Read`}>
                                      Read
                                    </label>
                                  </div>
                                  <div className="form-check">
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      id={`${moduleName}Write`}
                                      name={`${moduleName}.Write`}
                                      checked={formik.values?.[moduleName]?.Write}
                                      onChange={() =>
                                        formik.setFieldValue(`${moduleName}.Write`, !formik.values[moduleName]?.Write)
                                      }
                                    />
                                    <label className="form-check-label" htmlFor={`${moduleName}Write`}>
                                      Write
                                    </label>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="col-12">
                            <input
                              className="btn btn-primary w-100 rounded-pill"
                              type="submit"
                              value={"Update"}
                            />
                          </div>
                        </div>
                      </Form>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddRole