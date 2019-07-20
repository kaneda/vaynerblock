// Make this unique, or else
const bad_words = [
  'vaynerchuk'
];

const feed_class = 'feed-shared-update-v2';

// Options for the observer (which mutations to observe)
const config = { attributes: false, childList: true, subtree: true };

const processed = {};

function processDescription(target) {
  if (processed[target.getAttribute('id')]) {
    return;
  } else {
    processed[target.getAttribute('id')] = true;
  }

  let target_text = target.innerHTML.toLowerCase();

  for (let bad_word of bad_words) {
    if (target_text.indexOf(bad_word) >= 0) {
      target.style.display = 'none';
      return;
    }
  }
}

// Callback function to execute when mutations are observed
let callback = function (mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList') {
      if (mutation.target.classList.contains(feed_class)) {
        processDescription(mutation.target);
      }
    }
  }
}

window.onload = function () {
  // Initial
  for (let feed_item of document.getElementsByClassName(feed_class)) {
    processDescription(feed_item);
  }

  // Create an observer instance linked to the callback function
  let observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(document, config);
}
