# docs — Struktur & Herkunft

> **Herkunft bestimmt den Ordner.**
> Du hast es geschrieben → `manual/`. Ein Tool hat es erzeugt → `generated/`.
> Niemals mischen.

---

## Ordnerübersicht

```
docs/
├── manual/          ← Handgeschriebene Markdown-Doku (immer im Git)
├── generated/       ← Tool-Output (in .gitignore, nie manuell editieren)
│   ├── typedoc/     ← TypeDoc-Output  (npm run docs:typedoc)
│   └── jsdoc/       ← JSDoc-Output    (npm run docs:jsdoc)
└── README.md        ← Diese Datei
```

---

## Regeln

| Ordner              | Wer schreibt hier? | Im Git? |
| ------------------- | ------------------ | ------- |
| `manual/`           | Nur du             | ✅ ja   |
| `generated/typedoc` | TypeDoc-Tool       | ❌ nein |
| `generated/jsdoc`   | JSDoc-Tool         | ❌ nein |

---

## Befehle

```bash
npm run docs        # TypeDoc-API-Doku erzeugen → docs/generated/typedoc/
npm run docs:serve  # TypeDoc lokal ansehen (http://localhost:8081)
```

---

## Deployment

Im CI/CD-Workflow wird `docs/generated/typedoc/` als `jsdoc/` auf den Server kopiert:

- **Live:** https://portfolio.dev2k.org/jsdoc/index.html
