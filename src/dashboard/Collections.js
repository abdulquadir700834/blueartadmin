import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import PaginationNew from "../pages/PaginationNew";
import { useGetCollectionsQuery } from "../Store/Store";
import { Modal } from 'react-bootstrap';
import Loader from "../components/loader/Loader";
import CryptoJS from 'crypto-js';

const Collections = ({ }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useGetCollectionsQuery({
    page: currentPage,
    search: searchTerm,
  });
  const [posts, setPosts] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [isImageBig, setIsImageBig] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setPosts(data?.data);
    }
    fetchPosts()
  }, [data])

  const totalCount = data?.count;
  const totalPages = Math.ceil(totalCount / postsPerPage);
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

  const toggleImageSize = () => {
    setIsImageBig(!isImageBig);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsImageBig(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setCurrentPage(1); // Reset the current page to 1
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      {isLoading && <Loader />}
      <div className="admin-wrapper-table">
        <div className="container" >
          <p style={{ fontSize: "2rem", color: "#fff", fontWeight: "800" }}>Collections</p>
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
                  <th scope="col">Email</th>
                  <th scope="col" className="text-center">Thumb</th>
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
                        <td>{datas.Name}</td>
                        <td>{datas.Currency}</td>
                        <td>{datas.Email}</td>
                        <td className="text-center">
                          <img src={datas.Thumb} height={50} width={50}
                            onClick={() => handleImageClick(datas.Thumb)} />
                        </td>
                        <td className="text-center">
                          <Link
                            to={`/collection-more-info/${encodeURIComponent(encryptedItemId)}`}
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
  )
}

export default Collections;