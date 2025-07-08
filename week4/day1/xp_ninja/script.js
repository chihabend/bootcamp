const mergeWords = (string) => (nextString) => {
    if (nextString === undefined) {
      return string;
    } else {
      return mergeWords(string + ' ' + nextString);
    }
  };
  