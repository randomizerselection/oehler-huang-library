window._hmt = window._hmt || [];

window.IGCSE = window.IGCSE || {};
window.IGCSE.track = function(category, action, label, value) {
  if (!category || !action || !Array.isArray(window._hmt)) return;

  const event = ['_trackEvent', String(category), String(action)];
  if (label !== undefined && label !== null) event.push(String(label));
  if (Number.isFinite(value)) event.push(value);

  window._hmt.push(event);
};

(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?49598a729d55e4f8c1402417bb435c44";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
