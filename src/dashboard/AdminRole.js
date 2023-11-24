import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Dropdown from "react-bootstrap/Dropdown";
import LiveBidsData from "../data/dashboard/live-bids-data.json";
import Pagination from "../pages/Pagination";
import Loader from "../components/loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import {
  useGetCategoryQuery,
  useDeleteCategoryMutation,
  useGetAdminRoleQueryQuery,
} from "../Store/Store";
import CryptoJS from 'crypto-js';

const AdminRole = () => {
  // page
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useGetAdminRoleQueryQuery({
    page: currentPage,
    search: searchTerm,
  });
  console.log("data", data);
  const [postsPerPage] = useState(10);
  useEffect(() => {
    if (data) {
      setPosts(data.data);
      console.log("History data:", data);
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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // page

  const [count, setCount] = useState(8);
  const [noMorePost, setNoMorePost] = useState(false);
  const countSlice = LiveBidsData.slice(0, count);
  const [deleteCategory, responseInfo] = useDeleteCategoryMutation();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Perform the search action here
    setCurrentPage(1); // Reset the current page to 1
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setPosts(data?.info);
      console.log("all posts", posts);
    };
    fetchPosts();
  }, [data]);
  useEffect(() => {
    if (responseInfo?.data?.status === true) {
      toast?.success(responseInfo?.data?.message);
    } else {
      toast?.error(responseInfo?.data?.message);
    }
  }, [responseInfo]);
  const handleLoadMore = () => {
    setCount(count + 4);
    if (count >= LiveBidsData.length) {
      setNoMorePost(true);
    }
  };
  const clockTime = ({ days, hours, minutes, seconds }) => {
    return (
      <div className="bid-ends">
        <div>
          <span className="days">{days}</span>
          <span>Days</span>
        </div>
        <div>
          <span className="hours">{hours}</span>
          <span>Hours</span>
        </div>
        <div>
          <span className="minutes">{minutes}</span>
          <span>Min</span>
        </div>
        <div>
          <span className="seconds">{seconds}</span>
          <span>Sec</span>
        </div>
      </div>
    );
  };

  const LiveBidCards = countSlice.map((elem, index) => (
    <div key={index} className="col-12 col-sm-6 col-xl-4 col-xxl-3">
      <div className="nft-card card shadow-sm">
        <div className="card-body">
          <div className="img-wrap">
            {/* Image */}
            <img
              src={`${process.env.PUBLIC_URL}/${elem.image}`}
              alt={elem.title}
            />

            {/* Badge */}
            <div
              className={`badge bg-${elem.badgeInfo[0].color} position-absolute section-${elem.badgeInfo[0].visibility}`}
            >
              <img
                src={`${process.env.PUBLIC_URL}/${elem.badgeInfo[0].icon}`}
                alt={elem.badgeInfo[0].text}
              />
              {elem.badgeInfo[0].text}
            </div>

            {/* Dropdown */}
            <Dropdown className={`section-${elem.dropdownVisibility}`}>
              <Dropdown.Toggle
                className="rounded-pill shadow-sm"
                id={`discoverID${elem.id}`}
              >
                <i className="bi bi-three-dots-vertical" />
              </Dropdown.Toggle>

              <Dropdown.Menu align="end">
                {elem.dropdownInfo.map((item, index) => (
                  <Link
                    key={index}
                    className="dropdown-item"
                    to={item.dropdownItemURL}
                  >
                    <i className={`me-2 bi ${item.dropdownItemIcon}`}></i>
                    {item.dropdownItemText}
                  </Link>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            {/* Bid End */}
            <Countdown
              date={elem.bidEndsTime}
              intervalDelay={0}
              renderer={clockTime}
            />
          </div>

          {/* Others Info */}
          <div className="row gx-2 align-items-center mt-3">
            <div className="col-8">
              <span className="d-block fz-12">
                <i className={`bi ${elem.topLevelInfo[0].icon} me-1`} />
                {elem.topLevelInfo[0].text}
              </span>
            </div>
            <div className="col-4 text-end">
              <button className="wishlist-btn" type="button">
                <i className="bi" />
              </button>
            </div>
          </div>

          {/* Meta Info */}
          <div className="row gx-2 align-items-center mt-2">
            <div className="col-8">
              <div className="name-info d-flex align-items-center">
                <div className="author-img position-relative">
                  <img
                    className="shadow"
                    src={`${process.env.PUBLIC_URL}/${elem.authorAvater}`}
                    alt={elem.authorName}
                  />
                  <i
                    className={`bi bi-check position-absolute bg-success ${elem.authorVerified}`}
                  />
                </div>

                <div className="name-author">
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip id={`liveAuctionNFT${elem.id}`}>
                        {elem.title}
                      </Tooltip>
                    }
                  >
                    <Link
                      className="name d-block hover-primary text-truncate"
                      to={`${process.env.PUBLIC_URL}/live-bid/${elem.id}`}
                    >
                      {elem.title}
                    </Link>
                  </OverlayTrigger>
                  <Link
                    className="author d-block fz-12 hover-primary text-truncate"
                    to={`${process.env.PUBLIC_URL}/author/${elem.authorName}`}
                  >
                    @{elem.authorName}
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-4">
              <div className="price text-end">
                <span className="fz-12 d-block">{elem.priceText}</span>
                <h6 className="mb-0">{elem.currentPrice}</h6>
              </div>
            </div>

            <div className="col-12">
              <Link
                className={`btn btn-${elem.buttonInfo[0].style} rounded-pill btn-sm mt-3 w-100`}
                to={elem.buttonInfo[0].url}
              >
                <i className={`bi ${elem.buttonInfo[0].icon} me-1`}></i>
                {elem.buttonInfo[0].text}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

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
                  to="/addRoleAdmin"
                >
                  Add Role
                </Link>
              </div>
            </div>
          </div>

          <div className="table-responsive border shadow-sm dashboard-table activity-table min-ht">
            <table className="table">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Role</th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPosts?.map((datas, index) => {
                  const encryptedItemId = CryptoJS.AES.encrypt(datas._id.toString(), process.env.REACT_APP_SECRET_PASS).toString();
                  return (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{datas.Role}</td>
                      <td className="text-center">
                        <Link to={`/edit-role/${encodeURIComponent(encryptedItemId)}`}>
                          <button className="btn btn-primary">Edit</button>
                        </Link>
                      </td>
                    </tr>
                  )
                })}
                {currentPosts?.length === 0 && <tr><td colSpan={3} scope="col" className="text-center">No Records Found</td></tr>}
              </tbody>
            </table>

            <div className="container" style={{ marginTop: "2rem" }}>
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={data?.data?.length}
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

export default AdminRole;
