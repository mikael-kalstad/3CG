// Method that will convert data with y-points to 3 dimensional data with x,y,z positions
export const formatDataToPoints = (data) => {
  let points = [];

  // Samples contains relevant point data
  let samples = data['samples'];

  // Samples contains several channels with different "key"names
  let samplesKeys = Object.keys(samples);

  for (let i in samplesKeys) {
    // Get channel data from samples
    let channelData = samples[samplesKeys[i]];

    let channelPoints = [];

    let MAX_NUM_OF_POINTS = 3000;
    let SCALE = 0.4;

    MAX_NUM_OF_POINTS =
      MAX_NUM_OF_POINTS > channelData.length
        ? channelData.length
        : MAX_NUM_OF_POINTS;

    for (let point in channelData) {
      if (point > MAX_NUM_OF_POINTS) break;

      channelPoints.push([
        point * SCALE,
        channelData[point],
        i * 10 - (10 * (samplesKeys.length - 1)) / 2,
      ]);
    }

    points.push(channelPoints);
  }

  return points;
};
