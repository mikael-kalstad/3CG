// Method that will
export const getColorData = (data) => {
  let arr = [];

  let colors = [
    [1.0, 0.0, 0.0],
    [1.0, 1.0, 0.0],
    [0.0, 1.0, 1.0],
    [0.125, 0.694, 0.141],
  ];

  for (let i = 0; i < data.length; i++) {
    let x = parseInt(i / (data.length / colors.length));

    if (x === colors.length - 1)
      colors[x][0] +
        (colors[x - 1][0] + colors[x][0]) *
          (i / (x + 1) / (data.length / colors.length)),
        colors[x][1] +
          (colors[x - 1][1] + colors[x][1]) *
            (i / (x + 1) / (data.length / colors.length)),
        colors[x][2] +
          (colors[x - 1][2] + colors[x][2]) *
            (i / (x + 1) / (data.length / colors.length));
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

  return new Float32Array(arr);
};
