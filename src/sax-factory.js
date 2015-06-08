"use strict";

exports.NodeTypes = {
  NODE: "Node",
  PROCESSING_INSTRUCTION: "ProcessingInstruction",
  ELEMENT: "Element",
  TEXT: "Text",
  CDATA: "CDATA",
  COMMENT: "Comment"
};

/**
 * Creates a node that is useful for holding other nodes.
 *
 * @return {Node}
 */
exports.createNode = function(parent) {
  var node = new Node();

  if (parent) {
    parent.addChild(node);
  }

  return node;
};

exports.createElement = function(parent, tag) {
  if (!tag) {
    tag = parent;
    parent = undefined;
  }

  tag = typeof tag !== "string" ? tag : {
    name: tag,
    selfClosing: true
  };

  if (!tag || !tag.name) {
    throw new Error("Can't create an element with a name");
  }

  var node = exports.createNode(parent);
  node.nodeType = exports.NodeTypes.ELEMENT;
  node.name = tag.name;
  node.isSelfClosing = tag.selfClosing;
  node.attributes = tag.attributes || {};
  node.addChild = (function() {
    var superMethod = node.addChild;

    return function(child) {
      superMethod.apply(node, child);

      node.isSelfClosing = false;
    };
  }());

  return node;
};

exports.createText = function(text) {
  return {
    nodeType: exports.NodeTypes.TEXT,
    text: text
  };
};

exports.createProcessingInstruction = function(instruction) {
  return {
    nodeType: exports.NodeTypes.PROCESSING_INSTRUCTION,
    name: instruction.name,
    body: (function() {
      var prop,
          instructions = instruction.instructions,
          body = [];
      for (prop in instructions) {
        if (instructions.hasOwnProperty(prop)) {
          body.push(prop + "=\"" + instructions[prop] + "\"");
        }
      }

      return body.join(" ");
    }())
  };
};

exports.createCDATA = function(cdata) {
  return {
    nodeType: exports.NodeTypes.CDATA,
    cdata: cdata
  };
};

exports.createComment = function(comment) {
  return {
    nodeType: exports.NodeTypes.COMMENT,
    comment: comment
  };
};

function Node() {
  this.nodeType = exports.NodeTypes.NODE;
  this.children = [];
}

Node.prototype.addChild = function(child) {
  this.children.push(child);
};