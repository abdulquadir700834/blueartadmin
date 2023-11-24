import React from 'react'
import { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { toast, ToastContainer } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import Loader from '../../components/loader/Loader';
import { useUpdateCsvSampleMutation } from "../../Store/Store";

const EditCSVSample = ({ }) => {
  let navigate = useNavigate();
  const fileInputCSVRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [csvfile, setCsvfile] = useState("");
  const [addcsvlist, responseInfo] = useUpdateCsvSampleMutation();
  const [csvFileName, setCsvFileName] = useState("");
  const { id } = useParams();
  const [datas, setDatas] = useState(null);

  useEffect(() => {
    // Retrieve datas from URL parameters and decode the JSON string
    const datasFromUrl = new URLSearchParams(window.location.search).get('datas');
    if (datasFromUrl) {
      setDatas(JSON.parse(decodeURIComponent(datasFromUrl)));
    }
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setCsvfile(file);
    setCsvFileName(file.name);
  }

  const fetchData = async () => {
    setIsLoading(true);
    const token = sessionStorage.getItem('myToken');
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    var formData = new FormData();
    formData.append("Type", datas.Type === 'Artwork' ? "BulkArtworkCSVSample" : "BulkArtproductCSVSample");
    formData.append("CSV", csvfile);

    axios.post(`${process.env.REACT_APP_BACKEND_URL}UploadCsvSamples`, formData, config)
      .then((res) => {
        const newPost = {
          "Id": encodeURIComponent(datas._id),
          "Image": res.data.Image
        }
        addcsvlist(newPost);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };
  const handleSubmit = async (e) => {
    setIsLoading(true);
    fetchData()
    e.preventDefault();
  }

  useEffect(() => {
    if (responseInfo?.data?.status) {
      setIsLoading(false);
      toast?.success(responseInfo?.data?.message)
      setTimeout(() => navigate("/csvsample-list"), 2000);
    } else {
      toast?.error(responseInfo?.data?.message)
    }
  }, [responseInfo])

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
                  <Link className="btn btn-danger  btn-sm w-10" to="/csvsample-list" >
                    <i class="bi bi-chevron-double-left"></i>Back
                  </Link>
                </div>
              </div>
            </div>
            {datas && (
              <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
                <Tabs className="border-0 mb-3 settings-tabs">
                  <Tab eventKey="" title="Edit CSV File">
                    <div className="card">
                      <div className="card-body p-4 p-sm-5">
                        <Form
                          onSubmit={handleSubmit}
                        >
                          <div className="row g-4">
                            <div className="container pt-3">
                              <div className="row align-items-center">
                                <div className="col">
                                  <p className="labes">Type</p>
                                </div>
                                <div className='col-6'>
                                  <p className='text-white'>{datas.Type}</p>
                                </div>
                              </div>
                            </div>

                            <div className="container pt-3">
                              <div className="row align-items-center">
                                <div className="col">
                                  <label className="labes">CSV File</label>
                                </div>
                                <div className="col-6">
                                  <input type="button" onClick={() => fileInputCSVRef.current.click()}
                                    className="form-control card shadow w-90 h-47" value="Upload CSV File" />
                                  <input name="Document" accept=".csv"
                                    onChange={(e) => {
                                      handleFileUpload(e);
                                    }}
                                    type="file" style={{ display: "none" }}
                                    ref={fileInputCSVRef} />
                                  {csvFileName && <p style={{ color: 'white', marginTop: 10 }}>{csvFileName}</p>}
                                </div>
                              </div>
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
              </div>)}
          </div>
        </div>
      </div>
    </>
  )
}

export default EditCSVSample;