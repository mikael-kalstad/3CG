import create from 'zustand';
import { dataService } from './Services/DataService';
import { annotationService } from './Services/AnnotationService';

// Get names of ecg-channels
let numOfSamples = dataService.getChannelNamesArray();

const POINTS_DEFAULT_LENGTH = 500;
const dataLength = dataService.getSampleLength();
const sampleRate = dataService.getSampleRate();

// Get all annotations from file
const annotationData = annotationService.getAnnotations();

// Store for storing global mode states
export const useModeStore = create((set) => ({
  playMode: false,
  togglePlayMode: () => set((state) => ({ playMode: !state.playMode })),
  markMode: false,
  toggleMarkMode: () => set((state) => ({ markMode: !state.markMode })),
  inspectMode: false,
  toggleInspectMode: () =>
    set((state) => ({ inspectMode: !state.inspectMode })),
  ortoMode: false,
  toggleOrtoMode: () => set((state) => ({ ortoMode: !state.ortoMode })),
  gridMode: false,
  toggleGridMode: () => set((state) => ({ gridMode: !state.gridMode })),
}));

export const useInspectStore = create((set) => ({
  inspected: -1,
  setInspected: (channel) => set((state) => (state.inspected = channel)),
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
  setChannel: (index, newActive) =>
    set((state) => ({
      activeChannels: state.activeChannels.map((e, i) =>
        i === index ? newActive : e
      ),
    })),
}));

export const useTimeStore = create((set) => ({
  startTime: 0,
  setStartTime: (time) => set((state) => ({ startTime: time })),
  endTime:
    dataLength > POINTS_DEFAULT_LENGTH
      ? POINTS_DEFAULT_LENGTH / sampleRate
      : dataLength / sampleRate,
  setEndTime: (time) => set((state) => ({ endTime: time })),
}));

export const useAnnotationStore = create((set) => ({
  annotations: annotationData,
  addAnnotation: (newAnnotation) =>
    set((state) => {
      state.annotations.push(newAnnotation);
      state.activeAnnotations.push(true);
    }),
  editAnnotation: (i, edited) =>
    set((state) => (state.annotations[i] = edited)),
  activeAnnotations: annotationData.map(() => true),
  toggleAnnotation: (index) =>
    set((state) => ({
      activeAnnotations: state.activeAnnotations.map((state, i) =>
        i === index ? !state : state
      ),
    })),
  toggleAllAnnotations: (newState) =>
    set((state) => ({ activeAnnotations: annotationData.map(() => newState) })),
  showFullAnnotation: true,
  toggleShowFullAnnotation: () =>
    set((state) => ({ showFullAnnotation: !state.showFullAnnotation })),
}));

export const useZoomStore = create((set) => ({
  zoom: 1,
  setZoom: (zoom) => set((state) => ({ zoom: zoom })),
}));

export const useScaleStore = create((set) => ({
  scale: 0.4,
  setScale: (scale) => set((state) => ({ scale: scale })),
  vChannelScaling: true,
  vChannelScaleFactor: 10,
  toggleVChannelScaling: () =>
    set((state) => ({ vChannelScaling: !state.vChannelScaling })),
}));

export const useTimelineOptionsStore = create((set) => ({
  showAnnotations: true,
  toggleShowAnnotations: () =>
    set((state) => ({ showAnnotations: !state.showAnnotations })),
  showTimeOnDrag: true,
  toggleShowTimeOnDrag: () =>
    set((state) => ({ showTimeOnDrag: !state.showTimeOnDrag })),
  showTotalTime: true,
  toggleShowTotalTime: () =>
    set((state) => ({ showTotalTime: !state.showTotalTime })),
}));

export const useMousePositionStore = create((set) => ({
  xPos: 0,
  setxPos: (x) => set((state) => ({ xPos: x })),
  yPos: 0,
  setyPos: (y) => set((state) => ({ yPos: y }))
}));