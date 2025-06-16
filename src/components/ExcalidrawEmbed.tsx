"use client";

import React, { useState, useEffect } from "react";
import "@excalidraw/excalidraw/index.css";

interface ExcalidrawEmbedProps {
  data?: string; // JSON string of excalidraw data
  src?: string; // Path to .excalidraw file
  height?: number;
}

interface ExcalidrawData {
  elements: unknown[];
  appState: Record<string, unknown>;
}

export function ExcalidrawEmbed({
  data,
  src,
  height = 400,
}: ExcalidrawEmbedProps) {
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

  // Parse initial data or fetch from file
  useEffect(() => {
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        setExcalidrawData({
          elements: parsedData.elements || [],
          appState: parsedData.appState || {},
        });
      } catch (error) {
        console.error("Failed to parse Excalidraw data:", error);
      }
    } else if (src) {
      // Fetch the .excalidraw file
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
  }, [data, src]);

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
