// Constant with colors in RGB format with values from 0.0 to 1.0
// Add more colors or change colors in this array to change output of method below

const colors = [
  [1.0, 0.0, 0.0],
  [1.0, 1.0, 0.0],
  [0.0, 1.0, 1.0],
  [0.125, 0.694, 0.141],
];

const red = [1.0, 0.0, 0.0];
const yellow = [1.0, 1.0, 0.0];
// const green = [0.0, 1.0, 0.0];
// const turq = [0.0, 1.0, 1.0];
// const blue = [0.0, 0.0, 1.0];

// Method that will create an array with RGB colors used with points in a line
export const getColorData = (data, offset) => {
  let arr = [];

  // Add empty colors if there is a set offset
  if (offset && offset > 0) {
    for (let i = 0; i < offset; i++) {
      arr.push(0.0, 0.0, 0.0);
    }
  }

  // Go through all data and add colors for each data point
  for (let i = 0; i < data.length; i++) {
    // Index that will divide data set into equal parts to make colors equally distanced between points
    let x = parseInt(i / (data.length / colors.length));

    // Last color in list should look backward not forward for transition!
    if (x === colors.length - 1)
      arr.push(colors[x][0], colors[x][1], colors[x][2]);
    // Add colors with a transition between the current and next color in list.
    // Note that there is three color points for R,G and B values
    else
      arr.push(
        colors[x][0] +
          (colors[x + 1][0] - colors[x][0]) *
            (i / (x + 1) / (data.length / colors.length)),
        colors[x][1] +
          (colors[x + 1][1] - colors[x][1]) *
            (i / (x + 1) / (data.length / colors.length)),
        colors[x][2] +
          (colors[x + 1][2] - colors[x][2]) *
            (i / (x + 1) / (data.length / colors.length))
      );
  }

  // 3D-points uses Float32Array to add colors to geometry
  return new Float32Array(arr);
};

export const getColorDataHeat = (data, offset) => {
  let arr = [];

  // Add empty colors if there is a set offset
  if (offset && offset > 0) {
    for (let i = 0; i < offset; i++) {
      arr.push(0.0, 0.0, 0.0);
    }
  }

  // Go through all data and add colors for each data point
  let values = [];
  for (let i = 0; i < data.length; i++) {
    values.push(data[i][1]);
  }

  let maxValue = Math.max(...values);
  let minValue = Math.min(...values);
  let range = Math.abs(maxValue) + Math.abs(minValue);
  for (let i = 0; i < data.length; i++) {
    let ratio = (data[i][1] + Math.abs(minValue)) / range;
    arr.push(
      yellow[0] + (red[0] - yellow[0]) * ratio,
      yellow[1] + (red[1] - yellow[1]) * ratio,
      yellow[2] + (red[2] - yellow[2]) * ratio
    );
  }

  // 3D-points uses Float32Array to add colors to geometry
  return new Float32Array(arr);
};
