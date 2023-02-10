import React from "react";

function Tasks() {
  const [tasks, setTasks] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const fetchData = async () => {
    const rawData = await fetch("http://localhost:3000/tasks", {
      method: "GET",
    });
    const parsedData = await rawData.json();

    setTasks(parsedData);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const handleSubmitClick = async () => {
    setLoading(true);

    const bodyData = JSON.stringify({ task: inputValue})

    try {
      await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: bodyData,
        headers: { 'Content-Type': 'application/json' }
      })

      setTasks([...tasks, {id: 20, task: inputValue} ])
    } catch(err) {
      alert('Erro na requisiçã.')
    }

    setLoading(false);
  };

  return (
    <>
      <ul>
        {tasks.length
          ? tasks.map((t, i) => {
              return (
                <li key={i}>
                  {t.id}-{t.task}
                </li>
              );
            })
          : "No task"}
      </ul>

      <input
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <button disabled={loading} onClick={handleSubmitClick}>
        Criar task
      </button>
    </>
  );
}

export default Tasks;
