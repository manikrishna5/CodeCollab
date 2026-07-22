import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import WorkspaceCard from "../components/workspace/WorkspaceCard";
import CreateWorkspaceModal from "../components/workspace/CreateWorkspaceModal";

import {
  getUserWorkspaces,
  createWorkspace,
  deleteWorkspace,
} from "../api/workspace.api";

import "../styles/dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      setLoading(true);

      const response = await getUserWorkspaces();

      setWorkspaces(response.data || []);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch workspaces");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWorkspace = async (workspaceData) => {
    try {
      await createWorkspace(workspaceData);

      setShowModal(false);

      fetchWorkspaces();
    } catch (error) {
      console.error(error);
      alert("Failed to create workspace");
    }
  };

  const handleDeleteWorkspace = async (workspaceId) => {
    const confirmDelete = window.confirm(
      "Delete this workspace?"
    );

    if (!confirmDelete) return;

    try {
      await deleteWorkspace(workspaceId);

      fetchWorkspaces();
    } catch (error) {
      console.error(error);
      alert("Failed to delete workspace");
    }
  };

  const handleOpenWorkspace = (workspaceId) => {
    navigate(`/workspace/${workspaceId}`);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="dashboard">

      <div className="dashboard-header">

        <h1>My Workspaces</h1>

        <button
          className="create-workspace-btn"
          onClick={() => setShowModal(true)}
        >
          + Create Workspace
        </button>

      </div>

      {workspaces.length === 0 ? (
        <div className="empty-state">
          <h2>No Workspaces Found</h2>

          <p>Create your first workspace.</p>
        </div>
      ) : (
        <div className="workspace-grid">

          {workspaces.map((workspace) => (
            <WorkspaceCard
              key={workspace._id}
              workspace={workspace}
              onOpen={handleOpenWorkspace}
              onDelete={handleDeleteWorkspace}
            />
          ))}

        </div>
      )}

      {showModal && (
        <CreateWorkspaceModal
          onCreate={handleCreateWorkspace}
          onClose={() => setShowModal(false)}
        />
      )}

    </div>
  );
};

export default Dashboard;