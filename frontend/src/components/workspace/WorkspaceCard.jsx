import { FiTrash2, FiArrowRight } from "react-icons/fi";

export default function WorkspaceCard({
  workspace,
  onOpen,
  onDelete,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex items-center justify-between hover:border-slate-700 transition-all">

      <div>
        <h2 className="text-xl font-semibold text-white">
          {workspace.name}
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Created by you
        </p>
      </div>

      <div className="flex items-center gap-3">

        <button
          onClick={() => onOpen(workspace._id)}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
        >
          Open
          <FiArrowRight size={16} />
        </button>

        <button
          onClick={() => onDelete(workspace._id)}
          className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
        >
          <FiTrash2 size={18} />
        </button>

      </div>

    </div>
  );
}