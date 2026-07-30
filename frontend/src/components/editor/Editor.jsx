import { useEffect, useMemo, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { debounce } from "lodash";
import { useAuth } from "../../context/AuthContext";
import socket from "../../services/socket";
import { saveEditor } from "../../api/editor.api";

export default function Editor({ workspace }) {
  const { user } = useAuth();

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");

  const currentMember = workspace?.members?.find(
    (member) => member.user?._id === user?._id
  );

  const readOnly = currentMember?.role === "Viewer";

  useEffect(() => {
    if (!workspace) return;

    setCode(workspace.code || "");
    setLanguage(workspace.language || "javascript");
  }, [workspace]);

  const autoSave = useMemo(() => {
    return debounce(async (newCode, newLanguage) => {
      if (!workspace?._id) return;

      try {
        await saveEditor(workspace._id, {
          code: newCode,
          language: newLanguage,
        });
      } catch (err) {
        console.error("Auto Save Error:", err);
      }
    }, 2000);
  }, [workspace]);

  useEffect(() => {
    if (!workspace?._id) return;

    socket.emit("join-workspace", workspace._id);

    const handleCodeUpdated = ({ code }) => {
      setCode(code);
    };

    const handleLanguageUpdated = ({ language }) => {
      setLanguage(language);
    };

    socket.on("code-updated", handleCodeUpdated);
    socket.on("language-updated", handleLanguageUpdated);

    return () => {
      socket.off("code-updated", handleCodeUpdated);
      socket.off("language-updated", handleLanguageUpdated);
      autoSave.cancel();
    };
  }, [workspace, autoSave]);

  const handleEditorChange = (value) => {
    if (readOnly) return;

    const newCode = value || "";

    setCode(newCode);

    if (!workspace?._id) return;

    socket.emit("code-change", {
      workspaceId: workspace._id,
      code: newCode,
    });

    autoSave(newCode, language);
  };

  const handleLanguageChange = (newLanguage) => {
    if (readOnly) return;

    setLanguage(newLanguage);

    if (!workspace?._id) return;

    socket.emit("language-change", {
      workspaceId: workspace._id,
      language: newLanguage,
    });

    autoSave(code, newLanguage);
  };

  return (
    <div className="flex-1 h-full">
      <MonacoEditor
        height="100%"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={handleEditorChange}
        options={{
          automaticLayout: true,
          fontSize: 15,
          readOnly,
          minimap: {
            enabled: false,
          },
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}