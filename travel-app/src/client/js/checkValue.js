function checkValue(location, selDate) {
  const locCnt = location.length;

  if (locCnt > 0 && selDate) {
    return true;
  } else {
    return false;
  }
}

export { checkValue };
