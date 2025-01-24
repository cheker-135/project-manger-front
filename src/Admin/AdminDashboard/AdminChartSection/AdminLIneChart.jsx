import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { useSelector } from 'react-redux';

const AdminLineChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Nombre de Projets",
        data: [],
        borderColor: "#53a19b",
        backgroundColor: "#8ee0c8",
        borderWidth: 3,
      },
    ],
  });

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("/api/projects/", {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`,
          },
        });
        console.log("response", response);
        const transformedData = transformProjectsData(response.data);
        setChartData(transformedData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    if (userInfo?.token) {
      fetchProjects();
    }
  }, [userInfo]);

  const transformProjectsData = (projectsData) => {
    const projectsByMonth = {};
    projectsData.forEach((project) => {
      const timestamp = project.createdAt;
      const monthYear = new Date(timestamp).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      if (projectsByMonth[monthYear]) {
        projectsByMonth[monthYear]++;
      } else {
        projectsByMonth[monthYear] = 1;
      }
    });

    const sortedMonths = Object.keys(projectsByMonth).sort((a, b) => new Date(a) - new Date(b));

    const labels = sortedMonths;
    const data = sortedMonths.map(month => projectsByMonth[month]);

    return {
      labels: labels,
      datasets: [
        {
          label: "Nombre de Projets",
          data: data,
          borderColor: "#53a19b",
          backgroundColor: "#8ee0c8",
          borderWidth: 3,
        },
      ],
    };
  };

  return (
    <Line
      data={chartData}
      options={{
        scales: {
          y: {
            title: {
              display: true,
              text: 'Number of Projects'
            }
          }
        },
        elements: {
          line: {
            tension: 0,
            borderWidth: 2,
            borderColor: chartData.datasets[0].borderColor,
            backgroundColor: chartData.datasets[0].backgroundColor,
            fill: false,
            borderJoinStyle: "round",
            cubicInterpolationMode: "monotone",
            spanGaps: false,
          },
        },
      }}
    />
  );
};

export default AdminLineChart;
