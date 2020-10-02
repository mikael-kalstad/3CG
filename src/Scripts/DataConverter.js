// Method that will convert data with y-points to 3 dimensional data with x,y,z positions
export const formatDataToPoints = (data) => {
  let points = [];

  // Samples contains relevant point data
  let samples = data['samples'];

  // Samples contains several channels with different "key"names
  let samplesKeys = Object.keys(samples);

  for (let channel in samplesKeys) {
    // Get channel data from samples
    let channelData = samples[samplesKeys[channel]];

    let channelPoints = [];

    let MAX_NUM_OF_POINTS = 400;
    let SCALE = 0.4;

    MAX_NUM_OF_POINTS =
      MAX_NUM_OF_POINTS > channelData.length
        ? channelData.length
        : MAX_NUM_OF_POINTS;

    for (let i in channelData) {
      if (i > MAX_NUM_OF_POINTS) break;

      channelPoints.push([
        i * SCALE,
        channelData[i],
        -channel * 10 + (10 * (samplesKeys.length - 1)) / 2,
      ]);
    }

    points.push(channelPoints);
  }

  return points;
};
