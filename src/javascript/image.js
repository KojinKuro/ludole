function checkIfImageExists(url) {
  const img = new Image();
  img.src = url;

  if (img.complete) return true;

  img.onload = () => {
    return true;
  };

  img.onerror = () => {
    return false;
  };
}

// https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg

export { checkIfImageExists };
