import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useCsvSampleListQuery } from "../../Store/Store";
import PaginationNew from "../PaginationNew";
import Loader from "../../components/loader/Loader";
import CryptoJS from 'crypto-js';

const CSVSampleList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const { data: getCsvList, refetch } = useCsvSampleListQuery({
    page: currentPage,
    search: searchTerm,
  });

  const [posts, setPosts] = useState([]);
  const [isLoading1, setIsLoading] = useState(false);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [csvSampleListState, setCsvSampleListState] = useState([])

  console.log("getCsvList:", getCsvList)
  useEffect(() => {
    setIsLoading(true)
    if (getCsvList) {
      refetch()
      setCsvSampleListState(getCsvList)
      setIsLoading(false)
    }
  }, [getCsvList])

  console.log("loading status:",isLoading1 )


  const totalCount = csvSampleListState?.count;
  const totalPages = Math.ceil(totalCount / postsPerPage);
  const currentPosts = csvSampleListState?.data?.filter((value) => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1);
  };

  const handleDownload = (sampleUrl) => {
    const link = document.createElement('a');
    link.href = sampleUrl;
    // Extract the filename from the URL
    const urlParts = sampleUrl.split('/');
    const filename = urlParts[urlParts.length - 2];
    link.download = filename;
    link.click();
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <>
      {isLoading1 && <Loader />}
      <ToastContainer></ToastContainer>
      <div className="admin-wrapper-table">
        <div className="container" >
          <p style={{ fontSize: "2rem", color: "#fff", fontWeight: "800" }}>
            CSV Sample List
          </p>
          <div className='row'>
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
          <br />

          <div className="table-responsive border shadow-sm dashboard-table activity-table min-ht">
            <table className="table">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Type</th>
                  <th scope="col">Created At</th>
                  <th scope="col">Updated At</th>
                  <th scope="col" className="text-center">Sample</th>
                  <th scope="col" className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentPosts?.map((datas, index) => {
                    const encryptedItemId = CryptoJS.AES.encrypt(datas._id.toString(), process.env.REACT_APP_SECRET_PASS).toString();
                    return (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{datas.Type}</td>
                        <td>{datas.createdAt}</td>
                        <td>{datas.updatedAt}</td>
                        <td className="text-center">
                          <button className="btn btn-primary"
                            onClick={() => handleDownload(datas.Sample)}
                          >Download</button>
                          &nbsp;
                        </td>
                        <td className="text-center">
                          <Link to={`/edit-csvsample/${encodeURIComponent(encryptedItemId)}?datas=${encodeURIComponent(JSON.stringify(datas))}`}>
                            <button className="btn btn-primary">Edit</button>
                          </Link>&nbsp;
                        </td>
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
    </>
  )
}

export default CSVSampleList;