import { DataService } from '../Services/DataService';

let testObject = {
  rec_id: 'TEST-ID',
  sample_rate: 2,
  duration: 1.5,
  samples: {
    I: [-0.038, -0.039, -0.041],
    II: [-0.032, 0.029, 0.036],
    III: [-0.038, -0.039, -0.056],
    aVR: [0.058, 0.033, -0.021],
    aVL: [-0.038, -0.039, -0.059],
    aVF: [-0.024, -0.034, -0.044],
    V1: [-0.018, 0.039, 0.078],
    V2: [-0.008, 0.019, 0.033],
    V3: [-0.134, 0.039, 0.08],
    V4: [0.128, -0.039, -0.043],
    V5: [0.075, -0.039, -0.049],
    V6: [-0.032, -0.039, -0.05],
  },
};
let s = new DataService(testObject);

test('Test get methods', () => {
  expect(s.getDuration()).toBe(1.5);
  expect(s.getSampleLength()).toBe(3);
  expect(s.getSampleLength()).toBe(
    Number.parseInt(s.getDuration() * s.getSampleRate())
  );
  expect(s.getRecID()).toEqual('TEST-ID');
  expect(s.getSampleRate()).toBe(2);
  expect(s.getChannelNamesArray()).toHaveLength(12);
  expect(s.getChannelNamesArray()).toContain('aVF');
  expect(s.getChannelNamesArray()).toContain('II');
  expect(s.getSamplesByChannel('II')).toContain(-0.032);
  expect(s.getSamplesByChannel('II')).toContain(0.029);
  expect(s.getSamplesByChannel('II')).toContain(0.036);
});

test('Test formatting of data to points', () => {
  let points = s.formatDataToPoints();
  expect(points).toHaveLength(s.getChannelNamesArray().length);
  points.forEach((e) => {
    expect(e).toHaveLength(3);
    expect(e).toHaveLength(
      Number.parseInt(s.getDuration() * s.getSampleRate())
    );
  });
  let arbChannel = points[3];
  expect(arbChannel[0][0]).toBe(0);
  expect(arbChannel[1][0]).toBe(1);
  expect(arbChannel[2][0]).toBe(2);
  expect(arbChannel[0][1]).toBe(0.058);
  expect(arbChannel[1][1]).toBe(0.033);
  expect(arbChannel[2][1]).toBe(-0.021);
});
