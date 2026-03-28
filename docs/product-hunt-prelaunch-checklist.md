# Product Hunt Pre-Launch Warm-Up Checklist
*Target launch: **Tuesday, April 7, 2026** at 12:01 AM PST*
*Warm-up window: March 31–April 6, 2026*

> **Why April 7?** April 1 is April Fools' Day — serious launches get mocked. April 7 (Tuesday) is the optimal PH day with no holidays or conflicts. See `docs/launch-timing-analysis.md`.

Reference: Full launch kit is at `docs/product-hunt-launch.md`

---

## Day-by-Day Checklist: March 31–April 6

---

### 📅 Tuesday, March 31 — "Plant the flag"

**Goal:** Get the PH upcoming page live and tell your warmest audience first.

- [ ] **Create PH upcoming page (DAWOOD ACTION)**
  - Go to producthunt.com → Submit → "Upcoming"
  - Fill: Product name "ChurnRecovery", tagline: "Stop losing subscribers. No dev team required."
  - Description: Use the 209-char version from `docs/product-hunt-launch.md` Section 2
  - Add your profile photo + bio (builds trust before launch)
  - Set launch date: April 7, 2026
  - Upload at minimum: 1 hero screenshot (product dashboard) + 1 thumbnail logo

- [ ] **Add PH upcoming link to Twitter/X bio (DAWOOD ACTION)**
  - Bio update: "Building @ChurnRecovery — affordable churn recovery for subscription businesses ($20/mo) 🚀 Launching on Product Hunt April 7 👇 [upcoming link]"

- [ ] **Email your list — Week 1 warm-up (DAWOOD ACTION)**
  - Subject: `We're launching on Product Hunt in 7 days 🚀`
  - Body (keep it personal, 4–5 sentences):
    > "Hey [first name] — quick heads up: we're launching ChurnRecovery on Product Hunt next Tuesday, April 7th.
    >
    > You're one of the first people who showed interest in what we're building — having your support on launch day would mean a lot. Product Hunt is one of the best ways to get real feedback and early users, and every upvote genuinely matters.
    >
    > I'll send you the link the morning it goes live. If you want to get notified early, here's the upcoming page: [link]
    >
    > — Dawood"

- [ ] **DM 5 warmest IH connections (DAWOOD ACTION)** (people who commented on your posts, upvoted, reached out)
  - Message: "Hey [name] — we're launching on Product Hunt April 7th. Would love your support when it's live. I'll DM you the link on launch morning!"

- [ ] **Post on Twitter/X — personal account (DAWOOD ACTION)**
  ```
  We're launching on @ProductHunt next Tuesday 🚀

  ChurnRecovery — free cancel flows + dunning for subscription businesses.
  (Yes, free. Churnkey charges $825/mo for this.)

  If this would have helped you, come support us: [PH upcoming link]
  ```

---

### 📅 Wednesday, April 1 — "Build the assets"

**Goal:** Get all 7 gallery assets ready. This is the day most founders skip — don't.

- [ ] **Gallery assets status check (DAWOOD ACTION)**
  - Review the 7 assets listed in `docs/product-hunt-launch.md` Section 5
  - Priority order: Cancel flow GIF → Dashboard PNG → Pricing comparison PNG → Flow builder PNG
  - If GIF isn't ready: record a Loom of the demo page, then convert with Gifski (free, great quality)
  - **Note:** The live site at churnrecovery.com already has screenshot infrastructure — check `/public/screenshots/` for existing assets you can use.

- [ ] **Write and save launch-day tweets as drafts (DAWOOD ACTION)** (do NOT schedule — PH doesn't like that)
  - Tweet 1 (12:05 AM): `"We're live on @ProductHunt! 🚀 [link]"`
  - Tweet 2 (9 AM): The maker story thread (3 tweets)
  - Tweet 3 (2 PM): Milestone update (`"We're #X on PH with Y upvotes 🙏"`)

- [ ] **Draft the maker comment** (copy it from Section 4 of launch kit — you'll paste this at 12:01 AM)
  - Save in a Notes/TextEdit doc. Don't lose it.

- [ ] **Hunter outreach — DM round 1 (DAWOOD ACTION)**
  - Message Kevin William David on Twitter: direct, friendly, brief (template in Section 7 of launch kit)
  - Message Sharath Kuruganty on Twitter
  - Message Josh Howarth
  - You do NOT need all 5 to respond — just need one confirmed by April 3rd

- [ ] **IH teaser post (DAWOOD ACTION)** (if your IH post isn't live yet, post it now)
  - Short post: "Soft-launching ChurnRecovery — churn recovery for bootstrappers. Launching on PH April 7th, would love feedback before then: [site link]"

---

### 📅 Thursday, April 2 — "Decision day"

**Goal:** Hunter confirmed OR commit to self-hunt. No more waffling.

- [ ] **Hunter decision — hard deadline 5 PM PST (DAWOOD ACTION)**
  - If Kevin/Sharath confirmed: send them all 7 gallery assets, the listing copy, and offer a 15-min walkthrough
  - If no response: self-hunt. It's fine. Many successful launches are self-hunted.

- [ ] **Finalize PH listing copy (DAWOOD ACTION)**
  - Tagline (47 chars): `Stop losing subscribers. No dev team required.`
  - Description (209 chars): From Section 2 of launch kit
  - Topics: SaaS, Email, Subscriptions, No Code, Productivity

- [ ] **Upload all gallery assets to PH (DAWOOD ACTION)**
  - In the listing draft, upload all 7 assets in order
  - Preview: how does the listing look? Does the hero GIF autoplay?

- [ ] **Twitter teaser post (DAWOOD ACTION)**
  ```
  Launching on @ProductHunt this Tuesday (April 7) 🗓️

  ChurnRecovery helps subscription businesses stop losing customers at cancellation.

  It's free. Like actually free, not $250/mo free.

  Come support us: [PH upcoming link]
  ```

- [ ] **Check site load capacity**
  - Visit churnrecovery.com on a fresh browser → time the load
  - Verify Cloudflare Pages is serving the right version
  - PH traffic peaks can be 500–2,000 simultaneous visitors — Cloudflare Pages handles it, but verify

---

### 📅 Friday, April 3 — "Dry run day"

**Goal:** Simulate launch day. Find any issues before they're real.

- [ ] **Dry run the PH listing (DAWOOD ACTION)**
  - Open the draft, click through every section, verify all 7 assets display correctly
  - Click all links — site, demo, compare page, /launch page
  - Check: does the PH listing load on mobile?

- [ ] **Prepare Slack community messages** (draft, don't send)
  - Indie Hackers Slack: `#show-ih` channel
  - MicroConf Connect (if member)
  - SaaS Alliance
  - Ramen Club
  - Keep each message under 100 words, links to PH not site

- [ ] **Prepare r/SideProject and r/SaaS posts** (draft, don't send)
  - r/SideProject title: `"I launched a free alternative to Churnkey ($825/mo churn recovery) — feedback welcome [Show PH]"`
  - r/SaaS title: `"Built free cancel flows + dunning for bootstrappers — Show PH launch"`

- [ ] **Set alarm** for 11:55 PM PST on April 6th
  - Use your phone + laptop backup
  - The PH reset is at midnight PST — you lose hours by sleeping through it

- [ ] **DM follow-up (DAWOOD ACTION)** to anyone who said "remind me when you launch" over past weeks

- [ ] **IH post update (DAWOOD ACTION)** (if you have an existing IH post)
  - Add comment: "Quick update — we're launching on Product Hunt this coming Tuesday, April 7th! Here's the link to notify: [PH upcoming link]"

---

### 📅 Saturday, April 4 — "Buffer day"

**Goal:** Rest. Tie up loose ends. Nothing major.

- [ ] **Verify PH listing is set to "Scheduled" for April 7th 12:01 AM PST (DAWOOD ACTION)**
  - If it shows a different time: PH uses PST, not your local timezone. Double-check.

- [ ] **One final teaser tweet (DAWOOD ACTION)**
  ```
  3 days until we launch on @ProductHunt 🚀

  ChurnRecovery: the free alternative to Churnkey.

  If you've ever paid $250+/mo for churn recovery tools, this one's for you.

  [PH upcoming link]
  ```

- [ ] **Prep your environment for launch night**
  - Laptop charged
  - Phone charged
  - Water, snacks, whatever you need for a late night
  - Browser tabs open: PH listing, Twitter, IH, your Slack channels

- [ ] **Review `docs/product-hunt-launch.md` Section 6** (Launch Day Checklist) — one final read

---

### 📅 Sunday, April 5 — "Final prep"

**Goal:** Everything is locked. Nothing left to do except wait.

- [ ] **All 7 gallery assets uploaded ✓**
- [ ] **Listing copy finalized ✓**
- [ ] **Maker comment drafted and saved ✓**
- [ ] **Email list DM drafted ✓**
- [ ] **Slack messages drafted ✓**
- [ ] **Reddit posts drafted ✓**
- [ ] **Twitter drafts saved ✓**
- [ ] **Alarm set for 11:55 PM PST ✓**

- [ ] **Final email to list (DAWOOD ACTION)** (optional, day-before warmup)
  - Subject: `Tomorrow is the day 🚀`
  - Body:
    > "Tomorrow morning (April 7th), ChurnRecovery goes live on Product Hunt.
    >
    > I'll send you the link the moment it's up. Your upvote takes 2 seconds and genuinely makes a difference for a bootstrapped product.
    >
    > See you on the other side.
    > — Dawood"

- [ ] **Rest. Seriously.** You need to be sharp for 24 hours starting at midnight.

---

### 📅 Monday, April 6 — "Launch eve"

**Goal:** Clear the decks. No new decisions.

- [ ] Nothing new to do — all prep is done
- [ ] Optional: 30-min social media sweep — like/comment on IH posts to build goodwill pre-launch
- [ ] 11:55 PM PST: Wake up (or stay awake). Coffee ready.
- [ ] **12:01 AM April 7**: Follow the minute-by-minute from `docs/product-hunt-launch.md` Section 9

---

## Launch Day Minute-by-Minute (April 7)

*From `docs/product-hunt-launch.md` Section 9 — reproduced here for quick reference*

| Time (PST) | Action |
|-----------|--------|
| **12:00 AM** | Coffee. Phone charged. Browser ready. |
| **12:01 AM** | PH goes live. Paste maker comment IMMEDIATELY (Section 4 of launch kit). |
| **12:05 AM** | Tweet 1: "We're live! 🚀 [PH link]" |
| **12:10 AM** | DM 10 closest IH/founder contacts — personal messages, not mass blast |
| **12:30 AM** | Post on Indie Hackers with PH link |
| **1:00 AM** | Reply to all comments. Check rank. |
| **2:00 AM** | Sleep (if <5 comments) OR stay up (if thread is active) |
| **6:00 AM** | Wake up. Check rank. Start morning push. |
| **6:30 AM** | Post in Slack communities (IH, MicroConf, SaaS Alliance) |
| **7:00 AM** | LinkedIn post (personal account) |
| **8:00 AM** | Email waitlist with PH link — short and personal |
| **9:00 AM** | Twitter maker story thread (3–5 tweets) |
| **10:00 AM** | DM every beta user and feedback giver — personal messages only |
| **11:00 AM** | Check rank. Top 5 = celebrate. Not top 5 = identify communities not yet hit. |
| **12:00 PM** | Post on r/SideProject with PH link |
| **1:00 PM** | Post Hacker News "Show HN" (see `docs/hacker-news-show-hn.md`) |
| **2:00 PM** | Twitter quote-retweet: "We're #X with Y upvotes — thank you 🙏" |
| **3:00 PM** | Reply to ALL PH comments — highest leverage activity of the day |
| **5:00 PM** | Final push — tweet, any communities missed |
| **8:00 PM** | Wind down. Most votes come in before 6 PM. |
| **11:00 PM** | Final comment sweep. Thank everyone. |
| **12:00 AM (April 8)** | Done. Note final rank, upvotes, signups. |

---

## Teaser Content Calendar (Twitter + IH)

*Post these in the days leading up to launch — don't all post on the same day*

| Date | Platform | Content |
|------|----------|---------|
| March 31 | Twitter | "Launching on PH in 7 days — here's the upcoming page" |
| March 31 | IH | Short update post + PH upcoming link |
| April 1 | Twitter | "Working on our PH gallery assets today — here's a sneak peek of the cancel flow GIF" |
| April 2 | Twitter | "PH launch confirmed for April 7th. Come support affordable churn recovery for bootstrappers — $20/month" |
| April 3 | IH | Comment on existing IH post with PH update |
| April 4 | Twitter | "3 days out. Here's what we built and why it's free" (short thread) |
| April 5 | Twitter | "Tomorrow is the day 🚀 — see you at midnight PST" |
| April 6 | Twitter | "Going live in [X] hours on Product Hunt. Link drops at midnight PST." |

---

## Voter Outreach Templates (Non-Spammy)

### Template A — IH connections who commented on your post

> "Hey [name] — you left a comment on my IH post a while back and it was super helpful. Quick heads up: we're launching on Product Hunt this Tuesday (April 7th). Would mean a lot if you could support us when we go live — I'll DM you the link when it drops!"

---

### Template B — Twitter followers who engaged with ChurnRecovery content

> "Hey [name] — noticed you liked/RT'd something I posted about ChurnRecovery. We're launching on Product Hunt this Tuesday and I'd love your support! I'll tweet the link at midnight PST. Thanks for following along 🙏"

---

### Template C — Founders you know personally (Slack/Discord/email)

> "Hey [name]! Quick thing — we're launching ChurnRecovery on Product Hunt this Tuesday. It's a free alternative to Churnkey for bootstrapped SaaS/creators. Would love your upvote if it's something you find useful. Happy to return the favor when you launch something! [PH upcoming link]"

---

### Template D — Cold outreach to relevant PH community members

> "Hi [name] — I've followed your work on [thing they built]. We're a small team launching affordable churn recovery ($20/month) on Product Hunt this Tuesday (April 7th). Given you've built subscription products, I think you'd appreciate what we're doing. Would love your support! [PH upcoming link]"

---

### DM Rules (don't violate these):
1. **Never send the same message twice to the same person**
2. **No "upvote for upvote" trades** — PH bans this and it looks desperate
3. **Never paste a link in a first DM to a stranger** without context — starts with relationship, not ask
4. **Max 20 DMs per day** — more than this starts to feel spammy and ruins relationships
5. **No group DMs with PH ask** — always 1:1

---

## Pre-Launch Page Setup Guide

1. Go to `producthunt.com` → Submit product → "Launch in the future (upcoming)"
2. Fill all fields:
   - **Name:** ChurnRecovery
   - **Tagline:** Stop losing subscribers. No dev team required. (47 chars)
   - **Description:** ChurnRecovery helps newsletter creators, coaches, and subscription businesses stop losing customers at cancellation. Smart cancel flows, failed payment recovery, and exit surveys — free. No developers needed.
   - **Website:** https://churnrecovery.com/launch
   - **Topics:** SaaS, Email, Subscriptions, No Code, Productivity
3. Upload thumbnail (your logo, 240×240px minimum)
4. Set date to April 7, 2026
5. Click "Go Upcoming" — this creates the notify list
6. Share the `upcoming.producthunt.com/[your-product]` link everywhere

> **Note:** Use `https://churnrecovery.com/launch` as the PH listing URL — it's a dedicated landing page optimized for PH traffic with UTM tracking.

---

## Key Files Reference

| File | Contents |
|------|----------|
| `docs/product-hunt-launch.md` | Full launch kit (hunter list, gallery assets, maker comment, hourly timeline) |
| `docs/hacker-news-show-hn.md` | HN Show HN post (coordinate with 1 PM PST slot on launch day) |
| `docs/indie-hackers-post-final.md` | IH post (should be live before PH launch) |
| `docs/reddit-execution-playbook.md` | Reddit posts for r/SideProject, r/SaaS |

---

*Document updated: 2026-03-22 — Target date changed from April 1 to April 7 (April 1 is April Fools' Day; Tuesday April 7 is optimal per `docs/launch-timing-analysis.md`)*
*Use in conjunction with `docs/product-hunt-launch.md` for the full launch playbook.*
