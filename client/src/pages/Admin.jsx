import React, { useState, useEffect, useMemo } from "react";
 
import Chart from "../components/Chart";
import WidgetSm from "../components/WidgetSm";
 
import { getLatestTransactions } from "../api/productapi";
import { getUserForChart } from "../api/userapi";

// import WidgetLg from "../../components/widgetLg/WidgetLg";

const Admin = () => {
   
    const [userStats, setUserStats] = useState([]);
    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        [],
    );
    useEffect(() => {
        const getUsers = async () => {
            try {
                const data = await getUserForChart();
                data.map((item) =>
                    setUserStats((prev) => [
                        ...prev,
                        {
                            name: MONTHS[item._id - 1],
                            "Active User": item.total,
                        },
                    ]),
                );
            } catch (error) {
                console.log(error);
            }
        };
        getUsers();
    }, []);

    useEffect(() => {
        const getTransactions = async () => {
            try {
                const data = await getLatestTransactions();
            } catch (error) {
                console.log(error);
            }
        };
        getTransactions();
    }, []);

    return (
        <div className="home">
            {/* <FeaturedInfo /> */}
            <Chart
                data={userStats}
                title="User Analytics"
                grid
                dataKey="Active User"
            />
            <div className="homeWidgets">
                <WidgetSm />
                {/* <WidgetLg /> */}
            </div>
        </div>
    );
};

export default Admin;
