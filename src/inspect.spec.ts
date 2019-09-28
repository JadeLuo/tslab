import * as converter from "./converter";

let conv: converter.Converter;
beforeAll(() => {
  conv = converter.createConverter();
});
afterAll(() => {
  if (conv) {
    conv.close();
  }
});

describe("inspect", () => {
  it("let number", () => {
    const src = "/** xys is a great variable */\nlet xyz = 10;";
    const position = src.indexOf("xyz =");
    const info = conv.inspect(``, src, position);
    expect(info).toEqual({
      displayParts: [
        {
          kind: "keyword",
          text: "let"
        },
        {
          kind: "space",
          text: " "
        },
        {
          kind: "localName",
          text: "xyz"
        },
        {
          kind: "punctuation",
          text: ":"
        },
        {
          kind: "space",
          text: " "
        },
        {
          kind: "keyword",
          text: "number"
        }
      ],
      documentation: [
        {
          kind: "text",
          text: "xys is a great variable"
        }
      ],
      kind: "let",
      kindModifiers: "",
      tags: undefined,
      textSpan: {
        length: 3,
        // TODO: Cancel the length of prefix.
        start: position
      }
    });
  });

  it("var boolean", () => {
    const src = "/** klm is a great boolean */\nvar klm = true;";
    const position = src.indexOf("klm =");
    const info = conv.inspect(``, src, position);
    expect(info).toEqual({
      displayParts: [
        {
          kind: "keyword",
          text: "var"
        },
        {
          kind: "space",
          text: " "
        },
        {
          kind: "localName",
          text: "klm"
        },
        {
          kind: "punctuation",
          text: ":"
        },
        {
          kind: "space",
          text: " "
        },
        {
          kind: "keyword",
          text: "boolean"
        }
      ],
      documentation: [
        {
          kind: "text",
          text: "klm is a great boolean"
        }
      ],
      kind: "var",
      kindModifiers: "",
      tags: undefined,
      textSpan: {
        length: 3,
        // TODO: Cancel the length of prefix.
        start: position
      }
    });
  });

  it("const string", () => {
    const src = "/** abc is a great string */\nconst abc = 'hello';";
    const position = src.indexOf("abc =");
    const info = conv.inspect(``, src, position);
    expect(info).toEqual({
      displayParts: [
        {
          kind: "keyword",
          text: "const"
        },
        {
          kind: "space",
          text: " "
        },
        {
          kind: "localName",
          text: "abc"
        },
        {
          kind: "punctuation",
          text: ":"
        },
        {
          kind: "space",
          text: " "
        },
        {
          kind: "stringLiteral",
          text: '"hello"'
        }
      ],
      documentation: [
        {
          kind: "text",
          text: "abc is a great string"
        }
      ],
      kind: "const",
      kindModifiers: "",
      tags: undefined,
      textSpan: {
        length: 3,
        // TODO: Cancel the length of prefix.
        start: position
      }
    });
  });

  it("std method", () => {
    const src = 'let s = "abc"; s.indexOf("b");';
    const position = src.indexOf("indexOf(");
    const info = conv.inspect(``, src, position);
    expect(info).toEqual({
      kind: "method",
      kindModifiers: "declare",
      textSpan: { start: 17, length: 7 },
      displayParts: [
        { text: "(", kind: "punctuation" },
        { text: "method", kind: "text" },
        { text: ")", kind: "punctuation" },
        { text: " ", kind: "space" },
        { text: "String", kind: "localName" },
        { text: ".", kind: "punctuation" },
        { text: "indexOf", kind: "methodName" },
        { text: "(", kind: "punctuation" },
        { text: "searchString", kind: "parameterName" },
        { text: ":", kind: "punctuation" },
        { text: " ", kind: "space" },
        { text: "string", kind: "keyword" },
        { text: ",", kind: "punctuation" },
        { text: " ", kind: "space" },
        { text: "position", kind: "parameterName" },
        { text: "?", kind: "punctuation" },
        { text: ":", kind: "punctuation" },
        { text: " ", kind: "space" },
        { text: "number", kind: "keyword" },
        { text: ")", kind: "punctuation" },
        { text: ":", kind: "punctuation" },
        { text: " ", kind: "space" },
        { text: "number", kind: "keyword" }
      ],
      documentation: [
        {
          text: "Returns the position of the first occurrence of a substring.",
          kind: "text"
        }
      ],
      tags: [
        {
          name: "param",
          text: "searchString The substring to search for in the string"
        },
        {
          name: "param",
          text:
            "position The index at which to begin searching the String object. If omitted, search starts at the beginning of the string."
        }
      ]
    });
  });

  it("std constructor with override", () => {
    const src = "let m = new Map();";
    const position = src.indexOf("Map(");
    const info = conv.inspect(``, src, position);
    let m = new Map();
    expect(info).toEqual({
      kind: "var",
      kindModifiers: "declare",
      textSpan: { start: 12, length: 3 },
      displayParts: [
        { text: "var", kind: "keyword" },
        { text: " ", kind: "space" },
        { text: "Map", kind: "localName" },
        { text: ":", kind: "punctuation" },
        { text: " ", kind: "space" },
        { text: "MapConstructor", kind: "interfaceName" },
        { text: "\n", kind: "lineBreak" },
        { text: "new", kind: "keyword" },
        { text: " ", kind: "space" },
        { text: "(", kind: "punctuation" },
        { text: ")", kind: "punctuation" },
        { text: " ", kind: "space" },
        { text: "=>", kind: "punctuation" },
        { text: " ", kind: "space" },
        { text: "Map", kind: "localName" },
        { text: "<", kind: "punctuation" },
        { text: "any", kind: "keyword" },
        { text: ",", kind: "punctuation" },
        { text: " ", kind: "space" },
        { text: "any", kind: "keyword" },
        { text: ">", kind: "punctuation" },
        { text: " ", kind: "space" },
        { text: "(", kind: "punctuation" },
        { text: "+", kind: "operator" },
        { text: "2", kind: "numericLiteral" },
        { text: " ", kind: "space" },
        { text: "overloads", kind: "text" },
        { text: ")", kind: "punctuation" }
      ],
      documentation: []
    });
  });

  it("let interface", () => {
    const src = "let m: Map<string, number>;";
    const position = src.indexOf("m:");
    const info = conv.inspect(``, src, position);
    expect(info).toEqual({
      kind: "let",
      kindModifiers: "",
      textSpan: { start: 4, length: 1 },
      displayParts: [
        { text: "let", kind: "keyword" },
        { text: " ", kind: "space" },
        { text: "m", kind: "localName" },
        { text: ":", kind: "punctuation" },
        { text: " ", kind: "space" },
        { text: "Map", kind: "localName" },
        { text: "<", kind: "punctuation" },
        { text: "string", kind: "keyword" },
        { text: ",", kind: "punctuation" },
        { text: " ", kind: "space" },
        { text: "number", kind: "keyword" },
        { text: ">", kind: "punctuation" }
      ],
      documentation: []
    });
  });

  it("std interface", () => {
    const src = "let m: Map<string, number>;";
    const position = src.indexOf("Map<");
    const info = conv.inspect(``, src, position);
    expect(info).toEqual({
      kind: "var",
      kindModifiers: "declare",
      textSpan: { start: 7, length: 3 },
      displayParts: [
        { text: "interface", kind: "keyword" },
        { text: " ", kind: "space" },
        { text: "Map", kind: "localName" },
        { text: "<", kind: "punctuation" },
        { text: "K", kind: "typeParameterName" },
        { text: ",", kind: "punctuation" },
        { text: " ", kind: "space" },
        { text: "V", kind: "typeParameterName" },
        { text: ">", kind: "punctuation" }
      ],
      documentation: []
    });
  });

  it("enum member", () => {
    const src = "enum myenum {key1, key2} myenum.key1;";
    const position = src.indexOf("key1;");
    const info = conv.inspect(``, src, position);
    expect(info).toEqual({
      kind: "enum member",
      kindModifiers: "",
      textSpan: { start: 32, length: 4 },
      displayParts: [
        { text: "(", kind: "punctuation" },
        { text: "enum member", kind: "text" },
        { text: ")", kind: "punctuation" },
        { text: " ", kind: "space" },
        { text: "myenum", kind: "enumName" },
        { text: ".", kind: "punctuation" },
        { text: "key1", kind: "enumMemberName" },
        { text: " ", kind: "space" },
        { text: "=", kind: "operator" },
        { text: " ", kind: "space" },
        { text: "0", kind: "numericLiteral" }
      ],
      documentation: []
    });
  });
});