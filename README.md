# 🌬️ OXYGEN — The New Age of AJO for Africa

Welcome to **OXYGEN**, a mobile-first, trust-powered AJO (rotational savings) app for Africa’s next generation of financial builders.

We fuse **traditional AJO logic** with **modern trust engines**, **auto-invest bots**, and **gamified financial psychology** — all beautifully wrapped in minimalist Nigerian-flavored UX.

---

## 🔧 Folder Structure Overview

| Folder/File                  | Purpose                                                             |
|-----------------------------|---------------------------------------------------------------------|
| `components/`               | React/Tailwind UI components (cards, buttons, screens)              |
| `guidelines/`               | Key design and trust logic specs (`Guidelines.md`)                  |
| `oxygen-docs.md`            | In-app content and UX microcopy logic                               |
| `styles/globals.css`        | Base TailwindCSS setup                                              |
| `App.tsx`                   | Root app logic and layout                                           |
| `README.md`                 | You are here                                                        |
| `oxygen-documentation.pdf`  | 🔥 Full breakdown of app logic, UX flows, cluster mechanics         |
| `oxygen-mvp-wireframe.pdf`  | Wireframes for key MVP screens                                      |
| `Oxygen App Documentation`  | Archived or exported ChatGPT doc with refined explanations          |

---

## 🚀 MVP Scope (Phase 1 Complete)

The MVP includes:

1. **Landing + Node Join**
2. **Dashboard (Daily Payout + Trust Sneak Peek)**
3. **Cluster Discovery (w/ Smart Filters)**
4. **Start a Pledge Unit (for Coordinators only)**
5. **Auto-Invest Vault Overview**
6. **Trust Hub** (hidden; 6 taps on app logo)
7. **Withdrawal Screen**
8. **Settings + Profile**
9. **Onboarding Experience (progressive trust framing)**
10. **Cluster Detail + Contribution Flow**

Bonus: Coordinators can optionally run clusters **without joining**, earning perks and trust scores.

---

## 🔑 Trust Engine Core (Access Matrix)

> Every feature inside OXYGEN is **progressively unlocked** via a Trust Score (0–100%).

| Score %       | User Tier          | Unlocks                                         |
|--------------|--------------------|-------------------------------------------------|
| 0–20%        | Observer            | Read-only, basic tutorials                      |
| 21–40%       | Entry Node          | Join ₦10–₦1000 clusters                         |
| 41–60%       | Trusted Hustler     | Auto-Invest, Pledge Creation                    |
| 61–80%       | Community Builder   | Launch large cycles, Invite-only clusters       |
| 81–100%      | Master Node         | Skip Vault locks, mentor clusters               |

---

## 🔐 Auto-Invest Engine Logic

Users can choose to auto-save a % of every payout. These funds:

- 🔒 Stay locked unless you're out of a cluster
- 📈 Earn passive yield in invisible micro-clusters
- 💥 Build Trust Score if kept untouched
- ❌ Drop Trust Score by 30–50% if withdrawn early

> Full details in: [`oxygen-documentation.pdf`](./oxygen-documentation.pdf)

---

## 🔍 Dev Mode (Internal Only)

OXYGEN includes a hidden **DevMode flag** in `App.tsx` or `.env.local`.

```ts
const isDevMode = true;
Unlocks:

Full Trust Score override

Access to all clusters

Testing flows normally locked by user tier

Auto-trigger any feature, including Trust Hub, Vaults, Coordinator View

⚠️ Be sure this is never shipped in production.

📚 Reference Docs
Doc Name	Purpose
oxygen-documentation.md	Full system logic, prompt-based UI, user rules
oxygen-mvp-wireframe.md	MVP wireframes and user flow diagrams
nigerian-ajo-research.md	Deep cultural + structural study of AJO in Nigeria
Guidelines.md	Trust Engine math, feature tiers, and access rules

🎨 Design Language & UX Notes
Uses progressive disclosure (Only in Trust Score unlocks features)

Nigerian chaos-order energy in layout/animation choices

Designed for PWA-first, dark theme, highly tactile interfaces

Hidden Trust Hub accessed by tapping app logo 6 times on dashboard

Celebratory UI/UX for moments like “cluster creation”, “first payout”, “trust milestone”, etc.

🧠 Contributor Notes
“Every time a user breathes OXYGEN, they earn their way into a deeper financial system.”

Keep dev structure clean. Use components/ to separate screens logically. If you want to test new logic, do it inside DevMode.

All new logic features must be backed by:

📜 Trust Rule

📊 Access Level

🔁 Cycle Logic

🔐 Failsafe

👑 Built By: KING & the OXYGEN AI Labs ⚡
If you’re reading this, you’re looking at the future of collective finance — with behavior-based control, peer economy, and absolute trust baked in.