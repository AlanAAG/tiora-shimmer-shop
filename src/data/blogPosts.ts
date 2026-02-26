export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  readingTime: number;
  date: string;
  content: string;
}

export type BlogCategory =
  | "Skin Sensitivity"
  | "Materials & Quality"
  | "Everyday Wear"
  | "Buying Guides";

export const blogCategories: BlogCategory[] = [
  "Skin Sensitivity",
  "Materials & Quality",
  "Everyday Wear",
  "Buying Guides",
];

export const blogPosts: BlogPost[] = [
  // Skin Sensitivity
  {
    slug: "best-jewelry-for-sensitive-skin",
    title: "Best Jewelry for Sensitive Skin: What Actually Works",
    excerpt:
      "If your skin reacts to most jewelry, you're not alone. Learn which metals and plating methods are safe for sensitive and allergy-prone skin.",
    category: "Skin Sensitivity",
    readingTime: 6,
    date: "2026-02-20",
    content: `
## Why Does Jewelry Irritate Sensitive Skin?

Most skin reactions to jewelry are caused by nickel—a common base metal found in costume and even some fine jewelry. When nickel comes into contact with sweat, it releases ions that penetrate the skin and trigger contact dermatitis: redness, itching, and sometimes blistering.

The problem is widespread. Studies estimate that **10–20% of the population** has some degree of nickel sensitivity, and the number is rising.

## What Metals Are Safe for Sensitive Skin?

Not all metals are created equal. Here's what dermatologists and allergists recommend:

### Surgical-Grade Stainless Steel (316L)

This is the gold standard for hypoallergenic jewelry. 316L stainless steel is the same grade used in medical implants—designed specifically to be biocompatible with human tissue.

- Nickel-free surface contact
- Extremely durable and corrosion-resistant
- Does not tarnish or oxidize

### 18K Gold Plating Over Stainless Steel

When a thick layer of 18K gold is applied over a surgical steel core, you get the warmth and luxury of gold without the risk. The key is plating thickness—thin plating wears off quickly, exposing the base metal beneath.

### Sterling Silver (925)

Pure silver is hypoallergenic, but most sterling silver contains trace amounts of other metals. High-quality silver plating over stainless steel eliminates this concern entirely.

## What to Avoid

- **Brass and copper base metals** — common irritants
- **Thin gold plating** — wears off within weeks
- **"Gold-filled" with unknown cores** — marketing can be misleading
- **Costume jewelry** — almost always contains nickel

## How to Choose Safe Jewelry

Look for brands that clearly disclose their base metal, plating thickness, and manufacturing standards. If a brand can't tell you exactly what's in their jewelry, that's a red flag.

The safest combination for sensitive skin is **surgical-grade stainless steel with thick 18K gold or silver plating**—durable, hypoallergenic, and designed to last.

[Explore hypoallergenic jewelry →](/shop)
    `,
  },
  {
    slug: "nickel-allergy-and-jewelry",
    title: "Nickel Allergy and Jewelry: A Complete Guide",
    excerpt:
      "Nickel is the most common cause of jewelry allergies. Understand why it happens and how to wear jewelry without reactions.",
    category: "Skin Sensitivity",
    readingTime: 5,
    date: "2026-02-15",
    content: `
## What Is a Nickel Allergy?

A nickel allergy is a type of allergic contact dermatitis. When nickel-containing jewelry touches your skin, your immune system mistakenly identifies nickel ions as harmful and mounts a response. Symptoms include:

- Redness and rash at the contact site
- Itching or burning sensation
- Dry, cracked skin
- In severe cases, blisters or fluid-filled bumps

Once you develop a nickel allergy, it's typically lifelong. The best approach is avoidance.

## Where Is Nickel Found in Jewelry?

Nickel is used as a hardening agent in many alloys:

- **White gold** often contains nickel to achieve its color
- **Costume jewelry** frequently uses nickel-containing alloys
- **Clasps, posts, and closures** — even in otherwise safe pieces
- **Plated jewelry with thin coatings** — nickel leaches through as plating wears

## How to Wear Jewelry With a Nickel Allergy

### Choose the Right Base Metal

The most reliable option is **316L surgical-grade stainless steel**. It's the same material used in surgical instruments and implants—engineered for biocompatibility.

### Look for Thick Plating

Thin plating is the biggest issue. It wears off within weeks, exposing the base metal. Quality 18K gold plating over stainless steel maintains its barrier for years with proper care.

### Avoid These Common Mistakes

- Don't rely on "hypoallergenic" labels alone — the term isn't regulated
- Don't assume expensive means safe — even fine gold jewelry can contain nickel
- Don't coat jewelry with nail polish — it's a temporary fix that chips and traps moisture

## The Bottom Line

If you have a nickel allergy, focus on the base metal, not the surface. Surgical-grade stainless steel with properly applied plating is the most reliable, long-term solution.

[Shop nickel-free jewelry →](/shop)
    `,
  },
  {
    slug: "can-you-shower-with-gold-plated-jewelry",
    title: "Can You Shower With Gold-Plated Jewelry?",
    excerpt:
      "Water, soap, and steam can damage certain jewelry. Here's what happens when gold-plated pieces get wet—and which ones survive.",
    category: "Skin Sensitivity",
    readingTime: 4,
    date: "2026-02-10",
    content: `
## The Short Answer

It depends entirely on the base metal and plating quality.

Most gold-plated jewelry **should not** be worn in the shower. Water, soap, and steam accelerate plating wear, causing the gold layer to thin and eventually expose the base metal—which may cause skin reactions and tarnishing.

However, not all gold-plated jewelry is the same.

## Why Most Gold-Plated Jewelry Fails

Traditional gold-plated jewelry uses a thin layer of gold (often 0.5–1 micron) over brass or copper. This plating:

- Wears off within 2–6 months of regular wear
- Degrades faster with water, sweat, and chemicals
- Exposes nickel or copper, causing green skin or allergic reactions

## When Gold-Plated Jewelry Can Handle Water

The equation changes when you upgrade both the **base metal** and the **plating thickness**:

### Stainless Steel Core

316L surgical-grade stainless steel doesn't corrode, rust, or react with water. Even if plating thins over time, the base metal remains safe and non-reactive.

### Thick 18K Gold Plating

Quality plating at 2.5+ microns creates a durable barrier. Combined with anti-tarnish treatment, these pieces can withstand occasional water exposure without visible degradation.

## Best Practices

- Remove jewelry before swimming in chlorinated pools or saltwater
- Pat dry if your jewelry gets wet
- Store pieces in a dry, enclosed space
- Clean with a soft cloth periodically

## The Standard to Look For

The most water-resistant gold-plated jewelry combines a **stainless steel core, thick 18K gold plating, and anti-tarnish protection**. This combination allows for everyday wear including occasional water contact.

[Explore water-resistant jewelry →](/shop)
    `,
  },

  // Materials & Quality
  {
    slug: "stainless-steel-vs-sterling-silver-jewelry",
    title: "Stainless Steel vs. Sterling Silver Jewelry: Which Is Better?",
    excerpt:
      "Both are popular choices, but they differ in durability, maintenance, and skin safety. Here's an honest comparison.",
    category: "Materials & Quality",
    readingTime: 6,
    date: "2026-02-18",
    content: `
## Overview

Stainless steel and sterling silver are two of the most popular metals in contemporary jewelry. Both have loyal followings, and both have genuine strengths. The right choice depends on your priorities.

## Durability

### Stainless Steel

316L surgical-grade stainless steel is one of the hardest metals used in jewelry. It:

- Resists scratches, dents, and bending
- Does not tarnish, rust, or corrode
- Maintains its finish for years without polishing
- Withstands daily wear, sweat, and water exposure

### Sterling Silver

Sterling silver (92.5% pure silver) is softer and more prone to:

- Tarnishing when exposed to air, moisture, or chemicals
- Scratching with regular wear
- Requiring periodic polishing and maintenance

**Verdict:** Stainless steel wins for low-maintenance durability.

## Skin Safety

### Stainless Steel

316L is the same grade used in medical implants. It's inherently hypoallergenic and nickel-free at the surface level—safe for virtually all skin types.

### Sterling Silver

Pure silver is hypoallergenic, but sterling silver alloys may contain trace metals that cause reactions in sensitive individuals. The copper content (7.5%) can also cause green discoloration on some skin types.

**Verdict:** Stainless steel is safer for sensitive skin.

## Appearance

Sterling silver has a distinctive cool, bright luster that many people love. Stainless steel has a similar cool tone but slightly more industrial.

When used as a **base for gold plating**, stainless steel provides a superior foundation—harder, smoother, and more resistant to plating wear.

## Cost

Stainless steel is more affordable to produce, which means higher quality at accessible price points. Sterling silver carries a higher material cost, which is often reflected in retail pricing.

## The Best of Both Worlds

The most practical approach: **stainless steel core with 18K gold or 925 silver plating**. You get the durability and skin safety of surgical steel with the luxury finish of your preferred metal.

[Browse our collections →](/shop)
    `,
  },
  {
    slug: "what-is-18k-gold-plated-jewelry",
    title: "What Is 18K Gold-Plated Jewelry? Everything You Need to Know",
    excerpt:
      "Gold plating varies wildly in quality. Learn what 18K gold plating actually means, how it's applied, and what separates quality from costume.",
    category: "Materials & Quality",
    readingTime: 5,
    date: "2026-02-12",
    content: `
## What Does "18K Gold Plated" Mean?

18K gold plating means a layer of 18-karat gold (75% pure gold) has been electroplated onto a base metal. The "18K" refers to the purity of the gold layer itself, not the entire piece.

This is different from:

- **Solid gold** — the entire piece is gold alloy
- **Gold-filled** — a thick gold layer mechanically bonded to base metal (5% gold by weight)
- **Gold vermeil** — gold plating specifically over sterling silver

## Why Quality Varies So Much

The biggest variable in gold-plated jewelry is **plating thickness**. Industry standards measure this in microns:

| Quality Level | Thickness | Expected Lifespan |
|---|---|---|
| Flash plating | 0.175 microns | Days to weeks |
| Standard plating | 0.5–1 micron | 2–6 months |
| Heavy plating | 2.5+ microns | 1–3 years |

Cheap plated jewelry uses flash or minimal plating. It looks identical to quality plating in photos but fails rapidly with wear.

## The Base Metal Matters

The metal underneath the gold determines:

- **Skin safety** — brass and copper can cause reactions; stainless steel won't
- **Durability** — soft base metals dent and warp; stainless steel holds its shape
- **Plating adhesion** — smoother, harder surfaces hold plating better

The strongest foundation for gold plating is **316L surgical-grade stainless steel**.

## How to Identify Quality Gold Plating

- The brand discloses exact base metal and plating specifications
- The piece feels substantial, not hollow or lightweight
- Edges and details are crisp, not blurred
- The color is warm and rich, not brassy or orange
- Anti-tarnish coating is applied over the gold layer

## What to Expect

Quality 18K gold-plated jewelry over stainless steel should maintain its appearance for **1–3 years** with regular wear, and longer with proper care. That's significantly better than traditional plated costume jewelry.

[Discover 18K gold-plated pieces →](/shop)
    `,
  },
  {
    slug: "does-gold-plated-jewelry-tarnish",
    title: "Does Gold-Plated Jewelry Tarnish? How to Prevent It",
    excerpt:
      "Tarnishing is the most common complaint about plated jewelry. Here's the science behind it and practical steps to keep your pieces looking new.",
    category: "Materials & Quality",
    readingTime: 4,
    date: "2026-02-05",
    content: `
## Why Gold-Plated Jewelry Tarnishes

Gold itself doesn't tarnish. But gold-plated jewelry can appear to tarnish for two reasons:

1. **The gold layer wears thin**, exposing the base metal beneath — which then oxidizes
2. **Chemical reactions** between the plating and external substances (perfume, lotion, sweat, chlorine)

The thinner the gold layer, the faster this happens.

## Factors That Accelerate Tarnishing

- **Sweat and body oils** — acidic pH can erode thin plating
- **Perfumes and lotions** — chemicals react with metal surfaces
- **Water exposure** — especially chlorinated or saltwater
- **Friction** — rubbing against clothing or other jewelry
- **Humidity** — moisture in storage environments

## How to Prevent Tarnishing

### Choose the Right Foundation

The single most important factor is **base metal quality**. Stainless steel doesn't oxidize or corrode, so even if plating thins, the base won't tarnish or cause skin discoloration.

### Follow the "Last On, First Off" Rule

Put jewelry on **after** applying perfume, lotion, and sunscreen. Remove it **before** showering, swimming, or exercising.

### Store Properly

- Keep pieces in a dry, enclosed space
- Use anti-tarnish pouches or bags
- Store pieces individually to prevent scratching

### Clean Regularly

- Wipe with a soft, dry cloth after wearing
- For deeper cleaning, use mild soap and lukewarm water, then dry thoroughly
- Avoid harsh chemicals, ultrasonic cleaners, or abrasive cloths

## Anti-Tarnish Technology

Premium jewelry brands now apply a protective clear coat over the gold plating. This invisible barrier:

- Shields the gold layer from chemical exposure
- Reduces friction-based wear
- Extends the plating lifespan significantly

Combined with a stainless steel core and thick plating, anti-tarnish protection creates jewelry that maintains its appearance through daily wear.

[View our care guide →](/care-guide)
    `,
  },

  // Everyday Wear
  {
    slug: "jewelry-you-can-wear-everyday",
    title: "Jewelry You Can Wear Every Day Without Worrying",
    excerpt:
      "The best everyday jewelry should be durable, comfortable, and low-maintenance. Here's what to look for and what to avoid.",
    category: "Everyday Wear",
    readingTime: 5,
    date: "2026-02-22",
    content: `
## What Makes Jewelry "Everyday Wearable"?

Not all jewelry is built for daily use. Everyday pieces need to meet a higher standard:

- **Durability** — withstands constant contact, movement, and friction
- **Comfort** — lightweight enough to forget you're wearing it
- **Skin safety** — no reactions even after hours of continuous wear
- **Low maintenance** — doesn't require daily removal or frequent cleaning
- **Water resistance** — handles occasional hand washing, rain, and sweat

## Materials That Work for Everyday Wear

### Best: Surgical-Grade Stainless Steel (316L)

This is the most practical base metal for daily jewelry. It's the same material used in surgical instruments—engineered to be tough, corrosion-resistant, and biocompatible.

When finished with thick 18K gold or silver plating and anti-tarnish protection, it creates pieces you can genuinely wear without thinking about them.

### Good: Solid Gold (14K–18K)

Solid gold is durable and hypoallergenic, but comes at a significantly higher price point. 14K is harder and more scratch-resistant than 18K.

### Avoid: Brass, Copper, or Thin-Plated Metals

These corrode quickly, cause skin reactions, and lose their appearance within weeks of daily wear.

## Best Everyday Jewelry Styles

### Rings

Look for smooth, low-profile designs that won't catch on clothing or surfaces. Adjustable fits accommodate natural finger size fluctuations throughout the day.

### Earrings

Studs and small hoops are the most practical for daily wear. Lightweight construction prevents ear fatigue.

### Bracelets

Thin, flexible designs that sit close to the wrist work best. They should move freely without sliding off or digging in.

### Necklaces

Delicate chains with minimal pendants layer well and stay comfortable under clothing. Look for secure clasps that won't come undone.

## The Daily Wear Test

Quality everyday jewelry should pass this test: Can you wear it for 16 hours straight—through work, exercise, cooking, and sleeping—without irritation, damage, or visible wear?

If the answer is yes, you've found pieces worth investing in.

[Shop everyday essentials →](/shop)
    `,
  },
  {
    slug: "how-to-layer-jewelry-like-a-pro",
    title: "How to Layer Jewelry Like a Pro: Rules and Combinations",
    excerpt:
      "Layering jewelry creates depth and personal style. Learn the key principles of pairing rings, necklaces, and bracelets without looking overdone.",
    category: "Everyday Wear",
    readingTime: 5,
    date: "2026-02-08",
    content: `
## Why Layering Works

Layered jewelry creates visual interest and dimension that single pieces can't achieve alone. It's also deeply personal—your combination of pieces tells your story.

The key is **intentional curation**, not random accumulation.

## The Core Layering Principles

### 1. Vary the Lengths

For necklaces, use 2–3 pieces with at least 2 inches of separation between each:

- **Choker or collar** (14–16 inches)
- **Princess length** (17–19 inches)
- **Matinee length** (20–24 inches)

The visual spacing creates a cascading effect that draws the eye downward.

### 2. Mix Textures, Not Metals

Mixing gold and silver can work in contemporary styling, but it's easier to start by mixing textures within one metal family:

- Pair a delicate chain with a chunkier link
- Combine a smooth band ring with a textured one
- Mix matte and polished finishes

### 3. Create a Focal Point

Every layered look needs one anchor piece that draws attention. Everything else should complement, not compete.

- A statement ring among delicate bands
- A pendant necklace among plain chains
- A wider cuff among thin bangles

### 4. Odd Numbers

Groups of three or five tend to look more balanced than pairs. This applies to stacked rings, layered necklaces, and grouped bracelets.

## Layering by Category

### Rings

Start with 2–3 rings across both hands. Vary the width and place them on different fingers. Leave some fingers bare for breathing room.

### Necklaces

Begin with two chains at clearly different lengths. Add a third only if the neckline allows space. V-necks and scoop necks are ideal for layering.

### Bracelets

Group 2–4 pieces on one wrist. Mix styles (chain, bangle, cuff) but keep a cohesive metal tone.

## Common Mistakes

- **Too many statement pieces** — competing focal points create visual noise
- **Identical lengths** — chains tangle and pendants cluster
- **Ignoring the outfit** — busy necklines fight with layered necklaces
- **Overthinking it** — the best combinations often happen naturally

## The Minimalist Approach

If you prefer subtlety, limit yourself to two pieces per zone (neck, wrist, hands). Choose complementary styles and let negative space do the work.

[Explore pieces to layer →](/shop)
    `,
  },
  {
    slug: "minimalist-jewelry-trends",
    title: "Minimalist Jewelry Trends That Stand the Test of Time",
    excerpt:
      "Trends come and go, but certain minimalist jewelry styles remain relevant year after year. Here are the ones worth investing in.",
    category: "Everyday Wear",
    readingTime: 4,
    date: "2026-01-28",
    content: `
## Why Minimalism Endures

Minimalist jewelry works because it follows a timeless principle: **simplicity communicates confidence**. Ornate, trend-driven pieces date quickly. Clean lines and organic shapes don't.

The most enduring minimalist designs share three traits:

1. **Geometric simplicity** — circles, ovals, clean curves
2. **Restrained proportion** — not too large, not too small
3. **Quality materials** — the simplicity highlights craftsmanship

## Timeless Minimalist Styles

### Thin Band Rings

Simple, stackable bands in gold or silver never go out of style. They work alone for understated elegance or stacked for personal expression.

### Small Hoop Earrings

Hoops between 12mm–20mm are universally flattering. They're sophisticated enough for professional settings and relaxed enough for weekends.

### Delicate Chain Necklaces

A fine chain with minimal ornamentation sits perfectly at the collarbone. It layers beautifully and works with virtually any neckline.

### Slim Cuff Bracelets

Open cuffs with clean lines are both comfortable and visually striking. An adjustable fit means one size works for most wrist sizes.

## What Makes Minimalist Jewelry "Investment Worthy"

### Material Quality

With minimalist pieces, there's nowhere for poor quality to hide. Every surface is visible, so the metal finish, plating uniformity, and edge quality matter more than in ornate designs.

### Versatility

Investment pieces should work across contexts: office, dinner, gym, travel. If you need to remove it for certain activities, it's not truly versatile.

### Longevity

The best minimalist jewelry is built on durable foundations—surgical-grade stainless steel with thick plating—so it looks the same after a year of daily wear as it did on day one.

## The Minimalist Capsule

If you're building a jewelry wardrobe from scratch, start with these five pieces:

1. A pair of small gold hoops
2. A thin gold band ring
3. A delicate chain necklace
4. A slim cuff bracelet
5. A pair of classic studs

These five pieces create dozens of combinations and cover virtually any occasion.

[Build your capsule collection →](/shop)
    `,
  },

  // Buying Guides
  {
    slug: "how-to-choose-jewelry-that-lasts",
    title: "How to Choose Jewelry That Actually Lasts",
    excerpt:
      "Most jewelry degrades within months. Learn the five factors that determine longevity and how to identify pieces built for years of wear.",
    category: "Buying Guides",
    readingTime: 6,
    date: "2026-02-25",
    content: `
## The Longevity Problem

The average piece of fashion jewelry lasts 3–6 months before showing significant wear: fading, tarnishing, plating loss, or structural failure. This isn't acceptable, but most consumers don't know what to look for.

Here are the five factors that determine how long jewelry actually lasts.

## 1. Base Metal

This is the foundation. Everything else depends on it.

| Base Metal | Durability | Skin Safety | Corrosion Resistance |
|---|---|---|---|
| 316L Stainless Steel | Excellent | Excellent | Excellent |
| Sterling Silver | Good | Good | Moderate |
| Brass | Poor | Poor | Poor |
| Copper | Poor | Poor | Poor |
| Zinc Alloy | Poor | Poor | Poor |

**The standard:** 316L surgical-grade stainless steel. It's the same material used in medical implants—tested for biocompatibility and engineered for decades of use.

## 2. Plating Thickness

This determines how long the surface finish maintains its appearance.

- **Flash plating (< 0.5 microns):** Wears off within weeks
- **Standard plating (0.5–1 micron):** Lasts 2–6 months
- **Heavy plating (2.5+ microns):** Lasts 1–3 years with care

Most brands don't disclose plating thickness. If they won't tell you, assume it's minimal.

## 3. Anti-Tarnish Protection

A clear protective coating over the plating shields it from:

- Body chemistry (sweat, oils)
- Environmental factors (humidity, pollutants)
- Chemical exposure (perfume, lotions)

This single addition can double or triple the effective lifespan of gold plating.

## 4. Construction Quality

Look for:

- **Smooth, even edges** — no rough spots that catch on fabric
- **Secure closures** — clasps that don't open accidentally
- **Proper weight** — too light often means hollow or thin
- **Consistent finish** — no blotchy or uneven plating

## 5. Design Simplicity

Complex designs with many moving parts, thin connection points, or intricate filigree are more prone to structural failure. The most durable jewelry tends to be clean and well-proportioned.

## The Quality Checklist

Before purchasing, verify:

- [ ] Base metal is clearly disclosed
- [ ] Plating thickness is specified or the brand has a reputation for quality
- [ ] Anti-tarnish protection is included
- [ ] The piece feels substantial in hand
- [ ] Reviews confirm long-term wear quality

[Shop long-lasting jewelry →](/shop)
    `,
  },
  {
    slug: "gold-plated-vs-gold-filled-vs-solid-gold",
    title: "Gold Plated vs. Gold Filled vs. Solid Gold: What's the Difference?",
    excerpt:
      "Understanding gold jewelry terminology helps you make informed decisions. Here's a clear, no-nonsense comparison of the three main types.",
    category: "Buying Guides",
    readingTime: 5,
    date: "2026-02-02",
    content: `
## The Three Types of Gold Jewelry

When shopping for gold jewelry, you'll encounter three main categories. Each has distinct characteristics, price points, and lifespans.

## Solid Gold

**What it is:** An alloy of pure gold mixed with other metals for hardness. The karat number indicates gold content:

- 24K = 99.9% gold (too soft for jewelry)
- 18K = 75% gold
- 14K = 58.3% gold
- 10K = 41.7% gold

**Pros:**
- Never tarnishes or fades
- Can be resized and repaired
- Retains material value
- Hypoallergenic (in higher karats)

**Cons:**
- Expensive ($200–$5,000+ per piece)
- Softer and more prone to scratching (especially 18K+)
- Risk of theft or loss due to high value

## Gold Filled

**What it is:** A thick layer of gold mechanically bonded to a base metal (usually brass). Must be at least 5% gold by total weight.

**Pros:**
- More gold than plating (20–100x thicker)
- Lasts 10–30 years with care
- More affordable than solid gold

**Cons:**
- Cannot be resized
- Eventually wears through to base metal
- Base metal is usually brass (potential skin reactions)
- Limited design options due to manufacturing process

## Gold Plated

**What it is:** A thin layer of gold electroplated onto a base metal. Quality varies enormously based on plating thickness and base metal.

**Pros:**
- Most affordable gold-look option
- Widest range of designs available
- Can be extremely durable when done right

**Cons:**
- Quality varies wildly between brands
- Cheap versions fade within weeks
- "Gold plated" alone doesn't indicate quality

## The Modern Standard

The best value proposition in today's market is **thick 18K gold plating over 316L surgical-grade stainless steel**:

- 10x more durable base than brass or copper
- Hypoallergenic regardless of plating condition
- Anti-tarnish protection extends finish lifespan
- Accessible price point ($30–$80 per piece)
- Design flexibility for contemporary styles

This combination gives you the appearance and feel of fine jewelry with practical everyday durability.

[Explore the collection →](/shop)
    `,
  },
  {
    slug: "jewelry-gift-guide-for-her",
    title: "Jewelry Gift Guide for Her: What She Actually Wants",
    excerpt:
      "Choosing jewelry for someone else feels risky. This guide helps you pick pieces she'll love based on her style, not guesswork.",
    category: "Buying Guides",
    readingTime: 5,
    date: "2026-01-20",
    content: `
## Why Jewelry Gifts Feel Overwhelming

Jewelry is personal. Unlike most gifts, it lives on the recipient's body and becomes part of their identity. The fear of choosing wrong stops many people from giving jewelry at all.

But it doesn't have to be complicated. Most successful jewelry gifts follow predictable patterns.

## Read Her Current Style

The best predictor of what she'll love is **what she already wears**. Pay attention to:

### Metal Preference
Does she wear mostly gold, silver, or mixed metals? This is the most important clue. Getting the metal right covers 50% of the decision.

### Size Preference
Does she lean toward delicate, minimal pieces or bolder statement items? Look at her everyday jewelry—not occasion pieces.

### Style Indicators
- **Classic/timeless:** Simple shapes, clean lines, understated
- **Trendy/fashion-forward:** Current styles, layered looks, mixed textures
- **Bohemian/organic:** Natural shapes, earthy tones, handcrafted feel
- **Minimalist/modern:** Geometric, architectural, less is more

## Safe Picks by Category

### If You're Unsure: Earrings

Earrings are the safest category because sizing isn't an issue. Small hoops and classic studs work for virtually every style.

### If She's Minimalist: Rings

Thin bands and simple geometric shapes. Adjustable designs eliminate the sizing concern.

### If She Layers: Necklaces

A delicate chain in her preferred metal is always welcome for layering. Choose a length she doesn't already have.

### If She's Practical: Bracelets

A slim cuff or adjustable chain bracelet is comfortable for daily wear and easy to pair with other pieces.

## Quality Over Size

A common mistake is choosing larger, more elaborate pieces to "impress." Most women prefer smaller, well-crafted jewelry they can wear daily over large pieces that sit in a drawer.

**Focus on material quality, not visual impact.**

## The Presentation

How you give jewelry matters as much as what you choose. A thoughtful card explaining why you chose that piece transforms a gift from nice to meaningful.

[Shop gifts for her →](/shop)
    `,
  },
];
