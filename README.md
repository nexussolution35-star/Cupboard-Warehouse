# Cupboard Warehouse — Kitchen Remodeling Website

A static, fully self-hosted marketing site for **Cupboard Warehouse**, a Southern
California custom kitchen, cabinet and wardrobe studio.

> **Think Kitchens. Think Cupboard Warehouse.**

## How this site was built

- **Conversion architecture** is replicated from the master template (Website A — a
  roofing contractor framework): the exact homepage section sequence, every form, trust
  component and call-to-action is preserved, then re-written for kitchen remodeling.
- **Visual language** is drawn from the inspiration site (Website B — FX Cabinets
  Warehouse): light/airy layout, wide-tracked Montserrat headings, sage/forest greens,
  soft image treatments with shadows, parallax sub-page banners and clean card styling.
- **Brand colors** come from the Cupboard Warehouse logo (forest green `#2c7a34`, pale
  ring green `#cfe8b9`), harmonized with Website B's sage palette.
- **Imagery** was harvested from Website B's kitchen photography and processed locally.
- **Logo** was recreated as crisp SVG (`assets/logo.svg`, `assets/logo-full.svg`).

**100% self-hosted — no external runtime dependencies.** Fonts (Montserrat, PT Sans) are
bundled as woff2; CSS, JS and images are all local. The only external calls are the
Google Maps embeds on the contact/area pages.

## Homepage section sequence (conversion framework)

1. Header — top bar + sticky nav (Services dropdown, phone, CTA) + mobile menu
2. **Hero** — headline, rating badges, trust checklist, 5-minute callback quote form
3. **Trust strip + certification badges**
4. **Reviews** (5.0★ Google, testimonials)
5. **About** (owner-led story + stats)
6. **Services** (7-service grid)
7. **Why Choose Us** (icon grid)
8. **Gallery** (project carousel)
9. **Process** (four steps + brand marquee)
10. **Financing / Offers** (veterans discount + financing)
11. **Blog** (3 featured articles)
12. **FAQ** (accordion)
13. **Service Area** (cities + map)
14. **Final CTA** (logo + quote form)
15. Footer (5 columns + trust row) + mobile sticky call/quote bar

## Pages (26 total)

```
index.html              Home (full conversion framework)
about.html              Owner story + values
services.html           Service overview + 7 detail pages (services/*.html)
gallery.html            Project grid
financing.html          Offers + financing FAQ
blog.html               + 3 long-form articles (blog/*.html)
contact.html            Form + hours + map
service-areas.html      + 6 city pages (service-areas/*.html)
privacy.html  terms.html
assets/                 styles.css, site.js, fonts/, work/, blog/, logo.svg, favicon
```

## Local preview

```
python -m http.server 8000
# then open http://localhost:8000
```

## Wiring it up

The quote forms use a placeholder `alert()` handler in `assets/site.js` — replace
`window.submitForm` with a real submission to your CRM or email service.
