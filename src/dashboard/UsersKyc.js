import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LiveBidsData from "../data/dashboard/live-bids-data.json";
import PaginationNew from "../pages/PaginationNew";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../components/loader/Loader";
import {
  useDeleteCategoryMutation,
  useGetKycDetilsQueryQuery,
  useGetChooseArtistMutationMutation
} from "../Store/Store";
import CryptoJS from 'crypto-js';

const UserKyc = ({ module }) => {
  let navigate = useNavigate();
  // page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useGetKycDetilsQueryQuery({
    page: currentPage,
    search: searchTerm, // Pass the search term to the query
  });
  console.log("data", data);
  const [postsPerPage] = useState(10);
  useEffect(() => {
    if (data) {
      setPosts(data.data);
      console.log("History data:", data);
      console.log("History dataIIII:", data?.data[1]?.FeaturedArtist);
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

  console.log("currentPostsssss:", currentPosts)

  const handleSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1);
  };


  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // page

  const [count, setCount] = useState(8);
  const [noMorePost, setNoMorePost] = useState(false);
  const countSlice = LiveBidsData.slice(0, count);
  const [image, setImage] = useState("");
  const HtmlToReactParser = require("html-to-react").Parser;
  const [deleteCategory, responseInfo] = useDeleteCategoryMutation();
  const [artistData, responseInfo2] = useGetChooseArtistMutationMutation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ArtistItem, setArtistItem] = useState({})

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setPosts(data?.data?.info);
    };
    fetchPosts();
  }, [data]);

  const getArtistDataItem = async (_id, status) => {
    const Status = currentPosts.find((item) => item._id === _id).FeaturedArtist // Find the item with the matching _id and access its FeaturedArtist value
    console.log("statusValue:", !Status)
    const artistDataItem = await artistData({
      "UserId": _id,
      "FeaturedStatus": !Status
    }).then(res => setArtistItem(res?.data, "ress"))
    console.log(artistDataItem, "details")
  }

  useEffect(() => {
    if (responseInfo2?.data?.status === true) {
      console.log("responseInfoIII:", responseInfo2?.data?.info)
      toast?.success(responseInfo2?.data?.info)
      setTimeout(() => navigate("/userkyc"), 1000);
    } else if (responseInfo2?.data?.status === false) {
      toast?.error(responseInfo2?.data?.info)
    }
  }, [responseInfo2])

  return (
    <>
      <ToastContainer></ToastContainer>
      {isLoading && <Loader />}
      <div className="admin-wrapper-table">
        <div className="container">
          <p style={{ fontSize: "2rem", color: "#fff", fontWeight: "800" }}>
            User Listing
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
                  <th scope="col">ID</th>
                  <th scope="col">Email</th>
                  <th scope="col" className="text-center">
                    User Name
                  </th>
                  <th scope="col">Account Status</th>
                  <th scope="col">Role</th>
                  <th scope="col">Kyc Status</th>
                  {module?.UserModule?.Write && (
                    <th scope="col" className="text-center">
                      Edit
                    </th>
                  )}
                  {module?.UserModule?.Read && (
                    <th scope="col" className="text-center">
                      View
                    </th>
                  )}
                  <th scope="col" className="text-center">
                    Featured
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPosts?.map((datas, index) => {
                  const encryptedItemId = CryptoJS.AES.encrypt(datas?._id.toString(), process.env.REACT_APP_SECRET_PASS).toString();
                  console.log("kycencrypt:", encryptedItemId)
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{datas.Email}</td>
                      {console.log("dataemail:", datas.Email)}
                      <td className="text-center">
                        {datas.UserName ? datas.UserName : "-"}
                      </td>
                      <td>{datas.AccountStatus === 1 ? "Active" : "Inactive"}</td>
                      <td>{datas.Role}</td>
                      <td>{datas.KycStatus}</td>
                      {module?.UserModule?.Write &&
                        (datas.KycStatus === "not_uploaded" ? (
                          <td className="text-center">Not Edit</td>
                        ) : (
                          <td className="text-center">
                            <Link to={`/editKyc/${encodeURIComponent(encryptedItemId)}`}>
                              <i class="bi bi-pencil"></i>
                            </Link>
                          </td>
                        ))}
                      {module?.UserModule?.Read &&
                        (datas.KycStatus === "not_uploaded" ? (
                          <td className="text-center">Not view</td>
                        ) : (
                          <td className="text-center">
                            <Link to={`/viewKyc/${encodeURIComponent(encryptedItemId)}`}>
                              <i class="bi bi-eye-fill"></i>
                            </Link>
                          </td>
                        ))}
                      <td className="text-center">
                        {datas?.FeaturedArtist === true && datas?.Role === 'Artist' && datas?.Steps === 6 ? (
                          <td className="text-center">
                            <i class="bi-lock" onClick={() => getArtistDataItem(datas?._id)}></i>
                          </td>) : datas?.FeaturedArtist === false && datas?.Role === 'Artist' && datas?.Steps === 6 ? (
                            <td className="text-center">
                              <i class="bi-unlock" onClick={() => getArtistDataItem(datas?._id)}></i>
                            </td>

                          ) : null}
                      </td>
                    </tr>
                  )
                })}
                {currentPosts?.length === 0 && <tr><td colSpan={9} scope="col" className="text-center">No Records Found</td></tr>}
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

export default UserKyc;
