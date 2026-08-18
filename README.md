# 💳 Smart Digital Wallet System

A smart NFC + QR-powered digital identity platform built for a physical wallet business. Each wallet contains an embedded AirTag with a unique QR code — connecting the physical product to a dynamic digital profile.

---

## 🧠 How It Works

The system handles two different user flows depending on who scans the wallet:

**If the owner scans their own wallet:**
- They are prompted to set up or edit their personal profile
- They can add their name, phone numbers, social media links, profile image, and any other contact info
- Changes are saved instantly and reflected on their public page

**If a stranger finds the wallet and scans it:**
- They see the owner's public profile page immediately
- They can contact the owner directly via the info on the page
- No login or account needed for the finder

---


## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js |
| Backend & Database | Supabase |
| Automation & Workflows | n8n |
| Identity | QR Code Generation + NFC (AirTag) |

---

## ✨ Features

- 🔐 **Owner vs. Finder detection** — smart flow based on who is scanning
- 📱 **NFC support** — tap any iPhone to instantly open the profile (no app needed)
- 🔗 **QR Code per user** — unique, auto-generated QR linked to each wallet
- 👤 **Custom profile page** — name, phone, social links, images
- 👥 **Multi-user** — manages hundreds of wallets and profiles from one admin dashboard
- ⚡ **Real-time updates** — profile changes reflect instantly via Supabase
- 🔄 **n8n automation** — handles workflow triggers and backend logic

---

## 🏗️ Architecture

```
Physical Wallet (QR + NFC)
        ↓
  User scans / taps
        ↓
   React Frontend
        ↓
  Is this the owner?
   ↙            ↘
Edit Profile    View Owner's
  Page          Public Page
        ↓
    Supabase (DB + Auth)
        ↓
   n8n (Automation layer)
```

---

## 🚀 Use Case

Built for a company selling smart physical wallets embedded with AirTags. Each wallet ships with a unique QR code pre-linked to a Supabase user record. The owner activates their wallet by scanning it and filling in their profile — turning a physical product into a dynamic digital business card.

---

## 📸 Screenshots

## How We Edit It
<img width="296" height="654" alt="image" src="https://github.com/user-attachments/assets/bf3a684d-97ca-4f18-a8bf-f35556a278d9" />

## How It Looks
<img width="592" height="519" alt="image" src="https://github.com/user-attachments/assets/cc8a28a3-a9ff-4f37-a136-2d139462b35b" />

---

## 📬 Contact

Built by [Youssef](https://linkedin.com/in/your-profile) — Full-Stack Developer & SaaS Founder based in Cairo, Egypt.
