# Redpen prototype

This project is a Next.js prototype for grading-style inline notes on assistant responses. It lets you enter annotate mode on a single answer, capture multiple disjoint highlights with short notes, manage them in a side panel, and compose a follow-up prompt that bundles the passages and notes together.

## Getting started

```
npm install
npm run dev
```

Then open http://localhost:3000 to try the flow:
- Click **Annotate answer** on the sample assistant message.
- Select text to open the inline note toolbar, add a note, and repeat for disjoint passages.
- Review, edit, or delete notes in the panel and click **Ask about these notes** to prefill the chat composer.
- Exit annotate mode with **Done** or discard everything with **Cancel**.
