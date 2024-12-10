import * as Y from "yjs";
import React, { FormEvent, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";
import { Notify } from "@/lib/utils";
import {
  BotIcon,
  MessageCircleCode,
  Clipboard,
  CheckCircle,
} from "lucide-react";
import Markdown from "react-markdown";
import { Input } from "./ui/input";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ChatToDocument = ({ doc }: { doc: Y.Doc }) => {
  const [open, setOpen] = React.useState(false);
  const [summary, setSummary] = React.useState<string>("");
  const [question, setQuestion] = React.useState("");
  const [input, setInput] = React.useState("");
  const [isPending, setTransition] = useTransition();
  const [copied, setCopied] = React.useState(false);

  const handleAskQuestion = async (e: FormEvent) => {
    e.preventDefault();
    setQuestion(input);
    setTransition(async () => {
      try {
        const documentData = doc.get("document-store").toJSON();
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/googleChat`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              documentData,
              question,
            }),
          }
        );

        if (response.status === 429) {
          // Retry logic for rate limit
          const retryAfter = response.headers.get("Retry-After");
          const delay = retryAfter ? parseInt(retryAfter, 10) * 1000 : 10000;
          Notify({
            message: `Rate limit reached, retrying after ${
              delay / 1000
            } seconds...`,
            type: "error",
          });
          await new Promise((resolve) => setTimeout(resolve, delay));
          return await handleAskQuestion(e); // Retry the request
        }

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const data = await response.json();
        // Normalize the response message by replacing \n with \n\n for paragraph breaks
        const normalizedMessage = data.message.replace(/\n/g, "\n\n");
        setSummary(normalizedMessage);
        setInput("");
        Notify({ message: "Get Response Successfully", type: "success" });
      } catch (error) {
        console.error("Error during Chatting:", error);
        Notify({
          message: `Error: ${(error as Error).message}`,
          type: "error",
        });
      }
    });
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false); // Reset the icon after 2 seconds
    }, 2000); // Icon will reset after 2 seconds
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <MessageCircleCode className="mr-1" />
          Chat to Document
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ask a Question to Google ✨</DialogTitle>
          <DialogDescription>
            Ask a question to the AI and it will answer you about the document.
          </DialogDescription>
        </DialogHeader>
        <hr className="mt-5" />
        {summary && (
          <div className="flex flex-col items-start rounded-lg max-h-96 overflow-y-scroll gap-2 p-2 bg-gray-100">
            <div className="flex">
              <BotIcon className="w-10 flex-shrink-0" />
              <p className="font-bold">
                Gemini{" "}
                {isPending ? (
                  <span className="font-bold text-transparent animate-pulse bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text">
                    {"is thinking..."}
                  </span>
                ) : (
                  <span className="font-bold text-transparent  bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text">
                    {"Says:"}
                  </span>
                )}
              </p>
            </div>
            {isPending ? (
              <span className="font-bold text-transparent animate-pulse bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text">
                {"Thinking..."}
              </span>
            ) : (
              <div className="relative">
                <Markdown>{summary}</Markdown>
                {/* Copy Button with dynamic icon */}
                <CopyToClipboard text={summary} onCopy={handleCopy}>
                  <Button
                    className=" fixed top-10 cursor-pointer right-2 p-2 text-sm text-white bg-gray-400 rounded hover:bg-gray-600"
                    title="Copy to clipboard"
                  >
                    {copied ? (
                      <CheckCircle size={10} />
                    ) : (
                      <Clipboard size={10} />
                    )}
                  </Button>
                </CopyToClipboard>
              </div>
            )}
          </div>
        )}
        {question && <p className="mt-5 text-gray-500">Q: {question}</p>}
        <form onSubmit={handleAskQuestion} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="i.e. What is the document about?"
            className="w-full"
            type="text"
          />

          <Button type="submit" disabled={isPending || !input}>
            {isPending ? "Asking..." : "Ask"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChatToDocument;
