import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import PaginationNew from "../pages/PaginationNew";
import { useGetBalanceDetailsQuery, useWithdrawAdminbalanceMutation } from "../Store/Store";
import Loader from "../components/loader/Loader";
import Modal from 'react-bootstrap/Modal';
import Form from "react-bootstrap/Form";
import Web3 from "web3";

const BalanceDetails = ({ }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading1, setIsLoading] = useState(false);
    const { data, isLoading, refetch } = useGetBalanceDetailsQuery({
        page: currentPage,
        search: searchTerm,
    });
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [popup, setpopup] = useState(false)
    const [depositpopup, setDepositpopup] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null);
    const [walletAddress, setWalletAddress] = useState("");
    const [amountVal, setAmountVal] = useState("");
    const [depositamountVal, setDepositAmountVal] = useState("");
    const [withdrawBalance, responseInfo] = useWithdrawAdminbalanceMutation();

    const newPost = {
        "Amount": amountVal,
        "WalletAddress": walletAddress,
        "Currency": selectedRow ? selectedRow.Currency : ''
    }
    const handleSubmitVal = async (e) => {
        e.preventDefault();
        console.log(newPost);
        await withdrawBalance(newPost);
    }

    const handleShowCurrency = (rowData) => {
        setSelectedRow(rowData);
        setpopup(true);
    };

    const handleDepositShow = (rowData) => {
        setSelectedRow(rowData);
        setDepositpopup(true);
    };

    const handleClose = () => {
        setpopup(false);
    };

    const handleDepositClose = () => {
        setDepositpopup(false)
    }

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setPosts(data?.data);
        }
        fetchPosts()
    }, [data])

    const totalCount = data?.count;
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
    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        setCurrentPage(1); // Reset the current page to 1
    };

    useEffect(() => {
        if (responseInfo?.data?.status) {
            debugger;
            toast?.success(responseInfo?.data?.message)
            setTimeout(() => handleClose(), 2000);
        } else if (responseInfo?.data?.message) {
            toast?.error(responseInfo?.data?.message)
        }
    }, [responseInfo])

    const recharge = async () => {
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
            window.ethereum.request({ method: 'eth_requestAccounts' })
                .then(async res => {
                    setIsLoading(true)
                    await window.web3.eth.sendTransaction({
                        from: res[0],
                        to: selectedRow ? selectedRow?.WalletAddress : '',  /// selected currency Addres
                        value: window.web3.utils.toWei(depositamountVal, "ether"),
                        gas: "21000",
                    }).then(async (rest) => {
                        setIsLoading(false)
                        toast?.success("Fecthed Balance Successfully")
                        handleDepositClose()
                        await refetch();
                    }).catch((error) => {
                        setIsLoading(false)
                        if (error?.code === 4001) {
                            toast.warning(error?.message)
                        }
                    })
                })
        } else {
            alert("install metamask extension!!")
        }
    }

    return (
        <>
            <ToastContainer></ToastContainer>
            {isLoading && <Loader />}
            {isLoading1 && <Loader />}
            <div className="admin-wrapper-table">
                <div className="container" >
                    <p style={{ fontSize: "2rem", color: "#fff", fontWeight: "800" }}>Balance Details</p>

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
                                    <th scope="col">Wallet Address</th>
                                    <th scope="col">Balance</th>
                                    <th scope="col" className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentPosts?.map((datas, index) => (
                                        <tr>
                                            <th scope="row">{index + 1}</th>
                                            <td>{datas.WalletAddress}</td>
                                            <td>{datas.Balance} {' '} {datas.Currency}</td>
                                            <td className="text-center">
                                                <div style={{
                                                    display: "flex",
                                                    listStyle: "none",
                                                    gap: "1rem",
                                                    justifyContent: "center",
                                                }}>
                                                    <Link onClick={() => {
                                                        handleDepositShow(datas)
                                                    }}>
                                                        <button className="btn btn-primary">Deposit</button>
                                                    </Link>

                                                    <Link onClick={() => {
                                                        handleShowCurrency(datas)
                                                    }}>
                                                        <button className="btn btn-primary">Withdraw</button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                {currentPosts?.length === 0 && <tr><td colSpan={5} scope="col" className="text-center">No Records Found</td></tr>}
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

            <Modal show={popup} onHide={handleClose} backdrop="static" centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{ display: 'contents' }}>
                        <span>Withdraw</span>
                        <i class="bi-x" onClick={handleClose} style={{ marginRight: '10px' }}></i>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="card-body p-4 p-sm-5">
                            <Form
                                onSubmit={handleSubmitVal}
                            >
                                <div className="row g-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className='col-4'>
                                            <p style={{ display: 'contents' }}>Wallet Address</p>
                                        </div>
                                        <div className='col-8'>
                                            <input
                                                className=""
                                                type="text"
                                                id="name"
                                                name="title"
                                                placeholder="Wallet Address"
                                                onChange={e => setWalletAddress(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className='col-4'>
                                            <p style={{ display: 'contents' }}>Amount</p>
                                        </div>
                                        <div className='col-8'>
                                            <input
                                                className=""
                                                type="text"
                                                id="name"
                                                name="title"
                                                placeholder="Amount"
                                                onChange={e => setAmountVal(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <input
                                        className="btn btn-primary w-100 rounded-pill"
                                        type="submit"
                                        value={"Submit"}
                                    />
                                </div>
                            </Form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={depositpopup} onHide={handleDepositClose} backdrop="static" centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{ display: 'contents' }}>
                        <span>Deposit</span>
                        <i class="bi-x" onClick={handleDepositClose} style={{ marginRight: '10px' }}></i>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div className="card-body p-4 p-sm-5">
                            <Form>
                                <div className="row g-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className='col-4'>
                                            <p style={{ display: 'contents' }}>Amount</p>
                                        </div>
                                        <div className='col-8'>
                                            <input
                                                className=""
                                                type="text"
                                                id="name"
                                                name="title"
                                                placeholder="Amount"
                                                onChange={e => setDepositAmountVal(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <input
                                        className="btn btn-primary w-100 rounded-pill"
                                        style={{ marginTop: 18 }}
                                        type="button"
                                        value={"Submit"}
                                        onClick={recharge}
                                    />
                                </div>
                            </Form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default BalanceDetails;