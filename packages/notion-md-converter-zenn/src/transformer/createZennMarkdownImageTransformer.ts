import {
  MarkdownUtils,
  TransformerUtils,
  createImageTransformerFactory,
  createNoChangeFileObjectAdapter,
} from "@notion-md-converter/core";
import type { FileAdapter, ImageTransformer } from "@notion-md-converter/core/types";

type ZennImageMetadata = {
  width?: string;
};

export const createZennMarkdownImageTransformer = (
  options: {
    fileAdapter?: FileAdapter;
  } = {},
): ImageTransformer => {
  return createImageTransformerFactory(({ block, metadata }) => {
    const { width } = metadata as ZennImageMetadata;

    const fileAdapter = options.fileAdapter ?? createNoChangeFileObjectAdapter();
    const { url } = fileAdapter(block.image);
    const caption =
      block.image.caption.length > 0 ? TransformerUtils.getCaptionText(block.image.caption) : url;
    return MarkdownUtils.image(caption ?? url, url, { width });
  });
};
