import React from "react";

function Tasks() {
  const [tasks, setTasks] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const fetchData = async () => {
    try {
      const rawData = await fetch("http://localhost:3000/tasks", {
        method: "GET",
      });
      const parsedData = await rawData.json();

      setTasks(parsedData);
    } catch (err) {
      alert("Erro ao carregar as tasks");
      console.error(err);
    }
  };

  // Carrega as tarefas iniciais.
  React.useEffect(() => {
    fetchData();
  }, []);

  const handleSubmitClick = async () => {
    const bodyData = JSON.stringify({ task: inputValue });

    setLoading(true);

    try {
      const rawData = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: bodyData,
        headers: { "Content-Type": "application/json" },
      });

      const taskData = await rawData.json();

      setTasks([...tasks, taskData]);
    } catch (err) {
      alert("Erro ao criar nova task.");
      console.error(err);
    }

    setLoading(false);
  };

  const handleUpdateTask = async (taskId) => {
    const taskBody = prompt("Qual o novo nome da tarefa?");
    const bodyData = JSON.stringify({ task: taskBody });

    await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: bodyData,
    });

    setTasks(tasks.map((t) => (t.id == taskId ? { ...t, task: taskBody } : t)));
  };

  return (
    <div className="tasks">
      <ul>
        {tasks.length
          ? tasks.map((t) => {
              return (
                <li key={t.id}>
                  <span>
                    {t.id} - {t.task}
                  </span>
                  <button onClick={() => handleUpdateTask(t.id)}>
                    Alterar
                  </button>
                </li>
              );
            })
          : "Nenhuma task encontrada."}
      </ul>
      
      <div className="add-task-form-group">
        <input
          type="text"
          placeholder="Aprovar esse PR"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <button disabled={loading} onClick={handleSubmitClick}>
          Criar task
        </button>
      </div>
    </div>
  );
}

export default Tasks;
