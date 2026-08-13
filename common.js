// ============================================================
//  页面渲染脚本 —— 一般不用动这里
//  加视频改 config.js，换群二维码改每个 html 文件最下面的配置
// ============================================================

// ----- 渲染视频区 -----
(function renderVideos() {
  const area = document.getElementById("video-area");
  if (!area) return;

  if (!VIDEO_LIST || VIDEO_LIST.length === 0) {
    area.innerHTML = '<div class="video-missing">暂无视频</div>';
    return;
  }

  VIDEO_LIST.forEach(function (v) {
    const item = document.createElement("div");
    item.className = "video-item";

    const title = document.createElement("div");
    title.className = "v-title";
    title.textContent = v.title;
    item.appendChild(title);

    const video = document.createElement("video");
    video.src = v.file;
    video.controls = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("preload", "metadata");

    // 视频文件不存在时，显示"待上传"提示
    video.addEventListener("error", function () {
      const miss = document.createElement("div");
      miss.className = "video-missing";
      miss.innerHTML =
        "视频还没有上传哦～<br>（把视频文件 " + v.file + " 放进 videos 文件夹就会显示）";
      item.replaceChild(miss, video);
    });

    item.appendChild(video);
    area.appendChild(item);
  });
})();

// ----- 渲染群二维码区 -----
(function renderQR() {
  const area = document.getElementById("qr-area");
  if (!area || typeof QR_LIST === "undefined") return;

  QR_LIST.forEach(function (q) {
    const block = document.createElement("div");
    block.className = "qr-block";

    const label = document.createElement("div");
    label.className = "qr-label " + q.type; // type: qq 或 wx
    label.textContent = q.label;
    block.appendChild(label);

    const frame = document.createElement("div");
    frame.className = "qr-frame";

    const img = document.createElement("img");
    img.src = q.img;
    img.alt = q.label;
    img.addEventListener("error", function () {
      const miss = document.createElement("div");
      miss.className = "qr-missing";
      miss.innerHTML =
        "二维码还没有放上来哦～<br>（把图片 " + q.img + " 放进 images 文件夹就会显示）";
      block.replaceChild(miss, frame);
    });
    frame.appendChild(img);
    block.appendChild(frame);

    const tip = document.createElement("div");
    tip.className = "qr-tip";
    tip.textContent = q.tip;
    block.appendChild(tip);

    area.appendChild(block);
  });
})();

// ----- 滚动渐入动画 -----
(function revealOnScroll() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach(function (e) { e.classList.add("show"); });
    return;
  }
  const ob = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add("show");
        ob.unobserve(en.target);
      }
    });
  }, { threshold: 0.06 });
  els.forEach(function (e) { ob.observe(e); });
})();
