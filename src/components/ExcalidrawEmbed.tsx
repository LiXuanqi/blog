"use client";

import React, { useState, useEffect } from "react";
import "@excalidraw/excalidraw/index.css";

interface ExcalidrawEmbedProps {
  src?: string; // Path to .excalidraw file
  height?: number;
}

interface ExcalidrawData {
  elements: unknown[];
  appState: Record<string, unknown>;
}

export function ExcalidrawEmbed({ src, height = 400 }: ExcalidrawEmbedProps) {
  const [excalidrawData, setExcalidrawData] = useState<ExcalidrawData>({
    elements: [],
    appState: {},
  });
  const [ExcalidrawComponent, setExcalidrawComponent] =
    useState<React.ComponentType<Record<string, unknown>> | null>(null);

  // Dynamically import Excalidraw
  useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) => {
      setExcalidrawComponent(comp.Excalidraw);
    });
  }, []);

  // Fetch excalidraw file
  useEffect(() => {
    if (src) {
      fetch(src)
        .then((response) => response.json())
        .then((parsedData) => {
          setExcalidrawData({
            elements: parsedData.elements || [],
            appState: parsedData.appState || {},
          });
        })
        .catch((error) => {
          console.error("Failed to fetch Excalidraw file:", error);
        });
    }
  }, [src]);

  if (!ExcalidrawComponent) {
    return (
      <div className="my-6 border border-border rounded-lg overflow-hidden">
        <div
          style={{ height: `${height}px` }}
          className="flex items-center justify-center bg-muted/20"
        >
          <div className="text-muted-foreground">Loading Excalidraw...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-6 border border-border rounded-lg overflow-hidden">
      <div style={{ height: `${height}px` }}>
        <ExcalidrawComponent
          initialData={{
            elements: excalidrawData.elements,
            appState: {
              ...excalidrawData.appState,
              viewModeEnabled: true,
            },
          }}
          viewModeEnabled={true}
          theme="auto"
        />
      </div>
    </div>
  );
}
