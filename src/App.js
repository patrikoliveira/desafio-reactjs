import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response =>{
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: `Desafio Conceitos React ${Date.now()}`,
      url: 'https://github.com/patrikoliveira/desafio-reactjs',
      techs:["NodeJS", "Jest", "nodemon", "express"]
    }

    const response = await api.post('/repositories', repository);

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const repIndex = repositories.findIndex(r => r.id === id);

    if (repIndex >= 0) {
      const repos = [...repositories];
      repos.splice(repIndex, 1);
      setRepositories([...repos]);
    }

    console.log(id);
  }

  return (
    <div>   

      <ul data-testid="repository-list">
      {
        repositories.map(repository => 
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>)
      }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
