export interface CustomerReview {
  id: number;
  title: string;
  content: string;
  author: string;
  location?: string;
  rating: number;
  verified: boolean;
  category: "bracelets" | "earrings" | "rings";
  productType: string;
  productSlug?: string; // To link to actual product
}

export const customerReviews: CustomerReview[] = [
  // BRACELETS
  {
    id: 1,
    title: "Statement piece!",
    content: "I was worried this would be too heavy on my wrist, but it's surprisingly comfortable. The textured finish looks so expensive, almost like vintage gold. Wore it to a wedding in Delhi and got so many compliments.",
    author: "Meera K.",
    location: "Delhi",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Thick Statement Cuff"
  },
  {
    id: 2,
    title: "Better than the photos",
    content: "The way the light hits the texture is stunning. It's bold but doesn't look gaudy. Definitely my new go-to for evening events.",
    author: "Priyanshi S.",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Textured Gold Cuff"
  },
  {
    id: 3,
    title: "Gorgeous but bold",
    content: "This is definitely a statement piece. If you have very petite wrists, it might feel a bit loose, but I wear it over my sleeve and it looks chic. The quality is top-notch.",
    author: "Ananya R.",
    location: "Mumbai",
    rating: 4,
    verified: true,
    category: "bracelets",
    productType: "Statement Cuff"
  },
  {
    id: 4,
    title: "No tarnish yet",
    content: "I've worn this multiple times in this humid weather, and the gold plating hasn't faded at all. Really impressed with the anti-tarnish coating.",
    author: "Sneha M.",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Gold Plated Cuff"
  },
  {
    id: 5,
    title: "Looks like real gold",
    content: "My mom thought I bought real gold! The 'crumpled' texture gives it such a unique, artistic vibe. Love it.",
    author: "Riya G.",
    location: "Gurgaon",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Crumpled Gold Cuff"
  },
  {
    id: 6,
    title: "Perfect silver cuff",
    content: "Finally found a silver cuff that doesn't look cheap. The hammered texture is beautiful and adds edge to my work outfits.",
    author: "Kavita D.",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Silver Hammered Cuff"
  },
  {
    id: 7,
    title: "Secure clasp",
    content: "Was skeptical about the hinge, but it snaps shut very securely. Doesn't pop open even when I'm moving my hands a lot.",
    author: "Ishita B.",
    location: "Bangalore",
    rating: 4,
    verified: true,
    category: "bracelets",
    productType: "Hinged Bangle"
  },
  {
    id: 8,
    title: "Instant outfit elevator",
    content: "I can wear a plain white shirt and jeans, add this cuff, and suddenly I look dressed up. Best purchase this year.",
    author: "Tanisha V.",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Statement Cuff"
  },
  {
    id: 9,
    title: "Art on my wrist",
    content: "This doesn't look like jewelry; it looks like modern art. The fluid shape is so unique. I've never seen anything like this in local markets.",
    author: "Aishwarya N.",
    location: "Delhi",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Liquid Gold Bangle"
  },
  {
    id: 10,
    title: "So elegant",
    content: "The flowy design is mesmerizing. It hugs the wrist perfectly and doesn't pinch my skin. Feels very luxurious.",
    author: "Radhika P.",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Wavy Bangle"
  },
  {
    id: 11,
    title: "Unique design",
    content: "I love that it's not a perfect circle. The organic shape makes it stand out. A bit tricky to clasp with one hand initially, but I got the hang of it.",
    author: "Sanya K.",
    rating: 4,
    verified: true,
    category: "bracelets",
    productType: "Organic Shape Bangle"
  },
  {
    id: 12,
    title: "Premium finish",
    content: "The polish on this is mirror-like. It reflects everything! Came in beautiful packaging too, felt like opening a luxury gift.",
    author: "Neha J.",
    location: "Pune",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Polished Gold Bangle"
  },
  {
    id: 13,
    title: "Fluidity is key",
    content: "I love the 'liquid' look. It softens my corporate outfits without looking unprofessional. Fits my 6-inch wrist perfectly.",
    author: "Pooja S.",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Liquid Gold Bangle"
  },
  {
    id: 14,
    title: "Stunning shine",
    content: "Wore this for Diwali and it outshined my real jewelry. The gold tone is very rich, not that fake yellow color.",
    author: "Diya M.",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Gold Plated Bangle"
  },
  {
    id: 15,
    title: "Great for stacking",
    content: "I bought two to wear together on one arm. They clink a bit but look fabulous stacked. High-fashion vibes.",
    author: "Kriti A.",
    rating: 4,
    verified: true,
    category: "bracelets",
    productType: "Stackable Bangles"
  },
  {
    id: 16,
    title: "Smooth edges",
    content: "Sometimes metal cuffs have sharp edges that scratch, but this is incredibly smooth and rounded. Very high quality manufacturing.",
    author: "Vandana L.",
    location: "Hyderabad",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Wide Cuff"
  },
  {
    id: 17,
    title: "Understated luxury",
    content: "The matte finish is everything. It's not 'blingy' but looks incredibly expensive. Perfect for client meetings where I want to look professional.",
    author: "Simran K.",
    location: "Delhi",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Matte Gold Cuff"
  },
  {
    id: 18,
    title: "Scratch resistant",
    content: "I've been wearing this daily for weeks. Because of the brushed texture, you don't see micro-scratches like you do on shiny bracelets. Smart design.",
    author: "Anjali T.",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Brushed Gold Cuff"
  },
  {
    id: 19,
    title: "Old money aesthetic",
    content: "Gives off major 'quiet luxury' vibes. The gold tone is muted and sophisticated. Matches my watch perfectly.",
    author: "Rhea C.",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Wide Gold Cuff"
  },
  {
    id: 20,
    title: "Wide but comfy",
    content: "It covers a good part of the wrist but doesn't restrict movement. The hinge makes it easy to take on and off.",
    author: "Shweta P.",
    rating: 4,
    verified: true,
    category: "bracelets",
    productType: "Wide Hinged Cuff"
  },
  {
    id: 21,
    title: "Worth the price",
    content: "Compared to other brands selling similar wide cuffs, the weight and finish here are far superior. You can feel the quality.",
    author: "Nidhi S.",
    location: "Mumbai",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Wide Statement Cuff"
  },
  {
    id: 22,
    title: "Minimalist dream",
    content: "No stones, no fuss. Just pure, clean lines. Exactly what I was looking for.",
    author: "Esha G.",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Minimal Cuff"
  },
  {
    id: 23,
    title: "Dainty and durable",
    content: "I have thin wrists and most cuffs fall off. This one fits snugly and looks so delicate. Love the wavy pattern.",
    author: "Zoya K.",
    location: "Delhi",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Wavy Bangle"
  },
  {
    id: 24,
    title: "Everyday staple",
    content: "I haven't taken this off in 10 days. Showers, gym, sleep—it's still shiny. Tiora really delivers on the quality promise.",
    author: "Aditi M.",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Everyday Bangle"
  },
  {
    id: 25,
    title: "Modern design",
    content: "The wave design is simple but eye-catching. It's distinct enough to be noticed but subtle enough for daily wear.",
    author: "Farah Z.",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Wave Bangle"
  },
  {
    id: 26,
    title: "Great for gifting",
    content: "Bought this for my sister's birthday. She loves minimalist jewelry and this was a hit. The packaging made it ready to gift.",
    author: "Rohan V.",
    rating: 4,
    verified: true,
    category: "bracelets",
    productType: "Minimal Bangle"
  },
  {
    id: 27,
    title: "Office appropriate",
    content: "Doesn't make noise when I type on my keyboard! That's a huge plus for me. Looks very chic with a blazer.",
    author: "Saumya J.",
    location: "Gurgaon",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Sleek Bangle"
  },
  {
    id: 28,
    title: "Smooth mechanism",
    content: "The hinge is invisible when worn, which is a great detail. It opens wide so it's easy to put on even if you have larger hands.",
    author: "Tanvi R.",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Hinged Bangle"
  },
  {
    id: 29,
    title: "Mix and match",
    content: "I layer this with my watch and a few thread bracelets. It blends in perfectly. The gold plating matches my other 18k pieces.",
    author: "Lavanya S.",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Stackable Bangle"
  },
  {
    id: 30,
    title: "Elegant curves",
    content: "The bypass design (where the ends overlap) is very graceful. It sits flat on the wrist and doesn't catch on clothes.",
    author: "Preeti D.",
    rating: 4,
    verified: true,
    category: "bracelets",
    productType: "Bypass Bangle"
  },
  {
    id: 31,
    title: "Finally, good silver!",
    content: "Hard to find chunky silver jewelry that doesn't oxidize black in two days. This has held up amazingly well in Mumbai heat.",
    author: "Kiara A.",
    location: "Mumbai",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Silver Cuff"
  },
  {
    id: 32,
    title: "Futuristic look",
    content: "The silver finish is so polished it looks like liquid mercury. Very cool, futuristic vibe. Love pairing it with black outfits.",
    author: "Devika N.",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Polished Silver Cuff"
  },
  {
    id: 33,
    title: "Solid weight",
    content: "This isn't hollow or tinny. It has a nice weight to it that makes it feel expensive. Great value for money.",
    author: "Shanaya K.",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Silver Bangle"
  },
  {
    id: 34,
    title: "Chic alternative",
    content: "I usually wear gold, but this silver piece converted me. It looks so fresh and modern.",
    author: "Myra S.",
    rating: 4,
    verified: true,
    category: "bracelets",
    productType: "Silver Bangle"
  },
  {
    id: 35,
    title: "Smooth finish",
    content: "Zero rough edges. The quality control is excellent. Fits comfortably for 8+ hours.",
    author: "Anisha P.",
    location: "Bangalore",
    rating: 5,
    verified: true,
    category: "bracelets",
    productType: "Silver Cuff"
  },
  
  // EARRINGS
  {
    id: 36,
    title: "Not your basic hearts",
    content: "I usually find heart earrings tacky, but these 'crumpled' gold ones are so artistic. They catch the light beautifully. Wore them on a date and felt so chic.",
    author: "Ridhima S.",
    location: "Delhi",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Textured Heart Studs"
  },
  {
    id: 37,
    title: "Super lightweight",
    content: "These look like heavy melted gold, but they are actually very light. I wore them for a 9-hour shift and didn't feel a thing.",
    author: "Ananya K.",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Gold Drop Earrings"
  },
  {
    id: 38,
    title: "Perfect size for daily wear",
    content: "The textured huggies are my new daily staple. They hug the earlobe perfectly. The clasp is a bit tight initially, but at least I know they won't fall off.",
    author: "Pooja M.",
    location: "Mumbai",
    rating: 4,
    verified: true,
    category: "earrings",
    productType: "Textured Huggies"
  },
  {
    id: 39,
    title: "Looks like vintage gold",
    content: "The finish isn't that cheap shiny yellow; it has a rich, textured look like vintage jewelry. Matches my grandmother's gold bangle perfectly.",
    author: "Sanya R.",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Gold Huggies"
  },
  {
    id: 40,
    title: "Great for second piercings",
    content: "I wear the small textured hoops in my second piercing. They add such a nice edge to my ear stack.",
    author: "Kriti D.",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Mini Hoops"
  },
  {
    id: 41,
    title: "Unique texture",
    content: "Love the organic shape of the heart studs. They look different from every angle. Packaging was lovely too.",
    author: "Meera J.",
    rating: 4,
    verified: true,
    category: "earrings",
    productType: "Heart Studs"
  },
  {
    id: 42,
    title: "Compliment magnet",
    content: "Wore the heart studs to a brunch in Gurgaon and three people asked me where I got them. Tiora is my little secret now!",
    author: "Ishita B.",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Heart Studs"
  },
  {
    id: 43,
    title: "No irritation",
    content: "My ears usually get red with fashion jewelry, but these have been safe so far. The plating quality seems very high.",
    author: "Neha T.",
    location: "Bangalore",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Gold Plated Earrings"
  },
  {
    id: 44,
    title: "The perfect 'clean girl' aesthetic",
    content: "The liquid drop earrings are stunning. They look like molten gold frozen in time. Very minimal but impactful.",
    author: "Aishwarya N.",
    location: "Pune",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Liquid Drop Earrings"
  },
  {
    id: 45,
    title: "Office appropriate",
    content: "The twisted hoops are the perfect size—not too big for meetings, but stylish enough for after-work drinks. They look very professional.",
    author: "Simran K.",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Twisted Hoops"
  },
  {
    id: 46,
    title: "Classic with a twist",
    content: "I have so many hoops, but the triple-layer design on these makes them stand out. They have a nice shine.",
    author: "Radhika P.",
    rating: 4,
    verified: true,
    category: "earrings",
    productType: "Layered Hoops"
  },
  {
    id: 47,
    title: "Sturdy post",
    content: "The post doesn't bend easily like other brands. Feels very solid and durable.",
    author: "Vandana L.",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Stud Earrings"
  },
  {
    id: 48,
    title: "So versatile",
    content: "I've worn the fluid teardrops with a saree and a blazer. They work with both Indian and Western wear effortlessly.",
    author: "Diya S.",
    location: "Delhi",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Teardrop Earrings"
  },
  {
    id: 49,
    title: "High shine",
    content: "These are very shiny! If you like a glossy finish, go for it. I prefer matte, but these are growing on me.",
    author: "Kavita M.",
    rating: 4,
    verified: true,
    category: "earrings",
    productType: "Polished Hoops"
  },
  {
    id: 50,
    title: "Fast delivery",
    content: "Ordered these for a friend's birthday and they arrived in Delhi within 2 days. She loved the twisted design.",
    author: "Rohan V.",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Twisted Hoops"
  },
  {
    id: 51,
    title: "Looks expensive",
    content: "Honestly, they look like 18k solid gold. The weight is substantial but not dragging.",
    author: "Tanisha G.",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Gold Hoops"
  },
  {
    id: 52,
    title: "Summer vibes",
    content: "The white enamel hoops are so fresh! They look amazing with white linen shirts. A summer essential.",
    author: "Zoya K.",
    location: "Mumbai",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Enamel Hoops"
  },
  {
    id: 53,
    title: "Modern pearl",
    content: "This is not your grandma's pearl earring. The geometric gold setting makes it look so modern and architectural. Obsessed.",
    author: "Esha C.",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Pearl Geometric Earrings"
  },
  {
    id: 54,
    title: "Cute but small",
    content: "The white hoops are tinier than I expected, literally huggies. But they look very cute for daily wear.",
    author: "Nidhi P.",
    rating: 4,
    verified: true,
    category: "earrings",
    productType: "Mini Huggies"
  },
  {
    id: 55,
    title: "Elegant statement",
    content: "Wore the pearl geometric earrings to a client presentation. They made me feel powerful and put-together.",
    author: "Saumya J.",
    location: "Gurgaon",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Pearl Statement Earrings"
  },
  {
    id: 56,
    title: "Great contrast",
    content: "The mix of white and gold is beautiful. It pops against my dark hair.",
    author: "Aditi R.",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "White Gold Earrings"
  },
  {
    id: 57,
    title: "Secure backing",
    content: "The pearl earrings have a big back support so they don't droop on the earlobe. Very thoughtful design.",
    author: "Preeti S.",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Pearl Studs"
  },
  {
    id: 58,
    title: "Gift material",
    content: "Bought the enamel hoops for my sister. The packaging + the unique design made for a perfect gift.",
    author: "Aman D.",
    rating: 4,
    verified: true,
    category: "earrings",
    productType: "Enamel Hoops"
  },
  {
    id: 59,
    title: "Classy finish",
    content: "The enamel is smooth and perfectly applied. No bubbles or scratches. Quality control is on point.",
    author: "Rhea M.",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Enamel Earrings"
  },
  {
    id: 60,
    title: "Finally, cool tones!",
    content: "I'm a silver girlie and felt left out until I saw these. The texture makes them look like crushed foil. So cool.",
    author: "Kiara A.",
    location: "Delhi",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Silver Textured Huggies"
  },
  {
    id: 61,
    title: "Matches my watch",
    content: "I wear a silver watch daily and needed earrings to match. These are perfect. Simple but interesting.",
    author: "Devika N.",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Silver Huggies"
  },
  {
    id: 62,
    title: "No tarnish",
    content: "Silver usually turns black on me in Mumbai humidity. These have stayed bright silver for a month now.",
    author: "Shanaya K.",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Silver Plated Earrings"
  },
  {
    id: 63,
    title: "Edgy look",
    content: "These give a nice rock-chic vibe. I wear them with my leather jacket. A bit small, but great for stacking.",
    author: "Myra S.",
    rating: 4,
    verified: true,
    category: "earrings",
    productType: "Silver Mini Hoops"
  },
  {
    id: 64,
    title: "Great for sensitive ears",
    content: "Sterling silver usually irritates me, but these (I think they are plated?) haven't caused any itchiness.",
    author: "Anisha P.",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Hypoallergenic Earrings"
  },
  {
    id: 65,
    title: "Daily driver",
    content: "I sleep, shower, and work in these. They are so comfortable I forget they are there.",
    author: "Lavanya T.",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Everyday Huggies"
  },
  {
    id: 66,
    title: "Tiora is my new fav",
    content: "Better quality than the stuff I see on Instagram ads usually. The pieces feel solid.",
    author: "Shweta R.",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Gold Earrings"
  },
  {
    id: 67,
    title: "Good value",
    content: "For the price, the design and quality are excellent. Will definitely order more.",
    author: "Farah Z.",
    rating: 4,
    verified: true,
    category: "earrings",
    productType: "Designer Earrings"
  },
  {
    id: 68,
    title: "Packaging love",
    content: "The unboxing experience was so premium. The little pouch is great for traveling.",
    author: "Tanvi S.",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Gift Earrings"
  },
  {
    id: 69,
    title: "Statement yet minimal",
    content: "Tiora nails that balance between 'look at me' and 'I'm not trying too hard'.",
    author: "Priyanshi G.",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Minimal Statement Earrings"
  },
  {
    id: 70,
    title: "Fast shipping to Noida",
    content: "Ordered on Tuesday, got it on Thursday. Super quick service.",
    author: "Rahul K.",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Gold Hoops"
  },
  {
    id: 71,
    title: "Bridal party gift",
    content: "Bought 5 pairs for my bridesmaids. They all loved them!",
    author: "Sneha M.",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Bridal Earrings"
  },
  {
    id: 72,
    title: "Clip is tight",
    content: "The clasp is very secure, almost too tight, but I guess that's good so I don't lose them.",
    author: "Jyoti A.",
    rating: 4,
    verified: true,
    category: "earrings",
    productType: "Secure Clasp Earrings"
  },
  {
    id: 73,
    title: "Gold tone is perfect",
    content: "It's not that orange-gold. It's a nice subtle yellow gold that looks real.",
    author: "Bani J.",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "18k Gold Plated Earrings"
  },
  {
    id: 74,
    title: "Highly recommend",
    content: "My collection is slowly becoming just Tiora pieces. Love the aesthetic.",
    author: "Esha V.",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Tiora Collection"
  },
  {
    id: 75,
    title: "Heavy look, light feel",
    content: "Big earrings usually hurt my ears, but these are hollow or something because they weigh nothing.",
    author: "Aanya L.",
    rating: 5,
    verified: true,
    category: "earrings",
    productType: "Lightweight Statement Earrings"
  },

  // RINGS
  {
    id: 76,
    title: "Finally, rings that fit my swelling fingers!",
    content: "My finger size fluctuates so much in Delhi's heat. I love that I can just gently squeeze or widen these rings to fit perfectly every day. No more stuck rings!",
    author: "Meera K.",
    location: "Delhi",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Adjustable Ring"
  },
  {
    id: 77,
    title: "Best gift idea ever",
    content: "I wanted to gift a ring to my best friend but didn't know her size. The adjustable feature saved me! It fit her middle finger perfectly. She loves the multi-layered look.",
    author: "Priyanshi S.",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Layered Adjustable Ring"
  },
  {
    id: 78,
    title: "Sturdy adjustability",
    content: "Usually, adjustable rings feel flimsy, like they will snap if you bend them. These feel solid and high-quality. The metal has good resistance.",
    author: "Ananya R.",
    location: "Mumbai",
    rating: 4,
    verified: true,
    category: "rings",
    productType: "Adjustable Band"
  },
  {
    id: 79,
    title: "Fits any finger",
    content: "I love that I can wear the same ring on my thumb, index, or ring finger depending on my mood. It's like getting three rings in one.",
    author: "Sneha M.",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Versatile Ring"
  },
  {
    id: 80,
    title: "Online shopping made easy",
    content: "I was always scared to buy rings online because of sizing issues. Tiora's adjustable collection is a game changer. The gold finish is stunning too.",
    author: "Riya G.",
    location: "Gurgaon",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Gold Adjustable Ring"
  },
  {
    id: 81,
    title: "No pinching",
    content: "The open ends are rounded and smooth, so they don't pinch the skin underneath. Very comfortable for typing all day.",
    author: "Kavita D.",
    rating: 4,
    verified: true,
    category: "rings",
    productType: "Open Band Ring"
  },
  {
    id: 82,
    title: "Knuckle friendly",
    content: "I have large knuckles but thin fingers, so standard rings spin around. Because this is adjustable, I can get it over my knuckle and then tighten it for a snug fit. Genius.",
    author: "Ishita B.",
    location: "Bangalore",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Adjustable Fit Ring"
  },
  {
    id: 83,
    title: "Perfect for stacking",
    content: "Bought the double-band ring to stack with my wedding band. Since it's adjustable, I could make it sit perfectly flush against my other ring.",
    author: "Tanisha V.",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Stackable Ring"
  },
  {
    id: 84,
    title: "Looks like molten gold",
    content: "The 'liquid' design is so trendy right now. It looks like a custom piece I saw on a designer website for 10x the price. The polish is mirror-like.",
    author: "Aishwarya N.",
    location: "Delhi",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Liquid Gold Ring"
  },
  {
    id: 85,
    title: "Elegant wrap style",
    content: "The way it wraps around the finger is so elegant. It elongates my short fingers. Definitely a statement piece.",
    author: "Radhika P.",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Wrap Ring"
  },
  {
    id: 86,
    title: "Modern and chic",
    content: "I love the organic curve. It's not a boring circle. It feels very artistic and modern. Wore it to a gallery opening and fit right in.",
    author: "Sanya K.",
    rating: 4,
    verified: true,
    category: "rings",
    productType: "Sculptural Ring"
  },
  {
    id: 87,
    title: "Smooth edges",
    content: "Zero sharp bits. The teardrop ends are perfectly rounded. You can tell Tiora pays attention to the finishing details.",
    author: "Neha J.",
    location: "Pune",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Bypass Ring"
  },
  {
    id: 88,
    title: "Heavy look, light feel",
    content: "It looks chunky and substantial, but it's actually quite comfortable. Doesn't weigh my hand down.",
    author: "Pooja S.",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Statement Ring"
  },
  {
    id: 89,
    title: "No tarnish after 2 months",
    content: "I've been washing my hands with this on (oops) and the gold is still bright yellow. Tarnish-free claim is true!",
    author: "Diya M.",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Tarnish-Free Ring"
  },
  {
    id: 90,
    title: "Vintage vibes",
    content: "The hammered texture gives it such a cool, vintage look. It catches the light differently than smooth rings. My favorite piece from my order.",
    author: "Simran K.",
    location: "Delhi",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Textured Wide Band"
  },
  {
    id: 91,
    title: "Bold yet comfy",
    content: "I love wide bands but they usually make my finger sweaty. The open back on this allows for some airflow, making it surprisingly breathable.",
    author: "Anjali T.",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Wide Statement Ring"
  },
  {
    id: 92,
    title: "Looks expensive",
    content: "If you want that 'old money' aesthetic without spending thousands, get this ring. The texture makes it look like solid handcrafted gold.",
    author: "Rhea C.",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Luxury Look Ring"
  },
  {
    id: 93,
    title: "Great thumb ring",
    content: "I wear this as a thumb ring. Because it's wide and adjustable, it stays in place and doesn't slide off. Looks very edgy.",
    author: "Shweta P.",
    rating: 4,
    verified: true,
    category: "rings",
    productType: "Thumb Ring"
  },
  {
    id: 94,
    title: "Durable plating",
    content: "I scratch my jewelry a lot, but because of the textured surface, you can't see any scratches on this ring. It stays looking new.",
    author: "Nidhi S.",
    location: "Mumbai",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Textured Ring"
  },
  {
    id: 95,
    title: "Fresh summer look",
    content: "The white enamel mixed with gold is such a fresh combo. It pops against my tan skin. Perfect for summer outfits.",
    author: "Zoya K.",
    location: "Delhi",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Enamel Ring"
  },
  {
    id: 96,
    title: "Minimalist perfection",
    content: "The chevron ring is so dainty. I stack it with a plain band and it adds just the right amount of geometric detail.",
    author: "Aditi M.",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Chevron Ring"
  },
  {
    id: 97,
    title: "High quality enamel",
    content: "I was worried the white part would chip off, but it's very properly set. Looks like ceramic. Very premium feel.",
    author: "Farah Z.",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Enamel Band"
  },
  {
    id: 98,
    title: "Office appropriate",
    content: "It's subtle enough for my corporate job but stylish enough to be noticed. My boss actually complimented me on it!",
    author: "Rohan V.",
    rating: 4,
    verified: true,
    category: "rings",
    productType: "Professional Ring"
  },
  {
    id: 99,
    title: "Unique design",
    content: "I haven't seen this segmented bamboo-style design on other Indian sites. Tiora definitely has unique curation.",
    author: "Saumya J.",
    location: "Gurgaon",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Bamboo Ring"
  },
  {
    id: 100,
    title: "A work of art",
    content: "The wing design is breathtaking. It wraps around the finger so beautifully. It's delicate, so handle with care, but it's a stunner.",
    author: "Tanvi R.",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Wing Ring"
  },
  {
    id: 101,
    title: "The stacked look in one",
    content: "I love the multi-line ring because it looks like I'm wearing 5 stacked rings, but it's just one piece. So easy to style.",
    author: "Lavanya S.",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Multi-Band Ring"
  },
  {
    id: 102,
    title: "Boho chic",
    content: "The organic lines give a very boho-chic vibe. Looks great with maxi dresses. Adjusting it was super easy.",
    author: "Preeti D.",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Boho Ring"
  },
  {
    id: 103,
    title: "Statement maker",
    content: "You don't need any other jewelry when you wear the wing ring. It covers a good part of the finger and draws all the attention.",
    author: "Kiara A.",
    location: "Mumbai",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Statement Wing Ring"
  },
  {
    id: 104,
    title: "Delicate but strong",
    content: "Despite looking like fine wires, the ring holds its shape well. It doesn't bend out of shape unless you force it.",
    author: "Devika N.",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Wire Ring"
  },
  {
    id: 105,
    title: "Fast delivery to Noida",
    content: "Ordered on Monday, wearing it on Wednesday. The packaging was so cute, ready to gift!",
    author: "Shanaya K.",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Gift Ring"
  },
  {
    id: 106,
    title: "Great customer service",
    content: "I wasn't sure how the adjustable thing worked, but the team on WhatsApp explained it kindly. Very helpful.",
    author: "Myra S.",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Adjustable Ring"
  },
  {
    id: 107,
    title: "No green fingers!",
    content: "The biggest test for me—did it turn my finger green? Nope! Worn for 3 weeks straight. Safe for sensitive skin.",
    author: "Anisha P.",
    location: "Bangalore",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Hypoallergenic Ring"
  },
  {
    id: 108,
    title: "Value for money",
    content: "Compared to H&M or Zara jewelry which fades in two days, Tiora's quality is miles ahead for a similar price point.",
    author: "Lavanya T.",
    rating: 4,
    verified: true,
    category: "rings",
    productType: "Quality Ring"
  },
  {
    id: 109,
    title: "My new addiction",
    content: "I bought one ring to test, now I have five. The adjustable fit is just too convenient to pass up.",
    author: "Shweta R.",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Adjustable Collection"
  },
  {
    id: 110,
    title: "Gold tone is on point",
    content: "It matches my 18k real gold bracelet perfectly. You can't tell the difference.",
    author: "Priyanshi G.",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "18k Gold Plated Ring"
  },
  {
    id: 111,
    title: "Secure packaging",
    content: "Came in a sturdy box and a velvet pouch. No damage during shipping. Very professional.",
    author: "Rahul K.",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Premium Ring"
  },
  {
    id: 112,
    title: "Great for swollen knuckles",
    content: "If you have arthritis or swelling like me, these rings are a blessing. I can finally wear pretty rings again.",
    author: "Sneha M.",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Comfort Fit Ring"
  },
  {
    id: 113,
    title: "Chic and adjustable",
    content: "Usually adjustable rings look childish. These look mature and sophisticated. Very happy with my purchase.",
    author: "Jyoti A.",
    rating: 4,
    verified: true,
    category: "rings",
    productType: "Sophisticated Ring"
  },
  {
    id: 114,
    title: "Perfect fit every time",
    content: "I switch fingers throughout the day as my hands swell. Best invention ever.",
    author: "Bani J.",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Adjustable Band"
  },
  {
    id: 115,
    title: "Highly recommend Tiora",
    content: "Quality, design, and comfort. 10/10. Will be buying more for Diwali gifts.",
    author: "Esha V.",
    rating: 5,
    verified: true,
    category: "rings",
    productType: "Tiora Ring Collection"
  }
];

// Helper function to shuffle reviews
export const shuffleReviews = (reviews: CustomerReview[]): CustomerReview[] => {
  const shuffled = [...reviews];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Get reviews by category
export const getReviewsByCategory = (category: "bracelets" | "earrings" | "rings"): CustomerReview[] => {
  return customerReviews.filter(review => review.category === category);
};

// Get total review count
export const getTotalReviewCount = (): number => customerReviews.length;

// Get average rating
export const getAverageRating = (): number => {
  const total = customerReviews.reduce((sum, review) => sum + review.rating, 0);
  return Number((total / customerReviews.length).toFixed(1));
};
