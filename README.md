## sax-streamer
A SAX utility that allows modification of the XML text during processing

## Install

Install with [npm](http://github.com/isaacs/npm):

    npm install sax-streamer

Requires the use of [sax-js](https://github.com/isaacs/sax-js/). 

## Usage

```javascript
  var SAXStreamer = require("sax-streamer");
  
	var saxStreamer = new SAXStreamer(opts);
	 
	var xml = ... // get a stream
	
	/*
	 * strict and opts are passed to sax-js createStream
	 */
	var dest = saxStreamer.createStream(xml, strict, opts);
	
	dest.pipe(process.stdout);
```

## Constructor Arguments

Constructor arguments are optional, but are helpful in tweaking the XML processing.

`entities` - Map of extra entities to pass to the SAX parser.

`formatting` - Object of values that guide how to output the XML.

### Formatting settings:

Useful when wanting to control how the output XML looks textually.  Aids in diffing XML files.

* `spaceBeforeSelfClosingTag` - Controls how a self closing tag should look.  Either `<doc />` or `<doc/>`.  Defaults to `true`.

## Modifying XML

When `createStream` is called, the underlying SAX stream has the default event handlers (eg: `SAXStreamer.opentag`) attached (ie: `saxStream.on("opentag, this.opentag)`).
Subclass `SAXStreamer` overriding the default event handlers as necessary.

### Event handlers

* SAXStreamer.text
* SAXStreamer.doctype
* SAXStreamer.opentag
* SAXStreamer.closetag
* SAXStreamer.processinginstruction
* SAXStreamer.opencdata
* SAXStreamer.cdata
* SAXStreamer.closecdata
* SAXStreamer.comment
* SAXStreamer.error

## Tests

Run `grunt test`