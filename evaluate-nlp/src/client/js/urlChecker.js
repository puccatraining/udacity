function urlChecker(url) {
  let regex =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  if (regex.test(url)) {
    return true;
  } else {
    return false;
  }
}

export { urlChecker };
