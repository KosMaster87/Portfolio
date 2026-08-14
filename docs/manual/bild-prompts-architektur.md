# Bild-Prompts — Portfolio-Architektur als Skizze/Workflow

> Zweiter Versuch nach den dekorativen Mascot-Illustrationen (nicht hilfreich zum
> Nachvollziehen). Diesmal: echte Diagramm-/Skizzen-Prompts, die dieselben drei Mechanismen
> zeigen wie das Artifact (`dev2k-wiki/projekte/portfolio-architektur.html`) — mit den
> exakt gleichen Boxen, Pfeilen und Beschriftungen, nur als handskizzenhafte
> Whiteboard-Illustration statt als Vektor-Diagramm. Prompts auf Englisch für bessere
> Bildmodell-Ergebnisse.
>
> Wichtig bei Bildmodellen: Text/Beschriftungen in generierten Bildern sind nie
> hundertprozentig verlässlich lesbar. Die Prompts geben den exakten Text vor, damit das
> Modell möglichst nah dran bleibt — kleine Schreibfehler im generierten Bild sind trotzdem
> möglich und müssen von Hand nachgeprüft werden.

---

## Diagramm 1 — Anfrageweg (Besucher → Seite)

### 1a — Technisches Flussdiagramm, Whiteboard-Stil

```
Create a hand-drawn whiteboard-style technical diagram, landscape orientation (1920x1080),
as if sketched with colored dry-erase markers on a white board.

Draw exactly five labeled boxes connected by arrows, left to right, then branching:

1. Box "Browser" (top-left)
   --> arrow labeled "HTTPS" -->
2. Box "Cloudflare Edge + Tunnel"
   --> arrow labeled "tunneled" -->
3. Box "NPMplus (Reverse Proxy)"
   --> arrow labeled "by Host header" (pointing down) -->
4. Box "static-sites (nginx container)"
   --> splits into two arrows pointing down-left and down-right:
   - down-left arrow labeled "/, /assets, /imprint" leads to box "index.html / static files"
   - down-right arrow labeled "/api/contact/contact.php" leads to box "portfolio-php
     (PHP-FPM container)"

Visual style:
- Whiteboard marker sketch aesthetic: black outline boxes, hand-drawn imperfect rectangles,
  arrows with a slight hand-drawn wobble
- Use exactly three marker colors for accents: warm orange-brown, muted olive-green, and
  one soft red for emphasis on the "Cloudflare" box only
- Clean, legible hand-lettering for all labels, monospace-ish handwriting style
- White background, plenty of empty space, no clutter, no extra decorative elements

Output: PNG, 1920x1080, no real company logos
```

### 1b — Isometrische Variante

```
Create a clean isometric technical illustration, landscape orientation (1920x1080), in the
style of a software-architecture diagram (like a slide from an engineering talk), not
photorealistic.

Draw five isometric flat-shaded blocks connected by glowing directional lines, left to
right then branching downward:

1. Block "Browser"
2. Block "Cloudflare Edge + Tunnel" (highlighted with a soft amber glow)
3. Block "NPMplus (Reverse Proxy)"
4. Block "static-sites (nginx)"
5. Splitting into two blocks below it: "index.html / static files" and "portfolio-php
   (PHP-FPM)"

Label the connecting line between block 4 and block 5-left as "static files", and the line
to block 5-right as "/api/contact/contact.php".

Visual style:
- Isometric flat-design, muted warm palette: copper-gold, sand, dark olive, deep green
- Small clean sans-serif labels directly on or under each block
- Generous negative space, no background scenery

Output: PNG, 1920x1080, no real logos
```

---

## Diagramm 2 — Deploy-Weg (GitHub Actions → Tower)

### 2a — Whiteboard-Sketch mit zwei Schranken

```
Create a hand-drawn whiteboard-style technical diagram, landscape orientation (1920x1080).

Draw six labeled boxes connected by arrows, left to right and then down:

1. Box "GitHub Actions (cloud runner)"
   --> arrow labeled "Service Token" -->
2. Box "Cloudflare Access" (draw a small padlock icon next to this box)
   --> arrow labeled "Tunnel" -->
3. Box "Tower: sshd" (host operating system, not a container - draw a small "no container"
   note near it, like a simple house-shape icon instead of a box-shape icon)
   --> arrow labeled "SSH key matches one line" (pointing down) -->
4. Box "command=restrict-rsync-portfolio.sh" (draw a small padlock icon next to this box too)
   --> arrow labeled "only if target matches" (pointing down) -->
5. Box ".../static-sites/www/portfolio/"
   --> a dashed arrow labeled "volume mount, read-only" (pointing left) -->
6. Box "static-sites (nginx container)"

Visual style:
- Whiteboard marker sketch aesthetic, hand-drawn imperfect rectangles and arrows
- Two small padlock icons should visually stand out (drawn in red marker), everything else
  in black/olive/copper marker colors
- Clean hand-lettering, legible labels
- White background, no clutter

Output: PNG, 1920x1080, no real logos
```

### 2b — Sicherheits-Schleusen-Metapher

```
Create a clean flat-design illustration, landscape orientation (1920x1080), showing a
security checkpoint metaphor for a technical deployment process (not violent, not military
- like an airport security lane diagram).

Draw a left-to-right lane with two distinct checkpoint gates:

1. Starting icon: a simple cloud-shape with a small computer-terminal glyph inside,
   labeled "GitHub Actions runner"
2. First gate: a turnstile/gate icon labeled "Cloudflare Access" with a small ticket/token
   icon passing through it
3. A tunnel-shaped connector labeled "Tunnel" leading to:
4. A small house/tower icon labeled "Tower host (sshd)"
5. Second gate: a narrower turnstile icon labeled "restrict-rsync-portfolio.sh" with a small
   key icon passing through it
6. Final icon: a small folder/box labeled ".../www/portfolio/"

Visual style:
- Flat, friendly, diagrammatic - not a real airport, not real people, just icons and gates
- Warm muted palette: copper-gold, sand, olive, dark green
- Clear left-to-right reading direction, labels under each icon

Output: PNG, 1920x1080, no real logos
```

---

## Diagramm 3 — Renovate-Entscheidungsbaum

### 3a — Whiteboard-Flowchart

```
Create a hand-drawn whiteboard-style flowchart diagram, portrait orientation (1080x1350).

Draw a decision-tree flowchart, top to bottom:

1. Top box: "renovate.json on dev branch"
   --> arrow down -->
2. Box: "PR opened per dependency"
   --> splits into three arrows going down-left, straight down, and down-right, each
       labeled respectively: "patch / pin / digest", "minor", "major"
3. Three boxes side by side below the split:
   - left box: "automerge: true" with a small green checkmark icon
   - middle box: "waits for you" with a small amber clock icon
   - right box: "waits + label" with a small amber clock icon and a small tag icon
4. Below the left box, an arrow down to a final box: "merged automatically"
5. Below the right box, a dashed arrow down to a final box: "@angular/* always lands here,
   even on patch updates - grouped, manual via ng update"

Visual style:
- Hand-drawn whiteboard marker sketch, black outlines
- Green marker accent only on the "automerge: true" path, amber marker accent on the two
  waiting paths
- Clean hand-lettering
- White background, no clutter

Output: PNG, 1080x1350, no real logos
```

### 3b — Minimal, Ampel-Metapher

```
Create a minimal flat-design illustration, portrait orientation (1080x1350), using a traffic
light as a visual metaphor for an automated approval decision (not a literal street scene -
just the traffic light icon as the central visual element).

Scene: A single stylized traffic-light icon in the center-top, with three light-beams
extending downward from it into three labeled lanes:
- green beam leading to a lane labeled "patch / pin / digest" ending in a checkered
  flag icon labeled "merged automatically"
- amber beam leading to a lane labeled "minor" ending in a small inbox-tray icon labeled
  "waits for review"
- amber beam (slightly darker) leading to a lane labeled "major" ending in a small
  inbox-tray icon with a tag attached, labeled "waits for review + labeled"

Add one small separate note element at the bottom: a small grouped-boxes icon labeled
"@angular/* - always grouped, always waits, moved only via ng update"

Visual style:
- Flat, minimal, clean geometric shapes
- Warm muted palette for non-signal elements: copper-gold, sand, dark green; keep the
  traffic-light colors realistic (red unused/greyed out, amber, green) since they carry the
  meaning
- Generous negative space

Output: PNG, 1080x1350, no real logos
```

---

## Diagramm 4 — Unraid-Host, Docker-Netze und Subnetze

### 4a — Verschachtelte Regionen, Whiteboard-Sketch

```
Create a hand-drawn whiteboard-style technical diagram, landscape orientation (1920x1080).

Draw one large outer rectangle labeled "Unraid Host - Tower (192.168.88.237)" that contains
everything else.

Inside the outer rectangle, draw three clearly separated regions, each drawn as its own
rounded-rectangle "zone" with a distinct border style, side by side:

Zone 1, labeled "bridge (default Docker network)":
- contains one small box "NPMplus"
- small text near this zone: "isolated private subnet"

Zone 2, labeled "sites-net (custom bridge, own subnet e.g. 172.30.0.0/24)":
- contains two small boxes side by side: "static-sites" and "portfolio-php"
- small text near this zone: "container names resolve here"

Zone 3, labeled "br0 (macvlan)":
- contains one small box "example-container"
- small text near this zone: "gets a real LAN IP, e.g. 192.168.88.50 - no NAT"

Draw one arrow starting from the "NPMplus" box, going OUTSIDE zone 1's border, crossing to
the outer rectangle's edge, labeled "published port 8085 -> reaches static-sites via host
IP, bypasses network boundary". This arrow should visually cross the zone-1 boundary to show
it does not stay "inside" the zone the way normal container-to-container traffic does.

Draw a short double-headed arrow between "static-sites" and "portfolio-php" inside zone 2,
labeled "container-name DNS (only works inside this zone)".

Draw a short arrow from the "example-container" box in zone 3 going straight to the outer
rectangle's edge (not through NAT), labeled "direct LAN traffic, no port mapping needed".

Visual style:
- Whiteboard marker sketch aesthetic, hand-drawn imperfect rectangles
- Each zone border in a different marker color: zone 1 in muted olive, zone 2 in
  warm copper-orange, zone 3 in soft red
- The outer "Unraid Host" rectangle in plain black marker, clearly the biggest shape
- Clean, legible hand-lettering
- White background, no clutter, no extra decoration

Output: PNG, 1920x1080, no real logos
```

### 4b — Layer-Diagramm, technischer Stil

```
Create a clean, layered technical architecture illustration, landscape orientation
(1920x1080), like a slide from a systems-engineering talk, not photorealistic.

Draw a large flat card labeled "Unraid Host" at the back, filling most of the frame.
On top of it, draw three smaller flat cards side by side, each representing one Docker
network, each a different muted color:

Card A "bridge (default)" - contains one small icon labeled "NPMplus", with a thin line
exiting the card straight down to a labeled dot on the host's edge reading "host port 8085"

Card B "sites-net (custom, 172.30.0.0/24)" - contains two small icons labeled "static-sites"
and "portfolio-php", connected to each other by a short glowing line inside the card only

Card C "br0 (macvlan)" - contains one small icon labeled "example-container", with a thick
line exiting straight to the host's outer edge labeled "real LAN IP, no translation"

Visual style:
- Flat layered card illustration, isometric-adjacent but mostly front-facing
- Warm muted palette: copper-gold, sand, dark olive, deep green - one distinct color per
  card so the three networks are visually separable at a glance
- Small clean sans-serif labels
- Generous negative space around the host card

Output: PNG, 1920x1080, no real logos
```

---

## Hinweise

- Weiterhin bewusst ohne echte Markennamen/Logos (kein wörtliches "GitHub", "Cloudflare"
  als Schriftzug) — Bildmodelle reproduzieren echte Marken oft schlecht oder verweigern es.
- Wenn die generierte Beschriftung an einzelnen Stellen unleserlich oder falsch wird: den
  betroffenen Textblock im Prompt kürzen (kurze Labels funktionieren deutlich zuverlässiger
  als ganze Sätze) und einzeln neu generieren, statt das ganze Bild neu zu erzeugen.
- Referenz für die tatsächliche Beschriftung/Reihenfolge, falls beim Nachbessern Zweifel
  aufkommen: [[projekte/portfolio-architektur|dev2k-wiki: Portfolio-Architektur]] bzw. die
  dortige HTML-Diagrammseite.
