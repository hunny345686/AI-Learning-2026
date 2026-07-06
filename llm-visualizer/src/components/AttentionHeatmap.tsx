import { useEffect, useRef } from "react";
import * as d3 from "d3";
import type { AttentionCell } from "../types";

interface Props {
  data: AttentionCell[];
}

function AttentionHeatmap({ data }: Props) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const svg = d3.select(ref.current);

    svg.selectAll("*").remove();

    const tokens = Array.from(new Set(data.map((d) => d.row)));

    const cellSize = 50;
    const margin = 100;

    const width = margin + tokens.length * cellSize;

    const height = margin + tokens.length * cellSize;

    svg.attr("width", width).attr("height", height);

    const x = d3.scaleBand().domain(tokens).range([margin, width]);

    const y = d3.scaleBand().domain(tokens).range([margin, height]);

    const color = d3
      .scaleLinear<string>()
      .domain([0, 1])
      .range(["#ffffff", "#2563eb"]);

    svg
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.column)!)
      .attr("y", (d) => y(d.row)!)
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("fill", (d) => color(d.value));

    svg
      .selectAll(".x-label")
      .data(tokens)
      .enter()
      .append("text")
      .attr("x", (d) => x(d)! + cellSize / 2)
      .attr("y", 70)
      .attr("text-anchor", "middle")
      .text((d) => d);

    svg
      .selectAll(".y-label")
      .data(tokens)
      .enter()
      .append("text")
      .attr("x", 60)
      .attr("y", (d) => y(d)! + cellSize / 2)
      .attr("alignment-baseline", "middle")
      .text((d) => d);
  }, [data]);

  return <svg ref={ref} />;
}

export default AttentionHeatmap;
