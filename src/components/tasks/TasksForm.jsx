import { useState } from "react";
import prancheta_main from "../../assets/prancheta_main.svg";

import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";

function Form({ fetchTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(null);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzc5NDg0ODcxLCJpYXQiOjE3Nzg4ODAwNzEsImp0aSI6IjU2MDAzYmI3ODZlZjQ0M2RiYmJkYjVmMmQ2MzRmNWJmIiwidXNlcl9pZCI6IjEifQ._ilUgxxqX04mMiG4Epca3dbhLFo4L6zyze8iV1H5heE";

  const statusOptions = [
    {
      name: "Pendente",
      code: "PE",
    },
    {
      name: "Concluído",
      code: "CO",
    },
  ];

  async function handleSubmit(e) {
    e.preventDefault();

    const task = {
      title,
      description,
      completed: status === "CO",
    };

    try {
      const response = await fetch("http://localhost:8000/api/tasks/", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(task),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar tarefa");
      }

      const data = await response.json();

      console.log(data);

      // atualiza lista
      await fetchTasks();

      alert("Tarefa adicionada com sucesso!");

      // limpa formulário
      setTitle("");
      setDescription("");
      setStatus(null);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
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

            <inpu
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
    </>
  );
}

export default Form;
