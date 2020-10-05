import React, { useContext, Suspense } from "react";
import Wave from "./Wave";
import Note from "./Note";
import MarkWaves from "./Marking/MarkWaves";
import { formatDataToPoints } from "../Scripts/DataConverter";
import { dataService } from "../Services/DataService";
import { useChannelStore } from "../Store";

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
                  <Note
                    position={channel[0].map((val, i) =>
                      i != 2 ? val - 2 : val
                    )}
                    rotateToCamera={true}
                  >
                    {channelNames[i]}
                  </Note>
                  <Wave data={channel} />
                </React.Fragment>
              )
          )}
      </mesh>

      {/* <MarkWaves
        renderPoints={renderPoints}
        maxPointsToRender={200}
        markMode={markMode}
      /> */}
    </Suspense>
  );
};

export default Ecg;
