import React, { useState } from "react";
import "./index.css";

const projects = [
  {
    name: "Pizza Menu",
    component: React.lazy(() => import("./01-pizza-menu/App")),
  },
  {
    name: "Steps",
    component: React.lazy(() => import("./02-steps/App")),
  },
  {
    name: "Travelling Packing list",
    component: React.lazy(() => import("./03-Traveling-checklist/App")),
  },
  {
    name: "Tip Challenge",
    component: React.lazy(() => import("./04-tipChallenge/App")),
  },
  {
    name: "Eat-N-Split",
    component: React.lazy(() => import("./05-eat-n-split/App")),
  },
  {
    name: "Text Expantion API",
    component: React.lazy(() => import("./06-apiComponentChallenge/App")),
  },
  {
    name: "How React Works",
    component: React.lazy(() => import("./08-How-React-works/App")),
  },
  {
    name: "usePopcorn-Movie website",
    component: React.lazy(() => import("./09-usePopcorn/App")),
  },
  {
    name: "Exchange API",
    component: React.lazy(() => import("./10-exchangeAPI-Challenge/App")),
  },
  {
    name: "Geolocation API",
    component: React.lazy(() => import("./11-getLocationChallenge/App")),
  },
  {
    name: "React Quiz",
    component: React.lazy(() => import("./12-react-quiz/App")),
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
      {activeProject ? null : (
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
        </div>
      )}
      {renderActiveProject()}
    </div>
  );
}
