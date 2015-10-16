import assert from "power-assert";
import sinon from "sinon";
import StaticParam from "../src/StaticParam";

describe("StaticParam", () => {
  describe("constructor()", () => {
    it("works", () => {
      let p = new StaticParam();

      assert(p instanceof StaticParam);
    });
  });
  describe("#value: number", () => {
    it("works", () => {
      let p = new StaticParam();

      p.onchange = sinon.spy();

      p.value = 10;
      assert(p.value === 10);
      assert(p.onchange.callCount === 1);
      assert(p.onchange.args[0][0] === 10);

      p.value = 20;
      assert(p.value === 20);
      assert(p.onchange.callCount === 2);
      assert(p.onchange.args[1][0] === 20);
    });
  });
});
