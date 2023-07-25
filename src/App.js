import React, { useState } from "react";
import "./index.css";

const projects = [
  {
    name: "Pizza Menu",
    component: React.lazy(() => import("./01-pizza-menu/App")),
  },
  {
    name: "Steps", // Replace with the name of your second project
    component: React.lazy(() => import("./02-steps/App")), // Replace with the path to your second project's App component
  },
  {
    name: "Travelling Packing list", // Replace with the name of your second project
    component: React.lazy(() => import("./03-Traveling-checklist/App")), // Replace with the path to your second project's App component
  },
  {
    name: "Tip Challenge", // Replace with the name of your second project
    component: React.lazy(() => import("./04-tipChallenge/App")), // Replace with the path to your second project's App component
  },
];

export default function App() {
  const [activeProject, setActiveProject] = useState(null);

  const handleProjectChange = (event) => {
    const selectedProjectName = event.target.value;
    const selectedProject = projects.find(
      (project) => project.name === selectedProjectName
    );
    setActiveProject(selectedProject);
  };

  const renderActiveProject = () => {
    if (activeProject) {
      const ProjectComponent = activeProject.component;
      return (
        <React.Suspense fallback={<div>Loading...</div>}>
          <ProjectComponent />
        </React.Suspense>
      );
    }
    return null;
  };

  return (
    <div>
      <h2>React Projects: </h2>
      <select onChange={handleProjectChange}>
        <option value="">Select a project</option>
        {projects.map((project) => (
          <option key={project.name} value={project.name}>
            {project.name}
          </option>
        ))}
      </select>
      {renderActiveProject()}
    </div>
  );
}
