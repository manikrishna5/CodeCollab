import { useState } from "react";

export default function CreateWorkspaceModal({
  onCreate,
  onClose,
}) {
  const [name, setName] = useState("");

  const submit = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    onCreate({
      name,
    });

    setName("");
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center">

      <form
        onSubmit={submit}
        className="bg-slate-900 rounded-xl p-8 w-[400px]"
      >

        <h2 className="text-2xl font-bold mb-6">
          New Workspace
        </h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Workspace Name"
          className="w-full p-3 rounded-lg bg-slate-800 outline-none"
        />

        <div className="flex justify-end gap-3 mt-6">

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-700 rounded-lg"
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-600 rounded-lg"
          >
            Create
          </button>

        </div>

      </form>
    </div>
  );
}