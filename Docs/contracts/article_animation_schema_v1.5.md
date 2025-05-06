🎬 **Affirmative, Commander. Next Operation: Animation Schema v1.5 Lockdown**
📍 `C:\website_build\Docs\planning\new_horizon_v5\animation_schema_v1.5.md`

This doc will serve as your **official motion contract** for CuriousLabs V4 — guiding all motion tuning, visual polish, and performance tradeoffs across the UI.

---

### 🧪 Mission Purpose

This schema replaces the earlier brute-force `0.3s` timing flattening with a more elegant, **% reduction strategy** that **preserves dramatic beats** while eliminating jitter and lag.

---

## 🧭 Animation Schema v1.5 – Contract Structure

```md
# 🎞️ Animation Schema v1.5 — CuriousLabs V4

📍 Path: C:\website_build\Docs\planning\new_horizon_v5\animation_schema_v1.5.md  
📅 Status: LOCKED — Pre-final test pass  

---

## 🎯 Global Design Philosophy

- Preserve **rhythm and weight** of visual interactions
- Eliminate delay **jitter** on slow devices
- Default rule: Reduce original durations by **10–20% max**, no flattening
- All transitions should feel **natural, weighted, and layered**

---

## ⏱ Motion Timing Reference

| Element / Action            | Old Timing            | v1.5 Target Timing       | Strategy            | Notes                       |
|-----------------------------|------------------------|--------------------------|---------------------|-----------------------------|
| 🌌 Starfield                | `1.5–4s`               | `1.2–3.5s`               | 15% reduction       | No jitter on load           |
| 🔦 Beam Effects             | `4s`, `8s`, `10s`      | `3.4s`, `7s`, `8.5s`     | 15–20% reduction    | Preserve cinematic tempo    |
| 👾 Bot Expand/Collapse      | `0.3s spring`          | `0.25s easeOut`         | Curve change only   | Improve responsiveness      |
| 💫 Floating Particles       | `1.2–4s`               | `1.0–3.4s`               | Soft reduction      | Avoid slow fade-in overlap  |
| 🎨 Background Gradient Loop | `8s`                   | `6.5s`                   | Light shortening    | Maintain ambient pulse      |
| 🔵 Orbital Core Pulse       | `1.5s`                 | `1.25s`                  | 15% tighter         | Prevent visual stall        |
| 🔁 Service Auto-Rotation    | `4–5s` interval        | `3.8s`                   | Smoother transitions| Less delay before next      |
| 📊 Metric Counters          | `1.5s`                 | `1.3s`                   | Faster reveal       | Avoids feeling unresponsive |
| 📦 Card Reveals (SCS3)      | `0.6s, 0.1s stagger`   | `0.45s, 0.1s stagger`    | Minor trim          | Avoid animation pileup      |
| 📁 Tab Switch Transitions   | `0.4s`                 | `0.35s easeOut`         | Keep sharpness      | Prevent slow tab feel       |
| 🧠 Avatar Pulse             | `2s`                   | `1.8s`                   | Visual emphasis     | Subtle, not static          |

---

## 🎭 Components Requiring Manual Tuning

| Component Name        | File                             | Tuning Needed     | Action                |
|-----------------------|----------------------------------|-------------------|-----------------------|
| `HeroPortal`          | `HeroPortal.jsx`                 | ✳️ High Impact    | Ensure entrance drama |
| `HearFromAI`          | `HearFromAI.jsx`                 | ✳️ Moderate       | Tune testimonial speed|
| `ServicesOrbital`     | `ServicesOrbital.jsx`            | ✳️ Moderate       | Adjust orbital timing |
| `ProjectsLogbook`     | `ProjectsLogbook.jsx`            | ✅ OK             | Minimal adjustment    |
| `WhyAIDevCards`       | `WhyAIDevCards.jsx`              | ✅ OK             | Match reveal timing   |
| `FooterExperience`    | `FooterExperience.jsx`           | ✅ OK             | Keep footer subtle    |

> ✅ All other modules follow global schema unless noted above.

---

## 🔄 Future Adjustments

- Add `motion-config.js` utility for central config if reusability becomes critical
- Allow override props via `animationConfig={}` per module
- Enable runtime A/B testing for mobile vs desktop if performance deviates

---

## 📍 Status Flags

* [x] Reviewed and confirmed for all critical components  
* [x] Matches visual flow from dev_v4_cosmic.jsx  
* [ ] Final visual tuning pending for Hero/Testimonial only  

```

---

✅ Commander, ready to clone into:

```
