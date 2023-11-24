import { useState, useEffect, useRef } from "react";
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import CreateNewButton from "../components/dashboard/createNew/CreateNewButton";
import {  useGetOneKycDocMutation, useGetOnePersonalInfoMutationMutation, useSingleUserDetailsQuery, useUpdateAccountStatusMutation, useUpdateKycStatusMutation, useUpdateSocialMediaSettingsMutationMutation, useUpdateUserMutation } from "../Store/Store";
import { Modal } from 'react-bootstrap';
import CryptoJS from 'crypto-js';
import $ from "jquery";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../components/loader/Loader";
window.jQuery = window.$ = $;
require("jquery-nice-select");

const ViewKyc = () => {
    const { id } = useParams();
    const selectTimezone = useRef();
    const selectWeekStart = useRef();

    const userid = sessionStorage?.getItem("userId")
    const [selectedOptionRole, setSelectedOptionRole] = useState({ value: 'Active', label: 'Ative' });
    const [selectedOptionKyc, setSelectedOptionKyc] = useState({ value: 'Approved', label: 'Approved' });
    const [createPost2, responseInfo2] = useGetOnePersonalInfoMutationMutation();
    const [createPost3, responseInfo3] = useGetOneKycDocMutation();
    const [createPost4, responseInfo4] = useUpdateAccountStatusMutation();
    const [createPost5, responseInfo5] = useUpdateKycStatusMutation();
    const [isImageBig, setIsImageBig] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const toggleImageSize = () => {
        setIsImageBig(!isImageBig);
      };
    
      const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc);
        setIsImageBig(true);
      };

      const decryptedItem = CryptoJS.AES.decrypt(id, process.env.REACT_APP_SECRET_PASS).toString(CryptoJS.enc.Utf8);

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
            if (res?.data?.status !== false) {
                toast.success(res?.data?.info)
                setTimeout(() => (window.location.href = `/viewKyc/${id}`), 1500);

            } else {
                toast.error(res?.data?.message)
            }

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
                            <p style={{ marginLeft: "50px", fontSize: "2rem", color: "#fff", fontWeight: "800" }}>Identity Info</p>
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
                                                    <label className="labes">Address1</label>
                                                </div>
                                                <div className="col">

                                                    <p className="text">{responseInfo2?.data?.info[0]?.Address1}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container my-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Address2</label>
                                                </div>
                                                <div className="col">

                                                    <p className="text">{responseInfo2?.data?.info[0]?.Address2}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container my-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Address2</label>
                                                </div>
                                                <div className="col">

                                                    <p className="text">{responseInfo2?.data?.info[0]?.Address2}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container my-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">City</label>
                                                </div>
                                                <div className="col">

                                                    <p className="text">{responseInfo2?.data?.info[0]?.City}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container my-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">State</label>
                                                </div>
                                                <div className="col">

                                                    <p className="text">{responseInfo2?.data?.info[0]?.State}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container my-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Country</label>
                                                </div>
                                                <div className="col">

                                                    <p className="text">{responseInfo2?.data?.info[0]?.Country}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container my-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Pincode</label>
                                                </div>
                                                <div className="col">

                                                    <p className="text">{responseInfo2?.data?.info[0]?.Pincode}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container my-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">CountryCode</label>
                                                </div>
                                                <div className="col">

                                                    <p className="text">{responseInfo2?.data?.info[0]?.CountryCode}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container my-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">MobileNo</label>
                                                </div>
                                                <div className="col">

                                                    <p className="text">{responseInfo2?.data?.info[0]?.MobileNo}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container my-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">CoverVideo</label>
                                                </div>
                                                <div className="col">
                                                    <a target="_blank" className="text-white" href={responseInfo2?.data?.info[0]?.CoverVideo?.Local}>
                                                    <i class="bi bi-camera-video pe-3 text-white"></i>Click here
                                                    </a>
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
                                                    <label className="labes">ArtWork</label>
                                                </div>
                                                <div className="col">
                                                    <p className="text">{responseInfo2?.data?.info[0]?.ArtWork?.CDN}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container my-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">User Profile</label>
                                                </div>
                                                <div className="col">
                                                <img className="id-proof-image" src={`${responseInfo2?.data?.info[0]?.ProfilePicture}`} alt="img1" 
                                                onClick={() => handleImageClick(`${responseInfo2?.data?.info[0]?.ProfilePicture}`)}/>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="container my-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Wallet Address</label>
                                                </div>
                                                <div className="col">
                                                    <p className="text">{responseInfo2?.data?.info[0]?.WalletAddress}</p>
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
                                                    <p className={`${responseInfo2?.data?.info[0]?.AccountStatus === 1 ? "text-white w-100" : "text-white w-100"}`}>{responseInfo2?.data?.info[0]?.AccountStatus === 1 ? "Active" : "InActive"}</p>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="container my-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Kyc Status</label>
                                                </div>
                                                <div className="col-6">
                                                    <p className={`${responseInfo2?.data?.info[0]?.KycStatus === "Approved" ? "text-white w-100" : "text-white w-100"}`}>{responseInfo2?.data?.info[0]?.KycStatus}</p>

                                                </div>
                                            </div>
                                        </div>

                                        <div className="container my-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">KYC Info</label>
                                                </div>
                                                <div className="col">
                                                    <div className="row align-items-center">
                                                        <div className="col-6">
                                                            <p className="text">AddressProof</p>
                                                            {responseInfo3?.data?.info[0]?.AddressProof?.endsWith('.pdf') ? (
                                                                <a href={`${responseInfo3?.data?.info[0]?.AddressProof}`} target="_blank" rel="noopener noreferrer">View PDF</a>
                                                            ) : (
                                                                <img className="id-proof-image" src={`${responseInfo3?.data?.info[0]?.AddressProof}`} alt="img1" 
                                                                onClick={() => handleImageClick(`${responseInfo3?.data?.info[0]?.AddressProof}`)}/>
                                                            )}
                                                        </div>
                                                        <div className="col-6">
                                                            <p className="text">IdentityProof</p>
                                                            {responseInfo3?.data?.info[0]?.IdentityProof?.endsWith('.pdf') ? (
                                                                <a href={`${responseInfo3?.data?.info[0]?.IdentityProof}`} target="_blank" rel="noopener noreferrer">View PDF</a>
                                                            ) : (
                                                                <img className="id-proof-image" src={`${responseInfo3?.data?.info[0]?.IdentityProof}`} alt="img2" 
                                                                onClick={() => handleImageClick(`${responseInfo3?.data?.info[0]?.IdentityProof}`)}/>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>

                                        <div className="container my-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Terms & Condition</label>
                                                </div>
                                                <div className="col">
                                                    <p className="text">{responseInfo2?.data?.info[0]?.Terms == true ? "Accepted" : "Not Accepted"}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container my-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Subscription</label>
                                                </div>
                                                <div className="col">
                                                    <p className="text">{responseInfo2?.data?.info[0]?.Subscription == true ? "Yes" : "No"}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="container my-3">
                                            <div className="row align-items-center">
                                                <div className="col">
                                                    <label className="labes">Url Link</label>
                                                </div>
                                                <div className="col">
                                                    <p className="text">{responseInfo2?.data?.info[0]?.UrlLink}</p>
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
              style={{ maxWidth: "100%",}}
              alt="Expanded Image"
            />
            </div>
          )}
        </Modal.Body>
      </Modal>
        </>
    )
}

export default ViewKyc;