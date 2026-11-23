import type { Region } from "@/lib/constants";

/**
 * The region banner offers the other market's page: a US visitor on the
 * homepage is offered /us, and an Australian visitor on /us is offered /.
 * It never redirects. Copy follows the spelling of the page it appears on.
 */
export const REGION_BANNER: Record<
  Region,
  { href: string; message: string; action: string }
> = {
  us: {
    href: "/us",
    message: "Looks like you're in the US. We have a page for US businesses.",
    action: "View the US page",
  },
  au: {
    href: "/",
    message: "Looks like you're in Australia. We have a page for Australian businesses.",
    action: "View the Australian page",
  },
};

export const REGION_BANNER_LABEL = "Choose your region";
export const REGION_BANNER_DISMISS_LABEL = "Dismiss";

/** localStorage key set once a visitor accepts or dismisses the banner. */
export const REGION_BANNER_STORAGE_KEY = "ac:region-banner";
