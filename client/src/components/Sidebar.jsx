import { IoStorefrontOutline } from "react-icons/io5";
import { MdOutlineLineStyle, MdOutlinePermIdentity } from "react-icons/md";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/admin" className="link">
                            <li className="sidebarListItem active">
                                <MdOutlineLineStyle className="sidebarIcon" />
                                Home
                            </li>
                        </Link>

                        <Link to="/admin/users" className="link">
                            <li className="sidebarListItem">
                                <MdOutlinePermIdentity className="sidebarIcon" />
                                Users
                            </li>
                        </Link>
                        <Link to="/admin/products" className="link">
                            <li className="sidebarListItem">
                                <IoStorefrontOutline className="sidebarIcon" />
                                Products
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
}
