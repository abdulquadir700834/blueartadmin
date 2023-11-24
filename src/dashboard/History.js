import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { useGetHistoryQuery } from "../Store/Store";
import PaginationNew from "../pages/PaginationNew";
import Loader from "../components/loader/Loader";

const History = ({ module }) => {
  // page
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useGetHistoryQuery({
    page: currentPage,
  });
  const [postsPerPage] = useState(10);
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

  useEffect(() => {
    if (data) {
      setPosts(data.data);
    }
  }, [data]);
  const totalCount = data?.count;
  const totalPages = Math.ceil(totalCount / postsPerPage);
  const currentPosts = data?.data?.slice(0, 10) || [];
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <>
      <ToastContainer></ToastContainer>
      {isLoading && <Loader />}
      <div className="admin-wrapper-table">
        <div className="container">
          <p style={{ fontSize: "2rem", color: "#fff", fontWeight: "800" }}>
            History
          </p>
          <div className="table-responsive border shadow-sm dashboard-table activity-table min-ht">
            <table className="table">
              <thead className="table-dark">
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col" className="text-center">
                    From Email
                  </th>
                  <th scope="col" className="text-center">
                    From Username
                  </th>
                  <th scope="col">To Email</th>
                  <th scope="col">To Username</th>
                  <th scope="col">HistoryType</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts?.map((datas, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td className="text-center">
                      {datas.FromEmail.length === 0 ? "-" : datas.FromEmail}
                    </td>
                    <td className="text-center">
                      {datas.FromUserName.length === 0
                        ? "-"
                        : datas.FromUserName}{" "}
                    </td>
                    <td>{datas.ToEmail.length === 0 ? "-" : datas.ToEmail}</td>
                    <td>
                      {datas.ToUserName.length === 0 ? "-" : datas.ToUserName}
                    </td>
                    <td>
                      {datas.HistoryType.length === 0 ? "-" : datas.HistoryType}
                    </td>
                    <td>{datas.Price ? datas.Price : "-"}</td>
                  </tr>
                ))}
                {currentPosts?.length === 0 && <tr><td colSpan={7} scope="col" className="text-center">No Records Found</td></tr>}

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

export default History;
