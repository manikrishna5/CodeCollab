import { useEffect, useMemo, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { debounce } from "lodash";
import { updateFileContent } from "../../api/file.api";

const Editor = ({ file }) => {
  const [code, setCode] = useState("");

  useEffect(() => {
    if (file) {
      setCode(file.content || "");
    }
  }, [file]);

  const saveFile = useMemo(
    () =>
      debounce(async (fileId, content) => {
        try {
          await updateFileContent(fileId, content);
          console.log("Auto Saved");
        } catch (err) {
          console.error(err);
        }
      }, 2000),
    []
  );

  const handleChange = (value) => {
    const newCode = value || "";

    setCode(newCode);

    if (file) {
      saveFile(file._id, newCode);
    }
  };

  return (
    <div className="editor">
      {file ? (
        <MonacoEditor
          height="100%"
          language={file.language || "javascript"}
          theme="vs-dark"
          value={code}
          onChange={handleChange}
          options={{
            automaticLayout: true,
            minimap: {
              enabled: false,
            },
          }}
        />
      ) : (
        <h2>Select a file</h2>
      )}
    </div>
  );
};

export default Editor;