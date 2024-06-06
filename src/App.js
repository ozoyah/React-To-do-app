import "./App.css";
import TaskForm from "./components/TaskForm";
import Task from "./components/Task";
import { useEffect, useState } from "react";
import CheckBox from "./components/CheckBox";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskCompleted, setTaskCompleted] = useState(0);

  useEffect(() => {
    console.log({ tasks });

    if (tasks.length === 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    if (!localStorage.getItem("tasks")) return;

    const tasks = JSON.parse(localStorage.getItem("tasks"));
    setTasks(tasks);
  }, []);

  function removeTask(taskName) {
    if (localStorage.getItem("checkedBoxes")) {
      const checkBoxes = JSON.parse(localStorage.getItem("checkedBoxes"));

      if (checkBoxes) {
        const updatedBoxes = checkBoxes.filter(
          (taskBox) => taskBox.toLowerCase() !== taskName.toLowerCase()
        );
        localStorage.setItem("checkedBoxes", JSON.stringify(updatedBoxes));
      }
    }

    const updatedTasks = tasks.filter((task) => task !== taskName);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

  const totalTasks = tasks ? tasks.length : 0;

  const percentage =
    tasks && tasks.length > 0 ? (taskCompleted / tasks.length) * 100 : 0;

  function getMessage() {
    switch (percentage) {
      case 0:
        return "Try to do at least one!";
      case 50:
        return "Half way there keep going!";
      case 75:
        return "good job, almost there!";
      case 100:
        return "congratulations!!";
      default:
        return "keep going!";
    }

    //  if (percentage === 0) {
    //     return "Try to do at least one!";
    //   }
    //   if (percentage === 50) {
    //     return "Half way there keep going!";
    //   }
    //   if (percentage === 80) {
    //     return "good job, almost there!";
    //   }
    //   if (percentage === 100) {
    //     return "congratulations!!";
    //   } else {
    //     return "keep going!";
    //   }
  }

  return (
    <div className="main">
      <h1>
        {taskCompleted}/{totalTasks} complete
      </h1>
      <h2>{getMessage()}</h2>
      <TaskForm tasks={tasks} setTasks={setTasks} />
      <Task
        tasks={tasks}
        setTaskCompleted={setTaskCompleted}
        onDelete={removeTask}
      />
    </div>
  );
}

export default App;
