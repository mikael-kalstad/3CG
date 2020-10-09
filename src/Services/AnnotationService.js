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
    this.annotations = this.json.map((obj) => {
      let start = onsetToSeconds(obj.onset);
      let newObj = {
        start,
        end: start + obj.duration,
        code: obj.code,
        text: obj.text,
      };
      return newObj;
    });
  }

  getAnnotations() {
    return this.annotations;
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
}

export let annotationService = new AnnotationService(
  '../data/annotations.json'
);
