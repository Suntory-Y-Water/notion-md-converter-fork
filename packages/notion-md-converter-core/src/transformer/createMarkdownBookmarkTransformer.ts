import { MarkdownUtils } from "../utils";
import { createBasicBookmarkTransformer } from "./createBasicTransformer";

export const createMarkdownBookmarkTransformer = () => {
  return createBasicBookmarkTransformer(({ block }) => {
    const caption = MarkdownUtils.convertRichTextsToMarkdown(
      block.bookmark.caption
    );
    return MarkdownUtils.convertToLink(
      caption || block.bookmark.url,
      block.bookmark.url
    );
  });
};
