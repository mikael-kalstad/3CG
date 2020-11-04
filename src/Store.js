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

const DEFAULT_SPEED = 0.00001;

export const useTimeStore = create((set, get) => ({
  startTime: 0,
  setStartTime: (time) => set((state) => ({ startTime: time })),
  endTime:
    dataLength > POINTS_DEFAULT_LENGTH
      ? POINTS_DEFAULT_LENGTH / sampleRate
      : dataLength / sampleRate,
  setEndTime: (time) => set((state) => ({ endTime: time })),
  defaultSpeed: DEFAULT_SPEED,
  speed: DEFAULT_SPEED,
  setSpeed: (newSpeed) => set(() => ({ speed: newSpeed })),
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

export const useCameraStore = create((set) => ({
  zoomValue: 1,
  setZoomValue: (newValue) => set(() => ({ zoomValue: newValue })),
  fov: 55,
  setFov: (newValue) => set(() => ({ fov: newValue })),
}));

export const useScaleStore = create((set) => ({
  scale: 0.4,
  setScale: (scale) => set((state) => ({ scale: scale })),
  vChannelScaling: true,
  toggleVChannelScaling: () =>
    set((state) => ({ vChannelScaling: !state.vChannelScaling })),
  vChannelScaleFactor: 90,
  setVChannelScaleFactor: (newScale) =>
    set(() => ({ vChannelScaleFactor: newScale })),
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
  showSnackbar: true,
  toggleShowSnackbar: () =>
    set((state) => ({ showSnackbar: !state.showSnackbar })),
}));

export const useRenderTypeStore = create((set) => ({
  activeRenders: ['Ecg', 'Vcg'],
  renderNames: ['Ecg', 'Vcg', 'Circle'],
  toggleActiveRenders: (index) =>
    set((state) => ({
      activeRenders: state.activeRenders.map((a, i) => (i === index ? !a : a)),
    })),
  reorderRenders: (sourceIndex, newIndex) => {
    set((state) => ({
      activeRenders: state.activeRenders.map((a, i) =>
        i === sourceIndex
          ? state.activeRenders[newIndex]
          : i === newIndex
          ? state.activeRender[sourceIndex]
          : a
      ),
    }));
  },
  editRender: (index, newRender) =>
    set((state) => (state.activeRenders[index] = newRender)),
  addActiveRender: (newRender) =>
    set((state) => state.activeRenders.push(newRender)),
  removeActiveRender: (index) =>
    set((state) => state.activeRenders.splice(index, 1)),

  // 0 = vertical, 1 = horizontal
  orientation: 0,
  toggleOrientation: () =>
    set((state) => ({
      orientation: state.orientation === 0 ? 1 : 0,
    })),
  showRenderviewIndex: true,
  toggleShowRenderviewIndex: () =>
    set((state) => ({ showRenderviewIndex: !state.showRenderviewIndex })),
}));
