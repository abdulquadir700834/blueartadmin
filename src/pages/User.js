import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import {  useAddAdminMutationMutation, useUpdateAdminMutationMutation, useGetAdminRoleQueryQuery, useGetAdminListQueryQuery } from "../Store/Store";
import Pagination from "./Pagination";
import { useFormik } from "formik";
import { addUserSchema } from "./Schema";
import Form from "react-bootstrap/Form";
import { toast, ToastContainer } from "react-toastify";
import { useUpdateUserMutation, useGetSuspendedUserListQuery, useGetDeletedUserListQuery } from "../Store/Store";
import Select from "react-select";
import Loader from "../components/loader/Loader";
import CryptoJS from 'crypto-js';

const options = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
]

const User = () => {
  const [showUserTable, setShowUserTable] = useState(true);
  const [showAddUser, setShowAddUser] = useState(false);
  const [showSuspendedUser, setShowSuspended] = useState(false);
  const [showDeletedUser, setShowDeletedUser] = useState(false);
  const [showEmailPending, setShowEmailPending] = useState(false);
  const [selectedOption, setSelectedOption] = useState({ value: 'active', label: 'Active' });
  const [selectedOptionRole, setSelectedOptionRole] = useState({ value: 'Role', label: 'Role' });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const getRole = useGetAdminRoleQueryQuery();
  const getAdmin = useGetAdminListQueryQuery({
    page: currentPage,
    search: searchTerm,
  });

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);


useEffect(() => {
  setLoading(true)
  console.log("ArtData:", getAdmin.status)
if(getAdmin.status == 'fulfilled'){
setLoading(false)
setPosts(getAdmin?.data)
}
console.log("postsArtData:", getAdmin?.data)
}, [getAdmin]);
 

  const optionsRole = getRole?.data?.info?.map((guest, index) => {
    return {
      label: guest.Role,
      value: guest.Role,
      key: index
    }
  })

  console.log(getRole, "getRole")
  // console.log(getAdmin, "getRole")


 

  const handleChangeSelect = (e) => {
    console.log(e, "option");
    setSelectedOption(e)
  }

  const handleChangeSelectRole = (e) => {
    console.log(e, "option");
    setSelectedOptionRole(e)
  }

  const Table = () => {
    const [updateUser, response] = useUpdateUserMutation();
    const [postsPerPage, setPostsPerPage] = useState(10);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const [searchValue, setSearchValue] = useState('');
 


    function search() {
      console.log("searchTerm", searchTerm)
      let value = getAdmin
      console.log("getAdminValue:", value)

      const filtered = posts?.data?.filter(
        list => {
          if (searchTerm == "") {
            return true;
          } else {
            for (const property in list) {
              if (
                list[property] &&
                list[property].toString().toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return true;
              }
            }
            return false;
          }
        }

      )

      setSearchValue(filtered);

      console.log("filteredddd:", filtered)

    }
    const handleSearch = (event) => {
      event.preventDefault();
      const searchValue = event.target.value;
      setSearchTerm(searchValue);

      console.log("searc")
    };

    const handleSubmit = (event) => {
      event.preventDefault(); 
      setCurrentPage(1); 
    };

    console.log("postgroup:", posts?.data?.length === 0)

    return (
      <>
       {loading && <Loader />}
        <div className="container">
          <ToastContainer></ToastContainer>
          <div className="col-md-4">
            <form onSubmit={(e) => e.preventDefault()}
              class="example"
              action=""
            >
              <input
                type="text"
                placeholder="Search.."
                autoFocus="autoFocus"
                value={searchTerm}
                onChange={handleSearch}
                name="search2"
              />
              <button
                type="submit" >
                <i class="fa fa-search"></i>
              </button>
            </form>
          </div>

          <div className="table-responsive border shadow-sm dashboard-table activity-table user-table-font">
            <table
              className="table mb-0"  >
              <thead className="table-dark">
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-center">Activity</th>
                </tr>
              </thead>
              <tbody>
                {console.log("serachValueII:", searchTerm)}
                {searchTerm ? (
                  <>
                    {posts?.data?.map((datas, index) => {
                      const encryptedItemId = CryptoJS.AES.encrypt(datas._id.toString(), process.env.REACT_APP_SECRET_PASS).toString();
                      return (
                        datas.Status === 'Active' || datas.Status == 'reset' ? (
                          <tr>
                            <th scope="row">{datas.UserName}</th>
                            <td>{datas.Email}</td>
                            <td>{datas.Role}</td>
                            <td>{datas.Status}</td>
                            {console.log("searchvalue:", datas.Status)}
                            <td>
                              <ul
                                style={{
                                  display: "flex",
                                  listStyle: "none",
                                  gap: "1rem",
                                  justifyContent: "center",
                                }}
                              >
                                <NavLink to={`/user-profile/${datas._id}`}>
                                  <li><i class="bi bi-eye-fill" title="view"></i></li>
                                </NavLink>
                                <NavLink to={`/update-user/${encodeURIComponent(encryptedItemId)}`}><li><i class="bi bi-pencil-fill"
                                  title="edit"></i></li></NavLink>
                                <NavLink ><li onClick={() => {
                                  updateUser({
                                    user_id: datas._id,
                                    status: "inactive"
                                  })
                                }} ><i class="bi bi-person-x" title="suspend"></i></li></NavLink>
                                <NavLink ><li onClick={() => {
                                  updateUser({
                                    user_id: datas._id,
                                    status: "blocked"
                                  })
                                }}><i class="bi bi-trash" title="delete"></i></li></NavLink>
                              </ul>
                            </td>
                            <td></td>
                          </tr>
                        ) : null
                      )
                    })}
                  </>
                ) : (
                  <>
                    {posts?.data?.map((datas, index) => {
                      const encryptedItemId = CryptoJS.AES.encrypt(datas._id.toString(), process.env.REACT_APP_SECRET_PASS).toString();
                      return (
                        <tr>
                          <th scope="row">{datas.UserName}</th>
                          <td>{datas.Email}</td>
                          <td>{datas.Role}</td>
                          <td>{datas.Status}</td>
                          <td>
                            <ul
                              style={{
                                display: "flex",
                                listStyle: "none",
                                gap: "1rem",
                                justifyContent: "center",
                              }}
                            >
                              <NavLink to={`/update-user/${encodeURIComponent(encryptedItemId)}`}><li><i class="bi bi-pencil-fill" title="edit"></i></li></NavLink>
                            </ul>
                          </td>
                        </tr>

                      )
                    })}
                  </>
                )}
                {posts?.data?.length === 0 && <tr><td colSpan={5} scope="col" className="text-center">No Records Found</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        <div
          className="container"
          style={{ marginTop: "2rem" }}>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={getAdmin?.data?.data?.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
      </>
    );
  };

  const AddUser = () => {
    const [updateUser, response] = useUpdateAdminMutationMutation();
    const [addUser, responseInfo] = useAddAdminMutationMutation();

    console.log(selectedOption.value, "option")
    const initialValues = {

      UserName: "",
      Email: "",
      Password: "",
      Role: "",
      Status: "",
      ConfirmPassword: ""

    };

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
      useFormik({
        initialValues,
        validationSchema: addUserSchema,
        onSubmit: (values, action) => {

          let postData = {
            UserName: values.UserName,
            Email: values.Email,
            Password: values.Password,
            Role: selectedOptionRole.label,
            Status: selectedOption.label,
          }
          console.log(
            values
          );
          addUser(postData).then(res => {
            if (res?.data?.status !== false) {
              toast.success(res?.data?.info)
              setTimeout(() => (window.location.href = "/user#user"), 1500);

            } else {
              toast.error(res?.data?.message)
            }
          })
        },
      });
    console.log(
      errors
    );

    return (
      <>

        <div className="">

          <div className="">
            <ToastContainer></ToastContainer>
            <div className="row g-4 justify-content-center">
              <div className="col-12 col-lg-10 col-xl-9 col-xxl-8">
                <div className="">
                  <div className="card-body p-4 p-sm-5">
                    <Form onSubmit={handleSubmit} >
                      <div className="row g-4">
                        <div className="col-12">

                          <input
                            style={{ background: "#0C153B;" }}
                            className="form-control card shadow"
                            type="name"
                            autoComplete="off"
                            name="UserName"
                            id="UserName"
                            placeholder="User Name"
                            value={values.UserName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {touched.UserName && errors.UserName ? (
                            <p className="form-error">{errors.UserName}</p>
                          ) : null}
                        </div>

                        <div className="col-12">
                          <input
                            type="email"
                            className="form-control card shadow"
                            autoComplete="off"
                            name="Email"
                            id="Email"
                            placeholder="Email"
                            value={values.Email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.Email && touched.Email ? (
                            <p className="form-error">{errors.Email}</p>
                          ) : null}
                        </div>
                        <div className="col-12">

                          <div className="col-12">
                            <Select options={optionsRole} placeholder="Select a brand"
                              value={selectedOptionRole}
                              onChange={(e) => handleChangeSelectRole(e)}
                            />
                            {touched.Status && errors.Status ? (
                              <p className="form-error">{errors.Status}</p>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-12">
                          <Select options={options} placeholder="Select a brand"
                            value={selectedOption}
                            onChange={(e) => handleChangeSelect(e)}
                          />
                          {touched.Status && errors.Status ? (
                            <p className="form-error">{errors.Status}</p>
                          ) : null}
                        </div>
                        <div className="col-12">
                          <input
                            type="password"
                            className="form-control card shadow"
                            autoComplete="off"
                            name="Password"
                            id="Password"
                            placeholder="Password"
                            value={values.Password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {errors.Password && touched.Password ? (
                            <p className="form-error">{errors.Password}</p>
                          ) : null}
                        </div>
                        <div className="col-12">
                          <input
                            type="password"
                            autoComplete="off"
                            className="form-control card shadow"
                            name="ConfirmPassword"
                            id="ConfirmPassword"
                            placeholder="Confirm Password"
                          />
                          {errors.ConfirmPassword && touched.ConfirmPassword ? (
                            <p className="form-error">{errors.ConfirmPassword}</p>
                          ) : null}
                        </div>

                        <div className="col-12">
                          <input
                            className="btn btn-primary w-100 rounded-pill"
                            type="submit"
                            value={"Save"}
                          />
                        </div>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const SuspendedUserTable = () => {
    const [updateUser, response] = useUpdateUserMutation();
    const { data, responseInfo } = useGetSuspendedUserListQuery();

    const [posts, setPosts] = useState([]);
    // const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [termSearch, setTermSearch] = useState("");

    useEffect(() => {
      const fetchPosts = async () => {
        // setLoading(true);
        setPosts(data?.data);
      };
      fetchPosts();
    }, [data]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexofFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts?.slice(indexofFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    console.log("suspended user", data);
    return (
      <>
        <div className="container">
          <ToastContainer></ToastContainer>

          <div className="col-md-4">
            <form
              class="example"
              action=""
            >
              <input
                type="text"
                placeholder="Search.."
                autoFocus="autoFocus"
                value={termSearch}
                onChange={(event) => {
                  setTermSearch(event.target.value);
                }}
                name="search2"
              />
              <button
                type="submit"
              >
                <i class="fa fa-search"></i>
              </button>
            </form>
          </div>

          <div className="table-responsive border shadow-sm dashboard-table activity-table">
            <table
              className="table "

            >
              <thead className="table-dark">
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Status</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Activity</th>
                </tr>
              </thead>
              <tbody>

                {currentPosts?.filter((value) => {
                  if (termSearch == "") {
                    return value;
                  } else if (
                    value.username
                      .toLowerCase()
                      .includes(termSearch.toLowerCase())
                  ) {
                    return value;
                  } else if (
                    value.email.toLowerCase().includes(termSearch.toLowerCase())
                  ) {
                    return value;
                  }
                }).map((datas, key) => (

                  datas.status == 'inactive' ? (
                    <tr>
                      <th scope="row">{datas.username}</th>
                      <td>{datas.email}</td>
                      <td>{datas.role}</td>
                      <td>{datas.status}</td>
                      <td>{new Date(datas.create_date).toLocaleDateString()}</td>
                      <td>
                        <ul
                          style={{
                            display: "flex",
                            listStyle: "none",
                            gap: "1rem",
                            justifyContent: "center",
                            padding: "0px"
                          }}
                        >
                          <NavLink to={`/user-profile/${datas._id}`} >
                            <li ><i class="bi bi-eye-fill" title="View"></i></li>
                          </NavLink>
                          <NavLink  ><li onClick={() => {
                            updateUser({
                              user_id: datas._id,
                              status: "active"
                            })
                          }} ><i class="bi bi-check-circle-fill" title="Activate"></i></li></NavLink>

                        </ul>
                      </td>

                    </tr>
                  ) : null
                ))}
              </tbody>
            </table>
          </div>

          <div
            className="container"
            style={{
              marginTop: "2rem"
            }}
          >
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={posts?.length}
              paginate={paginate}
            />
          </div>
        </div>
      </>
    );
  };

  const DeletedUserTable = () => {

    const { data, responseInfo } = useGetDeletedUserListQuery();
    const [posts, setPosts] = useState([]);
    // const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [termSearch, setTermSearch] = useState("");

    useEffect(() => {
      const fetchPosts = async () => {
        // setLoading(true);
        setPosts(data?.data);
      };
      fetchPosts();
    }, [data]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexofFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts?.slice(indexofFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [updateUser, response] = useUpdateUserMutation();

    return (
      <>
        <div className="container">


          <ToastContainer></ToastContainer>
          <div className="col-md-4">
            <form
              class="example"
              action=""
            >
              <input
                type="text"
                placeholder="Search.."
                autoFocus="autoFocus"
                value={termSearch}
                onChange={(event) => {
                  setTermSearch(event.target.value);
                }}
                name="search2"
              />
              <button
                type="submit"
              >
                <i class="fa fa-search"></i>
              </button>
            </form>
          </div>
          <div className="table-responsive border shadow-sm dashboard-table activity-table">
            <table
              className="table"
            >
              <thead className="table-dark">
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Status</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Activity</th>
                </tr>
              </thead>
              <tbody>

                {
                  currentPosts?.filter((value) => {
                    if (termSearch == "") {
                      return value;
                    } else if (
                      value.username
                        .toLowerCase()
                        .includes(termSearch.toLowerCase())
                    ) {
                      return value;
                    } else if (
                      value.email.toLowerCase().includes(termSearch.toLowerCase())
                    ) {
                      return value;
                    }
                  })
                    .map((datas, index) => (
                      datas.status == 'blocked' ? (
                        <tr>
                          <th scope="row">{datas.username}</th>
                          <td>{datas.email}</td>
                          <td>{datas.role}</td>
                          <td>{datas.status}</td>
                          <td>{new Date(datas.create_date).toLocaleDateString()}</td>
                          <td>
                            <ul
                              style={{
                                display: "flex",
                                listStyle: "none",
                                gap: "1rem",
                                justifyContent: "center",
                              }}
                            >

                              <NavLink  ><li onClick={() => {
                                updateUser({
                                  user_id: datas._id,
                                  status: "active"
                                })
                              }} ><i class="bi bi-check-circle-fill" title="Activate"></i></li></NavLink>

                            </ul>
                          </td>

                        </tr>
                      ) : null
                    ))}
              </tbody>
            </table>
          </div>
          <div
            className="container"
            style={{
              marginTop: "2rem"
            }}
          >
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={posts?.length}
              paginate={paginate}
            />
          </div>
        </div>
      </>
    );
  };

  const EmailPending = () => {
    return (
      <>
        <div className="table-responsive border shadow-sm dashboard-table activity-table">
          <table
            className="table"
          >
            <thead className="table-dark">
              <tr>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
                <th scope="col">Created At</th>
                <th scope="col">Activity</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="admin-wrapper-table">
        <div
          className="container" >
          <div className='d-flex flex-wrap justify-content-end'>
            <div className=''>
              <div className='btn-right'>
                <Link className="btn btn-warning rounded-pill btn-sm w-10" to="/add-admin" >
                  Add Admin
                </Link>
              </div>
            </div>
          </div>
          <section className="content">
            <div className="user-management">
              <div className="row">
                <div className="col-12">
                  <div className="card card-primary card-outline card-outline-tabs">
                    {showUserTable ? <Table /> : null}
                    {showAddUser ? <AddUser /> : null}
                    {showSuspendedUser ? <SuspendedUserTable /> : null}
                    {showDeletedUser ? <DeletedUserTable /> : null}
                    {showEmailPending ? <EmailPending /> : null}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default User;