import './index.css'
import Header from '../Header/Header'
import TaskCard from '../Taskcard/Taskcard'
import { useState,useEffect } from 'react'
import { IoAddSharp } from "react-icons/io5";
import Cookies from 'js-cookie' 


const Home = () =>{
const [tasks, setTasks] = useState([])
const [searchvar,setSearchvar] = useState('')
const [statusFilter,setStatusFilter] = useState('')
const [showModal, setShowModal] = useState(false);
const [priorityFilter,setPriorityFilter] = useState('')
const [modaltitle,setmodaltitle] = useState('')
const [modaltitleError,setmodaltitleError] = useState('')
const [modaldesError,setmodaldesError] = useState('')
const [modaldes,setmodaldes] = useState('')
const [modalpriority,setmodalpriority]= useState('Low')
const [modalstatus,setmodalstatus]= useState('Open')
const [showupdatemodel,setshowupdatemodel]= useState(false)
const [updatemodaldes,setupdatemodaldes] = useState('')
const [updatemodalpriority,setupdatemodalpriority] = useState('Low')
const [updatemodalstatus,setupdatemodalstatus] = useState('Open')
const [updatemodaltitle,setupdatemodaltitle] = useState('')
const [modaltitleErrorupdate,setmodaltitleErrorupdate] = useState('')
const [modaldesErrorupdate,setmodaldesErrorupdate] = useState('')
const [isdelete,setisdelete] = useState(false)
const [taskId, setTaskId] = useState('');


useEffect(() => {
  console.log("Fetching tasks...");
  
  const getUsertasksdetails = async () => {
    try {
      const token = Cookies.get("jwtToken");
      console.log("JWT Token:", token);

const response = await fetch("http://localhost:3000/api/tasks/gettasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
        
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

    if (data.status === "success" && Array.isArray(data.data)) {
    setTasks(data.data);
}
 else {
        console.error("Invalid data structure:", data);
        setTasks([]);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]); 
    }
  };

  getUsertasksdetails();
}, [showModal,showupdatemodel,isdelete]);


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
          "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop", // Replaced 13th
          "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1549923746-c502d488b3ea?q=80&w=2071&auto=format&fit=crop", // Replaced 16th
          "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=2231&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070&auto=format&fit=crop"
        ];

const handleupdatetask = async function(id){
 const task = filteredTasks.find(task => task._id === id);
 if (!task) {
   console.error("Task not found");
   return;
 }

 setupdatemodaltitle(task.title);
 setupdatemodaldes(task.description);
 setupdatemodalpriority(task.priority);
 setupdatemodalstatus(task.status);
 setTaskId(task._id);
 setshowupdatemodel(true);
}



const handleStatusFilterChange = (event)=>{
  setStatusFilter(event.target.value)
}
const handlePriorityFilterChange = (event)=>{
  setPriorityFilter(event.target.value)
}

 const onclickTasksearch = (event)=>{
    setSearchvar(event.target.value)
 }  
 const handleAddTaskClick = () => { 
    setShowModal(true);
 } 

const filteredTasks = tasks.filter(task => {
  const matchesSearch = task.title.toLowerCase().includes(searchvar.toLowerCase());
  const matchesStatus = statusFilter ? task.status === statusFilter : true;
  const matchesPriority = priorityFilter ? task.priority === priorityFilter : true;

  return matchesSearch && matchesStatus && matchesPriority;
});

const onChangemodaltitle = (e) =>{
    setmodaltitle(e.target.value)
}
const validatemodaltitle = () =>{
    if(modaltitle.trim() === ''){
        setmodaltitleError('Title is required')
    }
    else{
        setmodaltitleError('')
    }
}
const deletingtasks =async (id) => {
  console.log("deleing")
  const apiUrl = `http://localhost:3000/api/tasks/deletetask/${id}`;
  try {
    const option = {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${Cookies.get('jwtToken')}`
      }
    };
    const response = await fetch(apiUrl, option);
    console.log("Response status:", response.status);
    if (response.ok) {
      console.log("Task deleted successfully");
      setisdelete(prev =>!prev)
    } else {
      throw new Error("Failed to delete task");
    }
  } catch (error) {
    console.error("Error deleting task:", error);
  }
};

const onchangemodaldes = (e) =>{
    setmodaldes(e.target.value)
}
const validatemodaldes = () =>{
    if(modaldes.trim() === ''){
        setmodaldesError('Description is required')
    }
    else{
        setmodaldesError('')
    }
}

const onchangemodalpriority = (e) =>{
    setmodalpriority(e.target.value)
}

const onchangemodalstatus = (e) =>{
    setmodalstatus(e.target.value)
}
const handleAddtasks = async(e)=>{
   e.preventDefault();  
 const apiUrl = "http://localhost:3000/api/tasks/addtask";
 console.log(
  "started handling add task"
 );

 const newTask = {
    title: modaltitle,
    description: modaldes,
    priority: modalpriority,
    status: modalstatus
};


  try {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get('jwtToken')}`
      },
      body: JSON.stringify(newTask)
    };
    const response = await fetch(apiUrl, option);
    console.log("Response status:", response);

    if (response.status !== 200) {
      throw new Error("Failed to add task");
    }
  else{
    setShowModal(false);
    const data = await response.json();
    console.log("Task added successfully:", data);}
  } catch (error) {
    console.error("Error adding task:", error);
  }
}

const onchangeupdatemodaldes = (e) =>{
    setupdatemodaldes(e.target.value)
}
const validateupdatemodaldes = () =>{
    if(updatemodaldes.trim() === ''){
       setmodaldesErrorupdate('Description is required')
    }
    else{
        setmodaldesErrorupdate('')
    }
}
const validateupdatemodaltitle = () =>{
    if(updatemodaltitle.trim() === ''){
        setmodaltitleErrorupdate('Title is required')
    }
    else{
        setmodaltitleErrorupdate('')
    }
}
const onChangeupdatemodaltitle = function (e) {
    setupdatemodaltitle(e.target.value)
}
const onchangeupdatemodalpriority = function(e){
  setupdatemodalpriority(e.target.value)
}
const onchangeupdatemodalstatus = function(e){
  setupdatemodalstatus(e.target.value)
}
  
const fetchUpdateUsertasks = async (e) => {
  e.preventDefault();
    

  const apiUrl = `http://localhost:3000/api/tasks/updatetask/${taskId}`;
  const updatedTask = {
    title: updatemodaltitle,
    description: updatemodaldes,
    priority: updatemodalpriority,
    status: updatemodalstatus
  };

  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get('jwtToken')}`
      },
      body: JSON.stringify(updatedTask)
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Task updated successfully:", data);
      setshowupdatemodel(false);
    } else {
      throw new Error("Failed to update task");
    }
  } catch (error) {
    console.error("Error updating task:", error);
  }
};

return(
    <div className='Home-container'>
      <Header/> 
{showupdatemodel && (
   <div className="addform-modal">
          <span className="addform-close-btn" onClick={() => setshowupdatemodel(false)}>
            &times;
          </span>
          <form className="addform-task-form" onSubmit={fetchUpdateUsertasks}>
            <h2 className='addtaskmodalheading'>Add New Task</h2>

            <div className="addform-form-group">
              <label htmlFor="title">Task Title</label>
              <input className='addform-input' type="text" id="title" placeholder="Enter task title"onChange={onChangeupdatemodaltitle} value={updatemodaltitle} onBlur={validateupdatemodaltitle} required />
              <p className='error-message'>{modaltitleErrorupdate}</p>
            </div>

            <div className="addform-form-group">
              <label htmlFor="description">Description</label>
              <textarea className='addform-textarea' id="description" placeholder="Enter task description" value={updatemodaldes} onChange={onchangeupdatemodaldes} onBlur={validateupdatemodaldes}></textarea>
            <p className='error-message'>{modaldesErrorupdate}</p>
            </div>

     
            <div className="addform-form-group">
              <label htmlFor="priority">Priority</label>
              <select id="priority" className='selectoptions' value={updatemodalpriority} onChange={onchangeupdatemodalpriority} required>
                <option value="">Select priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="addform-form-group">
              <label htmlFor="status">Status</label>
              <select id="status" required className='selectoptions' value={updatemodalstatus} onChange={onchangeupdatemodalstatus}>
                <option value="">Select status</option>
                <option value="Open">Open</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <button type="submit" className="addform-btn-submit">
            Upadate Task
            </button>
          </form>
        </div>
      )}







 {showModal && (
        <div className="addform-modal">
          <span className="addform-close-btn" onClick={() => setShowModal(false)}>
            &times;
          </span>
          <form className="addform-task-form" onSubmit={handleAddtasks}>
            <h2 className='addtaskmodalheading'>Add New Task</h2>

            <div className="addform-form-group">
              <label htmlFor="title">Task Title</label>
              <input className='addform-input' type="text" id="title" placeholder="Enter task title"onChange={onChangemodaltitle} value={modaltitle} onBlur={validatemodaltitle} required />
              <p className='error-message'>{modaltitleError}</p>
            </div>

            <div className="addform-form-group">
              <label htmlFor="description">Description</label>
              <textarea className='addform-textarea' id="description" placeholder="Enter task description" value={modaldes} onChange={onchangemodaldes} onBlur={validatemodaldes}></textarea>
            <p className='error-message'>{modaldesError}</p>
            </div>

            <div className="addform-form-group">
              <label htmlFor="due-date">Due Date</label>
              <input className='addform-input-date' type="date" id="due-date" required />
            </div>

            <div className="addform-form-group">
              <label htmlFor="priority">Priority</label>
              <select id="priority" className='selectoptions' value={modalpriority} onChange={onchangemodalpriority} required>
                <option value="">Select priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="addform-form-group">
              <label htmlFor="status">Status</label>
              <select id="status" required className='selectoptions' value={modalstatus} onChange={onchangemodalstatus}>
                <option value="">Select status</option>
                <option value="Open">Open</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <button type="submit" className="addform-btn-submit">
              Add Task
            </button>
          </form>
        </div>
      )}





<div className='home-content'> 
    <div className='home-padding-container'>
        <div className='main-description'>
<h1 className='mytaskheading'>My Tasks</h1>
<p className='mytaskpara'>Manage your daily tasks efficiently</p>
</div>
<input type='search' className='task-searchbar' value={searchvar} placeholder='Search tasks...'  onChange={onclickTasksearch}/>
<div className='filter-container'>
  <select className='filter-select' onChange={handlePriorityFilterChange} value={priorityFilter}>
    <option value=''>All</option>
    <option value='High'>High Priority</option>
    <option value='Medium'>Medium Priority</option>
    <option value='Low'>Low Priority</option>
  </select>
  <select className='select-status' onChange={handleStatusFilterChange} value={statusFilter}>
    <option value=''>All</option>
    <option value='Open'>Open</option>
    <option value='In Progress'>In Progress</option>
    <option value='Completed'>Completed</option>
  </select>
</div>
<div className='tasks-container'>   
   {
    filteredTasks.map(filteredTask => (
        <div  className='task-card'>
            <TaskCard task={filteredTask}  key={filteredTask._id} handleupdatetask = {handleupdatetask} deletingtask={deletingtasks} professionalImages={professionalImages} />
        </div>
    ))
}

</div>
 <div className='add-task-container'>
        <button className='add-task-button' onClick={handleAddTaskClick}><IoAddSharp className='add-task-icon'/> </button>
    </div>
</div>

</div> 
    </div>
)




}

export default Home