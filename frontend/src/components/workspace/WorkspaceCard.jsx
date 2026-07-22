import "./WorkspaceCard.css";

const WorkspaceCard = ({ workspace, onOpen, onDelete }) => {
  return (
    <div className="workspace-card">

      <div className="workspace-content">

        <h3>{workspace.name}</h3>

        <p>{workspace.description || "No Description"}</p>

        <span className="visibility">
          {workspace.visibility}
        </span>

      </div>

      <div className="workspace-actions">

        <button
          className="open-btn"
          onClick={() => onOpen(workspace._id)}
        >
          Open
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(workspace._id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
};

export default WorkspaceCard;