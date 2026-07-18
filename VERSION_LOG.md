# Vegas Golf Scorecard Version Log

This file records the good baseline versions of the app and how to switch back to them in Codex or GitHub.

## Good Baselines

### v4.0 - Official v4 mobile scoring UI

Date: 2026-07-18

Tag: `v4.0`

Live URL:

`https://zxj088.github.io/golf-score-vegas/?v=100`

What is good in this version:

- Mobile-first bottom navigation with Home, Play, Leaderboard, and Courses.
- New Play page for fast hole-by-hole score entry, inspired by Golf GameBook style.
- Leaderboard page keeps the full Las Vegas rule scorecard table.
- Home page has cleaner game cards with compact total/net result rows.
- History filters support recent time ranges, custom date range, and played course filtering.
- Current tab and current Play hole are remembered after page refresh.
- Edit authorization is kept after refresh on the same phone, and another phone can take over edit authorization.
- Under Par Flip wording is simplified to Flip in the compact leaderboard controls.
- Supabase cloud sync remains the shared database for games and courses.
- PWA cache version is `v100`.

### v3.0-final - Stable classic scorecard

Tag: `v3.0-final`

What is good in this version:

- Stable bilingual English/Chinese UI in one site.
- Classic full scorecard layout as the main play experience.
- Gross/net scoring support with player handicaps and hole difficulty/index.
- Preset course library plus editable custom courses.
- Rule help popup and Las Vegas rule wording.
- Supabase shared cloud data for games and courses.

### v1.0 - First stable prototype

Tag: `v1.0`

What is good in this version:

- Original mobile web scorecard baseline.
- Las Vegas team scoring.
- Birdie flip option.
- Local score saving and course setup.

## How To Switch Version In Codex

Use these commands in the repo folder:

```powershell
git fetch --all --tags
git switch v4-dev
git reset --hard v4.0
```

To switch back to the current development branch later:

```powershell
git fetch origin
git switch v4-dev
git reset --hard origin/v4-dev
```

If there are local changes you want to keep, commit or stash them before using `git reset --hard`.

## How To Switch Version In GitHub

1. Open the repository in GitHub.
2. Click the branch/tag selector near the top-left of the file list.
3. Choose the `Tags` tab.
4. Select `v4.0`, `v3.0-final`, or another baseline tag.
5. To restore a baseline as the live website, create a branch from that tag or use GitHub Desktop/command line to push that tag commit to `main`.

Command line example to publish `v4.0` to the live GitHub Pages site:

```powershell
git fetch --all --tags
git switch v4-dev
git reset --hard v4.0
git push origin v4-dev:main
```

## Notes

- The live website is served from `main`.
- Development continues on `v4-dev`.
- Baselines are Git tags, so they are easy to find and do not move.
- Query versions like `?v=100` help phones and browsers load the newest cached files.
