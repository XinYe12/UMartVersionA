document.getElementById("open-dialog-button").addEventListener("click", function () {
    document.getElementById("language-dialog").style.display = "block";
  });
  
  document.getElementById("close-dialog-button").addEventListener("click", function () {
    document.getElementById("language-dialog").style.display = "none";
    const selectedLanguage = document.getElementById("language-preferences").value;
    alert("Language preference selected: " + selectedLanguage);
  });
  