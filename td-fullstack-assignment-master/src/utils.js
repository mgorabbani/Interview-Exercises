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

export function calculateResult(input) {
  const parsedInput = input.split(",").map((i) => parseInt(i.trim(), 10));
  let error = null;
  let result = "";
  try {
    result = detectSums(parsedInput);
  } catch (e) {
    error = e.message;
  }
  return { input: parsedInput, result, error };
}
