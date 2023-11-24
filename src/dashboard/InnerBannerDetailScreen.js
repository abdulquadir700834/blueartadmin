import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "../components/loader/Loader";
import { useGetInnerBannerdetailsListQuery } from "../Store/Store";
import PaginationNew from "../pages/PaginationNew";
import { Modal } from 'react-bootstrap';
import CryptoJS from 'crypto-js';

const InnerBannerDetailScreen = ({ module }) => {
  // page
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useGetInnerBannerdetailsListQuery({
    page: currentPage,
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
  const currentPosts = data?.Info?.slice(0, 10) || [];
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // page
  console.log("currentPostsBanner:", currentPosts)
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isImageBig, setIsImageBig] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  return (
    <>
      <ToastContainer></ToastContainer>
      {isLoading && <Loader />}
      <div className="admin-wrapper-table">
        <div className="container">
          <p style={{ fontSize: "2rem", color: "#fff", fontWeight: "800" }}>
            Inner Banner
          </p>
          <div className="table-responsive border shadow-sm dashboard-table activity-table min-ht">
            <table className="table">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Image</th>
                  <th scope="col" className="text-center">Edit</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts?.map((datas, index) => (
                  <>
                    {Object.entries(datas).map(([key, value]) => (
                      key !== "_id" && key !== "updatedAt" && key !== "createdAt" && (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>
                            <img
                              src={value}
                              onClick={() => handleImageClick(value)} />
                          </td>
                          <td className="text-center">
                            <Link
                              to={`/edit-inner-banner/${key}/${encodeURIComponent(value)}`}
                            >
                              <button className="btn btn-primary">Edit</button>
                            </Link></td>
                        </tr>
                      )
                    ))}
                  </>
                ))}
                {currentPosts?.length === 0 && <tr><td colSpan={3} scope="col" className="text-center">No Records Found</td></tr>}
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
  );
};

export default InnerBannerDetailScreen;
