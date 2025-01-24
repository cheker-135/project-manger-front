import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminCardSection from "./AdminCardSections/AdminCardSection";
import AdminChartSection from "./AdminChartSection/AdminChartSection";
import firstCardInfo from "../AdminDataCollection/SectionOneCardsInfo";
import secondCardInfo from "../AdminDataCollection/SectionTwoCardsInfo";
import { useSelector } from 'react-redux';
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [projectCount, setProjectCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [agentCount, setAgentCount] = useState(0);
  const [totalUserCount, settotalUserCount] = useState(0);
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/projects/", {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        });
        console.log("Projets:", response.data.length);
        setProjectCount(response.data.length);

        // Update the firstCardInfo array with the new project count
        const updatedFirstCardInfo = firstCardInfo.map((card) => {
          if (card.type === "Projets") {
            return {
              ...card,
              number: response.data.length,
            };
          }
          return card;
        });

        // Update the firstCardInfo array in place
        firstCardInfo.splice(0, firstCardInfo.length, ...updatedFirstCardInfo);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, [userInfo]);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get("/api/users/all", {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        });

        // Filter users where isAgent is false (technicians)
        const totalUsers = response.data.length;
        console.log("Techniciens:", totalUsers);



        settotalUserCount(totalUsers);

        // Update the firstCardInfo array with the new technician count
        const updatedFirstCardInfo = firstCardInfo.map((card) => {
          if (card.type === "Users") {
            return {
              ...card,
              number: response.data.length,
            };
          }
          return card;
        });

        // Update the firstCardInfo array in place
        firstCardInfo.splice(0, firstCardInfo.length, ...updatedFirstCardInfo);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

  fetchTotalUsers();
  }, [userInfo]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users/all", {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        });

        // Filter users where isAgent is false (technicians)
        const techniciansUsers = response.data.filter(user => user.isAgent === false);
        console.log("Techniciens:", response.data.length);

        // Count the number of technician users and subtract one
        const techniciansUserCount = techniciansUsers.length - 1;
        setUserCount(techniciansUserCount);

        // Update the firstCardInfo array with the new technician count
        const updatedFirstCardInfo = firstCardInfo.map((card) => {
          if (card.type === "Techniciens") {
            return {
              ...card,
              number: response.data.length-1,
            };
          }
          return card;
        });

        // Update the firstCardInfo array in place
        firstCardInfo.splice(0, firstCardInfo.length, ...updatedFirstCardInfo);
      } catch (error) {
        console.error("Error fetching technicians:", error);
      }
    };

    fetchUsers();
  }, [userInfo]);

  useEffect(() => {
    const fetchAgentUsers = async () => {
      try {
        const response = await axios.get("/api/users/all", {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        });

        // Filter users where isAgent is true
        const agentUsers = response.data.filter(user => user.isAgent === true);

        // Count the number of agent users
        const agentUserCount = agentUsers.length;

        console.log("chefs de projets:", agentUserCount);
        setAgentCount(agentUserCount);

        // Update the firstCardInfo array with the new agent count
        const updatedFirstCardInfo = firstCardInfo.map((card) => {
          if (card.type === "Chefs de Projet") {
            return {
              ...card,
              number: agentUserCount,
            };
          }
          return card;
        });

        // Update the firstCardInfo array in place
        firstCardInfo.splice(0, firstCardInfo.length, ...updatedFirstCardInfo);
      } catch (error) {
        console.error("Error fetching agent users:", error);
      }
    };

    fetchAgentUsers();
  }, [userInfo]);

  return (
    <div
      style={{ backgroundColor: "#0066ff", height: "100vh" }}
      className="col-xxl-10 col-xl-9 col-lg-9 ms-auto"
    >
      <AdminChartSection />
      <AdminCardSection
        sectionTitle="Overview General"
        cardInfo={firstCardInfo}
        cardType="SectionOne"
        projectCount={projectCount}
        agentCount={agentCount}
        userCount={userCount}
      totalUserCount={totalUserCount}
      />

    </div>
  );
};

export default AdminDashboard;
