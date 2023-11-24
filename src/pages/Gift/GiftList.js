import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useGetGiftNFTListQuery } from "../../Store/Store";
import PaginationNew from "../PaginationNew";
import Loader from "../../components/loader/Loader";
import { Modal } from 'react-bootstrap';
import CryptoJS from 'crypto-js';


const GiftList = () => {

  const [count, setCount] = useState(8);
  const [noMorePost, setNoMorePost] = useState(false);
  const [image, setImage] = useState('');
  const HtmlToReactParser = require('html-to-react').Parser

  const [isImageBig, setIsImageBig] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

const toggleImageSize = () => {
    setIsImageBig(!isImageBig);
  };

  const handleImageClick = (imageSrc) => {
    setSelectedImage(imageSrc);
    setIsImageBig(true);
  };

  const { data: getGiftNFTList, isLoading, refetch }  = useGetGiftNFTListQuery({
    page: currentPage,
    search: searchTerm,
  });

  const [posts, setPosts] = useState([]);
  const [isLoading1, setIsLoading] = useState(false);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [GiftNFTListState, setGiftNFTListState] = useState([])

  useEffect(() => {
    setIsLoading(true)
    console.log("getGiftNFTList", getGiftNFTList);
    if (getGiftNFTList) {
       refetch();
      setIsLoading(false)
      setGiftNFTListState(getGiftNFTList)
      setPosts(getGiftNFTList?.data?.data)
    }
  }, [getGiftNFTList])

  const totalCount = GiftNFTListState?.count;
  const totalPages = Math.ceil(totalCount / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = GiftNFTListState?.data?.filter((value) => {
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

  console.log("currentpostsGiftlist:", currentPosts)
  console.log("currentpostsGiftlistposts:", getGiftNFTList?.data)

  const handleSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1); 
  };

  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <>
      {isLoading && <Loader />}
      <ToastContainer></ToastContainer>
      <div className="admin-wrapper-table">
        <div className="container" >
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

            <div className='col-md-4 ms-auto'>
              <div className='btn-right'>
                <Link to={"/create-gift"} className="btn btn-primary rounded-pill btn-sm  mt-3">Add Gift</Link>
              </div>              
            </div>
          </div>
          <br />

          <div className="table-responsive border shadow-sm dashboard-table activity-table min-ht">
            <table className="table">
              <thead className="table-dark">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Thumb</th>
                  <th scope="col">Media</th>
                  <th scope="col">Currency</th>
                  <th scope="col">Status</th>
                  <th scope="col">Minted User</th>
                  <th scope="col" className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentPosts?.map((datas, index) => {
                    const encryptedItemId = CryptoJS.AES.encrypt(datas?._id.toString(), process.env.REACT_APP_SECRET_PASS).toString();

                    return(
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{datas.Name}</td>
                      <td><img src={datas.Thumb} 
                      onClick={() => handleImageClick(datas.Thumb)}/> </td>
                      <td><img src={datas.Media} 
                      onClick={() => handleImageClick(datas.Media)}/> </td>
                      <td>{datas.Currency}</td>
                      <td>{datas.Status}</td>
                      <td>
                      {datas.PublishStatus === true? 
                      <p className="text-center">{datas.UserName}</p>: <p className="text-center">----</p>}
                      </td>
                      
                      <td className="text-center">
                        <Link to={`/single-gift/${encodeURIComponent(encryptedItemId)}`}>
                          <button className="btn btn-primary">Edit</button>
                        </Link>&nbsp;
                        {!datas.PublishStatus && !datas.TransferStatus ? <Link to={`/single-gift-mint/${encodeURIComponent(encryptedItemId)}`}>
                          <button className="btn btn-primary">Mint</button>
                        </Link> : null}
                      </td>
                      
                    </tr>
                    )
                  })}
                  {currentPosts?.length === 0 && <tr><td colSpan={8} scope="col" className="text-center">No Records Found</td></tr>}
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

export default GiftList