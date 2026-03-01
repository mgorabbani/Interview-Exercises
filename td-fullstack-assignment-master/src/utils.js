// time complexity: O(n^3)
// space complexity: O(1) auxiliary space, Total space complexity: O(k), where k is the number of results found
export const detectSums = (array) => {
  if (!Array.isArray(array)) {
    throw new Error("Input is not an array");
  }
  const results = [];

  for (let pA = 0; pA < array.length; pA++) {
    for (let pB = pA + 1; pB < array.length; pB++) {
      const target = array[pA] + array[pB];
      for (let sum = 0; sum < array.length; sum++) {
        if (sum === pA || sum === pB) continue;
        if (target === array[sum]) {
          results.push({ pA, pB, sum });
        }
      }
    }
  }
  return results;
};
// Time complexity: O(n^2) average c ase, O(n^3) worst case.
// space complexity: O(n) as auxiliary space, total space complexity: O(k + n), where k is the number of results found
export function detectSumsTimeEfficient(array) {
  if (!Array.isArray(array)) {
    throw new Error("Input is not an array");
  }
  const results = [];
  const map = new Map();

  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    if (!map.has(value)) {
      map.set(value, []);
    }
    map.get(value).push(i);
  }

  for (let pA = 0; pA < array.length; pA++) {
    for (let pB = pA + 1; pB < array.length; pB++) {
      const target = array[pA] + array[pB];
      const candidateSums = map.get(target) || [];
      for (const sum of candidateSums) {
        if (sum === pA || sum === pB) continue;
        results.push({ pA, pB, sum });
      }
    }
  }
  return results;
}

export function calculateResult(input) {
  const parsedInput = input.split(",").map((i) => parseInt(i.trim(), 10));
  let error = null;
  let result = "";
  try {
    if (parsedInput.some(isNaN)) {
      throw new Error("Invalid input: all values must be numbers");
    }
    if (parsedInput.length < 3) {
      throw new Error("At least 3 numbers are required to find sums");
    }
    result = detectSumsTimeEfficient(parsedInput);
  } catch (e) {
    error = e.message;
  }
  return { input: parsedInput, result, error };
}
