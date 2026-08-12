(function configureLocalHomeworkLinks() {
  "use strict";

  if (window.location.protocol !== "file:") return;

  document.querySelectorAll('a[href="/mark/"]').forEach((link) => {
    link.href = "http://127.0.0.1:4173/mark/";
    link.title = "Open homework submission in the local platform server";
  });
})();
