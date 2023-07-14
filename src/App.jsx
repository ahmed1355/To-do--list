import React from "react";
import { useState } from "react";
import styles from "./App.module.css";
import { useRef } from "react";
function App() {
  const [todolist, setTodoList] = useState([]);
  const [currenttask, setCurrentTask] = useState("");
  const inputask = useRef(null); //1 step

  const addTask = () => {
    // setTodoList([...todolist, currenttask]); have a property in each task which will be completed
    //or not which will be a boolean
    setTodoList([...todolist, { task: currenttask, completed: false }]);

    inputask.current.value = ""; //3rd step
    setCurrentTask("");
    // console.log(todolist);
  };
  const deletetask = (deletetask) => {
    setTodoList(
      todolist.filter((task) => {
        return task.task !== deletetask;
      })
    );
  };

  const completetask = (completedtask) => {
    setTodoList(
      todolist.map((task) => {
        return task.task === completedtask
          ? { task: completedtask, completed: true }
          : // : { task: task.task, completed: false };
            //if it was previously true,continue as true else false
            { task: task.task, completed: task.completed ? true : false };
      })
    );
  };
  return (
    <>
      <div className={styles.container}>
        <h1>Todo List</h1>
        <div className={styles.inp}>
          <input
            ref={inputask} //2nd step
            type="text"
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                addTask();
              }
            }}
            placeholder="enter your task..."
            onChange={(e) => {
              setCurrentTask(e.target.value);
            }}
          />
          <button onClick={addTask}>Add Task</button>
        </div>
      </div>
      <hr />
      {/* (val, key) => { return <li key={key}>{val}</li>; }: This is the callback function passed to the map() function. It is an anonymous arrow function that takes two parameters, 
      val and key, representing the current element and index of the iteration, respectively. */}
      <ul>
        {todolist.map((val, key) => {
          return (
            <>
              <div className={styles.list}>
                <li key={key}>
                  <p>{val.task}</p>
                </li>
                <button onClick={() => completetask(val.task)}>
                  completed
                </button>
                <button onClick={() => deletetask(val.task)}>X</button>
                {val.completed ? (
                  <h1>task completed</h1>
                ) : (
                  <h1>task not completed</h1>
                )}
              </div>
            </>
          );
        })}

        {/* The key prop is set to the key parameter,
        which helps React efficiently update and render the list when it changes. */}
      </ul>
    </>
  );
}

export default App;
