const groupingData = require('../data/groupings.json');

class AnnotationService {
  constructor(filename) {
    this.filename = filename;
    this.json = require('../data/annotations.json');
    this.jsonAi = require('../data/aiAnnotations.json');
    this.json = this.formatFile(this.json, false);

    this.jsonAi = this.formatFile(this.jsonAi, true);
    this.annotations = this.json.concat(this.jsonAi);
  }

  formatFile(json, isAI) {
    let result = json.map((obj) => {
      let start = this.onsetToSeconds(obj.onset);
      console.log(obj);
      let newObj = {
        start,
        end: start + obj.duration,
        data: obj.data,
        ai: isAI,
      };
      return newObj;
    });
    return result;
  }

  formatBackToFile(json) {
    let result = json.map((obj) => {
      let onset = this.secondsToOnset(obj.start);
      let duration = obj.end - obj.start;
      let newObj = {
        onset,
        duration,
        text: obj.text,
        code: obj.code,
      };
      return newObj;
    });
    return result;
  }

  getAnnotations() {
    return this.annotations.sort((a, b) => a.start - b.start);
  }

  getAnnotationsOnlyInTimeframe(start, end) {
    let result = [];
    for (let i in this.annotations) {
      let ann = this.annotations[i];
      if (ann.start >= start && ann.end <= end) {
        result.push(ann);
      }
    }
    return result;
  }

  getAnnotationsInTimeframe(start, end) {
    let result = [];
    for (let i in this.annotations) {
      let ann = this.annotations[i];
      if (ann.start <= end && start <= ann.end) {
        result.push(ann);
      }
    }
    return result;
  }

  onsetToSeconds = (onset) => {
    let split = onset.split(':');
    let sec = Number(split[0]) * 3.6 * Math.pow(10, 3);
    sec += Number(split[1]) * 60;
    sec += Number(split[2]);
    return sec;
  };

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

export let annotationService = new AnnotationService(
  '../data/annotations.json'
);
