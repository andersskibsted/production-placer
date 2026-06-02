import { useEffect, useRef, useState } from "react";
import { useData } from "../context/DataContext";

const REGION_IDS: Record<string, string> = {
  "DK81": "Region Nordjylland",
  "DK82": "Region Midtjylland",
  "DK83": "Region Syddanmark",
  "DK84": "Region Hovedstaden",
  "DK85": "Region Sjælland"
};

const DEFAULT_COLOR = "#4ef1a7";
const HIGHLIGHT_COLOR = "#4ef1a7";

export function DenmarkMap() {
  const { highlightedRegions } = useData();
  const [svgContent, setSvgContent] = useState("");
  const mapRef = useRef<HTMLDivElement>(null);

  // Hent SVG én gang
  useEffect(() => {
    fetch("/data/dk.svg")
      .then(r => r.text())
      .then(setSvgContent);
  }, []);

  // Opdater farver når SVG eller highlighted regioner ændrer sig
  useEffect(() => {
    if (!svgContent || !mapRef.current) return;

    Object.entries(REGION_IDS).forEach(([id, name]) => {
      const el = mapRef.current!.querySelector(`#${id}`) as SVGElement;
      if (el) {
        el.setAttribute("fill", highlightedRegions.includes(name) ? HIGHLIGHT_COLOR : "");
      }
    });
  }, [svgContent, highlightedRegions]);

  return <div ref={mapRef} dangerouslySetInnerHTML={{ __html: svgContent }} />;
}