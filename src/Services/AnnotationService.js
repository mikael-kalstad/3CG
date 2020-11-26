const groupingData = require('../data/groupings.json');
const annotationTypes = require('../data/annotationTypes.json');

class AnnotationService {
  constructor() {
    let json = require('../data/annotations.json');
    let jsonAi = require('../data/aiAnnotations.json');
    json = this.formatFile(json, true);

    jsonAi = this.formatFile(jsonAi, true);
    this.annotations = json.concat(jsonAi);
  }
  // Format from fileformat to format used in code
  formatFile(json, isAI) {
    let result = json.map((obj) => {
      let start = this.onsetToSeconds(obj.onset);
      let newObj = {
        start,
        end: start + obj.duration,
        data: this.findData(obj.code),
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
    console.log(result);
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

  // getAnnotationsOnlyInTimeframe(start, end) {
  //   let result = [];
  //   for (let i in this.annotations) {
  //     let ann = this.annotations[i];
  //     if (ann.start >= start && ann.end <= end) {
  //       result.push(ann);
  //     }
  //   }
  //   return result;
  // }

  // getAnnotationsInTimeframe(start, end) {
  //   let result = [];
  //   for (let i in this.annotations) {
  //     let ann = this.annotations[i];
  //     if (ann.start <= end && start <= ann.end) {
  //       result.push(ann);
  //     }
  //   }
  //   return result;
  // }

  // Calculate onset-string to seconds
  onsetToSeconds = (onset) => {
    let split = onset.split(':');
    let sec = Number(split[0]) * 3.6 * Math.pow(10, 3);
    sec += Number(split[1]) * 60;
    sec += Number(split[2]);
    return sec;
  };

  // Calculate s
  secondsToOnset = (input) => {
    let remainder = input;
    let hours = String(Math.floor(remainder / 3600));
    remainder = remainder % 3600;
    let mins = String(Math.floor(remainder / 60));
    remainder = remainder % 60;
    let seconds = String(remainder);
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

export let annotationService = new AnnotationService();
