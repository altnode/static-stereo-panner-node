import assert from "power-assert";
import StaticStereoPannerNode from "../src/StaticStereoPannerNode";
import StaticParam from "../src/StaticParam";
import { SPLITTER, GAIN_L, GAIN_R, MERGER } from "../src/symbols";

function closeTo(expected, actual, delta) {
  return Math.abs(expected - actual) <= delta;
}

describe("StaticStereoPannerNode", () => {
  let audioContext = null;

  beforeEach(() => {
    audioContext = new global.AudioContext();
  });

  describe("constructor(audioContext: AudioContext)", () => {
    it("works", () => {
      let panner = new StaticStereoPannerNode(audioContext);

      assert(panner instanceof StaticStereoPannerNode);
    });
  });
  describe("#pan: StaticParam", () => {
    it("works", () => {
      let panner = new StaticStereoPannerNode(audioContext);

      assert(panner.pan instanceof StaticParam);
    });
  });
  describe("#connect(...args): void", () => {
    it("works", () => {
      let panner = new StaticStereoPannerNode(audioContext);

      panner.connect(audioContext.destination);

      assert(audioContext.destination.$isConnectedFrom(panner[MERGER]));
    });
  });
  describe("#disconnect(...args): void", () => {
    it("works", () => {
      let panner = new StaticStereoPannerNode(audioContext);

      panner.connect(audioContext.destination);
      panner.disconnect();

      assert(!audioContext.destination.$isConnectedFrom(panner[MERGER]));
    });
  });
  describe("#dispose(): void", () => {
    it("works", () => {
      let panner = new StaticStereoPannerNode(audioContext);

      panner.dispose();

      assert.throws(() => {
        panner.dispose();
      });
    });
  });
  describe("connected from", () => {
    it("works", () => {
      let oscillator = audioContext.createOscillator();
      let panner = new StaticStereoPannerNode(audioContext);

      oscillator.connect(panner);

      assert(panner[SPLITTER].$isConnectedFrom(oscillator));
    });
  });
  describe("graph", () => {
    it("works", () => {
      let panner = new StaticStereoPannerNode(audioContext);

      panner.connect(audioContext.destination);

      assert.deepEqual(audioContext.destination.toJSON(), {
        name: "AudioDestinationNode",
        inputs: [
          {
            name: "ChannelMergerNode",
            inputs: [
              [
                {
                  name: "GainNode",
                  gain: {
                    value: 0.7071067811865475,
                    inputs: []
                  },
                  inputs: [
                    {
                      name: "ChannelSplitterNode",
                      inputs: []
                    }
                  ]
                }
              ],
              [
                {
                  name: "GainNode",
                  gain: {
                    value: 0.7071067811865476,
                    inputs: []
                  },
                  inputs: [
                    {
                      name: "ChannelSplitterNode",
                      inputs: []
                    }
                  ]
                }
              ]
            ]
          }
        ]
      });
    });
  });
  describe("panning gain", () => {
    it("works", () => {
      let panner = new StaticStereoPannerNode(audioContext);

      panner.pan.value = -1;
      assert(closeTo(panner[GAIN_L].gain.value, 1, 1e-6));
      assert(closeTo(panner[GAIN_R].gain.value, 0, 1e-6));
      assert(closeTo(Math.sqrt(Math.pow(panner[GAIN_L].gain.value, 2) + Math.pow(panner[GAIN_R].gain.value, 2)), 1, 1e-6));

      panner.pan.value = -0.5;
      assert(closeTo(panner[GAIN_L].gain.value, 0.9238795325112867, 1e-6));
      assert(closeTo(panner[GAIN_R].gain.value, 0.3826834323650898, 1e-6));
      assert(closeTo(Math.sqrt(Math.pow(panner[GAIN_L].gain.value, 2) + Math.pow(panner[GAIN_R].gain.value, 2)), 1, 1e-6));

      panner.pan.value = 0;
      assert(closeTo(panner[GAIN_L].gain.value, 0.7071067811865476, 1e-6));
      assert(closeTo(panner[GAIN_R].gain.value, 0.7071067811865476, 1e-6));
      assert(closeTo(Math.sqrt(Math.pow(panner[GAIN_L].gain.value, 2) + Math.pow(panner[GAIN_R].gain.value, 2)), 1, 1e-6));

      panner.pan.value = +0.5;
      assert(closeTo(panner[GAIN_L].gain.value, 0.3826834323650898, 1e-6));
      assert(closeTo(panner[GAIN_R].gain.value, 0.9238795325112867, 1e-6));
      assert(closeTo(Math.sqrt(Math.pow(panner[GAIN_L].gain.value, 2) + Math.pow(panner[GAIN_R].gain.value, 2)), 1, 1e-6));

      panner.pan.value = +1;
      assert(closeTo(panner[GAIN_L].gain.value, 0, 1e-6));
      assert(closeTo(panner[GAIN_R].gain.value, 1, 1e-6));
      assert(closeTo(Math.sqrt(Math.pow(panner[GAIN_L].gain.value, 2) + Math.pow(panner[GAIN_R].gain.value, 2)), 1, 1e-6));
    });
  });
});
