import { useEffect, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import socket from "../../services/socket";
import { debounce } from "lodash";
import { useMemo } from "react";
import { saveEditor } from "../../api/editor.api";

const autoSave = useMemo(
  () =>
    debounce(async (code, language) => {
      try {
        await saveEditor(workspace._id, {
          code,
          language,
        });
      } catch (err) {
        console.error(err);
      }
    }, 2000),
  [workspace]
);

export default function Editor({ workspace }) {
  const [code, setCode] = useState(workspace?.code || "");
  const [language, setLanguage] = useState(
    workspace?.language || "javascript"
  );

  useEffect(() => {
    if (!workspace) return;

    setCode(workspace.code || "");
    setLanguage(workspace.language || "javascript");
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
    };
  }, []);

  const handleEditorChange = (value) => {
    const newCode = value || "";

    setCode(newCode);

    socket.emit("code-change", {
      workspaceId: workspace._id,
      code: newCode,
    });
    autoSave(newCode, language);
  };

  return (
    <div className="flex-1">
      <MonacoEditor
        height="100%"
        language={language}
        theme="vs-dark"
        value={code}
        onChange={handleEditorChange}
        options={{
          automaticLayout: true,
          fontSize: 15,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}