import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Modal } from 'react-bootstrap';
import { useGetCategoryQuery, } from "../Store/Store";
import PaginationNew from "../pages/PaginationNew";
import Loader from "../components/loader/Loader";
import CryptoJS from 'crypto-js';

const Category = ({ module }) => {
  // page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading, } = useGetCategoryQuery({
    page: currentPage,
    search: searchTerm,
  });
  const [postsPerPage] = useState(10);
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
  const [isImageBig, setIsImageBig] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
                  to="/add-category"
                >
                  Add Category
                </Link>
              </div>
            </div>
          </div>

          <div className="table-responsive border shadow-sm dashboard-table activity-table min-ht">
            <table className="table">
              <thead className="table-dark">
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Category Name</th>
                  <th scope="col">Status</th>
                  <th scope="col">Image</th>
                  {module?.CategoriesModule?.Write && (
                    <th scope="col" className="text-center">
                      Edit
                    </th>
                  )}
                  {module?.CategoriesModule?.Read && (
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
                      <td>{datas.Title}</td>
                      <td>{datas.Status}</td>
                      <td><img src={datas.Image}
                      alt=""
                        onClick={() => handleImageClick(datas.Image)} />
                      </td>
                      {module?.CategoriesModule?.Write && (
                        <td className="text-center">
                          <Link to={`/edit-category/${encodeURIComponent(encryptedItemId)}`}>
                            <i class="bi bi-pencil"></i>
                          </Link>
                        </td>
                      )}
                      {module?.CategoriesModule?.Read && (
                        <td className="text-center">
                          <Link to={`/view-category/${encodeURIComponent(encryptedItemId)}`}>
                            <i class="bi bi-eye-fill"></i>
                          </Link>
                        </td>
                      )}
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
                alt="Expanded"
              />
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Category;
