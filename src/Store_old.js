import React, { createContext, useState, useMemo } from "react";
import { dataService } from "./Services/DataService";

export const PlayContext = createContext();
export const MarkContext = createContext();
export const ChannelContext = createContext([[], () => {}]);
export const TimeContext = createContext();

// Get names of ecg-channels
let numOfSamples = dataService.getChannelNamesArray();

// Default length of points
const POINTS_DEFAULT_LENGTH = 200;
const dataLength = dataService.getSampleLength();

// Context component where global accessible states should be stored
const Store = ({ children }) => {
  const [playMode, setPlayMode] = useState(false);
  const [markMode, setMarkMode] = useState(false);
  const [activeChannels, setActiveChannels] = useState(
    numOfSamples.map(() => true)
  );

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(
    dataLength > POINTS_DEFAULT_LENGTH ? POINTS_DEFAULT_LENGTH : dataLength
  );

  console.log("active channels in store:", activeChannels);
  console.log("%c [Store] is rendering", "background: blue; color: #ebd31c");

  // const [currTime, setCurrTime] = useState(0);

  // useEffect(() => {
  //   // Update time state every set interval, used to synchronize "play" functin of ecg-waves
  //   const intervalId = setInterval(() => {
  //     // Only update time if play state is active
  //     if (playMode) {
  //       setCurrTime((time) => {
  //         return time + 1;
  //       });
  //     }
  //   }, 500);

  //   // Cleanup on unmount
  //   return () => clearInterval(intervalId);
  // }, [playMode]);

  // Change state of a specific channel based on index
  const toggleChannel = (index) => {
    let newArr = activeChannels.map((state, i) =>
      i === index ? !state : state
    );
    setActiveChannels(newArr);
  };

  // Change state of all channels
  const toggleAllChannels = (state) => {
    setActiveChannels(numOfSamples.map(() => state));
  };

  const toggleMarkMode = () => {
    setMarkMode(!markMode);
  };

  // Use usememo to avoid unessecary rerenders of context consumers
  const playCtx = useMemo(() => [playMode, setPlayMode], [playMode]);
  const markCtx = useMemo(() => [markMode, toggleMarkMode], [markMode]);
  const channelCtx = useMemo(
    () => [activeChannels, toggleChannel, toggleAllChannels],
    [activeChannels]
  );
  const timeCtx = useMemo(
    () => [startTime, setStartTime, endTime, setEndTime],
    [startTime, endTime]
  );

  return (
    // Notice the difference between AppContextProvider and AppContext.provider!
    <PlayContext.Provider value={playCtx}>
      <MarkContext.Provider value={markCtx}>
        <TimeContext.Provider value={timeCtx}>
          <ChannelContext.Provider value={channelCtx}>
            {children}
          </ChannelContext.Provider>
        </TimeContext.Provider>
      </MarkContext.Provider>
    </PlayContext.Provider>
  );
};

export default Store;
