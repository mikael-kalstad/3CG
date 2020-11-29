import {
  useModeStore,
  useInspectStore,
  useChannelStore,
  useAnnotationStore,
  useRenderTypeStore,
} from '../Store';

test('Test mode store', () => {
  let playMode = useModeStore.getState().playMode;
  expect(playMode).toBeFalsy();
  useModeStore.getState().togglePlayMode();
  playMode = useModeStore.getState().playMode;
  expect(playMode).toBeTruthy();

  let gridMode = useModeStore.getState().gridMode;
  expect(gridMode).toBeFalsy();
  useModeStore.getState().toggleGridMode();
  gridMode = useModeStore.getState().gridMode;
  expect(gridMode).toBeTruthy();
});

test('Test inspect store', () => {
  let inspected = useInspectStore.getState().inspected;
  expect(inspected).toBe(-1);
  useInspectStore.getState().setInspected(4);
  inspected = useInspectStore.getState().inspected;
  expect(inspected).toBe(4);

  let currentlyHovering = useInspectStore.getState().currentlyHovering;
  expect(currentlyHovering).toBeFalsy();
  useInspectStore.getState().setCurrentlyHovering(true);
  currentlyHovering = useInspectStore.getState().currentlyHovering;
  expect(currentlyHovering).toBeTruthy();
});

test('Test channel store', () => {
  let activeChannels = useChannelStore.getState().activeChannels;
  activeChannels.forEach((e) => {
    expect(e).toBeTruthy();
  });

  useChannelStore.getState().toggleChannel(7);
  activeChannels = useChannelStore.getState().activeChannels;
  activeChannels.forEach((e, i) => {
    i === 7 ? expect(e).toBeFalsy() : expect(e).toBeTruthy();
  });

  expect(activeChannels[2]).toBeTruthy();
  useChannelStore.getState().setChannel(2, true);
  activeChannels = useChannelStore.getState().activeChannels;
  expect(activeChannels[2]).toBeTruthy();
  useChannelStore.getState().setChannel(2, false);
  activeChannels = useChannelStore.getState().activeChannels;
  expect(activeChannels[2]).toBeFalsy();

  let newActiveChannels = new Array().fill(true);
  useChannelStore.getState().setActiveChannels(newActiveChannels);
  activeChannels = useChannelStore.getState().activeChannels;
  activeChannels.forEach((e) => expect(e).toBeTruthy());

  useChannelStore.getState().toggleAllChannels(false);
  activeChannels = useChannelStore.getState().activeChannels;
  activeChannels.forEach((e) => expect(e).toBeFalsy());
});

test('Test annotation store', () => {
  let initialLength = useAnnotationStore.getState().annotations.length;
  let newAnnotation = {
    start: 7.3,
    end: 8.4,
    data: {
      Dx: 'Test annotation',
      'SNOMED CT Code': 111288001,
      Abbreviation: 'TA',
    },
    ai: false,
  };
  useAnnotationStore.getState().addAnnotation(newAnnotation);
  let annotations = useAnnotationStore.getState().annotations;
  expect(annotations).toContain(newAnnotation);
  expect(annotations.length).toBe(initialLength + 1);

  let activeAnnotations = useAnnotationStore.getState().activeAnnotations;
  activeAnnotations.forEach((e) => expect(e).toBeTruthy());

  useAnnotationStore.getState().toggleAnnotation(1);
  activeAnnotations = useAnnotationStore.getState().activeAnnotations;
  activeAnnotations.forEach((e, i) =>
    i === 1 ? expect(e).toBeFalsy() : expect(e).toBeTruthy()
  );

  initialLength = annotations.length;
  let indexToDelete = 2;
  let annotationToDelete = annotations[indexToDelete];

  useAnnotationStore.getState().deleteAnnotations([indexToDelete]);
  annotations = useAnnotationStore.getState().annotations;
  expect(annotations).not.toContain(annotationToDelete);

  useAnnotationStore.getState().deleteAllAnnotations();
  annotations = useAnnotationStore.getState().annotations;
  expect(annotations.length).toBe(0);
});

test('Test rendertype store', () => {
  let activeRenders = useRenderTypeStore.getState().activeRenders;
  expect(activeRenders).toHaveLength(1);
  expect(activeRenders).toEqual(['Ecg']);

  useRenderTypeStore.getState().addActiveRender('Vcg');
  activeRenders = useRenderTypeStore.getState().activeRenders;
  expect(activeRenders).toHaveLength(2);
  expect(activeRenders).toEqual(['Ecg', 'Vcg']);

  useRenderTypeStore.getState().addActiveRender('Circle');
  useRenderTypeStore.getState().editRender('Ecg', 2);
  activeRenders = useRenderTypeStore.getState().activeRenders;
  expect(activeRenders).toEqual(['Ecg', 'Vcg', 'Ecg']);

  useRenderTypeStore.getState().removeActiveRender(0);
  activeRenders = useRenderTypeStore.getState().activeRenders;
  expect(activeRenders).toEqual(['Vcg', 'Ecg']);
});
