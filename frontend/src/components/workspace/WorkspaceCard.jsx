import { Trash2, ArrowRight } from "react-icons/fi";

export default function WorkspaceCard({
  workspace,
  onOpen,
  onDelete,
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex justify-between items-center">

      <div>
        <h2 className="text-xl font-semibold text-white">
          {workspace.name}
        </h2>

        <p className="text-slate-400 text-sm mt-1">
          Created by you
        </p>
      </div>

      <div className="flex gap-3">

        <button
          onClick={() => onOpen(workspace._id)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
        >
          Open
          <ArrowRight size={16} />
        </button>

        <button
          onClick={() => onDelete(workspace._id)}
          className="bg-red-600 hover:bg-red-700 p-2 rounded-lg"
        >
          <Trash2 size={18} />
        </button>

      </div>

    </div>
  );
}