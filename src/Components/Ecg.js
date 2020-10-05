import React, { Suspense } from "react";
import { formatDataToPoints } from "../Scripts/DataConverter";
import { dataService } from "../Services/DataService";
import { useChannelStore } from "../Store";
import Wave from "./Wave";
import Text from "./Text";
import Annotations from "./Annotations";
import MarkWaves from "./Marking/MarkWaves";

// Get points which will be rendererd
let renderPoints = formatDataToPoints(dataService.getJSON());
let channelNames = dataService.getChannelNamesArray();

const Ecg = () => {
  const activeChannels = useChannelStore((state) => state.activeChannels);
  console.log("renderpoints", renderPoints);

  console.log("%c [Ecg] is rendering", "background: #111; color: #ebd31c");
  console.log("%c [Wave(s)] is rendering", "background: #111; color: #ebd31c");

  return (
    <Suspense fallback={null}>
      <mesh>
        {/* Render every channel as a 3D wave */}
        {renderPoints &&
          renderPoints.length > 0 &&
          renderPoints.map(
            (channel, i) =>
              activeChannels[i] && (
                <React.Fragment key={i}>
                  <Text
                    position={channel[0].map((val, i) =>
                      i == 0 ? val - 6 : val
                    )}
                    rotateToCamera={true}
                    background={true}
                    backgroundOpacity={0.4}
                    backgroundColor={0x000000}
                    backgroundScaleByText={1.5}
                    textSize={2.4}
                  >
                    {channelNames[i]}
                  </Text>
                  <Wave data={channel} />
                </React.Fragment>
              )
          )}
      </mesh>

      <MarkWaves renderPoints={renderPoints} maxPointsToRender={200} />
      <Annotations />
    </Suspense>
  );
};

export default Ecg;
