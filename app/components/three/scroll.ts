// Scroll position shared between the page (DOM) and the 3D world, without React re-renders.
// `chapter` is continuous: 0 = hero, 1 = your data, 2 = buyX, 3 = MMCC, 4 = the rest of the page.

export const scroll = {
  chapter: 0,
  /** 0..1 progress through the "your data" chapter, drives the cable pull. */
  unplug: 0,
};

export const CHAPTERS = 5;
