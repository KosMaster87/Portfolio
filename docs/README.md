# docs - structure & origin

> **Origin determines the folder.**
> You wrote it → `manual/`. A tool generated it → `generated/`.
> Never mix them.

---

## Folder overview

```
docs/
├── manual/          ← Handwritten Markdown docs (always in Git)
├── generated/       ← Tool output (in .gitignore, never edit manually)
│   ├── typedoc/     ← TypeDoc output  (pnpm run docs:typedoc)
│   └── jsdoc/       ← JSDoc output    (pnpm run docs:jsdoc)
└── README.md        ← This file
```

---

## Rules

| Folder              | Who writes here? | In Git? |
| ------------------- | ---------------- | ------- |
| `manual/`           | You only         | yes     |
| `generated/typedoc` | TypeDoc tool     | no      |
| `generated/jsdoc`   | JSDoc tool       | no      |

---

## Commands

```bash
pnpm run docs        # Generate TypeDoc API docs → docs/generated/typedoc/
pnpm run docs:serve  # View TypeDoc locally (http://localhost:8081)
```

---

## Deployment

In the CI/CD workflow, `docs/generated/typedoc/` is copied to the server as `jsdoc/`:

- **Live:** https://portfolio.dev2ksoftware.com/jsdoc/index.html
