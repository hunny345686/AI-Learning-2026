import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { type EmbeddingPoints } from "../types";

interface Props {
  data: EmbeddingPoints[]
}

function EmbeddingChart({ data }: Props) {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const svg = d3.select(ref.current);

    svg.selectAll("*").remove();

    const width = 700;
    const height = 400;

    const x = d3
      .scaleLinear()
      .domain([0, 100])
      .range([40, width - 40]);

    const y = d3
      .scaleLinear()
      .domain([0, 100])
      .range([height - 40, 40]);

    svg
      .selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", (d) => x(d.x))
      .attr("cy", (d) => y(d.y))
      .attr("r", 10);

    svg
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d) => x(d.x) + 15)
      .attr("y", (d) => y(d.y))
      .text((d) => d.tokens);
  }, [data]);

  return <svg ref={ref} width={700} height={400} />;
}

export default EmbeddingChart;
