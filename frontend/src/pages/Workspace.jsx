import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getWorkspace } from "../api/workspace.api";
import MembersPanel from "../components/editor/MembersPanel";
import Editor from "../components/editor/Editor";
import EditorHeader from "../components/editor/EditorHeader";
import StatusBar from "../components/editor/StatusBar";

import socket from "../services/socket";

export default function Workspace() {

    const { workspaceId } = useParams();

    const [workspace, setWorkspace] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadWorkspace();

    }, []);

    useEffect(() => {

        socket.connect();

        socket.emit("join-workspace", workspaceId);

        return () => {

            socket.emit("leave-workspace", workspaceId);

            socket.disconnect();

        };

    }, [workspaceId]);

    const loadWorkspace = async () => {

        try {

            const res = await getWorkspace(workspaceId);

            setWorkspace(res.data.data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    if (loading)
        return (
            <div className="h-screen flex justify-center items-center text-white bg-slate-950">
                Loading...
            </div>
        );

    return (

        <div className="h-screen flex flex-col bg-slate-950">

            <EditorHeader workspace={workspace} />

            <div className="flex flex-1">

    <div className="flex-1">

        <Editor workspace={workspace} />

    </div>

    <MembersPanel workspace={workspace} />

</div>

            <StatusBar workspace={workspace} />

        </div>

    );

}