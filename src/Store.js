import create from "zustand";
import { dataService } from "./Services/DataService";
import { annotationService } from "./Services/AnnotationService";

// Get names of ecg-channels
let numOfSamples = dataService.getChannelNamesArray();

const POINTS_DEFAULT_LENGTH = 200;
const dataLength = dataService.getSampleLength();

// Get all annotations from file
const annotationData = annotationService.getAnnotations();

// Store for storing global mode states
export const useModeStore = create((set) => ({
  playMode: false,
  togglePlayMode: () => set((state) => ({ playMode: !state.playMode })),
  markMode: false,
  toggleMarkMode: () => set((state) => ({ markMode: !state.markMode })),
}));

// Store for storing global all states related to ecg-data and timing
export const useChannelStore = create((set) => ({
  activeChannels: numOfSamples.map(() => true),
  toggleChannel: (index) =>
    set((state) => ({
      activeChannels: state.activeChannels.map((state, i) =>
        i === index ? !state : state
      ),
    })),
  toggleAllChannels: (newState) =>
    set((state) => ({ activeChannels: numOfSamples.map(() => newState) })),
}));

export const useTimeStore = create((set) => ({
  startTime: 0,
  setStartTime: (time) => set((state) => ({ startTime: time })),
  endTime:
    dataLength > POINTS_DEFAULT_LENGTH ? POINTS_DEFAULT_LENGTH : dataLength,
  setEndTime: (time) => set((state) => ({ endTime: time })),
}));

export const useAnnotationStore = create((set) => ({
  annotations: annotationData,
  editAnnotation: (i, newAnnotation) =>
    set((state) => ({ annotations: newAnnotation })),
  activeAnnotations: annotationData.map(() => true),
  toggleAnnotation: (index) =>
    set((state) => ({
      activeAnnotations: state.activeAnnotations.map((state, i) =>
        i === index ? !state : state
      ),
    })),
  toggleAllAnnotations: (newState) =>
    set((state) => ({ activeAnnotations: annotationData.map(() => newState) })),
}));
