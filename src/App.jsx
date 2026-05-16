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

const API = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterStatus, setFilterStatus] = useState([]);

  const statusOptions = [
    { name: "Pendente", code: false },
    { name: "Concluído", code: true },
  ];

  // GET
  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API}/api/tasks/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    function fec(){
      fetchTasks();
    }

    fec()
  }, []);

  // TOGGLE
  const toggleTask = async (task) => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE
  const deleteTask = async (id) => {
    try {
      await fetch(`${API}/api/tasks/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // EDIT
  const handleEditClick = (task) => {
    setEditingTask(task);
    setVisible(true);
  };

  // UPDATE
  const updateTask = async () => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus.length === 0 || filterStatus.includes("TO")) {
      return true;
    }

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
          <div className="label_input">
            <label>Título</label>

            <input
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
              onChange={(e) =>
                setEditingTask({
                  ...editingTask,
                  completed: e.value,
                })
              }
            />
          </div>

          <Button label="Salvar alterações" type="button" onClick={updateTask} />
        </form>
      </Dialog>

      <Footer />
    </>
  );
}

export default App;