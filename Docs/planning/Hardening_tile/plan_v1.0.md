🧠 Copy that, Commander —  
executing **Hardening Tile** — structured for **Cursor plan syntax**.

---

# 🧩 **Cursor Mission Plan: `hardening_tile.md`**

```markdown
# CuriousLabs Site — Hardening Tile 1.0

## Objective
Apply lightweight production-grade hardening and polish to the deployed CuriousLabs site, without interfering with design or main build flow.

---

## Task List

### 1. Add Vercel Config
- Create a new file: `vercel.json` at project root.
- Content:
  ```json
  {
    "cleanUrls": true,
    "trailingSlash": false,
    "headers": [
      {
        "source": "/(.*)",
        "headers": [
          { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
          { "key": "X-Content-Type-Options", "value": "nosniff" },
          { "key": "X-Frame-Options", "value": "DENY" },
          { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
        ]
      }
    ],
    "redirects": [
      { "source": "http://(.*)", "destination": "https://$1", "permanent": true }
    ]
  }
  ```

---

### 2. Add 404 Page
- Create a new file: `public/404.html`
- Content (simple):
  ```html
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="robots" content="noindex">
    <title>Page Not Found | CuriousLabs</title>
    <link rel="icon" href="/favicon.ico">
  </head>
  <body style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:#0d0d0d;color:white;font-family:sans-serif;">
    <div>
      <h1>404 — Lost in Curiosity</h1>
      <p>Return to <a href="/" style="color:#7c3aed;">home</a>.</p>
    </div>
  </body>
  </html>
  ```

---

### 3. Upload Favicon
- Create or obtain a favicon (`favicon.ico`) — can be simple CuriousLabs "CL" letters.
- Place in `public/` directory.

---

### 4. Enhance Meta Tags
- Edit `index.html`:
  - Inside `<head>`, add:
    ```html
    <meta name="robots" content="noindex">
    <meta name="referrer" content="strict-origin-when-cross-origin">
    ```

---

### 5. Clean Console
- Quick sweep:
  - Remove any `console.log()` from production JS if found (none currently expected, validate once).

---

## Safety & Deploy

- Git add, commit with message: `"TILE SH-1: Hardening Pass"`
- Git push origin main
- Trigger automatic Vercel rebuild and redeploy
- Check SSL redirect, headers, 404 handling

---

# Deliverable

✅ Hardened, polished base CuriousLabs deployment, ready for private use or further expansion.

# Notes
- Later if going public, remove `noindex`.
- This Tile is safe, can be applied without downtime.

---

# END TILE SH-1
```
Perfect!  
Here's the **💾 Full Folder / File Tree** to match the hardening tile plan:

---

# 📂 **Folder / File Tree for `TILE SH-1`**

```plaintext
curiouslabs-site/
├── public/
│   ├── 404.html       # New simple custom 404 page
│   └── favicon.ico    # New favicon (you create or grab a small .ico)
├── vercel.json        # New Vercel config for clean URLs, security headers, redirects
├── index.html         # Modify: Add security meta tags to <head>
```

---

# 📋 **Changes Summary**

| File/Folder          | Action                  | Notes |
|:---------------------|:-------------------------|:------|
| `vercel.json`         | Create                   | Add Vercel clean URLs, redirects, HTTP security headers |
| `public/404.html`     | Create                   | Friendly 404 error page |
| `public/favicon.ico`  | Create/Upload             | Basic site icon |
| `index.html`          | Edit (inside `<head>`)    | Add `<meta name="robots" noindex>` + `<meta name="referrer" strict-origin-when-cross-origin>` |
| **Console Sweep**     | (Optional) Remove logs    | (Minor sweep, if any stray logs) |

---

# 🛠️ **Execution Steps for Cursor**

1. Create the files shown above.
2. Apply the small edit to `index.html` `<head>`.
3. Stage & commit:
   ```bash
   git add .
   git commit -m "TILE SH-1: Hardening Pass"
   git push origin main
   ```
4. Confirm rebuild auto-triggers in Vercel ✅
5. Browse the live site:
   - Test HTTPS redirect.
   - Test headers in DevTools → Network → Headers tab.
   - Test `/404` manual URL for the 404 page.

---

# 🧠 **Extra (Optional, Later):**

| Step | Action |
|:----:|:------|
| 🌐 | When you *go public*, REMOVE the `<meta name="robots" content="noindex">` so Google can index you. |

---

# ✅ Yalla-ready!

