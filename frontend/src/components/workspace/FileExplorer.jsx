const FileExplorer = ({
  folders,
  files,
  onFileClick,
}) => {
  return (
    <aside className="file-explorer">

      <h3>Explorer</h3>

      <hr />

      <h4>Folders</h4>

      {folders.map((folder) => (
        <div key={folder._id}>
          📁 {folder.name}
        </div>
      ))}

      <br />

      <h4>Files</h4>

      {files.map((file) => (
        <div
          key={file._id}
          onClick={() => onFileClick(file._id)}
          style={{
            cursor: "pointer",
            marginBottom: "8px",
          }}
        >
          📄 {file.name}
        </div>
      ))}

    </aside>
  );
};

export default FileExplorer;