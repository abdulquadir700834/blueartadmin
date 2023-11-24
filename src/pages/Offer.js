import React, { useEffect, useState } from 'react'
import Loader from '../components/loader/Loader';
import { useGetOfferQuery } from '../Store/Store';
import PaginationNew from './PaginationNew';

const Offer = ({ module }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useGetOfferQuery({
    page: currentPage,
    search: searchTerm,
  });
  console.log(data, "useGetOfferQuery");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [termSearch, setTermSearch] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setPosts(data?.data);
      console.log("all posts", posts)
    }
    fetchPosts()
  }, [data])

  const totalCount = data?.count;
  const totalPages = Math.ceil(totalCount / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;

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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSubmit = (event) => {
    event.preventDefault();
    setCurrentPage(1);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="admin-wrapper-table">
        <div className="container">
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

          <div className="table-responsive border shadow-sm dashboard-table activity-table">
            <table className="table" >
              <thead className="table-dark">
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Receiver User Name</th>
                  <th scope="col">Receiver Email</th>
                  <th scope="col">Sender User Name</th>
                  <th scope="col">Sender Email</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  currentPosts?.filter((value) => {
                    if (termSearch == "") {
                      return value;
                    }
                    else if (
                      value.ItemName
                        .toLowerCase()
                        .includes(termSearch.toLowerCase())
                    ) {
                      return value;
                    }

                  })
                    .map((datas, index) => (
                      <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{datas.ItemName}</td>
                        <td>{datas.Price}</td>
                        <td>{datas.ReceiverUserName}</td>
                        <td>{datas.ReceiverEmail}</td>
                        <td>{datas.SenderUserName}</td>
                        <td>{datas.SenderEmail}</td>
                        <td>{datas.Status}</td>
                      </tr>
                    ))
                }
                {currentPosts?.length === 0 && <tr><td colSpan={8} scope="col" className="text-center">No Records Found</td></tr>}

              </tbody>
            </table>

            <div className="container" style={
              {
                marginTop: "2rem"

              }
            }>
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

export default Offer