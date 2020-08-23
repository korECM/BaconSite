export const getScore = (score: number | null): string => {
  if (score === null) return '-';
  if (score >= 4.25) {
    return 'A+';
  } else if (score >= 3.75) {
    return 'A';
  } else if (score >= 3.25) {
    return 'B+';
  } else if (score >= 2.75) {
    return 'B';
  } else if (score >= 2.25) {
    return 'C+';
  } else if (score >= 1.75) {
    return 'C';
  } else if (score >= 1.25) {
    return 'D+';
  } else {
    return 'D';
  }
};
