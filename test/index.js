import assert from "power-assert";
import index from "../src";
import StaticStereoPannerNode from "../src/StaticStereoPannerNode";

describe("index", () => {
  it("exports", () => {
    assert(index === StaticStereoPannerNode);
  });
});
