import { useState } from "react";
import { Link } from "react-router-dom";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useGetActivityListQuery } from "../../../Store/Store";
import moment from 'moment';

let token = sessionStorage.getItem('myToken');
console.log("mytoken", token);
const ActivityTab = () => {
    const [key, setKey] = useState('today');
    const { data } = useGetActivityListQuery();
    console.log(data);

    return (
        <div className="col-12 col-xxl-12">
            <div className="card border-0 shadow-sm dashboard-activity-tab">
                <div className="card-body p-4 d-flex flex-wrap">
                    <h5>Activity</h5>
                    <Tabs
                        id="dashboard-activity-tab"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="border-0 mb-3 ms-auto"
                    >
                        <Tab eventKey="today" title="Today">
                            <div className="table-responsive border shadow-sm dashboard-table activity-table">
                                <table className="table mb-0">
                                    <tbody>
                                        {data?.length ? (
                                                data?.data?.docs.map((datas, index) => (
                                                    moment(datas.created_date).format('L') == moment().format('L') ? (
                                                        <tr key={index}>
                                                            <th scope="row">
                                                                <Link className="btn btn-minimal text-dark hover-primary" to="#">
                                                                    <img className="rounded me-1"
                                                                        src={`https://nugennftapi.stsblockchain.xyz/images/item/thumb/${datas?.item_id?.thumb}`}
                                                                        alt="" />
                                                                    {datas?.item_id?.name}
                                                                </Link>
                                                            </th>
                                                            <td>
                                                                <span className="d-inline-block fw-bold fz-14">
                                                                    {datas?.item_id?.price}ETH
                                                                </span>
                                                            </td>
                                                            <td>
                                                                <i className={`bi bi-hammer`} />
                                                                {datas?.history_type}
                                                            </td>
                                                            <td>
                                                                <i className={`bi bi-clock`} />
                                                                {new Date(datas.created_date).toLocaleDateString()}
                                                            </td>
                                                        </tr>
                                                    ) : null)
                                                )
                                            ) : (
                                                <tr>
                                                    <td>no data</td>
                                                </tr>

                                            )
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </Tab>

                        <Tab eventKey="week" title="7 Day">
                            <div className="table-responsive border shadow-sm dashboard-table activity-table">
                                <table className="table mb-0">
                                    <tbody>
                                        {
                                            data?.data?.docs.map((datas, index) => (
                                                moment(datas.created_date).format('L') >= moment().subtract(7, 'days').calendar() ? (
                                                    <tr key={index}>
                                                        <th scope="row">
                                                            <Link className="btn btn-minimal text-dark hover-primary" to="#">
                                                                <img className="rounded me-1"
                                                                    src={`https://nugennftapi.stsblockchain.xyz/images/item/thumb/${datas?.item_id?.thumb}`}
                                                                    alt="" />
                                                                {datas?.item_id?.name}
                                                            </Link>
                                                        </th>
                                                        <td>
                                                            <span className="d-inline-block fw-bold fz-14">
                                                                {datas?.item_id?.price}ETH
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <i className={`bi bi-hammer`} />
                                                            {datas?.history_type}
                                                        </td>
                                                        <td>
                                                            <i className={`bi bi-clock`} />
                                                            {new Date(datas.created_date).toLocaleDateString()}
                                                        </td>
                                                    </tr>
                                                ) : null
                                            )
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </Tab>

                        <Tab eventKey="month" title="30 Day">
                            <div className="table-responsive border shadow-sm dashboard-table activity-table">
                                <table className="table mb-0">
                                    <tbody>
                                        {data?.data?.docs.map((datas, index) => {
                                            return (
                                                moment(datas.created_date).format('L') >= moment().subtract(30, 'days').calendar() ? (
                                                    <tr key={index}>
                                                        <th scope="row">
                                                            <Link className="btn btn-minimal text-dark hover-primary" to="#">
                                                                <img className="rounded me-1"
                                                                    src={`https://nugennftapi.stsblockchain.xyz/images/item/thumb/${datas?.item_id?.thumb}`}
                                                                    alt="" />
                                                                {datas?.item_id?.name}
                                                            </Link>
                                                        </th>
                                                        <td>
                                                            <span className="d-inline-block fw-bold fz-14">
                                                                {datas?.item_id?.price}ETH
                                                            </span>
                                                        </td>
                                                        <td>
                                                            <i className={`bi bi-hammer`} />
                                                            {datas?.history_type}
                                                        </td>
                                                        <td>
                                                            <i className={`bi bi-clock`} />
                                                            {new Date(datas.created_date).toLocaleDateString()}
                                                        </td>
                                                    </tr>
                                                ) : null
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default ActivityTab;