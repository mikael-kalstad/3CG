import create from 'zustand';
import persist from './utils/persist';
import { dataService } from './Services/DataService';
import { annotationService } from './Services/AnnotationService';

// Get names of ecg-channels
let numOfSamples = dataService.getChannelNamesArray();

const POINTS_DEFAULT_LENGTH = 500;
const dataLength = dataService.getSampleLength();
const sampleRate = dataService.getSampleRate();

// Get all annotations from file
const initialAnnotationData = annotationService.getAnnotations();

let localStorageEnabled;
if (window.localStorage.getItem('root') !== null) {
  localStorageEnabled = true; //window.localStorage.getItem('root')['storageStore'];
} else {
  localStorageEnabled = false;
}
let allowList = localStorageEnabled ? undefined : [];

// Middleware function that will save store in localStorage if the setting is enabled
const createWithLocalStorage = (key, fn) => {
  return create(
    persist(
      {
        key: key,
        allowlist: allowList,
      },
      fn
    )
  );
};

export const useStorageStore = create(
  persist(
    {
      key: 'storageStore',
    },
    (set) => ({
      saveInLocalStorage: false,
      toggleSaveInLocalStorage: () =>
        set((state) => ({ saveInLocalStorage: !state.saveInLocalStorage })),
    })
  )
);

// Store for storing global mode states
export const useModeStore = create((set) => ({
  playMode: false,
  togglePlayMode: () => set((state) => ({ playMode: !state.playMode })),
  markMode: false,
  toggleMarkMode: () => set((state) => ({ markMode: !state.markMode })),
  ortoMode: false,
  toggleOrtoMode: () => set((state) => ({ ortoMode: !state.ortoMode })),
  gridMode: false,
  toggleGridMode: () => set((state) => ({ gridMode: !state.gridMode })),
}));

//Store for handling states used for inspecting a channel
export const useInspectStore = create((set) => ({
  inspected: -1,
  setInspected: (channel) => set((state) => (state.inspected = channel)),
  currentlyHovering: false,
  setCurrentlyHovering: (newCurrentlyHovering) =>
    set(() => ({ currentlyHovering: newCurrentlyHovering })),
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
    set(() => ({ activeChannels: numOfSamples.map(() => newState) })),
  setChannel: (index, newActive) =>
    set((state) => ({
      activeChannels: state.activeChannels.map((e, i) =>
        i === index ? newActive : e
      ),
    })),
  setActiveChannels: (newActiveChannels) =>
    set(() => ({ activeChannels: newActiveChannels })),
  /* Placeholder for saving activechannels before inspecting */
  activeChannelsPlaceholder: numOfSamples.map(() => true),
  setActiveChannelsPlaceholder: (newActiveChannelsPlaceholder) =>
    set(() => ({
      activeChannelsPlaceholder: newActiveChannelsPlaceholder,
    })),
}));

const DEFAULT_SPEED = 0.00001;

export const useTimeStore = createWithLocalStorage('timeStore', (set) => ({
  startTime: 0,
  setStartTime: (time) => set(() => ({ startTime: time })),
  endTime:
    dataLength > POINTS_DEFAULT_LENGTH
      ? POINTS_DEFAULT_LENGTH / sampleRate
      : dataLength / sampleRate,
  setEndTime: (time) => set(() => ({ endTime: time })),
  defaultSpeed: DEFAULT_SPEED,
  speed: DEFAULT_SPEED,
  setSpeed: (newSpeed) => set(() => ({ speed: newSpeed })),
}));

// Store for annotations and filtering them
export const useAnnotationStore = create((set) => ({
  annotations: initialAnnotationData,
  addAnnotation: (newAnnotation) =>
    set((state) => ({
      annotations: state.annotations.concat([newAnnotation]),
      activeAnnotations: state.activeAnnotations.concat([true]),
    })),
  activeAnnotations: initialAnnotationData.map(() => true),
  toggleAnnotation: (index) =>
    set((state) => ({
      activeAnnotations: state.activeAnnotations.map((state, i) =>
        i === index ? !state : state
      ),
    })),
  toggleAllAnnotations: (newState) =>
    set((state) => ({
      activeAnnotations: state.annotations.map(() => newState),
    })),
  deleteAllAnnotations: () =>
    set(() => ({
      annotations: [],
      activeAnnotations: [],
    })),
  deleteAnnotations: (indices) => {
    set((state) => ({
      annotations: state.annotations.filter((e, i) => !indices.includes(i)),
      activeAnnotations: state.activeAnnotations.filter(
        (e, i) => !indices.includes(i)
      ),
    }));
  },
  showFullAnnotation: true,
  toggleShowFullAnnotation: () =>
    set((state) => ({ showFullAnnotation: !state.showFullAnnotation })),
  showAddAnnotationPopup: true,
  toggleShowAddAnnotationPopup: () =>
    set((state) => ({
      showAddAnnotationPopup: !state.showAddAnnotationPopup,
    })),
}));

// Store for camera options
export const useCameraStore = createWithLocalStorage('cameraStore', (set) => ({
  zoomValue: 35,
  setZoomValue: (newValue) => set(() => ({ zoomValue: newValue })),
  fov: 55,
  setFov: (newValue) => set(() => ({ fov: newValue })),
}));

// Store for all values used to scale the rendered data
export const useScaleStore = createWithLocalStorage('scaleStore', (set) => ({
  scale: 0.4,
  setScale: (scale) => set((state) => ({ scale: scale })),
  vChannelScaling: true,
  toggleVChannelScaling: () =>
    set((state) => ({ vChannelScaling: !state.vChannelScaling })),
  vChannelScaleFactor: 1,
  setVChannelScaleFactor: (newScale) =>
    set(() => ({ vChannelScaleFactor: newScale })),
}));

// Store for handling options for how timeline is rendered
export const useTimelineOptionsStore = createWithLocalStorage(
  'timelineOptionsStore',
  (set) => ({
    showAnnotations: true,
    toggleShowAnnotations: () =>
      set((state) => ({ showAnnotations: !state.showAnnotations })),
    showTimeOnDrag: true,
    toggleShowTimeOnDrag: () =>
      set((state) => ({ showTimeOnDrag: !state.showTimeOnDrag })),
    showTotalTime: true,
    toggleShowTotalTime: () =>
      set((state) => ({ showTotalTime: !state.showTotalTime })),
  })
);

// Store for handling all options to displaying different types of visualizations
export const useRenderTypeStore = createWithLocalStorage(
  'renderTypeStore',
  (set) => ({
    activeRenders: ['Ecg'],
    renderNames: ['Ecg', 'Vcg', 'Circle'],
    editRender: (newRender, index) =>
      set((state) => (state.activeRenders[index] = newRender)),
    addActiveRender: (newRender) =>
      set((state) => state.activeRenders.push(newRender)),
    removeActiveRender: (index) =>
      set((state) => state.activeRenders.splice(index, 1)),

    // Different inverse transformation method to get vcg representation in 3D
    vcgMethod: 0,
    vcgMethodNames: ['Dowers', 'PLSV', 'QLSV'],
    setVcgMethod: (index) => set({ vcgMethod: index }),

    // 0 = vertical, 1 = horizontal
    orientation: 0,
    toggleOrientation: () =>
      set((state) => ({
        orientation: state.orientation === 0 ? 1 : 0,
      })),
    showRenderviewIndex: true,
    toggleShowRenderviewIndex: () =>
      set((state) => ({ showRenderviewIndex: !state.showRenderviewIndex })),
  })
);

// Store for handling states when hovering inspected wave
export const useMousePositionStore = create((set) => ({
  xPos: 0,
  setxPos: (x) => set(() => ({ xPos: x })),
  yPos: 0,
  setyPos: (y) => set(() => ({ yPos: y })),
}));

// Store for handling states when user is marking waves
export const useMarkStore = create((set) => ({
  startSelected: -1,
  setStartSelected: (start) => set(() => ({ startSelected: start })),
  endSelected: -1,
  setEndSelected: (end) => set(() => ({ endSelected: end })),
  // Used to indicate if user is finished marking or not. Finished marking is true onMouseUp when marking.
  markingFinished: false,
  setMarkingFinished: (newState) => set(() => ({ markingFinished: newState })),
}));

//Store for handling message popups
export const useSnackbarStore = createWithLocalStorage(
  'snackbarStore',
  (set) => ({
    snackbar: null,
    setSnackbar: (newSnackbar) => set(() => ({ snackbar: newSnackbar })),
    showSnackbar: true,
    toggleShowSnackbar: () =>
      set((state) => ({ showSnackbar: !state.showSnackbar })),
  })
);

// Store for handling upload of ECG-data
export const useUploadStore = create((set) => ({
  userUploadedECGFile: 0,
  incrementUserUploadedECGFile: () =>
    set((state) => ({ userUploadedECGFile: state.userUploadedECGFile + 1 })),
}));

// Store for handling colors used in visualizations
export const useColorOptionsStore = createWithLocalStorage(
  'colorOptionsStore',
  (set) => ({
    mixOverlap: true,
    toggleMixOverlap: () => set((state) => ({ mixOverlap: !state.mixOverlap })),
    overlapPriority: 0,
    toggleOverlapPriority: () =>
      set((state) => ({
        overlapPriority: state.overlapPriority === 0 ? 1 : 0,
      })),
    waveColorTypes: ['Single color(s)', 'Diagnosis groupings', 'Amplitude'],
    activeWaveColorType: 0,
    setActiveWaveColorType: (newActive) =>
      set(() => ({ activeWaveColorType: newActive })),
    colors: ['#FF0000', '#E2E412', '#35E627', '#00D8FF', '#D500FF'],
    changeColor: (newColor, index) =>
      set((state) => (state.colors[index] = newColor)),
    addColor: (newColor) => set((state) => state.colors.push(newColor)),
    removeColor: (index) => set((state) => state.colors.splice(index, 1)),
    background: '#324444',
    setBackground: (newColor) => set(() => ({ background: newColor })),
  })
);
