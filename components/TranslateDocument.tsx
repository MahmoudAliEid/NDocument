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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "./ui/button";
import { Notify } from "@/lib/utils";
import { BotIcon, LanguagesIcon } from "lucide-react";
import Markdown from "react-markdown";

type Language =
  | "english"
  | "spanish"
  | "portuguese"
  | "french"
  | "german"
  | "chinese"
  | "arabic"
  | "hindi"
  | "russian"
  | "japanese";

const languages: Language[] = [
  "english",
  "spanish",
  "portuguese",
  "french",
  "german",
  "chinese",
  "arabic",
  "hindi",
  "russian",
  "japanese",
];

const TranslateDocument = ({ doc }: { doc: Y.Doc }) => {
  const [language, setLanguage] = React.useState<Language>("english");
  const [open, setOpen] = React.useState(false);
  const [summary, setSummary] = React.useState<string>("");

  const [isPending, setTransition] = useTransition();

  const handleAskQuestion = async (e: FormEvent) => {
    e.preventDefault();
    setTransition(async () => {
      try {
        const documentData = doc.get("document-store").toJSON();
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/documentTranslation`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              documentData,
              targetLang: language,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const data = await response.json();
        setSummary(data.translationResponse.translated_text);
        console.log(data);
        Notify({ message: "Translation successful", type: "success" });
      } catch (error) {
        console.error("Error during translation:", error);
        Notify({
          message: `Error: ${(error as Error).message}`,
          type: "error",
        });
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <LanguagesIcon />
          Translate
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Translate the Document</DialogTitle>
          <DialogDescription>
            Select a language and AI will translate a Summary of the Document
            for you.
          </DialogDescription>
        </DialogHeader>
        <hr className="mt-5" />
        {summary && (
          <div className="flex flex-col items-start rounded-lg  max-h-96 overflow-y-scroll gap-2 p-2 bg-gray-100 ">
            <div className="flex">
              <BotIcon className="w-10 flex-shrink-0" />
              <p className="font-bold">
                GPT{" "}
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
              <Markdown>{summary}</Markdown>
            )}
          </div>
        )}

        <form onSubmit={handleAskQuestion} className="flex gap-2">
          <Select
            value={language}
            onValueChange={(value) => setLanguage(value as Language)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a Language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((lang) => (
                <SelectItem
                  key={lang}
                  value={lang}
                  onClick={() => {
                    setLanguage(lang);
                  }}
                >
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button type="submit" disabled={isPending || !language}>
            {isPending ? "Translating..." : "Translate"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TranslateDocument;
