;(function (w) {
  if (w.__clearbit_tagsjs) {
    w.console &&
      w.console.error &&
      w.console.error("Clearbit tags.js snippet included twice.");
    return;
  }

  w.__clearbit_tagsjs = true;

  

  var destjs = document.createElement("script");
  destjs.src = 'https://x.clearbitjs.com/v2/pk_b6f84287a96485389977d6defc665fb9/destinations.min.js';
  destjs.referrerPolicy = 'strict-origin-when-cross-origin';

  var first = document.getElementsByTagName("script")[0];
  destjs.async = true;
  first.parentNode.insertBefore(destjs, first);


  
    
      var tracking = (w.clearbit = w.clearbit || []);

      
      w.clearbit._writeKey = 'pk_b6f84287a96485389977d6defc665fb9';
      w.clearbit._apiHost = 'x.clearbitjs.com';

      

      if (!tracking.initialize) {
        if (tracking.invoked) {
          w.console &&
            console.error &&
            console.error("Clearbit tracking snippet included twice.");
        } else {
          (tracking.invoked = !0),
            (tracking.methods = [
              "trackSubmit",
              "trackClick",
              "trackLink",
              "trackForm",
              "pageview",
              "identify",
              "reset",
              "group",
              "track",
              "ready",
              "alias",
              "page",
              "once",
              "off",
              "on",
            ]),
            (tracking.factory = function (e) {
              return function () {
                var r = Array.prototype.slice.call(arguments);
                return r.unshift(e), tracking.push(r), tracking;
              };
            });

          for (var r = 0; r < tracking.methods.length; r++) {
            var o = tracking.methods[r];
            tracking[o] = tracking.factory(o);
          }

          var clearbitjs = document.createElement("script");
          clearbitjs.src = 'https://x.clearbitjs.com/v2/pk_b6f84287a96485389977d6defc665fb9/tracking.min.js';
          clearbitjs.referrerPolicy = 'strict-origin-when-cross-origin';

          var first = document.getElementsByTagName("script")[0];
          clearbitjs.async = true;
          first.parentNode.insertBefore(clearbitjs, first);
        }
      }
    

    
      tracking.page();
    

    
  

  
    w.ClearbitForms = {};
    w.ClearbitForms.forms = [];
    w.ClearbitForms.addForm = function($form) {
      var form = $form[0];

      if (typeof w.ClearbitForms.onFormReady === "function") {
        w.ClearbitForms.onFormReady(form);
      } else {
        w.ClearbitForms.forms.push(form);
      };
    };
    w.ClearbitForms.messageCallbacks = []
    w.ClearbitForms.handleWindowMessage = function(event) {
      if (typeof w.ClearbitForms.onWindowMessage === "function") {
        w.ClearbitForms.onWindowMessage(event)
      } else {
        w.ClearbitForms.messageCallbacks.push(event)
      }
    }

    var formsjs = document.createElement("script");
    formsjs.async = true;

    var path = window.location.pathname;
    if (path && path.charAt(0) != '/') {
      path = '/' + path;
    }
    formsjs.src = 'https://x.clearbitjs.com/v1/pk_b6f84287a96485389977d6defc665fb9/forms.js?page_path=' + encodeURIComponent(path);
    formsjs.referrerPolicy = 'strict-origin-when-cross-origin';
    first.parentNode.insertBefore(formsjs, first);
    w.addEventListener('message', w.ClearbitForms.handleWindowMessage);
  
})(window);
