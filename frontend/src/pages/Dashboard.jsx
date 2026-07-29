import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import {
  getWorkspaces,
  createWorkspace,
  deleteWorkspace,
} from "../api/workspace.api";

import WorkspaceCard from "../components/workspace/WorkspaceCard";
import CreateWorkspaceModal from "../components/workspace/CreateWorkspaceModal";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const res = await getWorkspaces();
      setWorkspaces(res.data.data);
    } catch (err) {
      toast.error("Failed to load workspaces");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (data) => {
    try {
      await createWorkspace(data);

      toast.success("Workspace Created");

      setShowModal(false);

      fetchWorkspaces();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Unable to create workspace"
      );
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this workspace?")) return;

    try {
      await deleteWorkspace(id);

      toast.success("Workspace Deleted");

      fetchWorkspaces();
    } catch (err) {
      toast.error("Delete Failed");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}

      <div className="border-b border-slate-800">

        <div className="max-w-7xl mx-auto h-20 flex justify-between items-center px-6">

          <h1 className="text-3xl font-bold">
            CodeCollab
          </h1>

          <div className="flex items-center gap-5">

            <span className="text-slate-300">
              {user?.fullName}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
            >
              Logout
            </button>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="max-w-6xl mx-auto py-10 px-6">

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">
            My Workspaces
          </h2>

          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl"
          >
            + New Workspace
          </button>

        </div>

        {loading ? (
          <div className="text-center text-slate-400">
            Loading...
          </div>
        ) : workspaces.length === 0 ? (
          <div className="text-center text-slate-500 mt-20">
            No workspaces found.
          </div>
        ) : (
          <div className="space-y-4">

            {workspaces.map((workspace) => (
              <WorkspaceCard
                key={workspace._id}
                workspace={workspace}
                onOpen={(id) => navigate(`/workspace/${id}`)}
                onDelete={handleDelete}
              />
            ))}

          </div>
        )}

      </div>

      {showModal && (
        <CreateWorkspaceModal
          onCreate={handleCreate}
          onClose={() => setShowModal(false)}
        />
      )}

    </div>
  );
}