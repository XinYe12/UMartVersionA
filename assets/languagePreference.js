// Check if the dialog has been displayed before
const dialogDisplayed = localStorage.getItem("dialogDisplayed");

if (!dialogDisplayed) {
  // Show the dialog
  document.getElementById("language-dialog").style.display = "block";

  // Set a flag to indicate that the dialog has been displayed
  localStorage.setItem("dialogDisplayed", "true");
}

document.getElementById("close-dialog-button").addEventListener("click", function () {
  document.getElementById("language-dialog").style.display = "none";
  const selectedLanguage = document.getElementById("language-preferences").value;
  alert("Language preference selected: " + selectedLanguage);
});
