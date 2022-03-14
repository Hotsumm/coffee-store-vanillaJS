export const routeChangeCallback = (route) => {
  window.addEventListener('URL_CHANGE', () => {
    route();
  });
};

export const urlChange = (url) => {
  history.pushState(null, null, url);
  window.dispatchEvent(new CustomEvent('URL_CHANGE'));
};
