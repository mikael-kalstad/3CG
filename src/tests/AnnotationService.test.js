import { AnnotationService } from '../Services/AnnotationService';

let s = new AnnotationService([]);

test('Test onsetToSeconds', () => {
  expect(s.onsetToSeconds('00:00:0.2')).toBe(0.2);
  expect(s.onsetToSeconds('01:23:18')).toBe(4998);
  expect(s.onsetToSeconds('00:06:00')).toBe(360);
  expect(s.onsetToSeconds('00:45:16.2353')).toBe(2716.2353);
});

test('Test secondsToOnset', () => {
  expect(s.secondsToOnset(35)).toBe('00:00:35');
  expect(s.secondsToOnset(3601)).toBe('01:00:1');
  expect(s.secondsToOnset(1032.57)).toBe('00:17:12.57');
  expect(s.secondsToOnset(0.00004)).toBe('00:00:0.00004');
});

test('Test findData from code', () => {
  let data = s.findData('AFAFL');
  expect(data).toBeInstanceOf(Object);
  expect(data).toMatchObject({
    Dx: 'atrial fibrillation and flutter',
    'SNOMED CT Code': 195080001,
    Abbreviation: 'AFAFL',
  });
  expect(s.findData('non-existent-code')).toBeUndefined();
});

test('Test getGroupingColor from code', () => {
  expect(s.getGroupingColor(195080001)).toBeUndefined();
  expect(s.getGroupingColor(426648003)).toBe('#298EF9');
});

let testArray = [
  // Annotation with existing code and correct text
  {
    onset: '00:00:2.580',
    duration: -0.542,
    text: 'sinus arrhythmia',
    code: 'SA',
  },
  // Annotation with existing code and wrong text
  {
    onset: '00:00:6.10',
    duration: 1.4,
    text: 'TEST-TEXT1',
    code: 'FB',
  },
  // Annotation with non-existing code and arbitrary text
  {
    onset: '00:03:0.43',
    duration: 1.4,
    text: 'TEST-TEXT2',
    code: 'NON-EXISTENT-CODE',
  },
];

test('Test formatfile', () => {
  let formattedAiTrue = s.formatFile(testArray, true);
  formattedAiTrue.forEach((e) => expect(e.ai).toBeTruthy());
  let formattedAiFalse = s.formatFile(testArray, false);
  formattedAiFalse.forEach((e) => expect(e.ai).toBeFalsy());

  let formatted = formattedAiFalse;
  expect(formatted[0].start).toBe(2.58);
  expect(formatted[0].end).toBe(3.122); // Negative duration corrected to positive
  expect(formatted[0].data.Dx).toEqual('sinus arrhythmia');
  expect(formatted[0].data['SNOMED CT Code']).not.toBeUndefined();
  expect(formatted[0].data.Abbreviation).toEqual('SA');

  expect(formatted[1].start).toBe(6.1);
  expect(formatted[1].end).toBe(7.5);
  expect(formatted[1].data.Dx).not.toEqual('TEST-TEXT1');
  expect(formatted[1].data.Dx).toEqual('fusion beats');
  expect(formatted[1].data['SNOMED CT Code']).not.toBeUndefined();
  expect(formatted[1].data.Abbreviation).toEqual('FB');

  expect(formatted[2].start).toBe(3 * 60 + 0.43);
  expect(formatted[2].end).toBe(181.83);
  expect(formatted[2].data.Dx).toEqual('TEST-TEXT2');
  expect(formatted[2].data['SNOMED CT Code']).toBeUndefined();
  expect(formatted[2].data.Abbreviation).toEqual('NON-EXISTENT-CODE');
});

test('Test formatBackToFile', () => {
  let initial = testArray;
  let formatted = s.formatFile(initial);
  let formattedBack = s.formatBackToFile(formatted);

  let arbFormattedBack = formattedBack[1];

  expect(arbFormattedBack.onset).toEqual('00:00:6.1');
  expect(arbFormattedBack.duration).toBeCloseTo(1.4, 7);
  expect(arbFormattedBack.code).toEqual('FB');
  expect(arbFormattedBack.text).toEqual('fusion beats');
});

s = new AnnotationService(testArray);

test('All annotations added in constructor are AI', () => {
  s.getAnnotations().forEach((e) => expect(e).toBeTruthy());
});
