"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MapPlaceholder() {
  return (
    <Card className="rounded-3xl border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_20px_50px_rgba(2,6,23,0.08)] ring-1 ring-sky-200/30 overflow-hidden">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-lg">Mapa de rastreamento</CardTitle>
        <div className="text-xs text-slate-500">Apenas visual • mock</div>
      </CardHeader>
      <CardContent className="p-0">
        <div
          className="grid h-80 place-items-center text-sm text-slate-500"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #e2e8f0, #e2e8f0 12px, #f1f5f9 12px, #f1f5f9 24px)",
          }}
        >
          Mapa (placeholder)
        </div>
      </CardContent>
    </Card>
  );
}
