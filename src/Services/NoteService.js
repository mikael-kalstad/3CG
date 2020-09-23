class NoteService {
  constructor(filename) {
    this.filename = filename;
    this.json = require('../data/annotations.json');
  }

  getAnnotations() {
    return this.json.annotations;
  }

  getAnnotationsInTimeframe(start, end) {
    let annotations = this.getAnnotations();
    let result = [];
    for (let i in annotations) {
      let ann = annotations[i];
    }
  }

  getAIAnnotations() {
    return this.json['ai-annotations'];
  }
}

export let noteService = new NoteService('../data/annotations.json');
