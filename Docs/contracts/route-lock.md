# 🔐 Route Lock: CuriousLabs Homepage Structure

## Main Route
- `/` → `DevV4CosmicPage`
  - Status: ✅ Official Homepage
  - Promoted manually on [Date/Time Stamp]

## Legacy Routes
- `/legacy-home` → `Home`
  - Preserved as historical backup
- `/v4`, `/dev/v4-cosmic` → Duplicate, not used in prod
  - Should be removed unless used for testing

## Do Not:
- Revert to `Home` on `/`
- Mount multiple pages to `/`
- Reintroduce animation-heavy layouts on non-cosmic versions

## Confirmation Logs
- Verified live at: https://curiouslabs-site.vercel.app/
- Current DOM node count: 1,800–2,200
- Lighthouse Mobile: 91
- Desktop: 94

This route config is now locked as LAW.
