import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Pagination from "../pages/Pagination";
import { Modal } from 'react-bootstrap';
import Loader from "../components/loader/Loader";
import { useGetArtProductListQuery, } from "../Store/Store";
import CryptoJS from 'crypto-js';

const ArtProductListing = ({ module }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useGetArtProductListQuery({
    page: currentPage,
    search: searchTerm,
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [isImageBig, setIsImageBig] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setPosts(data?.data);
    };
    fetchPosts();
  }, [data]);

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

  console.log("currentPosts", currentPosts);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
          <p style={{ fontSize: "2rem", color: "#fff", fontWeight: "800" }}>
            Art Product Listing
          </p>

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
                  <th scope="col">Title</th>
                  <th scope="col">UserName</th>
                  <th scope="col">Email</th>
                  <th scope="col">Image</th>
                  <th scope="col">Status</th>
                  <th scope="col">CreatedAt</th>
                  <th scope="col">UpdatedAt</th>
                  <th scope="col" className="text-center">
                    More Info
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPosts?.map((datas, index) => {
                  const encryptedItemId = CryptoJS.AES.encrypt(datas._id.toString(), process.env.REACT_APP_SECRET_PASS).toString();
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{datas.Title}</td>
                      <td>{datas.UserName}</td>
                      <td>{datas.Email}</td>
                      <td>
                        <img src={datas.Thumb} height={50} width={50}
                          onClick={() => handleImageClick(datas.Thumb)}
                        />
                      </td>
                      <td>{datas.ApproveStatus ? "Active" : "Inactive"}</td>
                      <td>{new Date(datas.createdAt).toLocaleDateString()}</td>
                      <td>{new Date(datas.updatedAt).toLocaleDateString()}</td>
                      <td className="text-center">
                        <Link to={`/artproductlisting-more-info/${encodeURIComponent(encryptedItemId)}`}>
                          <i class="bi bi-info-circle text-white"></i>
                        </Link>
                      </td>
                    </tr>
                  )
                })}
                {currentPosts?.length === 0 && <tr><td colSpan={9} scope="col" className="text-center">No Records Found</td></tr>}
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

export default ArtProductListing;
