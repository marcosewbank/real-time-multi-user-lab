import React, { useRef, useEffect, useState } from "react";

type Props = {
  width: number;
  height: number;
};

export const Canvas = ({ width, height }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);
  const [contextRef, setContextRef] = useState<any>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;
    canvas.width = width * 2;
    canvas.height = height * 2;

    canvas.style.width = `${width * 2}px`;
    canvas.style.height = `${height * 2}px`;

    const context: CanvasRenderingContext2D | null = canvas.getContext("2d");
    if (!context) return;
    context.scale(1, 1);
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;

    setContextRef(context);
  }, [height, width]);

  const startDrawing = ({ nativeEvent }: any) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.beginPath();
    contextRef.moveTo(offsetX, offsetY);

    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.closePath();
    setIsDrawing(false);
  };

  const draw = ({ nativeEvent }: any) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;

    contextRef.lineTo(offsetX, offsetY);
    contextRef.stroke();
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        style={{ backgroundColor: "white" }}
      />
    </>
  );
};
