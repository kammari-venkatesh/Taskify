import Header from "../Header/Header";
import './index.css';
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const Dashboard = () => {
  const [TotalTasks, setTotalTasks] = useState([]);
  const [counts, setCounts] = useState({
    total: 0,
    open: 0,
    completed: 0,
    highPriority: 0
  });

  useEffect(() => {
    const getTasks = async () => {
      try {
        const token = Cookies.get("jwtToken");
        const response = await fetch("http://localhost:3000/api/tasks/gettasks", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error(`Failed to fetch tasks: ${response.status}`);

        const data = await response.json();

        if (data.status === "success" && Array.isArray(data.data)) {
          setTotalTasks(data.data);
          calculateCounts(data.data);
      
        } else {
          setTotalTasks([]);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTotalTasks([]);
      }
    };

    getTasks();
  }, []);
    let recentTasks = [...TotalTasks] // copy array
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // sort by createdAt desc
            .slice(0, 5); // take first 5

  const calculateCounts = (tasksArray) => {
    const total = tasksArray.length;
    const open = tasksArray.filter(task => task.status === "Open").length;
    const completed = tasksArray.filter(task => task.status === "Completed").length;
    const highPriority = tasksArray.filter(task => task.priority === "High").length;

    setCounts({ total, open, completed, highPriority });
  };

  return (
    <div className="Dashboardmain-container">
      <Header />
      <div className="dashboard-container">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Overview of your activity</p>

        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon purple"><i className="fas fa-tasks"></i></div>
            <div>
              <p className="stat-label">Total Tasks</p>
              <p className="stat-value">{counts.total}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green"><i className="fas fa-check-circle"></i></div>
            <div>
              <p className="stat-label">Completed</p>
              <p className="stat-value">{counts.completed}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon yellow"><i className="fas fa-hourglass-half"></i></div>
            <div>
              <p className="stat-label">Pending</p>
              <p className="stat-value">{counts.open}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon red"><i className="fas fa-exclamation-circle"></i></div>
            <div>
              <p className="stat-label">High Priority</p>
              <p className="stat-value">{counts.highPriority}</p>
            </div>
          </div>
        </div>

      <div className="activity-container">
  <h2 className="activity-title">Recent Activity</h2>
  <div className="activity-list">
    {recentTasks.length > 0 ? (
      recentTasks.map((task, index) => (
        <div className="activity-item" key={index}>
          <p className="activity-text">
            {task.status === "Completed"
              ? `Task "${task.title}" marked as completed`
              : `New task "${task.title}" added`}
          </p>
          <span className="activity-time">
            {new Date(task.createdAt).toLocaleDateString()}{" "}
            {new Date(task.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </span>
        </div>
      ))
    ) : (
      <p>No recent activity</p>
    )}
  </div>
</div>

      </div>
    </div>
  );
};

export default Dashboard;
