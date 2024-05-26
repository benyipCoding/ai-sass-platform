"use client";
import { routes } from "@/components/Sidebar";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const colorMap = new Map([
  ["/conversation", "bg-violet-500/10"],
  ["/image", "bg-pink-700/10"],
  ["/video", "bg-orange-700/10"],
  ["/music", "bg-emerald-500/10"],
  ["/code", "bg-green-700/10"],
]);

const tools = routes.slice(1, 6).map((route) => {
  return {
    ...route,
    bgColor: colorMap.get(route.href),
  };
});

const DashboardPage = () => {
  const router = useRouter();

  return (
    <div>
      <div className="mb-8 space-x-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Explore the power of AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lb text-center">
          Chat with the smartest AI - Experience the power of AI
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
