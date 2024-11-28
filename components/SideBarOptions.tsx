import { db } from "@/firebase";
import { doc } from "firebase/firestore";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { usePathname } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
import Link from "next/link";

const SideBarOptions = ({ id, href }: { id: string; href: string }) => {
  const [data, loading] = useDocumentData(doc(db, "documents", id));
  const pathName = usePathname();
  const isActive = href.includes(pathName) && pathName !== "/";

  return (
    <>
      {loading && (
        <>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-9 mb-2" />
          ))}
        </>
      )}
      {data && (
        <Link
          href={href}
          className={`border p-2 rounded-md font-sans font-semibold  hover:bg-gray-100 text-primary text-center ${
            isActive ? "bg-gray-100 border-primary" : "border-gray-400  "
          }`}
        >
          <p className="truncate overflow-hidden text-ellipsis whitespace-nowrap">
            {data?.title}
          </p>
        </Link>
      )}
    </>
  );
};

export default SideBarOptions;
