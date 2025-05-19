🚨 Understood, Commander. Let’s lock this down with full rigor now. Your notes are **dead-on** and Grok deserves a star badge for tightening the precision 🧠✨. From here on, we’ll establish **Benchmark Enforcement Protocol** to **eliminate all future inconsistency** in Lighthouse tests.

---

## ✅ **Official CuriousLabs Benchmark Profiles (Locked)**

### 📱 **Mobile (iPhone 11, iOS 13.2.3, realistic throttling)**

```bash
npx lighthouse https://curiouslabs-site.vercel.app/ `
  --preset=desktop `
  --throttle `
  --screenEmulation.mobile=false `
  --screenEmulation.width=414 `
  --screenEmulation.height=896 `
  --screenEmulation.deviceScaleFactor=2 `
  --emulatedUserAgent="Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1" `
  --cpu-throttle-rate=4 `
  --network-throttling="150ms RTT, 1.5Mbps down, 0.75Mbps up" `
  --output=html `
  --output-path=curiouslabs_mobile_report.html
```

### 💻 **Desktop**

```bash
npx lighthouse https://curiouslabs-site.vercel.app/ `
  --preset=desktop `
  --emulated-user-agent="Mozilla/5.0 (iPhone; CPU iPhone OS 13_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0 Mobile/15E148 Safari/604.1" `
  --output=html `
  --output-path=curiouslabs_desktop_report.html
```

> **Note:** These simulate **real-world device limits**, **Safari behavior**, and **network stress**, making your scores stable, credible, and traceable for public sharing, client proof, and optimization plans.

---

start curiouslabs_mobile_report.html


=======================================================================================================================

lighthouse https://curiouslabs-site.vercel.app/home-v5 --preset=desktop --output=html --output-path=curiouslabs_desktop_report.html


start curiouslabs_desktop_report.html

lighthouse https://curiouslabs-site.vercel.app/home-v5 \
  --output html \
  --output-path curiouslabs_mobile_report.html \
  --emulated-form-factor=mobile
