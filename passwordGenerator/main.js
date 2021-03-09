const generateBtn = document.querySelector('#generateBtn');
const output = document.querySelector('#result');
const clipboard = document.querySelector('#clipboard');

generateBtn.addEventListener('click', () => {
  const pwLength = document.querySelector('#pw-length').value;
  const upperLetter = document.querySelector('#upper-letter').checked;
  const lowerLetter = document.querySelector('#lower-letter').checked;
  const includeNumber = document.querySelector('#include-number').checked;
  const includeSymbol = document.querySelector('#include-symbol').checked;
  options = { upperLetter, lowerLetter, includeNumber, includeSymbol };

  output.innerHTML = passwordGenerate(pwLength, options);
});
clipboard.addEventListener('click', () => {
  if (!output.textContent) {
    return;
  }
  // function copy password clipboard
  // ~~
  alert('Password has been copied to clipboard');
});
function typeGenerate(options) {
  let cnt = 0;
  let trueOptions = [];
  for (let key in options) {
    if (options[key]) {
      cnt++;
      trueOptions.push(key);
    }
  }
  // console.log(trueOptions);
  return { trueOptions, cnt };
}

function upperLetterGenerate() {
  return String.fromCharCode(Math.floor(Math.random() * 26 + 65));
}

function lowerLetterGenerate() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function numberGenerate() {
  return Math.floor(Math.random() * 10);
}

function symbolGenerate() {
  const symbols = '!@#$%^&*(){}[]=<>/,.';
  return symbols[Math.floor(Math.random() * symbols.length)];
}

function passwordGenerate(pwLength, options) {
  let result = '';
  const typeList = typeGenerate(options);
  // console.log(typeList);
  for (let i = 0; i < pwLength; i++) {
    let whichType = Math.floor(Math.random() * typeList.cnt);
    // console.log(typeList);
    switch (typeList.trueOptions[whichType]) {
      case 'upperLetter':
        result += upperLetterGenerate();
        break;
      case 'lowerLetter':
        result += lowerLetterGenerate();
        break;
      case 'includeNumber':
        result += numberGenerate();
        break;
      case 'includeSymbol':
        result += symbolGenerate();
        break;
      default:
        return 'Something went wrong...';
    }
  }
  // console.log(result);
  return result;
}
