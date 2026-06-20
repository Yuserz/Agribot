---
name: commit
description: Stage and create a git commit following this repo's commit-message convention (Conventional Commits prefix, comma-separated subject summarizing the changes, "-" bullet body grouped by area, and a Co-Authored-By trailer). Use whenever the user asks to commit, "stage and commit", or "make a commit".
---

# Commit (repo convention)

Write commits that match the style already in this repo's history. Run
`git log --format="%B" -6` first if you need to refresh on the live pattern —
the rules below are derived from it.

## Steps

1. **Inspect** what's changing: `git status --short` and `git diff HEAD`. If
   nothing is staged, stage everything with `git add -A` (the repo's commits
   bundle a full unit of work, not hand-picked hunks) unless the user asked to
   commit only part of the tree.
2. **Check the branch.** If on `master`, create a feature branch first — do not
   commit directly to the default branch.
3. **Compose the message** per the format below.
4. **Commit** with a heredoc so multi-line bodies and quotes survive:
   ```bash
   git commit -m "$(cat <<'EOF'
   <subject>

   <body>

   Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
   EOF
   )"
   ```
5. **Confirm** with `git log --oneline -1`. Do **not** push unless asked.

## Subject line

`<type>: <summary>`

- **Types used here:** `feat`, `fix`, `refactor`, `chore`, `docs`. Pick by intent —
  `feat` for new user-facing capability, `refactor` for behavior-preserving
  renames/restructures, `chore` for tooling/config/deps, `docs` for docs-only.
- **lowercase** after the colon, **imperative mood**, **no trailing period**.
- When one commit covers several related changes, summarize them as a
  **comma-separated list** ending with "and": `feat: A, B, C, and D`.
- Keep it on one line (aim ≤ ~72 chars; the comma-list subjects here run a bit
  longer, which is fine).

Real examples from this repo:

```
feat: implement Supabase authentication for login and signup
feat: chat header, TTS, new session, markdown output, and screen animations
feat: profile revamp, language toggle, brand icons, and Expo SDK 56 upgrade
refactor: rebrand AgriBot to Tanim, Bes! across code, docs, and app identity
chore: add eas.json configuration for build and submission settings
```

## Body (omit for small, single-purpose commits)

Use a body when the commit groups multiple changes. Format:

- One `- ` bullet per change-area; wrap lines at ~72 chars with the continuation
  indented under the bullet text.
- A bullet may lead with a short scope label and colon when it helps, e.g.
  `- Profile: tappable avatar upload, edit-name modal, ...`.
- Describe **what changed and why it matters**, not a file-by-file dump. Name key
  files/symbols in parentheses when it aids navigation
  (e.g. `(context/language.tsx, persisted)`).
- Group tightly-related fixes into one bullet rather than scattering them.

## Trailer

Always end the message with a blank line then:

```
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
```

(Match the trailer to the model that authored the work; this is the current default.)

## Don'ts

- Don't `--amend` an existing commit — create a new one.
- Don't use `--no-verify` or skip hooks; if a hook fails, fix the cause.
- Don't push, open a PR, or commit to `master` unless explicitly asked.
