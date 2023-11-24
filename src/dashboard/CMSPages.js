import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "../components/loader/Loader";
import { useGetCmsPagesListQuery } from "../Store/Store";
import PaginationNew from "../pages/PaginationNew";
import CryptoJS from 'crypto-js';

const CMSPages = ({ module }) => {
  // page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useGetCmsPagesListQuery({
    page: currentPage,
    search: searchTerm,
  });
  console.log("data", data);
  const [postsPerPage] = useState(10);
  useEffect(() => {
    if (data) {
      setPosts(data.data);
      console.log("CMSPage:", data);
    }
  }, [data]);
  const totalCount = data?.count;
  const totalPages = Math.ceil(totalCount / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // page

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setPosts(data?.info);
      console.log("all posts", posts);
    };
    fetchPosts();
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Perform the search action here
    setCurrentPage(1); // Reset the current page to 1
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      {isLoading && <Loader />}
      <div className="admin-wrapper-table">
        <div className="container">
          <div className="row">
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
          </div>
          <div className="table-responsive border shadow-sm dashboard-table activity-table min-ht">
            <table className="table">
              <thead className="table-dark">
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Title</th>
                  {module?.CMSModule?.Write && (
                    <th scope="col" className="text-center">
                      Edit
                    </th>
                  )}
                  {module?.CMSModule?.Read && (
                    <th scope="col" className="text-center">
                      View
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {currentPosts?.map((datas, index) => {
                  const encryptedItemId = CryptoJS.AES.encrypt(datas?._id.toString(), process.env.REACT_APP_SECRET_PASS).toString();
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{datas.Page}</td>
                      {module?.CMSModule?.Write && (
                        <td className="text-center">
                          <Link to={`/edit-cms-info/${encodeURIComponent(encryptedItemId)}`}>
                            <i class="bi bi-pencil"></i>
                          </Link>
                        </td>
                      )}
                      {module?.CMSModule?.Read && (
                        <td className="text-center">
                          <Link to={`/view-cms-info/${encodeURIComponent(encryptedItemId)}`}>
                            <i class="bi bi-eye-fill"></i>
                          </Link>
                        </td>
                      )}
                    </tr>
                  )
                })}
                {currentPosts?.length === 0 && <tr><td colSpan={4} scope="col" className="text-center">No Records Found</td></tr>}
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
  );
};

export default CMSPages;
