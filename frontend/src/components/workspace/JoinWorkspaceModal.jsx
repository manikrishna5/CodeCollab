import { useState } from "react";

export default function JoinWorkspaceModal({
  onJoin,
  onClose,
}) {
  const [workspaceCode, setWorkspaceCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!workspaceCode.trim()) return;

    onJoin(workspaceCode.trim().toUpperCase());
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 border border-slate-700 rounded-2xl p-6 w-[420px]"
      >
        <h2 className="text-2xl font-bold text-white">
          Join Workspace
        </h2>

        <p className="text-slate-400 mt-2">
          Enter the workspace code shared by the owner.
        </p>

        <input
          value={workspaceCode}
          onChange={(e) => setWorkspaceCode(e.target.value)}
          placeholder="CC-XXXXXX"
          className="mt-6 w-full rounded-lg bg-slate-800 border border-slate-700 px-4 py-3 text-white outline-none focus:border-blue-500"
        />

        <div className="flex justify-end gap-3 mt-6">

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-700 hover:bg-slate-600"
          >
            Cancel
          </button>

          <button
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
          >
            Join
          </button>

        </div>

      </form>
    </div>
  );
}