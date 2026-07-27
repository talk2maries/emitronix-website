# Emitronix AI Image Production Prompts

Status: approved prompt set for local production
Use case: original, photorealistic website imagery
Generation method: built-in image generation, one call per distinct master scene

## Source boundary

The desktop `Photos` files are private reference material only. Do not attach, upload, pass, transform, edit, or lightly filter any original photo. The generated result must be newly composed and must not reproduce a person, project, building, sign, logo, document, vehicle, registration plate, or confidential detail from the source folder. The only permitted image input is the repository-owned official Emitronix logo for homepage prompts P01-P03, following the specific branding exception approved on 27 July 2026.

Every scene is representative editorial imagery. It is not a documentary photograph of Emitronix personnel or a completed Emitronix project. Authority-related imagery does not depict, represent, or imply endorsement by an authority.

## Output profiles

- **H:** landscape 16:9 master for 1920×1080, portrait-safe 4:5 derivative for 1080×1350, and 1200×630 social crop.
- **S:** landscape 16:9 service/approval master for 1920×1080, portrait-safe 4:5 derivative for 1080×1350, and 1200×630 social crop.
- **P:** 4:3 master for 1600×1200 and portrait-safe 4:5 derivative for 1080×1350.
- **C:** 3:2 master for 1600×1067, composed to remain clear in responsive card crops.
- **T:** 3:2 master for 1600×1067, portrait-safe 4:5 derivative for 1080×1350, and 1200×630 social crop.
- **B:** landscape 16:9 master for 1600×900, portrait-safe 4:5 derivative for 1080×1350, and 1200×630 social crop.

Generated masters should use realistic optics and natural texture, not glossy architectural CGI. Keep the palette neutral, daylight-led and compatible with Emitronix’s premium white-and-blue interface.

## Approved live-site prompts

### P01 — Homepage construction-company hero

```text
Use case: photorealistic-natural
Asset type: homepage hero
Intended page: Emitronix homepage at /
Input images: the repository-owned official Emitronix horizontal logo is a supporting brand insert only; no private reference photo is used.
Subject: a substantial reinforced-concrete high-rise building under active construction with a clearly visible tower crane, viewed by three anonymous site leaders standing safely with their backs to the camera.
UAE environment: realistic Dubai construction context, pale concrete, clean controlled work areas and blue sky; no iconic landmark or identifiable real project.
Camera angle: cinematic wide low-to-eye-level architectural photograph, natural 28–35 mm lens perspective.
Lighting: crisp natural UAE morning daylight, realistic highlights and neutral white balance.
Composition: the high-rise and tower crane dominate the frame; three rear-facing workers form a strong central foreground group. Keep the workers, logo backs, crane mast and building core within the central mobile-safe crop.
PPE and safety: every site person wears correctly fitted hard hat, high-visibility vest, long trousers and safety boots; barriers, access routes and housekeeping appear credible; no unsafe pose or active hazard.
Style and mood: premium corporate construction photography, powerful, capable and credible, with white-and-blue PPE compatible with the website.
Aspect ratio and outputs: H profile — 16:9 landscape master, central 4:5 mobile crop and 1200×630 social crop.
Constraints: place the exact official Emitronix horizontal logo clearly across the upper back of each representative vest or jacket; preserve its spelling and colors. Synthetic representative people only; realistic anatomy, PPE, structure and crane geometry; the image is illustrative, not a real Emitronix project or employee photograph.
Prohibited elements: no source-photo reconstruction, altered or invented Emitronix mark, other logos, readable text beyond the exact Emitronix logo, signs, authority branding, project boards, client marks, watermarks, registration plates, identifiable faces, famous buildings, distorted anatomy, malformed PPE, impossible machinery or exaggerated futuristic architecture.
```

Output base: `public/images/generated/home/dubai-construction-company-hero`

### P02 — Homepage project-control coordination

```text
Use case: photorealistic-natural
Asset type: large homepage editorial panel
Intended page: homepage project-control section at /
Input images: the repository-owned official Emitronix horizontal logo is a supporting brand insert only; no private reference photo is used.
Subject: three anonymous representative engineers viewed mainly from behind while coordinating high-rise site activity from a safe briefing point; the rising concrete structure and tower crane are clearly visible.
UAE environment: clean, controlled outdoor work area within a modern Dubai high-rise construction site, without an identifiable real location.
Camera angle: medium-wide eye-level documentary photograph with a natural 35 mm lens.
Lighting: crisp natural daylight, restrained contrast and no cinematic color cast.
Composition: the rear-facing engineers, their branded PPE backs, the tower crane and high-rise structure form a crop-safe central group for both 4:3 and 4:5 use.
PPE and safety: complete hard hats, high-visibility vests, safety footwear and suitable eye protection; safe standing positions, unobstructed access and tidy cables.
Style and mood: candid, premium and technically credible; subtle cool-blue equipment accents and a clean white/neutral palette.
Aspect ratio and outputs: P profile — 4:3 master for 1600×1200 and portrait-safe 4:5 derivative.
Constraints: place the exact official Emitronix horizontal logo clearly across the upper back of each representative vest or jacket; people are synthetic representatives and not Emitronix employees; documents and screens remain blank or unreadable.
Prohibited elements: no source-photo imitation, real-person likeness, altered or invented Emitronix mark, other company or authority logos, readable plans, screens, badges or text beyond the exact logo, watermarks, unsafe behavior, exposed live wiring, distorted anatomy, duplicated limbs, malformed PPE or implausible services.
```

Output base: `public/images/generated/home/project-control-coordination`

### P03 — Homepage quality and safety inspection

```text
Use case: photorealistic-natural
Asset type: large homepage editorial panel
Intended page: homepage quality-and-safety section at /
Input images: the repository-owned official Emitronix horizontal logo is a supporting brand insert only; no private reference photo is used.
Subject: two or three anonymous representative inspectors viewed mainly from behind while reviewing reinforcement, formwork, edge protection and concrete-pour readiness at an active high-rise site; a tower crane and rising concrete structure are clearly visible.
UAE environment: organized outdoor Dubai high-rise construction zone with pale concrete, realistic temporary works and clear blue sky; no identifiable project.
Camera angle: eye-level to slightly elevated three-quarter view from outside the controlled work zone, natural 35 mm perspective.
Lighting: crisp but not harsh morning daylight with realistic shadows and detailed material texture.
Composition: reinforcement and formwork lead the eye toward the inspectors; keep the rear-facing branded PPE, tower crane and building structure within the central portrait-safe crop.
PPE and safety: hard hats, high-visibility vests, safety boots, gloves and eye protection; protected edges, barriers, safe walking route and clean work area.
Style and mood: disciplined QA/HSE editorial photography, premium, credible and uncluttered.
Aspect ratio and outputs: P profile — 4:3 master for 1600×1200 and portrait-safe 4:5 derivative.
Constraints: place the exact official Emitronix horizontal logo clearly across the upper back of each representative vest or jacket; the scene is illustrative and the people are not verified employees; reinforcement, formwork and PPE must be physically plausible.
Prohibited elements: no copied project details, altered or invented Emitronix mark, other logos, text beyond the exact logo, watermarks, authority insignia, project signs, identifiable faces, unsafe edge exposure, workers standing on reinforcement, warped steel, distorted anatomy or stylized CGI.
```

Output base: `public/images/generated/home/quality-safety-inspection`

### P04 — About engineering-coordination hero

```text
Use case: photorealistic-natural
Asset type: About page hero
Intended page: /about and its Arabic equivalent
Input images: none; create a new scene from text only.
Subject: a representative multidisciplinary engineering team holding a concise site briefing beside an orderly civil construction area, communicating collaboration and practical coordination.
UAE environment: contemporary Dubai construction context with light-colored structures, dry climate, shaded briefing point and blue sky; no identifiable real development.
Camera angle: wide eye-level environmental portrait using a natural 35 mm lens.
Lighting: bright open shade with soft morning sun in the background, natural skin tones and restrained contrast.
Composition: five synthetic professionals in a loose collaborative formation, not posed as a corporate portrait; preserve full heads, hands and key PPE in the 4:5 crop and leave calm negative space.
PPE and safety: correctly fitted hard hats, clean high-visibility vests, long workwear and safety boots; one person may hold a blank tablet; safe distance from active operations.
Style and mood: trustworthy, experienced and premium without staged stock-photo gestures; white, neutral and restrained blue visual accents.
Aspect ratio and outputs: H profile — 16:9 landscape, portrait-safe 4:5 and 1200×630 social crop.
Constraints: synthetic people only, varied but natural UAE workforce representation, no claim that they are Emitronix employees.
Prohibited elements: no resemblance to reference people, named employees or public figures; no logos, badges, readable text, plans, watermarks, unsafe PPE, crossed or duplicated limbs, distorted hands, landmark buildings or fake project branding.
```

Output base: `public/images/generated/company/engineering-coordination-dubai-hero`

### P05 — About civil-site review

```text
Use case: photorealistic-natural
Asset type: About page editorial panel
Intended page: civil-site review section on /about
Input images: none; text-only original generation.
Subject: a representative civil engineer reviewing concrete edges, drainage falls and protected utility interfaces on an organized site.
UAE environment: realistic Dubai low-rise construction area with pale aggregate, sun protection and clean access; no identifiable project.
Camera angle: medium-wide three-quarter view from waist height, 35–50 mm documentary perspective.
Lighting: soft late-morning daylight with accurate concrete and soil texture, no dramatic grading.
Composition: civil details occupy the foreground while the engineer checks a blank tablet from a safe path; keep the subject central for mobile.
PPE and safety: hard hat, high-visibility vest, safety boots, gloves and protective eyewear; barriers and covers around openings; no live excavation entry.
Style and mood: calm technical inspection photography, high-end but natural.
Aspect ratio and outputs: P profile — 4:3 master and 4:5 mobile derivative.
Constraints: representative illustrative review only; all utility and drainage details must be plausible and unbranded.
Prohibited elements: no reference-site reconstruction, logos, readable screens, labels, signs, authority marks, watermarks, identifiable face, open hazards, distorted hands, impossible drainage or decorative futuristic elements.
```

Output base: `public/images/generated/company/civil-site-review-dubai`

### P06 — Services overview hero

```text
Use case: photorealistic-natural
Asset type: services overview hero
Intended page: /services and its Arabic equivalent
Input images: none; text-only original generation.
Subject: an integrated construction scene showing civil structure, a warehouse frame and neatly coordinated electrical and HVAC services in one believable facility.
UAE environment: modern Dubai light-industrial/commercial district with clean site roads, sunlit exterior and realistic regional materials; no identifiable project.
Camera angle: wide architectural three-quarter view, 28 mm lens, photographed from a safe elevated platform.
Lighting: clear natural daylight with soft shadows and balanced interior/exterior exposure.
Composition: civil and structural work anchors one side, service coordination is readable on the other, and a small fully equipped team adds scale; central crop remains coherent.
PPE and safety: every person wears complete PPE and remains behind appropriate barriers; clean access, protected edges and tidy materials.
Style and mood: premium service-capability photography, precise and realistic, with restrained blue details that sit naturally within the white-and-blue website.
Aspect ratio and outputs: H profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: one coherent real-world construction environment, not a collage; illustrative only.
Prohibited elements: no source-photo recreation, logos, readable text, authority marks, project signs, watermark, registration plates, identifiable people, unsafe scaffolding, floating ducts, warped structure, distorted machinery or science-fiction architecture.
```

Output base: `public/images/generated/services/construction-services-dubai-hero`

### P07 — Industries hero

```text
Use case: photorealistic-natural
Asset type: industries overview hero
Intended page: /industries and its Arabic equivalent
Input images: none; create a new scene from text only.
Subject: a coherent UAE business district containing a modern logistics warehouse, a contemporary low-rise commercial building and a clean light-industrial facility.
UAE environment: realistic Dubai edge-of-city context, dry landscaping, clean roads and blue sky, without identifiable landmarks or real projects.
Camera angle: broad elevated architectural view with a natural 35 mm-equivalent perspective, not an extreme drone shot.
Lighting: early-morning daylight with soft long shadows, clear air and neutral color.
Composition: three building types form a balanced visual sequence; no dominant fantasy tower; reserve simple sky and facade areas for responsive overlays and keep the main facilities visible in a 4:5 crop.
PPE and safety: only a few distant representative workers, if any, wearing complete PPE and staying within controlled work areas.
Style and mood: high-end corporate architecture photography, realistic materials, premium but understated.
Aspect ratio and outputs: H profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: the scene illustrates industry types and is not a portfolio claim.
Prohibited elements: no copied buildings, iconic skyline, logos, company names, readable signs, branded vehicles, registration plates, watermarks, identifiable people, empty futuristic megastructures or impossible geometry.
```

Output base: `public/images/generated/company/dubai-construction-industries-hero`

### P08 — Construction technical-resources hero

```text
Use case: photorealistic-natural
Asset type: resources-page hero
Intended page: /resources and its Arabic equivalent
Input images: none; text-only original generation.
Subject: two representative engineers reviewing generic construction drawings, a tablet and coordinated MEP details on a clean worktable near a site.
UAE environment: shaded technical review area within a modern Dubai construction setting, with bright UAE daylight beyond.
Camera angle: medium-wide over-the-shoulder documentary view, 35–50 mm lens, with faces secondary to the work.
Lighting: soft open shade, natural daylight highlights and crisp but not legible paper detail.
Composition: table and hands form the focal point; drawings contain only abstract lines and no text; preserve both people and the review material in the mobile crop.
PPE and safety: correctly fitted hard hats, high-visibility vests and safety footwear; the review occurs in a designated safe area away from active hazards.
Style and mood: factual knowledge-hub photography, calm and precise with subtle blue-gray accents.
Aspect ratio and outputs: H profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: all documents and screens are generic, blank or unreadable; people are synthetic representatives.
Prohibited elements: no source-photo imitation, confidential drawings, readable annotations, company or authority logos, ID cards, project names, watermarks, identifiable faces, distorted hands, floating stationery or unsafe site behavior.
```

Output base: `public/images/generated/company/construction-technical-resources-dubai-hero`

### P09 — Contact project-consultation hero

```text
Use case: photorealistic-natural
Asset type: contact-page hero
Intended page: /contact and its Arabic equivalent
Input images: none; text-only original generation.
Subject: an owner representative and two synthetic engineers discussing a project brief at a safe viewing point overlooking a clean Dubai construction setting.
UAE environment: realistic low-rise Dubai commercial/industrial context with blue sky, light-colored architecture and no identifiable address or project.
Camera angle: wide environmental portrait at eye level using a 35 mm lens.
Lighting: welcoming morning daylight with soft facial light and natural color.
Composition: conversational triangular grouping, natural gestures and a blank folder or tablet; leave uncluttered space for contact-page copy and keep all people within a central mobile crop.
PPE and safety: site-facing people wear complete PPE; the owner representative wears visitor PPE; all stand behind a proper guardrail in a designated viewing area.
Style and mood: approachable, premium and professional, never staged as a testimonial.
Aspect ratio and outputs: H profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: representative consultation only; synthetic people are not employees, clients or named individuals.
Prohibited elements: no source-person resemblance, logos, branded folders, readable text, signs, project boards, watermarks, identifiable landmark, registration plates, handshakes toward camera, distorted hands, unsafe railings or fake endorsement cues.
```

Output base: `public/images/generated/company/dubai-project-consultation-hero`

### P10 — Engineering leadership site review

```text
Use case: photorealistic-natural
Asset type: leadership feature image
Intended page: /leadership; suitable for metadata on /founder while the founder monogram remains in the visible profile
Input images: none; text-only original generation with no real-person reference.
Subject: three experienced-looking but entirely synthetic engineering leaders reviewing site sequencing together, with the work rather than their identities as the focus.
UAE environment: clean Dubai construction site observation zone with a restrained commercial backdrop and no identifiable project.
Camera angle: medium-wide candid environmental portrait, eye level, natural 50 mm lens.
Lighting: soft morning open shade, realistic skin and fabric texture, subtle background sunlight.
Composition: collaborative side-on review, natural hands around a blank tablet, no one looking at camera; leave room for page copy and protect faces/hands in a 4:5 crop.
PPE and safety: hard hats, high-visibility vests, long workwear, safety boots and glasses where appropriate; safe viewing position and clear access.
Style and mood: calm senior judgment, engineering credibility and premium editorial realism.
Aspect ratio and outputs: T profile — 3:2 master, portrait-safe 4:5 and 1200×630 social crop.
Constraints: do not attempt to depict the Emitronix founder, leadership team or any real person; image is illustrative.
Prohibited elements: no facial resemblance to reference people, employees or public figures; no logos, names, badges, readable text, watermarks, heroic staged pose, unsafe PPE, distorted fingers or impossible site equipment.
```

Output base: `public/images/generated/team/engineering-leadership-site-review`

### P11 — Representative construction team

```text
Use case: photorealistic-natural
Asset type: careers and team feature image
Intended page: /careers and reusable team sections in English and Arabic
Input images: none; text-only original generation with synthetic people.
Subject: a diverse representative construction team of engineers, supervisors and skilled workers participating in a pre-task briefing.
UAE environment: tidy Dubai commercial or industrial site muster area with bright blue sky and neutral construction materials.
Camera angle: wide eye-level environmental group photograph, 35 mm lens, candid rather than posed.
Lighting: clean morning daylight with open shade on faces and realistic garment texture.
Composition: a natural semicircle around a supervisor holding a blank board; enough environmental context to communicate construction; everyone remains visible in a central 4:5 crop.
PPE and safety: all people wear correctly fitted hard hats, high-visibility vests, safety boots and role-appropriate gloves/eye protection; safe spacing, barrier-controlled background and immaculate housekeeping.
Style and mood: inclusive, competent, professional and premium, with restrained blue PPE accents.
Aspect ratio and outputs: T profile — 3:2 master, portrait-safe 4:5 and 1200×630 social crop.
Constraints: synthetic representatives only; no claim that they work for Emitronix.
Prohibited elements: no source-person likeness, company uniforms or logos, readable toolbox-talk sheets, ID cards, signs, watermarks, crossed limbs, duplicated people, distorted faces/hands, loose PPE or unsafe behavior.
```

Output base: `public/images/generated/team/construction-team-dubai`

### P12 — Civil contracting

```text
Use case: photorealistic-natural
Asset type: service-page hero
Intended page: /civil and its service aliases/Arabic equivalent
Input images: none; text-only original generation.
Subject: reinforcement, formwork and concrete-pour readiness for a realistic low- to mid-rise Dubai building, with a representative engineer inspecting the work.
UAE environment: organized outdoor construction site in Dubai, pale concrete, dry climate and clear blue sky; no identifiable real project.
Camera angle: wide three-quarter site view from a protected walkway, natural 28–35 mm lens.
Lighting: clear morning daylight with accurate steel, timber and concrete texture.
Composition: structural work leads toward the inspector; maintain useful negative space and a strong central mobile crop.
PPE and safety: complete PPE, protected edges, secure access, stable formwork, capped or safely controlled reinforcement and clean housekeeping.
Style and mood: technically credible, premium construction editorial photography.
Aspect ratio and outputs: S profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: realistic construction sequence and materials; illustrative only.
Prohibited elements: no copied site, logos, project signs, readable text, watermarks, identifiable people, exposed hazards, workers on unsafe reinforcement, warped rebar, impossible formwork, distorted hands or CGI gloss.
```

Output base: `public/images/generated/services/civil-contracting-dubai`

### P13 — Main contracting

```text
Use case: photorealistic-natural
Asset type: service-page hero
Intended page: /main-contracting and its service aliases/Arabic equivalent
Input images: none; text-only original generation.
Subject: a representative main-contractor coordination meeting linking generic drawings, visible site execution and a near-completion handover area.
UAE environment: modern Dubai commercial construction site with clean access and a realistic low-rise urban background.
Camera angle: wide eye-level documentary photograph with 35 mm perspective.
Lighting: bright open shade with natural daylight and restrained contrast.
Composition: three professionals confer beside a safe workface; drawings are unreadable; depth shows coordinated trades without turning into a collage; central crop remains complete.
PPE and safety: full PPE for every person, segregated pedestrian route, proper barriers and tidy material storage.
Style and mood: accountable, coordinated and premium, with candid working gestures and subtle blue accents.
Aspect ratio and outputs: S profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: synthetic representative people only; scene is illustrative, not evidence of an Emitronix contract.
Prohibited elements: no source-photo recreation, logos, branded uniforms, readable plans/screens, watermarks, identifiable faces, unsafe access, ceremonial handshakes, distorted hands, floating equipment or implausible building geometry.
```

Output base: `public/images/generated/services/main-contracting-dubai`

### P14 — Warehouse construction

```text
Use case: photorealistic-natural
Asset type: service-page hero
Intended page: /warehouse-construction and its service aliases/Arabic equivalent
Input images: none; text-only original generation.
Subject: a modern logistics warehouse under construction with credible long-span steel framing, a prepared slab zone, loading-bay structure and coordinated overhead services.
UAE environment: Dubai logistics district with dry climate, clean yard, bright blue sky and no identifiable facility.
Camera angle: wide interior-to-exterior architectural view, 24–28 mm lens without extreme distortion.
Lighting: abundant natural daylight through the open frame, realistic steel highlights and soft shadows.
Composition: strong structural rhythm leads into the scene; two distant engineers provide scale; central portrait crop retains frame, slab and people.
PPE and safety: full PPE, protected work zones, stable access equipment, no one beneath suspended loads and tidy material staging.
Style and mood: premium industrial photography, spacious, practical and realistic rather than futuristic.
Aspect ratio and outputs: S profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: physically plausible steel, slab and service coordination; illustrative only.
Prohibited elements: no real warehouse copy, logos, rack labels, readable signs, watermarks, registration plates, unsafe lifting, warped beams, floating ducts, distorted machinery, impossible spans or empty science-fiction architecture.
```

Output base: `public/images/generated/services/warehouse-construction-dubai`

### P15 — Industrial construction

```text
Use case: photorealistic-natural
Asset type: service-page hero
Intended page: /industrial-buildings and its service aliases/Arabic equivalent
Input images: none; text-only original generation.
Subject: a realistic light-industrial facility showing structural bays, a utility zone, service routes and safe maintenance access for operational equipment.
UAE environment: clean Dubai industrial estate with robust materials, dry daylight and no identifiable company or plant.
Camera angle: wide three-quarter interior photograph, 28 mm lens from a designated walkway.
Lighting: balanced skylight and practical industrial illumination, neutral color and detailed textures.
Composition: structural and utility zones are clearly connected; one small representative team inspects from a safe distance; portrait crop keeps equipment and people.
PPE and safety: hard hats, high-visibility vests, safety footwear, eye protection and safe exclusion distances; protected equipment and clear egress.
Style and mood: orderly, capable and premium industrial editorial photography.
Aspect ratio and outputs: S profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: equipment and service paths must be plausible and unbranded; scene is illustrative.
Prohibited elements: no factory trademarks, logos, readable panels, warning text, watermarks, identifiable people, exposed live parts, unsafe access, distorted machinery, floating pipework, excessive sparks, smoke or futuristic automation.
```

Output base: `public/images/generated/services/industrial-construction-dubai`

### P16 — Commercial construction

```text
Use case: photorealistic-natural
Asset type: service-page hero
Intended page: /commercial-buildings and its service aliases/Arabic equivalent
Input images: none; text-only original generation.
Subject: a contemporary low- to mid-rise commercial building at a controlled construction stage, showing facade progress, clean civil work and fit-out readiness.
UAE environment: realistic Dubai business district edge with dry landscaping, broad pavement and blue sky; no famous skyline or identifiable project.
Camera angle: wide street-level three-quarter architectural view with a natural 28–35 mm lens.
Lighting: clear early-morning daylight, soft shadows and neutral facade color.
Composition: building occupies the visual center with an orderly work zone and a few PPE-equipped professionals for scale; leave sky and facade breathing room and protect the subject in a 4:5 crop.
PPE and safety: complete PPE, proper perimeter barriers, segregated access and no unsafe facade work.
Style and mood: premium commercial architecture and construction photography, realistic and understated.
Aspect ratio and outputs: S profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: illustrative original building only; plausible facade and construction details.
Prohibited elements: no copied tower, recognizable landmark, logos, tenant names, readable signs, watermarks, license plates, unsafe scaffolding, distorted workers, impossible cantilevers or exaggerated futuristic design.
```

Output base: `public/images/generated/services/commercial-construction-dubai`

### P17 — Villa construction

```text
Use case: photorealistic-natural
Asset type: service-page hero
Intended page: /villa-construction and its service aliases/Arabic equivalent
Input images: none; text-only original generation.
Subject: a premium but realistic UAE villa during a late construction and finishing stage, with protected surfaces, facade detailing and a small supervised work area.
UAE environment: anonymous Dubai residential context with boundary landscaping, warm stone and stucco materials, clean street edge and blue sky.
Camera angle: wide eye-level three-quarter architectural photograph, 28–35 mm lens.
Lighting: soft golden morning daylight, natural materials and restrained highlights.
Composition: villa remains the hero; controlled work area and two representative professionals add context; preserve the entrance and team in the central mobile crop.
PPE and safety: complete PPE in active areas, stable access equipment, protected finishes and spotless housekeeping.
Style and mood: sophisticated residential construction photography, calm and credible, not ostentatious.
Aspect ratio and outputs: S profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: original generic villa design; illustrative only and not a completed Emitronix property.
Prohibited elements: no copied residence, occupant identity, address, logos, readable signs, watermarks, registration plates, unsafe ladders, distorted architecture, malformed hands or exaggerated palace/futuristic styling.
```

Output base: `public/images/generated/services/villa-construction-dubai`

### P18 — Interior fit-out

```text
Use case: photorealistic-natural
Asset type: service-page hero
Intended page: /interior and its service aliases/Arabic equivalent
Input images: none; text-only original generation.
Subject: a high-quality commercial office fit-out in progress, with refined partitions, ceiling details, protected finishes and coordinated HVAC/electrical interfaces.
UAE environment: contemporary anonymous Dubai office interior with bright daylight and regionally appropriate premium materials.
Camera angle: wide interior architectural view from eye level, controlled 24–28 mm lens with straight verticals.
Lighting: soft window daylight plus neutral practical lighting, accurate whites and gentle shadows.
Composition: finished and in-progress zones create depth; two representative fit-out professionals inspect details without dominating; mobile crop retains both zones.
PPE and safety: hard hats, high-visibility vests and safety footwear in the active zone; floor protection, tidy tools and safe access.
Style and mood: premium, clean and detail-focused, compatible with white-and-blue corporate design.
Aspect ratio and outputs: S profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: plausible ceiling and service coordination; illustrative only.
Prohibited elements: no copied office, company logos, tenant branding, readable screens or room signs, watermarks, visible confidential documents, loose wires, unsafe ladders, warped furniture, distorted hands or excessive luxury fantasy.
```

Output base: `public/images/generated/services/interior-fit-out-dubai`

### P19 — Building renovation

```text
Use case: photorealistic-natural
Asset type: service-page hero
Intended page: /building-renovation and its service aliases/Arabic equivalent
Input images: none; text-only original generation.
Subject: an existing Dubai commercial building undergoing a careful upgrade, with localized civil modification, protected retained finishes and controlled new work.
UAE environment: realistic anonymous Dubai property with mature neutral materials, dry daylight and a clean occupied-building context.
Camera angle: wide three-quarter view that clearly distinguishes retained and active work areas without a split-screen before/after effect.
Lighting: natural morning daylight with even exposure and realistic surface wear.
Composition: protected existing area leads toward a neat renovation workface; one representative engineer checks alignment; keep both context and workface in mobile crop.
PPE and safety: full PPE in the active zone, dust control, barriers, floor protection and tidy debris management.
Style and mood: careful, premium and practical renovation editorial photography.
Aspect ratio and outputs: S profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: one coherent illustrative scene, not evidence of a real transformation.
Prohibited elements: no copied property, logos, readable notices, branded hoarding, watermarks, occupants, unsafe demolition, uncontrolled dust, exposed hazards, distorted hands, broken geometry or staged before/after labels.
```

Output base: `public/images/generated/services/building-renovation-dubai`

### P20 — Structural works

```text
Use case: photorealistic-natural
Asset type: service-page hero
Intended page: /structural-works and its service aliases/Arabic equivalent
Input images: none; text-only original generation.
Subject: detailed structural-work scene showing accurately tied reinforcement, concrete formwork, embedded interfaces and inspection readiness.
UAE environment: organized Dubai building site with pale concrete, shaded workface and strong natural daylight beyond.
Camera angle: medium-wide technical three-quarter view from a safe platform, 35 mm lens.
Lighting: crisp directional daylight with realistic metal, timber and concrete texture.
Composition: reinforcement grid and formwork create clear visual order; a representative inspector remains secondary; preserve critical details in portrait crop.
PPE and safety: complete PPE, protected access, stable formwork, edge protection and safe reinforcement treatment.
Style and mood: precise construction-detail photography, clean and credible rather than dramatic.
Aspect ratio and outputs: S profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: structurally plausible detailing; illustrative only.
Prohibited elements: no reference-site replication, logos, tags, readable inspection sheets, watermarks, unsafe standing on reinforcement, uncapped hazards, warped rebar, floating embeds, distorted hands or impossible structural geometry.
```

Output base: `public/images/generated/services/structural-works-dubai`

### P21 — Design and build

```text
Use case: photorealistic-natural
Asset type: service-page hero
Intended page: /design-build and its service aliases/Arabic equivalent
Input images: none; text-only original generation.
Subject: a representative designer and site engineer aligning a simple unbranded physical model, generic drawings and visible real construction conditions.
UAE environment: safe project-review space overlooking a modern anonymous Dubai commercial site.
Camera angle: medium-wide eye-level documentary photograph, 35–50 mm lens.
Lighting: soft open shade on people and documents with warm UAE daylight in the background.
Composition: natural working interaction around the model; all plan content abstract and unreadable; visual line connects the review table to the construction area; mobile crop preserves people, model and site.
PPE and safety: complete site PPE, safe protected review position, clear access and no contact with active operations.
Style and mood: collaborative, buildability-led and premium, with neutral surfaces and subtle blue accents.
Aspect ratio and outputs: S profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: synthetic representative people; generic model and documents; illustrative only.
Prohibited elements: no copied design, real project model, logos, readable drawings/screens, watermarks, identifiable people, hard-hat misuse, distorted hands, floating model parts or futuristic architecture.
```

Output base: `public/images/generated/services/design-build-contractor-dubai`

### P22 — Turnkey construction

```text
Use case: photorealistic-natural
Asset type: service-page hero
Intended page: /turnkey-construction and its service aliases/Arabic equivalent
Input images: none; text-only original generation.
Subject: a near-complete commercial or warehouse facility where coordinated civil work, refined finishes, electrical and HVAC services and final inspection readiness are visible together.
UAE environment: realistic Dubai light-industrial/commercial setting with bright exterior daylight and no identifiable client or project.
Camera angle: wide interior architectural photograph looking toward the completed facade or loading area, 24–28 mm lens.
Lighting: balanced skylight and neutral interior lighting, clean whites and natural material color.
Composition: coherent single space moving from finished foreground to controlled final-work zone; a small representative team reviews from a safe route; central crop remains readable.
PPE and safety: complete PPE in active areas, protected finishes, clear egress, tidy tools and barriers around remaining work.
Style and mood: integrated, completion-focused and premium, without staged celebration.
Aspect ratio and outputs: S profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: plausible trade interfaces; illustrative only.
Prohibited elements: no real project recreation, logos, branded equipment, readable signs, watermarks, ceremonial ribbon, occupants, unsafe energization, floating services, distorted people or unrealistic perfection.
```

Output base: `public/images/generated/services/turnkey-construction-dubai`

### P23 — Project management

```text
Use case: photorealistic-natural
Asset type: service-page hero
Intended page: /project-management and its service aliases/Arabic equivalent
Input images: none; text-only original generation.
Subject: a representative project manager and two engineers coordinating programme, generic drawings and site-progress observations in a designated review area.
UAE environment: modern Dubai construction site with an organized workface, bright climate and no identifiable development.
Camera angle: medium-wide candid eye-level photograph using a natural 35 mm lens.
Lighting: soft morning daylight with realistic skin, paper and PPE textures.
Composition: the manager points naturally to a blank or unreadable programme board while the team reviews the site; no one faces camera; preserve hands, board and context in mobile crop.
PPE and safety: full PPE, proper guardrail, safe separation from active work and clear pedestrian route.
Style and mood: controlled, communicative and premium, avoiding generic boardroom stock-photo cues.
Aspect ratio and outputs: S profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: synthetic representatives only; image demonstrates process, not project evidence.
Prohibited elements: no source-person likeness, logos, readable schedules, dates, costs or screens, watermarks, identifiable project, unsafe railings, distorted fingers, fake employee badges or celebratory poses.
```

Output base: `public/images/generated/services/project-management-dubai`

### P24 — MEP works

```text
Use case: photorealistic-natural
Asset type: technical service feature
Intended page: MEP sections within /industrial-buildings, /projects and relevant service content; no new route
Input images: none; text-only original generation.
Subject: a clean coordinated service corridor with physically plausible electrical containment, HVAC ducts, chilled-water or plumbing pipework and accessible valves.
UAE environment: modern Dubai commercial or light-industrial building interior with robust finishes and no identifiable facility.
Camera angle: wide slightly upward technical view from a safe maintenance walkway, 24–28 mm lens with straight geometry.
Lighting: bright neutral service-area lighting with soft daylight spill and detailed metal textures.
Composition: service layers are orderly, separated and maintainable; one distant representative engineer adds scale; preserve key routes in portrait crop.
PPE and safety: engineer wears hard hat, high-visibility vest, safety boots and eye protection; walkway and access clear; no exposed live parts or leaks.
Style and mood: precise engineering photography, clean, premium and realistic.
Aspect ratio and outputs: S profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: services must have credible supports, clearances and connection logic; illustrative only.
Prohibited elements: no logos, readable labels, panel text, watermarks, authority branding, unsafe open wiring, leaking pipes, floating conduits, impossible intersections, warped ducts, distorted worker or excessive color coding.
```

Output base: `public/images/generated/services/mep-works-dubai`

### P25 — Testing and commissioning

```text
Use case: photorealistic-natural
Asset type: technical service feature
Intended page: testing and commissioning sections within /dewa-approvals, /industrial-buildings and /projects; no new route
Input images: none; text-only original generation.
Subject: a representative engineer conducting a controlled commissioning check on unbranded electrical distribution and mechanical equipment using a generic handheld instrument.
UAE environment: clean Dubai commercial/industrial plant room with realistic equipment spacing and no identifiable facility.
Camera angle: medium-wide side view at eye level, 35–50 mm lens, hands and instrument clearly but naturally framed.
Lighting: bright neutral plant-room lighting with soft directional highlights and true material color.
Composition: engineer, instrument and equipment form a clear triangle; screens and labels remain unreadable; preserve hands and PPE in the mobile crop.
PPE and safety: hard hat, high-visibility vest, safety footwear, safety glasses and task-appropriate gloves; controlled/de-energized test condition, secure panels and generic lockout controls.
Style and mood: methodical, technical and premium, without dramatic sparks or action.
Aspect ratio and outputs: S profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: synthetic representative person; plausible instrumentation and safe procedure; illustrative only.
Prohibited elements: no source-photo reconstruction, equipment brands, company or authority logos, readable measurements, labels, serial numbers or documents, watermarks, arc flash, sparks, exposed live conductors, distorted hands, extra fingers or impossible instruments.
```

Output base: `public/images/generated/services/testing-commissioning-dubai`

### P26 — Dubai authority-approvals coordination

```text
Use case: photorealistic-natural
Asset type: approvals overview hero
Intended page: /approval and its Arabic equivalent
Input images: none; text-only original generation.
Subject: a representative consultant and engineer coordinating generic construction drawings, a blank tablet and site-readiness information beside a controlled work area.
UAE environment: contemporary Dubai construction context with bright daylight, neutral materials and no identifiable authority office or real project.
Camera angle: medium-wide eye-level documentary photograph, 35 mm lens.
Lighting: soft open shade with clear UAE daylight behind, natural skin and paper texture.
Composition: working interaction is central, documents remain abstract and unreadable, and the adjacent site context explains the approval-to-execution relationship; protect all key elements in a 4:5 crop.
PPE and safety: complete site PPE, safe review area, proper barrier and clear access route.
Style and mood: factual, organized and premium; no bureaucratic or ceremonial staging.
Aspect ratio and outputs: H profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: illustrative coordination only; not an authority photograph or endorsement; synthetic representative people.
Prohibited elements: no authority logo, seal, uniform, building, counter or branded document; no Emitronix or client logo, readable text, stamps, signatures, QR codes, watermarks, identifiable people, fake approval certificate, distorted hands or unsafe site behavior.
```

Output base: `public/images/generated/approvals/dubai-authority-approvals-coordination`

### P27 — Dubai Municipality approval planning

```text
Use case: photorealistic-natural
Asset type: approval service hero
Intended page: /dubai-municipality-approval and its Arabic equivalent
Input images: none; text-only original generation.
Subject: building-permit planning review that connects generic architectural and structural drawings with a clean civil construction setting.
UAE environment: anonymous low-rise Dubai development context, pale concrete, shaded review station and blue sky; not an authority office or real project.
Camera angle: medium-wide over-the-shoulder view, 35–50 mm lens, with the construction area visible beyond.
Lighting: soft shaded foreground and balanced natural daylight outside.
Composition: two synthetic professionals review blank/abstract plan sheets while the site provides depth; keep hands, plans and site safely within the portrait crop.
PPE and safety: hard hats, high-visibility vests and safety footwear; designated review space behind a proper barrier.
Style and mood: precise, submission-aware and professional, compatible with the white-and-blue site design.
Aspect ratio and outputs: S profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: depict only generic planning; not Dubai Municipality, its staff, premises, documents or endorsement.
Prohibited elements: no Dubai Municipality logo or seal, Arabic/English document text, approval stamps, QR codes, signatures, client marks, project names, watermarks, identifiable people, unsafe site access or distorted hands.
```

Output base: `public/images/generated/approvals/dubai-municipality-approval-planning`

### P28 — DDA approval coordination

```text
Use case: photorealistic-natural
Asset type: approval service hero
Intended page: /dda-approvals and its Arabic equivalent
Input images: none; text-only original generation.
Subject: representative design and building-modification coordination for a modern mixed-use development, using a generic model, blank drawings and visible fit-out conditions.
UAE environment: contemporary anonymous Dubai development setting with clean public realm and bright UAE daylight; no identifiable DDA community or authority premises.
Camera angle: wide eye-level environmental review photograph, 35 mm lens.
Lighting: soft morning daylight with neutral interior and exterior balance.
Composition: two synthetic professionals discuss the model from a safe position; development context stays visible; central crop retains people, model and site.
PPE and safety: complete PPE wherever the active work zone is visible; safe protected review point and clear access.
Style and mood: sophisticated, practical and understated, not promotional authority imagery.
Aspect ratio and outputs: S profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: generic illustrative approval coordination only; no implication of DDA endorsement.
Prohibited elements: no DDA logo, branded architecture, authority staff, badges, readable plans, stamps, permits, signs, watermarks, identifiable people, copied project, distorted hands or futuristic development.
```

Output base: `public/images/generated/approvals/dda-approval-coordination-dubai`

### P29 — DCD fire-safety approval coordination

```text
Use case: photorealistic-natural
Asset type: approval service hero
Intended page: /dcd-approvals and its Arabic equivalent
Input images: none; text-only original generation.
Subject: a representative fire-life-safety coordination review showing unbranded detection, sprinkler, fire-rated separation and egress interfaces in a commercial or warehouse environment.
UAE environment: clean anonymous Dubai building interior with realistic service systems and no authority premises or identifiable project.
Camera angle: wide technical three-quarter view, 28–35 mm lens, from a safe corridor.
Lighting: bright neutral interior lighting with soft daylight and accurate red/metal material tones without over-saturation.
Composition: safety systems remain clearly visible while two synthetic engineers review from a protected position; portrait crop retains systems and people.
PPE and safety: full PPE, unobstructed egress, secured access equipment and no active alarm/emergency condition.
Style and mood: calm, compliance-focused and technically credible.
Aspect ratio and outputs: S profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: generic fire-safety interfaces only; not Dubai Civil Defence, its staff, documents or endorsement.
Prohibited elements: no DCD logo, uniforms, vehicles, fire-station imagery, approval seals, readable labels, signs, watermarks, smoke, flames, staged emergency, unsafe ladder, malformed sprinklers, floating services or distorted people.
```

Output base: `public/images/generated/approvals/dcd-fire-safety-approval-dubai`

### P30 — DEWA electrical approval coordination

```text
Use case: photorealistic-natural
Asset type: approval service hero
Intended page: /dewa-approvals and its Arabic equivalent
Input images: none; text-only original generation.
Subject: safe electrical utility coordination around unbranded distribution equipment, contained cables and generic construction/utility documents.
UAE environment: clean Dubai commercial or industrial electrical room with bright UAE daylight at the entrance; no authority premises or identifiable facility.
Camera angle: medium-wide eye-level technical photograph, 35 mm lens.
Lighting: bright neutral equipment-room light with soft daylight fill and realistic metal surfaces.
Composition: two synthetic engineers review equipment from a safe distance; blank documents and closed panels remain secondary; mobile crop preserves equipment and people.
PPE and safety: hard hats, high-visibility vests, safety footwear, eye protection and task-appropriate gloves; panels closed, controlled condition, clear egress and no live exposure.
Style and mood: methodical, premium and technically credible.
Aspect ratio and outputs: S profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: illustrative electrical approval coordination only; not a DEWA image, employee, asset, document or endorsement.
Prohibited elements: no DEWA logo or colors presented as branding, authority uniforms, readable labels, single-line diagrams, serial numbers, meter data, seals, documents, watermarks, arc flash, sparks, exposed live conductors, distorted hands or impossible cable routes.
```

Output base: `public/images/generated/approvals/dewa-approval-electrical-coordination-dubai`

### P31 — DEWA cable-works section

```text
Use case: photorealistic-natural
Asset type: technical editorial feature
Intended page: underground cable-works section on /dewa-approvals
Input images: none; text-only original generation.
Subject: a controlled underground electrical cable-route installation with a neat trench, protective ducts, safe lifting setup and engineering oversight.
UAE environment: anonymous Dubai utility corridor beside a generic commercial/industrial site, dry soil, clean road edge and bright blue sky.
Camera angle: wide slightly elevated three-quarter view from outside the barricaded zone, 28–35 mm lens.
Lighting: clear morning daylight with realistic soil, duct and cable textures.
Composition: trench and cable route create a strong diagonal; representative workers remain safely positioned; central crop retains trench protection and team.
PPE and safety: full PPE, gloves and eye protection; rigid barriers, safe trench support/slope, controlled equipment spacing, cable handling aids and no person under a suspended load.
Style and mood: disciplined infrastructure photography, clean and credible.
Aspect ratio and outputs: B profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: generic illustrative cable work only; not a DEWA asset, crew, route or endorsement.
Prohibited elements: no DEWA or contractor logos, branded vehicles, visible registration plates, road/location signs, readable cable markings, watermarks, unsafe trench entry, exposed live cable, sparks, distorted machinery, malformed hands or impossible cable bends.
```

Output base: `public/images/generated/approvals/dewa-cable-works-dubai`

### P32 — Trakhees warehouse approval coordination

```text
Use case: photorealistic-natural
Asset type: approval service hero
Intended page: /trakhees-approvals and its Arabic equivalent
Input images: none; text-only original generation.
Subject: representative warehouse/free-zone project coordination using generic drawings, with civil, loading and utility interfaces visible in the background.
UAE environment: anonymous Dubai free-zone-style logistics area with modern warehouse, dry landscape and clean access roads; no identifiable zone or facility.
Camera angle: wide eye-level environmental photograph, 35 mm lens.
Lighting: crisp morning daylight with soft shadows and neutral materials.
Composition: two synthetic professionals review from a safe yard-side point while warehouse interfaces create depth; preserve people and facility in a 4:5 crop.
PPE and safety: complete PPE, protected pedestrian route, clear vehicle separation and tidy site.
Style and mood: organized, industrial and premium without authority theatrics.
Aspect ratio and outputs: S profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: generic illustrative approval coordination only; no implication of Trakhees endorsement.
Prohibited elements: no Trakhees logo, free-zone name, authority staff, approval documents, stamps, readable signs, client branding, watermarks, vehicle plates, identifiable people, unsafe yard behavior or copied warehouse.
```

Output base: `public/images/generated/approvals/trakhees-approval-warehouse-dubai`

### P33 — DIFC fit-out approval coordination

```text
Use case: photorealistic-natural
Asset type: approval service hero
Intended page: /difc-approvals and its Arabic equivalent
Input images: none; text-only original generation.
Subject: a premium commercial office fit-out review connecting layout, landlord interface, ceiling services and finish readiness.
UAE environment: high-quality anonymous Dubai financial-district-style office interior, without recognizable DIFC architecture, tenants or premises.
Camera angle: wide interior eye-level photograph with straight verticals, 28–35 mm lens.
Lighting: soft window daylight and neutral practical lighting, clean whites and restrained blue-gray accents.
Composition: two synthetic professionals inspect from a protected finished zone while active fit-out details remain visible; mobile crop retains people and service context.
PPE and safety: hard hats, high-visibility vests and safety footwear in the active zone; floor protection, barriers and tidy tools.
Style and mood: refined, precise and premium, not a luxury advertisement.
Aspect ratio and outputs: S profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: illustrative fit-out approval coordination only; not a DIFC location, project, staff image or endorsement.
Prohibited elements: no DIFC logo, recognizable buildings, tenant names, branded reception, readable plans/screens, permits, watermarks, identifiable people, unsafe ladders, exposed wiring, distorted furniture or exaggerated opulence.
```

Output base: `public/images/generated/approvals/difc-fit-out-approval-dubai`

### P34 — Concordia-DMCC approval coordination

```text
Use case: photorealistic-natural
Asset type: approval service hero
Intended page: /concordia-dmcc-approvals and its Arabic equivalent
Input images: none; text-only original generation.
Subject: commercial office modification and fit-out coordination using anonymous architectural information, with partitions and MEP interfaces visible.
UAE environment: generic modern Dubai business-tower interior inspired only by the broad JLT commercial context, with no recognizable building or view.
Camera angle: medium-wide eye-level interior documentary view, 35 mm lens.
Lighting: balanced natural window light and soft neutral work lighting.
Composition: consultant and engineer review blank plan sheets near the protected fit-out zone; central portrait crop includes both people and key interfaces.
PPE and safety: correctly fitted hard hats, high-visibility vests and safety shoes; protected floors, clear access and safe work separation.
Style and mood: professional, controlled and premium.
Aspect ratio and outputs: S profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: generic illustrative coordination only; not Concordia, DMCC, JLT management, their staff, premises or endorsement.
Prohibited elements: no Concordia, DMCC or building logos, recognizable tower views, authority badges, stamps, readable plans, tenancy data, watermarks, identifiable people, unsafe work, distorted hands or copied interiors.
```

Output base: `public/images/generated/approvals/concordia-dmcc-approval-dubai`

### P35 — RTA approval and NOC planning

```text
Use case: photorealistic-natural
Asset type: approval service hero
Intended page: /rta-approval and its Arabic equivalent
Input images: none; text-only original generation.
Subject: safe construction-access and road-interface planning beside a controlled work zone, with representative engineers reviewing generic logistics information.
UAE environment: anonymous Dubai urban road edge with clean pavement, dry landscaping and a low-rise construction site; no identifiable route or landmark.
Camera angle: wide eye-level environmental photograph from behind the protected pedestrian barrier, 28–35 mm lens.
Lighting: clear morning daylight with soft directional shadows and natural road-surface texture.
Composition: safe access geometry and construction gate are visible without readable signs; two synthetic engineers remain central for mobile; generic vehicles are distant and unbranded.
PPE and safety: complete PPE, high-visibility garments, rigid pedestrian separation, cones/barriers placed plausibly and unobstructed sight lines.
Style and mood: practical logistics and NOC-planning photography, calm and credible.
Aspect ratio and outputs: S profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: illustrative road-interface planning only; not an RTA image, asset, employee, route or endorsement.
Prohibited elements: no RTA logo, branded signs, readable road names, authority uniforms, recognizable road furniture, registration plates, client branding, watermarks, traffic incident, unsafe lane entry, distorted vehicles/hands or impossible road geometry.
```

Output base: `public/images/generated/approvals/rta-approval-noc-dubai`

### P36 — Projects portfolio-planning hero

```text
Use case: photorealistic-natural
Asset type: projects-page hero
Intended page: /projects and its Arabic equivalent
Input images: none; text-only original generation.
Subject: a single coherent editorial planning scene connecting civil construction, warehouse structure and MEP coordination within one representative Dubai facility.
UAE environment: modern anonymous Dubai industrial/commercial project context with clean roads, pale concrete and blue sky; no real project or recognizable location.
Camera angle: wide elevated-but-grounded three-quarter view, natural 28 mm perspective.
Lighting: bright morning daylight with soft shadows and balanced interior/exterior exposure.
Composition: structural work, warehouse volume and service interfaces read as one setting; a small representative team reviews from a safe platform; central mobile crop remains complete and uncluttered.
PPE and safety: full PPE, protected edges, segregated access, stable equipment and clean housekeeping.
Style and mood: premium portfolio editorial photography while remaining visibly representative, not documentary evidence.
Aspect ratio and outputs: H profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: an illustrative planning scenario only; do not imply project completion, client ownership or before/after proof.
Prohibited elements: no source-project reconstruction, logos, project signs, client names, readable documents, watermarks, registration plates, identifiable people, iconic buildings, unsafe work, distorted machinery or montage/collage seams.
```

Output base: `public/images/generated/projects/portfolio-planning-dubai-hero`

### P37 — Villa renovation planning scenario

```text
Use case: photorealistic-natural
Asset type: portfolio planning-scenario card
Intended page: villa renovation scenario on /projects
Input images: none; text-only original generation.
Subject: representative villa renovation planning scene showing protected retained finishes, a controlled civil alteration and coordinated service changes.
UAE environment: anonymous Dubai residential interior and courtyard edge with realistic warm stone, plaster and daylight.
Camera angle: medium-wide three-quarter architectural view, 28–35 mm lens with straight lines.
Lighting: soft natural daylight, accurate materials and gentle interior fill.
Composition: retained and active zones appear together in one coherent scene, not before/after panels; one synthetic engineer inspects from a safe position.
PPE and safety: hard hat, high-visibility vest and safety footwear in the active zone; floor protection, dust separation and tidy tools.
Style and mood: premium, careful and realistic residential-renovation planning.
Aspect ratio and outputs: C profile — 3:2 master for 1600×1067, responsive card-safe composition.
Constraints: label internally as an illustrative planning scenario; not evidence of an Emitronix villa project.
Prohibited elements: no copied home, occupants, address, logos, readable documents, watermarks, unsafe demolition, uncontrolled dust, distorted architecture, malformed hands or split-screen transformation effects.
```

Output: `public/images/generated/projects/villa-renovation-planning-dubai.webp`

### P38 — Warehouse civil and MEP upgrade planning scenario

```text
Use case: photorealistic-natural
Asset type: portfolio planning-scenario card
Intended page: warehouse civil and MEP scenario on /projects
Input images: none; text-only original generation.
Subject: active warehouse upgrade planning with a localized slab repair, protected drainage work and coordinated electrical/HVAC interfaces.
UAE environment: clean anonymous Dubai logistics warehouse with realistic racking, clear aisle and bright daylight.
Camera angle: wide aisle-level three-quarter view, 28 mm lens without excessive distortion.
Lighting: balanced skylight and neutral warehouse lighting with realistic concrete and metal texture.
Composition: civil repair in the foreground connects to MEP service routes above; two distant synthetic professionals inspect safely; card crop keeps both layers.
PPE and safety: complete PPE, work-zone barriers, protected stock, clear emergency aisle and tidy tools.
Style and mood: operational, precise and premium, not staged as a completed case study.
Aspect ratio and outputs: C profile — 3:2 master for 1600×1067.
Constraints: illustrative planning scenario only; no evidence or claim of an Emitronix warehouse upgrade.
Prohibited elements: no copied warehouse, product/client labels, logos, rack codes, readable signs, watermarks, unsafe work near stock, exposed live wiring, warped racking, floating services or distorted people.
```

Output: `public/images/generated/projects/warehouse-civil-mep-upgrade-planning-dubai.webp`

### P39 — Commercial office fit-out planning scenario

```text
Use case: photorealistic-natural
Asset type: portfolio planning-scenario card
Intended page: commercial office fit-out scenario on /projects
Input images: none; text-only original generation.
Subject: refined office fit-out in progress with glazed partitions, ceiling services, finish samples and protected completed surfaces.
UAE environment: anonymous contemporary Dubai commercial interior with bright window daylight and no recognizable tenant or building.
Camera angle: wide eye-level interior view, 28–35 mm lens with straight verticals.
Lighting: soft daylight plus neutral practical illumination, clean whites and natural wood/metal tones.
Composition: finished corridor leads to a controlled active fit-out area; one representative supervisor adds scale without posing.
PPE and safety: hard hat, high-visibility vest and safety footwear; floor protection, tidy tools and clear access.
Style and mood: premium, quiet and detail-oriented office construction photography.
Aspect ratio and outputs: C profile — 3:2 master for 1600×1067.
Constraints: illustrative planning scenario only; not an Emitronix project or client interior.
Prohibited elements: no logos, tenant identity, readable room signs/screens, confidential documents, watermarks, unsafe ladders, exposed live wires, distorted glass/furniture, malformed hands or excessive luxury staging.
```

Output: `public/images/generated/projects/commercial-office-fit-out-planning-dubai.webp`

### P40 — Building maintenance inspection planning scenario

```text
Use case: photorealistic-natural
Asset type: portfolio planning-scenario card
Intended page: building maintenance scenario on /projects
Input images: none; text-only original generation.
Subject: representative technician and engineer safely inspecting unbranded electrical and mechanical building-services equipment in a clean plant area.
UAE environment: anonymous Dubai commercial building plant room with realistic ventilation and equipment access.
Camera angle: medium-wide eye-level technical photograph, 35 mm lens.
Lighting: bright neutral maintenance lighting with accurate metal, cable and fabric texture.
Composition: people inspect from a safe position with a generic instrument; equipment remains clear and accessible; screen content is unreadable.
PPE and safety: hard hats, high-visibility vests, safety footwear, eye protection and task-appropriate gloves; closed panels, clear egress and controlled condition.
Style and mood: methodical, clean and service-focused, not dramatic.
Aspect ratio and outputs: C profile — 3:2 master for 1600×1067.
Constraints: illustrative maintenance-planning scenario only; not evidence of work performed by Emitronix.
Prohibited elements: no equipment brands, panel labels, serial numbers, readable measurements, company logos, watermarks, arc flash, sparks, exposed live parts, leaks, distorted hands or impossible tools.
```

Output: `public/images/generated/projects/building-maintenance-inspection-planning-dubai.webp`

### P41 — Utility approval coordination planning scenario

```text
Use case: photorealistic-natural
Asset type: portfolio planning-scenario card
Intended page: utility approval coordination scenario on /projects
Input images: none; text-only original generation.
Subject: a representative engineer reviewing generic load and site-readiness information beside closed, unbranded electrical distribution equipment.
UAE environment: clean anonymous Dubai warehouse or commercial utility room with bright doorway daylight.
Camera angle: medium-wide three-quarter view, 35–50 mm lens, face secondary to the technical context.
Lighting: balanced neutral interior light and soft natural fill.
Composition: blank drawings/tablet, engineer and equipment form a clear sequence; card crop retains all three.
PPE and safety: hard hat, high-visibility vest, safety footwear, glasses and task-appropriate gloves; closed equipment and unobstructed access.
Style and mood: organized, technical and premium.
Aspect ratio and outputs: C profile — 3:2 master for 1600×1067.
Constraints: illustrative utility-coordination scenario only; no authority endorsement or project-evidence implication.
Prohibited elements: no DEWA or authority logos, branded equipment, readable diagrams, meter values, stamps, documents, watermarks, exposed conductors, sparks, distorted hands or impossible cables.
```

Output: `public/images/generated/projects/utility-approval-coordination-planning-dubai.webp`

### P42 — Retail renovation planning scenario

```text
Use case: photorealistic-natural
Asset type: portfolio planning-scenario card
Intended page: retail renovation scenario on /projects
Input images: none; text-only original generation.
Subject: a clean retail renovation with protected public-facing finishes, controlled partition work and coordinated ceiling services.
UAE environment: anonymous Dubai retail unit with neutral premium materials and soft shopping-district daylight, no identifiable mall or tenant.
Camera angle: wide eye-level interior view, 28–35 mm lens with natural geometry.
Lighting: balanced window/ambient daylight and neutral work lighting.
Composition: a finished frontage edge leads toward a protected active zone; a representative supervisor inspects details; no split-screen treatment.
PPE and safety: complete PPE in the work zone, rigid separation, dust control, protected floors and tidy materials.
Style and mood: polished but realistic commercial-renovation planning.
Aspect ratio and outputs: C profile — 3:2 master for 1600×1067.
Constraints: illustrative planning scenario only; not a real tenant, mall or Emitronix project.
Prohibited elements: no retail logos, product branding, readable storefront text, mall identity, watermarks, customers, unsafe ladders, uncontrolled dust, distorted fixtures or fake before/after labels.
```

Output: `public/images/generated/projects/retail-renovation-planning-dubai.webp`

### P43 — Industrial facility modification planning scenario

```text
Use case: photorealistic-natural
Asset type: portfolio planning-scenario card
Intended page: industrial facility modification scenario on /projects
Input images: none; text-only original generation.
Subject: a controlled civil and steel modification zone inside a realistic light-industrial facility, with slab edge, wall opening and structural interface under review.
UAE environment: anonymous Dubai free-zone-style industrial building with robust materials and bright natural light.
Camera angle: wide three-quarter interior view from a designated walkway, 28–35 mm lens.
Lighting: balanced skylight and neutral industrial illumination with realistic surface texture.
Composition: modification area remains clearly barricaded; two synthetic engineers inspect from outside it; card crop preserves structure and people.
PPE and safety: complete PPE, temporary support where plausible, protected opening, dust control and clear operational separation.
Style and mood: controlled, technical and credible, not a dramatic demolition scene.
Aspect ratio and outputs: C profile — 3:2 master for 1600×1067.
Constraints: illustrative industrial-planning scenario only; not project evidence.
Prohibited elements: no copied plant, machinery brands, product labels, logos, readable signs, watermarks, active production hazard, unsupported structure, sparks, excessive dust, distorted steel or malformed people.
```

Output: `public/images/generated/projects/industrial-facility-modification-planning-dubai.webp`

### P44 — MEP interface coordination planning scenario

```text
Use case: photorealistic-natural
Asset type: portfolio planning-scenario card
Intended page: MEP interface coordination scenario on /projects
Input images: none; text-only original generation.
Subject: coordinated HVAC, electrical containment, plumbing and fire-life-safety routes above a clean ceiling/service zone.
UAE environment: anonymous Dubai commercial or logistics interior with realistic structural grid and maintenance access.
Camera angle: medium-wide upward three-quarter technical view, 28 mm lens with controlled distortion.
Lighting: bright neutral service lighting with soft daylight and accurate metal/insulation textures.
Composition: service layers remain distinct, supported and accessible; a representative engineer points from a safe access platform; card crop retains key route intersections.
PPE and safety: full PPE, secure platform/guardrail, clear access and no exposed live systems.
Style and mood: precise coordination photography, premium and uncluttered.
Aspect ratio and outputs: C profile — 3:2 master for 1600×1067.
Constraints: physically plausible service supports and clearances; illustrative planning scenario only.
Prohibited elements: no logos, readable labels, authority marks, watermarks, floating ducts, impossible pipe intersections, leaks, exposed live wiring, unsafe platform, distorted worker or rainbow color coding.
```

Output: `public/images/generated/projects/mep-interface-coordination-planning-dubai.webp`

### P45 — Authority and NOC coordination planning scenario

```text
Use case: photorealistic-natural
Asset type: portfolio planning-scenario card
Intended page: authority and NOC coordination scenario on /projects
Input images: none; text-only original generation.
Subject: anonymous consultant and engineer coordinating generic NOC, site-access and inspection-readiness information near a controlled Dubai work zone.
UAE environment: realistic but unidentifiable Dubai commercial construction context with clean access road and pale structures.
Camera angle: medium-wide eye-level documentary view, 35 mm lens.
Lighting: soft shaded review light with bright natural site background.
Composition: blank plans and tablet anchor the review; access and work area appear beyond; preserve both people and context in the card crop.
PPE and safety: complete PPE, designated safe review point, proper barrier and clear pedestrian route.
Style and mood: organized, factual and premium.
Aspect ratio and outputs: C profile — 3:2 master for 1600×1067.
Constraints: illustrative planning scenario only; no authority endorsement, approval guarantee or project evidence.
Prohibited elements: no authority/client/company logos, badges, readable permits, stamps, signatures, QR codes, signs, watermarks, identifiable people, branded vehicles, registration plates, distorted hands or unsafe access.
```

Output: `public/images/generated/projects/authority-noc-coordination-planning-dubai.webp`

### P46 — Civil repair and maintenance planning scenario

```text
Use case: photorealistic-natural
Asset type: portfolio planning-scenario card
Intended page: civil repair and maintenance scenario on /projects
Input images: none; text-only original generation.
Subject: localized concrete, masonry, drainage and waterproofing repair planning at a clean commercial or warehouse service area.
UAE environment: anonymous Dubai property with dry climate, pale concrete and realistic external-service materials.
Camera angle: medium-wide slightly elevated three-quarter view from outside the work zone, 35 mm lens.
Lighting: clear morning daylight with detailed but natural surface texture.
Composition: two or three repair interfaces remain legible without clutter; a representative supervisor inspects from a safe path.
PPE and safety: complete PPE, barriers, dust/debris control, safe drainage opening protection and tidy tools.
Style and mood: practical, clean and dependable maintenance editorial photography.
Aspect ratio and outputs: C profile — 3:2 master for 1600×1067.
Constraints: illustrative planning scenario only; not evidence of an Emitronix repair project.
Prohibited elements: no copied site, logos, readable signs, watermarks, uncontrolled demolition, open unprotected pits, standing water hazard, distorted tools/hands, impossible cracks or exaggerated damage.
```

Output: `public/images/generated/projects/civil-repair-maintenance-planning-dubai.webp`

### P47 — Civil construction Dubai guide

```text
Use case: photorealistic-natural
Asset type: published blog header
Intended page: /blog/complete-guide-civil-construction-dubai-2026 and article cards
Input images: none; text-only original generation.
Subject: editorial civil-construction planning scene combining credible reinforcement/formwork, generic drawings and a safe representative engineer review.
UAE environment: organized anonymous Dubai building site with pale concrete, dry climate and bright blue sky.
Camera angle: wide documentary three-quarter view, 28–35 mm lens from a protected walkway.
Lighting: clear morning daylight, soft shadows and accurate steel/concrete texture.
Composition: engineering review occupies the foreground edge while structural work provides depth; leave a calm area suitable for editorial cropping and preserve the key subject in 4:5.
PPE and safety: complete PPE, protected edges, stable formwork, controlled reinforcement and tidy access.
Style and mood: authoritative editorial construction photography, premium and realistic rather than promotional.
Aspect ratio and outputs: B profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: illustrative accompaniment to the article, not evidence of an Emitronix project; synthetic representative people.
Prohibited elements: no embedded article title, source-photo reconstruction, logos, readable plans, project signs, watermarks, identifiable people, unsafe reinforcement access, distorted hands, warped steel or CGI look.
```

Output base: `public/images/generated/blog/civil-construction-dubai-guide-2026`

### P48 — Dubai authority approvals guide

```text
Use case: photorealistic-natural
Asset type: published blog header
Intended page: /blog/dubai-authority-approvals-dewa-dubai-municipality-dcd-trakhees and article cards
Input images: none; text-only original generation.
Subject: editorial authority-coordination scene using generic construction drawings with subtle, unbranded utility and fire-safety interface cues.
UAE environment: safe technical review area within an anonymous Dubai commercial construction setting, not an authority office.
Camera angle: medium-wide over-the-shoulder documentary view, 35–50 mm lens.
Lighting: soft open shade with balanced UAE daylight beyond.
Composition: two representative professionals review abstract plans; electrical and fire-safety context appears naturally in the background; preserve people and context in portrait crop.
PPE and safety: complete PPE, designated review area, closed equipment and unobstructed access.
Style and mood: explanatory, factual and premium, without bureaucracy clichés.
Aspect ratio and outputs: B profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: illustrative article image only; not authority imagery, endorsement, approval evidence or an Emitronix project.
Prohibited elements: no embedded title, authority logos/seals/uniforms, approval stamps, readable documents, signatures, QR codes, company/client marks, watermarks, identifiable people, exposed live parts or distorted hands.
```

Output base: `public/images/generated/blog/dubai-authority-approvals-guide`

### P49 — Warehouse construction planning guide

```text
Use case: photorealistic-natural
Asset type: published blog header
Intended page: /blog/warehouse-construction-dubai-planning-design-authority-approvals and article cards
Input images: none; text-only original generation.
Subject: editorial overview of warehouse planning with credible steel spans, floor/slab zone, loading access, racking allowance and coordinated services.
UAE environment: modern anonymous Dubai logistics district with dry climate, clean yard and bright blue sky.
Camera angle: wide interior-to-exterior architectural view, 24–28 mm lens with controlled geometry.
Lighting: abundant natural daylight with realistic steel and concrete texture.
Composition: strong structural rhythm with clearly readable planning zones; one small representative team adds scale; reserve clean negative space and protect key elements in 4:5.
PPE and safety: complete PPE, clear exclusion zones, stable access equipment and no suspended-load exposure.
Style and mood: informative, spacious and premium industrial editorial photography.
Aspect ratio and outputs: B profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: illustrative article image only, not a real warehouse or Emitronix project.
Prohibited elements: no embedded title, logos, tenant/rack labels, readable signs, watermarks, registration plates, unsafe lifting, warped beams, floating services, distorted machinery or futuristic megastructure.
```

Output base: `public/images/generated/blog/warehouse-construction-planning-guide`

### P50 — Choosing a building contractor in Dubai

```text
Use case: photorealistic-natural
Asset type: published blog header
Intended page: /blog/choose-best-building-contractor-dubai and article cards
Input images: none; text-only original generation.
Subject: an owner representative and two synthetic construction professionals carrying out a practical contractor-selection site review using generic, unreadable documents.
UAE environment: clean anonymous Dubai commercial construction site observation point with bright sky and no identifiable project.
Camera angle: medium-wide candid eye-level environmental photograph, 35 mm lens.
Lighting: welcoming morning daylight, natural skin tones and soft shadows.
Composition: people discuss scope and site conditions naturally, without posing or shaking hands at camera; preserve all people/hands in mobile crop and leave editorial breathing room.
PPE and safety: correctly fitted visitor and site PPE, proper guardrail, safe separation from active work and clear access.
Style and mood: thoughtful, credible and premium; editorial rather than testimonial.
Aspect ratio and outputs: B profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: illustrative article image; people are not Emitronix employees, clients or endorsers; not project evidence.
Prohibited elements: no embedded title, source-person likeness, logos, branded documents, readable prices/scores, client names, watermarks, identifiable project, testimonial pose, distorted hands or unsafe viewing area.
```

Output base: `public/images/generated/blog/choosing-building-contractor-dubai`

## Draft-only prompt reservations

Do not generate, integrate, publish, add to metadata, or add to the sitemap from the eight prompts below. They are retained solely so imagery is production-ready if and only if the corresponding article later receives separate editorial and publication approval.

### P51 — Warehouse construction cost in Dubai

Status: **prompt only — do not generate**

```text
Use case: photorealistic-natural
Asset type: future draft blog header
Intended page: reserved for draft /blog/warehouse-construction-cost-dubai; not approved for publication
Input images: none; text-only original generation if future publication is approved.
Subject: warehouse scope and quantity-planning review with generic drawings, steel/slab material context and a representative engineer assessing build factors.
UAE environment: anonymous Dubai logistics warehouse under controlled development, with clean yard and realistic dry-climate light.
Camera angle: medium-wide eye-level editorial view, 35 mm lens.
Lighting: soft morning daylight, accurate material texture and neutral color.
Composition: engineer, blank plans and warehouse structure form a clear visual sequence; keep the subject portrait-safe and leave editorial negative space.
PPE and safety: complete PPE, safe designated review area, stable stored materials and clear access.
Style and mood: analytical, credible and premium, without depicting money or a quotation.
Aspect ratio and outputs: B profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: illustrative article accompaniment only; not project, quantity, price or budget evidence.
Prohibited elements: no embedded title, currency, numbers, charts, readable estimates, logos, client/project identity, watermarks, identifiable people, unsafe storage, distorted hands or copied warehouse.
```

Reserved output base: `public/images/generated/blog/warehouse-construction-cost-dubai`

### P52 — Main contractor vs general contractor

Status: **prompt only — do not generate**

```text
Use case: photorealistic-natural
Asset type: future draft blog header
Intended page: reserved for draft /blog/main-contractor-vs-general-contractor-dubai; not approved for publication
Input images: none; text-only original generation if future publication is approved.
Subject: an owner representative reviewing two abstract responsibility pathways with representative construction professionals, using generic drawings and a shared site context rather than a literal versus graphic.
UAE environment: safe observation area at an anonymous Dubai commercial construction site.
Camera angle: medium-wide candid eye-level photograph, 35–50 mm lens.
Lighting: bright open shade with natural UAE daylight in the background.
Composition: three-person working discussion with two blank document folders and one site view; no side-by-side caricature; protect hands and faces in the 4:5 crop.
PPE and safety: correctly fitted visitor/site PPE, safe guardrail and separation from active work.
Style and mood: balanced, explanatory and premium, without implying one role or company wins.
Aspect ratio and outputs: B profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: synthetic representatives; illustrative article image only, not legal/contractual or project evidence.
Prohibited elements: no embedded title, comparison text, logos, company uniforms, contracts, readable clauses/prices, watermarks, identifiable people, handshake-to-camera, distorted hands or unsafe viewing point.
```

Reserved output base: `public/images/generated/blog/main-contractor-vs-general-contractor-dubai`

### P53 — Warehouse design guide UAE

Status: **prompt only — do not generate**

```text
Use case: photorealistic-natural
Asset type: future draft blog header
Intended page: reserved for draft /blog/warehouse-design-guide-uae; not approved for publication
Input images: none; text-only original generation if future publication is approved.
Subject: wide warehouse planning scene showing operational layout, clear structural span, future racking zones, loading access, fire-safety clearance and coordinated utilities.
UAE environment: modern anonymous UAE logistics facility with Dubai-style industrial context, clean yard and dry daylight.
Camera angle: wide elevated interior view from a safe mezzanine or platform, 24–28 mm lens with controlled distortion.
Lighting: even skylight and natural daylight with neutral steel/concrete color.
Composition: clear zones and circulation are visible without diagram labels; a small representative team adds scale; central portrait crop remains meaningful.
PPE and safety: full PPE, proper platform guardrail, no suspended load and clear emergency routes.
Style and mood: informative, spacious and premium, not futuristic.
Aspect ratio and outputs: B profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: illustrative article image only; not a real design, authority submission or Emitronix project.
Prohibited elements: no embedded title/labels/arrows, logos, rack codes, client products, readable signs, watermarks, unsafe platform, warped beams, impossible circulation or distorted machinery.
```

Reserved output base: `public/images/generated/blog/warehouse-design-guide-uae`

### P54 — Commercial building construction guide

Status: **prompt only — do not generate**

```text
Use case: photorealistic-natural
Asset type: future draft blog header
Intended page: reserved for draft /blog/commercial-building-construction-guide-dubai; not approved for publication
Input images: none; text-only original generation if future publication is approved.
Subject: contemporary commercial building at a controlled construction stage, showing facade progress, public access planning, civil work and future fit-out readiness.
UAE environment: anonymous Dubai business setting with dry landscaping, clean pavement and blue sky; no landmark or real project.
Camera angle: wide street-level three-quarter architectural view, 28–35 mm lens.
Lighting: soft early-morning daylight and natural material color.
Composition: building anchors the frame with a neat work zone and small PPE-equipped team; retain facade and team in 4:5 crop and leave editorial breathing room.
PPE and safety: complete PPE, secure perimeter, segregated pedestrian route and safe access equipment.
Style and mood: premium commercial construction editorial photography, credible and restrained.
Aspect ratio and outputs: B profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: illustrative article image only; not project evidence.
Prohibited elements: no embedded title, copied building, iconic skyline, logos, tenant names, readable signs, watermarks, registration plates, unsafe scaffolding, distorted workers or exaggerated futuristic design.
```

Reserved output base: `public/images/generated/blog/commercial-building-construction-guide-dubai`

### P55 — Villa construction process

Status: **prompt only — do not generate**

```text
Use case: photorealistic-natural
Asset type: future draft blog header
Intended page: reserved for draft /blog/villa-construction-process-dubai; not approved for publication
Input images: none; text-only original generation if future publication is approved.
Subject: one coherent premium villa construction scene that shows structural completion, coordinated service installation and protected finishing work at different depths, without a timeline graphic.
UAE environment: anonymous Dubai residential context with realistic warm materials, clean boundary and blue sky.
Camera angle: wide three-quarter architectural view, 28–35 mm lens.
Lighting: soft natural morning daylight with accurate concrete, plaster and finish textures.
Composition: process stages read through spatial depth rather than panels or labels; representative supervisor remains central and mobile-safe.
PPE and safety: complete PPE in all active zones, stable access, protected finishes and tidy housekeeping.
Style and mood: educational, refined and credible, not a luxury-property advertisement.
Aspect ratio and outputs: B profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: illustrative article accompaniment only; not a real villa or Emitronix project.
Prohibited elements: no embedded title, arrows, stage text, copied residence, logos, address, occupants, watermarks, unsafe ladders, malformed hands, distorted architecture or palace/futuristic styling.
```

Reserved output base: `public/images/generated/blog/villa-construction-process-dubai`

### P56 — Construction approvals explained in Dubai

Status: **prompt only — do not generate**

```text
Use case: photorealistic-natural
Asset type: future draft blog header
Intended page: reserved for draft /blog/construction-approvals-explained-dubai; not approved for publication
Input images: none; text-only original generation if future publication is approved.
Subject: generic approval-route coordination with a representative engineer reviewing abstract documents while construction, electrical utility and fire-safety contexts appear coherently behind.
UAE environment: anonymous Dubai project review setting, not an authority office, with bright local daylight and realistic materials.
Camera angle: medium-wide eye-level documentary view, 35 mm lens.
Lighting: soft open shade with balanced background daylight.
Composition: one coherent scene, not an infographic; blank plans anchor the foreground and technical interfaces provide context; portrait-safe subject placement.
PPE and safety: complete PPE, safe review area, closed equipment and clear access.
Style and mood: explanatory, neutral and premium.
Aspect ratio and outputs: B profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: illustrative article image only; no authority endorsement, guarantee or project evidence.
Prohibited elements: no embedded title, authority logos/seals/uniforms, readable permit text, stamps, signatures, QR codes, company marks, watermarks, identifiable people, exposed live systems or distorted hands.
```

Reserved output base: `public/images/generated/blog/construction-approvals-explained-dubai`

### P57 — Industrial building planning guide UAE

Status: **prompt only — do not generate**

```text
Use case: photorealistic-natural
Asset type: future draft blog header
Intended page: reserved for draft /blog/industrial-building-planning-guide-uae; not approved for publication
Input images: none; text-only original generation if future publication is approved.
Subject: industrial facility planning scene covering operational flow, structural bays, utilities, fire-safe access and future maintenance space in one realistic environment.
UAE environment: anonymous UAE industrial estate with a Dubai logistics-zone character, dry climate and bright daylight.
Camera angle: wide three-quarter interior view from a safe designated walkway, 24–28 mm lens.
Lighting: balanced skylight and neutral industrial illumination with accurate material texture.
Composition: structure, operational zone and utility routes form readable layers; a small representative engineering team adds scale; central crop remains coherent.
PPE and safety: full PPE, guarded walkway, clear egress and safe separation from equipment.
Style and mood: practical, technical and premium, not science fiction.
Aspect ratio and outputs: B profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: illustrative article image only; not a real factory, operational process or Emitronix project.
Prohibited elements: no embedded title, logos, product/client identity, readable equipment labels, watermarks, emissions, sparks, unsafe machinery, distorted structure/services or futuristic automation.
```

Reserved output base: `public/images/generated/blog/industrial-building-planning-guide-uae`

### P58 — Construction cost-saving tips

Status: **prompt only — do not generate**

```text
Use case: photorealistic-natural
Asset type: future draft blog header
Intended page: reserved for draft /blog/construction-cost-saving-tips-dubai; not approved for publication
Input images: none; text-only original generation if future publication is approved.
Subject: a representative engineer reviewing scope, sequencing and material choices with generic drawings beside a clean construction workface.
UAE environment: anonymous Dubai commercial construction site with bright natural daylight and no identifiable project.
Camera angle: medium-wide over-the-shoulder editorial view, 35–50 mm lens.
Lighting: soft morning shade on the review area and balanced sunlit site background.
Composition: blank documents, a small set of unbranded material samples and the workface create a practical decision-making scene; retain all key elements in 4:5 crop.
PPE and safety: complete PPE, safe designated review area, stable materials and clear access.
Style and mood: disciplined, value-conscious and premium, emphasizing planning rather than cheapness.
Aspect ratio and outputs: B profile — 16:9, portrait-safe 4:5 and 1200×630 social crop.
Constraints: illustrative article image only; no cost claim, saving percentage, quotation or project evidence.
Prohibited elements: no embedded title, currency, numbers, calculators with figures, readable quotes, logos, client/project identity, watermarks, identifiable people, unsafe materials, distorted hands or “cheap” visual clichés.
```

Reserved output base: `public/images/generated/blog/construction-cost-saving-tips-dubai`

## Generation and review checklist

For each approved live master:

1. Use one built-in text-only image-generation call for that distinct scene. Do not attach any source photo.
2. Inspect the result at full size for subject accuracy, UAE context, natural hands, credible PPE, safe working conditions, coherent structures/services and absence of prohibited elements.
3. Reject any output with logos, authority marks, readable text, watermarks, project signs, registration plates, identifiable people or unsafe/physically impossible details.
4. Create the planned WebP derivatives locally, preserving the subject in desktop, mobile and social crops.
5. Store only the selected final derivatives in the planned `public/images/generated/...` paths.
6. Use the disclosure-aware alt text in `docs/website-image-plan.md`.
7. Keep the eight draft-only prompts ungenerated unless separate publication approval is received.
