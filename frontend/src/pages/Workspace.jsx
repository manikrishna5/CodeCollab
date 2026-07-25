import { useParams } from "react-router-dom";

export default function Workspace() {
  const { workspaceId } = useParams();

  return (
    <div className="flex h-screen items-center justify-center bg-slate-900 text-white">
      <h1 className="text-3xl font-bold">
        Workspace : {workspaceId}
      </h1>
    </div>
  );
}