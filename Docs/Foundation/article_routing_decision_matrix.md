# 🔄 CuriousLabs Routing Decision Matrix

---

# 📌 Overview

As the CuriousLabs portal scales, we must finalize whether to:

- Use **React Router** (dynamic single-page routing)
- Use **Static HTML Rewrites** (pure static with Vercel routing)

This matrix evaluates both options against the lab’s priorities.

---

# 🥇 Decision Matrix

| Criteria | React Router | Static HTML Rewrites |
|:---------|:-------------|:---------------------|
| **SEO Optimization** | ⚠️ Riskier (requires SSR/Pre-render) | ✅ Strong (each page real HTML) |
| **UX (Smoothness)** | ✅ Instant transitions | ⚠️ Full reloads between pages |
| **Performance (Core Web Vitals)** | ✅ Good if optimized | ✅ Excellent (native pages) |
| **Routing Control (Scroll Restoration, Metadata)** | ✅ Full control via Helmet, hooks | ⚠️ Limited, manual per page |
| **Complex Navigation (Product Submenus, Blog Pagination)** | ✅ Easy via nested routes | ⚠️ Requires multiple static exports |
| **Error Handling (404 Pages)** | ✅ Handled in Router | ✅ Handled by Vercel config |
| **Scalability (Adding New Pages)** | ✅ Fast and flexible | ⚠️ Manual, page-by-page |
| **CMS / Blog Compatibility** | ✅ Works cleanly with dynamic content | ⚠️ Requires pre-rendering manually |
| **Analytics Integration** | ✅ Smooth (single page load) | ✅ Smooth (each HTML page tracked) |
| **Simplicity of Maintenance** | ⚠️ Router needs config sync | ✅ Static, no dynamic code |

---

# 🧠 Summary Evaluation

| Profile | Result |
|:--------|:------|
| **SEO-First Strategy** | ✅ Static HTML Rewrites win |
| **Product/App Feel Strategy** | ✅ React Router wins |

---

# 🔄 Final Commander Recommendation

**Primary Route:** **React Router**

**Why:**
- Modular growth
- Smooth transitions between sections
- Future blog and CMS integration
- Dynamic metadata control (Helmet)
- Retains single codebase simplicity

**Secondary Backup:** (If SEO becomes mission-critical)
- Layer Vercel Pre-rendering / ISR over select pages
- Investigate partial hybrid SSG-SSR fallback

---

# 🔹 Immediate Tactical Next Steps

- [x] **Keep React Router fully integrated**
- [x] Ensure meta tags and OpenGraph via Helmet
- [x] Add custom `404.jsx` route page
- [x] Harden `vercel.json` for fallback safety

---

# 📲 Updated: `April 29, 2025 — 17:05 UTC+7`

---

