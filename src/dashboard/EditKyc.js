import { useState, useEffect, useRef } from "react";
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import CreateNewButton from "../components/dashboard/createNew/CreateNewButton";
import Select from "react-select"
import { useGetKycDetilsQueryQuery, useGetOneKycDocMutation, useGetOnePersonalInfoMutationMutation, useSingleUserDetailsQuery, useUpdateAccountStatusMutation, useUpdateKycStatusMutation, useUpdateSocialMediaSettingsMutationMutation, useUpdateUserMutation } from "../Store/Store";
import { Modal } from 'react-bootstrap';
import $ from "jquery";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../components/loader/Loader";
import CryptoJS from 'crypto-js';

window.jQuery = window.$ = $;
require("jquery-nice-select");
const options = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' }
]

const optionsKyc = [
    { value: 'Approved', label: 'Approved' },
    { value: 'Rejected', label: 'Rejected' }
]

const EditKyc = () => {
    let navigate = useNavigate()
    const { id } = useParams();
    const [key, setKey] = useState('general');
    const [logoFile, setLogoFile] = useState("");

    const [inputImage, setInputImage] = useState(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    );

    const [createPost, responseInfo] = useUpdateSocialMediaSettingsMutationMutation();

    const selectTimezone = useRef();
    const selectWeekStart = useRef();

    const userid = sessionStorage?.getItem("userId")
    const [selectedOptionRole, setSelectedOptionRole] = useState({ value: 'Active', label: 'Ative' });
    const [selectedOptionKyc, setSelectedOptionKyc] = useState({ value: 'Approved', label: 'Approved' });
    const [createPost2, responseInfo2] = useGetOnePersonalInfoMutationMutation();
    const [createPost3, responseInfo3] = useGetOneKycDocMutation();
    const [createPost4, responseInfo4] = useUpdateAccountStatusMutation();
    const [createPost5, responseInfo5] = useUpdateKycStatusMutation();
     const [isLoading, setIsLoading] = useState(false);
    const [isImageBig, setIsImageBig] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [accountStaus, setAccountStatus] = useState(false)

    console.log("responseInfo2:", responseInfo2?.data?.info[0]?.Email)

    const toggleImageSize = () => {
        setIsImageBig(!isImageBig);
    };

    const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc);
        setIsImageBig(true);
    };

    const decryptedItem = CryptoJS.AES.decrypt(id, process.env.REACT_APP_SECRET_PASS).toString(CryptoJS.enc.Utf8);
    console.log("kycencrypt:", decryptedItem)
    const getPersonalInfo = () => {
         setIsLoading(true)
        createPost2({ "UserId": decodeURIComponent(decryptedItem) }).then(() => {
            setIsLoading(false); // Set loading state to false when data is loaded
        })
        .catch(error => {
            console.error("Error fetching responseInfo2:", error);
            setIsLoading(false); // Ensure loading state is set to false even in case of an error
        });
        createPost3({ "UserId": decodeURIComponent(decryptedItem) })
    }


    const handleChangeSelectRole = (e) => {
        console.log(e, "option");
        setSelectedOptionRole(e)
    }

    const handleChangeSelectKyc = (e) => {
        console.log(e, "option");
        setSelectedOptionKyc(e)
    }

    useEffect(() => {
        $(selectTimezone.current).niceSelect();
             getPersonalInfo()
    }, []);

    useEffect(() => {
        $(selectWeekStart.current).niceSelect();
    }, []);

    useEffect(() => {
        setSelectedOptionRole({ value: `${responseInfo2?.data?.info[0]?.AccountStatus === 1 ? "Active" : "InActive"}`, label: `${responseInfo2?.data?.info[0]?.AccountStatus === 1 ? "Active" : "InActive"}` })
    }, [responseInfo2])

    useEffect(() => {
        setSelectedOptionKyc({ value: `${responseInfo2?.data?.info[0]?.KycStatus}`, label: `${responseInfo2?.data?.info[0]?.KycStatus}` })
    }, [responseInfo2])

    const handleSubmitKyc = (e) => {
         e.preventDefault()
        const newPost = {
            "UserId": decodeURIComponent(decryptedItem),
            "KycStatus": selectedOptionKyc.value
        }
        createPost5(newPost).then(res => {
            console.log("kycsubmitted:", res.data)
            if (res?.data?.status !== false) {
                toast.success(res?.data?.info)
                setTimeout(() => navigate(`/editKyc/${encodeURIComponent(id)}`), 1500);
                getPersonalInfo()
            } else {
                toast.error(res?.data?.info)
            }
        })
    }

    const handleSubmitAccount = (e) => {
         e.preventDefault()
        const newPost_1 = {
            "UserId": decodeURIComponent(decryptedItem),
            "AccountStatus": selectedOptionRole.value === "Inactive" ? false : true
        }
        createPost4(newPost_1).
            then((res) => {
                console.log("kycsubmitted:", res.data)
                if (res?.data?.status !== false) {
                    toast.success(res?.data?.info)
                    setTimeout(() => navigate(`/editKyc/${encodeURIComponent(id)}`), 1500);
                    getPersonalInfo()
                    return;

                } else if (res?.data?.status == false){
                    toast.error(res?.data?.info)
                } else if (!res.error?.data?.status) {
                    console.log("error", res.error?.data?.info);
                    toast.error(res.error?.data?.info)
                }
            }).catch(error => {
                console.log("error", error);
            })

    }

    return (
        <>
            <CreateNewButton />
            <ToastContainer></ToastContainer>
            {isLoading && <Loader />}
            <div className="admin-wrapper">
                <div className="container-fluid">
                    <div className='d-flex flex-wrap justify-content-end px-5'>
                        <div className=''>
                            <div className='btn-right'>
                                <Link className="btn btn-danger  btn-sm w-10" to="/userkyc" >
                                    <i class="bi bi-chevron-double-left"></i>Back
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">

                        <div className="col-sm-12">
                            <p style={{ marginLeft: "50px", fontSize: "2rem", color: "#fff", fontWeight: "800" }}>User Details Info</p>
                            <div className="card">
                                <div className="card-body p-4 p-sm-5">
                                    <Form>

                                        <div className="container my-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Email</label>
                                                </div>
                                                <div className="col">

                                                    <p className="text">{responseInfo2?.data?.info[0]?.Email}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container my-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">UserName</label>
                                                </div>
                                                <div className="col">
                                                    <p className="text">{responseInfo2?.data?.info[0]?.UserName}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container my-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Role</label>
                                                </div>
                                                <div className="col">
                                                    <p className="text">{responseInfo2?.data?.info[0]?.Role}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container my-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">AccountStatus</label>
                                                </div>
                                                <div className="col">
                                                    <p className={`${responseInfo2?.data?.info[0]?.AccountStatus === 1 ? "btn btn-success w-100" : "btn btn-danger w-100"}`}>{responseInfo2?.data?.info[0]?.AccountStatus === 1 ? "Active" : "InActive"}</p>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="container my-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Change AccountStatus</label>
                                                </div>
                                                <div className="col">
                                                    <div className="row align-items-center">
                                                        <div className="col-6">
                                                            <Select options={options} placeholder="Select a brand"
                                                                value={selectedOptionRole}
                                                                onChange={(e) => handleChangeSelectRole(e)}
                                                            />


                                                        </div>
                                                        <div className="col-6">
                                                            <button className="btn btn-primary w-100 " style={{ padding: "7px 0px" }} type="submit" onClick={(e) => handleSubmitAccount(e)}>
                                                                Update Account Status
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container my-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Identity Status</label>
                                                </div>
                                                <div className="col-6">
                                                    <button 
                                                    className={`${responseInfo2?.data?.info[0]?.KycStatus === "Approved" ? "btn btn-success w-100" : "btn btn-danger w-100"}`}
                                                    >
                                                        {responseInfo2?.data?.info[0]?.KycStatus}</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container my-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Change Identity Status</label>
                                                </div>
                                                <div className="col">
                                                    <div className="row align-items-center">
                                                        <div className="col-6">
                                                            <Select options={optionsKyc} placeholder="Select a brand"
                                                                value={selectedOptionKyc}
                                                                onChange={(e) => handleChangeSelectKyc(e)}
                                                            />
                                                        </div>
                                                        <div className="col-6">
                                                            <button className="btn btn-primary w-100" style={{ padding: "7px 0px" }} type="submit" 
                                                            onClick={(e) => handleSubmitKyc(e)}>
                                                                Update Identity Status
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container my-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Identity Info</label>
                                                </div>
                                           
                                                <div className="col">
                                                    <div className="row align-items-center">
                                                        <div className="col-6">
                                                            <p className="text">AddressProof</p>
                                                            {responseInfo3?.data?.info[0]?.AddressProof?.endsWith('.pdf') ? (
                                                                <a href={`${responseInfo3?.data?.info[0]?.AddressProof}`} target="_blank" rel="noopener noreferrer">View PDF</a>
                                                            ) : (
                                                                <img className="id-proof-image" src={`${responseInfo3?.data?.info[0]?.AddressProof}`} alt="img1"
                                                                    onClick={() => handleImageClick(`${responseInfo3?.data?.info[0]?.AddressProof}`)} />
                                                            )}
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="text">IdentityProof</p>
                                                            {responseInfo3?.data?.info[0]?.IdentityProof?.endsWith('.pdf') ? (
                                                                <a href={`${responseInfo3?.data?.info[0]?.IdentityProof}`} target="_blank" rel="noopener noreferrer">View PDF</a>
                                                            ) : (
                                                                <img className="id-proof-image" src={`${responseInfo3?.data?.info[0]?.IdentityProof}`} alt="img2"
                                                                    onClick={() => handleImageClick(`${responseInfo3?.data?.info[0]?.IdentityProof}`)} />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={isImageBig} onHide={toggleImageSize} centered>
                <Modal.Body>
                    {selectedImage && (
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <img
                                src={selectedImage}
                                style={{ maxWidth: "100%", }}
                                alt="Expanded Image"
                            />
                        </div>
                    )}
                </Modal.Body>
            </Modal>
        </>
    )
}

export default EditKyc;