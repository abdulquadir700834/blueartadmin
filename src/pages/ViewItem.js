import React, { useEffect, useState } from 'react'
import DashboardHeader from '../components/dashboard/header/DashboardHeader'
import { useActionsItemsMutation, useGetItemsListQuery } from '../Store/Store'
import { useParams } from 'react-router-dom'
import { Form, Select } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { useFormik } from 'formik';


const ViewItem = () => {
  const { id } = useParams();
  const { data } = useGetItemsListQuery(id);
  console.log("market status ", data?.data?.docs[0].marketplacestatus)
  console.log(data, "values")

  const [createPost, responseInfo] = useActionsItemsMutation();
  const [editor_picks, setEditor_picks] = useState()
  const [discover_actions, setDiscover_actions] = useState("")
  const [live_Actions, setLive_Actions] = useState("")
  const [editor_tag, setEditor_Tag] = useState("")
  const [discover_tag, setDiscover_Tag] = useState("")
  const [live_actions_tag, setLive_Actions_Tag] = useState("")
  const [selected, setSelected] = useState('yes');
  const [toggle, setToggle] = useState(false);

  const handleChange = event => {
    console.log(event.target.checked, "checked")
    setEditor_picks(event.target.value);
  };

  useEffect(() => {
    setEditor_picks(data?.data?.docs[0]?.editor_picks)
    setDiscover_actions(data?.data?.docs[0]?.discover_item)
  }, [data?.status])

  const gender = (event) => {
    setEditor_picks(event.target.value);
  }

  const discover = (event) => {
    setDiscover_actions(event.target.value);
  }

  console.log(data, "picks")
  console.log((data?.data?.docs[0]?.editor_picks), "editorpicks")
  console.log(editor_picks, "editorpicks")

  const handleChangeToggle = () => {
    setToggle(!toggle)
  }

  return (
    <>
      <ToastContainer></ToastContainer>
      <section className="vh-100" style={{ backgroundColor: "" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div
              className="col col-lg-6 mb-4 mb-lg-0"
              style={{
                width: "63rem",
                marginLeft: "15rem",
                marginTop: "5rem"
              }}
            >
              <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                <div className="row g-0">
                  <div
                    className="col-md-4 gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                      padding: "10px"
                    }}
                  >
                    <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/images/item/thumb/${data?.data?.docs[0].thumb}`}
                      alt="Avatar"
                      className="img-fluid my-5"

                    />
                    <h5></h5>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h6>ITEM DETAILS</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Nft Item</h6>
                          <p className="text-muted">{data?.data?.docs[0].name}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Description</h6>
                          <p className="text-muted">{data?.data?.docs[0].description}</p>
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>price</h6>
                          <p className="text-muted">
                            {data?.data?.docs[0].price}
                          </p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Status</h6>
                          <p className="text-muted">
                            {data?.data?.docs[0].status}
                          </p>
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Market Status</h6>
                          <p className="text-muted">
                            {data?.data?.docs[0].marketplaceStatus ? "Yes" : "No"}
                          </p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Enable Auction</h6>
                          <p className="text-muted">

                            {data?.data?.docs[0].enableAuction ? "Yes" : "No"}
                          </p>
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Enable Auction Status</h6>
                          <p className="text-muted">
                            {`${data?.data?.docs[0].enableAuctionStatus}`}
                          </p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>External Link</h6>
                          <p className="text-muted">
                            {data?.data?.docs[0].external_link}
                          </p>
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Admin Approved Status</h6>
                          <p className="text-muted">

                          </p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Exhibition Item</h6>
                          <p className="text-muted">

                          </p>
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Like Count</h6>
                          <p className="text-muted">
                            {data?.data?.docs[0].like_count}
                          </p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>View Count</h6>
                          <p className="text-muted">
                            {data?.data?.docs[0].view_count}
                          </p>
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Minted Date</h6>
                          <p className="text-muted">
                            {data?.data?.docs[0].minted_date}
                          </p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Publish Status</h6>
                          <p >

                            {`${data?.data?.docs[0]?.publishStatus}`}
                            {console.log(data?.data?.docs[0]?.publishStatus, "test")}
                          </p>
                        </div>
                      </div>

                    </div>
                    <div className="card-body p-4">
                      <h6>CURRENT OWNER INFORMATION</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Username</h6>
                          <p className="text-muted">{data?.data?.docs[0].current_owner?.username}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>First Name</h6>
                          <p className="text-muted">{data?.data?.docs[0].current_owner?.first_name}</p>
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Last Name</h6>
                          <p className="text-muted">
                            {data?.data?.docs[0].current_owner?.last_name}
                          </p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Profile Image</h6>
                          <p className="text-muted">
                            { }
                          </p>
                        </div>
                      </div>


                    </div>
                    <div className="card-body p-4">
                      <h6>CATEGORY INFORMATION</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Category</h6>
                          <p className="text-muted">{data?.data?.docs[0].category_id?.title}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Status</h6>
                          <p className="text-muted">
                            {data?.data?.docs[0].category_id?.status}
                          </p>

                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Category Image</h6>
                          <img width="200px" height="200px" src={`${process.env.REACT_APP_BACKEND_URL + data?.data?.docs[0].category_id?.category_image}`} />
                        </div>
                      </div>
                    </div>
                    <div className="card-body p-4">
                      <h6>COLLECTION  INFORMATION</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Name</h6>
                          <p className="text-muted">{data?.data?.docs[0].collection_id.name}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Collection Image</h6>
                          <img width="200px" height="200px" src={`${process.env.REACT_APP_BACKEND_URL + data?.data?.docs[0].collection_id?.image}`} />
                        </div>
                      </div>
                    </div>

                    <div className="card-body">
                      <h6>EDITOR PICKS</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Actions</h6>

                          <div onChange={(e) => gender(e)}>
                            <input type="radio" value="true" checked={String(editor_picks) === "true"} name="editor_picks" /> Enable
                            <input type="radio" value="false" checked={String(editor_picks) === "false"} name="editor_picks" /> Disable
                          </div>
                          {console.log(editor_picks, "editor_picks")}
                          <div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card-body ">
                      <h6>DISCOVER Item INFORMATION</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Actions</h6>
                          <div className='row'>
                          <div onChange={(e) => discover(e)}>
                            {console.log(typeof(discover_actions), "discover")}
                            <input type="radio" value="true" checked={String(discover_actions) === "true"} name="String" /> Enable
                            <input type="radio" value="false" checked={String(discover_actions) === "false"} name="discover_actions" /> Disable
                          </div>
                          </div>
                        </div>
                      </div>

                      <br />
                      <br />
                      {console.log(typeof (editor_picks), "editorpicks")}
                      <button className='btn btn-primary' onClick={() => createPost({
                        "item_id": id,
                        "editor_picks": editor_picks,
                        "live_actions": live_Actions,
                        "discover_item": discover_actions,
                        "live_actions_tag": live_actions_tag,
                        "discover_item_tag": discover_tag,
                        "editor_tag": editor_tag
                      }).then(res => {
                        if (res.data.status) {
                          toast.success(res?.data.message)
                        } else {
                          toast.error(res?.data.message)
                        }
                        console.log("res", res)
                      })}>
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ViewItem