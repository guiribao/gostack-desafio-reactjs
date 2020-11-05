import React, { useState, useEffect } from "react";
import { ourApi } from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    ourApi.get('/repositories').then(response => {
      const repositories = response.data
      setRepositories([...repositories])
    })

  }, [])

  async function handleAddRepository() {
    const repository = {
      title: `Meu repositório - ${Date.now()}`,
      url: `https://github.com/guiribao/repo-${repositories.length}`,
      techs: ["JavaScript","NodeJS", "React"]
    }

    const response = await ourApi.post("/repositories", repository);
    
    setRepositories([...repositories, response.data]);

  }

  async function handleRemoveRepository(id) {
    const response = await ourApi.delete(`/repositories/${id}`)

    if (response) {
      const newState = repositories.filter(
        (repository) => repository.id !== id
      );

      setRepositories([...newState])
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => {
          return (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
