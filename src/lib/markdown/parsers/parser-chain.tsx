import { RawMarkdownDocument, MarkdownDocument } from "../core/types";
import { MarkdownParser } from "./types";

export class MarkdownParserChain {
  private parsers: MarkdownParser[] = [];

  add(parser: MarkdownParser): this {
    this.parsers.push(parser);
    return this;
  }

  parse<T>(rawDoc: RawMarkdownDocument): MarkdownDocument<T> {
    // let context: ParseContext<T> = {
    //   slug: rawDoc.slug,
    //   source: rawDoc.source,
    //   rawContent: rawDoc.content,
    // };
    let context = { ...rawDoc };

    // Run through parser chain
    for (const parser of this.parsers) {
      context = parser.parse(rawDoc);
    }

    return context;
  }
}
