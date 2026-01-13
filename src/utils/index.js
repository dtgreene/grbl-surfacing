import { state } from '../state';

export function createGCode() {
  const { form } = state;

  const width = form.width;
  const height = form.height;
  const stepSize = form.bit_diameter * form.step_over;
  const bitRadius = form.bit_diameter * 0.5;
  const rate = form.feed_rate;

  let x = 0;
  let y = 0;
  let prevX = x;
  let gcode = form.start_gcode.split('\n');

  while (x < width) {
    if (y === 0) {
      y = height;
    } else {
      y = 0;
    }

    prevX = x;
    gcode.push(getCutMove(x, y, rate));
    x = Math.min(x + stepSize, width);
    gcode.push(getCutMove(x, y, rate));
  }

  // Sometimes an extra pass is needed to fully cover the board. You could
  // probably just throw this at the end everytime and it would be fine.
  if (prevX + bitRadius < width) {
    if (y === 0) {
      y = height;
    } else {
      y = 0;
    }

    gcode.push(getCutMove(x, y, rate));
  }

  gcode = gcode.concat(form.end_gcode.split('\n'));

  // Remove comments
  gcode = gcode
    .filter((line) => line.trim())
    .map((line) => {
      const commentIndex = line.indexOf(';');

      if (commentIndex > -1) {
        return line.substr(0, commentIndex);
      }

      return line;
    });

  return gcode.join('\n');
}

export function createPreviewPath() {
  const { form, gcode } = state;
  const { height } = form;
  const lines = gcode.split('\n');

  let x = 0;
  let y = height;

  const path = [`M${x},${y}`];

  lines.forEach((line) => {
    if (!line.startsWith('G1 ')) return;

    const parts = line.split(' ');

    if (parts.length < 3) return;

    const xTo = Number(parts[1].substr(1));
    const yTo = Number(parts[2].substr(1));

    path.push(`L${xTo},${height - yTo}`);
  });

  return path.join('');
}

function getCutMove(x, y, rate) {
  return `G1 X${x.toFixed(2)} Y${y.toFixed(2)} F${rate}`;
}
