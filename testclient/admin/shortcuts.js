function handleTabKey() {
  const chatListItems = document.querySelectorAll('#chatList li');
  if (chatListItems.length === 0) return;

  let selectedIndex = Array.from(chatListItems).findIndex((item) =>
    item.classList.contains('selected')
  );
  selectedIndex = (selectedIndex + 1) % chatListItems.length; // Move to the next chat, loop back if at the end

  const nextChat = chatListItems[selectedIndex];
  nextChat.click(); // Trigger the click event to select the next chat
}

function handleShiftEnter(e) {
  if (e.shiftKey && e.key === 'Enter') {
    e.preventDefault(); // Prevent default to avoid new line in textarea
    // Logic to send the message
    // Assuming you have a 'sendAdminMessage' function
    sendAdminMessage();
  }
}

function setupShortcuts() {
  console.log('asdasdasd');
  document.addEventListener('keydown', (e) => {
    console.log('key pressed');
    if (e.key === 'Tab' && !e.shiftKey) {
      console.log('key is tab');
      e.preventDefault(); // Prevent default to avoid losing focus from the current element
      handleTabKey();
    }

    if (e.key === 'Enter' && e.shiftKey) {
      handleShiftEnter(e);
    }
  });
}

window.addEventListener('load', setupShortcuts);
