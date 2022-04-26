import { useEffect, useRef } from "react";
import { arc } from "d3";
import { select } from "d3-selection";
import Page from "../components/containers/page";

const SVG_WIDTH = 480;
const SVG_HEIGHT = 480;
const CENTER_X = SVG_WIDTH / 2;
const CENTER_Y = SVG_HEIGHT / 2;
const CIRCLE_STROKE_WIDTH = 20;

const EYE_OFFSET_X = 90;
const EYE_OFFSET_Y = 80;
const PADDING = 8;

const MOUTH_ARC = arc()
  .innerRadius(90)
  .outerRadius(100)
  .startAngle(Math.PI * 0.5)
  .endAngle(Math.PI * 1.5);

//const test = MOUTH_ARC();
//<path d={test}></path>

const GraphsPage = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    select(svgRef.current)
      .append("rect")
      .attr("width", 100)
      .attr("height", 100)
      .attr("fill", "blue");
  });

  return (
    <Page title="Graphs">
      <div className="flex flex-col items-center gap-8">
        <h1>Graphs Page</h1>
        <svg ref={svgRef} className="bg-red-500"></svg>

        <svg width={SVG_WIDTH} height={SVG_HEIGHT} className="bg-red-500">
          <g transform={`translate(${CENTER_X},${CENTER_Y})`}>
            <circle
              fill="yellow"
              stroke="black"
              strokeWidth={CIRCLE_STROKE_WIDTH}
              r={CENTER_Y - CIRCLE_STROKE_WIDTH / 2 - PADDING}
            />
            <circle cx={-EYE_OFFSET_X} cy={-EYE_OFFSET_Y} r={SVG_WIDTH / 12} />
            <circle cx={EYE_OFFSET_X} cy={-EYE_OFFSET_Y} r={SVG_WIDTH / 12} />
          </g>
        </svg>
      </div>
    </Page>
  );
};

export default GraphsPage;
