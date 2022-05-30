class Style {
  constructor() {
    this.attributes = {};
  };

  attribute(property, value) {
    this.attributes[property] = value;
  };

  toString() {
    const allEntries = Object.entries(this.attributes);
    const propValuePairs = allEntries.map(([property, value]) => `${property}:${value}`);
    return propValuePairs.join(';');
  };
}

const transform = (angle) =>
  ['transform', `rotate(${angle}deg)`];

exports.Style = Style;
exports.transform = transform;