import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Form from "react-bootstrap/Form";
import { useGetCMSPageDetailDataQuery, useUpdateAboutcmsMutation } from "../Store/Store";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Loader from "../components/loader/Loader";

const PageDetailsScreen = () => {
    let navigate = useNavigate()
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pagedetail, setPagedetail] = useState({});
    const [inputImage, setInputImage] = useState("");
    const [logoFile, setLogoFile] = useState("");
    const [isImageBig, setIsImageBig] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const { data, isLoader , refetch} = useGetCMSPageDetailDataQuery({});
    const [aboutImageVal, setAboutImageVal] = useState("");

    console.log("pageData:", data)

    useEffect(() => {
        setIsLoading(true)
        if (data) {
            setIsLoading(false)
            setPosts(data?.Info);
        }
    }, [data]);


    const [editorLoaded, setEditorLoaded] = useState(false);
    const [dataText1, setDataText1] = useState("");
    const [dataContent, setDataContent] = useState("");

    useEffect(() => {
        setEditorLoaded(true);
    }, []);

    const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc);
        setIsImageBig(true);
    };

    const [sectTitle, setSectTitle] = useState("");

    const handleChange = (e) => {
        setSectTitle(e.target.value);
    };

    const fetchBinaryBlob = async (url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            return blob;
        } catch (error) {
            throw error;
        }
    };

    const updatePagesDetail = async () => {
        setIsLoading(true);
        const token = sessionStorage.getItem('myToken');
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        var formData = new FormData();
        formData.append("Type", "About");

        if (logoFile) {
            formData.append("Image", logoFile);
        } else {
            // Fetch the existing Section1Image URL as binary Blob and append it to the formData
            try {
                const binaryImageBlob = await fetchBinaryBlob(posts[0]?.Section1Image);
                formData.append("Image", binaryImageBlob);
            } catch (error) {
                console.error("Error fetching image as binary Blob:", error);
            }
        }

        const requestBody = Object.fromEntries(formData);

        setIsLoading(true);
        axios
            .post(
                `${process.env.REACT_APP_BACKEND_URL}UpdateAboutImage`,
                formData,
                config,
                {}
            )
            .then(async(res) => {
                console.log(res, "789");
                setInputImage(res.data.Image.CImage);
                if (res?.data?.status) {
                    let obj = {
                        "Section1Text": dataText1 && dataText1 || posts[0]?.Section1Text,
                        "Section3Content": dataContent && dataContent || posts[0]?.Section3Content,
                        "Section3Title": sectTitle && sectTitle || posts[0]?.Section3Title,
                        Image: res.data.Image || posts[0]?.Section1Image
                    };
                    axios
                        .post(
                            `${process.env.REACT_APP_BACKEND_URL}UpdateAboutusCMS`,
                            obj,
                            config,
                            {}
                        )
                        .then(async(res) => {
                            console.log("cmspage:", res)
                            await refetch();
                        });
                    setIsLoading(false);
                    toast.success("Updated successfully");
                    setTimeout(() => navigate("/page-details"), 1000);
                   
                } else {
                    toast.error("Failed to update");
                    setIsLoading(false);
                }
            });
    }

    const ImagehandleChange = (e) => {
        setLogoFile(e.target.files[0])
        setInputImage(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <>
            <ToastContainer></ToastContainer>
            {isLoading && <Loader />}
            <div className="admin-wrapper-table">
                <div className="container">
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-sm-12">
                                <p
                                    style={{
                                        marginLeft: "50px",
                                        fontSize: "2rem",
                                        color: "#fff",
                                        fontWeight: "800",
                                    }}
                                >
                                    Aboutus Page Details
                                </p>
                                <div className="card">
                                    {posts.map((datas) => (
                                        <div className="card-body p-4 p-sm-5">
                                            <Form onSubmit={updatePagesDetail}>
                                                <div className="container">
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                            <label className="labes">Section3 Title</label>
                                                        </div>
                                                        <div className="col">
                                                            <input
                                                                className="form-control card shadow"
                                                                type="text"
                                                                id="name"
                                                                name="Section3Title"
                                                                placeholder="Your Section3Title..."
                                                                defaultValue={datas.Section3Title}
                                                                onChange={handleChange}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="container">
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                            <label className="labes">Section1 Text</label>
                                                        </div>
                                                        <div className="col">
                                                            <CKEditor
                                                                editor={ClassicEditor}
                                                                data={datas.Section1Text}
                                                                class="form-control"
                                                                onChange={(event, editor) => {
                                                                    const text = editor.getData();
                                                                    setDataText1(text);
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="container">
                                                    <div className="row align-items-center">
                                                        <div className="col">
                                                            <label className="labes">Section1 Image</label>
                                                        </div>
                                                        <div className="col">
                                                            <input
                                                                className="form-control card shadow w-100"
                                                                type="file"
                                                                name="Image"
                                                                placeholder="Image"
                                                                id="Image"
                                                                onChange={(e) => ImagehandleChange(e)}
                                                            />
                                                            {inputImage === "" ? <img className="banner-image-pre" alt="" src={datas?.Section1Image}
                                                                onClick={() => handleImageClick(datas?.Section1Image)}></img> : 
                                                                <img alt="" className="banner-image-pre" src={inputImage} 
                                                                onClick={() => handleImageClick(inputImage)}></img>}                           
                                                        </div>

                                                        <div className="container">
                                                            <div className="row align-items-center">
                                                                <div className="col">
                                                                    <label className="labes">Section3 Content</label>
                                                                </div>
                                                                <div className="col">
                                                                    <CKEditor
                                                                        editor={ClassicEditor}
                                                                        data={datas.Section3Content}
                                                                        class="form-control"
                                                                        onChange={(event, editor) => {
                                                                            const text = editor.getData();
                                                                            setDataContent(text);
                                                                        }}
                                                                    />

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Form>
                                        </div>
                                    ))}

                                    <div className="col-6 d-flex justify-content-center" style={{ margin: "20px 0", alignSelf: 'center' }}>
                                        <button
                                            className="btn btn-primary w-100 rounded-pill"
                                            type="submit"
                                            onClick={updatePagesDetail}
                                        >
                                            <i className="bi bi-sd-card-fill me-1" />
                                            Save changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PageDetailsScreen;
