/* eslint-env mocha */
import { expect } from "chai";
import { detectSums } from "./utils";

describe("Detect sums", () => {
  it("should fail if input is not an array", () => {
    expect(() => detectSums()).to.throw("Input is not an array");
  });

  it("should return an array", () => {
    const result = detectSums([]);
    expect(result).to.be.instanceof(Array);
  });

  it("should detect sums", () => {
    const result = detectSums([1, 2]);
    expect(result).to.be.instanceof(Array);
    expect(result).to.have.lengthOf(0);
  });

  it("should detect sums in order", () => {
    const result = detectSums([1, 2, 3]);
    expect(result).to.have.lengthOf(1);
    expect(result).to.deep.include({ pA: 0, pB: 1, sum: 2 });
  });

  it("should find multiple sums", () => {
    const result = detectSums([1, 2, 3, 4]);
    expect(result).to.have.lengthOf(2);
    expect(result).to.deep.include({ pA: 0, pB: 1, sum: 2 });
    expect(result).to.deep.include({ pA: 0, pB: 2, sum: 3 });
  });

  it("should handle zeros without reusing indices", () => {
    const result = detectSums([3, 0, 3]);
    expect(result).to.have.lengthOf(2);
    expect(result).to.deep.include({ pA: 0, pB: 1, sum: 2 });
    expect(result).to.deep.include({ pA: 1, pB: 2, sum: 0 });
  });

  it("should not reuse the same index as both part and sum", () => {
    expect(detectSums([1, 2, 4])).to.have.lengthOf(0);
    expect(detectSums([3, 0, 2])).to.have.lengthOf(0);
  });

  it("should handle duplicates and return every combination once", () => {
    const result = detectSums([1, 2, 1, 3]);
    expect(result).to.have.lengthOf(3);
    expect(result).to.deep.include({ pA: 0, pB: 1, sum: 3 });
    expect(result).to.deep.include({ pA: 0, pB: 2, sum: 1 });
    expect(result).to.deep.include({ pA: 1, pB: 2, sum: 3 });
  });

  it("should return empty array for empty input", () => {
    expect(detectSums([])).to.have.lengthOf(0);
  });

  it("should return empty array for single element", () => {
    expect(detectSums([5])).to.have.lengthOf(0);
  });
});
