import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((response) => {
      const repositories = response.data;
      setRepositories(repositories);
    });

  }, [])

  async function handleAddRepository() {
    const repository = {
      url: `https://github.com/guiribao/repo-${repositories.length}`,
      title: `Desafio ReactJS`,
      techs: ["JavaScript", "NodeJS", "React"],
    };

    const response = await api
      .post("/repositories", repository)
      .then((response) => response.data);
    
    setRepositories([...repositories, response]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);

    if (response) {
      const newState = repositories.filter(
        (repository) => repository.id !== id
      );

      setRepositories([...newState])
    }
  }

  return (
    <>
      <ul data-testid="repository-list" id="repository-list">
        {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
