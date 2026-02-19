export default defineContentScript({
  matches: ['*://*.google.com/*'],
  main() {
    console.log('Hello content.');
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      console.log("Received message in content script:", request);

      if (request.action === "post") {
        console.log("Post action received");
        // Perform actions for post
        sendResponse({ status: "Post action handled" });
      } else if (request.action === "comment") {
        console.log("Comment action received");
        // Perform actions for comment
        sendResponse({ status: "Comment action handled" });
      }
    });

  },
});
