"use client";

import { useEffect } from "react";

const LEGACY_HASHES = ["#solutions", "#what-we-do"];

// Old homepage anchors moved to /what-we-can-build; keep bookmarks working.
export function LegacyHashRedirect() {
  useEffect(() => {
    const { hash } = window.location;
    if (LEGACY_HASHES.includes(hash)) {
      window.location.replace(`/what-we-can-build${hash}`);
    }
  }, []);
  return null;
}
