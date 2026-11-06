const menu = document.querySelector("#menuBtn");
if (menu)
  menu.addEventListener("click", () => {
    const l = document.querySelector("#navLinks");
    l.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(l.classList.contains("open")));
  });
document
  .querySelectorAll("#navLinks a")
  .forEach((a) =>
    a.addEventListener("click", () =>
      document.querySelector("#navLinks")?.classList.remove("open"),
    ),
  );
const quick = document.querySelector("#quickForm");
if (quick)
  quick.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = new FormData(quick);
    const u = new URL("quote.html", location.href);
    for (const [k, v] of d.entries()) if (v) u.searchParams.set(k, v);
    location.href = u.href;
  });
const params = new URLSearchParams(location.search);
for (const [k, v] of params.entries()) {
  const el = document.querySelector(`[name="${CSS.escape(k)}"]`);
  if (el) el.value = v;
}

const form = document.querySelector("#quoteForm");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!form.reportValidity()) return;

    const status = document.querySelector("#formStatus");
    const button = form.querySelector('[type="submit"]');

    const data = new FormData(form);
    data.append("access_key", "a14eb270-835e-4b33-b30f-72a18373297d");
    data.append("subject", "Crown Way Moving - New Quote Request");
    data.append("from_name", "Crown Way Moving Website");

    button.disabled = true;
    status.textContent = "Sending your quote request...";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });

      const result = await response.json();

      if (response.ok && result.success) {
        status.textContent =
          "Thank you! Your quote request has been sent successfully. We will contact you soon.";
        form.reset();
      } else {
        status.textContent =
          "Sorry, your request could not be sent. Please call (647) 629-8535.";
      }
    } catch (error) {
      status.textContent =
        "Connection error. Please try again or call (647) 629-8535.";
    } finally {
      button.disabled = false;
    }
  });
}

