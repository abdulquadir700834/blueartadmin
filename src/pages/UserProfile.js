import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSingleUserDetailsQuery } from "../Store/Store";
import { NavLink,Link } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  const { data } = useSingleUserDetailsQuery(id);
  console.log("single user data", data);
  return (
    <>
      <section className="vh-100" style={{ backgroundColor: "" }}>
        <div className="container py-5 h-100 admin-wrapper">
                    <div className='d-flex flex-wrap justify-content-end px-5'>
                        <div className=''>
                            <div className='btn-right'>
                                <Link className="btn btn-danger  btn-sm w-10" to="/user" >
                                <i class="bi bi-chevron-double-left"></i>Back
                                </Link>
                            </div>
                        </div>
                    </div>
          <div className="row d-flex justify-content-center align-items-center">
            <div
              className="col col-lg-6 mb-4 mb-lg-0"
            >
              <div className="card mb-3" style={{ borderRadius: ".5rem" }}>
                <div className="row g-0">
                  <div
                    className="col-md-4 gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar"
                      className="img-fluid my-5"
                      style={{ width: "80px" }}
                    />
                    <h5>{data?.result?.username}</h5>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h6>Information</h6>
                      <hr className="mt-0 mb-4" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Username</h6>
                          <p className="text-muted">{data?.result?.username}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Email</h6>
                          <p className="text-muted">{data?.result?.email}</p>
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Firstname</h6>
                          <p className="text-muted">
                            {data?.result?.first_name}
                          </p>
                        </div>
                        <div className="col-6 mb-3">
                          <h6>Lastname</h6>
                          <p className="text-muted">
                            {data?.result?.last_name}
                          </p>
                        </div>
                      </div>
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h6>Status</h6>
                          <p className="text-muted">{data?.result?.status}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;
