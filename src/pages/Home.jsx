import React, { useState } from 'react';
 // Ensure to create and include the CSS file for styling

function Home() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState({ todo: [], ongoing: [], completed: [] });

  // Handle input change
  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  // Add task to "To-Do" section
  const addTask = () => {
    if (task.trim() !== '' && !tasks.todo.includes(task)) {
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
      const updatedCurrent = prevTasks[currentCategory].filter((t) => t !== taskToMove);
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

  // Clear all tasks in a category
  const clearAll = (category) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [category]: [],
    }));
  };

  // Task section component
  const TaskSection = ({ title, category, moveTask, deleteTask, clearAll }) => (
    <div className={`task-section ${category}`}>
      <div className="task-section-header">
        <h2>{title}</h2>
        <button className="clear-all-button" onClick={() => clearAll(category)}>
          Clear All
        </button>
      </div>
      <ul>
        {tasks[category].map((t, index) => (
          <li key={index} className="task-item">
            {t}
            <div className="task-buttons">
              {category !== 'todo' && (
                <button onClick={() => moveTask(category, 'todo', t)}>To-Do</button>
              )}
              {category !== 'ongoing' && (
                <button onClick={() => moveTask(category, 'ongoing', t)}>Ongoing</button>
              )}
              {category !== 'completed' && (
                <button onClick={() => moveTask(category, 'completed', t)}>Completed</button>
              )}
              <button onClick={() => deleteTask(category, t)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

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
        <button type="submit" className="add-task-button">
          ADD TASK
        </button>
      </form>

      <div className="task-sections">
        <TaskSection
          title="To-Do Tasks"
          category="todo"
          moveTask={moveTask}
          deleteTask={deleteTask}
          clearAll={clearAll}
        />
        <TaskSection
          title="Ongoing Tasks"
          category="ongoing"
          moveTask={moveTask}
          deleteTask={deleteTask}
          clearAll={clearAll}
        />
        <TaskSection
          title="Completed Tasks"
          category="completed"
          moveTask={moveTask}
          deleteTask={deleteTask}
          clearAll={clearAll}
        />
      </div>
    </div>
  );
}

export default Home;
