import React, { useEffect, useState } from "react";
import {
  useGetEmailTemplateQuery,
} from "../Store/Store";
import Email from "./Email";


const EmailTemplate = () => {
  const [templateData, settemplateData] = useState();
  const { data } = useGetEmailTemplateQuery();
  console.log("emaildata", data);
  useEffect(() => {
    if (data?.status) {
      settemplateData(data);
    }

  }, [data])
  return (
    <>
      <div className="admin-wrapper-table">
        <div
          class="container"
          style={{}}
        >
          <div class="row">
            <div class="box">
              <div class="row">
                <div className="col-md-3 col-12">
                  <div
                    class="nav flex-column nav-pills me-3"
                    id="v-pills-tab"
                    role="tablist"
                    aria-orientation="vertical"
                  >
                    <button
                      class="nav-link active"
                      id="1"
                      data-bs-toggle="pill"
                      data-bs-target="#temp1"
                      type="button"
                      role="tab"
                      aria-selected="true"
                    >
                      Email Verification
                    </button>
                    <button
                      class="nav-link"
                      id="2"
                      data-bs-toggle="pill"
                      data-bs-target="#temp2"
                      type="button"
                      role="tab"
                      aria-selected="false"
                    >
                      2-Factor Authentication
                    </button>
                    <button
                      class="nav-link"
                      id="3"
                      data-bs-toggle="pill"
                      data-bs-target="#temp3"
                      type="button"
                      role="tab"
                      aria-selected="false"
                    >
                      Identity/Address Verification
                    </button>
                    <button
                      class="nav-link"
                      id="4"
                      data-bs-toggle="pill"
                      data-bs-target="#temp4"
                      type="button"
                      role="tab"
                      aria-selected="false"
                    >
                      Password Reset
                    </button>
                    <button
                      class="nav-link"
                      id="5"
                      data-bs-toggle="pill"
                      data-bs-target="#temp5"
                      type="button"
                      role="tab"
                      aria-selected="false"
                    >
                      Transferred Payments
                    </button>

                    <button
                      class="nav-link"
                      id="6"
                      data-bs-toggle="pill"
                      data-bs-target="#temp6"
                      type="button"
                      role="tab"
                      aria-selected="false"
                    >
                      Received Payments
                    </button>

                    <button
                      class="nav-link"
                      id="7"
                      data-bs-toggle="pill"
                      data-bs-target="#temp7"
                      type="button"
                      role="tab"
                      aria-selected="false"
                    >
                      Request Payment Creation
                    </button>

                    <button
                      class="nav-link"
                      id="8"
                      data-bs-toggle="pill"
                      data-bs-target="#temp8"
                      type="button"
                      role="tab"
                      aria-selected="false"
                    >
                      Request Payment Acceptance
                    </button>

                    <button
                      class="nav-link"
                      id="9"
                      data-bs-toggle="pill"
                      data-bs-target="#temp9"
                      type="button"
                      role="tab"
                      aria-selected="false"
                    >
                      Ticket
                    </button>

                    <button
                      class="nav-link"
                      id="10"
                      data-bs-toggle="pill"
                      data-bs-target="#temp10"
                      type="button"
                      role="tab"
                      aria-selected="false"
                    >
                      Ticket Reply
                    </button>

                    <button
                      class="nav-link"
                      id="11"
                      data-bs-toggle="pill"
                      data-bs-target="#temp11"
                      type="button"
                      role="tab"
                      aria-selected="false"
                    >
                      Dispute Reply
                    </button>

                    <button
                      class="nav-link"
                      id="12"
                      data-bs-toggle="pill"
                      data-bs-target="#temp12"
                      type="button"
                      role="tab"
                      aria-selected="false"
                    >
                      Deposit via Admin
                    </button>
                  </div>
                </div>
                <div className="col-md-9 col-12">
                  <div class="tab-content" id="v-pills-tabContent">
                    <div
                      class="tab-pane fade show active"
                      id="temp1"
                      role="tabpanel"
                      aria-labelledby="1"
                    >
                      {console.log("templateData", templateData)}
                      {data?.result?.map((datas, index) =>
                        datas?.subject === "email verifications" ? (
                          <Email
                            subject={datas?.subject}
                            content={datas?.content}
                            id={datas?._id}
                          />
                        ) : null
                      )
                      }
                    </div>
                    <div
                      class="tab-pane fade"
                      id="temp2"
                      role="tabpanel"
                      aria-labelledby="2"
                    >


                      {data?.result?.map((datas, index) =>
                        datas.subject === "factor authentication" ? (
                          <Email
                            subject={datas.subject}
                            content={datas.content}
                            id={datas._id}
                          />
                        ) : null
                      )}
                    </div>
                    <div
                      class="tab-pane fade"
                      id="temp3"
                      role="tabpanel"
                      aria-labelledby="3"
                    >
                      {data?.result?.map((datas, index) =>
                        datas.subject === "identity address" ? (
                          <Email
                            subject={datas.subject}
                            content={datas.content}
                            id={datas._id}
                          />
                        ) : null
                      )}
                    </div>
                    <div
                      class="tab-pane fade"
                      id="temp4"
                      role="tabpanel"
                      aria-labelledby="4"
                    >
                      {data?.result?.map((datas, index) =>
                        datas.subject === "reset password" ? (
                          <Email
                            subject={datas.subject}
                            content={datas.content}
                            id={datas._id}
                          />
                        ) : null
                      )}
                    </div>
                    <div
                      class="tab-pane fade"
                      id="temp5"
                      role="tabpanel"
                      aria-labelledby="5"
                    >
                      {data?.result?.map((datas, index) =>
                        datas.subject === "payment" ? (
                          <Email
                            subject={datas.subject}
                            content={datas.content}
                            id={datas._id}
                          />
                        ) : null
                      )}
                    </div>
                    <div
                      class="tab-pane fade"
                      id="temp6"
                      role="tabpanel"
                      aria-labelledby="6"
                    >
                      {data?.result?.map((datas, index) =>
                        datas.subject === "received payment " ? (
                          <Email
                            subject={datas.subject}
                            content={datas.content}
                            id={datas._id}
                          />
                        ) : null
                      )}

                    </div>
                    <div
                      class="tab-pane fade"
                      id="temp7"
                      role="tabpanel"
                      aria-labelledby="7"
                    >
                      {data?.result?.map((datas, index) =>
                        datas.subject === "request payment creation" ? (
                          <Email
                            subject={datas.subject}
                            content={datas.content}
                            id={datas._id}
                          />
                        ) : null
                      )}
                    </div>
                    <div
                      class="tab-pane fade"
                      id="temp8"
                      role="tabpanel"
                      aria-labelledby="8"
                    >
                      {data?.result?.map((datas, index) =>
                        datas.subject === "request payment acceptance" ? (
                          <Email
                            subject={datas.subject}
                            content={datas.content}
                            id={datas._id}
                          />
                        ) : null
                      )}
                    </div>
                    <div
                      class="tab-pane fade"
                      id="temp9"
                      role="tabpanel"
                      aria-labelledby="9"
                    >
                      {data?.result?.map((datas, index) =>
                        datas.subject === "ticket" ? (
                          <Email
                            subject={datas.subject}
                            content={datas.content}
                            id={datas._id}
                          />
                        ) : null
                      )}
                    </div>
                    <div
                      class="tab-pane fade"
                      id="temp10"
                      role="tabpanel"
                      aria-labelledby="10"
                    >
                      {data?.result?.map((datas, index) =>
                        datas.subject === "ticket reply" ? (
                          <Email
                            subject={datas.subject}
                            content={datas.content}
                            id={datas._id}
                          />
                        ) : null
                      )}
                    </div>
                    <div
                      class="tab-pane fade"
                      id="temp11"
                      role="tabpanel"
                      aria-labelledby="11"
                    >
                      {data?.result?.map((datas, index) =>
                        datas.subject === "dispute reply" ? (
                          <Email
                            subject={datas.subject}
                            content={datas.content}
                            id={datas._id}
                          />
                        ) : null
                      )}
                    </div>
                    <div
                      class="tab-pane fade"
                      id="temp12"
                      role="tabpanel"
                      aria-labelledby="12"
                    >
                      {data?.result?.map((datas, index) =>
                        datas.subject === "deposit via admin" ? (
                          <Email
                            subject={datas.subject}
                            content={datas.content}
                            id={datas._id}
                          />
                        ) : null
                      )}
                    </div>
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

export default EmailTemplate;
