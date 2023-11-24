import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import DashboardHeader from '../../../components/dashboard/header/DashboardHeader';
import { useGetCareerQuery } from '../../../Store/Store';
import { toast, ToastContainer } from "react-toastify";
import { useDeleteCareerMutation } from '../../../Store/Store'
import Pagination from '../../Pagination';
const Career = () => {
  const { data } = useGetCareerQuery();
  console.log(data)
  const [deleteCareer, responseInfo] = useDeleteCareerMutation();
  console.log("deleteInfo", responseInfo);


  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");


  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setPosts(data?.result);
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
    } else {
      toast?.error(responseInfo?.data?.message)
    }

  }, [responseInfo])


  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="admin-wrapper-table">
        <div className="container">
          <div className='row'>
            <div className='col-md-4'>
            </div>

            <div className='col-md-4 ms-auto'>
              <div className='btn-right'>
                <Link className="btn btn-warning rounded-pill btn-sm w-10 mt-25 mt-2"
                  to="/career/addCareer">
                  Add Career
                </Link>
              </div>
            </div>

          </div>


          <div className="table-responsive border shadow-sm dashboard-table activity-table min-ht">
            <table className="table ">
              <thead className="table-dark">
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Name</th>
                  <th scope="col">URL</th>
                  <th scope="col">Status</th>
                  <th scope="col" className='text-center'>Activity</th>
                </tr>
              </thead>
              <tbody>

                {
                  currentPosts?.map((datas, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{datas.name}</td>
                      <td>{datas.url}</td>
                      <td>{datas.status}</td>

                      <td >
                        <ul style={{
                          display: "flex", listStyle: "none", gap: "2rem", justifyContent: "center",
                          alignItems: "center"
                        }}>
                          <NavLink to={`/career/editCareer/${datas._id}`}><li>Edit</li></NavLink>
                          <NavLink ><li onClick={() => { deleteCareer({ id: datas._id }) }}>Delete</li></NavLink>
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

export default Career