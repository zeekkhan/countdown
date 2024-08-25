import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { auth } from '../firebase/FirebaseConfig';
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import Header from './Header'; // Import Header component
import '../App.css'; // Import the CSS file

const Board = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    completed: [],
  });
  const [showForm, setShowForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [selectedSection, setSelectedSection] = useState("todo");
  const [currentUser, setCurrentUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const addTask = (e) => {
    e.preventDefault();

    if (newTaskTitle.trim() && currentUser) {
      const newTask = {
        id: Date.now().toString(),
        title: newTaskTitle,
        status: "todo", // Always add to "To Do" section first
        createdAt: new Date().toISOString(),
        userId: currentUser.uid,
      };

      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, newTask],
      }));

      setNewTaskTitle("");
      setShowForm(false); // Close the popup after adding the task
    } else {
      console.warn('New task title is empty or user is not authenticated');
    }
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination || (destination.index === source.index && destination.droppableId === source.droppableId)) return;

    const sourceSection = tasks[source.droppableId];
    const destinationSection = tasks[destination.droppableId];
    const [movedTask] = sourceSection.splice(source.index, 1);
    destinationSection.splice(destination.index, 0, movedTask);

    setTasks((prevTasks) => ({
      ...prevTasks,
      [source.droppableId]: sourceSection,
      [destination.droppableId]: destinationSection,
    }));
  };

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      Object.keys(updatedTasks).forEach((section) => {
        updatedTasks[section] = updatedTasks[section].filter(task => task.id !== taskId);
      });
      return updatedTasks;
    });
  };

  const moveTask = (task) => {
    const currentStatus = task.status;
    let newStatus = "todo"; // Default to "To Do"

    if (currentStatus === "todo") {
      newStatus = "inProgress";
    } else if (currentStatus === "inProgress") {
      newStatus = "completed";
    } else if (currentStatus === "completed") {
      newStatus = "todo";
    }

    setTasks((prevTasks) => {
      const updatedTasks = { ...prevTasks };
      updatedTasks[currentStatus] = updatedTasks[currentStatus].filter(t => t.id !== task.id);
      updatedTasks[newStatus].push({ ...task, status: newStatus });
      return updatedTasks;
    });
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Sign Out Error:', error.message);
      });
  };

  return (
    <>
      <Header /> {/* Add Header component here */}
      <DragDropContext onDragEnd={onDragEnd}>
        <button className="signout-button" onClick={handleSignOut}>Sign out</button>
        <h1 className="board-title"> Count Down Board Project Management System</h1>
        <button
          className="add-task-button top-button" // Positioning this button at the top
          onClick={() => {
            setSelectedSection("todo");
            setShowForm(true);
          }}
        >
          Add Task
        </button>
        <div className="board-container">
          <div className="section-grid">
            {["todo", "inProgress", "completed"].map((section) => (
              <Droppable droppableId={section} key={section}>
                {(provided) => (
                  <div
                    className="section"
                    data-section={section}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <h2 className="section-title">
                      {section === "todo" ? "To Do" : section === "inProgress" ? "In Progress" : "Completed"}
                    </h2>
                    <div>
                      {tasks[section].map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided) => (
                            <div
                              className="task-card"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="task-title">{task.title}</div>
                              <div className="task-actions">
                                <button
                                  className="move-task-button"
                                  onClick={() => moveTask(task)}
                                >
                                  Move
                                </button>
                                <button
                                  className="delete-task-button"
                                  onClick={() => deleteTask(task.id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>

          {showForm && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2 className="modal-title">Add New Task</h2>
                <form onSubmit={addTask}>
                  <div className="form-group">
                    <label className="form-label">Task Title</label>
                    <input
                      type="text"
                      className="form-input"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-actions">
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="submit-button"
                    >
                      Add Task
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </DragDropContext>
    </>
  );
};

export default Board;
