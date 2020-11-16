const groupingData = require('../data/groupings.json');

const onsetToSeconds = (onset) => {
  let split = onset.split(':');
  let sec = Number(split[0]) * 3.6 * Math.pow(10, 3);
  sec += Number(split[1]) * 60;
  sec += Number(split[2]);
  return sec;
};

class AnnotationService {
  constructor(filename) {
    this.filename = filename;
    this.json = require('../data/annotations.json');
    this.jsonAi = require('../data/aiAnnotations.json');
    this.json = this.json.map((obj) => {
      let start = onsetToSeconds(obj.onset);
      let newObj = {
        start,
        end: start + obj.duration,
        data: obj.data,
      };
      return newObj;
    });

    this.jsonAi = this.jsonAi.map((obj) => {
      let start = onsetToSeconds(obj.onset);
      let newObj = {
        start,
        end: start + obj.duration,
        data: obj.data,
        ai: true,
      };
      return newObj;
    });
    this.annotations = this.json.concat(this.jsonAi);
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
