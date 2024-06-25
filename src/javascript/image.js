function checkIfImageExists(url, callback) {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);
  else {
    img.onload = () => {
      callback(true);
    };

    img.onerror = () => {
      callback(false);
    };
  }
}

// https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg

export { checkIfImageExists };
