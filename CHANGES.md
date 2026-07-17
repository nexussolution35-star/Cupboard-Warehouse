# Cupboard Warehouse — SEO Pass Change Log

Static marketing site for Cupboard Warehouse (kitchen renovations & custom
cupboards, Nelspruit / Mbombela, Mpumalanga, South Africa). This file
summarises the SEO work reflected in this build. No further changes were made
during packaging — the site is packaged exactly as it exists.

## Local targeting
- Site targets both "Nelspruit" and "Mbombela" (same city — Mbombela is the
  official name, Nelspruit the common search term) across titles, headings,
  copy and schema.
- `LocalBusiness` / `HomeAndConstructionBusiness` JSON-LD on the homepage with
  address, phone, hours, rating and `areaServed`.
- Fixed US-template leftovers (", CA" → "Mpumalanga").

## Primary keyword map (one primary keyword per page, no cannibalisation)
- Kitchen cupboards → services/cupboards.html
- Fitted kitchen cupboards → services/fitted-kitchen-cupboards.html (new)
- High gloss kitchen cupboards → services/high-gloss-kitchen-cupboards.html (new)
- Solid wood kitchen cupboards → services/solid-wood-kitchen-cupboards.html (new)
- Handleless kitchen cupboards → services/handleless-kitchen-cupboards.html (new)
- Kitchen renovations → index.html
- Kitchen remodeling → services/kitchen-remodeling.html
- Kitchen remodelers → about.html
- Kitchen refurbishment → gallery.html
- Kitchen renovation specialists → services.html
- Custom kitchen renovations → services/custom-made.html
- Kitchen renovation company → contact.html

## Service pages
- Four new cupboard-style landing pages created (fitted, high-gloss,
  solid-wood, handleless), each with unique copy, Service + BreadcrumbList
  JSON-LD, and wired into the nav, footer and services grid site-wide.
- "Popular kitchen cupboard styles" internal-link grid added to the Cupboards
  page.

## Service areas (final: 9 towns)
- Nelspruit, White River, Sabie, Barberton, Hazyview, Marloth Park, Badplaas,
  Machadodorp, Mataffin.
- Removed earlier towns not served: Mbombela (page), Malelane, Middelburg,
  Secunda, Witbank, Ermelo, plus Thabazimbi and Hoedspruit (outside 200 km).
- Each town page has a unique title, meta, H1, intro, service list and nearby-
  area cross-links.

## Blog
- 10 posts. Cost article retitled to the exact search phrase
  ("How Much Does a Kitchen Renovation Cost in South Africa?").
- New posts: Granite vs Quartz, How Long Does a Renovation Take, How to Choose
  Kitchen Cupboards, Modern Kitchen Trends 2026, Small Kitchen Renovation
  Ideas, White vs Dark Kitchen, Matte vs Gloss Cupboards.

## Technical SEO
- sitemap.xml (39 URLs) and robots.txt at the root.
- Descriptive, keyword-rich image filenames and alt text.
- Self-hosted fonts (Montserrat, PT Sans) and self-hosted assets — no external
  CDNs.
- Homepage "Our Work" carousel repointed to the renamed image files.
- Removed the unconfirmed "Offers" / "0% Intro Financing" block and the
  Financing page.

## Business details used on the site (confirm with owner)
- Phone 082 388 4064 · cup@cwarehouse.co.za
- Address: Prime Corner Building (Behind Battery First), Mbombela, 1200
- Hours: Mon–Fri 08:30–17:00, Sat 09:00–14:00
- Google 4.2★ (5) · Facebook 5.0★ (6)
- Canonical/base domain: https://www.cwarehouse.co.za/
