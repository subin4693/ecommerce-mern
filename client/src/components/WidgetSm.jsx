import React, { useEffect, useState } from "react";
import { MdOutlineVisibility } from "react-icons/md";

import { getUsers } from "../api/userapi";

const WidgetSm = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const users = await getUsers();
                console.log(users);
                setUsers(users);
            } catch (error) {
                console.log(error);
            }
        };
        getAllUsers();
    }, []);

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                {users &&
                    users.map((user) => (
                        <li className="widgetSmListItem" key={user._id}>
                            <img
                                src="https://exoffender.org/wp-content/uploads/2016/09/empty-profile.png"
                                alt=""
                                className="widgetSmImg"
                            />
                            <div className="widgetSmUser">
                                <span className="widgetSmUsername">
                                    {user.name}
                                </span>
                                <span className="widgetSmUserTitle">
                                    {user.email}
                                </span>
                            </div>
                            <button className="widgetSmButton">
                                <MdOutlineVisibility className="widgetSmIcon" />
                                Display
                            </button>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default WidgetSm;
