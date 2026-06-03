DigiLocker case-study images
=============================

These files are served from /digilocker/ and wired into the case-study page
(/projects/digilocker-redesign). Mapping is defined in the `caseStudy` object
in src/app/data/projects.ts (heroImage + screens[].beforeImage / afterImage).

Current mapping
---------------
landing.png                 -> Hero phone ("Landing Screen")

before/home.jpeg            -> Home Screen — BEFORE
home.png                    -> Home Screen — AFTER

before/search.jpeg          -> Search & Filter — BEFORE
search.png                  -> Search & Filter — AFTER

before/document.jpeg        -> Documents View — BEFORE
documents.png               -> Documents View — AFTER

before/settings.jpeg        -> Settings & Profile — BEFORE
settings.png                -> Settings & Profile — AFTER

before/image.png            -> (unused — no slot assigned)

Notes
-----
- Filenames are case-sensitive on the deployed server.
- To swap an image, replace the file here (keep the name) or edit the path in
  src/app/data/projects.ts.
