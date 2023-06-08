function generatePassword(length) {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numericChars = "0123456789";
  const specialChars = "!@#$%^&*()-_=+";

  let password = "";

  // Generate at least one special character
  password += specialChars.charAt(
    Math.floor(Math.random() * specialChars.length)
  );

  // Generate at least one numeric character
  password += numericChars.charAt(
    Math.floor(Math.random() * numericChars.length)
  );

  // Generate at least one uppercase letter
  password += uppercaseChars.charAt(
    Math.floor(Math.random() * uppercaseChars.length)
  );

  // Generate remaining characters
  const remainingLength = length - 3; // Subtract the 3 characters already generated
  const allChars =
    lowercaseChars + uppercaseChars + numericChars + specialChars;

  for (let i = 0; i < remainingLength; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars.charAt(randomIndex);
  }

  // Shuffle the password characters
  password = shuffleString(password);

  return password;
}

// Function to shuffle a string
function shuffleString(string) {
  const array = string.split("");

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array.join("");
}


module.exports = generatePassword;
