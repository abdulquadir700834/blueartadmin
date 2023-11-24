import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import PaginationNew from "../pages/PaginationNew";
import { useGetNetworkQuery, useNetworkOtpdetailQuery } from "../Store/Store";
import Loader from "../components/loader/Loader";
import CryptoJS from 'crypto-js';
import { Link, useNavigate, useParams } from 'react-router-dom'

const Network = ({ module }) => {
  let navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useGetNetworkQuery({
    page: currentPage,
    search: searchTerm,
  });

  const network2fa = useNetworkOtpdetailQuery({})

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setPosts(data?.data);
      console.log("all posts", posts)
    }
    fetchPosts()
  }, [data])

  const totalCount = data?.count;
  const totalPages = Math.ceil(totalCount / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = posts?.filter((value) => {
    if (searchTerm === "") {
      return true;
    } else {
      for (const property in value) {
        if (
          value[property] &&
          value[property].toString().toLowerCase().includes(searchTerm.toLowerCase())
        ) {
          return true;
        }
      }
      return false;
    }
  })?.slice(0, 10) || [];

  console.log("currentPosts", currentPosts)
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setCurrentPage(1); // Reset the current page to 1
  };


  const handleEditClick = (_id) => {
    if (network2fa.data && network2fa.data.message) {
      sessionStorage.setItem("networkToken", network2fa?.data?.response);
      console.log("networkResponse:", network2fa?.data?.response)
      toast.success(network2fa.data.message);
      navigate(`/network-verify-otp/${_id}`);
    }
  };
  console.log("network2fa:", network2fa)
  return (
    <>
      <ToastContainer></ToastContainer>
      {isLoading && <Loader />}
      <div className="admin-wrapper-table">
        <div className="container" >
          <p style={{ fontSize: "2rem", color: "#fff", fontWeight: "800" }}>Network</p>

          <div className='col-md-4'>
            <form onSubmit={handleSubmit}
              class="example"
              action="">
              <input
                type="text"
                placeholder="Search.."
                autoFocus="autoFocus"
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
                name="search2"
              />
              <button
                type="submit" >
                <i class="fa fa-search"></i>
              </button>
            </form>
          </div>
          <div className="table-responsive border shadow-sm dashboard-table activity-table min-ht">
            <table className="table">
              <thead className="table-dark">
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Currency</th>
                  <th scope="col">ChainID</th>
                  {
                    module?.NetworkModule?.Write &&
                    <th scope="col" className="text-center">Edit</th>
                  }
                  {
                    module?.NetworkModule?.Read &&
                    <th scope="col" className="text-center">View</th>
                  }
                </tr>
              </thead>
              <tbody>
                {
                  currentPosts?.map((datas, index) => {
                    const encryptedItemId = CryptoJS.AES.encrypt(datas._id.toString(), process.env.REACT_APP_SECRET_PASS).toString();

                    return (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{datas.Name}</td>
                        <td>{datas.Currency}</td>
                        <td>{datas.ChainID}</td>
                        {
                          module?.NetworkModule?.Write && (
                            <td className="text-center">
                              <i onClick={() => handleEditClick(encodeURIComponent(encryptedItemId))} class="bi bi-pencil"></i>
                            </td>
                          )
                        }

                        {
                          module?.NetworkModule?.Read && (
                            <td className="text-center">
                              <Link to={`/network-view/${encodeURIComponent(encryptedItemId)}`}>
                                <i class="bi bi-eye-fill"></i>
                              </Link>
                            </td>
                          )
                        }
                      </tr>
                    )
                  })}
                {currentPosts?.length === 0 && <tr><td colSpan={6} scope="col" className="text-center">No Records Found</td></tr>}
              </tbody>
            </table>

            <div className="container" style={{ marginTop: "2rem" }}>
              <PaginationNew
                postsPerPage={postsPerPage}
                totalPosts={totalCount}
                totalPages={totalPages}
                currentPage={currentPage}
                paginate={paginate}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Network;