import { useEffect, useState } from "react";
import {
  getWorkspaceMembers,
  updateMemberRole,
} from "../../api/workspace.api";
import { useAuth } from "../../context/AuthContext";

export default function MembersPanel({ workspace }) {
  const { user } = useAuth();

  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (workspace?._id) {
      loadMembers();
    }
  }, [workspace]);

  const loadMembers = async () => {
    const res = await getWorkspaceMembers(
      workspace._id
    );

    setMembers(res.data.data);
  };

  const changeRole = async (
    memberId,
    role
  ) => {

    await updateMemberRole(
      workspace._id,
      memberId,
      role
    );

    loadMembers();

  };

  return (
    <div className="w-72 border-l border-slate-800 bg-slate-900 p-4">

      <h2 className="text-xl font-bold text-white mb-5">
        Members
      </h2>

      {members.map((member) => {

        const isOwner =
          workspace.owner._id === user._id;

        return (

          <div
            key={member.user._id}
            className="flex justify-between items-center mb-4"
          >

            <div>

              <p className="text-white">
                {member.user.fullName}
              </p>

              <p className="text-xs text-slate-400">
                {member.user.email}
              </p>

            </div>

            {isOwner ? (

              <select
                value={member.role}
                onChange={(e) =>
                  changeRole(
                    member.user._id,
                    e.target.value
                  )
                }
                className="bg-slate-800 text-white rounded px-2 py-1"
              >

                <option>
                  Owner
                </option>

                <option>
                  Editor
                </option>

                <option>
                  Viewer
                </option>

              </select>

            ) : (

              <span className="text-slate-400">
                {member.role}
              </span>

            )}

          </div>

        );

      })}

    </div>
  );

}