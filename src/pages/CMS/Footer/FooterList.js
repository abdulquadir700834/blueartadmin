import React, { useEffect, useState } from 'react'
import DashboardHeader from '../../../components/dashboard/header/DashboardHeader'
import { Link, NavLink } from 'react-router-dom';
import Pagination from '../../Pagination';
import { toast, ToastContainer } from "react-toastify";
import { useGetFooterListQuery, useDeleteFooterMutation } from '../../../Store/Store';

const FooterList = () => {
  const { data } = useGetFooterListQuery();
  console.log(data)
  const [deleteFooter, responseInfo] = useDeleteFooterMutation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setPosts(data?.data?.docs);
      console.log("all posts", posts)
    }
    fetchPosts()
  }, [data])

  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts?.slice(indexofFirstPost, indexOfLastPost)

  const paginate = pageNumber => setCurrentPage(pageNumber);


  useEffect(() => {

    if (responseInfo?.data?.status === true) {
      toast?.success(responseInfo?.data?.message)
      setTimeout(() => (window.location.href = "/footerList"), 2000);
    } else {
      toast?.error(responseInfo?.data?.message)
    }

  }, [responseInfo])
  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="admin-wrapper-table">
        <div className='row'>
          <div className='col-md-4'>
          </div>

          <div className='col-md-4 ms-auto'>
            <div className='btn-right'>
              <Link
                className="btn btn-warning rounded-pill btn-sm w-10 mt-25 mt-2"
                to="/footer/addFooter">
                Add Footer List
              </Link>
            </div>
          </div>

        </div>


        <div className="container">

          <div className="table-responsive border shadow-sm dashboard-table activity-table min-ht">
            <table className="table " >
              <thead className="table-dark">
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Menu Type</th>
                  <th scope="col">Menu</th>
                  <th scope="col">Link</th>
                  <th scope="col">Status</th>
                  <th scope="col" className='text-center'>Activity</th>
                </tr>
              </thead>
              <tbody>

                {
                  currentPosts?.map((datas, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{datas.menutype}</td>
                      <td>{datas.menu}</td>
                      <td>{datas.link}</td>
                      <td>{datas.status}</td>

                      <td >
                        <ul style={{ display: "flex", listStyle: "none", gap: "2rem", justifyContent: "center" }}>
                          <NavLink to={`/footer/editFooter/${datas._id}`}><li>Edit</li></NavLink>
                          <NavLink ><li onClick={() => { deleteFooter({ menu_id: datas._id }) }} >Delete</li></NavLink>
                        </ul>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>

          <div className="container" style={
            {

              marginTop: "2rem"

            }
          }>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={posts?.length}
              paginate={paginate}
            />
          </div>
        </div>

      </div>

    </>
  )
}

export default FooterList