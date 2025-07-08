// la chaîne finale affichera  "____/''''\\____"
const landscape = () => {
    let result = "";
  
    const flat = (x) => {
      for(let count = 0; count < x; count++) {
        result += "_";
      }
    }
  
    const mountain = (x) => {
      result += "/";
      for(let counter = 0; counter < x; counter++) {
        result += "'";
      }
      result += "\\";
    }
  
    flat(4);
    mountain(4);
    flat(4);
  
    return result;
  }
  
  landscape();

// EX 2
// affiche   13

// EX 3

// affiche 31

// EX 4

// affiche 17

// EX 5

// affiche 16