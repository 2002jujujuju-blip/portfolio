document.addEventListener("DOMContentLoaded", () => {
  // 横滑区：滚轮纵向 -> 横向滚动
  document.querySelectorAll(".hscroll").forEach((scroller) => {
    scroller.addEventListener(
      "wheel",
      (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          e.preventDefault();
          scroller.scrollLeft += e.deltaY;
        }
      },
      { passive: false }
    );
  });
});

// Drawer helpers
function openDrawer(drawer) {
  drawer.classList.add("is-open");
  drawer.setAttribute("aria-hidden", "false");
  document.documentElement.style.overflow = "hidden"; // 锁页面滚动
}

function closeDrawer(drawer) {
  drawer.classList.remove("is-open");
  drawer.setAttribute("aria-hidden", "true");
  document.documentElement.style.overflow = ""; // 恢复滚动
}

// Drawer open / close
document.addEventListener("click", (e) => {
  // open
  const openBtn = e.target.closest("[data-drawer-open]");
  if (openBtn) {
    const sel = openBtn.getAttribute("data-drawer-open");
    const drawer = document.querySelector(sel);
    if (!drawer) return;
    openDrawer(drawer);
    return;
  }

  // close（用 closest 更稳）
  const closer = e.target.closest("[data-drawer-close]");
  if (closer) {
    const drawer = closer.closest(".drawer");
    if (!drawer) return;
    closeDrawer(drawer);
  }
});

// ESC 关闭
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  document.querySelectorAll(".drawer.is-open").forEach((drawer) => {
    closeDrawer(drawer);
  });
});

// Hobbies：自动给图片标注横竖（land / port）
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".hobby-gallery img").forEach((img) => {
    const mark = () => {
      const w = img.naturalWidth || img.width;
      const h = img.naturalHeight || img.height;
      img.classList.remove("is-land", "is-port");
      if (w && h) img.classList.add(w >= h ? "is-land" : "is-port");
    };

    if (img.complete) mark();
    else img.addEventListener("load", mark, { once: true });
  });
});

const tocFab = document.getElementById("tocFab");
const tocDrawer = document.getElementById("tocDrawer");
const tocMask = document.getElementById("tocMask");
const tocClose = document.getElementById("tocClose");

function openTOC(){
  tocDrawer.classList.add("is-open");
  tocMask.classList.add("is-open");
}

function closeTOC(){
  tocDrawer.classList.remove("is-open");
  tocMask.classList.remove("is-open");
}

tocFab.addEventListener("click", openTOC);
tocClose.addEventListener("click", closeTOC);
tocMask.addEventListener("click", closeTOC);

document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector("#typewriter");
  if (!el) return;

  // 尊重系统“减少动效”
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const raw = el.getAttribute("data-text") || "";
  // 把 <br> 作为换行 token 处理
  const tokens = raw.split(/(<br\s*\/?>)/gi).filter(Boolean);

  let tokenIndex = 0;
  let charIndex = 0;

  // 可调参数（更像 iPhone：略快、到换行稍停顿）
 const speed = 90;       // 每个字间隔（原来55，现在更慢更有质感）
const linePause = 420;  // 换行停顿更明显
const startDelay = 260; // 开始前停顿

  if (reduceMotion) {
    // 不做动画，直接显示完整
    el.innerHTML = raw;
    return;
  }

  el.innerHTML = ""; // 清空开始打字

  const typeNext = () => {
    if (tokenIndex >= tokens.length) return;

    const token = tokens[tokenIndex];

    // 处理换行
    if (/^<br\s*\/?>$/i.test(token)) {
      el.innerHTML += "<br>";
      tokenIndex++;
      charIndex = 0;
      setTimeout(typeNext, linePause);
      return;
    }

    // 普通文本逐字输出
    if (charIndex < token.length) {
      el.innerHTML += token.charAt(charIndex);
      charIndex++;
      setTimeout(typeNext, speed);
    } else {
      tokenIndex++;
      charIndex = 0;
      setTimeout(typeNext, 120); // 每段之间小停顿
    }
  };

  setTimeout(typeNext, startDelay);
});

const heroTitle = document.querySelector('.hero-title');

setTimeout(() => {
  heroTitle.classList.add('reveal');
}, 1200); // 时间可以改大一点让深色停留更久
document.querySelector(".hero-title").classList.add("colorful");
