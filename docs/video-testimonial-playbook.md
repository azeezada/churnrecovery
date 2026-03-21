# Video Testimonial Playbook

**Goal:** Get the first video testimonial within 30 days of first user activation.

Video testimonials convert 80% better than text quotes. A 60-second Loom from a real business owner — saying "I saved 23 subscribers in a month" — is more powerful than any copy we can write.

---

## When to Ask

Don't ask cold. Ask when there's a win to talk about.

| Trigger | When | Why It Works |
|---|---|---|
| **First successful save** | Within 48h of first recovered payment/saved cancel | Peak excitement, outcome is fresh |
| **7-day check-in** | After first week active | They've seen the dashboard, have data |
| **30-day mark** | Exactly 30 days after signup | Can quote real numbers ("I recovered $X this month") |
| **ROI confirmed** | When recovered revenue > plan cost | The math is undeniable — easiest yes |
| **Unprompted mention** | User tweets about it or mentions in a community | Strike while hot, amplify their story |

**Best signal**: When a user says "this is amazing" or shares a result in any channel — that's the moment. Reply immediately with the ask.

---

## Outreach Templates

### Email Template (Primary)
```
Subject: Would you share a 60-second video about your experience?

Hi [Name],

I saw you recovered [X] subscribers this month — that's awesome!

I'm working on a video testimonials section for the ChurnRecovery website, and I'd love to feature your story. It's just a quick 60-second Loom — no editing, no perfection needed.

Here are 3 questions to answer (just talk naturally):
1. What were you dealing with before ChurnRecovery?
2. What surprised you after you set it up?
3. Would you recommend it to another [newsletter creator / course seller / coach]?

Record it whenever: https://loom.com — share the link with me.

In return, I'll:
- Feature your business prominently (link to your site)
- Give you a free lifetime plan upgrade when we launch paid tiers
- Shout you out on Twitter if you'd like

No rush, no pressure. But if you're open to it, it would really help other business owners discover this.

Thanks,
Dawood
```

### Twitter DM Template
```
Hey [Name]! Saw your recent win with ChurnRecovery — love it 🙌

Quick ask: would you be up for a 60-second Loom video about your experience? 
3 simple questions, no editing needed. 
I'd feature you on the homepage + link to your site.

DM me if yes and I'll send the prompt!
```

---

## Prompt Script (Send to User Before They Record)

Copy-paste this to the user once they agree:

```
Here's what to cover in your 60-second video — just talk naturally, no script needed:

1. "Before ChurnRecovery..." — What was the problem? Were you losing subscribers to failed payments or cancellations? How much was it costing you?

2. "What surprised me..." — What was unexpected? Maybe how easy the setup was, or seeing recoveries happen automatically?

3. "I'd recommend this to..." — Who should use this? What kind of business owner would get the most value?

Tips:
- Record in Loom (loom.com) — free and easy
- Sit somewhere with decent light (facing a window works great)
- Don't worry about perfection — natural is better than polished
- 60 seconds is ideal but 30–90 seconds is fine

Send me the Loom link when you're done!
```

---

## Where to Display Video Testimonials

| Location | Position | Format |
|---|---|---|
| **Homepage hero** | Just below/after text testimonials | Thumbnail grid (3-up) or featured single video |
| **Pricing page** | Near pricing table | Single featured video with ROI focus |
| **/for/ landing pages** | Segment-matched (course seller video on /for/teachable) | 1 video per page, relevant audience |
| **Case study pages** | Embedded full video + transcript below | Full embed + pull quotes |
| **Email sequences** | Link to best video in welcome sequence day 3 | Text link "Watch a 60-second story" |

---

## Tools Comparison

### Loom (Recording)
- **Best for**: Asking users to record themselves
- **Cost**: Free tier works fine (720p, unlimited videos)
- **Embed**: Direct URL → embed via `<iframe>` or hosted link
- **Pros**: Zero friction for the user, everyone knows it
- **Cons**: Not a testimonial management platform

### Testimonial.to
- **Best for**: Collecting + displaying text AND video testimonials in one place
- **Cost**: ~$50/mo (paid) — has a free tier with limits
- **Embed**: Drop-in widget, wall-of-love embed, individual quotes
- **Pros**: Purpose-built for this use case, handles permissions, nice UI
- **Cons**: Monthly cost, less control over styling
- **Verdict**: Worth it at 10+ testimonials. Overkill before then.

### Vocal Video
- **Best for**: Guided video collection (sends users a prompt, they record in browser)
- **Cost**: ~$49/mo
- **Embed**: Clean video player widgets
- **Pros**: No Loom required — users record directly in browser with prompt on screen
- **Cons**: More expensive, guided format can feel more corporate
- **Verdict**: Good for when you want polish at scale. Not needed early on.

### Recommendation
- **Now (0–5 videos)**: Loom for collection, manual embed on site
- **Growth (5–20 videos)**: Add Testimonial.to, use their embed widgets
- **Scale (20+ videos)**: Keep Testimonial.to + consider Vocal Video for new collection campaigns

---

## Hosting Video Files

### Option A: YouTube (Unlisted)
- **Cost**: Free
- **Pros**: Easy, no bandwidth cost, YouTube player is trusted
- **Cons**: "Recommended videos" after playback, YouTube branding
- **How to embed**: Standard `<iframe>` embed with `?rel=0&modestbranding=1`

### Option B: Cloudflare Stream
- **Cost**: $5/mo base + $1/1000 minutes viewed
- **Pros**: No YouTube branding, fast global delivery, clean player
- **Cons**: Small cost, slightly more setup
- **How to embed**: Stream iframe or HLS.js player
- **Verdict**: Use this for featured/hero testimonials where branding matters

### Recommendation
- Unlisted YouTube for most videos (free, zero maintenance)
- Cloudflare Stream for the #1 featured homepage testimonial

---

## Legal: Permission Language

When a user agrees to record, confirm in writing (email or DM reply is fine):

```
Thanks so much! Just to confirm — you're okay with ChurnRecovery 
displaying your video on our website, social media, and marketing materials?
Reply "yes" and I'll take care of the rest.

I'll always link back to your site and I'll remove it immediately if you ever ask.
```

Keep a folder (Notion, Google Drive) with:
- Screenshot of permission message
- Their name, company, role
- Date of permission
- Video file or Loom link
- Where it's currently displayed

Never publish without written confirmation (a DM "yes" counts).

---

## 30-Day Action Plan

| Week | Action |
|---|---|
| **Week 1** | Identify first 3 active users who've seen a recovery. Send email template. |
| **Week 2** | Follow up with anyone who didn't respond. Send Twitter DM version. |
| **Week 3** | If one user agrees, send them the prompt script. Get the recording. |
| **Week 4** | Embed on homepage and pricing page. Post on Twitter. |

**Target**: 1 video testimonial within 30 days of first user activation.

---

## Video Component Notes (for Dev)

When a video testimonial is ready to embed, add it to the testimonials section on the homepage above the text quotes. Consider:
- Autoplay muted with play button overlay (don't autoplay with sound)
- Show: name, company, role, platform they use
- Thumbnail should show their face + a caption overlay with the key quote
- Mobile: full-width, tap to play
