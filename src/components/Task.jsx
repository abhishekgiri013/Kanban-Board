import { X, Pencil, Check } from "lucide-react";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index, columnId, deleteTask, updateTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(task.content);

  const handleEdit = () => setIsEditing(true);
  const handleChange = (e) => setNewContent(e.target.value);

  const saveEdit = () => {
    if (newContent.trim() === "") return;
    updateTask(columnId, task.id, newContent);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") saveEdit();
  };

  return (
    <Draggable key={task.id} draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-3 rounded-lg flex justify-between items-center gap-2 w-full transition-all duration-200 
            ${snapshot.isDragging ? "bg-indigo-500 shadow-2xl scale-105 text-white" : "bg-white shadow-md"}
          `}
        >
          {isEditing ? (
            <div className="flex items-center gap-2 w-full">
              <input
                type="text"
                value={newContent}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent border-b border-gray-400 outline-none px-2 py-1 text-sm"
                autoFocus
              />
              {/* Save Button */}
              <button
                onClick={saveEdit}
                className="text-green-500 hover:text-green-700"
              >
                <Check size={18} />
              </button>
            </div>
          ) : (
            <p className="text-sm break-words w-full cursor-pointer" onClick={handleEdit}>
              {task.content}
            </p>
          )}

          {!isEditing && (
            <button onClick={handleEdit} className="text-gray-500 hover:text-gray-700">
              <Pencil size={16} />
            </button>
          )}

          <button
            onClick={() => deleteTask(columnId, task.id)}
            className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
