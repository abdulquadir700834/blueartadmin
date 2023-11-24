import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Pagination from "../pages/Pagination";
import Loader from "../components/loader/Loader";
import { useGetTestimonialQuery } from "../Store/Store";
import CryptoJS from 'crypto-js';

const Testimonial = ({ module }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useGetTestimonialQuery({
    page: currentPage,
    search: searchTerm,
  });
  console.log("Testimonialdata", data)
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setPosts(data?.info);
      console.log("all posts", posts)
    }
    fetchPosts()
  }, [data])

  const totalCount = data?.count;
  const totalPages = Math.ceil(totalCount / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = data?.data?.filter((value) => {
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
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1);
  };


  return (
    <>
      <ToastContainer></ToastContainer>
      {isLoading && <Loader />}
      <div className="admin-wrapper-table">
        <div className="container" >
          <p style={{ fontSize: "2rem", color: "#fff", fontWeight: "800" }}>Testimonial</p>

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
                  <th scope="col">UserName</th>
                  <th scope="col">Email</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="text-center">Edit</th>
                  <th scope="col" className="text-center">More Info</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentPosts?.map((datas, index) => {
                    const encryptedItemId = CryptoJS.AES.encrypt(datas._id.toString(), process.env.REACT_APP_SECRET_PASS).toString();
                    return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{datas.UserName}</td>
                      <td>{datas.Email}</td>
                      <td>{datas.Status}</td>
                      <td className="text-center">
                        <Link
                          to={`/update-testimonial/${encodeURIComponent(encryptedItemId)}`}
                        >
                          <i class="bi bi-pencil-fill text-white"></i>
                        </Link>
                      </td>
                      <td className="text-center">
                        <Link
                          to={`/testimonial-list-info/${encodeURIComponent(encryptedItemId)}`}
                        >
                          <i class="bi bi-info-circle text-white"></i>
                        </Link></td>
                    </tr>
                  )
                })}
                {currentPosts?.length === 0 && <tr><td colSpan={6} scope="col" className="text-center">No Records Found</td></tr>}
              </tbody>
            </table>

            <div className="container" style={{ marginTop: "2rem" }}>
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={totalCount}
                paginate={paginate}
                totalPages={totalPages}
                currentPage={currentPage}
              />
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Testimonial;