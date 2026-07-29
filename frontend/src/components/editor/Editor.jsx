import { useEffect, useMemo, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { debounce } from "lodash";

import socket from "../../services/socket";
import { saveEditor } from "../../api/editor.api";

export default function Editor({ workspace }) {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");

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
  }, [autoSave]);

  const handleEditorChange = (value) => {
    const newCode = value || "";

    setCode(newCode);

    if (workspace?._id) {
      socket.emit("code-change", {
        workspaceId: workspace._id,
        code: newCode,
      });

      autoSave(newCode, language);
    }
  };

  return (
    <div className="flex-1">
      <MonacoEditor
        height="100%"
        theme="vs-dark"
        language={language}
        value={code}
        onChange={handleEditorChange}
        options={{
          automaticLayout: true,
          fontSize: 15,
          minimap: {
            enabled: false,
          },
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}