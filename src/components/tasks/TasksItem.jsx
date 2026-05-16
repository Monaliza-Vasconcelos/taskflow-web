import { MultiSelect } from "primereact/multiselect";
import { ListFilter } from "lucide-react";

function Item({ filterStatus, setFilterStatus, tasks }) {
  const statusOptions = [
    { name: "Pendente", code: "PE" },
    { name: "Concluído", code: "CO" },
  ];

  const total = tasks.length;
  const concluidas = tasks.filter((t) => t.completed).length;
  const pendentes = tasks.filter((t) => !t.completed).length;

  return (
    <div className="container_Item">
      <div className="item_quantidade">
        <h2>Todas as tarefas</h2>

        <p>
          <ListFilter size={15} /> Filtrar
        </p>
      </div>

      <div className="item_filtros">
        <MultiSelect
          value={filterStatus}
          options={statusOptions}
          onChange={(e) => setFilterStatus(e.value)}
          optionLabel="name"
          optionValue="code"
          placeholder="Selecione o status"
        />

        <div className="item_p">
          <p className="item_filtros_todos">Total: {total}</p>
          <p className="item_filtros_concluido">Concluídas: {concluidas}</p>
          <p className="item_filtros_pendente">Pendentes: {pendentes}</p>
        </div>
      </div>
    </div>
  );
}

export default Item;