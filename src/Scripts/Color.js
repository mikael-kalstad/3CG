import { useAnnotationStore, useColorOptionsStore } from '../Store';
import { annotationService } from '../Services/AnnotationService';
import { dataService } from '../Services/DataService';

// // Constant with colors in RGB format with values from 0.0 to 1.0
// // Add more colors or change colors in this array to change output of method below
// const colors = [
//   [1.0, 0.0, 0.0],
//   [1.0, 1.0, 0.0],
//   [0.0, 1.0, 1.0],
//   [0.125, 0.694, 0.141],
// ];

const red = [1.0, 0.0, 0.0];
const yellow = [1.0, 1.0, 0.0];
// const green = [0.0, 1.0, 0.0];
// const turq = [0.0, 1.0, 1.0];
// const blue = [0.0, 0.0, 1.0];

// Convert hex color to rbg color with values ranging from 0-1
const hexToRgbDecimal = (hex) => {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result
    ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
      ]
    : null;
};

// Mix two individual rgb colors together
const mixRgbColors = (rgbArr) => {
  // console.log('color1', rgbArr1, 'color2', rgbArr2);
  let newRgb = [0, 0, 0];

  for (let i = 0; i < 3; i++) {
    let tempValue = 0;

    for (let j = 0; j < rgbArr.length; j++) {
      tempValue += rgbArr[j][i];
    }

    newRgb[i] = tempValue / rgbArr.length;
  }
  // console.log('newrgb', newRgb);
  return newRgb;
};

// Method that will create an array with RGB colors that will transition between each other smoothly
export const getTransitionColorData = (data, offset) => {
  // Colors for each data point
  let arr = [];

  // Constant with colors in RGB format with values from 0.0 to 1.0
  let colors = [];

  // Get colors from global store
  let hexColor = useColorOptionsStore.getState().colors;
  // console.log(hexColor);

  // Add all hex colors to arr after converting it to rgb (0-1)
  hexColor.forEach((h) => colors.push(hexToRgbDecimal(h)));

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

// Method that will create an array with RGB colors where the color is based on the diagnosis for each point
export const getDiagnosisColorData = (data) => {
  let arr = [];

  // Get diagnosis/annotation data from global store
  let diagnoses = useAnnotationStore.getState().annotations;

  let diagnosesArr = [];
  const sampleRate = dataService.getSampleRate();

  // Create an overview over data start- and end point with associated color for each diagnosis
  diagnoses.forEach((d) => {
    // Get grouping based on diagnosis code if it exists
    let groupingColor = annotationService.getGroupingColor(
      d.data['SNOMED CT Code']
    );

    // Convert grouping color to rgb (0-1) if it exists
    if (groupingColor) groupingColor = hexToRgbDecimal(groupingColor);

    diagnosesArr.push({
      start: d.start * sampleRate,
      end: d.end * sampleRate,
      color: groupingColor /* CHANGE DEFAULT COLOR HERE!!!*/,
    });
  });

  // Default color when there is no diagnosis, which is called normal sinus rhytm
  const SINUS_RHYTM_COLOR = hexToRgbDecimal('#5FFA31');
  const OTHER_DIAGNOSIS_COLOR = hexToRgbDecimal('#FFFFFF');

  // Get options state from store
  const mixOverlapColors = useColorOptionsStore.getState().mixOverlap;

  const checkDiagnose = (i, j) => {
    let d = diagnosesArr[j];

    let color;

    // Check if diagnosis start- and end time is within current data point
    if (d.start <= i && d.end >= i) {
      // Set color to diagnosis color as default if it exists, before checking overlapping colors
      if (d.color) color = d.color;
      // No diagnosis grouping color found, set to default for other diagnoses
      else color = OTHER_DIAGNOSIS_COLOR;

      // Mix overlapping colors if options is enabled
      if (mixOverlapColors) {
        let overlapColors = [];

        // Find overlapping diagnoses
        diagnosesArr.forEach((dTemp) => {
          // If the diagnosis overlap, add it to the overlapColors array
          if (dTemp.start <= i && dTemp.end >= i && d.end >= dTemp.start)
            overlapColors.push(dTemp.color || OTHER_DIAGNOSIS_COLOR);
        });

        // Only mix colors if there are more than one overlapping colors
        if (overlapColors.length > 1) color = mixRgbColors(overlapColors);
      }
      return color;
    }
    return false;
  };

  // Go through all data and add colors for each data point
  for (let i = 0; i < data.length; i++) {
    // Default color when there is no annotations
    let color = SINUS_RHYTM_COLOR;

    // Go through every diagnosis
    if (useColorOptionsStore.getState().overlapPriority === 0) {
      for (let j = 0; j < diagnosesArr.length; j++) {
        let res = checkDiagnose(i, j);

        if (res) color = res;
        // else break;
      }
    } else {
      for (let j = diagnosesArr.length - 1; j >= 0; j--) {
        let res = checkDiagnose(i, j);

        if (res) color = res;
        // else break;
      }
    }

    // Add point-color to array
    arr.push(...color);
  }

  // 3D-points uses Float32Array to add colors to geometry
  return new Float32Array(arr);
};

export const getHeatColorData = (data, offset) => {
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
