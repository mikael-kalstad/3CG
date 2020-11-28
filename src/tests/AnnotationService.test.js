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
  {
    onset: '00:00:2.580',
    duration: 0.542,
    text: 'sinus arrhythmia',
    code: 'SA',
  },
  {
    onset: '00:00:6.10',
    duration: 1.4,
    text: 'Front beats',
    code: 'FB',
  },
];

s = new AnnotationService(testArray);

test('All annotations added in constructor are AI', () => {
  s.getAnnotations().forEach((e) => expect(e).toBeTruthy());
});
