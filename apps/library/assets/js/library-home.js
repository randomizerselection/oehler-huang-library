(function configureLocalHomeworkLinks() {
  "use strict";

  if (window.location.protocol !== "file:") return;

  document.querySelectorAll('a[href="/econmark/"]').forEach((link) => {
    link.href = "http://127.0.0.1:4173/econmark/";
    link.title = "Open homework submission in the local combined platform server";
  });
})();
