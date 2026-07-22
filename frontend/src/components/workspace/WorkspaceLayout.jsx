import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import WorkspaceHeader from "./WorkspaceHeader";
import FileExplorer from "./FileExplorer";
import Editor from "./Editor";
import StatusBar from "./StatusBar";

import { getWorkspaceTree } from "../../api/workspace.api";
import { getFileById } from "../../api/file.api";
import socket from "../../services/socket";

const WorkspaceLayout = () => {
  const { workspaceId } = useParams();

  const [workspace, setWorkspace] = useState(null);
  const [folders, setFolders] = useState([]);
  const [files, setFiles] = useState([]);

  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    loadWorkspace();
  }, []);

  useEffect(() => {
  socket.connect();

  socket.emit("join-workspace", workspaceId);

  return () => {
    socket.emit("leave-workspace", workspaceId);
    socket.disconnect();
  };
}, [workspaceId]);

  const loadWorkspace = async () => {
    try {
      const response = await getWorkspaceTree(workspaceId);

      setWorkspace(response.data.workspace);
      setFolders(response.data.folders);
      setFiles(response.data.files);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFileClick = async (fileId) => {
    try {
      const response = await getFileById(fileId);

      setSelectedFile(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="workspace">

      <WorkspaceHeader workspace={workspace} />

      <div className="workspace-body">

        <FileExplorer
          folders={folders}
          files={files}
          onFileClick={handleFileClick}
        />

        <Editor
          file={selectedFile}
        />

      </div>

      <StatusBar />

    </div>
  );
};

export default WorkspaceLayout;