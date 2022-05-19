function validateUrl(entryUrl) {
  let urlregex = /^https?:\/\/[^ "]*$/;
  return urlregex.test(entryUrl);
}

export { validateUrl };
