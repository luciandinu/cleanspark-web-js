// AlpineJS FIX
function alpineJSFix() {
  var allAlpine = document.querySelectorAll('[x-fix]');
  allAlpine.forEach(function (evEl) {
    evEl.getAttributeNames().forEach(function (elAttr) {
      //Rename Attr function
      function renameAttr(oldAttr, newAttr) {
        if (newAttr) {
          evEl.setAttribute(newAttr, evEl.getAttribute(oldAttr));
          evEl.removeAttribute('x-fix');
          evEl.removeAttribute(oldAttr);
        }
      }
      function recomposeSubOptionFromString(string) {
        const wordRegex = /(?=[A-Z])/;
        var result = string.split(wordRegex);
        if (result.length > 1) {
          return result.join('-').toLowerCase();
        }
        return string;
      }
      //Replaces
      if (elAttr.startsWith('x-') && elAttr != 'x-fix') {
        var newAttrArray = elAttr.split('-');
        var newAttrKey = newAttrArray[0] + '-' + newAttrArray[1];
        if (newAttrArray.length > 2) {
          newAttrKey =
            newAttrKey +
            ':' +
            newAttrArray.slice(2, newAttrArray.length).join('.');
        }
        //console.log(newAttrKey);
        renameAttr(elAttr, recomposeSubOptionFromString(newAttrKey));
      }
    });
  });
}

//Raise an event is the location has changed
function registerLocationChangeEvents() {
  let oldPushState = history.pushState;
  history.pushState = function pushState() {
    let ret = oldPushState.apply(this, arguments);
    window.dispatchEvent(new Event('pushstate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
  };

  let oldReplaceState = history.replaceState;
  history.replaceState = function replaceState() {
    let ret = oldReplaceState.apply(this, arguments);
    window.dispatchEvent(new Event('replacestate'));
    window.dispatchEvent(new Event('locationchange'));
    return ret;
  };

  window.addEventListener('popstate', () => {
    window.dispatchEvent(new Event('locationchange'));
  });
}

//Re-apply fixes on location change
window.addEventListener('locationchange', function () {
  alpineJSFix();
});

//Load JS - Init
window.addEventListener('DOMContentLoaded', function (e) {
  alpineJSFix();
  registerLocationChangeEvents();
});

// Paddle - CleanSpark
function openCheckout() {
  Paddle.Checkout.open({
    product: 526862,
    allowQuantity: false,
    marketingConsent: 1,
  });
}
