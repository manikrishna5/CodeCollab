import { FiCopy } from "react-icons/fi";
import toast from "react-hot-toast";

const languages = [
  "javascript",
  "typescript",
  "java",
  "python",
  "cpp",
  "c",
];

import { useState } from "react";
import socket from "../../services/socket";

const [language, setLanguage] = useState(workspace.language);

const changeLanguage = (e) => {
  const lang = e.target.value;

  setLanguage(lang);

  socket.emit("language-change", {
    workspaceId: workspace._id,
    language: lang,
  });
};


export default function EditorHeader({ workspace }) {
  const copyRoomId = async () => {
    await navigator.clipboard.writeText(workspace._id);
    toast.success("Workspace ID copied");
  };

  return (
    <div className="h-16 border-b border-slate-800 bg-slate-900 flex items-center justify-between px-6">

      <div>
        <h1 className="text-xl font-semibold text-white">
          {workspace.name}
        </h1>
      </div>
      <select
            value={language}
            onChange={changeLanguage}
            className="bg-slate-800 px-3 py-2 rounded-lg mr-4"
            >
            {languages.map((lang) => (
                <option key={lang}>{lang}</option>
            ))}
        </select>
      <button
        onClick={copyRoomId}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
      >
        <FiCopy />
        Copy Room ID
      </button>

    </div>
  );
}