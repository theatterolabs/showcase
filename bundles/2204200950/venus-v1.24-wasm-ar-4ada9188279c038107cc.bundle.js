webpackJsonpYMK([13],{

/***/ 1943:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var processNextTick = __webpack_require__(778);
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = __webpack_require__(513);
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = __webpack_require__(981).EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(1944);
/*</replacement>*/

// TODO(bmeurer): Change this back to const once hole checks are
// properly optimized away early in Ignition+TurboFan.
/*<replacement>*/
var Buffer = __webpack_require__(592).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(750);
util.inherits = __webpack_require__(485);
/*</replacement>*/

/*<replacement>*/
var debugUtil = __webpack_require__(2054);
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = __webpack_require__(2055);
var destroyImpl = __webpack_require__(1945);
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
  }
}

function ReadableState(options, stream) {
  Duplex = Duplex || __webpack_require__(667);

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = __webpack_require__(984).StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(667);

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = __webpack_require__(984).StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    processNextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        processNextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    processNextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], self.emit.bind(self, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    processNextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74), __webpack_require__(169)))

/***/ }),

/***/ 1944:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(981).EventEmitter;


/***/ }),

/***/ 1945:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

var processNextTick = __webpack_require__(778);
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      processNextTick(emitErrorNT, this, err);
    }
    return;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      processNextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};

/***/ }),

/***/ 1946:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.



module.exports = Transform;

var Duplex = __webpack_require__(667);

/*<replacement>*/
var util = __webpack_require__(750);
util.inherits = __webpack_require__(485);
/*</replacement>*/

util.inherits(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return stream.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er, data) {
      done(stream, er, data);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data !== null && data !== undefined) stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

/***/ }),

/***/ 1947:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/**
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 *
 */

var inherits = __webpack_require__(485)
var Hash = __webpack_require__(678)

var K = [
  0x428A2F98, 0x71374491, 0xB5C0FBCF, 0xE9B5DBA5,
  0x3956C25B, 0x59F111F1, 0x923F82A4, 0xAB1C5ED5,
  0xD807AA98, 0x12835B01, 0x243185BE, 0x550C7DC3,
  0x72BE5D74, 0x80DEB1FE, 0x9BDC06A7, 0xC19BF174,
  0xE49B69C1, 0xEFBE4786, 0x0FC19DC6, 0x240CA1CC,
  0x2DE92C6F, 0x4A7484AA, 0x5CB0A9DC, 0x76F988DA,
  0x983E5152, 0xA831C66D, 0xB00327C8, 0xBF597FC7,
  0xC6E00BF3, 0xD5A79147, 0x06CA6351, 0x14292967,
  0x27B70A85, 0x2E1B2138, 0x4D2C6DFC, 0x53380D13,
  0x650A7354, 0x766A0ABB, 0x81C2C92E, 0x92722C85,
  0xA2BFE8A1, 0xA81A664B, 0xC24B8B70, 0xC76C51A3,
  0xD192E819, 0xD6990624, 0xF40E3585, 0x106AA070,
  0x19A4C116, 0x1E376C08, 0x2748774C, 0x34B0BCB5,
  0x391C0CB3, 0x4ED8AA4A, 0x5B9CCA4F, 0x682E6FF3,
  0x748F82EE, 0x78A5636F, 0x84C87814, 0x8CC70208,
  0x90BEFFFA, 0xA4506CEB, 0xBEF9A3F7, 0xC67178F2
]

var W = new Array(64)

function Sha256 () {
  this.init()

  this._w = W // new Array(64)

  Hash.call(this, 64, 56)
}

inherits(Sha256, Hash)

Sha256.prototype.init = function () {
  this._a = 0x6a09e667
  this._b = 0xbb67ae85
  this._c = 0x3c6ef372
  this._d = 0xa54ff53a
  this._e = 0x510e527f
  this._f = 0x9b05688c
  this._g = 0x1f83d9ab
  this._h = 0x5be0cd19

  return this
}

function ch (x, y, z) {
  return z ^ (x & (y ^ z))
}

function maj (x, y, z) {
  return (x & y) | (z & (x | y))
}

function sigma0 (x) {
  return (x >>> 2 | x << 30) ^ (x >>> 13 | x << 19) ^ (x >>> 22 | x << 10)
}

function sigma1 (x) {
  return (x >>> 6 | x << 26) ^ (x >>> 11 | x << 21) ^ (x >>> 25 | x << 7)
}

function gamma0 (x) {
  return (x >>> 7 | x << 25) ^ (x >>> 18 | x << 14) ^ (x >>> 3)
}

function gamma1 (x) {
  return (x >>> 17 | x << 15) ^ (x >>> 19 | x << 13) ^ (x >>> 10)
}

Sha256.prototype._update = function (M) {
  var W = this._w

  var a = this._a | 0
  var b = this._b | 0
  var c = this._c | 0
  var d = this._d | 0
  var e = this._e | 0
  var f = this._f | 0
  var g = this._g | 0
  var h = this._h | 0

  for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4)
  for (; i < 64; ++i) W[i] = (gamma1(W[i - 2]) + W[i - 7] + gamma0(W[i - 15]) + W[i - 16]) | 0

  for (var j = 0; j < 64; ++j) {
    var T1 = (h + sigma1(e) + ch(e, f, g) + K[j] + W[j]) | 0
    var T2 = (sigma0(a) + maj(a, b, c)) | 0

    h = g
    g = f
    f = e
    e = (d + T1) | 0
    d = c
    c = b
    b = a
    a = (T1 + T2) | 0
  }

  this._a = (a + this._a) | 0
  this._b = (b + this._b) | 0
  this._c = (c + this._c) | 0
  this._d = (d + this._d) | 0
  this._e = (e + this._e) | 0
  this._f = (f + this._f) | 0
  this._g = (g + this._g) | 0
  this._h = (h + this._h) | 0
}

Sha256.prototype._hash = function () {
  var H = new Buffer(32)

  H.writeInt32BE(this._a, 0)
  H.writeInt32BE(this._b, 4)
  H.writeInt32BE(this._c, 8)
  H.writeInt32BE(this._d, 12)
  H.writeInt32BE(this._e, 16)
  H.writeInt32BE(this._f, 20)
  H.writeInt32BE(this._g, 24)
  H.writeInt32BE(this._h, 28)

  return H
}

module.exports = Sha256

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 1948:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var inherits = __webpack_require__(485)
var Hash = __webpack_require__(678)

var K = [
  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
]

var W = new Array(160)

function Sha512 () {
  this.init()
  this._w = W

  Hash.call(this, 128, 112)
}

inherits(Sha512, Hash)

Sha512.prototype.init = function () {
  this._ah = 0x6a09e667
  this._bh = 0xbb67ae85
  this._ch = 0x3c6ef372
  this._dh = 0xa54ff53a
  this._eh = 0x510e527f
  this._fh = 0x9b05688c
  this._gh = 0x1f83d9ab
  this._hh = 0x5be0cd19

  this._al = 0xf3bcc908
  this._bl = 0x84caa73b
  this._cl = 0xfe94f82b
  this._dl = 0x5f1d36f1
  this._el = 0xade682d1
  this._fl = 0x2b3e6c1f
  this._gl = 0xfb41bd6b
  this._hl = 0x137e2179

  return this
}

function Ch (x, y, z) {
  return z ^ (x & (y ^ z))
}

function maj (x, y, z) {
  return (x & y) | (z & (x | y))
}

function sigma0 (x, xl) {
  return (x >>> 28 | xl << 4) ^ (xl >>> 2 | x << 30) ^ (xl >>> 7 | x << 25)
}

function sigma1 (x, xl) {
  return (x >>> 14 | xl << 18) ^ (x >>> 18 | xl << 14) ^ (xl >>> 9 | x << 23)
}

function Gamma0 (x, xl) {
  return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ (x >>> 7)
}

function Gamma0l (x, xl) {
  return (x >>> 1 | xl << 31) ^ (x >>> 8 | xl << 24) ^ (x >>> 7 | xl << 25)
}

function Gamma1 (x, xl) {
  return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ (x >>> 6)
}

function Gamma1l (x, xl) {
  return (x >>> 19 | xl << 13) ^ (xl >>> 29 | x << 3) ^ (x >>> 6 | xl << 26)
}

function getCarry (a, b) {
  return (a >>> 0) < (b >>> 0) ? 1 : 0
}

Sha512.prototype._update = function (M) {
  var W = this._w

  var ah = this._ah | 0
  var bh = this._bh | 0
  var ch = this._ch | 0
  var dh = this._dh | 0
  var eh = this._eh | 0
  var fh = this._fh | 0
  var gh = this._gh | 0
  var hh = this._hh | 0

  var al = this._al | 0
  var bl = this._bl | 0
  var cl = this._cl | 0
  var dl = this._dl | 0
  var el = this._el | 0
  var fl = this._fl | 0
  var gl = this._gl | 0
  var hl = this._hl | 0

  for (var i = 0; i < 32; i += 2) {
    W[i] = M.readInt32BE(i * 4)
    W[i + 1] = M.readInt32BE(i * 4 + 4)
  }
  for (; i < 160; i += 2) {
    var xh = W[i - 15 * 2]
    var xl = W[i - 15 * 2 + 1]
    var gamma0 = Gamma0(xh, xl)
    var gamma0l = Gamma0l(xl, xh)

    xh = W[i - 2 * 2]
    xl = W[i - 2 * 2 + 1]
    var gamma1 = Gamma1(xh, xl)
    var gamma1l = Gamma1l(xl, xh)

    // W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16]
    var Wi7h = W[i - 7 * 2]
    var Wi7l = W[i - 7 * 2 + 1]

    var Wi16h = W[i - 16 * 2]
    var Wi16l = W[i - 16 * 2 + 1]

    var Wil = (gamma0l + Wi7l) | 0
    var Wih = (gamma0 + Wi7h + getCarry(Wil, gamma0l)) | 0
    Wil = (Wil + gamma1l) | 0
    Wih = (Wih + gamma1 + getCarry(Wil, gamma1l)) | 0
    Wil = (Wil + Wi16l) | 0
    Wih = (Wih + Wi16h + getCarry(Wil, Wi16l)) | 0

    W[i] = Wih
    W[i + 1] = Wil
  }

  for (var j = 0; j < 160; j += 2) {
    Wih = W[j]
    Wil = W[j + 1]

    var majh = maj(ah, bh, ch)
    var majl = maj(al, bl, cl)

    var sigma0h = sigma0(ah, al)
    var sigma0l = sigma0(al, ah)
    var sigma1h = sigma1(eh, el)
    var sigma1l = sigma1(el, eh)

    // t1 = h + sigma1 + ch + K[j] + W[j]
    var Kih = K[j]
    var Kil = K[j + 1]

    var chh = Ch(eh, fh, gh)
    var chl = Ch(el, fl, gl)

    var t1l = (hl + sigma1l) | 0
    var t1h = (hh + sigma1h + getCarry(t1l, hl)) | 0
    t1l = (t1l + chl) | 0
    t1h = (t1h + chh + getCarry(t1l, chl)) | 0
    t1l = (t1l + Kil) | 0
    t1h = (t1h + Kih + getCarry(t1l, Kil)) | 0
    t1l = (t1l + Wil) | 0
    t1h = (t1h + Wih + getCarry(t1l, Wil)) | 0

    // t2 = sigma0 + maj
    var t2l = (sigma0l + majl) | 0
    var t2h = (sigma0h + majh + getCarry(t2l, sigma0l)) | 0

    hh = gh
    hl = gl
    gh = fh
    gl = fl
    fh = eh
    fl = el
    el = (dl + t1l) | 0
    eh = (dh + t1h + getCarry(el, dl)) | 0
    dh = ch
    dl = cl
    ch = bh
    cl = bl
    bh = ah
    bl = al
    al = (t1l + t2l) | 0
    ah = (t1h + t2h + getCarry(al, t1l)) | 0
  }

  this._al = (this._al + al) | 0
  this._bl = (this._bl + bl) | 0
  this._cl = (this._cl + cl) | 0
  this._dl = (this._dl + dl) | 0
  this._el = (this._el + el) | 0
  this._fl = (this._fl + fl) | 0
  this._gl = (this._gl + gl) | 0
  this._hl = (this._hl + hl) | 0

  this._ah = (this._ah + ah + getCarry(this._al, al)) | 0
  this._bh = (this._bh + bh + getCarry(this._bl, bl)) | 0
  this._ch = (this._ch + ch + getCarry(this._cl, cl)) | 0
  this._dh = (this._dh + dh + getCarry(this._dl, dl)) | 0
  this._eh = (this._eh + eh + getCarry(this._el, el)) | 0
  this._fh = (this._fh + fh + getCarry(this._fl, fl)) | 0
  this._gh = (this._gh + gh + getCarry(this._gl, gl)) | 0
  this._hh = (this._hh + hh + getCarry(this._hl, hl)) | 0
}

Sha512.prototype._hash = function () {
  var H = new Buffer(64)

  function writeInt64BE (h, l, offset) {
    H.writeInt32BE(h, offset)
    H.writeInt32BE(l, offset + 4)
  }

  writeInt64BE(this._ah, this._al, 0)
  writeInt64BE(this._bh, this._bl, 8)
  writeInt64BE(this._ch, this._cl, 16)
  writeInt64BE(this._dh, this._dl, 24)
  writeInt64BE(this._eh, this._el, 32)
  writeInt64BE(this._fh, this._fl, 40)
  writeInt64BE(this._gh, this._gl, 48)
  writeInt64BE(this._hh, this._hl, 56)

  return H
}

module.exports = Sha512

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 1949:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var inherits = __webpack_require__(485)
var Legacy = __webpack_require__(2066)
var Base = __webpack_require__(625)
var Buffer = __webpack_require__(592).Buffer
var md5 = __webpack_require__(777)
var RIPEMD160 = __webpack_require__(979)

var sha = __webpack_require__(985)

var ZEROS = Buffer.alloc(128)

function Hmac (alg, key) {
  Base.call(this, 'digest')
  if (typeof key === 'string') {
    key = Buffer.from(key)
  }

  var blocksize = (alg === 'sha512' || alg === 'sha384') ? 128 : 64

  this._alg = alg
  this._key = key
  if (key.length > blocksize) {
    var hash = alg === 'rmd160' ? new RIPEMD160() : sha(alg)
    key = hash.update(key).digest()
  } else if (key.length < blocksize) {
    key = Buffer.concat([key, ZEROS], blocksize)
  }

  var ipad = this._ipad = Buffer.allocUnsafe(blocksize)
  var opad = this._opad = Buffer.allocUnsafe(blocksize)

  for (var i = 0; i < blocksize; i++) {
    ipad[i] = key[i] ^ 0x36
    opad[i] = key[i] ^ 0x5C
  }
  this._hash = alg === 'rmd160' ? new RIPEMD160() : sha(alg)
  this._hash.update(ipad)
}

inherits(Hmac, Base)

Hmac.prototype._update = function (data) {
  this._hash.update(data)
}

Hmac.prototype._final = function () {
  var h = this._hash.digest()
  var hash = this._alg === 'rmd160' ? new RIPEMD160() : sha(this._alg)
  return hash.update(this._opad).update(h).digest()
}

module.exports = function createHmac (alg, key) {
  alg = alg.toLowerCase()
  if (alg === 'rmd160' || alg === 'ripemd160') {
    return new Hmac('rmd160', key)
  }
  if (alg === 'md5') {
    return new Legacy(md5, key)
  }
  return new Hmac(alg, key)
}


/***/ }),

/***/ 1950:
/***/ (function(module, exports) {

module.exports = {"sha224WithRSAEncryption":{"sign":"rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"RSA-SHA224":{"sign":"ecdsa/rsa","hash":"sha224","id":"302d300d06096086480165030402040500041c"},"sha256WithRSAEncryption":{"sign":"rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"RSA-SHA256":{"sign":"ecdsa/rsa","hash":"sha256","id":"3031300d060960864801650304020105000420"},"sha384WithRSAEncryption":{"sign":"rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"RSA-SHA384":{"sign":"ecdsa/rsa","hash":"sha384","id":"3041300d060960864801650304020205000430"},"sha512WithRSAEncryption":{"sign":"rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA512":{"sign":"ecdsa/rsa","hash":"sha512","id":"3051300d060960864801650304020305000440"},"RSA-SHA1":{"sign":"rsa","hash":"sha1","id":"3021300906052b0e03021a05000414"},"ecdsa-with-SHA1":{"sign":"ecdsa","hash":"sha1","id":""},"sha256":{"sign":"ecdsa","hash":"sha256","id":""},"sha224":{"sign":"ecdsa","hash":"sha224","id":""},"sha384":{"sign":"ecdsa","hash":"sha384","id":""},"sha512":{"sign":"ecdsa","hash":"sha512","id":""},"DSA-SHA":{"sign":"dsa","hash":"sha1","id":""},"DSA-SHA1":{"sign":"dsa","hash":"sha1","id":""},"DSA":{"sign":"dsa","hash":"sha1","id":""},"DSA-WITH-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-SHA224":{"sign":"dsa","hash":"sha224","id":""},"DSA-WITH-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-SHA256":{"sign":"dsa","hash":"sha256","id":""},"DSA-WITH-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-SHA384":{"sign":"dsa","hash":"sha384","id":""},"DSA-WITH-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-SHA512":{"sign":"dsa","hash":"sha512","id":""},"DSA-RIPEMD160":{"sign":"dsa","hash":"rmd160","id":""},"ripemd160WithRSA":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"RSA-RIPEMD160":{"sign":"rsa","hash":"rmd160","id":"3021300906052b2403020105000414"},"md5WithRSAEncryption":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"},"RSA-MD5":{"sign":"rsa","hash":"md5","id":"3020300c06082a864886f70d020505000410"}}

/***/ }),

/***/ 1951:
/***/ (function(module, exports, __webpack_require__) {


exports.pbkdf2 = __webpack_require__(2068)

exports.pbkdf2Sync = __webpack_require__(1954)


/***/ }),

/***/ 1952:
/***/ (function(module, exports) {

var MAX_ALLOC = Math.pow(2, 30) - 1 // default in iojs
module.exports = function (iterations, keylen) {
  if (typeof iterations !== 'number') {
    throw new TypeError('Iterations not a number')
  }

  if (iterations < 0) {
    throw new TypeError('Bad iterations')
  }

  if (typeof keylen !== 'number') {
    throw new TypeError('Key length not a number')
  }

  if (keylen < 0 || keylen > MAX_ALLOC || keylen !== keylen) { /* eslint no-self-compare: 0 */
    throw new TypeError('Bad key length')
  }
}


/***/ }),

/***/ 1953:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var defaultEncoding
/* istanbul ignore next */
if (process.browser) {
  defaultEncoding = 'utf-8'
} else {
  var pVersionMajor = parseInt(process.version.split('.')[0].slice(1), 10)

  defaultEncoding = pVersionMajor >= 6 ? 'utf-8' : 'binary'
}
module.exports = defaultEncoding

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(169)))

/***/ }),

/***/ 1954:
/***/ (function(module, exports, __webpack_require__) {

var md5 = __webpack_require__(777)
var rmd160 = __webpack_require__(979)
var sha = __webpack_require__(985)

var checkParameters = __webpack_require__(1952)
var defaultEncoding = __webpack_require__(1953)
var Buffer = __webpack_require__(592).Buffer
var ZEROS = Buffer.alloc(128)
var sizes = {
  md5: 16,
  sha1: 20,
  sha224: 28,
  sha256: 32,
  sha384: 48,
  sha512: 64,
  rmd160: 20,
  ripemd160: 20
}
function Hmac (alg, key, saltLen) {
  var hash = getDigest(alg)
  var blocksize = (alg === 'sha512' || alg === 'sha384') ? 128 : 64

  if (key.length > blocksize) {
    key = hash(key)
  } else if (key.length < blocksize) {
    key = Buffer.concat([key, ZEROS], blocksize)
  }

  var ipad = Buffer.allocUnsafe(blocksize + sizes[alg])
  var opad = Buffer.allocUnsafe(blocksize + sizes[alg])
  for (var i = 0; i < blocksize; i++) {
    ipad[i] = key[i] ^ 0x36
    opad[i] = key[i] ^ 0x5C
  }

  var ipad1 = Buffer.allocUnsafe(blocksize + saltLen + 4)
  ipad.copy(ipad1, 0, 0, blocksize)
  this.ipad1 = ipad1
  this.ipad2 = ipad
  this.opad = opad
  this.alg = alg
  this.blocksize = blocksize
  this.hash = hash
  this.size = sizes[alg]
}

Hmac.prototype.run = function (data, ipad) {
  data.copy(ipad, this.blocksize)
  var h = this.hash(ipad)
  h.copy(this.opad, this.blocksize)
  return this.hash(this.opad)
}

function getDigest (alg) {
  if (alg === 'rmd160' || alg === 'ripemd160') return rmd160
  if (alg === 'md5') return md5
  return shaFunc

  function shaFunc (data) {
    return sha(alg).update(data).digest()
  }
}

module.exports = function (password, salt, iterations, keylen, digest) {
  if (!Buffer.isBuffer(password)) password = Buffer.from(password, defaultEncoding)
  if (!Buffer.isBuffer(salt)) salt = Buffer.from(salt, defaultEncoding)

  checkParameters(iterations, keylen)

  digest = digest || 'sha1'

  var hmac = new Hmac(digest, password, salt.length)

  var DK = Buffer.allocUnsafe(keylen)
  var block1 = Buffer.allocUnsafe(salt.length + 4)
  salt.copy(block1, 0, 0, salt.length)

  var U, j, destPos, len

  var hLen = hmac.size
  var T = Buffer.allocUnsafe(hLen)
  var l = Math.ceil(keylen / hLen)
  var r = keylen - (l - 1) * hLen

  for (var i = 1; i <= l; i++) {
    block1.writeUInt32BE(i, salt.length)
    U = hmac.run(block1, hmac.ipad1)

    U.copy(T, 0, 0, hLen)

    for (j = 1; j < iterations; j++) {
      U = hmac.run(U, hmac.ipad2)
      for (var k = 0; k < hLen; k++) T[k] ^= U[k]
    }

    destPos = (i - 1) * hLen
    len = (i === l ? r : hLen)
    T.copy(DK, destPos, 0, len)
  }

  return DK
}


/***/ }),

/***/ 1955:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var aes = __webpack_require__(780)
var Transform = __webpack_require__(625)
var inherits = __webpack_require__(485)

inherits(StreamCipher, Transform)
module.exports = StreamCipher
function StreamCipher (mode, key, iv, decrypt) {
  if (!(this instanceof StreamCipher)) {
    return new StreamCipher(mode, key, iv)
  }
  Transform.call(this)
  this._cipher = new aes.AES(key)
  this._prev = new Buffer(iv.length)
  this._cache = new Buffer('')
  this._secCache = new Buffer('')
  this._decrypt = decrypt
  iv.copy(this._prev)
  this._mode = mode
}
StreamCipher.prototype._update = function (chunk) {
  return this._mode.encrypt(this, chunk, this._decrypt)
}
StreamCipher.prototype._final = function () {
  this._cipher.scrub()
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 1956:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var aes = __webpack_require__(780)
var Transform = __webpack_require__(625)
var inherits = __webpack_require__(485)
var GHASH = __webpack_require__(2071)
var xor = __webpack_require__(751)
inherits(StreamCipher, Transform)
module.exports = StreamCipher

function StreamCipher (mode, key, iv, decrypt) {
  if (!(this instanceof StreamCipher)) {
    return new StreamCipher(mode, key, iv)
  }
  Transform.call(this)
  this._finID = Buffer.concat([iv, new Buffer([0, 0, 0, 1])])
  iv = Buffer.concat([iv, new Buffer([0, 0, 0, 2])])
  this._cipher = new aes.AES(key)
  this._prev = new Buffer(iv.length)
  this._cache = new Buffer('')
  this._secCache = new Buffer('')
  this._decrypt = decrypt
  this._alen = 0
  this._len = 0
  iv.copy(this._prev)
  this._mode = mode
  var h = new Buffer(4)
  h.fill(0)
  this._ghash = new GHASH(this._cipher.encryptBlock(h))
  this._authTag = null
  this._called = false
}
StreamCipher.prototype._update = function (chunk) {
  if (!this._called && this._alen) {
    var rump = 16 - (this._alen % 16)
    if (rump < 16) {
      rump = new Buffer(rump)
      rump.fill(0)
      this._ghash.update(rump)
    }
  }
  this._called = true
  var out = this._mode.encrypt(this, chunk)
  if (this._decrypt) {
    this._ghash.update(chunk)
  } else {
    this._ghash.update(out)
  }
  this._len += chunk.length
  return out
}
StreamCipher.prototype._final = function () {
  if (this._decrypt && !this._authTag) {
    throw new Error('Unsupported state or unable to authenticate data')
  }
  var tag = xor(this._ghash.final(this._alen * 8, this._len * 8), this._cipher.encryptBlock(this._finID))
  if (this._decrypt) {
    if (xorTest(tag, this._authTag)) {
      throw new Error('Unsupported state or unable to authenticate data')
    }
  } else {
    this._authTag = tag
  }
  this._cipher.scrub()
}
StreamCipher.prototype.getAuthTag = function getAuthTag () {
  if (!this._decrypt && Buffer.isBuffer(this._authTag)) {
    return this._authTag
  } else {
    throw new Error('Attempting to get auth tag in unsupported state')
  }
}
StreamCipher.prototype.setAuthTag = function setAuthTag (tag) {
  if (this._decrypt) {
    this._authTag = tag
  } else {
    throw new Error('Attempting to set auth tag in unsupported state')
  }
}
StreamCipher.prototype.setAAD = function setAAD (buf) {
  if (!this._called) {
    this._ghash.update(buf)
    this._alen += buf.length
  } else {
    throw new Error('Attempting to set AAD in unsupported state')
  }
}
function xorTest (a, b) {
  var out = 0
  if (a.length !== b.length) {
    out++
  }
  var len = Math.min(a.length, b.length)
  var i = -1
  while (++i < len) {
    out += (a[i] ^ b[i])
  }
  return out
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 1957:
/***/ (function(module, exports) {

exports.encrypt = function (self, block) {
  return self._cipher.encryptBlock(block)
}
exports.decrypt = function (self, block) {
  return self._cipher.decryptBlock(block)
}


/***/ }),

/***/ 1958:
/***/ (function(module, exports, __webpack_require__) {

var xor = __webpack_require__(751)

exports.encrypt = function (self, block) {
  var data = xor(block, self._prev)

  self._prev = self._cipher.encryptBlock(data)
  return self._prev
}

exports.decrypt = function (self, block) {
  var pad = self._prev

  self._prev = block
  var out = self._cipher.decryptBlock(block)

  return xor(out, pad)
}


/***/ }),

/***/ 1959:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var xor = __webpack_require__(751)

exports.encrypt = function (self, data, decrypt) {
  var out = new Buffer('')
  var len

  while (data.length) {
    if (self._cache.length === 0) {
      self._cache = self._cipher.encryptBlock(self._prev)
      self._prev = new Buffer('')
    }

    if (self._cache.length <= data.length) {
      len = self._cache.length
      out = Buffer.concat([out, encryptStart(self, data.slice(0, len), decrypt)])
      data = data.slice(len)
    } else {
      out = Buffer.concat([out, encryptStart(self, data, decrypt)])
      break
    }
  }

  return out
}
function encryptStart (self, data, decrypt) {
  var len = data.length
  var out = xor(data, self._cache)
  self._cache = self._cache.slice(len)
  self._prev = Buffer.concat([self._prev, decrypt ? data : out])
  return out
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 1960:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {function encryptByte (self, byteParam, decrypt) {
  var pad = self._cipher.encryptBlock(self._prev)
  var out = pad[0] ^ byteParam
  self._prev = Buffer.concat([self._prev.slice(1), new Buffer([decrypt ? byteParam : out])])
  return out
}
exports.encrypt = function (self, chunk, decrypt) {
  var len = chunk.length
  var out = new Buffer(len)
  var i = -1
  while (++i < len) {
    out[i] = encryptByte(self, chunk[i], decrypt)
  }
  return out
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 1961:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {function encryptByte (self, byteParam, decrypt) {
  var pad
  var i = -1
  var len = 8
  var out = 0
  var bit, value
  while (++i < len) {
    pad = self._cipher.encryptBlock(self._prev)
    bit = (byteParam & (1 << (7 - i))) ? 0x80 : 0
    value = pad[0] ^ bit
    out += ((value & 0x80) >> (i % 8))
    self._prev = shiftIn(self._prev, decrypt ? bit : value)
  }
  return out
}
exports.encrypt = function (self, chunk, decrypt) {
  var len = chunk.length
  var out = new Buffer(len)
  var i = -1
  while (++i < len) {
    out[i] = encryptByte(self, chunk[i], decrypt)
  }
  return out
}
function shiftIn (buffer, value) {
  var len = buffer.length
  var i = -1
  var out = new Buffer(buffer.length)
  buffer = Buffer.concat([buffer, new Buffer([value])])
  while (++i < len) {
    out[i] = buffer[i] << 1 | buffer[i + 1] >> (7)
  }
  return out
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 1962:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var xor = __webpack_require__(751)

function getBlock (self) {
  self._prev = self._cipher.encryptBlock(self._prev)
  return self._prev
}

exports.encrypt = function (self, chunk) {
  while (self._cache.length < chunk.length) {
    self._cache = Buffer.concat([self._cache, getBlock(self)])
  }

  var pad = self._cache.slice(0, chunk.length)
  self._cache = self._cache.slice(chunk.length)
  return xor(chunk, pad)
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 1963:
/***/ (function(module, exports, __webpack_require__) {

var randomBytes = __webpack_require__(748);
module.exports = findPrime;
findPrime.simpleSieve = simpleSieve;
findPrime.fermatTest = fermatTest;
var BN = __webpack_require__(514);
var TWENTYFOUR = new BN(24);
var MillerRabin = __webpack_require__(1964);
var millerRabin = new MillerRabin();
var ONE = new BN(1);
var TWO = new BN(2);
var FIVE = new BN(5);
var SIXTEEN = new BN(16);
var EIGHT = new BN(8);
var TEN = new BN(10);
var THREE = new BN(3);
var SEVEN = new BN(7);
var ELEVEN = new BN(11);
var FOUR = new BN(4);
var TWELVE = new BN(12);
var primes = null;

function _getPrimes() {
  if (primes !== null)
    return primes;

  var limit = 0x100000;
  var res = [];
  res[0] = 2;
  for (var i = 1, k = 3; k < limit; k += 2) {
    var sqrt = Math.ceil(Math.sqrt(k));
    for (var j = 0; j < i && res[j] <= sqrt; j++)
      if (k % res[j] === 0)
        break;

    if (i !== j && res[j] <= sqrt)
      continue;

    res[i++] = k;
  }
  primes = res;
  return res;
}

function simpleSieve(p) {
  var primes = _getPrimes();

  for (var i = 0; i < primes.length; i++)
    if (p.modn(primes[i]) === 0) {
      if (p.cmpn(primes[i]) === 0) {
        return true;
      } else {
        return false;
      }
    }

  return true;
}

function fermatTest(p) {
  var red = BN.mont(p);
  return TWO.toRed(red).redPow(p.subn(1)).fromRed().cmpn(1) === 0;
}

function findPrime(bits, gen) {
  if (bits < 16) {
    // this is what openssl does
    if (gen === 2 || gen === 5) {
      return new BN([0x8c, 0x7b]);
    } else {
      return new BN([0x8c, 0x27]);
    }
  }
  gen = new BN(gen);

  var num, n2;

  while (true) {
    num = new BN(randomBytes(Math.ceil(bits / 8)));
    while (num.bitLength() > bits) {
      num.ishrn(1);
    }
    if (num.isEven()) {
      num.iadd(ONE);
    }
    if (!num.testn(1)) {
      num.iadd(TWO);
    }
    if (!gen.cmp(TWO)) {
      while (num.mod(TWENTYFOUR).cmp(ELEVEN)) {
        num.iadd(FOUR);
      }
    } else if (!gen.cmp(FIVE)) {
      while (num.mod(TEN).cmp(THREE)) {
        num.iadd(FOUR);
      }
    }
    n2 = num.shrn(1);
    if (simpleSieve(n2) && simpleSieve(num) &&
      fermatTest(n2) && fermatTest(num) &&
      millerRabin.test(n2) && millerRabin.test(num)) {
      return num;
    }
  }

}


/***/ }),

/***/ 1964:
/***/ (function(module, exports, __webpack_require__) {

var bn = __webpack_require__(514);
var brorand = __webpack_require__(1965);

function MillerRabin(rand) {
  this.rand = rand || new brorand.Rand();
}
module.exports = MillerRabin;

MillerRabin.create = function create(rand) {
  return new MillerRabin(rand);
};

MillerRabin.prototype._rand = function _rand(n) {
  var len = n.bitLength();
  var buf = this.rand.generate(Math.ceil(len / 8));

  // Set low bits
  buf[0] |= 3;

  // Mask high bits
  var mask = len & 0x7;
  if (mask !== 0)
    buf[buf.length - 1] >>= 7 - mask;

  return new bn(buf);
}

MillerRabin.prototype.test = function test(n, k, cb) {
  var len = n.bitLength();
  var red = bn.mont(n);
  var rone = new bn(1).toRed(red);

  if (!k)
    k = Math.max(1, (len / 48) | 0);

  // Find d and s, (n - 1) = (2 ^ s) * d;
  var n1 = n.subn(1);
  var n2 = n1.subn(1);
  for (var s = 0; !n1.testn(s); s++) {}
  var d = n.shrn(s);

  var rn1 = n1.toRed(red);

  var prime = true;
  for (; k > 0; k--) {
    var a = this._rand(n2);
    if (cb)
      cb(a);

    var x = a.toRed(red).redPow(d);
    if (x.cmp(rone) === 0 || x.cmp(rn1) === 0)
      continue;

    for (var i = 1; i < s; i++) {
      x = x.redSqr();

      if (x.cmp(rone) === 0)
        return false;
      if (x.cmp(rn1) === 0)
        break;
    }

    if (i === s)
      return false;
  }

  return prime;
};

MillerRabin.prototype.getDivisor = function getDivisor(n, k) {
  var len = n.bitLength();
  var red = bn.mont(n);
  var rone = new bn(1).toRed(red);

  if (!k)
    k = Math.max(1, (len / 48) | 0);

  // Find d and s, (n - 1) = (2 ^ s) * d;
  var n1 = n.subn(1);
  var n2 = n1.subn(1);
  for (var s = 0; !n1.testn(s); s++) {}
  var d = n.shrn(s);

  var rn1 = n1.toRed(red);

  for (; k > 0; k--) {
    var a = this._rand(n2);

    var g = n.gcd(a);
    if (g.cmpn(1) !== 0)
      return g;

    var x = a.toRed(red).redPow(d);
    if (x.cmp(rone) === 0 || x.cmp(rn1) === 0)
      continue;

    for (var i = 1; i < s; i++) {
      x = x.redSqr();

      if (x.cmp(rone) === 0)
        return x.fromRed().subn(1).gcd(n);
      if (x.cmp(rn1) === 0)
        break;
    }

    if (i === s) {
      x = x.redSqr();
      return x.fromRed().subn(1).gcd(n);
    }
  }

  return false;
};


/***/ }),

/***/ 1965:
/***/ (function(module, exports, __webpack_require__) {

var r;

module.exports = function rand(len) {
  if (!r)
    r = new Rand(null);

  return r.generate(len);
};

function Rand(rand) {
  this.rand = rand;
}
module.exports.Rand = Rand;

Rand.prototype.generate = function generate(len) {
  return this._rand(len);
};

// Emulate crypto API using randy
Rand.prototype._rand = function _rand(n) {
  if (this.rand.getBytes)
    return this.rand.getBytes(n);

  var res = new Uint8Array(n);
  for (var i = 0; i < res.length; i++)
    res[i] = this.rand.getByte();
  return res;
};

if (typeof self === 'object') {
  if (self.crypto && self.crypto.getRandomValues) {
    // Modern browsers
    Rand.prototype._rand = function _rand(n) {
      var arr = new Uint8Array(n);
      self.crypto.getRandomValues(arr);
      return arr;
    };
  } else if (self.msCrypto && self.msCrypto.getRandomValues) {
    // IE
    Rand.prototype._rand = function _rand(n) {
      var arr = new Uint8Array(n);
      self.msCrypto.getRandomValues(arr);
      return arr;
    };

  // Safari's WebWorkers do not have `crypto`
  } else if (typeof window === 'object') {
    // Old junk
    Rand.prototype._rand = function() {
      throw new Error('Not implemented yet');
    };
  }
} else {
  // Node.js or Web worker with no crypto support
  try {
    var crypto = __webpack_require__(2081);
    if (typeof crypto.randomBytes !== 'function')
      throw new Error('Not supported');

    Rand.prototype._rand = function _rand(n) {
      return crypto.randomBytes(n);
    };
  } catch (e) {
  }
}


/***/ }),

/***/ 1966:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = exports;

function toArray(msg, enc) {
  if (Array.isArray(msg))
    return msg.slice();
  if (!msg)
    return [];
  var res = [];
  if (typeof msg !== 'string') {
    for (var i = 0; i < msg.length; i++)
      res[i] = msg[i] | 0;
    return res;
  }
  if (enc === 'hex') {
    msg = msg.replace(/[^a-z0-9]+/ig, '');
    if (msg.length % 2 !== 0)
      msg = '0' + msg;
    for (var i = 0; i < msg.length; i += 2)
      res.push(parseInt(msg[i] + msg[i + 1], 16));
  } else {
    for (var i = 0; i < msg.length; i++) {
      var c = msg.charCodeAt(i);
      var hi = c >> 8;
      var lo = c & 0xff;
      if (hi)
        res.push(hi, lo);
      else
        res.push(lo);
    }
  }
  return res;
}
utils.toArray = toArray;

function zero2(word) {
  if (word.length === 1)
    return '0' + word;
  else
    return word;
}
utils.zero2 = zero2;

function toHex(msg) {
  var res = '';
  for (var i = 0; i < msg.length; i++)
    res += zero2(msg[i].toString(16));
  return res;
}
utils.toHex = toHex;

utils.encode = function encode(arr, enc) {
  if (enc === 'hex')
    return toHex(arr);
  else
    return arr;
};


/***/ }),

/***/ 1967:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(588);
var rotr32 = utils.rotr32;

function ft_1(s, x, y, z) {
  if (s === 0)
    return ch32(x, y, z);
  if (s === 1 || s === 3)
    return p32(x, y, z);
  if (s === 2)
    return maj32(x, y, z);
}
exports.ft_1 = ft_1;

function ch32(x, y, z) {
  return (x & y) ^ ((~x) & z);
}
exports.ch32 = ch32;

function maj32(x, y, z) {
  return (x & y) ^ (x & z) ^ (y & z);
}
exports.maj32 = maj32;

function p32(x, y, z) {
  return x ^ y ^ z;
}
exports.p32 = p32;

function s0_256(x) {
  return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
}
exports.s0_256 = s0_256;

function s1_256(x) {
  return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
}
exports.s1_256 = s1_256;

function g0_256(x) {
  return rotr32(x, 7) ^ rotr32(x, 18) ^ (x >>> 3);
}
exports.g0_256 = g0_256;

function g1_256(x) {
  return rotr32(x, 17) ^ rotr32(x, 19) ^ (x >>> 10);
}
exports.g1_256 = g1_256;


/***/ }),

/***/ 1968:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(588);
var common = __webpack_require__(752);
var shaCommon = __webpack_require__(1967);
var assert = __webpack_require__(563);

var sum32 = utils.sum32;
var sum32_4 = utils.sum32_4;
var sum32_5 = utils.sum32_5;
var ch32 = shaCommon.ch32;
var maj32 = shaCommon.maj32;
var s0_256 = shaCommon.s0_256;
var s1_256 = shaCommon.s1_256;
var g0_256 = shaCommon.g0_256;
var g1_256 = shaCommon.g1_256;

var BlockHash = common.BlockHash;

var sha256_K = [
  0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
  0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
  0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
  0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
  0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
  0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
  0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
  0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
  0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
  0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
  0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
  0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
  0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
  0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
  0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
  0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
];

function SHA256() {
  if (!(this instanceof SHA256))
    return new SHA256();

  BlockHash.call(this);
  this.h = [
    0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,
    0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
  ];
  this.k = sha256_K;
  this.W = new Array(64);
}
utils.inherits(SHA256, BlockHash);
module.exports = SHA256;

SHA256.blockSize = 512;
SHA256.outSize = 256;
SHA256.hmacStrength = 192;
SHA256.padLength = 64;

SHA256.prototype._update = function _update(msg, start) {
  var W = this.W;

  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i++)
    W[i] = sum32_4(g1_256(W[i - 2]), W[i - 7], g0_256(W[i - 15]), W[i - 16]);

  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];
  var f = this.h[5];
  var g = this.h[6];
  var h = this.h[7];

  assert(this.k.length === W.length);
  for (i = 0; i < W.length; i++) {
    var T1 = sum32_5(h, s1_256(e), ch32(e, f, g), this.k[i], W[i]);
    var T2 = sum32(s0_256(a), maj32(a, b, c));
    h = g;
    g = f;
    f = e;
    e = sum32(d, T1);
    d = c;
    c = b;
    b = a;
    a = sum32(T1, T2);
  }

  this.h[0] = sum32(this.h[0], a);
  this.h[1] = sum32(this.h[1], b);
  this.h[2] = sum32(this.h[2], c);
  this.h[3] = sum32(this.h[3], d);
  this.h[4] = sum32(this.h[4], e);
  this.h[5] = sum32(this.h[5], f);
  this.h[6] = sum32(this.h[6], g);
  this.h[7] = sum32(this.h[7], h);
};

SHA256.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'big');
  else
    return utils.split32(this.h, 'big');
};


/***/ }),

/***/ 1969:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(588);
var common = __webpack_require__(752);
var assert = __webpack_require__(563);

var rotr64_hi = utils.rotr64_hi;
var rotr64_lo = utils.rotr64_lo;
var shr64_hi = utils.shr64_hi;
var shr64_lo = utils.shr64_lo;
var sum64 = utils.sum64;
var sum64_hi = utils.sum64_hi;
var sum64_lo = utils.sum64_lo;
var sum64_4_hi = utils.sum64_4_hi;
var sum64_4_lo = utils.sum64_4_lo;
var sum64_5_hi = utils.sum64_5_hi;
var sum64_5_lo = utils.sum64_5_lo;

var BlockHash = common.BlockHash;

var sha512_K = [
  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
];

function SHA512() {
  if (!(this instanceof SHA512))
    return new SHA512();

  BlockHash.call(this);
  this.h = [
    0x6a09e667, 0xf3bcc908,
    0xbb67ae85, 0x84caa73b,
    0x3c6ef372, 0xfe94f82b,
    0xa54ff53a, 0x5f1d36f1,
    0x510e527f, 0xade682d1,
    0x9b05688c, 0x2b3e6c1f,
    0x1f83d9ab, 0xfb41bd6b,
    0x5be0cd19, 0x137e2179 ];
  this.k = sha512_K;
  this.W = new Array(160);
}
utils.inherits(SHA512, BlockHash);
module.exports = SHA512;

SHA512.blockSize = 1024;
SHA512.outSize = 512;
SHA512.hmacStrength = 192;
SHA512.padLength = 128;

SHA512.prototype._prepareBlock = function _prepareBlock(msg, start) {
  var W = this.W;

  // 32 x 32bit words
  for (var i = 0; i < 32; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i += 2) {
    var c0_hi = g1_512_hi(W[i - 4], W[i - 3]);  // i - 2
    var c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
    var c1_hi = W[i - 14];  // i - 7
    var c1_lo = W[i - 13];
    var c2_hi = g0_512_hi(W[i - 30], W[i - 29]);  // i - 15
    var c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
    var c3_hi = W[i - 32];  // i - 16
    var c3_lo = W[i - 31];

    W[i] = sum64_4_hi(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo);
    W[i + 1] = sum64_4_lo(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo);
  }
};

SHA512.prototype._update = function _update(msg, start) {
  this._prepareBlock(msg, start);

  var W = this.W;

  var ah = this.h[0];
  var al = this.h[1];
  var bh = this.h[2];
  var bl = this.h[3];
  var ch = this.h[4];
  var cl = this.h[5];
  var dh = this.h[6];
  var dl = this.h[7];
  var eh = this.h[8];
  var el = this.h[9];
  var fh = this.h[10];
  var fl = this.h[11];
  var gh = this.h[12];
  var gl = this.h[13];
  var hh = this.h[14];
  var hl = this.h[15];

  assert(this.k.length === W.length);
  for (var i = 0; i < W.length; i += 2) {
    var c0_hi = hh;
    var c0_lo = hl;
    var c1_hi = s1_512_hi(eh, el);
    var c1_lo = s1_512_lo(eh, el);
    var c2_hi = ch64_hi(eh, el, fh, fl, gh, gl);
    var c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
    var c3_hi = this.k[i];
    var c3_lo = this.k[i + 1];
    var c4_hi = W[i];
    var c4_lo = W[i + 1];

    var T1_hi = sum64_5_hi(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo,
      c4_hi, c4_lo);
    var T1_lo = sum64_5_lo(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo,
      c4_hi, c4_lo);

    c0_hi = s0_512_hi(ah, al);
    c0_lo = s0_512_lo(ah, al);
    c1_hi = maj64_hi(ah, al, bh, bl, ch, cl);
    c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);

    var T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
    var T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);

    hh = gh;
    hl = gl;

    gh = fh;
    gl = fl;

    fh = eh;
    fl = el;

    eh = sum64_hi(dh, dl, T1_hi, T1_lo);
    el = sum64_lo(dl, dl, T1_hi, T1_lo);

    dh = ch;
    dl = cl;

    ch = bh;
    cl = bl;

    bh = ah;
    bl = al;

    ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
    al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
  }

  sum64(this.h, 0, ah, al);
  sum64(this.h, 2, bh, bl);
  sum64(this.h, 4, ch, cl);
  sum64(this.h, 6, dh, dl);
  sum64(this.h, 8, eh, el);
  sum64(this.h, 10, fh, fl);
  sum64(this.h, 12, gh, gl);
  sum64(this.h, 14, hh, hl);
};

SHA512.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'big');
  else
    return utils.split32(this.h, 'big');
};

function ch64_hi(xh, xl, yh, yl, zh) {
  var r = (xh & yh) ^ ((~xh) & zh);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function ch64_lo(xh, xl, yh, yl, zh, zl) {
  var r = (xl & yl) ^ ((~xl) & zl);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function maj64_hi(xh, xl, yh, yl, zh) {
  var r = (xh & yh) ^ (xh & zh) ^ (yh & zh);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function maj64_lo(xh, xl, yh, yl, zh, zl) {
  var r = (xl & yl) ^ (xl & zl) ^ (yl & zl);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s0_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 28);
  var c1_hi = rotr64_hi(xl, xh, 2);  // 34
  var c2_hi = rotr64_hi(xl, xh, 7);  // 39

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s0_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 28);
  var c1_lo = rotr64_lo(xl, xh, 2);  // 34
  var c2_lo = rotr64_lo(xl, xh, 7);  // 39

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s1_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 14);
  var c1_hi = rotr64_hi(xh, xl, 18);
  var c2_hi = rotr64_hi(xl, xh, 9);  // 41

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s1_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 14);
  var c1_lo = rotr64_lo(xh, xl, 18);
  var c2_lo = rotr64_lo(xl, xh, 9);  // 41

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g0_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 1);
  var c1_hi = rotr64_hi(xh, xl, 8);
  var c2_hi = shr64_hi(xh, xl, 7);

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g0_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 1);
  var c1_lo = rotr64_lo(xh, xl, 8);
  var c2_lo = shr64_lo(xh, xl, 7);

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g1_512_hi(xh, xl) {
  var c0_hi = rotr64_hi(xh, xl, 19);
  var c1_hi = rotr64_hi(xl, xh, 29);  // 61
  var c2_hi = shr64_hi(xh, xl, 6);

  var r = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g1_512_lo(xh, xl) {
  var c0_lo = rotr64_lo(xh, xl, 19);
  var c1_lo = rotr64_lo(xl, xh, 29);  // 61
  var c2_lo = shr64_lo(xh, xl, 6);

  var r = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}


/***/ }),

/***/ 1970:
/***/ (function(module, exports, __webpack_require__) {

var inherits = __webpack_require__(485);
var Reporter = __webpack_require__(754).Reporter;
var Buffer = __webpack_require__(469).Buffer;

function DecoderBuffer(base, options) {
  Reporter.call(this, options);
  if (!Buffer.isBuffer(base)) {
    this.error('Input not Buffer');
    return;
  }

  this.base = base;
  this.offset = 0;
  this.length = base.length;
}
inherits(DecoderBuffer, Reporter);
exports.DecoderBuffer = DecoderBuffer;

DecoderBuffer.prototype.save = function save() {
  return { offset: this.offset, reporter: Reporter.prototype.save.call(this) };
};

DecoderBuffer.prototype.restore = function restore(save) {
  // Return skipped data
  var res = new DecoderBuffer(this.base);
  res.offset = save.offset;
  res.length = this.offset;

  this.offset = save.offset;
  Reporter.prototype.restore.call(this, save.reporter);

  return res;
};

DecoderBuffer.prototype.isEmpty = function isEmpty() {
  return this.offset === this.length;
};

DecoderBuffer.prototype.readUInt8 = function readUInt8(fail) {
  if (this.offset + 1 <= this.length)
    return this.base.readUInt8(this.offset++, true);
  else
    return this.error(fail || 'DecoderBuffer overrun');
}

DecoderBuffer.prototype.skip = function skip(bytes, fail) {
  if (!(this.offset + bytes <= this.length))
    return this.error(fail || 'DecoderBuffer overrun');

  var res = new DecoderBuffer(this.base);

  // Share reporter state
  res._reporterState = this._reporterState;

  res.offset = this.offset;
  res.length = this.offset + bytes;
  this.offset += bytes;
  return res;
}

DecoderBuffer.prototype.raw = function raw(save) {
  return this.base.slice(save ? save.offset : this.offset, this.length);
}

function EncoderBuffer(value, reporter) {
  if (Array.isArray(value)) {
    this.length = 0;
    this.value = value.map(function(item) {
      if (!(item instanceof EncoderBuffer))
        item = new EncoderBuffer(item, reporter);
      this.length += item.length;
      return item;
    }, this);
  } else if (typeof value === 'number') {
    if (!(0 <= value && value <= 0xff))
      return reporter.error('non-byte EncoderBuffer value');
    this.value = value;
    this.length = 1;
  } else if (typeof value === 'string') {
    this.value = value;
    this.length = Buffer.byteLength(value);
  } else if (Buffer.isBuffer(value)) {
    this.value = value;
    this.length = value.length;
  } else {
    return reporter.error('Unsupported type: ' + typeof value);
  }
}
exports.EncoderBuffer = EncoderBuffer;

EncoderBuffer.prototype.join = function join(out, offset) {
  if (!out)
    out = new Buffer(this.length);
  if (!offset)
    offset = 0;

  if (this.length === 0)
    return out;

  if (Array.isArray(this.value)) {
    this.value.forEach(function(item) {
      item.join(out, offset);
      offset += item.length;
    });
  } else {
    if (typeof this.value === 'number')
      out[offset] = this.value;
    else if (typeof this.value === 'string')
      out.write(this.value, offset);
    else if (Buffer.isBuffer(this.value))
      this.value.copy(out, offset);
    offset += this.length;
  }

  return out;
};


/***/ }),

/***/ 1971:
/***/ (function(module, exports, __webpack_require__) {

var constants = exports;

// Helper
constants._reverse = function reverse(map) {
  var res = {};

  Object.keys(map).forEach(function(key) {
    // Convert key to integer if it is stringified
    if ((key | 0) == key)
      key = key | 0;

    var value = map[key];
    res[value] = key;
  });

  return res;
};

constants.der = __webpack_require__(2113);


/***/ }),

/***/ 1972:
/***/ (function(module, exports, __webpack_require__) {

var inherits = __webpack_require__(485);

var asn1 = __webpack_require__(753);
var base = asn1.base;
var bignum = asn1.bignum;

// Import DER constants
var der = asn1.constants.der;

function DERDecoder(entity) {
  this.enc = 'der';
  this.name = entity.name;
  this.entity = entity;

  // Construct base tree
  this.tree = new DERNode();
  this.tree._init(entity.body);
};
module.exports = DERDecoder;

DERDecoder.prototype.decode = function decode(data, options) {
  if (!(data instanceof base.DecoderBuffer))
    data = new base.DecoderBuffer(data, options);

  return this.tree._decode(data, options);
};

// Tree methods

function DERNode(parent) {
  base.Node.call(this, 'der', parent);
}
inherits(DERNode, base.Node);

DERNode.prototype._peekTag = function peekTag(buffer, tag, any) {
  if (buffer.isEmpty())
    return false;

  var state = buffer.save();
  var decodedTag = derDecodeTag(buffer, 'Failed to peek tag: "' + tag + '"');
  if (buffer.isError(decodedTag))
    return decodedTag;

  buffer.restore(state);

  return decodedTag.tag === tag || decodedTag.tagStr === tag ||
    (decodedTag.tagStr + 'of') === tag || any;
};

DERNode.prototype._decodeTag = function decodeTag(buffer, tag, any) {
  var decodedTag = derDecodeTag(buffer,
                                'Failed to decode tag of "' + tag + '"');
  if (buffer.isError(decodedTag))
    return decodedTag;

  var len = derDecodeLen(buffer,
                         decodedTag.primitive,
                         'Failed to get length of "' + tag + '"');

  // Failure
  if (buffer.isError(len))
    return len;

  if (!any &&
      decodedTag.tag !== tag &&
      decodedTag.tagStr !== tag &&
      decodedTag.tagStr + 'of' !== tag) {
    return buffer.error('Failed to match tag: "' + tag + '"');
  }

  if (decodedTag.primitive || len !== null)
    return buffer.skip(len, 'Failed to match body of: "' + tag + '"');

  // Indefinite length... find END tag
  var state = buffer.save();
  var res = this._skipUntilEnd(
      buffer,
      'Failed to skip indefinite length body: "' + this.tag + '"');
  if (buffer.isError(res))
    return res;

  len = buffer.offset - state.offset;
  buffer.restore(state);
  return buffer.skip(len, 'Failed to match body of: "' + tag + '"');
};

DERNode.prototype._skipUntilEnd = function skipUntilEnd(buffer, fail) {
  while (true) {
    var tag = derDecodeTag(buffer, fail);
    if (buffer.isError(tag))
      return tag;
    var len = derDecodeLen(buffer, tag.primitive, fail);
    if (buffer.isError(len))
      return len;

    var res;
    if (tag.primitive || len !== null)
      res = buffer.skip(len)
    else
      res = this._skipUntilEnd(buffer, fail);

    // Failure
    if (buffer.isError(res))
      return res;

    if (tag.tagStr === 'end')
      break;
  }
};

DERNode.prototype._decodeList = function decodeList(buffer, tag, decoder,
                                                    options) {
  var result = [];
  while (!buffer.isEmpty()) {
    var possibleEnd = this._peekTag(buffer, 'end');
    if (buffer.isError(possibleEnd))
      return possibleEnd;

    var res = decoder.decode(buffer, 'der', options);
    if (buffer.isError(res) && possibleEnd)
      break;
    result.push(res);
  }
  return result;
};

DERNode.prototype._decodeStr = function decodeStr(buffer, tag) {
  if (tag === 'bitstr') {
    var unused = buffer.readUInt8();
    if (buffer.isError(unused))
      return unused;
    return { unused: unused, data: buffer.raw() };
  } else if (tag === 'bmpstr') {
    var raw = buffer.raw();
    if (raw.length % 2 === 1)
      return buffer.error('Decoding of string type: bmpstr length mismatch');

    var str = '';
    for (var i = 0; i < raw.length / 2; i++) {
      str += String.fromCharCode(raw.readUInt16BE(i * 2));
    }
    return str;
  } else if (tag === 'numstr') {
    var numstr = buffer.raw().toString('ascii');
    if (!this._isNumstr(numstr)) {
      return buffer.error('Decoding of string type: ' +
                          'numstr unsupported characters');
    }
    return numstr;
  } else if (tag === 'octstr') {
    return buffer.raw();
  } else if (tag === 'objDesc') {
    return buffer.raw();
  } else if (tag === 'printstr') {
    var printstr = buffer.raw().toString('ascii');
    if (!this._isPrintstr(printstr)) {
      return buffer.error('Decoding of string type: ' +
                          'printstr unsupported characters');
    }
    return printstr;
  } else if (/str$/.test(tag)) {
    return buffer.raw().toString();
  } else {
    return buffer.error('Decoding of string type: ' + tag + ' unsupported');
  }
};

DERNode.prototype._decodeObjid = function decodeObjid(buffer, values, relative) {
  var result;
  var identifiers = [];
  var ident = 0;
  while (!buffer.isEmpty()) {
    var subident = buffer.readUInt8();
    ident <<= 7;
    ident |= subident & 0x7f;
    if ((subident & 0x80) === 0) {
      identifiers.push(ident);
      ident = 0;
    }
  }
  if (subident & 0x80)
    identifiers.push(ident);

  var first = (identifiers[0] / 40) | 0;
  var second = identifiers[0] % 40;

  if (relative)
    result = identifiers;
  else
    result = [first, second].concat(identifiers.slice(1));

  if (values) {
    var tmp = values[result.join(' ')];
    if (tmp === undefined)
      tmp = values[result.join('.')];
    if (tmp !== undefined)
      result = tmp;
  }

  return result;
};

DERNode.prototype._decodeTime = function decodeTime(buffer, tag) {
  var str = buffer.raw().toString();
  if (tag === 'gentime') {
    var year = str.slice(0, 4) | 0;
    var mon = str.slice(4, 6) | 0;
    var day = str.slice(6, 8) | 0;
    var hour = str.slice(8, 10) | 0;
    var min = str.slice(10, 12) | 0;
    var sec = str.slice(12, 14) | 0;
  } else if (tag === 'utctime') {
    var year = str.slice(0, 2) | 0;
    var mon = str.slice(2, 4) | 0;
    var day = str.slice(4, 6) | 0;
    var hour = str.slice(6, 8) | 0;
    var min = str.slice(8, 10) | 0;
    var sec = str.slice(10, 12) | 0;
    if (year < 70)
      year = 2000 + year;
    else
      year = 1900 + year;
  } else {
    return buffer.error('Decoding ' + tag + ' time is not supported yet');
  }

  return Date.UTC(year, mon - 1, day, hour, min, sec, 0);
};

DERNode.prototype._decodeNull = function decodeNull(buffer) {
  return null;
};

DERNode.prototype._decodeBool = function decodeBool(buffer) {
  var res = buffer.readUInt8();
  if (buffer.isError(res))
    return res;
  else
    return res !== 0;
};

DERNode.prototype._decodeInt = function decodeInt(buffer, values) {
  // Bigint, return as it is (assume big endian)
  var raw = buffer.raw();
  var res = new bignum(raw);

  if (values)
    res = values[res.toString(10)] || res;

  return res;
};

DERNode.prototype._use = function use(entity, obj) {
  if (typeof entity === 'function')
    entity = entity(obj);
  return entity._getDecoder('der').tree;
};

// Utility methods

function derDecodeTag(buf, fail) {
  var tag = buf.readUInt8(fail);
  if (buf.isError(tag))
    return tag;

  var cls = der.tagClass[tag >> 6];
  var primitive = (tag & 0x20) === 0;

  // Multi-octet tag - load
  if ((tag & 0x1f) === 0x1f) {
    var oct = tag;
    tag = 0;
    while ((oct & 0x80) === 0x80) {
      oct = buf.readUInt8(fail);
      if (buf.isError(oct))
        return oct;

      tag <<= 7;
      tag |= oct & 0x7f;
    }
  } else {
    tag &= 0x1f;
  }
  var tagStr = der.tag[tag];

  return {
    cls: cls,
    primitive: primitive,
    tag: tag,
    tagStr: tagStr
  };
}

function derDecodeLen(buf, primitive, fail) {
  var len = buf.readUInt8(fail);
  if (buf.isError(len))
    return len;

  // Indefinite form
  if (!primitive && len === 0x80)
    return null;

  // Definite form
  if ((len & 0x80) === 0) {
    // Short form
    return len;
  }

  // Long form
  var num = len & 0x7f;
  if (num > 4)
    return buf.error('length octect is too long');

  len = 0;
  for (var i = 0; i < num; i++) {
    len <<= 8;
    var j = buf.readUInt8(fail);
    if (buf.isError(j))
      return j;
    len |= j;
  }

  return len;
}


/***/ }),

/***/ 1973:
/***/ (function(module, exports, __webpack_require__) {

var inherits = __webpack_require__(485);
var Buffer = __webpack_require__(469).Buffer;

var asn1 = __webpack_require__(753);
var base = asn1.base;

// Import DER constants
var der = asn1.constants.der;

function DEREncoder(entity) {
  this.enc = 'der';
  this.name = entity.name;
  this.entity = entity;

  // Construct base tree
  this.tree = new DERNode();
  this.tree._init(entity.body);
};
module.exports = DEREncoder;

DEREncoder.prototype.encode = function encode(data, reporter) {
  return this.tree._encode(data, reporter).join();
};

// Tree methods

function DERNode(parent) {
  base.Node.call(this, 'der', parent);
}
inherits(DERNode, base.Node);

DERNode.prototype._encodeComposite = function encodeComposite(tag,
                                                              primitive,
                                                              cls,
                                                              content) {
  var encodedTag = encodeTag(tag, primitive, cls, this.reporter);

  // Short form
  if (content.length < 0x80) {
    var header = new Buffer(2);
    header[0] = encodedTag;
    header[1] = content.length;
    return this._createEncoderBuffer([ header, content ]);
  }

  // Long form
  // Count octets required to store length
  var lenOctets = 1;
  for (var i = content.length; i >= 0x100; i >>= 8)
    lenOctets++;

  var header = new Buffer(1 + 1 + lenOctets);
  header[0] = encodedTag;
  header[1] = 0x80 | lenOctets;

  for (var i = 1 + lenOctets, j = content.length; j > 0; i--, j >>= 8)
    header[i] = j & 0xff;

  return this._createEncoderBuffer([ header, content ]);
};

DERNode.prototype._encodeStr = function encodeStr(str, tag) {
  if (tag === 'bitstr') {
    return this._createEncoderBuffer([ str.unused | 0, str.data ]);
  } else if (tag === 'bmpstr') {
    var buf = new Buffer(str.length * 2);
    for (var i = 0; i < str.length; i++) {
      buf.writeUInt16BE(str.charCodeAt(i), i * 2);
    }
    return this._createEncoderBuffer(buf);
  } else if (tag === 'numstr') {
    if (!this._isNumstr(str)) {
      return this.reporter.error('Encoding of string type: numstr supports ' +
                                 'only digits and space');
    }
    return this._createEncoderBuffer(str);
  } else if (tag === 'printstr') {
    if (!this._isPrintstr(str)) {
      return this.reporter.error('Encoding of string type: printstr supports ' +
                                 'only latin upper and lower case letters, ' +
                                 'digits, space, apostrophe, left and rigth ' +
                                 'parenthesis, plus sign, comma, hyphen, ' +
                                 'dot, slash, colon, equal sign, ' +
                                 'question mark');
    }
    return this._createEncoderBuffer(str);
  } else if (/str$/.test(tag)) {
    return this._createEncoderBuffer(str);
  } else if (tag === 'objDesc') {
    return this._createEncoderBuffer(str);
  } else {
    return this.reporter.error('Encoding of string type: ' + tag +
                               ' unsupported');
  }
};

DERNode.prototype._encodeObjid = function encodeObjid(id, values, relative) {
  if (typeof id === 'string') {
    if (!values)
      return this.reporter.error('string objid given, but no values map found');
    if (!values.hasOwnProperty(id))
      return this.reporter.error('objid not found in values map');
    id = values[id].split(/[\s\.]+/g);
    for (var i = 0; i < id.length; i++)
      id[i] |= 0;
  } else if (Array.isArray(id)) {
    id = id.slice();
    for (var i = 0; i < id.length; i++)
      id[i] |= 0;
  }

  if (!Array.isArray(id)) {
    return this.reporter.error('objid() should be either array or string, ' +
                               'got: ' + JSON.stringify(id));
  }

  if (!relative) {
    if (id[1] >= 40)
      return this.reporter.error('Second objid identifier OOB');
    id.splice(0, 2, id[0] * 40 + id[1]);
  }

  // Count number of octets
  var size = 0;
  for (var i = 0; i < id.length; i++) {
    var ident = id[i];
    for (size++; ident >= 0x80; ident >>= 7)
      size++;
  }

  var objid = new Buffer(size);
  var offset = objid.length - 1;
  for (var i = id.length - 1; i >= 0; i--) {
    var ident = id[i];
    objid[offset--] = ident & 0x7f;
    while ((ident >>= 7) > 0)
      objid[offset--] = 0x80 | (ident & 0x7f);
  }

  return this._createEncoderBuffer(objid);
};

function two(num) {
  if (num < 10)
    return '0' + num;
  else
    return num;
}

DERNode.prototype._encodeTime = function encodeTime(time, tag) {
  var str;
  var date = new Date(time);

  if (tag === 'gentime') {
    str = [
      two(date.getFullYear()),
      two(date.getUTCMonth() + 1),
      two(date.getUTCDate()),
      two(date.getUTCHours()),
      two(date.getUTCMinutes()),
      two(date.getUTCSeconds()),
      'Z'
    ].join('');
  } else if (tag === 'utctime') {
    str = [
      two(date.getFullYear() % 100),
      two(date.getUTCMonth() + 1),
      two(date.getUTCDate()),
      two(date.getUTCHours()),
      two(date.getUTCMinutes()),
      two(date.getUTCSeconds()),
      'Z'
    ].join('');
  } else {
    this.reporter.error('Encoding ' + tag + ' time is not supported yet');
  }

  return this._encodeStr(str, 'octstr');
};

DERNode.prototype._encodeNull = function encodeNull() {
  return this._createEncoderBuffer('');
};

DERNode.prototype._encodeInt = function encodeInt(num, values) {
  if (typeof num === 'string') {
    if (!values)
      return this.reporter.error('String int or enum given, but no values map');
    if (!values.hasOwnProperty(num)) {
      return this.reporter.error('Values map doesn\'t contain: ' +
                                 JSON.stringify(num));
    }
    num = values[num];
  }

  // Bignum, assume big endian
  if (typeof num !== 'number' && !Buffer.isBuffer(num)) {
    var numArray = num.toArray();
    if (!num.sign && numArray[0] & 0x80) {
      numArray.unshift(0);
    }
    num = new Buffer(numArray);
  }

  if (Buffer.isBuffer(num)) {
    var size = num.length;
    if (num.length === 0)
      size++;

    var out = new Buffer(size);
    num.copy(out);
    if (num.length === 0)
      out[0] = 0
    return this._createEncoderBuffer(out);
  }

  if (num < 0x80)
    return this._createEncoderBuffer(num);

  if (num < 0x100)
    return this._createEncoderBuffer([0, num]);

  var size = 1;
  for (var i = num; i >= 0x100; i >>= 8)
    size++;

  var out = new Array(size);
  for (var i = out.length - 1; i >= 0; i--) {
    out[i] = num & 0xff;
    num >>= 8;
  }
  if(out[0] & 0x80) {
    out.unshift(0);
  }

  return this._createEncoderBuffer(new Buffer(out));
};

DERNode.prototype._encodeBool = function encodeBool(value) {
  return this._createEncoderBuffer(value ? 0xff : 0);
};

DERNode.prototype._use = function use(entity, obj) {
  if (typeof entity === 'function')
    entity = entity(obj);
  return entity._getEncoder('der').tree;
};

DERNode.prototype._skipDefault = function skipDefault(dataBuffer, reporter, parent) {
  var state = this._baseState;
  var i;
  if (state['default'] === null)
    return false;

  var data = dataBuffer.join();
  if (state.defaultBuffer === undefined)
    state.defaultBuffer = this._encodeValue(state['default'], reporter, parent).join();

  if (data.length !== state.defaultBuffer.length)
    return false;

  for (i=0; i < data.length; i++)
    if (data[i] !== state.defaultBuffer[i])
      return false;

  return true;
};

// Utility methods

function encodeTag(tag, primitive, cls, reporter) {
  var res;

  if (tag === 'seqof')
    tag = 'seq';
  else if (tag === 'setof')
    tag = 'set';

  if (der.tagByName.hasOwnProperty(tag))
    res = der.tagByName[tag];
  else if (typeof tag === 'number' && (tag | 0) === tag)
    res = tag;
  else
    return reporter.error('Unknown tag: ' + tag);

  if (res >= 0x1f)
    return reporter.error('Multi-octet tag encoding unsupported');

  if (!primitive)
    res |= 0x20;

  res |= (der.tagClassByName[cls || 'universal'] << 6);

  return res;
}


/***/ }),

/***/ 1974:
/***/ (function(module, exports) {

module.exports = {"1.3.132.0.10":"secp256k1","1.3.132.0.33":"p224","1.2.840.10045.3.1.1":"p192","1.2.840.10045.3.1.7":"p256","1.3.132.0.34":"p384","1.3.132.0.35":"p521"}

/***/ }),

/***/ 1975:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(749);
module.exports = function (seed, len) {
  var t = new Buffer('');
  var  i = 0, c;
  while (t.length < len) {
    c = i2ops(i++);
    t = Buffer.concat([t, createHash('sha1').update(seed).update(c).digest()]);
  }
  return t.slice(0, len);
};

function i2ops(c) {
  var out = new Buffer(4);
  out.writeUInt32BE(c,0);
  return out;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 1976:
/***/ (function(module, exports) {

module.exports = function xor(a, b) {
  var len = a.length;
  var i = -1;
  while (++i < len) {
    a[i] ^= b[i];
  }
  return a
};

/***/ }),

/***/ 1977:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var bn = __webpack_require__(514);
function withPublic(paddedMsg, key) {
  return new Buffer(paddedMsg
    .toRed(bn.mont(key.modulus))
    .redPow(new bn(key.publicExponent))
    .fromRed()
    .toArray());
}

module.exports = withPublic;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 2051:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.randomBytes = exports.rng = exports.pseudoRandomBytes = exports.prng = __webpack_require__(748)
exports.createHash = exports.Hash = __webpack_require__(749)
exports.createHmac = exports.Hmac = __webpack_require__(1949)

var algos = __webpack_require__(2067)
var algoKeys = Object.keys(algos)
var hashes = ['sha1', 'sha224', 'sha256', 'sha384', 'sha512', 'md5', 'rmd160'].concat(algoKeys)
exports.getHashes = function () {
  return hashes
}

var p = __webpack_require__(1951)
exports.pbkdf2 = p.pbkdf2
exports.pbkdf2Sync = p.pbkdf2Sync

var aes = __webpack_require__(2069)

exports.Cipher = aes.Cipher
exports.createCipher = aes.createCipher
exports.Cipheriv = aes.Cipheriv
exports.createCipheriv = aes.createCipheriv
exports.Decipher = aes.Decipher
exports.createDecipher = aes.createDecipher
exports.Decipheriv = aes.Decipheriv
exports.createDecipheriv = aes.createDecipheriv
exports.getCiphers = aes.getCiphers
exports.listCiphers = aes.listCiphers

var dh = __webpack_require__(2080)

exports.DiffieHellmanGroup = dh.DiffieHellmanGroup
exports.createDiffieHellmanGroup = dh.createDiffieHellmanGroup
exports.getDiffieHellman = dh.getDiffieHellman
exports.createDiffieHellman = dh.createDiffieHellman
exports.DiffieHellman = dh.DiffieHellman

var sign = __webpack_require__(2084)

exports.createSign = sign.createSign
exports.Sign = sign.Sign
exports.createVerify = sign.createVerify
exports.Verify = sign.Verify

exports.createECDH = __webpack_require__(2122)

var publicEncrypt = __webpack_require__(2123)

exports.publicEncrypt = publicEncrypt.publicEncrypt
exports.privateEncrypt = publicEncrypt.privateEncrypt
exports.publicDecrypt = publicEncrypt.publicDecrypt
exports.privateDecrypt = publicEncrypt.privateDecrypt

// the least I can do is make error messages for the rest of the node.js/crypto api.
// ;[
//   'createCredentials'
// ].forEach(function (name) {
//   exports[name] = function () {
//     throw new Error([
//       'sorry, ' + name + ' is not implemented yet',
//       'we accept pull requests',
//       'https://github.com/crypto-browserify/crypto-browserify'
//     ].join('\n'))
//   }
// })

exports.createCredentials = function () {
  throw new Error([
    'sorry, createCredentials is not implemented yet',
    'we accept pull requests',
    'https://github.com/crypto-browserify/crypto-browserify'
  ].join('\n'))
}

exports.constants = {
  'DH_CHECK_P_NOT_SAFE_PRIME': 2,
  'DH_CHECK_P_NOT_PRIME': 1,
  'DH_UNABLE_TO_CHECK_GENERATOR': 4,
  'DH_NOT_SUITABLE_GENERATOR': 8,
  'NPN_ENABLED': 1,
  'ALPN_ENABLED': 1,
  'RSA_PKCS1_PADDING': 1,
  'RSA_SSLV23_PADDING': 2,
  'RSA_NO_PADDING': 3,
  'RSA_PKCS1_OAEP_PADDING': 4,
  'RSA_X931_PADDING': 5,
  'RSA_PKCS1_PSS_PADDING': 6,
  'POINT_CONVERSION_COMPRESSED': 2,
  'POINT_CONVERSION_UNCOMPRESSED': 4,
  'POINT_CONVERSION_HYBRID': 6
}


/***/ }),

/***/ 2052:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
var intSize = 4
var zeroBuffer = new Buffer(intSize)
zeroBuffer.fill(0)

var charSize = 8
var hashSize = 16

function toArray (buf) {
  if ((buf.length % intSize) !== 0) {
    var len = buf.length + (intSize - (buf.length % intSize))
    buf = Buffer.concat([buf, zeroBuffer], len)
  }

  var arr = new Array(buf.length >>> 2)
  for (var i = 0, j = 0; i < buf.length; i += intSize, j++) {
    arr[j] = buf.readInt32LE(i)
  }

  return arr
}

module.exports = function hash (buf, fn) {
  var arr = fn(toArray(buf), buf.length * charSize)
  buf = new Buffer(hashSize)
  for (var i = 0; i < arr.length; i++) {
    buf.writeInt32LE(arr[i], i << 2, true)
  }
  return buf
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 2053:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
var Transform = __webpack_require__(980).Transform
var inherits = __webpack_require__(485)

function HashBase (blockSize) {
  Transform.call(this)

  this._block = new Buffer(blockSize)
  this._blockSize = blockSize
  this._blockOffset = 0
  this._length = [0, 0, 0, 0]

  this._finalized = false
}

inherits(HashBase, Transform)

HashBase.prototype._transform = function (chunk, encoding, callback) {
  var error = null
  try {
    if (encoding !== 'buffer') chunk = new Buffer(chunk, encoding)
    this.update(chunk)
  } catch (err) {
    error = err
  }

  callback(error)
}

HashBase.prototype._flush = function (callback) {
  var error = null
  try {
    this.push(this._digest())
  } catch (err) {
    error = err
  }

  callback(error)
}

HashBase.prototype.update = function (data, encoding) {
  if (!Buffer.isBuffer(data) && typeof data !== 'string') throw new TypeError('Data must be a string or a buffer')
  if (this._finalized) throw new Error('Digest already called')
  if (!Buffer.isBuffer(data)) data = new Buffer(data, encoding || 'binary')

  // consume data
  var block = this._block
  var offset = 0
  while (this._blockOffset + data.length - offset >= this._blockSize) {
    for (var i = this._blockOffset; i < this._blockSize;) block[i++] = data[offset++]
    this._update()
    this._blockOffset = 0
  }
  while (offset < data.length) block[this._blockOffset++] = data[offset++]

  // update length
  for (var j = 0, carry = data.length * 8; carry > 0; ++j) {
    this._length[j] += carry
    carry = (this._length[j] / 0x0100000000) | 0
    if (carry > 0) this._length[j] -= 0x0100000000 * carry
  }

  return this
}

HashBase.prototype._update = function (data) {
  throw new Error('_update is not implemented')
}

HashBase.prototype.digest = function (encoding) {
  if (this._finalized) throw new Error('Digest already called')
  this._finalized = true

  var digest = this._digest()
  if (encoding !== undefined) digest = digest.toString(encoding)
  return digest
}

HashBase.prototype._digest = function () {
  throw new Error('_digest is not implemented')
}

module.exports = HashBase

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 2054:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2055:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = __webpack_require__(592).Buffer;
/*</replacement>*/

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

/***/ }),

/***/ 2056:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ }),

/***/ 2057:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.



module.exports = PassThrough;

var Transform = __webpack_require__(1946);

/*<replacement>*/
var util = __webpack_require__(750);
util.inherits = __webpack_require__(485);
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ }),

/***/ 2058:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(983);


/***/ }),

/***/ 2059:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(667);


/***/ }),

/***/ 2060:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(982).Transform


/***/ }),

/***/ 2061:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(982).PassThrough


/***/ }),

/***/ 2062:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-0, as defined
 * in FIPS PUB 180-1
 * This source code is derived from sha1.js of the same repository.
 * The difference between SHA-0 and SHA-1 is just a bitwise rotate left
 * operation was added.
 */

var inherits = __webpack_require__(485)
var Hash = __webpack_require__(678)

var K = [
  0x5a827999, 0x6ed9eba1, 0x8f1bbcdc | 0, 0xca62c1d6 | 0
]

var W = new Array(80)

function Sha () {
  this.init()
  this._w = W

  Hash.call(this, 64, 56)
}

inherits(Sha, Hash)

Sha.prototype.init = function () {
  this._a = 0x67452301
  this._b = 0xefcdab89
  this._c = 0x98badcfe
  this._d = 0x10325476
  this._e = 0xc3d2e1f0

  return this
}

function rotl5 (num) {
  return (num << 5) | (num >>> 27)
}

function rotl30 (num) {
  return (num << 30) | (num >>> 2)
}

function ft (s, b, c, d) {
  if (s === 0) return (b & c) | ((~b) & d)
  if (s === 2) return (b & c) | (b & d) | (c & d)
  return b ^ c ^ d
}

Sha.prototype._update = function (M) {
  var W = this._w

  var a = this._a | 0
  var b = this._b | 0
  var c = this._c | 0
  var d = this._d | 0
  var e = this._e | 0

  for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4)
  for (; i < 80; ++i) W[i] = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16]

  for (var j = 0; j < 80; ++j) {
    var s = ~~(j / 20)
    var t = (rotl5(a) + ft(s, b, c, d) + e + W[j] + K[s]) | 0

    e = d
    d = c
    c = rotl30(b)
    b = a
    a = t
  }

  this._a = (a + this._a) | 0
  this._b = (b + this._b) | 0
  this._c = (c + this._c) | 0
  this._d = (d + this._d) | 0
  this._e = (e + this._e) | 0
}

Sha.prototype._hash = function () {
  var H = new Buffer(20)

  H.writeInt32BE(this._a | 0, 0)
  H.writeInt32BE(this._b | 0, 4)
  H.writeInt32BE(this._c | 0, 8)
  H.writeInt32BE(this._d | 0, 12)
  H.writeInt32BE(this._e | 0, 16)

  return H
}

module.exports = Sha

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 2063:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/*
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-1, as defined
 * in FIPS PUB 180-1
 * Version 2.1a Copyright Paul Johnston 2000 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for details.
 */

var inherits = __webpack_require__(485)
var Hash = __webpack_require__(678)

var K = [
  0x5a827999, 0x6ed9eba1, 0x8f1bbcdc | 0, 0xca62c1d6 | 0
]

var W = new Array(80)

function Sha1 () {
  this.init()
  this._w = W

  Hash.call(this, 64, 56)
}

inherits(Sha1, Hash)

Sha1.prototype.init = function () {
  this._a = 0x67452301
  this._b = 0xefcdab89
  this._c = 0x98badcfe
  this._d = 0x10325476
  this._e = 0xc3d2e1f0

  return this
}

function rotl1 (num) {
  return (num << 1) | (num >>> 31)
}

function rotl5 (num) {
  return (num << 5) | (num >>> 27)
}

function rotl30 (num) {
  return (num << 30) | (num >>> 2)
}

function ft (s, b, c, d) {
  if (s === 0) return (b & c) | ((~b) & d)
  if (s === 2) return (b & c) | (b & d) | (c & d)
  return b ^ c ^ d
}

Sha1.prototype._update = function (M) {
  var W = this._w

  var a = this._a | 0
  var b = this._b | 0
  var c = this._c | 0
  var d = this._d | 0
  var e = this._e | 0

  for (var i = 0; i < 16; ++i) W[i] = M.readInt32BE(i * 4)
  for (; i < 80; ++i) W[i] = rotl1(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16])

  for (var j = 0; j < 80; ++j) {
    var s = ~~(j / 20)
    var t = (rotl5(a) + ft(s, b, c, d) + e + W[j] + K[s]) | 0

    e = d
    d = c
    c = rotl30(b)
    b = a
    a = t
  }

  this._a = (a + this._a) | 0
  this._b = (b + this._b) | 0
  this._c = (c + this._c) | 0
  this._d = (d + this._d) | 0
  this._e = (e + this._e) | 0
}

Sha1.prototype._hash = function () {
  var H = new Buffer(20)

  H.writeInt32BE(this._a | 0, 0)
  H.writeInt32BE(this._b | 0, 4)
  H.writeInt32BE(this._c | 0, 8)
  H.writeInt32BE(this._d | 0, 12)
  H.writeInt32BE(this._e | 0, 16)

  return H
}

module.exports = Sha1

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 2064:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {/**
 * A JavaScript implementation of the Secure Hash Algorithm, SHA-256, as defined
 * in FIPS 180-2
 * Version 2.2-beta Copyright Angel Marin, Paul Johnston 2000 - 2009.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 *
 */

var inherits = __webpack_require__(485)
var Sha256 = __webpack_require__(1947)
var Hash = __webpack_require__(678)

var W = new Array(64)

function Sha224 () {
  this.init()

  this._w = W // new Array(64)

  Hash.call(this, 64, 56)
}

inherits(Sha224, Sha256)

Sha224.prototype.init = function () {
  this._a = 0xc1059ed8
  this._b = 0x367cd507
  this._c = 0x3070dd17
  this._d = 0xf70e5939
  this._e = 0xffc00b31
  this._f = 0x68581511
  this._g = 0x64f98fa7
  this._h = 0xbefa4fa4

  return this
}

Sha224.prototype._hash = function () {
  var H = new Buffer(28)

  H.writeInt32BE(this._a, 0)
  H.writeInt32BE(this._b, 4)
  H.writeInt32BE(this._c, 8)
  H.writeInt32BE(this._d, 12)
  H.writeInt32BE(this._e, 16)
  H.writeInt32BE(this._f, 20)
  H.writeInt32BE(this._g, 24)

  return H
}

module.exports = Sha224

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 2065:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var inherits = __webpack_require__(485)
var SHA512 = __webpack_require__(1948)
var Hash = __webpack_require__(678)

var W = new Array(160)

function Sha384 () {
  this.init()
  this._w = W

  Hash.call(this, 128, 112)
}

inherits(Sha384, SHA512)

Sha384.prototype.init = function () {
  this._ah = 0xcbbb9d5d
  this._bh = 0x629a292a
  this._ch = 0x9159015a
  this._dh = 0x152fecd8
  this._eh = 0x67332667
  this._fh = 0x8eb44a87
  this._gh = 0xdb0c2e0d
  this._hh = 0x47b5481d

  this._al = 0xc1059ed8
  this._bl = 0x367cd507
  this._cl = 0x3070dd17
  this._dl = 0xf70e5939
  this._el = 0xffc00b31
  this._fl = 0x68581511
  this._gl = 0x64f98fa7
  this._hl = 0xbefa4fa4

  return this
}

Sha384.prototype._hash = function () {
  var H = new Buffer(48)

  function writeInt64BE (h, l, offset) {
    H.writeInt32BE(h, offset)
    H.writeInt32BE(l, offset + 4)
  }

  writeInt64BE(this._ah, this._al, 0)
  writeInt64BE(this._bh, this._bl, 8)
  writeInt64BE(this._ch, this._cl, 16)
  writeInt64BE(this._dh, this._dl, 24)
  writeInt64BE(this._eh, this._el, 32)
  writeInt64BE(this._fh, this._fl, 40)

  return H
}

module.exports = Sha384

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 2066:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var inherits = __webpack_require__(485)
var Buffer = __webpack_require__(592).Buffer

var Base = __webpack_require__(625)

var ZEROS = Buffer.alloc(128)
var blocksize = 64

function Hmac (alg, key) {
  Base.call(this, 'digest')
  if (typeof key === 'string') {
    key = Buffer.from(key)
  }

  this._alg = alg
  this._key = key

  if (key.length > blocksize) {
    key = alg(key)
  } else if (key.length < blocksize) {
    key = Buffer.concat([key, ZEROS], blocksize)
  }

  var ipad = this._ipad = Buffer.allocUnsafe(blocksize)
  var opad = this._opad = Buffer.allocUnsafe(blocksize)

  for (var i = 0; i < blocksize; i++) {
    ipad[i] = key[i] ^ 0x36
    opad[i] = key[i] ^ 0x5C
  }

  this._hash = [ipad]
}

inherits(Hmac, Base)

Hmac.prototype._update = function (data) {
  this._hash.push(data)
}

Hmac.prototype._final = function () {
  var h = this._alg(Buffer.concat(this._hash))
  return this._alg(Buffer.concat([this._opad, h]))
}
module.exports = Hmac


/***/ }),

/***/ 2067:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1950)


/***/ }),

/***/ 2068:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, Promise, process) {var checkParameters = __webpack_require__(1952)
var defaultEncoding = __webpack_require__(1953)
var sync = __webpack_require__(1954)
var Buffer = __webpack_require__(592).Buffer

var ZERO_BUF
var subtle = global.crypto && global.crypto.subtle
var toBrowser = {
  'sha': 'SHA-1',
  'sha-1': 'SHA-1',
  'sha1': 'SHA-1',
  'sha256': 'SHA-256',
  'sha-256': 'SHA-256',
  'sha384': 'SHA-384',
  'sha-384': 'SHA-384',
  'sha-512': 'SHA-512',
  'sha512': 'SHA-512'
}
var checks = []
function checkNative (algo) {
  if (global.process && !global.process.browser) {
    return Promise.resolve(false)
  }
  if (!subtle || !subtle.importKey || !subtle.deriveBits) {
    return Promise.resolve(false)
  }
  if (checks[algo] !== undefined) {
    return checks[algo]
  }
  ZERO_BUF = ZERO_BUF || Buffer.alloc(8)
  var prom = browserPbkdf2(ZERO_BUF, ZERO_BUF, 10, 128, algo)
    .then(function () {
      return true
    }).catch(function () {
      return false
    })
  checks[algo] = prom
  return prom
}
function browserPbkdf2 (password, salt, iterations, length, algo) {
  return subtle.importKey(
    'raw', password, {name: 'PBKDF2'}, false, ['deriveBits']
  ).then(function (key) {
    return subtle.deriveBits({
      name: 'PBKDF2',
      salt: salt,
      iterations: iterations,
      hash: {
        name: algo
      }
    }, key, length << 3)
  }).then(function (res) {
    return Buffer.from(res)
  })
}
function resolvePromise (promise, callback) {
  promise.then(function (out) {
    process.nextTick(function () {
      callback(null, out)
    })
  }, function (e) {
    process.nextTick(function () {
      callback(e)
    })
  })
}
module.exports = function (password, salt, iterations, keylen, digest, callback) {
  if (!Buffer.isBuffer(password)) password = Buffer.from(password, defaultEncoding)
  if (!Buffer.isBuffer(salt)) salt = Buffer.from(salt, defaultEncoding)

  checkParameters(iterations, keylen)
  if (typeof digest === 'function') {
    callback = digest
    digest = undefined
  }
  if (typeof callback !== 'function') throw new Error('No callback provided to pbkdf2')

  digest = digest || 'sha1'
  var algo = toBrowser[digest.toLowerCase()]
  if (!algo || typeof global.Promise !== 'function') {
    return process.nextTick(function () {
      var out
      try {
        out = sync(password, salt, iterations, keylen, digest)
      } catch (e) {
        return callback(e)
      }
      callback(null, out)
    })
  }
  resolvePromise(checkNative(algo).then(function (resp) {
    if (resp) {
      return browserPbkdf2(password, salt, iterations, keylen, algo)
    } else {
      return sync(password, salt, iterations, keylen, digest)
    }
  }), callback)
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74), __webpack_require__(113), __webpack_require__(169)))

/***/ }),

/***/ 2069:
/***/ (function(module, exports, __webpack_require__) {

var ebtk = __webpack_require__(779)
var aes = __webpack_require__(986)
var DES = __webpack_require__(2073)
var desModes = __webpack_require__(2079)
var aesModes = __webpack_require__(781)
function createCipher (suite, password) {
  var keyLen, ivLen
  suite = suite.toLowerCase()
  if (aesModes[suite]) {
    keyLen = aesModes[suite].key
    ivLen = aesModes[suite].iv
  } else if (desModes[suite]) {
    keyLen = desModes[suite].key * 8
    ivLen = desModes[suite].iv
  } else {
    throw new TypeError('invalid suite type')
  }
  var keys = ebtk(password, false, keyLen, ivLen)
  return createCipheriv(suite, keys.key, keys.iv)
}
function createDecipher (suite, password) {
  var keyLen, ivLen
  suite = suite.toLowerCase()
  if (aesModes[suite]) {
    keyLen = aesModes[suite].key
    ivLen = aesModes[suite].iv
  } else if (desModes[suite]) {
    keyLen = desModes[suite].key * 8
    ivLen = desModes[suite].iv
  } else {
    throw new TypeError('invalid suite type')
  }
  var keys = ebtk(password, false, keyLen, ivLen)
  return createDecipheriv(suite, keys.key, keys.iv)
}

function createCipheriv (suite, key, iv) {
  suite = suite.toLowerCase()
  if (aesModes[suite]) {
    return aes.createCipheriv(suite, key, iv)
  } else if (desModes[suite]) {
    return new DES({
      key: key,
      iv: iv,
      mode: suite
    })
  } else {
    throw new TypeError('invalid suite type')
  }
}
function createDecipheriv (suite, key, iv) {
  suite = suite.toLowerCase()
  if (aesModes[suite]) {
    return aes.createDecipheriv(suite, key, iv)
  } else if (desModes[suite]) {
    return new DES({
      key: key,
      iv: iv,
      mode: suite,
      decrypt: true
    })
  } else {
    throw new TypeError('invalid suite type')
  }
}
exports.createCipher = exports.Cipher = createCipher
exports.createCipheriv = exports.Cipheriv = createCipheriv
exports.createDecipher = exports.Decipher = createDecipher
exports.createDecipheriv = exports.Decipheriv = createDecipheriv
function getCiphers () {
  return Object.keys(desModes).concat(aes.getCiphers())
}
exports.listCiphers = exports.getCiphers = getCiphers


/***/ }),

/***/ 2070:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var aes = __webpack_require__(780)
var Transform = __webpack_require__(625)
var inherits = __webpack_require__(485)
var modes = __webpack_require__(781)
var ebtk = __webpack_require__(779)
var StreamCipher = __webpack_require__(1955)
var AuthCipher = __webpack_require__(1956)
inherits(Cipher, Transform)
function Cipher (mode, key, iv) {
  if (!(this instanceof Cipher)) {
    return new Cipher(mode, key, iv)
  }
  Transform.call(this)
  this._cache = new Splitter()
  this._cipher = new aes.AES(key)
  this._prev = new Buffer(iv.length)
  iv.copy(this._prev)
  this._mode = mode
  this._autopadding = true
}
Cipher.prototype._update = function (data) {
  this._cache.add(data)
  var chunk
  var thing
  var out = []
  while ((chunk = this._cache.get())) {
    thing = this._mode.encrypt(this, chunk)
    out.push(thing)
  }
  return Buffer.concat(out)
}
Cipher.prototype._final = function () {
  var chunk = this._cache.flush()
  if (this._autopadding) {
    chunk = this._mode.encrypt(this, chunk)
    this._cipher.scrub()
    return chunk
  } else if (chunk.toString('hex') !== '10101010101010101010101010101010') {
    this._cipher.scrub()
    throw new Error('data not multiple of block length')
  }
}
Cipher.prototype.setAutoPadding = function (setTo) {
  this._autopadding = !!setTo
  return this
}

function Splitter () {
  if (!(this instanceof Splitter)) {
    return new Splitter()
  }
  this.cache = new Buffer('')
}
Splitter.prototype.add = function (data) {
  this.cache = Buffer.concat([this.cache, data])
}

Splitter.prototype.get = function () {
  if (this.cache.length > 15) {
    var out = this.cache.slice(0, 16)
    this.cache = this.cache.slice(16)
    return out
  }
  return null
}
Splitter.prototype.flush = function () {
  var len = 16 - this.cache.length
  var padBuff = new Buffer(len)

  var i = -1
  while (++i < len) {
    padBuff.writeUInt8(len, i)
  }
  var out = Buffer.concat([this.cache, padBuff])
  return out
}
var modelist = {
  ECB: __webpack_require__(1957),
  CBC: __webpack_require__(1958),
  CFB: __webpack_require__(1959),
  CFB8: __webpack_require__(1960),
  CFB1: __webpack_require__(1961),
  OFB: __webpack_require__(1962),
  CTR: __webpack_require__(782),
  GCM: __webpack_require__(782)
}

function createCipheriv (suite, password, iv) {
  var config = modes[suite.toLowerCase()]
  if (!config) {
    throw new TypeError('invalid suite type')
  }
  if (typeof iv === 'string') {
    iv = new Buffer(iv)
  }
  if (typeof password === 'string') {
    password = new Buffer(password)
  }
  if (password.length !== config.key / 8) {
    throw new TypeError('invalid key length ' + password.length)
  }
  if (iv.length !== config.iv) {
    throw new TypeError('invalid iv length ' + iv.length)
  }
  if (config.type === 'stream') {
    return new StreamCipher(modelist[config.mode], password, iv)
  } else if (config.type === 'auth') {
    return new AuthCipher(modelist[config.mode], password, iv)
  }
  return new Cipher(modelist[config.mode], password, iv)
}
function createCipher (suite, password) {
  var config = modes[suite.toLowerCase()]
  if (!config) {
    throw new TypeError('invalid suite type')
  }
  var keys = ebtk(password, false, config.key, config.iv)
  return createCipheriv(suite, keys.key, keys.iv)
}

exports.createCipheriv = createCipheriv
exports.createCipher = createCipher

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 2071:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var zeros = new Buffer(16)
zeros.fill(0)
module.exports = GHASH
function GHASH (key) {
  this.h = key
  this.state = new Buffer(16)
  this.state.fill(0)
  this.cache = new Buffer('')
}
// from http://bitwiseshiftleft.github.io/sjcl/doc/symbols/src/core_gcm.js.html
// by Juho Vähä-Herttua
GHASH.prototype.ghash = function (block) {
  var i = -1
  while (++i < block.length) {
    this.state[i] ^= block[i]
  }
  this._multiply()
}

GHASH.prototype._multiply = function () {
  var Vi = toArray(this.h)
  var Zi = [0, 0, 0, 0]
  var j, xi, lsb_Vi
  var i = -1
  while (++i < 128) {
    xi = (this.state[~~(i / 8)] & (1 << (7 - i % 8))) !== 0
    if (xi) {
      // Z_i+1 = Z_i ^ V_i
      Zi = xor(Zi, Vi)
    }

    // Store the value of LSB(V_i)
    lsb_Vi = (Vi[3] & 1) !== 0

    // V_i+1 = V_i >> 1
    for (j = 3; j > 0; j--) {
      Vi[j] = (Vi[j] >>> 1) | ((Vi[j - 1] & 1) << 31)
    }
    Vi[0] = Vi[0] >>> 1

    // If LSB(V_i) is 1, V_i+1 = (V_i >> 1) ^ R
    if (lsb_Vi) {
      Vi[0] = Vi[0] ^ (0xe1 << 24)
    }
  }
  this.state = fromArray(Zi)
}
GHASH.prototype.update = function (buf) {
  this.cache = Buffer.concat([this.cache, buf])
  var chunk
  while (this.cache.length >= 16) {
    chunk = this.cache.slice(0, 16)
    this.cache = this.cache.slice(16)
    this.ghash(chunk)
  }
}
GHASH.prototype.final = function (abl, bl) {
  if (this.cache.length) {
    this.ghash(Buffer.concat([this.cache, zeros], 16))
  }
  this.ghash(fromArray([
    0, abl,
    0, bl
  ]))
  return this.state
}

function toArray (buf) {
  return [
    buf.readUInt32BE(0),
    buf.readUInt32BE(4),
    buf.readUInt32BE(8),
    buf.readUInt32BE(12)
  ]
}
function fromArray (out) {
  out = out.map(fixup_uint32)
  var buf = new Buffer(16)
  buf.writeUInt32BE(out[0], 0)
  buf.writeUInt32BE(out[1], 4)
  buf.writeUInt32BE(out[2], 8)
  buf.writeUInt32BE(out[3], 12)
  return buf
}
var uint_max = Math.pow(2, 32)
function fixup_uint32 (x) {
  var ret, x_pos
  ret = x > uint_max || x < 0 ? (x_pos = Math.abs(x) % uint_max, x < 0 ? uint_max - x_pos : x_pos) : x
  return ret
}
function xor (a, b) {
  return [
    a[0] ^ b[0],
    a[1] ^ b[1],
    a[2] ^ b[2],
    a[3] ^ b[3]
  ]
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 2072:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var aes = __webpack_require__(780)
var Transform = __webpack_require__(625)
var inherits = __webpack_require__(485)
var modes = __webpack_require__(781)
var StreamCipher = __webpack_require__(1955)
var AuthCipher = __webpack_require__(1956)
var ebtk = __webpack_require__(779)

inherits(Decipher, Transform)
function Decipher (mode, key, iv) {
  if (!(this instanceof Decipher)) {
    return new Decipher(mode, key, iv)
  }
  Transform.call(this)
  this._cache = new Splitter()
  this._last = void 0
  this._cipher = new aes.AES(key)
  this._prev = new Buffer(iv.length)
  iv.copy(this._prev)
  this._mode = mode
  this._autopadding = true
}
Decipher.prototype._update = function (data) {
  this._cache.add(data)
  var chunk
  var thing
  var out = []
  while ((chunk = this._cache.get(this._autopadding))) {
    thing = this._mode.decrypt(this, chunk)
    out.push(thing)
  }
  return Buffer.concat(out)
}
Decipher.prototype._final = function () {
  var chunk = this._cache.flush()
  if (this._autopadding) {
    return unpad(this._mode.decrypt(this, chunk))
  } else if (chunk) {
    throw new Error('data not multiple of block length')
  }
}
Decipher.prototype.setAutoPadding = function (setTo) {
  this._autopadding = !!setTo
  return this
}
function Splitter () {
  if (!(this instanceof Splitter)) {
    return new Splitter()
  }
  this.cache = new Buffer('')
}
Splitter.prototype.add = function (data) {
  this.cache = Buffer.concat([this.cache, data])
}

Splitter.prototype.get = function (autoPadding) {
  var out
  if (autoPadding) {
    if (this.cache.length > 16) {
      out = this.cache.slice(0, 16)
      this.cache = this.cache.slice(16)
      return out
    }
  } else {
    if (this.cache.length >= 16) {
      out = this.cache.slice(0, 16)
      this.cache = this.cache.slice(16)
      return out
    }
  }
  return null
}
Splitter.prototype.flush = function () {
  if (this.cache.length) {
    return this.cache
  }
}
function unpad (last) {
  var padded = last[15]
  var i = -1
  while (++i < padded) {
    if (last[(i + (16 - padded))] !== padded) {
      throw new Error('unable to decrypt data')
    }
  }
  if (padded === 16) {
    return
  }
  return last.slice(0, 16 - padded)
}

var modelist = {
  ECB: __webpack_require__(1957),
  CBC: __webpack_require__(1958),
  CFB: __webpack_require__(1959),
  CFB8: __webpack_require__(1960),
  CFB1: __webpack_require__(1961),
  OFB: __webpack_require__(1962),
  CTR: __webpack_require__(782),
  GCM: __webpack_require__(782)
}

function createDecipheriv (suite, password, iv) {
  var config = modes[suite.toLowerCase()]
  if (!config) {
    throw new TypeError('invalid suite type')
  }
  if (typeof iv === 'string') {
    iv = new Buffer(iv)
  }
  if (typeof password === 'string') {
    password = new Buffer(password)
  }
  if (password.length !== config.key / 8) {
    throw new TypeError('invalid key length ' + password.length)
  }
  if (iv.length !== config.iv) {
    throw new TypeError('invalid iv length ' + iv.length)
  }
  if (config.type === 'stream') {
    return new StreamCipher(modelist[config.mode], password, iv, true)
  } else if (config.type === 'auth') {
    return new AuthCipher(modelist[config.mode], password, iv, true)
  }
  return new Decipher(modelist[config.mode], password, iv)
}

function createDecipher (suite, password) {
  var config = modes[suite.toLowerCase()]
  if (!config) {
    throw new TypeError('invalid suite type')
  }
  var keys = ebtk(password, false, config.key, config.iv)
  return createDecipheriv(suite, keys.key, keys.iv)
}
exports.createDecipher = createDecipher
exports.createDecipheriv = createDecipheriv

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 2073:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var CipherBase = __webpack_require__(625)
var des = __webpack_require__(987)
var inherits = __webpack_require__(485)

var modes = {
  'des-ede3-cbc': des.CBC.instantiate(des.EDE),
  'des-ede3': des.EDE,
  'des-ede-cbc': des.CBC.instantiate(des.EDE),
  'des-ede': des.EDE,
  'des-cbc': des.CBC.instantiate(des.DES),
  'des-ecb': des.DES
}
modes.des = modes['des-cbc']
modes.des3 = modes['des-ede3-cbc']
module.exports = DES
inherits(DES, CipherBase)
function DES (opts) {
  CipherBase.call(this)
  var modeName = opts.mode.toLowerCase()
  var mode = modes[modeName]
  var type
  if (opts.decrypt) {
    type = 'decrypt'
  } else {
    type = 'encrypt'
  }
  var key = opts.key
  if (modeName === 'des-ede' || modeName === 'des-ede-cbc') {
    key = Buffer.concat([key, key.slice(0, 8)])
  }
  var iv = opts.iv
  this._des = mode.create({
    key: key,
    iv: iv,
    type: type
  })
}
DES.prototype._update = function (data) {
  return new Buffer(this._des.update(data))
}
DES.prototype._final = function () {
  return new Buffer(this._des.final())
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 2074:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.readUInt32BE = function readUInt32BE(bytes, off) {
  var res =  (bytes[0 + off] << 24) |
             (bytes[1 + off] << 16) |
             (bytes[2 + off] << 8) |
             bytes[3 + off];
  return res >>> 0;
};

exports.writeUInt32BE = function writeUInt32BE(bytes, value, off) {
  bytes[0 + off] = value >>> 24;
  bytes[1 + off] = (value >>> 16) & 0xff;
  bytes[2 + off] = (value >>> 8) & 0xff;
  bytes[3 + off] = value & 0xff;
};

exports.ip = function ip(inL, inR, out, off) {
  var outL = 0;
  var outR = 0;

  for (var i = 6; i >= 0; i -= 2) {
    for (var j = 0; j <= 24; j += 8) {
      outL <<= 1;
      outL |= (inR >>> (j + i)) & 1;
    }
    for (var j = 0; j <= 24; j += 8) {
      outL <<= 1;
      outL |= (inL >>> (j + i)) & 1;
    }
  }

  for (var i = 6; i >= 0; i -= 2) {
    for (var j = 1; j <= 25; j += 8) {
      outR <<= 1;
      outR |= (inR >>> (j + i)) & 1;
    }
    for (var j = 1; j <= 25; j += 8) {
      outR <<= 1;
      outR |= (inL >>> (j + i)) & 1;
    }
  }

  out[off + 0] = outL >>> 0;
  out[off + 1] = outR >>> 0;
};

exports.rip = function rip(inL, inR, out, off) {
  var outL = 0;
  var outR = 0;

  for (var i = 0; i < 4; i++) {
    for (var j = 24; j >= 0; j -= 8) {
      outL <<= 1;
      outL |= (inR >>> (j + i)) & 1;
      outL <<= 1;
      outL |= (inL >>> (j + i)) & 1;
    }
  }
  for (var i = 4; i < 8; i++) {
    for (var j = 24; j >= 0; j -= 8) {
      outR <<= 1;
      outR |= (inR >>> (j + i)) & 1;
      outR <<= 1;
      outR |= (inL >>> (j + i)) & 1;
    }
  }

  out[off + 0] = outL >>> 0;
  out[off + 1] = outR >>> 0;
};

exports.pc1 = function pc1(inL, inR, out, off) {
  var outL = 0;
  var outR = 0;

  // 7, 15, 23, 31, 39, 47, 55, 63
  // 6, 14, 22, 30, 39, 47, 55, 63
  // 5, 13, 21, 29, 39, 47, 55, 63
  // 4, 12, 20, 28
  for (var i = 7; i >= 5; i--) {
    for (var j = 0; j <= 24; j += 8) {
      outL <<= 1;
      outL |= (inR >> (j + i)) & 1;
    }
    for (var j = 0; j <= 24; j += 8) {
      outL <<= 1;
      outL |= (inL >> (j + i)) & 1;
    }
  }
  for (var j = 0; j <= 24; j += 8) {
    outL <<= 1;
    outL |= (inR >> (j + i)) & 1;
  }

  // 1, 9, 17, 25, 33, 41, 49, 57
  // 2, 10, 18, 26, 34, 42, 50, 58
  // 3, 11, 19, 27, 35, 43, 51, 59
  // 36, 44, 52, 60
  for (var i = 1; i <= 3; i++) {
    for (var j = 0; j <= 24; j += 8) {
      outR <<= 1;
      outR |= (inR >> (j + i)) & 1;
    }
    for (var j = 0; j <= 24; j += 8) {
      outR <<= 1;
      outR |= (inL >> (j + i)) & 1;
    }
  }
  for (var j = 0; j <= 24; j += 8) {
    outR <<= 1;
    outR |= (inL >> (j + i)) & 1;
  }

  out[off + 0] = outL >>> 0;
  out[off + 1] = outR >>> 0;
};

exports.r28shl = function r28shl(num, shift) {
  return ((num << shift) & 0xfffffff) | (num >>> (28 - shift));
};

var pc2table = [
  // inL => outL
  14, 11, 17, 4, 27, 23, 25, 0,
  13, 22, 7, 18, 5, 9, 16, 24,
  2, 20, 12, 21, 1, 8, 15, 26,

  // inR => outR
  15, 4, 25, 19, 9, 1, 26, 16,
  5, 11, 23, 8, 12, 7, 17, 0,
  22, 3, 10, 14, 6, 20, 27, 24
];

exports.pc2 = function pc2(inL, inR, out, off) {
  var outL = 0;
  var outR = 0;

  var len = pc2table.length >>> 1;
  for (var i = 0; i < len; i++) {
    outL <<= 1;
    outL |= (inL >>> pc2table[i]) & 0x1;
  }
  for (var i = len; i < pc2table.length; i++) {
    outR <<= 1;
    outR |= (inR >>> pc2table[i]) & 0x1;
  }

  out[off + 0] = outL >>> 0;
  out[off + 1] = outR >>> 0;
};

exports.expand = function expand(r, out, off) {
  var outL = 0;
  var outR = 0;

  outL = ((r & 1) << 5) | (r >>> 27);
  for (var i = 23; i >= 15; i -= 4) {
    outL <<= 6;
    outL |= (r >>> i) & 0x3f;
  }
  for (var i = 11; i >= 3; i -= 4) {
    outR |= (r >>> i) & 0x3f;
    outR <<= 6;
  }
  outR |= ((r & 0x1f) << 1) | (r >>> 31);

  out[off + 0] = outL >>> 0;
  out[off + 1] = outR >>> 0;
};

var sTable = [
  14, 0, 4, 15, 13, 7, 1, 4, 2, 14, 15, 2, 11, 13, 8, 1,
  3, 10, 10, 6, 6, 12, 12, 11, 5, 9, 9, 5, 0, 3, 7, 8,
  4, 15, 1, 12, 14, 8, 8, 2, 13, 4, 6, 9, 2, 1, 11, 7,
  15, 5, 12, 11, 9, 3, 7, 14, 3, 10, 10, 0, 5, 6, 0, 13,

  15, 3, 1, 13, 8, 4, 14, 7, 6, 15, 11, 2, 3, 8, 4, 14,
  9, 12, 7, 0, 2, 1, 13, 10, 12, 6, 0, 9, 5, 11, 10, 5,
  0, 13, 14, 8, 7, 10, 11, 1, 10, 3, 4, 15, 13, 4, 1, 2,
  5, 11, 8, 6, 12, 7, 6, 12, 9, 0, 3, 5, 2, 14, 15, 9,

  10, 13, 0, 7, 9, 0, 14, 9, 6, 3, 3, 4, 15, 6, 5, 10,
  1, 2, 13, 8, 12, 5, 7, 14, 11, 12, 4, 11, 2, 15, 8, 1,
  13, 1, 6, 10, 4, 13, 9, 0, 8, 6, 15, 9, 3, 8, 0, 7,
  11, 4, 1, 15, 2, 14, 12, 3, 5, 11, 10, 5, 14, 2, 7, 12,

  7, 13, 13, 8, 14, 11, 3, 5, 0, 6, 6, 15, 9, 0, 10, 3,
  1, 4, 2, 7, 8, 2, 5, 12, 11, 1, 12, 10, 4, 14, 15, 9,
  10, 3, 6, 15, 9, 0, 0, 6, 12, 10, 11, 1, 7, 13, 13, 8,
  15, 9, 1, 4, 3, 5, 14, 11, 5, 12, 2, 7, 8, 2, 4, 14,

  2, 14, 12, 11, 4, 2, 1, 12, 7, 4, 10, 7, 11, 13, 6, 1,
  8, 5, 5, 0, 3, 15, 15, 10, 13, 3, 0, 9, 14, 8, 9, 6,
  4, 11, 2, 8, 1, 12, 11, 7, 10, 1, 13, 14, 7, 2, 8, 13,
  15, 6, 9, 15, 12, 0, 5, 9, 6, 10, 3, 4, 0, 5, 14, 3,

  12, 10, 1, 15, 10, 4, 15, 2, 9, 7, 2, 12, 6, 9, 8, 5,
  0, 6, 13, 1, 3, 13, 4, 14, 14, 0, 7, 11, 5, 3, 11, 8,
  9, 4, 14, 3, 15, 2, 5, 12, 2, 9, 8, 5, 12, 15, 3, 10,
  7, 11, 0, 14, 4, 1, 10, 7, 1, 6, 13, 0, 11, 8, 6, 13,

  4, 13, 11, 0, 2, 11, 14, 7, 15, 4, 0, 9, 8, 1, 13, 10,
  3, 14, 12, 3, 9, 5, 7, 12, 5, 2, 10, 15, 6, 8, 1, 6,
  1, 6, 4, 11, 11, 13, 13, 8, 12, 1, 3, 4, 7, 10, 14, 7,
  10, 9, 15, 5, 6, 0, 8, 15, 0, 14, 5, 2, 9, 3, 2, 12,

  13, 1, 2, 15, 8, 13, 4, 8, 6, 10, 15, 3, 11, 7, 1, 4,
  10, 12, 9, 5, 3, 6, 14, 11, 5, 0, 0, 14, 12, 9, 7, 2,
  7, 2, 11, 1, 4, 14, 1, 7, 9, 4, 12, 10, 14, 8, 2, 13,
  0, 15, 6, 12, 10, 9, 13, 0, 15, 3, 3, 5, 5, 6, 8, 11
];

exports.substitute = function substitute(inL, inR) {
  var out = 0;
  for (var i = 0; i < 4; i++) {
    var b = (inL >>> (18 - i * 6)) & 0x3f;
    var sb = sTable[i * 0x40 + b];

    out <<= 4;
    out |= sb;
  }
  for (var i = 0; i < 4; i++) {
    var b = (inR >>> (18 - i * 6)) & 0x3f;
    var sb = sTable[4 * 0x40 + i * 0x40 + b];

    out <<= 4;
    out |= sb;
  }
  return out >>> 0;
};

var permuteTable = [
  16, 25, 12, 11, 3, 20, 4, 15, 31, 17, 9, 6, 27, 14, 1, 22,
  30, 24, 8, 18, 0, 5, 29, 23, 13, 19, 2, 26, 10, 21, 28, 7
];

exports.permute = function permute(num) {
  var out = 0;
  for (var i = 0; i < permuteTable.length; i++) {
    out <<= 1;
    out |= (num >>> permuteTable[i]) & 0x1;
  }
  return out >>> 0;
};

exports.padSplit = function padSplit(num, size, group) {
  var str = num.toString(2);
  while (str.length < size)
    str = '0' + str;

  var out = [];
  for (var i = 0; i < size; i += group)
    out.push(str.slice(i, i + group));
  return out.join(' ');
};


/***/ }),

/***/ 2075:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assert = __webpack_require__(563);

function Cipher(options) {
  this.options = options;

  this.type = this.options.type;
  this.blockSize = 8;
  this._init();

  this.buffer = new Array(this.blockSize);
  this.bufferOff = 0;
}
module.exports = Cipher;

Cipher.prototype._init = function _init() {
  // Might be overrided
};

Cipher.prototype.update = function update(data) {
  if (data.length === 0)
    return [];

  if (this.type === 'decrypt')
    return this._updateDecrypt(data);
  else
    return this._updateEncrypt(data);
};

Cipher.prototype._buffer = function _buffer(data, off) {
  // Append data to buffer
  var min = Math.min(this.buffer.length - this.bufferOff, data.length - off);
  for (var i = 0; i < min; i++)
    this.buffer[this.bufferOff + i] = data[off + i];
  this.bufferOff += min;

  // Shift next
  return min;
};

Cipher.prototype._flushBuffer = function _flushBuffer(out, off) {
  this._update(this.buffer, 0, out, off);
  this.bufferOff = 0;
  return this.blockSize;
};

Cipher.prototype._updateEncrypt = function _updateEncrypt(data) {
  var inputOff = 0;
  var outputOff = 0;

  var count = ((this.bufferOff + data.length) / this.blockSize) | 0;
  var out = new Array(count * this.blockSize);

  if (this.bufferOff !== 0) {
    inputOff += this._buffer(data, inputOff);

    if (this.bufferOff === this.buffer.length)
      outputOff += this._flushBuffer(out, outputOff);
  }

  // Write blocks
  var max = data.length - ((data.length - inputOff) % this.blockSize);
  for (; inputOff < max; inputOff += this.blockSize) {
    this._update(data, inputOff, out, outputOff);
    outputOff += this.blockSize;
  }

  // Queue rest
  for (; inputOff < data.length; inputOff++, this.bufferOff++)
    this.buffer[this.bufferOff] = data[inputOff];

  return out;
};

Cipher.prototype._updateDecrypt = function _updateDecrypt(data) {
  var inputOff = 0;
  var outputOff = 0;

  var count = Math.ceil((this.bufferOff + data.length) / this.blockSize) - 1;
  var out = new Array(count * this.blockSize);

  // TODO(indutny): optimize it, this is far from optimal
  for (; count > 0; count--) {
    inputOff += this._buffer(data, inputOff);
    outputOff += this._flushBuffer(out, outputOff);
  }

  // Buffer rest of the input
  inputOff += this._buffer(data, inputOff);

  return out;
};

Cipher.prototype.final = function final(buffer) {
  var first;
  if (buffer)
    first = this.update(buffer);

  var last;
  if (this.type === 'encrypt')
    last = this._finalEncrypt();
  else
    last = this._finalDecrypt();

  if (first)
    return first.concat(last);
  else
    return last;
};

Cipher.prototype._pad = function _pad(buffer, off) {
  if (off === 0)
    return false;

  while (off < buffer.length)
    buffer[off++] = 0;

  return true;
};

Cipher.prototype._finalEncrypt = function _finalEncrypt() {
  if (!this._pad(this.buffer, this.bufferOff))
    return [];

  var out = new Array(this.blockSize);
  this._update(this.buffer, 0, out, 0);
  return out;
};

Cipher.prototype._unpad = function _unpad(buffer) {
  return buffer;
};

Cipher.prototype._finalDecrypt = function _finalDecrypt() {
  assert.equal(this.bufferOff, this.blockSize, 'Not enough data to decrypt');
  var out = new Array(this.blockSize);
  this._flushBuffer(out, 0);

  return this._unpad(out);
};


/***/ }),

/***/ 2076:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assert = __webpack_require__(563);
var inherits = __webpack_require__(485);

var des = __webpack_require__(987);
var utils = des.utils;
var Cipher = des.Cipher;

function DESState() {
  this.tmp = new Array(2);
  this.keys = null;
}

function DES(options) {
  Cipher.call(this, options);

  var state = new DESState();
  this._desState = state;

  this.deriveKeys(state, options.key);
}
inherits(DES, Cipher);
module.exports = DES;

DES.create = function create(options) {
  return new DES(options);
};

var shiftTable = [
  1, 1, 2, 2, 2, 2, 2, 2,
  1, 2, 2, 2, 2, 2, 2, 1
];

DES.prototype.deriveKeys = function deriveKeys(state, key) {
  state.keys = new Array(16 * 2);

  assert.equal(key.length, this.blockSize, 'Invalid key length');

  var kL = utils.readUInt32BE(key, 0);
  var kR = utils.readUInt32BE(key, 4);

  utils.pc1(kL, kR, state.tmp, 0);
  kL = state.tmp[0];
  kR = state.tmp[1];
  for (var i = 0; i < state.keys.length; i += 2) {
    var shift = shiftTable[i >>> 1];
    kL = utils.r28shl(kL, shift);
    kR = utils.r28shl(kR, shift);
    utils.pc2(kL, kR, state.keys, i);
  }
};

DES.prototype._update = function _update(inp, inOff, out, outOff) {
  var state = this._desState;

  var l = utils.readUInt32BE(inp, inOff);
  var r = utils.readUInt32BE(inp, inOff + 4);

  // Initial Permutation
  utils.ip(l, r, state.tmp, 0);
  l = state.tmp[0];
  r = state.tmp[1];

  if (this.type === 'encrypt')
    this._encrypt(state, l, r, state.tmp, 0);
  else
    this._decrypt(state, l, r, state.tmp, 0);

  l = state.tmp[0];
  r = state.tmp[1];

  utils.writeUInt32BE(out, l, outOff);
  utils.writeUInt32BE(out, r, outOff + 4);
};

DES.prototype._pad = function _pad(buffer, off) {
  var value = buffer.length - off;
  for (var i = off; i < buffer.length; i++)
    buffer[i] = value;

  return true;
};

DES.prototype._unpad = function _unpad(buffer) {
  var pad = buffer[buffer.length - 1];
  for (var i = buffer.length - pad; i < buffer.length; i++)
    assert.equal(buffer[i], pad);

  return buffer.slice(0, buffer.length - pad);
};

DES.prototype._encrypt = function _encrypt(state, lStart, rStart, out, off) {
  var l = lStart;
  var r = rStart;

  // Apply f() x16 times
  for (var i = 0; i < state.keys.length; i += 2) {
    var keyL = state.keys[i];
    var keyR = state.keys[i + 1];

    // f(r, k)
    utils.expand(r, state.tmp, 0);

    keyL ^= state.tmp[0];
    keyR ^= state.tmp[1];
    var s = utils.substitute(keyL, keyR);
    var f = utils.permute(s);

    var t = r;
    r = (l ^ f) >>> 0;
    l = t;
  }

  // Reverse Initial Permutation
  utils.rip(r, l, out, off);
};

DES.prototype._decrypt = function _decrypt(state, lStart, rStart, out, off) {
  var l = rStart;
  var r = lStart;

  // Apply f() x16 times
  for (var i = state.keys.length - 2; i >= 0; i -= 2) {
    var keyL = state.keys[i];
    var keyR = state.keys[i + 1];

    // f(r, k)
    utils.expand(l, state.tmp, 0);

    keyL ^= state.tmp[0];
    keyR ^= state.tmp[1];
    var s = utils.substitute(keyL, keyR);
    var f = utils.permute(s);

    var t = l;
    l = (r ^ f) >>> 0;
    r = t;
  }

  // Reverse Initial Permutation
  utils.rip(l, r, out, off);
};


/***/ }),

/***/ 2077:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assert = __webpack_require__(563);
var inherits = __webpack_require__(485);

var proto = {};

function CBCState(iv) {
  assert.equal(iv.length, 8, 'Invalid IV length');

  this.iv = new Array(8);
  for (var i = 0; i < this.iv.length; i++)
    this.iv[i] = iv[i];
}

function instantiate(Base) {
  function CBC(options) {
    Base.call(this, options);
    this._cbcInit();
  }
  inherits(CBC, Base);

  var keys = Object.keys(proto);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    CBC.prototype[key] = proto[key];
  }

  CBC.create = function create(options) {
    return new CBC(options);
  };

  return CBC;
}

exports.instantiate = instantiate;

proto._cbcInit = function _cbcInit() {
  var state = new CBCState(this.options.iv);
  this._cbcState = state;
};

proto._update = function _update(inp, inOff, out, outOff) {
  var state = this._cbcState;
  var superProto = this.constructor.super_.prototype;

  var iv = state.iv;
  if (this.type === 'encrypt') {
    for (var i = 0; i < this.blockSize; i++)
      iv[i] ^= inp[inOff + i];

    superProto._update.call(this, iv, 0, out, outOff);

    for (var i = 0; i < this.blockSize; i++)
      iv[i] = out[outOff + i];
  } else {
    superProto._update.call(this, inp, inOff, out, outOff);

    for (var i = 0; i < this.blockSize; i++)
      out[outOff + i] ^= iv[i];

    for (var i = 0; i < this.blockSize; i++)
      iv[i] = inp[inOff + i];
  }
};


/***/ }),

/***/ 2078:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assert = __webpack_require__(563);
var inherits = __webpack_require__(485);

var des = __webpack_require__(987);
var Cipher = des.Cipher;
var DES = des.DES;

function EDEState(type, key) {
  assert.equal(key.length, 24, 'Invalid key length');

  var k1 = key.slice(0, 8);
  var k2 = key.slice(8, 16);
  var k3 = key.slice(16, 24);

  if (type === 'encrypt') {
    this.ciphers = [
      DES.create({ type: 'encrypt', key: k1 }),
      DES.create({ type: 'decrypt', key: k2 }),
      DES.create({ type: 'encrypt', key: k3 })
    ];
  } else {
    this.ciphers = [
      DES.create({ type: 'decrypt', key: k3 }),
      DES.create({ type: 'encrypt', key: k2 }),
      DES.create({ type: 'decrypt', key: k1 })
    ];
  }
}

function EDE(options) {
  Cipher.call(this, options);

  var state = new EDEState(this.type, this.options.key);
  this._edeState = state;
}
inherits(EDE, Cipher);

module.exports = EDE;

EDE.create = function create(options) {
  return new EDE(options);
};

EDE.prototype._update = function _update(inp, inOff, out, outOff) {
  var state = this._edeState;

  state.ciphers[0]._update(inp, inOff, out, outOff);
  state.ciphers[1]._update(out, outOff, out, outOff);
  state.ciphers[2]._update(out, outOff, out, outOff);
};

EDE.prototype._pad = DES.prototype._pad;
EDE.prototype._unpad = DES.prototype._unpad;


/***/ }),

/***/ 2079:
/***/ (function(module, exports) {

exports['des-ecb'] = {
  key: 8,
  iv: 0
}
exports['des-cbc'] = exports.des = {
  key: 8,
  iv: 8
}
exports['des-ede3-cbc'] = exports.des3 = {
  key: 24,
  iv: 8
}
exports['des-ede3'] = {
  key: 24,
  iv: 0
}
exports['des-ede-cbc'] = {
  key: 16,
  iv: 8
}
exports['des-ede'] = {
  key: 16,
  iv: 0
}


/***/ }),

/***/ 2080:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var generatePrime = __webpack_require__(1963)
var primes = __webpack_require__(2082)

var DH = __webpack_require__(2083)

function getDiffieHellman (mod) {
  var prime = new Buffer(primes[mod].prime, 'hex')
  var gen = new Buffer(primes[mod].gen, 'hex')

  return new DH(prime, gen)
}

var ENCODINGS = {
  'binary': true, 'hex': true, 'base64': true
}

function createDiffieHellman (prime, enc, generator, genc) {
  if (Buffer.isBuffer(enc) || ENCODINGS[enc] === undefined) {
    return createDiffieHellman(prime, 'binary', enc, generator)
  }

  enc = enc || 'binary'
  genc = genc || 'binary'
  generator = generator || new Buffer([2])

  if (!Buffer.isBuffer(generator)) {
    generator = new Buffer(generator, genc)
  }

  if (typeof prime === 'number') {
    return new DH(generatePrime(prime, generator), generator, true)
  }

  if (!Buffer.isBuffer(prime)) {
    prime = new Buffer(prime, enc)
  }

  return new DH(prime, generator, true)
}

exports.DiffieHellmanGroup = exports.createDiffieHellmanGroup = exports.getDiffieHellman = getDiffieHellman
exports.createDiffieHellman = exports.DiffieHellman = createDiffieHellman

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 2081:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2082:
/***/ (function(module, exports) {

module.exports = {"modp1":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a63a3620ffffffffffffffff"},"modp2":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece65381ffffffffffffffff"},"modp5":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca237327ffffffffffffffff"},"modp14":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aacaa68ffffffffffffffff"},"modp15":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a93ad2caffffffffffffffff"},"modp16":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c934063199ffffffffffffffff"},"modp17":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dcc4024ffffffffffffffff"},"modp18":{"gen":"02","prime":"ffffffffffffffffc90fdaa22168c234c4c6628b80dc1cd129024e088a67cc74020bbea63b139b22514a08798e3404ddef9519b3cd3a431b302b0a6df25f14374fe1356d6d51c245e485b576625e7ec6f44c42e9a637ed6b0bff5cb6f406b7edee386bfb5a899fa5ae9f24117c4b1fe649286651ece45b3dc2007cb8a163bf0598da48361c55d39a69163fa8fd24cf5f83655d23dca3ad961c62f356208552bb9ed529077096966d670c354e4abc9804f1746c08ca18217c32905e462e36ce3be39e772c180e86039b2783a2ec07a28fb5c55df06f4c52c9de2bcbf6955817183995497cea956ae515d2261898fa051015728e5a8aaac42dad33170d04507a33a85521abdf1cba64ecfb850458dbef0a8aea71575d060c7db3970f85a6e1e4c7abf5ae8cdb0933d71e8c94e04a25619dcee3d2261ad2ee6bf12ffa06d98a0864d87602733ec86a64521f2b18177b200cbbe117577a615d6c770988c0bad946e208e24fa074e5ab3143db5bfce0fd108e4b82d120a92108011a723c12a787e6d788719a10bdba5b2699c327186af4e23c1a946834b6150bda2583e9ca2ad44ce8dbbbc2db04de8ef92e8efc141fbecaa6287c59474e6bc05d99b2964fa090c3a2233ba186515be7ed1f612970cee2d7afb81bdd762170481cd0069127d5b05aa993b4ea988d8fddc186ffb7dc90a6c08f4df435c93402849236c3fab4d27c7026c1d4dcb2602646dec9751e763dba37bdf8ff9406ad9e530ee5db382f413001aeb06a53ed9027d831179727b0865a8918da3edbebcf9b14ed44ce6cbaced4bb1bdb7f1447e6cc254b332051512bd7af426fb8f401378cd2bf5983ca01c64b92ecf032ea15d1721d03f482d7ce6e74fef6d55e702f46980c82b5a84031900b1c9e59e7c97fbec7e8f323a97a7e36cc88be0f1d45b7ff585ac54bd407b22b4154aacc8f6d7ebf48e1d814cc5ed20f8037e0a79715eef29be32806a1d58bb7c5da76f550aa3d8a1fbff0eb19ccb1a313d55cda56c9ec2ef29632387fe8d76e3c0468043e8f663f4860ee12bf2d5b0b7474d6e694f91e6dbe115974a3926f12fee5e438777cb6a932df8cd8bec4d073b931ba3bc832b68d9dd300741fa7bf8afc47ed2576f6936ba424663aab639c5ae4f5683423b4742bf1c978238f16cbe39d652de3fdb8befc848ad922222e04a4037c0713eb57a81a23f0c73473fc646cea306b4bcbc8862f8385ddfa9d4b7fa2c087e879683303ed5bdd3a062b3cf5b3a278a66d2a13f83f44f82ddf310ee074ab6a364597e899a0255dc164f31cc50846851df9ab48195ded7ea1b1d510bd7ee74d73faf36bc31ecfa268359046f4eb879f924009438b481c6cd7889a002ed5ee382bc9190da6fc026e479558e4475677e9aa9e3050e2765694dfc81f56e880b96e7160c980dd98edd3dfffffffffffffffff"}}

/***/ }),

/***/ 2083:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var BN = __webpack_require__(514);
var MillerRabin = __webpack_require__(1964);
var millerRabin = new MillerRabin();
var TWENTYFOUR = new BN(24);
var ELEVEN = new BN(11);
var TEN = new BN(10);
var THREE = new BN(3);
var SEVEN = new BN(7);
var primes = __webpack_require__(1963);
var randomBytes = __webpack_require__(748);
module.exports = DH;

function setPublicKey(pub, enc) {
  enc = enc || 'utf8';
  if (!Buffer.isBuffer(pub)) {
    pub = new Buffer(pub, enc);
  }
  this._pub = new BN(pub);
  return this;
}

function setPrivateKey(priv, enc) {
  enc = enc || 'utf8';
  if (!Buffer.isBuffer(priv)) {
    priv = new Buffer(priv, enc);
  }
  this._priv = new BN(priv);
  return this;
}

var primeCache = {};
function checkPrime(prime, generator) {
  var gen = generator.toString('hex');
  var hex = [gen, prime.toString(16)].join('_');
  if (hex in primeCache) {
    return primeCache[hex];
  }
  var error = 0;

  if (prime.isEven() ||
    !primes.simpleSieve ||
    !primes.fermatTest(prime) ||
    !millerRabin.test(prime)) {
    //not a prime so +1
    error += 1;

    if (gen === '02' || gen === '05') {
      // we'd be able to check the generator
      // it would fail so +8
      error += 8;
    } else {
      //we wouldn't be able to test the generator
      // so +4
      error += 4;
    }
    primeCache[hex] = error;
    return error;
  }
  if (!millerRabin.test(prime.shrn(1))) {
    //not a safe prime
    error += 2;
  }
  var rem;
  switch (gen) {
    case '02':
      if (prime.mod(TWENTYFOUR).cmp(ELEVEN)) {
        // unsuidable generator
        error += 8;
      }
      break;
    case '05':
      rem = prime.mod(TEN);
      if (rem.cmp(THREE) && rem.cmp(SEVEN)) {
        // prime mod 10 needs to equal 3 or 7
        error += 8;
      }
      break;
    default:
      error += 4;
  }
  primeCache[hex] = error;
  return error;
}

function DH(prime, generator, malleable) {
  this.setGenerator(generator);
  this.__prime = new BN(prime);
  this._prime = BN.mont(this.__prime);
  this._primeLen = prime.length;
  this._pub = undefined;
  this._priv = undefined;
  this._primeCode = undefined;
  if (malleable) {
    this.setPublicKey = setPublicKey;
    this.setPrivateKey = setPrivateKey;
  } else {
    this._primeCode = 8;
  }
}
Object.defineProperty(DH.prototype, 'verifyError', {
  enumerable: true,
  get: function () {
    if (typeof this._primeCode !== 'number') {
      this._primeCode = checkPrime(this.__prime, this.__gen);
    }
    return this._primeCode;
  }
});
DH.prototype.generateKeys = function () {
  if (!this._priv) {
    this._priv = new BN(randomBytes(this._primeLen));
  }
  this._pub = this._gen.toRed(this._prime).redPow(this._priv).fromRed();
  return this.getPublicKey();
};

DH.prototype.computeSecret = function (other) {
  other = new BN(other);
  other = other.toRed(this._prime);
  var secret = other.redPow(this._priv).fromRed();
  var out = new Buffer(secret.toArray());
  var prime = this.getPrime();
  if (out.length < prime.length) {
    var front = new Buffer(prime.length - out.length);
    front.fill(0);
    out = Buffer.concat([front, out]);
  }
  return out;
};

DH.prototype.getPublicKey = function getPublicKey(enc) {
  return formatReturnValue(this._pub, enc);
};

DH.prototype.getPrivateKey = function getPrivateKey(enc) {
  return formatReturnValue(this._priv, enc);
};

DH.prototype.getPrime = function (enc) {
  return formatReturnValue(this.__prime, enc);
};

DH.prototype.getGenerator = function (enc) {
  return formatReturnValue(this._gen, enc);
};

DH.prototype.setGenerator = function (gen, enc) {
  enc = enc || 'utf8';
  if (!Buffer.isBuffer(gen)) {
    gen = new Buffer(gen, enc);
  }
  this.__gen = gen;
  this._gen = new BN(gen);
  return this;
};

function formatReturnValue(bn, enc) {
  var buf = new Buffer(bn.toArray());
  if (!enc) {
    return buf;
  } else {
    return buf.toString(enc);
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 2084:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var createHash = __webpack_require__(749)
var stream = __webpack_require__(980)
var inherits = __webpack_require__(485)
var sign = __webpack_require__(2085)
var verify = __webpack_require__(2121)

var algorithms = __webpack_require__(1950)
Object.keys(algorithms).forEach(function (key) {
  algorithms[key].id = new Buffer(algorithms[key].id, 'hex')
  algorithms[key.toLowerCase()] = algorithms[key]
})

function Sign (algorithm) {
  stream.Writable.call(this)

  var data = algorithms[algorithm]
  if (!data) throw new Error('Unknown message digest')

  this._hashType = data.hash
  this._hash = createHash(data.hash)
  this._tag = data.id
  this._signType = data.sign
}
inherits(Sign, stream.Writable)

Sign.prototype._write = function _write (data, _, done) {
  this._hash.update(data)
  done()
}

Sign.prototype.update = function update (data, enc) {
  if (typeof data === 'string') data = new Buffer(data, enc)

  this._hash.update(data)
  return this
}

Sign.prototype.sign = function signMethod (key, enc) {
  this.end()
  var hash = this._hash.digest()
  var sig = sign(hash, key, this._hashType, this._signType, this._tag)

  return enc ? sig.toString(enc) : sig
}

function Verify (algorithm) {
  stream.Writable.call(this)

  var data = algorithms[algorithm]
  if (!data) throw new Error('Unknown message digest')

  this._hash = createHash(data.hash)
  this._tag = data.id
  this._signType = data.sign
}
inherits(Verify, stream.Writable)

Verify.prototype._write = function _write (data, _, done) {
  this._hash.update(data)
  done()
}

Verify.prototype.update = function update (data, enc) {
  if (typeof data === 'string') data = new Buffer(data, enc)

  this._hash.update(data)
  return this
}

Verify.prototype.verify = function verifyMethod (key, sig, enc) {
  if (typeof sig === 'string') sig = new Buffer(sig, enc)

  this.end()
  var hash = this._hash.digest()
  return verify(sig, hash, key, this._signType, this._tag)
}

function createSign (algorithm) {
  return new Sign(algorithm)
}

function createVerify (algorithm) {
  return new Verify(algorithm)
}

module.exports = {
  Sign: createSign,
  Verify: createVerify,
  createSign: createSign,
  createVerify: createVerify
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 2085:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// much of this based on https://github.com/indutny/self-signed/blob/gh-pages/lib/rsa.js
var createHmac = __webpack_require__(1949)
var crt = __webpack_require__(988)
var EC = __webpack_require__(538).ec
var BN = __webpack_require__(514)
var parseKeys = __webpack_require__(784)
var curves = __webpack_require__(1974)

function sign (hash, key, hashType, signType, tag) {
  var priv = parseKeys(key)
  if (priv.curve) {
    // rsa keys can be interpreted as ecdsa ones in openssl
    if (signType !== 'ecdsa' && signType !== 'ecdsa/rsa') throw new Error('wrong private key type')
    return ecSign(hash, priv)
  } else if (priv.type === 'dsa') {
    if (signType !== 'dsa') throw new Error('wrong private key type')
    return dsaSign(hash, priv, hashType)
  } else {
    if (signType !== 'rsa' && signType !== 'ecdsa/rsa') throw new Error('wrong private key type')
  }
  hash = Buffer.concat([tag, hash])
  var len = priv.modulus.byteLength()
  var pad = [ 0, 1 ]
  while (hash.length + pad.length + 1 < len) pad.push(0xff)
  pad.push(0x00)
  var i = -1
  while (++i < hash.length) pad.push(hash[i])

  var out = crt(pad, priv)
  return out
}

function ecSign (hash, priv) {
  var curveId = curves[priv.curve.join('.')]
  if (!curveId) throw new Error('unknown curve ' + priv.curve.join('.'))

  var curve = new EC(curveId)
  var key = curve.keyFromPrivate(priv.privateKey)
  var out = key.sign(hash)

  return new Buffer(out.toDER())
}

function dsaSign (hash, priv, algo) {
  var x = priv.params.priv_key
  var p = priv.params.p
  var q = priv.params.q
  var g = priv.params.g
  var r = new BN(0)
  var k
  var H = bits2int(hash, q).mod(q)
  var s = false
  var kv = getKey(x, q, hash, algo)
  while (s === false) {
    k = makeKey(q, kv, algo)
    r = makeR(g, k, p, q)
    s = k.invm(q).imul(H.add(x.mul(r))).mod(q)
    if (s.cmpn(0) === 0) {
      s = false
      r = new BN(0)
    }
  }
  return toDER(r, s)
}

function toDER (r, s) {
  r = r.toArray()
  s = s.toArray()

  // Pad values
  if (r[0] & 0x80) r = [ 0 ].concat(r)
  if (s[0] & 0x80) s = [ 0 ].concat(s)

  var total = r.length + s.length + 4
  var res = [ 0x30, total, 0x02, r.length ]
  res = res.concat(r, [ 0x02, s.length ], s)
  return new Buffer(res)
}

function getKey (x, q, hash, algo) {
  x = new Buffer(x.toArray())
  if (x.length < q.byteLength()) {
    var zeros = new Buffer(q.byteLength() - x.length)
    zeros.fill(0)
    x = Buffer.concat([ zeros, x ])
  }
  var hlen = hash.length
  var hbits = bits2octets(hash, q)
  var v = new Buffer(hlen)
  v.fill(1)
  var k = new Buffer(hlen)
  k.fill(0)
  k = createHmac(algo, k).update(v).update(new Buffer([ 0 ])).update(x).update(hbits).digest()
  v = createHmac(algo, k).update(v).digest()
  k = createHmac(algo, k).update(v).update(new Buffer([ 1 ])).update(x).update(hbits).digest()
  v = createHmac(algo, k).update(v).digest()
  return { k: k, v: v }
}

function bits2int (obits, q) {
  var bits = new BN(obits)
  var shift = (obits.length << 3) - q.bitLength()
  if (shift > 0) bits.ishrn(shift)
  return bits
}

function bits2octets (bits, q) {
  bits = bits2int(bits, q)
  bits = bits.mod(q)
  var out = new Buffer(bits.toArray())
  if (out.length < q.byteLength()) {
    var zeros = new Buffer(q.byteLength() - out.length)
    zeros.fill(0)
    out = Buffer.concat([ zeros, out ])
  }
  return out
}

function makeKey (q, kv, algo) {
  var t
  var k

  do {
    t = new Buffer(0)

    while (t.length * 8 < q.bitLength()) {
      kv.v = createHmac(algo, kv.k).update(kv.v).digest()
      t = Buffer.concat([ t, kv.v ])
    }

    k = bits2int(t, q)
    kv.k = createHmac(algo, kv.k).update(kv.v).update(new Buffer([ 0 ])).digest()
    kv.v = createHmac(algo, kv.k).update(kv.v).digest()
  } while (k.cmp(q) !== -1)

  return k
}

function makeR (g, k, p, q) {
  return g.toRed(BN.mont(p)).redPow(k).fromRed().mod(q)
}

module.exports = sign
module.exports.getKey = getKey
module.exports.makeKey = makeKey

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 2086:
/***/ (function(module, exports) {

module.exports = {"name":"elliptic","version":"6.4.0","description":"EC cryptography","main":"lib/elliptic.js","files":["lib"],"scripts":{"jscs":"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js","jshint":"jscs benchmarks/*.js lib/*.js lib/**/*.js lib/**/**/*.js test/index.js","lint":"npm run jscs && npm run jshint","unit":"istanbul test _mocha --reporter=spec test/index.js","test":"npm run lint && npm run unit","version":"grunt dist && git add dist/"},"repository":{"type":"git","url":"git@github.com:indutny/elliptic"},"keywords":["EC","Elliptic","curve","Cryptography"],"author":"Fedor Indutny <fedor@indutny.com>","license":"MIT","bugs":{"url":"https://github.com/indutny/elliptic/issues"},"homepage":"https://github.com/indutny/elliptic","devDependencies":{"brfs":"^1.4.3","coveralls":"^2.11.3","grunt":"^0.4.5","grunt-browserify":"^5.0.0","grunt-cli":"^1.2.0","grunt-contrib-connect":"^1.0.0","grunt-contrib-copy":"^1.0.0","grunt-contrib-uglify":"^1.0.1","grunt-mocha-istanbul":"^3.0.1","grunt-saucelabs":"^8.6.2","istanbul":"^0.4.2","jscs":"^2.9.0","jshint":"^2.6.0","mocha":"^2.1.0"},"dependencies":{"bn.js":"^4.4.0","brorand":"^1.0.1","hash.js":"^1.0.0","hmac-drbg":"^1.0.0","inherits":"^2.0.1","minimalistic-assert":"^1.0.0","minimalistic-crypto-utils":"^1.0.0"}}

/***/ }),

/***/ 2087:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = exports;
var BN = __webpack_require__(514);
var minAssert = __webpack_require__(563);
var minUtils = __webpack_require__(1966);

utils.assert = minAssert;
utils.toArray = minUtils.toArray;
utils.zero2 = minUtils.zero2;
utils.toHex = minUtils.toHex;
utils.encode = minUtils.encode;

// Represent num in a w-NAF form
function getNAF(num, w) {
  var naf = [];
  var ws = 1 << (w + 1);
  var k = num.clone();
  while (k.cmpn(1) >= 0) {
    var z;
    if (k.isOdd()) {
      var mod = k.andln(ws - 1);
      if (mod > (ws >> 1) - 1)
        z = (ws >> 1) - mod;
      else
        z = mod;
      k.isubn(z);
    } else {
      z = 0;
    }
    naf.push(z);

    // Optimization, shift by word if possible
    var shift = (k.cmpn(0) !== 0 && k.andln(ws - 1) === 0) ? (w + 1) : 1;
    for (var i = 1; i < shift; i++)
      naf.push(0);
    k.iushrn(shift);
  }

  return naf;
}
utils.getNAF = getNAF;

// Represent k1, k2 in a Joint Sparse Form
function getJSF(k1, k2) {
  var jsf = [
    [],
    []
  ];

  k1 = k1.clone();
  k2 = k2.clone();
  var d1 = 0;
  var d2 = 0;
  while (k1.cmpn(-d1) > 0 || k2.cmpn(-d2) > 0) {

    // First phase
    var m14 = (k1.andln(3) + d1) & 3;
    var m24 = (k2.andln(3) + d2) & 3;
    if (m14 === 3)
      m14 = -1;
    if (m24 === 3)
      m24 = -1;
    var u1;
    if ((m14 & 1) === 0) {
      u1 = 0;
    } else {
      var m8 = (k1.andln(7) + d1) & 7;
      if ((m8 === 3 || m8 === 5) && m24 === 2)
        u1 = -m14;
      else
        u1 = m14;
    }
    jsf[0].push(u1);

    var u2;
    if ((m24 & 1) === 0) {
      u2 = 0;
    } else {
      var m8 = (k2.andln(7) + d2) & 7;
      if ((m8 === 3 || m8 === 5) && m14 === 2)
        u2 = -m24;
      else
        u2 = m24;
    }
    jsf[1].push(u2);

    // Second phase
    if (2 * d1 === u1 + 1)
      d1 = 1 - d1;
    if (2 * d2 === u2 + 1)
      d2 = 1 - d2;
    k1.iushrn(1);
    k2.iushrn(1);
  }

  return jsf;
}
utils.getJSF = getJSF;

function cachedProperty(obj, name, computer) {
  var key = '_' + name;
  obj.prototype[name] = function cachedProperty() {
    return this[key] !== undefined ? this[key] :
           this[key] = computer.call(this);
  };
}
utils.cachedProperty = cachedProperty;

function parseBytes(bytes) {
  return typeof bytes === 'string' ? utils.toArray(bytes, 'hex') :
                                     bytes;
}
utils.parseBytes = parseBytes;

function intFromLE(bytes) {
  return new BN(bytes, 'hex', 'le');
}
utils.intFromLE = intFromLE;



/***/ }),

/***/ 2088:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__(514);
var elliptic = __webpack_require__(538);
var utils = elliptic.utils;
var getNAF = utils.getNAF;
var getJSF = utils.getJSF;
var assert = utils.assert;

function BaseCurve(type, conf) {
  this.type = type;
  this.p = new BN(conf.p, 16);

  // Use Montgomery, when there is no fast reduction for the prime
  this.red = conf.prime ? BN.red(conf.prime) : BN.mont(this.p);

  // Useful for many curves
  this.zero = new BN(0).toRed(this.red);
  this.one = new BN(1).toRed(this.red);
  this.two = new BN(2).toRed(this.red);

  // Curve configuration, optional
  this.n = conf.n && new BN(conf.n, 16);
  this.g = conf.g && this.pointFromJSON(conf.g, conf.gRed);

  // Temporary arrays
  this._wnafT1 = new Array(4);
  this._wnafT2 = new Array(4);
  this._wnafT3 = new Array(4);
  this._wnafT4 = new Array(4);

  // Generalized Greg Maxwell's trick
  var adjustCount = this.n && this.p.div(this.n);
  if (!adjustCount || adjustCount.cmpn(100) > 0) {
    this.redN = null;
  } else {
    this._maxwellTrick = true;
    this.redN = this.n.toRed(this.red);
  }
}
module.exports = BaseCurve;

BaseCurve.prototype.point = function point() {
  throw new Error('Not implemented');
};

BaseCurve.prototype.validate = function validate() {
  throw new Error('Not implemented');
};

BaseCurve.prototype._fixedNafMul = function _fixedNafMul(p, k) {
  assert(p.precomputed);
  var doubles = p._getDoubles();

  var naf = getNAF(k, 1);
  var I = (1 << (doubles.step + 1)) - (doubles.step % 2 === 0 ? 2 : 1);
  I /= 3;

  // Translate into more windowed form
  var repr = [];
  for (var j = 0; j < naf.length; j += doubles.step) {
    var nafW = 0;
    for (var k = j + doubles.step - 1; k >= j; k--)
      nafW = (nafW << 1) + naf[k];
    repr.push(nafW);
  }

  var a = this.jpoint(null, null, null);
  var b = this.jpoint(null, null, null);
  for (var i = I; i > 0; i--) {
    for (var j = 0; j < repr.length; j++) {
      var nafW = repr[j];
      if (nafW === i)
        b = b.mixedAdd(doubles.points[j]);
      else if (nafW === -i)
        b = b.mixedAdd(doubles.points[j].neg());
    }
    a = a.add(b);
  }
  return a.toP();
};

BaseCurve.prototype._wnafMul = function _wnafMul(p, k) {
  var w = 4;

  // Precompute window
  var nafPoints = p._getNAFPoints(w);
  w = nafPoints.wnd;
  var wnd = nafPoints.points;

  // Get NAF form
  var naf = getNAF(k, w);

  // Add `this`*(N+1) for every w-NAF index
  var acc = this.jpoint(null, null, null);
  for (var i = naf.length - 1; i >= 0; i--) {
    // Count zeroes
    for (var k = 0; i >= 0 && naf[i] === 0; i--)
      k++;
    if (i >= 0)
      k++;
    acc = acc.dblp(k);

    if (i < 0)
      break;
    var z = naf[i];
    assert(z !== 0);
    if (p.type === 'affine') {
      // J +- P
      if (z > 0)
        acc = acc.mixedAdd(wnd[(z - 1) >> 1]);
      else
        acc = acc.mixedAdd(wnd[(-z - 1) >> 1].neg());
    } else {
      // J +- J
      if (z > 0)
        acc = acc.add(wnd[(z - 1) >> 1]);
      else
        acc = acc.add(wnd[(-z - 1) >> 1].neg());
    }
  }
  return p.type === 'affine' ? acc.toP() : acc;
};

BaseCurve.prototype._wnafMulAdd = function _wnafMulAdd(defW,
                                                       points,
                                                       coeffs,
                                                       len,
                                                       jacobianResult) {
  var wndWidth = this._wnafT1;
  var wnd = this._wnafT2;
  var naf = this._wnafT3;

  // Fill all arrays
  var max = 0;
  for (var i = 0; i < len; i++) {
    var p = points[i];
    var nafPoints = p._getNAFPoints(defW);
    wndWidth[i] = nafPoints.wnd;
    wnd[i] = nafPoints.points;
  }

  // Comb small window NAFs
  for (var i = len - 1; i >= 1; i -= 2) {
    var a = i - 1;
    var b = i;
    if (wndWidth[a] !== 1 || wndWidth[b] !== 1) {
      naf[a] = getNAF(coeffs[a], wndWidth[a]);
      naf[b] = getNAF(coeffs[b], wndWidth[b]);
      max = Math.max(naf[a].length, max);
      max = Math.max(naf[b].length, max);
      continue;
    }

    var comb = [
      points[a], /* 1 */
      null, /* 3 */
      null, /* 5 */
      points[b] /* 7 */
    ];

    // Try to avoid Projective points, if possible
    if (points[a].y.cmp(points[b].y) === 0) {
      comb[1] = points[a].add(points[b]);
      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
    } else if (points[a].y.cmp(points[b].y.redNeg()) === 0) {
      comb[1] = points[a].toJ().mixedAdd(points[b]);
      comb[2] = points[a].add(points[b].neg());
    } else {
      comb[1] = points[a].toJ().mixedAdd(points[b]);
      comb[2] = points[a].toJ().mixedAdd(points[b].neg());
    }

    var index = [
      -3, /* -1 -1 */
      -1, /* -1 0 */
      -5, /* -1 1 */
      -7, /* 0 -1 */
      0, /* 0 0 */
      7, /* 0 1 */
      5, /* 1 -1 */
      1, /* 1 0 */
      3  /* 1 1 */
    ];

    var jsf = getJSF(coeffs[a], coeffs[b]);
    max = Math.max(jsf[0].length, max);
    naf[a] = new Array(max);
    naf[b] = new Array(max);
    for (var j = 0; j < max; j++) {
      var ja = jsf[0][j] | 0;
      var jb = jsf[1][j] | 0;

      naf[a][j] = index[(ja + 1) * 3 + (jb + 1)];
      naf[b][j] = 0;
      wnd[a] = comb;
    }
  }

  var acc = this.jpoint(null, null, null);
  var tmp = this._wnafT4;
  for (var i = max; i >= 0; i--) {
    var k = 0;

    while (i >= 0) {
      var zero = true;
      for (var j = 0; j < len; j++) {
        tmp[j] = naf[j][i] | 0;
        if (tmp[j] !== 0)
          zero = false;
      }
      if (!zero)
        break;
      k++;
      i--;
    }
    if (i >= 0)
      k++;
    acc = acc.dblp(k);
    if (i < 0)
      break;

    for (var j = 0; j < len; j++) {
      var z = tmp[j];
      var p;
      if (z === 0)
        continue;
      else if (z > 0)
        p = wnd[j][(z - 1) >> 1];
      else if (z < 0)
        p = wnd[j][(-z - 1) >> 1].neg();

      if (p.type === 'affine')
        acc = acc.mixedAdd(p);
      else
        acc = acc.add(p);
    }
  }
  // Zeroify references
  for (var i = 0; i < len; i++)
    wnd[i] = null;

  if (jacobianResult)
    return acc;
  else
    return acc.toP();
};

function BasePoint(curve, type) {
  this.curve = curve;
  this.type = type;
  this.precomputed = null;
}
BaseCurve.BasePoint = BasePoint;

BasePoint.prototype.eq = function eq(/*other*/) {
  throw new Error('Not implemented');
};

BasePoint.prototype.validate = function validate() {
  return this.curve.validate(this);
};

BaseCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
  bytes = utils.toArray(bytes, enc);

  var len = this.p.byteLength();

  // uncompressed, hybrid-odd, hybrid-even
  if ((bytes[0] === 0x04 || bytes[0] === 0x06 || bytes[0] === 0x07) &&
      bytes.length - 1 === 2 * len) {
    if (bytes[0] === 0x06)
      assert(bytes[bytes.length - 1] % 2 === 0);
    else if (bytes[0] === 0x07)
      assert(bytes[bytes.length - 1] % 2 === 1);

    var res =  this.point(bytes.slice(1, 1 + len),
                          bytes.slice(1 + len, 1 + 2 * len));

    return res;
  } else if ((bytes[0] === 0x02 || bytes[0] === 0x03) &&
              bytes.length - 1 === len) {
    return this.pointFromX(bytes.slice(1, 1 + len), bytes[0] === 0x03);
  }
  throw new Error('Unknown point format');
};

BasePoint.prototype.encodeCompressed = function encodeCompressed(enc) {
  return this.encode(enc, true);
};

BasePoint.prototype._encode = function _encode(compact) {
  var len = this.curve.p.byteLength();
  var x = this.getX().toArray('be', len);

  if (compact)
    return [ this.getY().isEven() ? 0x02 : 0x03 ].concat(x);

  return [ 0x04 ].concat(x, this.getY().toArray('be', len)) ;
};

BasePoint.prototype.encode = function encode(enc, compact) {
  return utils.encode(this._encode(compact), enc);
};

BasePoint.prototype.precompute = function precompute(power) {
  if (this.precomputed)
    return this;

  var precomputed = {
    doubles: null,
    naf: null,
    beta: null
  };
  precomputed.naf = this._getNAFPoints(8);
  precomputed.doubles = this._getDoubles(4, power);
  precomputed.beta = this._getBeta();
  this.precomputed = precomputed;

  return this;
};

BasePoint.prototype._hasDoubles = function _hasDoubles(k) {
  if (!this.precomputed)
    return false;

  var doubles = this.precomputed.doubles;
  if (!doubles)
    return false;

  return doubles.points.length >= Math.ceil((k.bitLength() + 1) / doubles.step);
};

BasePoint.prototype._getDoubles = function _getDoubles(step, power) {
  if (this.precomputed && this.precomputed.doubles)
    return this.precomputed.doubles;

  var doubles = [ this ];
  var acc = this;
  for (var i = 0; i < power; i += step) {
    for (var j = 0; j < step; j++)
      acc = acc.dbl();
    doubles.push(acc);
  }
  return {
    step: step,
    points: doubles
  };
};

BasePoint.prototype._getNAFPoints = function _getNAFPoints(wnd) {
  if (this.precomputed && this.precomputed.naf)
    return this.precomputed.naf;

  var res = [ this ];
  var max = (1 << wnd) - 1;
  var dbl = max === 1 ? null : this.dbl();
  for (var i = 1; i < max; i++)
    res[i] = res[i - 1].add(dbl);
  return {
    wnd: wnd,
    points: res
  };
};

BasePoint.prototype._getBeta = function _getBeta() {
  return null;
};

BasePoint.prototype.dblp = function dblp(k) {
  var r = this;
  for (var i = 0; i < k; i++)
    r = r.dbl();
  return r;
};


/***/ }),

/***/ 2089:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var curve = __webpack_require__(783);
var elliptic = __webpack_require__(538);
var BN = __webpack_require__(514);
var inherits = __webpack_require__(485);
var Base = curve.base;

var assert = elliptic.utils.assert;

function ShortCurve(conf) {
  Base.call(this, 'short', conf);

  this.a = new BN(conf.a, 16).toRed(this.red);
  this.b = new BN(conf.b, 16).toRed(this.red);
  this.tinv = this.two.redInvm();

  this.zeroA = this.a.fromRed().cmpn(0) === 0;
  this.threeA = this.a.fromRed().sub(this.p).cmpn(-3) === 0;

  // If the curve is endomorphic, precalculate beta and lambda
  this.endo = this._getEndomorphism(conf);
  this._endoWnafT1 = new Array(4);
  this._endoWnafT2 = new Array(4);
}
inherits(ShortCurve, Base);
module.exports = ShortCurve;

ShortCurve.prototype._getEndomorphism = function _getEndomorphism(conf) {
  // No efficient endomorphism
  if (!this.zeroA || !this.g || !this.n || this.p.modn(3) !== 1)
    return;

  // Compute beta and lambda, that lambda * P = (beta * Px; Py)
  var beta;
  var lambda;
  if (conf.beta) {
    beta = new BN(conf.beta, 16).toRed(this.red);
  } else {
    var betas = this._getEndoRoots(this.p);
    // Choose the smallest beta
    beta = betas[0].cmp(betas[1]) < 0 ? betas[0] : betas[1];
    beta = beta.toRed(this.red);
  }
  if (conf.lambda) {
    lambda = new BN(conf.lambda, 16);
  } else {
    // Choose the lambda that is matching selected beta
    var lambdas = this._getEndoRoots(this.n);
    if (this.g.mul(lambdas[0]).x.cmp(this.g.x.redMul(beta)) === 0) {
      lambda = lambdas[0];
    } else {
      lambda = lambdas[1];
      assert(this.g.mul(lambda).x.cmp(this.g.x.redMul(beta)) === 0);
    }
  }

  // Get basis vectors, used for balanced length-two representation
  var basis;
  if (conf.basis) {
    basis = conf.basis.map(function(vec) {
      return {
        a: new BN(vec.a, 16),
        b: new BN(vec.b, 16)
      };
    });
  } else {
    basis = this._getEndoBasis(lambda);
  }

  return {
    beta: beta,
    lambda: lambda,
    basis: basis
  };
};

ShortCurve.prototype._getEndoRoots = function _getEndoRoots(num) {
  // Find roots of for x^2 + x + 1 in F
  // Root = (-1 +- Sqrt(-3)) / 2
  //
  var red = num === this.p ? this.red : BN.mont(num);
  var tinv = new BN(2).toRed(red).redInvm();
  var ntinv = tinv.redNeg();

  var s = new BN(3).toRed(red).redNeg().redSqrt().redMul(tinv);

  var l1 = ntinv.redAdd(s).fromRed();
  var l2 = ntinv.redSub(s).fromRed();
  return [ l1, l2 ];
};

ShortCurve.prototype._getEndoBasis = function _getEndoBasis(lambda) {
  // aprxSqrt >= sqrt(this.n)
  var aprxSqrt = this.n.ushrn(Math.floor(this.n.bitLength() / 2));

  // 3.74
  // Run EGCD, until r(L + 1) < aprxSqrt
  var u = lambda;
  var v = this.n.clone();
  var x1 = new BN(1);
  var y1 = new BN(0);
  var x2 = new BN(0);
  var y2 = new BN(1);

  // NOTE: all vectors are roots of: a + b * lambda = 0 (mod n)
  var a0;
  var b0;
  // First vector
  var a1;
  var b1;
  // Second vector
  var a2;
  var b2;

  var prevR;
  var i = 0;
  var r;
  var x;
  while (u.cmpn(0) !== 0) {
    var q = v.div(u);
    r = v.sub(q.mul(u));
    x = x2.sub(q.mul(x1));
    var y = y2.sub(q.mul(y1));

    if (!a1 && r.cmp(aprxSqrt) < 0) {
      a0 = prevR.neg();
      b0 = x1;
      a1 = r.neg();
      b1 = x;
    } else if (a1 && ++i === 2) {
      break;
    }
    prevR = r;

    v = u;
    u = r;
    x2 = x1;
    x1 = x;
    y2 = y1;
    y1 = y;
  }
  a2 = r.neg();
  b2 = x;

  var len1 = a1.sqr().add(b1.sqr());
  var len2 = a2.sqr().add(b2.sqr());
  if (len2.cmp(len1) >= 0) {
    a2 = a0;
    b2 = b0;
  }

  // Normalize signs
  if (a1.negative) {
    a1 = a1.neg();
    b1 = b1.neg();
  }
  if (a2.negative) {
    a2 = a2.neg();
    b2 = b2.neg();
  }

  return [
    { a: a1, b: b1 },
    { a: a2, b: b2 }
  ];
};

ShortCurve.prototype._endoSplit = function _endoSplit(k) {
  var basis = this.endo.basis;
  var v1 = basis[0];
  var v2 = basis[1];

  var c1 = v2.b.mul(k).divRound(this.n);
  var c2 = v1.b.neg().mul(k).divRound(this.n);

  var p1 = c1.mul(v1.a);
  var p2 = c2.mul(v2.a);
  var q1 = c1.mul(v1.b);
  var q2 = c2.mul(v2.b);

  // Calculate answer
  var k1 = k.sub(p1).sub(p2);
  var k2 = q1.add(q2).neg();
  return { k1: k1, k2: k2 };
};

ShortCurve.prototype.pointFromX = function pointFromX(x, odd) {
  x = new BN(x, 16);
  if (!x.red)
    x = x.toRed(this.red);

  var y2 = x.redSqr().redMul(x).redIAdd(x.redMul(this.a)).redIAdd(this.b);
  var y = y2.redSqrt();
  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
    throw new Error('invalid point');

  // XXX Is there any way to tell if the number is odd without converting it
  // to non-red form?
  var isOdd = y.fromRed().isOdd();
  if (odd && !isOdd || !odd && isOdd)
    y = y.redNeg();

  return this.point(x, y);
};

ShortCurve.prototype.validate = function validate(point) {
  if (point.inf)
    return true;

  var x = point.x;
  var y = point.y;

  var ax = this.a.redMul(x);
  var rhs = x.redSqr().redMul(x).redIAdd(ax).redIAdd(this.b);
  return y.redSqr().redISub(rhs).cmpn(0) === 0;
};

ShortCurve.prototype._endoWnafMulAdd =
    function _endoWnafMulAdd(points, coeffs, jacobianResult) {
  var npoints = this._endoWnafT1;
  var ncoeffs = this._endoWnafT2;
  for (var i = 0; i < points.length; i++) {
    var split = this._endoSplit(coeffs[i]);
    var p = points[i];
    var beta = p._getBeta();

    if (split.k1.negative) {
      split.k1.ineg();
      p = p.neg(true);
    }
    if (split.k2.negative) {
      split.k2.ineg();
      beta = beta.neg(true);
    }

    npoints[i * 2] = p;
    npoints[i * 2 + 1] = beta;
    ncoeffs[i * 2] = split.k1;
    ncoeffs[i * 2 + 1] = split.k2;
  }
  var res = this._wnafMulAdd(1, npoints, ncoeffs, i * 2, jacobianResult);

  // Clean-up references to points and coefficients
  for (var j = 0; j < i * 2; j++) {
    npoints[j] = null;
    ncoeffs[j] = null;
  }
  return res;
};

function Point(curve, x, y, isRed) {
  Base.BasePoint.call(this, curve, 'affine');
  if (x === null && y === null) {
    this.x = null;
    this.y = null;
    this.inf = true;
  } else {
    this.x = new BN(x, 16);
    this.y = new BN(y, 16);
    // Force redgomery representation when loading from JSON
    if (isRed) {
      this.x.forceRed(this.curve.red);
      this.y.forceRed(this.curve.red);
    }
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.y.red)
      this.y = this.y.toRed(this.curve.red);
    this.inf = false;
  }
}
inherits(Point, Base.BasePoint);

ShortCurve.prototype.point = function point(x, y, isRed) {
  return new Point(this, x, y, isRed);
};

ShortCurve.prototype.pointFromJSON = function pointFromJSON(obj, red) {
  return Point.fromJSON(this, obj, red);
};

Point.prototype._getBeta = function _getBeta() {
  if (!this.curve.endo)
    return;

  var pre = this.precomputed;
  if (pre && pre.beta)
    return pre.beta;

  var beta = this.curve.point(this.x.redMul(this.curve.endo.beta), this.y);
  if (pre) {
    var curve = this.curve;
    var endoMul = function(p) {
      return curve.point(p.x.redMul(curve.endo.beta), p.y);
    };
    pre.beta = beta;
    beta.precomputed = {
      beta: null,
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: pre.naf.points.map(endoMul)
      },
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: pre.doubles.points.map(endoMul)
      }
    };
  }
  return beta;
};

Point.prototype.toJSON = function toJSON() {
  if (!this.precomputed)
    return [ this.x, this.y ];

  return [ this.x, this.y, this.precomputed && {
    doubles: this.precomputed.doubles && {
      step: this.precomputed.doubles.step,
      points: this.precomputed.doubles.points.slice(1)
    },
    naf: this.precomputed.naf && {
      wnd: this.precomputed.naf.wnd,
      points: this.precomputed.naf.points.slice(1)
    }
  } ];
};

Point.fromJSON = function fromJSON(curve, obj, red) {
  if (typeof obj === 'string')
    obj = JSON.parse(obj);
  var res = curve.point(obj[0], obj[1], red);
  if (!obj[2])
    return res;

  function obj2point(obj) {
    return curve.point(obj[0], obj[1], red);
  }

  var pre = obj[2];
  res.precomputed = {
    beta: null,
    doubles: pre.doubles && {
      step: pre.doubles.step,
      points: [ res ].concat(pre.doubles.points.map(obj2point))
    },
    naf: pre.naf && {
      wnd: pre.naf.wnd,
      points: [ res ].concat(pre.naf.points.map(obj2point))
    }
  };
  return res;
};

Point.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC Point Infinity>';
  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
      ' y: ' + this.y.fromRed().toString(16, 2) + '>';
};

Point.prototype.isInfinity = function isInfinity() {
  return this.inf;
};

Point.prototype.add = function add(p) {
  // O + P = P
  if (this.inf)
    return p;

  // P + O = P
  if (p.inf)
    return this;

  // P + P = 2P
  if (this.eq(p))
    return this.dbl();

  // P + (-P) = O
  if (this.neg().eq(p))
    return this.curve.point(null, null);

  // P + Q = O
  if (this.x.cmp(p.x) === 0)
    return this.curve.point(null, null);

  var c = this.y.redSub(p.y);
  if (c.cmpn(0) !== 0)
    c = c.redMul(this.x.redSub(p.x).redInvm());
  var nx = c.redSqr().redISub(this.x).redISub(p.x);
  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
  return this.curve.point(nx, ny);
};

Point.prototype.dbl = function dbl() {
  if (this.inf)
    return this;

  // 2P = O
  var ys1 = this.y.redAdd(this.y);
  if (ys1.cmpn(0) === 0)
    return this.curve.point(null, null);

  var a = this.curve.a;

  var x2 = this.x.redSqr();
  var dyinv = ys1.redInvm();
  var c = x2.redAdd(x2).redIAdd(x2).redIAdd(a).redMul(dyinv);

  var nx = c.redSqr().redISub(this.x.redAdd(this.x));
  var ny = c.redMul(this.x.redSub(nx)).redISub(this.y);
  return this.curve.point(nx, ny);
};

Point.prototype.getX = function getX() {
  return this.x.fromRed();
};

Point.prototype.getY = function getY() {
  return this.y.fromRed();
};

Point.prototype.mul = function mul(k) {
  k = new BN(k, 16);

  if (this._hasDoubles(k))
    return this.curve._fixedNafMul(this, k);
  else if (this.curve.endo)
    return this.curve._endoWnafMulAdd([ this ], [ k ]);
  else
    return this.curve._wnafMul(this, k);
};

Point.prototype.mulAdd = function mulAdd(k1, p2, k2) {
  var points = [ this, p2 ];
  var coeffs = [ k1, k2 ];
  if (this.curve.endo)
    return this.curve._endoWnafMulAdd(points, coeffs);
  else
    return this.curve._wnafMulAdd(1, points, coeffs, 2);
};

Point.prototype.jmulAdd = function jmulAdd(k1, p2, k2) {
  var points = [ this, p2 ];
  var coeffs = [ k1, k2 ];
  if (this.curve.endo)
    return this.curve._endoWnafMulAdd(points, coeffs, true);
  else
    return this.curve._wnafMulAdd(1, points, coeffs, 2, true);
};

Point.prototype.eq = function eq(p) {
  return this === p ||
         this.inf === p.inf &&
             (this.inf || this.x.cmp(p.x) === 0 && this.y.cmp(p.y) === 0);
};

Point.prototype.neg = function neg(_precompute) {
  if (this.inf)
    return this;

  var res = this.curve.point(this.x, this.y.redNeg());
  if (_precompute && this.precomputed) {
    var pre = this.precomputed;
    var negate = function(p) {
      return p.neg();
    };
    res.precomputed = {
      naf: pre.naf && {
        wnd: pre.naf.wnd,
        points: pre.naf.points.map(negate)
      },
      doubles: pre.doubles && {
        step: pre.doubles.step,
        points: pre.doubles.points.map(negate)
      }
    };
  }
  return res;
};

Point.prototype.toJ = function toJ() {
  if (this.inf)
    return this.curve.jpoint(null, null, null);

  var res = this.curve.jpoint(this.x, this.y, this.curve.one);
  return res;
};

function JPoint(curve, x, y, z) {
  Base.BasePoint.call(this, curve, 'jacobian');
  if (x === null && y === null && z === null) {
    this.x = this.curve.one;
    this.y = this.curve.one;
    this.z = new BN(0);
  } else {
    this.x = new BN(x, 16);
    this.y = new BN(y, 16);
    this.z = new BN(z, 16);
  }
  if (!this.x.red)
    this.x = this.x.toRed(this.curve.red);
  if (!this.y.red)
    this.y = this.y.toRed(this.curve.red);
  if (!this.z.red)
    this.z = this.z.toRed(this.curve.red);

  this.zOne = this.z === this.curve.one;
}
inherits(JPoint, Base.BasePoint);

ShortCurve.prototype.jpoint = function jpoint(x, y, z) {
  return new JPoint(this, x, y, z);
};

JPoint.prototype.toP = function toP() {
  if (this.isInfinity())
    return this.curve.point(null, null);

  var zinv = this.z.redInvm();
  var zinv2 = zinv.redSqr();
  var ax = this.x.redMul(zinv2);
  var ay = this.y.redMul(zinv2).redMul(zinv);

  return this.curve.point(ax, ay);
};

JPoint.prototype.neg = function neg() {
  return this.curve.jpoint(this.x, this.y.redNeg(), this.z);
};

JPoint.prototype.add = function add(p) {
  // O + P = P
  if (this.isInfinity())
    return p;

  // P + O = P
  if (p.isInfinity())
    return this;

  // 12M + 4S + 7A
  var pz2 = p.z.redSqr();
  var z2 = this.z.redSqr();
  var u1 = this.x.redMul(pz2);
  var u2 = p.x.redMul(z2);
  var s1 = this.y.redMul(pz2.redMul(p.z));
  var s2 = p.y.redMul(z2.redMul(this.z));

  var h = u1.redSub(u2);
  var r = s1.redSub(s2);
  if (h.cmpn(0) === 0) {
    if (r.cmpn(0) !== 0)
      return this.curve.jpoint(null, null, null);
    else
      return this.dbl();
  }

  var h2 = h.redSqr();
  var h3 = h2.redMul(h);
  var v = u1.redMul(h2);

  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
  var nz = this.z.redMul(p.z).redMul(h);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.mixedAdd = function mixedAdd(p) {
  // O + P = P
  if (this.isInfinity())
    return p.toJ();

  // P + O = P
  if (p.isInfinity())
    return this;

  // 8M + 3S + 7A
  var z2 = this.z.redSqr();
  var u1 = this.x;
  var u2 = p.x.redMul(z2);
  var s1 = this.y;
  var s2 = p.y.redMul(z2).redMul(this.z);

  var h = u1.redSub(u2);
  var r = s1.redSub(s2);
  if (h.cmpn(0) === 0) {
    if (r.cmpn(0) !== 0)
      return this.curve.jpoint(null, null, null);
    else
      return this.dbl();
  }

  var h2 = h.redSqr();
  var h3 = h2.redMul(h);
  var v = u1.redMul(h2);

  var nx = r.redSqr().redIAdd(h3).redISub(v).redISub(v);
  var ny = r.redMul(v.redISub(nx)).redISub(s1.redMul(h3));
  var nz = this.z.redMul(h);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.dblp = function dblp(pow) {
  if (pow === 0)
    return this;
  if (this.isInfinity())
    return this;
  if (!pow)
    return this.dbl();

  if (this.curve.zeroA || this.curve.threeA) {
    var r = this;
    for (var i = 0; i < pow; i++)
      r = r.dbl();
    return r;
  }

  // 1M + 2S + 1A + N * (4S + 5M + 8A)
  // N = 1 => 6M + 6S + 9A
  var a = this.curve.a;
  var tinv = this.curve.tinv;

  var jx = this.x;
  var jy = this.y;
  var jz = this.z;
  var jz4 = jz.redSqr().redSqr();

  // Reuse results
  var jyd = jy.redAdd(jy);
  for (var i = 0; i < pow; i++) {
    var jx2 = jx.redSqr();
    var jyd2 = jyd.redSqr();
    var jyd4 = jyd2.redSqr();
    var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

    var t1 = jx.redMul(jyd2);
    var nx = c.redSqr().redISub(t1.redAdd(t1));
    var t2 = t1.redISub(nx);
    var dny = c.redMul(t2);
    dny = dny.redIAdd(dny).redISub(jyd4);
    var nz = jyd.redMul(jz);
    if (i + 1 < pow)
      jz4 = jz4.redMul(jyd4);

    jx = nx;
    jz = nz;
    jyd = dny;
  }

  return this.curve.jpoint(jx, jyd.redMul(tinv), jz);
};

JPoint.prototype.dbl = function dbl() {
  if (this.isInfinity())
    return this;

  if (this.curve.zeroA)
    return this._zeroDbl();
  else if (this.curve.threeA)
    return this._threeDbl();
  else
    return this._dbl();
};

JPoint.prototype._zeroDbl = function _zeroDbl() {
  var nx;
  var ny;
  var nz;
  // Z = 1
  if (this.zOne) {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
    //     #doubling-mdbl-2007-bl
    // 1M + 5S + 14A

    // XX = X1^2
    var xx = this.x.redSqr();
    // YY = Y1^2
    var yy = this.y.redSqr();
    // YYYY = YY^2
    var yyyy = yy.redSqr();
    // S = 2 * ((X1 + YY)^2 - XX - YYYY)
    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    s = s.redIAdd(s);
    // M = 3 * XX + a; a = 0
    var m = xx.redAdd(xx).redIAdd(xx);
    // T = M ^ 2 - 2*S
    var t = m.redSqr().redISub(s).redISub(s);

    // 8 * YYYY
    var yyyy8 = yyyy.redIAdd(yyyy);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    yyyy8 = yyyy8.redIAdd(yyyy8);

    // X3 = T
    nx = t;
    // Y3 = M * (S - T) - 8 * YYYY
    ny = m.redMul(s.redISub(t)).redISub(yyyy8);
    // Z3 = 2*Y1
    nz = this.y.redAdd(this.y);
  } else {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html
    //     #doubling-dbl-2009-l
    // 2M + 5S + 13A

    // A = X1^2
    var a = this.x.redSqr();
    // B = Y1^2
    var b = this.y.redSqr();
    // C = B^2
    var c = b.redSqr();
    // D = 2 * ((X1 + B)^2 - A - C)
    var d = this.x.redAdd(b).redSqr().redISub(a).redISub(c);
    d = d.redIAdd(d);
    // E = 3 * A
    var e = a.redAdd(a).redIAdd(a);
    // F = E^2
    var f = e.redSqr();

    // 8 * C
    var c8 = c.redIAdd(c);
    c8 = c8.redIAdd(c8);
    c8 = c8.redIAdd(c8);

    // X3 = F - 2 * D
    nx = f.redISub(d).redISub(d);
    // Y3 = E * (D - X3) - 8 * C
    ny = e.redMul(d.redISub(nx)).redISub(c8);
    // Z3 = 2 * Y1 * Z1
    nz = this.y.redMul(this.z);
    nz = nz.redIAdd(nz);
  }

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype._threeDbl = function _threeDbl() {
  var nx;
  var ny;
  var nz;
  // Z = 1
  if (this.zOne) {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html
    //     #doubling-mdbl-2007-bl
    // 1M + 5S + 15A

    // XX = X1^2
    var xx = this.x.redSqr();
    // YY = Y1^2
    var yy = this.y.redSqr();
    // YYYY = YY^2
    var yyyy = yy.redSqr();
    // S = 2 * ((X1 + YY)^2 - XX - YYYY)
    var s = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
    s = s.redIAdd(s);
    // M = 3 * XX + a
    var m = xx.redAdd(xx).redIAdd(xx).redIAdd(this.curve.a);
    // T = M^2 - 2 * S
    var t = m.redSqr().redISub(s).redISub(s);
    // X3 = T
    nx = t;
    // Y3 = M * (S - T) - 8 * YYYY
    var yyyy8 = yyyy.redIAdd(yyyy);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    yyyy8 = yyyy8.redIAdd(yyyy8);
    ny = m.redMul(s.redISub(t)).redISub(yyyy8);
    // Z3 = 2 * Y1
    nz = this.y.redAdd(this.y);
  } else {
    // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-3.html#doubling-dbl-2001-b
    // 3M + 5S

    // delta = Z1^2
    var delta = this.z.redSqr();
    // gamma = Y1^2
    var gamma = this.y.redSqr();
    // beta = X1 * gamma
    var beta = this.x.redMul(gamma);
    // alpha = 3 * (X1 - delta) * (X1 + delta)
    var alpha = this.x.redSub(delta).redMul(this.x.redAdd(delta));
    alpha = alpha.redAdd(alpha).redIAdd(alpha);
    // X3 = alpha^2 - 8 * beta
    var beta4 = beta.redIAdd(beta);
    beta4 = beta4.redIAdd(beta4);
    var beta8 = beta4.redAdd(beta4);
    nx = alpha.redSqr().redISub(beta8);
    // Z3 = (Y1 + Z1)^2 - gamma - delta
    nz = this.y.redAdd(this.z).redSqr().redISub(gamma).redISub(delta);
    // Y3 = alpha * (4 * beta - X3) - 8 * gamma^2
    var ggamma8 = gamma.redSqr();
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ggamma8 = ggamma8.redIAdd(ggamma8);
    ny = alpha.redMul(beta4.redISub(nx)).redISub(ggamma8);
  }

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype._dbl = function _dbl() {
  var a = this.curve.a;

  // 4M + 6S + 10A
  var jx = this.x;
  var jy = this.y;
  var jz = this.z;
  var jz4 = jz.redSqr().redSqr();

  var jx2 = jx.redSqr();
  var jy2 = jy.redSqr();

  var c = jx2.redAdd(jx2).redIAdd(jx2).redIAdd(a.redMul(jz4));

  var jxd4 = jx.redAdd(jx);
  jxd4 = jxd4.redIAdd(jxd4);
  var t1 = jxd4.redMul(jy2);
  var nx = c.redSqr().redISub(t1.redAdd(t1));
  var t2 = t1.redISub(nx);

  var jyd8 = jy2.redSqr();
  jyd8 = jyd8.redIAdd(jyd8);
  jyd8 = jyd8.redIAdd(jyd8);
  jyd8 = jyd8.redIAdd(jyd8);
  var ny = c.redMul(t2).redISub(jyd8);
  var nz = jy.redAdd(jy).redMul(jz);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.trpl = function trpl() {
  if (!this.curve.zeroA)
    return this.dbl().add(this);

  // hyperelliptic.org/EFD/g1p/auto-shortw-jacobian-0.html#tripling-tpl-2007-bl
  // 5M + 10S + ...

  // XX = X1^2
  var xx = this.x.redSqr();
  // YY = Y1^2
  var yy = this.y.redSqr();
  // ZZ = Z1^2
  var zz = this.z.redSqr();
  // YYYY = YY^2
  var yyyy = yy.redSqr();
  // M = 3 * XX + a * ZZ2; a = 0
  var m = xx.redAdd(xx).redIAdd(xx);
  // MM = M^2
  var mm = m.redSqr();
  // E = 6 * ((X1 + YY)^2 - XX - YYYY) - MM
  var e = this.x.redAdd(yy).redSqr().redISub(xx).redISub(yyyy);
  e = e.redIAdd(e);
  e = e.redAdd(e).redIAdd(e);
  e = e.redISub(mm);
  // EE = E^2
  var ee = e.redSqr();
  // T = 16*YYYY
  var t = yyyy.redIAdd(yyyy);
  t = t.redIAdd(t);
  t = t.redIAdd(t);
  t = t.redIAdd(t);
  // U = (M + E)^2 - MM - EE - T
  var u = m.redIAdd(e).redSqr().redISub(mm).redISub(ee).redISub(t);
  // X3 = 4 * (X1 * EE - 4 * YY * U)
  var yyu4 = yy.redMul(u);
  yyu4 = yyu4.redIAdd(yyu4);
  yyu4 = yyu4.redIAdd(yyu4);
  var nx = this.x.redMul(ee).redISub(yyu4);
  nx = nx.redIAdd(nx);
  nx = nx.redIAdd(nx);
  // Y3 = 8 * Y1 * (U * (T - U) - E * EE)
  var ny = this.y.redMul(u.redMul(t.redISub(u)).redISub(e.redMul(ee)));
  ny = ny.redIAdd(ny);
  ny = ny.redIAdd(ny);
  ny = ny.redIAdd(ny);
  // Z3 = (Z1 + E)^2 - ZZ - EE
  var nz = this.z.redAdd(e).redSqr().redISub(zz).redISub(ee);

  return this.curve.jpoint(nx, ny, nz);
};

JPoint.prototype.mul = function mul(k, kbase) {
  k = new BN(k, kbase);

  return this.curve._wnafMul(this, k);
};

JPoint.prototype.eq = function eq(p) {
  if (p.type === 'affine')
    return this.eq(p.toJ());

  if (this === p)
    return true;

  // x1 * z2^2 == x2 * z1^2
  var z2 = this.z.redSqr();
  var pz2 = p.z.redSqr();
  if (this.x.redMul(pz2).redISub(p.x.redMul(z2)).cmpn(0) !== 0)
    return false;

  // y1 * z2^3 == y2 * z1^3
  var z3 = z2.redMul(this.z);
  var pz3 = pz2.redMul(p.z);
  return this.y.redMul(pz3).redISub(p.y.redMul(z3)).cmpn(0) === 0;
};

JPoint.prototype.eqXToP = function eqXToP(x) {
  var zs = this.z.redSqr();
  var rx = x.toRed(this.curve.red).redMul(zs);
  if (this.x.cmp(rx) === 0)
    return true;

  var xc = x.clone();
  var t = this.curve.redN.redMul(zs);
  for (;;) {
    xc.iadd(this.curve.n);
    if (xc.cmp(this.curve.p) >= 0)
      return false;

    rx.redIAdd(t);
    if (this.x.cmp(rx) === 0)
      return true;
  }
  return false;
};

JPoint.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC JPoint Infinity>';
  return '<EC JPoint x: ' + this.x.toString(16, 2) +
      ' y: ' + this.y.toString(16, 2) +
      ' z: ' + this.z.toString(16, 2) + '>';
};

JPoint.prototype.isInfinity = function isInfinity() {
  // XXX This code assumes that zero is always zero in red
  return this.z.cmpn(0) === 0;
};


/***/ }),

/***/ 2090:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var curve = __webpack_require__(783);
var BN = __webpack_require__(514);
var inherits = __webpack_require__(485);
var Base = curve.base;

var elliptic = __webpack_require__(538);
var utils = elliptic.utils;

function MontCurve(conf) {
  Base.call(this, 'mont', conf);

  this.a = new BN(conf.a, 16).toRed(this.red);
  this.b = new BN(conf.b, 16).toRed(this.red);
  this.i4 = new BN(4).toRed(this.red).redInvm();
  this.two = new BN(2).toRed(this.red);
  this.a24 = this.i4.redMul(this.a.redAdd(this.two));
}
inherits(MontCurve, Base);
module.exports = MontCurve;

MontCurve.prototype.validate = function validate(point) {
  var x = point.normalize().x;
  var x2 = x.redSqr();
  var rhs = x2.redMul(x).redAdd(x2.redMul(this.a)).redAdd(x);
  var y = rhs.redSqrt();

  return y.redSqr().cmp(rhs) === 0;
};

function Point(curve, x, z) {
  Base.BasePoint.call(this, curve, 'projective');
  if (x === null && z === null) {
    this.x = this.curve.one;
    this.z = this.curve.zero;
  } else {
    this.x = new BN(x, 16);
    this.z = new BN(z, 16);
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.z.red)
      this.z = this.z.toRed(this.curve.red);
  }
}
inherits(Point, Base.BasePoint);

MontCurve.prototype.decodePoint = function decodePoint(bytes, enc) {
  return this.point(utils.toArray(bytes, enc), 1);
};

MontCurve.prototype.point = function point(x, z) {
  return new Point(this, x, z);
};

MontCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
  return Point.fromJSON(this, obj);
};

Point.prototype.precompute = function precompute() {
  // No-op
};

Point.prototype._encode = function _encode() {
  return this.getX().toArray('be', this.curve.p.byteLength());
};

Point.fromJSON = function fromJSON(curve, obj) {
  return new Point(curve, obj[0], obj[1] || curve.one);
};

Point.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC Point Infinity>';
  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
      ' z: ' + this.z.fromRed().toString(16, 2) + '>';
};

Point.prototype.isInfinity = function isInfinity() {
  // XXX This code assumes that zero is always zero in red
  return this.z.cmpn(0) === 0;
};

Point.prototype.dbl = function dbl() {
  // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#doubling-dbl-1987-m-3
  // 2M + 2S + 4A

  // A = X1 + Z1
  var a = this.x.redAdd(this.z);
  // AA = A^2
  var aa = a.redSqr();
  // B = X1 - Z1
  var b = this.x.redSub(this.z);
  // BB = B^2
  var bb = b.redSqr();
  // C = AA - BB
  var c = aa.redSub(bb);
  // X3 = AA * BB
  var nx = aa.redMul(bb);
  // Z3 = C * (BB + A24 * C)
  var nz = c.redMul(bb.redAdd(this.curve.a24.redMul(c)));
  return this.curve.point(nx, nz);
};

Point.prototype.add = function add() {
  throw new Error('Not supported on Montgomery curve');
};

Point.prototype.diffAdd = function diffAdd(p, diff) {
  // http://hyperelliptic.org/EFD/g1p/auto-montgom-xz.html#diffadd-dadd-1987-m-3
  // 4M + 2S + 6A

  // A = X2 + Z2
  var a = this.x.redAdd(this.z);
  // B = X2 - Z2
  var b = this.x.redSub(this.z);
  // C = X3 + Z3
  var c = p.x.redAdd(p.z);
  // D = X3 - Z3
  var d = p.x.redSub(p.z);
  // DA = D * A
  var da = d.redMul(a);
  // CB = C * B
  var cb = c.redMul(b);
  // X5 = Z1 * (DA + CB)^2
  var nx = diff.z.redMul(da.redAdd(cb).redSqr());
  // Z5 = X1 * (DA - CB)^2
  var nz = diff.x.redMul(da.redISub(cb).redSqr());
  return this.curve.point(nx, nz);
};

Point.prototype.mul = function mul(k) {
  var t = k.clone();
  var a = this; // (N / 2) * Q + Q
  var b = this.curve.point(null, null); // (N / 2) * Q
  var c = this; // Q

  for (var bits = []; t.cmpn(0) !== 0; t.iushrn(1))
    bits.push(t.andln(1));

  for (var i = bits.length - 1; i >= 0; i--) {
    if (bits[i] === 0) {
      // N * Q + Q = ((N / 2) * Q + Q)) + (N / 2) * Q
      a = a.diffAdd(b, c);
      // N * Q = 2 * ((N / 2) * Q + Q))
      b = b.dbl();
    } else {
      // N * Q = ((N / 2) * Q + Q) + ((N / 2) * Q)
      b = a.diffAdd(b, c);
      // N * Q + Q = 2 * ((N / 2) * Q + Q)
      a = a.dbl();
    }
  }
  return b;
};

Point.prototype.mulAdd = function mulAdd() {
  throw new Error('Not supported on Montgomery curve');
};

Point.prototype.jumlAdd = function jumlAdd() {
  throw new Error('Not supported on Montgomery curve');
};

Point.prototype.eq = function eq(other) {
  return this.getX().cmp(other.getX()) === 0;
};

Point.prototype.normalize = function normalize() {
  this.x = this.x.redMul(this.z.redInvm());
  this.z = this.curve.one;
  return this;
};

Point.prototype.getX = function getX() {
  // Normalize coordinates
  this.normalize();

  return this.x.fromRed();
};


/***/ }),

/***/ 2091:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var curve = __webpack_require__(783);
var elliptic = __webpack_require__(538);
var BN = __webpack_require__(514);
var inherits = __webpack_require__(485);
var Base = curve.base;

var assert = elliptic.utils.assert;

function EdwardsCurve(conf) {
  // NOTE: Important as we are creating point in Base.call()
  this.twisted = (conf.a | 0) !== 1;
  this.mOneA = this.twisted && (conf.a | 0) === -1;
  this.extended = this.mOneA;

  Base.call(this, 'edwards', conf);

  this.a = new BN(conf.a, 16).umod(this.red.m);
  this.a = this.a.toRed(this.red);
  this.c = new BN(conf.c, 16).toRed(this.red);
  this.c2 = this.c.redSqr();
  this.d = new BN(conf.d, 16).toRed(this.red);
  this.dd = this.d.redAdd(this.d);

  assert(!this.twisted || this.c.fromRed().cmpn(1) === 0);
  this.oneC = (conf.c | 0) === 1;
}
inherits(EdwardsCurve, Base);
module.exports = EdwardsCurve;

EdwardsCurve.prototype._mulA = function _mulA(num) {
  if (this.mOneA)
    return num.redNeg();
  else
    return this.a.redMul(num);
};

EdwardsCurve.prototype._mulC = function _mulC(num) {
  if (this.oneC)
    return num;
  else
    return this.c.redMul(num);
};

// Just for compatibility with Short curve
EdwardsCurve.prototype.jpoint = function jpoint(x, y, z, t) {
  return this.point(x, y, z, t);
};

EdwardsCurve.prototype.pointFromX = function pointFromX(x, odd) {
  x = new BN(x, 16);
  if (!x.red)
    x = x.toRed(this.red);

  var x2 = x.redSqr();
  var rhs = this.c2.redSub(this.a.redMul(x2));
  var lhs = this.one.redSub(this.c2.redMul(this.d).redMul(x2));

  var y2 = rhs.redMul(lhs.redInvm());
  var y = y2.redSqrt();
  if (y.redSqr().redSub(y2).cmp(this.zero) !== 0)
    throw new Error('invalid point');

  var isOdd = y.fromRed().isOdd();
  if (odd && !isOdd || !odd && isOdd)
    y = y.redNeg();

  return this.point(x, y);
};

EdwardsCurve.prototype.pointFromY = function pointFromY(y, odd) {
  y = new BN(y, 16);
  if (!y.red)
    y = y.toRed(this.red);

  // x^2 = (y^2 - 1) / (d y^2 + 1)
  var y2 = y.redSqr();
  var lhs = y2.redSub(this.one);
  var rhs = y2.redMul(this.d).redAdd(this.one);
  var x2 = lhs.redMul(rhs.redInvm());

  if (x2.cmp(this.zero) === 0) {
    if (odd)
      throw new Error('invalid point');
    else
      return this.point(this.zero, y);
  }

  var x = x2.redSqrt();
  if (x.redSqr().redSub(x2).cmp(this.zero) !== 0)
    throw new Error('invalid point');

  if (x.isOdd() !== odd)
    x = x.redNeg();

  return this.point(x, y);
};

EdwardsCurve.prototype.validate = function validate(point) {
  if (point.isInfinity())
    return true;

  // Curve: A * X^2 + Y^2 = C^2 * (1 + D * X^2 * Y^2)
  point.normalize();

  var x2 = point.x.redSqr();
  var y2 = point.y.redSqr();
  var lhs = x2.redMul(this.a).redAdd(y2);
  var rhs = this.c2.redMul(this.one.redAdd(this.d.redMul(x2).redMul(y2)));

  return lhs.cmp(rhs) === 0;
};

function Point(curve, x, y, z, t) {
  Base.BasePoint.call(this, curve, 'projective');
  if (x === null && y === null && z === null) {
    this.x = this.curve.zero;
    this.y = this.curve.one;
    this.z = this.curve.one;
    this.t = this.curve.zero;
    this.zOne = true;
  } else {
    this.x = new BN(x, 16);
    this.y = new BN(y, 16);
    this.z = z ? new BN(z, 16) : this.curve.one;
    this.t = t && new BN(t, 16);
    if (!this.x.red)
      this.x = this.x.toRed(this.curve.red);
    if (!this.y.red)
      this.y = this.y.toRed(this.curve.red);
    if (!this.z.red)
      this.z = this.z.toRed(this.curve.red);
    if (this.t && !this.t.red)
      this.t = this.t.toRed(this.curve.red);
    this.zOne = this.z === this.curve.one;

    // Use extended coordinates
    if (this.curve.extended && !this.t) {
      this.t = this.x.redMul(this.y);
      if (!this.zOne)
        this.t = this.t.redMul(this.z.redInvm());
    }
  }
}
inherits(Point, Base.BasePoint);

EdwardsCurve.prototype.pointFromJSON = function pointFromJSON(obj) {
  return Point.fromJSON(this, obj);
};

EdwardsCurve.prototype.point = function point(x, y, z, t) {
  return new Point(this, x, y, z, t);
};

Point.fromJSON = function fromJSON(curve, obj) {
  return new Point(curve, obj[0], obj[1], obj[2]);
};

Point.prototype.inspect = function inspect() {
  if (this.isInfinity())
    return '<EC Point Infinity>';
  return '<EC Point x: ' + this.x.fromRed().toString(16, 2) +
      ' y: ' + this.y.fromRed().toString(16, 2) +
      ' z: ' + this.z.fromRed().toString(16, 2) + '>';
};

Point.prototype.isInfinity = function isInfinity() {
  // XXX This code assumes that zero is always zero in red
  return this.x.cmpn(0) === 0 &&
         this.y.cmp(this.z) === 0;
};

Point.prototype._extDbl = function _extDbl() {
  // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
  //     #doubling-dbl-2008-hwcd
  // 4M + 4S

  // A = X1^2
  var a = this.x.redSqr();
  // B = Y1^2
  var b = this.y.redSqr();
  // C = 2 * Z1^2
  var c = this.z.redSqr();
  c = c.redIAdd(c);
  // D = a * A
  var d = this.curve._mulA(a);
  // E = (X1 + Y1)^2 - A - B
  var e = this.x.redAdd(this.y).redSqr().redISub(a).redISub(b);
  // G = D + B
  var g = d.redAdd(b);
  // F = G - C
  var f = g.redSub(c);
  // H = D - B
  var h = d.redSub(b);
  // X3 = E * F
  var nx = e.redMul(f);
  // Y3 = G * H
  var ny = g.redMul(h);
  // T3 = E * H
  var nt = e.redMul(h);
  // Z3 = F * G
  var nz = f.redMul(g);
  return this.curve.point(nx, ny, nz, nt);
};

Point.prototype._projDbl = function _projDbl() {
  // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
  //     #doubling-dbl-2008-bbjlp
  //     #doubling-dbl-2007-bl
  // and others
  // Generally 3M + 4S or 2M + 4S

  // B = (X1 + Y1)^2
  var b = this.x.redAdd(this.y).redSqr();
  // C = X1^2
  var c = this.x.redSqr();
  // D = Y1^2
  var d = this.y.redSqr();

  var nx;
  var ny;
  var nz;
  if (this.curve.twisted) {
    // E = a * C
    var e = this.curve._mulA(c);
    // F = E + D
    var f = e.redAdd(d);
    if (this.zOne) {
      // X3 = (B - C - D) * (F - 2)
      nx = b.redSub(c).redSub(d).redMul(f.redSub(this.curve.two));
      // Y3 = F * (E - D)
      ny = f.redMul(e.redSub(d));
      // Z3 = F^2 - 2 * F
      nz = f.redSqr().redSub(f).redSub(f);
    } else {
      // H = Z1^2
      var h = this.z.redSqr();
      // J = F - 2 * H
      var j = f.redSub(h).redISub(h);
      // X3 = (B-C-D)*J
      nx = b.redSub(c).redISub(d).redMul(j);
      // Y3 = F * (E - D)
      ny = f.redMul(e.redSub(d));
      // Z3 = F * J
      nz = f.redMul(j);
    }
  } else {
    // E = C + D
    var e = c.redAdd(d);
    // H = (c * Z1)^2
    var h = this.curve._mulC(this.c.redMul(this.z)).redSqr();
    // J = E - 2 * H
    var j = e.redSub(h).redSub(h);
    // X3 = c * (B - E) * J
    nx = this.curve._mulC(b.redISub(e)).redMul(j);
    // Y3 = c * E * (C - D)
    ny = this.curve._mulC(e).redMul(c.redISub(d));
    // Z3 = E * J
    nz = e.redMul(j);
  }
  return this.curve.point(nx, ny, nz);
};

Point.prototype.dbl = function dbl() {
  if (this.isInfinity())
    return this;

  // Double in extended coordinates
  if (this.curve.extended)
    return this._extDbl();
  else
    return this._projDbl();
};

Point.prototype._extAdd = function _extAdd(p) {
  // hyperelliptic.org/EFD/g1p/auto-twisted-extended-1.html
  //     #addition-add-2008-hwcd-3
  // 8M

  // A = (Y1 - X1) * (Y2 - X2)
  var a = this.y.redSub(this.x).redMul(p.y.redSub(p.x));
  // B = (Y1 + X1) * (Y2 + X2)
  var b = this.y.redAdd(this.x).redMul(p.y.redAdd(p.x));
  // C = T1 * k * T2
  var c = this.t.redMul(this.curve.dd).redMul(p.t);
  // D = Z1 * 2 * Z2
  var d = this.z.redMul(p.z.redAdd(p.z));
  // E = B - A
  var e = b.redSub(a);
  // F = D - C
  var f = d.redSub(c);
  // G = D + C
  var g = d.redAdd(c);
  // H = B + A
  var h = b.redAdd(a);
  // X3 = E * F
  var nx = e.redMul(f);
  // Y3 = G * H
  var ny = g.redMul(h);
  // T3 = E * H
  var nt = e.redMul(h);
  // Z3 = F * G
  var nz = f.redMul(g);
  return this.curve.point(nx, ny, nz, nt);
};

Point.prototype._projAdd = function _projAdd(p) {
  // hyperelliptic.org/EFD/g1p/auto-twisted-projective.html
  //     #addition-add-2008-bbjlp
  //     #addition-add-2007-bl
  // 10M + 1S

  // A = Z1 * Z2
  var a = this.z.redMul(p.z);
  // B = A^2
  var b = a.redSqr();
  // C = X1 * X2
  var c = this.x.redMul(p.x);
  // D = Y1 * Y2
  var d = this.y.redMul(p.y);
  // E = d * C * D
  var e = this.curve.d.redMul(c).redMul(d);
  // F = B - E
  var f = b.redSub(e);
  // G = B + E
  var g = b.redAdd(e);
  // X3 = A * F * ((X1 + Y1) * (X2 + Y2) - C - D)
  var tmp = this.x.redAdd(this.y).redMul(p.x.redAdd(p.y)).redISub(c).redISub(d);
  var nx = a.redMul(f).redMul(tmp);
  var ny;
  var nz;
  if (this.curve.twisted) {
    // Y3 = A * G * (D - a * C)
    ny = a.redMul(g).redMul(d.redSub(this.curve._mulA(c)));
    // Z3 = F * G
    nz = f.redMul(g);
  } else {
    // Y3 = A * G * (D - C)
    ny = a.redMul(g).redMul(d.redSub(c));
    // Z3 = c * F * G
    nz = this.curve._mulC(f).redMul(g);
  }
  return this.curve.point(nx, ny, nz);
};

Point.prototype.add = function add(p) {
  if (this.isInfinity())
    return p;
  if (p.isInfinity())
    return this;

  if (this.curve.extended)
    return this._extAdd(p);
  else
    return this._projAdd(p);
};

Point.prototype.mul = function mul(k) {
  if (this._hasDoubles(k))
    return this.curve._fixedNafMul(this, k);
  else
    return this.curve._wnafMul(this, k);
};

Point.prototype.mulAdd = function mulAdd(k1, p, k2) {
  return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, false);
};

Point.prototype.jmulAdd = function jmulAdd(k1, p, k2) {
  return this.curve._wnafMulAdd(1, [ this, p ], [ k1, k2 ], 2, true);
};

Point.prototype.normalize = function normalize() {
  if (this.zOne)
    return this;

  // Normalize coordinates
  var zi = this.z.redInvm();
  this.x = this.x.redMul(zi);
  this.y = this.y.redMul(zi);
  if (this.t)
    this.t = this.t.redMul(zi);
  this.z = this.curve.one;
  this.zOne = true;
  return this;
};

Point.prototype.neg = function neg() {
  return this.curve.point(this.x.redNeg(),
                          this.y,
                          this.z,
                          this.t && this.t.redNeg());
};

Point.prototype.getX = function getX() {
  this.normalize();
  return this.x.fromRed();
};

Point.prototype.getY = function getY() {
  this.normalize();
  return this.y.fromRed();
};

Point.prototype.eq = function eq(other) {
  return this === other ||
         this.getX().cmp(other.getX()) === 0 &&
         this.getY().cmp(other.getY()) === 0;
};

Point.prototype.eqXToP = function eqXToP(x) {
  var rx = x.toRed(this.curve.red).redMul(this.z);
  if (this.x.cmp(rx) === 0)
    return true;

  var xc = x.clone();
  var t = this.curve.redN.redMul(this.z);
  for (;;) {
    xc.iadd(this.curve.n);
    if (xc.cmp(this.curve.p) >= 0)
      return false;

    rx.redIAdd(t);
    if (this.x.cmp(rx) === 0)
      return true;
  }
  return false;
};

// Compatibility with BaseCurve
Point.prototype.toP = Point.prototype.normalize;
Point.prototype.mixedAdd = Point.prototype.add;


/***/ }),

/***/ 2092:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var curves = exports;

var hash = __webpack_require__(989);
var elliptic = __webpack_require__(538);

var assert = elliptic.utils.assert;

function PresetCurve(options) {
  if (options.type === 'short')
    this.curve = new elliptic.curve.short(options);
  else if (options.type === 'edwards')
    this.curve = new elliptic.curve.edwards(options);
  else
    this.curve = new elliptic.curve.mont(options);
  this.g = this.curve.g;
  this.n = this.curve.n;
  this.hash = options.hash;

  assert(this.g.validate(), 'Invalid curve');
  assert(this.g.mul(this.n).isInfinity(), 'Invalid curve, G*N != O');
}
curves.PresetCurve = PresetCurve;

function defineCurve(name, options) {
  Object.defineProperty(curves, name, {
    configurable: true,
    enumerable: true,
    get: function() {
      var curve = new PresetCurve(options);
      Object.defineProperty(curves, name, {
        configurable: true,
        enumerable: true,
        value: curve
      });
      return curve;
    }
  });
}

defineCurve('p192', {
  type: 'short',
  prime: 'p192',
  p: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff',
  a: 'ffffffff ffffffff ffffffff fffffffe ffffffff fffffffc',
  b: '64210519 e59c80e7 0fa7e9ab 72243049 feb8deec c146b9b1',
  n: 'ffffffff ffffffff ffffffff 99def836 146bc9b1 b4d22831',
  hash: hash.sha256,
  gRed: false,
  g: [
    '188da80e b03090f6 7cbf20eb 43a18800 f4ff0afd 82ff1012',
    '07192b95 ffc8da78 631011ed 6b24cdd5 73f977a1 1e794811'
  ]
});

defineCurve('p224', {
  type: 'short',
  prime: 'p224',
  p: 'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001',
  a: 'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff fffffffe',
  b: 'b4050a85 0c04b3ab f5413256 5044b0b7 d7bfd8ba 270b3943 2355ffb4',
  n: 'ffffffff ffffffff ffffffff ffff16a2 e0b8f03e 13dd2945 5c5c2a3d',
  hash: hash.sha256,
  gRed: false,
  g: [
    'b70e0cbd 6bb4bf7f 321390b9 4a03c1d3 56c21122 343280d6 115c1d21',
    'bd376388 b5f723fb 4c22dfe6 cd4375a0 5a074764 44d58199 85007e34'
  ]
});

defineCurve('p256', {
  type: 'short',
  prime: null,
  p: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff ffffffff',
  a: 'ffffffff 00000001 00000000 00000000 00000000 ffffffff ffffffff fffffffc',
  b: '5ac635d8 aa3a93e7 b3ebbd55 769886bc 651d06b0 cc53b0f6 3bce3c3e 27d2604b',
  n: 'ffffffff 00000000 ffffffff ffffffff bce6faad a7179e84 f3b9cac2 fc632551',
  hash: hash.sha256,
  gRed: false,
  g: [
    '6b17d1f2 e12c4247 f8bce6e5 63a440f2 77037d81 2deb33a0 f4a13945 d898c296',
    '4fe342e2 fe1a7f9b 8ee7eb4a 7c0f9e16 2bce3357 6b315ece cbb64068 37bf51f5'
  ]
});

defineCurve('p384', {
  type: 'short',
  prime: null,
  p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'fffffffe ffffffff 00000000 00000000 ffffffff',
  a: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'fffffffe ffffffff 00000000 00000000 fffffffc',
  b: 'b3312fa7 e23ee7e4 988e056b e3f82d19 181d9c6e fe814112 0314088f ' +
     '5013875a c656398d 8a2ed19d 2a85c8ed d3ec2aef',
  n: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff c7634d81 ' +
     'f4372ddf 581a0db2 48b0a77a ecec196a ccc52973',
  hash: hash.sha384,
  gRed: false,
  g: [
    'aa87ca22 be8b0537 8eb1c71e f320ad74 6e1d3b62 8ba79b98 59f741e0 82542a38 ' +
    '5502f25d bf55296c 3a545e38 72760ab7',
    '3617de4a 96262c6f 5d9e98bf 9292dc29 f8f41dbd 289a147c e9da3113 b5f0b8c0 ' +
    '0a60b1ce 1d7e819d 7a431d7c 90ea0e5f'
  ]
});

defineCurve('p521', {
  type: 'short',
  prime: null,
  p: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff ffffffff',
  a: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff ffffffff ffffffff fffffffc',
  b: '00000051 953eb961 8e1c9a1f 929a21a0 b68540ee a2da725b ' +
     '99b315f3 b8b48991 8ef109e1 56193951 ec7e937b 1652c0bd ' +
     '3bb1bf07 3573df88 3d2c34f1 ef451fd4 6b503f00',
  n: '000001ff ffffffff ffffffff ffffffff ffffffff ffffffff ' +
     'ffffffff ffffffff fffffffa 51868783 bf2f966b 7fcc0148 ' +
     'f709a5d0 3bb5c9b8 899c47ae bb6fb71e 91386409',
  hash: hash.sha512,
  gRed: false,
  g: [
    '000000c6 858e06b7 0404e9cd 9e3ecb66 2395b442 9c648139 ' +
    '053fb521 f828af60 6b4d3dba a14b5e77 efe75928 fe1dc127 ' +
    'a2ffa8de 3348b3c1 856a429b f97e7e31 c2e5bd66',
    '00000118 39296a78 9a3bc004 5c8a5fb4 2c7d1bd9 98f54449 ' +
    '579b4468 17afbd17 273e662c 97ee7299 5ef42640 c550b901 ' +
    '3fad0761 353c7086 a272c240 88be9476 9fd16650'
  ]
});

defineCurve('curve25519', {
  type: 'mont',
  prime: 'p25519',
  p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
  a: '76d06',
  b: '1',
  n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
  hash: hash.sha256,
  gRed: false,
  g: [
    '9'
  ]
});

defineCurve('ed25519', {
  type: 'edwards',
  prime: 'p25519',
  p: '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
  a: '-1',
  c: '1',
  // -121665 * (121666^(-1)) (mod P)
  d: '52036cee2b6ffe73 8cc740797779e898 00700a4d4141d8ab 75eb4dca135978a3',
  n: '1000000000000000 0000000000000000 14def9dea2f79cd6 5812631a5cf5d3ed',
  hash: hash.sha256,
  gRed: false,
  g: [
    '216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a',

    // 4/5
    '6666666666666666666666666666666666666666666666666666666666666658'
  ]
});

var pre;
try {
  pre = __webpack_require__(2099);
} catch (e) {
  pre = undefined;
}

defineCurve('secp256k1', {
  type: 'short',
  prime: 'k256',
  p: 'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f',
  a: '0',
  b: '7',
  n: 'ffffffff ffffffff ffffffff fffffffe baaedce6 af48a03b bfd25e8c d0364141',
  h: '1',
  hash: hash.sha256,

  // Precomputed endomorphism
  beta: '7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee',
  lambda: '5363ad4cc05c30e0a5261c028812645a122e22ea20816678df02967c1b23bd72',
  basis: [
    {
      a: '3086d221a7d46bcde86c90e49284eb15',
      b: '-e4437ed6010e88286f547fa90abfe4c3'
    },
    {
      a: '114ca50f7a8e2f3f657c1108d9d44cfd8',
      b: '3086d221a7d46bcde86c90e49284eb15'
    }
  ],

  gRed: false,
  g: [
    '79be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798',
    '483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8',
    pre
  ]
});


/***/ }),

/***/ 2093:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.sha1 = __webpack_require__(2094);
exports.sha224 = __webpack_require__(2095);
exports.sha256 = __webpack_require__(1968);
exports.sha384 = __webpack_require__(2096);
exports.sha512 = __webpack_require__(1969);


/***/ }),

/***/ 2094:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(588);
var common = __webpack_require__(752);
var shaCommon = __webpack_require__(1967);

var rotl32 = utils.rotl32;
var sum32 = utils.sum32;
var sum32_5 = utils.sum32_5;
var ft_1 = shaCommon.ft_1;
var BlockHash = common.BlockHash;

var sha1_K = [
  0x5A827999, 0x6ED9EBA1,
  0x8F1BBCDC, 0xCA62C1D6
];

function SHA1() {
  if (!(this instanceof SHA1))
    return new SHA1();

  BlockHash.call(this);
  this.h = [
    0x67452301, 0xefcdab89, 0x98badcfe,
    0x10325476, 0xc3d2e1f0 ];
  this.W = new Array(80);
}

utils.inherits(SHA1, BlockHash);
module.exports = SHA1;

SHA1.blockSize = 512;
SHA1.outSize = 160;
SHA1.hmacStrength = 80;
SHA1.padLength = 64;

SHA1.prototype._update = function _update(msg, start) {
  var W = this.W;

  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];

  for(; i < W.length; i++)
    W[i] = rotl32(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

  var a = this.h[0];
  var b = this.h[1];
  var c = this.h[2];
  var d = this.h[3];
  var e = this.h[4];

  for (i = 0; i < W.length; i++) {
    var s = ~~(i / 20);
    var t = sum32_5(rotl32(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
    e = d;
    d = c;
    c = rotl32(b, 30);
    b = a;
    a = t;
  }

  this.h[0] = sum32(this.h[0], a);
  this.h[1] = sum32(this.h[1], b);
  this.h[2] = sum32(this.h[2], c);
  this.h[3] = sum32(this.h[3], d);
  this.h[4] = sum32(this.h[4], e);
};

SHA1.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'big');
  else
    return utils.split32(this.h, 'big');
};


/***/ }),

/***/ 2095:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(588);
var SHA256 = __webpack_require__(1968);

function SHA224() {
  if (!(this instanceof SHA224))
    return new SHA224();

  SHA256.call(this);
  this.h = [
    0xc1059ed8, 0x367cd507, 0x3070dd17, 0xf70e5939,
    0xffc00b31, 0x68581511, 0x64f98fa7, 0xbefa4fa4 ];
}
utils.inherits(SHA224, SHA256);
module.exports = SHA224;

SHA224.blockSize = 512;
SHA224.outSize = 224;
SHA224.hmacStrength = 192;
SHA224.padLength = 64;

SHA224.prototype._digest = function digest(enc) {
  // Just truncate output
  if (enc === 'hex')
    return utils.toHex32(this.h.slice(0, 7), 'big');
  else
    return utils.split32(this.h.slice(0, 7), 'big');
};



/***/ }),

/***/ 2096:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(588);

var SHA512 = __webpack_require__(1969);

function SHA384() {
  if (!(this instanceof SHA384))
    return new SHA384();

  SHA512.call(this);
  this.h = [
    0xcbbb9d5d, 0xc1059ed8,
    0x629a292a, 0x367cd507,
    0x9159015a, 0x3070dd17,
    0x152fecd8, 0xf70e5939,
    0x67332667, 0xffc00b31,
    0x8eb44a87, 0x68581511,
    0xdb0c2e0d, 0x64f98fa7,
    0x47b5481d, 0xbefa4fa4 ];
}
utils.inherits(SHA384, SHA512);
module.exports = SHA384;

SHA384.blockSize = 1024;
SHA384.outSize = 384;
SHA384.hmacStrength = 192;
SHA384.padLength = 128;

SHA384.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h.slice(0, 12), 'big');
  else
    return utils.split32(this.h.slice(0, 12), 'big');
};


/***/ }),

/***/ 2097:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(588);
var common = __webpack_require__(752);

var rotl32 = utils.rotl32;
var sum32 = utils.sum32;
var sum32_3 = utils.sum32_3;
var sum32_4 = utils.sum32_4;
var BlockHash = common.BlockHash;

function RIPEMD160() {
  if (!(this instanceof RIPEMD160))
    return new RIPEMD160();

  BlockHash.call(this);

  this.h = [ 0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0 ];
  this.endian = 'little';
}
utils.inherits(RIPEMD160, BlockHash);
exports.ripemd160 = RIPEMD160;

RIPEMD160.blockSize = 512;
RIPEMD160.outSize = 160;
RIPEMD160.hmacStrength = 192;
RIPEMD160.padLength = 64;

RIPEMD160.prototype._update = function update(msg, start) {
  var A = this.h[0];
  var B = this.h[1];
  var C = this.h[2];
  var D = this.h[3];
  var E = this.h[4];
  var Ah = A;
  var Bh = B;
  var Ch = C;
  var Dh = D;
  var Eh = E;
  for (var j = 0; j < 80; j++) {
    var T = sum32(
      rotl32(
        sum32_4(A, f(j, B, C, D), msg[r[j] + start], K(j)),
        s[j]),
      E);
    A = E;
    E = D;
    D = rotl32(C, 10);
    C = B;
    B = T;
    T = sum32(
      rotl32(
        sum32_4(Ah, f(79 - j, Bh, Ch, Dh), msg[rh[j] + start], Kh(j)),
        sh[j]),
      Eh);
    Ah = Eh;
    Eh = Dh;
    Dh = rotl32(Ch, 10);
    Ch = Bh;
    Bh = T;
  }
  T = sum32_3(this.h[1], C, Dh);
  this.h[1] = sum32_3(this.h[2], D, Eh);
  this.h[2] = sum32_3(this.h[3], E, Ah);
  this.h[3] = sum32_3(this.h[4], A, Bh);
  this.h[4] = sum32_3(this.h[0], B, Ch);
  this.h[0] = T;
};

RIPEMD160.prototype._digest = function digest(enc) {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'little');
  else
    return utils.split32(this.h, 'little');
};

function f(j, x, y, z) {
  if (j <= 15)
    return x ^ y ^ z;
  else if (j <= 31)
    return (x & y) | ((~x) & z);
  else if (j <= 47)
    return (x | (~y)) ^ z;
  else if (j <= 63)
    return (x & z) | (y & (~z));
  else
    return x ^ (y | (~z));
}

function K(j) {
  if (j <= 15)
    return 0x00000000;
  else if (j <= 31)
    return 0x5a827999;
  else if (j <= 47)
    return 0x6ed9eba1;
  else if (j <= 63)
    return 0x8f1bbcdc;
  else
    return 0xa953fd4e;
}

function Kh(j) {
  if (j <= 15)
    return 0x50a28be6;
  else if (j <= 31)
    return 0x5c4dd124;
  else if (j <= 47)
    return 0x6d703ef3;
  else if (j <= 63)
    return 0x7a6d76e9;
  else
    return 0x00000000;
}

var r = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8,
  3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12,
  1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2,
  4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
];

var rh = [
  5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12,
  6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2,
  15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13,
  8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14,
  12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
];

var s = [
  11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8,
  7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12,
  11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5,
  11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12,
  9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
];

var sh = [
  8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6,
  9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11,
  9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5,
  15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8,
  8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
];


/***/ }),

/***/ 2098:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(588);
var assert = __webpack_require__(563);

function Hmac(hash, key, enc) {
  if (!(this instanceof Hmac))
    return new Hmac(hash, key, enc);
  this.Hash = hash;
  this.blockSize = hash.blockSize / 8;
  this.outSize = hash.outSize / 8;
  this.inner = null;
  this.outer = null;

  this._init(utils.toArray(key, enc));
}
module.exports = Hmac;

Hmac.prototype._init = function init(key) {
  // Shorten key, if needed
  if (key.length > this.blockSize)
    key = new this.Hash().update(key).digest();
  assert(key.length <= this.blockSize);

  // Add padding to key
  for (var i = key.length; i < this.blockSize; i++)
    key.push(0);

  for (i = 0; i < key.length; i++)
    key[i] ^= 0x36;
  this.inner = new this.Hash().update(key);

  // 0x36 ^ 0x5c = 0x6a
  for (i = 0; i < key.length; i++)
    key[i] ^= 0x6a;
  this.outer = new this.Hash().update(key);
};

Hmac.prototype.update = function update(msg, enc) {
  this.inner.update(msg, enc);
  return this;
};

Hmac.prototype.digest = function digest(enc) {
  this.outer.update(this.inner.digest());
  return this.outer.digest(enc);
};


/***/ }),

/***/ 2099:
/***/ (function(module, exports) {

module.exports = {
  doubles: {
    step: 4,
    points: [
      [
        'e60fce93b59e9ec53011aabc21c23e97b2a31369b87a5ae9c44ee89e2a6dec0a',
        'f7e3507399e595929db99f34f57937101296891e44d23f0be1f32cce69616821'
      ],
      [
        '8282263212c609d9ea2a6e3e172de238d8c39cabd5ac1ca10646e23fd5f51508',
        '11f8a8098557dfe45e8256e830b60ace62d613ac2f7b17bed31b6eaff6e26caf'
      ],
      [
        '175e159f728b865a72f99cc6c6fc846de0b93833fd2222ed73fce5b551e5b739',
        'd3506e0d9e3c79eba4ef97a51ff71f5eacb5955add24345c6efa6ffee9fed695'
      ],
      [
        '363d90d447b00c9c99ceac05b6262ee053441c7e55552ffe526bad8f83ff4640',
        '4e273adfc732221953b445397f3363145b9a89008199ecb62003c7f3bee9de9'
      ],
      [
        '8b4b5f165df3c2be8c6244b5b745638843e4a781a15bcd1b69f79a55dffdf80c',
        '4aad0a6f68d308b4b3fbd7813ab0da04f9e336546162ee56b3eff0c65fd4fd36'
      ],
      [
        '723cbaa6e5db996d6bf771c00bd548c7b700dbffa6c0e77bcb6115925232fcda',
        '96e867b5595cc498a921137488824d6e2660a0653779494801dc069d9eb39f5f'
      ],
      [
        'eebfa4d493bebf98ba5feec812c2d3b50947961237a919839a533eca0e7dd7fa',
        '5d9a8ca3970ef0f269ee7edaf178089d9ae4cdc3a711f712ddfd4fdae1de8999'
      ],
      [
        '100f44da696e71672791d0a09b7bde459f1215a29b3c03bfefd7835b39a48db0',
        'cdd9e13192a00b772ec8f3300c090666b7ff4a18ff5195ac0fbd5cd62bc65a09'
      ],
      [
        'e1031be262c7ed1b1dc9227a4a04c017a77f8d4464f3b3852c8acde6e534fd2d',
        '9d7061928940405e6bb6a4176597535af292dd419e1ced79a44f18f29456a00d'
      ],
      [
        'feea6cae46d55b530ac2839f143bd7ec5cf8b266a41d6af52d5e688d9094696d',
        'e57c6b6c97dce1bab06e4e12bf3ecd5c981c8957cc41442d3155debf18090088'
      ],
      [
        'da67a91d91049cdcb367be4be6ffca3cfeed657d808583de33fa978bc1ec6cb1',
        '9bacaa35481642bc41f463f7ec9780e5dec7adc508f740a17e9ea8e27a68be1d'
      ],
      [
        '53904faa0b334cdda6e000935ef22151ec08d0f7bb11069f57545ccc1a37b7c0',
        '5bc087d0bc80106d88c9eccac20d3c1c13999981e14434699dcb096b022771c8'
      ],
      [
        '8e7bcd0bd35983a7719cca7764ca906779b53a043a9b8bcaeff959f43ad86047',
        '10b7770b2a3da4b3940310420ca9514579e88e2e47fd68b3ea10047e8460372a'
      ],
      [
        '385eed34c1cdff21e6d0818689b81bde71a7f4f18397e6690a841e1599c43862',
        '283bebc3e8ea23f56701de19e9ebf4576b304eec2086dc8cc0458fe5542e5453'
      ],
      [
        '6f9d9b803ecf191637c73a4413dfa180fddf84a5947fbc9c606ed86c3fac3a7',
        '7c80c68e603059ba69b8e2a30e45c4d47ea4dd2f5c281002d86890603a842160'
      ],
      [
        '3322d401243c4e2582a2147c104d6ecbf774d163db0f5e5313b7e0e742d0e6bd',
        '56e70797e9664ef5bfb019bc4ddaf9b72805f63ea2873af624f3a2e96c28b2a0'
      ],
      [
        '85672c7d2de0b7da2bd1770d89665868741b3f9af7643397721d74d28134ab83',
        '7c481b9b5b43b2eb6374049bfa62c2e5e77f17fcc5298f44c8e3094f790313a6'
      ],
      [
        '948bf809b1988a46b06c9f1919413b10f9226c60f668832ffd959af60c82a0a',
        '53a562856dcb6646dc6b74c5d1c3418c6d4dff08c97cd2bed4cb7f88d8c8e589'
      ],
      [
        '6260ce7f461801c34f067ce0f02873a8f1b0e44dfc69752accecd819f38fd8e8',
        'bc2da82b6fa5b571a7f09049776a1ef7ecd292238051c198c1a84e95b2b4ae17'
      ],
      [
        'e5037de0afc1d8d43d8348414bbf4103043ec8f575bfdc432953cc8d2037fa2d',
        '4571534baa94d3b5f9f98d09fb990bddbd5f5b03ec481f10e0e5dc841d755bda'
      ],
      [
        'e06372b0f4a207adf5ea905e8f1771b4e7e8dbd1c6a6c5b725866a0ae4fce725',
        '7a908974bce18cfe12a27bb2ad5a488cd7484a7787104870b27034f94eee31dd'
      ],
      [
        '213c7a715cd5d45358d0bbf9dc0ce02204b10bdde2a3f58540ad6908d0559754',
        '4b6dad0b5ae462507013ad06245ba190bb4850f5f36a7eeddff2c27534b458f2'
      ],
      [
        '4e7c272a7af4b34e8dbb9352a5419a87e2838c70adc62cddf0cc3a3b08fbd53c',
        '17749c766c9d0b18e16fd09f6def681b530b9614bff7dd33e0b3941817dcaae6'
      ],
      [
        'fea74e3dbe778b1b10f238ad61686aa5c76e3db2be43057632427e2840fb27b6',
        '6e0568db9b0b13297cf674deccb6af93126b596b973f7b77701d3db7f23cb96f'
      ],
      [
        '76e64113f677cf0e10a2570d599968d31544e179b760432952c02a4417bdde39',
        'c90ddf8dee4e95cf577066d70681f0d35e2a33d2b56d2032b4b1752d1901ac01'
      ],
      [
        'c738c56b03b2abe1e8281baa743f8f9a8f7cc643df26cbee3ab150242bcbb891',
        '893fb578951ad2537f718f2eacbfbbbb82314eef7880cfe917e735d9699a84c3'
      ],
      [
        'd895626548b65b81e264c7637c972877d1d72e5f3a925014372e9f6588f6c14b',
        'febfaa38f2bc7eae728ec60818c340eb03428d632bb067e179363ed75d7d991f'
      ],
      [
        'b8da94032a957518eb0f6433571e8761ceffc73693e84edd49150a564f676e03',
        '2804dfa44805a1e4d7c99cc9762808b092cc584d95ff3b511488e4e74efdf6e7'
      ],
      [
        'e80fea14441fb33a7d8adab9475d7fab2019effb5156a792f1a11778e3c0df5d',
        'eed1de7f638e00771e89768ca3ca94472d155e80af322ea9fcb4291b6ac9ec78'
      ],
      [
        'a301697bdfcd704313ba48e51d567543f2a182031efd6915ddc07bbcc4e16070',
        '7370f91cfb67e4f5081809fa25d40f9b1735dbf7c0a11a130c0d1a041e177ea1'
      ],
      [
        '90ad85b389d6b936463f9d0512678de208cc330b11307fffab7ac63e3fb04ed4',
        'e507a3620a38261affdcbd9427222b839aefabe1582894d991d4d48cb6ef150'
      ],
      [
        '8f68b9d2f63b5f339239c1ad981f162ee88c5678723ea3351b7b444c9ec4c0da',
        '662a9f2dba063986de1d90c2b6be215dbbea2cfe95510bfdf23cbf79501fff82'
      ],
      [
        'e4f3fb0176af85d65ff99ff9198c36091f48e86503681e3e6686fd5053231e11',
        '1e63633ad0ef4f1c1661a6d0ea02b7286cc7e74ec951d1c9822c38576feb73bc'
      ],
      [
        '8c00fa9b18ebf331eb961537a45a4266c7034f2f0d4e1d0716fb6eae20eae29e',
        'efa47267fea521a1a9dc343a3736c974c2fadafa81e36c54e7d2a4c66702414b'
      ],
      [
        'e7a26ce69dd4829f3e10cec0a9e98ed3143d084f308b92c0997fddfc60cb3e41',
        '2a758e300fa7984b471b006a1aafbb18d0a6b2c0420e83e20e8a9421cf2cfd51'
      ],
      [
        'b6459e0ee3662ec8d23540c223bcbdc571cbcb967d79424f3cf29eb3de6b80ef',
        '67c876d06f3e06de1dadf16e5661db3c4b3ae6d48e35b2ff30bf0b61a71ba45'
      ],
      [
        'd68a80c8280bb840793234aa118f06231d6f1fc67e73c5a5deda0f5b496943e8',
        'db8ba9fff4b586d00c4b1f9177b0e28b5b0e7b8f7845295a294c84266b133120'
      ],
      [
        '324aed7df65c804252dc0270907a30b09612aeb973449cea4095980fc28d3d5d',
        '648a365774b61f2ff130c0c35aec1f4f19213b0c7e332843967224af96ab7c84'
      ],
      [
        '4df9c14919cde61f6d51dfdbe5fee5dceec4143ba8d1ca888e8bd373fd054c96',
        '35ec51092d8728050974c23a1d85d4b5d506cdc288490192ebac06cad10d5d'
      ],
      [
        '9c3919a84a474870faed8a9c1cc66021523489054d7f0308cbfc99c8ac1f98cd',
        'ddb84f0f4a4ddd57584f044bf260e641905326f76c64c8e6be7e5e03d4fc599d'
      ],
      [
        '6057170b1dd12fdf8de05f281d8e06bb91e1493a8b91d4cc5a21382120a959e5',
        '9a1af0b26a6a4807add9a2daf71df262465152bc3ee24c65e899be932385a2a8'
      ],
      [
        'a576df8e23a08411421439a4518da31880cef0fba7d4df12b1a6973eecb94266',
        '40a6bf20e76640b2c92b97afe58cd82c432e10a7f514d9f3ee8be11ae1b28ec8'
      ],
      [
        '7778a78c28dec3e30a05fe9629de8c38bb30d1f5cf9a3a208f763889be58ad71',
        '34626d9ab5a5b22ff7098e12f2ff580087b38411ff24ac563b513fc1fd9f43ac'
      ],
      [
        '928955ee637a84463729fd30e7afd2ed5f96274e5ad7e5cb09eda9c06d903ac',
        'c25621003d3f42a827b78a13093a95eeac3d26efa8a8d83fc5180e935bcd091f'
      ],
      [
        '85d0fef3ec6db109399064f3a0e3b2855645b4a907ad354527aae75163d82751',
        '1f03648413a38c0be29d496e582cf5663e8751e96877331582c237a24eb1f962'
      ],
      [
        'ff2b0dce97eece97c1c9b6041798b85dfdfb6d8882da20308f5404824526087e',
        '493d13fef524ba188af4c4dc54d07936c7b7ed6fb90e2ceb2c951e01f0c29907'
      ],
      [
        '827fbbe4b1e880ea9ed2b2e6301b212b57f1ee148cd6dd28780e5e2cf856e241',
        'c60f9c923c727b0b71bef2c67d1d12687ff7a63186903166d605b68baec293ec'
      ],
      [
        'eaa649f21f51bdbae7be4ae34ce6e5217a58fdce7f47f9aa7f3b58fa2120e2b3',
        'be3279ed5bbbb03ac69a80f89879aa5a01a6b965f13f7e59d47a5305ba5ad93d'
      ],
      [
        'e4a42d43c5cf169d9391df6decf42ee541b6d8f0c9a137401e23632dda34d24f',
        '4d9f92e716d1c73526fc99ccfb8ad34ce886eedfa8d8e4f13a7f7131deba9414'
      ],
      [
        '1ec80fef360cbdd954160fadab352b6b92b53576a88fea4947173b9d4300bf19',
        'aeefe93756b5340d2f3a4958a7abbf5e0146e77f6295a07b671cdc1cc107cefd'
      ],
      [
        '146a778c04670c2f91b00af4680dfa8bce3490717d58ba889ddb5928366642be',
        'b318e0ec3354028add669827f9d4b2870aaa971d2f7e5ed1d0b297483d83efd0'
      ],
      [
        'fa50c0f61d22e5f07e3acebb1aa07b128d0012209a28b9776d76a8793180eef9',
        '6b84c6922397eba9b72cd2872281a68a5e683293a57a213b38cd8d7d3f4f2811'
      ],
      [
        'da1d61d0ca721a11b1a5bf6b7d88e8421a288ab5d5bba5220e53d32b5f067ec2',
        '8157f55a7c99306c79c0766161c91e2966a73899d279b48a655fba0f1ad836f1'
      ],
      [
        'a8e282ff0c9706907215ff98e8fd416615311de0446f1e062a73b0610d064e13',
        '7f97355b8db81c09abfb7f3c5b2515888b679a3e50dd6bd6cef7c73111f4cc0c'
      ],
      [
        '174a53b9c9a285872d39e56e6913cab15d59b1fa512508c022f382de8319497c',
        'ccc9dc37abfc9c1657b4155f2c47f9e6646b3a1d8cb9854383da13ac079afa73'
      ],
      [
        '959396981943785c3d3e57edf5018cdbe039e730e4918b3d884fdff09475b7ba',
        '2e7e552888c331dd8ba0386a4b9cd6849c653f64c8709385e9b8abf87524f2fd'
      ],
      [
        'd2a63a50ae401e56d645a1153b109a8fcca0a43d561fba2dbb51340c9d82b151',
        'e82d86fb6443fcb7565aee58b2948220a70f750af484ca52d4142174dcf89405'
      ],
      [
        '64587e2335471eb890ee7896d7cfdc866bacbdbd3839317b3436f9b45617e073',
        'd99fcdd5bf6902e2ae96dd6447c299a185b90a39133aeab358299e5e9faf6589'
      ],
      [
        '8481bde0e4e4d885b3a546d3e549de042f0aa6cea250e7fd358d6c86dd45e458',
        '38ee7b8cba5404dd84a25bf39cecb2ca900a79c42b262e556d64b1b59779057e'
      ],
      [
        '13464a57a78102aa62b6979ae817f4637ffcfed3c4b1ce30bcd6303f6caf666b',
        '69be159004614580ef7e433453ccb0ca48f300a81d0942e13f495a907f6ecc27'
      ],
      [
        'bc4a9df5b713fe2e9aef430bcc1dc97a0cd9ccede2f28588cada3a0d2d83f366',
        'd3a81ca6e785c06383937adf4b798caa6e8a9fbfa547b16d758d666581f33c1'
      ],
      [
        '8c28a97bf8298bc0d23d8c749452a32e694b65e30a9472a3954ab30fe5324caa',
        '40a30463a3305193378fedf31f7cc0eb7ae784f0451cb9459e71dc73cbef9482'
      ],
      [
        '8ea9666139527a8c1dd94ce4f071fd23c8b350c5a4bb33748c4ba111faccae0',
        '620efabbc8ee2782e24e7c0cfb95c5d735b783be9cf0f8e955af34a30e62b945'
      ],
      [
        'dd3625faef5ba06074669716bbd3788d89bdde815959968092f76cc4eb9a9787',
        '7a188fa3520e30d461da2501045731ca941461982883395937f68d00c644a573'
      ],
      [
        'f710d79d9eb962297e4f6232b40e8f7feb2bc63814614d692c12de752408221e',
        'ea98e67232d3b3295d3b535532115ccac8612c721851617526ae47a9c77bfc82'
      ]
    ]
  },
  naf: {
    wnd: 7,
    points: [
      [
        'f9308a019258c31049344f85f89d5229b531c845836f99b08601f113bce036f9',
        '388f7b0f632de8140fe337e62a37f3566500a99934c2231b6cb9fd7584b8e672'
      ],
      [
        '2f8bde4d1a07209355b4a7250a5c5128e88b84bddc619ab7cba8d569b240efe4',
        'd8ac222636e5e3d6d4dba9dda6c9c426f788271bab0d6840dca87d3aa6ac62d6'
      ],
      [
        '5cbdf0646e5db4eaa398f365f2ea7a0e3d419b7e0330e39ce92bddedcac4f9bc',
        '6aebca40ba255960a3178d6d861a54dba813d0b813fde7b5a5082628087264da'
      ],
      [
        'acd484e2f0c7f65309ad178a9f559abde09796974c57e714c35f110dfc27ccbe',
        'cc338921b0a7d9fd64380971763b61e9add888a4375f8e0f05cc262ac64f9c37'
      ],
      [
        '774ae7f858a9411e5ef4246b70c65aac5649980be5c17891bbec17895da008cb',
        'd984a032eb6b5e190243dd56d7b7b365372db1e2dff9d6a8301d74c9c953c61b'
      ],
      [
        'f28773c2d975288bc7d1d205c3748651b075fbc6610e58cddeeddf8f19405aa8',
        'ab0902e8d880a89758212eb65cdaf473a1a06da521fa91f29b5cb52db03ed81'
      ],
      [
        'd7924d4f7d43ea965a465ae3095ff41131e5946f3c85f79e44adbcf8e27e080e',
        '581e2872a86c72a683842ec228cc6defea40af2bd896d3a5c504dc9ff6a26b58'
      ],
      [
        'defdea4cdb677750a420fee807eacf21eb9898ae79b9768766e4faa04a2d4a34',
        '4211ab0694635168e997b0ead2a93daeced1f4a04a95c0f6cfb199f69e56eb77'
      ],
      [
        '2b4ea0a797a443d293ef5cff444f4979f06acfebd7e86d277475656138385b6c',
        '85e89bc037945d93b343083b5a1c86131a01f60c50269763b570c854e5c09b7a'
      ],
      [
        '352bbf4a4cdd12564f93fa332ce333301d9ad40271f8107181340aef25be59d5',
        '321eb4075348f534d59c18259dda3e1f4a1b3b2e71b1039c67bd3d8bcf81998c'
      ],
      [
        '2fa2104d6b38d11b0230010559879124e42ab8dfeff5ff29dc9cdadd4ecacc3f',
        '2de1068295dd865b64569335bd5dd80181d70ecfc882648423ba76b532b7d67'
      ],
      [
        '9248279b09b4d68dab21a9b066edda83263c3d84e09572e269ca0cd7f5453714',
        '73016f7bf234aade5d1aa71bdea2b1ff3fc0de2a887912ffe54a32ce97cb3402'
      ],
      [
        'daed4f2be3a8bf278e70132fb0beb7522f570e144bf615c07e996d443dee8729',
        'a69dce4a7d6c98e8d4a1aca87ef8d7003f83c230f3afa726ab40e52290be1c55'
      ],
      [
        'c44d12c7065d812e8acf28d7cbb19f9011ecd9e9fdf281b0e6a3b5e87d22e7db',
        '2119a460ce326cdc76c45926c982fdac0e106e861edf61c5a039063f0e0e6482'
      ],
      [
        '6a245bf6dc698504c89a20cfded60853152b695336c28063b61c65cbd269e6b4',
        'e022cf42c2bd4a708b3f5126f16a24ad8b33ba48d0423b6efd5e6348100d8a82'
      ],
      [
        '1697ffa6fd9de627c077e3d2fe541084ce13300b0bec1146f95ae57f0d0bd6a5',
        'b9c398f186806f5d27561506e4557433a2cf15009e498ae7adee9d63d01b2396'
      ],
      [
        '605bdb019981718b986d0f07e834cb0d9deb8360ffb7f61df982345ef27a7479',
        '2972d2de4f8d20681a78d93ec96fe23c26bfae84fb14db43b01e1e9056b8c49'
      ],
      [
        '62d14dab4150bf497402fdc45a215e10dcb01c354959b10cfe31c7e9d87ff33d',
        '80fc06bd8cc5b01098088a1950eed0db01aa132967ab472235f5642483b25eaf'
      ],
      [
        '80c60ad0040f27dade5b4b06c408e56b2c50e9f56b9b8b425e555c2f86308b6f',
        '1c38303f1cc5c30f26e66bad7fe72f70a65eed4cbe7024eb1aa01f56430bd57a'
      ],
      [
        '7a9375ad6167ad54aa74c6348cc54d344cc5dc9487d847049d5eabb0fa03c8fb',
        'd0e3fa9eca8726909559e0d79269046bdc59ea10c70ce2b02d499ec224dc7f7'
      ],
      [
        'd528ecd9b696b54c907a9ed045447a79bb408ec39b68df504bb51f459bc3ffc9',
        'eecf41253136e5f99966f21881fd656ebc4345405c520dbc063465b521409933'
      ],
      [
        '49370a4b5f43412ea25f514e8ecdad05266115e4a7ecb1387231808f8b45963',
        '758f3f41afd6ed428b3081b0512fd62a54c3f3afbb5b6764b653052a12949c9a'
      ],
      [
        '77f230936ee88cbbd73df930d64702ef881d811e0e1498e2f1c13eb1fc345d74',
        '958ef42a7886b6400a08266e9ba1b37896c95330d97077cbbe8eb3c7671c60d6'
      ],
      [
        'f2dac991cc4ce4b9ea44887e5c7c0bce58c80074ab9d4dbaeb28531b7739f530',
        'e0dedc9b3b2f8dad4da1f32dec2531df9eb5fbeb0598e4fd1a117dba703a3c37'
      ],
      [
        '463b3d9f662621fb1b4be8fbbe2520125a216cdfc9dae3debcba4850c690d45b',
        '5ed430d78c296c3543114306dd8622d7c622e27c970a1de31cb377b01af7307e'
      ],
      [
        'f16f804244e46e2a09232d4aff3b59976b98fac14328a2d1a32496b49998f247',
        'cedabd9b82203f7e13d206fcdf4e33d92a6c53c26e5cce26d6579962c4e31df6'
      ],
      [
        'caf754272dc84563b0352b7a14311af55d245315ace27c65369e15f7151d41d1',
        'cb474660ef35f5f2a41b643fa5e460575f4fa9b7962232a5c32f908318a04476'
      ],
      [
        '2600ca4b282cb986f85d0f1709979d8b44a09c07cb86d7c124497bc86f082120',
        '4119b88753c15bd6a693b03fcddbb45d5ac6be74ab5f0ef44b0be9475a7e4b40'
      ],
      [
        '7635ca72d7e8432c338ec53cd12220bc01c48685e24f7dc8c602a7746998e435',
        '91b649609489d613d1d5e590f78e6d74ecfc061d57048bad9e76f302c5b9c61'
      ],
      [
        '754e3239f325570cdbbf4a87deee8a66b7f2b33479d468fbc1a50743bf56cc18',
        '673fb86e5bda30fb3cd0ed304ea49a023ee33d0197a695d0c5d98093c536683'
      ],
      [
        'e3e6bd1071a1e96aff57859c82d570f0330800661d1c952f9fe2694691d9b9e8',
        '59c9e0bba394e76f40c0aa58379a3cb6a5a2283993e90c4167002af4920e37f5'
      ],
      [
        '186b483d056a033826ae73d88f732985c4ccb1f32ba35f4b4cc47fdcf04aa6eb',
        '3b952d32c67cf77e2e17446e204180ab21fb8090895138b4a4a797f86e80888b'
      ],
      [
        'df9d70a6b9876ce544c98561f4be4f725442e6d2b737d9c91a8321724ce0963f',
        '55eb2dafd84d6ccd5f862b785dc39d4ab157222720ef9da217b8c45cf2ba2417'
      ],
      [
        '5edd5cc23c51e87a497ca815d5dce0f8ab52554f849ed8995de64c5f34ce7143',
        'efae9c8dbc14130661e8cec030c89ad0c13c66c0d17a2905cdc706ab7399a868'
      ],
      [
        '290798c2b6476830da12fe02287e9e777aa3fba1c355b17a722d362f84614fba',
        'e38da76dcd440621988d00bcf79af25d5b29c094db2a23146d003afd41943e7a'
      ],
      [
        'af3c423a95d9f5b3054754efa150ac39cd29552fe360257362dfdecef4053b45',
        'f98a3fd831eb2b749a93b0e6f35cfb40c8cd5aa667a15581bc2feded498fd9c6'
      ],
      [
        '766dbb24d134e745cccaa28c99bf274906bb66b26dcf98df8d2fed50d884249a',
        '744b1152eacbe5e38dcc887980da38b897584a65fa06cedd2c924f97cbac5996'
      ],
      [
        '59dbf46f8c94759ba21277c33784f41645f7b44f6c596a58ce92e666191abe3e',
        'c534ad44175fbc300f4ea6ce648309a042ce739a7919798cd85e216c4a307f6e'
      ],
      [
        'f13ada95103c4537305e691e74e9a4a8dd647e711a95e73cb62dc6018cfd87b8',
        'e13817b44ee14de663bf4bc808341f326949e21a6a75c2570778419bdaf5733d'
      ],
      [
        '7754b4fa0e8aced06d4167a2c59cca4cda1869c06ebadfb6488550015a88522c',
        '30e93e864e669d82224b967c3020b8fa8d1e4e350b6cbcc537a48b57841163a2'
      ],
      [
        '948dcadf5990e048aa3874d46abef9d701858f95de8041d2a6828c99e2262519',
        'e491a42537f6e597d5d28a3224b1bc25df9154efbd2ef1d2cbba2cae5347d57e'
      ],
      [
        '7962414450c76c1689c7b48f8202ec37fb224cf5ac0bfa1570328a8a3d7c77ab',
        '100b610ec4ffb4760d5c1fc133ef6f6b12507a051f04ac5760afa5b29db83437'
      ],
      [
        '3514087834964b54b15b160644d915485a16977225b8847bb0dd085137ec47ca',
        'ef0afbb2056205448e1652c48e8127fc6039e77c15c2378b7e7d15a0de293311'
      ],
      [
        'd3cc30ad6b483e4bc79ce2c9dd8bc54993e947eb8df787b442943d3f7b527eaf',
        '8b378a22d827278d89c5e9be8f9508ae3c2ad46290358630afb34db04eede0a4'
      ],
      [
        '1624d84780732860ce1c78fcbfefe08b2b29823db913f6493975ba0ff4847610',
        '68651cf9b6da903e0914448c6cd9d4ca896878f5282be4c8cc06e2a404078575'
      ],
      [
        '733ce80da955a8a26902c95633e62a985192474b5af207da6df7b4fd5fc61cd4',
        'f5435a2bd2badf7d485a4d8b8db9fcce3e1ef8e0201e4578c54673bc1dc5ea1d'
      ],
      [
        '15d9441254945064cf1a1c33bbd3b49f8966c5092171e699ef258dfab81c045c',
        'd56eb30b69463e7234f5137b73b84177434800bacebfc685fc37bbe9efe4070d'
      ],
      [
        'a1d0fcf2ec9de675b612136e5ce70d271c21417c9d2b8aaaac138599d0717940',
        'edd77f50bcb5a3cab2e90737309667f2641462a54070f3d519212d39c197a629'
      ],
      [
        'e22fbe15c0af8ccc5780c0735f84dbe9a790badee8245c06c7ca37331cb36980',
        'a855babad5cd60c88b430a69f53a1a7a38289154964799be43d06d77d31da06'
      ],
      [
        '311091dd9860e8e20ee13473c1155f5f69635e394704eaa74009452246cfa9b3',
        '66db656f87d1f04fffd1f04788c06830871ec5a64feee685bd80f0b1286d8374'
      ],
      [
        '34c1fd04d301be89b31c0442d3e6ac24883928b45a9340781867d4232ec2dbdf',
        '9414685e97b1b5954bd46f730174136d57f1ceeb487443dc5321857ba73abee'
      ],
      [
        'f219ea5d6b54701c1c14de5b557eb42a8d13f3abbcd08affcc2a5e6b049b8d63',
        '4cb95957e83d40b0f73af4544cccf6b1f4b08d3c07b27fb8d8c2962a400766d1'
      ],
      [
        'd7b8740f74a8fbaab1f683db8f45de26543a5490bca627087236912469a0b448',
        'fa77968128d9c92ee1010f337ad4717eff15db5ed3c049b3411e0315eaa4593b'
      ],
      [
        '32d31c222f8f6f0ef86f7c98d3a3335ead5bcd32abdd94289fe4d3091aa824bf',
        '5f3032f5892156e39ccd3d7915b9e1da2e6dac9e6f26e961118d14b8462e1661'
      ],
      [
        '7461f371914ab32671045a155d9831ea8793d77cd59592c4340f86cbc18347b5',
        '8ec0ba238b96bec0cbdddcae0aa442542eee1ff50c986ea6b39847b3cc092ff6'
      ],
      [
        'ee079adb1df1860074356a25aa38206a6d716b2c3e67453d287698bad7b2b2d6',
        '8dc2412aafe3be5c4c5f37e0ecc5f9f6a446989af04c4e25ebaac479ec1c8c1e'
      ],
      [
        '16ec93e447ec83f0467b18302ee620f7e65de331874c9dc72bfd8616ba9da6b5',
        '5e4631150e62fb40d0e8c2a7ca5804a39d58186a50e497139626778e25b0674d'
      ],
      [
        'eaa5f980c245f6f038978290afa70b6bd8855897f98b6aa485b96065d537bd99',
        'f65f5d3e292c2e0819a528391c994624d784869d7e6ea67fb18041024edc07dc'
      ],
      [
        '78c9407544ac132692ee1910a02439958ae04877151342ea96c4b6b35a49f51',
        'f3e0319169eb9b85d5404795539a5e68fa1fbd583c064d2462b675f194a3ddb4'
      ],
      [
        '494f4be219a1a77016dcd838431aea0001cdc8ae7a6fc688726578d9702857a5',
        '42242a969283a5f339ba7f075e36ba2af925ce30d767ed6e55f4b031880d562c'
      ],
      [
        'a598a8030da6d86c6bc7f2f5144ea549d28211ea58faa70ebf4c1e665c1fe9b5',
        '204b5d6f84822c307e4b4a7140737aec23fc63b65b35f86a10026dbd2d864e6b'
      ],
      [
        'c41916365abb2b5d09192f5f2dbeafec208f020f12570a184dbadc3e58595997',
        '4f14351d0087efa49d245b328984989d5caf9450f34bfc0ed16e96b58fa9913'
      ],
      [
        '841d6063a586fa475a724604da03bc5b92a2e0d2e0a36acfe4c73a5514742881',
        '73867f59c0659e81904f9a1c7543698e62562d6744c169ce7a36de01a8d6154'
      ],
      [
        '5e95bb399a6971d376026947f89bde2f282b33810928be4ded112ac4d70e20d5',
        '39f23f366809085beebfc71181313775a99c9aed7d8ba38b161384c746012865'
      ],
      [
        '36e4641a53948fd476c39f8a99fd974e5ec07564b5315d8bf99471bca0ef2f66',
        'd2424b1b1abe4eb8164227b085c9aa9456ea13493fd563e06fd51cf5694c78fc'
      ],
      [
        '336581ea7bfbbb290c191a2f507a41cf5643842170e914faeab27c2c579f726',
        'ead12168595fe1be99252129b6e56b3391f7ab1410cd1e0ef3dcdcabd2fda224'
      ],
      [
        '8ab89816dadfd6b6a1f2634fcf00ec8403781025ed6890c4849742706bd43ede',
        '6fdcef09f2f6d0a044e654aef624136f503d459c3e89845858a47a9129cdd24e'
      ],
      [
        '1e33f1a746c9c5778133344d9299fcaa20b0938e8acff2544bb40284b8c5fb94',
        '60660257dd11b3aa9c8ed618d24edff2306d320f1d03010e33a7d2057f3b3b6'
      ],
      [
        '85b7c1dcb3cec1b7ee7f30ded79dd20a0ed1f4cc18cbcfcfa410361fd8f08f31',
        '3d98a9cdd026dd43f39048f25a8847f4fcafad1895d7a633c6fed3c35e999511'
      ],
      [
        '29df9fbd8d9e46509275f4b125d6d45d7fbe9a3b878a7af872a2800661ac5f51',
        'b4c4fe99c775a606e2d8862179139ffda61dc861c019e55cd2876eb2a27d84b'
      ],
      [
        'a0b1cae06b0a847a3fea6e671aaf8adfdfe58ca2f768105c8082b2e449fce252',
        'ae434102edde0958ec4b19d917a6a28e6b72da1834aff0e650f049503a296cf2'
      ],
      [
        '4e8ceafb9b3e9a136dc7ff67e840295b499dfb3b2133e4ba113f2e4c0e121e5',
        'cf2174118c8b6d7a4b48f6d534ce5c79422c086a63460502b827ce62a326683c'
      ],
      [
        'd24a44e047e19b6f5afb81c7ca2f69080a5076689a010919f42725c2b789a33b',
        '6fb8d5591b466f8fc63db50f1c0f1c69013f996887b8244d2cdec417afea8fa3'
      ],
      [
        'ea01606a7a6c9cdd249fdfcfacb99584001edd28abbab77b5104e98e8e3b35d4',
        '322af4908c7312b0cfbfe369f7a7b3cdb7d4494bc2823700cfd652188a3ea98d'
      ],
      [
        'af8addbf2b661c8a6c6328655eb96651252007d8c5ea31be4ad196de8ce2131f',
        '6749e67c029b85f52a034eafd096836b2520818680e26ac8f3dfbcdb71749700'
      ],
      [
        'e3ae1974566ca06cc516d47e0fb165a674a3dabcfca15e722f0e3450f45889',
        '2aeabe7e4531510116217f07bf4d07300de97e4874f81f533420a72eeb0bd6a4'
      ],
      [
        '591ee355313d99721cf6993ffed1e3e301993ff3ed258802075ea8ced397e246',
        'b0ea558a113c30bea60fc4775460c7901ff0b053d25ca2bdeee98f1a4be5d196'
      ],
      [
        '11396d55fda54c49f19aa97318d8da61fa8584e47b084945077cf03255b52984',
        '998c74a8cd45ac01289d5833a7beb4744ff536b01b257be4c5767bea93ea57a4'
      ],
      [
        '3c5d2a1ba39c5a1790000738c9e0c40b8dcdfd5468754b6405540157e017aa7a',
        'b2284279995a34e2f9d4de7396fc18b80f9b8b9fdd270f6661f79ca4c81bd257'
      ],
      [
        'cc8704b8a60a0defa3a99a7299f2e9c3fbc395afb04ac078425ef8a1793cc030',
        'bdd46039feed17881d1e0862db347f8cf395b74fc4bcdc4e940b74e3ac1f1b13'
      ],
      [
        'c533e4f7ea8555aacd9777ac5cad29b97dd4defccc53ee7ea204119b2889b197',
        '6f0a256bc5efdf429a2fb6242f1a43a2d9b925bb4a4b3a26bb8e0f45eb596096'
      ],
      [
        'c14f8f2ccb27d6f109f6d08d03cc96a69ba8c34eec07bbcf566d48e33da6593',
        'c359d6923bb398f7fd4473e16fe1c28475b740dd098075e6c0e8649113dc3a38'
      ],
      [
        'a6cbc3046bc6a450bac24789fa17115a4c9739ed75f8f21ce441f72e0b90e6ef',
        '21ae7f4680e889bb130619e2c0f95a360ceb573c70603139862afd617fa9b9f'
      ],
      [
        '347d6d9a02c48927ebfb86c1359b1caf130a3c0267d11ce6344b39f99d43cc38',
        '60ea7f61a353524d1c987f6ecec92f086d565ab687870cb12689ff1e31c74448'
      ],
      [
        'da6545d2181db8d983f7dcb375ef5866d47c67b1bf31c8cf855ef7437b72656a',
        '49b96715ab6878a79e78f07ce5680c5d6673051b4935bd897fea824b77dc208a'
      ],
      [
        'c40747cc9d012cb1a13b8148309c6de7ec25d6945d657146b9d5994b8feb1111',
        '5ca560753be2a12fc6de6caf2cb489565db936156b9514e1bb5e83037e0fa2d4'
      ],
      [
        '4e42c8ec82c99798ccf3a610be870e78338c7f713348bd34c8203ef4037f3502',
        '7571d74ee5e0fb92a7a8b33a07783341a5492144cc54bcc40a94473693606437'
      ],
      [
        '3775ab7089bc6af823aba2e1af70b236d251cadb0c86743287522a1b3b0dedea',
        'be52d107bcfa09d8bcb9736a828cfa7fac8db17bf7a76a2c42ad961409018cf7'
      ],
      [
        'cee31cbf7e34ec379d94fb814d3d775ad954595d1314ba8846959e3e82f74e26',
        '8fd64a14c06b589c26b947ae2bcf6bfa0149ef0be14ed4d80f448a01c43b1c6d'
      ],
      [
        'b4f9eaea09b6917619f6ea6a4eb5464efddb58fd45b1ebefcdc1a01d08b47986',
        '39e5c9925b5a54b07433a4f18c61726f8bb131c012ca542eb24a8ac07200682a'
      ],
      [
        'd4263dfc3d2df923a0179a48966d30ce84e2515afc3dccc1b77907792ebcc60e',
        '62dfaf07a0f78feb30e30d6295853ce189e127760ad6cf7fae164e122a208d54'
      ],
      [
        '48457524820fa65a4f8d35eb6930857c0032acc0a4a2de422233eeda897612c4',
        '25a748ab367979d98733c38a1fa1c2e7dc6cc07db2d60a9ae7a76aaa49bd0f77'
      ],
      [
        'dfeeef1881101f2cb11644f3a2afdfc2045e19919152923f367a1767c11cceda',
        'ecfb7056cf1de042f9420bab396793c0c390bde74b4bbdff16a83ae09a9a7517'
      ],
      [
        '6d7ef6b17543f8373c573f44e1f389835d89bcbc6062ced36c82df83b8fae859',
        'cd450ec335438986dfefa10c57fea9bcc521a0959b2d80bbf74b190dca712d10'
      ],
      [
        'e75605d59102a5a2684500d3b991f2e3f3c88b93225547035af25af66e04541f',
        'f5c54754a8f71ee540b9b48728473e314f729ac5308b06938360990e2bfad125'
      ],
      [
        'eb98660f4c4dfaa06a2be453d5020bc99a0c2e60abe388457dd43fefb1ed620c',
        '6cb9a8876d9cb8520609af3add26cd20a0a7cd8a9411131ce85f44100099223e'
      ],
      [
        '13e87b027d8514d35939f2e6892b19922154596941888336dc3563e3b8dba942',
        'fef5a3c68059a6dec5d624114bf1e91aac2b9da568d6abeb2570d55646b8adf1'
      ],
      [
        'ee163026e9fd6fe017c38f06a5be6fc125424b371ce2708e7bf4491691e5764a',
        '1acb250f255dd61c43d94ccc670d0f58f49ae3fa15b96623e5430da0ad6c62b2'
      ],
      [
        'b268f5ef9ad51e4d78de3a750c2dc89b1e626d43505867999932e5db33af3d80',
        '5f310d4b3c99b9ebb19f77d41c1dee018cf0d34fd4191614003e945a1216e423'
      ],
      [
        'ff07f3118a9df035e9fad85eb6c7bfe42b02f01ca99ceea3bf7ffdba93c4750d',
        '438136d603e858a3a5c440c38eccbaddc1d2942114e2eddd4740d098ced1f0d8'
      ],
      [
        '8d8b9855c7c052a34146fd20ffb658bea4b9f69e0d825ebec16e8c3ce2b526a1',
        'cdb559eedc2d79f926baf44fb84ea4d44bcf50fee51d7ceb30e2e7f463036758'
      ],
      [
        '52db0b5384dfbf05bfa9d472d7ae26dfe4b851ceca91b1eba54263180da32b63',
        'c3b997d050ee5d423ebaf66a6db9f57b3180c902875679de924b69d84a7b375'
      ],
      [
        'e62f9490d3d51da6395efd24e80919cc7d0f29c3f3fa48c6fff543becbd43352',
        '6d89ad7ba4876b0b22c2ca280c682862f342c8591f1daf5170e07bfd9ccafa7d'
      ],
      [
        '7f30ea2476b399b4957509c88f77d0191afa2ff5cb7b14fd6d8e7d65aaab1193',
        'ca5ef7d4b231c94c3b15389a5f6311e9daff7bb67b103e9880ef4bff637acaec'
      ],
      [
        '5098ff1e1d9f14fb46a210fada6c903fef0fb7b4a1dd1d9ac60a0361800b7a00',
        '9731141d81fc8f8084d37c6e7542006b3ee1b40d60dfe5362a5b132fd17ddc0'
      ],
      [
        '32b78c7de9ee512a72895be6b9cbefa6e2f3c4ccce445c96b9f2c81e2778ad58',
        'ee1849f513df71e32efc3896ee28260c73bb80547ae2275ba497237794c8753c'
      ],
      [
        'e2cb74fddc8e9fbcd076eef2a7c72b0ce37d50f08269dfc074b581550547a4f7',
        'd3aa2ed71c9dd2247a62df062736eb0baddea9e36122d2be8641abcb005cc4a4'
      ],
      [
        '8438447566d4d7bedadc299496ab357426009a35f235cb141be0d99cd10ae3a8',
        'c4e1020916980a4da5d01ac5e6ad330734ef0d7906631c4f2390426b2edd791f'
      ],
      [
        '4162d488b89402039b584c6fc6c308870587d9c46f660b878ab65c82c711d67e',
        '67163e903236289f776f22c25fb8a3afc1732f2b84b4e95dbda47ae5a0852649'
      ],
      [
        '3fad3fa84caf0f34f0f89bfd2dcf54fc175d767aec3e50684f3ba4a4bf5f683d',
        'cd1bc7cb6cc407bb2f0ca647c718a730cf71872e7d0d2a53fa20efcdfe61826'
      ],
      [
        '674f2600a3007a00568c1a7ce05d0816c1fb84bf1370798f1c69532faeb1a86b',
        '299d21f9413f33b3edf43b257004580b70db57da0b182259e09eecc69e0d38a5'
      ],
      [
        'd32f4da54ade74abb81b815ad1fb3b263d82d6c692714bcff87d29bd5ee9f08f',
        'f9429e738b8e53b968e99016c059707782e14f4535359d582fc416910b3eea87'
      ],
      [
        '30e4e670435385556e593657135845d36fbb6931f72b08cb1ed954f1e3ce3ff6',
        '462f9bce619898638499350113bbc9b10a878d35da70740dc695a559eb88db7b'
      ],
      [
        'be2062003c51cc3004682904330e4dee7f3dcd10b01e580bf1971b04d4cad297',
        '62188bc49d61e5428573d48a74e1c655b1c61090905682a0d5558ed72dccb9bc'
      ],
      [
        '93144423ace3451ed29e0fb9ac2af211cb6e84a601df5993c419859fff5df04a',
        '7c10dfb164c3425f5c71a3f9d7992038f1065224f72bb9d1d902a6d13037b47c'
      ],
      [
        'b015f8044f5fcbdcf21ca26d6c34fb8197829205c7b7d2a7cb66418c157b112c',
        'ab8c1e086d04e813744a655b2df8d5f83b3cdc6faa3088c1d3aea1454e3a1d5f'
      ],
      [
        'd5e9e1da649d97d89e4868117a465a3a4f8a18de57a140d36b3f2af341a21b52',
        '4cb04437f391ed73111a13cc1d4dd0db1693465c2240480d8955e8592f27447a'
      ],
      [
        'd3ae41047dd7ca065dbf8ed77b992439983005cd72e16d6f996a5316d36966bb',
        'bd1aeb21ad22ebb22a10f0303417c6d964f8cdd7df0aca614b10dc14d125ac46'
      ],
      [
        '463e2763d885f958fc66cdd22800f0a487197d0a82e377b49f80af87c897b065',
        'bfefacdb0e5d0fd7df3a311a94de062b26b80c61fbc97508b79992671ef7ca7f'
      ],
      [
        '7985fdfd127c0567c6f53ec1bb63ec3158e597c40bfe747c83cddfc910641917',
        '603c12daf3d9862ef2b25fe1de289aed24ed291e0ec6708703a5bd567f32ed03'
      ],
      [
        '74a1ad6b5f76e39db2dd249410eac7f99e74c59cb83d2d0ed5ff1543da7703e9',
        'cc6157ef18c9c63cd6193d83631bbea0093e0968942e8c33d5737fd790e0db08'
      ],
      [
        '30682a50703375f602d416664ba19b7fc9bab42c72747463a71d0896b22f6da3',
        '553e04f6b018b4fa6c8f39e7f311d3176290d0e0f19ca73f17714d9977a22ff8'
      ],
      [
        '9e2158f0d7c0d5f26c3791efefa79597654e7a2b2464f52b1ee6c1347769ef57',
        '712fcdd1b9053f09003a3481fa7762e9ffd7c8ef35a38509e2fbf2629008373'
      ],
      [
        '176e26989a43c9cfeba4029c202538c28172e566e3c4fce7322857f3be327d66',
        'ed8cc9d04b29eb877d270b4878dc43c19aefd31f4eee09ee7b47834c1fa4b1c3'
      ],
      [
        '75d46efea3771e6e68abb89a13ad747ecf1892393dfc4f1b7004788c50374da8',
        '9852390a99507679fd0b86fd2b39a868d7efc22151346e1a3ca4726586a6bed8'
      ],
      [
        '809a20c67d64900ffb698c4c825f6d5f2310fb0451c869345b7319f645605721',
        '9e994980d9917e22b76b061927fa04143d096ccc54963e6a5ebfa5f3f8e286c1'
      ],
      [
        '1b38903a43f7f114ed4500b4eac7083fdefece1cf29c63528d563446f972c180',
        '4036edc931a60ae889353f77fd53de4a2708b26b6f5da72ad3394119daf408f9'
      ]
    ]
  }
};


/***/ }),

/***/ 2100:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__(514);
var HmacDRBG = __webpack_require__(2101);
var elliptic = __webpack_require__(538);
var utils = elliptic.utils;
var assert = utils.assert;

var KeyPair = __webpack_require__(2102);
var Signature = __webpack_require__(2103);

function EC(options) {
  if (!(this instanceof EC))
    return new EC(options);

  // Shortcut `elliptic.ec(curve-name)`
  if (typeof options === 'string') {
    assert(elliptic.curves.hasOwnProperty(options), 'Unknown curve ' + options);

    options = elliptic.curves[options];
  }

  // Shortcut for `elliptic.ec(elliptic.curves.curveName)`
  if (options instanceof elliptic.curves.PresetCurve)
    options = { curve: options };

  this.curve = options.curve.curve;
  this.n = this.curve.n;
  this.nh = this.n.ushrn(1);
  this.g = this.curve.g;

  // Point on curve
  this.g = options.curve.g;
  this.g.precompute(options.curve.n.bitLength() + 1);

  // Hash for function for DRBG
  this.hash = options.hash || options.curve.hash;
}
module.exports = EC;

EC.prototype.keyPair = function keyPair(options) {
  return new KeyPair(this, options);
};

EC.prototype.keyFromPrivate = function keyFromPrivate(priv, enc) {
  return KeyPair.fromPrivate(this, priv, enc);
};

EC.prototype.keyFromPublic = function keyFromPublic(pub, enc) {
  return KeyPair.fromPublic(this, pub, enc);
};

EC.prototype.genKeyPair = function genKeyPair(options) {
  if (!options)
    options = {};

  // Instantiate Hmac_DRBG
  var drbg = new HmacDRBG({
    hash: this.hash,
    pers: options.pers,
    persEnc: options.persEnc || 'utf8',
    entropy: options.entropy || elliptic.rand(this.hash.hmacStrength),
    entropyEnc: options.entropy && options.entropyEnc || 'utf8',
    nonce: this.n.toArray()
  });

  var bytes = this.n.byteLength();
  var ns2 = this.n.sub(new BN(2));
  do {
    var priv = new BN(drbg.generate(bytes));
    if (priv.cmp(ns2) > 0)
      continue;

    priv.iaddn(1);
    return this.keyFromPrivate(priv);
  } while (true);
};

EC.prototype._truncateToN = function truncateToN(msg, truncOnly) {
  var delta = msg.byteLength() * 8 - this.n.bitLength();
  if (delta > 0)
    msg = msg.ushrn(delta);
  if (!truncOnly && msg.cmp(this.n) >= 0)
    return msg.sub(this.n);
  else
    return msg;
};

EC.prototype.sign = function sign(msg, key, enc, options) {
  if (typeof enc === 'object') {
    options = enc;
    enc = null;
  }
  if (!options)
    options = {};

  key = this.keyFromPrivate(key, enc);
  msg = this._truncateToN(new BN(msg, 16));

  // Zero-extend key to provide enough entropy
  var bytes = this.n.byteLength();
  var bkey = key.getPrivate().toArray('be', bytes);

  // Zero-extend nonce to have the same byte size as N
  var nonce = msg.toArray('be', bytes);

  // Instantiate Hmac_DRBG
  var drbg = new HmacDRBG({
    hash: this.hash,
    entropy: bkey,
    nonce: nonce,
    pers: options.pers,
    persEnc: options.persEnc || 'utf8'
  });

  // Number of bytes to generate
  var ns1 = this.n.sub(new BN(1));

  for (var iter = 0; true; iter++) {
    var k = options.k ?
        options.k(iter) :
        new BN(drbg.generate(this.n.byteLength()));
    k = this._truncateToN(k, true);
    if (k.cmpn(1) <= 0 || k.cmp(ns1) >= 0)
      continue;

    var kp = this.g.mul(k);
    if (kp.isInfinity())
      continue;

    var kpX = kp.getX();
    var r = kpX.umod(this.n);
    if (r.cmpn(0) === 0)
      continue;

    var s = k.invm(this.n).mul(r.mul(key.getPrivate()).iadd(msg));
    s = s.umod(this.n);
    if (s.cmpn(0) === 0)
      continue;

    var recoveryParam = (kp.getY().isOdd() ? 1 : 0) |
                        (kpX.cmp(r) !== 0 ? 2 : 0);

    // Use complement of `s`, if it is > `n / 2`
    if (options.canonical && s.cmp(this.nh) > 0) {
      s = this.n.sub(s);
      recoveryParam ^= 1;
    }

    return new Signature({ r: r, s: s, recoveryParam: recoveryParam });
  }
};

EC.prototype.verify = function verify(msg, signature, key, enc) {
  msg = this._truncateToN(new BN(msg, 16));
  key = this.keyFromPublic(key, enc);
  signature = new Signature(signature, 'hex');

  // Perform primitive values validation
  var r = signature.r;
  var s = signature.s;
  if (r.cmpn(1) < 0 || r.cmp(this.n) >= 0)
    return false;
  if (s.cmpn(1) < 0 || s.cmp(this.n) >= 0)
    return false;

  // Validate signature
  var sinv = s.invm(this.n);
  var u1 = sinv.mul(msg).umod(this.n);
  var u2 = sinv.mul(r).umod(this.n);

  if (!this.curve._maxwellTrick) {
    var p = this.g.mulAdd(u1, key.getPublic(), u2);
    if (p.isInfinity())
      return false;

    return p.getX().umod(this.n).cmp(r) === 0;
  }

  // NOTE: Greg Maxwell's trick, inspired by:
  // https://git.io/vad3K

  var p = this.g.jmulAdd(u1, key.getPublic(), u2);
  if (p.isInfinity())
    return false;

  // Compare `p.x` of Jacobian point with `r`,
  // this will do `p.x == r * p.z^2` instead of multiplying `p.x` by the
  // inverse of `p.z^2`
  return p.eqXToP(r);
};

EC.prototype.recoverPubKey = function(msg, signature, j, enc) {
  assert((3 & j) === j, 'The recovery param is more than two bits');
  signature = new Signature(signature, enc);

  var n = this.n;
  var e = new BN(msg);
  var r = signature.r;
  var s = signature.s;

  // A set LSB signifies that the y-coordinate is odd
  var isYOdd = j & 1;
  var isSecondKey = j >> 1;
  if (r.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey)
    throw new Error('Unable to find sencond key candinate');

  // 1.1. Let x = r + jn.
  if (isSecondKey)
    r = this.curve.pointFromX(r.add(this.curve.n), isYOdd);
  else
    r = this.curve.pointFromX(r, isYOdd);

  var rInv = signature.r.invm(n);
  var s1 = n.sub(e).mul(rInv).umod(n);
  var s2 = s.mul(rInv).umod(n);

  // 1.6.1 Compute Q = r^-1 (sR -  eG)
  //               Q = r^-1 (sR + -eG)
  return this.g.mulAdd(s1, r, s2);
};

EC.prototype.getKeyRecoveryParam = function(e, signature, Q, enc) {
  signature = new Signature(signature, enc);
  if (signature.recoveryParam !== null)
    return signature.recoveryParam;

  for (var i = 0; i < 4; i++) {
    var Qprime;
    try {
      Qprime = this.recoverPubKey(e, signature, i);
    } catch (e) {
      continue;
    }

    if (Qprime.eq(Q))
      return i;
  }
  throw new Error('Unable to find valid recovery factor');
};


/***/ }),

/***/ 2101:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hash = __webpack_require__(989);
var utils = __webpack_require__(1966);
var assert = __webpack_require__(563);

function HmacDRBG(options) {
  if (!(this instanceof HmacDRBG))
    return new HmacDRBG(options);
  this.hash = options.hash;
  this.predResist = !!options.predResist;

  this.outLen = this.hash.outSize;
  this.minEntropy = options.minEntropy || this.hash.hmacStrength;

  this._reseed = null;
  this.reseedInterval = null;
  this.K = null;
  this.V = null;

  var entropy = utils.toArray(options.entropy, options.entropyEnc || 'hex');
  var nonce = utils.toArray(options.nonce, options.nonceEnc || 'hex');
  var pers = utils.toArray(options.pers, options.persEnc || 'hex');
  assert(entropy.length >= (this.minEntropy / 8),
         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');
  this._init(entropy, nonce, pers);
}
module.exports = HmacDRBG;

HmacDRBG.prototype._init = function init(entropy, nonce, pers) {
  var seed = entropy.concat(nonce).concat(pers);

  this.K = new Array(this.outLen / 8);
  this.V = new Array(this.outLen / 8);
  for (var i = 0; i < this.V.length; i++) {
    this.K[i] = 0x00;
    this.V[i] = 0x01;
  }

  this._update(seed);
  this._reseed = 1;
  this.reseedInterval = 0x1000000000000;  // 2^48
};

HmacDRBG.prototype._hmac = function hmac() {
  return new hash.hmac(this.hash, this.K);
};

HmacDRBG.prototype._update = function update(seed) {
  var kmac = this._hmac()
                 .update(this.V)
                 .update([ 0x00 ]);
  if (seed)
    kmac = kmac.update(seed);
  this.K = kmac.digest();
  this.V = this._hmac().update(this.V).digest();
  if (!seed)
    return;

  this.K = this._hmac()
               .update(this.V)
               .update([ 0x01 ])
               .update(seed)
               .digest();
  this.V = this._hmac().update(this.V).digest();
};

HmacDRBG.prototype.reseed = function reseed(entropy, entropyEnc, add, addEnc) {
  // Optional entropy enc
  if (typeof entropyEnc !== 'string') {
    addEnc = add;
    add = entropyEnc;
    entropyEnc = null;
  }

  entropy = utils.toArray(entropy, entropyEnc);
  add = utils.toArray(add, addEnc);

  assert(entropy.length >= (this.minEntropy / 8),
         'Not enough entropy. Minimum is: ' + this.minEntropy + ' bits');

  this._update(entropy.concat(add || []));
  this._reseed = 1;
};

HmacDRBG.prototype.generate = function generate(len, enc, add, addEnc) {
  if (this._reseed > this.reseedInterval)
    throw new Error('Reseed is required');

  // Optional encoding
  if (typeof enc !== 'string') {
    addEnc = add;
    add = enc;
    enc = null;
  }

  // Optional additional data
  if (add) {
    add = utils.toArray(add, addEnc || 'hex');
    this._update(add);
  }

  var temp = [];
  while (temp.length < len) {
    this.V = this._hmac().update(this.V).digest();
    temp = temp.concat(this.V);
  }

  var res = temp.slice(0, len);
  this._update(add);
  this._reseed++;
  return utils.encode(res, enc);
};


/***/ }),

/***/ 2102:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__(514);
var elliptic = __webpack_require__(538);
var utils = elliptic.utils;
var assert = utils.assert;

function KeyPair(ec, options) {
  this.ec = ec;
  this.priv = null;
  this.pub = null;

  // KeyPair(ec, { priv: ..., pub: ... })
  if (options.priv)
    this._importPrivate(options.priv, options.privEnc);
  if (options.pub)
    this._importPublic(options.pub, options.pubEnc);
}
module.exports = KeyPair;

KeyPair.fromPublic = function fromPublic(ec, pub, enc) {
  if (pub instanceof KeyPair)
    return pub;

  return new KeyPair(ec, {
    pub: pub,
    pubEnc: enc
  });
};

KeyPair.fromPrivate = function fromPrivate(ec, priv, enc) {
  if (priv instanceof KeyPair)
    return priv;

  return new KeyPair(ec, {
    priv: priv,
    privEnc: enc
  });
};

KeyPair.prototype.validate = function validate() {
  var pub = this.getPublic();

  if (pub.isInfinity())
    return { result: false, reason: 'Invalid public key' };
  if (!pub.validate())
    return { result: false, reason: 'Public key is not a point' };
  if (!pub.mul(this.ec.curve.n).isInfinity())
    return { result: false, reason: 'Public key * N != O' };

  return { result: true, reason: null };
};

KeyPair.prototype.getPublic = function getPublic(compact, enc) {
  // compact is optional argument
  if (typeof compact === 'string') {
    enc = compact;
    compact = null;
  }

  if (!this.pub)
    this.pub = this.ec.g.mul(this.priv);

  if (!enc)
    return this.pub;

  return this.pub.encode(enc, compact);
};

KeyPair.prototype.getPrivate = function getPrivate(enc) {
  if (enc === 'hex')
    return this.priv.toString(16, 2);
  else
    return this.priv;
};

KeyPair.prototype._importPrivate = function _importPrivate(key, enc) {
  this.priv = new BN(key, enc || 16);

  // Ensure that the priv won't be bigger than n, otherwise we may fail
  // in fixed multiplication method
  this.priv = this.priv.umod(this.ec.curve.n);
};

KeyPair.prototype._importPublic = function _importPublic(key, enc) {
  if (key.x || key.y) {
    // Montgomery points only have an `x` coordinate.
    // Weierstrass/Edwards points on the other hand have both `x` and
    // `y` coordinates.
    if (this.ec.curve.type === 'mont') {
      assert(key.x, 'Need x coordinate');
    } else if (this.ec.curve.type === 'short' ||
               this.ec.curve.type === 'edwards') {
      assert(key.x && key.y, 'Need both x and y coordinate');
    }
    this.pub = this.ec.curve.point(key.x, key.y);
    return;
  }
  this.pub = this.ec.curve.decodePoint(key, enc);
};

// ECDH
KeyPair.prototype.derive = function derive(pub) {
  return pub.mul(this.priv).getX();
};

// ECDSA
KeyPair.prototype.sign = function sign(msg, enc, options) {
  return this.ec.sign(msg, this, enc, options);
};

KeyPair.prototype.verify = function verify(msg, signature) {
  return this.ec.verify(msg, signature, this);
};

KeyPair.prototype.inspect = function inspect() {
  return '<Key priv: ' + (this.priv && this.priv.toString(16, 2)) +
         ' pub: ' + (this.pub && this.pub.inspect()) + ' >';
};


/***/ }),

/***/ 2103:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__(514);

var elliptic = __webpack_require__(538);
var utils = elliptic.utils;
var assert = utils.assert;

function Signature(options, enc) {
  if (options instanceof Signature)
    return options;

  if (this._importDER(options, enc))
    return;

  assert(options.r && options.s, 'Signature without r or s');
  this.r = new BN(options.r, 16);
  this.s = new BN(options.s, 16);
  if (options.recoveryParam === undefined)
    this.recoveryParam = null;
  else
    this.recoveryParam = options.recoveryParam;
}
module.exports = Signature;

function Position() {
  this.place = 0;
}

function getLength(buf, p) {
  var initial = buf[p.place++];
  if (!(initial & 0x80)) {
    return initial;
  }
  var octetLen = initial & 0xf;
  var val = 0;
  for (var i = 0, off = p.place; i < octetLen; i++, off++) {
    val <<= 8;
    val |= buf[off];
  }
  p.place = off;
  return val;
}

function rmPadding(buf) {
  var i = 0;
  var len = buf.length - 1;
  while (!buf[i] && !(buf[i + 1] & 0x80) && i < len) {
    i++;
  }
  if (i === 0) {
    return buf;
  }
  return buf.slice(i);
}

Signature.prototype._importDER = function _importDER(data, enc) {
  data = utils.toArray(data, enc);
  var p = new Position();
  if (data[p.place++] !== 0x30) {
    return false;
  }
  var len = getLength(data, p);
  if ((len + p.place) !== data.length) {
    return false;
  }
  if (data[p.place++] !== 0x02) {
    return false;
  }
  var rlen = getLength(data, p);
  var r = data.slice(p.place, rlen + p.place);
  p.place += rlen;
  if (data[p.place++] !== 0x02) {
    return false;
  }
  var slen = getLength(data, p);
  if (data.length !== slen + p.place) {
    return false;
  }
  var s = data.slice(p.place, slen + p.place);
  if (r[0] === 0 && (r[1] & 0x80)) {
    r = r.slice(1);
  }
  if (s[0] === 0 && (s[1] & 0x80)) {
    s = s.slice(1);
  }

  this.r = new BN(r);
  this.s = new BN(s);
  this.recoveryParam = null;

  return true;
};

function constructLength(arr, len) {
  if (len < 0x80) {
    arr.push(len);
    return;
  }
  var octets = 1 + (Math.log(len) / Math.LN2 >>> 3);
  arr.push(octets | 0x80);
  while (--octets) {
    arr.push((len >>> (octets << 3)) & 0xff);
  }
  arr.push(len);
}

Signature.prototype.toDER = function toDER(enc) {
  var r = this.r.toArray();
  var s = this.s.toArray();

  // Pad values
  if (r[0] & 0x80)
    r = [ 0 ].concat(r);
  // Pad values
  if (s[0] & 0x80)
    s = [ 0 ].concat(s);

  r = rmPadding(r);
  s = rmPadding(s);

  while (!s[0] && !(s[1] & 0x80)) {
    s = s.slice(1);
  }
  var arr = [ 0x02 ];
  constructLength(arr, r.length);
  arr = arr.concat(r);
  arr.push(0x02);
  constructLength(arr, s.length);
  var backHalf = arr.concat(s);
  var res = [ 0x30 ];
  constructLength(res, backHalf.length);
  res = res.concat(backHalf);
  return utils.encode(res, enc);
};


/***/ }),

/***/ 2104:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hash = __webpack_require__(989);
var elliptic = __webpack_require__(538);
var utils = elliptic.utils;
var assert = utils.assert;
var parseBytes = utils.parseBytes;
var KeyPair = __webpack_require__(2105);
var Signature = __webpack_require__(2106);

function EDDSA(curve) {
  assert(curve === 'ed25519', 'only tested with ed25519 so far');

  if (!(this instanceof EDDSA))
    return new EDDSA(curve);

  var curve = elliptic.curves[curve].curve;
  this.curve = curve;
  this.g = curve.g;
  this.g.precompute(curve.n.bitLength() + 1);

  this.pointClass = curve.point().constructor;
  this.encodingLength = Math.ceil(curve.n.bitLength() / 8);
  this.hash = hash.sha512;
}

module.exports = EDDSA;

/**
* @param {Array|String} message - message bytes
* @param {Array|String|KeyPair} secret - secret bytes or a keypair
* @returns {Signature} - signature
*/
EDDSA.prototype.sign = function sign(message, secret) {
  message = parseBytes(message);
  var key = this.keyFromSecret(secret);
  var r = this.hashInt(key.messagePrefix(), message);
  var R = this.g.mul(r);
  var Rencoded = this.encodePoint(R);
  var s_ = this.hashInt(Rencoded, key.pubBytes(), message)
               .mul(key.priv());
  var S = r.add(s_).umod(this.curve.n);
  return this.makeSignature({ R: R, S: S, Rencoded: Rencoded });
};

/**
* @param {Array} message - message bytes
* @param {Array|String|Signature} sig - sig bytes
* @param {Array|String|Point|KeyPair} pub - public key
* @returns {Boolean} - true if public key matches sig of message
*/
EDDSA.prototype.verify = function verify(message, sig, pub) {
  message = parseBytes(message);
  sig = this.makeSignature(sig);
  var key = this.keyFromPublic(pub);
  var h = this.hashInt(sig.Rencoded(), key.pubBytes(), message);
  var SG = this.g.mul(sig.S());
  var RplusAh = sig.R().add(key.pub().mul(h));
  return RplusAh.eq(SG);
};

EDDSA.prototype.hashInt = function hashInt() {
  var hash = this.hash();
  for (var i = 0; i < arguments.length; i++)
    hash.update(arguments[i]);
  return utils.intFromLE(hash.digest()).umod(this.curve.n);
};

EDDSA.prototype.keyFromPublic = function keyFromPublic(pub) {
  return KeyPair.fromPublic(this, pub);
};

EDDSA.prototype.keyFromSecret = function keyFromSecret(secret) {
  return KeyPair.fromSecret(this, secret);
};

EDDSA.prototype.makeSignature = function makeSignature(sig) {
  if (sig instanceof Signature)
    return sig;
  return new Signature(this, sig);
};

/**
* * https://tools.ietf.org/html/draft-josefsson-eddsa-ed25519-03#section-5.2
*
* EDDSA defines methods for encoding and decoding points and integers. These are
* helper convenience methods, that pass along to utility functions implied
* parameters.
*
*/
EDDSA.prototype.encodePoint = function encodePoint(point) {
  var enc = point.getY().toArray('le', this.encodingLength);
  enc[this.encodingLength - 1] |= point.getX().isOdd() ? 0x80 : 0;
  return enc;
};

EDDSA.prototype.decodePoint = function decodePoint(bytes) {
  bytes = utils.parseBytes(bytes);

  var lastIx = bytes.length - 1;
  var normed = bytes.slice(0, lastIx).concat(bytes[lastIx] & ~0x80);
  var xIsOdd = (bytes[lastIx] & 0x80) !== 0;

  var y = utils.intFromLE(normed);
  return this.curve.pointFromY(y, xIsOdd);
};

EDDSA.prototype.encodeInt = function encodeInt(num) {
  return num.toArray('le', this.encodingLength);
};

EDDSA.prototype.decodeInt = function decodeInt(bytes) {
  return utils.intFromLE(bytes);
};

EDDSA.prototype.isPoint = function isPoint(val) {
  return val instanceof this.pointClass;
};


/***/ }),

/***/ 2105:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var elliptic = __webpack_require__(538);
var utils = elliptic.utils;
var assert = utils.assert;
var parseBytes = utils.parseBytes;
var cachedProperty = utils.cachedProperty;

/**
* @param {EDDSA} eddsa - instance
* @param {Object} params - public/private key parameters
*
* @param {Array<Byte>} [params.secret] - secret seed bytes
* @param {Point} [params.pub] - public key point (aka `A` in eddsa terms)
* @param {Array<Byte>} [params.pub] - public key point encoded as bytes
*
*/
function KeyPair(eddsa, params) {
  this.eddsa = eddsa;
  this._secret = parseBytes(params.secret);
  if (eddsa.isPoint(params.pub))
    this._pub = params.pub;
  else
    this._pubBytes = parseBytes(params.pub);
}

KeyPair.fromPublic = function fromPublic(eddsa, pub) {
  if (pub instanceof KeyPair)
    return pub;
  return new KeyPair(eddsa, { pub: pub });
};

KeyPair.fromSecret = function fromSecret(eddsa, secret) {
  if (secret instanceof KeyPair)
    return secret;
  return new KeyPair(eddsa, { secret: secret });
};

KeyPair.prototype.secret = function secret() {
  return this._secret;
};

cachedProperty(KeyPair, 'pubBytes', function pubBytes() {
  return this.eddsa.encodePoint(this.pub());
});

cachedProperty(KeyPair, 'pub', function pub() {
  if (this._pubBytes)
    return this.eddsa.decodePoint(this._pubBytes);
  return this.eddsa.g.mul(this.priv());
});

cachedProperty(KeyPair, 'privBytes', function privBytes() {
  var eddsa = this.eddsa;
  var hash = this.hash();
  var lastIx = eddsa.encodingLength - 1;

  var a = hash.slice(0, eddsa.encodingLength);
  a[0] &= 248;
  a[lastIx] &= 127;
  a[lastIx] |= 64;

  return a;
});

cachedProperty(KeyPair, 'priv', function priv() {
  return this.eddsa.decodeInt(this.privBytes());
});

cachedProperty(KeyPair, 'hash', function hash() {
  return this.eddsa.hash().update(this.secret()).digest();
});

cachedProperty(KeyPair, 'messagePrefix', function messagePrefix() {
  return this.hash().slice(this.eddsa.encodingLength);
});

KeyPair.prototype.sign = function sign(message) {
  assert(this._secret, 'KeyPair can only verify');
  return this.eddsa.sign(message, this);
};

KeyPair.prototype.verify = function verify(message, sig) {
  return this.eddsa.verify(message, sig, this);
};

KeyPair.prototype.getSecret = function getSecret(enc) {
  assert(this._secret, 'KeyPair is public only');
  return utils.encode(this.secret(), enc);
};

KeyPair.prototype.getPublic = function getPublic(enc) {
  return utils.encode(this.pubBytes(), enc);
};

module.exports = KeyPair;


/***/ }),

/***/ 2106:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var BN = __webpack_require__(514);
var elliptic = __webpack_require__(538);
var utils = elliptic.utils;
var assert = utils.assert;
var cachedProperty = utils.cachedProperty;
var parseBytes = utils.parseBytes;

/**
* @param {EDDSA} eddsa - eddsa instance
* @param {Array<Bytes>|Object} sig -
* @param {Array<Bytes>|Point} [sig.R] - R point as Point or bytes
* @param {Array<Bytes>|bn} [sig.S] - S scalar as bn or bytes
* @param {Array<Bytes>} [sig.Rencoded] - R point encoded
* @param {Array<Bytes>} [sig.Sencoded] - S scalar encoded
*/
function Signature(eddsa, sig) {
  this.eddsa = eddsa;

  if (typeof sig !== 'object')
    sig = parseBytes(sig);

  if (Array.isArray(sig)) {
    sig = {
      R: sig.slice(0, eddsa.encodingLength),
      S: sig.slice(eddsa.encodingLength)
    };
  }

  assert(sig.R && sig.S, 'Signature without R or S');

  if (eddsa.isPoint(sig.R))
    this._R = sig.R;
  if (sig.S instanceof BN)
    this._S = sig.S;

  this._Rencoded = Array.isArray(sig.R) ? sig.R : sig.Rencoded;
  this._Sencoded = Array.isArray(sig.S) ? sig.S : sig.Sencoded;
}

cachedProperty(Signature, 'S', function S() {
  return this.eddsa.decodeInt(this.Sencoded());
});

cachedProperty(Signature, 'R', function R() {
  return this.eddsa.decodePoint(this.Rencoded());
});

cachedProperty(Signature, 'Rencoded', function Rencoded() {
  return this.eddsa.encodePoint(this.R());
});

cachedProperty(Signature, 'Sencoded', function Sencoded() {
  return this.eddsa.encodeInt(this.S());
});

Signature.prototype.toBytes = function toBytes() {
  return this.Rencoded().concat(this.Sencoded());
};

Signature.prototype.toHex = function toHex() {
  return utils.encode(this.toBytes(), 'hex').toUpperCase();
};

module.exports = Signature;


/***/ }),

/***/ 2107:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// from https://github.com/indutny/self-signed/blob/gh-pages/lib/asn1.js
// Fedor, you are amazing.


var asn1 = __webpack_require__(753)

exports.certificate = __webpack_require__(2118)

var RSAPrivateKey = asn1.define('RSAPrivateKey', function () {
  this.seq().obj(
    this.key('version').int(),
    this.key('modulus').int(),
    this.key('publicExponent').int(),
    this.key('privateExponent').int(),
    this.key('prime1').int(),
    this.key('prime2').int(),
    this.key('exponent1').int(),
    this.key('exponent2').int(),
    this.key('coefficient').int()
  )
})
exports.RSAPrivateKey = RSAPrivateKey

var RSAPublicKey = asn1.define('RSAPublicKey', function () {
  this.seq().obj(
    this.key('modulus').int(),
    this.key('publicExponent').int()
  )
})
exports.RSAPublicKey = RSAPublicKey

var PublicKey = asn1.define('SubjectPublicKeyInfo', function () {
  this.seq().obj(
    this.key('algorithm').use(AlgorithmIdentifier),
    this.key('subjectPublicKey').bitstr()
  )
})
exports.PublicKey = PublicKey

var AlgorithmIdentifier = asn1.define('AlgorithmIdentifier', function () {
  this.seq().obj(
    this.key('algorithm').objid(),
    this.key('none').null_().optional(),
    this.key('curve').objid().optional(),
    this.key('params').seq().obj(
      this.key('p').int(),
      this.key('q').int(),
      this.key('g').int()
    ).optional()
  )
})

var PrivateKeyInfo = asn1.define('PrivateKeyInfo', function () {
  this.seq().obj(
    this.key('version').int(),
    this.key('algorithm').use(AlgorithmIdentifier),
    this.key('subjectPrivateKey').octstr()
  )
})
exports.PrivateKey = PrivateKeyInfo
var EncryptedPrivateKeyInfo = asn1.define('EncryptedPrivateKeyInfo', function () {
  this.seq().obj(
    this.key('algorithm').seq().obj(
      this.key('id').objid(),
      this.key('decrypt').seq().obj(
        this.key('kde').seq().obj(
          this.key('id').objid(),
          this.key('kdeparams').seq().obj(
            this.key('salt').octstr(),
            this.key('iters').int()
          )
        ),
        this.key('cipher').seq().obj(
          this.key('algo').objid(),
          this.key('iv').octstr()
        )
      )
    ),
    this.key('subjectPrivateKey').octstr()
  )
})

exports.EncryptedPrivateKey = EncryptedPrivateKeyInfo

var DSAPrivateKey = asn1.define('DSAPrivateKey', function () {
  this.seq().obj(
    this.key('version').int(),
    this.key('p').int(),
    this.key('q').int(),
    this.key('g').int(),
    this.key('pub_key').int(),
    this.key('priv_key').int()
  )
})
exports.DSAPrivateKey = DSAPrivateKey

exports.DSAparam = asn1.define('DSAparam', function () {
  this.int()
})

var ECPrivateKey = asn1.define('ECPrivateKey', function () {
  this.seq().obj(
    this.key('version').int(),
    this.key('privateKey').octstr(),
    this.key('parameters').optional().explicit(0).use(ECParameters),
    this.key('publicKey').optional().explicit(1).bitstr()
  )
})
exports.ECPrivateKey = ECPrivateKey

var ECParameters = asn1.define('ECParameters', function () {
  this.choice({
    namedCurve: this.objid()
  })
})

exports.signature = asn1.define('signature', function () {
  this.seq().obj(
    this.key('r').int(),
    this.key('s').int()
  )
})


/***/ }),

/***/ 2108:
/***/ (function(module, exports, __webpack_require__) {

var asn1 = __webpack_require__(753);
var inherits = __webpack_require__(485);

var api = exports;

api.define = function define(name, body) {
  return new Entity(name, body);
};

function Entity(name, body) {
  this.name = name;
  this.body = body;

  this.decoders = {};
  this.encoders = {};
};

Entity.prototype._createNamed = function createNamed(base) {
  var named;
  try {
    named = __webpack_require__(2109).runInThisContext(
      '(function ' + this.name + '(entity) {\n' +
      '  this._initNamed(entity);\n' +
      '})'
    );
  } catch (e) {
    named = function (entity) {
      this._initNamed(entity);
    };
  }
  inherits(named, base);
  named.prototype._initNamed = function initnamed(entity) {
    base.call(this, entity);
  };

  return new named(this);
};

Entity.prototype._getDecoder = function _getDecoder(enc) {
  enc = enc || 'der';
  // Lazily create decoder
  if (!this.decoders.hasOwnProperty(enc))
    this.decoders[enc] = this._createNamed(asn1.decoders[enc]);
  return this.decoders[enc];
};

Entity.prototype.decode = function decode(data, enc, options) {
  return this._getDecoder(enc).decode(data, options);
};

Entity.prototype._getEncoder = function _getEncoder(enc) {
  enc = enc || 'der';
  // Lazily create encoder
  if (!this.encoders.hasOwnProperty(enc))
    this.encoders[enc] = this._createNamed(asn1.encoders[enc]);
  return this.encoders[enc];
};

Entity.prototype.encode = function encode(data, enc, /* internal */ reporter) {
  return this._getEncoder(enc).encode(data, reporter);
};


/***/ }),

/***/ 2109:
/***/ (function(module, exports, __webpack_require__) {

var indexOf = __webpack_require__(2110);

var Object_keys = function (obj) {
    if (Object.keys) return Object.keys(obj)
    else {
        var res = [];
        for (var key in obj) res.push(key)
        return res;
    }
};

var forEach = function (xs, fn) {
    if (xs.forEach) return xs.forEach(fn)
    else for (var i = 0; i < xs.length; i++) {
        fn(xs[i], i, xs);
    }
};

var defineProp = (function() {
    try {
        Object.defineProperty({}, '_', {});
        return function(obj, name, value) {
            Object.defineProperty(obj, name, {
                writable: true,
                enumerable: false,
                configurable: true,
                value: value
            })
        };
    } catch(e) {
        return function(obj, name, value) {
            obj[name] = value;
        };
    }
}());

var globals = ['Array', 'Boolean', 'Date', 'Error', 'EvalError', 'Function',
'Infinity', 'JSON', 'Math', 'NaN', 'Number', 'Object', 'RangeError',
'ReferenceError', 'RegExp', 'String', 'SyntaxError', 'TypeError', 'URIError',
'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'escape',
'eval', 'isFinite', 'isNaN', 'parseFloat', 'parseInt', 'undefined', 'unescape'];

function Context() {}
Context.prototype = {};

var Script = exports.Script = function NodeScript (code) {
    if (!(this instanceof Script)) return new Script(code);
    this.code = code;
};

Script.prototype.runInContext = function (context) {
    if (!(context instanceof Context)) {
        throw new TypeError("needs a 'context' argument.");
    }
    
    var iframe = document.createElement('iframe');
    if (!iframe.style) iframe.style = {};
    iframe.style.display = 'none';
    
    document.body.appendChild(iframe);
    
    var win = iframe.contentWindow;
    var wEval = win.eval, wExecScript = win.execScript;

    if (!wEval && wExecScript) {
        // win.eval() magically appears when this is called in IE:
        wExecScript.call(win, 'null');
        wEval = win.eval;
    }
    
    forEach(Object_keys(context), function (key) {
        win[key] = context[key];
    });
    forEach(globals, function (key) {
        if (context[key]) {
            win[key] = context[key];
        }
    });
    
    var winKeys = Object_keys(win);

    var res = wEval.call(win, this.code);
    
    forEach(Object_keys(win), function (key) {
        // Avoid copying circular objects like `top` and `window` by only
        // updating existing context properties or new properties in the `win`
        // that was only introduced after the eval.
        if (key in context || indexOf(winKeys, key) === -1) {
            context[key] = win[key];
        }
    });

    forEach(globals, function (key) {
        if (!(key in context)) {
            defineProp(context, key, win[key]);
        }
    });
    
    document.body.removeChild(iframe);
    
    return res;
};

Script.prototype.runInThisContext = function () {
    return eval(this.code); // maybe...
};

Script.prototype.runInNewContext = function (context) {
    var ctx = Script.createContext(context);
    var res = this.runInContext(ctx);

    forEach(Object_keys(ctx), function (key) {
        context[key] = ctx[key];
    });

    return res;
};

forEach(Object_keys(Script.prototype), function (name) {
    exports[name] = Script[name] = function (code) {
        var s = Script(code);
        return s[name].apply(s, [].slice.call(arguments, 1));
    };
});

exports.createScript = function (code) {
    return exports.Script(code);
};

exports.createContext = Script.createContext = function (context) {
    var copy = new Context();
    if(typeof context === 'object') {
        forEach(Object_keys(context), function (key) {
            copy[key] = context[key];
        });
    }
    return copy;
};


/***/ }),

/***/ 2110:
/***/ (function(module, exports) {


var indexOf = [].indexOf;

module.exports = function(arr, obj){
  if (indexOf) return arr.indexOf(obj);
  for (var i = 0; i < arr.length; ++i) {
    if (arr[i] === obj) return i;
  }
  return -1;
};

/***/ }),

/***/ 2111:
/***/ (function(module, exports, __webpack_require__) {

var inherits = __webpack_require__(485);

function Reporter(options) {
  this._reporterState = {
    obj: null,
    path: [],
    options: options || {},
    errors: []
  };
}
exports.Reporter = Reporter;

Reporter.prototype.isError = function isError(obj) {
  return obj instanceof ReporterError;
};

Reporter.prototype.save = function save() {
  var state = this._reporterState;

  return { obj: state.obj, pathLen: state.path.length };
};

Reporter.prototype.restore = function restore(data) {
  var state = this._reporterState;

  state.obj = data.obj;
  state.path = state.path.slice(0, data.pathLen);
};

Reporter.prototype.enterKey = function enterKey(key) {
  return this._reporterState.path.push(key);
};

Reporter.prototype.exitKey = function exitKey(index) {
  var state = this._reporterState;

  state.path = state.path.slice(0, index - 1);
};

Reporter.prototype.leaveKey = function leaveKey(index, key, value) {
  var state = this._reporterState;

  this.exitKey(index);
  if (state.obj !== null)
    state.obj[key] = value;
};

Reporter.prototype.path = function path() {
  return this._reporterState.path.join('/');
};

Reporter.prototype.enterObject = function enterObject() {
  var state = this._reporterState;

  var prev = state.obj;
  state.obj = {};
  return prev;
};

Reporter.prototype.leaveObject = function leaveObject(prev) {
  var state = this._reporterState;

  var now = state.obj;
  state.obj = prev;
  return now;
};

Reporter.prototype.error = function error(msg) {
  var err;
  var state = this._reporterState;

  var inherited = msg instanceof ReporterError;
  if (inherited) {
    err = msg;
  } else {
    err = new ReporterError(state.path.map(function(elem) {
      return '[' + JSON.stringify(elem) + ']';
    }).join(''), msg.message || msg, msg.stack);
  }

  if (!state.options.partial)
    throw err;

  if (!inherited)
    state.errors.push(err);

  return err;
};

Reporter.prototype.wrapResult = function wrapResult(result) {
  var state = this._reporterState;
  if (!state.options.partial)
    return result;

  return {
    result: this.isError(result) ? null : result,
    errors: state.errors
  };
};

function ReporterError(path, msg) {
  this.path = path;
  this.rethrow(msg);
};
inherits(ReporterError, Error);

ReporterError.prototype.rethrow = function rethrow(msg) {
  this.message = msg + ' at: ' + (this.path || '(shallow)');
  if (Error.captureStackTrace)
    Error.captureStackTrace(this, ReporterError);

  if (!this.stack) {
    try {
      // IE only adds stack when thrown
      throw new Error(this.message);
    } catch (e) {
      this.stack = e.stack;
    }
  }
  return this;
};


/***/ }),

/***/ 2112:
/***/ (function(module, exports, __webpack_require__) {

var Reporter = __webpack_require__(754).Reporter;
var EncoderBuffer = __webpack_require__(754).EncoderBuffer;
var DecoderBuffer = __webpack_require__(754).DecoderBuffer;
var assert = __webpack_require__(563);

// Supported tags
var tags = [
  'seq', 'seqof', 'set', 'setof', 'objid', 'bool',
  'gentime', 'utctime', 'null_', 'enum', 'int', 'objDesc',
  'bitstr', 'bmpstr', 'charstr', 'genstr', 'graphstr', 'ia5str', 'iso646str',
  'numstr', 'octstr', 'printstr', 't61str', 'unistr', 'utf8str', 'videostr'
];

// Public methods list
var methods = [
  'key', 'obj', 'use', 'optional', 'explicit', 'implicit', 'def', 'choice',
  'any', 'contains'
].concat(tags);

// Overrided methods list
var overrided = [
  '_peekTag', '_decodeTag', '_use',
  '_decodeStr', '_decodeObjid', '_decodeTime',
  '_decodeNull', '_decodeInt', '_decodeBool', '_decodeList',

  '_encodeComposite', '_encodeStr', '_encodeObjid', '_encodeTime',
  '_encodeNull', '_encodeInt', '_encodeBool'
];

function Node(enc, parent) {
  var state = {};
  this._baseState = state;

  state.enc = enc;

  state.parent = parent || null;
  state.children = null;

  // State
  state.tag = null;
  state.args = null;
  state.reverseArgs = null;
  state.choice = null;
  state.optional = false;
  state.any = false;
  state.obj = false;
  state.use = null;
  state.useDecoder = null;
  state.key = null;
  state['default'] = null;
  state.explicit = null;
  state.implicit = null;
  state.contains = null;

  // Should create new instance on each method
  if (!state.parent) {
    state.children = [];
    this._wrap();
  }
}
module.exports = Node;

var stateProps = [
  'enc', 'parent', 'children', 'tag', 'args', 'reverseArgs', 'choice',
  'optional', 'any', 'obj', 'use', 'alteredUse', 'key', 'default', 'explicit',
  'implicit', 'contains'
];

Node.prototype.clone = function clone() {
  var state = this._baseState;
  var cstate = {};
  stateProps.forEach(function(prop) {
    cstate[prop] = state[prop];
  });
  var res = new this.constructor(cstate.parent);
  res._baseState = cstate;
  return res;
};

Node.prototype._wrap = function wrap() {
  var state = this._baseState;
  methods.forEach(function(method) {
    this[method] = function _wrappedMethod() {
      var clone = new this.constructor(this);
      state.children.push(clone);
      return clone[method].apply(clone, arguments);
    };
  }, this);
};

Node.prototype._init = function init(body) {
  var state = this._baseState;

  assert(state.parent === null);
  body.call(this);

  // Filter children
  state.children = state.children.filter(function(child) {
    return child._baseState.parent === this;
  }, this);
  assert.equal(state.children.length, 1, 'Root node can have only one child');
};

Node.prototype._useArgs = function useArgs(args) {
  var state = this._baseState;

  // Filter children and args
  var children = args.filter(function(arg) {
    return arg instanceof this.constructor;
  }, this);
  args = args.filter(function(arg) {
    return !(arg instanceof this.constructor);
  }, this);

  if (children.length !== 0) {
    assert(state.children === null);
    state.children = children;

    // Replace parent to maintain backward link
    children.forEach(function(child) {
      child._baseState.parent = this;
    }, this);
  }
  if (args.length !== 0) {
    assert(state.args === null);
    state.args = args;
    state.reverseArgs = args.map(function(arg) {
      if (typeof arg !== 'object' || arg.constructor !== Object)
        return arg;

      var res = {};
      Object.keys(arg).forEach(function(key) {
        if (key == (key | 0))
          key |= 0;
        var value = arg[key];
        res[value] = key;
      });
      return res;
    });
  }
};

//
// Overrided methods
//

overrided.forEach(function(method) {
  Node.prototype[method] = function _overrided() {
    var state = this._baseState;
    throw new Error(method + ' not implemented for encoding: ' + state.enc);
  };
});

//
// Public methods
//

tags.forEach(function(tag) {
  Node.prototype[tag] = function _tagMethod() {
    var state = this._baseState;
    var args = Array.prototype.slice.call(arguments);

    assert(state.tag === null);
    state.tag = tag;

    this._useArgs(args);

    return this;
  };
});

Node.prototype.use = function use(item) {
  assert(item);
  var state = this._baseState;

  assert(state.use === null);
  state.use = item;

  return this;
};

Node.prototype.optional = function optional() {
  var state = this._baseState;

  state.optional = true;

  return this;
};

Node.prototype.def = function def(val) {
  var state = this._baseState;

  assert(state['default'] === null);
  state['default'] = val;
  state.optional = true;

  return this;
};

Node.prototype.explicit = function explicit(num) {
  var state = this._baseState;

  assert(state.explicit === null && state.implicit === null);
  state.explicit = num;

  return this;
};

Node.prototype.implicit = function implicit(num) {
  var state = this._baseState;

  assert(state.explicit === null && state.implicit === null);
  state.implicit = num;

  return this;
};

Node.prototype.obj = function obj() {
  var state = this._baseState;
  var args = Array.prototype.slice.call(arguments);

  state.obj = true;

  if (args.length !== 0)
    this._useArgs(args);

  return this;
};

Node.prototype.key = function key(newKey) {
  var state = this._baseState;

  assert(state.key === null);
  state.key = newKey;

  return this;
};

Node.prototype.any = function any() {
  var state = this._baseState;

  state.any = true;

  return this;
};

Node.prototype.choice = function choice(obj) {
  var state = this._baseState;

  assert(state.choice === null);
  state.choice = obj;
  this._useArgs(Object.keys(obj).map(function(key) {
    return obj[key];
  }));

  return this;
};

Node.prototype.contains = function contains(item) {
  var state = this._baseState;

  assert(state.use === null);
  state.contains = item;

  return this;
};

//
// Decoding
//

Node.prototype._decode = function decode(input, options) {
  var state = this._baseState;

  // Decode root node
  if (state.parent === null)
    return input.wrapResult(state.children[0]._decode(input, options));

  var result = state['default'];
  var present = true;

  var prevKey = null;
  if (state.key !== null)
    prevKey = input.enterKey(state.key);

  // Check if tag is there
  if (state.optional) {
    var tag = null;
    if (state.explicit !== null)
      tag = state.explicit;
    else if (state.implicit !== null)
      tag = state.implicit;
    else if (state.tag !== null)
      tag = state.tag;

    if (tag === null && !state.any) {
      // Trial and Error
      var save = input.save();
      try {
        if (state.choice === null)
          this._decodeGeneric(state.tag, input, options);
        else
          this._decodeChoice(input, options);
        present = true;
      } catch (e) {
        present = false;
      }
      input.restore(save);
    } else {
      present = this._peekTag(input, tag, state.any);

      if (input.isError(present))
        return present;
    }
  }

  // Push object on stack
  var prevObj;
  if (state.obj && present)
    prevObj = input.enterObject();

  if (present) {
    // Unwrap explicit values
    if (state.explicit !== null) {
      var explicit = this._decodeTag(input, state.explicit);
      if (input.isError(explicit))
        return explicit;
      input = explicit;
    }

    var start = input.offset;

    // Unwrap implicit and normal values
    if (state.use === null && state.choice === null) {
      if (state.any)
        var save = input.save();
      var body = this._decodeTag(
        input,
        state.implicit !== null ? state.implicit : state.tag,
        state.any
      );
      if (input.isError(body))
        return body;

      if (state.any)
        result = input.raw(save);
      else
        input = body;
    }

    if (options && options.track && state.tag !== null)
      options.track(input.path(), start, input.length, 'tagged');

    if (options && options.track && state.tag !== null)
      options.track(input.path(), input.offset, input.length, 'content');

    // Select proper method for tag
    if (state.any)
      result = result;
    else if (state.choice === null)
      result = this._decodeGeneric(state.tag, input, options);
    else
      result = this._decodeChoice(input, options);

    if (input.isError(result))
      return result;

    // Decode children
    if (!state.any && state.choice === null && state.children !== null) {
      state.children.forEach(function decodeChildren(child) {
        // NOTE: We are ignoring errors here, to let parser continue with other
        // parts of encoded data
        child._decode(input, options);
      });
    }

    // Decode contained/encoded by schema, only in bit or octet strings
    if (state.contains && (state.tag === 'octstr' || state.tag === 'bitstr')) {
      var data = new DecoderBuffer(result);
      result = this._getUse(state.contains, input._reporterState.obj)
          ._decode(data, options);
    }
  }

  // Pop object
  if (state.obj && present)
    result = input.leaveObject(prevObj);

  // Set key
  if (state.key !== null && (result !== null || present === true))
    input.leaveKey(prevKey, state.key, result);
  else if (prevKey !== null)
    input.exitKey(prevKey);

  return result;
};

Node.prototype._decodeGeneric = function decodeGeneric(tag, input, options) {
  var state = this._baseState;

  if (tag === 'seq' || tag === 'set')
    return null;
  if (tag === 'seqof' || tag === 'setof')
    return this._decodeList(input, tag, state.args[0], options);
  else if (/str$/.test(tag))
    return this._decodeStr(input, tag, options);
  else if (tag === 'objid' && state.args)
    return this._decodeObjid(input, state.args[0], state.args[1], options);
  else if (tag === 'objid')
    return this._decodeObjid(input, null, null, options);
  else if (tag === 'gentime' || tag === 'utctime')
    return this._decodeTime(input, tag, options);
  else if (tag === 'null_')
    return this._decodeNull(input, options);
  else if (tag === 'bool')
    return this._decodeBool(input, options);
  else if (tag === 'objDesc')
    return this._decodeStr(input, tag, options);
  else if (tag === 'int' || tag === 'enum')
    return this._decodeInt(input, state.args && state.args[0], options);

  if (state.use !== null) {
    return this._getUse(state.use, input._reporterState.obj)
        ._decode(input, options);
  } else {
    return input.error('unknown tag: ' + tag);
  }
};

Node.prototype._getUse = function _getUse(entity, obj) {

  var state = this._baseState;
  // Create altered use decoder if implicit is set
  state.useDecoder = this._use(entity, obj);
  assert(state.useDecoder._baseState.parent === null);
  state.useDecoder = state.useDecoder._baseState.children[0];
  if (state.implicit !== state.useDecoder._baseState.implicit) {
    state.useDecoder = state.useDecoder.clone();
    state.useDecoder._baseState.implicit = state.implicit;
  }
  return state.useDecoder;
};

Node.prototype._decodeChoice = function decodeChoice(input, options) {
  var state = this._baseState;
  var result = null;
  var match = false;

  Object.keys(state.choice).some(function(key) {
    var save = input.save();
    var node = state.choice[key];
    try {
      var value = node._decode(input, options);
      if (input.isError(value))
        return false;

      result = { type: key, value: value };
      match = true;
    } catch (e) {
      input.restore(save);
      return false;
    }
    return true;
  }, this);

  if (!match)
    return input.error('Choice not matched');

  return result;
};

//
// Encoding
//

Node.prototype._createEncoderBuffer = function createEncoderBuffer(data) {
  return new EncoderBuffer(data, this.reporter);
};

Node.prototype._encode = function encode(data, reporter, parent) {
  var state = this._baseState;
  if (state['default'] !== null && state['default'] === data)
    return;

  var result = this._encodeValue(data, reporter, parent);
  if (result === undefined)
    return;

  if (this._skipDefault(result, reporter, parent))
    return;

  return result;
};

Node.prototype._encodeValue = function encode(data, reporter, parent) {
  var state = this._baseState;

  // Decode root node
  if (state.parent === null)
    return state.children[0]._encode(data, reporter || new Reporter());

  var result = null;

  // Set reporter to share it with a child class
  this.reporter = reporter;

  // Check if data is there
  if (state.optional && data === undefined) {
    if (state['default'] !== null)
      data = state['default']
    else
      return;
  }

  // Encode children first
  var content = null;
  var primitive = false;
  if (state.any) {
    // Anything that was given is translated to buffer
    result = this._createEncoderBuffer(data);
  } else if (state.choice) {
    result = this._encodeChoice(data, reporter);
  } else if (state.contains) {
    content = this._getUse(state.contains, parent)._encode(data, reporter);
    primitive = true;
  } else if (state.children) {
    content = state.children.map(function(child) {
      if (child._baseState.tag === 'null_')
        return child._encode(null, reporter, data);

      if (child._baseState.key === null)
        return reporter.error('Child should have a key');
      var prevKey = reporter.enterKey(child._baseState.key);

      if (typeof data !== 'object')
        return reporter.error('Child expected, but input is not object');

      var res = child._encode(data[child._baseState.key], reporter, data);
      reporter.leaveKey(prevKey);

      return res;
    }, this).filter(function(child) {
      return child;
    });
    content = this._createEncoderBuffer(content);
  } else {
    if (state.tag === 'seqof' || state.tag === 'setof') {
      // TODO(indutny): this should be thrown on DSL level
      if (!(state.args && state.args.length === 1))
        return reporter.error('Too many args for : ' + state.tag);

      if (!Array.isArray(data))
        return reporter.error('seqof/setof, but data is not Array');

      var child = this.clone();
      child._baseState.implicit = null;
      content = this._createEncoderBuffer(data.map(function(item) {
        var state = this._baseState;

        return this._getUse(state.args[0], data)._encode(item, reporter);
      }, child));
    } else if (state.use !== null) {
      result = this._getUse(state.use, parent)._encode(data, reporter);
    } else {
      content = this._encodePrimitive(state.tag, data);
      primitive = true;
    }
  }

  // Encode data itself
  var result;
  if (!state.any && state.choice === null) {
    var tag = state.implicit !== null ? state.implicit : state.tag;
    var cls = state.implicit === null ? 'universal' : 'context';

    if (tag === null) {
      if (state.use === null)
        reporter.error('Tag could be ommited only for .use()');
    } else {
      if (state.use === null)
        result = this._encodeComposite(tag, primitive, cls, content);
    }
  }

  // Wrap in explicit
  if (state.explicit !== null)
    result = this._encodeComposite(state.explicit, false, 'context', result);

  return result;
};

Node.prototype._encodeChoice = function encodeChoice(data, reporter) {
  var state = this._baseState;

  var node = state.choice[data.type];
  if (!node) {
    assert(
        false,
        data.type + ' not found in ' +
            JSON.stringify(Object.keys(state.choice)));
  }
  return node._encode(data.value, reporter);
};

Node.prototype._encodePrimitive = function encodePrimitive(tag, data) {
  var state = this._baseState;

  if (/str$/.test(tag))
    return this._encodeStr(data, tag);
  else if (tag === 'objid' && state.args)
    return this._encodeObjid(data, state.reverseArgs[0], state.args[1]);
  else if (tag === 'objid')
    return this._encodeObjid(data, null, null);
  else if (tag === 'gentime' || tag === 'utctime')
    return this._encodeTime(data, tag);
  else if (tag === 'null_')
    return this._encodeNull();
  else if (tag === 'int' || tag === 'enum')
    return this._encodeInt(data, state.args && state.reverseArgs[0]);
  else if (tag === 'bool')
    return this._encodeBool(data);
  else if (tag === 'objDesc')
    return this._encodeStr(data, tag);
  else
    throw new Error('Unsupported tag: ' + tag);
};

Node.prototype._isNumstr = function isNumstr(str) {
  return /^[0-9 ]*$/.test(str);
};

Node.prototype._isPrintstr = function isPrintstr(str) {
  return /^[A-Za-z0-9 '\(\)\+,\-\.\/:=\?]*$/.test(str);
};


/***/ }),

/***/ 2113:
/***/ (function(module, exports, __webpack_require__) {

var constants = __webpack_require__(1971);

exports.tagClass = {
  0: 'universal',
  1: 'application',
  2: 'context',
  3: 'private'
};
exports.tagClassByName = constants._reverse(exports.tagClass);

exports.tag = {
  0x00: 'end',
  0x01: 'bool',
  0x02: 'int',
  0x03: 'bitstr',
  0x04: 'octstr',
  0x05: 'null_',
  0x06: 'objid',
  0x07: 'objDesc',
  0x08: 'external',
  0x09: 'real',
  0x0a: 'enum',
  0x0b: 'embed',
  0x0c: 'utf8str',
  0x0d: 'relativeOid',
  0x10: 'seq',
  0x11: 'set',
  0x12: 'numstr',
  0x13: 'printstr',
  0x14: 't61str',
  0x15: 'videostr',
  0x16: 'ia5str',
  0x17: 'utctime',
  0x18: 'gentime',
  0x19: 'graphstr',
  0x1a: 'iso646str',
  0x1b: 'genstr',
  0x1c: 'unistr',
  0x1d: 'charstr',
  0x1e: 'bmpstr'
};
exports.tagByName = constants._reverse(exports.tag);


/***/ }),

/***/ 2114:
/***/ (function(module, exports, __webpack_require__) {

var decoders = exports;

decoders.der = __webpack_require__(1972);
decoders.pem = __webpack_require__(2115);


/***/ }),

/***/ 2115:
/***/ (function(module, exports, __webpack_require__) {

var inherits = __webpack_require__(485);
var Buffer = __webpack_require__(469).Buffer;

var DERDecoder = __webpack_require__(1972);

function PEMDecoder(entity) {
  DERDecoder.call(this, entity);
  this.enc = 'pem';
};
inherits(PEMDecoder, DERDecoder);
module.exports = PEMDecoder;

PEMDecoder.prototype.decode = function decode(data, options) {
  var lines = data.toString().split(/[\r\n]+/g);

  var label = options.label.toUpperCase();

  var re = /^-----(BEGIN|END) ([^-]+)-----$/;
  var start = -1;
  var end = -1;
  for (var i = 0; i < lines.length; i++) {
    var match = lines[i].match(re);
    if (match === null)
      continue;

    if (match[2] !== label)
      continue;

    if (start === -1) {
      if (match[1] !== 'BEGIN')
        break;
      start = i;
    } else {
      if (match[1] !== 'END')
        break;
      end = i;
      break;
    }
  }
  if (start === -1 || end === -1)
    throw new Error('PEM section not found for: ' + label);

  var base64 = lines.slice(start + 1, end).join('');
  // Remove excessive symbols
  base64.replace(/[^a-z0-9\+\/=]+/gi, '');

  var input = new Buffer(base64, 'base64');
  return DERDecoder.prototype.decode.call(this, input, options);
};


/***/ }),

/***/ 2116:
/***/ (function(module, exports, __webpack_require__) {

var encoders = exports;

encoders.der = __webpack_require__(1973);
encoders.pem = __webpack_require__(2117);


/***/ }),

/***/ 2117:
/***/ (function(module, exports, __webpack_require__) {

var inherits = __webpack_require__(485);

var DEREncoder = __webpack_require__(1973);

function PEMEncoder(entity) {
  DEREncoder.call(this, entity);
  this.enc = 'pem';
};
inherits(PEMEncoder, DEREncoder);
module.exports = PEMEncoder;

PEMEncoder.prototype.encode = function encode(data, options) {
  var buf = DEREncoder.prototype.encode.call(this, data);

  var p = buf.toString('base64');
  var out = [ '-----BEGIN ' + options.label + '-----' ];
  for (var i = 0; i < p.length; i += 64)
    out.push(p.slice(i, i + 64));
  out.push('-----END ' + options.label + '-----');
  return out.join('\n');
};


/***/ }),

/***/ 2118:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// from https://github.com/Rantanen/node-dtls/blob/25a7dc861bda38cfeac93a723500eea4f0ac2e86/Certificate.js
// thanks to @Rantanen



var asn = __webpack_require__(753)

var Time = asn.define('Time', function () {
  this.choice({
    utcTime: this.utctime(),
    generalTime: this.gentime()
  })
})

var AttributeTypeValue = asn.define('AttributeTypeValue', function () {
  this.seq().obj(
    this.key('type').objid(),
    this.key('value').any()
  )
})

var AlgorithmIdentifier = asn.define('AlgorithmIdentifier', function () {
  this.seq().obj(
    this.key('algorithm').objid(),
    this.key('parameters').optional()
  )
})

var SubjectPublicKeyInfo = asn.define('SubjectPublicKeyInfo', function () {
  this.seq().obj(
    this.key('algorithm').use(AlgorithmIdentifier),
    this.key('subjectPublicKey').bitstr()
  )
})

var RelativeDistinguishedName = asn.define('RelativeDistinguishedName', function () {
  this.setof(AttributeTypeValue)
})

var RDNSequence = asn.define('RDNSequence', function () {
  this.seqof(RelativeDistinguishedName)
})

var Name = asn.define('Name', function () {
  this.choice({
    rdnSequence: this.use(RDNSequence)
  })
})

var Validity = asn.define('Validity', function () {
  this.seq().obj(
    this.key('notBefore').use(Time),
    this.key('notAfter').use(Time)
  )
})

var Extension = asn.define('Extension', function () {
  this.seq().obj(
    this.key('extnID').objid(),
    this.key('critical').bool().def(false),
    this.key('extnValue').octstr()
  )
})

var TBSCertificate = asn.define('TBSCertificate', function () {
  this.seq().obj(
    this.key('version').explicit(0).int(),
    this.key('serialNumber').int(),
    this.key('signature').use(AlgorithmIdentifier),
    this.key('issuer').use(Name),
    this.key('validity').use(Validity),
    this.key('subject').use(Name),
    this.key('subjectPublicKeyInfo').use(SubjectPublicKeyInfo),
    this.key('issuerUniqueID').implicit(1).bitstr().optional(),
    this.key('subjectUniqueID').implicit(2).bitstr().optional(),
    this.key('extensions').explicit(3).seqof(Extension).optional()
  )
})

var X509Certificate = asn.define('X509Certificate', function () {
  this.seq().obj(
    this.key('tbsCertificate').use(TBSCertificate),
    this.key('signatureAlgorithm').use(AlgorithmIdentifier),
    this.key('signatureValue').bitstr()
  )
})

module.exports = X509Certificate


/***/ }),

/***/ 2119:
/***/ (function(module, exports) {

module.exports = {"2.16.840.1.101.3.4.1.1":"aes-128-ecb","2.16.840.1.101.3.4.1.2":"aes-128-cbc","2.16.840.1.101.3.4.1.3":"aes-128-ofb","2.16.840.1.101.3.4.1.4":"aes-128-cfb","2.16.840.1.101.3.4.1.21":"aes-192-ecb","2.16.840.1.101.3.4.1.22":"aes-192-cbc","2.16.840.1.101.3.4.1.23":"aes-192-ofb","2.16.840.1.101.3.4.1.24":"aes-192-cfb","2.16.840.1.101.3.4.1.41":"aes-256-ecb","2.16.840.1.101.3.4.1.42":"aes-256-cbc","2.16.840.1.101.3.4.1.43":"aes-256-ofb","2.16.840.1.101.3.4.1.44":"aes-256-cfb"}

/***/ }),

/***/ 2120:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// adapted from https://github.com/apatil/pemstrip
var findProc = /Proc-Type: 4,ENCRYPTED\n\r?DEK-Info: AES-((?:128)|(?:192)|(?:256))-CBC,([0-9A-H]+)\n\r?\n\r?([0-9A-z\n\r\+\/\=]+)\n\r?/m
var startRegex = /^-----BEGIN ((?:.* KEY)|CERTIFICATE)-----\n/m
var fullRegex = /^-----BEGIN ((?:.* KEY)|CERTIFICATE)-----\n\r?([0-9A-z\n\r\+\/\=]+)\n\r?-----END \1-----$/m
var evp = __webpack_require__(779)
var ciphers = __webpack_require__(986)
module.exports = function (okey, password) {
  var key = okey.toString()
  var match = key.match(findProc)
  var decrypted
  if (!match) {
    var match2 = key.match(fullRegex)
    decrypted = new Buffer(match2[2].replace(/\r?\n/g, ''), 'base64')
  } else {
    var suite = 'aes' + match[1]
    var iv = new Buffer(match[2], 'hex')
    var cipherText = new Buffer(match[3].replace(/\r?\n/g, ''), 'base64')
    var cipherKey = evp(password, iv.slice(0, 8), parseInt(match[1], 10)).key
    var out = []
    var cipher = ciphers.createDecipheriv(suite, cipherKey, iv)
    out.push(cipher.update(cipherText))
    out.push(cipher.final())
    decrypted = Buffer.concat(out)
  }
  var tag = key.match(startRegex)[1]
  return {
    tag: tag,
    data: decrypted
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 2121:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// much of this based on https://github.com/indutny/self-signed/blob/gh-pages/lib/rsa.js
var BN = __webpack_require__(514)
var EC = __webpack_require__(538).ec
var parseKeys = __webpack_require__(784)
var curves = __webpack_require__(1974)

function verify (sig, hash, key, signType, tag) {
  var pub = parseKeys(key)
  if (pub.type === 'ec') {
    // rsa keys can be interpreted as ecdsa ones in openssl
    if (signType !== 'ecdsa' && signType !== 'ecdsa/rsa') throw new Error('wrong public key type')
    return ecVerify(sig, hash, pub)
  } else if (pub.type === 'dsa') {
    if (signType !== 'dsa') throw new Error('wrong public key type')
    return dsaVerify(sig, hash, pub)
  } else {
    if (signType !== 'rsa' && signType !== 'ecdsa/rsa') throw new Error('wrong public key type')
  }
  hash = Buffer.concat([tag, hash])
  var len = pub.modulus.byteLength()
  var pad = [ 1 ]
  var padNum = 0
  while (hash.length + pad.length + 2 < len) {
    pad.push(0xff)
    padNum++
  }
  pad.push(0x00)
  var i = -1
  while (++i < hash.length) {
    pad.push(hash[i])
  }
  pad = new Buffer(pad)
  var red = BN.mont(pub.modulus)
  sig = new BN(sig).toRed(red)

  sig = sig.redPow(new BN(pub.publicExponent))
  sig = new Buffer(sig.fromRed().toArray())
  var out = padNum < 8 ? 1 : 0
  len = Math.min(sig.length, pad.length)
  if (sig.length !== pad.length) out = 1

  i = -1
  while (++i < len) out |= sig[i] ^ pad[i]
  return out === 0
}

function ecVerify (sig, hash, pub) {
  var curveId = curves[pub.data.algorithm.curve.join('.')]
  if (!curveId) throw new Error('unknown curve ' + pub.data.algorithm.curve.join('.'))

  var curve = new EC(curveId)
  var pubkey = pub.data.subjectPrivateKey.data

  return curve.verify(hash, sig, pubkey)
}

function dsaVerify (sig, hash, pub) {
  var p = pub.data.p
  var q = pub.data.q
  var g = pub.data.g
  var y = pub.data.pub_key
  var unpacked = parseKeys.signature.decode(sig, 'der')
  var s = unpacked.s
  var r = unpacked.r
  checkValue(s, q)
  checkValue(r, q)
  var montp = BN.mont(p)
  var w = s.invm(q)
  var v = g.toRed(montp)
    .redPow(new BN(hash).mul(w).mod(q))
    .fromRed()
    .mul(y.toRed(montp).redPow(r.mul(w).mod(q)).fromRed())
    .mod(p)
    .mod(q)
  return v.cmp(r) === 0
}

function checkValue (b, q) {
  if (b.cmpn(0) <= 0) throw new Error('invalid sig')
  if (b.cmp(q) >= q) throw new Error('invalid sig')
}

module.exports = verify

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 2122:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var elliptic = __webpack_require__(538);
var BN = __webpack_require__(514);

module.exports = function createECDH(curve) {
	return new ECDH(curve);
};

var aliases = {
	secp256k1: {
		name: 'secp256k1',
		byteLength: 32
	},
	secp224r1: {
		name: 'p224',
		byteLength: 28
	},
	prime256v1: {
		name: 'p256',
		byteLength: 32
	},
	prime192v1: {
		name: 'p192',
		byteLength: 24
	},
	ed25519: {
		name: 'ed25519',
		byteLength: 32
	},
	secp384r1: {
		name: 'p384',
		byteLength: 48
	},
	secp521r1: {
		name: 'p521',
		byteLength: 66
	}
};

aliases.p224 = aliases.secp224r1;
aliases.p256 = aliases.secp256r1 = aliases.prime256v1;
aliases.p192 = aliases.secp192r1 = aliases.prime192v1;
aliases.p384 = aliases.secp384r1;
aliases.p521 = aliases.secp521r1;

function ECDH(curve) {
	this.curveType = aliases[curve];
	if (!this.curveType ) {
		this.curveType = {
			name: curve
		};
	}
	this.curve = new elliptic.ec(this.curveType.name);
	this.keys = void 0;
}

ECDH.prototype.generateKeys = function (enc, format) {
	this.keys = this.curve.genKeyPair();
	return this.getPublicKey(enc, format);
};

ECDH.prototype.computeSecret = function (other, inenc, enc) {
	inenc = inenc || 'utf8';
	if (!Buffer.isBuffer(other)) {
		other = new Buffer(other, inenc);
	}
	var otherPub = this.curve.keyFromPublic(other).getPublic();
	var out = otherPub.mul(this.keys.getPrivate()).getX();
	return formatReturnValue(out, enc, this.curveType.byteLength);
};

ECDH.prototype.getPublicKey = function (enc, format) {
	var key = this.keys.getPublic(format === 'compressed', true);
	if (format === 'hybrid') {
		if (key[key.length - 1] % 2) {
			key[0] = 7;
		} else {
			key [0] = 6;
		}
	}
	return formatReturnValue(key, enc);
};

ECDH.prototype.getPrivateKey = function (enc) {
	return formatReturnValue(this.keys.getPrivate(), enc);
};

ECDH.prototype.setPublicKey = function (pub, enc) {
	enc = enc || 'utf8';
	if (!Buffer.isBuffer(pub)) {
		pub = new Buffer(pub, enc);
	}
	this.keys._importPublic(pub);
	return this;
};

ECDH.prototype.setPrivateKey = function (priv, enc) {
	enc = enc || 'utf8';
	if (!Buffer.isBuffer(priv)) {
		priv = new Buffer(priv, enc);
	}
	var _priv = new BN(priv);
	_priv = _priv.toString(16);
	this.keys._importPrivate(_priv);
	return this;
};

function formatReturnValue(bn, enc, len) {
	if (!Array.isArray(bn)) {
		bn = bn.toArray();
	}
	var buf = new Buffer(bn);
	if (len && buf.length < len) {
		var zeros = new Buffer(len - buf.length);
		zeros.fill(0);
		buf = Buffer.concat([zeros, buf]);
	}
	if (!enc) {
		return buf;
	} else {
		return buf.toString(enc);
	}
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 2123:
/***/ (function(module, exports, __webpack_require__) {

exports.publicEncrypt = __webpack_require__(2124);
exports.privateDecrypt = __webpack_require__(2125);

exports.privateEncrypt = function privateEncrypt(key, buf) {
  return exports.publicEncrypt(key, buf, true);
};

exports.publicDecrypt = function publicDecrypt(key, buf) {
  return exports.privateDecrypt(key, buf, true);
};

/***/ }),

/***/ 2124:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var parseKeys = __webpack_require__(784);
var randomBytes = __webpack_require__(748);
var createHash = __webpack_require__(749);
var mgf = __webpack_require__(1975);
var xor = __webpack_require__(1976);
var bn = __webpack_require__(514);
var withPublic = __webpack_require__(1977);
var crt = __webpack_require__(988);

var constants = {
  RSA_PKCS1_OAEP_PADDING: 4,
  RSA_PKCS1_PADDIN: 1,
  RSA_NO_PADDING: 3
};

module.exports = function publicEncrypt(public_key, msg, reverse) {
  var padding;
  if (public_key.padding) {
    padding = public_key.padding;
  } else if (reverse) {
    padding = 1;
  } else {
    padding = 4;
  }
  var key = parseKeys(public_key);
  var paddedMsg;
  if (padding === 4) {
    paddedMsg = oaep(key, msg);
  } else if (padding === 1) {
    paddedMsg = pkcs1(key, msg, reverse);
  } else if (padding === 3) {
    paddedMsg = new bn(msg);
    if (paddedMsg.cmp(key.modulus) >= 0) {
      throw new Error('data too long for modulus');
    }
  } else {
    throw new Error('unknown padding');
  }
  if (reverse) {
    return crt(paddedMsg, key);
  } else {
    return withPublic(paddedMsg, key);
  }
};

function oaep(key, msg){
  var k = key.modulus.byteLength();
  var mLen = msg.length;
  var iHash = createHash('sha1').update(new Buffer('')).digest();
  var hLen = iHash.length;
  var hLen2 = 2 * hLen;
  if (mLen > k - hLen2 - 2) {
    throw new Error('message too long');
  }
  var ps = new Buffer(k - mLen - hLen2 - 2);
  ps.fill(0);
  var dblen = k - hLen - 1;
  var seed = randomBytes(hLen);
  var maskedDb = xor(Buffer.concat([iHash, ps, new Buffer([1]), msg], dblen), mgf(seed, dblen));
  var maskedSeed = xor(seed, mgf(maskedDb, hLen));
  return new bn(Buffer.concat([new Buffer([0]), maskedSeed, maskedDb], k));
}
function pkcs1(key, msg, reverse){
  var mLen = msg.length;
  var k = key.modulus.byteLength();
  if (mLen > k - 11) {
    throw new Error('message too long');
  }
  var ps;
  if (reverse) {
    ps = new Buffer(k - mLen - 3);
    ps.fill(0xff);
  } else {
    ps = nonZero(k - mLen - 3);
  }
  return new bn(Buffer.concat([new Buffer([0, reverse?1:2]), ps, new Buffer([0]), msg], k));
}
function nonZero(len, crypto) {
  var out = new Buffer(len);
  var i = 0;
  var cache = randomBytes(len*2);
  var cur = 0;
  var num;
  while (i < len) {
    if (cur === cache.length) {
      cache = randomBytes(len*2);
      cur = 0;
    }
    num = cache[cur++];
    if (num) {
      out[i++] = num;
    }
  }
  return out;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 2125:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var parseKeys = __webpack_require__(784);
var mgf = __webpack_require__(1975);
var xor = __webpack_require__(1976);
var bn = __webpack_require__(514);
var crt = __webpack_require__(988);
var createHash = __webpack_require__(749);
var withPublic = __webpack_require__(1977);
module.exports = function privateDecrypt(private_key, enc, reverse) {
  var padding;
  if (private_key.padding) {
    padding = private_key.padding;
  } else if (reverse) {
    padding = 1;
  } else {
    padding = 4;
  }
  
  var key = parseKeys(private_key);
  var k = key.modulus.byteLength();
  if (enc.length > k || new bn(enc).cmp(key.modulus) >= 0) {
    throw new Error('decryption error');
  }
  var msg;
  if (reverse) {
    msg = withPublic(new bn(enc), key);
  } else {
    msg = crt(enc, key);
  }
  var zBuffer = new Buffer(k - msg.length);
  zBuffer.fill(0);
  msg = Buffer.concat([zBuffer, msg], k);
  if (padding === 4) {
    return oaep(key, msg);
  } else if (padding === 1) {
    return pkcs1(key, msg, reverse);
  } else if (padding === 3) {
    return msg;
  } else {
    throw new Error('unknown padding');
  }
};

function oaep(key, msg){
  var n = key.modulus;
  var k = key.modulus.byteLength();
  var mLen = msg.length;
  var iHash = createHash('sha1').update(new Buffer('')).digest();
  var hLen = iHash.length;
  var hLen2 = 2 * hLen;
  if (msg[0] !== 0) {
    throw new Error('decryption error');
  }
  var maskedSeed = msg.slice(1, hLen + 1);
  var maskedDb =  msg.slice(hLen + 1);
  var seed = xor(maskedSeed, mgf(maskedDb, hLen));
  var db = xor(maskedDb, mgf(seed, k - hLen - 1));
  if (compare(iHash, db.slice(0, hLen))) {
    throw new Error('decryption error');
  }
  var i = hLen;
  while (db[i] === 0) {
    i++;
  }
  if (db[i++] !== 1) {
    throw new Error('decryption error');
  }
  return db.slice(i);
}

function pkcs1(key, msg, reverse){
  var p1 = msg.slice(0, 2);
  var i = 2;
  var status = 0;
  while (msg[i++] !== 0) {
    if (i >= msg.length) {
      status++;
      break;
    }
  }
  var ps = msg.slice(2, i - 1);
  var p2 = msg.slice(i - 1, i);

  if ((p1.toString('hex') !== '0002' && !reverse) || (p1.toString('hex') !== '0001' && reverse)){
    status++;
  }
  if (ps.length < 8) {
    status++;
  }
  if (status) {
    throw new Error('decryption error');
  }
  return  msg.slice(i);
}
function compare(a, b){
  a = new Buffer(a);
  b = new Buffer(b);
  var dif = 0;
  var len = a.length;
  if (a.length !== b.length) {
    dif++;
    len = Math.min(a.length, b.length);
  }
  var i = -1;
  while (++i < len) {
    dif += (a[i] ^ b[i]);
  }
  return dif;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 432:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, __dirname, Promise, Buffer, module) {var _0x47b4=['syncFSRequests','\x20FS.syncfs\x20operations\x20in\x20flight\x20at\x20once,\x20probably\x20just\x20doing\x20extra\x20work','getMounts','syncfs','destroyNode','basename','mayCreate','mayDelete','willMovePath','FS.trackingDelegate[\x27willMovePath\x27](\x27','\x27,\x20\x27','\x27)\x20threw\x20an\x20exception:\x20','message','onMovePath','trackingDelegate','willDeletePath','FS.trackingDelegate[\x27willDeletePath\x27](\x27','onDeletePath','FS.trackingDelegate[\x27onDeletePath\x27](\x27','readlink','getStream','chown','truncate','modeStringToFlags','mayOpen','createStream','logReadFiles','readFiles','FS.trackingDelegate\x20error\x20on\x20read\x20file:\x20','onOpenFile','tracking','openFlags','WRITE','FS.trackingDelegate[\x27onOpenFile\x27](\x27','isClosed','getdents','close','closeStream','ungotten','onWriteToFile','ioctl','encoding','isView','byteLength','canOwn','Unsupported\x20data\x20type','currentPath','/home','/dev','makedev','mkdev','default_tty_ops','register','default_tty1_ops','/dev/tty','/dev/tty1','getRandomValues','randomBytes','random_device','createDevice','random','urandom','/dev/shm','/dev/shm/tmp','/proc','/proc/self','/proc/self/fd','fake','stdin','stdout','/dev/stdout','stderr','/dev/stderr','setErrno','FS\x20error','constructor','genericErrors','<generic\x20error,\x20no\x20stack>','createDefaultDirectories','createDefaultDevices','createSpecialDirectories','filesystems','ensureErrnoError','createStandardStreams','_fflush','analyzePath','exists','parentExists','parentObject','create','major','isFolder','Lazy\x20loading\x20should\x20have\x20been\x20performed\x20(contents\x20set)\x20in\x20createLazyFile,\x20but\x20it\x20was\x20not.\x20Lazy\x20loading\x20only\x20works\x20in\x20web\x20workers.\x20Use\x20--embed-file\x20or\x20--preload-file\x20in\x20emcc\x20on\x20the\x20main\x20thread.','url','Cannot\x20load\x20without\x20read()\x20or\x20XMLHttpRequest.','lengthKnown','chunks','chunkSize','getter','setDataGetter','cacheLength','getResponseHeader','Content-length','Accept-Ranges','Content-Encoding','gzip','invalid\x20range\x20(',')\x20or\x20no\x20bytes\x20requested!','only\x20','setRequestHeader','bytes=','overrideMimeType','text/plain;\x20charset=x-user-defined','Couldn\x27t\x20load\x20','.\x20Status:\x20','doXHR\x20failed!','LazyFiles\x20on\x20gzip\x20forces\x20download\x20of\x20the\x20whole\x20file\x20when\x20length\x20is\x20accessed','_chunkSize','Cannot\x20do\x20synchronous\x20binary\x20XHRs\x20outside\x20webworkers\x20in\x20modern\x20browsers.\x20Use\x20--embed-file\x20or\x20--preload-file\x20in\x20emcc','_length','createFile','forceLoadFile','cp\x20','createDataFile','handle','asyncLoad','indexedDB','EM_FS_','DB_NAME','creating\x20db','EBADF','dev','gid','getTime','EINVAL','EACCES','varargs','getSocket','lookup_addr','addr','getStr','getStreamFromFD','doReadv','doWritev','getZero','get64','ftruncate','doStat','doAccess','ENOTTY','bad\x20ioctl\x20syscall\x20','doDup','fromWireType','_unknown','return\x20function\x20','()\x20{\x0a','\x20\x20\x20\x20\x22use\x20strict\x22;','\x20\x20\x20\x20return\x20body.apply(this,\x20arguments);\x0a','};\x0a','Mismatched\x20type\x20converter\x20count','elements','setterArgumentType','rawDestructor','toWireType','Incorrect\x20number\x20of\x20tuple\x20elements\x20for\x20',':\x20expected=',',\x20actual=','getterContext','setter','setterContext','Missing\x20field','argPackAdvance','registerType\x20registeredInstance\x20requires\x20argPackAdvance','\x22\x20must\x20have\x20a\x20positive\x20integer\x20typeid\x20pointer','ignoreDuplicateRegistrations','Cannot\x20register\x20type\x20\x27','Unknown\x20boolean\x20type\x20size:\x20','ptrType','registeredClass','ptr','baseClass','upcast','count','smartPtr','smartPtrType','\x20instance\x20already\x20deleted','preservePointerOnDelete','value','getPrototypeOf','deleteScheduled','Object\x20already\x20scheduled\x20for\x20deletion','isAliasOf','clone','isDeleted','deleteLater','overloadTable','Function\x20\x27',')\x20-\x20expects\x20one\x20of\x20(','argCount','Cannot\x20register\x20public\x20name\x20\x27','\x27\x20twice','Cannot\x20register\x20multiple\x20overloads\x20of\x20a\x20function\x20with\x20the\x20same\x20number\x20of\x20arguments\x20(','numArguments','instancePrototype','getActualType','isReference','null\x20is\x20not\x20a\x20valid\x20','Cannot\x20pass\x20\x22','\x22\x20as\x20a\x20','Cannot\x20pass\x20deleted\x20object\x20as\x20a\x20pointer\x20of\x20type\x20','isConst','Cannot\x20convert\x20argument\x20of\x20type\x20','\x20to\x20parameter\x20type\x20','Passing\x20raw\x20pointer\x20to\x20smart\x20pointer\x20is\x20illegal','rawShare','Unsupporting\x20sharing\x20policy','rawGetPointee','downcast','getInheritedInstanceCount','getLiveInheritedInstances','flushPendingDeletes','setDelayFunction','ptr\x20should\x20not\x20be\x20undefined','makeClassHandle\x20requires\x20ptr\x20and\x20ptrType','Both\x20smartPtrType\x20and\x20smartPtr\x20must\x20be\x20specified','getPointee','isSmartPointer','pointeeType','constPointerType','pointerType','deleteObject','sharingPolicy','rawConstructor','destructorFunction',')\x20{\x0a','\x20\x20\x20\x20return\x20dynCall(rawFunction',');\x0a','dynCall','rawFunction','FUNCTION_TABLE_','No\x20dynCall\x20invoker\x20for\x20signature:\x20','unknown\x20function\x20pointer\x20with\x20signature\x20','Cannot\x20construct\x20','\x20due\x20to\x20unbound\x20types','Use\x20\x27new\x27\x20to\x20construct\x20','constructor_body','\x20has\x20no\x20accessible\x20constructor','Tried\x20to\x20invoke\x20ctor\x20of\x20','\x20with\x20invalid\x20number\x20of\x20parameters\x20(',')\x20-\x20expected\x20(',')\x20parameters\x20instead!','constructor\x20','Cannot\x20register\x20multiple\x20constructors\x20with\x20identical\x20number\x20of\x20parameters\x20(','\x27!\x20Overload\x20resolution\x20is\x20currently\x20only\x20performed\x20using\x20the\x20parameter\x20count,\x20not\x20actual\x20type\x20info!','\x20arguments,\x20expected\x20','new_\x20called\x20with\x20constructor\x20type\x20','\x20which\x20is\x20not\x20a\x20function','unknownFunctionName','argTypes\x20array\x20size\x20mismatch!\x20Must\x20at\x20least\x20get\x20return\x20value\x20and\x20\x27this\x27\x20types!','void','Wired','if\x20(arguments.length\x20!==\x20','throwBindingError(\x27function\x20','\x20called\x20with\x20\x27\x20+\x20arguments.length\x20+\x20\x27\x20arguments,\x20expected\x20','\x20args!\x27);\x0a','var\x20destructors\x20=\x20[];\x0a','destructors','null','throwBindingError','runDestructors','retType','classParam','var\x20thisWired\x20=\x20classParam.toWireType(',',\x20this);\x0a','var\x20arg','Wired\x20=\x20argType',',\x20arg',');\x20//\x20','thisWired','var\x20rv\x20=\x20','invoker(fn','runDestructors(destructors);\x0a','_dtor(','_dtor','var\x20ret\x20=\x20retType.fromWireType(rv);\x0a','return\x20ret;\x0a','pureVirtualFunctions','className','\x20with\x20invalid\x20\x22this\x22:\x20','\x20incompatible\x20with\x20\x22this\x22\x20of\x20type\x20','cannot\x20call\x20emscripten\x20binding\x20method\x20','\x20on\x20deleted\x20object','Cannot\x20access\x20','\x20is\x20a\x20read-only\x20property','\x20getter','defineProperty','count_emval_handles','values','\x20has\x20unknown\x20type\x20','enum','Unknown\x20float\x20type:\x20','Cannot\x20convert\x20\x22','\x22\x20to\x20','Unknown\x20integer\x20type:\x20','unsigned','Passing\x20a\x20number\x20\x22','std::string','Cannot\x20pass\x20non-string\x20to\x20std::string','String\x20has\x20UTF-16\x20code\x20units\x20that\x20do\x20not\x20fit\x20in\x208\x20bits','fields','Cannot\x20use\x20deleted\x20val.\x20handle\x20=\x20','emval::as','readValueFromPointer','longjmp','hrtime','staticInit','FS_createFolder','createFolder','createPath','FS_createDataFile','FS_createPreloadedFile','FS_createLazyFile','createLazyFile','FS_createLink','createLink','FS_createDevice','FS_unlink','InternalError','BindingError','UnboundTypeError','\x20not\x20in\x200x00-0xFF.','___getTypeName','__get_daylight','__get_environ','__get_timezone','__get_tzname','_free','_llvm_bswap_i32','_llvm_round_f32','_malloc','_memcpy','_memmove','_memset','_realloc','_sbrk','_setThrew','_testSetjmp','establishStackSpace','globalCtors','stackAlloc','stackRestore','stackSave','dynCall_dii','dynCall_fi','dynCall_fif','dynCall_fii','dynCall_fiiiii','dynCall_i','dynCall_ii','dynCall_iidiiii','dynCall_iif','dynCall_iii','dynCall_iiiff','dynCall_iiifii','dynCall_iiii','dynCall_iiiif','dynCall_iiiiff','dynCall_iiiiffffii','dynCall_iiiifffiiffff','dynCall_iiiifii','dynCall_iiiifiiffff','dynCall_iiiii','dynCall_iiiiifffiiffff','dynCall_iiiiifiiffff','dynCall_iiiiii','dynCall_iiiiiiffff','dynCall_iiiiiifffff','dynCall_iiiiiifffffifffff','dynCall_iiiiiii','dynCall_iiiiiiiffff','dynCall_iiiiiiifffff','dynCall_iiiiiiifffffifffff','dynCall_iiiiiiii','dynCall_iiiiiiiifff','dynCall_iiiiiiiii','dynCall_iiiiiiiiifff','dynCall_iiiiiiiiifffffffi','dynCall_iiiiiiiiiffffffi','dynCall_iiiiiiiiii','dynCall_iiiiiiiiiifff','dynCall_iiiiiiiiiifffffffi','dynCall_iiiiiiiiiiffffffi','dynCall_iiiiiiiiiii','dynCall_iiiiiiiiiiifff','dynCall_iiiiiiiiiiifffi','dynCall_iiiiiiiiiiiffi','dynCall_iiiiiiiiiiifi','dynCall_iiiiiiiiiiii','dynCall_iiiiiiiiiiiifffi','dynCall_iiiiiiiiiiiiffi','dynCall_iiiiiiiiiiiifi','dynCall_iiiiiiiiiiiii','dynCall_jiji','dynCall_vif','dynCall_vii','dynCall_viid','dynCall_viif','dynCall_viii','dynCall_viiif','dynCall_viiii','dynCall_viiiii','dynCall_viiiiii','dynCall_viiiiiiii','dynCall_viiiiiiiii','createPreloadedFile','ExitStatus','Program\x20terminated\x20with\x20exit(','onRuntimeInitialized','Running...','noExitRuntime','onExit','onAbort','stringify','abort(',').\x20Build\x20with\x20-s\x20ASSERTIONS=1\x20for\x20more\x20info.','preInit','https://plugins-media.makeupar.com/webconsultation/core/','undefined','expectedDataFileDownloads','finishedDataFileDownloads','object','encodeURIComponent','location','pathname','toString','substring','lastIndexOf','using\x20preloaded\x20data\x20can\x20only\x20be\x20done\x20on\x20a\x20web\x20page\x20or\x20in\x20a\x20web\x20worker','Web_MakeupLive/wasm/Venus-20220304.data','Venus-20220304.data','locateFilePackage','locateFile','warning:\x20you\x20defined\x20Module.locateFilePackage,\x20that\x20has\x20been\x20renamed\x20to\x20Module.locateFile\x20(using\x20your\x20locateFilePackage\x20for\x20now)','responseType','arraybuffer','total','loaded','addedTotal','dataFileDownloads','ceil','setStatus','Downloading\x20data...\x20(','Downloading\x20data...','onerror','NetworkError\x20for:\x20','status','response','statusText','responseURL','send','error','package\x20error:','getPreloadedPackage','stack','FS_createPath','_run','start','audio','prototype','name','requests','addRunDependency','fp\x20','byteArray','subarray','end','finish','removeRunDependency','files','length','open','GET','Loading\x20data\x20file\x20failed.','getMemory','HEAPU8','set','datafile_Web_MakeupLive/wasm/Venus-20220304.data','preloadResults','calledRun','preRun','push','/_run/YMK_Venus_20181211.regressor','/_run/pose.mtnet','/_run/skin_map_net_20200506.bin','/_run/faceart_20180917.model','9e7c4cfe-c0dc-4dc6-97ee-35fd4fa8125b','hasOwnProperty','arguments','thisProgram','quit','function','read','path','readFileSync','readBinary','buffer','argv','replace','slice','uncaughtException','unhandledRejection','exit','[Emscripten\x20Module\x20object]','binary','href','currentScript','src','indexOf','blob:','substr','responseText','readAsync','onload','setWindowTitle','title','print','log','bind','printErr','warn','i16','i32','i64','float','double','getNativeTypeSize\x20invalid\x20bits\x20',',\x20type\x20','shown','concat','Instance','exports','grow','Unable\x20to\x20grow\x20wasm\x20table.\x20Use\x20a\x20higher\x20value\x20for\x20RESERVED_FUNCTION_POINTERS\x20or\x20set\x20ALLOW_TABLE_GROWTH.','Missing\x20signature\x20argument\x20to\x20addFunction','Finished\x20up\x20all\x20reserved\x20function\x20pointers.\x20Use\x20a\x20higher\x20value\x20for\x20RESERVED_FUNCTION_POINTERS.','dynCall_','apply','call','no\x20native\x20wasm\x20support\x20detected','charAt','invalid\x20type\x20for\x20getValue:\x20','Assertion\x20failed:\x20','Cannot\x20call\x20unknown\x20function\x20',',\x20make\x20sure\x20it\x20is\x20exported','string','boolean','every','number','max','this\x20function\x20has\x20been\x20removed\x20-\x20you\x20should\x20use\x20UTF8ToString(ptr,\x20maxBytesToRead)\x20instead!','fromCharCode','utf8','decode','charCodeAt','utf-16le','writeStringToMemory\x20is\x20deprecated\x20and\x20should\x20not\x20be\x20called!\x20Use\x20stringToUTF8()\x20instead!','(no\x20stack\x20trace\x20available)','extraStackTrace','HEAP8','HEAP16','HEAP32','HEAPU32','HEAPF32','TOTAL_MEMORY','TOTAL_MEMORY\x20should\x20be\x20larger\x20than\x20TOTAL_STACK,\x20was\x20','!\x20(TOTAL_STACK=','Memory','shift','arg','dynCall_v','dynCall_vi','noFSInit','initialized','init','ignorePermissions','postRun','unshift','abs','pow','cos','tan','acos','asin','atan2','exp','sqrt','floor','imul','fround','min','clz32','trunc','monitorRunDependencies','preloadedImages','preloadedAudios','data:application/octet-stream;base64,','startsWith','Venus-20220304.wasm','wasmBinary','both\x20async\x20and\x20sync\x20fetching\x20of\x20the\x20wasm\x20failed','same-origin','failed\x20to\x20load\x20wasm\x20binary\x20file\x20at\x20\x27','arrayBuffer','catch','asm','wasm-instantiate','instantiateWasm','Module.instantiateWasm\x20callback\x20failed\x20with\x20error:\x20','instance','then','instantiate','memory','table','anyfunc','__memory_base','__table_base','called','USER','web_user','PATH','PWD','HOME','/home/web_user','C.UTF-8','Environment\x20size\x20exceeded\x20TOTAL_ENV_SIZE!','now','___errno_location','uncaught_exception','infos','adjusted','refcount','rethrown','destructor','caught','addRef','Pure\x20virtual\x20function\x20called!','last','___cxa_is_pointer_type','___cxa_can_catch','exec','splice','normalizeArray','split','filter','join','splitPath','normalize','cwd','Arguments\x20to\x20path.resolve\x20must\x20be\x20strings','resolve','registerDevice','stream_ops','node','ErrnoError','tty','seekable','ops','flush','get_char','timestamp','put_char','input','platform','win32','openSync','/dev/stdin','readSync','EOF','closeSync','utf-8','prompt','Input:\x20','output','createNode','isBlkdev','isFIFO','node_ops','setattr','lookup','mknod','rename','unlink','symlink','llseek','getattr','write','allocate','mmap','msync','chrdev_stream_ops','isDir','mode','dir','ops_table','stream','contents','isFile','file','usedBytes','link','isChrdev','chrdev','ino','nlink','uid','rdev','size','isLink','atime','mtime','ctime','blksize','blocks','resizeFileStorage','lookupNode','parent','expandFileStorage','byteOffset','mozIndexedDB','webkitIndexedDB','msIndexedDB','FILE_DATA','mount','getLocalSet','getRemoteSet','reconcile','dbs','DB_VERSION','Unable\x20to\x20connect\x20to\x20IndexedDB','onupgradeneeded','target','result','DB_STORE_NAME','objectStore','createObjectStore','indexNames','contains','createIndex','onsuccess','preventDefault','join2','readdir','map','mountpoint','getDB','transaction','readonly','openKeyCursor','remote','primaryKey','continue','lookupPath','getFileDataAsTypedArray','mkdir','chmod','utime','stat','rmdir','get','put','delete','keys','entries','forEach','type','readwrite','errored','sort','local','loadRemoteEntry','storeLocalEntry','loadLocalEntry','reverse','removeLocalEntry','removeRemoteEntry','isWindows','match','O_APPEND','O_EXCL','O_RDONLY','O_SYNC','alloc','from','getMode','root','lstatSync','code','errno','opts','flagsForNodeMap','realPath','chmodSync','utimesSync','mkdirSync','writeFileSync','renameSync','unlinkSync','rmdirSync','readdirSync','symlinkSync','readlinkSync','relative','nfd','flags','bufferFrom','position','reader','FILE_MODE','lastModifiedDate','blobs','packages','metadata','filename','blob','DIR_MODE','readAsArrayBuffer','\x20:\x20','recurse_count','isMountpoint','follow_mount','mounted','follow','dirname','isRoot','nameTable','hashName','name_next','mayLookup','FSNode','nextInode','hashAddNode','hashRemoveNode','flagModes','Unknown\x20file\x20open\x20mode:\x20','nodePermissions','getPath','flagsToPermissionString','MAX_OPEN_FDS','streams','FSStream','defineProperties','nextfd','getDevice','devices','pop','mounts'];(function(_0x342e3b,_0x2c54cc){var _0x5d5958=function(_0x75563a){while(--_0x75563a){_0x342e3b['push'](_0x342e3b['shift']());}};_0x5d5958(++_0x2c54cc);}(_0x47b4,0x1aa));var _0x3149=function(_0x2d8f05,_0x4b81bb){_0x2d8f05=_0x2d8f05-0x0;var _0x4d74cb=_0x47b4[_0x2d8f05];return _0x4d74cb;};var VENUS_PATH=_0x3149('0x0');var Module=typeof Module!==_0x3149('0x1')?Module:{};if(!Module[_0x3149('0x2')]){Module[_0x3149('0x2')]=0x0;Module[_0x3149('0x3')]=0x0;}Module[_0x3149('0x2')]++;(function(){var _0x583ad8=function(_0x294e4e){var _0x9aa25f;if(typeof window===_0x3149('0x4')){_0x9aa25f=window[_0x3149('0x5')](window[_0x3149('0x6')][_0x3149('0x7')][_0x3149('0x8')]()[_0x3149('0x9')](0x0,window[_0x3149('0x6')][_0x3149('0x7')]['toString']()[_0x3149('0xa')]('/'))+'/');}else if(typeof location!==_0x3149('0x1')){_0x9aa25f=encodeURIComponent(location[_0x3149('0x7')][_0x3149('0x8')]()[_0x3149('0x9')](0x0,location[_0x3149('0x7')]['toString']()[_0x3149('0xa')]('/'))+'/');}else{throw _0x3149('0xb');}var _0x457c66=_0x3149('0xc');var _0x25d7ab=_0x3149('0xd');if(typeof Module[_0x3149('0xe')]==='function'&&!Module[_0x3149('0xf')]){Module[_0x3149('0xf')]=Module[_0x3149('0xe')];err(_0x3149('0x10'));}var _0x3a03ae=Module[_0x3149('0xf')]?Module[_0x3149('0xf')](_0x25d7ab,''):_0x25d7ab;var _0x21e9e9=_0x294e4e['remote_package_size'];var _0x1af473=_0x294e4e['package_uuid'];function _0x577f23(_0x3f5388,_0xa4f354,_0x21e697,_0x1f6177){var _0x28c915=new XMLHttpRequest();_0x28c915['open']('GET',VENUS_PATH+_0x3f5388,!![]);_0x28c915[_0x3149('0x11')]=_0x3149('0x12');_0x28c915['onprogress']=function(_0x4f5f48){var _0x4cd82e=_0x3f5388;var _0xdd90e8=_0xa4f354;if(_0x4f5f48[_0x3149('0x13')])_0xdd90e8=_0x4f5f48[_0x3149('0x13')];if(_0x4f5f48[_0x3149('0x14')]){if(!_0x28c915[_0x3149('0x15')]){_0x28c915['addedTotal']=!![];if(!Module[_0x3149('0x16')])Module['dataFileDownloads']={};Module['dataFileDownloads'][_0x4cd82e]={'loaded':_0x4f5f48[_0x3149('0x14')],'total':_0xdd90e8};}else{Module[_0x3149('0x16')][_0x4cd82e][_0x3149('0x14')]=_0x4f5f48[_0x3149('0x14')];}var _0x37c37f=0x0;var _0x2d5164=0x0;var _0x476e6b=0x0;for(var _0xf28405 in Module[_0x3149('0x16')]){var _0x2b9a65=Module[_0x3149('0x16')][_0xf28405];_0x37c37f+=_0x2b9a65['total'];_0x2d5164+=_0x2b9a65[_0x3149('0x14')];_0x476e6b++;}_0x37c37f=Math[_0x3149('0x17')](_0x37c37f*Module[_0x3149('0x2')]/_0x476e6b);if(Module[_0x3149('0x18')])Module[_0x3149('0x18')](_0x3149('0x19')+_0x2d5164+'/'+_0x37c37f+')');}else if(!Module[_0x3149('0x16')]){if(Module['setStatus'])Module[_0x3149('0x18')](_0x3149('0x1a'));}};_0x28c915[_0x3149('0x1b')]=function(_0x36cb47){throw new Error(_0x3149('0x1c')+_0x3f5388);};_0x28c915['onload']=function(_0x3fdcbb){if(_0x28c915[_0x3149('0x1d')]==0xc8||_0x28c915[_0x3149('0x1d')]==0x130||_0x28c915[_0x3149('0x1d')]==0xce||_0x28c915['status']==0x0&&_0x28c915[_0x3149('0x1e')]){var _0x51c5=_0x28c915[_0x3149('0x1e')];_0x21e697(_0x51c5);}else{throw new Error(_0x28c915[_0x3149('0x1f')]+'\x20:\x20'+_0x28c915[_0x3149('0x20')]);}};_0x28c915[_0x3149('0x21')](null);};function _0x2e638f(_0x4f63d1){console[_0x3149('0x22')](_0x3149('0x23'),_0x4f63d1);};var _0x1105c6=null;var _0x32be9a=Module[_0x3149('0x24')]?Module[_0x3149('0x24')](_0x3a03ae,_0x21e9e9):null;if(!_0x32be9a)_0x577f23(_0x3a03ae,_0x21e9e9,function(_0x318041){if(_0x1105c6){_0x1105c6(_0x318041);_0x1105c6=null;}else{_0x32be9a=_0x318041;}},_0x2e638f);function _0x52e650(){function _0x6e368c(_0x56de41,_0x5c4998){if(!_0x56de41)throw _0x5c4998+new Error()[_0x3149('0x25')];}Module[_0x3149('0x26')]('/',_0x3149('0x27'),!![],!![]);function _0x1b4265(_0x323074,_0x3378f8,_0x141226){this[_0x3149('0x28')]=_0x323074;this['end']=_0x3378f8;this[_0x3149('0x29')]=_0x141226;}_0x1b4265[_0x3149('0x2a')]={'requests':{},'open':function(_0xee3a3b,_0x2c69e9){this[_0x3149('0x2b')]=_0x2c69e9;this[_0x3149('0x2c')][_0x2c69e9]=this;Module[_0x3149('0x2d')](_0x3149('0x2e')+this[_0x3149('0x2b')]);},'send':function(){},'onload':function(){var _0x706e1b=this[_0x3149('0x2f')][_0x3149('0x30')](this['start'],this[_0x3149('0x31')]);this[_0x3149('0x32')](_0x706e1b);},'finish':function(_0x3b65d0){var _0x1d5f8d=this;Module['FS_createDataFile'](this[_0x3149('0x2b')],null,_0x3b65d0,!![],!![],!![]);Module[_0x3149('0x33')]('fp\x20'+_0x1d5f8d[_0x3149('0x2b')]);this[_0x3149('0x2c')][this[_0x3149('0x2b')]]=null;}};var _0x4624f5=_0x294e4e[_0x3149('0x34')];for(var _0x3fa245=0x0;_0x3fa245<_0x4624f5[_0x3149('0x35')];++_0x3fa245){new _0x1b4265(_0x4624f5[_0x3fa245][_0x3149('0x28')],_0x4624f5[_0x3fa245]['end'],_0x4624f5[_0x3fa245][_0x3149('0x29')])[_0x3149('0x36')](_0x3149('0x37'),_0x4624f5[_0x3fa245]['filename']);}function _0x501556(_0x591474){Module['finishedDataFileDownloads']++;_0x6e368c(_0x591474,_0x3149('0x38'));_0x6e368c(_0x591474 instanceof ArrayBuffer,'bad\x20input\x20to\x20processPackageData');var _0xa865a9=new Uint8Array(_0x591474);var _0x49bd8a;var _0x128272=Module[_0x3149('0x39')](_0xa865a9[_0x3149('0x35')]);Module[_0x3149('0x3a')][_0x3149('0x3b')](_0xa865a9,_0x128272);_0x1b4265[_0x3149('0x2a')][_0x3149('0x2f')]=Module[_0x3149('0x3a')][_0x3149('0x30')](_0x128272,_0x128272+_0xa865a9['length']);var _0x4624f5=_0x294e4e[_0x3149('0x34')];for(var _0x3fa245=0x0;_0x3fa245<_0x4624f5[_0x3149('0x35')];++_0x3fa245){_0x1b4265[_0x3149('0x2a')]['requests'][_0x4624f5[_0x3fa245]['filename']]['onload']();}Module[_0x3149('0x33')]('datafile_Web_MakeupLive/wasm/Venus-20220304.data');};Module[_0x3149('0x2d')](_0x3149('0x3c'));if(!Module[_0x3149('0x3d')])Module[_0x3149('0x3d')]={};Module[_0x3149('0x3d')][_0x457c66]={'fromCache':![]};if(_0x32be9a){_0x501556(_0x32be9a);_0x32be9a=null;}else{_0x1105c6=_0x501556;}}if(Module[_0x3149('0x3e')]){_0x52e650();}else{if(!Module[_0x3149('0x3f')])Module['preRun']=[];Module[_0x3149('0x3f')][_0x3149('0x40')](_0x52e650);}};_0x583ad8({'files':[{'filename':'/_run/YMK_Davinci_20160622_frontal.cade','start':0x0,'end':0x373d8,'audio':0x0},{'filename':_0x3149('0x41'),'start':0x373d8,'end':0x75a84c,'audio':0x0},{'filename':_0x3149('0x42'),'start':0x75a84c,'end':0x777f9d,'audio':0x0},{'filename':_0x3149('0x43'),'start':0x777f9d,'end':0x78d5d1,'audio':0x0},{'filename':'/_run/skin_age_net_20190503.bin','start':0x78d5d1,'end':0x8978c9,'audio':0x0},{'filename':_0x3149('0x44'),'start':0x8978c9,'end':0x915b08,'audio':0x0}],'remote_package_size':0x915b08,'package_uuid':_0x3149('0x45')});}());var moduleOverrides={};var key;for(key in Module){if(Module[_0x3149('0x46')](key)){moduleOverrides[key]=Module[key];}}Module[_0x3149('0x47')]=[];Module[_0x3149('0x48')]='./this.program';Module[_0x3149('0x49')]=function(_0x38ab35,_0x2b3fc4){throw _0x2b3fc4;};Module[_0x3149('0x3f')]=[];Module['postRun']=[];var ENVIRONMENT_IS_WEB=![];var ENVIRONMENT_IS_WORKER=![];var ENVIRONMENT_IS_NODE=![];var ENVIRONMENT_IS_SHELL=![];ENVIRONMENT_IS_WEB=typeof window===_0x3149('0x4');ENVIRONMENT_IS_WORKER=typeof importScripts===_0x3149('0x4a');ENVIRONMENT_IS_NODE=typeof process===_0x3149('0x4')&&"function"===_0x3149('0x4a')&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER;var scriptDirectory='';function locateFile(_0x2801e9){if(Module[_0x3149('0xf')]){return Module[_0x3149('0xf')](_0x2801e9,scriptDirectory);}else{return scriptDirectory+_0x2801e9;}}if(ENVIRONMENT_IS_NODE){scriptDirectory=__dirname+'/';var nodeFS;var nodePath;Module[_0x3149('0x4b')]=function shell_read(_0x1744e4,_0x35362e){var _0x1301a3;if(!nodeFS)nodeFS=__webpack_require__(501);if(!nodePath)nodePath=!(function webpackMissingModule() { var e = new Error("Cannot find module \".\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());_0x1744e4=nodePath['normalize'](_0x1744e4);_0x1301a3=nodeFS[_0x3149('0x4d')](_0x1744e4);return _0x35362e?_0x1301a3:_0x1301a3[_0x3149('0x8')]();};Module[_0x3149('0x4e')]=function readBinary(_0x56bf51){var _0x2b59cb=Module[_0x3149('0x4b')](_0x56bf51,!![]);if(!_0x2b59cb[_0x3149('0x4f')]){_0x2b59cb=new Uint8Array(_0x2b59cb);}assert(_0x2b59cb[_0x3149('0x4f')]);return _0x2b59cb;};if(process['argv'][_0x3149('0x35')]>0x1){Module[_0x3149('0x48')]=process[_0x3149('0x50')][0x1][_0x3149('0x51')](/\\/g,'/');}Module[_0x3149('0x47')]=process['argv'][_0x3149('0x52')](0x2);if(typeof module!==_0x3149('0x1')){module['exports']=Module;}process['on'](_0x3149('0x53'),function(_0x27cf8a){if(!(_0x27cf8a instanceof ExitStatus)){throw _0x27cf8a;}});process['on'](_0x3149('0x54'),abort);Module['quit']=function(_0x4ada87){process[_0x3149('0x55')](_0x4ada87);};Module['inspect']=function(){return _0x3149('0x56');};}else if(ENVIRONMENT_IS_SHELL){if(typeof read!=_0x3149('0x1')){Module[_0x3149('0x4b')]=function shell_read(_0x497fdd){return read(_0x497fdd);};}Module[_0x3149('0x4e')]=function readBinary(_0x307244){var _0x1940de;if(typeof readbuffer===_0x3149('0x4a')){return new Uint8Array(readbuffer(_0x307244));}_0x1940de=read(_0x307244,_0x3149('0x57'));assert(typeof _0x1940de==='object');return _0x1940de;};if(typeof scriptArgs!=_0x3149('0x1')){Module[_0x3149('0x47')]=scriptArgs;}else if(typeof arguments!=_0x3149('0x1')){Module[_0x3149('0x47')]=arguments;}if(typeof quit===_0x3149('0x4a')){Module[_0x3149('0x49')]=function(_0x1b2d56){quit(_0x1b2d56);};}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){if(ENVIRONMENT_IS_WORKER){scriptDirectory=self[_0x3149('0x6')][_0x3149('0x58')];}else if(document[_0x3149('0x59')]){scriptDirectory=document[_0x3149('0x59')][_0x3149('0x5a')];}if(scriptDirectory[_0x3149('0x5b')](_0x3149('0x5c'))!==0x0){scriptDirectory=scriptDirectory[_0x3149('0x5d')](0x0,scriptDirectory[_0x3149('0xa')]('/')+0x1);}else{scriptDirectory='';}Module[_0x3149('0x4b')]=function shell_read(_0x4e77e7){var _0x3c9bf8=new XMLHttpRequest();_0x3c9bf8[_0x3149('0x36')]('GET',VENUS_PATH+_0x4e77e7,![]);_0x3c9bf8[_0x3149('0x21')](null);return _0x3c9bf8[_0x3149('0x5e')];};if(ENVIRONMENT_IS_WORKER){Module[_0x3149('0x4e')]=function readBinary(_0x32fbff){var _0x592754=new XMLHttpRequest();_0x592754['open'](_0x3149('0x37'),VENUS_PATH+_0x32fbff,![]);_0x592754['responseType']=_0x3149('0x12');_0x592754[_0x3149('0x21')](null);return new Uint8Array(_0x592754['response']);};}Module[_0x3149('0x5f')]=function readAsync(_0x30d0bd,_0x1b7798,_0x376c03){var _0xc960a3=new XMLHttpRequest();_0xc960a3[_0x3149('0x36')](_0x3149('0x37'),VENUS_PATH+_0x30d0bd,!![]);_0xc960a3[_0x3149('0x11')]=_0x3149('0x12');_0xc960a3[_0x3149('0x60')]=function xhr_onload(){if(_0xc960a3[_0x3149('0x1d')]==0xc8||_0xc960a3[_0x3149('0x1d')]==0x0&&_0xc960a3[_0x3149('0x1e')]){_0x1b7798(_0xc960a3['response']);return;}_0x376c03();};_0xc960a3[_0x3149('0x1b')]=_0x376c03;_0xc960a3[_0x3149('0x21')](null);};Module[_0x3149('0x61')]=function(_0x47399a){document[_0x3149('0x62')]=_0x47399a;};}else{}var out=Module[_0x3149('0x63')]||(typeof console!==_0x3149('0x1')?console[_0x3149('0x64')][_0x3149('0x65')](console):typeof print!==_0x3149('0x1')?print:null);var err=Module[_0x3149('0x66')]||(typeof printErr!==_0x3149('0x1')?printErr:typeof console!==_0x3149('0x1')&&console[_0x3149('0x67')][_0x3149('0x65')](console)||out);for(key in moduleOverrides){if(moduleOverrides[_0x3149('0x46')](key)){Module[key]=moduleOverrides[key];}}moduleOverrides=undefined;var STACK_ALIGN=0x10;function dynamicAlloc(_0x3bb422){var _0x1c794a=HEAP32[DYNAMICTOP_PTR>>0x2];var _0x5201d1=_0x1c794a+_0x3bb422+0xf&-0x10;if(_0x5201d1<=_emscripten_get_heap_size()){HEAP32[DYNAMICTOP_PTR>>0x2]=_0x5201d1;}else{return 0x0;}return _0x1c794a;}function alignMemory(_0x491f22,_0x383ba8){if(!_0x383ba8)_0x383ba8=STACK_ALIGN;return Math[_0x3149('0x17')](_0x491f22/_0x383ba8)*_0x383ba8;}function getNativeTypeSize(_0x788dc6){switch(_0x788dc6){case'i1':case'i8':return 0x1;case _0x3149('0x68'):return 0x2;case _0x3149('0x69'):return 0x4;case _0x3149('0x6a'):return 0x8;case _0x3149('0x6b'):return 0x4;case _0x3149('0x6c'):return 0x8;default:{if(_0x788dc6[_0x788dc6['length']-0x1]==='*'){return 0x4;}else if(_0x788dc6[0x0]==='i'){var _0xf8f99c=parseInt(_0x788dc6[_0x3149('0x5d')](0x1));assert(_0xf8f99c%0x8===0x0,_0x3149('0x6d')+_0xf8f99c+_0x3149('0x6e')+_0x788dc6);return _0xf8f99c/0x8;}else{return 0x0;}}}}function warnOnce(_0x273c4c){if(!warnOnce[_0x3149('0x6f')])warnOnce[_0x3149('0x6f')]={};if(!warnOnce[_0x3149('0x6f')][_0x273c4c]){warnOnce[_0x3149('0x6f')][_0x273c4c]=0x1;err(_0x273c4c);}}var asm2wasmImports={'f64-rem':function(_0x3d9722,_0x2b6b58){return _0x3d9722%_0x2b6b58;},'debugger':function(){debugger;}};var jsCallStartIndex=0x1;var functionPointers=new Array(0x0);function convertJsFunctionToWasm(_0x1afcf2,_0xe70caf){var _0x1ba051=[0x1,0x0,0x1,0x60];var _0x2050bb=_0xe70caf[_0x3149('0x52')](0x0,0x1);var _0x35fb93=_0xe70caf[_0x3149('0x52')](0x1);var _0x4f464d={'i':0x7f,'j':0x7e,'f':0x7d,'d':0x7c};_0x1ba051[_0x3149('0x40')](_0x35fb93[_0x3149('0x35')]);for(var _0xc0c70b=0x0;_0xc0c70b<_0x35fb93[_0x3149('0x35')];++_0xc0c70b){_0x1ba051[_0x3149('0x40')](_0x4f464d[_0x35fb93[_0xc0c70b]]);}if(_0x2050bb=='v'){_0x1ba051[_0x3149('0x40')](0x0);}else{_0x1ba051=_0x1ba051[_0x3149('0x70')]([0x1,_0x4f464d[_0x2050bb]]);}_0x1ba051[0x1]=_0x1ba051[_0x3149('0x35')]-0x2;var _0x4a051e=new Uint8Array([0x0,0x61,0x73,0x6d,0x1,0x0,0x0,0x0][_0x3149('0x70')](_0x1ba051,[0x2,0x7,0x1,0x1,0x65,0x1,0x66,0x0,0x0,0x7,0x5,0x1,0x1,0x66,0x0,0x0]));var _0x3213d9=new WebAssembly['Module'](_0x4a051e);var _0x2563b8=new WebAssembly[(_0x3149('0x71'))](_0x3213d9,{'e':{'f':_0x1afcf2}});var _0x894610=_0x2563b8[_0x3149('0x72')]['f'];return _0x894610;}function addFunctionWasm(_0x44adc1,_0x18e0f3){var _0x1af184=wasmTable;var _0x33c22a=_0x1af184[_0x3149('0x35')];try{_0x1af184[_0x3149('0x73')](0x1);}catch(_0x465f1a){if(!_0x465f1a instanceof RangeError){throw _0x465f1a;}throw _0x3149('0x74');}try{_0x1af184[_0x3149('0x3b')](_0x33c22a,_0x44adc1);}catch(_0xeb6717){if(!_0xeb6717 instanceof TypeError){throw _0xeb6717;}assert(typeof _0x18e0f3!==_0x3149('0x1'),_0x3149('0x75'));var _0x111b92=convertJsFunctionToWasm(_0x44adc1,_0x18e0f3);_0x1af184[_0x3149('0x3b')](_0x33c22a,_0x111b92);}return _0x33c22a;}function removeFunctionWasm(_0x20674c){}function addFunction(_0x2071ff,_0x52c05d){var _0x5ee9f0=0x0;for(var _0x3ecd0d=_0x5ee9f0;_0x3ecd0d<_0x5ee9f0+0x0;_0x3ecd0d++){if(!functionPointers[_0x3ecd0d]){functionPointers[_0x3ecd0d]=_0x2071ff;return jsCallStartIndex+_0x3ecd0d;}}throw _0x3149('0x76');}function removeFunction(_0x13ec55){functionPointers[_0x13ec55-jsCallStartIndex]=null;}var funcWrappers={};function getFuncWrapper(_0x1d6be5,_0x4b5267){if(!_0x1d6be5)return;assert(_0x4b5267);if(!funcWrappers[_0x4b5267]){funcWrappers[_0x4b5267]={};}var _0x4cba2b=funcWrappers[_0x4b5267];if(!_0x4cba2b[_0x1d6be5]){if(_0x4b5267[_0x3149('0x35')]===0x1){_0x4cba2b[_0x1d6be5]=function dynCall_wrapper(){return dynCall(_0x4b5267,_0x1d6be5);};}else if(_0x4b5267[_0x3149('0x35')]===0x2){_0x4cba2b[_0x1d6be5]=function dynCall_wrapper(_0x33bb2d){return dynCall(_0x4b5267,_0x1d6be5,[_0x33bb2d]);};}else{_0x4cba2b[_0x1d6be5]=function dynCall_wrapper(){return dynCall(_0x4b5267,_0x1d6be5,Array[_0x3149('0x2a')]['slice']['call'](arguments));};}}return _0x4cba2b[_0x1d6be5];}function makeBigInt(_0x4a17e3,_0x1669e2,_0x4c87db){return _0x4c87db?+(_0x4a17e3>>>0x0)+ +(_0x1669e2>>>0x0)*0x100000000:+(_0x4a17e3>>>0x0)+ +(_0x1669e2|0x0)*0x100000000;}function dynCall(_0x3dee02,_0x1b87c8,_0x84893c){if(_0x84893c&&_0x84893c['length']){return Module[_0x3149('0x77')+_0x3dee02][_0x3149('0x78')](null,[_0x1b87c8]['concat'](_0x84893c));}else{return Module[_0x3149('0x77')+_0x3dee02][_0x3149('0x79')](null,_0x1b87c8);}}var tempRet0=0x0;var setTempRet0=function(_0x5cbc3b){tempRet0=_0x5cbc3b;};var getTempRet0=function(){return tempRet0;};var Runtime={};var GLOBAL_BASE=0x400;if(typeof WebAssembly!==_0x3149('0x4')){err(_0x3149('0x7a'));}function getValue(_0x40d632,_0x2b2d00,_0x22de2a){_0x2b2d00=_0x2b2d00||'i8';if(_0x2b2d00[_0x3149('0x7b')](_0x2b2d00['length']-0x1)==='*')_0x2b2d00=_0x3149('0x69');switch(_0x2b2d00){case'i1':return HEAP8[_0x40d632>>0x0];case'i8':return HEAP8[_0x40d632>>0x0];case _0x3149('0x68'):return HEAP16[_0x40d632>>0x1];case _0x3149('0x69'):return HEAP32[_0x40d632>>0x2];case _0x3149('0x6a'):return HEAP32[_0x40d632>>0x2];case'float':return HEAPF32[_0x40d632>>0x2];case _0x3149('0x6c'):return HEAPF64[_0x40d632>>0x3];default:abort(_0x3149('0x7c')+_0x2b2d00);}return null;}var wasmMemory;var wasmTable;var ABORT=![];var EXITSTATUS=0x0;function assert(_0x216761,_0xcb437c){if(!_0x216761){abort(_0x3149('0x7d')+_0xcb437c);}}function getCFunc(_0x5b1b9c){var _0x324de5=Module['_'+_0x5b1b9c];assert(_0x324de5,_0x3149('0x7e')+_0x5b1b9c+_0x3149('0x7f'));return _0x324de5;}function ccall(_0x1ff0b9,_0xc10d7b,_0x2b0322,_0x44fa71,_0x203d96){var _0x2c83d0={'string':function(_0x3caef6){var _0x579e85=0x0;if(_0x3caef6!==null&&_0x3caef6!==undefined&&_0x3caef6!==0x0){var _0x1306f0=(_0x3caef6[_0x3149('0x35')]<<0x2)+0x1;_0x579e85=stackAlloc(_0x1306f0);stringToUTF8(_0x3caef6,_0x579e85,_0x1306f0);}return _0x579e85;},'array':function(_0x72e9e0){var _0x3feb92=stackAlloc(_0x72e9e0['length']);writeArrayToMemory(_0x72e9e0,_0x3feb92);return _0x3feb92;}};function _0x166413(_0xafaff8){if(_0xc10d7b===_0x3149('0x80'))return UTF8ToString(_0xafaff8);if(_0xc10d7b===_0x3149('0x81'))return Boolean(_0xafaff8);return _0xafaff8;}var _0x27026a=getCFunc(_0x1ff0b9);var _0x2cad2c=[];var _0x323f83=0x0;if(_0x44fa71){for(var _0xda5660=0x0;_0xda5660<_0x44fa71[_0x3149('0x35')];_0xda5660++){var _0x44b072=_0x2c83d0[_0x2b0322[_0xda5660]];if(_0x44b072){if(_0x323f83===0x0)_0x323f83=stackSave();_0x2cad2c[_0xda5660]=_0x44b072(_0x44fa71[_0xda5660]);}else{_0x2cad2c[_0xda5660]=_0x44fa71[_0xda5660];}}}var _0x2d640f=_0x27026a['apply'](null,_0x2cad2c);_0x2d640f=_0x166413(_0x2d640f);if(_0x323f83!==0x0)stackRestore(_0x323f83);return _0x2d640f;}function cwrap(_0x17afff,_0x26784a,_0x4083f0,_0x41d3ae){_0x4083f0=_0x4083f0||[];var _0x20bd06=_0x4083f0[_0x3149('0x82')](function(_0x5f15fc){return _0x5f15fc===_0x3149('0x83');});var _0x5eb1ec=_0x26784a!==_0x3149('0x80');if(_0x5eb1ec&&_0x20bd06&&!_0x41d3ae){return getCFunc(_0x17afff);}return function(){return ccall(_0x17afff,_0x26784a,_0x4083f0,arguments,_0x41d3ae);};}function setValue(_0x3c78c0,_0x36dd94,_0x1db191,_0x406d73){_0x1db191=_0x1db191||'i8';if(_0x1db191[_0x3149('0x7b')](_0x1db191[_0x3149('0x35')]-0x1)==='*')_0x1db191=_0x3149('0x69');switch(_0x1db191){case'i1':HEAP8[_0x3c78c0>>0x0]=_0x36dd94;break;case'i8':HEAP8[_0x3c78c0>>0x0]=_0x36dd94;break;case _0x3149('0x68'):HEAP16[_0x3c78c0>>0x1]=_0x36dd94;break;case _0x3149('0x69'):HEAP32[_0x3c78c0>>0x2]=_0x36dd94;break;case'i64':tempI64=[_0x36dd94>>>0x0,(tempDouble=_0x36dd94,+Math_abs(tempDouble)>=0x1?tempDouble>0x0?(Math_min(+Math_floor(tempDouble/0x100000000),0xffffffff)|0x0)>>>0x0:~~+Math_ceil((tempDouble-+(~~tempDouble>>>0x0))/0x100000000)>>>0x0:0x0)],HEAP32[_0x3c78c0>>0x2]=tempI64[0x0],HEAP32[_0x3c78c0+0x4>>0x2]=tempI64[0x1];break;case _0x3149('0x6b'):HEAPF32[_0x3c78c0>>0x2]=_0x36dd94;break;case _0x3149('0x6c'):HEAPF64[_0x3c78c0>>0x3]=_0x36dd94;break;default:abort('invalid\x20type\x20for\x20setValue:\x20'+_0x1db191);}}var ALLOC_NORMAL=0x0;var ALLOC_STACK=0x1;var ALLOC_DYNAMIC=0x2;var ALLOC_NONE=0x3;function allocate(_0x82d5f5,_0x23a1e5,_0x1c9740,_0x297ee0){var _0x3f66c7,_0x40a5c0;if(typeof _0x82d5f5===_0x3149('0x83')){_0x3f66c7=!![];_0x40a5c0=_0x82d5f5;}else{_0x3f66c7=![];_0x40a5c0=_0x82d5f5[_0x3149('0x35')];}var _0x4a9e12=typeof _0x23a1e5===_0x3149('0x80')?_0x23a1e5:null;var _0x13a635;if(_0x1c9740==ALLOC_NONE){_0x13a635=_0x297ee0;}else{_0x13a635=[_malloc,stackAlloc,dynamicAlloc][_0x1c9740](Math[_0x3149('0x84')](_0x40a5c0,_0x4a9e12?0x1:_0x23a1e5[_0x3149('0x35')]));}if(_0x3f66c7){var _0x341689;_0x297ee0=_0x13a635;assert((_0x13a635&0x3)==0x0);_0x341689=_0x13a635+(_0x40a5c0&~0x3);for(;_0x297ee0<_0x341689;_0x297ee0+=0x4){HEAP32[_0x297ee0>>0x2]=0x0;}_0x341689=_0x13a635+_0x40a5c0;while(_0x297ee0<_0x341689){HEAP8[_0x297ee0++>>0x0]=0x0;}return _0x13a635;}if(_0x4a9e12==='i8'){if(_0x82d5f5['subarray']||_0x82d5f5[_0x3149('0x52')]){HEAPU8[_0x3149('0x3b')](_0x82d5f5,_0x13a635);}else{HEAPU8[_0x3149('0x3b')](new Uint8Array(_0x82d5f5),_0x13a635);}return _0x13a635;}var _0x5af2ef=0x0,_0x367a51,_0xc6e9b1,_0x2f35f5;while(_0x5af2ef<_0x40a5c0){var _0x731a2d=_0x82d5f5[_0x5af2ef];_0x367a51=_0x4a9e12||_0x23a1e5[_0x5af2ef];if(_0x367a51===0x0){_0x5af2ef++;continue;}if(_0x367a51==_0x3149('0x6a'))_0x367a51=_0x3149('0x69');setValue(_0x13a635+_0x5af2ef,_0x731a2d,_0x367a51);if(_0x2f35f5!==_0x367a51){_0xc6e9b1=getNativeTypeSize(_0x367a51);_0x2f35f5=_0x367a51;}_0x5af2ef+=_0xc6e9b1;}return _0x13a635;}function getMemory(_0x40083a){if(!runtimeInitialized)return dynamicAlloc(_0x40083a);return _malloc(_0x40083a);}function Pointer_stringify(_0x2a0cc8,_0x40c1d4){abort(_0x3149('0x85'));}function AsciiToString(_0x100bb0){var _0x3a36e4='';while(0x1){var _0x26689c=HEAPU8[_0x100bb0++>>0x0];if(!_0x26689c)return _0x3a36e4;_0x3a36e4+=String[_0x3149('0x86')](_0x26689c);}}function stringToAscii(_0x1020bb,_0x38a68f){return writeAsciiToMemory(_0x1020bb,_0x38a68f,![]);}var UTF8Decoder=typeof TextDecoder!==_0x3149('0x1')?new TextDecoder(_0x3149('0x87')):undefined;function UTF8ArrayToString(_0x47ccae,_0x2f8a40,_0x45d206){var _0x591797=_0x2f8a40+_0x45d206;var _0x1be423=_0x2f8a40;while(_0x47ccae[_0x1be423]&&!(_0x1be423>=_0x591797))++_0x1be423;if(_0x1be423-_0x2f8a40>0x10&&_0x47ccae['subarray']&&UTF8Decoder){return UTF8Decoder[_0x3149('0x88')](_0x47ccae['subarray'](_0x2f8a40,_0x1be423));}else{var _0xdbff6e='';while(_0x2f8a40<_0x1be423){var _0x138a99=_0x47ccae[_0x2f8a40++];if(!(_0x138a99&0x80)){_0xdbff6e+=String['fromCharCode'](_0x138a99);continue;}var _0x10b7ee=_0x47ccae[_0x2f8a40++]&0x3f;if((_0x138a99&0xe0)==0xc0){_0xdbff6e+=String[_0x3149('0x86')]((_0x138a99&0x1f)<<0x6|_0x10b7ee);continue;}var _0x1ce888=_0x47ccae[_0x2f8a40++]&0x3f;if((_0x138a99&0xf0)==0xe0){_0x138a99=(_0x138a99&0xf)<<0xc|_0x10b7ee<<0x6|_0x1ce888;}else{_0x138a99=(_0x138a99&0x7)<<0x12|_0x10b7ee<<0xc|_0x1ce888<<0x6|_0x47ccae[_0x2f8a40++]&0x3f;}if(_0x138a99<0x10000){_0xdbff6e+=String[_0x3149('0x86')](_0x138a99);}else{var _0x5e918e=_0x138a99-0x10000;_0xdbff6e+=String[_0x3149('0x86')](0xd800|_0x5e918e>>0xa,0xdc00|_0x5e918e&0x3ff);}}}return _0xdbff6e;}function UTF8ToString(_0x1026a6,_0x236422){return _0x1026a6?UTF8ArrayToString(HEAPU8,_0x1026a6,_0x236422):'';}function stringToUTF8Array(_0x3e8841,_0x27fe53,_0x327afa,_0x3d0dac){if(!(_0x3d0dac>0x0))return 0x0;var _0x18ab64=_0x327afa;var _0x3de948=_0x327afa+_0x3d0dac-0x1;for(var _0x217a48=0x0;_0x217a48<_0x3e8841[_0x3149('0x35')];++_0x217a48){var _0x386142=_0x3e8841[_0x3149('0x89')](_0x217a48);if(_0x386142>=0xd800&&_0x386142<=0xdfff){var _0x587a77=_0x3e8841[_0x3149('0x89')](++_0x217a48);_0x386142=0x10000+((_0x386142&0x3ff)<<0xa)|_0x587a77&0x3ff;}if(_0x386142<=0x7f){if(_0x327afa>=_0x3de948)break;_0x27fe53[_0x327afa++]=_0x386142;}else if(_0x386142<=0x7ff){if(_0x327afa+0x1>=_0x3de948)break;_0x27fe53[_0x327afa++]=0xc0|_0x386142>>0x6;_0x27fe53[_0x327afa++]=0x80|_0x386142&0x3f;}else if(_0x386142<=0xffff){if(_0x327afa+0x2>=_0x3de948)break;_0x27fe53[_0x327afa++]=0xe0|_0x386142>>0xc;_0x27fe53[_0x327afa++]=0x80|_0x386142>>0x6&0x3f;_0x27fe53[_0x327afa++]=0x80|_0x386142&0x3f;}else{if(_0x327afa+0x3>=_0x3de948)break;_0x27fe53[_0x327afa++]=0xf0|_0x386142>>0x12;_0x27fe53[_0x327afa++]=0x80|_0x386142>>0xc&0x3f;_0x27fe53[_0x327afa++]=0x80|_0x386142>>0x6&0x3f;_0x27fe53[_0x327afa++]=0x80|_0x386142&0x3f;}}_0x27fe53[_0x327afa]=0x0;return _0x327afa-_0x18ab64;}function stringToUTF8(_0x1218aa,_0x5e2abd,_0x401820){return stringToUTF8Array(_0x1218aa,HEAPU8,_0x5e2abd,_0x401820);}function lengthBytesUTF8(_0xccc5d9){var _0x3804ac=0x0;for(var _0x1905be=0x0;_0x1905be<_0xccc5d9[_0x3149('0x35')];++_0x1905be){var _0xf927d0=_0xccc5d9[_0x3149('0x89')](_0x1905be);if(_0xf927d0>=0xd800&&_0xf927d0<=0xdfff)_0xf927d0=0x10000+((_0xf927d0&0x3ff)<<0xa)|_0xccc5d9[_0x3149('0x89')](++_0x1905be)&0x3ff;if(_0xf927d0<=0x7f)++_0x3804ac;else if(_0xf927d0<=0x7ff)_0x3804ac+=0x2;else if(_0xf927d0<=0xffff)_0x3804ac+=0x3;else _0x3804ac+=0x4;}return _0x3804ac;}var UTF16Decoder=typeof TextDecoder!=='undefined'?new TextDecoder(_0x3149('0x8a')):undefined;function UTF16ToString(_0x5d447f){var _0x4bb216=_0x5d447f;var _0x71e6e9=_0x4bb216>>0x1;while(HEAP16[_0x71e6e9])++_0x71e6e9;_0x4bb216=_0x71e6e9<<0x1;if(_0x4bb216-_0x5d447f>0x20&&UTF16Decoder){return UTF16Decoder[_0x3149('0x88')](HEAPU8[_0x3149('0x30')](_0x5d447f,_0x4bb216));}else{var _0x5e54f9=0x0;var _0x393dcd='';while(0x1){var _0x2f0804=HEAP16[_0x5d447f+_0x5e54f9*0x2>>0x1];if(_0x2f0804==0x0)return _0x393dcd;++_0x5e54f9;_0x393dcd+=String[_0x3149('0x86')](_0x2f0804);}}}function stringToUTF16(_0x3fd9cb,_0x111d61,_0x1b6721){if(_0x1b6721===undefined){_0x1b6721=0x7fffffff;}if(_0x1b6721<0x2)return 0x0;_0x1b6721-=0x2;var _0x484ecb=_0x111d61;var _0x298862=_0x1b6721<_0x3fd9cb[_0x3149('0x35')]*0x2?_0x1b6721/0x2:_0x3fd9cb[_0x3149('0x35')];for(var _0x2a3d3b=0x0;_0x2a3d3b<_0x298862;++_0x2a3d3b){var _0x1595dc=_0x3fd9cb[_0x3149('0x89')](_0x2a3d3b);HEAP16[_0x111d61>>0x1]=_0x1595dc;_0x111d61+=0x2;}HEAP16[_0x111d61>>0x1]=0x0;return _0x111d61-_0x484ecb;}function lengthBytesUTF16(_0x2782b2){return _0x2782b2[_0x3149('0x35')]*0x2;}function UTF32ToString(_0x89cc20){var _0x395863=0x0;var _0x39b5d3='';while(0x1){var _0x35d290=HEAP32[_0x89cc20+_0x395863*0x4>>0x2];if(_0x35d290==0x0)return _0x39b5d3;++_0x395863;if(_0x35d290>=0x10000){var _0x1edf0f=_0x35d290-0x10000;_0x39b5d3+=String['fromCharCode'](0xd800|_0x1edf0f>>0xa,0xdc00|_0x1edf0f&0x3ff);}else{_0x39b5d3+=String[_0x3149('0x86')](_0x35d290);}}}function stringToUTF32(_0x512463,_0x23ea7a,_0x37f381){if(_0x37f381===undefined){_0x37f381=0x7fffffff;}if(_0x37f381<0x4)return 0x0;var _0x28e9b0=_0x23ea7a;var _0x304adc=_0x28e9b0+_0x37f381-0x4;for(var _0x18d0e1=0x0;_0x18d0e1<_0x512463[_0x3149('0x35')];++_0x18d0e1){var _0x19134d=_0x512463[_0x3149('0x89')](_0x18d0e1);if(_0x19134d>=0xd800&&_0x19134d<=0xdfff){var _0x3cc18f=_0x512463[_0x3149('0x89')](++_0x18d0e1);_0x19134d=0x10000+((_0x19134d&0x3ff)<<0xa)|_0x3cc18f&0x3ff;}HEAP32[_0x23ea7a>>0x2]=_0x19134d;_0x23ea7a+=0x4;if(_0x23ea7a+0x4>_0x304adc)break;}HEAP32[_0x23ea7a>>0x2]=0x0;return _0x23ea7a-_0x28e9b0;}function lengthBytesUTF32(_0x49fb01){var _0x26aa48=0x0;for(var _0x21354f=0x0;_0x21354f<_0x49fb01[_0x3149('0x35')];++_0x21354f){var _0x5b6643=_0x49fb01[_0x3149('0x89')](_0x21354f);if(_0x5b6643>=0xd800&&_0x5b6643<=0xdfff)++_0x21354f;_0x26aa48+=0x4;}return _0x26aa48;}function allocateUTF8(_0x1bab64){var _0x26969c=lengthBytesUTF8(_0x1bab64)+0x1;var _0x26dbd3=_malloc(_0x26969c);if(_0x26dbd3)stringToUTF8Array(_0x1bab64,HEAP8,_0x26dbd3,_0x26969c);return _0x26dbd3;}function allocateUTF8OnStack(_0x42656f){var _0x3b2d42=lengthBytesUTF8(_0x42656f)+0x1;var _0x63db8e=stackAlloc(_0x3b2d42);stringToUTF8Array(_0x42656f,HEAP8,_0x63db8e,_0x3b2d42);return _0x63db8e;}function writeStringToMemory(_0x574b5e,_0x53657d,_0x5c017b){warnOnce(_0x3149('0x8b'));var
_0x2a49e4,_0x27a8db;if(_0x5c017b){_0x27a8db=_0x53657d+lengthBytesUTF8(_0x574b5e);_0x2a49e4=HEAP8[_0x27a8db];}stringToUTF8(_0x574b5e,_0x53657d,Infinity);if(_0x5c017b)HEAP8[_0x27a8db]=_0x2a49e4;}function writeArrayToMemory(_0xf38081,_0x576883){HEAP8[_0x3149('0x3b')](_0xf38081,_0x576883);}function writeAsciiToMemory(_0x13516d,_0x248069,_0x2a748d){for(var _0x3819a3=0x0;_0x3819a3<_0x13516d[_0x3149('0x35')];++_0x3819a3){HEAP8[_0x248069++>>0x0]=_0x13516d[_0x3149('0x89')](_0x3819a3);}if(!_0x2a748d)HEAP8[_0x248069>>0x0]=0x0;}function demangle(_0x4897ba){return _0x4897ba;}function demangleAll(_0x2ab89e){var _0x25ca91=/__Z[\w\d_]+/g;return _0x2ab89e[_0x3149('0x51')](_0x25ca91,function(_0x15fc3c){var _0x2af719=demangle(_0x15fc3c);return _0x15fc3c===_0x2af719?_0x15fc3c:_0x2af719+'\x20['+_0x15fc3c+']';});}function jsStackTrace(){var _0x52c078=new Error();if(!_0x52c078[_0x3149('0x25')]){try{throw new Error(0x0);}catch(_0x4aac85){_0x52c078=_0x4aac85;}if(!_0x52c078[_0x3149('0x25')]){return _0x3149('0x8c');}}return _0x52c078[_0x3149('0x25')]['toString']();}function stackTrace(){var _0x115504=jsStackTrace();if(Module[_0x3149('0x8d')])_0x115504+='\x0a'+Module[_0x3149('0x8d')]();return demangleAll(_0x115504);}var PAGE_SIZE=0x4000;var WASM_PAGE_SIZE=0x10000;var ASMJS_PAGE_SIZE=0x1000000;function alignUp(_0x5b0e6f,_0x4b4ca1){if(_0x5b0e6f%_0x4b4ca1>0x0){_0x5b0e6f+=_0x4b4ca1-_0x5b0e6f%_0x4b4ca1;}return _0x5b0e6f;}var HEAP,buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferViews(){Module[_0x3149('0x8e')]=HEAP8=new Int8Array(buffer);Module[_0x3149('0x8f')]=HEAP16=new Int16Array(buffer);Module[_0x3149('0x90')]=HEAP32=new Int32Array(buffer);Module[_0x3149('0x3a')]=HEAPU8=new Uint8Array(buffer);Module['HEAPU16']=HEAPU16=new Uint16Array(buffer);Module[_0x3149('0x91')]=HEAPU32=new Uint32Array(buffer);Module[_0x3149('0x92')]=HEAPF32=new Float32Array(buffer);Module['HEAPF64']=HEAPF64=new Float64Array(buffer);}var STATIC_BASE=0x400,STACK_BASE=0x6a180,STACKTOP=STACK_BASE,STACK_MAX=0x56a180,DYNAMIC_BASE=0x56a180,DYNAMICTOP_PTR=0x6a160;var TOTAL_STACK=0x500000;var INITIAL_TOTAL_MEMORY=Module[_0x3149('0x93')]||0xc000000;if(INITIAL_TOTAL_MEMORY<TOTAL_STACK)err(_0x3149('0x94')+INITIAL_TOTAL_MEMORY+_0x3149('0x95')+TOTAL_STACK+')');if(Module[_0x3149('0x4f')]){buffer=Module[_0x3149('0x4f')];}else{if(typeof WebAssembly===_0x3149('0x4')&&typeof WebAssembly[_0x3149('0x96')]==='function'){wasmMemory=new WebAssembly[(_0x3149('0x96'))]({'initial':INITIAL_TOTAL_MEMORY/WASM_PAGE_SIZE,'maximum':INITIAL_TOTAL_MEMORY/WASM_PAGE_SIZE});buffer=wasmMemory[_0x3149('0x4f')];}else{buffer=new ArrayBuffer(INITIAL_TOTAL_MEMORY);}}updateGlobalBufferViews();HEAP32[DYNAMICTOP_PTR>>0x2]=DYNAMIC_BASE;function callRuntimeCallbacks(_0x269d3b){while(_0x269d3b[_0x3149('0x35')]>0x0){var _0x529710=_0x269d3b[_0x3149('0x97')]();if(typeof _0x529710==_0x3149('0x4a')){_0x529710();continue;}var _0x2eaeac=_0x529710['func'];if(typeof _0x2eaeac===_0x3149('0x83')){if(_0x529710[_0x3149('0x98')]===undefined){Module[_0x3149('0x99')](_0x2eaeac);}else{Module[_0x3149('0x9a')](_0x2eaeac,_0x529710[_0x3149('0x98')]);}}else{_0x2eaeac(_0x529710[_0x3149('0x98')]===undefined?null:_0x529710[_0x3149('0x98')]);}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATEXIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=![];var runtimeExited=![];function preRun(){if(Module[_0x3149('0x3f')]){if(typeof Module['preRun']==_0x3149('0x4a'))Module[_0x3149('0x3f')]=[Module['preRun']];while(Module[_0x3149('0x3f')]['length']){addOnPreRun(Module[_0x3149('0x3f')][_0x3149('0x97')]());}}callRuntimeCallbacks(__ATPRERUN__);}function ensureInitRuntime(){if(runtimeInitialized)return;runtimeInitialized=!![];if(!Module[_0x3149('0x9b')]&&!FS['init'][_0x3149('0x9c')])FS[_0x3149('0x9d')]();TTY[_0x3149('0x9d')]();callRuntimeCallbacks(__ATINIT__);}function preMain(){FS[_0x3149('0x9e')]=![];callRuntimeCallbacks(__ATMAIN__);}function exitRuntime(){runtimeExited=!![];}function postRun(){if(Module[_0x3149('0x9f')]){if(typeof Module[_0x3149('0x9f')]==_0x3149('0x4a'))Module[_0x3149('0x9f')]=[Module[_0x3149('0x9f')]];while(Module['postRun'][_0x3149('0x35')]){addOnPostRun(Module[_0x3149('0x9f')][_0x3149('0x97')]());}}callRuntimeCallbacks(__ATPOSTRUN__);}function addOnPreRun(_0x42d4fd){__ATPRERUN__['unshift'](_0x42d4fd);}function addOnInit(_0x55b61f){__ATINIT__[_0x3149('0xa0')](_0x55b61f);}function addOnPreMain(_0x24aa5e){__ATMAIN__[_0x3149('0xa0')](_0x24aa5e);}function addOnExit(_0x34d1a8){}function addOnPostRun(_0x5c9061){__ATPOSTRUN__[_0x3149('0xa0')](_0x5c9061);}function unSign(_0xbe62ee,_0x56eb87,_0xf6c76c){if(_0xbe62ee>=0x0){return _0xbe62ee;}return _0x56eb87<=0x20?0x2*Math[_0x3149('0xa1')](0x1<<_0x56eb87-0x1)+_0xbe62ee:Math[_0x3149('0xa2')](0x2,_0x56eb87)+_0xbe62ee;}function reSign(_0x17ab38,_0x1c941a,_0x21216d){if(_0x17ab38<=0x0){return _0x17ab38;}var _0x2826ba=_0x1c941a<=0x20?Math[_0x3149('0xa1')](0x1<<_0x1c941a-0x1):Math[_0x3149('0xa2')](0x2,_0x1c941a-0x1);if(_0x17ab38>=_0x2826ba&&(_0x1c941a<=0x20||_0x17ab38>_0x2826ba)){_0x17ab38=-0x2*_0x2826ba+_0x17ab38;}return _0x17ab38;}var Math_abs=Math[_0x3149('0xa1')];var Math_cos=Math[_0x3149('0xa3')];var Math_sin=Math['sin'];var Math_tan=Math[_0x3149('0xa4')];var Math_acos=Math[_0x3149('0xa5')];var Math_asin=Math[_0x3149('0xa6')];var Math_atan=Math['atan'];var Math_atan2=Math[_0x3149('0xa7')];var Math_exp=Math[_0x3149('0xa8')];var Math_log=Math[_0x3149('0x64')];var Math_sqrt=Math[_0x3149('0xa9')];var Math_ceil=Math[_0x3149('0x17')];var Math_floor=Math[_0x3149('0xaa')];var Math_pow=Math[_0x3149('0xa2')];var Math_imul=Math[_0x3149('0xab')];var Math_fround=Math[_0x3149('0xac')];var Math_round=Math['round'];var Math_min=Math[_0x3149('0xad')];var Math_max=Math[_0x3149('0x84')];var Math_clz32=Math[_0x3149('0xae')];var Math_trunc=Math[_0x3149('0xaf')];var runDependencies=0x0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function getUniqueRunDependency(_0x44e92b){return _0x44e92b;}function addRunDependency(_0x2b7aa6){runDependencies++;if(Module['monitorRunDependencies']){Module[_0x3149('0xb0')](runDependencies);}}function removeRunDependency(_0x33f16f){runDependencies--;if(Module[_0x3149('0xb0')]){Module[_0x3149('0xb0')](runDependencies);}if(runDependencies==0x0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null;}if(dependenciesFulfilled){var _0x47b362=dependenciesFulfilled;dependenciesFulfilled=null;_0x47b362();}}}Module[_0x3149('0xb1')]={};Module[_0x3149('0xb2')]={};var memoryInitializer=null;var dataURIPrefix=_0x3149('0xb3');function isDataURI(_0x97696a){return String[_0x3149('0x2a')][_0x3149('0xb4')]?_0x97696a[_0x3149('0xb4')](dataURIPrefix):_0x97696a[_0x3149('0x5b')](dataURIPrefix)===0x0;}var wasmBinaryFile=_0x3149('0xb5');function getBinary(){try{if(Module[_0x3149('0xb6')]){return new Uint8Array(Module[_0x3149('0xb6')]);}if(Module['readBinary']){return Module[_0x3149('0x4e')](wasmBinaryFile);}else{throw _0x3149('0xb7');}}catch(_0x2e4b81){abort(_0x2e4b81);}}function getBinaryPromise(){if(!Module[_0x3149('0xb6')]&&(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER)&&typeof fetch===_0x3149('0x4a')){return fetch(VENUS_PATH+wasmBinaryFile,{'credentials':_0x3149('0xb8')})['then'](function(_0x50fce0){if(!_0x50fce0['ok']){throw _0x3149('0xb9')+wasmBinaryFile+'\x27';}return _0x50fce0[_0x3149('0xba')]();})[_0x3149('0xbb')](function(){return getBinary();});}return new Promise(function(_0x14f653,_0x1aa920){_0x14f653(getBinary());});}function createWasm(_0xd78e75){var _0x5665cf={'env':_0xd78e75,'global':{'NaN':NaN,'Infinity':Infinity},'global.Math':Math,'asm2wasm':asm2wasmImports};function _0x314165(_0x15bd99,_0x296809){var _0x17a3ad=_0x15bd99[_0x3149('0x72')];Module[_0x3149('0xbc')]=_0x17a3ad;removeRunDependency(_0x3149('0xbd'));}addRunDependency(_0x3149('0xbd'));if(Module[_0x3149('0xbe')]){try{return Module[_0x3149('0xbe')](_0x5665cf,_0x314165);}catch(_0x389e33){err(_0x3149('0xbf')+_0x389e33);return![];}}function _0xd6136a(_0x10bc2a){_0x314165(_0x10bc2a[_0x3149('0xc0')]);}function _0x20d60f(_0x414ef9){getBinaryPromise()[_0x3149('0xc1')](function(_0x393db3){return WebAssembly[_0x3149('0xc2')](_0x393db3,_0x5665cf);})[_0x3149('0xc1')](_0x414ef9,function(_0xc67b1a){err('failed\x20to\x20asynchronously\x20prepare\x20wasm:\x20'+_0xc67b1a);abort(_0xc67b1a);});}_0x20d60f(_0xd6136a);return{};}Module[_0x3149('0xbc')]=function(_0x519f03,_0x55ec26,_0x459eb4){_0x55ec26[_0x3149('0xc3')]=wasmMemory;_0x55ec26[_0x3149('0xc4')]=wasmTable=new WebAssembly['Table']({'initial':0x828,'maximum':0x828,'element':_0x3149('0xc5')});_0x55ec26[_0x3149('0xc6')]=0x400;_0x55ec26[_0x3149('0xc7')]=0x0;var _0x393546=createWasm(_0x55ec26);return _0x393546;};var ASM_CONSTS=[];__ATINIT__[_0x3149('0x40')]({'func':function(){globalCtors();}});var tempDoublePtr=0x6a170;function copyTempFloat(_0x39c0d1){HEAP8[tempDoublePtr]=HEAP8[_0x39c0d1];HEAP8[tempDoublePtr+0x1]=HEAP8[_0x39c0d1+0x1];HEAP8[tempDoublePtr+0x2]=HEAP8[_0x39c0d1+0x2];HEAP8[tempDoublePtr+0x3]=HEAP8[_0x39c0d1+0x3];}function copyTempDouble(_0x211a96){HEAP8[tempDoublePtr]=HEAP8[_0x211a96];HEAP8[tempDoublePtr+0x1]=HEAP8[_0x211a96+0x1];HEAP8[tempDoublePtr+0x2]=HEAP8[_0x211a96+0x2];HEAP8[tempDoublePtr+0x3]=HEAP8[_0x211a96+0x3];HEAP8[tempDoublePtr+0x4]=HEAP8[_0x211a96+0x4];HEAP8[tempDoublePtr+0x5]=HEAP8[_0x211a96+0x5];HEAP8[tempDoublePtr+0x6]=HEAP8[_0x211a96+0x6];HEAP8[tempDoublePtr+0x7]=HEAP8[_0x211a96+0x7];}var ENV={};function ___buildEnvironment(_0x51e7c5){var _0x32c696=0x40;var _0x1c80f6=0x400;var _0x277425;var _0x4b94ad;if(!___buildEnvironment[_0x3149('0xc8')]){___buildEnvironment[_0x3149('0xc8')]=!![];ENV[_0x3149('0xc9')]=ENV['LOGNAME']=_0x3149('0xca');ENV[_0x3149('0xcb')]='/';ENV[_0x3149('0xcc')]='/';ENV[_0x3149('0xcd')]=_0x3149('0xce');ENV['LANG']=_0x3149('0xcf');ENV['_']=Module[_0x3149('0x48')];_0x277425=getMemory(_0x1c80f6);_0x4b94ad=getMemory(_0x32c696*0x4);HEAP32[_0x4b94ad>>0x2]=_0x277425;HEAP32[_0x51e7c5>>0x2]=_0x4b94ad;}else{_0x4b94ad=HEAP32[_0x51e7c5>>0x2];_0x277425=HEAP32[_0x4b94ad>>0x2];}var _0x54f658=[];var _0x338b7=0x0;for(var _0x34161e in ENV){if(typeof ENV[_0x34161e]===_0x3149('0x80')){var _0x3ed248=_0x34161e+'='+ENV[_0x34161e];_0x54f658[_0x3149('0x40')](_0x3ed248);_0x338b7+=_0x3ed248[_0x3149('0x35')];}}if(_0x338b7>_0x1c80f6){throw new Error(_0x3149('0xd0'));}var _0x432797=0x4;for(var _0x57c1c5=0x0;_0x57c1c5<_0x54f658[_0x3149('0x35')];_0x57c1c5++){var _0x3ed248=_0x54f658[_0x57c1c5];writeAsciiToMemory(_0x3ed248,_0x277425);HEAP32[_0x4b94ad+_0x57c1c5*_0x432797>>0x2]=_0x277425;_0x277425+=_0x3ed248[_0x3149('0x35')]+0x1;}HEAP32[_0x4b94ad+_0x54f658[_0x3149('0x35')]*_0x432797>>0x2]=0x0;}function _emscripten_get_now(){abort();}function _emscripten_get_now_is_monotonic(){return 0x0||ENVIRONMENT_IS_NODE||typeof dateNow!==_0x3149('0x1')||typeof performance===_0x3149('0x4')&&performance&&typeof performance[_0x3149('0xd1')]===_0x3149('0x4a');}function ___setErrNo(_0x11585e){if(Module[_0x3149('0xd2')])HEAP32[Module[_0x3149('0xd2')]()>>0x2]=_0x11585e;return _0x11585e;}function _clock_gettime(_0x5c1fdc,_0x5dfd3a){var _0x9a0e14;if(_0x5c1fdc===0x0){_0x9a0e14=Date[_0x3149('0xd1')]();}else if(_0x5c1fdc===0x1&&_emscripten_get_now_is_monotonic()){_0x9a0e14=_emscripten_get_now();}else{___setErrNo(0x16);return-0x1;}HEAP32[_0x5dfd3a>>0x2]=_0x9a0e14/0x3e8|0x0;HEAP32[_0x5dfd3a+0x4>>0x2]=_0x9a0e14%0x3e8*0x3e8*0x3e8|0x0;return 0x0;}function ___clock_gettime(_0x534f2b,_0x3b26f8){return _clock_gettime(_0x534f2b,_0x3b26f8);}function ___cxa_allocate_exception(_0x24ba3a){return _malloc(_0x24ba3a);}function __ZSt18uncaught_exceptionv(){return!!__ZSt18uncaught_exceptionv[_0x3149('0xd3')];}function ___cxa_free_exception(_0x28a342){try{return _free(_0x28a342);}catch(_0x29a41a){}}var EXCEPTIONS={'last':0x0,'caught':[],'infos':{},'deAdjust':function(_0x913516){if(!_0x913516||EXCEPTIONS[_0x3149('0xd4')][_0x913516])return _0x913516;for(var _0x34c366 in EXCEPTIONS[_0x3149('0xd4')]){var _0x36d0a6=+_0x34c366;var _0x38a8bc=EXCEPTIONS[_0x3149('0xd4')][_0x36d0a6][_0x3149('0xd5')];var _0x453282=_0x38a8bc[_0x3149('0x35')];for(var _0x2d7bbf=0x0;_0x2d7bbf<_0x453282;_0x2d7bbf++){if(_0x38a8bc[_0x2d7bbf]===_0x913516){return _0x36d0a6;}}}return _0x913516;},'addRef':function(_0x16bf81){if(!_0x16bf81)return;var _0x1f9ee7=EXCEPTIONS[_0x3149('0xd4')][_0x16bf81];_0x1f9ee7[_0x3149('0xd6')]++;},'decRef':function(_0x411d47){if(!_0x411d47)return;var _0x1504f5=EXCEPTIONS[_0x3149('0xd4')][_0x411d47];assert(_0x1504f5['refcount']>0x0);_0x1504f5[_0x3149('0xd6')]--;if(_0x1504f5[_0x3149('0xd6')]===0x0&&!_0x1504f5[_0x3149('0xd7')]){if(_0x1504f5[_0x3149('0xd8')]){Module[_0x3149('0x9a')](_0x1504f5['destructor'],_0x411d47);}delete EXCEPTIONS[_0x3149('0xd4')][_0x411d47];___cxa_free_exception(_0x411d47);}},'clearRef':function(_0x3ada73){if(!_0x3ada73)return;var _0x4dfa63=EXCEPTIONS[_0x3149('0xd4')][_0x3ada73];_0x4dfa63['refcount']=0x0;}};function ___cxa_begin_catch(_0xb05935){var _0x5523f4=EXCEPTIONS[_0x3149('0xd4')][_0xb05935];if(_0x5523f4&&!_0x5523f4[_0x3149('0xd9')]){_0x5523f4[_0x3149('0xd9')]=!![];__ZSt18uncaught_exceptionv[_0x3149('0xd3')]--;}if(_0x5523f4)_0x5523f4[_0x3149('0xd7')]=![];EXCEPTIONS[_0x3149('0xd9')][_0x3149('0x40')](_0xb05935);EXCEPTIONS[_0x3149('0xda')](EXCEPTIONS['deAdjust'](_0xb05935));return _0xb05935;}function ___cxa_pure_virtual(){ABORT=!![];throw _0x3149('0xdb');}function ___resumeException(_0x20bc1f){if(!EXCEPTIONS[_0x3149('0xdc')]){EXCEPTIONS[_0x3149('0xdc')]=_0x20bc1f;}throw _0x20bc1f;}function ___cxa_find_matching_catch(){var _0x42b822=EXCEPTIONS[_0x3149('0xdc')];if(!_0x42b822){return(setTempRet0(0x0),0x0)|0x0;}var _0x210e59=EXCEPTIONS[_0x3149('0xd4')][_0x42b822];var _0x5584b3=_0x210e59['type'];if(!_0x5584b3){return(setTempRet0(0x0),_0x42b822)|0x0;}var _0x48683d=Array[_0x3149('0x2a')][_0x3149('0x52')][_0x3149('0x79')](arguments);var _0x2aa96f=Module[_0x3149('0xdd')](_0x5584b3);if(!___cxa_find_matching_catch[_0x3149('0x4f')])___cxa_find_matching_catch['buffer']=_malloc(0x4);HEAP32[___cxa_find_matching_catch[_0x3149('0x4f')]>>0x2]=_0x42b822;_0x42b822=___cxa_find_matching_catch[_0x3149('0x4f')];for(var _0x4782e9=0x0;_0x4782e9<_0x48683d[_0x3149('0x35')];_0x4782e9++){if(_0x48683d[_0x4782e9]&&Module[_0x3149('0xde')](_0x48683d[_0x4782e9],_0x5584b3,_0x42b822)){_0x42b822=HEAP32[_0x42b822>>0x2];_0x210e59['adjusted'][_0x3149('0x40')](_0x42b822);return(setTempRet0(_0x48683d[_0x4782e9]),_0x42b822)|0x0;}}_0x42b822=HEAP32[_0x42b822>>0x2];return(setTempRet0(_0x5584b3),_0x42b822)|0x0;}function ___cxa_throw(_0x33fa35,_0x37c8d4,_0x438ed8){EXCEPTIONS[_0x3149('0xd4')][_0x33fa35]={'ptr':_0x33fa35,'adjusted':[_0x33fa35],'type':_0x37c8d4,'destructor':_0x438ed8,'refcount':0x0,'caught':![],'rethrown':![]};EXCEPTIONS[_0x3149('0xdc')]=_0x33fa35;if(!(_0x3149('0xd3')in __ZSt18uncaught_exceptionv)){__ZSt18uncaught_exceptionv[_0x3149('0xd3')]=0x1;}else{__ZSt18uncaught_exceptionv[_0x3149('0xd3')]++;}throw _0x33fa35;}function ___gxx_personality_v0(){}function ___lock(){}var PATH={'splitPath':function(_0x554b98){var _0x37ada4=/^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;return _0x37ada4[_0x3149('0xdf')](_0x554b98)[_0x3149('0x52')](0x1);},'normalizeArray':function(_0x522132,_0x29feda){var _0x2eb543=0x0;for(var _0x2f5faa=_0x522132[_0x3149('0x35')]-0x1;_0x2f5faa>=0x0;_0x2f5faa--){var _0x25b7ce=_0x522132[_0x2f5faa];if(_0x25b7ce==='.'){_0x522132['splice'](_0x2f5faa,0x1);}else if(_0x25b7ce==='..'){_0x522132[_0x3149('0xe0')](_0x2f5faa,0x1);_0x2eb543++;}else if(_0x2eb543){_0x522132['splice'](_0x2f5faa,0x1);_0x2eb543--;}}if(_0x29feda){for(;_0x2eb543;_0x2eb543--){_0x522132[_0x3149('0xa0')]('..');}}return _0x522132;},'normalize':function(_0x34ea32){var _0x12f294=_0x34ea32[_0x3149('0x7b')](0x0)==='/',_0x1b761d=_0x34ea32[_0x3149('0x5d')](-0x1)==='/';_0x34ea32=PATH[_0x3149('0xe1')](_0x34ea32[_0x3149('0xe2')]('/')[_0x3149('0xe3')](function(_0xe9246a){return!!_0xe9246a;}),!_0x12f294)[_0x3149('0xe4')]('/');if(!_0x34ea32&&!_0x12f294){_0x34ea32='.';}if(_0x34ea32&&_0x1b761d){_0x34ea32+='/';}return(_0x12f294?'/':'')+_0x34ea32;},'dirname':function(_0x38eef6){var _0x582b9d=PATH[_0x3149('0xe5')](_0x38eef6),_0x1de555=_0x582b9d[0x0],_0x481408=_0x582b9d[0x1];if(!_0x1de555&&!_0x481408){return'.';}if(_0x481408){_0x481408=_0x481408[_0x3149('0x5d')](0x0,_0x481408[_0x3149('0x35')]-0x1);}return _0x1de555+_0x481408;},'basename':function(_0x3df1ca){if(_0x3df1ca==='/')return'/';var _0xf162bb=_0x3df1ca['lastIndexOf']('/');if(_0xf162bb===-0x1)return _0x3df1ca;return _0x3df1ca[_0x3149('0x5d')](_0xf162bb+0x1);},'extname':function(_0x2c2759){return PATH[_0x3149('0xe5')](_0x2c2759)[0x3];},'join':function(){var _0x27ecd8=Array[_0x3149('0x2a')][_0x3149('0x52')][_0x3149('0x79')](arguments,0x0);return PATH[_0x3149('0xe6')](_0x27ecd8[_0x3149('0xe4')]('/'));},'join2':function(_0x3e1ff9,_0x257e4b){return PATH['normalize'](_0x3e1ff9+'/'+_0x257e4b);},'resolve':function(){var _0x185d60='',_0x228932=![];for(var _0x8910ee=arguments[_0x3149('0x35')]-0x1;_0x8910ee>=-0x1&&!_0x228932;_0x8910ee--){var _0xf582a5=_0x8910ee>=0x0?arguments[_0x8910ee]:FS[_0x3149('0xe7')]();if(typeof _0xf582a5!==_0x3149('0x80')){throw new TypeError(_0x3149('0xe8'));}else if(!_0xf582a5){return'';}_0x185d60=_0xf582a5+'/'+_0x185d60;_0x228932=_0xf582a5[_0x3149('0x7b')](0x0)==='/';}_0x185d60=PATH[_0x3149('0xe1')](_0x185d60[_0x3149('0xe2')]('/')[_0x3149('0xe3')](function(_0x55d87f){return!!_0x55d87f;}),!_0x228932)[_0x3149('0xe4')]('/');return(_0x228932?'/':'')+_0x185d60||'.';},'relative':function(_0x306475,_0x4b5580){_0x306475=PATH[_0x3149('0xe9')](_0x306475)[_0x3149('0x5d')](0x1);_0x4b5580=PATH[_0x3149('0xe9')](_0x4b5580)[_0x3149('0x5d')](0x1);function _0x1b83fa(_0x3c9b98){var _0x3e7ca6=0x0;for(;_0x3e7ca6<_0x3c9b98[_0x3149('0x35')];_0x3e7ca6++){if(_0x3c9b98[_0x3e7ca6]!=='')break;}var _0x4111c2=_0x3c9b98[_0x3149('0x35')]-0x1;for(;_0x4111c2>=0x0;_0x4111c2--){if(_0x3c9b98[_0x4111c2]!=='')break;}if(_0x3e7ca6>_0x4111c2)return[];return _0x3c9b98[_0x3149('0x52')](_0x3e7ca6,_0x4111c2-_0x3e7ca6+0x1);}var _0x505f6a=_0x1b83fa(_0x306475[_0x3149('0xe2')]('/'));var _0x3dd4a2=_0x1b83fa(_0x4b5580[_0x3149('0xe2')]('/'));var _0x57fe8f=Math[_0x3149('0xad')](_0x505f6a[_0x3149('0x35')],_0x3dd4a2['length']);var _0x136088=_0x57fe8f;for(var _0x1e13fb=0x0;_0x1e13fb<_0x57fe8f;_0x1e13fb++){if(_0x505f6a[_0x1e13fb]!==_0x3dd4a2[_0x1e13fb]){_0x136088=_0x1e13fb;break;}}var _0x51db26=[];for(var _0x1e13fb=_0x136088;_0x1e13fb<_0x505f6a[_0x3149('0x35')];_0x1e13fb++){_0x51db26[_0x3149('0x40')]('..');}_0x51db26=_0x51db26[_0x3149('0x70')](_0x3dd4a2[_0x3149('0x52')](_0x136088));return _0x51db26[_0x3149('0xe4')]('/');}};var TTY={'ttys':[],'init':function(){},'shutdown':function(){},'register':function(_0x25cc84,_0x4c1382){TTY['ttys'][_0x25cc84]={'input':[],'output':[],'ops':_0x4c1382};FS[_0x3149('0xea')](_0x25cc84,TTY[_0x3149('0xeb')]);},'stream_ops':{'open':function(_0x4c2348){var _0x6cacf5=TTY['ttys'][_0x4c2348[_0x3149('0xec')]['rdev']];if(!_0x6cacf5){throw new FS[(_0x3149('0xed'))](0x13);}_0x4c2348[_0x3149('0xee')]=_0x6cacf5;_0x4c2348[_0x3149('0xef')]=![];},'close':function(_0xc8df0){_0xc8df0[_0x3149('0xee')][_0x3149('0xf0')][_0x3149('0xf1')](_0xc8df0[_0x3149('0xee')]);},'flush':function(_0x341c80){_0x341c80[_0x3149('0xee')][_0x3149('0xf0')][_0x3149('0xf1')](_0x341c80[_0x3149('0xee')]);},'read':function(_0x21a7e8,_0x3fb6ef,_0x33e802,_0x3aec9f,_0x4c1149){if(!_0x21a7e8[_0x3149('0xee')]||!_0x21a7e8['tty']['ops'][_0x3149('0xf2')]){throw new FS['ErrnoError'](0x6);}var _0x9720b=0x0;for(var _0x5e093d=0x0;_0x5e093d<_0x3aec9f;_0x5e093d++){var _0x3f7ed2;try{_0x3f7ed2=_0x21a7e8[_0x3149('0xee')][_0x3149('0xf0')][_0x3149('0xf2')](_0x21a7e8[_0x3149('0xee')]);}catch(_0x2db123){throw new FS[(_0x3149('0xed'))](0x5);}if(_0x3f7ed2===undefined&&_0x9720b===0x0){throw new FS['ErrnoError'](0xb);}if(_0x3f7ed2===null||_0x3f7ed2===undefined)break;_0x9720b++;_0x3fb6ef[_0x33e802+_0x5e093d]=_0x3f7ed2;}if(_0x9720b){_0x21a7e8[_0x3149('0xec')][_0x3149('0xf3')]=Date[_0x3149('0xd1')]();}return _0x9720b;},'write':function(_0x3baccb,_0x2bf903,_0x58a7e9,_0x8568d7,_0x37d708){if(!_0x3baccb[_0x3149('0xee')]||!_0x3baccb[_0x3149('0xee')]['ops'][_0x3149('0xf4')]){throw new FS[(_0x3149('0xed'))](0x6);}try{for(var _0x259b67=0x0;_0x259b67<_0x8568d7;_0x259b67++){_0x3baccb[_0x3149('0xee')][_0x3149('0xf0')][_0x3149('0xf4')](_0x3baccb[_0x3149('0xee')],_0x2bf903[_0x58a7e9+_0x259b67]);}}catch(_0x397171){throw new FS['ErrnoError'](0x5);}if(_0x8568d7){_0x3baccb[_0x3149('0xec')][_0x3149('0xf3')]=Date[_0x3149('0xd1')]();}return _0x259b67;}},'default_tty_ops':{'get_char':function(_0x4c12d1){if(!_0x4c12d1[_0x3149('0xf5')][_0x3149('0x35')]){var _0x244e47=null;if(ENVIRONMENT_IS_NODE){var _0x391370=0x100;var _0x4b6843=new Buffer(_0x391370);var _0xc030df=0x0;var _0x2ae9f8=process[_0x3149('0xf6')]!=_0x3149('0xf7');var _0x29e570=process['stdin']['fd'];if(_0x2ae9f8){var _0x9b6f23=![];try{_0x29e570=fs[_0x3149('0xf8')](_0x3149('0xf9'),'r');_0x9b6f23=!![];}catch(_0x55d59a){}}try{_0xc030df=fs[_0x3149('0xfa')](_0x29e570,_0x4b6843,0x0,_0x391370,null);}catch(_0x2f9335){if(_0x2f9335['toString']()[_0x3149('0x5b')](_0x3149('0xfb'))!=-0x1)_0xc030df=0x0;else throw _0x2f9335;}if(_0x9b6f23){fs[_0x3149('0xfc')](_0x29e570);}if(_0xc030df>0x0){_0x244e47=_0x4b6843[_0x3149('0x52')](0x0,_0xc030df)['toString'](_0x3149('0xfd'));}else{_0x244e47=null;}}else if(typeof window!=_0x3149('0x1')&&typeof window[_0x3149('0xfe')]==_0x3149('0x4a')){_0x244e47=window[_0x3149('0xfe')](_0x3149('0xff'));if(_0x244e47!==null){_0x244e47+='\x0a';}}else if(typeof readline==_0x3149('0x4a')){_0x244e47=readline();if(_0x244e47!==null){_0x244e47+='\x0a';}}if(!_0x244e47){return null;}_0x4c12d1[_0x3149('0xf5')]=intArrayFromString(_0x244e47,!![]);}return _0x4c12d1[_0x3149('0xf5')][_0x3149('0x97')]();},'put_char':function(_0x5a8e00,_0x37684b){if(_0x37684b===null||_0x37684b===0xa){out(UTF8ArrayToString(_0x5a8e00[_0x3149('0x100')],0x0));_0x5a8e00[_0x3149('0x100')]=[];}else{if(_0x37684b!=0x0)_0x5a8e00[_0x3149('0x100')]['push'](_0x37684b);}},'flush':function(_0x3ccf31){if(_0x3ccf31[_0x3149('0x100')]&&_0x3ccf31['output']['length']>0x0){out(UTF8ArrayToString(_0x3ccf31['output'],0x0));_0x3ccf31[_0x3149('0x100')]=[];}}},'default_tty1_ops':{'put_char':function(_0x4a0c77,_0x19c22b){if(_0x19c22b===null||_0x19c22b===0xa){err(UTF8ArrayToString(_0x4a0c77[_0x3149('0x100')],0x0));_0x4a0c77['output']=[];}else{if(_0x19c22b!=0x0)_0x4a0c77[_0x3149('0x100')][_0x3149('0x40')](_0x19c22b);}},'flush':function(_0x14d4f){if(_0x14d4f['output']&&_0x14d4f['output'][_0x3149('0x35')]>0x0){err(UTF8ArrayToString(_0x14d4f[_0x3149('0x100')],0x0));_0x14d4f[_0x3149('0x100')]=[];}}}};var MEMFS={'ops_table':null,'mount':function(_0x422a16){return MEMFS[_0x3149('0x101')](null,'/',0x4000|0x1ff,0x0);},'createNode':function(_0x4964f,_0xff9bee,_0x565158,_0x494212){if(FS[_0x3149('0x102')](_0x565158)||FS[_0x3149('0x103')](_0x565158)){throw new FS[(_0x3149('0xed'))](0x1);}if(!MEMFS['ops_table']){MEMFS['ops_table']={'dir':{'node':{'getattr':MEMFS[_0x3149('0x104')]['getattr'],'setattr':MEMFS[_0x3149('0x104')][_0x3149('0x105')],'lookup':MEMFS['node_ops'][_0x3149('0x106')],'mknod':MEMFS['node_ops'][_0x3149('0x107')],'rename':MEMFS[_0x3149('0x104')][_0x3149('0x108')],'unlink':MEMFS[_0x3149('0x104')][_0x3149('0x109')],'rmdir':MEMFS[_0x3149('0x104')]['rmdir'],'readdir':MEMFS[_0x3149('0x104')]['readdir'],'symlink':MEMFS[_0x3149('0x104')][_0x3149('0x10a')]},'stream':{'llseek':MEMFS['stream_ops'][_0x3149('0x10b')]}},'file':{'node':{'getattr':MEMFS['node_ops'][_0x3149('0x10c')],'setattr':MEMFS[_0x3149('0x104')][_0x3149('0x105')]},'stream':{'llseek':MEMFS[_0x3149('0xeb')]['llseek'],'read':MEMFS[_0x3149('0xeb')][_0x3149('0x4b')],'write':MEMFS[_0x3149('0xeb')][_0x3149('0x10d')],'allocate':MEMFS[_0x3149('0xeb')][_0x3149('0x10e')],'mmap':MEMFS[_0x3149('0xeb')][_0x3149('0x10f')],'msync':MEMFS[_0x3149('0xeb')][_0x3149('0x110')]}},'link':{'node':{'getattr':MEMFS[_0x3149('0x104')][_0x3149('0x10c')],'setattr':MEMFS[_0x3149('0x104')][_0x3149('0x105')],'readlink':MEMFS[_0x3149('0x104')]['readlink']},'stream':{}},'chrdev':{'node':{'getattr':MEMFS[_0x3149('0x104')]['getattr'],'setattr':MEMFS[_0x3149('0x104')]['setattr']},'stream':FS[_0x3149('0x111')]}};}var _0x504430=FS['createNode'](_0x4964f,_0xff9bee,_0x565158,_0x494212);if(FS[_0x3149('0x112')](_0x504430[_0x3149('0x113')])){_0x504430[_0x3149('0x104')]=MEMFS['ops_table'][_0x3149('0x114')][_0x3149('0xec')];_0x504430['stream_ops']=MEMFS[_0x3149('0x115')][_0x3149('0x114')][_0x3149('0x116')];_0x504430[_0x3149('0x117')]={};}else if(FS[_0x3149('0x118')](_0x504430['mode'])){_0x504430[_0x3149('0x104')]=MEMFS[_0x3149('0x115')][_0x3149('0x119')][_0x3149('0xec')];_0x504430[_0x3149('0xeb')]=MEMFS['ops_table'][_0x3149('0x119')][_0x3149('0x116')];_0x504430[_0x3149('0x11a')]=0x0;_0x504430[_0x3149('0x117')]=null;}else if(FS['isLink'](_0x504430[_0x3149('0x113')])){_0x504430[_0x3149('0x104')]=MEMFS[_0x3149('0x115')][_0x3149('0x11b')]['node'];_0x504430[_0x3149('0xeb')]=MEMFS[_0x3149('0x115')][_0x3149('0x11b')][_0x3149('0x116')];}else if(FS[_0x3149('0x11c')](_0x504430[_0x3149('0x113')])){_0x504430[_0x3149('0x104')]=MEMFS[_0x3149('0x115')][_0x3149('0x11d')]['node'];_0x504430['stream_ops']=MEMFS[_0x3149('0x115')][_0x3149('0x11d')][_0x3149('0x116')];}_0x504430[_0x3149('0xf3')]=Date['now']();if(_0x4964f){_0x4964f[_0x3149('0x117')][_0xff9bee]=_0x504430;}return _0x504430;},'getFileDataAsRegularArray':function(_0x1078a6){if(_0x1078a6[_0x3149('0x117')]&&_0x1078a6[_0x3149('0x117')]['subarray']){var _0x3e16c3=[];for(var _0x20c202=0x0;_0x20c202<_0x1078a6['usedBytes'];++_0x20c202)_0x3e16c3[_0x3149('0x40')](_0x1078a6[_0x3149('0x117')][_0x20c202]);return _0x3e16c3;}return _0x1078a6[_0x3149('0x117')];},'getFileDataAsTypedArray':function(_0x495737){if(!_0x495737[_0x3149('0x117')])return new Uint8Array();if(_0x495737[_0x3149('0x117')][_0x3149('0x30')])return _0x495737[_0x3149('0x117')]['subarray'](0x0,_0x495737[_0x3149('0x11a')]);return new Uint8Array(_0x495737[_0x3149('0x117')]);},'expandFileStorage':function(_0x41a2d9,_0x35888b){var _0x4b07ce=_0x41a2d9[_0x3149('0x117')]?_0x41a2d9[_0x3149('0x117')]['length']:0x0;if(_0x4b07ce>=_0x35888b)return;var _0x3c57f6=0x400*0x400;_0x35888b=Math[_0x3149('0x84')](_0x35888b,_0x4b07ce*(_0x4b07ce<_0x3c57f6?0x2:1.125)|0x0);if(_0x4b07ce!=0x0)_0x35888b=Math[_0x3149('0x84')](_0x35888b,0x100);var _0x1f3ff0=_0x41a2d9[_0x3149('0x117')];_0x41a2d9[_0x3149('0x117')]=new Uint8Array(_0x35888b);if(_0x41a2d9[_0x3149('0x11a')]>0x0)_0x41a2d9['contents'][_0x3149('0x3b')](_0x1f3ff0[_0x3149('0x30')](0x0,_0x41a2d9[_0x3149('0x11a')]),0x0);return;},'resizeFileStorage':function(_0x44d1ef,_0x4cf8aa){if(_0x44d1ef[_0x3149('0x11a')]==_0x4cf8aa)return;if(_0x4cf8aa==0x0){_0x44d1ef[_0x3149('0x117')]=null;_0x44d1ef[_0x3149('0x11a')]=0x0;return;}if(!_0x44d1ef[_0x3149('0x117')]||_0x44d1ef[_0x3149('0x117')][_0x3149('0x30')]){var _0x2933be=_0x44d1ef['contents'];_0x44d1ef[_0x3149('0x117')]=new Uint8Array(new ArrayBuffer(_0x4cf8aa));if(_0x2933be){_0x44d1ef[_0x3149('0x117')][_0x3149('0x3b')](_0x2933be['subarray'](0x0,Math[_0x3149('0xad')](_0x4cf8aa,_0x44d1ef[_0x3149('0x11a')])));}_0x44d1ef[_0x3149('0x11a')]=_0x4cf8aa;return;}if(!_0x44d1ef[_0x3149('0x117')])_0x44d1ef[_0x3149('0x117')]=[];if(_0x44d1ef[_0x3149('0x117')][_0x3149('0x35')]>_0x4cf8aa)_0x44d1ef[_0x3149('0x117')][_0x3149('0x35')]=_0x4cf8aa;else while(_0x44d1ef[_0x3149('0x117')]['length']<_0x4cf8aa)_0x44d1ef[_0x3149('0x117')][_0x3149('0x40')](0x0);_0x44d1ef['usedBytes']=_0x4cf8aa;},'node_ops':{'getattr':function(_0xe7f5e5){var _0x3b0ff5={};_0x3b0ff5['dev']=FS[_0x3149('0x11c')](_0xe7f5e5[_0x3149('0x113')])?_0xe7f5e5['id']:0x1;_0x3b0ff5[_0x3149('0x11e')]=_0xe7f5e5['id'];_0x3b0ff5[_0x3149('0x113')]=_0xe7f5e5[_0x3149('0x113')];_0x3b0ff5[_0x3149('0x11f')]=0x1;_0x3b0ff5[_0x3149('0x120')]=0x0;_0x3b0ff5['gid']=0x0;_0x3b0ff5['rdev']=_0xe7f5e5[_0x3149('0x121')];if(FS[_0x3149('0x112')](_0xe7f5e5[_0x3149('0x113')])){_0x3b0ff5[_0x3149('0x122')]=0x1000;}else if(FS['isFile'](_0xe7f5e5[_0x3149('0x113')])){_0x3b0ff5[_0x3149('0x122')]=_0xe7f5e5[_0x3149('0x11a')];}else if(FS[_0x3149('0x123')](_0xe7f5e5[_0x3149('0x113')])){_0x3b0ff5['size']=_0xe7f5e5['link'][_0x3149('0x35')];}else{_0x3b0ff5[_0x3149('0x122')]=0x0;}_0x3b0ff5[_0x3149('0x124')]=new Date(_0xe7f5e5[_0x3149('0xf3')]);_0x3b0ff5[_0x3149('0x125')]=new Date(_0xe7f5e5[_0x3149('0xf3')]);_0x3b0ff5[_0x3149('0x126')]=new Date(_0xe7f5e5[_0x3149('0xf3')]);_0x3b0ff5[_0x3149('0x127')]=0x1000;_0x3b0ff5[_0x3149('0x128')]=Math[_0x3149('0x17')](_0x3b0ff5[_0x3149('0x122')]/_0x3b0ff5[_0x3149('0x127')]);return _0x3b0ff5;},'setattr':function(_0x5bc24c,_0x5e6d76){if(_0x5e6d76[_0x3149('0x113')]!==undefined){_0x5bc24c[_0x3149('0x113')]=_0x5e6d76[_0x3149('0x113')];}if(_0x5e6d76[_0x3149('0xf3')]!==undefined){_0x5bc24c[_0x3149('0xf3')]=_0x5e6d76[_0x3149('0xf3')];}if(_0x5e6d76[_0x3149('0x122')]!==undefined){MEMFS[_0x3149('0x129')](_0x5bc24c,_0x5e6d76[_0x3149('0x122')]);}},'lookup':function(_0x53caa0,_0x2ad642){throw FS['genericErrors'][0x2];},'mknod':function(_0x116517,_0x40f5e3,_0x4338c5,_0x117fd5){return MEMFS[_0x3149('0x101')](_0x116517,_0x40f5e3,_0x4338c5,_0x117fd5);},'rename':function(_0x16fe0f,_0x3acd0c,_0x4f3523){if(FS[_0x3149('0x112')](_0x16fe0f[_0x3149('0x113')])){var _0x515a60;try{_0x515a60=FS[_0x3149('0x12a')](_0x3acd0c,_0x4f3523);}catch(_0x62a8cf){}if(_0x515a60){for(var _0x1deb61 in _0x515a60[_0x3149('0x117')]){throw new FS[(_0x3149('0xed'))](0x27);}}}delete _0x16fe0f[_0x3149('0x12b')][_0x3149('0x117')][_0x16fe0f['name']];_0x16fe0f['name']=_0x4f3523;_0x3acd0c['contents'][_0x4f3523]=_0x16fe0f;_0x16fe0f['parent']=_0x3acd0c;},'unlink':function(_0x4ac260,_0x5e84a9){delete _0x4ac260['contents'][_0x5e84a9];},'rmdir':function(_0x31fee1,_0x29b37a){var _0x383b1c=FS[_0x3149('0x12a')](_0x31fee1,_0x29b37a);for(var _0x54f1e4 in _0x383b1c[_0x3149('0x117')]){throw new FS[(_0x3149('0xed'))](0x27);}delete _0x31fee1[_0x3149('0x117')][_0x29b37a];},'readdir':function(_0xaf128c){var _0x4fd8ae=['.','..'];for(var _0x486365 in _0xaf128c[_0x3149('0x117')]){if(!_0xaf128c[_0x3149('0x117')][_0x3149('0x46')](_0x486365)){continue;}_0x4fd8ae[_0x3149('0x40')](_0x486365);}return _0x4fd8ae;},'symlink':function(_0x3e7a9f,_0x5798ba,_0x3b4f94){var _0x1ba0cf=MEMFS[_0x3149('0x101')](_0x3e7a9f,_0x5798ba,0x1ff|0xa000,0x0);_0x1ba0cf[_0x3149('0x11b')]=_0x3b4f94;return _0x1ba0cf;},'readlink':function(_0x35db2b){if(!FS['isLink'](_0x35db2b[_0x3149('0x113')])){throw new FS[(_0x3149('0xed'))](0x16);}return _0x35db2b[_0x3149('0x11b')];}},'stream_ops':{'read':function(_0x2eff47,_0x512200,_0x5b0076,_0x4bf0b4,_0x274a24){var _0x386907=_0x2eff47[_0x3149('0xec')][_0x3149('0x117')];if(_0x274a24>=_0x2eff47[_0x3149('0xec')]['usedBytes'])return 0x0;var _0x4ad349=Math[_0x3149('0xad')](_0x2eff47[_0x3149('0xec')]['usedBytes']-_0x274a24,_0x4bf0b4);if(_0x4ad349>0x8&&_0x386907[_0x3149('0x30')]){_0x512200[_0x3149('0x3b')](_0x386907[_0x3149('0x30')](_0x274a24,_0x274a24+_0x4ad349),_0x5b0076);}else{for(var _0x20aeab=0x0;_0x20aeab<_0x4ad349;_0x20aeab++)_0x512200[_0x5b0076+_0x20aeab]=_0x386907[_0x274a24+_0x20aeab];}return _0x4ad349;},'write':function(_0x53b671,_0x51ea3d,_0x16d256,_0x26d8af,_0x15662f,_0x5f4520){if(!_0x26d8af)return 0x0;var _0x3ea5f0=_0x53b671['node'];_0x3ea5f0[_0x3149('0xf3')]=Date[_0x3149('0xd1')]();if(_0x51ea3d[_0x3149('0x30')]&&(!_0x3ea5f0[_0x3149('0x117')]||_0x3ea5f0['contents'][_0x3149('0x30')])){if(_0x5f4520){_0x3ea5f0[_0x3149('0x117')]=_0x51ea3d[_0x3149('0x30')](_0x16d256,_0x16d256+_0x26d8af);_0x3ea5f0[_0x3149('0x11a')]=_0x26d8af;return _0x26d8af;}else if(_0x3ea5f0[_0x3149('0x11a')]===0x0&&_0x15662f===0x0){_0x3ea5f0['contents']=new Uint8Array(_0x51ea3d[_0x3149('0x30')](_0x16d256,_0x16d256+_0x26d8af));_0x3ea5f0['usedBytes']=_0x26d8af;return _0x26d8af;}else if(_0x15662f+_0x26d8af<=_0x3ea5f0[_0x3149('0x11a')]){_0x3ea5f0[_0x3149('0x117')]['set'](_0x51ea3d[_0x3149('0x30')](_0x16d256,_0x16d256+_0x26d8af),_0x15662f);return _0x26d8af;}}MEMFS[_0x3149('0x12c')](_0x3ea5f0,_0x15662f+_0x26d8af);if(_0x3ea5f0['contents']['subarray']&&_0x51ea3d[_0x3149('0x30')])_0x3ea5f0[_0x3149('0x117')][_0x3149('0x3b')](_0x51ea3d[_0x3149('0x30')](_0x16d256,_0x16d256+_0x26d8af),_0x15662f);else{for(var _0x5745ab=0x0;_0x5745ab<_0x26d8af;_0x5745ab++){_0x3ea5f0[_0x3149('0x117')][_0x15662f+_0x5745ab]=_0x51ea3d[_0x16d256+_0x5745ab];}}_0x3ea5f0[_0x3149('0x11a')]=Math[_0x3149('0x84')](_0x3ea5f0[_0x3149('0x11a')],_0x15662f+_0x26d8af);return _0x26d8af;},'llseek':function(_0x165935,_0x1aee57,_0x3c7aa8){var _0x54cbb5=_0x1aee57;if(_0x3c7aa8===0x1){_0x54cbb5+=_0x165935['position'];}else if(_0x3c7aa8===0x2){if(FS[_0x3149('0x118')](_0x165935[_0x3149('0xec')][_0x3149('0x113')])){_0x54cbb5+=_0x165935['node'][_0x3149('0x11a')];}}if(_0x54cbb5<0x0){throw new FS[(_0x3149('0xed'))](0x16);}return _0x54cbb5;},'allocate':function(_0x16aa4a,_0x23dfc6,_0x551df3){MEMFS[_0x3149('0x12c')](_0x16aa4a[_0x3149('0xec')],_0x23dfc6+_0x551df3);_0x16aa4a[_0x3149('0xec')][_0x3149('0x11a')]=Math[_0x3149('0x84')](_0x16aa4a[_0x3149('0xec')][_0x3149('0x11a')],_0x23dfc6+_0x551df3);},'mmap':function(_0x568621,_0x4777e8,_0x3db4ea,_0x2b58e2,_0x4149e3,_0x4f6473,_0x5b1637){if(!FS[_0x3149('0x118')](_0x568621[_0x3149('0xec')][_0x3149('0x113')])){throw new FS[(_0x3149('0xed'))](0x13);}var _0x49333f;var _0x324978;var _0x26961f=_0x568621[_0x3149('0xec')][_0x3149('0x117')];if(!(_0x5b1637&0x2)&&(_0x26961f[_0x3149('0x4f')]===_0x4777e8||_0x26961f[_0x3149('0x4f')]===_0x4777e8[_0x3149('0x4f')])){_0x324978=![];_0x49333f=_0x26961f[_0x3149('0x12d')];}else{if(_0x4149e3>0x0||_0x4149e3+_0x2b58e2<_0x568621[_0x3149('0xec')][_0x3149('0x11a')]){if(_0x26961f[_0x3149('0x30')]){_0x26961f=_0x26961f[_0x3149('0x30')](_0x4149e3,_0x4149e3+_0x2b58e2);}else{_0x26961f=Array[_0x3149('0x2a')][_0x3149('0x52')][_0x3149('0x79')](_0x26961f,_0x4149e3,_0x4149e3+_0x2b58e2);}}_0x324978=!![];_0x49333f=_malloc(_0x2b58e2);if(!_0x49333f){throw new FS[(_0x3149('0xed'))](0xc);}_0x4777e8[_0x3149('0x3b')](_0x26961f,_0x49333f);}return{'ptr':_0x49333f,'allocated':_0x324978};},'msync':function(_0x4031d4,_0x51276a,_0x10f0e5,_0x3a375d,_0x15e774){if(!FS['isFile'](_0x4031d4[_0x3149('0xec')][_0x3149('0x113')])){throw new FS[(_0x3149('0xed'))](0x13);}if(_0x15e774&0x2){return 0x0;}var _0x2f1a00=MEMFS[_0x3149('0xeb')][_0x3149('0x10d')](_0x4031d4,_0x51276a,0x0,_0x3a375d,_0x10f0e5,![]);return 0x0;}}};var IDBFS={'dbs':{},'indexedDB':function(){if(typeof indexedDB!==_0x3149('0x1'))return indexedDB;var _0x1e9e0f=null;if(typeof window===_0x3149('0x4'))_0x1e9e0f=window['indexedDB']||window[_0x3149('0x12e')]||window[_0x3149('0x12f')]||window[_0x3149('0x130')];assert(_0x1e9e0f,'IDBFS\x20used,\x20but\x20indexedDB\x20not\x20supported');return _0x1e9e0f;},'DB_VERSION':0x15,'DB_STORE_NAME':_0x3149('0x131'),'mount':function(_0x452081){return MEMFS[_0x3149('0x132')][_0x3149('0x78')](null,arguments);},'syncfs':function(_0x1a6092,_0x16bc16,_0x17ea0a){IDBFS[_0x3149('0x133')](_0x1a6092,function(_0x98b4b9,_0x1db39a){if(_0x98b4b9)return _0x17ea0a(_0x98b4b9);IDBFS[_0x3149('0x134')](_0x1a6092,function(_0x494ae2,_0x160298){if(_0x494ae2)return _0x17ea0a(_0x494ae2);var _0x17c529=_0x16bc16?_0x160298:_0x1db39a;var _0x496706=_0x16bc16?_0x1db39a:_0x160298;IDBFS[_0x3149('0x135')](_0x17c529,_0x496706,_0x17ea0a);});});},'getDB':function(_0xa39895,_0x54f64b){var _0x5c9879=IDBFS[_0x3149('0x136')][_0xa39895];if(_0x5c9879){return _0x54f64b(null,_0x5c9879);}var _0x33d415;try{_0x33d415=IDBFS['indexedDB']()['open'](_0xa39895,IDBFS[_0x3149('0x137')]);}catch(_0x4516c9){return _0x54f64b(_0x4516c9);}if(!_0x33d415){return _0x54f64b(_0x3149('0x138'));}_0x33d415[_0x3149('0x139')]=function(_0x4e9c01){var _0x5c9879=_0x4e9c01[_0x3149('0x13a')][_0x3149('0x13b')];var _0x524180=_0x4e9c01[_0x3149('0x13a')]['transaction'];var _0x572597;if(_0x5c9879['objectStoreNames']['contains'](IDBFS[_0x3149('0x13c')])){_0x572597=_0x524180[_0x3149('0x13d')](IDBFS['DB_STORE_NAME']);}else{_0x572597=_0x5c9879[_0x3149('0x13e')](IDBFS[_0x3149('0x13c')]);}if(!_0x572597[_0x3149('0x13f')][_0x3149('0x140')]('timestamp')){_0x572597[_0x3149('0x141')]('timestamp','timestamp',{'unique':![]});}};_0x33d415[_0x3149('0x142')]=function(){_0x5c9879=_0x33d415[_0x3149('0x13b')];IDBFS['dbs'][_0xa39895]=_0x5c9879;_0x54f64b(null,_0x5c9879);};_0x33d415[_0x3149('0x1b')]=function(_0x3ad4af){_0x54f64b(this[_0x3149('0x22')]);_0x3ad4af[_0x3149('0x143')]();};},'getLocalSet':function(_0x4a20e3,_0x1ac718){var _0x105070={};function _0x168e57(_0x212123){return _0x212123!=='.'&&_0x212123!=='..';};function _0x5dd6ce(_0x13d21a){return function(_0x40735a){return PATH[_0x3149('0x144')](_0x13d21a,_0x40735a);};};var _0x43726e=FS[_0x3149('0x145')](_0x4a20e3['mountpoint'])[_0x3149('0xe3')](_0x168e57)[_0x3149('0x146')](_0x5dd6ce(_0x4a20e3[_0x3149('0x147')]));while(_0x43726e['length']){var _0xf13abf=_0x43726e['pop']();var _0x570c4d;try{_0x570c4d=FS['stat'](_0xf13abf);}catch(_0x5cce95){return _0x1ac718(_0x5cce95);}if(FS[_0x3149('0x112')](_0x570c4d[_0x3149('0x113')])){_0x43726e[_0x3149('0x40')][_0x3149('0x78')](_0x43726e,FS[_0x3149('0x145')](_0xf13abf)['filter'](_0x168e57)[_0x3149('0x146')](_0x5dd6ce(_0xf13abf)));}_0x105070[_0xf13abf]={'timestamp':_0x570c4d[_0x3149('0x125')]};}return _0x1ac718(null,{'type':'local','entries':_0x105070});},'getRemoteSet':function(_0x56e63a,_0x48f94e){var _0x21fa26={};IDBFS[_0x3149('0x148')](_0x56e63a[_0x3149('0x147')],function(_0x15ce14,_0x142601){if(_0x15ce14)return _0x48f94e(_0x15ce14);try{var _0x2e6138=_0x142601[_0x3149('0x149')]([IDBFS[_0x3149('0x13c')]],_0x3149('0x14a'));_0x2e6138[_0x3149('0x1b')]=function(_0x40dd72){_0x48f94e(this[_0x3149('0x22')]);_0x40dd72[_0x3149('0x143')]();};var _0x15a460=_0x2e6138[_0x3149('0x13d')](IDBFS[_0x3149('0x13c')]);var _0x8815da=_0x15a460['index']('timestamp');_0x8815da[_0x3149('0x14b')]()[_0x3149('0x142')]=function(_0xd1aa25){var _0x3fd228=_0xd1aa25[_0x3149('0x13a')][_0x3149('0x13b')];if(!_0x3fd228){return _0x48f94e(null,{'type':_0x3149('0x14c'),'db':_0x142601,'entries':_0x21fa26});}_0x21fa26[_0x3fd228[_0x3149('0x14d')]]={'timestamp':_0x3fd228['key']};_0x3fd228[_0x3149('0x14e')]();};}catch(_0x4d15e1){return _0x48f94e(_0x4d15e1);}});},'loadLocalEntry':function(_0x427387,_0x34a534){var _0x17be02,_0x188411;try{var _0x521c95=FS[_0x3149('0x14f')](_0x427387);_0x188411=_0x521c95[_0x3149('0xec')];_0x17be02=FS['stat'](_0x427387);}catch(_0x48bf27){return _0x34a534(_0x48bf27);}if(FS[_0x3149('0x112')](_0x17be02['mode'])){return _0x34a534(null,{'timestamp':_0x17be02[_0x3149('0x125')],'mode':_0x17be02[_0x3149('0x113')]});}else if(FS[_0x3149('0x118')](_0x17be02[_0x3149('0x113')])){_0x188411[_0x3149('0x117')]=MEMFS[_0x3149('0x150')](_0x188411);return _0x34a534(null,{'timestamp':_0x17be02[_0x3149('0x125')],'mode':_0x17be02[_0x3149('0x113')],'contents':_0x188411[_0x3149('0x117')]});}else{return _0x34a534(new Error('node\x20type\x20not\x20supported'));}},'storeLocalEntry':function(_0x1e0609,_0x432f55,_0x5272ed){try{if(FS[_0x3149('0x112')](_0x432f55[_0x3149('0x113')])){FS[_0x3149('0x151')](_0x1e0609,_0x432f55[_0x3149('0x113')]);}else if(FS[_0x3149('0x118')](_0x432f55[_0x3149('0x113')])){FS['writeFile'](_0x1e0609,_0x432f55[_0x3149('0x117')],{'canOwn':!![]});}else{return _0x5272ed(new Error('node\x20type\x20not\x20supported'));}FS[_0x3149('0x152')](_0x1e0609,_0x432f55['mode']);FS[_0x3149('0x153')](_0x1e0609,_0x432f55[_0x3149('0xf3')],_0x432f55[_0x3149('0xf3')]);}catch(_0x252022){return _0x5272ed(_0x252022);}_0x5272ed(null);},'removeLocalEntry':function(_0x8c11b7,_0x21b0e2){try{var _0x5783dd=FS[_0x3149('0x14f')](_0x8c11b7);var _0x22380c=FS[_0x3149('0x154')](_0x8c11b7);if(FS[_0x3149('0x112')](_0x22380c[_0x3149('0x113')])){FS[_0x3149('0x155')](_0x8c11b7);}else if(FS['isFile'](_0x22380c[_0x3149('0x113')])){FS[_0x3149('0x109')](_0x8c11b7);}}catch(_0x1ec2dc){return _0x21b0e2(_0x1ec2dc);}_0x21b0e2(null);},'loadRemoteEntry':function(_0x46e960,_0x4102c2,_0x50fbd5){var _0x338134=_0x46e960[_0x3149('0x156')](_0x4102c2);_0x338134[_0x3149('0x142')]=function(_0x59cf5d){_0x50fbd5(null,_0x59cf5d[_0x3149('0x13a')][_0x3149('0x13b')]);};_0x338134[_0x3149('0x1b')]=function(_0x377bda){_0x50fbd5(this[_0x3149('0x22')]);_0x377bda[_0x3149('0x143')]();};},'storeRemoteEntry':function(_0x50488d,_0x1c670d,_0x51f739,_0x288cc9){var _0x4db5f6=_0x50488d[_0x3149('0x157')](_0x51f739,_0x1c670d);_0x4db5f6[_0x3149('0x142')]=function(){_0x288cc9(null);};_0x4db5f6[_0x3149('0x1b')]=function(_0x50f13e){_0x288cc9(this[_0x3149('0x22')]);_0x50f13e[_0x3149('0x143')]();};},'removeRemoteEntry':function(_0x141842,_0x1152be,_0x5603ec){var _0x4aa380=_0x141842[_0x3149('0x158')](_0x1152be);_0x4aa380[_0x3149('0x142')]=function(){_0x5603ec(null);};_0x4aa380[_0x3149('0x1b')]=function(_0x1382b8){_0x5603ec(this[_0x3149('0x22')]);_0x1382b8[_0x3149('0x143')]();};},'reconcile':function(_0x44a7c7,_0x5608d8,_0x5c8bf3){var _0x240efc=0x0;var _0x249a89=[];Object[_0x3149('0x159')](_0x44a7c7[_0x3149('0x15a')])[_0x3149('0x15b')](function(_0xf85f9c){var _0x3833d9=_0x44a7c7['entries'][_0xf85f9c];var _0x15ede7=_0x5608d8['entries'][_0xf85f9c];if(!_0x15ede7||_0x3833d9['timestamp']>_0x15ede7['timestamp']){_0x249a89[_0x3149('0x40')](_0xf85f9c);_0x240efc++;}});var _0x339337=[];Object[_0x3149('0x159')](_0x5608d8[_0x3149('0x15a')])[_0x3149('0x15b')](function(_0x4f90ab){var _0x502ad8=_0x5608d8[_0x3149('0x15a')][_0x4f90ab];var _0x32ac87=_0x44a7c7[_0x3149('0x15a')][_0x4f90ab];if(!_0x32ac87){_0x339337[_0x3149('0x40')](_0x4f90ab);_0x240efc++;}});if(!_0x240efc){return _0x5c8bf3(null);}var _0x3a252c=![];var _0x32fe44=0x0;var _0xcc9ecf=_0x44a7c7[_0x3149('0x15c')]===_0x3149('0x14c')?_0x44a7c7['db']:_0x5608d8['db'];var _0x51be4b=_0xcc9ecf[_0x3149('0x149')]([IDBFS[_0x3149('0x13c')]],_0x3149('0x15d'));var _0x1a5800=_0x51be4b[_0x3149('0x13d')](IDBFS[_0x3149('0x13c')]);function _0xadf455(_0x10c428){if(_0x10c428){if(!_0xadf455[_0x3149('0x15e')]){_0xadf455[_0x3149('0x15e')]=!![];return _0x5c8bf3(_0x10c428);}return;}if(++_0x32fe44>=_0x240efc){return _0x5c8bf3(null);}};_0x51be4b[_0x3149('0x1b')]=function(_0x3ca821){_0xadf455(this['error']);_0x3ca821[_0x3149('0x143')]();};_0x249a89[_0x3149('0x15f')]()['forEach'](function(_0x3d56f8){if(_0x5608d8['type']===_0x3149('0x160')){IDBFS[_0x3149('0x161')](_0x1a5800,_0x3d56f8,function(_0xd77b5c,_0x402795){if(_0xd77b5c)return _0xadf455(_0xd77b5c);IDBFS[_0x3149('0x162')](_0x3d56f8,_0x402795,_0xadf455);});}else{IDBFS[_0x3149('0x163')](_0x3d56f8,function(_0x4ae14e,_0x11c2ad){if(_0x4ae14e)return _0xadf455(_0x4ae14e);IDBFS['storeRemoteEntry'](_0x1a5800,_0x3d56f8,_0x11c2ad,_0xadf455);});}});_0x339337['sort']()[_0x3149('0x164')]()[_0x3149('0x15b')](function(_0x639c50){if(_0x5608d8[_0x3149('0x15c')]===_0x3149('0x160')){IDBFS[_0x3149('0x165')](_0x639c50,_0xadf455);}else{IDBFS[_0x3149('0x166')](_0x1a5800,_0x639c50,_0xadf455);}});}};var NODEFS={'isWindows':![],'staticInit':function(){NODEFS[_0x3149('0x167')]=!!process[_0x3149('0xf6')][_0x3149('0x168')](/^win/);var _0xd90d0f=process['binding']('constants');if(_0xd90d0f['fs']){_0xd90d0f=_0xd90d0f['fs'];}NODEFS['flagsForNodeMap']={'1024':_0xd90d0f[_0x3149('0x169')],'64':_0xd90d0f['O_CREAT'],'128':_0xd90d0f[_0x3149('0x16a')],'0':_0xd90d0f[_0x3149('0x16b')],'2':_0xd90d0f['O_RDWR'],'4096':_0xd90d0f[_0x3149('0x16c')],'512':_0xd90d0f['O_TRUNC'],'1':_0xd90d0f['O_WRONLY']};},'bufferFrom':function(_0x23b23c){return Buffer[_0x3149('0x16d')]?Buffer[_0x3149('0x16e')](_0x23b23c):new Buffer(_0x23b23c);},'mount':function(_0x13c7af){assert(ENVIRONMENT_IS_NODE);return NODEFS[_0x3149('0x101')](null,'/',NODEFS[_0x3149('0x16f')](_0x13c7af['opts'][_0x3149('0x170')]),0x0);},'createNode':function(_0x29117e,_0x26ab63,_0x784e78,_0x41f5bc){if(!FS[_0x3149('0x112')](_0x784e78)&&!FS[_0x3149('0x118')](_0x784e78)&&!FS[_0x3149('0x123')](_0x784e78)){throw new FS[(_0x3149('0xed'))](0x16);}var _0x2f1776=FS[_0x3149('0x101')](_0x29117e,_0x26ab63,_0x784e78);_0x2f1776[_0x3149('0x104')]=NODEFS[_0x3149('0x104')];_0x2f1776[_0x3149('0xeb')]=NODEFS[_0x3149('0xeb')];return _0x2f1776;},'getMode':function(_0x312bc4){var _0x24dbe8;try{_0x24dbe8=fs[_0x3149('0x171')](_0x312bc4);if(NODEFS[_0x3149('0x167')]){_0x24dbe8['mode']=_0x24dbe8[_0x3149('0x113')]|(_0x24dbe8[_0x3149('0x113')]&0x124)>>0x2;}}catch(_0x17ff4f){if(!_0x17ff4f[_0x3149('0x172')])throw _0x17ff4f;throw new FS['ErrnoError'](-_0x17ff4f[_0x3149('0x173')]);}return _0x24dbe8[_0x3149('0x113')];},'realPath':function(_0x3cd2bf){var _0xafca2b=[];while(_0x3cd2bf[_0x3149('0x12b')]!==_0x3cd2bf){_0xafca2b[_0x3149('0x40')](_0x3cd2bf['name']);_0x3cd2bf=_0x3cd2bf['parent'];}_0xafca2b['push'](_0x3cd2bf[_0x3149('0x132')][_0x3149('0x174')][_0x3149('0x170')]);_0xafca2b[_0x3149('0x164')]();return PATH[_0x3149('0xe4')][_0x3149('0x78')](null,_0xafca2b);},'flagsForNode':function(_0x595f88){_0x595f88&=~0x200000;_0x595f88&=~0x800;_0x595f88&=~0x8000;_0x595f88&=~0x80000;var _0x5c81d9=0x0;for(var _0x3ad187 in NODEFS[_0x3149('0x175')]){if(_0x595f88&_0x3ad187){_0x5c81d9|=NODEFS[_0x3149('0x175')][_0x3ad187];_0x595f88^=_0x3ad187;}}if(!_0x595f88){return _0x5c81d9;}else{throw new FS[(_0x3149('0xed'))](0x16);}},'node_ops':{'getattr':function(_0x2a44ff){var _0x5471d1=NODEFS[_0x3149('0x176')](_0x2a44ff);var _0x755941;try{_0x755941=fs[_0x3149('0x171')](_0x5471d1);}catch(_0x477466){if(!_0x477466[_0x3149('0x172')])throw _0x477466;throw new FS[(_0x3149('0xed'))](-_0x477466[_0x3149('0x173')]);}if(NODEFS['isWindows']&&!_0x755941[_0x3149('0x127')]){_0x755941[_0x3149('0x127')]=0x1000;}if(NODEFS[_0x3149('0x167')]&&!_0x755941[_0x3149('0x128')]){_0x755941[_0x3149('0x128')]=(_0x755941[_0x3149('0x122')]+_0x755941[_0x3149('0x127')]-0x1)/_0x755941[_0x3149('0x127')]|0x0;}return{'dev':_0x755941['dev'],'ino':_0x755941['ino'],'mode':_0x755941['mode'],'nlink':_0x755941[_0x3149('0x11f')],'uid':_0x755941[_0x3149('0x120')],'gid':_0x755941['gid'],'rdev':_0x755941[_0x3149('0x121')],'size':_0x755941[_0x3149('0x122')],'atime':_0x755941[_0x3149('0x124')],'mtime':_0x755941[_0x3149('0x125')],'ctime':_0x755941[_0x3149('0x126')],'blksize':_0x755941[_0x3149('0x127')],'blocks':_0x755941[_0x3149('0x128')]};},'setattr':function(_0xaea7da,_0x42331e){var _0x39b9b1=NODEFS['realPath'](_0xaea7da);try{if(_0x42331e[_0x3149('0x113')]!==undefined){fs[_0x3149('0x177')](_0x39b9b1,_0x42331e['mode']);_0xaea7da[_0x3149('0x113')]=_0x42331e[_0x3149('0x113')];}if(_0x42331e[_0x3149('0xf3')]!==undefined){var _0x4ea053=new Date(_0x42331e['timestamp']);fs[_0x3149('0x178')](_0x39b9b1,_0x4ea053,_0x4ea053);}if(_0x42331e[_0x3149('0x122')]!==undefined){fs['truncateSync'](_0x39b9b1,_0x42331e[_0x3149('0x122')]);}}catch(_0x429d72){if(!_0x429d72[_0x3149('0x172')])throw _0x429d72;throw new FS[(_0x3149('0xed'))](-_0x429d72[_0x3149('0x173')]);}},'lookup':function(_0x22e139,_0x4ea011){var _0x1429fc=PATH[_0x3149('0x144')](NODEFS['realPath'](_0x22e139),_0x4ea011);var _0x22d8d2=NODEFS['getMode'](_0x1429fc);return NODEFS[_0x3149('0x101')](_0x22e139,_0x4ea011,_0x22d8d2);},'mknod':function(_0x562425,_0x210817,_0x54408a,_0x3fd41f){var _0x5c2ee2=NODEFS[_0x3149('0x101')](_0x562425,_0x210817,_0x54408a,_0x3fd41f);var _0x40030f=NODEFS[_0x3149('0x176')](_0x5c2ee2);try{if(FS[_0x3149('0x112')](_0x5c2ee2[_0x3149('0x113')])){fs[_0x3149('0x179')](_0x40030f,_0x5c2ee2[_0x3149('0x113')]);}else{fs[_0x3149('0x17a')](_0x40030f,'',{'mode':_0x5c2ee2[_0x3149('0x113')]});}}catch(_0xb32afc){if(!_0xb32afc[_0x3149('0x172')])throw _0xb32afc;throw new FS[(_0x3149('0xed'))](-_0xb32afc[_0x3149('0x173')]);}return _0x5c2ee2;},'rename':function(_0x6aba98,_0xcb59d0,_0x4d22fa){var _0x2ef95f=NODEFS['realPath'](_0x6aba98);var _0xbd35f=PATH[_0x3149('0x144')](NODEFS[_0x3149('0x176')](_0xcb59d0),_0x4d22fa);try{fs[_0x3149('0x17b')](_0x2ef95f,_0xbd35f);}catch(_0x184a4f){if(!_0x184a4f[_0x3149('0x172')])throw _0x184a4f;throw new FS[(_0x3149('0xed'))](-_0x184a4f[_0x3149('0x173')]);}},'unlink':function(_0x23ac04,_0x57c4ee){var _0x27fe3b=PATH[_0x3149('0x144')](NODEFS[_0x3149('0x176')](_0x23ac04),_0x57c4ee);try{fs[_0x3149('0x17c')](_0x27fe3b);}catch(_0x4e7973){if(!_0x4e7973[_0x3149('0x172')])throw _0x4e7973;throw new FS[(_0x3149('0xed'))](-_0x4e7973[_0x3149('0x173')]);}},'rmdir':function(_0x35b341,_0x33f4c2){var _0x300a83=PATH['join2'](NODEFS['realPath'](_0x35b341),_0x33f4c2);try{fs[_0x3149('0x17d')](_0x300a83);}catch(_0x3dc112){if(!_0x3dc112[_0x3149('0x172')])throw _0x3dc112;throw new FS[(_0x3149('0xed'))](-_0x3dc112[_0x3149('0x173')]);}},'readdir':function(_0x338b96){var _0x48412f=NODEFS[_0x3149('0x176')](_0x338b96);try{return fs[_0x3149('0x17e')](_0x48412f);}catch(_0x1f1d17){if(!_0x1f1d17[_0x3149('0x172')])throw _0x1f1d17;throw new FS[(_0x3149('0xed'))](-_0x1f1d17[_0x3149('0x173')]);}},'symlink':function(_0x27f619,_0x44039d,_0x541cc3){var _0x3bee21=PATH[_0x3149('0x144')](NODEFS[_0x3149('0x176')](_0x27f619),_0x44039d);try{fs[_0x3149('0x17f')](_0x541cc3,_0x3bee21);}catch(_0x2b5da1){if(!_0x2b5da1[_0x3149('0x172')])throw _0x2b5da1;throw new FS[(_0x3149('0xed'))](-_0x2b5da1[_0x3149('0x173')]);}},'readlink':function(_0x2a6b3d){var _0x323ded=NODEFS[_0x3149('0x176')](_0x2a6b3d);try{_0x323ded=fs[_0x3149('0x180')](_0x323ded);_0x323ded=NODEJS_PATH[_0x3149('0x181')](NODEJS_PATH['resolve'](_0x2a6b3d[_0x3149('0x132')][_0x3149('0x174')][_0x3149('0x170')]),_0x323ded);return _0x323ded;}catch(_0x1cb63a){if(!_0x1cb63a['code'])throw _0x1cb63a;throw new FS[(_0x3149('0xed'))](-_0x1cb63a[_0x3149('0x173')]);}}},'stream_ops':{'open':function(_0x1f63ba){var _0xeb577=NODEFS[_0x3149('0x176')](_0x1f63ba[_0x3149('0xec')]);try{if(FS['isFile'](_0x1f63ba['node']['mode'])){_0x1f63ba[_0x3149('0x182')]=fs[_0x3149('0xf8')](_0xeb577,NODEFS['flagsForNode'](_0x1f63ba[_0x3149('0x183')]));}}catch(_0x526140){if(!_0x526140[_0x3149('0x172')])throw _0x526140;throw new FS['ErrnoError'](-_0x526140[_0x3149('0x173')]);}},'close':function(_0x489950){try{if(FS[_0x3149('0x118')](_0x489950[_0x3149('0xec')]['mode'])&&_0x489950['nfd']){fs[_0x3149('0xfc')](_0x489950[_0x3149('0x182')]);}}catch(_0x351601){if(!_0x351601['code'])throw _0x351601;throw new FS['ErrnoError'](-_0x351601[_0x3149('0x173')]);}},'read':function(_0x259a62,_0x3f1387,_0x585b07,_0x1f785a,_0x3fd908){if(_0x1f785a===0x0)return 0x0;try{return fs[_0x3149('0xfa')](_0x259a62[_0x3149('0x182')],NODEFS['bufferFrom'](_0x3f1387[_0x3149('0x4f')]),_0x585b07,_0x1f785a,_0x3fd908);}catch(_0x486e0e){throw new FS[(_0x3149('0xed'))](-_0x486e0e[_0x3149('0x173')]);}},'write':function(_0x19a63c,_0x4902a2,_0x4134f5,_0x268ae1,_0x4c133a){try{return fs['writeSync'](_0x19a63c[_0x3149('0x182')],NODEFS[_0x3149('0x184')](_0x4902a2[_0x3149('0x4f')]),_0x4134f5,_0x268ae1,_0x4c133a);}catch(_0x197527){throw new FS['ErrnoError'](-_0x197527['errno']);}},'llseek':function(_0x24ae8b,_0x40c962,_0x4489e5){var _0x5b10aa=_0x40c962;if(_0x4489e5===0x1){_0x5b10aa+=_0x24ae8b[_0x3149('0x185')];}else if(_0x4489e5===0x2){if(FS['isFile'](_0x24ae8b[_0x3149('0xec')][_0x3149('0x113')])){try{var _0x1ab816=fs['fstatSync'](_0x24ae8b[_0x3149('0x182')]);_0x5b10aa+=_0x1ab816[_0x3149('0x122')];}catch(_0x5ab5d5){throw new FS[(_0x3149('0xed'))](-_0x5ab5d5[_0x3149('0x173')]);}}}if(_0x5b10aa<0x0){throw new FS[(_0x3149('0xed'))](0x16);}return _0x5b10aa;}}};var WORKERFS={'DIR_MODE':0x41ff,'FILE_MODE':0x81ff,'reader':null,'mount':function(_0x282f78){assert(ENVIRONMENT_IS_WORKER);if(!WORKERFS[_0x3149('0x186')])WORKERFS[_0x3149('0x186')]=new FileReaderSync();var _0x5b9a00=WORKERFS[_0x3149('0x101')](null,'/',WORKERFS['DIR_MODE'],0x0);var _0x34a1e0={};function _0x1237d4(_0x2a87aa){var _0x58b54c=_0x2a87aa[_0x3149('0xe2')]('/');var _0x2e0b1a=_0x5b9a00;for(var _0x7d91ad=0x0;_0x7d91ad<_0x58b54c[_0x3149('0x35')]-0x1;_0x7d91ad++){var _0x20b5ab=_0x58b54c['slice'](0x0,_0x7d91ad+0x1)[_0x3149('0xe4')]('/');if(!_0x34a1e0[_0x20b5ab]){_0x34a1e0[_0x20b5ab]=WORKERFS[_0x3149('0x101')](_0x2e0b1a,_0x58b54c[_0x7d91ad],WORKERFS['DIR_MODE'],0x0);}_0x2e0b1a=_0x34a1e0[_0x20b5ab];}return _0x2e0b1a;}function _0x1078fd(_0x53baa9){var _0x597779=_0x53baa9[_0x3149('0xe2')]('/');return _0x597779[_0x597779[_0x3149('0x35')]-0x1];}Array[_0x3149('0x2a')][_0x3149('0x15b')][_0x3149('0x79')](_0x282f78[_0x3149('0x174')]['files']||[],function(_0x280116){WORKERFS['createNode'](_0x1237d4(_0x280116[_0x3149('0x2b')]),_0x1078fd(_0x280116['name']),WORKERFS[_0x3149('0x187')],0x0,_0x280116,_0x280116[_0x3149('0x188')]);});(_0x282f78[_0x3149('0x174')][_0x3149('0x189')]||[])[_0x3149('0x15b')](function(_0x41d50d){WORKERFS[_0x3149('0x101')](_0x1237d4(_0x41d50d[_0x3149('0x2b')]),_0x1078fd(_0x41d50d[_0x3149('0x2b')]),WORKERFS[_0x3149('0x187')],0x0,_0x41d50d['data']);});(_0x282f78['opts'][_0x3149('0x18a')]||[])[_0x3149('0x15b')](function(_0x2c1d40){_0x2c1d40[_0x3149('0x18b')][_0x3149('0x34')]['forEach'](function(_0x368199){var _0x2681af=_0x368199[_0x3149('0x18c')][_0x3149('0x5d')](0x1);WORKERFS[_0x3149('0x101')](_0x1237d4(_0x2681af),_0x1078fd(_0x2681af),WORKERFS[_0x3149('0x187')],0x0,_0x2c1d40[_0x3149('0x18d')]['slice'](_0x368199['start'],_0x368199['end']));});});return _0x5b9a00;},'createNode':function(_0xf44cf,_0x5d2494,_0x110cbe,_0x3b6e8a,_0x5c6139,_0x413876){var _0x2c4a4a=FS[_0x3149('0x101')](_0xf44cf,_0x5d2494,_0x110cbe);_0x2c4a4a[_0x3149('0x113')]=_0x110cbe;_0x2c4a4a[_0x3149('0x104')]=WORKERFS[_0x3149('0x104')];_0x2c4a4a[_0x3149('0xeb')]=WORKERFS[_0x3149('0xeb')];_0x2c4a4a[_0x3149('0xf3')]=(_0x413876||new Date())['getTime']();assert(WORKERFS[_0x3149('0x187')]!==WORKERFS[_0x3149('0x18e')]);if(_0x110cbe===WORKERFS[_0x3149('0x187')]){_0x2c4a4a[_0x3149('0x122')]=_0x5c6139[_0x3149('0x122')];_0x2c4a4a[_0x3149('0x117')]=_0x5c6139;}else{_0x2c4a4a[_0x3149('0x122')]=0x1000;_0x2c4a4a[_0x3149('0x117')]={};}if(_0xf44cf){_0xf44cf[_0x3149('0x117')][_0x5d2494]=_0x2c4a4a;}return _0x2c4a4a;},'node_ops':{'getattr':function(_0xfd26c5){return{'dev':0x1,'ino':undefined,'mode':_0xfd26c5['mode'],'nlink':0x1,'uid':0x0,'gid':0x0,'rdev':undefined,'size':_0xfd26c5[_0x3149('0x122')],'atime':new Date(_0xfd26c5[_0x3149('0xf3')]),'mtime':new Date(_0xfd26c5[_0x3149('0xf3')]),'ctime':new Date(_0xfd26c5[_0x3149('0xf3')]),'blksize':0x1000,'blocks':Math[_0x3149('0x17')](_0xfd26c5[_0x3149('0x122')]/0x1000)};},'setattr':function(_0x6264cb,_0x2dbcd5){if(_0x2dbcd5[_0x3149('0x113')]!==undefined){_0x6264cb[_0x3149('0x113')]=_0x2dbcd5['mode'];}if(_0x2dbcd5[_0x3149('0xf3')]!==undefined){_0x6264cb[_0x3149('0xf3')]=_0x2dbcd5[_0x3149('0xf3')];}},'lookup':function(_0x21a1a4,_0x50df8c){throw new FS[(_0x3149('0xed'))](0x2);},'mknod':function(_0x517075,_0xf014ae,_0x4adeba,_0x1e8c7b){throw new FS['ErrnoError'](0x1);},'rename':function(_0xef7e7a,_0x2f8805,_0x3b78e1){throw new FS['ErrnoError'](0x1);},'unlink':function(_0x53a9a7,_0x454a59){throw new FS[(_0x3149('0xed'))](0x1);},'rmdir':function(_0x46eb85,_0x20bf62){throw new FS[(_0x3149('0xed'))](0x1);},'readdir':function(_0x3d12c6){var _0x15fcc5=['.','..'];for(var _0x837d39 in _0x3d12c6[_0x3149('0x117')]){if(!_0x3d12c6['contents'][_0x3149('0x46')](_0x837d39)){continue;}_0x15fcc5[_0x3149('0x40')](_0x837d39);}return _0x15fcc5;},'symlink':function(_0x1a6ba7,_0x3cfb3c,_0x235161){throw new FS[(_0x3149('0xed'))](0x1);},'readlink':function(_0x17a9ef){throw new FS['ErrnoError'](0x1);}},'stream_ops':{'read':function(_0x4a3e73,_0x45b22d,_0xdcf1e7,_0x2a85c5,_0x1ce825){if(_0x1ce825>=_0x4a3e73[_0x3149('0xec')][_0x3149('0x122')])return 0x0;var _0x583997=_0x4a3e73['node'][_0x3149('0x117')]['slice'](_0x1ce825,_0x1ce825+_0x2a85c5);var _0xde6224=WORKERFS[_0x3149('0x186')][_0x3149('0x18f')](_0x583997);_0x45b22d[_0x3149('0x3b')](new Uint8Array(_0xde6224),_0xdcf1e7);return _0x583997['size'];},'write':function(_0x2ff6c5,_0x59c0fb,_0x4220e1,_0x4d0e80,_0x2162c1){throw new FS[(_0x3149('0xed'))](0x5);},'llseek':function(_0x2d86f4,_0x5a84b6,_0x617b19){var _0x4f7a79=_0x5a84b6;if(_0x617b19===0x1){_0x4f7a79+=_0x2d86f4[_0x3149('0x185')];}else if(_0x617b19===0x2){if(FS[_0x3149('0x118')](_0x2d86f4[_0x3149('0xec')][_0x3149('0x113')])){_0x4f7a79+=_0x2d86f4[_0x3149('0xec')][_0x3149('0x122')];}}if(_0x4f7a79<0x0){throw new FS[(_0x3149('0xed'))](0x16);}return _0x4f7a79;}}};var FS={'root':null,'mounts':[],'devices':{},'streams':[],'nextInode':0x1,'nameTable':null,'currentPath':'/','initialized':![],'ignorePermissions':!![],'trackingDelegate':{},'tracking':{'openFlags':{'READ':0x1,'WRITE':0x2}},'ErrnoError':null,'genericErrors':{},'filesystems':null,'syncFSRequests':0x0,'handleFSError':function(_0x5d1641){if(!(_0x5d1641 instanceof FS[_0x3149('0xed')]))throw _0x5d1641+_0x3149('0x190')+stackTrace();return ___setErrNo(_0x5d1641['errno']);},'lookupPath':function(_0x191895,_0x272a16){_0x191895=PATH['resolve'](FS[_0x3149('0xe7')](),_0x191895);_0x272a16=_0x272a16||{};if(!_0x191895)return{'path':'','node':null};var _0x150f96={'follow_mount':!![],'recurse_count':0x0};for(var _0x1b68d9 in _0x150f96){if(_0x272a16[_0x1b68d9]===undefined){_0x272a16[_0x1b68d9]=_0x150f96[_0x1b68d9];}}if(_0x272a16[_0x3149('0x191')]>0x8){throw new FS[(_0x3149('0xed'))](0x28);}var _0x1b7850=PATH[_0x3149('0xe1')](_0x191895['split']('/')[_0x3149('0xe3')](function(_0x320899){return!!_0x320899;}),![]);var _0x2aeb93=FS[_0x3149('0x170')];var _0xc47aff='/';for(var _0x130d93=0x0;_0x130d93<_0x1b7850[_0x3149('0x35')];_0x130d93++){var _0x2641cd=_0x130d93===_0x1b7850['length']-0x1;if(_0x2641cd&&_0x272a16[_0x3149('0x12b')]){break;}_0x2aeb93=FS[_0x3149('0x12a')](_0x2aeb93,_0x1b7850[_0x130d93]);_0xc47aff=PATH[_0x3149('0x144')](_0xc47aff,_0x1b7850[_0x130d93]);if(FS[_0x3149('0x192')](_0x2aeb93)){if(!_0x2641cd||_0x2641cd&&_0x272a16[_0x3149('0x193')]){_0x2aeb93=_0x2aeb93[_0x3149('0x194')][_0x3149('0x170')];}}if(!_0x2641cd||_0x272a16[_0x3149('0x195')]){var _0x4cb827=0x0;while(FS['isLink'](_0x2aeb93[_0x3149('0x113')])){var _0x2fd1f5=FS['readlink'](_0xc47aff);_0xc47aff=PATH[_0x3149('0xe9')](PATH[_0x3149('0x196')](_0xc47aff),_0x2fd1f5);var _0x1405dc=FS[_0x3149('0x14f')](_0xc47aff,{'recurse_count':_0x272a16[_0x3149('0x191')]});_0x2aeb93=_0x1405dc[_0x3149('0xec')];if(_0x4cb827++>0x28){throw new FS[(_0x3149('0xed'))](0x28);}}}}return{'path':_0xc47aff,'node':_0x2aeb93};},'getPath':function(_0x3114a3){var _0x868786;while(!![]){if(FS[_0x3149('0x197')](_0x3114a3)){var _0x4f9c58=_0x3114a3[_0x3149('0x132')]['mountpoint'];if(!_0x868786)return _0x4f9c58;return _0x4f9c58[_0x4f9c58[_0x3149('0x35')]-0x1]!=='/'?_0x4f9c58+'/'+_0x868786:_0x4f9c58+_0x868786;}_0x868786=_0x868786?_0x3114a3[_0x3149('0x2b')]+'/'+_0x868786:_0x3114a3[_0x3149('0x2b')];_0x3114a3=_0x3114a3['parent'];}},'hashName':function(_0x3afec8,_0x2a1738){var _0xf1436=0x0;for(var _0x23d1e4=0x0;_0x23d1e4<_0x2a1738[_0x3149('0x35')];_0x23d1e4++){_0xf1436=(_0xf1436<<0x5)-_0xf1436+_0x2a1738[_0x3149('0x89')](_0x23d1e4)|0x0;}return(_0x3afec8+_0xf1436>>>0x0)%FS[_0x3149('0x198')][_0x3149('0x35')];},'hashAddNode':function(_0x56b537){var _0x3a0933=FS[_0x3149('0x199')](_0x56b537[_0x3149('0x12b')]['id'],_0x56b537['name']);_0x56b537[_0x3149('0x19a')]=FS[_0x3149('0x198')][_0x3a0933];FS['nameTable'][_0x3a0933]=_0x56b537;},'hashRemoveNode':function(_0x2cd1ac){var _0x122a94=FS[_0x3149('0x199')](_0x2cd1ac[_0x3149('0x12b')]['id'],_0x2cd1ac[_0x3149('0x2b')]);if(FS[_0x3149('0x198')][_0x122a94]===_0x2cd1ac){FS[_0x3149('0x198')][_0x122a94]=_0x2cd1ac[_0x3149('0x19a')];}else{var _0x59aab5=FS[_0x3149('0x198')][_0x122a94];while(_0x59aab5){if(_0x59aab5['name_next']===_0x2cd1ac){_0x59aab5[_0x3149('0x19a')]=_0x2cd1ac[_0x3149('0x19a')];break;}_0x59aab5=_0x59aab5[_0x3149('0x19a')];}}},'lookupNode':function(_0x2e4e66,_0x45d53f){var _0x5b9709=FS[_0x3149('0x19b')](_0x2e4e66);if(_0x5b9709){throw new FS[(_0x3149('0xed'))](_0x5b9709,_0x2e4e66);}var _0x5004f8=FS[_0x3149('0x199')](_0x2e4e66['id'],_0x45d53f);for(var _0xd9251=FS[_0x3149('0x198')][_0x5004f8];_0xd9251;_0xd9251=_0xd9251[_0x3149('0x19a')]){var _0x28b2af=_0xd9251[_0x3149('0x2b')];if(_0xd9251['parent']['id']===_0x2e4e66['id']&&_0x28b2af===_0x45d53f){return _0xd9251;}}return FS[_0x3149('0x106')](_0x2e4e66,_0x45d53f);},'createNode':function(_0x57db44,_0x464330,_0x43ff2a,_0x3110d5){if(!FS[_0x3149('0x19c')]){FS[_0x3149('0x19c')]=function(_0x2cd27e,_0x2c9f52,_0x20ab8b,_0x536226){if(!_0x2cd27e){_0x2cd27e=this;}this[_0x3149('0x12b')]=_0x2cd27e;this['mount']=_0x2cd27e[_0x3149('0x132')];this[_0x3149('0x194')]=null;this['id']=FS[_0x3149('0x19d')]++;this[_0x3149('0x2b')]=_0x2c9f52;this[_0x3149('0x113')]=_0x20ab8b;this[_0x3149('0x104')]={};this[_0x3149('0xeb')]={};this[_0x3149('0x121')]=_0x536226;};FS[_0x3149('0x19c')][_0x3149('0x2a')]={};var _0x31bc70=0x124|0x49;var _0x15c917=0x92;Object['defineProperties'](FS[_0x3149('0x19c')][_0x3149('0x2a')],{'read':{'get':function(){return(this[_0x3149('0x113')]&_0x31bc70)===_0x31bc70;},'set':function(_0x30b2fe){_0x30b2fe?this[_0x3149('0x113')]|=_0x31bc70:this['mode']&=~_0x31bc70;}},'write':{'get':function(){return(this[_0x3149('0x113')]&_0x15c917)===_0x15c917;},'set':function(_0x18a33c){_0x18a33c?this[_0x3149('0x113')]|=_0x15c917:this['mode']&=~_0x15c917;}},'isFolder':{'get':function(){return FS[_0x3149('0x112')](this['mode']);}},'isDevice':{'get':function(){return FS[_0x3149('0x11c')](this[_0x3149('0x113')]);}}});}var _0x13c430=new FS[(_0x3149('0x19c'))](_0x57db44,_0x464330,_0x43ff2a,_0x3110d5);FS[_0x3149('0x19e')](_0x13c430);return _0x13c430;},'destroyNode':function(_0x14ea2a){FS[_0x3149('0x19f')](_0x14ea2a);},'isRoot':function(_0x39b8a7){return _0x39b8a7===_0x39b8a7[_0x3149('0x12b')];},'isMountpoint':function(_0x46bf8b){return!!_0x46bf8b[_0x3149('0x194')];},'isFile':function(_0x2e12b3){return(_0x2e12b3&0xf000)===0x8000;},'isDir':function(_0x44b940){return(_0x44b940&0xf000)===0x4000;},'isLink':function(_0x49e1c1){return(_0x49e1c1&0xf000)===0xa000;},'isChrdev':function(_0x151191){return(_0x151191&0xf000)===0x2000;},'isBlkdev':function(_0x251a47){return(_0x251a47&0xf000)===0x6000;},'isFIFO':function(_0x8d6630){return(_0x8d6630&0xf000)===0x1000;},'isSocket':function(_0x209b0b){return(_0x209b0b&0xc000)===0xc000;},'flagModes':{'r':0x0,'rs':0x101000,'r+':0x2,'w':0x241,'wx':0x2c1,'xw':0x2c1,'w+':0x242,'wx+':0x2c2,'xw+':0x2c2,'a':0x441,'ax':0x4c1,'xa':0x4c1,'a+':0x442,'ax+':0x4c2,'xa+':0x4c2},'modeStringToFlags':function(_0x50fa57){var _0xb6a74b=FS[_0x3149('0x1a0')][_0x50fa57];if(typeof _0xb6a74b===_0x3149('0x1')){throw new Error(_0x3149('0x1a1')+_0x50fa57);}return _0xb6a74b;},'flagsToPermissionString':function(_0x572a46){var _0x22c222=['r','w','rw'][_0x572a46&0x3];if(_0x572a46&0x200){_0x22c222+='w';}return _0x22c222;},'nodePermissions':function(_0xa18d44,_0x515023){if(FS[_0x3149('0x9e')]){return 0x0;}if(_0x515023[_0x3149('0x5b')]('r')!==-0x1&&!(_0xa18d44['mode']&0x124)){return 0xd;}else if(_0x515023['indexOf']('w')!==-0x1&&!(_0xa18d44[_0x3149('0x113')]&0x92)){return 0xd;}else if(_0x515023[_0x3149('0x5b')]('x')!==-0x1&&!(_0xa18d44['mode']&0x49)){return 0xd;}return 0x0;},'mayLookup':function(_0x429006){var _0x1bf8ad=FS['nodePermissions'](_0x429006,'x');if(_0x1bf8ad)return _0x1bf8ad;if(!_0x429006[_0x3149('0x104')]['lookup'])return 0xd;return 0x0;},'mayCreate':function(_0x9457d2,_0x4b8022){try{var _0x4535c6=FS[_0x3149('0x12a')](_0x9457d2,_0x4b8022);return 0x11;}catch(_0x2456f1){}return FS[_0x3149('0x1a2')](_0x9457d2,'wx');},'mayDelete':function(_0x82ed75,_0x347cd2,_0xc90fda){var _0x33c3a8;try{_0x33c3a8=FS['lookupNode'](_0x82ed75,_0x347cd2);}catch(_0x207345){return _0x207345[_0x3149('0x173')];}var _0x2c0e2e=FS[_0x3149('0x1a2')](_0x82ed75,'wx');if(_0x2c0e2e){return _0x2c0e2e;}if(_0xc90fda){if(!FS[_0x3149('0x112')](_0x33c3a8['mode'])){return 0x14;}if(FS[_0x3149('0x197')](_0x33c3a8)||FS[_0x3149('0x1a3')](_0x33c3a8)===FS[_0x3149('0xe7')]()){return 0x10;}}else{if(FS[_0x3149('0x112')](_0x33c3a8[_0x3149('0x113')])){return 0x15;}}return 0x0;},'mayOpen':function(_0x46287d,_0x2b6bdc){if(!_0x46287d){return 0x2;}if(FS[_0x3149('0x123')](_0x46287d[_0x3149('0x113')])){return 0x28;}else if(FS['isDir'](_0x46287d[_0x3149('0x113')])){if(FS[_0x3149('0x1a4')](_0x2b6bdc)!=='r'||_0x2b6bdc&0x200){return 0x15;}}return FS[_0x3149('0x1a2')](_0x46287d,FS['flagsToPermissionString'](_0x2b6bdc));},'MAX_OPEN_FDS':0x1000,'nextfd':function(_0x91a324,_0x14a52b){_0x91a324=_0x91a324||0x0;_0x14a52b=_0x14a52b||FS[_0x3149('0x1a5')];for(var _0xa61068=_0x91a324;_0xa61068<=_0x14a52b;_0xa61068++){if(!FS[_0x3149('0x1a6')][_0xa61068]){return _0xa61068;}}throw new FS[(_0x3149('0xed'))](0x18);},'getStream':function(_0x18d6c3){return FS[_0x3149('0x1a6')][_0x18d6c3];},'createStream':function(_0x4ce112,_0x1d8231,_0x50af6a){if(!FS['FSStream']){FS[_0x3149('0x1a7')]=function(){};FS[_0x3149('0x1a7')][_0x3149('0x2a')]={};Object[_0x3149('0x1a8')](FS[_0x3149('0x1a7')][_0x3149('0x2a')],{'object':{'get':function(){return this[_0x3149('0xec')];},'set':function(_0x479cb0){this[_0x3149('0xec')]=_0x479cb0;}},'isRead':{'get':function(){return(this['flags']&0x200003)!==0x1;}},'isWrite':{'get':function(){return(this[_0x3149('0x183')]&0x200003)!==0x0;}},'isAppend':{'get':function(){return this['flags']&0x400;}}});}var _0x27a706=new FS[(_0x3149('0x1a7'))]();for(var _0x339da9 in _0x4ce112){_0x27a706[_0x339da9]=_0x4ce112[_0x339da9];}_0x4ce112=_0x27a706;var _0x331506=FS[_0x3149('0x1a9')](_0x1d8231,_0x50af6a);_0x4ce112['fd']=_0x331506;FS[_0x3149('0x1a6')][_0x331506]=_0x4ce112;return _0x4ce112;},'closeStream':function(_0x3b7891){FS['streams'][_0x3b7891]=null;},'chrdev_stream_ops':{'open':function(_0x4c5c16){var _0x5ccf00=FS[_0x3149('0x1aa')](_0x4c5c16[_0x3149('0xec')][_0x3149('0x121')]);_0x4c5c16[_0x3149('0xeb')]=_0x5ccf00[_0x3149('0xeb')];if(_0x4c5c16[_0x3149('0xeb')][_0x3149('0x36')]){_0x4c5c16[_0x3149('0xeb')][_0x3149('0x36')](_0x4c5c16);}},'llseek':function(){throw new FS[(_0x3149('0xed'))](0x1d);}},'major':function(_0x28dea8){return _0x28dea8>>0x8;},'minor':function(_0x1060a2){return _0x1060a2&0xff;},'makedev':function(_0x2e6bf4,_0x4aafe5){return _0x2e6bf4<<0x8|_0x4aafe5;},'registerDevice':function(_0x447025,_0x4ec408){FS[_0x3149('0x1ab')][_0x447025]={'stream_ops':_0x4ec408};},'getDevice':function(_0x431246){return FS[_0x3149('0x1ab')][_0x431246];},'getMounts':function(_0x4195e1){var _0x4beeb1=[];var _0x47efda=[_0x4195e1];while(_0x47efda[_0x3149('0x35')]){var _0x5d7b83=_0x47efda[_0x3149('0x1ac')]();_0x4beeb1['push'](_0x5d7b83);_0x47efda[_0x3149('0x40')][_0x3149('0x78')](_0x47efda,_0x5d7b83[_0x3149('0x1ad')]);}return _0x4beeb1;},'syncfs':function(_0x4070d4,_0x303538){if(typeof _0x4070d4===_0x3149('0x4a')){_0x303538=_0x4070d4;_0x4070d4=![];}FS[_0x3149('0x1ae')]++;if(FS[_0x3149('0x1ae')]>0x1){console[_0x3149('0x64')]('warning:\x20'+FS[_0x3149('0x1ae')]+_0x3149('0x1af'));}var _0x4a9ed5=FS[_0x3149('0x1b0')](FS[_0x3149('0x170')][_0x3149('0x132')]);var _0x53b7b5=0x0;function _0x2097aa(_0x94783f){FS[_0x3149('0x1ae')]--;return _0x303538(_0x94783f);}function _0x3a391f(_0x35818e){if(_0x35818e){if(!_0x3a391f['errored']){_0x3a391f[_0x3149('0x15e')]=!![];return _0x2097aa(_0x35818e);}return;}if(++_0x53b7b5>=_0x4a9ed5[_0x3149('0x35')]){_0x2097aa(null);}};_0x4a9ed5[_0x3149('0x15b')](function(_0x244891){if(!_0x244891['type']['syncfs']){return _0x3a391f(null);}_0x244891[_0x3149('0x15c')][_0x3149('0x1b1')](_0x244891,_0x4070d4,_0x3a391f);});},'mount':function(_0x27f48f,_0x302b26,_0x482854){var _0x4c5697=_0x482854==='/';var _0x311d96=!_0x482854;var _0x166e7e;if(_0x4c5697&&FS[_0x3149('0x170')]){throw new FS[(_0x3149('0xed'))](0x10);}else if(!_0x4c5697&&!_0x311d96){var _0x2b2c16=FS[_0x3149('0x14f')](_0x482854,{'follow_mount':![]});_0x482854=_0x2b2c16[_0x3149('0x4c')];_0x166e7e=_0x2b2c16[_0x3149('0xec')];if(FS[_0x3149('0x192')](_0x166e7e)){throw new FS[(_0x3149('0xed'))](0x10);}if(!FS[_0x3149('0x112')](_0x166e7e[_0x3149('0x113')])){throw new FS[(_0x3149('0xed'))](0x14);}}var _0x3ab707={'type':_0x27f48f,'opts':_0x302b26,'mountpoint':_0x482854,'mounts':[]};var _0x25f4d9=_0x27f48f['mount'](_0x3ab707);_0x25f4d9[_0x3149('0x132')]=_0x3ab707;_0x3ab707[_0x3149('0x170')]=_0x25f4d9;if(_0x4c5697){FS[_0x3149('0x170')]=_0x25f4d9;}else if(_0x166e7e){_0x166e7e[_0x3149('0x194')]=_0x3ab707;if(_0x166e7e[_0x3149('0x132')]){_0x166e7e[_0x3149('0x132')]['mounts'][_0x3149('0x40')](_0x3ab707);}}return _0x25f4d9;},'unmount':function(_0x359644){var _0x28dff8=FS['lookupPath'](_0x359644,{'follow_mount':![]});if(!FS[_0x3149('0x192')](_0x28dff8['node'])){throw new FS[(_0x3149('0xed'))](0x16);}var _0x29497c=_0x28dff8[_0x3149('0xec')];var _0x4b5f5a=_0x29497c[_0x3149('0x194')];var _0x5a3d8e=FS[_0x3149('0x1b0')](_0x4b5f5a);Object['keys'](FS[_0x3149('0x198')])[_0x3149('0x15b')](function(_0x28cdb9){var _0x557d16=FS[_0x3149('0x198')][_0x28cdb9];while(_0x557d16){var _0x36e7cd=_0x557d16[_0x3149('0x19a')];if(_0x5a3d8e[_0x3149('0x5b')](_0x557d16[_0x3149('0x132')])!==-0x1){FS[_0x3149('0x1b2')](_0x557d16);}_0x557d16=_0x36e7cd;}});_0x29497c['mounted']=null;var _0x481d24=_0x29497c[_0x3149('0x132')][_0x3149('0x1ad')][_0x3149('0x5b')](_0x4b5f5a);_0x29497c['mount'][_0x3149('0x1ad')][_0x3149('0xe0')](_0x481d24,0x1);},'lookup':function(_0x20ea97,_0x45f9aa){return _0x20ea97[_0x3149('0x104')]['lookup'](_0x20ea97,_0x45f9aa);},'mknod':function(_0x5d3266,_0x37ff73,_0x55eed4){var _0x3bfef4=FS['lookupPath'](_0x5d3266,{'parent':!![]});var _0x197cb0=_0x3bfef4[_0x3149('0xec')];var _0x330c1c=PATH[_0x3149('0x1b3')](_0x5d3266);if(!_0x330c1c||_0x330c1c==='.'||_0x330c1c==='..'){throw new FS['ErrnoError'](0x16);}var _0x4ca56c=FS[_0x3149('0x1b4')](_0x197cb0,_0x330c1c);if(_0x4ca56c){throw new FS['ErrnoError'](_0x4ca56c);}if(!_0x197cb0[_0x3149('0x104')][_0x3149('0x107')]){throw new FS[(_0x3149('0xed'))](0x1);}return _0x197cb0[_0x3149('0x104')][_0x3149('0x107')](_0x197cb0,_0x330c1c,_0x37ff73,_0x55eed4);},'create':function(_0x57ddd7,_0x2c98f1){_0x2c98f1=_0x2c98f1!==undefined?_0x2c98f1:0x1b6;_0x2c98f1&=0xfff;_0x2c98f1|=0x8000;return FS['mknod'](_0x57ddd7,_0x2c98f1,0x0);},'mkdir':function(_0x209aeb,_0x79bd31){_0x79bd31=_0x79bd31!==undefined?_0x79bd31:0x1ff;_0x79bd31&=0x1ff|0x200;_0x79bd31|=0x4000;return FS[_0x3149('0x107')](_0x209aeb,_0x79bd31,0x0);},'mkdirTree':function(_0x5053fe,_0x47c309){var _0xe9f300=_0x5053fe[_0x3149('0xe2')]('/');var _0x12ae36='';for(var _0x4748e1=0x0;_0x4748e1<_0xe9f300['length'];++_0x4748e1){if(!_0xe9f300[_0x4748e1])continue;_0x12ae36+='/'+_0xe9f300[_0x4748e1];try{FS[_0x3149('0x151')](_0x12ae36,_0x47c309);}catch(_0x164977){if(_0x164977[_0x3149('0x173')]!=0x11)throw _0x164977;}}},'mkdev':function(_0x460007,_0x5e0807,_0x12b545){if(typeof _0x12b545===_0x3149('0x1')){_0x12b545=_0x5e0807;_0x5e0807=0x1b6;}_0x5e0807|=0x2000;return FS[_0x3149('0x107')](_0x460007,_0x5e0807,_0x12b545);},'symlink':function(_0x51d1e2,_0x59fdc7){if(!PATH[_0x3149('0xe9')](_0x51d1e2)){throw new FS[(_0x3149('0xed'))](0x2);}var _0x22626e=FS[_0x3149('0x14f')](_0x59fdc7,{'parent':!![]});var _0x532618=_0x22626e[_0x3149('0xec')];if(!_0x532618){throw new FS[(_0x3149('0xed'))](0x2);}var _0x4ce93d=PATH['basename'](_0x59fdc7);var _0x1005c9=FS[_0x3149('0x1b4')](_0x532618,_0x4ce93d);if(_0x1005c9){throw new FS[(_0x3149('0xed'))](_0x1005c9);}if(!_0x532618['node_ops'][_0x3149('0x10a')]){throw new FS[(_0x3149('0xed'))](0x1);}return _0x532618[_0x3149('0x104')][_0x3149('0x10a')](_0x532618,_0x4ce93d,_0x51d1e2);},'rename':function(_0x57b36a,_0x5e660c){var _0x806f72=PATH[_0x3149('0x196')](_0x57b36a);var _0xf9ed8b=PATH[_0x3149('0x196')](_0x5e660c);var _0x108adc=PATH['basename'](_0x57b36a);var _0x293640=PATH[_0x3149('0x1b3')](_0x5e660c);var _0x3bc0f3,_0x48c7ee,_0x70c1f2;try{_0x3bc0f3=FS[_0x3149('0x14f')](_0x57b36a,{'parent':!![]});_0x48c7ee=_0x3bc0f3[_0x3149('0xec')];_0x3bc0f3=FS[_0x3149('0x14f')](_0x5e660c,{'parent':!![]});_0x70c1f2=_0x3bc0f3[_0x3149('0xec')];}catch(_0x32c7c1){throw new FS[(_0x3149('0xed'))](0x10);}if(!_0x48c7ee||!_0x70c1f2)throw new FS[(_0x3149('0xed'))](0x2);if(_0x48c7ee[_0x3149('0x132')]!==_0x70c1f2[_0x3149('0x132')]){throw new FS[(_0x3149('0xed'))](0x12);}var _0x4a86a2=FS['lookupNode'](_0x48c7ee,_0x108adc);var _0x3576c4=PATH['relative'](_0x57b36a,_0xf9ed8b);if(_0x3576c4[_0x3149('0x7b')](0x0)!=='.'){throw new FS[(_0x3149('0xed'))](0x16);}_0x3576c4=PATH[_0x3149('0x181')](_0x5e660c,_0x806f72);if(_0x3576c4[_0x3149('0x7b')](0x0)!=='.'){throw new FS[(_0x3149('0xed'))](0x27);}var _0x1bae0e;try{_0x1bae0e=FS[_0x3149('0x12a')](_0x70c1f2,_0x293640);}catch(_0x20ea98){}if(_0x4a86a2===_0x1bae0e){return;}var _0x20dc16=FS[_0x3149('0x112')](_0x4a86a2[_0x3149('0x113')]);var _0x313851=FS[_0x3149('0x1b5')](_0x48c7ee,_0x108adc,_0x20dc16);if(_0x313851){throw new FS[(_0x3149('0xed'))](_0x313851);}_0x313851=_0x1bae0e?FS['mayDelete'](_0x70c1f2,_0x293640,_0x20dc16):FS[_0x3149('0x1b4')](_0x70c1f2,_0x293640);if(_0x313851){throw new FS[(_0x3149('0xed'))](_0x313851);}if(!_0x48c7ee[_0x3149('0x104')][_0x3149('0x108')]){throw new FS[(_0x3149('0xed'))](0x1);}if(FS[_0x3149('0x192')](_0x4a86a2)||_0x1bae0e&&FS[_0x3149('0x192')](_0x1bae0e)){throw new FS['ErrnoError'](0x10);}if(_0x70c1f2!==_0x48c7ee){_0x313851=FS[_0x3149('0x1a2')](_0x48c7ee,'w');if(_0x313851){throw new FS[(_0x3149('0xed'))](_0x313851);}}try{if(FS['trackingDelegate'][_0x3149('0x1b6')]){FS['trackingDelegate'][_0x3149('0x1b6')](_0x57b36a,_0x5e660c);}}catch(_0x2a6340){console[_0x3149('0x64')](_0x3149('0x1b7')+_0x57b36a+_0x3149('0x1b8')+_0x5e660c+_0x3149('0x1b9')+_0x2a6340[_0x3149('0x1ba')]);}FS[_0x3149('0x19f')](_0x4a86a2);try{_0x48c7ee[_0x3149('0x104')][_0x3149('0x108')](_0x4a86a2,_0x70c1f2,_0x293640);}catch(_0x24f2c1){throw _0x24f2c1;}finally{FS[_0x3149('0x19e')](_0x4a86a2);}try{if(FS['trackingDelegate'][_0x3149('0x1bb')])FS[_0x3149('0x1bc')][_0x3149('0x1bb')](_0x57b36a,_0x5e660c);}catch(_0x39d327){console[_0x3149('0x64')]('FS.trackingDelegate[\x27onMovePath\x27](\x27'+_0x57b36a+'\x27,\x20\x27'+_0x5e660c+_0x3149('0x1b9')+_0x39d327[_0x3149('0x1ba')]);}},'rmdir':function(_0x29a844){var _0x5731eb=FS[_0x3149('0x14f')](_0x29a844,{'parent':!![]});var _0x4edba0=_0x5731eb[_0x3149('0xec')];var _0x57bbaa=PATH[_0x3149('0x1b3')](_0x29a844);var _0x322d2a=FS[_0x3149('0x12a')](_0x4edba0,_0x57bbaa);var _0x322711=FS[_0x3149('0x1b5')](_0x4edba0,_0x57bbaa,!![]);if(_0x322711){throw new FS['ErrnoError'](_0x322711);}if(!_0x4edba0['node_ops'][_0x3149('0x155')]){throw new FS[(_0x3149('0xed'))](0x1);}if(FS[_0x3149('0x192')](_0x322d2a)){throw new FS[(_0x3149('0xed'))](0x10);}try{if(FS[_0x3149('0x1bc')]['willDeletePath']){FS[_0x3149('0x1bc')][_0x3149('0x1bd')](_0x29a844);}}catch(_0x2c5643){console[_0x3149('0x64')](_0x3149('0x1be')+_0x29a844+_0x3149('0x1b9')+_0x2c5643['message']);}_0x4edba0[_0x3149('0x104')]['rmdir'](_0x4edba0,_0x57bbaa);FS[_0x3149('0x1b2')](_0x322d2a);try{if(FS[_0x3149('0x1bc')][_0x3149('0x1bf')])FS[_0x3149('0x1bc')][_0x3149('0x1bf')](_0x29a844);}catch(_0x1d704c){console[_0x3149('0x64')](_0x3149('0x1c0')+_0x29a844+_0x3149('0x1b9')+_0x1d704c['message']);}},'readdir':function(_0xd8a878){var _0xe7a98e=FS[_0x3149('0x14f')](_0xd8a878,{'follow':!![]});var _0x36e096=_0xe7a98e[_0x3149('0xec')];if(!_0x36e096['node_ops'][_0x3149('0x145')]){throw new FS[(_0x3149('0xed'))](0x14);}return _0x36e096[_0x3149('0x104')]['readdir'](_0x36e096);},'unlink':function(_0x18145b){var _0x59c95a=FS[_0x3149('0x14f')](_0x18145b,{'parent':!![]});var _0x1f788b=_0x59c95a[_0x3149('0xec')];var _0x64f02b=PATH[_0x3149('0x1b3')](_0x18145b);var _0xafbefb=FS[_0x3149('0x12a')](_0x1f788b,_0x64f02b);var _0x522434=FS['mayDelete'](_0x1f788b,_0x64f02b,![]);if(_0x522434){throw new FS[(_0x3149('0xed'))](_0x522434);}if(!_0x1f788b[_0x3149('0x104')]['unlink']){throw new FS[(_0x3149('0xed'))](0x1);}if(FS[_0x3149('0x192')](_0xafbefb)){throw new FS[(_0x3149('0xed'))](0x10);}try{if(FS[_0x3149('0x1bc')][_0x3149('0x1bd')]){FS[_0x3149('0x1bc')][_0x3149('0x1bd')](_0x18145b);}}catch(_0x4f5870){console[_0x3149('0x64')](_0x3149('0x1be')+_0x18145b+_0x3149('0x1b9')+_0x4f5870[_0x3149('0x1ba')]);}_0x1f788b[_0x3149('0x104')]['unlink'](_0x1f788b,_0x64f02b);FS[_0x3149('0x1b2')](_0xafbefb);try{if(FS[_0x3149('0x1bc')][_0x3149('0x1bf')])FS['trackingDelegate'][_0x3149('0x1bf')](_0x18145b);}catch(_0x3d0dbe){console[_0x3149('0x64')]('FS.trackingDelegate[\x27onDeletePath\x27](\x27'+_0x18145b+_0x3149('0x1b9')+_0x3d0dbe[_0x3149('0x1ba')]);}},'readlink':function(_0x5edaab){var _0x54641c=FS[_0x3149('0x14f')](_0x5edaab);var _0x2a94e5=_0x54641c[_0x3149('0xec')];if(!_0x2a94e5){throw new FS[(_0x3149('0xed'))](0x2);}if(!_0x2a94e5[_0x3149('0x104')]['readlink']){throw new FS[(_0x3149('0xed'))](0x16);}return PATH[_0x3149('0xe9')](FS[_0x3149('0x1a3')](_0x2a94e5[_0x3149('0x12b')]),_0x2a94e5['node_ops'][_0x3149('0x1c1')](_0x2a94e5));},'stat':function(_0x7cc6b2,_0x4f9a40){var _0x8bbd76=FS['lookupPath'](_0x7cc6b2,{'follow':!_0x4f9a40});var _0x197079=_0x8bbd76[_0x3149('0xec')];if(!_0x197079){throw new FS[(_0x3149('0xed'))](0x2);}if(!_0x197079['node_ops'][_0x3149('0x10c')]){throw new FS[(_0x3149('0xed'))](0x1);}return _0x197079[_0x3149('0x104')][_0x3149('0x10c')](_0x197079);},'lstat':function(_0x2b58d9){return FS[_0x3149('0x154')](_0x2b58d9,!![]);},'chmod':function(_0x27f649,_0x25c06f,_0x2be530){var _0x31e48b;if(typeof _0x27f649===_0x3149('0x80')){var _0x28473b=FS[_0x3149('0x14f')](_0x27f649,{'follow':!_0x2be530});_0x31e48b=_0x28473b[_0x3149('0xec')];}else{_0x31e48b=_0x27f649;}if(!_0x31e48b[_0x3149('0x104')]['setattr']){throw new FS['ErrnoError'](0x1);}_0x31e48b[_0x3149('0x104')][_0x3149('0x105')](_0x31e48b,{'mode':_0x25c06f&0xfff|_0x31e48b[_0x3149('0x113')]&~0xfff,'timestamp':Date[_0x3149('0xd1')]()});},'lchmod':function(_0x8fd98d,_0x586383){FS['chmod'](_0x8fd98d,_0x586383,!![]);},'fchmod':function(_0x3a8eb0,_0x30f630){var _0x220ea1=FS[_0x3149('0x1c2')](_0x3a8eb0);if(!_0x220ea1){throw new FS[(_0x3149('0xed'))](0x9);}FS[_0x3149('0x152')](_0x220ea1[_0x3149('0xec')],_0x30f630);},'chown':function(_0x2cc297,_0x24e9f0,_0x17e76a,_0x845deb){var _0x18cffa;if(typeof _0x2cc297===_0x3149('0x80')){var _0x1a6eff=FS[_0x3149('0x14f')](_0x2cc297,{'follow':!_0x845deb});_0x18cffa=_0x1a6eff[_0x3149('0xec')];}else{_0x18cffa=_0x2cc297;}if(!_0x18cffa[_0x3149('0x104')][_0x3149('0x105')]){throw new FS[(_0x3149('0xed'))](0x1);}_0x18cffa['node_ops'][_0x3149('0x105')](_0x18cffa,{'timestamp':Date[_0x3149('0xd1')]()});},'lchown':function(_0x1b97d4,_0x1b3346,_0x16e9ba){FS[_0x3149('0x1c3')](_0x1b97d4,_0x1b3346,_0x16e9ba,!![]);},'fchown':function(_0x4283ac,_0x4bb53d,_0x4a5228){var _0x49c9d3=FS[_0x3149('0x1c2')](_0x4283ac);if(!_0x49c9d3){throw new FS[(_0x3149('0xed'))](0x9);}FS[_0x3149('0x1c3')](_0x49c9d3[_0x3149('0xec')],_0x4bb53d,_0x4a5228);},'truncate':function(_0x406e30,_0x40e694){if(_0x40e694<0x0){throw new FS['ErrnoError'](0x16);}var _0x23fe80;if(typeof _0x406e30===_0x3149('0x80')){var _0xd6899f=FS[_0x3149('0x14f')](_0x406e30,{'follow':!![]});_0x23fe80=_0xd6899f[_0x3149('0xec')];}else{_0x23fe80=_0x406e30;}if(!_0x23fe80[_0x3149('0x104')][_0x3149('0x105')]){throw new FS[(_0x3149('0xed'))](0x1);}if(FS[_0x3149('0x112')](_0x23fe80[_0x3149('0x113')])){throw new FS[(_0x3149('0xed'))](0x15);}if(!FS[_0x3149('0x118')](_0x23fe80[_0x3149('0x113')])){throw new FS[(_0x3149('0xed'))](0x16);}var _0x20052b=FS['nodePermissions'](_0x23fe80,'w');if(_0x20052b){throw new FS[(_0x3149('0xed'))](_0x20052b);}_0x23fe80['node_ops'][_0x3149('0x105')](_0x23fe80,{'size':_0x40e694,'timestamp':Date['now']()});},'ftruncate':function(_0x577be3,_0x4d2e19){var _0xa6e8ff=FS['getStream'](_0x577be3);if(!_0xa6e8ff){throw new FS[(_0x3149('0xed'))](0x9);}if((_0xa6e8ff[_0x3149('0x183')]&0x200003)===0x0){throw new FS['ErrnoError'](0x16);}FS[_0x3149('0x1c4')](_0xa6e8ff[_0x3149('0xec')],_0x4d2e19);},'utime':function(_0x21447e,_0x26853e,_0x35a6d5){var _0x2deb10=FS[_0x3149('0x14f')](_0x21447e,{'follow':!![]});var _0x449677=_0x2deb10[_0x3149('0xec')];_0x449677[_0x3149('0x104')][_0x3149('0x105')](_0x449677,{'timestamp':Math[_0x3149('0x84')](_0x26853e,_0x35a6d5)});},'open':function(_0x170618,_0x50286a,_0x3d1923,_0x23e83a,_0x416bcf){if(_0x170618===''){throw new FS[(_0x3149('0xed'))](0x2);}_0x50286a=typeof _0x50286a==='string'?FS[_0x3149('0x1c5')](_0x50286a):_0x50286a;_0x3d1923=typeof _0x3d1923===_0x3149('0x1')?0x1b6:_0x3d1923;if(_0x50286a&0x40){_0x3d1923=_0x3d1923&0xfff|0x8000;}else{_0x3d1923=0x0;}var _0x536eb5;if(typeof _0x170618==='object'){_0x536eb5=_0x170618;}else{_0x170618=PATH[_0x3149('0xe6')](_0x170618);try{var _0x5f2776=FS[_0x3149('0x14f')](_0x170618,{'follow':!(_0x50286a&0x20000)});_0x536eb5=_0x5f2776[_0x3149('0xec')];}catch(_0xce84ab){}}var _0x36e329=![];if(_0x50286a&0x40){if(_0x536eb5){if(_0x50286a&0x80){throw new FS['ErrnoError'](0x11);}}else{_0x536eb5=FS[_0x3149('0x107')](_0x170618,_0x3d1923,0x0);_0x36e329=!![];}}if(!_0x536eb5){throw new FS[(_0x3149('0xed'))](0x2);}if(FS[_0x3149('0x11c')](_0x536eb5[_0x3149('0x113')])){_0x50286a&=~0x200;}if(_0x50286a&0x10000&&!FS[_0x3149('0x112')](_0x536eb5['mode'])){throw new FS[(_0x3149('0xed'))](0x14);}if(!_0x36e329){var _0x389969=FS[_0x3149('0x1c6')](_0x536eb5,_0x50286a);if(_0x389969){throw new FS[(_0x3149('0xed'))](_0x389969);}}if(_0x50286a&0x200){FS[_0x3149('0x1c4')](_0x536eb5,0x0);}_0x50286a&=~(0x80|0x200);var _0x5300d5=FS[_0x3149('0x1c7')]({'node':_0x536eb5,'path':FS['getPath'](_0x536eb5),'flags':_0x50286a,'seekable':!![],'position':0x0,'stream_ops':_0x536eb5['stream_ops'],'ungotten':[],'error':![]},_0x23e83a,_0x416bcf);if(_0x5300d5[_0x3149('0xeb')][_0x3149('0x36')]){_0x5300d5[_0x3149('0xeb')][_0x3149('0x36')](_0x5300d5);}if(Module[_0x3149('0x1c8')]&&!(_0x50286a&0x1)){if(!FS[_0x3149('0x1c9')])FS['readFiles']={};if(!(_0x170618 in FS[_0x3149('0x1c9')])){FS[_0x3149('0x1c9')][_0x170618]=0x1;console[_0x3149('0x64')](_0x3149('0x1ca')+_0x170618);}}try{if(FS[_0x3149('0x1bc')][_0x3149('0x1cb')]){var _0x255b25=0x0;if((_0x50286a&0x200003)!==0x1){_0x255b25|=FS[_0x3149('0x1cc')]['openFlags']['READ'];}if((_0x50286a&0x200003)!==0x0){_0x255b25|=FS[_0x3149('0x1cc')][_0x3149('0x1cd')][_0x3149('0x1ce')];}FS[_0x3149('0x1bc')]['onOpenFile'](_0x170618,_0x255b25);}}catch(_0x1b070f){console[_0x3149('0x64')](_0x3149('0x1cf')+_0x170618+'\x27,\x20flags)\x20threw\x20an\x20exception:\x20'+_0x1b070f[_0x3149('0x1ba')]);}return _0x5300d5;},'close':function(_0x21d12a){if(FS[_0x3149('0x1d0')](_0x21d12a)){throw new FS[(_0x3149('0xed'))](0x9);}if(_0x21d12a[_0x3149('0x1d1')])_0x21d12a[_0x3149('0x1d1')]=null;try{if(_0x21d12a[_0x3149('0xeb')][_0x3149('0x1d2')]){_0x21d12a[_0x3149('0xeb')][_0x3149('0x1d2')](_0x21d12a);}}catch(_0x211820){throw _0x211820;}finally{FS[_0x3149('0x1d3')](_0x21d12a['fd']);}_0x21d12a['fd']=null;},'isClosed':function(_0x341cb8){return _0x341cb8['fd']===null;},'llseek':function(_0x3ca606,_0x275032,_0x1d5e81){if(FS['isClosed'](_0x3ca606)){throw new FS[(_0x3149('0xed'))](0x9);}if(!_0x3ca606[_0x3149('0xef')]||!_0x3ca606[_0x3149('0xeb')][_0x3149('0x10b')]){throw new FS[(_0x3149('0xed'))](0x1d);}if(_0x1d5e81!=0x0&&_0x1d5e81!=0x1&&_0x1d5e81!=0x2){throw new FS[(_0x3149('0xed'))](0x16);}_0x3ca606[_0x3149('0x185')]=_0x3ca606[_0x3149('0xeb')]['llseek'](_0x3ca606,_0x275032,_0x1d5e81);_0x3ca606[_0x3149('0x1d4')]=[];return _0x3ca606[_0x3149('0x185')];},'read':function(_0xc5f483,_0x5e985c,_0xf388e,_0x35b5b4,_0x58fa7f){if(_0x35b5b4<0x0||_0x58fa7f<0x0){throw new FS[(_0x3149('0xed'))](0x16);}if(FS[_0x3149('0x1d0')](_0xc5f483)){throw new FS['ErrnoError'](0x9);}if((_0xc5f483[_0x3149('0x183')]&0x200003)===0x1){throw new FS[(_0x3149('0xed'))](0x9);}if(FS['isDir'](_0xc5f483[_0x3149('0xec')][_0x3149('0x113')])){throw new FS[(_0x3149('0xed'))](0x15);}if(!_0xc5f483[_0x3149('0xeb')][_0x3149('0x4b')]){throw new FS[(_0x3149('0xed'))](0x16);}var _0x1c9a3e=typeof _0x58fa7f!==_0x3149('0x1');if(!_0x1c9a3e){_0x58fa7f=_0xc5f483[_0x3149('0x185')];}else if(!_0xc5f483[_0x3149('0xef')]){throw new FS[(_0x3149('0xed'))](0x1d);}var _0xb0be9f=_0xc5f483[_0x3149('0xeb')][_0x3149('0x4b')](_0xc5f483,_0x5e985c,_0xf388e,_0x35b5b4,_0x58fa7f);if(!_0x1c9a3e)_0xc5f483[_0x3149('0x185')]+=_0xb0be9f;return _0xb0be9f;},'write':function(_0x71ba3e,_0x2d60b5,_0x9fbe2,_0x37fbf3,_0x2266d9,_0x5e594f){if(_0x37fbf3<0x0||_0x2266d9<0x0){throw new FS[(_0x3149('0xed'))](0x16);}if(FS[_0x3149('0x1d0')](_0x71ba3e)){throw new FS[(_0x3149('0xed'))](0x9);}if((_0x71ba3e[_0x3149('0x183')]&0x200003)===0x0){throw new FS['ErrnoError'](0x9);}if(FS[_0x3149('0x112')](_0x71ba3e[_0x3149('0xec')][_0x3149('0x113')])){throw new FS[(_0x3149('0xed'))](0x15);}if(!_0x71ba3e[_0x3149('0xeb')][_0x3149('0x10d')]){throw new FS[(_0x3149('0xed'))](0x16);}if(_0x71ba3e[_0x3149('0x183')]&0x400){FS[_0x3149('0x10b')](_0x71ba3e,0x0,0x2);}var _0xe8564=typeof _0x2266d9!==_0x3149('0x1');if(!_0xe8564){_0x2266d9=_0x71ba3e['position'];}else if(!_0x71ba3e[_0x3149('0xef')]){throw new FS[(_0x3149('0xed'))](0x1d);}var _0x1640c9=_0x71ba3e[_0x3149('0xeb')][_0x3149('0x10d')](_0x71ba3e,_0x2d60b5,_0x9fbe2,_0x37fbf3,_0x2266d9,_0x5e594f);if(!_0xe8564)_0x71ba3e[_0x3149('0x185')]+=_0x1640c9;try{if(_0x71ba3e[_0x3149('0x4c')]&&FS[_0x3149('0x1bc')][_0x3149('0x1d5')])FS[_0x3149('0x1bc')][_0x3149('0x1d5')](_0x71ba3e['path']);}catch(_0xb86acb){console[_0x3149('0x64')]('FS.trackingDelegate[\x27onWriteToFile\x27](\x27'+_0x71ba3e['path']+_0x3149('0x1b9')+_0xb86acb['message']);}return _0x1640c9;},'allocate':function(_0x26033a,_0x5d0e26,_0x4df3f4){if(FS['isClosed'](_0x26033a)){throw new FS[(_0x3149('0xed'))](0x9);}if(_0x5d0e26<0x0||_0x4df3f4<=0x0){throw new FS[(_0x3149('0xed'))](0x16);}if((_0x26033a[_0x3149('0x183')]&0x200003)===0x0){throw new FS[(_0x3149('0xed'))](0x9);}if(!FS[_0x3149('0x118')](_0x26033a[_0x3149('0xec')][_0x3149('0x113')])&&!FS[_0x3149('0x112')](_0x26033a[_0x3149('0xec')][_0x3149('0x113')])){throw new FS[(_0x3149('0xed'))](0x13);}if(!_0x26033a['stream_ops'][_0x3149('0x10e')]){throw new FS['ErrnoError'](0x5f);}_0x26033a[_0x3149('0xeb')]['allocate'](_0x26033a,_0x5d0e26,_0x4df3f4);},'mmap':function(_0x26724d,_0xd90910,_0x3400bd,_0x2457e9,_0x3f5ba9,_0x1f4b8f,_0x289e5a){if((_0x26724d[_0x3149('0x183')]&0x200003)===0x1){throw new FS[(_0x3149('0xed'))](0xd);}if(!_0x26724d['stream_ops'][_0x3149('0x10f')]){throw new FS[(_0x3149('0xed'))](0x13);}return _0x26724d[_0x3149('0xeb')][_0x3149('0x10f')](_0x26724d,_0xd90910,_0x3400bd,_0x2457e9,_0x3f5ba9,_0x1f4b8f,_0x289e5a);},'msync':function(_0x142789,_0x32d302,_0xb33893,_0x6c156b,_0x5751ac){if(!_0x142789||!_0x142789[_0x3149('0xeb')][_0x3149('0x110')]){return 0x0;}return _0x142789[_0x3149('0xeb')][_0x3149('0x110')](_0x142789,_0x32d302,_0xb33893,_0x6c156b,_0x5751ac);},'munmap':function(_0x4d7ffd){return 0x0;},'ioctl':function(_0x4a19a7,_0x4748b1,_0x222f1b){if(!_0x4a19a7[_0x3149('0xeb')][_0x3149('0x1d6')]){throw new FS[(_0x3149('0xed'))](0x19);}return _0x4a19a7['stream_ops'][_0x3149('0x1d6')](_0x4a19a7,_0x4748b1,_0x222f1b);},'readFile':function(_0x4ce3d9,_0xcc77df){_0xcc77df=_0xcc77df||{};_0xcc77df[_0x3149('0x183')]=_0xcc77df[_0x3149('0x183')]||'r';_0xcc77df[_0x3149('0x1d7')]=_0xcc77df[_0x3149('0x1d7')]||'binary';if(_0xcc77df[_0x3149('0x1d7')]!=='utf8'&&_0xcc77df[_0x3149('0x1d7')]!==_0x3149('0x57')){throw new Error('Invalid\x20encoding\x20type\x20\x22'+_0xcc77df[_0x3149('0x1d7')]+'\x22');}var _0x4ac07f;var _0x574522=FS['open'](_0x4ce3d9,_0xcc77df[_0x3149('0x183')]);var _0x4fa4dc=FS[_0x3149('0x154')](_0x4ce3d9);var _0x4b7052=_0x4fa4dc[_0x3149('0x122')];var _0x100174=new Uint8Array(_0x4b7052);FS['read'](_0x574522,_0x100174,0x0,_0x4b7052,0x0);if(_0xcc77df['encoding']===_0x3149('0x87')){_0x4ac07f=UTF8ArrayToString(_0x100174,0x0);}else if(_0xcc77df[_0x3149('0x1d7')]===_0x3149('0x57')){_0x4ac07f=_0x100174;}FS[_0x3149('0x1d2')](_0x574522);return _0x4ac07f;},'writeFile':function(_0x2fb6c2,_0x4af318,_0x5ef81e){_0x5ef81e=_0x5ef81e||{};_0x5ef81e[_0x3149('0x183')]=_0x5ef81e[_0x3149('0x183')]||'w';var _0x14060f=FS['open'](_0x2fb6c2,_0x5ef81e[_0x3149('0x183')],_0x5ef81e[_0x3149('0x113')]);if(typeof _0x4af318===_0x3149('0x80')){var _0x435b1a=new Uint8Array(lengthBytesUTF8(_0x4af318)+0x1);var _0x2a56b1=stringToUTF8Array(_0x4af318,_0x435b1a,0x0,_0x435b1a[_0x3149('0x35')]);FS[_0x3149('0x10d')](_0x14060f,_0x435b1a,0x0,_0x2a56b1,undefined,_0x5ef81e['canOwn']);}else if(ArrayBuffer[_0x3149('0x1d8')](_0x4af318)){FS['write'](_0x14060f,_0x4af318,0x0,_0x4af318[_0x3149('0x1d9')],undefined,_0x5ef81e[_0x3149('0x1da')]);}else{throw new Error(_0x3149('0x1db'));}FS[_0x3149('0x1d2')](_0x14060f);},'cwd':function(){return FS[_0x3149('0x1dc')];},'chdir':function(_0x1a95a8){var _0x1173e3=FS[_0x3149('0x14f')](_0x1a95a8,{'follow':!![]});if(_0x1173e3[_0x3149('0xec')]===null){throw new FS[(_0x3149('0xed'))](0x2);}if(!FS[_0x3149('0x112')](_0x1173e3[_0x3149('0xec')][_0x3149('0x113')])){throw new FS['ErrnoError'](0x14);}var _0x41eade=FS[_0x3149('0x1a2')](_0x1173e3[_0x3149('0xec')],'x');if(_0x41eade){throw new FS['ErrnoError'](_0x41eade);}FS[_0x3149('0x1dc')]=_0x1173e3['path'];},'createDefaultDirectories':function(){FS[_0x3149('0x151')]('/tmp');FS['mkdir'](_0x3149('0x1dd'));FS[_0x3149('0x151')](_0x3149('0xce'));},'createDefaultDevices':function(){FS[_0x3149('0x151')](_0x3149('0x1de'));FS[_0x3149('0xea')](FS[_0x3149('0x1df')](0x1,0x3),{'read':function(){return 0x0;},'write':function(_0x15511c,_0x382e68,_0x2336ee,_0x3cddd3,_0x1ad1d9){return _0x3cddd3;}});FS[_0x3149('0x1e0')]('/dev/null',FS[_0x3149('0x1df')](0x1,0x3));TTY['register'](FS[_0x3149('0x1df')](0x5,0x0),TTY[_0x3149('0x1e1')]);TTY[_0x3149('0x1e2')](FS[_0x3149('0x1df')](0x6,0x0),TTY[_0x3149('0x1e3')]);FS[_0x3149('0x1e0')](_0x3149('0x1e4'),FS[_0x3149('0x1df')](0x5,0x0));FS[_0x3149('0x1e0')](_0x3149('0x1e5'),FS[_0x3149('0x1df')](0x6,0x0));var _0x5a5818;if(typeof crypto===_0x3149('0x4')&&typeof crypto[_0x3149('0x1e6')]===_0x3149('0x4a')){var _0x158b00=new Uint8Array(0x1);_0x5a5818=function(){crypto[_0x3149('0x1e6')](_0x158b00);return _0x158b00[0x0];};}else if(ENVIRONMENT_IS_NODE){try{var _0x24cf21=__webpack_require__(2051);_0x5a5818=function(){return _0x24cf21[_0x3149('0x1e7')](0x1)[0x0];};}catch(_0x34d031){}}else{}if(!_0x5a5818){_0x5a5818=function(){abort(_0x3149('0x1e8'));};}FS[_0x3149('0x1e9')](_0x3149('0x1de'),_0x3149('0x1ea'),_0x5a5818);FS[_0x3149('0x1e9')](_0x3149('0x1de'),_0x3149('0x1eb'),_0x5a5818);FS['mkdir'](_0x3149('0x1ec'));FS[_0x3149('0x151')](_0x3149('0x1ed'));},'createSpecialDirectories':function(){FS[_0x3149('0x151')](_0x3149('0x1ee'));FS['mkdir'](_0x3149('0x1ef'));FS[_0x3149('0x151')](_0x3149('0x1f0'));FS['mount']({'mount':function(){var _0xbafe7d=FS['createNode'](_0x3149('0x1ef'),'fd',0x4000|0x1ff,0x49);_0xbafe7d['node_ops']={'lookup':function(_0x103893,_0x4084b7){var _0xeff8ab=+_0x4084b7;var _0x27a13f=FS[_0x3149('0x1c2')](_0xeff8ab);if(!_0x27a13f)throw new FS[(_0x3149('0xed'))](0x9);var _0x5eaec7={'parent':null,'mount':{'mountpoint':_0x3149('0x1f1')},'node_ops':{'readlink':function(){return _0x27a13f[_0x3149('0x4c')];}}};_0x5eaec7[_0x3149('0x12b')]=_0x5eaec7;return _0x5eaec7;}};return _0xbafe7d;}},{},_0x3149('0x1f0'));},'createStandardStreams':function(){if(Module['stdin']){FS[_0x3149('0x1e9')](_0x3149('0x1de'),_0x3149('0x1f2'),Module[_0x3149('0x1f2')]);}else{FS['symlink']('/dev/tty','/dev/stdin');}if(Module[_0x3149('0x1f3')]){FS[_0x3149('0x1e9')]('/dev',_0x3149('0x1f3'),null,Module[_0x3149('0x1f3')]);}else{FS['symlink'](_0x3149('0x1e4'),_0x3149('0x1f4'));}if(Module[_0x3149('0x1f5')]){FS['createDevice'](_0x3149('0x1de'),_0x3149('0x1f5'),null,Module[_0x3149('0x1f5')]);}else{FS[_0x3149('0x10a')](_0x3149('0x1e5'),'/dev/stderr');}var _0x161db2=FS[_0x3149('0x36')](_0x3149('0xf9'),'r');var _0x3e2bb7=FS[_0x3149('0x36')](_0x3149('0x1f4'),'w');var _0x147d42=FS[_0x3149('0x36')](_0x3149('0x1f6'),'w');},'ensureErrnoError':function(){if(FS[_0x3149('0xed')])return;FS[_0x3149('0xed')]=function ErrnoError(_0x139755,_0xe0f79f){this['node']=_0xe0f79f;this[_0x3149('0x1f7')]=function(_0x4d15c2){this[_0x3149('0x173')]=_0x4d15c2;};this[_0x3149('0x1f7')](_0x139755);this[_0x3149('0x1ba')]=_0x3149('0x1f8');if(this[_0x3149('0x25')])Object['defineProperty'](this,_0x3149('0x25'),{'value':new Error()[_0x3149('0x25')],'writable':!![]});};FS[_0x3149('0xed')]['prototype']=new Error();FS[_0x3149('0xed')][_0x3149('0x2a')][_0x3149('0x1f9')]=FS[_0x3149('0xed')];[0x2][_0x3149('0x15b')](function(_0x5bc62a){FS[_0x3149('0x1fa')][_0x5bc62a]=new FS['ErrnoError'](_0x5bc62a);FS['genericErrors'][_0x5bc62a][_0x3149('0x25')]=_0x3149('0x1fb');});},'staticInit':function(){FS['ensureErrnoError']();FS[_0x3149('0x198')]=new Array(0x1000);FS[_0x3149('0x132')](MEMFS,{},'/');FS[_0x3149('0x1fc')]();FS[_0x3149('0x1fd')]();FS[_0x3149('0x1fe')]();FS[_0x3149('0x1ff')]={'MEMFS':MEMFS,'IDBFS':IDBFS,'NODEFS':NODEFS,'WORKERFS':WORKERFS};},'init':function(_0x7a49ac,_0x4afb29,_0x3dc4db){FS[_0x3149('0x9d')][_0x3149('0x9c')]=!![];FS[_0x3149('0x200')]();Module['stdin']=_0x7a49ac||Module['stdin'];Module['stdout']=_0x4afb29||Module[_0x3149('0x1f3')];Module[_0x3149('0x1f5')]=_0x3dc4db||Module[_0x3149('0x1f5')];FS[_0x3149('0x201')]();},'quit':function(){FS[_0x3149('0x9d')][_0x3149('0x9c')]=![];var _0x40f974=Module[_0x3149('0x202')];if(_0x40f974)_0x40f974(0x0);for(var _0x33b85a=0x0;_0x33b85a<FS[_0x3149('0x1a6')]['length'];_0x33b85a++){var _0x334ab2=FS['streams'][_0x33b85a];if(!_0x334ab2){continue;}FS[_0x3149('0x1d2')](_0x334ab2);}},'getMode':function(_0x4b8af1,_0x8bf86b){var _0x3e096a=0x0;if(_0x4b8af1)_0x3e096a|=0x124|0x49;if(_0x8bf86b)_0x3e096a|=0x92;return _0x3e096a;},'joinPath':function(_0x3b7769,_0x52572d){var _0x3bb992=PATH['join'][_0x3149('0x78')](null,_0x3b7769);if(_0x52572d&&_0x3bb992[0x0]=='/')_0x3bb992=_0x3bb992[_0x3149('0x5d')](0x1);return _0x3bb992;},'absolutePath':function(_0x918a0f,_0x4661a9){return PATH[_0x3149('0xe9')](_0x4661a9,_0x918a0f);},'standardizePath':function(_0xe5db81){return PATH[_0x3149('0xe6')](_0xe5db81);},'findObject':function(_0x215ef8,_0x4df44c){var _0x474ab5=FS[_0x3149('0x203')](_0x215ef8,_0x4df44c);if(_0x474ab5[_0x3149('0x204')]){return _0x474ab5[_0x3149('0x4')];}else{___setErrNo(_0x474ab5[_0x3149('0x22')]);return null;}},'analyzePath':function(_0x550004,_0x127bb3){try{var _0x658ba0=FS['lookupPath'](_0x550004,{'follow':!_0x127bb3});_0x550004=_0x658ba0[_0x3149('0x4c')];}catch(_0x5663e1){}var _0x5600da={'isRoot':![],'exists':![],'error':0x0,'name':null,'path':null,'object':null,'parentExists':![],'parentPath':null,'parentObject':null};try{var _0x658ba0=FS[_0x3149('0x14f')](_0x550004,{'parent':!![]});_0x5600da[_0x3149('0x205')]=!![];_0x5600da['parentPath']=_0x658ba0[_0x3149('0x4c')];_0x5600da[_0x3149('0x206')]=_0x658ba0[_0x3149('0xec')];_0x5600da[_0x3149('0x2b')]=PATH[_0x3149('0x1b3')](_0x550004);_0x658ba0=FS['lookupPath'](_0x550004,{'follow':!_0x127bb3});_0x5600da[_0x3149('0x204')]=!![];_0x5600da[_0x3149('0x4c')]=_0x658ba0[_0x3149('0x4c')];_0x5600da[_0x3149('0x4')]=_0x658ba0['node'];_0x5600da[_0x3149('0x2b')]=_0x658ba0['node']['name'];_0x5600da[_0x3149('0x197')]=_0x658ba0[_0x3149('0x4c')]==='/';}catch(_0x3bd439){_0x5600da['error']=_0x3bd439['errno'];};return _0x5600da;},'createFolder':function(_0x1f4c6e,_0x1285c3,_0x3c3cb2,_0x35dc0c){var _0x337521=PATH[_0x3149('0x144')](typeof _0x1f4c6e===_0x3149('0x80')?_0x1f4c6e:FS['getPath'](_0x1f4c6e),_0x1285c3);var _0x7dce78=FS[_0x3149('0x16f')](_0x3c3cb2,_0x35dc0c);return FS[_0x3149('0x151')](_0x337521,_0x7dce78);},'createPath':function(_0x53e2b7,_0x5fd891,_0x16f1f3,_0x32bbc4){_0x53e2b7=typeof _0x53e2b7===_0x3149('0x80')?_0x53e2b7:FS['getPath'](_0x53e2b7);var _0x3870b8=_0x5fd891[_0x3149('0xe2')]('/')['reverse']();while(_0x3870b8['length']){var _0x24ae9b=_0x3870b8[_0x3149('0x1ac')]();if(!_0x24ae9b)continue;var _0x43c681=PATH['join2'](_0x53e2b7,_0x24ae9b);try{FS[_0x3149('0x151')](_0x43c681);}catch(_0x60e7f3){}_0x53e2b7=_0x43c681;}return _0x43c681;},'createFile':function(_0x4997e0,_0x15b4b4,_0x46506c,_0xd2233d,_0x159e1e){var _0x1a29ea=PATH[_0x3149('0x144')](typeof _0x4997e0===_0x3149('0x80')?_0x4997e0:FS[_0x3149('0x1a3')](_0x4997e0),_0x15b4b4);var _0x4975e2=FS[_0x3149('0x16f')](_0xd2233d,_0x159e1e);return FS[_0x3149('0x207')](_0x1a29ea,_0x4975e2);},'createDataFile':function(_0x123aa6,_0x550b77,_0xd52cbd,_0x12799c,_0xcfd93f,_0x4fcaca){var _0x4186ae=_0x550b77?PATH['join2'](typeof _0x123aa6===_0x3149('0x80')?_0x123aa6:FS[_0x3149('0x1a3')](_0x123aa6),_0x550b77):_0x123aa6;var _0x138b73=FS[_0x3149('0x16f')](_0x12799c,_0xcfd93f);var _0x4b94f5=FS[_0x3149('0x207')](_0x4186ae,_0x138b73);if(_0xd52cbd){if(typeof _0xd52cbd===_0x3149('0x80')){var _0x5d06db=new Array(_0xd52cbd[_0x3149('0x35')]);for(var _0x1d5dd1=0x0,_0x5ca807=_0xd52cbd[_0x3149('0x35')];_0x1d5dd1<_0x5ca807;++_0x1d5dd1)_0x5d06db[_0x1d5dd1]=_0xd52cbd[_0x3149('0x89')](_0x1d5dd1);_0xd52cbd=_0x5d06db;}FS[_0x3149('0x152')](_0x4b94f5,_0x138b73|0x92);var _0x2a4ca4=FS[_0x3149('0x36')](_0x4b94f5,'w');FS['write'](_0x2a4ca4,_0xd52cbd,0x0,_0xd52cbd['length'],0x0,_0x4fcaca);FS[_0x3149('0x1d2')](_0x2a4ca4);FS[_0x3149('0x152')](_0x4b94f5,_0x138b73);}return _0x4b94f5;},'createDevice':function(_0x2c00fa,_0x39a165,_0x1526fe,_0x3f090b){var _0xbeb569=PATH[_0x3149('0x144')](typeof _0x2c00fa===_0x3149('0x80')?_0x2c00fa:FS[_0x3149('0x1a3')](_0x2c00fa),_0x39a165);var _0x363450=FS['getMode'](!!_0x1526fe,!!_0x3f090b);if(!FS['createDevice'][_0x3149('0x208')])FS['createDevice']['major']=0x40;var _0x135ec1=FS[_0x3149('0x1df')](FS['createDevice'][_0x3149('0x208')]++,0x0);FS[_0x3149('0xea')](_0x135ec1,{'open':function(_0x153b3e){_0x153b3e[_0x3149('0xef')]=![];},'close':function(_0x2a8cea){if(_0x3f090b&&_0x3f090b[_0x3149('0x4f')]&&_0x3f090b[_0x3149('0x4f')]['length']){_0x3f090b(0xa);}},'read':function(_0x1323b7,_0x2b04c2,_0x32d525,_0x2c94b4,_0x2a7af3){var _0x293225=0x0;for(var _0x284d70=0x0;_0x284d70<_0x2c94b4;_0x284d70++){var _0x3129bf;try{_0x3129bf=_0x1526fe();}catch(_0x387bc9){throw new FS['ErrnoError'](0x5);}if(_0x3129bf===undefined&&_0x293225===0x0){throw new FS[(_0x3149('0xed'))](0xb);}if(_0x3129bf===null||_0x3129bf===undefined)break;_0x293225++;_0x2b04c2[_0x32d525+_0x284d70]=_0x3129bf;}if(_0x293225){_0x1323b7[_0x3149('0xec')][_0x3149('0xf3')]=Date[_0x3149('0xd1')]();}return _0x293225;},'write':function(_0x4b304c,_0x4d869d,_0x2fe4fa,_0x17bedc,_0x3b1351){for(var _0x52766a=0x0;_0x52766a<_0x17bedc;_0x52766a++){try{_0x3f090b(_0x4d869d[_0x2fe4fa+_0x52766a]);}catch(_0x5ac007){throw new FS[(_0x3149('0xed'))](0x5);}}if(_0x17bedc){_0x4b304c[_0x3149('0xec')][_0x3149('0xf3')]=Date[_0x3149('0xd1')]();}return _0x52766a;}});return FS[_0x3149('0x1e0')](_0xbeb569,_0x363450,_0x135ec1);},'createLink':function(_0x465b26,_0x22b4c8,_0x1ddec0,_0x409e94,_0x5e87f4){var _0x57fbb5=PATH[_0x3149('0x144')](typeof _0x465b26==='string'?_0x465b26:FS['getPath'](_0x465b26),_0x22b4c8);return FS[_0x3149('0x10a')](_0x1ddec0,_0x57fbb5);},'forceLoadFile':function(_0x2e8b7d){if(_0x2e8b7d['isDevice']||_0x2e8b7d[_0x3149('0x209')]||_0x2e8b7d[_0x3149('0x11b')]||_0x2e8b7d[_0x3149('0x117')])return!![];var _0x1968d1=!![];if(typeof XMLHttpRequest!==_0x3149('0x1')){throw new Error(_0x3149('0x20a'));}else if(Module[_0x3149('0x4b')]){try{_0x2e8b7d[_0x3149('0x117')]=intArrayFromString(Module[_0x3149('0x4b')](_0x2e8b7d[_0x3149('0x20b')]),!![]);_0x2e8b7d[_0x3149('0x11a')]=_0x2e8b7d[_0x3149('0x117')][_0x3149('0x35')];}catch(_0x17eb7e){_0x1968d1=![];}}else{throw new Error(_0x3149('0x20c'));}if(!_0x1968d1)___setErrNo(0x5);return _0x1968d1;},'createLazyFile':function(_0x2ce1a1,_0x3f78f8,_0x1c3f69,_0x420ebf,_0x387e52){function _0x140ef9(){this[_0x3149('0x20d')]=![];this[_0x3149('0x20e')]=[];}_0x140ef9[_0x3149('0x2a')][_0x3149('0x156')]=function LazyUint8Array_get(_0xb4b5f4){if(_0xb4b5f4>this[_0x3149('0x35')]-0x1||_0xb4b5f4<0x0){return undefined;}var _0xd62592=_0xb4b5f4%this[_0x3149('0x20f')];var _0x266a0c=_0xb4b5f4/this[_0x3149('0x20f')]|0x0;return this[_0x3149('0x210')](_0x266a0c)[_0xd62592];};_0x140ef9['prototype'][_0x3149('0x211')]=function LazyUint8Array_setDataGetter(_0x13646a){this[_0x3149('0x210')]=_0x13646a;};_0x140ef9['prototype'][_0x3149('0x212')]=function LazyUint8Array_cacheLength(){var _0x5dff51=new XMLHttpRequest();_0x5dff51[_0x3149('0x36')]('HEAD',VENUS_PATH+_0x1c3f69,![]);_0x5dff51[_0x3149('0x21')](null);if(!(_0x5dff51[_0x3149('0x1d')]>=0xc8&&_0x5dff51['status']<0x12c||_0x5dff51[_0x3149('0x1d')]===0x130))throw new Error('Couldn\x27t\x20load\x20'+_0x1c3f69+'.\x20Status:\x20'+_0x5dff51[_0x3149('0x1d')]);var _0x376099=Number(_0x5dff51[_0x3149('0x213')](_0x3149('0x214')));var _0x58ec58;var _0x349e40=(_0x58ec58=_0x5dff51[_0x3149('0x213')](_0x3149('0x215')))&&_0x58ec58==='bytes';var _0x55a5a4=(_0x58ec58=_0x5dff51['getResponseHeader'](_0x3149('0x216')))&&_0x58ec58===_0x3149('0x217');var _0x5783c8=0x400*0x400;if(!_0x349e40)_0x5783c8=_0x376099;var _0x209926=function(_0x4e339d,_0x35e4b8){if(_0x4e339d>_0x35e4b8)throw new Error(_0x3149('0x218')+_0x4e339d+',\x20'+_0x35e4b8+_0x3149('0x219'));if(_0x35e4b8>_0x376099-0x1)throw new Error(_0x3149('0x21a')+_0x376099+'\x20bytes\x20available!\x20programmer\x20error!');var _0x5dff51=new XMLHttpRequest();_0x5dff51[_0x3149('0x36')](_0x3149('0x37'),VENUS_PATH+_0x1c3f69,![]);if(_0x376099!==_0x5783c8)_0x5dff51[_0x3149('0x21b')]('Range',_0x3149('0x21c')+_0x4e339d+'-'+_0x35e4b8);if(typeof Uint8Array!=_0x3149('0x1'))_0x5dff51[_0x3149('0x11')]=_0x3149('0x12');if(_0x5dff51[_0x3149('0x21d')]){_0x5dff51[_0x3149('0x21d')](_0x3149('0x21e'));}_0x5dff51['send'](null);if(!(_0x5dff51['status']>=0xc8&&_0x5dff51['status']<0x12c||_0x5dff51[_0x3149('0x1d')]===0x130))throw new Error(_0x3149('0x21f')+_0x1c3f69+_0x3149('0x220')+_0x5dff51[_0x3149('0x1d')]);if(_0x5dff51[_0x3149('0x1e')]!==undefined){return new Uint8Array(_0x5dff51[_0x3149('0x1e')]||[]);}else{return intArrayFromString(_0x5dff51[_0x3149('0x5e')]||'',!![]);}};var _0x52f141=this;_0x52f141[_0x3149('0x211')](function(_0x4aa8b0){var _0x3842de=_0x4aa8b0*_0x5783c8;var _0x330dcc=(_0x4aa8b0+0x1)*_0x5783c8-0x1;_0x330dcc=Math[_0x3149('0xad')](_0x330dcc,_0x376099-0x1);if(typeof _0x52f141['chunks'][_0x4aa8b0]===_0x3149('0x1')){_0x52f141['chunks'][_0x4aa8b0]=_0x209926(_0x3842de,_0x330dcc);}if(typeof _0x52f141[_0x3149('0x20e')][_0x4aa8b0]===_0x3149('0x1'))throw new Error(_0x3149('0x221'));return _0x52f141[_0x3149('0x20e')][_0x4aa8b0];});if(_0x55a5a4||!_0x376099){_0x5783c8=_0x376099=0x1;_0x376099=this[_0x3149('0x210')](0x0)['length'];_0x5783c8=_0x376099;console[_0x3149('0x64')](_0x3149('0x222'));}this['_length']=_0x376099;this[_0x3149('0x223')]=_0x5783c8;this[_0x3149('0x20d')]=!![];};if(typeof XMLHttpRequest!=='undefined'){if(!ENVIRONMENT_IS_WORKER)throw _0x3149('0x224');var _0x14ce3d=new _0x140ef9();Object['defineProperties'](_0x14ce3d,{'length':{'get':function(){if(!this[_0x3149('0x20d')]){this[_0x3149('0x212')]();}return this[_0x3149('0x225')];}},'chunkSize':{'get':function(){if(!this[_0x3149('0x20d')]){this[_0x3149('0x212')]();}return this[_0x3149('0x223')];}}});var _0x4cd71f={'isDevice':![],'contents':_0x14ce3d};}else{var _0x4cd71f={'isDevice':![],'url':_0x1c3f69};}var _0x608ec9=FS[_0x3149('0x226')](_0x2ce1a1,_0x3f78f8,_0x4cd71f,_0x420ebf,_0x387e52);if(_0x4cd71f[_0x3149('0x117')]){_0x608ec9[_0x3149('0x117')]=_0x4cd71f[_0x3149('0x117')];}else if(_0x4cd71f['url']){_0x608ec9[_0x3149('0x117')]=null;_0x608ec9[_0x3149('0x20b')]=_0x4cd71f[_0x3149('0x20b')];}Object[_0x3149('0x1a8')](_0x608ec9,{'usedBytes':{'get':function(){return this['contents'][_0x3149('0x35')];}}});var _0x2dfdcc={};var _0x326531=Object[_0x3149('0x159')](_0x608ec9[_0x3149('0xeb')]);_0x326531[_0x3149('0x15b')](function(_0x17bd3d){var _0x41e778=_0x608ec9[_0x3149('0xeb')][_0x17bd3d];_0x2dfdcc[_0x17bd3d]=function forceLoadLazyFile(){if(!FS[_0x3149('0x227')](_0x608ec9)){throw new FS['ErrnoError'](0x5);}return _0x41e778[_0x3149('0x78')](null,arguments);};});_0x2dfdcc[_0x3149('0x4b')]=function stream_ops_read(_0x1d7395,_0x46035e,_0x143f02,_0x1642f5,_0x242217){if(!FS['forceLoadFile'](_0x608ec9)){throw new FS[(_0x3149('0xed'))](0x5);}var _0x16b49c=_0x1d7395[_0x3149('0xec')][_0x3149('0x117')];if(_0x242217>=_0x16b49c[_0x3149('0x35')])return 0x0;var _0x2cb7cc=Math[_0x3149('0xad')](_0x16b49c['length']-_0x242217,_0x1642f5);if(_0x16b49c[_0x3149('0x52')]){for(var _0x1bba20=0x0;_0x1bba20<_0x2cb7cc;_0x1bba20++){_0x46035e[_0x143f02+_0x1bba20]=_0x16b49c[_0x242217+_0x1bba20];}}else{for(var _0x1bba20=0x0;_0x1bba20<_0x2cb7cc;_0x1bba20++){_0x46035e[_0x143f02+_0x1bba20]=_0x16b49c[_0x3149('0x156')](_0x242217+_0x1bba20);}}return _0x2cb7cc;};_0x608ec9[_0x3149('0xeb')]=_0x2dfdcc;return _0x608ec9;},'createPreloadedFile':function(_0x809108,_0x1a5cf6,_0xbff667,_0x1340ff,_0x244bf8,_0x251060,_0x16596,_0x4d93d8,_0x1e8d26,_0x5665ec){Browser[_0x3149('0x9d')]();var _0x4ec7cc=_0x1a5cf6?PATH['resolve'](PATH['join2'](_0x809108,_0x1a5cf6)):_0x809108;var _0x1e903d=getUniqueRunDependency(_0x3149('0x228')+_0x4ec7cc);function _0x155e96(_0x3840c5){function _0x2f3f1a(_0x2c0325){if(_0x5665ec)_0x5665ec();if(!_0x4d93d8){FS[_0x3149('0x229')](_0x809108,_0x1a5cf6,_0x2c0325,_0x1340ff,_0x244bf8,_0x1e8d26);}if(_0x251060)_0x251060();removeRunDependency(_0x1e903d);}var _0x472d92=![];Module['preloadPlugins'][_0x3149('0x15b')](function(_0x48410b){if(_0x472d92)return;if(_0x48410b['canHandle'](_0x4ec7cc)){_0x48410b[_0x3149('0x22a')](_0x3840c5,_0x4ec7cc,_0x2f3f1a,function(){if(_0x16596)_0x16596();removeRunDependency(_0x1e903d);});_0x472d92=!![];}});if(!_0x472d92)_0x2f3f1a(_0x3840c5);}addRunDependency(_0x1e903d);if(typeof _0xbff667==_0x3149('0x80')){Browser[_0x3149('0x22b')](_0xbff667,function(_0x51d57b){_0x155e96(_0x51d57b);},_0x16596);}else{_0x155e96(_0xbff667);}},'indexedDB':function(){return window[_0x3149('0x22c')]||window[_0x3149('0x12e')]||window[_0x3149('0x12f')]||window[_0x3149('0x130')];},'DB_NAME':function(){return _0x3149('0x22d')+window[_0x3149('0x6')][_0x3149('0x7')];},'DB_VERSION':0x14,'DB_STORE_NAME':_0x3149('0x131'),'saveFilesToDB':function(_0xeeb7d7,_0x517e48,_0x325276){_0x517e48=_0x517e48||function(){};_0x325276=_0x325276||function(){};var _0x465b18=FS[_0x3149('0x22c')]();try{var _0x2ae1b=_0x465b18['open'](FS[_0x3149('0x22e')](),FS['DB_VERSION']);}catch(_0x4c99e9){return _0x325276(_0x4c99e9);}_0x2ae1b['onupgradeneeded']=function openRequest_onupgradeneeded(){console[_0x3149('0x64')](_0x3149('0x22f'));var _0x513c45=_0x2ae1b[_0x3149('0x13b')];_0x513c45['createObjectStore'](FS[_0x3149('0x13c')]);};_0x2ae1b[_0x3149('0x142')]=function openRequest_onsuccess(){var _0x3e9b73=_0x2ae1b['result'];var _0x5558d1=_0x3e9b73[_0x3149('0x149')]([FS[_0x3149('0x13c')]],_0x3149('0x15d'));var _0xa139a1=_0x5558d1[_0x3149('0x13d')](FS[_0x3149('0x13c')]);var _0x33a6d7=0x0,_0x72501e=0x0,_0xc0bf98=_0xeeb7d7['length'];function _0x5bd0c5(){if(_0x72501e==0x0)_0x517e48();else _0x325276();}_0xeeb7d7[_0x3149('0x15b')](function(_0x852d54){var _0x274016=_0xa139a1[_0x3149('0x157')](FS[_0x3149('0x203')](_0x852d54)[_0x3149('0x4')][_0x3149('0x117')],_0x852d54);_0x274016[_0x3149('0x142')]=function putRequest_onsuccess(){_0x33a6d7++;if(_0x33a6d7+_0x72501e==_0xc0bf98)_0x5bd0c5();};_0x274016[_0x3149('0x1b')]=function putRequest_onerror(){_0x72501e++;if(_0x33a6d7+_0x72501e==_0xc0bf98)_0x5bd0c5();};});_0x5558d1['onerror']=_0x325276;};_0x2ae1b[_0x3149('0x1b')]=_0x325276;},'loadFilesFromDB':function(_0x59229b,_0x2094c4,_0x1398c8){_0x2094c4=_0x2094c4||function(){};_0x1398c8=_0x1398c8||function(){};var _0x2cbcf8=FS[_0x3149('0x22c')]();try{var _0x4a44a5=_0x2cbcf8[_0x3149('0x36')](FS[_0x3149('0x22e')](),FS[_0x3149('0x137')]);}catch(_0x4b3e7a){return _0x1398c8(_0x4b3e7a);}_0x4a44a5[_0x3149('0x139')]=_0x1398c8;_0x4a44a5[_0x3149('0x142')]=function openRequest_onsuccess(){var _0x44f844=_0x4a44a5[_0x3149('0x13b')];try{var _0x100a7d=_0x44f844[_0x3149('0x149')]([FS['DB_STORE_NAME']],_0x3149('0x14a'));}catch(_0x3a9fa4){_0x1398c8(_0x3a9fa4);return;}var _0x44beb7=_0x100a7d[_0x3149('0x13d')](FS[_0x3149('0x13c')]);var _0x17f1d6=0x0,_0x2fedc2=0x0,_0x35afc9=_0x59229b[_0x3149('0x35')];function _0x286943(){if(_0x2fedc2==0x0)_0x2094c4();else _0x1398c8();}_0x59229b[_0x3149('0x15b')](function(_0x5c5dbf){var _0x439858=_0x44beb7['get'](_0x5c5dbf);_0x439858['onsuccess']=function getRequest_onsuccess(){if(FS[_0x3149('0x203')](_0x5c5dbf)[_0x3149('0x204')]){FS[_0x3149('0x109')](_0x5c5dbf);}FS[_0x3149('0x229')](PATH['dirname'](_0x5c5dbf),PATH[_0x3149('0x1b3')](_0x5c5dbf),_0x439858['result'],!![],!![],!![]);_0x17f1d6++;if(_0x17f1d6+_0x2fedc2==_0x35afc9)_0x286943();};_0x439858[_0x3149('0x1b')]=function getRequest_onerror(){_0x2fedc2++;if(_0x17f1d6+_0x2fedc2==_0x35afc9)_0x286943();};});_0x100a7d['onerror']=_0x1398c8;};_0x4a44a5[_0x3149('0x1b')]=_0x1398c8;}};var ERRNO_CODES={'EPERM':0x1,'ENOENT':0x2,'ESRCH':0x3,'EINTR':0x4,'EIO':0x5,'ENXIO':0x6,'E2BIG':0x7,'ENOEXEC':0x8,'EBADF':0x9,'ECHILD':0xa,'EAGAIN':0xb,'EWOULDBLOCK':0xb,'ENOMEM':0xc,'EACCES':0xd,'EFAULT':0xe,'ENOTBLK':0xf,'EBUSY':0x10,'EEXIST':0x11,'EXDEV':0x12,'ENODEV':0x13,'ENOTDIR':0x14,'EISDIR':0x15,'EINVAL':0x16,'ENFILE':0x17,'EMFILE':0x18,'ENOTTY':0x19,'ETXTBSY':0x1a,'EFBIG':0x1b,'ENOSPC':0x1c,'ESPIPE':0x1d,'EROFS':0x1e,'EMLINK':0x1f,'EPIPE':0x20,'EDOM':0x21,'ERANGE':0x22,'ENOMSG':0x2a,'EIDRM':0x2b,'ECHRNG':0x2c,'EL2NSYNC':0x2d,'EL3HLT':0x2e,'EL3RST':0x2f,'ELNRNG':0x30,'EUNATCH':0x31,'ENOCSI':0x32,'EL2HLT':0x33,'EDEADLK':0x23,'ENOLCK':0x25,'EBADE':0x34,'EBADR':0x35,'EXFULL':0x36,'ENOANO':0x37,'EBADRQC':0x38,'EBADSLT':0x39,'EDEADLOCK':0x23,'EBFONT':0x3b,'ENOSTR':0x3c,'ENODATA':0x3d,'ETIME':0x3e,'ENOSR':0x3f,'ENONET':0x40,'ENOPKG':0x41,'EREMOTE':0x42,'ENOLINK':0x43,'EADV':0x44,'ESRMNT':0x45,'ECOMM':0x46,'EPROTO':0x47,'EMULTIHOP':0x48,'EDOTDOT':0x49,'EBADMSG':0x4a,'ENOTUNIQ':0x4c,'EBADFD':0x4d,'EREMCHG':0x4e,'ELIBACC':0x4f,'ELIBBAD':0x50,'ELIBSCN':0x51,'ELIBMAX':0x52,'ELIBEXEC':0x53,'ENOSYS':0x26,'ENOTEMPTY':0x27,'ENAMETOOLONG':0x24,'ELOOP':0x28,'EOPNOTSUPP':0x5f,'EPFNOSUPPORT':0x60,'ECONNRESET':0x68,'ENOBUFS':0x69,'EAFNOSUPPORT':0x61,'EPROTOTYPE':0x5b,'ENOTSOCK':0x58,'ENOPROTOOPT':0x5c,'ESHUTDOWN':0x6c,'ECONNREFUSED':0x6f,'EADDRINUSE':0x62,'ECONNABORTED':0x67,'ENETUNREACH':0x65,'ENETDOWN':0x64,'ETIMEDOUT':0x6e,'EHOSTDOWN':0x70,'EHOSTUNREACH':0x71,'EINPROGRESS':0x73,'EALREADY':0x72,'EDESTADDRREQ':0x59,'EMSGSIZE':0x5a,'EPROTONOSUPPORT':0x5d,'ESOCKTNOSUPPORT':0x5e,'EADDRNOTAVAIL':0x63,'ENETRESET':0x66,'EISCONN':0x6a,'ENOTCONN':0x6b,'ETOOMANYREFS':0x6d,'EUSERS':0x57,'EDQUOT':0x7a,'ESTALE':0x74,'ENOTSUP':0x5f,'ENOMEDIUM':0x7b,'EILSEQ':0x54,'EOVERFLOW':0x4b,'ECANCELED':0x7d,'ENOTRECOVERABLE':0x83,'EOWNERDEAD':0x82,'ESTRPIPE':0x56};var SYSCALLS={'DEFAULT_POLLMASK':0x5,'mappings':{},'umask':0x1ff,'calculateAt':function(_0x51790a,_0x109350){if(_0x109350[0x0]!=='/'){var _0x84371e;if(_0x51790a===-0x64){_0x84371e=FS['cwd']();}else{var _0x3bcce0=FS['getStream'](_0x51790a);if(!_0x3bcce0)throw new FS[(_0x3149('0xed'))](ERRNO_CODES[_0x3149('0x230')]);_0x84371e=_0x3bcce0[_0x3149('0x4c')];}_0x109350=PATH[_0x3149('0x144')](_0x84371e,_0x109350);}return _0x109350;},'doStat':function(_0xd2080f,_0x275050,_0x5341c3){try{var _0x5c8f4a=_0xd2080f(_0x275050);}catch(_0x3c8aa4){if(_0x3c8aa4&&_0x3c8aa4['node']&&PATH[_0x3149('0xe6')](_0x275050)!==PATH[_0x3149('0xe6')](FS['getPath'](_0x3c8aa4[_0x3149('0xec')]))){return-ERRNO_CODES['ENOTDIR'];}throw _0x3c8aa4;}HEAP32[_0x5341c3>>0x2]=_0x5c8f4a[_0x3149('0x231')];HEAP32[_0x5341c3+0x4>>0x2]=0x0;HEAP32[_0x5341c3+0x8>>0x2]=_0x5c8f4a['ino'];HEAP32[_0x5341c3+0xc>>0x2]=_0x5c8f4a[_0x3149('0x113')];HEAP32[_0x5341c3+0x10>>0x2]=_0x5c8f4a[_0x3149('0x11f')];HEAP32[_0x5341c3+0x14>>0x2]=_0x5c8f4a[_0x3149('0x120')];HEAP32[_0x5341c3+0x18>>0x2]=_0x5c8f4a[_0x3149('0x232')];HEAP32[_0x5341c3+0x1c>>0x2]=_0x5c8f4a[_0x3149('0x121')];HEAP32[_0x5341c3+0x20>>0x2]=0x0;tempI64=[_0x5c8f4a[_0x3149('0x122')]>>>0x0,(tempDouble=_0x5c8f4a[_0x3149('0x122')],+Math_abs(tempDouble)>=0x1?tempDouble>0x0?(Math_min(+Math_floor(tempDouble/0x100000000),0xffffffff)|0x0)>>>0x0:~~+Math_ceil((tempDouble-+(~~tempDouble>>>0x0))/0x100000000)>>>0x0:0x0)],HEAP32[_0x5341c3+0x28>>0x2]=tempI64[0x0],HEAP32[_0x5341c3+0x2c>>0x2]=tempI64[0x1];HEAP32[_0x5341c3+0x30>>0x2]=0x1000;HEAP32[_0x5341c3+0x34>>0x2]=_0x5c8f4a[_0x3149('0x128')];HEAP32[_0x5341c3+0x38>>0x2]=_0x5c8f4a['atime'][_0x3149('0x233')]()/0x3e8|0x0;HEAP32[_0x5341c3+0x3c>>0x2]=0x0;HEAP32[_0x5341c3+0x40>>0x2]=_0x5c8f4a[_0x3149('0x125')][_0x3149('0x233')]()/0x3e8|0x0;HEAP32[_0x5341c3+0x44>>0x2]=0x0;HEAP32[_0x5341c3+0x48>>0x2]=_0x5c8f4a['ctime'][_0x3149('0x233')]()/0x3e8|0x0;HEAP32[_0x5341c3+0x4c>>0x2]=0x0;tempI64=[_0x5c8f4a[_0x3149('0x11e')]>>>0x0,(tempDouble=_0x5c8f4a[_0x3149('0x11e')],+Math_abs(tempDouble)>=0x1?tempDouble>0x0?(Math_min(+Math_floor(tempDouble/0x100000000),0xffffffff)|0x0)>>>0x0:~~+Math_ceil((tempDouble-+(~~tempDouble>>>0x0))/0x100000000)>>>0x0:0x0)],HEAP32[_0x5341c3+0x50>>0x2]=tempI64[0x0],HEAP32[_0x5341c3+0x54>>0x2]=tempI64[0x1];return 0x0;},'doMsync':function(_0x104d25,_0x2d493c,_0x198d3e,_0x4ba82f){var _0x3c5bee=new Uint8Array(HEAPU8[_0x3149('0x30')](_0x104d25,_0x104d25+_0x198d3e));FS[_0x3149('0x110')](_0x2d493c,_0x3c5bee,0x0,_0x198d3e,_0x4ba82f);},'doMkdir':function(_0x29fa03,_0x191bb7){_0x29fa03=PATH[_0x3149('0xe6')](_0x29fa03);if(_0x29fa03[_0x29fa03['length']-0x1]==='/')_0x29fa03=_0x29fa03[_0x3149('0x5d')](0x0,_0x29fa03[_0x3149('0x35')]-0x1);FS[_0x3149('0x151')](_0x29fa03,_0x191bb7,0x0);return 0x0;},'doMknod':function(_0x3e6f8b,_0x239128,_0x15893e){switch(_0x239128&0xf000){case 0x8000:case 0x2000:case 0x6000:case 0x1000:case 0xc000:break;default:return-ERRNO_CODES[_0x3149('0x234')];}FS[_0x3149('0x107')](_0x3e6f8b,_0x239128,_0x15893e);return 0x0;},'doReadlink':function(_0x3b9b1c,_0x227f52,_0x2fb845){if(_0x2fb845<=0x0)return-ERRNO_CODES[_0x3149('0x234')];var _0x16617d=FS[_0x3149('0x1c1')](_0x3b9b1c);var _0x50ef33=Math[_0x3149('0xad')](_0x2fb845,lengthBytesUTF8(_0x16617d));var _0x3b7dda=HEAP8[_0x227f52+_0x50ef33];stringToUTF8(_0x16617d,_0x227f52,_0x2fb845+0x1);HEAP8[_0x227f52+_0x50ef33]=_0x3b7dda;return _0x50ef33;},'doAccess':function(_0x62aa7b,_0x4ae6c1){if(_0x4ae6c1&~0x7){return-ERRNO_CODES[_0x3149('0x234')];}var _0x3d99fe;var _0x5382d4=FS['lookupPath'](_0x62aa7b,{'follow':!![]});_0x3d99fe=_0x5382d4['node'];var _0x1aa8d2='';if(_0x4ae6c1&0x4)_0x1aa8d2+='r';if(_0x4ae6c1&0x2)_0x1aa8d2+='w';if(_0x4ae6c1&0x1)_0x1aa8d2+='x';if(_0x1aa8d2&&FS['nodePermissions'](_0x3d99fe,_0x1aa8d2)){return-ERRNO_CODES[_0x3149('0x235')];}return 0x0;},'doDup':function(_0x3a6fcb,_0x2d85c3,_0x5b3e6f){var _0x3aff20=FS[_0x3149('0x1c2')](_0x5b3e6f);if(_0x3aff20)FS[_0x3149('0x1d2')](_0x3aff20);return FS[_0x3149('0x36')](_0x3a6fcb,_0x2d85c3,0x0,_0x5b3e6f,_0x5b3e6f)['fd'];},'doReadv':function(_0x5d84ba,_0x3f0009,_0x548daa,_0x41f4f1){var _0x41bddb=0x0;for(var _0x4a6f7f=0x0;_0x4a6f7f<_0x548daa;_0x4a6f7f++){var _0x4f9eed=HEAP32[_0x3f0009+_0x4a6f7f*0x8>>0x2];var _0x1ecab0=HEAP32[_0x3f0009+(_0x4a6f7f*0x8+0x4)>>0x2];var _0x34c6c2=FS[_0x3149('0x4b')](_0x5d84ba,HEAP8,_0x4f9eed,_0x1ecab0,_0x41f4f1);if(_0x34c6c2<0x0)return-0x1;_0x41bddb+=_0x34c6c2;if(_0x34c6c2<_0x1ecab0)break;}return _0x41bddb;},'doWritev':function(_0x57885c,_0x41801b,_0x37916c,_0x1a46a1){var _0x41f23a=0x0;for(var _0x9ce1a9=0x0;_0x9ce1a9<_0x37916c;_0x9ce1a9++){var _0x11a8af=HEAP32[_0x41801b+_0x9ce1a9*0x8>>0x2];var _0x49df57=HEAP32[_0x41801b+(_0x9ce1a9*0x8+0x4)>>0x2];var _0x4af5cb=FS[_0x3149('0x10d')](_0x57885c,HEAP8,_0x11a8af,_0x49df57,_0x1a46a1);if(_0x4af5cb<0x0)return-0x1;_0x41f23a+=_0x4af5cb;}return _0x41f23a;},'varargs':0x0,'get':function(_0xcc5525){SYSCALLS[_0x3149('0x236')]+=0x4;var _0x496b99=HEAP32[SYSCALLS[_0x3149('0x236')]-0x4>>0x2];return _0x496b99;},'getStr':function(){var _0xa470c6=UTF8ToString(SYSCALLS[_0x3149('0x156')]());return _0xa470c6;},'getStreamFromFD':function(){var _0x56f9fc=FS[_0x3149('0x1c2')](SYSCALLS[_0x3149('0x156')]());if(!_0x56f9fc)throw new FS['ErrnoError'](ERRNO_CODES['EBADF']);return _0x56f9fc;},'getSocketFromFD':function(){var _0x48ac9a=SOCKFS[_0x3149('0x237')](SYSCALLS['get']());if(!_0x48ac9a)throw new FS[(_0x3149('0xed'))](ERRNO_CODES['EBADF']);return _0x48ac9a;},'getSocketAddress':function(_0x1d81ea){var _0x54591f=SYSCALLS[_0x3149('0x156')](),_0x24b9c8=SYSCALLS[_0x3149('0x156')]();if(_0x1d81ea&&_0x54591f===0x0)return null;var _0x341709=__read_sockaddr(_0x54591f,_0x24b9c8);if(_0x341709[_0x3149('0x173')])throw new FS[(_0x3149('0xed'))](_0x341709[_0x3149('0x173')]);_0x341709['addr']=DNS[_0x3149('0x238')](_0x341709[_0x3149('0x239')])||_0x341709[_0x3149('0x239')];return _0x341709;},'get64':function(){var _0x327d36=SYSCALLS[_0x3149('0x156')](),_0x559091=SYSCALLS['get']();return _0x327d36;},'getZero':function(){SYSCALLS[_0x3149('0x156')]();}};function ___syscall10(_0x2e4dbc,_0x45d3aa){SYSCALLS[_0x3149('0x236')]=_0x45d3aa;try{var _0x51fe6f=SYSCALLS[_0x3149('0x23a')]();FS['unlink'](_0x51fe6f);return 0x0;}catch(_0x3a8457){if(typeof FS===_0x3149('0x1')||!(_0x3a8457 instanceof FS[_0x3149('0xed')]))abort(_0x3a8457);return-_0x3a8457[_0x3149('0x173')];}}function ___syscall140(_0x2ccff5,_0x473028){SYSCALLS['varargs']=_0x473028;try{var _0xacb94=SYSCALLS[_0x3149('0x23b')](),_0x155d55=SYSCALLS[_0x3149('0x156')](),_0x199be8=SYSCALLS[_0x3149('0x156')](),_0x122488=SYSCALLS[_0x3149('0x156')](),_0x236bb2=SYSCALLS[_0x3149('0x156')]();if(!(_0x155d55==-0x1&&_0x199be8<0x0)&&!(_0x155d55==0x0&&_0x199be8>=0x0)){return-ERRNO_CODES['EOVERFLOW'];}var _0x546f4b=_0x199be8;FS[_0x3149('0x10b')](_0xacb94,_0x546f4b,_0x236bb2);tempI64=[_0xacb94['position']>>>0x0,(tempDouble=_0xacb94['position'],+Math_abs(tempDouble)>=0x1?tempDouble>0x0?(Math_min(+Math_floor(tempDouble/0x100000000),0xffffffff)|0x0)>>>0x0:~~+Math_ceil((tempDouble-+(~~tempDouble>>>0x0))/0x100000000)>>>0x0:0x0)],HEAP32[_0x122488>>0x2]=tempI64[0x0],HEAP32[_0x122488+0x4>>0x2]=tempI64[0x1];if(_0xacb94['getdents']&&_0x546f4b===0x0&&_0x236bb2===0x0)_0xacb94[_0x3149('0x1d1')]=null;return 0x0;}catch(_0x5b6107){if(typeof FS===_0x3149('0x1')||!(_0x5b6107 instanceof FS['ErrnoError']))abort(_0x5b6107);return-_0x5b6107[_0x3149('0x173')];}}function ___syscall145(_0x11936b,_0x2ec98d){SYSCALLS[_0x3149('0x236')]=_0x2ec98d;try{var _0x12ba90=SYSCALLS['getStreamFromFD'](),_0xc40e77=SYSCALLS['get'](),_0x414b4d=SYSCALLS[_0x3149('0x156')]();return SYSCALLS[_0x3149('0x23c')](_0x12ba90,_0xc40e77,_0x414b4d);}catch(_0x44a026){if(typeof FS===_0x3149('0x1')||!(_0x44a026 instanceof FS[_0x3149('0xed')]))abort(_0x44a026);return-_0x44a026[_0x3149('0x173')];}}function ___syscall146(_0x46540e,_0x4e6b24){SYSCALLS[_0x3149('0x236')]=_0x4e6b24;try{var _0x236d88=SYSCALLS[_0x3149('0x23b')](),_0x2a5802=SYSCALLS[_0x3149('0x156')](),_0x18cffe=SYSCALLS[_0x3149('0x156')]();return SYSCALLS[_0x3149('0x23d')](_0x236d88,_0x2a5802,_0x18cffe);}catch(_0x3c4867){if(typeof FS===_0x3149('0x1')||!(_0x3c4867 instanceof FS['ErrnoError']))abort(_0x3c4867);return-_0x3c4867['errno'];}}function ___syscall194(_0x30df96,_0x1d7c4f){SYSCALLS[_0x3149('0x236')]=_0x1d7c4f;try{var _0x5998a1=SYSCALLS[_0x3149('0x156')](),_0x293b7d=SYSCALLS[_0x3149('0x23e')](),_0x34810c=SYSCALLS[_0x3149('0x23f')]();FS[_0x3149('0x240')](_0x5998a1,_0x34810c);return 0x0;}catch(_0x5f4e89){if(typeof FS===_0x3149('0x1')||!(_0x5f4e89 instanceof FS[_0x3149('0xed')]))abort(_0x5f4e89);return-_0x5f4e89[_0x3149('0x173')];}}function ___syscall195(_0x1a4177,_0x34dd59){SYSCALLS['varargs']=_0x34dd59;try{var _0x1f0d6d=SYSCALLS[_0x3149('0x23a')](),_0x4bfc0d=SYSCALLS[_0x3149('0x156')]();return SYSCALLS[_0x3149('0x241')](FS['stat'],_0x1f0d6d,_0x4bfc0d);}catch(_0x5939d1){if(typeof FS==='undefined'||!(_0x5939d1 instanceof FS[_0x3149('0xed')]))abort(_0x5939d1);return-_0x5939d1[_0x3149('0x173')];}}function ___syscall197(_0x4cf1a2,_0x4be962){SYSCALLS[_0x3149('0x236')]=_0x4be962;try{var _0x53324f=SYSCALLS[_0x3149('0x23b')](),_0x29de94=SYSCALLS[_0x3149('0x156')]();return SYSCALLS[_0x3149('0x241')](FS['stat'],_0x53324f['path'],_0x29de94);}catch(_0x3129ba){if(typeof FS===_0x3149('0x1')||!(_0x3129ba instanceof FS[_0x3149('0xed')]))abort(_0x3129ba);return-_0x3129ba[_0x3149('0x173')];}}function ___syscall221(_0x1ad999,_0x114777){SYSCALLS[_0x3149('0x236')]=_0x114777;try{var _0x1cb3bd=SYSCALLS[_0x3149('0x23b')](),_0x2c4282=SYSCALLS[_0x3149('0x156')]();switch(_0x2c4282){case 0x0:{var _0x17b2fe=SYSCALLS[_0x3149('0x156')]();if(_0x17b2fe<0x0){return-ERRNO_CODES[_0x3149('0x234')];}var _0x1a216c;_0x1a216c=FS['open'](_0x1cb3bd[_0x3149('0x4c')],_0x1cb3bd[_0x3149('0x183')],0x0,_0x17b2fe);return _0x1a216c['fd'];}case 0x1:case 0x2:return 0x0;case 0x3:return _0x1cb3bd[_0x3149('0x183')];case 0x4:{var _0x17b2fe=SYSCALLS[_0x3149('0x156')]();_0x1cb3bd[_0x3149('0x183')]|=_0x17b2fe;return 0x0;}case 0xc:{var _0x17b2fe=SYSCALLS[_0x3149('0x156')]();var _0x552e52=0x0;HEAP16[_0x17b2fe+_0x552e52>>0x1]=0x2;return 0x0;}case 0xd:case 0xe:return 0x0;case 0x10:case 0x8:return-ERRNO_CODES['EINVAL'];case 0x9:___setErrNo(ERRNO_CODES[_0x3149('0x234')]);return-0x1;default:{return-ERRNO_CODES['EINVAL'];}}}catch(_0x2e2ab2){if(typeof FS===_0x3149('0x1')||!(_0x2e2ab2 instanceof FS['ErrnoError']))abort(_0x2e2ab2);return-_0x2e2ab2['errno'];}}function ___syscall33(_0x104f44,_0xf8a89b){SYSCALLS[_0x3149('0x236')]=_0xf8a89b;try{var _0x150740=SYSCALLS[_0x3149('0x23a')](),_0x3d4cfe=SYSCALLS[_0x3149('0x156')]();return SYSCALLS[_0x3149('0x242')](_0x150740,_0x3d4cfe);}catch(_0x28fe5f){if(typeof FS===_0x3149('0x1')||!(_0x28fe5f instanceof FS['ErrnoError']))abort(_0x28fe5f);return-_0x28fe5f[_0x3149('0x173')];}}function ___syscall330(_0x3f7bae,_0x4dd72d){SYSCALLS[_0x3149('0x236')]=_0x4dd72d;try{var _0x5ba0fd=SYSCALLS[_0x3149('0x23b')](),_0x852feb=SYSCALLS[_0x3149('0x156')](),_0x344830=SYSCALLS[_0x3149('0x156')]();if(_0x5ba0fd['fd']===_0x852feb)return-ERRNO_CODES[_0x3149('0x234')];return SYSCALLS['doDup'](_0x5ba0fd[_0x3149('0x4c')],_0x5ba0fd['flags'],_0x852feb);}catch(_0x1d6bf8){if(typeof FS===_0x3149('0x1')||!(_0x1d6bf8 instanceof FS[_0x3149('0xed')]))abort(_0x1d6bf8);return-_0x1d6bf8[_0x3149('0x173')];}}function ___syscall5(_0x5fbccf,_0xc9e389){SYSCALLS[_0x3149('0x236')]=_0xc9e389;try{var _0x24beb9=SYSCALLS[_0x3149('0x23a')](),_0x441386=SYSCALLS['get'](),_0x53e6ed=SYSCALLS[_0x3149('0x156')]();var _0x37707a=FS[_0x3149('0x36')](_0x24beb9,_0x441386,_0x53e6ed);return _0x37707a['fd'];}catch(_0x556d93){if(typeof FS===_0x3149('0x1')||!(_0x556d93 instanceof FS[_0x3149('0xed')]))abort(_0x556d93);return-_0x556d93[_0x3149('0x173')];}}function ___syscall54(_0x34f249,_0x451675){SYSCALLS[_0x3149('0x236')]=_0x451675;try{var _0x35be87=SYSCALLS[_0x3149('0x23b')](),_0x1a0749=SYSCALLS[_0x3149('0x156')]();switch(_0x1a0749){case 0x5405:case 0x5401:{if(!_0x35be87[_0x3149('0xee')])return-ERRNO_CODES[_0x3149('0x243')];return 0x0;}case 0x5406:case 0x5407:case 0x5408:case 0x5402:case 0x5403:case 0x5404:{if(!_0x35be87['tty'])return-ERRNO_CODES['ENOTTY'];return 0x0;}case 0x540f:{if(!_0x35be87[_0x3149('0xee')])return-ERRNO_CODES[_0x3149('0x243')];var _0x3c6a02=SYSCALLS[_0x3149('0x156')]();HEAP32[_0x3c6a02>>0x2]=0x0;return 0x0;}case 0x5410:{if(!_0x35be87[_0x3149('0xee')])return-ERRNO_CODES[_0x3149('0x243')];return-ERRNO_CODES[_0x3149('0x234')];}case 0x541b:{var _0x3c6a02=SYSCALLS[_0x3149('0x156')]();return FS[_0x3149('0x1d6')](_0x35be87,_0x1a0749,_0x3c6a02);}case 0x5413:{if(!_0x35be87[_0x3149('0xee')])return-ERRNO_CODES[_0x3149('0x243')];return 0x0;}case 0x5414:{if(!_0x35be87[_0x3149('0xee')])return-ERRNO_CODES[_0x3149('0x243')];return 0x0;}default:abort(_0x3149('0x244')+_0x1a0749);}}catch(_0x20891c){if(typeof FS===_0x3149('0x1')||!(_0x20891c instanceof FS[_0x3149('0xed')]))abort(_0x20891c);return-_0x20891c['errno'];}}function ___syscall6(_0x4438dc,_0x256786){SYSCALLS[_0x3149('0x236')]=_0x256786;try{var _0x389b01=SYSCALLS[_0x3149('0x23b')]();FS[_0x3149('0x1d2')](_0x389b01);return 0x0;}catch(_0x54617b){if(typeof FS==='undefined'||!(_0x54617b instanceof FS[_0x3149('0xed')]))abort(_0x54617b);return-_0x54617b[_0x3149('0x173')];}}function ___syscall63(_0x1b4e58,_0x374ead){SYSCALLS[_0x3149('0x236')]=_0x374ead;try{var _0x52a33c=SYSCALLS[_0x3149('0x23b')](),_0x1892bd=SYSCALLS[_0x3149('0x156')]();if(_0x52a33c['fd']===_0x1892bd)return _0x1892bd;return SYSCALLS[_0x3149('0x245')](_0x52a33c[_0x3149('0x4c')],_0x52a33c[_0x3149('0x183')],_0x1892bd);}catch(_0x343509){if(typeof FS===_0x3149('0x1')||!(_0x343509 instanceof FS[_0x3149('0xed')]))abort(_0x343509);return-_0x343509[_0x3149('0x173')];}}function ___unlock(){}var tupleRegistrations={};function runDestructors(_0x4513f8){while(_0x4513f8[_0x3149('0x35')]){var _0x5f1247=_0x4513f8[_0x3149('0x1ac')]();var _0x2a7fc5=_0x4513f8[_0x3149('0x1ac')]();_0x2a7fc5(_0x5f1247);}}function simpleReadValueFromPointer(_0x1413de){return this[_0x3149('0x246')](HEAPU32[_0x1413de>>0x2]);}var awaitingDependencies={};var registeredTypes={};var typeDependencies={};var char_0=0x30;var char_9=0x39;function makeLegalFunctionName(_0x3bca53){if(undefined===_0x3bca53){return _0x3149('0x247');}_0x3bca53=_0x3bca53[_0x3149('0x51')](/[^a-zA-Z0-9_]/g,'$');var _0x3c21d5=_0x3bca53['charCodeAt'](0x0);if(_0x3c21d5>=char_0&&_0x3c21d5<=char_9){return'_'+_0x3bca53;}else{return _0x3bca53;}}function createNamedFunction(_0x18a163,_0x315981){_0x18a163=makeLegalFunctionName(_0x18a163);return new Function('body',_0x3149('0x248')+_0x18a163+_0x3149('0x249')+_0x3149('0x24a')+_0x3149('0x24b')+_0x3149('0x24c'))(_0x315981);}function extendError(_0x43887c,_0x47b1e0){var _0x1abd71=createNamedFunction(_0x47b1e0,function(_0x550c42){this[_0x3149('0x2b')]=_0x47b1e0;this[_0x3149('0x1ba')]=_0x550c42;var _0x331d60=new Error(_0x550c42)[_0x3149('0x25')];if(_0x331d60!==undefined){this[_0x3149('0x25')]=this[_0x3149('0x8')]()+'\x0a'+_0x331d60[_0x3149('0x51')](/^Error(:[^\n]*)?\n/,'');}});_0x1abd71[_0x3149('0x2a')]=Object['create'](_0x43887c['prototype']);_0x1abd71[_0x3149('0x2a')][_0x3149('0x1f9')]=_0x1abd71;_0x1abd71[_0x3149('0x2a')][_0x3149('0x8')]=function(){if(this[_0x3149('0x1ba')]===undefined){return this['name'];}else{return this[_0x3149('0x2b')]+':\x20'+this[_0x3149('0x1ba')];}};return _0x1abd71;}var InternalError=undefined;function throwInternalError(_0x43dfe0){throw new InternalError(_0x43dfe0);}function whenDependentTypesAreResolved(_0x2eb001,_0x381842,_0x1c69ce){_0x2eb001[_0x3149('0x15b')](function(_0x11d162){typeDependencies[_0x11d162]=_0x381842;});function _0x4d9e5e(_0x1a5121){var _0x5752b9=_0x1c69ce(_0x1a5121);if(_0x5752b9[_0x3149('0x35')]!==_0x2eb001['length']){throwInternalError(_0x3149('0x24d'));}for(var _0x4b36d8=0x0;_0x4b36d8<_0x2eb001[_0x3149('0x35')];++_0x4b36d8){registerType(_0x2eb001[_0x4b36d8],_0x5752b9[_0x4b36d8]);}}var _0x3b2a90=new Array(_0x381842[_0x3149('0x35')]);var _0x2d968a=[];var _0x38b39c=0x0;_0x381842[_0x3149('0x15b')](function(_0x79ece2,_0x4653f5){if(registeredTypes['hasOwnProperty'](_0x79ece2)){_0x3b2a90[_0x4653f5]=registeredTypes[_0x79ece2];}else{_0x2d968a[_0x3149('0x40')](_0x79ece2);if(!awaitingDependencies[_0x3149('0x46')](_0x79ece2)){awaitingDependencies[_0x79ece2]=[];}awaitingDependencies[_0x79ece2][_0x3149('0x40')](function(){_0x3b2a90[_0x4653f5]=registeredTypes[_0x79ece2];++_0x38b39c;if(_0x38b39c===_0x2d968a[_0x3149('0x35')]){_0x4d9e5e(_0x3b2a90);}});}});if(0x0===_0x2d968a[_0x3149('0x35')]){_0x4d9e5e(_0x3b2a90);}}function __embind_finalize_value_array(_0x398f90){var _0x331ea5=tupleRegistrations[_0x398f90];delete tupleRegistrations[_0x398f90];var _0x2e6a9e=_0x331ea5[_0x3149('0x24e')];var _0x1b7ca2=_0x2e6a9e['length'];var _0x2fafe0=_0x2e6a9e['map'](function(_0x1de46e){return _0x1de46e['getterReturnType'];})[_0x3149('0x70')](_0x2e6a9e[_0x3149('0x146')](function(_0x19a1a6){return _0x19a1a6[_0x3149('0x24f')];}));var _0x6b88b1=_0x331ea5['rawConstructor'];var _0x1edbbc=_0x331ea5[_0x3149('0x250')];whenDependentTypesAreResolved([_0x398f90],_0x2fafe0,function(_0xa043f5){_0x2e6a9e['forEach'](function(_0x5a06ed,_0x5e4968){var _0x219e97=_0xa043f5[_0x5e4968];var _0x4d926a=_0x5a06ed[_0x3149('0x210')];var _0x3c2565=_0x5a06ed['getterContext'];var _0x36491f=_0xa043f5[_0x5e4968+_0x1b7ca2];var _0x3e2191=_0x5a06ed['setter'];var _0x5dbedc=_0x5a06ed['setterContext'];_0x5a06ed[_0x3149('0x4b')]=function(_0x13579d){return _0x219e97[_0x3149('0x246')](_0x4d926a(_0x3c2565,_0x13579d));};_0x5a06ed[_0x3149('0x10d')]=function(_0x289bb4,_0x279053){var _0x393314=[];_0x3e2191(_0x5dbedc,_0x289bb4,_0x36491f[_0x3149('0x251')](_0x393314,_0x279053));runDestructors(_0x393314);};});return[{'name':_0x331ea5['name'],'fromWireType':function(_0x2182ee){var _0x4027f3=new Array(_0x1b7ca2);for(var _0x13f25e=0x0;_0x13f25e<_0x1b7ca2;++_0x13f25e){_0x4027f3[_0x13f25e]=_0x2e6a9e[_0x13f25e][_0x3149('0x4b')](_0x2182ee);}_0x1edbbc(_0x2182ee);return _0x4027f3;},'toWireType':function(_0x1f7415,_0x50fcf6){if(_0x1b7ca2!==_0x50fcf6[_0x3149('0x35')]){throw new TypeError(_0x3149('0x252')+_0x331ea5[_0x3149('0x2b')]+_0x3149('0x253')+_0x1b7ca2+_0x3149('0x254')+_0x50fcf6[_0x3149('0x35')]);}var _0x42c9be=_0x6b88b1();for(var _0x570a8b=0x0;_0x570a8b<_0x1b7ca2;++_0x570a8b){_0x2e6a9e[_0x570a8b]['write'](_0x42c9be,_0x50fcf6[_0x570a8b]);}if(_0x1f7415!==null){_0x1f7415[_0x3149('0x40')](_0x1edbbc,_0x42c9be);}return _0x42c9be;},'argPackAdvance':0x8,'readValueFromPointer':simpleReadValueFromPointer,'destructorFunction':_0x1edbbc}];});}var structRegistrations={};function __embind_finalize_value_object(_0x4949af){var _0x1869a5=structRegistrations[_0x4949af];delete structRegistrations[_0x4949af];var _0x152b9=_0x1869a5['rawConstructor'];var _0x1cb36c=_0x1869a5[_0x3149('0x250')];var _0x57db8f=_0x1869a5['fields'];var _0xb729bc=_0x57db8f[_0x3149('0x146')](function(_0x46c0bd){return _0x46c0bd['getterReturnType'];})[_0x3149('0x70')](_0x57db8f[_0x3149('0x146')](function(_0x1451a9){return _0x1451a9[_0x3149('0x24f')];}));whenDependentTypesAreResolved([_0x4949af],_0xb729bc,function(_0x10db17){var _0x4b74f9={};_0x57db8f[_0x3149('0x15b')](function(_0x3d5cf9,_0x26d6d4){var _0x361d07=_0x3d5cf9['fieldName'];var _0xd91bf7=_0x10db17[_0x26d6d4];var _0x59529e=_0x3d5cf9['getter'];var _0x3eb860=_0x3d5cf9[_0x3149('0x255')];var _0x321154=_0x10db17[_0x26d6d4+_0x57db8f[_0x3149('0x35')]];var _0x191a47=_0x3d5cf9[_0x3149('0x256')];var _0x34dc69=_0x3d5cf9[_0x3149('0x257')];_0x4b74f9[_0x361d07]={'read':function(_0xaf3477){return _0xd91bf7[_0x3149('0x246')](_0x59529e(_0x3eb860,_0xaf3477));},'write':function(_0x51f814,_0xd02257){var _0xa7c7fe=[];_0x191a47(_0x34dc69,_0x51f814,_0x321154[_0x3149('0x251')](_0xa7c7fe,_0xd02257));runDestructors(_0xa7c7fe);}};});return[{'name':_0x1869a5[_0x3149('0x2b')],'fromWireType':function(_0x26890d){var _0x5e88e1={};for(var _0x50fdbc in _0x4b74f9){_0x5e88e1[_0x50fdbc]=_0x4b74f9[_0x50fdbc]['read'](_0x26890d);}_0x1cb36c(_0x26890d);return _0x5e88e1;},'toWireType':function(_0x55c097,_0x25ff94){for(var _0x535fdc in _0x4b74f9){if(!(_0x535fdc in _0x25ff94)){throw new TypeError(_0x3149('0x258'));}}var _0x20f9a2=_0x152b9();for(_0x535fdc in _0x4b74f9){_0x4b74f9[_0x535fdc][_0x3149('0x10d')](_0x20f9a2,_0x25ff94[_0x535fdc]);}if(_0x55c097!==null){_0x55c097[_0x3149('0x40')](_0x1cb36c,_0x20f9a2);}return _0x20f9a2;},'argPackAdvance':0x8,'readValueFromPointer':simpleReadValueFromPointer,'destructorFunction':_0x1cb36c}];});}function getShiftFromSize(_0x5a2305){switch(_0x5a2305){case 0x1:return 0x0;case 0x2:return 0x1;case 0x4:return 0x2;case 0x8:return 0x3;default:throw new TypeError('Unknown\x20type\x20size:\x20'+_0x5a2305);}}function embind_init_charCodes(){var _0x3013f9=new Array(0x100);for(var _0x507593=0x0;_0x507593<0x100;++_0x507593){_0x3013f9[_0x507593]=String[_0x3149('0x86')](_0x507593);}embind_charCodes=_0x3013f9;}var embind_charCodes=undefined;function readLatin1String(_0x3a1d59){var _0x2e5b6c='';var _0x44e7b2=_0x3a1d59;while(HEAPU8[_0x44e7b2]){_0x2e5b6c+=embind_charCodes[HEAPU8[_0x44e7b2++]];}return _0x2e5b6c;}var BindingError=undefined;function throwBindingError(_0x4557fe){throw new BindingError(_0x4557fe);}function registerType(_0x290983,_0x4d68f3,_0x42b903){_0x42b903=_0x42b903||{};if(!(_0x3149('0x259')in _0x4d68f3)){throw new TypeError(_0x3149('0x25a'));}var _0x1e2fad=_0x4d68f3['name'];if(!_0x290983){throwBindingError('type\x20\x22'+_0x1e2fad+_0x3149('0x25b'));}if(registeredTypes[_0x3149('0x46')](_0x290983)){if(_0x42b903[_0x3149('0x25c')]){return;}else{throwBindingError(_0x3149('0x25d')+_0x1e2fad+'\x27\x20twice');}}registeredTypes[_0x290983]=_0x4d68f3;delete typeDependencies[_0x290983];if(awaitingDependencies[_0x3149('0x46')](_0x290983)){var _0x2454b0=awaitingDependencies[_0x290983];delete awaitingDependencies[_0x290983];_0x2454b0[_0x3149('0x15b')](function(_0x1b544f){_0x1b544f();});}}function __embind_register_bool(_0x176bd4,_0x38d1da,_0x363cf8,_0x4ecea6,_0x3e0df5){var _0x39413b=getShiftFromSize(_0x363cf8);_0x38d1da=readLatin1String(_0x38d1da);registerType(_0x176bd4,{'name':_0x38d1da,'fromWireType':function(_0x55dd66){return!!_0x55dd66;},'toWireType':function(_0x535185,_0x513a83){return _0x513a83?_0x4ecea6:_0x3e0df5;},'argPackAdvance':0x8,'readValueFromPointer':function(_0x3c1c23){var _0x462f00;if(_0x363cf8===0x1){_0x462f00=HEAP8;}else if(_0x363cf8===0x2){_0x462f00=HEAP16;}else if(_0x363cf8===0x4){_0x462f00=HEAP32;}else{throw new TypeError(_0x3149('0x25e')+_0x38d1da);}return this[_0x3149('0x246')](_0x462f00[_0x3c1c23>>_0x39413b]);},'destructorFunction':null});}function ClassHandle_isAliasOf(_0x4159f2){if(!(this instanceof ClassHandle)){return![];}if(!(_0x4159f2 instanceof ClassHandle)){return![];}var _0x3cb6ef=this['$$'][_0x3149('0x25f')][_0x3149('0x260')];var _0x27d08b=this['$$'][_0x3149('0x261')];var _0x1f08df=_0x4159f2['$$'][_0x3149('0x25f')][_0x3149('0x260')];var _0x4bda46=_0x4159f2['$$']['ptr'];while(_0x3cb6ef[_0x3149('0x262')]){_0x27d08b=_0x3cb6ef[_0x3149('0x263')](_0x27d08b);_0x3cb6ef=_0x3cb6ef[_0x3149('0x262')];}while(_0x1f08df[_0x3149('0x262')]){_0x4bda46=_0x1f08df[_0x3149('0x263')](_0x4bda46);_0x1f08df=_0x1f08df[_0x3149('0x262')];}return _0x3cb6ef===_0x1f08df&&_0x27d08b===_0x4bda46;}function shallowCopyInternalPointer(_0x546e42){return{'count':_0x546e42[_0x3149('0x264')],'deleteScheduled':_0x546e42['deleteScheduled'],'preservePointerOnDelete':_0x546e42['preservePointerOnDelete'],'ptr':_0x546e42['ptr'],'ptrType':_0x546e42[_0x3149('0x25f')],'smartPtr':_0x546e42[_0x3149('0x265')],'smartPtrType':_0x546e42[_0x3149('0x266')]};}function throwInstanceAlreadyDeleted(_0xd7fd21){function _0x108b9e(_0x58a550){return _0x58a550['$$'][_0x3149('0x25f')]['registeredClass']['name'];}throwBindingError(_0x108b9e(_0xd7fd21)+_0x3149('0x267'));}function ClassHandle_clone(){if(!this['$$'][_0x3149('0x261')]){throwInstanceAlreadyDeleted(this);}if(this['$$'][_0x3149('0x268')]){this['$$'][_0x3149('0x264')][_0x3149('0x269')]+=0x1;return this;}else{var _0x9bda64=Object[_0x3149('0x207')](Object[_0x3149('0x26a')](this),{'$$':{'value':shallowCopyInternalPointer(this['$$'])}});_0x9bda64['$$'][_0x3149('0x264')][_0x3149('0x269')]+=0x1;_0x9bda64['$$'][_0x3149('0x26b')]=![];return _0x9bda64;}}function runDestructor(_0x418d34){var _0x15e05e=_0x418d34['$$'];if(_0x15e05e[_0x3149('0x265')]){_0x15e05e[_0x3149('0x266')][_0x3149('0x250')](_0x15e05e[_0x3149('0x265')]);}else{_0x15e05e[_0x3149('0x25f')][_0x3149('0x260')]['rawDestructor'](_0x15e05e[_0x3149('0x261')]);}}function ClassHandle_delete(){if(!this['$$'][_0x3149('0x261')]){throwInstanceAlreadyDeleted(this);}if(this['$$'][_0x3149('0x26b')]&&!this['$$']['preservePointerOnDelete']){throwBindingError(_0x3149('0x26c'));}this['$$'][_0x3149('0x264')][_0x3149('0x269')]-=0x1;var _0x51744b=0x0===this['$$'][_0x3149('0x264')][_0x3149('0x269')];if(_0x51744b){runDestructor(this);}if(!this['$$'][_0x3149('0x268')]){this['$$'][_0x3149('0x265')]=undefined;this['$$'][_0x3149('0x261')]=undefined;}}function ClassHandle_isDeleted(){return!this['$$'][_0x3149('0x261')];}var delayFunction=undefined;var deletionQueue=[];function flushPendingDeletes(){while(deletionQueue[_0x3149('0x35')]){var _0x3ddd7a=deletionQueue['pop']();_0x3ddd7a['$$'][_0x3149('0x26b')]=![];_0x3ddd7a[_0x3149('0x158')]();}}function ClassHandle_deleteLater(){if(!this['$$'][_0x3149('0x261')]){throwInstanceAlreadyDeleted(this);}if(this['$$'][_0x3149('0x26b')]&&!this['$$']['preservePointerOnDelete']){throwBindingError(_0x3149('0x26c'));}deletionQueue[_0x3149('0x40')](this);if(deletionQueue[_0x3149('0x35')]===0x1&&delayFunction){delayFunction(flushPendingDeletes);}this['$$'][_0x3149('0x26b')]=!![];return this;}function init_ClassHandle(){ClassHandle[_0x3149('0x2a')][_0x3149('0x26d')]=ClassHandle_isAliasOf;ClassHandle[_0x3149('0x2a')][_0x3149('0x26e')]=ClassHandle_clone;ClassHandle[_0x3149('0x2a')]['delete']=ClassHandle_delete;ClassHandle[_0x3149('0x2a')][_0x3149('0x26f')]=ClassHandle_isDeleted;ClassHandle['prototype'][_0x3149('0x270')]=ClassHandle_deleteLater;}function ClassHandle(){}var registeredPointers={};function ensureOverloadTable(_0x4bd3c6,_0x2c6a40,_0xe3d76d){if(undefined===_0x4bd3c6[_0x2c6a40]['overloadTable']){var _0x18175b=_0x4bd3c6[_0x2c6a40];_0x4bd3c6[_0x2c6a40]=function(){if(!_0x4bd3c6[_0x2c6a40][_0x3149('0x271')][_0x3149('0x46')](arguments[_0x3149('0x35')])){throwBindingError(_0x3149('0x272')+_0xe3d76d+'\x27\x20called\x20with\x20an\x20invalid\x20number\x20of\x20arguments\x20('+arguments['length']+_0x3149('0x273')+_0x4bd3c6[_0x2c6a40]['overloadTable']+')!');}return _0x4bd3c6[_0x2c6a40][_0x3149('0x271')][arguments[_0x3149('0x35')]]['apply'](this,arguments);};_0x4bd3c6[_0x2c6a40][_0x3149('0x271')]=[];_0x4bd3c6[_0x2c6a40]['overloadTable'][_0x18175b[_0x3149('0x274')]]=_0x18175b;}}function exposePublicSymbol(_0xfc80a5,_0xfddaaa,_0x1b4868){if(Module['hasOwnProperty'](_0xfc80a5)){if(undefined===_0x1b4868||undefined!==Module[_0xfc80a5][_0x3149('0x271')]&&undefined!==Module[_0xfc80a5][_0x3149('0x271')][_0x1b4868]){throwBindingError(_0x3149('0x275')+_0xfc80a5+_0x3149('0x276'));}ensureOverloadTable(Module,_0xfc80a5,_0xfc80a5);if(Module[_0x3149('0x46')](_0x1b4868)){throwBindingError(_0x3149('0x277')+_0x1b4868+')!');}Module[_0xfc80a5][_0x3149('0x271')][_0x1b4868]=_0xfddaaa;}else{Module[_0xfc80a5]=_0xfddaaa;if(undefined!==_0x1b4868){Module[_0xfc80a5][_0x3149('0x278')]=_0x1b4868;}}}function RegisteredClass(_0x43dd68,_0x4d1461,_0x2a460c,_0x4be0b8,_0x509151,_0xb3c78f,_0x3e7217,_0x394262){this[_0x3149('0x2b')]=_0x43dd68;this['constructor']=_0x4d1461;this[_0x3149('0x279')]=_0x2a460c;this[_0x3149('0x250')]=_0x4be0b8;this[_0x3149('0x262')]=_0x509151;this[_0x3149('0x27a')]=_0xb3c78f;this[_0x3149('0x263')]=_0x3e7217;this['downcast']=_0x394262;this['pureVirtualFunctions']=[];}function upcastPointer(_0x24fdf6,_0x446db0,_0x5566b6){while(_0x446db0!==_0x5566b6){if(!_0x446db0[_0x3149('0x263')]){throwBindingError('Expected\x20null\x20or\x20instance\x20of\x20'+_0x5566b6[_0x3149('0x2b')]+',\x20got\x20an\x20instance\x20of\x20'+_0x446db0[_0x3149('0x2b')]);}_0x24fdf6=_0x446db0[_0x3149('0x263')](_0x24fdf6);_0x446db0=_0x446db0[_0x3149('0x262')];}return _0x24fdf6;}function constNoSmartPtrRawPointerToWireType(_0x166387,_0x5a0262){if(_0x5a0262===null){if(this[_0x3149('0x27b')]){throwBindingError(_0x3149('0x27c')+this[_0x3149('0x2b')]);}return 0x0;}if(!_0x5a0262['$$']){throwBindingError(_0x3149('0x27d')+_embind_repr(_0x5a0262)+_0x3149('0x27e')+this[_0x3149('0x2b')]);}if(!_0x5a0262['$$'][_0x3149('0x261')]){throwBindingError(_0x3149('0x27f')+this[_0x3149('0x2b')]);}var _0x3c9819=_0x5a0262['$$']['ptrType'][_0x3149('0x260')];var _0x4b7508=upcastPointer(_0x5a0262['$$'][_0x3149('0x261')],_0x3c9819,this[_0x3149('0x260')]);return _0x4b7508;}function genericPointerToWireType(_0x4b13b6,_0x1e85b7){var _0xb41d9;if(_0x1e85b7===null){if(this[_0x3149('0x27b')]){throwBindingError(_0x3149('0x27c')+this[_0x3149('0x2b')]);}if(this['isSmartPointer']){_0xb41d9=this['rawConstructor']();if(_0x4b13b6!==null){_0x4b13b6[_0x3149('0x40')](this['rawDestructor'],_0xb41d9);}return _0xb41d9;}else{return 0x0;}}if(!_0x1e85b7['$$']){throwBindingError(_0x3149('0x27d')+_embind_repr(_0x1e85b7)+'\x22\x20as\x20a\x20'+this[_0x3149('0x2b')]);}if(!_0x1e85b7['$$'][_0x3149('0x261')]){throwBindingError(_0x3149('0x27f')+this[_0x3149('0x2b')]);}if(!this['isConst']&&_0x1e85b7['$$'][_0x3149('0x25f')][_0x3149('0x280')]){throwBindingError(_0x3149('0x281')+(_0x1e85b7['$$'][_0x3149('0x266')]?_0x1e85b7['$$'][_0x3149('0x266')][_0x3149('0x2b')]:_0x1e85b7['$$'][_0x3149('0x25f')][_0x3149('0x2b')])+_0x3149('0x282')+this[_0x3149('0x2b')]);}var _0x540168=_0x1e85b7['$$'][_0x3149('0x25f')][_0x3149('0x260')];_0xb41d9=upcastPointer(_0x1e85b7['$$'][_0x3149('0x261')],_0x540168,this['registeredClass']);if(this['isSmartPointer']){if(undefined===_0x1e85b7['$$'][_0x3149('0x265')]){throwBindingError(_0x3149('0x283'));}switch(this['sharingPolicy']){case 0x0:if(_0x1e85b7['$$']['smartPtrType']===this){_0xb41d9=_0x1e85b7['$$'][_0x3149('0x265')];}else{throwBindingError(_0x3149('0x281')+(_0x1e85b7['$$'][_0x3149('0x266')]?_0x1e85b7['$$'][_0x3149('0x266')][_0x3149('0x2b')]:_0x1e85b7['$$'][_0x3149('0x25f')][_0x3149('0x2b')])+_0x3149('0x282')+this[_0x3149('0x2b')]);}break;case 0x1:_0xb41d9=_0x1e85b7['$$'][_0x3149('0x265')];break;case 0x2:if(_0x1e85b7['$$'][_0x3149('0x266')]===this){_0xb41d9=_0x1e85b7['$$'][_0x3149('0x265')];}else{var _0x34ab51=_0x1e85b7[_0x3149('0x26e')]();_0xb41d9=this[_0x3149('0x284')](_0xb41d9,__emval_register(function(){_0x34ab51[_0x3149('0x158')]();}));if(_0x4b13b6!==null){_0x4b13b6['push'](this[_0x3149('0x250')],_0xb41d9);}}break;default:throwBindingError(_0x3149('0x285'));}}return _0xb41d9;}function nonConstNoSmartPtrRawPointerToWireType(_0x3a14ba,_0x2b00fe){if(_0x2b00fe===null){if(this[_0x3149('0x27b')]){throwBindingError(_0x3149('0x27c')+this[_0x3149('0x2b')]);}return 0x0;}if(!_0x2b00fe['$$']){throwBindingError(_0x3149('0x27d')+_embind_repr(_0x2b00fe)+_0x3149('0x27e')+this[_0x3149('0x2b')]);}if(!_0x2b00fe['$$'][_0x3149('0x261')]){throwBindingError(_0x3149('0x27f')+this[_0x3149('0x2b')]);}if(_0x2b00fe['$$'][_0x3149('0x25f')]['isConst']){throwBindingError(_0x3149('0x281')+_0x2b00fe['$$'][_0x3149('0x25f')][_0x3149('0x2b')]+_0x3149('0x282')+this[_0x3149('0x2b')]);}var _0x75f0c5=_0x2b00fe['$$'][_0x3149('0x25f')][_0x3149('0x260')];var _0x45b366=upcastPointer(_0x2b00fe['$$'][_0x3149('0x261')],_0x75f0c5,this[_0x3149('0x260')]);return _0x45b366;}function RegisteredPointer_getPointee(_0x5166d2){if(this[_0x3149('0x286')]){_0x5166d2=this['rawGetPointee'](_0x5166d2);}return _0x5166d2;}function RegisteredPointer_destructor(_0x4dd2f4){if(this[_0x3149('0x250')]){this[_0x3149('0x250')](_0x4dd2f4);}}function RegisteredPointer_deleteObject(_0xc0d662){if(_0xc0d662!==null){_0xc0d662['delete']();}}function downcastPointer(_0x5b4a74,_0x460630,_0x4e18b6){if(_0x460630===_0x4e18b6){return _0x5b4a74;}if(undefined===_0x4e18b6[_0x3149('0x262')]){return null;}var _0x4c771c=downcastPointer(_0x5b4a74,_0x460630,_0x4e18b6[_0x3149('0x262')]);if(_0x4c771c===null){return null;}return _0x4e18b6[_0x3149('0x287')](_0x4c771c);}function getInheritedInstanceCount(){return Object['keys'](registeredInstances)[_0x3149('0x35')];}function getLiveInheritedInstances(){var _0x587ce5=[];for(var _0x4bfd64 in registeredInstances){if(registeredInstances[_0x3149('0x46')](_0x4bfd64)){_0x587ce5[_0x3149('0x40')](registeredInstances[_0x4bfd64]);}}return _0x587ce5;}function setDelayFunction(_0x2ccfff){delayFunction=_0x2ccfff;if(deletionQueue[_0x3149('0x35')]&&delayFunction){delayFunction(flushPendingDeletes);}}function init_embind(){Module[_0x3149('0x288')]=getInheritedInstanceCount;Module[_0x3149('0x289')]=getLiveInheritedInstances;Module[_0x3149('0x28a')]=flushPendingDeletes;Module[_0x3149('0x28b')]=setDelayFunction;}var registeredInstances={};function getBasestPointer(_0x35f9c2,_0x491658){if(_0x491658===undefined){throwBindingError(_0x3149('0x28c'));}while(_0x35f9c2[_0x3149('0x262')]){_0x491658=_0x35f9c2[_0x3149('0x263')](_0x491658);_0x35f9c2=_0x35f9c2['baseClass'];}return _0x491658;}function getInheritedInstance(_0x3973ff,_0x502e6b){_0x502e6b=getBasestPointer(_0x3973ff,_0x502e6b);return registeredInstances[_0x502e6b];}function makeClassHandle(_0x1e3762,_0x404375){if(!_0x404375[_0x3149('0x25f')]||!_0x404375[_0x3149('0x261')]){throwInternalError(_0x3149('0x28d'));}var _0x19de56=!!_0x404375[_0x3149('0x266')];var _0x51e72d=!!_0x404375[_0x3149('0x265')];if(_0x19de56!==_0x51e72d){throwInternalError(_0x3149('0x28e'));}_0x404375[_0x3149('0x264')]={'value':0x1};return Object[_0x3149('0x207')](_0x1e3762,{'$$':{'value':_0x404375}});}function RegisteredPointer_fromWireType(_0x1f7c41){var _0x3b065e=this[_0x3149('0x28f')](_0x1f7c41);if(!_0x3b065e){this[_0x3149('0xd8')](_0x1f7c41);return null;}var _0x5f3d73=getInheritedInstance(this[_0x3149('0x260')],_0x3b065e);if(undefined!==_0x5f3d73){if(0x0===_0x5f3d73['$$'][_0x3149('0x264')][_0x3149('0x269')]){_0x5f3d73['$$'][_0x3149('0x261')]=_0x3b065e;_0x5f3d73['$$'][_0x3149('0x265')]=_0x1f7c41;return _0x5f3d73[_0x3149('0x26e')]();}else{var _0x44e82e=_0x5f3d73['clone']();this[_0x3149('0xd8')](_0x1f7c41);return _0x44e82e;}}function _0x27fa1e(){if(this[_0x3149('0x290')]){return makeClassHandle(this[_0x3149('0x260')][_0x3149('0x279')],{'ptrType':this[_0x3149('0x291')],'ptr':_0x3b065e,'smartPtrType':this,'smartPtr':_0x1f7c41});}else{return makeClassHandle(this[_0x3149('0x260')][_0x3149('0x279')],{'ptrType':this,'ptr':_0x1f7c41});}}var _0x5de8f8=this[_0x3149('0x260')]['getActualType'](_0x3b065e);var _0x2716b6=registeredPointers[_0x5de8f8];if(!_0x2716b6){return _0x27fa1e[_0x3149('0x79')](this);}var _0x56b2ee;if(this[_0x3149('0x280')]){_0x56b2ee=_0x2716b6[_0x3149('0x292')];}else{_0x56b2ee=_0x2716b6[_0x3149('0x293')];}var _0x1abfca=downcastPointer(_0x3b065e,this[_0x3149('0x260')],_0x56b2ee[_0x3149('0x260')]);if(_0x1abfca===null){return _0x27fa1e[_0x3149('0x79')](this);}if(this['isSmartPointer']){return makeClassHandle(_0x56b2ee[_0x3149('0x260')][_0x3149('0x279')],{'ptrType':_0x56b2ee,'ptr':_0x1abfca,'smartPtrType':this,'smartPtr':_0x1f7c41});}else{return makeClassHandle(_0x56b2ee[_0x3149('0x260')][_0x3149('0x279')],{'ptrType':_0x56b2ee,'ptr':_0x1abfca});}}function init_RegisteredPointer(){RegisteredPointer[_0x3149('0x2a')]['getPointee']=RegisteredPointer_getPointee;RegisteredPointer[_0x3149('0x2a')][_0x3149('0xd8')]=RegisteredPointer_destructor;RegisteredPointer[_0x3149('0x2a')][_0x3149('0x259')]=0x8;RegisteredPointer[_0x3149('0x2a')]['readValueFromPointer']=simpleReadValueFromPointer;RegisteredPointer[_0x3149('0x2a')][_0x3149('0x294')]=RegisteredPointer_deleteObject;RegisteredPointer[_0x3149('0x2a')][_0x3149('0x246')]=RegisteredPointer_fromWireType;}function RegisteredPointer(_0x41aa15,_0x24d96d,_0x4336f0,_0xd86286,_0x512f74,_0x494dca,_0x1fd9d9,_0x22e0d8,_0x2d9c75,_0x3bb38c,_0x1e55d7){this[_0x3149('0x2b')]=_0x41aa15;this[_0x3149('0x260')]=_0x24d96d;this[_0x3149('0x27b')]=_0x4336f0;this[_0x3149('0x280')]=_0xd86286;this[_0x3149('0x290')]=_0x512f74;this['pointeeType']=_0x494dca;this[_0x3149('0x295')]=_0x1fd9d9;this[_0x3149('0x286')]=_0x22e0d8;this[_0x3149('0x296')]=_0x2d9c75;this[_0x3149('0x284')]=_0x3bb38c;this[_0x3149('0x250')]=_0x1e55d7;if(!_0x512f74&&_0x24d96d[_0x3149('0x262')]===undefined){if(_0xd86286){this[_0x3149('0x251')]=constNoSmartPtrRawPointerToWireType;this[_0x3149('0x297')]=null;}else{this[_0x3149('0x251')]=nonConstNoSmartPtrRawPointerToWireType;this[_0x3149('0x297')]=null;}}else{this[_0x3149('0x251')]=genericPointerToWireType;}}function replacePublicSymbol(_0x2ce2b7,_0x464e70,_0x5cd629){if(!Module[_0x3149('0x46')](_0x2ce2b7)){throwInternalError('Replacing\x20nonexistant\x20public\x20symbol');}if(undefined!==Module[_0x2ce2b7][_0x3149('0x271')]&&undefined!==_0x5cd629){Module[_0x2ce2b7][_0x3149('0x271')][_0x5cd629]=_0x464e70;}else{Module[_0x2ce2b7]=_0x464e70;Module[_0x2ce2b7][_0x3149('0x274')]=_0x5cd629;}}function embind__requireFunction(_0x341edd,_0x41cdf0){_0x341edd=readLatin1String(_0x341edd);function _0x37ad04(_0x17c45b){var _0x25bb28=[];for(var _0x5cf6af=0x1;_0x5cf6af<_0x341edd[_0x3149('0x35')];++_0x5cf6af){_0x25bb28['push']('a'+_0x5cf6af);}var _0x2007d8='dynCall_'+_0x341edd+'_'+_0x41cdf0;var _0x4980dd='return\x20function\x20'+_0x2007d8+'('+_0x25bb28[_0x3149('0xe4')](',\x20')+_0x3149('0x298');_0x4980dd+=_0x3149('0x299')+(_0x25bb28[_0x3149('0x35')]?',\x20':'')+_0x25bb28[_0x3149('0xe4')](',\x20')+_0x3149('0x29a');_0x4980dd+=_0x3149('0x24c');return new Function(_0x3149('0x29b'),_0x3149('0x29c'),_0x4980dd)(_0x17c45b,_0x41cdf0);}var _0x4a39b1;if(Module[_0x3149('0x29d')+_0x341edd]!==undefined){_0x4a39b1=Module['FUNCTION_TABLE_'+_0x341edd][_0x41cdf0];}else if(typeof FUNCTION_TABLE!=='undefined'){_0x4a39b1=FUNCTION_TABLE[_0x41cdf0];}else{var _0x3b4d77=Module['dynCall_'+_0x341edd];if(_0x3b4d77===undefined){_0x3b4d77=Module[_0x3149('0x77')+_0x341edd[_0x3149('0x51')](/f/g,'d')];if(_0x3b4d77===undefined){throwBindingError(_0x3149('0x29e')+_0x341edd);}}_0x4a39b1=_0x37ad04(_0x3b4d77);}if(typeof _0x4a39b1!==_0x3149('0x4a')){throwBindingError(_0x3149('0x29f')+_0x341edd+':\x20'+_0x41cdf0);}return _0x4a39b1;}var UnboundTypeError=undefined;function getTypeName(_0x3195a5){var _0xe6ad2c=___getTypeName(_0x3195a5);var _0x33c3d0=readLatin1String(_0xe6ad2c);_free(_0xe6ad2c);return _0x33c3d0;}function throwUnboundTypeError(_0x2afe52,_0x379779){var _0x1bcdb8=[];var _0x1e4adb={};function _0x50e008(_0x327b70){if(_0x1e4adb[_0x327b70]){return;}if(registeredTypes[_0x327b70]){return;}if(typeDependencies[_0x327b70]){typeDependencies[_0x327b70][_0x3149('0x15b')](_0x50e008);return;}_0x1bcdb8[_0x3149('0x40')](_0x327b70);_0x1e4adb[_0x327b70]=!![];}_0x379779['forEach'](_0x50e008);throw new UnboundTypeError(_0x2afe52+':\x20'+_0x1bcdb8[_0x3149('0x146')](getTypeName)[_0x3149('0xe4')]([',\x20']));}function __embind_register_class(_0x5e0905,_0x4dafe6,_0x15b181,_0x34d44c,_0x29163c,_0x435d23,_0xee5eb2,_0x1ef8be,_0x908288,_0x47b493,_0x22b115,_0x2696bc,_0x1ae3a4){_0x22b115=readLatin1String(_0x22b115);_0x435d23=embind__requireFunction(_0x29163c,_0x435d23);if(_0x1ef8be){_0x1ef8be=embind__requireFunction(_0xee5eb2,_0x1ef8be);}if(_0x47b493){_0x47b493=embind__requireFunction(_0x908288,_0x47b493);}_0x1ae3a4=embind__requireFunction(_0x2696bc,_0x1ae3a4);var _0x1df629=makeLegalFunctionName(_0x22b115);exposePublicSymbol(_0x1df629,function(){throwUnboundTypeError(_0x3149('0x2a0')+_0x22b115+_0x3149('0x2a1'),[_0x34d44c]);});whenDependentTypesAreResolved([_0x5e0905,_0x4dafe6,_0x15b181],_0x34d44c?[_0x34d44c]:[],function(_0x9bfeec){_0x9bfeec=_0x9bfeec[0x0];var _0xcd36a6;var _0x4bbb37;if(_0x34d44c){_0xcd36a6=_0x9bfeec[_0x3149('0x260')];_0x4bbb37=_0xcd36a6[_0x3149('0x279')];}else{_0x4bbb37=ClassHandle[_0x3149('0x2a')];}var _0x1771f1=createNamedFunction(_0x1df629,function(){if(Object['getPrototypeOf'](this)!==_0xe6143b){throw new BindingError(_0x3149('0x2a2')+_0x22b115);}if(undefined===_0x59af27[_0x3149('0x2a3')]){throw new BindingError(_0x22b115+_0x3149('0x2a4'));}var _0x4b3c7c=_0x59af27[_0x3149('0x2a3')][arguments[_0x3149('0x35')]];if(undefined===_0x4b3c7c){throw new BindingError(_0x3149('0x2a5')+_0x22b115+_0x3149('0x2a6')+arguments[_0x3149('0x35')]+_0x3149('0x2a7')+Object[_0x3149('0x159')](_0x59af27[_0x3149('0x2a3')])[_0x3149('0x8')]()+_0x3149('0x2a8'));}return _0x4b3c7c[_0x3149('0x78')](this,arguments);});var _0xe6143b=Object[_0x3149('0x207')](_0x4bbb37,{'constructor':{'value':_0x1771f1}});_0x1771f1[_0x3149('0x2a')]=_0xe6143b;var _0x59af27=new RegisteredClass(_0x22b115,_0x1771f1,_0xe6143b,_0x1ae3a4,_0xcd36a6,_0x435d23,_0x1ef8be,_0x47b493);var _0x533e9c=new RegisteredPointer(_0x22b115,_0x59af27,!![],![],![]);var _0x477f3a=new RegisteredPointer(_0x22b115+'*',_0x59af27,![],![],![]);var _0x544e8a=new RegisteredPointer(_0x22b115+'\x20const*',_0x59af27,![],!![],![]);registeredPointers[_0x5e0905]={'pointerType':_0x477f3a,'constPointerType':_0x544e8a};replacePublicSymbol(_0x1df629,_0x1771f1);return[_0x533e9c,_0x477f3a,_0x544e8a];});}function heap32VectorToArray(_0x12a9c8,_0x5f38e1){var _0x54a3cc=[];for(var _0x56d4ee=0x0;_0x56d4ee<_0x12a9c8;_0x56d4ee++){_0x54a3cc[_0x3149('0x40')](HEAP32[(_0x5f38e1>>0x2)+_0x56d4ee]);}return _0x54a3cc;}function __embind_register_class_constructor(_0x53d610,_0x33ccc3,_0x339dce,_0x5b73ac,_0x5203e3,_0x2e64a8){var _0x351d00=heap32VectorToArray(_0x33ccc3,_0x339dce);_0x5203e3=embind__requireFunction(_0x5b73ac,_0x5203e3);whenDependentTypesAreResolved([],[_0x53d610],function(_0x411e27){_0x411e27=_0x411e27[0x0];var _0x3da001=_0x3149('0x2a9')+_0x411e27[_0x3149('0x2b')];if(undefined===_0x411e27[_0x3149('0x260')][_0x3149('0x2a3')]){_0x411e27[_0x3149('0x260')]['constructor_body']=[];}if(undefined!==_0x411e27[_0x3149('0x260')][_0x3149('0x2a3')][_0x33ccc3-0x1]){throw new BindingError(_0x3149('0x2aa')+(_0x33ccc3-0x1)+')\x20for\x20class\x20\x27'+_0x411e27[_0x3149('0x2b')]+_0x3149('0x2ab'));}_0x411e27[_0x3149('0x260')]['constructor_body'][_0x33ccc3-0x1]=function unboundTypeHandler(){throwUnboundTypeError('Cannot\x20construct\x20'+_0x411e27['name']+_0x3149('0x2a1'),_0x351d00);};whenDependentTypesAreResolved([],_0x351d00,function(_0x51846f){_0x411e27[_0x3149('0x260')][_0x3149('0x2a3')][_0x33ccc3-0x1]=function constructor_body(){if(arguments[_0x3149('0x35')]!==_0x33ccc3-0x1){throwBindingError(_0x3da001+'\x20called\x20with\x20'+arguments['length']+_0x3149('0x2ac')+(_0x33ccc3-0x1));}var _0x4d0f92=[];var _0x58a020=new Array(_0x33ccc3);_0x58a020[0x0]=_0x2e64a8;for(var _0x10e606=0x1;_0x10e606<_0x33ccc3;++_0x10e606){_0x58a020[_0x10e606]=_0x51846f[_0x10e606][_0x3149('0x251')](_0x4d0f92,arguments[_0x10e606-0x1]);}var _0x3ae136=_0x5203e3[_0x3149('0x78')](null,_0x58a020);runDestructors(_0x4d0f92);return _0x51846f[0x0]['fromWireType'](_0x3ae136);};return[];});return[];});}function new_(_0x501ae6,_0x2c1748){if(!(_0x501ae6 instanceof Function)){throw new TypeError(_0x3149('0x2ad')+typeof _0x501ae6+_0x3149('0x2ae'));}var _0x5cb03a=createNamedFunction(_0x501ae6[_0x3149('0x2b')]||_0x3149('0x2af'),function(){});_0x5cb03a[_0x3149('0x2a')]=_0x501ae6[_0x3149('0x2a')];var _0x38e008=new _0x5cb03a();var _0x45bdca=_0x501ae6[_0x3149('0x78')](_0x38e008,_0x2c1748);return _0x45bdca instanceof Object?_0x45bdca:_0x38e008;}function craftInvokerFunction(_0x200763,_0x119df4,_0x1e7c35,_0x40f7e2,_0x2eed33){var _0x5ce20e=_0x119df4[_0x3149('0x35')];if(_0x5ce20e<0x2){throwBindingError(_0x3149('0x2b0'));}var _0xa4fc0c=_0x119df4[0x1]!==null&&_0x1e7c35!==null;var _0x3ceb59=![];for(var _0x153d06=0x1;_0x153d06<_0x119df4[_0x3149('0x35')];++_0x153d06){if(_0x119df4[_0x153d06]!==null&&_0x119df4[_0x153d06][_0x3149('0x297')]===undefined){_0x3ceb59=!![];break;}}var _0x3177ae=_0x119df4[0x0][_0x3149('0x2b')]!==_0x3149('0x2b1');var _0x2f885e='';var _0x349b37='';for(var _0x153d06=0x0;_0x153d06<_0x5ce20e-0x2;++_0x153d06){_0x2f885e+=(_0x153d06!==0x0?',\x20':'')+'arg'+_0x153d06;_0x349b37+=(_0x153d06!==0x0?',\x20':'')+_0x3149('0x98')+_0x153d06+_0x3149('0x2b2');}var _0x32d0cd=_0x3149('0x248')+makeLegalFunctionName(_0x200763)+'('+_0x2f885e+_0x3149('0x298')+_0x3149('0x2b3')+(_0x5ce20e-0x2)+')\x20{\x0a'+_0x3149('0x2b4')+_0x200763+_0x3149('0x2b5')+(_0x5ce20e-0x2)+_0x3149('0x2b6')+'}\x0a';if(_0x3ceb59){_0x32d0cd+=_0x3149('0x2b7');}var _0x9a094b=_0x3ceb59?_0x3149('0x2b8'):_0x3149('0x2b9');var _0x409f5e=[_0x3149('0x2ba'),'invoker','fn',_0x3149('0x2bb'),_0x3149('0x2bc'),_0x3149('0x2bd')];var _0x3c651f=[throwBindingError,_0x40f7e2,_0x2eed33,runDestructors,_0x119df4[0x0],_0x119df4[0x1]];if(_0xa4fc0c){_0x32d0cd+=_0x3149('0x2be')+_0x9a094b+_0x3149('0x2bf');}for(var _0x153d06=0x0;_0x153d06<_0x5ce20e-0x2;++_0x153d06){_0x32d0cd+=_0x3149('0x2c0')+_0x153d06+_0x3149('0x2c1')+_0x153d06+'.toWireType('+_0x9a094b+_0x3149('0x2c2')+_0x153d06+_0x3149('0x2c3')+_0x119df4[_0x153d06+0x2][_0x3149('0x2b')]+'\x0a';_0x409f5e[_0x3149('0x40')]('argType'+_0x153d06);_0x3c651f[_0x3149('0x40')](_0x119df4[_0x153d06+0x2]);}if(_0xa4fc0c){_0x349b37=_0x3149('0x2c4')+(_0x349b37['length']>0x0?',\x20':'')+_0x349b37;}_0x32d0cd+=(_0x3177ae?_0x3149('0x2c5'):'')+_0x3149('0x2c6')+(_0x349b37[_0x3149('0x35')]>0x0?',\x20':'')+_0x349b37+_0x3149('0x29a');if(_0x3ceb59){_0x32d0cd+=_0x3149('0x2c7');}else{for(var _0x153d06=_0xa4fc0c?0x1:0x2;_0x153d06<_0x119df4[_0x3149('0x35')];++_0x153d06){var _0x4cb654=_0x153d06===0x1?'thisWired':'arg'+(_0x153d06-0x2)+_0x3149('0x2b2');if(_0x119df4[_0x153d06][_0x3149('0x297')]!==null){_0x32d0cd+=_0x4cb654+_0x3149('0x2c8')+_0x4cb654+_0x3149('0x2c3')+_0x119df4[_0x153d06][_0x3149('0x2b')]+'\x0a';_0x409f5e[_0x3149('0x40')](_0x4cb654+_0x3149('0x2c9'));_0x3c651f['push'](_0x119df4[_0x153d06][_0x3149('0x297')]);}}}if(_0x3177ae){_0x32d0cd+=_0x3149('0x2ca')+_0x3149('0x2cb');}else{}_0x32d0cd+='}\x0a';_0x409f5e[_0x3149('0x40')](_0x32d0cd);var _0x507ba0=new_(Function,_0x409f5e)[_0x3149('0x78')](null,_0x3c651f);return _0x507ba0;}function __embind_register_class_function(_0x2ebbd3,_0x340fee,_0x34cd90,_0x3cf7f2,_0x21bf27,_0xd658eb,_0x443720,_0x22287e){var _0x28815f=heap32VectorToArray(_0x34cd90,_0x3cf7f2);_0x340fee=readLatin1String(_0x340fee);_0xd658eb=embind__requireFunction(_0x21bf27,_0xd658eb);whenDependentTypesAreResolved([],[_0x2ebbd3],function(_0xeb194){_0xeb194=_0xeb194[0x0];var _0x37c5ad=_0xeb194['name']+'.'+_0x340fee;if(_0x22287e){_0xeb194['registeredClass'][_0x3149('0x2cc')][_0x3149('0x40')](_0x340fee);}function _0x5aca7d(){throwUnboundTypeError('Cannot\x20call\x20'+_0x37c5ad+'\x20due\x20to\x20unbound\x20types',_0x28815f);}var _0x307198=_0xeb194[_0x3149('0x260')][_0x3149('0x279')];var _0x4f1595=_0x307198[_0x340fee];if(undefined===_0x4f1595||undefined===_0x4f1595[_0x3149('0x271')]&&_0x4f1595[_0x3149('0x2cd')]!==_0xeb194[_0x3149('0x2b')]&&_0x4f1595[_0x3149('0x274')]===_0x34cd90-0x2){_0x5aca7d[_0x3149('0x274')]=_0x34cd90-0x2;_0x5aca7d[_0x3149('0x2cd')]=_0xeb194[_0x3149('0x2b')];_0x307198[_0x340fee]=_0x5aca7d;}else{ensureOverloadTable(_0x307198,_0x340fee,_0x37c5ad);_0x307198[_0x340fee]['overloadTable'][_0x34cd90-0x2]=_0x5aca7d;}whenDependentTypesAreResolved([],_0x28815f,function(_0x5f122c){var _0x2adf43=craftInvokerFunction(_0x37c5ad,_0x5f122c,_0xeb194,_0xd658eb,_0x443720);if(undefined===_0x307198[_0x340fee][_0x3149('0x271')]){_0x2adf43[_0x3149('0x274')]=_0x34cd90-0x2;_0x307198[_0x340fee]=_0x2adf43;}else{_0x307198[_0x340fee][_0x3149('0x271')][_0x34cd90-0x2]=_0x2adf43;}return[];});return[];});}function validateThis(_0x5735ea,_0x1331b6,_0xe0879b){if(!(_0x5735ea instanceof Object)){throwBindingError(_0xe0879b+_0x3149('0x2ce')+_0x5735ea);}if(!(_0x5735ea instanceof _0x1331b6[_0x3149('0x260')][_0x3149('0x1f9')])){throwBindingError(_0xe0879b+_0x3149('0x2cf')+_0x5735ea[_0x3149('0x1f9')][_0x3149('0x2b')]);}if(!_0x5735ea['$$'][_0x3149('0x261')]){throwBindingError(_0x3149('0x2d0')+_0xe0879b+_0x3149('0x2d1'));}return upcastPointer(_0x5735ea['$$'][_0x3149('0x261')],_0x5735ea['$$'][_0x3149('0x25f')][_0x3149('0x260')],_0x1331b6[_0x3149('0x260')]);}function __embind_register_class_property(_0x3822cb,_0x1cb6e5,_0x6280a0,_0x55be3e,_0x5c10d7,_0x2caf59,_0x591397,_0x284cd5,_0x29d0d8,_0x55dd89){_0x1cb6e5=readLatin1String(_0x1cb6e5);_0x5c10d7=embind__requireFunction(_0x55be3e,_0x5c10d7);whenDependentTypesAreResolved([],[_0x3822cb],function(_0x44ad15){_0x44ad15=_0x44ad15[0x0];var _0x184b1a=_0x44ad15['name']+'.'+_0x1cb6e5;var _0x13d0b2={'get':function(){throwUnboundTypeError(_0x3149('0x2d2')+_0x184b1a+_0x3149('0x2a1'),[_0x6280a0,_0x591397]);},'enumerable':!![],'configurable':!![]};if(_0x29d0d8){_0x13d0b2[_0x3149('0x3b')]=function(){throwUnboundTypeError(_0x3149('0x2d2')+_0x184b1a+'\x20due\x20to\x20unbound\x20types',[_0x6280a0,_0x591397]);};}else{_0x13d0b2['set']=function(_0xf98f30){throwBindingError(_0x184b1a+_0x3149('0x2d3'));};}Object['defineProperty'](_0x44ad15[_0x3149('0x260')][_0x3149('0x279')],_0x1cb6e5,_0x13d0b2);whenDependentTypesAreResolved([],_0x29d0d8?[_0x6280a0,_0x591397]:[_0x6280a0],function(_0x11fd61){var _0x6280a0=_0x11fd61[0x0];var _0x13d0b2={'get':function(){var _0x9f61d1=validateThis(this,_0x44ad15,_0x184b1a+_0x3149('0x2d4'));return _0x6280a0['fromWireType'](_0x5c10d7(_0x2caf59,_0x9f61d1));},'enumerable':!![]};if(_0x29d0d8){_0x29d0d8=embind__requireFunction(_0x284cd5,_0x29d0d8);var _0x591397=_0x11fd61[0x1];_0x13d0b2[_0x3149('0x3b')]=function(_0xfac43){var _0x225d53=validateThis(this,_0x44ad15,_0x184b1a+'\x20setter');var _0x58bcbd=[];_0x29d0d8(_0x55dd89,_0x225d53,_0x591397[_0x3149('0x251')](_0x58bcbd,_0xfac43));runDestructors(_0x58bcbd);};}Object[_0x3149('0x2d5')](_0x44ad15[_0x3149('0x260')][_0x3149('0x279')],_0x1cb6e5,_0x13d0b2);return[];});return[];});}function __embind_register_constant(_0x5b369c,_0x5ec468,_0x4f1d7b){_0x5b369c=readLatin1String(_0x5b369c);whenDependentTypesAreResolved([],[_0x5ec468],function(_0x23570c){_0x23570c=_0x23570c[0x0];Module[_0x5b369c]=_0x23570c['fromWireType'](_0x4f1d7b);return[];});}var emval_free_list=[];var emval_handle_array=[{},{'value':undefined},{'value':null},{'value':!![]},{'value':![]}];function __emval_decref(_0x3f276f){if(_0x3f276f>0x4&&0x0===--emval_handle_array[_0x3f276f][_0x3149('0xd6')]){emval_handle_array[_0x3f276f]=undefined;emval_free_list[_0x3149('0x40')](_0x3f276f);}}function count_emval_handles(){var _0x5ce136=0x0;for(var _0x2dd460=0x5;_0x2dd460<emval_handle_array[_0x3149('0x35')];++_0x2dd460){if(emval_handle_array[_0x2dd460]!==undefined){++_0x5ce136;}}return _0x5ce136;}function get_first_emval(){for(var _0x32e097=0x5;_0x32e097<emval_handle_array[_0x3149('0x35')];++_0x32e097){if(emval_handle_array[_0x32e097]!==undefined){return emval_handle_array[_0x32e097];}}return null;}function init_emval(){Module[_0x3149('0x2d6')]=count_emval_handles;Module['get_first_emval']=get_first_emval;}function __emval_register(_0x43ab0c){switch(_0x43ab0c){case undefined:{return 0x1;}case null:{return 0x2;}case!![]:{return 0x3;}case![]:{return 0x4;}default:{var _0x2b4bbb=emval_free_list[_0x3149('0x35')]?emval_free_list[_0x3149('0x1ac')]():emval_handle_array[_0x3149('0x35')];emval_handle_array[_0x2b4bbb]={'refcount':0x1,'value':_0x43ab0c};return _0x2b4bbb;}}}function __embind_register_emval(_0x2dbefc,_0x3e6f62){_0x3e6f62=readLatin1String(_0x3e6f62);registerType(_0x2dbefc,{'name':_0x3e6f62,'fromWireType':function(_0x523b9d){var _0x51738c=emval_handle_array[_0x523b9d][_0x3149('0x269')];__emval_decref(_0x523b9d);return _0x51738c;},'toWireType':function(_0x25f60b,_0x1101c7){return __emval_register(_0x1101c7);},'argPackAdvance':0x8,'readValueFromPointer':simpleReadValueFromPointer,'destructorFunction':null});}function enumReadValueFromPointer(_0x41c4b6,_0x240448,_0x524470){switch(_0x240448){case 0x0:return function(_0x23f6d7){var _0x5244c2=_0x524470?HEAP8:HEAPU8;return this[_0x3149('0x246')](_0x5244c2[_0x23f6d7]);};case 0x1:return function(_0x1ed426){var _0xec9e=_0x524470?HEAP16:HEAPU16;return this[_0x3149('0x246')](_0xec9e[_0x1ed426>>0x1]);};case 0x2:return function(_0xb99265){var _0x527190=_0x524470?HEAP32:HEAPU32;return this[_0x3149('0x246')](_0x527190[_0xb99265>>0x2]);};default:throw new TypeError('Unknown\x20integer\x20type:\x20'+_0x41c4b6);}}function __embind_register_enum(_0x1fe719,_0x38a6d4,_0x2b23a0,_0x426081){var _0x4dccea=getShiftFromSize(_0x2b23a0);_0x38a6d4=readLatin1String(_0x38a6d4);function _0x2b144d(){}_0x2b144d[_0x3149('0x2d7')]={};registerType(_0x1fe719,{'name':_0x38a6d4,'constructor':_0x2b144d,'fromWireType':function(_0x326d19){return this[_0x3149('0x1f9')][_0x3149('0x2d7')][_0x326d19];},'toWireType':function(_0x33a805,_0xa7e821){return _0xa7e821[_0x3149('0x269')];},'argPackAdvance':0x8,'readValueFromPointer':enumReadValueFromPointer(_0x38a6d4,_0x4dccea,_0x426081),'destructorFunction':null});exposePublicSymbol(_0x38a6d4,_0x2b144d);}function requireRegisteredType(_0x24a43c,_0x56b321){var _0x422d32=registeredTypes[_0x24a43c];if(undefined===_0x422d32){throwBindingError(_0x56b321+_0x3149('0x2d8')+getTypeName(_0x24a43c));}return _0x422d32;}function __embind_register_enum_value(_0x2abb7d,_0x206ac5,_0x2a67d7){var _0x560bce=requireRegisteredType(_0x2abb7d,_0x3149('0x2d9'));_0x206ac5=readLatin1String(_0x206ac5);var _0x25079c=_0x560bce[_0x3149('0x1f9')];var _0x306155=Object[_0x3149('0x207')](_0x560bce[_0x3149('0x1f9')]['prototype'],{'value':{'value':_0x2a67d7},'constructor':{'value':createNamedFunction(_0x560bce['name']+'_'+_0x206ac5,function(){})}});_0x25079c[_0x3149('0x2d7')][_0x2a67d7]=_0x306155;_0x25079c[_0x206ac5]=_0x306155;}function _embind_repr(_0xa8abe5){if(_0xa8abe5===null){return _0x3149('0x2b9');}var _0x155c8b=typeof _0xa8abe5;if(_0x155c8b===_0x3149('0x4')||_0x155c8b==='array'||_0x155c8b===_0x3149('0x4a')){return _0xa8abe5[_0x3149('0x8')]();}else{return''+_0xa8abe5;}}function floatReadValueFromPointer(_0x1aaab1,_0x12b487){switch(_0x12b487){case 0x2:return function(_0x50921b){return this[_0x3149('0x246')](HEAPF32[_0x50921b>>0x2]);};case 0x3:return function(_0x5bbae5){return this[_0x3149('0x246')](HEAPF64[_0x5bbae5>>0x3]);};default:throw new TypeError(_0x3149('0x2da')+_0x1aaab1);}}function __embind_register_float(_0xeba25c,_0x21db9b,_0x5172ad){var _0x1c9199=getShiftFromSize(_0x5172ad);_0x21db9b=readLatin1String(_0x21db9b);registerType(_0xeba25c,{'name':_0x21db9b,'fromWireType':function(_0x5784bf){return _0x5784bf;},'toWireType':function(_0xe4084,_0x1b8954){if(typeof _0x1b8954!==_0x3149('0x83')&&typeof _0x1b8954!==_0x3149('0x81')){throw new TypeError(_0x3149('0x2db')+_embind_repr(_0x1b8954)+_0x3149('0x2dc')+this[_0x3149('0x2b')]);}return _0x1b8954;},'argPackAdvance':0x8,'readValueFromPointer':floatReadValueFromPointer(_0x21db9b,_0x1c9199),'destructorFunction':null});}function __embind_register_function(_0x44ce76,_0xe9a202,_0xd74a9d,_0x418802,_0x4c573e,_0x39ac30){var _0x3ef9e1=heap32VectorToArray(_0xe9a202,_0xd74a9d);_0x44ce76=readLatin1String(_0x44ce76);_0x4c573e=embind__requireFunction(_0x418802,_0x4c573e);exposePublicSymbol(_0x44ce76,function(){throwUnboundTypeError('Cannot\x20call\x20'+_0x44ce76+_0x3149('0x2a1'),_0x3ef9e1);},_0xe9a202-0x1);whenDependentTypesAreResolved([],_0x3ef9e1,function(_0x4919f1){var _0x527182=[_0x4919f1[0x0],null][_0x3149('0x70')](_0x4919f1[_0x3149('0x52')](0x1));replacePublicSymbol(_0x44ce76,craftInvokerFunction(_0x44ce76,_0x527182,null,_0x4c573e,_0x39ac30),_0xe9a202-0x1);return[];});}function integerReadValueFromPointer(_0x308b58,_0x227373,_0x195ef4){switch(_0x227373){case 0x0:return _0x195ef4?function readS8FromPointer(_0xd8f5db){return HEAP8[_0xd8f5db];}:function readU8FromPointer(_0x1ffc54){return HEAPU8[_0x1ffc54];};case 0x1:return _0x195ef4?function readS16FromPointer(_0x504548){return HEAP16[_0x504548>>0x1];}:function readU16FromPointer(_0x540cd6){return HEAPU16[_0x540cd6>>0x1];};case 0x2:return _0x195ef4?function readS32FromPointer(_0x26d99e){return HEAP32[_0x26d99e>>0x2];}:function readU32FromPointer(_0x52b5af){return HEAPU32[_0x52b5af>>0x2];};default:throw new TypeError(_0x3149('0x2dd')+_0x308b58);}}function __embind_register_integer(_0x49531c,_0xe6e5c6,_0x3341f5,_0x395277,_0x4d2221){_0xe6e5c6=readLatin1String(_0xe6e5c6);if(_0x4d2221===-0x1){_0x4d2221=0xffffffff;}var _0x399b49=getShiftFromSize(_0x3341f5);var _0xf90abc=function(_0x5bbf80){return _0x5bbf80;};if(_0x395277===0x0){var _0x4ab8f2=0x20-0x8*_0x3341f5;_0xf90abc=function(_0x37f545){return _0x37f545<<_0x4ab8f2>>>_0x4ab8f2;};}var _0x297f98=_0xe6e5c6[_0x3149('0x5b')](_0x3149('0x2de'))!=-0x1;registerType(_0x49531c,{'name':_0xe6e5c6,'fromWireType':_0xf90abc,'toWireType':function(_0x5e009d,_0x6dec1f){if(typeof _0x6dec1f!==_0x3149('0x83')&&typeof _0x6dec1f!==_0x3149('0x81')){throw new TypeError(_0x3149('0x2db')+_embind_repr(_0x6dec1f)+_0x3149('0x2dc')+this[_0x3149('0x2b')]);}if(_0x6dec1f<_0x395277||_0x6dec1f>_0x4d2221){throw new TypeError(_0x3149('0x2df')+_embind_repr(_0x6dec1f)+'\x22\x20from\x20JS\x20side\x20to\x20C/C++\x20side\x20to\x20an\x20argument\x20of\x20type\x20\x22'+_0xe6e5c6+'\x22,\x20which\x20is\x20outside\x20the\x20valid\x20range\x20['+_0x395277+',\x20'+_0x4d2221+']!');}return _0x297f98?_0x6dec1f>>>0x0:_0x6dec1f|0x0;},'argPackAdvance':0x8,'readValueFromPointer':integerReadValueFromPointer(_0xe6e5c6,_0x399b49,_0x395277!==0x0),'destructorFunction':null});}function __embind_register_memory_view(_0x1a239c,_0x389b46,_0x387ae7){var _0x585315=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array];var _0x5ee437=_0x585315[_0x389b46];function _0x18d586(_0x1cb546){_0x1cb546=_0x1cb546>>0x2;var _0xd2fdbc=HEAPU32;var _0x1786d8=_0xd2fdbc[_0x1cb546];var _0x455716=_0xd2fdbc[_0x1cb546+0x1];return new _0x5ee437(_0xd2fdbc[_0x3149('0x4f')],_0x455716,_0x1786d8);}_0x387ae7=readLatin1String(_0x387ae7);registerType(_0x1a239c,{'name':_0x387ae7,'fromWireType':_0x18d586,'argPackAdvance':0x8,'readValueFromPointer':_0x18d586},{'ignoreDuplicateRegistrations':!![]});}function __embind_register_std_string(_0x16551a,_0x10b4e4){_0x10b4e4=readLatin1String(_0x10b4e4);var _0x59d79f=_0x10b4e4===_0x3149('0x2e0');registerType(_0x16551a,{'name':_0x10b4e4,'fromWireType':function(_0x4a4558){var _0x188b7d=HEAPU32[_0x4a4558>>0x2];var _0x4b6947;if(_0x59d79f){var _0x44714d=HEAPU8[_0x4a4558+0x4+_0x188b7d];var _0x1cc24c=0x0;if(_0x44714d!=0x0){_0x1cc24c=_0x44714d;HEAPU8[_0x4a4558+0x4+_0x188b7d]=0x0;}var _0x3bc22c=_0x4a4558+0x4;for(var _0x484f8d=0x0;_0x484f8d<=_0x188b7d;++_0x484f8d){var _0x3df65e=_0x4a4558+0x4+_0x484f8d;if(HEAPU8[_0x3df65e]==0x0){var _0x29e83f=UTF8ToString(_0x3bc22c);if(_0x4b6947===undefined)_0x4b6947=_0x29e83f;else{_0x4b6947+=String['fromCharCode'](0x0);_0x4b6947+=_0x29e83f;}_0x3bc22c=_0x3df65e+0x1;}}if(_0x1cc24c!=0x0)HEAPU8[_0x4a4558+0x4+_0x188b7d]=_0x1cc24c;}else{var _0x12acdc=new Array(_0x188b7d);for(var _0x484f8d=0x0;_0x484f8d<_0x188b7d;++_0x484f8d){_0x12acdc[_0x484f8d]=String[_0x3149('0x86')](HEAPU8[_0x4a4558+0x4+_0x484f8d]);}_0x4b6947=_0x12acdc[_0x3149('0xe4')]('');}_free(_0x4a4558);return _0x4b6947;},'toWireType':function(_0x2107c1,_0x51981b){if(_0x51981b instanceof ArrayBuffer){_0x51981b=new Uint8Array(_0x51981b);}var _0x5ca5ca;var _0x1d3dea=typeof _0x51981b===_0x3149('0x80');if(!(_0x1d3dea||_0x51981b instanceof Uint8Array||_0x51981b instanceof Uint8ClampedArray||_0x51981b instanceof Int8Array)){throwBindingError(_0x3149('0x2e1'));}if(_0x59d79f&&_0x1d3dea){_0x5ca5ca=function(){return lengthBytesUTF8(_0x51981b);};}else{_0x5ca5ca=function(){return _0x51981b[_0x3149('0x35')];};}var _0x5c492c=_0x5ca5ca();var _0x5ae3dd=_malloc(0x4+_0x5c492c+0x1);HEAPU32[_0x5ae3dd>>0x2]=_0x5c492c;if(_0x59d79f&&_0x1d3dea){stringToUTF8(_0x51981b,_0x5ae3dd+0x4,_0x5c492c+0x1);}else{if(_0x1d3dea){for(var _0x50659c=0x0;_0x50659c<_0x5c492c;++_0x50659c){var _0x44dabb=_0x51981b[_0x3149('0x89')](_0x50659c);if(_0x44dabb>0xff){_free(_0x5ae3dd);throwBindingError(_0x3149('0x2e2'));}HEAPU8[_0x5ae3dd+0x4+_0x50659c]=_0x44dabb;}}else{for(var _0x50659c=0x0;_0x50659c<_0x5c492c;++_0x50659c){HEAPU8[_0x5ae3dd+0x4+_0x50659c]=_0x51981b[_0x50659c];}}}if(_0x2107c1!==null){_0x2107c1[_0x3149('0x40')](_free,_0x5ae3dd);}return _0x5ae3dd;},'argPackAdvance':0x8,'readValueFromPointer':simpleReadValueFromPointer,'destructorFunction':function(_0x233c13){_free(_0x233c13);}});}function __embind_register_std_wstring(_0x1afb65,_0x3685f0,_0x16db96){_0x16db96=readLatin1String(_0x16db96);var _0x23f1dc,_0x5eda32;if(_0x3685f0===0x2){_0x23f1dc=function(){return HEAPU16;};_0x5eda32=0x1;}else if(_0x3685f0===0x4){_0x23f1dc=function(){return HEAPU32;};_0x5eda32=0x2;}registerType(_0x1afb65,{'name':_0x16db96,'fromWireType':function(_0x189acd){var _0x580d5b=_0x23f1dc();var _0x51d7c7=HEAPU32[_0x189acd>>0x2];var _0x36e5b6=new Array(_0x51d7c7);var _0x1f84e2=_0x189acd+0x4>>_0x5eda32;for(var _0x5c6230=0x0;_0x5c6230<_0x51d7c7;++_0x5c6230){_0x36e5b6[_0x5c6230]=String['fromCharCode'](_0x580d5b[_0x1f84e2+_0x5c6230]);}_free(_0x189acd);return _0x36e5b6[_0x3149('0xe4')]('');},'toWireType':function(_0x3abb90,_0x445284){var _0xb8dde6=_0x23f1dc();var _0x269e98=_0x445284[_0x3149('0x35')];var _0x1045b4=_malloc(0x4+_0x269e98*_0x3685f0);HEAPU32[_0x1045b4>>0x2]=_0x269e98;var _0x2008ea=_0x1045b4+0x4>>_0x5eda32;for(var _0x210d91=0x0;_0x210d91<_0x269e98;++_0x210d91){_0xb8dde6[_0x2008ea+_0x210d91]=_0x445284[_0x3149('0x89')](_0x210d91);}if(_0x3abb90!==null){_0x3abb90[_0x3149('0x40')](_free,_0x1045b4);}return _0x1045b4;},'argPackAdvance':0x8,'readValueFromPointer':simpleReadValueFromPointer,'destructorFunction':function(_0x22f8d9){_free(_0x22f8d9);}});}function __embind_register_value_array(_0x51885f,_0x3d72ec,_0x1a9a91,_0x54dbd3,_0x548da8,_0x32cc67){tupleRegistrations[_0x51885f]={'name':readLatin1String(_0x3d72ec),'rawConstructor':embind__requireFunction(_0x1a9a91,_0x54dbd3),'rawDestructor':embind__requireFunction(_0x548da8,_0x32cc67),'elements':[]};}function __embind_register_value_array_element(_0x32ffa5,_0x5f3291,_0x406e92,_0x3d9478,_0x429b42,_0x43d032,_0x201891,_0x2674f8,_0x55fa8c){tupleRegistrations[_0x32ffa5][_0x3149('0x24e')][_0x3149('0x40')]({'getterReturnType':_0x5f3291,'getter':embind__requireFunction(_0x406e92,_0x3d9478),'getterContext':_0x429b42,'setterArgumentType':_0x43d032,'setter':embind__requireFunction(_0x201891,_0x2674f8),'setterContext':_0x55fa8c});}function __embind_register_value_object(_0x75d0ac,_0x385239,_0x3cd057,_0x6ca6b2,_0x1d18ca,_0x8eb251){structRegistrations[_0x75d0ac]={'name':readLatin1String(_0x385239),'rawConstructor':embind__requireFunction(_0x3cd057,_0x6ca6b2),'rawDestructor':embind__requireFunction(_0x1d18ca,_0x8eb251),'fields':[]};}function __embind_register_value_object_field(_0x475bbd,_0x1e56f6,_0x45962d,_0x4bec92,_0x18a159,_0x4a0861,_0x54c07a,_0x19015a,_0x15dd78,_0x720890){structRegistrations[_0x475bbd][_0x3149('0x2e3')][_0x3149('0x40')]({'fieldName':readLatin1String(_0x1e56f6),'getterReturnType':_0x45962d,'getter':embind__requireFunction(_0x4bec92,_0x18a159),'getterContext':_0x4a0861,'setterArgumentType':_0x54c07a,'setter':embind__requireFunction(_0x19015a,_0x15dd78),'setterContext':_0x720890});}function __embind_register_void(_0x3b4ee4,_0x2ce55c){_0x2ce55c=readLatin1String(_0x2ce55c);registerType(_0x3b4ee4,{'isVoid':!![],'name':_0x2ce55c,'argPackAdvance':0x0,'fromWireType':function(){return undefined;},'toWireType':function(_0x16eff7,_0x5c0082){return undefined;}});}function requireHandle(_0x2e962b){if(!_0x2e962b){throwBindingError(_0x3149('0x2e4')+_0x2e962b);}return emval_handle_array[_0x2e962b][_0x3149('0x269')];}function __emval_as(_0x2d3d03,_0x312c95,_0x4db9aa){_0x2d3d03=requireHandle(_0x2d3d03);_0x312c95=requireRegisteredType(_0x312c95,_0x3149('0x2e5'));var _0xcbedab=[];var _0x3d1266=__emval_register(_0xcbedab);HEAP32[_0x4db9aa>>0x2]=_0x3d1266;return _0x312c95[_0x3149('0x251')](_0xcbedab,_0x2d3d03);}function __emval_incref(_0x1a9d5d){if(_0x1a9d5d>0x4){emval_handle_array[_0x1a9d5d][_0x3149('0xd6')]+=0x1;}}function __emval_run_destructors(_0x2988ca){var _0x437b2d=emval_handle_array[_0x2988ca][_0x3149('0x269')];runDestructors(_0x437b2d);__emval_decref(_0x2988ca);}function __emval_take_value(_0x32bad6,_0xa68241){_0x32bad6=requireRegisteredType(_0x32bad6,'_emval_take_value');var _0x4d13ca=_0x32bad6[_0x3149('0x2e6')](_0xa68241);return __emval_register(_0x4d13ca);}function _abort(){Module['abort']();}function _clock(){if(_clock[_0x3149('0x28')]===undefined)_clock[_0x3149('0x28')]=Date[_0x3149('0xd1')]();return(Date['now']()-_clock[_0x3149('0x28')])*(0xf4240/0x3e8)|0x0;}function _emscripten_get_heap_size(){return HEAP8[_0x3149('0x35')];}function _longjmp(_0x1f8496,_0x1b7f94){_setThrew(_0x1f8496,_0x1b7f94||0x1);throw _0x3149('0x2e7');}function _emscripten_longjmp(_0xae79e1,_0x40a4bb){_longjmp(_0xae79e1,_0x40a4bb);}function _emscripten_resize_heap(_0x3d27d7){return![];}function _exit(_0x163666){exit(_0x163666);}function _emscripten_memcpy_big(_0x3b6c09,_0x48c5a2,_0x1f47c9){HEAPU8[_0x3149('0x3b')](HEAPU8[_0x3149('0x30')](_0x48c5a2,_0x48c5a2+_0x1f47c9),_0x3b6c09);}var __sigalrm_handler=0x0;function _signal(_0x1a63e3,_0x1f3aae){if(_0x1a63e3==0xe){__sigalrm_handler=_0x1f3aae;}else{}return 0x0;}function _time(_0x31480f){var _0x1c4f17=Date[_0x3149('0xd1')]()/0x3e8|0x0;if(_0x31480f){HEAP32[_0x31480f>>0x2]=_0x1c4f17;}return _0x1c4f17;}if(ENVIRONMENT_IS_NODE){_emscripten_get_now=function _emscripten_get_now_actual(){var _0x4bc44c=process[_0x3149('0x2e8')]();return _0x4bc44c[0x0]*0x3e8+_0x4bc44c[0x1]/0xf4240;};}else if(typeof dateNow!==_0x3149('0x1')){_emscripten_get_now=dateNow;}else if(typeof performance===_0x3149('0x4')&&performance&&typeof performance['now']===_0x3149('0x4a')){_emscripten_get_now=function(){return performance[_0x3149('0xd1')]();};}else{_emscripten_get_now=Date[_0x3149('0xd1')];};FS[_0x3149('0x2e9')]();Module[_0x3149('0x2ea')]=FS[_0x3149('0x2eb')];Module[_0x3149('0x26')]=FS[_0x3149('0x2ec')];Module[_0x3149('0x2ed')]=FS[_0x3149('0x229')];Module[_0x3149('0x2ee')]=FS['createPreloadedFile'];Module[_0x3149('0x2ef')]=FS[_0x3149('0x2f0')];Module[_0x3149('0x2f1')]=FS[_0x3149('0x2f2')];Module[_0x3149('0x2f3')]=FS[_0x3149('0x1e9')];Module[_0x3149('0x2f4')]=FS[_0x3149('0x109')];;if(ENVIRONMENT_IS_NODE){var fs=__webpack_require__(501);var NODEJS_PATH=__webpack_require__(672);NODEFS['staticInit']();};InternalError=Module[_0x3149('0x2f5')]=extendError(Error,_0x3149('0x2f5'));;embind_init_charCodes();BindingError=Module[_0x3149('0x2f6')]=extendError(Error,_0x3149('0x2f6'));;init_ClassHandle();init_RegisteredPointer();init_embind();;UnboundTypeError=Module[_0x3149('0x2f7')]=extendError(Error,'UnboundTypeError');;init_emval();;var ASSERTIONS=![];function intArrayFromString(_0x481cea,_0x2f76b4,_0x448669){var _0x2a4630=_0x448669>0x0?_0x448669:lengthBytesUTF8(_0x481cea)+0x1;var _0xdb093b=new Array(_0x2a4630);var _0x38b8ff=stringToUTF8Array(_0x481cea,_0xdb093b,0x0,_0xdb093b[_0x3149('0x35')]);if(_0x2f76b4)_0xdb093b[_0x3149('0x35')]=_0x38b8ff;return _0xdb093b;}function intArrayToString(_0x650eb2){var _0x24f6be=[];for(var _0x57788c=0x0;_0x57788c<_0x650eb2[_0x3149('0x35')];_0x57788c++){var _0x37d504=_0x650eb2[_0x57788c];if(_0x37d504>0xff){if(ASSERTIONS){assert(![],'Character\x20code\x20'+_0x37d504+'\x20('+String[_0x3149('0x86')](_0x37d504)+')\x20\x20at\x20offset\x20'+_0x57788c+_0x3149('0x2f8'));}_0x37d504&=0xff;}_0x24f6be[_0x3149('0x40')](String[_0x3149('0x86')](_0x37d504));}return _0x24f6be[_0x3149('0xe4')]('');}function invoke_ii(_0x104eb,_0x5708b5){var _0xc1499a=stackSave();try{return dynCall_ii(_0x104eb,_0x5708b5);}catch(_0xdc647d){stackRestore(_0xc1499a);if(_0xdc647d!==_0xdc647d+0x0&&_0xdc647d!==_0x3149('0x2e7'))throw _0xdc647d;_setThrew(0x1,0x0);}}function invoke_iii(_0xfcab51,_0x43a7d8,_0x35072b){var _0xf4d954=stackSave();try{return dynCall_iii(_0xfcab51,_0x43a7d8,_0x35072b);}catch(_0x3849f1){stackRestore(_0xf4d954);if(_0x3849f1!==_0x3849f1+0x0&&_0x3849f1!=='longjmp')throw _0x3849f1;_setThrew(0x1,0x0);}}function invoke_iiii(_0x524c1d,_0x452fc2,_0x51c71e,_0xcc7f33){var _0x45cd58=stackSave();try{return dynCall_iiii(_0x524c1d,_0x452fc2,_0x51c71e,_0xcc7f33);}catch(_0xd9672e){stackRestore(_0x45cd58);if(_0xd9672e!==_0xd9672e+0x0&&_0xd9672e!==_0x3149('0x2e7'))throw _0xd9672e;_setThrew(0x1,0x0);}}function invoke_iiiii(_0x8343b7,_0x505caf,_0x5a7565,_0x37e12e,_0x1b75c4){var _0x3f5e8f=stackSave();try{return dynCall_iiiii(_0x8343b7,_0x505caf,_0x5a7565,_0x37e12e,_0x1b75c4);}catch(_0x5db58f){stackRestore(_0x3f5e8f);if(_0x5db58f!==_0x5db58f+0x0&&_0x5db58f!==_0x3149('0x2e7'))throw _0x5db58f;_setThrew(0x1,0x0);}}function invoke_iiiiiiiiii(_0x20f845,_0x5d30a7,_0x4ace9d,_0x53a8f9,_0x5b140f,_0x49716c,_0x44ba75,_0x2bf271,_0x20cdc9,_0x383bfb){var _0x263ce1=stackSave();try{return dynCall_iiiiiiiiii(_0x20f845,_0x5d30a7,_0x4ace9d,_0x53a8f9,_0x5b140f,_0x49716c,_0x44ba75,_0x2bf271,_0x20cdc9,_0x383bfb);}catch(_0x10ca0e){stackRestore(_0x263ce1);if(_0x10ca0e!==_0x10ca0e+0x0&&_0x10ca0e!==_0x3149('0x2e7'))throw _0x10ca0e;_setThrew(0x1,0x0);}}function invoke_vii(_0x210e70,_0x173e9d,_0x4c1412){var _0x427466=stackSave();try{dynCall_vii(_0x210e70,_0x173e9d,_0x4c1412);}catch(_0x33d06b){stackRestore(_0x427466);if(_0x33d06b!==_0x33d06b+0x0&&_0x33d06b!==_0x3149('0x2e7'))throw _0x33d06b;_setThrew(0x1,0x0);}}function invoke_viii(_0x4d5d1b,_0x16068b,_0x3943f4,_0x4d372d){var _0xffabc7=stackSave();try{dynCall_viii(_0x4d5d1b,_0x16068b,_0x3943f4,_0x4d372d);}catch(_0x55cab7){stackRestore(_0xffabc7);if(_0x55cab7!==_0x55cab7+0x0&&_0x55cab7!==_0x3149('0x2e7'))throw _0x55cab7;_setThrew(0x1,0x0);}}function invoke_viiii(_0x5d0b85,_0x70debb,_0x47907e,_0x482812,_0x10fc58){var _0x1db020=stackSave();try{dynCall_viiii(_0x5d0b85,_0x70debb,_0x47907e,_0x482812,_0x10fc58);}catch(_0x341f11){stackRestore(_0x1db020);if(_0x341f11!==_0x341f11+0x0&&_0x341f11!==_0x3149('0x2e7'))throw _0x341f11;_setThrew(0x1,0x0);}}var asmGlobalArg={};var asmLibraryArg={'abort':abort,'setTempRet0':setTempRet0,'getTempRet0':getTempRet0,'invoke_ii':invoke_ii,'invoke_iii':invoke_iii,'invoke_iiii':invoke_iiii,'invoke_iiiii':invoke_iiiii,'invoke_iiiiiiiiii':invoke_iiiiiiiiii,'invoke_vii':invoke_vii,'invoke_viii':invoke_viii,'invoke_viiii':invoke_viiii,'ClassHandle':ClassHandle,'ClassHandle_clone':ClassHandle_clone,'ClassHandle_delete':ClassHandle_delete,'ClassHandle_deleteLater':ClassHandle_deleteLater,'ClassHandle_isAliasOf':ClassHandle_isAliasOf,'ClassHandle_isDeleted':ClassHandle_isDeleted,'RegisteredClass':RegisteredClass,'RegisteredPointer':RegisteredPointer,'RegisteredPointer_deleteObject':RegisteredPointer_deleteObject,'RegisteredPointer_destructor':RegisteredPointer_destructor,'RegisteredPointer_fromWireType':RegisteredPointer_fromWireType,'RegisteredPointer_getPointee':RegisteredPointer_getPointee,'__ZSt18uncaught_exceptionv':__ZSt18uncaught_exceptionv,'___buildEnvironment':___buildEnvironment,'___clock_gettime':___clock_gettime,'___cxa_allocate_exception':___cxa_allocate_exception,'___cxa_begin_catch':___cxa_begin_catch,'___cxa_find_matching_catch':___cxa_find_matching_catch,'___cxa_free_exception':___cxa_free_exception,'___cxa_pure_virtual':___cxa_pure_virtual,'___cxa_throw':___cxa_throw,'___gxx_personality_v0':___gxx_personality_v0,'___lock':___lock,'___resumeException':___resumeException,'___setErrNo':___setErrNo,'___syscall10':___syscall10,'___syscall140':___syscall140,'___syscall145':___syscall145,'___syscall146':___syscall146,'___syscall194':___syscall194,'___syscall195':___syscall195,'___syscall197':___syscall197,'___syscall221':___syscall221,'___syscall33':___syscall33,'___syscall330':___syscall330,'___syscall5':___syscall5,'___syscall54':___syscall54,'___syscall6':___syscall6,'___syscall63':___syscall63,'___unlock':___unlock,'__embind_finalize_value_array':__embind_finalize_value_array,'__embind_finalize_value_object':__embind_finalize_value_object,'__embind_register_bool':__embind_register_bool,'__embind_register_class':__embind_register_class,'__embind_register_class_constructor':__embind_register_class_constructor,'__embind_register_class_function':__embind_register_class_function,'__embind_register_class_property':__embind_register_class_property,'__embind_register_constant':__embind_register_constant,'__embind_register_emval':__embind_register_emval,'__embind_register_enum':__embind_register_enum,'__embind_register_enum_value':__embind_register_enum_value,'__embind_register_float':__embind_register_float,'__embind_register_function':__embind_register_function,'__embind_register_integer':__embind_register_integer,'__embind_register_memory_view':__embind_register_memory_view,'__embind_register_std_string':__embind_register_std_string,'__embind_register_std_wstring':__embind_register_std_wstring,'__embind_register_value_array':__embind_register_value_array,'__embind_register_value_array_element':__embind_register_value_array_element,'__embind_register_value_object':__embind_register_value_object,'__embind_register_value_object_field':__embind_register_value_object_field,'__embind_register_void':__embind_register_void,'__emval_as':__emval_as,'__emval_decref':__emval_decref,'__emval_incref':__emval_incref,'__emval_register':__emval_register,'__emval_run_destructors':__emval_run_destructors,'__emval_take_value':__emval_take_value,'_abort':_abort,'_clock':_clock,'_clock_gettime':_clock_gettime,'_embind_repr':_embind_repr,'_emscripten_get_heap_size':_emscripten_get_heap_size,'_emscripten_get_now':_emscripten_get_now,'_emscripten_get_now_is_monotonic':_emscripten_get_now_is_monotonic,'_emscripten_longjmp':_emscripten_longjmp,'_emscripten_memcpy_big':_emscripten_memcpy_big,'_emscripten_resize_heap':_emscripten_resize_heap,'_exit':_exit,'_longjmp':_longjmp,'_signal':_signal,'_time':_time,'constNoSmartPtrRawPointerToWireType':constNoSmartPtrRawPointerToWireType,'count_emval_handles':count_emval_handles,'craftInvokerFunction':craftInvokerFunction,'createNamedFunction':createNamedFunction,'downcastPointer':downcastPointer,'embind__requireFunction':embind__requireFunction,'embind_init_charCodes':embind_init_charCodes,'ensureOverloadTable':ensureOverloadTable,'enumReadValueFromPointer':enumReadValueFromPointer,'exposePublicSymbol':exposePublicSymbol,'extendError':extendError,'floatReadValueFromPointer':floatReadValueFromPointer,'flushPendingDeletes':flushPendingDeletes,'genericPointerToWireType':genericPointerToWireType,'getBasestPointer':getBasestPointer,'getInheritedInstance':getInheritedInstance,'getInheritedInstanceCount':getInheritedInstanceCount,'getLiveInheritedInstances':getLiveInheritedInstances,'getShiftFromSize':getShiftFromSize,'getTypeName':getTypeName,'get_first_emval':get_first_emval,'heap32VectorToArray':heap32VectorToArray,'init_ClassHandle':init_ClassHandle,'init_RegisteredPointer':init_RegisteredPointer,'init_embind':init_embind,'init_emval':init_emval,'integerReadValueFromPointer':integerReadValueFromPointer,'makeClassHandle':makeClassHandle,'makeLegalFunctionName':makeLegalFunctionName,'new_':new_,'nonConstNoSmartPtrRawPointerToWireType':nonConstNoSmartPtrRawPointerToWireType,'readLatin1String':readLatin1String,'registerType':registerType,'replacePublicSymbol':replacePublicSymbol,'requireHandle':requireHandle,'requireRegisteredType':requireRegisteredType,'runDestructor':runDestructor,'runDestructors':runDestructors,'setDelayFunction':setDelayFunction,'shallowCopyInternalPointer':shallowCopyInternalPointer,'simpleReadValueFromPointer':simpleReadValueFromPointer,'throwBindingError':throwBindingError,'throwInstanceAlreadyDeleted':throwInstanceAlreadyDeleted,'throwInternalError':throwInternalError,'throwUnboundTypeError':throwUnboundTypeError,'upcastPointer':upcastPointer,'validateThis':validateThis,'whenDependentTypesAreResolved':whenDependentTypesAreResolved,'tempDoublePtr':tempDoublePtr,'DYNAMICTOP_PTR':DYNAMICTOP_PTR};var asm=Module[_0x3149('0xbc')](asmGlobalArg,asmLibraryArg,buffer);Module[_0x3149('0xbc')]=asm;var ___cxa_can_catch=Module['___cxa_can_catch']=function(){return Module[_0x3149('0xbc')][_0x3149('0xde')][_0x3149('0x78')](null,arguments);};var ___cxa_is_pointer_type=Module['___cxa_is_pointer_type']=function(){return Module[_0x3149('0xbc')]['___cxa_is_pointer_type'][_0x3149('0x78')](null,arguments);};var ___errno_location=Module[_0x3149('0xd2')]=function(){return Module[_0x3149('0xbc')][_0x3149('0xd2')][_0x3149('0x78')](null,arguments);};var ___getTypeName=Module[_0x3149('0x2f9')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x2f9')][_0x3149('0x78')](null,arguments);};var __get_daylight=Module[_0x3149('0x2fa')]=function(){return Module[_0x3149('0xbc')]['__get_daylight'][_0x3149('0x78')](null,arguments);};var __get_environ=Module['__get_environ']=function(){return Module[_0x3149('0xbc')][_0x3149('0x2fb')][_0x3149('0x78')](null,arguments);};var __get_timezone=Module[_0x3149('0x2fc')]=function(){return Module[_0x3149('0xbc')]['__get_timezone'][_0x3149('0x78')](null,arguments);};var __get_tzname=Module[_0x3149('0x2fd')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x2fd')][_0x3149('0x78')](null,arguments);};var _free=Module['_free']=function(){return Module[_0x3149('0xbc')][_0x3149('0x2fe')][_0x3149('0x78')](null,arguments);};var _llvm_bswap_i32=Module[_0x3149('0x2ff')]=function(){return Module['asm'][_0x3149('0x2ff')][_0x3149('0x78')](null,arguments);};var _llvm_round_f32=Module[_0x3149('0x300')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x300')]['apply'](null,arguments);};var _malloc=Module['_malloc']=function(){return Module['asm'][_0x3149('0x301')][_0x3149('0x78')](null,arguments);};var _memcpy=Module[_0x3149('0x302')]=function(){return Module['asm']['_memcpy']['apply'](null,arguments);};var _memmove=Module['_memmove']=function(){return Module[_0x3149('0xbc')][_0x3149('0x303')][_0x3149('0x78')](null,arguments);};var _memset=Module[_0x3149('0x304')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x304')]['apply'](null,arguments);};var _realloc=Module[_0x3149('0x305')]=function(){return Module[_0x3149('0xbc')]['_realloc'][_0x3149('0x78')](null,arguments);};var _saveSetjmp=Module['_saveSetjmp']=function(){return Module['asm']['_saveSetjmp'][_0x3149('0x78')](null,arguments);};var _sbrk=Module[_0x3149('0x306')]=function(){return Module['asm'][_0x3149('0x306')]['apply'](null,arguments);};var _setThrew=Module[_0x3149('0x307')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x307')][_0x3149('0x78')](null,arguments);};var _testSetjmp=Module['_testSetjmp']=function(){return Module['asm'][_0x3149('0x308')][_0x3149('0x78')](null,arguments);};var establishStackSpace=Module[_0x3149('0x309')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x309')][_0x3149('0x78')](null,arguments);};var globalCtors=Module['globalCtors']=function(){return Module[_0x3149('0xbc')][_0x3149('0x30a')][_0x3149('0x78')](null,arguments);};var stackAlloc=Module[_0x3149('0x30b')]=function(){return Module['asm']['stackAlloc'][_0x3149('0x78')](null,arguments);};var stackRestore=Module[_0x3149('0x30c')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x30c')]['apply'](null,arguments);};var stackSave=Module[_0x3149('0x30d')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x30d')][_0x3149('0x78')](null,arguments);};var dynCall_dii=Module[_0x3149('0x30e')]=function(){return Module[_0x3149('0xbc')]['dynCall_dii'][_0x3149('0x78')](null,arguments);};var dynCall_fi=Module[_0x3149('0x30f')]=function(){return Module[_0x3149('0xbc')]['dynCall_fi'][_0x3149('0x78')](null,arguments);};var dynCall_fif=Module[_0x3149('0x310')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x310')][_0x3149('0x78')](null,arguments);};var dynCall_fii=Module[_0x3149('0x311')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x311')]['apply'](null,arguments);};var dynCall_fiiiii=Module[_0x3149('0x312')]=function(){return Module['asm'][_0x3149('0x312')][_0x3149('0x78')](null,arguments);};var dynCall_i=Module[_0x3149('0x313')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x313')][_0x3149('0x78')](null,arguments);};var dynCall_ii=Module[_0x3149('0x314')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x314')]['apply'](null,arguments);};var dynCall_iidiiii=Module[_0x3149('0x315')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x315')][_0x3149('0x78')](null,arguments);};var dynCall_iif=Module[_0x3149('0x316')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x316')][_0x3149('0x78')](null,arguments);};var dynCall_iii=Module[_0x3149('0x317')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x317')][_0x3149('0x78')](null,arguments);};var dynCall_iiiff=Module[_0x3149('0x318')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x318')][_0x3149('0x78')](null,arguments);};var dynCall_iiiffffii=Module['dynCall_iiiffffii']=function(){return Module['asm']['dynCall_iiiffffii']['apply'](null,arguments);};var dynCall_iiifii=Module[_0x3149('0x319')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x319')][_0x3149('0x78')](null,arguments);};var dynCall_iiii=Module['dynCall_iiii']=function(){return Module[_0x3149('0xbc')][_0x3149('0x31a')][_0x3149('0x78')](null,arguments);};var dynCall_iiiif=Module[_0x3149('0x31b')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x31b')][_0x3149('0x78')](null,arguments);};var dynCall_iiiiff=Module[_0x3149('0x31c')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x31c')][_0x3149('0x78')](null,arguments);};var dynCall_iiiiffffii=Module[_0x3149('0x31d')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x31d')][_0x3149('0x78')](null,arguments);};var dynCall_iiiifffiiffff=Module[_0x3149('0x31e')]=function(){return Module['asm'][_0x3149('0x31e')][_0x3149('0x78')](null,arguments);};var dynCall_iiiifii=Module['dynCall_iiiifii']=function(){return Module[_0x3149('0xbc')][_0x3149('0x31f')]['apply'](null,arguments);};var dynCall_iiiifiiffff=Module[_0x3149('0x320')]=function(){return Module['asm'][_0x3149('0x320')][_0x3149('0x78')](null,arguments);};var dynCall_iiiii=Module['dynCall_iiiii']=function(){return Module['asm'][_0x3149('0x321')][_0x3149('0x78')](null,arguments);};var dynCall_iiiiifffiiffff=Module[_0x3149('0x322')]=function(){return Module['asm'][_0x3149('0x322')][_0x3149('0x78')](null,arguments);};var dynCall_iiiiifiiffff=Module[_0x3149('0x323')]=function(){return Module[_0x3149('0xbc')]['dynCall_iiiiifiiffff']['apply'](null,arguments);};var dynCall_iiiiii=Module['dynCall_iiiiii']=function(){return Module[_0x3149('0xbc')][_0x3149('0x324')][_0x3149('0x78')](null,arguments);};var dynCall_iiiiiiffff=Module[_0x3149('0x325')]=function(){return Module['asm']['dynCall_iiiiiiffff'][_0x3149('0x78')](null,arguments);};var dynCall_iiiiiifffff=Module[_0x3149('0x326')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x326')][_0x3149('0x78')](null,arguments);};var dynCall_iiiiiifffffifffff=Module[_0x3149('0x327')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x327')][_0x3149('0x78')](null,arguments);};var dynCall_iiiiiii=Module[_0x3149('0x328')]=function(){return Module['asm'][_0x3149('0x328')][_0x3149('0x78')](null,arguments);};var dynCall_iiiiiiiffff=Module[_0x3149('0x329')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x329')]['apply'](null,arguments);};var dynCall_iiiiiiifffff=Module[_0x3149('0x32a')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x32a')]['apply'](null,arguments);};var dynCall_iiiiiiifffffifffff=Module[_0x3149('0x32b')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x32b')][_0x3149('0x78')](null,arguments);};var dynCall_iiiiiiii=Module[_0x3149('0x32c')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x32c')][_0x3149('0x78')](null,arguments);};var dynCall_iiiiiiiifff=Module[_0x3149('0x32d')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x32d')][_0x3149('0x78')](null,arguments);};var dynCall_iiiiiiiii=Module[_0x3149('0x32e')]=function(){return Module['asm'][_0x3149('0x32e')][_0x3149('0x78')](null,arguments);};var dynCall_iiiiiiiiifff=Module[_0x3149('0x32f')]=function(){return Module['asm'][_0x3149('0x32f')]['apply'](null,arguments);};var dynCall_iiiiiiiiifffffffi=Module[_0x3149('0x330')]=function(){return Module['asm'][_0x3149('0x330')][_0x3149('0x78')](null,arguments);};var dynCall_iiiiiiiiiffffffi=Module[_0x3149('0x331')]=function(){return Module[_0x3149('0xbc')]['dynCall_iiiiiiiiiffffffi'][_0x3149('0x78')](null,arguments);};var dynCall_iiiiiiiiii=Module[_0x3149('0x332')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x332')][_0x3149('0x78')](null,arguments);};var dynCall_iiiiiiiiiifff=Module[_0x3149('0x333')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x333')][_0x3149('0x78')](null,arguments);};var dynCall_iiiiiiiiiifffffffi=Module[_0x3149('0x334')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x334')][_0x3149('0x78')](null,arguments);};var dynCall_iiiiiiiiiiffffffi=Module['dynCall_iiiiiiiiiiffffffi']=function(){return Module[_0x3149('0xbc')][_0x3149('0x335')][_0x3149('0x78')](null,arguments);};var dynCall_iiiiiiiiiii=Module[_0x3149('0x336')]=function(){return Module[_0x3149('0xbc')]['dynCall_iiiiiiiiiii'][_0x3149('0x78')](null,arguments);};var dynCall_iiiiiiiiiiifff=Module[_0x3149('0x337')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x337')][_0x3149('0x78')](null,arguments);};var dynCall_iiiiiiiiiiifffi=Module[_0x3149('0x338')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x338')][_0x3149('0x78')](null,arguments);};var dynCall_iiiiiiiiiiiffi=Module[_0x3149('0x339')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x339')][_0x3149('0x78')](null,arguments);};var dynCall_iiiiiiiiiiifi=Module[_0x3149('0x33a')]=function(){return Module['asm'][_0x3149('0x33a')][_0x3149('0x78')](null,arguments);};var dynCall_iiiiiiiiiiii=Module[_0x3149('0x33b')]=function(){return Module[_0x3149('0xbc')]['dynCall_iiiiiiiiiiii'][_0x3149('0x78')](null,arguments);};var dynCall_iiiiiiiiiiiifffi=Module[_0x3149('0x33c')]=function(){return Module[_0x3149('0xbc')]['dynCall_iiiiiiiiiiiifffi'][_0x3149('0x78')](null,arguments);};var dynCall_iiiiiiiiiiiiffi=Module[_0x3149('0x33d')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x33d')][_0x3149('0x78')](null,arguments);};var dynCall_iiiiiiiiiiiifi=Module[_0x3149('0x33e')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x33e')][_0x3149('0x78')](null,arguments);};var dynCall_iiiiiiiiiiiii=Module['dynCall_iiiiiiiiiiiii']=function(){return Module[_0x3149('0xbc')][_0x3149('0x33f')][_0x3149('0x78')](null,arguments);};var dynCall_jiji=Module[_0x3149('0x340')]=function(){return Module['asm'][_0x3149('0x340')][_0x3149('0x78')](null,arguments);};var dynCall_v=Module[_0x3149('0x99')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x99')][_0x3149('0x78')](null,arguments);};var dynCall_vi=Module[_0x3149('0x9a')]=function(){return Module[_0x3149('0xbc')]['dynCall_vi'][_0x3149('0x78')](null,arguments);};var dynCall_vif=Module['dynCall_vif']=function(){return Module[_0x3149('0xbc')][_0x3149('0x341')]['apply'](null,arguments);};var dynCall_vii=Module[_0x3149('0x342')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x342')][_0x3149('0x78')](null,arguments);};var dynCall_viid=Module[_0x3149('0x343')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x343')][_0x3149('0x78')](null,arguments);};var dynCall_viif=Module[_0x3149('0x344')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x344')][_0x3149('0x78')](null,arguments);};var dynCall_viii=Module[_0x3149('0x345')]=function(){return Module[_0x3149('0xbc')]['dynCall_viii'][_0x3149('0x78')](null,arguments);};var dynCall_viiif=Module[_0x3149('0x346')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x346')][_0x3149('0x78')](null,arguments);};var dynCall_viiii=Module[_0x3149('0x347')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x347')][_0x3149('0x78')](null,arguments);};var dynCall_viiiii=Module[_0x3149('0x348')]=function(){return Module[_0x3149('0xbc')]['dynCall_viiiii'][_0x3149('0x78')](null,arguments);};var dynCall_viiiiii=Module[_0x3149('0x349')]=function(){return Module[_0x3149('0xbc')][_0x3149('0x349')][_0x3149('0x78')](null,arguments);};var dynCall_viiiiiiii=Module[_0x3149('0x34a')]=function(){return Module['asm'][_0x3149('0x34a')][_0x3149('0x78')](null,arguments);};var dynCall_viiiiiiiii=Module[_0x3149('0x34b')]=function(){return Module['asm']['dynCall_viiiiiiiii'][_0x3149('0x78')](null,arguments);};;Module[_0x3149('0xbc')]=asm;Module[_0x3149('0x39')]=getMemory;Module[_0x3149('0x2d')]=addRunDependency;Module['removeRunDependency']=removeRunDependency;Module[_0x3149('0x2ea')]=FS[_0x3149('0x2eb')];Module[_0x3149('0x26')]=FS[_0x3149('0x2ec')];Module[_0x3149('0x2ed')]=FS[_0x3149('0x229')];Module[_0x3149('0x2ee')]=FS[_0x3149('0x34c')];Module[_0x3149('0x2ef')]=FS[_0x3149('0x2f0')];Module[_0x3149('0x2f1')]=FS[_0x3149('0x2f2')];Module[_0x3149('0x2f3')]=FS['createDevice'];Module[_0x3149('0x2f4')]=FS[_0x3149('0x109')];function ExitStatus(_0x72b64b){this[_0x3149('0x2b')]=_0x3149('0x34d');this[_0x3149('0x1ba')]=_0x3149('0x34e')+_0x72b64b+')';this[_0x3149('0x1d')]=_0x72b64b;};ExitStatus[_0x3149('0x2a')]=new Error();ExitStatus[_0x3149('0x2a')][_0x3149('0x1f9')]=ExitStatus;var calledMain=![];dependenciesFulfilled=function runCaller(){if(!Module[_0x3149('0x3e')])run();if(!Module[_0x3149('0x3e')])dependenciesFulfilled=runCaller;};function run(_0x119692){_0x119692=_0x119692||Module[_0x3149('0x47')];if(runDependencies>0x0){return;}preRun();if(runDependencies>0x0)return;if(Module[_0x3149('0x3e')])return;function _0xed86b1(){if(Module[_0x3149('0x3e')])return;Module[_0x3149('0x3e')]=!![];if(ABORT)return;ensureInitRuntime();preMain();if(Module[_0x3149('0x34f')])Module[_0x3149('0x34f')]();postRun();}if(Module[_0x3149('0x18')]){Module[_0x3149('0x18')](_0x3149('0x350'));setTimeout(function(){setTimeout(function(){Module['setStatus']('');},0x1);_0xed86b1();},0x1);}else{_0xed86b1();}}Module['run']=run;function exit(_0x31c731,_0x126712){if(_0x126712&&Module[_0x3149('0x351')]&&_0x31c731===0x0){return;}if(Module[_0x3149('0x351')]){}else{ABORT=!![];EXITSTATUS=_0x31c731;exitRuntime();if(Module[_0x3149('0x352')])Module['onExit'](_0x31c731);}Module[_0x3149('0x49')](_0x31c731,new ExitStatus(_0x31c731));}var abortDecorators=[];function abort(_0x39c760){if(Module[_0x3149('0x353')]){Module['onAbort'](_0x39c760);}if(_0x39c760!==undefined){out(_0x39c760);err(_0x39c760);_0x39c760=JSON[_0x3149('0x354')](_0x39c760);}else{_0x39c760='';}ABORT=!![];EXITSTATUS=0x1;throw _0x3149('0x355')+_0x39c760+_0x3149('0x356');}Module['abort']=abort;if(Module[_0x3149('0x357')]){if(typeof Module['preInit']==_0x3149('0x4a'))Module[_0x3149('0x357')]=[Module[_0x3149('0x357')]];while(Module[_0x3149('0x357')][_0x3149('0x35')]>0x0){Module[_0x3149('0x357')]['pop']()();}}Module[_0x3149('0x351')]=!![];run();module[_0x3149('0x72')]=Module;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(169), "/", __webpack_require__(113), __webpack_require__(469).Buffer, __webpack_require__(111)(module)))

/***/ }),

/***/ 469:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(516)
var ieee754 = __webpack_require__(517)
var isArray = __webpack_require__(513)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ }),

/***/ 485:
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ 492:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 492;

/***/ }),

/***/ 501:
/***/ (function(module, exports) {



/***/ }),

/***/ 513:
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ 514:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {(function (module, exports) {
  'use strict';

  // Utils
  function assert (val, msg) {
    if (!val) throw new Error(msg || 'Assertion failed');
  }

  // Could use `inherits` module, but don't want to move from single file
  // architecture yet.
  function inherits (ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  }

  // BN

  function BN (number, base, endian) {
    if (BN.isBN(number)) {
      return number;
    }

    this.negative = 0;
    this.words = null;
    this.length = 0;

    // Reduction context
    this.red = null;

    if (number !== null) {
      if (base === 'le' || base === 'be') {
        endian = base;
        base = 10;
      }

      this._init(number || 0, base || 10, endian || 'be');
    }
  }
  if (typeof module === 'object') {
    module.exports = BN;
  } else {
    exports.BN = BN;
  }

  BN.BN = BN;
  BN.wordSize = 26;

  var Buffer;
  try {
    // Obfuscate that we require Buffer, to reduce size
    Buffer = __webpack_require__(469).Buffer;
  } catch (e) {
  }

  BN.isBN = function isBN (num) {
    if (num instanceof BN) {
      return true;
    }

    return num !== null && typeof num === 'object' &&
      num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
  };

  BN.max = function max (left, right) {
    if (left.cmp(right) > 0) return left;
    return right;
  };

  BN.min = function min (left, right) {
    if (left.cmp(right) < 0) return left;
    return right;
  };

  BN.prototype._init = function init (number, base, endian) {
    if (typeof number === 'number') {
      return this._initNumber(number, base, endian);
    }

    if (typeof number === 'object') {
      return this._initArray(number, base, endian);
    }

    if (base === 'hex') {
      base = 16;
    }
    assert(base === (base | 0) && base >= 2 && base <= 36);

    number = number.toString().replace(/\s+/g, '');
    var start = 0;
    if (number[0] === '-') {
      start++;
    }

    if (base === 16) {
      this._parseHex(number, start);
    } else {
      this._parseBase(number, base, start);
    }

    if (number[0] === '-') {
      this.negative = 1;
    }

    this.strip();

    if (endian !== 'le') return;

    this._initArray(this.toArray(), base, endian);
  };

  BN.prototype._initNumber = function _initNumber (number, base, endian) {
    if (number < 0) {
      this.negative = 1;
      number = -number;
    }
    if (number < 0x4000000) {
      this.words = [ number & 0x3ffffff ];
      this.length = 1;
    } else if (number < 0x10000000000000) {
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff
      ];
      this.length = 2;
    } else {
      assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
      this.words = [
        number & 0x3ffffff,
        (number / 0x4000000) & 0x3ffffff,
        1
      ];
      this.length = 3;
    }

    if (endian !== 'le') return;

    // Reverse the bytes
    this._initArray(this.toArray(), base, endian);
  };

  BN.prototype._initArray = function _initArray (number, base, endian) {
    // Perhaps a Uint8Array
    assert(typeof number.length === 'number');
    if (number.length <= 0) {
      this.words = [ 0 ];
      this.length = 1;
      return this;
    }

    this.length = Math.ceil(number.length / 3);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    var j, w;
    var off = 0;
    if (endian === 'be') {
      for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
        w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    } else if (endian === 'le') {
      for (i = 0, j = 0; i < number.length; i += 3) {
        w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
        this.words[j] |= (w << off) & 0x3ffffff;
        this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
        off += 24;
        if (off >= 26) {
          off -= 26;
          j++;
        }
      }
    }
    return this.strip();
  };

  function parseHex (str, start, end) {
    var r = 0;
    var len = Math.min(str.length, end);
    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;

      r <<= 4;

      // 'a' - 'f'
      if (c >= 49 && c <= 54) {
        r |= c - 49 + 0xa;

      // 'A' - 'F'
      } else if (c >= 17 && c <= 22) {
        r |= c - 17 + 0xa;

      // '0' - '9'
      } else {
        r |= c & 0xf;
      }
    }
    return r;
  }

  BN.prototype._parseHex = function _parseHex (number, start) {
    // Create possibly bigger array to ensure that it fits the number
    this.length = Math.ceil((number.length - start) / 6);
    this.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      this.words[i] = 0;
    }

    var j, w;
    // Scan 24-bit chunks and add them to the number
    var off = 0;
    for (i = number.length - 6, j = 0; i >= start; i -= 6) {
      w = parseHex(number, i, i + 6);
      this.words[j] |= (w << off) & 0x3ffffff;
      // NOTE: `0x3fffff` is intentional here, 26bits max shift + 24bit hex limb
      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
      off += 24;
      if (off >= 26) {
        off -= 26;
        j++;
      }
    }
    if (i + 6 !== start) {
      w = parseHex(number, start, i + 6);
      this.words[j] |= (w << off) & 0x3ffffff;
      this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
    }
    this.strip();
  };

  function parseBase (str, start, end, mul) {
    var r = 0;
    var len = Math.min(str.length, end);
    for (var i = start; i < len; i++) {
      var c = str.charCodeAt(i) - 48;

      r *= mul;

      // 'a'
      if (c >= 49) {
        r += c - 49 + 0xa;

      // 'A'
      } else if (c >= 17) {
        r += c - 17 + 0xa;

      // '0' - '9'
      } else {
        r += c;
      }
    }
    return r;
  }

  BN.prototype._parseBase = function _parseBase (number, base, start) {
    // Initialize as zero
    this.words = [ 0 ];
    this.length = 1;

    // Find length of limb in base
    for (var limbLen = 0, limbPow = 1; limbPow <= 0x3ffffff; limbPow *= base) {
      limbLen++;
    }
    limbLen--;
    limbPow = (limbPow / base) | 0;

    var total = number.length - start;
    var mod = total % limbLen;
    var end = Math.min(total, total - mod) + start;

    var word = 0;
    for (var i = start; i < end; i += limbLen) {
      word = parseBase(number, i, i + limbLen, base);

      this.imuln(limbPow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }

    if (mod !== 0) {
      var pow = 1;
      word = parseBase(number, i, number.length, base);

      for (i = 0; i < mod; i++) {
        pow *= base;
      }

      this.imuln(pow);
      if (this.words[0] + word < 0x4000000) {
        this.words[0] += word;
      } else {
        this._iaddn(word);
      }
    }
  };

  BN.prototype.copy = function copy (dest) {
    dest.words = new Array(this.length);
    for (var i = 0; i < this.length; i++) {
      dest.words[i] = this.words[i];
    }
    dest.length = this.length;
    dest.negative = this.negative;
    dest.red = this.red;
  };

  BN.prototype.clone = function clone () {
    var r = new BN(null);
    this.copy(r);
    return r;
  };

  BN.prototype._expand = function _expand (size) {
    while (this.length < size) {
      this.words[this.length++] = 0;
    }
    return this;
  };

  // Remove leading `0` from `this`
  BN.prototype.strip = function strip () {
    while (this.length > 1 && this.words[this.length - 1] === 0) {
      this.length--;
    }
    return this._normSign();
  };

  BN.prototype._normSign = function _normSign () {
    // -0 = 0
    if (this.length === 1 && this.words[0] === 0) {
      this.negative = 0;
    }
    return this;
  };

  BN.prototype.inspect = function inspect () {
    return (this.red ? '<BN-R: ' : '<BN: ') + this.toString(16) + '>';
  };

  /*

  var zeros = [];
  var groupSizes = [];
  var groupBases = [];

  var s = '';
  var i = -1;
  while (++i < BN.wordSize) {
    zeros[i] = s;
    s += '0';
  }
  groupSizes[0] = 0;
  groupSizes[1] = 0;
  groupBases[0] = 0;
  groupBases[1] = 0;
  var base = 2 - 1;
  while (++base < 36 + 1) {
    var groupSize = 0;
    var groupBase = 1;
    while (groupBase < (1 << BN.wordSize) / base) {
      groupBase *= base;
      groupSize += 1;
    }
    groupSizes[base] = groupSize;
    groupBases[base] = groupBase;
  }

  */

  var zeros = [
    '',
    '0',
    '00',
    '000',
    '0000',
    '00000',
    '000000',
    '0000000',
    '00000000',
    '000000000',
    '0000000000',
    '00000000000',
    '000000000000',
    '0000000000000',
    '00000000000000',
    '000000000000000',
    '0000000000000000',
    '00000000000000000',
    '000000000000000000',
    '0000000000000000000',
    '00000000000000000000',
    '000000000000000000000',
    '0000000000000000000000',
    '00000000000000000000000',
    '000000000000000000000000',
    '0000000000000000000000000'
  ];

  var groupSizes = [
    0, 0,
    25, 16, 12, 11, 10, 9, 8,
    8, 7, 7, 7, 7, 6, 6,
    6, 6, 6, 6, 6, 5, 5,
    5, 5, 5, 5, 5, 5, 5,
    5, 5, 5, 5, 5, 5, 5
  ];

  var groupBases = [
    0, 0,
    33554432, 43046721, 16777216, 48828125, 60466176, 40353607, 16777216,
    43046721, 10000000, 19487171, 35831808, 62748517, 7529536, 11390625,
    16777216, 24137569, 34012224, 47045881, 64000000, 4084101, 5153632,
    6436343, 7962624, 9765625, 11881376, 14348907, 17210368, 20511149,
    24300000, 28629151, 33554432, 39135393, 45435424, 52521875, 60466176
  ];

  BN.prototype.toString = function toString (base, padding) {
    base = base || 10;
    padding = padding | 0 || 1;

    var out;
    if (base === 16 || base === 'hex') {
      out = '';
      var off = 0;
      var carry = 0;
      for (var i = 0; i < this.length; i++) {
        var w = this.words[i];
        var word = (((w << off) | carry) & 0xffffff).toString(16);
        carry = (w >>> (24 - off)) & 0xffffff;
        if (carry !== 0 || i !== this.length - 1) {
          out = zeros[6 - word.length] + word + out;
        } else {
          out = word + out;
        }
        off += 2;
        if (off >= 26) {
          off -= 26;
          i--;
        }
      }
      if (carry !== 0) {
        out = carry.toString(16) + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }

    if (base === (base | 0) && base >= 2 && base <= 36) {
      // var groupSize = Math.floor(BN.wordSize * Math.LN2 / Math.log(base));
      var groupSize = groupSizes[base];
      // var groupBase = Math.pow(base, groupSize);
      var groupBase = groupBases[base];
      out = '';
      var c = this.clone();
      c.negative = 0;
      while (!c.isZero()) {
        var r = c.modn(groupBase).toString(base);
        c = c.idivn(groupBase);

        if (!c.isZero()) {
          out = zeros[groupSize - r.length] + r + out;
        } else {
          out = r + out;
        }
      }
      if (this.isZero()) {
        out = '0' + out;
      }
      while (out.length % padding !== 0) {
        out = '0' + out;
      }
      if (this.negative !== 0) {
        out = '-' + out;
      }
      return out;
    }

    assert(false, 'Base should be between 2 and 36');
  };

  BN.prototype.toNumber = function toNumber () {
    var ret = this.words[0];
    if (this.length === 2) {
      ret += this.words[1] * 0x4000000;
    } else if (this.length === 3 && this.words[2] === 0x01) {
      // NOTE: at this stage it is known that the top bit is set
      ret += 0x10000000000000 + (this.words[1] * 0x4000000);
    } else if (this.length > 2) {
      assert(false, 'Number can only safely store up to 53 bits');
    }
    return (this.negative !== 0) ? -ret : ret;
  };

  BN.prototype.toJSON = function toJSON () {
    return this.toString(16);
  };

  BN.prototype.toBuffer = function toBuffer (endian, length) {
    assert(typeof Buffer !== 'undefined');
    return this.toArrayLike(Buffer, endian, length);
  };

  BN.prototype.toArray = function toArray (endian, length) {
    return this.toArrayLike(Array, endian, length);
  };

  BN.prototype.toArrayLike = function toArrayLike (ArrayType, endian, length) {
    var byteLength = this.byteLength();
    var reqLength = length || Math.max(1, byteLength);
    assert(byteLength <= reqLength, 'byte array longer than desired length');
    assert(reqLength > 0, 'Requested array length <= 0');

    this.strip();
    var littleEndian = endian === 'le';
    var res = new ArrayType(reqLength);

    var b, i;
    var q = this.clone();
    if (!littleEndian) {
      // Assume big-endian
      for (i = 0; i < reqLength - byteLength; i++) {
        res[i] = 0;
      }

      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);

        res[reqLength - i - 1] = b;
      }
    } else {
      for (i = 0; !q.isZero(); i++) {
        b = q.andln(0xff);
        q.iushrn(8);

        res[i] = b;
      }

      for (; i < reqLength; i++) {
        res[i] = 0;
      }
    }

    return res;
  };

  if (Math.clz32) {
    BN.prototype._countBits = function _countBits (w) {
      return 32 - Math.clz32(w);
    };
  } else {
    BN.prototype._countBits = function _countBits (w) {
      var t = w;
      var r = 0;
      if (t >= 0x1000) {
        r += 13;
        t >>>= 13;
      }
      if (t >= 0x40) {
        r += 7;
        t >>>= 7;
      }
      if (t >= 0x8) {
        r += 4;
        t >>>= 4;
      }
      if (t >= 0x02) {
        r += 2;
        t >>>= 2;
      }
      return r + t;
    };
  }

  BN.prototype._zeroBits = function _zeroBits (w) {
    // Short-cut
    if (w === 0) return 26;

    var t = w;
    var r = 0;
    if ((t & 0x1fff) === 0) {
      r += 13;
      t >>>= 13;
    }
    if ((t & 0x7f) === 0) {
      r += 7;
      t >>>= 7;
    }
    if ((t & 0xf) === 0) {
      r += 4;
      t >>>= 4;
    }
    if ((t & 0x3) === 0) {
      r += 2;
      t >>>= 2;
    }
    if ((t & 0x1) === 0) {
      r++;
    }
    return r;
  };

  // Return number of used bits in a BN
  BN.prototype.bitLength = function bitLength () {
    var w = this.words[this.length - 1];
    var hi = this._countBits(w);
    return (this.length - 1) * 26 + hi;
  };

  function toBitArray (num) {
    var w = new Array(num.bitLength());

    for (var bit = 0; bit < w.length; bit++) {
      var off = (bit / 26) | 0;
      var wbit = bit % 26;

      w[bit] = (num.words[off] & (1 << wbit)) >>> wbit;
    }

    return w;
  }

  // Number of trailing zero bits
  BN.prototype.zeroBits = function zeroBits () {
    if (this.isZero()) return 0;

    var r = 0;
    for (var i = 0; i < this.length; i++) {
      var b = this._zeroBits(this.words[i]);
      r += b;
      if (b !== 26) break;
    }
    return r;
  };

  BN.prototype.byteLength = function byteLength () {
    return Math.ceil(this.bitLength() / 8);
  };

  BN.prototype.toTwos = function toTwos (width) {
    if (this.negative !== 0) {
      return this.abs().inotn(width).iaddn(1);
    }
    return this.clone();
  };

  BN.prototype.fromTwos = function fromTwos (width) {
    if (this.testn(width - 1)) {
      return this.notn(width).iaddn(1).ineg();
    }
    return this.clone();
  };

  BN.prototype.isNeg = function isNeg () {
    return this.negative !== 0;
  };

  // Return negative clone of `this`
  BN.prototype.neg = function neg () {
    return this.clone().ineg();
  };

  BN.prototype.ineg = function ineg () {
    if (!this.isZero()) {
      this.negative ^= 1;
    }

    return this;
  };

  // Or `num` with `this` in-place
  BN.prototype.iuor = function iuor (num) {
    while (this.length < num.length) {
      this.words[this.length++] = 0;
    }

    for (var i = 0; i < num.length; i++) {
      this.words[i] = this.words[i] | num.words[i];
    }

    return this.strip();
  };

  BN.prototype.ior = function ior (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuor(num);
  };

  // Or `num` with `this`
  BN.prototype.or = function or (num) {
    if (this.length > num.length) return this.clone().ior(num);
    return num.clone().ior(this);
  };

  BN.prototype.uor = function uor (num) {
    if (this.length > num.length) return this.clone().iuor(num);
    return num.clone().iuor(this);
  };

  // And `num` with `this` in-place
  BN.prototype.iuand = function iuand (num) {
    // b = min-length(num, this)
    var b;
    if (this.length > num.length) {
      b = num;
    } else {
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = this.words[i] & num.words[i];
    }

    this.length = b.length;

    return this.strip();
  };

  BN.prototype.iand = function iand (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuand(num);
  };

  // And `num` with `this`
  BN.prototype.and = function and (num) {
    if (this.length > num.length) return this.clone().iand(num);
    return num.clone().iand(this);
  };

  BN.prototype.uand = function uand (num) {
    if (this.length > num.length) return this.clone().iuand(num);
    return num.clone().iuand(this);
  };

  // Xor `num` with `this` in-place
  BN.prototype.iuxor = function iuxor (num) {
    // a.length > b.length
    var a;
    var b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    for (var i = 0; i < b.length; i++) {
      this.words[i] = a.words[i] ^ b.words[i];
    }

    if (this !== a) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = a.length;

    return this.strip();
  };

  BN.prototype.ixor = function ixor (num) {
    assert((this.negative | num.negative) === 0);
    return this.iuxor(num);
  };

  // Xor `num` with `this`
  BN.prototype.xor = function xor (num) {
    if (this.length > num.length) return this.clone().ixor(num);
    return num.clone().ixor(this);
  };

  BN.prototype.uxor = function uxor (num) {
    if (this.length > num.length) return this.clone().iuxor(num);
    return num.clone().iuxor(this);
  };

  // Not ``this`` with ``width`` bitwidth
  BN.prototype.inotn = function inotn (width) {
    assert(typeof width === 'number' && width >= 0);

    var bytesNeeded = Math.ceil(width / 26) | 0;
    var bitsLeft = width % 26;

    // Extend the buffer with leading zeroes
    this._expand(bytesNeeded);

    if (bitsLeft > 0) {
      bytesNeeded--;
    }

    // Handle complete words
    for (var i = 0; i < bytesNeeded; i++) {
      this.words[i] = ~this.words[i] & 0x3ffffff;
    }

    // Handle the residue
    if (bitsLeft > 0) {
      this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
    }

    // And remove leading zeroes
    return this.strip();
  };

  BN.prototype.notn = function notn (width) {
    return this.clone().inotn(width);
  };

  // Set `bit` of `this`
  BN.prototype.setn = function setn (bit, val) {
    assert(typeof bit === 'number' && bit >= 0);

    var off = (bit / 26) | 0;
    var wbit = bit % 26;

    this._expand(off + 1);

    if (val) {
      this.words[off] = this.words[off] | (1 << wbit);
    } else {
      this.words[off] = this.words[off] & ~(1 << wbit);
    }

    return this.strip();
  };

  // Add `num` to `this` in-place
  BN.prototype.iadd = function iadd (num) {
    var r;

    // negative + positive
    if (this.negative !== 0 && num.negative === 0) {
      this.negative = 0;
      r = this.isub(num);
      this.negative ^= 1;
      return this._normSign();

    // positive + negative
    } else if (this.negative === 0 && num.negative !== 0) {
      num.negative = 0;
      r = this.isub(num);
      num.negative = 1;
      return r._normSign();
    }

    // a.length > b.length
    var a, b;
    if (this.length > num.length) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      this.words[i] = r & 0x3ffffff;
      carry = r >>> 26;
    }

    this.length = a.length;
    if (carry !== 0) {
      this.words[this.length] = carry;
      this.length++;
    // Copy the rest of the words
    } else if (a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    return this;
  };

  // Add `num` to `this`
  BN.prototype.add = function add (num) {
    var res;
    if (num.negative !== 0 && this.negative === 0) {
      num.negative = 0;
      res = this.sub(num);
      num.negative ^= 1;
      return res;
    } else if (num.negative === 0 && this.negative !== 0) {
      this.negative = 0;
      res = num.sub(this);
      this.negative = 1;
      return res;
    }

    if (this.length > num.length) return this.clone().iadd(num);

    return num.clone().iadd(this);
  };

  // Subtract `num` from `this` in-place
  BN.prototype.isub = function isub (num) {
    // this - (-num) = this + num
    if (num.negative !== 0) {
      num.negative = 0;
      var r = this.iadd(num);
      num.negative = 1;
      return r._normSign();

    // -this - num = -(this + num)
    } else if (this.negative !== 0) {
      this.negative = 0;
      this.iadd(num);
      this.negative = 1;
      return this._normSign();
    }

    // At this point both numbers are positive
    var cmp = this.cmp(num);

    // Optimization - zeroify
    if (cmp === 0) {
      this.negative = 0;
      this.length = 1;
      this.words[0] = 0;
      return this;
    }

    // a > b
    var a, b;
    if (cmp > 0) {
      a = this;
      b = num;
    } else {
      a = num;
      b = this;
    }

    var carry = 0;
    for (var i = 0; i < b.length; i++) {
      r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }
    for (; carry !== 0 && i < a.length; i++) {
      r = (a.words[i] | 0) + carry;
      carry = r >> 26;
      this.words[i] = r & 0x3ffffff;
    }

    // Copy rest of the words
    if (carry === 0 && i < a.length && a !== this) {
      for (; i < a.length; i++) {
        this.words[i] = a.words[i];
      }
    }

    this.length = Math.max(this.length, i);

    if (a !== this) {
      this.negative = 1;
    }

    return this.strip();
  };

  // Subtract `num` from `this`
  BN.prototype.sub = function sub (num) {
    return this.clone().isub(num);
  };

  function smallMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    var len = (self.length + num.length) | 0;
    out.length = len;
    len = (len - 1) | 0;

    // Peel one iteration (compiler can't do it, because of code complexity)
    var a = self.words[0] | 0;
    var b = num.words[0] | 0;
    var r = a * b;

    var lo = r & 0x3ffffff;
    var carry = (r / 0x4000000) | 0;
    out.words[0] = lo;

    for (var k = 1; k < len; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = carry >>> 26;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = (k - j) | 0;
        a = self.words[i] | 0;
        b = num.words[j] | 0;
        r = a * b + rword;
        ncarry += (r / 0x4000000) | 0;
        rword = r & 0x3ffffff;
      }
      out.words[k] = rword | 0;
      carry = ncarry | 0;
    }
    if (carry !== 0) {
      out.words[k] = carry | 0;
    } else {
      out.length--;
    }

    return out.strip();
  }

  // TODO(indutny): it may be reasonable to omit it for users who don't need
  // to work with 256-bit numbers, otherwise it gives 20% improvement for 256-bit
  // multiplication (like elliptic secp256k1).
  var comb10MulTo = function comb10MulTo (self, num, out) {
    var a = self.words;
    var b = num.words;
    var o = out.words;
    var c = 0;
    var lo;
    var mid;
    var hi;
    var a0 = a[0] | 0;
    var al0 = a0 & 0x1fff;
    var ah0 = a0 >>> 13;
    var a1 = a[1] | 0;
    var al1 = a1 & 0x1fff;
    var ah1 = a1 >>> 13;
    var a2 = a[2] | 0;
    var al2 = a2 & 0x1fff;
    var ah2 = a2 >>> 13;
    var a3 = a[3] | 0;
    var al3 = a3 & 0x1fff;
    var ah3 = a3 >>> 13;
    var a4 = a[4] | 0;
    var al4 = a4 & 0x1fff;
    var ah4 = a4 >>> 13;
    var a5 = a[5] | 0;
    var al5 = a5 & 0x1fff;
    var ah5 = a5 >>> 13;
    var a6 = a[6] | 0;
    var al6 = a6 & 0x1fff;
    var ah6 = a6 >>> 13;
    var a7 = a[7] | 0;
    var al7 = a7 & 0x1fff;
    var ah7 = a7 >>> 13;
    var a8 = a[8] | 0;
    var al8 = a8 & 0x1fff;
    var ah8 = a8 >>> 13;
    var a9 = a[9] | 0;
    var al9 = a9 & 0x1fff;
    var ah9 = a9 >>> 13;
    var b0 = b[0] | 0;
    var bl0 = b0 & 0x1fff;
    var bh0 = b0 >>> 13;
    var b1 = b[1] | 0;
    var bl1 = b1 & 0x1fff;
    var bh1 = b1 >>> 13;
    var b2 = b[2] | 0;
    var bl2 = b2 & 0x1fff;
    var bh2 = b2 >>> 13;
    var b3 = b[3] | 0;
    var bl3 = b3 & 0x1fff;
    var bh3 = b3 >>> 13;
    var b4 = b[4] | 0;
    var bl4 = b4 & 0x1fff;
    var bh4 = b4 >>> 13;
    var b5 = b[5] | 0;
    var bl5 = b5 & 0x1fff;
    var bh5 = b5 >>> 13;
    var b6 = b[6] | 0;
    var bl6 = b6 & 0x1fff;
    var bh6 = b6 >>> 13;
    var b7 = b[7] | 0;
    var bl7 = b7 & 0x1fff;
    var bh7 = b7 >>> 13;
    var b8 = b[8] | 0;
    var bl8 = b8 & 0x1fff;
    var bh8 = b8 >>> 13;
    var b9 = b[9] | 0;
    var bl9 = b9 & 0x1fff;
    var bh9 = b9 >>> 13;

    out.negative = self.negative ^ num.negative;
    out.length = 19;
    /* k = 0 */
    lo = Math.imul(al0, bl0);
    mid = Math.imul(al0, bh0);
    mid = (mid + Math.imul(ah0, bl0)) | 0;
    hi = Math.imul(ah0, bh0);
    var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
    w0 &= 0x3ffffff;
    /* k = 1 */
    lo = Math.imul(al1, bl0);
    mid = Math.imul(al1, bh0);
    mid = (mid + Math.imul(ah1, bl0)) | 0;
    hi = Math.imul(ah1, bh0);
    lo = (lo + Math.imul(al0, bl1)) | 0;
    mid = (mid + Math.imul(al0, bh1)) | 0;
    mid = (mid + Math.imul(ah0, bl1)) | 0;
    hi = (hi + Math.imul(ah0, bh1)) | 0;
    var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
    w1 &= 0x3ffffff;
    /* k = 2 */
    lo = Math.imul(al2, bl0);
    mid = Math.imul(al2, bh0);
    mid = (mid + Math.imul(ah2, bl0)) | 0;
    hi = Math.imul(ah2, bh0);
    lo = (lo + Math.imul(al1, bl1)) | 0;
    mid = (mid + Math.imul(al1, bh1)) | 0;
    mid = (mid + Math.imul(ah1, bl1)) | 0;
    hi = (hi + Math.imul(ah1, bh1)) | 0;
    lo = (lo + Math.imul(al0, bl2)) | 0;
    mid = (mid + Math.imul(al0, bh2)) | 0;
    mid = (mid + Math.imul(ah0, bl2)) | 0;
    hi = (hi + Math.imul(ah0, bh2)) | 0;
    var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
    w2 &= 0x3ffffff;
    /* k = 3 */
    lo = Math.imul(al3, bl0);
    mid = Math.imul(al3, bh0);
    mid = (mid + Math.imul(ah3, bl0)) | 0;
    hi = Math.imul(ah3, bh0);
    lo = (lo + Math.imul(al2, bl1)) | 0;
    mid = (mid + Math.imul(al2, bh1)) | 0;
    mid = (mid + Math.imul(ah2, bl1)) | 0;
    hi = (hi + Math.imul(ah2, bh1)) | 0;
    lo = (lo + Math.imul(al1, bl2)) | 0;
    mid = (mid + Math.imul(al1, bh2)) | 0;
    mid = (mid + Math.imul(ah1, bl2)) | 0;
    hi = (hi + Math.imul(ah1, bh2)) | 0;
    lo = (lo + Math.imul(al0, bl3)) | 0;
    mid = (mid + Math.imul(al0, bh3)) | 0;
    mid = (mid + Math.imul(ah0, bl3)) | 0;
    hi = (hi + Math.imul(ah0, bh3)) | 0;
    var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
    w3 &= 0x3ffffff;
    /* k = 4 */
    lo = Math.imul(al4, bl0);
    mid = Math.imul(al4, bh0);
    mid = (mid + Math.imul(ah4, bl0)) | 0;
    hi = Math.imul(ah4, bh0);
    lo = (lo + Math.imul(al3, bl1)) | 0;
    mid = (mid + Math.imul(al3, bh1)) | 0;
    mid = (mid + Math.imul(ah3, bl1)) | 0;
    hi = (hi + Math.imul(ah3, bh1)) | 0;
    lo = (lo + Math.imul(al2, bl2)) | 0;
    mid = (mid + Math.imul(al2, bh2)) | 0;
    mid = (mid + Math.imul(ah2, bl2)) | 0;
    hi = (hi + Math.imul(ah2, bh2)) | 0;
    lo = (lo + Math.imul(al1, bl3)) | 0;
    mid = (mid + Math.imul(al1, bh3)) | 0;
    mid = (mid + Math.imul(ah1, bl3)) | 0;
    hi = (hi + Math.imul(ah1, bh3)) | 0;
    lo = (lo + Math.imul(al0, bl4)) | 0;
    mid = (mid + Math.imul(al0, bh4)) | 0;
    mid = (mid + Math.imul(ah0, bl4)) | 0;
    hi = (hi + Math.imul(ah0, bh4)) | 0;
    var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
    w4 &= 0x3ffffff;
    /* k = 5 */
    lo = Math.imul(al5, bl0);
    mid = Math.imul(al5, bh0);
    mid = (mid + Math.imul(ah5, bl0)) | 0;
    hi = Math.imul(ah5, bh0);
    lo = (lo + Math.imul(al4, bl1)) | 0;
    mid = (mid + Math.imul(al4, bh1)) | 0;
    mid = (mid + Math.imul(ah4, bl1)) | 0;
    hi = (hi + Math.imul(ah4, bh1)) | 0;
    lo = (lo + Math.imul(al3, bl2)) | 0;
    mid = (mid + Math.imul(al3, bh2)) | 0;
    mid = (mid + Math.imul(ah3, bl2)) | 0;
    hi = (hi + Math.imul(ah3, bh2)) | 0;
    lo = (lo + Math.imul(al2, bl3)) | 0;
    mid = (mid + Math.imul(al2, bh3)) | 0;
    mid = (mid + Math.imul(ah2, bl3)) | 0;
    hi = (hi + Math.imul(ah2, bh3)) | 0;
    lo = (lo + Math.imul(al1, bl4)) | 0;
    mid = (mid + Math.imul(al1, bh4)) | 0;
    mid = (mid + Math.imul(ah1, bl4)) | 0;
    hi = (hi + Math.imul(ah1, bh4)) | 0;
    lo = (lo + Math.imul(al0, bl5)) | 0;
    mid = (mid + Math.imul(al0, bh5)) | 0;
    mid = (mid + Math.imul(ah0, bl5)) | 0;
    hi = (hi + Math.imul(ah0, bh5)) | 0;
    var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
    w5 &= 0x3ffffff;
    /* k = 6 */
    lo = Math.imul(al6, bl0);
    mid = Math.imul(al6, bh0);
    mid = (mid + Math.imul(ah6, bl0)) | 0;
    hi = Math.imul(ah6, bh0);
    lo = (lo + Math.imul(al5, bl1)) | 0;
    mid = (mid + Math.imul(al5, bh1)) | 0;
    mid = (mid + Math.imul(ah5, bl1)) | 0;
    hi = (hi + Math.imul(ah5, bh1)) | 0;
    lo = (lo + Math.imul(al4, bl2)) | 0;
    mid = (mid + Math.imul(al4, bh2)) | 0;
    mid = (mid + Math.imul(ah4, bl2)) | 0;
    hi = (hi + Math.imul(ah4, bh2)) | 0;
    lo = (lo + Math.imul(al3, bl3)) | 0;
    mid = (mid + Math.imul(al3, bh3)) | 0;
    mid = (mid + Math.imul(ah3, bl3)) | 0;
    hi = (hi + Math.imul(ah3, bh3)) | 0;
    lo = (lo + Math.imul(al2, bl4)) | 0;
    mid = (mid + Math.imul(al2, bh4)) | 0;
    mid = (mid + Math.imul(ah2, bl4)) | 0;
    hi = (hi + Math.imul(ah2, bh4)) | 0;
    lo = (lo + Math.imul(al1, bl5)) | 0;
    mid = (mid + Math.imul(al1, bh5)) | 0;
    mid = (mid + Math.imul(ah1, bl5)) | 0;
    hi = (hi + Math.imul(ah1, bh5)) | 0;
    lo = (lo + Math.imul(al0, bl6)) | 0;
    mid = (mid + Math.imul(al0, bh6)) | 0;
    mid = (mid + Math.imul(ah0, bl6)) | 0;
    hi = (hi + Math.imul(ah0, bh6)) | 0;
    var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
    w6 &= 0x3ffffff;
    /* k = 7 */
    lo = Math.imul(al7, bl0);
    mid = Math.imul(al7, bh0);
    mid = (mid + Math.imul(ah7, bl0)) | 0;
    hi = Math.imul(ah7, bh0);
    lo = (lo + Math.imul(al6, bl1)) | 0;
    mid = (mid + Math.imul(al6, bh1)) | 0;
    mid = (mid + Math.imul(ah6, bl1)) | 0;
    hi = (hi + Math.imul(ah6, bh1)) | 0;
    lo = (lo + Math.imul(al5, bl2)) | 0;
    mid = (mid + Math.imul(al5, bh2)) | 0;
    mid = (mid + Math.imul(ah5, bl2)) | 0;
    hi = (hi + Math.imul(ah5, bh2)) | 0;
    lo = (lo + Math.imul(al4, bl3)) | 0;
    mid = (mid + Math.imul(al4, bh3)) | 0;
    mid = (mid + Math.imul(ah4, bl3)) | 0;
    hi = (hi + Math.imul(ah4, bh3)) | 0;
    lo = (lo + Math.imul(al3, bl4)) | 0;
    mid = (mid + Math.imul(al3, bh4)) | 0;
    mid = (mid + Math.imul(ah3, bl4)) | 0;
    hi = (hi + Math.imul(ah3, bh4)) | 0;
    lo = (lo + Math.imul(al2, bl5)) | 0;
    mid = (mid + Math.imul(al2, bh5)) | 0;
    mid = (mid + Math.imul(ah2, bl5)) | 0;
    hi = (hi + Math.imul(ah2, bh5)) | 0;
    lo = (lo + Math.imul(al1, bl6)) | 0;
    mid = (mid + Math.imul(al1, bh6)) | 0;
    mid = (mid + Math.imul(ah1, bl6)) | 0;
    hi = (hi + Math.imul(ah1, bh6)) | 0;
    lo = (lo + Math.imul(al0, bl7)) | 0;
    mid = (mid + Math.imul(al0, bh7)) | 0;
    mid = (mid + Math.imul(ah0, bl7)) | 0;
    hi = (hi + Math.imul(ah0, bh7)) | 0;
    var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
    w7 &= 0x3ffffff;
    /* k = 8 */
    lo = Math.imul(al8, bl0);
    mid = Math.imul(al8, bh0);
    mid = (mid + Math.imul(ah8, bl0)) | 0;
    hi = Math.imul(ah8, bh0);
    lo = (lo + Math.imul(al7, bl1)) | 0;
    mid = (mid + Math.imul(al7, bh1)) | 0;
    mid = (mid + Math.imul(ah7, bl1)) | 0;
    hi = (hi + Math.imul(ah7, bh1)) | 0;
    lo = (lo + Math.imul(al6, bl2)) | 0;
    mid = (mid + Math.imul(al6, bh2)) | 0;
    mid = (mid + Math.imul(ah6, bl2)) | 0;
    hi = (hi + Math.imul(ah6, bh2)) | 0;
    lo = (lo + Math.imul(al5, bl3)) | 0;
    mid = (mid + Math.imul(al5, bh3)) | 0;
    mid = (mid + Math.imul(ah5, bl3)) | 0;
    hi = (hi + Math.imul(ah5, bh3)) | 0;
    lo = (lo + Math.imul(al4, bl4)) | 0;
    mid = (mid + Math.imul(al4, bh4)) | 0;
    mid = (mid + Math.imul(ah4, bl4)) | 0;
    hi = (hi + Math.imul(ah4, bh4)) | 0;
    lo = (lo + Math.imul(al3, bl5)) | 0;
    mid = (mid + Math.imul(al3, bh5)) | 0;
    mid = (mid + Math.imul(ah3, bl5)) | 0;
    hi = (hi + Math.imul(ah3, bh5)) | 0;
    lo = (lo + Math.imul(al2, bl6)) | 0;
    mid = (mid + Math.imul(al2, bh6)) | 0;
    mid = (mid + Math.imul(ah2, bl6)) | 0;
    hi = (hi + Math.imul(ah2, bh6)) | 0;
    lo = (lo + Math.imul(al1, bl7)) | 0;
    mid = (mid + Math.imul(al1, bh7)) | 0;
    mid = (mid + Math.imul(ah1, bl7)) | 0;
    hi = (hi + Math.imul(ah1, bh7)) | 0;
    lo = (lo + Math.imul(al0, bl8)) | 0;
    mid = (mid + Math.imul(al0, bh8)) | 0;
    mid = (mid + Math.imul(ah0, bl8)) | 0;
    hi = (hi + Math.imul(ah0, bh8)) | 0;
    var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
    w8 &= 0x3ffffff;
    /* k = 9 */
    lo = Math.imul(al9, bl0);
    mid = Math.imul(al9, bh0);
    mid = (mid + Math.imul(ah9, bl0)) | 0;
    hi = Math.imul(ah9, bh0);
    lo = (lo + Math.imul(al8, bl1)) | 0;
    mid = (mid + Math.imul(al8, bh1)) | 0;
    mid = (mid + Math.imul(ah8, bl1)) | 0;
    hi = (hi + Math.imul(ah8, bh1)) | 0;
    lo = (lo + Math.imul(al7, bl2)) | 0;
    mid = (mid + Math.imul(al7, bh2)) | 0;
    mid = (mid + Math.imul(ah7, bl2)) | 0;
    hi = (hi + Math.imul(ah7, bh2)) | 0;
    lo = (lo + Math.imul(al6, bl3)) | 0;
    mid = (mid + Math.imul(al6, bh3)) | 0;
    mid = (mid + Math.imul(ah6, bl3)) | 0;
    hi = (hi + Math.imul(ah6, bh3)) | 0;
    lo = (lo + Math.imul(al5, bl4)) | 0;
    mid = (mid + Math.imul(al5, bh4)) | 0;
    mid = (mid + Math.imul(ah5, bl4)) | 0;
    hi = (hi + Math.imul(ah5, bh4)) | 0;
    lo = (lo + Math.imul(al4, bl5)) | 0;
    mid = (mid + Math.imul(al4, bh5)) | 0;
    mid = (mid + Math.imul(ah4, bl5)) | 0;
    hi = (hi + Math.imul(ah4, bh5)) | 0;
    lo = (lo + Math.imul(al3, bl6)) | 0;
    mid = (mid + Math.imul(al3, bh6)) | 0;
    mid = (mid + Math.imul(ah3, bl6)) | 0;
    hi = (hi + Math.imul(ah3, bh6)) | 0;
    lo = (lo + Math.imul(al2, bl7)) | 0;
    mid = (mid + Math.imul(al2, bh7)) | 0;
    mid = (mid + Math.imul(ah2, bl7)) | 0;
    hi = (hi + Math.imul(ah2, bh7)) | 0;
    lo = (lo + Math.imul(al1, bl8)) | 0;
    mid = (mid + Math.imul(al1, bh8)) | 0;
    mid = (mid + Math.imul(ah1, bl8)) | 0;
    hi = (hi + Math.imul(ah1, bh8)) | 0;
    lo = (lo + Math.imul(al0, bl9)) | 0;
    mid = (mid + Math.imul(al0, bh9)) | 0;
    mid = (mid + Math.imul(ah0, bl9)) | 0;
    hi = (hi + Math.imul(ah0, bh9)) | 0;
    var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
    w9 &= 0x3ffffff;
    /* k = 10 */
    lo = Math.imul(al9, bl1);
    mid = Math.imul(al9, bh1);
    mid = (mid + Math.imul(ah9, bl1)) | 0;
    hi = Math.imul(ah9, bh1);
    lo = (lo + Math.imul(al8, bl2)) | 0;
    mid = (mid + Math.imul(al8, bh2)) | 0;
    mid = (mid + Math.imul(ah8, bl2)) | 0;
    hi = (hi + Math.imul(ah8, bh2)) | 0;
    lo = (lo + Math.imul(al7, bl3)) | 0;
    mid = (mid + Math.imul(al7, bh3)) | 0;
    mid = (mid + Math.imul(ah7, bl3)) | 0;
    hi = (hi + Math.imul(ah7, bh3)) | 0;
    lo = (lo + Math.imul(al6, bl4)) | 0;
    mid = (mid + Math.imul(al6, bh4)) | 0;
    mid = (mid + Math.imul(ah6, bl4)) | 0;
    hi = (hi + Math.imul(ah6, bh4)) | 0;
    lo = (lo + Math.imul(al5, bl5)) | 0;
    mid = (mid + Math.imul(al5, bh5)) | 0;
    mid = (mid + Math.imul(ah5, bl5)) | 0;
    hi = (hi + Math.imul(ah5, bh5)) | 0;
    lo = (lo + Math.imul(al4, bl6)) | 0;
    mid = (mid + Math.imul(al4, bh6)) | 0;
    mid = (mid + Math.imul(ah4, bl6)) | 0;
    hi = (hi + Math.imul(ah4, bh6)) | 0;
    lo = (lo + Math.imul(al3, bl7)) | 0;
    mid = (mid + Math.imul(al3, bh7)) | 0;
    mid = (mid + Math.imul(ah3, bl7)) | 0;
    hi = (hi + Math.imul(ah3, bh7)) | 0;
    lo = (lo + Math.imul(al2, bl8)) | 0;
    mid = (mid + Math.imul(al2, bh8)) | 0;
    mid = (mid + Math.imul(ah2, bl8)) | 0;
    hi = (hi + Math.imul(ah2, bh8)) | 0;
    lo = (lo + Math.imul(al1, bl9)) | 0;
    mid = (mid + Math.imul(al1, bh9)) | 0;
    mid = (mid + Math.imul(ah1, bl9)) | 0;
    hi = (hi + Math.imul(ah1, bh9)) | 0;
    var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
    w10 &= 0x3ffffff;
    /* k = 11 */
    lo = Math.imul(al9, bl2);
    mid = Math.imul(al9, bh2);
    mid = (mid + Math.imul(ah9, bl2)) | 0;
    hi = Math.imul(ah9, bh2);
    lo = (lo + Math.imul(al8, bl3)) | 0;
    mid = (mid + Math.imul(al8, bh3)) | 0;
    mid = (mid + Math.imul(ah8, bl3)) | 0;
    hi = (hi + Math.imul(ah8, bh3)) | 0;
    lo = (lo + Math.imul(al7, bl4)) | 0;
    mid = (mid + Math.imul(al7, bh4)) | 0;
    mid = (mid + Math.imul(ah7, bl4)) | 0;
    hi = (hi + Math.imul(ah7, bh4)) | 0;
    lo = (lo + Math.imul(al6, bl5)) | 0;
    mid = (mid + Math.imul(al6, bh5)) | 0;
    mid = (mid + Math.imul(ah6, bl5)) | 0;
    hi = (hi + Math.imul(ah6, bh5)) | 0;
    lo = (lo + Math.imul(al5, bl6)) | 0;
    mid = (mid + Math.imul(al5, bh6)) | 0;
    mid = (mid + Math.imul(ah5, bl6)) | 0;
    hi = (hi + Math.imul(ah5, bh6)) | 0;
    lo = (lo + Math.imul(al4, bl7)) | 0;
    mid = (mid + Math.imul(al4, bh7)) | 0;
    mid = (mid + Math.imul(ah4, bl7)) | 0;
    hi = (hi + Math.imul(ah4, bh7)) | 0;
    lo = (lo + Math.imul(al3, bl8)) | 0;
    mid = (mid + Math.imul(al3, bh8)) | 0;
    mid = (mid + Math.imul(ah3, bl8)) | 0;
    hi = (hi + Math.imul(ah3, bh8)) | 0;
    lo = (lo + Math.imul(al2, bl9)) | 0;
    mid = (mid + Math.imul(al2, bh9)) | 0;
    mid = (mid + Math.imul(ah2, bl9)) | 0;
    hi = (hi + Math.imul(ah2, bh9)) | 0;
    var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
    w11 &= 0x3ffffff;
    /* k = 12 */
    lo = Math.imul(al9, bl3);
    mid = Math.imul(al9, bh3);
    mid = (mid + Math.imul(ah9, bl3)) | 0;
    hi = Math.imul(ah9, bh3);
    lo = (lo + Math.imul(al8, bl4)) | 0;
    mid = (mid + Math.imul(al8, bh4)) | 0;
    mid = (mid + Math.imul(ah8, bl4)) | 0;
    hi = (hi + Math.imul(ah8, bh4)) | 0;
    lo = (lo + Math.imul(al7, bl5)) | 0;
    mid = (mid + Math.imul(al7, bh5)) | 0;
    mid = (mid + Math.imul(ah7, bl5)) | 0;
    hi = (hi + Math.imul(ah7, bh5)) | 0;
    lo = (lo + Math.imul(al6, bl6)) | 0;
    mid = (mid + Math.imul(al6, bh6)) | 0;
    mid = (mid + Math.imul(ah6, bl6)) | 0;
    hi = (hi + Math.imul(ah6, bh6)) | 0;
    lo = (lo + Math.imul(al5, bl7)) | 0;
    mid = (mid + Math.imul(al5, bh7)) | 0;
    mid = (mid + Math.imul(ah5, bl7)) | 0;
    hi = (hi + Math.imul(ah5, bh7)) | 0;
    lo = (lo + Math.imul(al4, bl8)) | 0;
    mid = (mid + Math.imul(al4, bh8)) | 0;
    mid = (mid + Math.imul(ah4, bl8)) | 0;
    hi = (hi + Math.imul(ah4, bh8)) | 0;
    lo = (lo + Math.imul(al3, bl9)) | 0;
    mid = (mid + Math.imul(al3, bh9)) | 0;
    mid = (mid + Math.imul(ah3, bl9)) | 0;
    hi = (hi + Math.imul(ah3, bh9)) | 0;
    var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
    w12 &= 0x3ffffff;
    /* k = 13 */
    lo = Math.imul(al9, bl4);
    mid = Math.imul(al9, bh4);
    mid = (mid + Math.imul(ah9, bl4)) | 0;
    hi = Math.imul(ah9, bh4);
    lo = (lo + Math.imul(al8, bl5)) | 0;
    mid = (mid + Math.imul(al8, bh5)) | 0;
    mid = (mid + Math.imul(ah8, bl5)) | 0;
    hi = (hi + Math.imul(ah8, bh5)) | 0;
    lo = (lo + Math.imul(al7, bl6)) | 0;
    mid = (mid + Math.imul(al7, bh6)) | 0;
    mid = (mid + Math.imul(ah7, bl6)) | 0;
    hi = (hi + Math.imul(ah7, bh6)) | 0;
    lo = (lo + Math.imul(al6, bl7)) | 0;
    mid = (mid + Math.imul(al6, bh7)) | 0;
    mid = (mid + Math.imul(ah6, bl7)) | 0;
    hi = (hi + Math.imul(ah6, bh7)) | 0;
    lo = (lo + Math.imul(al5, bl8)) | 0;
    mid = (mid + Math.imul(al5, bh8)) | 0;
    mid = (mid + Math.imul(ah5, bl8)) | 0;
    hi = (hi + Math.imul(ah5, bh8)) | 0;
    lo = (lo + Math.imul(al4, bl9)) | 0;
    mid = (mid + Math.imul(al4, bh9)) | 0;
    mid = (mid + Math.imul(ah4, bl9)) | 0;
    hi = (hi + Math.imul(ah4, bh9)) | 0;
    var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
    w13 &= 0x3ffffff;
    /* k = 14 */
    lo = Math.imul(al9, bl5);
    mid = Math.imul(al9, bh5);
    mid = (mid + Math.imul(ah9, bl5)) | 0;
    hi = Math.imul(ah9, bh5);
    lo = (lo + Math.imul(al8, bl6)) | 0;
    mid = (mid + Math.imul(al8, bh6)) | 0;
    mid = (mid + Math.imul(ah8, bl6)) | 0;
    hi = (hi + Math.imul(ah8, bh6)) | 0;
    lo = (lo + Math.imul(al7, bl7)) | 0;
    mid = (mid + Math.imul(al7, bh7)) | 0;
    mid = (mid + Math.imul(ah7, bl7)) | 0;
    hi = (hi + Math.imul(ah7, bh7)) | 0;
    lo = (lo + Math.imul(al6, bl8)) | 0;
    mid = (mid + Math.imul(al6, bh8)) | 0;
    mid = (mid + Math.imul(ah6, bl8)) | 0;
    hi = (hi + Math.imul(ah6, bh8)) | 0;
    lo = (lo + Math.imul(al5, bl9)) | 0;
    mid = (mid + Math.imul(al5, bh9)) | 0;
    mid = (mid + Math.imul(ah5, bl9)) | 0;
    hi = (hi + Math.imul(ah5, bh9)) | 0;
    var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
    w14 &= 0x3ffffff;
    /* k = 15 */
    lo = Math.imul(al9, bl6);
    mid = Math.imul(al9, bh6);
    mid = (mid + Math.imul(ah9, bl6)) | 0;
    hi = Math.imul(ah9, bh6);
    lo = (lo + Math.imul(al8, bl7)) | 0;
    mid = (mid + Math.imul(al8, bh7)) | 0;
    mid = (mid + Math.imul(ah8, bl7)) | 0;
    hi = (hi + Math.imul(ah8, bh7)) | 0;
    lo = (lo + Math.imul(al7, bl8)) | 0;
    mid = (mid + Math.imul(al7, bh8)) | 0;
    mid = (mid + Math.imul(ah7, bl8)) | 0;
    hi = (hi + Math.imul(ah7, bh8)) | 0;
    lo = (lo + Math.imul(al6, bl9)) | 0;
    mid = (mid + Math.imul(al6, bh9)) | 0;
    mid = (mid + Math.imul(ah6, bl9)) | 0;
    hi = (hi + Math.imul(ah6, bh9)) | 0;
    var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
    w15 &= 0x3ffffff;
    /* k = 16 */
    lo = Math.imul(al9, bl7);
    mid = Math.imul(al9, bh7);
    mid = (mid + Math.imul(ah9, bl7)) | 0;
    hi = Math.imul(ah9, bh7);
    lo = (lo + Math.imul(al8, bl8)) | 0;
    mid = (mid + Math.imul(al8, bh8)) | 0;
    mid = (mid + Math.imul(ah8, bl8)) | 0;
    hi = (hi + Math.imul(ah8, bh8)) | 0;
    lo = (lo + Math.imul(al7, bl9)) | 0;
    mid = (mid + Math.imul(al7, bh9)) | 0;
    mid = (mid + Math.imul(ah7, bl9)) | 0;
    hi = (hi + Math.imul(ah7, bh9)) | 0;
    var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
    w16 &= 0x3ffffff;
    /* k = 17 */
    lo = Math.imul(al9, bl8);
    mid = Math.imul(al9, bh8);
    mid = (mid + Math.imul(ah9, bl8)) | 0;
    hi = Math.imul(ah9, bh8);
    lo = (lo + Math.imul(al8, bl9)) | 0;
    mid = (mid + Math.imul(al8, bh9)) | 0;
    mid = (mid + Math.imul(ah8, bl9)) | 0;
    hi = (hi + Math.imul(ah8, bh9)) | 0;
    var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
    w17 &= 0x3ffffff;
    /* k = 18 */
    lo = Math.imul(al9, bl9);
    mid = Math.imul(al9, bh9);
    mid = (mid + Math.imul(ah9, bl9)) | 0;
    hi = Math.imul(ah9, bh9);
    var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
    c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
    w18 &= 0x3ffffff;
    o[0] = w0;
    o[1] = w1;
    o[2] = w2;
    o[3] = w3;
    o[4] = w4;
    o[5] = w5;
    o[6] = w6;
    o[7] = w7;
    o[8] = w8;
    o[9] = w9;
    o[10] = w10;
    o[11] = w11;
    o[12] = w12;
    o[13] = w13;
    o[14] = w14;
    o[15] = w15;
    o[16] = w16;
    o[17] = w17;
    o[18] = w18;
    if (c !== 0) {
      o[19] = c;
      out.length++;
    }
    return out;
  };

  // Polyfill comb
  if (!Math.imul) {
    comb10MulTo = smallMulTo;
  }

  function bigMulTo (self, num, out) {
    out.negative = num.negative ^ self.negative;
    out.length = self.length + num.length;

    var carry = 0;
    var hncarry = 0;
    for (var k = 0; k < out.length - 1; k++) {
      // Sum all words with the same `i + j = k` and accumulate `ncarry`,
      // note that ncarry could be >= 0x3ffffff
      var ncarry = hncarry;
      hncarry = 0;
      var rword = carry & 0x3ffffff;
      var maxJ = Math.min(k, num.length - 1);
      for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
        var i = k - j;
        var a = self.words[i] | 0;
        var b = num.words[j] | 0;
        var r = a * b;

        var lo = r & 0x3ffffff;
        ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
        lo = (lo + rword) | 0;
        rword = lo & 0x3ffffff;
        ncarry = (ncarry + (lo >>> 26)) | 0;

        hncarry += ncarry >>> 26;
        ncarry &= 0x3ffffff;
      }
      out.words[k] = rword;
      carry = ncarry;
      ncarry = hncarry;
    }
    if (carry !== 0) {
      out.words[k] = carry;
    } else {
      out.length--;
    }

    return out.strip();
  }

  function jumboMulTo (self, num, out) {
    var fftm = new FFTM();
    return fftm.mulp(self, num, out);
  }

  BN.prototype.mulTo = function mulTo (num, out) {
    var res;
    var len = this.length + num.length;
    if (this.length === 10 && num.length === 10) {
      res = comb10MulTo(this, num, out);
    } else if (len < 63) {
      res = smallMulTo(this, num, out);
    } else if (len < 1024) {
      res = bigMulTo(this, num, out);
    } else {
      res = jumboMulTo(this, num, out);
    }

    return res;
  };

  // Cooley-Tukey algorithm for FFT
  // slightly revisited to rely on looping instead of recursion

  function FFTM (x, y) {
    this.x = x;
    this.y = y;
  }

  FFTM.prototype.makeRBT = function makeRBT (N) {
    var t = new Array(N);
    var l = BN.prototype._countBits(N) - 1;
    for (var i = 0; i < N; i++) {
      t[i] = this.revBin(i, l, N);
    }

    return t;
  };

  // Returns binary-reversed representation of `x`
  FFTM.prototype.revBin = function revBin (x, l, N) {
    if (x === 0 || x === N - 1) return x;

    var rb = 0;
    for (var i = 0; i < l; i++) {
      rb |= (x & 1) << (l - i - 1);
      x >>= 1;
    }

    return rb;
  };

  // Performs "tweedling" phase, therefore 'emulating'
  // behaviour of the recursive algorithm
  FFTM.prototype.permute = function permute (rbt, rws, iws, rtws, itws, N) {
    for (var i = 0; i < N; i++) {
      rtws[i] = rws[rbt[i]];
      itws[i] = iws[rbt[i]];
    }
  };

  FFTM.prototype.transform = function transform (rws, iws, rtws, itws, N, rbt) {
    this.permute(rbt, rws, iws, rtws, itws, N);

    for (var s = 1; s < N; s <<= 1) {
      var l = s << 1;

      var rtwdf = Math.cos(2 * Math.PI / l);
      var itwdf = Math.sin(2 * Math.PI / l);

      for (var p = 0; p < N; p += l) {
        var rtwdf_ = rtwdf;
        var itwdf_ = itwdf;

        for (var j = 0; j < s; j++) {
          var re = rtws[p + j];
          var ie = itws[p + j];

          var ro = rtws[p + j + s];
          var io = itws[p + j + s];

          var rx = rtwdf_ * ro - itwdf_ * io;

          io = rtwdf_ * io + itwdf_ * ro;
          ro = rx;

          rtws[p + j] = re + ro;
          itws[p + j] = ie + io;

          rtws[p + j + s] = re - ro;
          itws[p + j + s] = ie - io;

          /* jshint maxdepth : false */
          if (j !== l) {
            rx = rtwdf * rtwdf_ - itwdf * itwdf_;

            itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
            rtwdf_ = rx;
          }
        }
      }
    }
  };

  FFTM.prototype.guessLen13b = function guessLen13b (n, m) {
    var N = Math.max(m, n) | 1;
    var odd = N & 1;
    var i = 0;
    for (N = N / 2 | 0; N; N = N >>> 1) {
      i++;
    }

    return 1 << i + 1 + odd;
  };

  FFTM.prototype.conjugate = function conjugate (rws, iws, N) {
    if (N <= 1) return;

    for (var i = 0; i < N / 2; i++) {
      var t = rws[i];

      rws[i] = rws[N - i - 1];
      rws[N - i - 1] = t;

      t = iws[i];

      iws[i] = -iws[N - i - 1];
      iws[N - i - 1] = -t;
    }
  };

  FFTM.prototype.normalize13b = function normalize13b (ws, N) {
    var carry = 0;
    for (var i = 0; i < N / 2; i++) {
      var w = Math.round(ws[2 * i + 1] / N) * 0x2000 +
        Math.round(ws[2 * i] / N) +
        carry;

      ws[i] = w & 0x3ffffff;

      if (w < 0x4000000) {
        carry = 0;
      } else {
        carry = w / 0x4000000 | 0;
      }
    }

    return ws;
  };

  FFTM.prototype.convert13b = function convert13b (ws, len, rws, N) {
    var carry = 0;
    for (var i = 0; i < len; i++) {
      carry = carry + (ws[i] | 0);

      rws[2 * i] = carry & 0x1fff; carry = carry >>> 13;
      rws[2 * i + 1] = carry & 0x1fff; carry = carry >>> 13;
    }

    // Pad with zeroes
    for (i = 2 * len; i < N; ++i) {
      rws[i] = 0;
    }

    assert(carry === 0);
    assert((carry & ~0x1fff) === 0);
  };

  FFTM.prototype.stub = function stub (N) {
    var ph = new Array(N);
    for (var i = 0; i < N; i++) {
      ph[i] = 0;
    }

    return ph;
  };

  FFTM.prototype.mulp = function mulp (x, y, out) {
    var N = 2 * this.guessLen13b(x.length, y.length);

    var rbt = this.makeRBT(N);

    var _ = this.stub(N);

    var rws = new Array(N);
    var rwst = new Array(N);
    var iwst = new Array(N);

    var nrws = new Array(N);
    var nrwst = new Array(N);
    var niwst = new Array(N);

    var rmws = out.words;
    rmws.length = N;

    this.convert13b(x.words, x.length, rws, N);
    this.convert13b(y.words, y.length, nrws, N);

    this.transform(rws, _, rwst, iwst, N, rbt);
    this.transform(nrws, _, nrwst, niwst, N, rbt);

    for (var i = 0; i < N; i++) {
      var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
      iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
      rwst[i] = rx;
    }

    this.conjugate(rwst, iwst, N);
    this.transform(rwst, iwst, rmws, _, N, rbt);
    this.conjugate(rmws, _, N);
    this.normalize13b(rmws, N);

    out.negative = x.negative ^ y.negative;
    out.length = x.length + y.length;
    return out.strip();
  };

  // Multiply `this` by `num`
  BN.prototype.mul = function mul (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return this.mulTo(num, out);
  };

  // Multiply employing FFT
  BN.prototype.mulf = function mulf (num) {
    var out = new BN(null);
    out.words = new Array(this.length + num.length);
    return jumboMulTo(this, num, out);
  };

  // In-place Multiplication
  BN.prototype.imul = function imul (num) {
    return this.clone().mulTo(num, this);
  };

  BN.prototype.imuln = function imuln (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);

    // Carry
    var carry = 0;
    for (var i = 0; i < this.length; i++) {
      var w = (this.words[i] | 0) * num;
      var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
      carry >>= 26;
      carry += (w / 0x4000000) | 0;
      // NOTE: lo is 27bit maximum
      carry += lo >>> 26;
      this.words[i] = lo & 0x3ffffff;
    }

    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }

    return this;
  };

  BN.prototype.muln = function muln (num) {
    return this.clone().imuln(num);
  };

  // `this` * `this`
  BN.prototype.sqr = function sqr () {
    return this.mul(this);
  };

  // `this` * `this` in-place
  BN.prototype.isqr = function isqr () {
    return this.imul(this.clone());
  };

  // Math.pow(`this`, `num`)
  BN.prototype.pow = function pow (num) {
    var w = toBitArray(num);
    if (w.length === 0) return new BN(1);

    // Skip leading zeroes
    var res = this;
    for (var i = 0; i < w.length; i++, res = res.sqr()) {
      if (w[i] !== 0) break;
    }

    if (++i < w.length) {
      for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
        if (w[i] === 0) continue;

        res = res.mul(q);
      }
    }

    return res;
  };

  // Shift-left in-place
  BN.prototype.iushln = function iushln (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;
    var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
    var i;

    if (r !== 0) {
      var carry = 0;

      for (i = 0; i < this.length; i++) {
        var newCarry = this.words[i] & carryMask;
        var c = ((this.words[i] | 0) - newCarry) << r;
        this.words[i] = c | carry;
        carry = newCarry >>> (26 - r);
      }

      if (carry) {
        this.words[i] = carry;
        this.length++;
      }
    }

    if (s !== 0) {
      for (i = this.length - 1; i >= 0; i--) {
        this.words[i + s] = this.words[i];
      }

      for (i = 0; i < s; i++) {
        this.words[i] = 0;
      }

      this.length += s;
    }

    return this.strip();
  };

  BN.prototype.ishln = function ishln (bits) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushln(bits);
  };

  // Shift-right in-place
  // NOTE: `hint` is a lowest bit before trailing zeroes
  // NOTE: if `extended` is present - it will be filled with destroyed bits
  BN.prototype.iushrn = function iushrn (bits, hint, extended) {
    assert(typeof bits === 'number' && bits >= 0);
    var h;
    if (hint) {
      h = (hint - (hint % 26)) / 26;
    } else {
      h = 0;
    }

    var r = bits % 26;
    var s = Math.min((bits - r) / 26, this.length);
    var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
    var maskedWords = extended;

    h -= s;
    h = Math.max(0, h);

    // Extended mode, copy masked part
    if (maskedWords) {
      for (var i = 0; i < s; i++) {
        maskedWords.words[i] = this.words[i];
      }
      maskedWords.length = s;
    }

    if (s === 0) {
      // No-op, we should not move anything at all
    } else if (this.length > s) {
      this.length -= s;
      for (i = 0; i < this.length; i++) {
        this.words[i] = this.words[i + s];
      }
    } else {
      this.words[0] = 0;
      this.length = 1;
    }

    var carry = 0;
    for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
      var word = this.words[i] | 0;
      this.words[i] = (carry << (26 - r)) | (word >>> r);
      carry = word & mask;
    }

    // Push carried bits as a mask
    if (maskedWords && carry !== 0) {
      maskedWords.words[maskedWords.length++] = carry;
    }

    if (this.length === 0) {
      this.words[0] = 0;
      this.length = 1;
    }

    return this.strip();
  };

  BN.prototype.ishrn = function ishrn (bits, hint, extended) {
    // TODO(indutny): implement me
    assert(this.negative === 0);
    return this.iushrn(bits, hint, extended);
  };

  // Shift-left
  BN.prototype.shln = function shln (bits) {
    return this.clone().ishln(bits);
  };

  BN.prototype.ushln = function ushln (bits) {
    return this.clone().iushln(bits);
  };

  // Shift-right
  BN.prototype.shrn = function shrn (bits) {
    return this.clone().ishrn(bits);
  };

  BN.prototype.ushrn = function ushrn (bits) {
    return this.clone().iushrn(bits);
  };

  // Test if n bit is set
  BN.prototype.testn = function testn (bit) {
    assert(typeof bit === 'number' && bit >= 0);
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;

    // Fast case: bit is much higher than all existing words
    if (this.length <= s) return false;

    // Check bit and return
    var w = this.words[s];

    return !!(w & q);
  };

  // Return only lowers bits of number (in-place)
  BN.prototype.imaskn = function imaskn (bits) {
    assert(typeof bits === 'number' && bits >= 0);
    var r = bits % 26;
    var s = (bits - r) / 26;

    assert(this.negative === 0, 'imaskn works only with positive numbers');

    if (this.length <= s) {
      return this;
    }

    if (r !== 0) {
      s++;
    }
    this.length = Math.min(s, this.length);

    if (r !== 0) {
      var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
      this.words[this.length - 1] &= mask;
    }

    return this.strip();
  };

  // Return only lowers bits of number
  BN.prototype.maskn = function maskn (bits) {
    return this.clone().imaskn(bits);
  };

  // Add plain number `num` to `this`
  BN.prototype.iaddn = function iaddn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.isubn(-num);

    // Possible sign change
    if (this.negative !== 0) {
      if (this.length === 1 && (this.words[0] | 0) < num) {
        this.words[0] = num - (this.words[0] | 0);
        this.negative = 0;
        return this;
      }

      this.negative = 0;
      this.isubn(num);
      this.negative = 1;
      return this;
    }

    // Add without checks
    return this._iaddn(num);
  };

  BN.prototype._iaddn = function _iaddn (num) {
    this.words[0] += num;

    // Carry
    for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
      this.words[i] -= 0x4000000;
      if (i === this.length - 1) {
        this.words[i + 1] = 1;
      } else {
        this.words[i + 1]++;
      }
    }
    this.length = Math.max(this.length, i + 1);

    return this;
  };

  // Subtract plain number `num` from `this`
  BN.prototype.isubn = function isubn (num) {
    assert(typeof num === 'number');
    assert(num < 0x4000000);
    if (num < 0) return this.iaddn(-num);

    if (this.negative !== 0) {
      this.negative = 0;
      this.iaddn(num);
      this.negative = 1;
      return this;
    }

    this.words[0] -= num;

    if (this.length === 1 && this.words[0] < 0) {
      this.words[0] = -this.words[0];
      this.negative = 1;
    } else {
      // Carry
      for (var i = 0; i < this.length && this.words[i] < 0; i++) {
        this.words[i] += 0x4000000;
        this.words[i + 1] -= 1;
      }
    }

    return this.strip();
  };

  BN.prototype.addn = function addn (num) {
    return this.clone().iaddn(num);
  };

  BN.prototype.subn = function subn (num) {
    return this.clone().isubn(num);
  };

  BN.prototype.iabs = function iabs () {
    this.negative = 0;

    return this;
  };

  BN.prototype.abs = function abs () {
    return this.clone().iabs();
  };

  BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
    var len = num.length + shift;
    var i;

    this._expand(len);

    var w;
    var carry = 0;
    for (i = 0; i < num.length; i++) {
      w = (this.words[i + shift] | 0) + carry;
      var right = (num.words[i] | 0) * mul;
      w -= right & 0x3ffffff;
      carry = (w >> 26) - ((right / 0x4000000) | 0);
      this.words[i + shift] = w & 0x3ffffff;
    }
    for (; i < this.length - shift; i++) {
      w = (this.words[i + shift] | 0) + carry;
      carry = w >> 26;
      this.words[i + shift] = w & 0x3ffffff;
    }

    if (carry === 0) return this.strip();

    // Subtraction overflow
    assert(carry === -1);
    carry = 0;
    for (i = 0; i < this.length; i++) {
      w = -(this.words[i] | 0) + carry;
      carry = w >> 26;
      this.words[i] = w & 0x3ffffff;
    }
    this.negative = 1;

    return this.strip();
  };

  BN.prototype._wordDiv = function _wordDiv (num, mode) {
    var shift = this.length - num.length;

    var a = this.clone();
    var b = num;

    // Normalize
    var bhi = b.words[b.length - 1] | 0;
    var bhiBits = this._countBits(bhi);
    shift = 26 - bhiBits;
    if (shift !== 0) {
      b = b.ushln(shift);
      a.iushln(shift);
      bhi = b.words[b.length - 1] | 0;
    }

    // Initialize quotient
    var m = a.length - b.length;
    var q;

    if (mode !== 'mod') {
      q = new BN(null);
      q.length = m + 1;
      q.words = new Array(q.length);
      for (var i = 0; i < q.length; i++) {
        q.words[i] = 0;
      }
    }

    var diff = a.clone()._ishlnsubmul(b, 1, m);
    if (diff.negative === 0) {
      a = diff;
      if (q) {
        q.words[m] = 1;
      }
    }

    for (var j = m - 1; j >= 0; j--) {
      var qj = (a.words[b.length + j] | 0) * 0x4000000 +
        (a.words[b.length + j - 1] | 0);

      // NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000 max
      // (0x7ffffff)
      qj = Math.min((qj / bhi) | 0, 0x3ffffff);

      a._ishlnsubmul(b, qj, j);
      while (a.negative !== 0) {
        qj--;
        a.negative = 0;
        a._ishlnsubmul(b, 1, j);
        if (!a.isZero()) {
          a.negative ^= 1;
        }
      }
      if (q) {
        q.words[j] = qj;
      }
    }
    if (q) {
      q.strip();
    }
    a.strip();

    // Denormalize
    if (mode !== 'div' && shift !== 0) {
      a.iushrn(shift);
    }

    return {
      div: q || null,
      mod: a
    };
  };

  // NOTE: 1) `mode` can be set to `mod` to request mod only,
  //       to `div` to request div only, or be absent to
  //       request both div & mod
  //       2) `positive` is true if unsigned mod is requested
  BN.prototype.divmod = function divmod (num, mode, positive) {
    assert(!num.isZero());

    if (this.isZero()) {
      return {
        div: new BN(0),
        mod: new BN(0)
      };
    }

    var div, mod, res;
    if (this.negative !== 0 && num.negative === 0) {
      res = this.neg().divmod(num, mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.iadd(num);
        }
      }

      return {
        div: div,
        mod: mod
      };
    }

    if (this.negative === 0 && num.negative !== 0) {
      res = this.divmod(num.neg(), mode);

      if (mode !== 'mod') {
        div = res.div.neg();
      }

      return {
        div: div,
        mod: res.mod
      };
    }

    if ((this.negative & num.negative) !== 0) {
      res = this.neg().divmod(num.neg(), mode);

      if (mode !== 'div') {
        mod = res.mod.neg();
        if (positive && mod.negative !== 0) {
          mod.isub(num);
        }
      }

      return {
        div: res.div,
        mod: mod
      };
    }

    // Both numbers are positive at this point

    // Strip both numbers to approximate shift value
    if (num.length > this.length || this.cmp(num) < 0) {
      return {
        div: new BN(0),
        mod: this
      };
    }

    // Very short reduction
    if (num.length === 1) {
      if (mode === 'div') {
        return {
          div: this.divn(num.words[0]),
          mod: null
        };
      }

      if (mode === 'mod') {
        return {
          div: null,
          mod: new BN(this.modn(num.words[0]))
        };
      }

      return {
        div: this.divn(num.words[0]),
        mod: new BN(this.modn(num.words[0]))
      };
    }

    return this._wordDiv(num, mode);
  };

  // Find `this` / `num`
  BN.prototype.div = function div (num) {
    return this.divmod(num, 'div', false).div;
  };

  // Find `this` % `num`
  BN.prototype.mod = function mod (num) {
    return this.divmod(num, 'mod', false).mod;
  };

  BN.prototype.umod = function umod (num) {
    return this.divmod(num, 'mod', true).mod;
  };

  // Find Round(`this` / `num`)
  BN.prototype.divRound = function divRound (num) {
    var dm = this.divmod(num);

    // Fast case - exact division
    if (dm.mod.isZero()) return dm.div;

    var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;

    var half = num.ushrn(1);
    var r2 = num.andln(1);
    var cmp = mod.cmp(half);

    // Round down
    if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;

    // Round up
    return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
  };

  BN.prototype.modn = function modn (num) {
    assert(num <= 0x3ffffff);
    var p = (1 << 26) % num;

    var acc = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      acc = (p * acc + (this.words[i] | 0)) % num;
    }

    return acc;
  };

  // In-place division by number
  BN.prototype.idivn = function idivn (num) {
    assert(num <= 0x3ffffff);

    var carry = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var w = (this.words[i] | 0) + carry * 0x4000000;
      this.words[i] = (w / num) | 0;
      carry = w % num;
    }

    return this.strip();
  };

  BN.prototype.divn = function divn (num) {
    return this.clone().idivn(num);
  };

  BN.prototype.egcd = function egcd (p) {
    assert(p.negative === 0);
    assert(!p.isZero());

    var x = this;
    var y = p.clone();

    if (x.negative !== 0) {
      x = x.umod(p);
    } else {
      x = x.clone();
    }

    // A * x + B * y = x
    var A = new BN(1);
    var B = new BN(0);

    // C * x + D * y = y
    var C = new BN(0);
    var D = new BN(1);

    var g = 0;

    while (x.isEven() && y.isEven()) {
      x.iushrn(1);
      y.iushrn(1);
      ++g;
    }

    var yp = y.clone();
    var xp = x.clone();

    while (!x.isZero()) {
      for (var i = 0, im = 1; (x.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        x.iushrn(i);
        while (i-- > 0) {
          if (A.isOdd() || B.isOdd()) {
            A.iadd(yp);
            B.isub(xp);
          }

          A.iushrn(1);
          B.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (y.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        y.iushrn(j);
        while (j-- > 0) {
          if (C.isOdd() || D.isOdd()) {
            C.iadd(yp);
            D.isub(xp);
          }

          C.iushrn(1);
          D.iushrn(1);
        }
      }

      if (x.cmp(y) >= 0) {
        x.isub(y);
        A.isub(C);
        B.isub(D);
      } else {
        y.isub(x);
        C.isub(A);
        D.isub(B);
      }
    }

    return {
      a: C,
      b: D,
      gcd: y.iushln(g)
    };
  };

  // This is reduced incarnation of the binary EEA
  // above, designated to invert members of the
  // _prime_ fields F(p) at a maximal speed
  BN.prototype._invmp = function _invmp (p) {
    assert(p.negative === 0);
    assert(!p.isZero());

    var a = this;
    var b = p.clone();

    if (a.negative !== 0) {
      a = a.umod(p);
    } else {
      a = a.clone();
    }

    var x1 = new BN(1);
    var x2 = new BN(0);

    var delta = b.clone();

    while (a.cmpn(1) > 0 && b.cmpn(1) > 0) {
      for (var i = 0, im = 1; (a.words[0] & im) === 0 && i < 26; ++i, im <<= 1);
      if (i > 0) {
        a.iushrn(i);
        while (i-- > 0) {
          if (x1.isOdd()) {
            x1.iadd(delta);
          }

          x1.iushrn(1);
        }
      }

      for (var j = 0, jm = 1; (b.words[0] & jm) === 0 && j < 26; ++j, jm <<= 1);
      if (j > 0) {
        b.iushrn(j);
        while (j-- > 0) {
          if (x2.isOdd()) {
            x2.iadd(delta);
          }

          x2.iushrn(1);
        }
      }

      if (a.cmp(b) >= 0) {
        a.isub(b);
        x1.isub(x2);
      } else {
        b.isub(a);
        x2.isub(x1);
      }
    }

    var res;
    if (a.cmpn(1) === 0) {
      res = x1;
    } else {
      res = x2;
    }

    if (res.cmpn(0) < 0) {
      res.iadd(p);
    }

    return res;
  };

  BN.prototype.gcd = function gcd (num) {
    if (this.isZero()) return num.abs();
    if (num.isZero()) return this.abs();

    var a = this.clone();
    var b = num.clone();
    a.negative = 0;
    b.negative = 0;

    // Remove common factor of two
    for (var shift = 0; a.isEven() && b.isEven(); shift++) {
      a.iushrn(1);
      b.iushrn(1);
    }

    do {
      while (a.isEven()) {
        a.iushrn(1);
      }
      while (b.isEven()) {
        b.iushrn(1);
      }

      var r = a.cmp(b);
      if (r < 0) {
        // Swap `a` and `b` to make `a` always bigger than `b`
        var t = a;
        a = b;
        b = t;
      } else if (r === 0 || b.cmpn(1) === 0) {
        break;
      }

      a.isub(b);
    } while (true);

    return b.iushln(shift);
  };

  // Invert number in the field F(num)
  BN.prototype.invm = function invm (num) {
    return this.egcd(num).a.umod(num);
  };

  BN.prototype.isEven = function isEven () {
    return (this.words[0] & 1) === 0;
  };

  BN.prototype.isOdd = function isOdd () {
    return (this.words[0] & 1) === 1;
  };

  // And first word and num
  BN.prototype.andln = function andln (num) {
    return this.words[0] & num;
  };

  // Increment at the bit position in-line
  BN.prototype.bincn = function bincn (bit) {
    assert(typeof bit === 'number');
    var r = bit % 26;
    var s = (bit - r) / 26;
    var q = 1 << r;

    // Fast case: bit is much higher than all existing words
    if (this.length <= s) {
      this._expand(s + 1);
      this.words[s] |= q;
      return this;
    }

    // Add bit and propagate, if needed
    var carry = q;
    for (var i = s; carry !== 0 && i < this.length; i++) {
      var w = this.words[i] | 0;
      w += carry;
      carry = w >>> 26;
      w &= 0x3ffffff;
      this.words[i] = w;
    }
    if (carry !== 0) {
      this.words[i] = carry;
      this.length++;
    }
    return this;
  };

  BN.prototype.isZero = function isZero () {
    return this.length === 1 && this.words[0] === 0;
  };

  BN.prototype.cmpn = function cmpn (num) {
    var negative = num < 0;

    if (this.negative !== 0 && !negative) return -1;
    if (this.negative === 0 && negative) return 1;

    this.strip();

    var res;
    if (this.length > 1) {
      res = 1;
    } else {
      if (negative) {
        num = -num;
      }

      assert(num <= 0x3ffffff, 'Number is too big');

      var w = this.words[0] | 0;
      res = w === num ? 0 : w < num ? -1 : 1;
    }
    if (this.negative !== 0) return -res | 0;
    return res;
  };

  // Compare two numbers and return:
  // 1 - if `this` > `num`
  // 0 - if `this` == `num`
  // -1 - if `this` < `num`
  BN.prototype.cmp = function cmp (num) {
    if (this.negative !== 0 && num.negative === 0) return -1;
    if (this.negative === 0 && num.negative !== 0) return 1;

    var res = this.ucmp(num);
    if (this.negative !== 0) return -res | 0;
    return res;
  };

  // Unsigned comparison
  BN.prototype.ucmp = function ucmp (num) {
    // At this point both numbers have the same sign
    if (this.length > num.length) return 1;
    if (this.length < num.length) return -1;

    var res = 0;
    for (var i = this.length - 1; i >= 0; i--) {
      var a = this.words[i] | 0;
      var b = num.words[i] | 0;

      if (a === b) continue;
      if (a < b) {
        res = -1;
      } else if (a > b) {
        res = 1;
      }
      break;
    }
    return res;
  };

  BN.prototype.gtn = function gtn (num) {
    return this.cmpn(num) === 1;
  };

  BN.prototype.gt = function gt (num) {
    return this.cmp(num) === 1;
  };

  BN.prototype.gten = function gten (num) {
    return this.cmpn(num) >= 0;
  };

  BN.prototype.gte = function gte (num) {
    return this.cmp(num) >= 0;
  };

  BN.prototype.ltn = function ltn (num) {
    return this.cmpn(num) === -1;
  };

  BN.prototype.lt = function lt (num) {
    return this.cmp(num) === -1;
  };

  BN.prototype.lten = function lten (num) {
    return this.cmpn(num) <= 0;
  };

  BN.prototype.lte = function lte (num) {
    return this.cmp(num) <= 0;
  };

  BN.prototype.eqn = function eqn (num) {
    return this.cmpn(num) === 0;
  };

  BN.prototype.eq = function eq (num) {
    return this.cmp(num) === 0;
  };

  //
  // A reduce context, could be using montgomery or something better, depending
  // on the `m` itself.
  //
  BN.red = function red (num) {
    return new Red(num);
  };

  BN.prototype.toRed = function toRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    assert(this.negative === 0, 'red works only with positives');
    return ctx.convertTo(this)._forceRed(ctx);
  };

  BN.prototype.fromRed = function fromRed () {
    assert(this.red, 'fromRed works only with numbers in reduction context');
    return this.red.convertFrom(this);
  };

  BN.prototype._forceRed = function _forceRed (ctx) {
    this.red = ctx;
    return this;
  };

  BN.prototype.forceRed = function forceRed (ctx) {
    assert(!this.red, 'Already a number in reduction context');
    return this._forceRed(ctx);
  };

  BN.prototype.redAdd = function redAdd (num) {
    assert(this.red, 'redAdd works only with red numbers');
    return this.red.add(this, num);
  };

  BN.prototype.redIAdd = function redIAdd (num) {
    assert(this.red, 'redIAdd works only with red numbers');
    return this.red.iadd(this, num);
  };

  BN.prototype.redSub = function redSub (num) {
    assert(this.red, 'redSub works only with red numbers');
    return this.red.sub(this, num);
  };

  BN.prototype.redISub = function redISub (num) {
    assert(this.red, 'redISub works only with red numbers');
    return this.red.isub(this, num);
  };

  BN.prototype.redShl = function redShl (num) {
    assert(this.red, 'redShl works only with red numbers');
    return this.red.shl(this, num);
  };

  BN.prototype.redMul = function redMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.mul(this, num);
  };

  BN.prototype.redIMul = function redIMul (num) {
    assert(this.red, 'redMul works only with red numbers');
    this.red._verify2(this, num);
    return this.red.imul(this, num);
  };

  BN.prototype.redSqr = function redSqr () {
    assert(this.red, 'redSqr works only with red numbers');
    this.red._verify1(this);
    return this.red.sqr(this);
  };

  BN.prototype.redISqr = function redISqr () {
    assert(this.red, 'redISqr works only with red numbers');
    this.red._verify1(this);
    return this.red.isqr(this);
  };

  // Square root over p
  BN.prototype.redSqrt = function redSqrt () {
    assert(this.red, 'redSqrt works only with red numbers');
    this.red._verify1(this);
    return this.red.sqrt(this);
  };

  BN.prototype.redInvm = function redInvm () {
    assert(this.red, 'redInvm works only with red numbers');
    this.red._verify1(this);
    return this.red.invm(this);
  };

  // Return negative clone of `this` % `red modulo`
  BN.prototype.redNeg = function redNeg () {
    assert(this.red, 'redNeg works only with red numbers');
    this.red._verify1(this);
    return this.red.neg(this);
  };

  BN.prototype.redPow = function redPow (num) {
    assert(this.red && !num.red, 'redPow(normalNum)');
    this.red._verify1(this);
    return this.red.pow(this, num);
  };

  // Prime numbers with efficient reduction
  var primes = {
    k256: null,
    p224: null,
    p192: null,
    p25519: null
  };

  // Pseudo-Mersenne prime
  function MPrime (name, p) {
    // P = 2 ^ N - K
    this.name = name;
    this.p = new BN(p, 16);
    this.n = this.p.bitLength();
    this.k = new BN(1).iushln(this.n).isub(this.p);

    this.tmp = this._tmp();
  }

  MPrime.prototype._tmp = function _tmp () {
    var tmp = new BN(null);
    tmp.words = new Array(Math.ceil(this.n / 13));
    return tmp;
  };

  MPrime.prototype.ireduce = function ireduce (num) {
    // Assumes that `num` is less than `P^2`
    // num = HI * (2 ^ N - K) + HI * K + LO = HI * K + LO (mod P)
    var r = num;
    var rlen;

    do {
      this.split(r, this.tmp);
      r = this.imulK(r);
      r = r.iadd(this.tmp);
      rlen = r.bitLength();
    } while (rlen > this.n);

    var cmp = rlen < this.n ? -1 : r.ucmp(this.p);
    if (cmp === 0) {
      r.words[0] = 0;
      r.length = 1;
    } else if (cmp > 0) {
      r.isub(this.p);
    } else {
      r.strip();
    }

    return r;
  };

  MPrime.prototype.split = function split (input, out) {
    input.iushrn(this.n, 0, out);
  };

  MPrime.prototype.imulK = function imulK (num) {
    return num.imul(this.k);
  };

  function K256 () {
    MPrime.call(
      this,
      'k256',
      'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f');
  }
  inherits(K256, MPrime);

  K256.prototype.split = function split (input, output) {
    // 256 = 9 * 26 + 22
    var mask = 0x3fffff;

    var outLen = Math.min(input.length, 9);
    for (var i = 0; i < outLen; i++) {
      output.words[i] = input.words[i];
    }
    output.length = outLen;

    if (input.length <= 9) {
      input.words[0] = 0;
      input.length = 1;
      return;
    }

    // Shift by 9 limbs
    var prev = input.words[9];
    output.words[output.length++] = prev & mask;

    for (i = 10; i < input.length; i++) {
      var next = input.words[i] | 0;
      input.words[i - 10] = ((next & mask) << 4) | (prev >>> 22);
      prev = next;
    }
    prev >>>= 22;
    input.words[i - 10] = prev;
    if (prev === 0 && input.length > 10) {
      input.length -= 10;
    } else {
      input.length -= 9;
    }
  };

  K256.prototype.imulK = function imulK (num) {
    // K = 0x1000003d1 = [ 0x40, 0x3d1 ]
    num.words[num.length] = 0;
    num.words[num.length + 1] = 0;
    num.length += 2;

    // bounded at: 0x40 * 0x3ffffff + 0x3d0 = 0x100000390
    var lo = 0;
    for (var i = 0; i < num.length; i++) {
      var w = num.words[i] | 0;
      lo += w * 0x3d1;
      num.words[i] = lo & 0x3ffffff;
      lo = w * 0x40 + ((lo / 0x4000000) | 0);
    }

    // Fast length reduction
    if (num.words[num.length - 1] === 0) {
      num.length--;
      if (num.words[num.length - 1] === 0) {
        num.length--;
      }
    }
    return num;
  };

  function P224 () {
    MPrime.call(
      this,
      'p224',
      'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001');
  }
  inherits(P224, MPrime);

  function P192 () {
    MPrime.call(
      this,
      'p192',
      'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff');
  }
  inherits(P192, MPrime);

  function P25519 () {
    // 2 ^ 255 - 19
    MPrime.call(
      this,
      '25519',
      '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed');
  }
  inherits(P25519, MPrime);

  P25519.prototype.imulK = function imulK (num) {
    // K = 0x13
    var carry = 0;
    for (var i = 0; i < num.length; i++) {
      var hi = (num.words[i] | 0) * 0x13 + carry;
      var lo = hi & 0x3ffffff;
      hi >>>= 26;

      num.words[i] = lo;
      carry = hi;
    }
    if (carry !== 0) {
      num.words[num.length++] = carry;
    }
    return num;
  };

  // Exported mostly for testing purposes, use plain name instead
  BN._prime = function prime (name) {
    // Cached version of prime
    if (primes[name]) return primes[name];

    var prime;
    if (name === 'k256') {
      prime = new K256();
    } else if (name === 'p224') {
      prime = new P224();
    } else if (name === 'p192') {
      prime = new P192();
    } else if (name === 'p25519') {
      prime = new P25519();
    } else {
      throw new Error('Unknown prime ' + name);
    }
    primes[name] = prime;

    return prime;
  };

  //
  // Base reduction engine
  //
  function Red (m) {
    if (typeof m === 'string') {
      var prime = BN._prime(m);
      this.m = prime.p;
      this.prime = prime;
    } else {
      assert(m.gtn(1), 'modulus must be greater than 1');
      this.m = m;
      this.prime = null;
    }
  }

  Red.prototype._verify1 = function _verify1 (a) {
    assert(a.negative === 0, 'red works only with positives');
    assert(a.red, 'red works only with red numbers');
  };

  Red.prototype._verify2 = function _verify2 (a, b) {
    assert((a.negative | b.negative) === 0, 'red works only with positives');
    assert(a.red && a.red === b.red,
      'red works only with red numbers');
  };

  Red.prototype.imod = function imod (a) {
    if (this.prime) return this.prime.ireduce(a)._forceRed(this);
    return a.umod(this.m)._forceRed(this);
  };

  Red.prototype.neg = function neg (a) {
    if (a.isZero()) {
      return a.clone();
    }

    return this.m.sub(a)._forceRed(this);
  };

  Red.prototype.add = function add (a, b) {
    this._verify2(a, b);

    var res = a.add(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res._forceRed(this);
  };

  Red.prototype.iadd = function iadd (a, b) {
    this._verify2(a, b);

    var res = a.iadd(b);
    if (res.cmp(this.m) >= 0) {
      res.isub(this.m);
    }
    return res;
  };

  Red.prototype.sub = function sub (a, b) {
    this._verify2(a, b);

    var res = a.sub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res._forceRed(this);
  };

  Red.prototype.isub = function isub (a, b) {
    this._verify2(a, b);

    var res = a.isub(b);
    if (res.cmpn(0) < 0) {
      res.iadd(this.m);
    }
    return res;
  };

  Red.prototype.shl = function shl (a, num) {
    this._verify1(a);
    return this.imod(a.ushln(num));
  };

  Red.prototype.imul = function imul (a, b) {
    this._verify2(a, b);
    return this.imod(a.imul(b));
  };

  Red.prototype.mul = function mul (a, b) {
    this._verify2(a, b);
    return this.imod(a.mul(b));
  };

  Red.prototype.isqr = function isqr (a) {
    return this.imul(a, a.clone());
  };

  Red.prototype.sqr = function sqr (a) {
    return this.mul(a, a);
  };

  Red.prototype.sqrt = function sqrt (a) {
    if (a.isZero()) return a.clone();

    var mod3 = this.m.andln(3);
    assert(mod3 % 2 === 1);

    // Fast case
    if (mod3 === 3) {
      var pow = this.m.add(new BN(1)).iushrn(2);
      return this.pow(a, pow);
    }

    // Tonelli-Shanks algorithm (Totally unoptimized and slow)
    //
    // Find Q and S, that Q * 2 ^ S = (P - 1)
    var q = this.m.subn(1);
    var s = 0;
    while (!q.isZero() && q.andln(1) === 0) {
      s++;
      q.iushrn(1);
    }
    assert(!q.isZero());

    var one = new BN(1).toRed(this);
    var nOne = one.redNeg();

    // Find quadratic non-residue
    // NOTE: Max is such because of generalized Riemann hypothesis.
    var lpow = this.m.subn(1).iushrn(1);
    var z = this.m.bitLength();
    z = new BN(2 * z * z).toRed(this);

    while (this.pow(z, lpow).cmp(nOne) !== 0) {
      z.redIAdd(nOne);
    }

    var c = this.pow(z, q);
    var r = this.pow(a, q.addn(1).iushrn(1));
    var t = this.pow(a, q);
    var m = s;
    while (t.cmp(one) !== 0) {
      var tmp = t;
      for (var i = 0; tmp.cmp(one) !== 0; i++) {
        tmp = tmp.redSqr();
      }
      assert(i < m);
      var b = this.pow(c, new BN(1).iushln(m - i - 1));

      r = r.redMul(b);
      c = b.redSqr();
      t = t.redMul(c);
      m = i;
    }

    return r;
  };

  Red.prototype.invm = function invm (a) {
    var inv = a._invmp(this.m);
    if (inv.negative !== 0) {
      inv.negative = 0;
      return this.imod(inv).redNeg();
    } else {
      return this.imod(inv);
    }
  };

  Red.prototype.pow = function pow (a, num) {
    if (num.isZero()) return new BN(1).toRed(this);
    if (num.cmpn(1) === 0) return a.clone();

    var windowSize = 4;
    var wnd = new Array(1 << windowSize);
    wnd[0] = new BN(1).toRed(this);
    wnd[1] = a;
    for (var i = 2; i < wnd.length; i++) {
      wnd[i] = this.mul(wnd[i - 1], a);
    }

    var res = wnd[0];
    var current = 0;
    var currentLen = 0;
    var start = num.bitLength() % 26;
    if (start === 0) {
      start = 26;
    }

    for (i = num.length - 1; i >= 0; i--) {
      var word = num.words[i];
      for (var j = start - 1; j >= 0; j--) {
        var bit = (word >> j) & 1;
        if (res !== wnd[0]) {
          res = this.sqr(res);
        }

        if (bit === 0 && current === 0) {
          currentLen = 0;
          continue;
        }

        current <<= 1;
        current |= bit;
        currentLen++;
        if (currentLen !== windowSize && (i !== 0 || j !== 0)) continue;

        res = this.mul(res, wnd[current]);
        currentLen = 0;
        current = 0;
      }
      start = 26;
    }

    return res;
  };

  Red.prototype.convertTo = function convertTo (num) {
    var r = num.umod(this.m);

    return r === num ? r.clone() : r;
  };

  Red.prototype.convertFrom = function convertFrom (num) {
    var res = num.clone();
    res.red = null;
    return res;
  };

  //
  // Montgomery method engine
  //

  BN.mont = function mont (num) {
    return new Mont(num);
  };

  function Mont (m) {
    Red.call(this, m);

    this.shift = this.m.bitLength();
    if (this.shift % 26 !== 0) {
      this.shift += 26 - (this.shift % 26);
    }

    this.r = new BN(1).iushln(this.shift);
    this.r2 = this.imod(this.r.sqr());
    this.rinv = this.r._invmp(this.m);

    this.minv = this.rinv.mul(this.r).isubn(1).div(this.m);
    this.minv = this.minv.umod(this.r);
    this.minv = this.r.sub(this.minv);
  }
  inherits(Mont, Red);

  Mont.prototype.convertTo = function convertTo (num) {
    return this.imod(num.ushln(this.shift));
  };

  Mont.prototype.convertFrom = function convertFrom (num) {
    var r = this.imod(num.mul(this.rinv));
    r.red = null;
    return r;
  };

  Mont.prototype.imul = function imul (a, b) {
    if (a.isZero() || b.isZero()) {
      a.words[0] = 0;
      a.length = 1;
      return a;
    }

    var t = a.imul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;

    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.mul = function mul (a, b) {
    if (a.isZero() || b.isZero()) return new BN(0)._forceRed(this);

    var t = a.mul(b);
    var c = t.maskn(this.shift).mul(this.minv).imaskn(this.shift).mul(this.m);
    var u = t.isub(c).iushrn(this.shift);
    var res = u;
    if (u.cmp(this.m) >= 0) {
      res = u.isub(this.m);
    } else if (u.cmpn(0) < 0) {
      res = u.iadd(this.m);
    }

    return res._forceRed(this);
  };

  Mont.prototype.invm = function invm (a) {
    // (AR)^-1 * R^2 = (A^-1 * R^-1) * R^2 = A^-1 * R
    var res = this.imod(a._invmp(this.m).mul(this.r2));
    return res._forceRed(this);
  };
})(typeof module === 'undefined' || module, this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(111)(module)))

/***/ }),

/***/ 516:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),

/***/ 517:
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ 538:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var elliptic = exports;

elliptic.version = __webpack_require__(2086).version;
elliptic.utils = __webpack_require__(2087);
elliptic.rand = __webpack_require__(1965);
elliptic.curve = __webpack_require__(783);
elliptic.curves = __webpack_require__(2092);

// Protocols
elliptic.ec = __webpack_require__(2100);
elliptic.eddsa = __webpack_require__(2104);


/***/ }),

/***/ 563:
/***/ (function(module, exports) {

module.exports = assert;

function assert(val, msg) {
  if (!val)
    throw new Error(msg || 'Assertion failed');
}

assert.equal = function assertEqual(l, r, msg) {
  if (l != r)
    throw new Error(msg || ('Assertion failed: ' + l + ' != ' + r));
};


/***/ }),

/***/ 588:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var assert = __webpack_require__(563);
var inherits = __webpack_require__(485);

exports.inherits = inherits;

function toArray(msg, enc) {
  if (Array.isArray(msg))
    return msg.slice();
  if (!msg)
    return [];
  var res = [];
  if (typeof msg === 'string') {
    if (!enc) {
      for (var i = 0; i < msg.length; i++) {
        var c = msg.charCodeAt(i);
        var hi = c >> 8;
        var lo = c & 0xff;
        if (hi)
          res.push(hi, lo);
        else
          res.push(lo);
      }
    } else if (enc === 'hex') {
      msg = msg.replace(/[^a-z0-9]+/ig, '');
      if (msg.length % 2 !== 0)
        msg = '0' + msg;
      for (i = 0; i < msg.length; i += 2)
        res.push(parseInt(msg[i] + msg[i + 1], 16));
    }
  } else {
    for (i = 0; i < msg.length; i++)
      res[i] = msg[i] | 0;
  }
  return res;
}
exports.toArray = toArray;

function toHex(msg) {
  var res = '';
  for (var i = 0; i < msg.length; i++)
    res += zero2(msg[i].toString(16));
  return res;
}
exports.toHex = toHex;

function htonl(w) {
  var res = (w >>> 24) |
            ((w >>> 8) & 0xff00) |
            ((w << 8) & 0xff0000) |
            ((w & 0xff) << 24);
  return res >>> 0;
}
exports.htonl = htonl;

function toHex32(msg, endian) {
  var res = '';
  for (var i = 0; i < msg.length; i++) {
    var w = msg[i];
    if (endian === 'little')
      w = htonl(w);
    res += zero8(w.toString(16));
  }
  return res;
}
exports.toHex32 = toHex32;

function zero2(word) {
  if (word.length === 1)
    return '0' + word;
  else
    return word;
}
exports.zero2 = zero2;

function zero8(word) {
  if (word.length === 7)
    return '0' + word;
  else if (word.length === 6)
    return '00' + word;
  else if (word.length === 5)
    return '000' + word;
  else if (word.length === 4)
    return '0000' + word;
  else if (word.length === 3)
    return '00000' + word;
  else if (word.length === 2)
    return '000000' + word;
  else if (word.length === 1)
    return '0000000' + word;
  else
    return word;
}
exports.zero8 = zero8;

function join32(msg, start, end, endian) {
  var len = end - start;
  assert(len % 4 === 0);
  var res = new Array(len / 4);
  for (var i = 0, k = start; i < res.length; i++, k += 4) {
    var w;
    if (endian === 'big')
      w = (msg[k] << 24) | (msg[k + 1] << 16) | (msg[k + 2] << 8) | msg[k + 3];
    else
      w = (msg[k + 3] << 24) | (msg[k + 2] << 16) | (msg[k + 1] << 8) | msg[k];
    res[i] = w >>> 0;
  }
  return res;
}
exports.join32 = join32;

function split32(msg, endian) {
  var res = new Array(msg.length * 4);
  for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
    var m = msg[i];
    if (endian === 'big') {
      res[k] = m >>> 24;
      res[k + 1] = (m >>> 16) & 0xff;
      res[k + 2] = (m >>> 8) & 0xff;
      res[k + 3] = m & 0xff;
    } else {
      res[k + 3] = m >>> 24;
      res[k + 2] = (m >>> 16) & 0xff;
      res[k + 1] = (m >>> 8) & 0xff;
      res[k] = m & 0xff;
    }
  }
  return res;
}
exports.split32 = split32;

function rotr32(w, b) {
  return (w >>> b) | (w << (32 - b));
}
exports.rotr32 = rotr32;

function rotl32(w, b) {
  return (w << b) | (w >>> (32 - b));
}
exports.rotl32 = rotl32;

function sum32(a, b) {
  return (a + b) >>> 0;
}
exports.sum32 = sum32;

function sum32_3(a, b, c) {
  return (a + b + c) >>> 0;
}
exports.sum32_3 = sum32_3;

function sum32_4(a, b, c, d) {
  return (a + b + c + d) >>> 0;
}
exports.sum32_4 = sum32_4;

function sum32_5(a, b, c, d, e) {
  return (a + b + c + d + e) >>> 0;
}
exports.sum32_5 = sum32_5;

function sum64(buf, pos, ah, al) {
  var bh = buf[pos];
  var bl = buf[pos + 1];

  var lo = (al + bl) >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  buf[pos] = hi >>> 0;
  buf[pos + 1] = lo;
}
exports.sum64 = sum64;

function sum64_hi(ah, al, bh, bl) {
  var lo = (al + bl) >>> 0;
  var hi = (lo < al ? 1 : 0) + ah + bh;
  return hi >>> 0;
}
exports.sum64_hi = sum64_hi;

function sum64_lo(ah, al, bh, bl) {
  var lo = al + bl;
  return lo >>> 0;
}
exports.sum64_lo = sum64_lo;

function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
  var carry = 0;
  var lo = al;
  lo = (lo + bl) >>> 0;
  carry += lo < al ? 1 : 0;
  lo = (lo + cl) >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = (lo + dl) >>> 0;
  carry += lo < dl ? 1 : 0;

  var hi = ah + bh + ch + dh + carry;
  return hi >>> 0;
}
exports.sum64_4_hi = sum64_4_hi;

function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
  var lo = al + bl + cl + dl;
  return lo >>> 0;
}
exports.sum64_4_lo = sum64_4_lo;

function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var carry = 0;
  var lo = al;
  lo = (lo + bl) >>> 0;
  carry += lo < al ? 1 : 0;
  lo = (lo + cl) >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = (lo + dl) >>> 0;
  carry += lo < dl ? 1 : 0;
  lo = (lo + el) >>> 0;
  carry += lo < el ? 1 : 0;

  var hi = ah + bh + ch + dh + eh + carry;
  return hi >>> 0;
}
exports.sum64_5_hi = sum64_5_hi;

function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
  var lo = al + bl + cl + dl + el;

  return lo >>> 0;
}
exports.sum64_5_lo = sum64_5_lo;

function rotr64_hi(ah, al, num) {
  var r = (al << (32 - num)) | (ah >>> num);
  return r >>> 0;
}
exports.rotr64_hi = rotr64_hi;

function rotr64_lo(ah, al, num) {
  var r = (ah << (32 - num)) | (al >>> num);
  return r >>> 0;
}
exports.rotr64_lo = rotr64_lo;

function shr64_hi(ah, al, num) {
  return ah >>> num;
}
exports.shr64_hi = shr64_hi;

function shr64_lo(ah, al, num) {
  var r = (ah << (32 - num)) | (al >>> num);
  return r >>> 0;
}
exports.shr64_lo = shr64_lo;


/***/ }),

/***/ 592:
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(469)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),

/***/ 625:
/***/ (function(module, exports, __webpack_require__) {

var Buffer = __webpack_require__(592).Buffer
var Transform = __webpack_require__(980).Transform
var StringDecoder = __webpack_require__(984).StringDecoder
var inherits = __webpack_require__(485)

function CipherBase (hashMode) {
  Transform.call(this)
  this.hashMode = typeof hashMode === 'string'
  if (this.hashMode) {
    this[hashMode] = this._finalOrDigest
  } else {
    this.final = this._finalOrDigest
  }
  if (this._final) {
    this.__final = this._final
    this._final = null
  }
  this._decoder = null
  this._encoding = null
}
inherits(CipherBase, Transform)

CipherBase.prototype.update = function (data, inputEnc, outputEnc) {
  if (typeof data === 'string') {
    data = Buffer.from(data, inputEnc)
  }

  var outData = this._update(data)
  if (this.hashMode) return this

  if (outputEnc) {
    outData = this._toString(outData, outputEnc)
  }

  return outData
}

CipherBase.prototype.setAutoPadding = function () {}
CipherBase.prototype.getAuthTag = function () {
  throw new Error('trying to get auth tag in unsupported state')
}

CipherBase.prototype.setAuthTag = function () {
  throw new Error('trying to set auth tag in unsupported state')
}

CipherBase.prototype.setAAD = function () {
  throw new Error('trying to set aad in unsupported state')
}

CipherBase.prototype._transform = function (data, _, next) {
  var err
  try {
    if (this.hashMode) {
      this._update(data)
    } else {
      this.push(this._update(data))
    }
  } catch (e) {
    err = e
  } finally {
    next(err)
  }
}
CipherBase.prototype._flush = function (done) {
  var err
  try {
    this.push(this.__final())
  } catch (e) {
    err = e
  }

  done(err)
}
CipherBase.prototype._finalOrDigest = function (outputEnc) {
  var outData = this.__final() || Buffer.alloc(0)
  if (outputEnc) {
    outData = this._toString(outData, outputEnc, true)
  }
  return outData
}

CipherBase.prototype._toString = function (value, enc, fin) {
  if (!this._decoder) {
    this._decoder = new StringDecoder(enc)
    this._encoding = enc
  }

  if (this._encoding !== enc) throw new Error('can\'t switch encodings')

  var out = this._decoder.write(value)
  if (fin) {
    out += this._decoder.end()
  }

  return out
}

module.exports = CipherBase


/***/ }),

/***/ 667:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.



/*<replacement>*/

var processNextTick = __webpack_require__(778);
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = __webpack_require__(750);
util.inherits = __webpack_require__(485);
/*</replacement>*/

var Readable = __webpack_require__(1943);
var Writable = __webpack_require__(983);

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  processNextTick(cb, err);
};

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

/***/ }),

/***/ 672:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(169)))

/***/ }),

/***/ 678:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// prototype class for hash functions
function Hash (blockSize, finalSize) {
  this._block = new Buffer(blockSize)
  this._finalSize = finalSize
  this._blockSize = blockSize
  this._len = 0
  this._s = 0
}

Hash.prototype.update = function (data, enc) {
  if (typeof data === 'string') {
    enc = enc || 'utf8'
    data = new Buffer(data, enc)
  }

  var l = this._len += data.length
  var s = this._s || 0
  var f = 0
  var buffer = this._block

  while (s < l) {
    var t = Math.min(data.length, f + this._blockSize - (s % this._blockSize))
    var ch = (t - f)

    for (var i = 0; i < ch; i++) {
      buffer[(s % this._blockSize) + i] = data[i + f]
    }

    s += ch
    f += ch

    if ((s % this._blockSize) === 0) {
      this._update(buffer)
    }
  }
  this._s = s

  return this
}

Hash.prototype.digest = function (enc) {
  // Suppose the length of the message M, in bits, is l
  var l = this._len * 8

  // Append the bit 1 to the end of the message
  this._block[this._len % this._blockSize] = 0x80

  // and then k zero bits, where k is the smallest non-negative solution to the equation (l + 1 + k) === finalSize mod blockSize
  this._block.fill(0, this._len % this._blockSize + 1)

  if (l % (this._blockSize * 8) >= this._finalSize * 8) {
    this._update(this._block)
    this._block.fill(0)
  }

  // to this append the block which is equal to the number l written in binary
  // TODO: handle case where l is > Math.pow(2, 29)
  this._block.writeInt32BE(l, this._blockSize - 4)

  var hash = this._update(this._block) || this._hash()

  return enc ? hash.toString(enc) : hash
}

Hash.prototype._update = function () {
  throw new Error('_update must be implemented by subclass')
}

module.exports = Hash

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 748:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {

function oldBrowser () {
  throw new Error('secure random number generation not supported by this browser\nuse chrome, FireFox or Internet Explorer 11')
}

var Buffer = __webpack_require__(592).Buffer
var crypto = global.crypto || global.msCrypto

if (crypto && crypto.getRandomValues) {
  module.exports = randomBytes
} else {
  module.exports = oldBrowser
}

function randomBytes (size, cb) {
  // phantomjs needs to throw
  if (size > 65536) throw new Error('requested too many random bytes')
  // in case browserify  isn't using the Uint8Array version
  var rawBytes = new global.Uint8Array(size)

  // This will not work in older browsers.
  // See https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
  if (size > 0) {  // getRandomValues fails on IE if size == 0
    crypto.getRandomValues(rawBytes)
  }

  // XXX: phantomjs doesn't like a buffer being passed here
  var bytes = Buffer.from(rawBytes.buffer)

  if (typeof cb === 'function') {
    return process.nextTick(function () {
      cb(null, bytes)
    })
  }

  return bytes
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74), __webpack_require__(169)))

/***/ }),

/***/ 749:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
var inherits = __webpack_require__(485)
var md5 = __webpack_require__(777)
var RIPEMD160 = __webpack_require__(979)
var sha = __webpack_require__(985)

var Base = __webpack_require__(625)

function HashNoConstructor (hash) {
  Base.call(this, 'digest')

  this._hash = hash
  this.buffers = []
}

inherits(HashNoConstructor, Base)

HashNoConstructor.prototype._update = function (data) {
  this.buffers.push(data)
}

HashNoConstructor.prototype._final = function () {
  var buf = Buffer.concat(this.buffers)
  var r = this._hash(buf)
  this.buffers = null

  return r
}

function Hash (hash) {
  Base.call(this, 'digest')

  this._hash = hash
}

inherits(Hash, Base)

Hash.prototype._update = function (data) {
  this._hash.update(data)
}

Hash.prototype._final = function () {
  return this._hash.digest()
}

module.exports = function createHash (alg) {
  alg = alg.toLowerCase()
  if (alg === 'md5') return new HashNoConstructor(md5)
  if (alg === 'rmd160' || alg === 'ripemd160') return new Hash(new RIPEMD160())

  return new Hash(sha(alg))
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 750:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 751:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {module.exports = function xor (a, b) {
  var length = Math.min(a.length, b.length)
  var buffer = new Buffer(length)

  for (var i = 0; i < length; ++i) {
    buffer[i] = a[i] ^ b[i]
  }

  return buffer
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 752:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(588);
var assert = __webpack_require__(563);

function BlockHash() {
  this.pending = null;
  this.pendingTotal = 0;
  this.blockSize = this.constructor.blockSize;
  this.outSize = this.constructor.outSize;
  this.hmacStrength = this.constructor.hmacStrength;
  this.padLength = this.constructor.padLength / 8;
  this.endian = 'big';

  this._delta8 = this.blockSize / 8;
  this._delta32 = this.blockSize / 32;
}
exports.BlockHash = BlockHash;

BlockHash.prototype.update = function update(msg, enc) {
  // Convert message to array, pad it, and join into 32bit blocks
  msg = utils.toArray(msg, enc);
  if (!this.pending)
    this.pending = msg;
  else
    this.pending = this.pending.concat(msg);
  this.pendingTotal += msg.length;

  // Enough data, try updating
  if (this.pending.length >= this._delta8) {
    msg = this.pending;

    // Process pending data in blocks
    var r = msg.length % this._delta8;
    this.pending = msg.slice(msg.length - r, msg.length);
    if (this.pending.length === 0)
      this.pending = null;

    msg = utils.join32(msg, 0, msg.length - r, this.endian);
    for (var i = 0; i < msg.length; i += this._delta32)
      this._update(msg, i, i + this._delta32);
  }

  return this;
};

BlockHash.prototype.digest = function digest(enc) {
  this.update(this._pad());
  assert(this.pending === null);

  return this._digest(enc);
};

BlockHash.prototype._pad = function pad() {
  var len = this.pendingTotal;
  var bytes = this._delta8;
  var k = bytes - ((len + this.padLength) % bytes);
  var res = new Array(k + this.padLength);
  res[0] = 0x80;
  for (var i = 1; i < k; i++)
    res[i] = 0;

  // Append length
  len <<= 3;
  if (this.endian === 'big') {
    for (var t = 8; t < this.padLength; t++)
      res[i++] = 0;

    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = (len >>> 24) & 0xff;
    res[i++] = (len >>> 16) & 0xff;
    res[i++] = (len >>> 8) & 0xff;
    res[i++] = len & 0xff;
  } else {
    res[i++] = len & 0xff;
    res[i++] = (len >>> 8) & 0xff;
    res[i++] = (len >>> 16) & 0xff;
    res[i++] = (len >>> 24) & 0xff;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;
    res[i++] = 0;

    for (t = 8; t < this.padLength; t++)
      res[i++] = 0;
  }

  return res;
};


/***/ }),

/***/ 753:
/***/ (function(module, exports, __webpack_require__) {

var asn1 = exports;

asn1.bignum = __webpack_require__(514);

asn1.define = __webpack_require__(2108).define;
asn1.base = __webpack_require__(754);
asn1.constants = __webpack_require__(1971);
asn1.decoders = __webpack_require__(2114);
asn1.encoders = __webpack_require__(2116);


/***/ }),

/***/ 754:
/***/ (function(module, exports, __webpack_require__) {

var base = exports;

base.Reporter = __webpack_require__(2111).Reporter;
base.DecoderBuffer = __webpack_require__(1970).DecoderBuffer;
base.EncoderBuffer = __webpack_require__(1970).EncoderBuffer;
base.Node = __webpack_require__(2112);


/***/ }),

/***/ 761:
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(762);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),

/***/ 762:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74), __webpack_require__(169)))

/***/ }),

/***/ 777:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

var makeHash = __webpack_require__(2052)

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5 (x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32)
  x[(((len + 64) >>> 9) << 4) + 14] = len

  var a = 1732584193
  var b = -271733879
  var c = -1732584194
  var d = 271733878

  for (var i = 0; i < x.length; i += 16) {
    var olda = a
    var oldb = b
    var oldc = c
    var oldd = d

    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936)
    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586)
    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819)
    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330)
    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897)
    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426)
    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341)
    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983)
    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416)
    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417)
    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063)
    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162)
    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682)
    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101)
    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290)
    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329)

    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510)
    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632)
    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713)
    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302)
    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691)
    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083)
    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335)
    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848)
    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438)
    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690)
    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961)
    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501)
    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467)
    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784)
    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473)
    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734)

    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558)
    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463)
    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562)
    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556)
    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060)
    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353)
    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632)
    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640)
    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174)
    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222)
    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979)
    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189)
    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487)
    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835)
    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520)
    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651)

    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844)
    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415)
    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905)
    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055)
    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571)
    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606)
    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523)
    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799)
    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359)
    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744)
    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380)
    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649)
    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070)
    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379)
    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259)
    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551)

    a = safe_add(a, olda)
    b = safe_add(b, oldb)
    c = safe_add(c, oldc)
    d = safe_add(d, oldd)
  }

  return [a, b, c, d]
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn (q, a, b, x, s, t) {
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
}

function md5_ff (a, b, c, d, x, s, t) {
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t)
}

function md5_gg (a, b, c, d, x, s, t) {
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t)
}

function md5_hh (a, b, c, d, x, s, t) {
  return md5_cmn(b ^ c ^ d, a, b, x, s, t)
}

function md5_ii (a, b, c, d, x, s, t) {
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t)
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add (x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF)
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
  return (msw << 16) | (lsw & 0xFFFF)
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol (num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt))
}

module.exports = function md5 (buf) {
  return makeHash(buf, core_md5)
}


/***/ }),

/***/ 778:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(169)))

/***/ }),

/***/ 779:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var md5 = __webpack_require__(777)
module.exports = EVP_BytesToKey
function EVP_BytesToKey (password, salt, keyLen, ivLen) {
  if (!Buffer.isBuffer(password)) {
    password = new Buffer(password, 'binary')
  }
  if (salt && !Buffer.isBuffer(salt)) {
    salt = new Buffer(salt, 'binary')
  }
  keyLen = keyLen / 8
  ivLen = ivLen || 0
  var ki = 0
  var ii = 0
  var key = new Buffer(keyLen)
  var iv = new Buffer(ivLen)
  var addmd = 0
  var md_buf
  var i
  var bufs = []
  while (true) {
    if (addmd++ > 0) {
      bufs.push(md_buf)
    }
    bufs.push(password)
    if (salt) {
      bufs.push(salt)
    }
    md_buf = md5(Buffer.concat(bufs))
    bufs = []
    i = 0
    if (keyLen > 0) {
      while (true) {
        if (keyLen === 0) {
          break
        }
        if (i === md_buf.length) {
          break
        }
        key[ki++] = md_buf[i]
        keyLen--
        i++
      }
    }
    if (ivLen > 0 && i !== md_buf.length) {
      while (true) {
        if (ivLen === 0) {
          break
        }
        if (i === md_buf.length) {
          break
        }
        iv[ii++] = md_buf[i]
        ivLen--
        i++
      }
    }
    if (keyLen === 0 && ivLen === 0) {
      break
    }
  }
  for (i = 0; i < md_buf.length; i++) {
    md_buf[i] = 0
  }
  return {
    key: key,
    iv: iv
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 780:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// based on the aes implimentation in triple sec
// https://github.com/keybase/triplesec

// which is in turn based on the one from crypto-js
// https://code.google.com/p/crypto-js/

var uint_max = Math.pow(2, 32)
function fixup_uint32 (x) {
  var ret, x_pos
  ret = x > uint_max || x < 0 ? (x_pos = Math.abs(x) % uint_max, x < 0 ? uint_max - x_pos : x_pos) : x
  return ret
}
function scrub_vec (v) {
  for (var i = 0; i < v.length; v++) {
    v[i] = 0
  }
  return false
}

function Global () {
  this.SBOX = []
  this.INV_SBOX = []
  this.SUB_MIX = [[], [], [], []]
  this.INV_SUB_MIX = [[], [], [], []]
  this.init()
  this.RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36]
}

Global.prototype.init = function () {
  var d, i, sx, t, x, x2, x4, x8, xi, _i
  d = (function () {
    var _i, _results
    _results = []
    for (i = _i = 0; _i < 256; i = ++_i) {
      if (i < 128) {
        _results.push(i << 1)
      } else {
        _results.push((i << 1) ^ 0x11b)
      }
    }
    return _results
  })()
  x = 0
  xi = 0
  for (i = _i = 0; _i < 256; i = ++_i) {
    sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4)
    sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63
    this.SBOX[x] = sx
    this.INV_SBOX[sx] = x
    x2 = d[x]
    x4 = d[x2]
    x8 = d[x4]
    t = (d[sx] * 0x101) ^ (sx * 0x1010100)
    this.SUB_MIX[0][x] = (t << 24) | (t >>> 8)
    this.SUB_MIX[1][x] = (t << 16) | (t >>> 16)
    this.SUB_MIX[2][x] = (t << 8) | (t >>> 24)
    this.SUB_MIX[3][x] = t
    t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100)
    this.INV_SUB_MIX[0][sx] = (t << 24) | (t >>> 8)
    this.INV_SUB_MIX[1][sx] = (t << 16) | (t >>> 16)
    this.INV_SUB_MIX[2][sx] = (t << 8) | (t >>> 24)
    this.INV_SUB_MIX[3][sx] = t
    if (x === 0) {
      x = xi = 1
    } else {
      x = x2 ^ d[d[d[x8 ^ x2]]]
      xi ^= d[d[xi]]
    }
  }
  return true
}

var G = new Global()

AES.blockSize = 4 * 4

AES.prototype.blockSize = AES.blockSize

AES.keySize = 256 / 8

AES.prototype.keySize = AES.keySize

function bufferToArray (buf) {
  var len = buf.length / 4
  var out = new Array(len)
  var i = -1
  while (++i < len) {
    out[i] = buf.readUInt32BE(i * 4)
  }
  return out
}
function AES (key) {
  this._key = bufferToArray(key)
  this._doReset()
}

AES.prototype._doReset = function () {
  var invKsRow, keySize, keyWords, ksRow, ksRows, t
  keyWords = this._key
  keySize = keyWords.length
  this._nRounds = keySize + 6
  ksRows = (this._nRounds + 1) * 4
  this._keySchedule = []
  for (ksRow = 0; ksRow < ksRows; ksRow++) {
    this._keySchedule[ksRow] = ksRow < keySize ? keyWords[ksRow] : (t = this._keySchedule[ksRow - 1], (ksRow % keySize) === 0 ? (t = (t << 8) | (t >>> 24), t = (G.SBOX[t >>> 24] << 24) | (G.SBOX[(t >>> 16) & 0xff] << 16) | (G.SBOX[(t >>> 8) & 0xff] << 8) | G.SBOX[t & 0xff], t ^= G.RCON[(ksRow / keySize) | 0] << 24) : keySize > 6 && ksRow % keySize === 4 ? t = (G.SBOX[t >>> 24] << 24) | (G.SBOX[(t >>> 16) & 0xff] << 16) | (G.SBOX[(t >>> 8) & 0xff] << 8) | G.SBOX[t & 0xff] : void 0, this._keySchedule[ksRow - keySize] ^ t)
  }
  this._invKeySchedule = []
  for (invKsRow = 0; invKsRow < ksRows; invKsRow++) {
    ksRow = ksRows - invKsRow
    t = this._keySchedule[ksRow - (invKsRow % 4 ? 0 : 4)]
    this._invKeySchedule[invKsRow] = invKsRow < 4 || ksRow <= 4 ? t : G.INV_SUB_MIX[0][G.SBOX[t >>> 24]] ^ G.INV_SUB_MIX[1][G.SBOX[(t >>> 16) & 0xff]] ^ G.INV_SUB_MIX[2][G.SBOX[(t >>> 8) & 0xff]] ^ G.INV_SUB_MIX[3][G.SBOX[t & 0xff]]
  }
  return true
}

AES.prototype.encryptBlock = function (M) {
  M = bufferToArray(new Buffer(M))
  var out = this._doCryptBlock(M, this._keySchedule, G.SUB_MIX, G.SBOX)
  var buf = new Buffer(16)
  buf.writeUInt32BE(out[0], 0)
  buf.writeUInt32BE(out[1], 4)
  buf.writeUInt32BE(out[2], 8)
  buf.writeUInt32BE(out[3], 12)
  return buf
}

AES.prototype.decryptBlock = function (M) {
  M = bufferToArray(new Buffer(M))
  var temp = [M[3], M[1]]
  M[1] = temp[0]
  M[3] = temp[1]
  var out = this._doCryptBlock(M, this._invKeySchedule, G.INV_SUB_MIX, G.INV_SBOX)
  var buf = new Buffer(16)
  buf.writeUInt32BE(out[0], 0)
  buf.writeUInt32BE(out[3], 4)
  buf.writeUInt32BE(out[2], 8)
  buf.writeUInt32BE(out[1], 12)
  return buf
}

AES.prototype.scrub = function () {
  scrub_vec(this._keySchedule)
  scrub_vec(this._invKeySchedule)
  scrub_vec(this._key)
}

AES.prototype._doCryptBlock = function (M, keySchedule, SUB_MIX, SBOX) {
  var ksRow, s0, s1, s2, s3, t0, t1, t2, t3

  s0 = M[0] ^ keySchedule[0]
  s1 = M[1] ^ keySchedule[1]
  s2 = M[2] ^ keySchedule[2]
  s3 = M[3] ^ keySchedule[3]
  ksRow = 4
  for (var round = 1; round < this._nRounds; round++) {
    t0 = SUB_MIX[0][s0 >>> 24] ^ SUB_MIX[1][(s1 >>> 16) & 0xff] ^ SUB_MIX[2][(s2 >>> 8) & 0xff] ^ SUB_MIX[3][s3 & 0xff] ^ keySchedule[ksRow++]
    t1 = SUB_MIX[0][s1 >>> 24] ^ SUB_MIX[1][(s2 >>> 16) & 0xff] ^ SUB_MIX[2][(s3 >>> 8) & 0xff] ^ SUB_MIX[3][s0 & 0xff] ^ keySchedule[ksRow++]
    t2 = SUB_MIX[0][s2 >>> 24] ^ SUB_MIX[1][(s3 >>> 16) & 0xff] ^ SUB_MIX[2][(s0 >>> 8) & 0xff] ^ SUB_MIX[3][s1 & 0xff] ^ keySchedule[ksRow++]
    t3 = SUB_MIX[0][s3 >>> 24] ^ SUB_MIX[1][(s0 >>> 16) & 0xff] ^ SUB_MIX[2][(s1 >>> 8) & 0xff] ^ SUB_MIX[3][s2 & 0xff] ^ keySchedule[ksRow++]
    s0 = t0
    s1 = t1
    s2 = t2
    s3 = t3
  }
  t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++]
  t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++]
  t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++]
  t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++]
  return [
    fixup_uint32(t0),
    fixup_uint32(t1),
    fixup_uint32(t2),
    fixup_uint32(t3)
  ]
}

exports.AES = AES

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 781:
/***/ (function(module, exports) {

exports['aes-128-ecb'] = {
  cipher: 'AES',
  key: 128,
  iv: 0,
  mode: 'ECB',
  type: 'block'
}
exports['aes-192-ecb'] = {
  cipher: 'AES',
  key: 192,
  iv: 0,
  mode: 'ECB',
  type: 'block'
}
exports['aes-256-ecb'] = {
  cipher: 'AES',
  key: 256,
  iv: 0,
  mode: 'ECB',
  type: 'block'
}
exports['aes-128-cbc'] = {
  cipher: 'AES',
  key: 128,
  iv: 16,
  mode: 'CBC',
  type: 'block'
}
exports['aes-192-cbc'] = {
  cipher: 'AES',
  key: 192,
  iv: 16,
  mode: 'CBC',
  type: 'block'
}
exports['aes-256-cbc'] = {
  cipher: 'AES',
  key: 256,
  iv: 16,
  mode: 'CBC',
  type: 'block'
}
exports['aes128'] = exports['aes-128-cbc']
exports['aes192'] = exports['aes-192-cbc']
exports['aes256'] = exports['aes-256-cbc']
exports['aes-128-cfb'] = {
  cipher: 'AES',
  key: 128,
  iv: 16,
  mode: 'CFB',
  type: 'stream'
}
exports['aes-192-cfb'] = {
  cipher: 'AES',
  key: 192,
  iv: 16,
  mode: 'CFB',
  type: 'stream'
}
exports['aes-256-cfb'] = {
  cipher: 'AES',
  key: 256,
  iv: 16,
  mode: 'CFB',
  type: 'stream'
}
exports['aes-128-cfb8'] = {
  cipher: 'AES',
  key: 128,
  iv: 16,
  mode: 'CFB8',
  type: 'stream'
}
exports['aes-192-cfb8'] = {
  cipher: 'AES',
  key: 192,
  iv: 16,
  mode: 'CFB8',
  type: 'stream'
}
exports['aes-256-cfb8'] = {
  cipher: 'AES',
  key: 256,
  iv: 16,
  mode: 'CFB8',
  type: 'stream'
}
exports['aes-128-cfb1'] = {
  cipher: 'AES',
  key: 128,
  iv: 16,
  mode: 'CFB1',
  type: 'stream'
}
exports['aes-192-cfb1'] = {
  cipher: 'AES',
  key: 192,
  iv: 16,
  mode: 'CFB1',
  type: 'stream'
}
exports['aes-256-cfb1'] = {
  cipher: 'AES',
  key: 256,
  iv: 16,
  mode: 'CFB1',
  type: 'stream'
}
exports['aes-128-ofb'] = {
  cipher: 'AES',
  key: 128,
  iv: 16,
  mode: 'OFB',
  type: 'stream'
}
exports['aes-192-ofb'] = {
  cipher: 'AES',
  key: 192,
  iv: 16,
  mode: 'OFB',
  type: 'stream'
}
exports['aes-256-ofb'] = {
  cipher: 'AES',
  key: 256,
  iv: 16,
  mode: 'OFB',
  type: 'stream'
}
exports['aes-128-ctr'] = {
  cipher: 'AES',
  key: 128,
  iv: 16,
  mode: 'CTR',
  type: 'stream'
}
exports['aes-192-ctr'] = {
  cipher: 'AES',
  key: 192,
  iv: 16,
  mode: 'CTR',
  type: 'stream'
}
exports['aes-256-ctr'] = {
  cipher: 'AES',
  key: 256,
  iv: 16,
  mode: 'CTR',
  type: 'stream'
}
exports['aes-128-gcm'] = {
  cipher: 'AES',
  key: 128,
  iv: 12,
  mode: 'GCM',
  type: 'auth'
}
exports['aes-192-gcm'] = {
  cipher: 'AES',
  key: 192,
  iv: 12,
  mode: 'GCM',
  type: 'auth'
}
exports['aes-256-gcm'] = {
  cipher: 'AES',
  key: 256,
  iv: 12,
  mode: 'GCM',
  type: 'auth'
}


/***/ }),

/***/ 782:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var xor = __webpack_require__(751)

function incr32 (iv) {
  var len = iv.length
  var item
  while (len--) {
    item = iv.readUInt8(len)
    if (item === 255) {
      iv.writeUInt8(0, len)
    } else {
      item++
      iv.writeUInt8(item, len)
      break
    }
  }
}

function getBlock (self) {
  var out = self._cipher.encryptBlock(self._prev)
  incr32(self._prev)
  return out
}

exports.encrypt = function (self, chunk) {
  while (self._cache.length < chunk.length) {
    self._cache = Buffer.concat([self._cache, getBlock(self)])
  }
  var pad = self._cache.slice(0, chunk.length)
  self._cache = self._cache.slice(chunk.length)
  return xor(chunk, pad)
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 783:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var curve = exports;

curve.base = __webpack_require__(2088);
curve.short = __webpack_require__(2089);
curve.mont = __webpack_require__(2090);
curve.edwards = __webpack_require__(2091);


/***/ }),

/***/ 784:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var asn1 = __webpack_require__(2107)
var aesid = __webpack_require__(2119)
var fixProc = __webpack_require__(2120)
var ciphers = __webpack_require__(986)
var compat = __webpack_require__(1951)
module.exports = parseKeys

function parseKeys (buffer) {
  var password
  if (typeof buffer === 'object' && !Buffer.isBuffer(buffer)) {
    password = buffer.passphrase
    buffer = buffer.key
  }
  if (typeof buffer === 'string') {
    buffer = new Buffer(buffer)
  }

  var stripped = fixProc(buffer, password)

  var type = stripped.tag
  var data = stripped.data
  var subtype, ndata
  switch (type) {
    case 'CERTIFICATE':
      ndata = asn1.certificate.decode(data, 'der').tbsCertificate.subjectPublicKeyInfo
      // falls through
    case 'PUBLIC KEY':
      if (!ndata) {
        ndata = asn1.PublicKey.decode(data, 'der')
      }
      subtype = ndata.algorithm.algorithm.join('.')
      switch (subtype) {
        case '1.2.840.113549.1.1.1':
          return asn1.RSAPublicKey.decode(ndata.subjectPublicKey.data, 'der')
        case '1.2.840.10045.2.1':
          ndata.subjectPrivateKey = ndata.subjectPublicKey
          return {
            type: 'ec',
            data: ndata
          }
        case '1.2.840.10040.4.1':
          ndata.algorithm.params.pub_key = asn1.DSAparam.decode(ndata.subjectPublicKey.data, 'der')
          return {
            type: 'dsa',
            data: ndata.algorithm.params
          }
        default: throw new Error('unknown key id ' + subtype)
      }
      throw new Error('unknown key type ' + type)
    case 'ENCRYPTED PRIVATE KEY':
      data = asn1.EncryptedPrivateKey.decode(data, 'der')
      data = decrypt(data, password)
      // falls through
    case 'PRIVATE KEY':
      ndata = asn1.PrivateKey.decode(data, 'der')
      subtype = ndata.algorithm.algorithm.join('.')
      switch (subtype) {
        case '1.2.840.113549.1.1.1':
          return asn1.RSAPrivateKey.decode(ndata.subjectPrivateKey, 'der')
        case '1.2.840.10045.2.1':
          return {
            curve: ndata.algorithm.curve,
            privateKey: asn1.ECPrivateKey.decode(ndata.subjectPrivateKey, 'der').privateKey
          }
        case '1.2.840.10040.4.1':
          ndata.algorithm.params.priv_key = asn1.DSAparam.decode(ndata.subjectPrivateKey, 'der')
          return {
            type: 'dsa',
            params: ndata.algorithm.params
          }
        default: throw new Error('unknown key id ' + subtype)
      }
      throw new Error('unknown key type ' + type)
    case 'RSA PUBLIC KEY':
      return asn1.RSAPublicKey.decode(data, 'der')
    case 'RSA PRIVATE KEY':
      return asn1.RSAPrivateKey.decode(data, 'der')
    case 'DSA PRIVATE KEY':
      return {
        type: 'dsa',
        params: asn1.DSAPrivateKey.decode(data, 'der')
      }
    case 'EC PRIVATE KEY':
      data = asn1.ECPrivateKey.decode(data, 'der')
      return {
        curve: data.parameters.value,
        privateKey: data.privateKey
      }
    default: throw new Error('unknown key type ' + type)
  }
}
parseKeys.signature = asn1.signature
function decrypt (data, password) {
  var salt = data.algorithm.decrypt.kde.kdeparams.salt
  var iters = parseInt(data.algorithm.decrypt.kde.kdeparams.iters.toString(), 10)
  var algo = aesid[data.algorithm.decrypt.cipher.algo.join('.')]
  var iv = data.algorithm.decrypt.cipher.iv
  var cipherText = data.subjectPrivateKey
  var keylen = parseInt(algo.split('-')[1], 10) / 8
  var key = compat.pbkdf2Sync(password, salt, iters, keylen)
  var cipher = ciphers.createDecipheriv(algo, key, iv)
  var out = []
  out.push(cipher.update(cipherText))
  out.push(cipher.final())
  return Buffer.concat(out)
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 979:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
var inherits = __webpack_require__(485)
var HashBase = __webpack_require__(2053)

function RIPEMD160 () {
  HashBase.call(this, 64)

  // state
  this._a = 0x67452301
  this._b = 0xefcdab89
  this._c = 0x98badcfe
  this._d = 0x10325476
  this._e = 0xc3d2e1f0
}

inherits(RIPEMD160, HashBase)

RIPEMD160.prototype._update = function () {
  var m = new Array(16)
  for (var i = 0; i < 16; ++i) m[i] = this._block.readInt32LE(i * 4)

  var al = this._a
  var bl = this._b
  var cl = this._c
  var dl = this._d
  var el = this._e

  // Mj = 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15
  // K = 0x00000000
  // Sj = 11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8
  al = fn1(al, bl, cl, dl, el, m[0], 0x00000000, 11); cl = rotl(cl, 10)
  el = fn1(el, al, bl, cl, dl, m[1], 0x00000000, 14); bl = rotl(bl, 10)
  dl = fn1(dl, el, al, bl, cl, m[2], 0x00000000, 15); al = rotl(al, 10)
  cl = fn1(cl, dl, el, al, bl, m[3], 0x00000000, 12); el = rotl(el, 10)
  bl = fn1(bl, cl, dl, el, al, m[4], 0x00000000, 5); dl = rotl(dl, 10)
  al = fn1(al, bl, cl, dl, el, m[5], 0x00000000, 8); cl = rotl(cl, 10)
  el = fn1(el, al, bl, cl, dl, m[6], 0x00000000, 7); bl = rotl(bl, 10)
  dl = fn1(dl, el, al, bl, cl, m[7], 0x00000000, 9); al = rotl(al, 10)
  cl = fn1(cl, dl, el, al, bl, m[8], 0x00000000, 11); el = rotl(el, 10)
  bl = fn1(bl, cl, dl, el, al, m[9], 0x00000000, 13); dl = rotl(dl, 10)
  al = fn1(al, bl, cl, dl, el, m[10], 0x00000000, 14); cl = rotl(cl, 10)
  el = fn1(el, al, bl, cl, dl, m[11], 0x00000000, 15); bl = rotl(bl, 10)
  dl = fn1(dl, el, al, bl, cl, m[12], 0x00000000, 6); al = rotl(al, 10)
  cl = fn1(cl, dl, el, al, bl, m[13], 0x00000000, 7); el = rotl(el, 10)
  bl = fn1(bl, cl, dl, el, al, m[14], 0x00000000, 9); dl = rotl(dl, 10)
  al = fn1(al, bl, cl, dl, el, m[15], 0x00000000, 8); cl = rotl(cl, 10)

  // Mj = 7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8
  // K = 0x5a827999
  // Sj = 7, 6, 8, 13, 11, 9, 7, 15, 7, 12, 15, 9, 11, 7, 13, 12
  el = fn2(el, al, bl, cl, dl, m[7], 0x5a827999, 7); bl = rotl(bl, 10)
  dl = fn2(dl, el, al, bl, cl, m[4], 0x5a827999, 6); al = rotl(al, 10)
  cl = fn2(cl, dl, el, al, bl, m[13], 0x5a827999, 8); el = rotl(el, 10)
  bl = fn2(bl, cl, dl, el, al, m[1], 0x5a827999, 13); dl = rotl(dl, 10)
  al = fn2(al, bl, cl, dl, el, m[10], 0x5a827999, 11); cl = rotl(cl, 10)
  el = fn2(el, al, bl, cl, dl, m[6], 0x5a827999, 9); bl = rotl(bl, 10)
  dl = fn2(dl, el, al, bl, cl, m[15], 0x5a827999, 7); al = rotl(al, 10)
  cl = fn2(cl, dl, el, al, bl, m[3], 0x5a827999, 15); el = rotl(el, 10)
  bl = fn2(bl, cl, dl, el, al, m[12], 0x5a827999, 7); dl = rotl(dl, 10)
  al = fn2(al, bl, cl, dl, el, m[0], 0x5a827999, 12); cl = rotl(cl, 10)
  el = fn2(el, al, bl, cl, dl, m[9], 0x5a827999, 15); bl = rotl(bl, 10)
  dl = fn2(dl, el, al, bl, cl, m[5], 0x5a827999, 9); al = rotl(al, 10)
  cl = fn2(cl, dl, el, al, bl, m[2], 0x5a827999, 11); el = rotl(el, 10)
  bl = fn2(bl, cl, dl, el, al, m[14], 0x5a827999, 7); dl = rotl(dl, 10)
  al = fn2(al, bl, cl, dl, el, m[11], 0x5a827999, 13); cl = rotl(cl, 10)
  el = fn2(el, al, bl, cl, dl, m[8], 0x5a827999, 12); bl = rotl(bl, 10)

  // Mj = 3, 10, 14, 4, 9, 15, 8, 1, 2, 7, 0, 6, 13, 11, 5, 12
  // K = 0x6ed9eba1
  // Sj = 11, 13, 6, 7, 14, 9, 13, 15, 14, 8, 13, 6, 5, 12, 7, 5
  dl = fn3(dl, el, al, bl, cl, m[3], 0x6ed9eba1, 11); al = rotl(al, 10)
  cl = fn3(cl, dl, el, al, bl, m[10], 0x6ed9eba1, 13); el = rotl(el, 10)
  bl = fn3(bl, cl, dl, el, al, m[14], 0x6ed9eba1, 6); dl = rotl(dl, 10)
  al = fn3(al, bl, cl, dl, el, m[4], 0x6ed9eba1, 7); cl = rotl(cl, 10)
  el = fn3(el, al, bl, cl, dl, m[9], 0x6ed9eba1, 14); bl = rotl(bl, 10)
  dl = fn3(dl, el, al, bl, cl, m[15], 0x6ed9eba1, 9); al = rotl(al, 10)
  cl = fn3(cl, dl, el, al, bl, m[8], 0x6ed9eba1, 13); el = rotl(el, 10)
  bl = fn3(bl, cl, dl, el, al, m[1], 0x6ed9eba1, 15); dl = rotl(dl, 10)
  al = fn3(al, bl, cl, dl, el, m[2], 0x6ed9eba1, 14); cl = rotl(cl, 10)
  el = fn3(el, al, bl, cl, dl, m[7], 0x6ed9eba1, 8); bl = rotl(bl, 10)
  dl = fn3(dl, el, al, bl, cl, m[0], 0x6ed9eba1, 13); al = rotl(al, 10)
  cl = fn3(cl, dl, el, al, bl, m[6], 0x6ed9eba1, 6); el = rotl(el, 10)
  bl = fn3(bl, cl, dl, el, al, m[13], 0x6ed9eba1, 5); dl = rotl(dl, 10)
  al = fn3(al, bl, cl, dl, el, m[11], 0x6ed9eba1, 12); cl = rotl(cl, 10)
  el = fn3(el, al, bl, cl, dl, m[5], 0x6ed9eba1, 7); bl = rotl(bl, 10)
  dl = fn3(dl, el, al, bl, cl, m[12], 0x6ed9eba1, 5); al = rotl(al, 10)

  // Mj = 1, 9, 11, 10, 0, 8, 12, 4, 13, 3, 7, 15, 14, 5, 6, 2
  // K = 0x8f1bbcdc
  // Sj = 11, 12, 14, 15, 14, 15, 9, 8, 9, 14, 5, 6, 8, 6, 5, 12
  cl = fn4(cl, dl, el, al, bl, m[1], 0x8f1bbcdc, 11); el = rotl(el, 10)
  bl = fn4(bl, cl, dl, el, al, m[9], 0x8f1bbcdc, 12); dl = rotl(dl, 10)
  al = fn4(al, bl, cl, dl, el, m[11], 0x8f1bbcdc, 14); cl = rotl(cl, 10)
  el = fn4(el, al, bl, cl, dl, m[10], 0x8f1bbcdc, 15); bl = rotl(bl, 10)
  dl = fn4(dl, el, al, bl, cl, m[0], 0x8f1bbcdc, 14); al = rotl(al, 10)
  cl = fn4(cl, dl, el, al, bl, m[8], 0x8f1bbcdc, 15); el = rotl(el, 10)
  bl = fn4(bl, cl, dl, el, al, m[12], 0x8f1bbcdc, 9); dl = rotl(dl, 10)
  al = fn4(al, bl, cl, dl, el, m[4], 0x8f1bbcdc, 8); cl = rotl(cl, 10)
  el = fn4(el, al, bl, cl, dl, m[13], 0x8f1bbcdc, 9); bl = rotl(bl, 10)
  dl = fn4(dl, el, al, bl, cl, m[3], 0x8f1bbcdc, 14); al = rotl(al, 10)
  cl = fn4(cl, dl, el, al, bl, m[7], 0x8f1bbcdc, 5); el = rotl(el, 10)
  bl = fn4(bl, cl, dl, el, al, m[15], 0x8f1bbcdc, 6); dl = rotl(dl, 10)
  al = fn4(al, bl, cl, dl, el, m[14], 0x8f1bbcdc, 8); cl = rotl(cl, 10)
  el = fn4(el, al, bl, cl, dl, m[5], 0x8f1bbcdc, 6); bl = rotl(bl, 10)
  dl = fn4(dl, el, al, bl, cl, m[6], 0x8f1bbcdc, 5); al = rotl(al, 10)
  cl = fn4(cl, dl, el, al, bl, m[2], 0x8f1bbcdc, 12); el = rotl(el, 10)

  // Mj = 4, 0, 5, 9, 7, 12, 2, 10, 14, 1, 3, 8, 11, 6, 15, 13
  // K = 0xa953fd4e
  // Sj = 9, 15, 5, 11, 6, 8, 13, 12, 5, 12, 13, 14, 11, 8, 5, 6
  bl = fn5(bl, cl, dl, el, al, m[4], 0xa953fd4e, 9); dl = rotl(dl, 10)
  al = fn5(al, bl, cl, dl, el, m[0], 0xa953fd4e, 15); cl = rotl(cl, 10)
  el = fn5(el, al, bl, cl, dl, m[5], 0xa953fd4e, 5); bl = rotl(bl, 10)
  dl = fn5(dl, el, al, bl, cl, m[9], 0xa953fd4e, 11); al = rotl(al, 10)
  cl = fn5(cl, dl, el, al, bl, m[7], 0xa953fd4e, 6); el = rotl(el, 10)
  bl = fn5(bl, cl, dl, el, al, m[12], 0xa953fd4e, 8); dl = rotl(dl, 10)
  al = fn5(al, bl, cl, dl, el, m[2], 0xa953fd4e, 13); cl = rotl(cl, 10)
  el = fn5(el, al, bl, cl, dl, m[10], 0xa953fd4e, 12); bl = rotl(bl, 10)
  dl = fn5(dl, el, al, bl, cl, m[14], 0xa953fd4e, 5); al = rotl(al, 10)
  cl = fn5(cl, dl, el, al, bl, m[1], 0xa953fd4e, 12); el = rotl(el, 10)
  bl = fn5(bl, cl, dl, el, al, m[3], 0xa953fd4e, 13); dl = rotl(dl, 10)
  al = fn5(al, bl, cl, dl, el, m[8], 0xa953fd4e, 14); cl = rotl(cl, 10)
  el = fn5(el, al, bl, cl, dl, m[11], 0xa953fd4e, 11); bl = rotl(bl, 10)
  dl = fn5(dl, el, al, bl, cl, m[6], 0xa953fd4e, 8); al = rotl(al, 10)
  cl = fn5(cl, dl, el, al, bl, m[15], 0xa953fd4e, 5); el = rotl(el, 10)
  bl = fn5(bl, cl, dl, el, al, m[13], 0xa953fd4e, 6); dl = rotl(dl, 10)

  var ar = this._a
  var br = this._b
  var cr = this._c
  var dr = this._d
  var er = this._e

  // M'j = 5, 14, 7, 0, 9, 2, 11, 4, 13, 6, 15, 8, 1, 10, 3, 12
  // K' = 0x50a28be6
  // S'j = 8, 9, 9, 11, 13, 15, 15, 5, 7, 7, 8, 11, 14, 14, 12, 6
  ar = fn5(ar, br, cr, dr, er, m[5], 0x50a28be6, 8); cr = rotl(cr, 10)
  er = fn5(er, ar, br, cr, dr, m[14], 0x50a28be6, 9); br = rotl(br, 10)
  dr = fn5(dr, er, ar, br, cr, m[7], 0x50a28be6, 9); ar = rotl(ar, 10)
  cr = fn5(cr, dr, er, ar, br, m[0], 0x50a28be6, 11); er = rotl(er, 10)
  br = fn5(br, cr, dr, er, ar, m[9], 0x50a28be6, 13); dr = rotl(dr, 10)
  ar = fn5(ar, br, cr, dr, er, m[2], 0x50a28be6, 15); cr = rotl(cr, 10)
  er = fn5(er, ar, br, cr, dr, m[11], 0x50a28be6, 15); br = rotl(br, 10)
  dr = fn5(dr, er, ar, br, cr, m[4], 0x50a28be6, 5); ar = rotl(ar, 10)
  cr = fn5(cr, dr, er, ar, br, m[13], 0x50a28be6, 7); er = rotl(er, 10)
  br = fn5(br, cr, dr, er, ar, m[6], 0x50a28be6, 7); dr = rotl(dr, 10)
  ar = fn5(ar, br, cr, dr, er, m[15], 0x50a28be6, 8); cr = rotl(cr, 10)
  er = fn5(er, ar, br, cr, dr, m[8], 0x50a28be6, 11); br = rotl(br, 10)
  dr = fn5(dr, er, ar, br, cr, m[1], 0x50a28be6, 14); ar = rotl(ar, 10)
  cr = fn5(cr, dr, er, ar, br, m[10], 0x50a28be6, 14); er = rotl(er, 10)
  br = fn5(br, cr, dr, er, ar, m[3], 0x50a28be6, 12); dr = rotl(dr, 10)
  ar = fn5(ar, br, cr, dr, er, m[12], 0x50a28be6, 6); cr = rotl(cr, 10)

  // M'j = 6, 11, 3, 7, 0, 13, 5, 10, 14, 15, 8, 12, 4, 9, 1, 2
  // K' = 0x5c4dd124
  // S'j = 9, 13, 15, 7, 12, 8, 9, 11, 7, 7, 12, 7, 6, 15, 13, 11
  er = fn4(er, ar, br, cr, dr, m[6], 0x5c4dd124, 9); br = rotl(br, 10)
  dr = fn4(dr, er, ar, br, cr, m[11], 0x5c4dd124, 13); ar = rotl(ar, 10)
  cr = fn4(cr, dr, er, ar, br, m[3], 0x5c4dd124, 15); er = rotl(er, 10)
  br = fn4(br, cr, dr, er, ar, m[7], 0x5c4dd124, 7); dr = rotl(dr, 10)
  ar = fn4(ar, br, cr, dr, er, m[0], 0x5c4dd124, 12); cr = rotl(cr, 10)
  er = fn4(er, ar, br, cr, dr, m[13], 0x5c4dd124, 8); br = rotl(br, 10)
  dr = fn4(dr, er, ar, br, cr, m[5], 0x5c4dd124, 9); ar = rotl(ar, 10)
  cr = fn4(cr, dr, er, ar, br, m[10], 0x5c4dd124, 11); er = rotl(er, 10)
  br = fn4(br, cr, dr, er, ar, m[14], 0x5c4dd124, 7); dr = rotl(dr, 10)
  ar = fn4(ar, br, cr, dr, er, m[15], 0x5c4dd124, 7); cr = rotl(cr, 10)
  er = fn4(er, ar, br, cr, dr, m[8], 0x5c4dd124, 12); br = rotl(br, 10)
  dr = fn4(dr, er, ar, br, cr, m[12], 0x5c4dd124, 7); ar = rotl(ar, 10)
  cr = fn4(cr, dr, er, ar, br, m[4], 0x5c4dd124, 6); er = rotl(er, 10)
  br = fn4(br, cr, dr, er, ar, m[9], 0x5c4dd124, 15); dr = rotl(dr, 10)
  ar = fn4(ar, br, cr, dr, er, m[1], 0x5c4dd124, 13); cr = rotl(cr, 10)
  er = fn4(er, ar, br, cr, dr, m[2], 0x5c4dd124, 11); br = rotl(br, 10)

  // M'j = 15, 5, 1, 3, 7, 14, 6, 9, 11, 8, 12, 2, 10, 0, 4, 13
  // K' = 0x6d703ef3
  // S'j = 9, 7, 15, 11, 8, 6, 6, 14, 12, 13, 5, 14, 13, 13, 7, 5
  dr = fn3(dr, er, ar, br, cr, m[15], 0x6d703ef3, 9); ar = rotl(ar, 10)
  cr = fn3(cr, dr, er, ar, br, m[5], 0x6d703ef3, 7); er = rotl(er, 10)
  br = fn3(br, cr, dr, er, ar, m[1], 0x6d703ef3, 15); dr = rotl(dr, 10)
  ar = fn3(ar, br, cr, dr, er, m[3], 0x6d703ef3, 11); cr = rotl(cr, 10)
  er = fn3(er, ar, br, cr, dr, m[7], 0x6d703ef3, 8); br = rotl(br, 10)
  dr = fn3(dr, er, ar, br, cr, m[14], 0x6d703ef3, 6); ar = rotl(ar, 10)
  cr = fn3(cr, dr, er, ar, br, m[6], 0x6d703ef3, 6); er = rotl(er, 10)
  br = fn3(br, cr, dr, er, ar, m[9], 0x6d703ef3, 14); dr = rotl(dr, 10)
  ar = fn3(ar, br, cr, dr, er, m[11], 0x6d703ef3, 12); cr = rotl(cr, 10)
  er = fn3(er, ar, br, cr, dr, m[8], 0x6d703ef3, 13); br = rotl(br, 10)
  dr = fn3(dr, er, ar, br, cr, m[12], 0x6d703ef3, 5); ar = rotl(ar, 10)
  cr = fn3(cr, dr, er, ar, br, m[2], 0x6d703ef3, 14); er = rotl(er, 10)
  br = fn3(br, cr, dr, er, ar, m[10], 0x6d703ef3, 13); dr = rotl(dr, 10)
  ar = fn3(ar, br, cr, dr, er, m[0], 0x6d703ef3, 13); cr = rotl(cr, 10)
  er = fn3(er, ar, br, cr, dr, m[4], 0x6d703ef3, 7); br = rotl(br, 10)
  dr = fn3(dr, er, ar, br, cr, m[13], 0x6d703ef3, 5); ar = rotl(ar, 10)

  // M'j = 8, 6, 4, 1, 3, 11, 15, 0, 5, 12, 2, 13, 9, 7, 10, 14
  // K' = 0x7a6d76e9
  // S'j = 15, 5, 8, 11, 14, 14, 6, 14, 6, 9, 12, 9, 12, 5, 15, 8
  cr = fn2(cr, dr, er, ar, br, m[8], 0x7a6d76e9, 15); er = rotl(er, 10)
  br = fn2(br, cr, dr, er, ar, m[6], 0x7a6d76e9, 5); dr = rotl(dr, 10)
  ar = fn2(ar, br, cr, dr, er, m[4], 0x7a6d76e9, 8); cr = rotl(cr, 10)
  er = fn2(er, ar, br, cr, dr, m[1], 0x7a6d76e9, 11); br = rotl(br, 10)
  dr = fn2(dr, er, ar, br, cr, m[3], 0x7a6d76e9, 14); ar = rotl(ar, 10)
  cr = fn2(cr, dr, er, ar, br, m[11], 0x7a6d76e9, 14); er = rotl(er, 10)
  br = fn2(br, cr, dr, er, ar, m[15], 0x7a6d76e9, 6); dr = rotl(dr, 10)
  ar = fn2(ar, br, cr, dr, er, m[0], 0x7a6d76e9, 14); cr = rotl(cr, 10)
  er = fn2(er, ar, br, cr, dr, m[5], 0x7a6d76e9, 6); br = rotl(br, 10)
  dr = fn2(dr, er, ar, br, cr, m[12], 0x7a6d76e9, 9); ar = rotl(ar, 10)
  cr = fn2(cr, dr, er, ar, br, m[2], 0x7a6d76e9, 12); er = rotl(er, 10)
  br = fn2(br, cr, dr, er, ar, m[13], 0x7a6d76e9, 9); dr = rotl(dr, 10)
  ar = fn2(ar, br, cr, dr, er, m[9], 0x7a6d76e9, 12); cr = rotl(cr, 10)
  er = fn2(er, ar, br, cr, dr, m[7], 0x7a6d76e9, 5); br = rotl(br, 10)
  dr = fn2(dr, er, ar, br, cr, m[10], 0x7a6d76e9, 15); ar = rotl(ar, 10)
  cr = fn2(cr, dr, er, ar, br, m[14], 0x7a6d76e9, 8); er = rotl(er, 10)

  // M'j = 12, 15, 10, 4, 1, 5, 8, 7, 6, 2, 13, 14, 0, 3, 9, 11
  // K' = 0x00000000
  // S'j = 8, 5, 12, 9, 12, 5, 14, 6, 8, 13, 6, 5, 15, 13, 11, 11
  br = fn1(br, cr, dr, er, ar, m[12], 0x00000000, 8); dr = rotl(dr, 10)
  ar = fn1(ar, br, cr, dr, er, m[15], 0x00000000, 5); cr = rotl(cr, 10)
  er = fn1(er, ar, br, cr, dr, m[10], 0x00000000, 12); br = rotl(br, 10)
  dr = fn1(dr, er, ar, br, cr, m[4], 0x00000000, 9); ar = rotl(ar, 10)
  cr = fn1(cr, dr, er, ar, br, m[1], 0x00000000, 12); er = rotl(er, 10)
  br = fn1(br, cr, dr, er, ar, m[5], 0x00000000, 5); dr = rotl(dr, 10)
  ar = fn1(ar, br, cr, dr, er, m[8], 0x00000000, 14); cr = rotl(cr, 10)
  er = fn1(er, ar, br, cr, dr, m[7], 0x00000000, 6); br = rotl(br, 10)
  dr = fn1(dr, er, ar, br, cr, m[6], 0x00000000, 8); ar = rotl(ar, 10)
  cr = fn1(cr, dr, er, ar, br, m[2], 0x00000000, 13); er = rotl(er, 10)
  br = fn1(br, cr, dr, er, ar, m[13], 0x00000000, 6); dr = rotl(dr, 10)
  ar = fn1(ar, br, cr, dr, er, m[14], 0x00000000, 5); cr = rotl(cr, 10)
  er = fn1(er, ar, br, cr, dr, m[0], 0x00000000, 15); br = rotl(br, 10)
  dr = fn1(dr, er, ar, br, cr, m[3], 0x00000000, 13); ar = rotl(ar, 10)
  cr = fn1(cr, dr, er, ar, br, m[9], 0x00000000, 11); er = rotl(er, 10)
  br = fn1(br, cr, dr, er, ar, m[11], 0x00000000, 11); dr = rotl(dr, 10)

  // change state
  var t = (this._b + cl + dr) | 0
  this._b = (this._c + dl + er) | 0
  this._c = (this._d + el + ar) | 0
  this._d = (this._e + al + br) | 0
  this._e = (this._a + bl + cr) | 0
  this._a = t
}

RIPEMD160.prototype._digest = function () {
  // create padding and handle blocks
  this._block[this._blockOffset++] = 0x80
  if (this._blockOffset > 56) {
    this._block.fill(0, this._blockOffset, 64)
    this._update()
    this._blockOffset = 0
  }

  this._block.fill(0, this._blockOffset, 56)
  this._block.writeUInt32LE(this._length[0], 56)
  this._block.writeUInt32LE(this._length[1], 60)
  this._update()

  // produce result
  var buffer = new Buffer(20)
  buffer.writeInt32LE(this._a, 0)
  buffer.writeInt32LE(this._b, 4)
  buffer.writeInt32LE(this._c, 8)
  buffer.writeInt32LE(this._d, 12)
  buffer.writeInt32LE(this._e, 16)
  return buffer
}

function rotl (x, n) {
  return (x << n) | (x >>> (32 - n))
}

function fn1 (a, b, c, d, e, m, k, s) {
  return (rotl((a + (b ^ c ^ d) + m + k) | 0, s) + e) | 0
}

function fn2 (a, b, c, d, e, m, k, s) {
  return (rotl((a + ((b & c) | ((~b) & d)) + m + k) | 0, s) + e) | 0
}

function fn3 (a, b, c, d, e, m, k, s) {
  return (rotl((a + ((b | (~c)) ^ d) + m + k) | 0, s) + e) | 0
}

function fn4 (a, b, c, d, e, m, k, s) {
  return (rotl((a + ((b & d) | (c & (~d))) + m + k) | 0, s) + e) | 0
}

function fn5 (a, b, c, d, e, m, k, s) {
  return (rotl((a + (b ^ (c | (~d))) + m + k) | 0, s) + e) | 0
}

module.exports = RIPEMD160

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 980:
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = __webpack_require__(981).EventEmitter;
var inherits = __webpack_require__(485);

inherits(Stream, EE);
Stream.Readable = __webpack_require__(982);
Stream.Writable = __webpack_require__(2058);
Stream.Duplex = __webpack_require__(2059);
Stream.Transform = __webpack_require__(2060);
Stream.PassThrough = __webpack_require__(2061);

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};


/***/ }),

/***/ 981:
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),

/***/ 982:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1943);
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = __webpack_require__(983);
exports.Duplex = __webpack_require__(667);
exports.Transform = __webpack_require__(1946);
exports.PassThrough = __webpack_require__(2057);


/***/ }),

/***/ 983:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, setImmediate, global) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.



/*<replacement>*/

var processNextTick = __webpack_require__(778);
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = __webpack_require__(750);
util.inherits = __webpack_require__(485);
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: __webpack_require__(2056)
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(1944);
/*</replacement>*/

/*<replacement>*/
var Buffer = __webpack_require__(592).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

var destroyImpl = __webpack_require__(1945);

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || __webpack_require__(667);

  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(667);

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  processNextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = _isUint8Array(chunk) && !state.objectMode;

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    processNextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    processNextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      processNextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(169), __webpack_require__(761).setImmediate, __webpack_require__(74)))

/***/ }),

/***/ 984:
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var Buffer = __webpack_require__(469).Buffer;

var isBufferEncoding = Buffer.isEncoding
  || function(encoding) {
       switch (encoding && encoding.toLowerCase()) {
         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
         default: return false;
       }
     }


function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
var StringDecoder = exports.StringDecoder = function(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  // Enough space to store all bytes of a single character. UTF-8 needs 4
  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
  this.charBuffer = new Buffer(6);
  // Number of bytes received for the current incomplete multi-byte character.
  this.charReceived = 0;
  // Number of bytes expected for the current incomplete multi-byte character.
  this.charLength = 0;
};


// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var available = (buffer.length >= this.charLength - this.charReceived) ?
        this.charLength - this.charReceived :
        buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, 0, available);
    this.charReceived += available;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // remove bytes belonging to the current character from the buffer
    buffer = buffer.slice(available, buffer.length);

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (buffer.length === 0) {
      return charStr;
    }
    break;
  }

  // determine and set charLength / charReceived
  this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
    end -= this.charReceived;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    buffer.copy(this.charBuffer, 0, 0, size);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}

function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}


/***/ }),

/***/ 985:
/***/ (function(module, exports, __webpack_require__) {

var exports = module.exports = function SHA (algorithm) {
  algorithm = algorithm.toLowerCase()

  var Algorithm = exports[algorithm]
  if (!Algorithm) throw new Error(algorithm + ' is not supported (we accept pull requests)')

  return new Algorithm()
}

exports.sha = __webpack_require__(2062)
exports.sha1 = __webpack_require__(2063)
exports.sha224 = __webpack_require__(2064)
exports.sha256 = __webpack_require__(1947)
exports.sha384 = __webpack_require__(2065)
exports.sha512 = __webpack_require__(1948)


/***/ }),

/***/ 986:
/***/ (function(module, exports, __webpack_require__) {

var ciphers = __webpack_require__(2070)
exports.createCipher = exports.Cipher = ciphers.createCipher
exports.createCipheriv = exports.Cipheriv = ciphers.createCipheriv
var deciphers = __webpack_require__(2072)
exports.createDecipher = exports.Decipher = deciphers.createDecipher
exports.createDecipheriv = exports.Decipheriv = deciphers.createDecipheriv
var modes = __webpack_require__(781)
function getCiphers () {
  return Object.keys(modes)
}
exports.listCiphers = exports.getCiphers = getCiphers


/***/ }),

/***/ 987:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.utils = __webpack_require__(2074);
exports.Cipher = __webpack_require__(2075);
exports.DES = __webpack_require__(2076);
exports.CBC = __webpack_require__(2077);
exports.EDE = __webpack_require__(2078);


/***/ }),

/***/ 988:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {var bn = __webpack_require__(514);
var randomBytes = __webpack_require__(748);
module.exports = crt;
function blind(priv) {
  var r = getr(priv);
  var blinder = r.toRed(bn.mont(priv.modulus))
  .redPow(new bn(priv.publicExponent)).fromRed();
  return {
    blinder: blinder,
    unblinder:r.invm(priv.modulus)
  };
}
function crt(msg, priv) {
  var blinds = blind(priv);
  var len = priv.modulus.byteLength();
  var mod = bn.mont(priv.modulus);
  var blinded = new bn(msg).mul(blinds.blinder).umod(priv.modulus);
  var c1 = blinded.toRed(bn.mont(priv.prime1));
  var c2 = blinded.toRed(bn.mont(priv.prime2));
  var qinv = priv.coefficient;
  var p = priv.prime1;
  var q = priv.prime2;
  var m1 = c1.redPow(priv.exponent1);
  var m2 = c2.redPow(priv.exponent2);
  m1 = m1.fromRed();
  m2 = m2.fromRed();
  var h = m1.isub(m2).imul(qinv).umod(p);
  h.imul(q);
  m2.iadd(h);
  return new Buffer(m2.imul(blinds.unblinder).umod(priv.modulus).toArray(false, len));
}
crt.getr = getr;
function getr(priv) {
  var len = priv.modulus.byteLength();
  var r = new bn(randomBytes(len));
  while (r.cmp(priv.modulus) >=  0 || !r.umod(priv.prime1) || !r.umod(priv.prime2)) {
    r = new bn(randomBytes(len));
  }
  return r;
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(469).Buffer))

/***/ }),

/***/ 989:
/***/ (function(module, exports, __webpack_require__) {

var hash = exports;

hash.utils = __webpack_require__(588);
hash.common = __webpack_require__(752);
hash.sha = __webpack_require__(2093);
hash.ripemd = __webpack_require__(2097);
hash.hmac = __webpack_require__(2098);

// Proxy hash functions to the main object
hash.sha1 = hash.sha.sha1;
hash.sha256 = hash.sha.sha256;
hash.sha224 = hash.sha.sha224;
hash.sha384 = hash.sha.sha384;
hash.sha512 = hash.sha.sha512;
hash.ripemd160 = hash.ripemd.ripemd160;


/***/ })

});