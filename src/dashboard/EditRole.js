import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { useFormik } from "formik";
import { toast, ToastContainer } from 'react-toastify';
import * as yup from "yup";
import {
  useUpdateCategoryQuery,
  useEditCategoryMutation,
  useUpdateAdminRoleMutationMutation,
  useGetAdminOneRoleMutation,
} from "../Store/Store";
import { useParams } from 'react-router-dom'
import CryptoJS from 'crypto-js';
import Loader from '../components/loader/Loader';

const EditCategory = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [createPost2, responseInfo2] = useGetAdminOneRoleMutation()
  const [bannerImage, setBannerImage] = useState("");
  const [categoryFile, setCategoryFile] = useState('');
  const [getOneSpecificData, setGetOneSpecificData] = useState()
  const { data } = useUpdateCategoryQuery(id);
  const [isLoading, setIsLoading] = useState(false);
  const [createPost, responseInfo] = useUpdateAdminRoleMutationMutation();
  console.log("category data", data)

  const decryptedItem = CryptoJS.AES.decrypt(id, process.env.REACT_APP_SECRET_PASS).toString(CryptoJS.enc.Utf8);

  const getOneData = async () => {
    setIsLoading(true)
    const updateUserDetails = await createPost2({ "Id": decodeURIComponent(decryptedItem) })
    .then(res => {
      setGetOneSpecificData(res?.data?.info, "res")
      setIsLoading(false)
    })
    console.log(updateUserDetails, "details")
  }
  useEffect(() => {
    getOneData()
  }, [])

  console.log("getOneSpecificData:", getOneSpecificData)

  const schema = yup.object().shape({
    Role: yup.string().min(3, "Role url must be atleast 3 letter").required("Role url is required"),
  });

  console.log(id, "categ")

  const formik = useFormik({
    initialValues: {
      Role: getOneSpecificData?.Role,
      Modules: {
        UserModule: {
          Read: getOneSpecificData?.Modules?.UserModule?.Read,
          Write: getOneSpecificData?.Modules?.UserModule?.Write
        },
        SettingsModule: {
          Read: getOneSpecificData?.Modules?.SettingsModule?.Read,
          Write: getOneSpecificData?.Modules?.SettingsModule?.Write
        },
        EmailTemplateModule: {
          Read: getOneSpecificData?.Modules?.EmailTemplateModule?.Read,
          Write: getOneSpecificData?.Modules?.EmailTemplateModule?.Write
        },
        BioModule: {
          Read: getOneSpecificData?.Modules?.BioModule?.Read,
          Write: getOneSpecificData?.Modules?.BioModule?.Write
        },
        TestimonialModule: {
          Read: getOneSpecificData?.Modules?.TestimonialModule?.Read,
          Write: getOneSpecificData?.Modules?.TestimonialModule?.Write
        },
        ExhibitionModule: {
          Read: getOneSpecificData?.Modules?.ExhibitionModule?.Read,
          Write: getOneSpecificData?.Modules?.ExhibitionModule?.Write
        },
        CategoriesModule: {
          Read: getOneSpecificData?.Modules?.CategoriesModule?.Read,
          Write: getOneSpecificData?.Modules?.CategoriesModule?.Write
        },
        MediumModule: {
          Read: getOneSpecificData?.Modules?.MediumModule?.Read,
          Write: getOneSpecificData?.Modules?.MediumModule?.Write
        },
        MaterialModule: {
          Read: getOneSpecificData?.Modules?.MaterialModule?.Read,
          Write: getOneSpecificData?.Modules?.MaterialModule?.Write
        },
        KeywordModule: {
          Read: getOneSpecificData?.Modules?.KeywordModule?.Read,
          Write: getOneSpecificData?.Modules?.KeywordModule?.Write
        },
        NewsModule: {
          Read: getOneSpecificData?.Modules?.NewsModule?.Read,
          Write: getOneSpecificData?.Modules?.NewsModule?.Write
        },
        NFTBlockchainModule: {
          Read: getOneSpecificData?.Modules?.NFTBlockchainModule?.Read,
          Write: getOneSpecificData?.Modules?.NFTBlockchainModule?.Write
        },
        CMSModule: {
          Read: getOneSpecificData?.Modules?.CMSModule?.Read,
          Write: getOneSpecificData?.Modules?.CMSModule?.Write
        },
        ArtistLabelModule: {
          Read: getOneSpecificData?.Modules?.ArtistLabelModule?.Read,
          Write: getOneSpecificData?.Modules?.ArtistLabelModule?.Write
        },
        StylesModule: {
          Read: getOneSpecificData?.Modules?.StylesModule?.Read,
          Write: getOneSpecificData?.Modules?.StylesModule?.Write
        },
        CollectionModule: {
          Read: getOneSpecificData?.Modules?.CollectionModule?.Read,
          Write: getOneSpecificData?.Modules?.CollectionModule?.Write
        },
        ArtworkModule: {
          Read: getOneSpecificData?.Modules?.ArtworkModule?.Read,
          Write: getOneSpecificData?.Modules?.ArtworkModule?.Write
        },
        NetworkModule: {
          Read: getOneSpecificData?.Modules?.NetworkModule?.Read,
          Write: getOneSpecificData?.Modules?.NetworkModule?.Write
        },
        LandingModule: {
          Read: getOneSpecificData?.Modules?.LandingModule?.Read,
          Write: getOneSpecificData?.Modules?.LandingModule?.Write
        },
        HistoryModule: {
          Read: getOneSpecificData?.Modules?.HistoryModule?.Read,
          Write: getOneSpecificData?.Modules?.HistoryModule?.Write
        },
        ArtfairModule: {
          Read: getOneSpecificData?.Modules?.ArtfairModule?.Read,
          Write: getOneSpecificData?.Modules?.ArtfairModule?.Write
        },
        ArtcollectionModule: {
          Read: getOneSpecificData?.Modules?.ArtcollectionModule?.Read,
          Write: getOneSpecificData?.Modules?.ArtcollectionModule?.Write
        },
        BidModule: {
          Read: getOneSpecificData?.Modules?.BidModule?.Read,
          Write: getOneSpecificData?.Modules?.BidModule?.Write
        },
        OfferModule: {
          Read: getOneSpecificData?.Modules?.OfferModule?.Read,
          Write: getOneSpecificData?.Modules?.OfferModule?.Write
        },
        UserRoleModule: {
          Read: getOneSpecificData?.Modules?.UserRoleModule?.Read,
          Write: getOneSpecificData?.Modules?.UserRoleModule?.Write
        },
        MediaModule: {
          Read: getOneSpecificData?.Modules?.MediaModule?.Read,
          Write: getOneSpecificData?.Modules?.MediaModule?.Write
        },
        GiftModule: {
          Read: getOneSpecificData?.Modules?.GiftModule?.Read,
          Write: getOneSpecificData?.Modules?.GiftModule?.Write
        }
      }
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      setIsLoading(true)
      let moduleData = {};
      for (const [moduleName, moduleValue] of Object.entries(values.Modules)) {
        moduleData[moduleName] = {
          Read: formik.values?.Modules[moduleName]?.Read,
          Write: formik.values?.Modules[moduleName]?.Write
        };
      }

      let postData = {
        Id: decodeURIComponent(decryptedItem),
        Role: values.Role,
        Modules: moduleData
      };
      createPost(postData).then(res => {
        if (res?.data?.status) {
          toast.success(res?.data?.info)
          setIsLoading(false)
          setTimeout(() => navigate("/role-admin"), 1500);

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
                <Tab eventKey="" title="Update Role">
                  <div className="card">
                    <div className="card-body p-4 p-sm-5">
                      <Form onSubmit={formik.handleSubmit}>
                        <div className="row g-4">
                          <div className="col-12">
                            <h2>{formik.values.Role}</h2>
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
                                      checked={formik.values?.Modules[moduleName]?.Read}
                                      onChange={() =>
                                        formik.setFieldValue(`Modules.${moduleName}.Read`, !formik.values?.Modules[moduleName]?.Read)
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
                                      checked={formik.values?.Modules[moduleName]?.Write}
                                      onChange={() =>
                                        formik.setFieldValue(`Modules.${moduleName}.Write`, !formik.values?.Modules[moduleName]?.Write)
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

export default EditCategory