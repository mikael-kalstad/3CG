const groupingData = require('../data/groupings.json');
const annotationTypes = require('../data/annotationTypes.json');

export class AnnotationService {
  constructor(annotations) {
    this.annotations = this.formatFile(annotations, true);
  }
  // Format from fileformat to format used in code
  formatFile(json, isAI) {
    let result = json.map((obj) => {
      let start = this.onsetToSeconds(obj.onset);
      let data = this.findData(obj.code);
      if (data === undefined) {
        data = {
          Dx: obj.text,
          'SNOMED CT Code': undefined,
          Abbreviation: obj.code,
        };
      }
      let newObj = {
        start,
        end: start + obj.duration,
        data,
        ai: isAI,
      };
      return newObj;
    });
    return result;
  }

  // Format back to fileformat
  formatBackToFile(json) {
    let result = json.map((obj) => {
      let onset = this.secondsToOnset(obj.start);
      let duration = obj.end - obj.start;
      let newObj = {
        onset,
        duration,
        code: obj.data.Abbreviation,
        text: obj.data.Dx,
      };
      return newObj;
    });
    return result;
  }

  // Find annotationType data based on abbreviation/code
  findData(code) {
    // Remove any characters that is not in the alphabet
    code = code.replace(/[^A-Za-z']/g, '');

    let a;

    for (let i = 0; i < annotationTypes.length; i++) {
      a = annotationTypes[i];
      if (a['Abbreviation'] === code) return a;
    }
  }

  getAnnotations() {
    return this.annotations.sort((a, b) => a.start - b.start);
  }

  // Calculate onset-string to seconds
  onsetToSeconds = (onset) => {
    let split = onset.split(':');
    let sec = Number(split[0]) * 3.6 * 1000;
    sec += Number(split[1]) * 60;
    sec += Number(split[2]);
    return sec;
  };

  // Calculate onset from seconds
  secondsToOnset = (input) => {
    let remainder = input;
    let hours = String(Math.floor(remainder / 3600));
    remainder = remainder % 3600;
    let mins = String(Math.floor(remainder / 60));
    remainder = remainder % 60;
    let seconds = remainder.toFixed(10);
    // Fix floating point precision causing many decimals
    while (
      seconds[seconds.length - 1] === '0' ||
      seconds[seconds.length - 1] === '.'
    ) {
      seconds = seconds.substring(0, seconds.length - 1);
    }
    return (
      '0'.repeat(Math.max(0, 2 - hours.length)) +
      hours +
      ':' +
      '0'.repeat(Math.max(0, 2 - mins.length)) +
      mins +
      ':' +
      seconds
    );
  };
  // Get grouping color from specific annotation based on code, if it exists
  getGroupingColor(code) {
    let color = undefined;

    for (let i = 0; i < groupingData.length; i++) {
      let a = groupingData[i];

      // Check all codes in grouping
      let found = a['codes'].find((c) => c == code);

      if (found) {
        // Set color to grouping color
        color = a.color.toString();

        // No need to look furhter
        break;
      }
    }

    return color;
  }
}
let input = [];

try {
  let startUserAnnotations = require('../data/annotations.json');
  if (startUserAnnotations.length > 0)
    input = input.concat(startUserAnnotations);
} catch (e) {}
try {
  let startAiAnnotations = require('../data/aiAnnotations.json');
  if (startAiAnnotations.length > 0) input = input.concat(startAiAnnotations);
} catch (e) {}
export let annotationService = new AnnotationService(input);
