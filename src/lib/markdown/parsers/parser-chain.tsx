import { RawMarkdownDocument, MarkdownDocument } from "../core/types";
import { MarkdownParser, ParseContext } from "./types";

export class MarkdownParserChain {
  private parsers: MarkdownParser[] = [];

  add(parser: MarkdownParser): this {
    this.parsers.push(parser);
    return this;
  }

  parse<T>(rawDoc: RawMarkdownDocument): MarkdownDocument<T> {
    let context: ParseContext<T> = {
      slug: rawDoc.slug,
      source: rawDoc.source,
      rawContent: rawDoc.content,
    };

    // Run through parser chain
    for (const parser of this.parsers) {
      context = parser.parse(context);
    }

    return {
      slug: context.slug,
      source: context.source,
      content: context.rawContent,
      frontmatter: context.frontmatter || ({} as T),
    };
  }
}
