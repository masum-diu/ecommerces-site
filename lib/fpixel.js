export const FB_PIXEL_ID = "359252785196040";

export const pageview = () => {
  window.fbq("track", "PageView");
  window.fbq("track", "ViewContent");
};

// https://developers.facebook.com/docs/facebook-pixel/advanced/
export const event = (name, options = {}) => {
  window.fbq("track", name, options);
};
