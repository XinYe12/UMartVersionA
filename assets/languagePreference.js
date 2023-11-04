// Check if the dialog has been displayed before
const dialogDisplayed = localStorage.getItem("dialogDisplayed");
// Get the language dialog element
const languageDialog = document.getElementById('language-dialog');

// Define the minimum and maximum widths
const minWidth = 100;
const maxWidth = 500;

// Calculate the width based on your criteria (e.g., 41% between min and max)
const windowWidth = window.innerWidth;
let width = '41%'; // Default width

if (windowWidth < minWidth) {
  width = `${minWidth}px`;
} else if (windowWidth > maxWidth) {
  width = `${maxWidth}px`;
}

if (!dialogDisplayed) {
  // Show the dialog
  document.getElementById("language-dialog").style.display = "block";

  // Set a flag to indicate that the dialog has been displayed
  localStorage.setItem("dialogDisplayed", "true");
}else{
    document.getElementById("language-dialog").style.display = "none";
}

document.getElementById("close-dialog-button").addEventListener("click", function () {
  document.getElementById("language-dialog").style.display = "none";
  const selectedLanguage = document.getElementById('language-preferences').value;
  if (selectedLanguage === 'zh') {
    // Redirect to the Chinese version of your website
    window.location.href = 'https://umartca.com/zh'; // Replace with your URL
  } else {
    // Redirect to the default language or other languages
    window.location.href = 'https://umartca.com'; // Replace with your URL
  }

});
