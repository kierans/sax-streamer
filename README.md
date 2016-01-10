## sax-streamer
A SAX utility that allows modification of the XML text during processing

## Install

Install with [npm](http://github.com/isaacs/npm):

    npm install sax-streamer

Requires the use of [sax-js](https://github.com/isaacs/sax-js/). 

## Usage

The following example shows the use of the base class which (mostly) recreates the XML document textually from a stream
containing XML document text.

```javascript
  var SAXStreamer = require("sax-streamer").SAXStreamer;
  
  var saxStreamer = new SAXStreamer(opts);
	 
  var xml = // ... get a stream
	
  /*
   * strict and opts are passed to sax-js createStream
   */
  var dest = saxStreamer.createStream(xml, strict, opts);

  dest.pipe(process.stdout);
```

However that isn't every useful. `SAXStreamer` servers as a base class for other classes that may want to manipulate the 
XML document as it's being parsed.

`SAXInserter` allows element attributes to be modified as well as inserting nodes into the document (before or after a
given path).

```javascript
var SAXInserter = require("sax-streamer").SAXInserter,
    SAXFactory = require("sax-streamer").SAXFactory;
    
var XML =
    "<?xml version=\"1.0\" charset=\"UTF-8\" ?>" +
    "<book>" +
    "  <chapter>" +
    "    <number>1</number>" +
    "  </chapter>" +
    "  <chapter>" +
    "    <number>2</number>" +
    "  </chapter>" +
    "  <chapter>" +
    "    <number>3</number>" +
    "  </chapter>" +
    "</book>";
    
var title = SAXFactory.createElement("title");
SAXFactory.createText(title, TITLE);

saxInserter = new SAXInserter();
saxInserter.insertBefore("/book/chapter[1]/number", title);

saxInserter.createStream(createStreamFromXML(XML), true).pipe(process.stdout);
```

```
<?xml version="1.0" charset="UTF-8" ?>
<book>
  <chapter>
    <title>Greatest Story Ever Told</title>
    <number>1</number>
  </chapter>
  <chapter>
    <number>2</number>
  </chapter>
  <chapter>
    <number>3</number>
  </chapter>
</book>
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

## Creating XML

To aid in creating new XML in the output stream, `SAXFactory` is available.  The resulting nodes mimic the `sax-js` structure.  Thus the results from the factory can be passed to the `SAXStreamer` Event handlers to have resulting XML that textually matches the input XML formatting.

## Tests

Run `grunt test`
