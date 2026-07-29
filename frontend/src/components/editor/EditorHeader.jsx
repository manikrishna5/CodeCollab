import { useState, useEffect } from "react";
import { FiCopy } from "react-icons/fi";
import toast from "react-hot-toast";
import socket from "../../services/socket";

const languages = [
  "javascript",
  "typescript",
  "java",
  "python",
  "cpp",
  "c",
];

export default function EditorHeader({ workspace }) {
  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    if (workspace?.language) {
      setLanguage(workspace.language);
    }
  }, [workspace]);

  const copyRoomId = async () => {
    if (!workspace?._id) return;

    await navigator.clipboard.writeText(workspace._id);
    toast.success("Workspace ID copied");
  };

  const changeLanguage = (e) => {
    const lang = e.target.value;

    setLanguage(lang);

    if (!workspace?._id) return;

    socket.emit("language-change", {
      workspaceId: workspace._id,
      language: lang,
    });
  };

  return (
    <div className="h-16 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-6">

      <h1 className="text-xl font-semibold text-white">
        {workspace?.name || "Workspace"}
      </h1>

      <div className="flex items-center gap-4">

        <select
          value={language}
          onChange={changeLanguage}
          className="rounded-lg bg-slate-800 px-3 py-2 text-white outline-none"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>

        <button
          onClick={copyRoomId}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <FiCopy />
          Copy Room ID
        </button>

      </div>

    </div>
  );
}