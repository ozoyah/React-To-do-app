import React, { useState } from "react";

const TaskForm = ({ tasks, setTasks }) => {
  const [taskName, setTaskName] = useState("");

  const addTask = (e) => {
    if (tasks.includes(taskName) || !taskName || taskName === "") return;

    setTasks((prev) => [...prev, taskName]);
    setTaskName("");
  };

  return (
    <>
      <div className="form">
        <input
          type="text"
          placeholder="Your next task..."
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        ></input>
        <button type="submit" onClick={addTask} style={{ cursor: "pointer" }}>
          Add
        </button>
      </div>
    </>
  );
};

export default TaskForm;
