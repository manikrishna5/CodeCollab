import { useState, useEffect } from "react";
import { FiCopy, FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [language, setLanguage] = useState("javascript");

  useEffect(() => {
    if (workspace?.language) {
      setLanguage(workspace.language);
    }
  }, [workspace]);

  const copyWorkspaceCode = async () => {
    if (!workspace?.workspaceCode) return;

    await navigator.clipboard.writeText(workspace.workspaceCode);

    toast.success("Workspace Code Copied");
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
    <div className="h-20 border-b border-slate-800 bg-slate-900 px-6 flex items-center justify-between">

      {/* Left */}

      <div className="flex items-center gap-6">

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 rounded-lg bg-slate-800 px-4 py-2 text-white hover:bg-slate-700 transition"
        >
          <FiArrowLeft />
          Dashboard
        </button>

        <div>

          <h1 className="text-2xl font-bold text-white">
            {workspace?.name}
          </h1>

          <p className="text-sm text-slate-400 mt-1">
            Workspace Code :
            <span className="ml-2 font-semibold text-blue-400">
              {workspace?.workspaceCode}
            </span>
          </p>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        <select
          value={language}
          onChange={changeLanguage}
          className="rounded-lg bg-slate-800 px-4 py-2 text-white outline-none border border-slate-700"
        >
          {languages.map((lang) => (
            <option
              key={lang}
              value={lang}
            >
              {lang}
            </option>
          ))}
        </select>

        <button
          onClick={copyWorkspaceCode}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
        >
          <FiCopy />
          Copy Code
        </button>

      </div>

    </div>
  );
}