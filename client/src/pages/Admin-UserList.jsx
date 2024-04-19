import React, { useEffect, useState } from "react";
import { getUsers } from "../api/userapi";

const AdminUserList = () => {
    const userRows = [
        {
            id: 1,
            username: "Jon Snow",
            avatar: "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            email: "jon@gmail.com",
            status: "active",
            transaction: "$120.00",
        },
        {
            id: 2,
            username: "Jon Snow",
            avatar: "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            email: "jon@gmail.com",
            status: "active",
            transaction: "$120.00",
        },
        {
            id: 3,
            username: "Jon Snow",
            avatar: "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            email: "jon@gmail.com",
            status: "active",
            transaction: "$120.00",
        },
        {
            id: 4,
            username: "Jon Snow",
            avatar: "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            email: "jon@gmail.com",
            status: "active",
            transaction: "$120.00",
        },
        {
            id: 5,
            username: "Jon Snow",
            avatar: "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            email: "jon@gmail.com",
            status: "active",
            transaction: "$120.00",
        },
        {
            id: 6,
            username: "Jon Snow",
            avatar: "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            email: "jon@gmail.com",
            status: "active",
            transaction: "$120.00",
        },
        {
            id: 7,
            username: "Jon Snow",
            avatar: "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            email: "jon@gmail.com",
            status: "active",
            transaction: "$120.00",
        },
        {
            id: 8,
            username: "Jon Snow",
            avatar: "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            email: "jon@gmail.com",
            status: "active",
            transaction: "$120.00",
        },
        {
            id: 9,
            username: "Jon Snow",
            avatar: "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            email: "jon@gmail.com",
            status: "active",
            transaction: "$120.00",
        },
        {
            id: 10,
            username: "Jon Snow",
            avatar: "https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
            email: "jon@gmail.com",
            status: "active",
            transaction: "$120.00",
        },
    ];
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const users = await getUsers();

                setUsers(users);
            } catch (error) {
                console.log(error);
            }
        };
        getAllUsers();
    }, []);

    return (
        <div>
            <table className="admin-productlist-container">
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <tr />
                {users &&
                    users.map((user) => {
                        return (
                            <>
                                <td className="admin-productList-user">
                                    <img
                                        src="https://exoffender.org/wp-content/uploads/2016/09/empty-profile.png"
                                        className="widgetSmImg"
                                    />
                                    {user && user.name}
                                </td>
                                <td>{user && user.email}</td>
                                <td>{user && user.role}</td>
                                <tr />
                            </>
                        );
                    })}
            </table>
        </div>
    );
};

export default AdminUserList;
