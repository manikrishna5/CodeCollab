import {
  FiArrowRight,
  FiCode,
  FiCopy,
  FiTrash2,
  FiUsers,
} from "react-icons/fi";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

export default function WorkspaceCard({
  workspace,
  onOpen,
  onDelete,
}) {
  const { user } = useAuth();

  const currentMember = workspace?.members?.find(
    (m) => m.user?._id === user?._id
  );

  const roleStyle = {
    Owner:
      "bg-amber-500/15 text-amber-300 border border-amber-500/30",
    Editor:
      "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30",
    Viewer:
      "bg-slate-800 text-slate-300 border border-slate-700",
  };

  const copyWorkspaceCode = async () => {
    try {
      await navigator.clipboard.writeText(
        workspace.workspaceCode
      );

      toast.success("Workspace code copied");
    } catch {
      toast.error("Unable to copy");
    }
  };

  return (
    <div className="rounded-[28px] border border-slate-800 bg-slate-900/95 p-6 shadow-lg shadow-slate-950/10 transition duration-300 hover:-translate-y-0.5 hover:border-blue-500/40 hover:shadow-blue-500/10 text-base">

      <div className="grid gap-6 lg:grid-cols-[1.3fr_0.85fr] items-start">

        <div className="space-y-6">

          <div className="flex items-start gap-4">

            <div className="rounded-2xl bg-blue-600/15 p-3 text-blue-300">
              <FiCode size={22} />
            </div>

            <div className="min-w-0">
              <h2 className="text-2xl font-semibold text-white truncate">
                {workspace.name}
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Owned by <span className="font-medium text-white">{workspace.owner?.fullName}</span>
              </p>
            </div>

          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-950 px-3 py-2 text-sm text-slate-300">
              {workspace.language || "General"}
            </span>
            <span className={`rounded-full px-3 py-2 text-sm font-semibold ${roleStyle[currentMember?.role] || roleStyle.Viewer}`}>
              {currentMember?.role || "Viewer"}
            </span>
            <span className="flex items-center gap-2 rounded-full bg-slate-950 px-3 py-2 text-sm text-slate-300">
              <FiUsers size={14} />
              {workspace.members?.length || 1} Members
            </span>
          </div>

        </div>

        <div className="rounded-[24px] border border-slate-800 bg-slate-950/80 p-5">

          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
                Workspace code
              </p>
              <div className="mt-3 flex items-center justify-between rounded-2xl bg-slate-900 px-3 py-3">
                <span className="font-mono text-sm text-blue-300 truncate">
                  {workspace.workspaceCode}
                </span>
                <button
                  onClick={copyWorkspaceCode}
                  className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-800"
                >
                  <FiCopy size={16} />
                </button>
              </div>
            </div>

            <div className="grid gap-3">
              <button
                onClick={() => onOpen(workspace._id)}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-sm font-semibold text-white transition hover:brightness-110"
              >
                Open Workspace
                <FiArrowRight size={16} />
              </button>
              {workspace.owner?._id === user?._id && (
                <button
                  onClick={() => onDelete(workspace._id)}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
                >
                  <FiTrash2 size={16} />
                  Delete Workspace
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}