# altnode.StaticStereoPannerNode
[![Build Status](http://img.shields.io/travis/altnode/static-stereo-panner-node.svg?style=flat-square)](https://travis-ci.org/altnode/static-stereo-panner-node)
[![NPM Version](http://img.shields.io/npm/v/altnode.static-stereo-panner-node.svg?style=flat-square)](https://www.npmjs.org/package/altnode.static-stereo-panner-node)
[![License](http://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](http://mohayonao.mit-license.org/)

## Installation

```
npm install -S altnode.static-stereo-panner-node
```

## API
### AudioNode
- `constructor(audioContext: AudioContext)`

#### Instance attributes
- `pan.value: number`

## Example

```js
import StaticStereoPannerNode from "altnode.static-stereo-panner-node";

let audioContext = new AudioContext();
let bufSrc = audioContext.createBufferSource();
let pan = new StaticStereoPannerNode(audioContext);

bufSrc.buffer = RhythmLoop;
bufSrc.loop = true;
bufSrc.start();
bufSrc.connect(eq);

pan.pan.value = 0.25;

pan.connect(audioContext.destination);
```

## LICENSE
MIT
