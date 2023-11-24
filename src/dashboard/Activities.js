import { useEffect, useState } from "react";
import LiveBidsData from "../data/dashboard/live-bids-data.json";
import { ToastContainer, toast } from "react-toastify";
import {
  useDeleteCategoryMutation,
  useGetActivitiesQueryQuery,
} from "../Store/Store";
import PaginationNew from "../pages/PaginationNew";
import Loader from "../components/loader/Loader";

const Activities = () => {
  // page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useGetActivitiesQueryQuery({
    page: currentPage,
    search: searchTerm, // Pass the search term to the query

  });
  console.log("data", data);
  const [postsPerPage] = useState(10);
  useEffect(() => {
    if (data) {
      setPosts(data?.data);
      console.log("History data:", data);
    }
  }, [data]);
  //   debugger;
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

  const [count, setCount] = useState(8);
  const countSlice = LiveBidsData.slice(0, count);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setPosts(data?.data?.info);
      console.log("all posts", posts);
    };
    fetchPosts();
  }, [data]);

  console.log("currentPosts", currentPosts)

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
                  <th scope="col">ID</th>
                  <th scope="col">User</th>
                  <th scope="col">Action</th>
                  <th scope="col">Ip</th>
                  <th scope="col">Status</th>
                  <th scope="col">Device</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts?.map((datas, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{datas.Email}</td>
                    <td>{datas?.Action}</td>
                    <td>{datas.Ip}</td>
                    <td>{datas.Status}</td>
                    <td>{datas.Device}</td>
                  </tr>
                ))}
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
    </>
  );
};

export default Activities;
