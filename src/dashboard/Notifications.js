import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import socket from "../socket"
import { SpinnerCircularFixed } from "spinners-react";
import DashboardHeader from "../components/dashboard/header/DashboardHeader";
import CreateNewButton from "../components/dashboard/createNew/CreateNewButton";
import NotificationData from "../data/dashboard/notification-data.json";



const DashboardNotification = ({ data }) => {

    const [key, setKey] = useState('today');
    const [socketMessage, setSocketMessage] = useState("")
    const [loading, setLoading] = useState(false)


    console.log(data, "socket")

    useEffect(() => {

        setLoading(true)

    },[])


    useEffect(() => {
        socket.on("notificationsnew", (arg) => {
            setLoading(false)
            setSocketMessage(arg?.data, "socket") // world
        });
    }, [socket]);


    const NotificationToday = NotificationData.filter(item => item.tag === "today");
    const notificationTodayCards = socketMessage && socketMessage?.map((elem, index) => (
        <li key={index}>
            <Link>
                <i className={`me-2 bg-info bi bi-gift`} />
                {elem?.type}
                <span className="badge bg-warning text-dark fz-12 rounded-pill ms-auto">
                    Date: {elem?.created_date}
                </span>
            </Link>
        </li>
    ))

    const NotificationWeek = NotificationData.filter(item => item.tag === "week");
    const notificationWeekCards = NotificationWeek.map((elem, index) => (
        <li key={index}>
            <Link to={`/notification-details/${elem.id}`} >
                <i className={`me-2 bg-${elem.icon[0].color} bi ${elem.icon[0].icon}`} />
                {elem.notification}
                <span className="badge bg-warning text-dark fz-12 rounded-pill ms-auto">
                    {elem.badgeText}
                </span>
            </Link>
        </li>
    ))

    const notificationAllCards = NotificationData.map((elem, index) => (
        <li key={index}>
            <Link to={`/notification-details/${elem.id}`} >
                <i className={`me-2 bg-${elem.icon[0].color} bi ${elem.icon[0].icon}`} />
                {elem.notification}
                <span className="badge bg-warning text-dark fz-12 rounded-pill ms-auto">
                    {elem.badgeText}
                </span>
            </Link>
        </li>
    ))






    return (
        <>
            {loading ?
                <div className="spinner">
                    <SpinnerCircularFixed size={100} thickness={180} speed={100} color="gold" secondaryColor="rgba(57, 136, 172, 0.55)"/>
                </div> :
                <div className="admin-wrapper">
                    <div className="container">
                        <div className="row g-4 justify-content-center">
                            <div className="col-12 col-lg-10">
                                <Tabs
                                    id="dashboard-notification"
                                    activeKey={key}
                                    onSelect={(k) => setKey(k)}
                                    className="border-0 mb-3 dashboard-tabs"
                                >
                                    <Tab eventKey="today">
                                        <div className="notification-content-wrap">
                                            <ul className="notification-list ps-0 mb-0">
                                                {notificationTodayCards}
                                            </ul>
                                        </div>
                                    </Tab>


                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            }



        </>
    )
}

export default DashboardNotification;