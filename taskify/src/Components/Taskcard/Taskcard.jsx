
import "./index.css"
import { BiEdit } from "react-icons/bi";

import { MdDeleteOutline } from "react-icons/md";

const TaskCard = ({ task, professionalImages, handleupdatetask ,deletingtask}) => {
    return (
        <div className='task-card'>
<img
  src={professionalImages[Math.floor(Math.random() * professionalImages.length)]}
  className='task-image'
/>
           <div className="card-description">
            <h2 className='task-title'>{task.title}</h2>
            <p className='task-description'>{task.description}</p>
            <p className='task-priority'>Priority: {task.priority}</p>
            <p className='task-status'>Status: {task.status}</p>
            <p className='task-created-at'>Created At: {new Date(task.createdAt).toLocaleString()}</p>
            <p className="created-by">Created By: {task.username}</p>
           </div>
           <div className="card-actions">
               <button className="edit-button" onClick={() => handleupdatetask(task._id)}><BiEdit /></button>
               <button className="delete-button" onClick={() => deletingtask(task._id)}><MdDeleteOutline /></button>
           </div>
        </div>
    );
};

export default TaskCard;
