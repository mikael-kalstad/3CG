// Constant with colors in RGB format with values from 0.0 to 1.0
// Add more colors or change colors in this array to change output of method below
const colors = [
  [1.0, 0.0, 0.0],
  [1.0, 1.0, 0.0],
  [0.0, 1.0, 1.0],
  [0.125, 0.694, 0.141],
];

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
