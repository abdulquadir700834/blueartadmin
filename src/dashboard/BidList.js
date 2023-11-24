import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Pagination from "../pages/Pagination";
import Loader from "../components/loader/Loader";
import { useGetBidListQuery } from "../Store/Store";

const BidList = ({ module }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useGetBidListQuery({
    page: currentPage,
    search: searchTerm,
  });
  console.log("data", data)
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

  const totalCount = posts?.count;
  const totalPages = Math.ceil(totalCount / postsPerPage);
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


  return (
    <>
      <ToastContainer></ToastContainer>
      {isLoading && <Loader />}
      <div className="admin-wrapper-table">
        <div className="container" >
          <p style={{ fontSize: "2rem", color: "#fff", fontWeight: "800" }}>Bid List</p>

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
                  <th scope="col">Item Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Sender Email</th>
                  <th scope="col">Receiver Email</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {
                currentPosts?.map((datas, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{datas.ItemName}</td>
                      <td>{datas.Price}</td>
                      <td>{datas.SenderEmail}</td>
                      <td>{datas.ReceiverEmail}</td>
                      <td>{datas.Status}</td>
                    </tr>
                  )) 
                }
                 {currentPosts?.length === 0 && <tr><td colSpan={6} scope="col" className="text-center">No Records Found</td></tr>}
              </tbody>
            </table>

            <div className="container" style={{ marginTop: "2rem" }}>
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts?.length}
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

export default BidList;