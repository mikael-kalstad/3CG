// Method that will convert data with y-points to 3 dimensional data with x,y,z positions
export const formatDataToPoints = (data) => {
  let points = [];

  // Samples contains relevant point data
  let samples = data["samples"];

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
        point * SCALE - (SCALE * MAX_NUM_OF_POINTS) / 2,
        channelData[point],
        i * 10,
      ]);
    }

    points.push(channelPoints);
  }

  return points;
};

// const formatDataToPoints = (data) => {
//     let points = [];
//     console.log(data);
//     let samples = data["samples"];
//     let samplesKeys = Object.keys(samples);

//     for (let channel in samplesKeys) {
//       let arr = samples[samplesKeys[channel]];
//       let channelPoints = [];
//       let nPoints = 3000;
//       let scale = 0.4;
//       nPoints = nPoints > arr.length ? arr.length : nPoints;
//       for (let i in arr) {
//         if (i > nPoints) break;

//         channelPoints.push([
//           i * scale - (scale * nPoints) / 2,
//           arr[i],
//           channel * 10,
//         ]);
//       }

//       points.push(channelPoints);
//     }

//     return points;
//   };
