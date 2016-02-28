const number = [1, 2, 3];
const saturation = ['striped', 'empty', 'full'];
const color = ['red', 'green', 'blue'];
const shape = ['circle', 'rectangle', 'square'];

const getRandomProps = () => {
  return {
    number: number[Math.floor(Math.random() * 3)],
    saturation: saturation[Math.floor(Math.random() * 3)],
    color: color[Math.floor(Math.random() * 3)],
    shape: shape[Math.floor(Math.random() * 3)],
  };
};

const CardProps = {
  number,
  saturation,
  color,
  shape,
  getRandomProps,
};

export {CardProps};
