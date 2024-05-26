import { tools } from "@/app/(dashboard)/(routes)/dashboard/page";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React from "react";

interface HeadingProps {
  description: string;
}

const Heading: React.FC<HeadingProps> = ({ description }) => {
  const pathname = usePathname();

  const tool = tools.find((tool) => tool.href === pathname);

  if (!tool) return null;

  const { label: title, icon: Icon, bgColor, color } = tool;

  return (
    <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
      <div className={cn("p-2 w-fit rounded-md", bgColor)}>
        <Icon className={cn("w-10 h-10", color)} />
      </div>
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Heading;
