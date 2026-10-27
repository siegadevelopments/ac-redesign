// Media gates for the opening chapter's motion. They must match the
// html.motion media blocks in src/app/globals.css: the CSS paints the start
// state, StoryMotion scrubs away from it and GrainCanvas animates only here.
export const MOTION_QUERY = "(prefers-reduced-motion: no-preference) and (min-height: 560px)";
export const NARROW_QUERY = "(max-width: 767.98px)";
