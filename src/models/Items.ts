export type Item = {
    displayLink: string;
    formattedUrl: string;
    htmlFormattedUrl: string;
    htmlSnippet: string;
    htmlTitle: string;
    kind: string;
    link: string;
    pagemap: {
      cse_thumbnail?: ItemThumbnail[];
      cse_image?: { src: string }[];
      metatags:[];
    };
    snippet: string;
    title: string;
  }
  
type ItemThumbnail = {
    height: string;
    src: string;
    width: string;
  }