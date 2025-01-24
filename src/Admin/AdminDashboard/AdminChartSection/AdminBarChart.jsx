import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {  useSelector } from 'react-redux';

const AdminBarChart = () => {
  const [usersData, setUsersData] = useState([]);
  const {  userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axios.get("/api/users/all", {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        const userData = response.data;

        // Filter out the admin user
        const filteredUsers = userData.filter(user => !user.isAdmin);

        // Transform user data into an array of objects containing the month and the number of users for that month
        const usersByMonth = transformUserData(filteredUsers);

        setUsersData(usersByMonth);
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    };

    fetchUsersData();
  }, []);

  const transformUserData = (userData) => {
    const usersByMonth = {};
    userData.forEach((user) => {
      const timestamp = user.createdAt; // Use the correct timestamp field from your user data
      const monthYear = new Date(timestamp).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      if (usersByMonth[monthYear]) {
        usersByMonth[monthYear]++;
      } else {
        usersByMonth[monthYear] = 1;
      }
    });

    // Convert the object to an array
    const usersArray = Object.keys(usersByMonth).map((key) => ({ month: key, monthlyUsers: usersByMonth[key] }));

    // Sort the array by month
    usersArray.sort((a, b) => new Date(a.month) - new Date(b.month));

    return usersArray;
  };

  const data = {
    labels: usersData.map((data) => data.month),
    datasets: [
      {
        label: " Utilisateurs/Mois",
        data: usersData.map((data) => data.monthlyUsers),
        //borderColor: "#53a19b",
        backgroundColor: "#53a19b",
      },
    ],
  };

  return <Bar data={data} />;
};

export default AdminBarChart;
