import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react";

const Breadcrumbs = () => {
  const pathName = usePathname();
  const pathArray = pathName.split("/").filter(Boolean);
  console.log(pathArray, "pathArray");
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {pathArray.map((path, index) => {
          const href = `/${pathArray.slice(0, index + 1).join("/")}`;
          console.log(href, "href");
          const isLast = index === pathArray.length - 1;
          return (
            <Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast || href.includes("doc") ? (
                  <BreadcrumbPage>{path}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{path}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
