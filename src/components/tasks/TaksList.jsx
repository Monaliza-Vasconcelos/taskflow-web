import { Pencil, Trash2 } from "lucide-react";

function List({
  title,
  description = "",
  completed,
  onToggle,
  onDelete,
  onEdit,
}) {
  return (
    <div className="container_list">
      <div className="left_content">
        <div className="input_checkbox">
          <input
            className={completed ? "ativo" : "inativo"}
            type="checkbox"
            checked={completed}
            onChange={onToggle}
          />
        </div>

        <div className="content_list">
          <h2 className={completed ? "color_green" : "color_yelloo"}>
            {title}
          </h2>

          <p>{description}</p>
        </div>
      </div>

      <div className="right_content">
        <p className={completed ? "status_concluido" : "status_pendente"}>
          {completed ? "Concluído" : "Pendente"}
        </p>

        <div className="btn_edti_delete">
          <button className="btn_edit" onClick={onEdit}>
            <Pencil size={18} />
          </button>

          <button className="btn_delete" onClick={onDelete}>
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default List;
