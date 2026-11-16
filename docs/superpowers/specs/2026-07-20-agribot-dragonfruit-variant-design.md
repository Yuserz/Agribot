# AgriBot — Dragon-Fruit-Only Variant

**Date:** 2026-07-20
**Branch:** `feat/agribot-dragonfruit` (cut from `0d4bd25` on `feat/tanim-bes-revamp`)
**Status:** Approved design, ready for implementation plan

## Goal

Produce a second, parallel variant of the app that is dedicated to dragon fruit
(pitaya) only, branded "AgriBot". The generalist "Tanim, Bes!" variant continues
to live on `feat/tanim-bes-revamp`; the two share a codebase and diverge only in
content, branding, and palette.

## Context

The repo began as "AgriBot", a dragon-fruit assistant. Commit `cd280f5`
rebranded it to "Tanim, Bes!", a general plant-care assistant, and later commits
added guest mode, a profile revamp, and the Expo SDK 56 upgrade. The Botpress
bot behind the chat was never retrained — the hardcoded `CLIENT_ID` in
`utils/botpress.ts` still points at the dragon-fruit-specific bot. So the app UI
is the only thing that needs to narrow back to dragon fruit.

## Non-goals

- No changes to routing, provider nesting, auth, or the Botpress REST layer.
- No new Botpress bot or client ID.
- No backend or Supabase schema changes.
- No refactoring unrelated to the re-skin.

## Design

### Branch strategy

Branch from current HEAD rather than from `master` or the pre-rebrand commit
`ea49a13`. `ea49a13` is literally still AgriBot and would need no re-skin, but
it predates guest mode, the profile revamp, and SDK 56 — reviving it would mean
re-doing that work. Re-skinning forward is the cheaper direction.

The two variants stay as long-lived sibling branches. Shared infrastructure
fixes are expected to be cherry-picked between them; content and palette
deliberately diverge.

### Content

The dragon-fruit narrowing is data-driven wherever the existing code allows it.
`app/(tabs)/index.tsx` renders its grid from `PLANT_TOPICS`, so replacing the
array's contents re-skins the Home screen with no layout changes.

| File | Change |
|---|---|
| `constants/brand.ts` | `APP_NAME` and `BOT_NAME` → `"AgriBot"`. Tagline and sub-tagline rewritten for dragon fruit in the existing Taglish/Gen-Z tone. Brand emoji 🌱 → 🐉 (no dragon-fruit emoji exists; 🐉 reads better than the botanically-correct 🌵). |
| `constants/plantTopics.ts` | `PLANT_TOPICS` replaced with eight dragon-fruit subtopics: Pagtatanim, Poste/Trellis, Pruning, Pollination, Pamumulaklak, Pamumunga, Peste, Ani. Same `PlantTopic` interface and field semantics; each `prompt` is a dragon-fruit question for the bot. |
| `constants/plantTopics.ts` | `CARE_ACTIONS` retuned: Planting → Cutting/Propagation, Watering kept, Pests kept, Sunlight → Trellis & Support. Same `CareAction` interface. |
| `app/(tabs)/faq.tsx` | The seven Q&A entries rewritten for dragon fruit — rooting cuttings, why a plant is not fruiting, night pollination and hand-pollination, yellowing stems, watering a cactus, natural pest control, harvest timing and ripeness. Each entry keeps its `question` (Taglish) / `questionEn` / `answer` triple so the language toggle and search keep working. |
| `app/(tabs)/index.tsx` | Tips carousel copy, the sub-greeting, and the chat CTA sub-line narrowed to dragon fruit. Both `taglish` and `english` variants of each tip updated. Structure and styles untouched. |
| `app/welcome.tsx` | Feature-card copy and emoji narrowed to dragon fruit. |
| `app/(tabs)/profile.tsx` | The "About {APP_NAME}" blurb rewritten. |

The admin/editor guide comment at the top of `constants/plantTopics.ts` is
updated to describe dragon-fruit topics rather than "add a plant".

### Palette

`constants/theme.ts` moves from "Emerald & Gold" to a pitaya palette. Every
screen reads `Colors.brand.*` and `Colors.ui.*` tokens, so this is a single-file
change — but it repaints every gradient, header, and button and therefore needs
a visual pass afterwards.

- `primary` `#B0206A` — pitaya magenta, safe with white text
- `light` `#D9457F` — magenta highlight
- `dark` `#7A1247` — deep pitaya
- `accent` `#2F8366` — green, for the fruit's scales/leaves
- `accentDark` `#215F4B`
- `gradient` `["#7A1247", "#B0206A", "#D9457F"]`
- `gradientShort` `["#B0206A", "#D9457F"]`
- `goldGradient` becomes a green accent gradient (the export name is kept so
  call sites do not change)
- `tintSoft` / `tintSoftBorder` / `goldSoft` / `goldSoftBorder` recomputed as
  the matching rgba tints of the new primary and accent
- `Colors.ui` neutrals shift from warm-ivory/sage to a faintly pink-warm
  neutral; `tipBg*` and `tipIconColor` retuned to sit against magenta

The doc comment at the top of `theme.ts` is updated to name the new palette.

The `light`/`dark` blocks and `tintColorLight`/`tintColorDark` are updated to
the new primary for consistency, though the app is effectively brand-colored
rather than dark-mode-themed.

### App identity

- `app.json`: `name` → `"AgriBot"`, `slug` → `"agribot"`, `scheme` → `"agribot"`,
  `android.package` → `"com.agribot.app"`
- `package.json`: `name` → `"agribot"`
- `README.md` and `CLAUDE.md` rewritten to describe the dragon-fruit variant and
  to note that the generalist variant lives on `feat/tanim-bes-revamp`

**EAS project ID is deliberately left unchanged.** `extra.eas.projectId`
`a963c0a5-5b85-4534-9ef6-fb3ac2ceac62` is bound to the `tanim-bes` EAS project,
and changing the slug against that same ID will break EAS builds on this branch.
This is accepted: the ID is a one-line fix at the point someone first runs an
EAS build for the dragon-fruit variant, and leaving it in place does not block
local development or `expo start`. Anyone hitting an EAS slug-mismatch error on
this branch should run `eas init` to create a fresh project and replace the ID.

### Verification

There is no test suite. Verification is:

1. `pnpm lint` passes.
2. `pnpm start` (or `pnpm web`) boots without runtime errors.
3. Visual pass over splash, welcome, login, signup, Home, Chat, FAQ, and Profile
   to confirm the new palette reads correctly — in particular that white text on
   the magenta gradient stays legible and that the header text-shadow still
   works now that the gradient's light end is pink rather than yellow.
4. Tapping a Home topic card preloads its dragon-fruit prompt into the chat.
