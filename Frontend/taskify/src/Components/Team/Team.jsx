import './index.css';
import Header from '../Header/Header';
import { useState, useEffect } from 'react';
import Teamtaskcard from '../Teamtaskcard/Teamtaskcard';
import io from "socket.io-client";
import Cookie from "js-cookie";
const socket = io("https://taskify-1-prqj.onrender.com");

const professionalImages = [
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2232&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?q=80&w=2069&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2231&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop"
];

const Team = () => {
  const [tasks, setTasks] = useState([]);
  const [teamsearchvar, setTeamsearchvar] = useState('');
  const [teampriorityFilter, setTeamPriorityFilter] = useState('');
  const [teamStatusFilter, setTeamStatusFilter] = useState('');

  
  useEffect(() => {
    fetch("https://taskify-1-prqj.onrender.com/api/tasks/getteamtasks", {
      headers: {
        Authorization: `Bearer ${Cookie.get("jwtToken")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === "success") {
          setTasks(data.data);
        }
      })
      .catch(err => console.error("Error fetching team tasks:", err));
  }, []);

 useEffect(() => {
  const handleTaskUpdate = (update) => {
    if (update.action === "create") {
      setTasks(prev => [...prev, update.task]);
    } else if (update.action === "update") {
      setTasks(prev => prev.map(t => t._id === update.task._id ? update.task : t));
    } else if (update.action === "delete") {
      setTasks(prev => prev.filter(t => t._id !== update.task._id));
    }
  };

  socket.on("tasksUpdated", handleTaskUpdate);

  return () => {
    socket.off("tasksUpdated", handleTaskUpdate);
  };
}, []);


  const onclickTeamsearch = (event) => setTeamsearchvar(event.target.value);
  const handleteamPriorityFilterChange = (event) => setTeamPriorityFilter(event.target.value);
  const handleteamStatusFilterChange = (event) => setTeamStatusFilter(event.target.value);

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(teamsearchvar.toLowerCase());
    const matchesStatus = teamStatusFilter ? task.status === teamStatusFilter : true;
    const matchesPriority = teampriorityFilter ? task.priority === teampriorityFilter : true;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className='Team-container'>
      <Header />
      <div className='home-content'>
        <div className='home-padding-container'>
          <div className='main-description'>
            <h1 className='mytaskheading'>Team Tasks</h1>
            <p className='mytaskpara'>Organize and track all your team tasks in one place</p>
          </div>
          <input type='search' className='task-searchbar' value={teamsearchvar} placeholder='Search tasks...' onChange={onclickTeamsearch} />
          <div className='filter-container'>
            <select className='filter-select' onChange={handleteamPriorityFilterChange} value={teampriorityFilter}>
              <option value=''>All</option>
              <option value='High'>High Priority</option>
              <option value='Medium'>Medium Priority</option>
              <option value='Low'>Low Priority</option>
            </select>
            <select className='select-status' onChange={handleteamStatusFilterChange} value={teamStatusFilter}>
              <option value=''>All</option>
              <option value='Open'>Open</option>
              <option value='Completed'>Completed</option>
            </select>
          </div>
          <div className='tasks-container'>
            {filteredTasks.map(task => (
              <div key={task._id} className='task-card'>
                <Teamtaskcard task={task} professionalImages={professionalImages} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
