import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./topnav.css";

const TopNav = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fatchMessages = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/messages"
      );
      setMessages(data);
    };
    fatchMessages();
  }, [messages]);

  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fatchOrders = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + "/api/admin/orders"
      );
      setOrders(data);
    };
    fatchOrders();
  }, [orders]);

  // GET ADMIN DETAILS
  const id = Cookies.get("admin");
  const [admin, setAdmin] = useState({});
  useEffect(() => {
    const fatchAdmin = async () => {
      const { data } = await axios.get(
        process.env.REACT_APP_SERVER + `/api/admin/users/${id}`
      );
      setAdmin(data);
    };
    fatchAdmin();
  }, [admin]);

  const logout = () => {
    Cookies.remove("admin");
    window.location.href = process.env.REACT_APP_SERVER + "/admin";
  };

  var message_count = 0;
  var order_count = 0;

  return (
    <>
      <section className="top-nav">
        <div className="top-nav-wrapper">
          <div className="top-nav-right">
            <ul>
              <li>
                <Link to="/" title="Home">
                  <i class="ri-home-4-line"></i>
                </Link>
              </li>
              <li>
                <Link to="/orders" title="Order">
                  <i class="ri-shopping-basket-line"></i>
                  {orders.map((order_item) => (
                    <input
                      type="hidden"
                      value={
                        (order_item.status === "Ordered" && ++order_count) ||
                        (order_item.status === "OnDelivery" && ++order_count)
                      }
                    />
                  ))}
                  <span className="badge">
                    {order_count !== 0 && order_count}
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/messages" title="Message">
                  <i class="ri-chat-2-line"></i>
                  {messages.map((message_item) => (
                    <input
                      type="hidden"
                      value={message_item.read === "No" && ++message_count}
                    />
                  ))}
                  <span className="badge">
                    {message_count !== 0 && message_count}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    logout();
                  }}
                  title="Logout"
                >
                  <i class="ri-logout-circle-r-line"></i>
                </Link>
              </li>
            </ul>

            <div className="topnav-profile-img">
              <Link to="profile" title="Profile">
                <img
                  src={process.env.REACT_APP_SERVER + "/users/" + admin.thumb}
                  alt={admin.thumb}
                />
                <span className="badge">{admin.username}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TopNav;
