import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import './App.css'

function App() {
  const svgRef = useRef(null);

  useEffect(() => {
    const data = [
      { mangoes: 200, apples: 400, oranges: 150 },
      { mangoes: 400, apples: 80, oranges: 300 },
      { mangoes: 350, apples: 200, oranges: 250 },
      { mangoes: 80, apples: 300, oranges: 450 },
      { mangoes: 250, apples: 250, oranges: 100 }
    ];

    const svg = d3
      .select(svgRef.current)
      .attr("width", 800)
      .attr("height", 400)
      .style("margin", 50)
      .style("overflow", "visible");

    const horScale = d3.scaleLinear().domain([0, 1000]).range([0, 600]);

    svg.append("g").call(d3.axisTop(horScale));

    const verScale = d3
      .scaleBand()
      .domain(["seller A", "seller B", "seller C", "seller D", "seller E"])
      .range([0, 300])
      .padding([1]);

    svg
      .append("g")
      .call(d3.axisLeft(verScale).tickSizeOuter(0))
      .selectAll("text")
      .attr("font-size", 14);

    const stackedData = d3.stack().keys(["mangoes", "apples", "oranges"]);

    const color = ["yellow", "red", "orange"];

    // Show the bars
    svg
      .append("g")
      .selectAll("g")
      // Enter in the stack data
      .data(stackedData(data))
      .join("g")
      .attr("fill", (d, i) => color[i])
      .selectAll("rect")
      // enter a second time = loop subgroup per subgroup to add all rectangles
      .data((d) => d)
      .join("rect")
      .attr("x", (d) => horScale(d[0]))
      .attr("y", (d, i) => 37.5 + i * 50)
      .attr("height", 25)
      .attr("width", (d, i) => horScale(d[1]) - horScale(d[0]));
  }, []);

  return (
    <div>
      <svg ref={svgRef} />
    </div>
  );
}

export default App
