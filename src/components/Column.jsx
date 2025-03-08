import React from "react";
import { Droppable } from "react-beautiful-dnd";

import Task from "./Task";

const Column = ({ columnId, tasks, deleteTask }) => {
  return (
    <div className="flex flex-col bg-gradient-to-b from-purple-500 to-indigo-600 shadow-lg rounded-xl p-4 w-80">
      {/* Column Header */}
      <h2 className="text-white text-lg font-bold text-center mb-4 capitalize tracking-wide">
        {columnId}
      </h2>

      {/* Droppable Area */}
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex flex-col gap-3 p-3 bg-white/90 rounded-lg min-h-[120px] max-h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-400"
          >
            {tasks.length === 0 ? (
              <p className="text-gray-400 text-sm text-center">No tasks yet</p>
            ) : (
              tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} columnId={columnId} deleteTask={deleteTask} />
              ))
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
