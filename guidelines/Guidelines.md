# OXYGEN AJO SYSTEM – DEV GUIDE

This document outlines the traditional AJO system and how it is restructured and extended inside the OXYGEN app. It acts as a reference point for developers, especially in Cursor, to understand core logic, eligibility gates, and behavioral mechanics.

---

## 1. 🧾 Traditional AJO Overview

- Daily contributions from each member
- A single member receives the total pool each day
- Members take turns — based on registration order or random rotation
- Trust and discipline are the foundation
- Defaulting can crash the cycle

---

## 2. 🔁 Cycle Logic in OXYGEN

| **Parameter**           | **Definition**                                    |
| ----------------------- | ------------------------------------------------- |
| Total Members           | Number of participants in a Pledge Unit           |
| Daily Contribution      | Fixed amount per member per day                   |
| Daily Pool              | Total payout = members × daily contribution       |
| Cycle Duration          | Matches member count (e.g., 10 people = 10 days)  |
| Payout Rotation         | Random / First-in-first-out / Custom              |
| Auto Payout             | Paid automatically when it’s your turn            |

---

## 3. 🔐 Trust Engine Mechanics

Trust Score ranges from 0% – 100%. Based on behavior like:

- Daily commit streak
- Successful cycle completion
- Penalties for late/default
- Auto-invest behavior

### Trust Levels & Permissions

| **Score Range** | **Access**                                        |
| --------------- | ------------------------------------------------- |
| 0–20%           | View-only, no cluster participation               |
| 21–40%          | Low-tier clusters (₦100–₦1000 daily max)         |
| 41–60%          | Mid-tier clusters, unlock Auto-Invest             |
| 61–80%          | High-tier clusters, potential Coordinator role    |
| 81–100%         | All access, faster payouts, early withdrawal safe |

---

## 4. 💰 Auto-Invest Vault Rules

- Default auto-save: **20% of payout**
- Funds locked unless user exits all clusters
- Early withdrawal = Trust Score reset to 20%
- Vault powers:
  - Payout stabilization
  - AI micro-clusters
  - Interest-generation behind scenes

---

## 5. 🚫 Exit & Default Protocol

| **Behavior**                 | **Trust Penalty**            | **Effect**                              |
| --------------------------- | ---------------------------- | --------------------------------------- |
| 1-day late (soft default)   | -2%                          | Cluster notified                        |
| 3+ days default (hard)      | -10%                         | Skip payout, freeze contributions       |
| Post-payout early exit      | -40%                         | Loss of cluster access + penalties      |
| Auto-invest withdrawal      | Trust reset to 20%           | Lockout from high-paying clusters       |

---

## 6. 🧠 Developer Guidelines

### Conditional Access

- Trust Score gating must be enforced on:
  - Cluster joining
  - Cluster creation
  - Payout priority
  - Auto-Invest access

### Trust Score Regeneration (XP Style)

- Every on-time payment: +1% Trust
- Every full cycle completion: +5–7% Trust
- Referred user completes cycle: +2% Trust
- Max gain per cycle: 10–15%

---

## 7. 🚀 Admin Mode (For Superuser Access)

- Access via `devMode: true` in localStorage or feature flag
- Enables:
  - Force-unlock all features
  - See internal logs and cluster liquidity state
  - Edit cluster policies manually

**Not visible to regular users.** Built for debug/QA and super-admin usage only.

---

