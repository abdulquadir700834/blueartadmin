import React, { useEffect, useState } from 'react'
import DashboardHeader from '../components/dashboard/header/DashboardHeader'
import { Link, NavLink } from 'react-router-dom';
import { useGetItemsQuery } from '../Store/Store';
import Pagination from './Pagination';
const Item = () => {
  const { data } = useGetItemsQuery();
  console.log(data)


  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [termSearch, setTermSearch] = useState("");


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

  return (
    <>
      <div className="admin-wrapper-table">
        <div
          className="container"
          style={{}}
        >

          <div className='row'>

            <div className='col-md-4'>
              <form
                class="example"
                action=""
                style={{}}
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
                  style={{

                  }}
                >
                  <i class="fa fa-search"></i>
                </button>
              </form>
            </div>
          </div>

          <div className="table-responsive border shadow-sm dashboard-table activity-table min-ht">
            <table className="table ">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Description</th>
                  <th scope="col">Price</th>
                  <th scope="col">Like count</th>
                  <th scope="col">Status</th>
                  <th scope="col" className='text-center'>Action</th>
                </tr>
              </thead>
              <tbody>

                {
                  currentPosts?.filter((value) => {
                    if (termSearch == "") {
                      return value;
                    } else if (
                      value.name
                        .toLowerCase()
                        .includes(termSearch.toLowerCase())
                    ) {
                      return value;
                    } else if (
                      value.description.toLowerCase().includes(termSearch.toLowerCase())
                    ) {
                      return value;
                    }
                  }).map((datas, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{datas.name}</td>
                      <td>
                      <img
                      src={`${process.env.REACT_APP_BACKEND_URL}/images/item/thumb/${datas.thumb}` }
                      alt="Avatar"
                      
                     
                    />
                      </td>
                      <td>{datas.description}</td>
                      <td>{datas.price}</td>
                      <td>{datas.like_count}</td>
                      <td>{datas.status}</td>

                      <td className='text-center'>
                        <NavLink to={`/items-list/viewItem/${datas._id}`}>View</NavLink>
                      </td>
                    </tr>
                  ))
                }

              </tbody>
            </table>

            <div className="container" style={{ marginTop: "2rem" }}>
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts?.length}
                paginate={paginate}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Item