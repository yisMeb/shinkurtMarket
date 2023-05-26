// Line.jsx

import React from "react";
import { ResponsiveLine } from "@nivo/line";

const Line = ({ data }) => {
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
        axisBottom={null}
        axisLeft={null}
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
      />
    </div>
  );
};

export default Line;
