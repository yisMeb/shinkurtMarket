import React from "react";
import { ResponsiveLine, Crosshair } from "@nivo/line";
const Line = ({ data }) => {
  const xTickValues = data[0].data
    .filter((d, index) => index % 30 === 0) // Filter every 30th data point
    .map((d) => d.x);

  return (
    <div style={{ height: "400px" }}>
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 50, bottom: 50, left: 50 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        curve="monotoneX"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Date",
          legendOffset: 36,
          legendPosition: "middle",
          tickValues: xTickValues,
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Value",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        enableGridX={false}
        enableGridY={false}
        enablePoints={false}
        colors={{ scheme: "category10" }}
        lineWidth={2}
        enableArea={true}
        areaOpacity={0.1}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        tooltip={({ point }) => (
          <div
            style={{
              background: "white",
              padding: "9px 12px",
              border: "1px solid #ccc",
            }}
          >
            <div>
              <strong>Date:</strong> {point.data.xFormatted}
            </div>
            <div>
              <strong>Value:</strong> {point.data.yFormatted}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default Line;
