import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import "./styles/global.css";

import Form from "./components/tasks/TasksForm";
import Item from "./components/tasks/TasksItem";
import List from "./components/tasks/TaksList";

import { useEffect, useState } from "react";

import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

function App() {
  const [tasks, setTasks] = useState([]);

  const [visible, setVisible] = useState(false);

  const [editingTask, setEditingTask] = useState(null);

  const [filterStatus, setFilterStatus] = useState([]);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzc5NDg0ODcxLCJpYXQiOjE3Nzg4ODAwNzEsImp0aSI6IjU2MDAzYmI3ODZlZjQ0M2RiYmJkYjVmMmQ2MzRmNWJmIiwidXNlcl9pZCI6IjEifQ._ilUgxxqX04mMiG4Epca3dbhLFo4L6zyze8iV1H5heE";

  const statusOptions = [
    {
      name: "Pendente",
      code: false,
    },
    {
      name: "Concluído",
      code: true,
    },
  ];

  // =========================
  // GET TASKS
  // =========================

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/tasks/", {
        method: "GET",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao buscar tarefas");
      }

      const data = await response.json();

      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    function fec() {
      fetchTasks();
    }

    fec();
  }, []);

  // =========================
  // TOGGLE TASK
  // =========================

  const toggleTask = async (task) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/tasks/${task.id}/`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            completed: !task.completed,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Erro ao atualizar tarefa");
      }

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // DELETE TASK
  // =========================

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
        method: "DELETE",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao deletar tarefa");
      }

      fetchTasks();

      alert("Tarefa deletada!");
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // OPEN EDIT MODAL
  // =========================

  const handleEditClick = (task) => {
    setEditingTask(task);

    setVisible(true);
  };

  // =========================
  // UPDATE TASK
  // =========================

  const updateTask = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/tasks/${editingTask.id}/`,
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            title: editingTask.title,
            description: editingTask.description,
            completed: editingTask.completed,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Erro ao editar tarefa");
      }

      fetchTasks();

      setVisible(false);

      alert("Tarefa atualizada!");
    } catch (error) {
      console.log(error);
    }
  };

  const filteredTasks = tasks.filter((task) => {

  // todos
  if (
    filterStatus.length === 0 ||
    filterStatus.includes("TO")
  ) {
    return true;
  }

  // pendentes
  if (
    filterStatus.includes("PE") &&
    !task.completed
  ) {
    return true;
  }

  // concluídos
  if (
    filterStatus.includes("CO") &&
    task.completed
  ) {
    return true;
  }

  return false;
});

  return (
    <>
      <Header />

      <main className="container_main">

        <Form fetchTasks={fetchTasks} />

        <Item
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          tasks={tasks}
        />

        <div className="list_wrapper">
          {filteredTasks.map((task) => (
            <List
              key={task.id}
              title={task.title}
              description={task.description}
              completed={task.completed}
              onToggle={() => toggleTask(task)}
              onDelete={() => deleteTask(task.id)}
              onEdit={() => handleEditClick(task)}
            />
          ))}
        </div>
      </main>

      {/* =========================
          MODAL EDITAR
      ========================= */}

      <Dialog
        header="Editar tarefa"
        visible={visible}
        style={{ width: "30rem" }}
        onHide={() => setVisible(false)}
      >
        <form className="form_container">
          <div className="label_input">
            <label>Título</label>

            <input
              type="text"
              value={editingTask?.title || ""}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  title: e.target.value,
                })
              }
            />
          </div>

          <div className="label_input description">
            <label>Descrição</label>

            <textarea
              value={editingTask?.description || ""}
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  description: e.target.value,
                })
              }
            />
          </div>

          <div className="label_input status">
            <label>Status</label>

            <Dropdown
              value={editingTask?.completed}
              options={statusOptions}
              optionLabel="name"
              optionValue="code"
              placeholder="Selecione"
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  completed: e.value,
                })
              }
            />
          </div>

          <div className="button_adicionar">
            <Button
              type="button"
              label="Salvar alterações"
              onClick={updateTask}
            />
          </div>
        </form>
      </Dialog>

      <Footer />
    </>
  );
}

export default App;
