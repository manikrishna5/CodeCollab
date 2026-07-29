export default function StatusBar({ workspace }) {
  return (
    <div className="h-8 bg-slate-900 border-t border-slate-800 flex items-center justify-between px-5 text-sm text-slate-400">

      <span>
        {workspace.language}
      </span>

      <span>
        Connected
      </span>

      <span>
        Ready
      </span>

    </div>
  );
}