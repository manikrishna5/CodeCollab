import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";

import {
  getWorkspaces,
  createWorkspace,
  deleteWorkspace,
  joinWorkspace,
} from "../api/workspace.api";

import WorkspaceCard from "../components/workspace/WorkspaceCard";
import CreateWorkspaceModal from "../components/workspace/CreateWorkspaceModal";
import JoinWorkspaceModal from "../components/workspace/JoinWorkspaceModal";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);

  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const res = await getWorkspaces();
      setWorkspaces(res.data.data);
    } catch {
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
      toast.error(err.response?.data?.message || "Unable to create workspace");
    }
  };

  const handleJoin = async (workspaceCode) => {
    try {
      await joinWorkspace(workspaceCode);
      toast.success("Workspace Joined");
      setShowJoinModal(false);
      fetchWorkspaces();
    } catch (err) {
      toast.error(err.response?.data?.message || "Unable to join workspace");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this workspace?")) return;

    try {
      await deleteWorkspace(id);
      toast.success("Workspace Deleted");
      fetchWorkspaces();
    } catch {
      toast.error("Delete Failed");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 text-base">

      {/* Header */}

      <header className="border-b border-slate-800 bg-slate-950/90 backdrop-blur sticky top-0 z-50">

        <div className="mx-auto flex h-20 max-w-full items-center justify-between px-6">

          <div>

            <h1 className="text-3xl font-bold tracking-tight">

              CodeCollab

            </h1>

            <p className="text-sm text-slate-400">

              Build Together. Code Together.

            </p>

          </div>

          <div className="flex items-center gap-4">

            <div className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2">

              {user?.fullName}

            </div>

            <button
              onClick={handleLogout}
              className="rounded-xl bg-red-500/10 px-4 py-2 text-red-300 border border-red-500/20 hover:bg-red-500/20 transition"
            >

              Logout

            </button>

          </div>

        </div>

      </header>

      <main className="mx-auto max-w-full px-6 py-10 text-base">

        <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">

          <section className="rounded-[32px] border border-slate-800 bg-slate-900/95 p-8 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.9)]">

            <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">

              <div className="space-y-5 max-w-2xl">

                <p className="uppercase tracking-[0.32em] text-xs text-sky-400">
                  Workspace hub
                </p>

                <h2 className="text-3xl font-semibold tracking-tight text-white">
                  Welcome back 👋
                </h2>

                <p className="text-slate-400 leading-7">
                  Create, join, and collaborate in shared coding workspaces with a clean, minimal dashboard built for focused teamwork.
                </p>

              </div>

              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1 xl:w-full">

                <button
                  onClick={() => setShowModal(true)}
                  className="h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-sm font-medium text-white shadow-lg shadow-blue-500/15 transition hover:brightness-110"
                >
                  New Workspace
                </button>

                <button
                  onClick={() => setShowJoinModal(true)}
                  className="h-12 rounded-xl border border-slate-700 bg-slate-950 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
                >
                  Join Workspace
                </button>

              </div>

            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">

              <div className="rounded-[24px] border border-slate-800 bg-slate-950/70 p-5 text-white">
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Active workspaces</p>
                <p className="mt-3 text-2xl font-semibold">{workspaces.length}</p>
              </div>

              <div className="rounded-[24px] border border-slate-800 bg-slate-950/70 p-5 text-white">
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Current status</p>
                <p className="mt-3 text-2xl font-semibold">{workspaces.length > 0 ? "Live" : "New"}</p>
              </div>

            </div>
          </section>

          <section className="rounded-[32px] border border-slate-800 bg-slate-900/95 p-8 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.9)]">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Workspace controls</h3>
              <p className="text-sm leading-6 text-slate-400">
                Quickly create or join a workspace, then jump back into your live sessions.
              </p>
            </div>
            <div className="mt-6 grid gap-3">
              <button
                onClick={() => setShowModal(true)}
                className="h-12 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-sm font-medium text-white shadow-lg shadow-blue-500/15 transition hover:brightness-110"
              >
                Create new workspace
              </button>
              <button
                onClick={() => setShowJoinModal(true)}
                className="h-12 rounded-xl border border-slate-700 bg-slate-950 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
              >
                Join existing workspace
              </button>
            </div>
          </section>

        </div>

        <div className="mt-10 mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h2 className="text-2xl font-bold leading-tight">

              My Workspaces

            </h2>

            <p className="text-slate-400 mt-1">

              {workspaces.length} Workspace
              {workspaces.length !== 1 && "s"}

            </p>

          </div>

        </div>
                {loading ? (
          <div className="flex h-72 items-center justify-center rounded-3xl border border-slate-800 bg-slate-900">
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-4 text-slate-400">
                Loading workspaces...
              </p>
            </div>
          </div>
        ) : workspaces.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900 py-24 text-center">

            <div className="text-6xl">🚀</div>

            <h2 className="mt-6 text-2xl font-bold">

              No Workspace Yet

            </h2>

            <p className="mt-3 text-slate-400">

              Create your first collaborative coding workspace.

            </p>

            <div className="mt-8 flex justify-center gap-4">

              <button
                onClick={() => setShowModal(true)}
                className="rounded-xl bg-blue-600 px-6 py-3 font-medium hover:bg-blue-500 transition"
              >

                Create Workspace

              </button>

              <button
                onClick={() => setShowJoinModal(true)}
                className="rounded-xl border border-slate-700 px-6 py-3 hover:bg-slate-800 transition"
              >

                Join Workspace

              </button>

            </div>

          </div>
        ) : (
          <div className="space-y-6">

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
      </main>

      {showModal && (
        <CreateWorkspaceModal
          onCreate={handleCreate}
          onClose={() => setShowModal(false)}
        />
      )}

      {showJoinModal && (
        <JoinWorkspaceModal
          onJoin={handleJoin}
          onClose={() => setShowJoinModal(false)}
        />
      )}
    </div>
  );
}