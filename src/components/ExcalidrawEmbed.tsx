"use client";

import React, { useState, useEffect } from "react";
import "@excalidraw/excalidraw/index.css";

interface ExcalidrawEmbedProps {
  src?: string; // Path to .excalidraw file
  height?: number;
}

interface ExcalidrawAPI {
  scrollToContent: (
    elements?: unknown[] | null,
    options?: {
      fitToContent?: boolean;
      animate?: boolean;
      duration?: number;
    },
  ) => void;
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
  const [excalidrawAPI, setExcalidrawAPI] = useState<ExcalidrawAPI | null>(
    null,
  );

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

  // Auto-fit content when API is available and data is loaded
  useEffect(() => {
    if (excalidrawAPI && excalidrawData.elements.length > 0) {
      // Use a small delay to ensure the component is fully rendered
      const timer = setTimeout(() => {
        try {
          excalidrawAPI.scrollToContent(excalidrawData.elements, {
            fitToContent: true,
            animate: true,
            duration: 300,
          });
        } catch (error) {
          console.warn("Failed to auto-fit content:", error);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [excalidrawAPI, excalidrawData.elements]);

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
          excalidrawAPI={(api: ExcalidrawAPI) => setExcalidrawAPI(api)}
          initialData={{
            elements: excalidrawData.elements,
            appState: {
              ...excalidrawData.appState,
              viewModeEnabled: true,
            },
            scrollToContent: true,
          }}
          viewModeEnabled={true}
          theme="auto"
        />
      </div>
    </div>
  );
}
