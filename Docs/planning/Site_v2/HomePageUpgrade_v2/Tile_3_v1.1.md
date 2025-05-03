

I confirm verbatim that these rules are not just to look at - they are the essence of every edit I make. Each change must follow these guidelines precisely to avoid wasting time and resources.

Based on TILE D3.1 for the CodeLab Card Shell Upgrade, here's my implementation plan:

## Implementation Plan for ServiceCardShell.jsx Upgrade

I will only edit: `src/components/home/v4/ServiceCardShell.jsx` with these precise changes:

1. **Framer Motion Wrapper:**
   - Wrap the card's root element with `<motion.div>`
   - Add the exact hover animation as specified:
     ```js
     whileHover={{ scale: 1.03 }}
     transition={{ duration: 0.25, ease: "easeOut" }}
     ```

2. **Animated Border Layer:**
   - Add `group` class to the card's root element
   - Insert an absolute gradient border layer with:
     ```jsx
     <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/50 to-blue-500/40 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
     ```

3. **Glow/Shadow Enhancement:**
   - Add these exact shadow classes:
     ```
     shadow-md hover:shadow-xl shadow-purple-500/10 hover:shadow-purple-500/30
     ```

4. **Optional Badge Support:**
   - Add conditional rendering for the badge/tag:
     ```jsx
     {tag && (
       <div className="absolute top-3 left-3 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
         {tag}
       </div>
     )}
     ```

5. **Card Interactivity:**
   - Make the entire card clickable by wrapping in the appropriate element based on the props

## Rules I Will Follow:

1. I will only modify `src/components/home/v4/ServiceCardShell.jsx` and touch nothing else
2. I will use TailwindCSS classes only, no custom CSS
3. I will use Framer Motion only for the specified hover/tap animations
4. I will not change any layout or text - this is a visual upgrade only
5. I will not edit any modal components or routes
6. I will implement exactly what is requested, no more and no less
7. I will preserve all existing functionality
8. I will not overcomplicate this straightforward task
9. I will make targeted, minimal changes to achieve the requested outcome

After implementation, the card will have a subtle lift effect on hover, a gradient border animation, enhanced shadows, and optional badge support.




🧠 **CURSOR DIRECTIVE: TILE D3.1 – CodeLab Card Shell Upgrade**
(*Component polish and hover interaction refinement for CuriousLabs CodeLab*)

---

## 🔧 Scope

**Edit only:**
`src/components/home/v4/ServiceCardShell.jsx`

## 🧱 Implementation Tasks

1. **Framer Motion Wrapper:**

   * Wrap entire card with `<motion.div>`
   * Add hover animation:

     ```js
     whileHover={{ scale: 1.03 }}
     transition={{ duration: 0.25, ease: "easeOut" }}
     ```

2. **Animated Border Layer (On Hover):**

   * Add `group` class to the card root
   * Insert `absolute` gradient border layer using Tailwind utilities
     Example:

   ```jsx
   <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/50 to-blue-500/40 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
   ```

3. **Glow/Shadow Enhancement:**

   * Add these classes to the card container:

     ```
     shadow-md hover:shadow-xl shadow-purple-500/10 hover:shadow-purple-500/30
     ```

4. **Optional Badge:**

   * If `tag` or `badge` prop exists, render top-left tag

     ```jsx
     <div className="absolute top-3 left-3 bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full shadow-sm">
       {tag}
     </div>
     ```

5. **Card Interactivity:**

   * Wrap content in `<button>` or `<a>` tag depending on type
   * Make entire card clickable (not just text)

---

## 🧪 Validation

* Run `npm run dev`
* Open `/dev/v4-cosmic` or navigate to `/codelab`
* Hover over each card:

  * Gradient border should appear subtly
  * Card should lift slightly
  * Modal design style should match visually

---

## ⚠️ Ruleset

✅ TailwindCSS only (no external styles)
✅ Framer Motion allowed for hover/tap animations
🚫 No layout or text changes — this TILE is for visuals only
🚫 Do not edit modal components or routes

---

🧨 Proceed, Cursor. Bring elegance to the CodeLab surface.
