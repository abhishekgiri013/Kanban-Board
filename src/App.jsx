import React from "react";
import KanbanBoard from "./components/kanbanBoard";

const App = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <KanbanBoard />
    </div>
  );
};

export default App;
