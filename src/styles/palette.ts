const palette = {
  mainRed: '#DB2A37',
  gray: '#DDDDDD',
  lightGray: '#F7F7F7',
  middleLightGray: '#ECECEC',
  middleGray: '#8A8A8A',
  darkGray: '#5D5D5D',
  white: '#FFFFFF',
};

export function hexToRGB(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } else {
    return `rgba(${r}, ${g}, ${b})`;
  }
}

export default palette;
