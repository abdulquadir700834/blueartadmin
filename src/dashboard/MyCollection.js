import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import MyCollectionData from "../data/dashboard/collection-data.json";
import { useGetCollectionQuery , useChangeAdminMutation  } from "../Store/Store";
import Pagination from "../pages/Pagination";
import Form from 'react-bootstrap/Form';
import Web3 from 'web3';
import { toast, ToastContainer } from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { isEmptyArray, useFormik } from 'formik';
import * as yup from "yup";
const token = sessionStorage.getItem("myToken");

const DashboardCollection = (props) => {
  const { connectWallet, address } = props;
  const [count, setCount] = useState(6);
  const [noMorePost, setNoMorePost] = useState(false);
  const countSlice = MyCollectionData.slice(0, count);
  const { data } = useGetCollectionQuery();
  const [Createpost , responseforChangeadmin] = useChangeAdminMutation()
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [CollectionId, setCollectionId] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const schema = yup.object().shape({
    address: yup.string().required("Address is required")
      .test("Address on not",
        "Please enter valid addres",
        async (value) => {
          let validAddress = await Web3.utils.isAddress(value);
          return validAddress;
        }).test("new on not",
          "Change new address",
          async (value) => {
            let validAddress = await Web3.utils.toChecksumAddress(value) !== await Web3.utils.toChecksumAddress(curAddress);
            return validAddress;
          }),
    privateKey: yup.string().required("Private key is required")
      .test("Private key check",
        "Key not match with address",
        async (value) => {
          let account = await web3.eth.accounts.privateKeyToAccount(value, true);
          if (account && formik.values.address === Web3.utils.toChecksumAddress(account.address)) {
            return true;
          } else {
            return false;
          }
        })
  });
  const [contract, setContract] = useState();
  const [curAddress, SetcurAddress] = useState();
  const web3 = new Web3(window.ethereum);
  const formik = useFormik({
    initialValues: {
      address: '',
      privateKey: ""
    },
    validationSchema: schema,
    onSubmit: async values => {
      if (window.ethereum) {
        let Contract = new web3.eth.Contract(JSON.parse(process.env.REACT_APP_NFT_ABI), contract)
        try {
          window.ethereum.request({ method: 'eth_requestAccounts' })
            .then(async res => {
              let adminAddress = await Contract.methods.admin().call({
                from: res[0]
              });
              let functionExits = await Contract.methods.changeAdmin(values.address).estimateGas({
                from: res[0]
              }, function (err, estimateGas) {
                if (err) {
                  toast.error("Not exits")
                  return;
                }
              })
              if (functionExits) {
                if (adminAddress === Web3.utils.toChecksumAddress(res[0])) {
                  axios.get(`${process.env.REACT_APP_BACKEND_URL}collection/getAdmin?collection_id=${CollectionId}`,{
                    headers: {
                      "Authorization": `Bearer ${token}`
                    }
                  }).then( async res => {
                    if(res.data.status){
                      await Contract.methods.changeAdmin(values.address).send({
                        from: curAddress
                      }).then(res => {
                        if (res.status) {                     
                          Createpost({
                            collection_id : CollectionId,
                            adminKey: values.privateKey
                          }).then(res => {                        
                            if(res.data.status){
                              toast.success(res.data.message)
                              setShow(false)
                            }else{
                              toast.error(res.data.message)
                              setShow(false)
                            }
                          })
                          
                         
                        }
                      })
                    }else{
                      toast.error(res.data.message)
                    }
                  })
                  
                }
              } else {
                toast.error("Not exits")
              }

            })
        } catch (error) {
          console.log(error);
        }
      }
    },
  });
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setPosts(data?.data?.docs);
      console.log("all posts", posts)
    }
    fetchPosts()
  }, [data])

  const indexOfLastPost = currentPage * postsPerPage;
  const indexofFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts?.slice(indexofFirstPost, indexOfLastPost)

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const EditAddress = async (contract_address,collection_id) => {
    let Contract = new web3.eth.Contract(JSON.parse(process.env.REACT_APP_NFT_ABI), contract_address)
    if (window.ethereum) {
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Accounts now exposed
        window.ethereum.request({ method: 'eth_requestAccounts' })
          .then(async res => {
            let adminAddress = await Contract.methods.admin().call({
              from: res[0]
            });
            if (adminAddress === Web3.utils.toChecksumAddress(res[0])) {
              SetcurAddress(res[0])
              setCollectionId(collection_id)
              setContract(contract_address);
              setShow(true);
            } else {
              toast.error(`Please connect with this ${adminAddress}`)
            }
          })
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="admin-wrapper-table">
        <div className="container" >
          <div className="row">
            <div className="col-md-4">
              <form class="example" action="">
                <input type="text" placeholder="Search.." onChange={(event) => {
                  setSearchTerm(event.target.value)
                }} name="search2" />
                <button type="submit" ><i class="fa fa-search"></i></button>
              </form>

            </div>

          </div>


          <div className="table-responsive border shadow-sm dashboard-table activity-table min-ht">
            <table className="table">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Royalties</th>
                  <th scope="col">Description</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentPosts?.filter((val) => {
                  if (searchTerm == "") {
                    return val;
                  }
                  else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                  }
                  else if (val.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                  }
                }).map((datas, index) => (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{datas.name}</td>
                    <td>{datas.royalties}</td>
                    <td>{datas.description}</td>
                    <td><button className="btn btn-primary" onClick={() => EditAddress(datas?.contract_address,datas?._id)}  >Edit admin address</button></td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="container" style={{ marginTop: "2rem" }}>
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts?.length}
                paginate={paginate}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit} >
            <input className="form-control" type="text" name="address" value={formik.values.address} onChange={formik.handleChange} placeholder="Enter Address" />
            <div className="form-error">{formik.errors.address}</div>
            <input className="form-control" type="text" name="privateKey" value={formik.values.privateKey} onChange={formik.handleChange} placeholder="Enter private key" />
            <div className="form-error">{formik.errors.privateKey}</div>
            <br />
            <button className="btn btn-success" type="submit">Submit</button>
          </Form>
        </Modal.Body>

      </Modal>

    </>
  )
}

export default DashboardCollection;