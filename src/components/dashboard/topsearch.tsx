"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function TopSearch() {
  return (
    <div className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/70 backdrop-blur-md dark:bg-neutral-900/70 dark:border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 dark:text-slate-400" />
          <Input
            type="search"
            placeholder="Buscar por pet, ID da coleira, localização…"
            className="h-12 rounded-2xl pl-12 pr-4 ring-1 ring-slate-300/60 bg-white text-slate-900
                       placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-500
                       dark:bg-neutral-800 dark:text-slate-100 dark:placeholder:text-slate-400 dark:ring-neutral-700 dark:focus:ring-cyan-400"
          />
        </div>
      </div>
    </div>
  );
}
