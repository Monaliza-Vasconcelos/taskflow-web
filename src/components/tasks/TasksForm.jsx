import { useState } from "react";
import prancheta_main from "../../assets/prancheta_main.svg";

import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

function Form({ fetchTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(null);

  const statusOptions = [
    { name: "Pendente", code: "PE" },
    { name: "Concluído", code: "CO" },
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    const task = {
      title,
      description,
      completed: status === "CO",
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/tasks/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
          body: JSON.stringify(task),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao criar tarefa");
      }

      await fetchTasks();

      alert("Tarefa adicionada com sucesso!");

      setTitle("");
      setDescription("");
      setStatus(null);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container_forms_principal">
      <div className="content_main">
        <img src={prancheta_main} alt="prancheta" />
        <h1>Minhas Tarefas</h1>
      </div>

      <p>Organize suas tarefas e aumente sua produtividade</p>

      <form className="form_container" onSubmit={handleSubmit}>
        <div className="label_input">
          <label className="title">Título da tarefa</label>

          <input
            id="title"
            type="text"
            className="title"
            placeholder="Ex: Estudar React"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="label_input description">
          <label htmlFor="description">Descrição (opcional)</label>

          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva sua tarefa..."
          />
        </div>

        <div className="label_input status">
          <label>Status</label>

          <Dropdown
            value={status}
            options={statusOptions}
            onChange={(e) => setStatus(e.value)}
            optionLabel="name"
            optionValue="code"
            placeholder="Selecione o status"
            className="dropdown_status"
          />
        </div>

        <div className="button_adicionar">
          <Button label="Adicionar" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default Form;