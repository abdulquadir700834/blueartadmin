import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Pagination from "../pages/Pagination";
import { Modal } from 'react-bootstrap';
import Loader from "../components/loader/Loader";
import { useGetFeaturesListQuery } from "../Store/Store";
import CryptoJS from 'crypto-js';

const Features = ({ module }) => {
  // page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useGetFeaturesListQuery({
    page: currentPage,
    search: searchTerm,
  });
  console.log("data", data);
  const [postsPerPage] = useState(10);
  const [isImageBig, setIsImageBig] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (data) {
      setPosts(data.data);
      console.log("History data:", data);
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

  const toggleImageSize = () => {
    setIsImageBig(!isImageBig);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsImageBig(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); 
    setCurrentPage(1); 
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
            <div className="col-md-4 ms-auto">
              <div className="btn-right">
                <Link
                  className="btn btn-warning rounded-pill btn-sm w-10"
                  to="/add-features"
                >
                  Add Features
                </Link>
              </div>
            </div>
          </div>
          <div className="table-responsive border shadow-sm dashboard-table activity-table min-ht">
            <table className="table">
              <thead className="table-dark">
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Name</th>
                  <th scope="col">Image</th>
                  <th scope="col">Publish Date</th>
                  <th scope="col">Status</th>
                  {module?.NewsModule?.Write && (
                    <th scope="col" className="text-center">
                      Edit
                    </th>
                  )}

                  {module?.NewsModule?.Read && (
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
                      <td>{datas.Name}</td>
                      <td>
                        <img src={datas.Image}
                          onClick={() => handleImageClick(datas.Image)} />
                      </td>
                      <td>{new Date(datas.PublishDate).toLocaleDateString()}</td>
                      <td>{datas.Status}</td>

                      {module?.NewsModule?.Write && (
                        <td className="text-center">
                          <Link to={`/edit-features/${encodeURIComponent(encryptedItemId)}`}>
                            <i class="bi bi-pencil"></i>
                          </Link>
                        </td>
                      )}
                      {module?.NewsModule?.Read && (
                        <td className="text-center">
                          <Link to={`/view-features/${encodeURIComponent(encryptedItemId)}`}>
                            <i class="bi bi-eye-fill"></i>
                          </Link>
                        </td>
                      )}
                    </tr>
                  )
                })}
                {currentPosts?.length === 0 && <tr><td colSpan={7} scope="col" className="text-center">No Records Found</td></tr>}
              </tbody>
            </table>

            <div className="container" style={{ marginTop: "2rem" }}>
              <Pagination
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

      <Modal show={isImageBig} onHide={toggleImageSize} centered>
        <Modal.Body>
          {selectedImage && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={selectedImage}
                style={{ maxWidth: "100%", }}
                alt="Expanded Image"
              />
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Features;
