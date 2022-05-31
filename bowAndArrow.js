const fs = require('fs');
const { Style, transform } = require('./style.js');

class Arrow {
  constructor(width, top) {
    this.width = width;
    this.top = top;
    this.left = 100;
  }

  halfHead(top, angle) {
    const halfHeadStyles = new Style();
    halfHeadStyles.attribute('height', '25px');
    halfHeadStyles.attribute('width', '0px');
    halfHeadStyles.attribute('border', '2px solid black');
    halfHeadStyles.attribute('position', 'absolute');
    halfHeadStyles.attribute('top', top + 'px');
    halfHeadStyles.attribute('left', this.left + 95 + 'px');
    halfHeadStyles.attribute(...transform(angle));
    const styles = halfHeadStyles.toString();
    return `<div style="${styles}"></div>`;
  }

  upperHead() {
    return this.halfHead(this.top - 22, 135);
  }

  bottomHead() {
    return this.halfHead(this.top - 2, 45);
  }

  arrowBody() {
    const arrowBodyStyles = new Style();
    arrowBodyStyles.attribute('height', '0px');
    arrowBodyStyles.attribute('width', this.width + 'px');
    arrowBodyStyles.attribute('border', '2px solid black');
    arrowBodyStyles.attribute('position', 'absolute');
    arrowBodyStyles.attribute('top', this.top + 'px');
    arrowBodyStyles.attribute('left', this.left + 'px');
    const styles = arrowBodyStyles.toString();
    return `<div style="${styles}"></div>`;
  }

  toHtml() {
    return this.upperHead() + this.bottomHead() + this.arrowBody();
  }

  moveToRight() {
    this.left = this.left + 20;
    return this.toHtml();
  }
}

const bowCurve = (top, angle) => {
  const style = new Style();
  style.attribute('height', '100px');
  style.attribute('width', '120px');
  style.attribute('border-top', '7px solid black');
  style.attribute('border-radius', '50%');
  style.attribute('position', 'relative');
  style.attribute('top', top);
  style.attribute(...transform(angle));
  const styles = style.toString();
  return `<div style ="${styles}"></div>`;
};

const arrowPlacer = () => {
  const style = new Style();
  style.attribute('height', '50px');
  style.attribute('width', '0px');
  style.attribute('border', '2px solid black');
  style.attribute('position', 'relative');
  style.attribute('top', '96px');
  style.attribute('left', '90px');
  const styles = style.toString();
  return `<div style ="${styles}"></div>`;
};

const bowString = (top, angle) => {
  const style = new Style();
  style.attribute('height', '130px');
  style.attribute('width', '0px');
  style.attribute('border', '2px solid black');
  style.attribute('position', 'absolute');
  style.attribute('top', top);
  style.attribute('left', '50px');
  style.attribute(...transform(angle));
  const styles = style.toString();
  return `<div style ="${styles}"></div>`;
};

const bowStyle = () => {
  const styles = new Style();
  styles.attribute('position', 'absolute');
  styles.attribute('top', '100px');
  styles.attribute('left', '200px');
  return styles.toString();
};

const makeBow = () => {
  const topCurve = bowCurve(100, 65);
  const bottomCurve = bowCurve(92, 115);
  const arrowPoint = arrowPlacer();
  const upperSting = bowString(100, 200);
  const bottomSting = bowString(225, 160);
  const bow = '<div style="' + bowStyle() + '">' + upperSting + bottomSting + topCurve + arrowPoint + bottomCurve + '</div>';
  return bow;
};

const metaHtml = (body) => {
  const bodyTag = `<body>${body}</body>`;
  return `<html><head><meta http-equiv="refresh" content="0.1"/></head>${bodyTag}</html>`;
};

const main = () => {
  const arrow = new Arrow(100, 330);
  const timer = setInterval(() => {
    const html = metaHtml(makeBow() + arrow.moveToRight());
    fs.writeFileSync('bowAndArrow.html', html, 'utf8');
  }, 100);
  setTimeout(() => clearInterval(timer), 6000);
}

main();
