import { MenuIcon } from "lucide-react";
import NewDocumentButton from "./NewDocumentButton";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const SideBar = () => {
  return (
    <div className="relative p-2 md:p-5 bg-slate-200">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="rounded-lg hover:opacity-30 p-2" size={40} />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div>{/* option */}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:inline hidden">
        <NewDocumentButton />
      </div>
    </div>
  );
};

export default SideBar;
