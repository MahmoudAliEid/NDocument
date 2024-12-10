import { useRoom, useSelf } from "@liveblocks/react/suspense";
import React, { useEffect, useState } from "react";
import * as Y from "yjs";
import { LiveblocksYjsProvider } from "@liveblocks/yjs";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";
import { BlockNoteView } from "@blocknote/shadcn";
import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import { stringToColor } from "@/lib/stringToColor";
import TranslateDocument from "./TranslateDocument";
import ChatToDocument from "./ChatToDocument";

type BlockNoteProps = {
  doc: Y.Doc;
  provider: LiveblocksYjsProvider;
  darkMode: boolean;
};
const BlockNote = ({ doc, provider, darkMode }: BlockNoteProps) => {
  const userInfo = useSelf((me) => me.info);

  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: userInfo?.name,
        color: stringToColor(userInfo?.email || "1"),
      },
    },
  });

  return (
    <div className="relative max-w-5xl mx-auto">
      <BlockNoteView
        editor={editor}
        theme={darkMode ? "dark" : "light"}
        className="min-h-screen "
      />
    </div>
  );
};

const Editor = () => {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<LiveblocksYjsProvider>();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksYjsProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yProvider?.disconnect();
      yDoc?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="flex items-center justify-end mb-10 gap-2">
        {/* translation ai */}
        <TranslateDocument doc={doc} />
        {/* chat ai */}
        <ChatToDocument doc={doc} />
        {/* dark mode */}
        <Button
          onClick={() => setDarkMode(!darkMode)}
          className={`${
            darkMode
              ? "bg-primary  text-gray-100 hover:bg-gray-100 hover:text-primary"
              : "bg-gray-100 text-primary hover:bg-primary hover:text-gray-100"
          }  rounded-md  ease-in-out transition-all 
                    `}
        >
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </Button>
      </div>
      {/* block note */}
      <BlockNote doc={doc} provider={provider} darkMode={darkMode} />
    </div>
  );
};

export default Editor;
