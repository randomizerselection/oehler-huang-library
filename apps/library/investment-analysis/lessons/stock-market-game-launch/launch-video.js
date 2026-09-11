/* The launch film is local to this lesson; preserve the shared deck renderer. */
(() => {
  const data = window.INVESTMENT_COURSE.lesson.slides.find(slide => slide.id === 'launch-video');
  const slide = document.querySelector('[data-slide-id="launch-video"]');
  if (!slide || !data?.video) return;
  slide.classList.remove('slide--hero');
  slide.classList.add('smg-video-slide');
  slide.replaceChildren();

  const stage = document.createElement('div');
  stage.className = 'smg-video-stage';
  const video = document.createElement('video');
  video.src = data.video.src;
  video.poster = data.video.poster;
  video.controls = true;
  video.playsInline = true;
  video.preload = 'metadata';
  video.volume = 0.7;
  video.setAttribute('aria-label', 'SFLS Stock Market Game launch film: 64 seconds, bilingual text and music / 苏州外国语学校股票模拟交易启动短片，64秒，中英双语文字及音乐');
  const play = document.createElement('button');
  play.type = 'button';
  play.className = 'smg-video-play';
  play.textContent = '▶ Play launch film / 播放启动短片';
  const poster = document.createElement('img');
  poster.className = 'smg-video-print-poster';
  poster.src = data.video.poster;
  poster.alt = 'Launch film / 启动短片';
  stage.append(video, play, poster);

  const footer = document.createElement('div');
  footer.className = 'smg-video-footer';
  const status = document.createElement('span');
  status.textContent = '64 seconds · Sound on / 64秒 · 请开启声音';
  status.setAttribute('role', 'status');
  const direct = document.createElement('a');
  direct.href = data.video.src;
  direct.target = '_blank';
  direct.rel = 'noopener';
  direct.textContent = 'Open video / 单独打开';
  const next = document.createElement('button');
  next.type = 'button';
  next.textContent = 'Continue to setup → / 开始组队';
  next.addEventListener('click', () => document.querySelector('#nextSlide').click());
  footer.append(status, direct, next);
  slide.append(stage, footer);

  // Video controls must never trigger the deck's click-to-advance shortcuts.
  stage.addEventListener('click', event => event.stopPropagation());
  stage.addEventListener('keydown', event => event.stopPropagation());
  play.addEventListener('click', async () => {
    try { await video.play(); }
    catch { status.textContent = 'Use the video controls or open the video / 请使用视频控件或单独打开视频'; }
  });
  video.addEventListener('play', () => { play.hidden = true; });
  video.addEventListener('ended', () => {
    play.textContent = '↻ Replay / 重新播放';
    play.hidden = false;
    status.textContent = 'Ready to form teams / 现在开始组队';
  });
  video.addEventListener('error', () => {
    status.textContent = 'Video unavailable. Try “Open video”. / 视频暂不可用，请尝试“单独打开”。';
  });
  new MutationObserver(() => {
    if (slide.hidden) video.pause();
  }).observe(slide, {attributes: true, attributeFilter: ['hidden']});
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause();
  });
})();
