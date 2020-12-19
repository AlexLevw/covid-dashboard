import React, { useRef, useEffect } from "react";

import Chart from "chart.js";

const Graph = () => {
  const canvas = useRef(null);

  useEffect(() => {
    const ctx = canvas.current.getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Feb", "March"],
        datasets: [
          {
            label: "Sales",
            data: [86, 95, 91],
          },
          {
            label: "Cost",
            data: [100, 200, 300],
          },
          {
            label: "month",
            data: [150, 1500, 100],
          },
        ],
      },
      options: {
        //Customize chart options
      },
    });
  });

  return <canvas className="canvas" ref={canvas} />;
};

export default Graph;
