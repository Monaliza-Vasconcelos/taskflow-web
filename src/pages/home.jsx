import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import Form from "../components/tasks/TasksForm";
import Item from "../components/tasks/TasksItem";
import List from "../components/tasks/TaksList";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import "../styles/global.css";

const API = import.meta.env.VITE_API_URL;

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState([]);

  const navigate = useNavigate();

  const statusOptions = [
    { name: "Pendente", code: false },
    { name: "Concluído", code: true },
  ];

  // 🔥 PROTEÇÃO DE ROTA (resolve seu problema do login)
  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      navigate("/login");
    }
  }, []);

  // GET
  const fetchTasks = async () => {
    const response = await fetch(`${API}/api/tasks/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });

    const data = await response.json();
    setTasks(data);
  };

  // 🔥 CARREGA TAREFAS SEM BUG
  useEffect(() => {
    function fech(){
        fetchTasks();
    }

    fech()
  }, []);

  // TOGGLE
  const toggleTask = async (task) => {
    await fetch(`${API}/api/tasks/${task.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify({
        completed: !task.completed,
      }),
    });

    fetchTasks();
  };

  // DELETE
  const deleteTask = async (id) => {
    await fetch(`${API}/api/tasks/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    });

    fetchTasks();
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setVisible(true);
  };

  // UPDATE
  const updateTask = async () => {
    await fetch(`${API}/api/tasks/${editingTask.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify({
        title: editingTask.title,
        description: editingTask.description,
        completed: editingTask.completed,
      }),
    });

    setVisible(false);
    fetchTasks();
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus.length === 0) return true;

    if (filterStatus.includes("PE") && !task.completed) return true;
    if (filterStatus.includes("CO") && task.completed) return true;

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

      <Dialog
        header="Editar tarefa"
        visible={visible}
        style={{ width: "30rem" }}
        onHide={() => setVisible(false)}
      >
        <form className="form_container">
          <input
            value={editingTask?.title || ""}
            onChange={(e) =>
              setEditingTask({
                ...editingTask,
                title: e.target.value,
              })
            }
          />

          <textarea
            value={editingTask?.description || ""}
            onChange={(e) =>
              setEditingTask({
                ...editingTask,
                description: e.target.value,
              })
            }
          />

          <Dropdown
            value={editingTask?.completed}
            options={statusOptions}
            optionLabel="name"
            optionValue="code"
            onChange={(e) =>
              setEditingTask({
                ...editingTask,
                completed: e.value,
              })
            }
          />

          <Button label="Salvar" onClick={updateTask} type="button" />
        </form>
      </Dialog>

      <Footer />
    </>
  );
}