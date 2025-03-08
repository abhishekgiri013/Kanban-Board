import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

const KanbanBoard = () => {
  const [columns, setColumns] = useState({
    todo: [],
    inProgress: [],
    done: [],
  });

  const [newTask, setNewTask] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("todo");
  const [taskCounter, setTaskCounter] = useState(1); // Incremental ID

  // Load data from localStorage on mount
  useEffect(() => {
    const savedBoard = localStorage.getItem("kanbanBoard");
    if (savedBoard) {
      const parsedData = JSON.parse(savedBoard);
      setColumns(parsedData.columns);
      setTaskCounter(parsedData.taskCounter);
    }
  }, []);

  // Save data to localStorage on change
  useEffect(() => {
    localStorage.setItem("kanbanBoard", JSON.stringify({ columns, taskCounter }));
  }, [columns, taskCounter]);

  // Handle Drag & Drop
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      // Reorder within the same column
      const column = [...columns[source.droppableId]];
      const [movedItem] = column.splice(source.index, 1);
      column.splice(destination.index, 0, movedItem);

      setColumns({ ...columns, [source.droppableId]: column });
    } else {
      // Move between different columns
      const sourceColumn = [...columns[source.droppableId]];
      const destinationColumn = [...columns[destination.droppableId]];
      const [movedItem] = sourceColumn.splice(source.index, 1);
      destinationColumn.splice(destination.index, 0, movedItem);

      setColumns({
        ...columns,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destinationColumn,
      });
    }
  };

  // Create Task
  const addTask = () => {
    if (!newTask.trim()) return;
    const newTaskObj = { id: taskCounter.toString(), content: newTask };
    setColumns({
      ...columns,
      [selectedColumn]: [...columns[selectedColumn], newTaskObj],
    });
    setTaskCounter(taskCounter + 1);
    setNewTask("");
  };

  // Delete Task
  const deleteTask = (columnId, taskId) => {
    const updatedColumn = columns[columnId].filter((task) => task.id !== taskId);
    setColumns({ ...columns, [columnId]: updatedColumn });
  };
 
  

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      {/* Task Input Section */}
      <div className="flex gap-4 mb-6 w-full max-w-3xl">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border p-2 rounded-lg w-full shadow-sm focus:outline-none"
        />
        <select
          value={selectedColumn}
          onChange={(e) => setSelectedColumn(e.target.value)}
          className="border p-2 rounded-lg bg-white shadow-sm"
        >
          {Object.keys(columns).map((col) => (
            <option key={col} value={col}>
              {col.charAt(0).toUpperCase() + col.slice(1)}
            </option>
          ))}
        </select>
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Add Task
        </button>
      </div>

      {/* Kanban Board */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6 w-full max-w-5xl">
          {Object.entries(columns).map(([columnId, tasks]) => (
            <Column key={columnId} columnId={columnId} tasks={tasks} deleteTask={deleteTask} />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
