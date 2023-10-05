  const overlayDiv = document.createElement("div");
  overlayDiv.style.position = "fixed";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.width = "100%";
  overlayDiv.style.height = "100%";
  overlayDiv.style.background = "rgba(255, 0, 0, 0.8)"; // Change the background color to red (rgba(255, 0, 0, 0.8))
  overlayDiv.style.zIndex = "9999";
  document.body.appendChild(overlayDiv);

  // Disable scrolling
  document.body.style.overflow = "hidden";

  // Create a div for the message text
  const messageDiv = document.createElement("div");
  messageDiv.style.position = "absolute";
  messageDiv.style.top = "50%";
  messageDiv.style.left = "50%";
  messageDiv.style.transform = "translate(-50%, -50%)";
  messageDiv.style.textAlign = "center";
  messageDiv.style.fontSize = "24px";
  messageDiv.style.color = "white"; // Set text color to white for better visibility on red background
  messageDiv.innerHTML = 'You have been flagged, please go back to the <a href="https://www.google.com/">exam</a> to avoid being flagged';
  overlayDiv.appendChild(messageDiv);
