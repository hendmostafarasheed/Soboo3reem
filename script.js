(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Add decorative floating bubbles to both pages.
  document.querySelectorAll(".bubble-layer").forEach((layer) => {
    if (reduceMotion) return;
    for (let i = 0; i < 18; i++) {
      const bubble = document.createElement("span");
      bubble.className = "bubble";
      bubble.style.setProperty("--size", `${10 + Math.random() * 27}px`);
      bubble.style.setProperty("--left", `${Math.random() * 96}%`);
      bubble.style.setProperty("--duration", `${7 + Math.random() * 9}s`);
      bubble.style.setProperty("--delay", `${-Math.random() * 14}s`);
      bubble.style.setProperty("--drift", `${-35 + Math.random() * 70}px`);
      layer.appendChild(bubble);
    }
  });

  // Quick white flash when navigating between the two pages.
  document.querySelectorAll('a[href="page2.html"], a[href="index.html"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const target = link.getAttribute("href");
      document.body.classList.add("flash-out");
      window.setTimeout(() => { window.location.href = target; }, reduceMotion ? 0 : 190);
    });
  });
  document.body.classList.add("flash-in");

  // Confirmation: opens WhatsApp with a ready-to-send confirmation message.
  const confirmButton = document.querySelector('[data-action="confirm"]');
  if (confirmButton) {
    confirmButton.addEventListener("click", () => {
      const message = "أؤكد حضوري سبوع ريم الشرنوبي يوم السبت 1 نوفمبر 2025 الساعة 6:00 مساءً.";
      const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  }

  // Share the invitation URL using the device's share sheet; fallback to copy link.
  const shareButton = document.querySelector('[data-action="share"]');
  if (shareButton) {
    shareButton.addEventListener("click", async () => {
      const shareData = {
        title: "دعوة سبوع ريم الشرنوبي",
        text: "يسعدنا دعوتكم لحضور سبوع ريم الشرنوبي.",
        url: window.location.href
      };
      try {
        if (navigator.share) {
          await navigator.share(shareData);
        } else if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(shareData.url);
          alert("تم نسخ رابط الدعوة. يمكنك الآن مشاركته.");
        } else {
          window.prompt("انسخي رابط الدعوة لمشاركته:", shareData.url);
        }
      } catch (error) {
        if (error && error.name !== "AbortError") {
          window.prompt("انسخي رابط الدعوة لمشاركته:", shareData.url);
        }
      }
    });
  }
})();