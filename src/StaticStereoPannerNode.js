import AudioNode from "altnode.audio-node";
import StaticParam from "./StaticParam";
import { PAN, SPLITTER, GAIN_L, GAIN_R, MERGER } from "./symbols";

export default class StaticStereoPannerNode extends AudioNode {
  constructor(audioContext) {
    super(audioContext);

    this[SPLITTER] = audioContext.createChannelSplitter(2);
    this[GAIN_L] = audioContext.createGain();
    this[GAIN_R] = audioContext.createGain();
    this[MERGER] = audioContext.createChannelMerger(2);

    this[SPLITTER].channelCount = 2;
    this[SPLITTER].channelCountMode = "explicit";
    this[SPLITTER].connect(this[GAIN_L], 0);
    this[SPLITTER].connect(this[GAIN_R], 1);
    this[GAIN_R].connect(this[MERGER], 0, 0);
    this[GAIN_L].connect(this[MERGER], 0, 1);

    this[PAN] = new StaticParam();
    this[PAN].onchange = (value) => {
      value = Math.max(-1, Math.min(value, +1));
      value = (value + 1) * 0.5;

      this[GAIN_L].gain.value = Math.cos(value * Math.PI * 0.5);
      this[GAIN_R].gain.value = Math.sin(value * Math.PI * 0.5);
    };

    this.pan.value = 0;
  }

  get pan() {
    return this[PAN];
  }

  connect(...args) {
    this[MERGER].connect(...args);
  }

  disconnect(...args) {
    this[MERGER].disconnect(...args);
  }

  dispose() {
    this[SPLITTER].disconnect();
    this[GAIN_L].disconnect();
    this[GAIN_R].disconnect();
    this[MERGER].disconnect();
    this[SPLITTER] = null;
    this[GAIN_L] = null;
    this[GAIN_R] = null;
    this[MERGER] = null;
  }

  __connectFrom(source, ...args) {
    source.connect(this[SPLITTER], ...args);
  }
}
