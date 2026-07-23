"use client";

import dynamic from "next/dynamic";

const CursorLiquidLight = dynamic(
  () => import("./CursorLiquidLight").then((mod) => mod.CursorLiquidLight),
  { ssr: false }
);

export function CursorLiquidLightLoader() {
  return <CursorLiquidLight />;
}
