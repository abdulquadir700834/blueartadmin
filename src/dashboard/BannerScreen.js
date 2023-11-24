import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Loader from "../components/loader/Loader";
import { useGetBannerdetailsListQuery } from "../Store/Store";
import PaginationNew from "../pages/PaginationNew";

const BannerScreen = ({ module }) => {
  // page
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useGetBannerdetailsListQuery({
    page: currentPage,
  });
  const [postsPerPage] = useState(10);
  useEffect(() => {
    if (data) {
      setPosts(data.data);
    }
  }, [data]);
  const totalCount = data?.count;
  const totalPages = Math.ceil(totalCount / postsPerPage);
  const currentPosts = data?.Info?.slice(0, 10) || [];
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // page
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setPosts(data?.info);
    };
    fetchPosts();
  }, [data]);

  return (
    <>
      <ToastContainer></ToastContainer>
      {isLoading && <Loader />}
      <div className="admin-wrapper-table">
        <div className="container">
          <p style={{ fontSize: "2rem", color: "#fff", fontWeight: "800" }}>
            Banner
          </p>
          <div className="table-responsive border shadow-sm dashboard-table activity-table min-ht">
            <table className="table">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Video</th>
                  <th scope="col" className="text-center">Edit</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts?.map((datas, index) => (
                  <>
                    {Object.entries(datas).map(([key, value,]) => (
                      key !== "createdAt" && key !== "updatedAt" && key !== "_id" && (
                        <tr key={key}>
                          <td>{key}</td>
                          <td>
                            <video className="banner-video-pre" controls>
                              <source src={value} type="video/mp4" />
                            </video>
                          </td>
                          <td className="text-center">
                            <Link
                              to={`/edit-banner/${key}/${encodeURIComponent(value)}`}
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
    </>
  );
};

export default BannerScreen;
