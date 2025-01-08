import React, { useState } from 'react';


function Home() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState({ todo: [], ongoing: [], completed: [] });

  // Handle input change
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Add task to "To-Do" section
  const addTask = () => {
    if (task.trim() !== '') {
      setTasks((prevTasks) => ({
        ...prevTasks,
        todo: [...prevTasks.todo, task],
      }));
      setTask('');
    }
  };

  // Move task to another category
  const moveTask = (currentCategory, targetCategory, taskToMove) => {
    setTasks((prevTasks) => {
      const updatedCurrent = prevTasks[currentCategory].filter(
        (t) => t !== taskToMove
      );
      const updatedTarget = [...prevTasks[targetCategory], taskToMove];
      return { ...prevTasks, [currentCategory]: updatedCurrent, [targetCategory]: updatedTarget };
    });
  };

  // Delete task from a category
  const deleteTask = (category, taskToDelete) => {
    setTasks((prevTasks) => {
      const updatedCategory = prevTasks[category].filter((t) => t !== taskToDelete);
      return { ...prevTasks, [category]: updatedCategory };
    });
  };

  return (
    <div className="home">
      <form
        className="task-form"
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <input
          type="text"
          placeholder="Enter task..."
          className="task-input"
          value={task}
          onChange={handleInputChange}
        />
        <button type="button" className="add-task-button" onClick={addTask}>
          ADD TASK
        </button>
      </form>

      <div className="task-sections">
        {/* To-Do Section */}
        <div className="task-section">
          <h2>To-Do Tasks</h2>
          <ul>
            {tasks.todo.map((t, index) => (
              <li key={index}>
                {t}
                <div>
                  <button
                    className="move_to_ongoing"
                    onClick={() => moveTask('todo', 'ongoing', t)}
                  >
                    Ongoing
                  </button>
                  <button
                    className="move_to_completed"
                    onClick={() => moveTask('todo', 'completed', t)}
                  >
                    Completed
                  </button>
                  <button
                    className="delete-task-button"
                    onClick={() => deleteTask('todo', t)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Ongoing Section */}
        <div className="task-section">
          <h2>Ongoing Tasks</h2>
          <ul>
            {tasks.ongoing.map((t, index) => (
              <li key={index}>
                {t}
                <div>
                  <button
                    className="move_to_ongoing"
                    onClick={() => moveTask('ongoing', 'todo', t)}
                  >
                    To-Do
                  </button>
                  <button
                    className="move_to_completed"
                    onClick={() => moveTask('ongoing', 'completed', t)}
                  >
                    Completed
                  </button>
                  <button
                    className="delete-task-button"
                    onClick={() => deleteTask('ongoing', t)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Completed Section */}
        <div className="task-section">
          <h2>Completed Tasks</h2>
          <ul>
            {tasks.completed.map((t, index) => (
              <li key={index}>
                {t}
                <div>
                  <button
                    className="move_to_ongoing"
                    onClick={() => moveTask('completed', 'todo', t)}
                  >
                    To-Do
                  </button>
                  <button
                    className="move_to_completed"
                    onClick={() => moveTask('completed', 'ongoing', t)}
                  >
                    Ongoing
                  </button>
                  <button
                    className="delete-task-button"
                    onClick={() => deleteTask('completed', t)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
