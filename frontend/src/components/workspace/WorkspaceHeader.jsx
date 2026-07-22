const WorkspaceHeader = ({ workspace, file }) => {
  return (
    <header className="workspace-header">
      <h2>{workspace?.name}</h2>

      <span>
        {file ? file.name : "No File Selected"}
      </span>
    </header>
  );
};

export default WorkspaceHeader;