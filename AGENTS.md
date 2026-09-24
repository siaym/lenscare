<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Multi-Agent Development Rules — Premium Eyewear E-Commerce

## 1. PROJECT

This repository contains a production-ready premium eyewear
e-commerce platform for Bangladesh.

The website is inspired by the shopping experience and UX patterns of:

https://shop.glassesbd.com/

The project must use its own:

- Brand
- Logo
- Product data
- Images
- Copy
- Design details
- Assets

Do not copy proprietary branding, images, text, or other protected assets.

The goal is to create a commercially usable eyewear store, not a
prototype or demo.

---

## 2. MULTI-AGENT ENVIRONMENT

IMPORTANT:

This project is developed by MULTIPLE AI AGENTS sequentially.

Only ONE agent works on the repository at a time.

After an agent finishes its assigned quota, another agent will
continue from the exact repository state left by the previous agent.

Therefore:

NEVER assume you are the first agent.

NEVER assume the repository is empty.

NEVER rebuild the project from scratch.

NEVER discard previous work without a very strong technical reason.

ALWAYS inspect the existing implementation before making changes.

---

## 3. YOUR ROLE

Each agent receives a specific QUOTA.

Your quota defines exactly what you are responsible for.

You must:

1. Understand the existing project.
2. Understand the previous agent's work.
3. Complete ONLY your assigned quota.
4. Preserve previous functionality.
5. Test your changes.
6. Fix problems caused by your work.
7. Document your work.
8. STOP when your quota is complete.

Do NOT start another feature after completing your quota.

The next agent will handle the next quota.

---

## 4. FIRST ACTIONS

Before changing any code:

### Step 1
Inspect the repository structure.

### Step 2
Read:
AGENTS.md

### Step 3
Read:
/docs/AGENT_HANDOFF.md
if it exists.

### Step 4
Read relevant documentation:
/docs/ARCHITECTURE.md
/docs/DATABASE.md
/docs/API.md
/docs/DEVELOPMENT_RULES.md
/docs/TODO.md

Only read files relevant to your assigned quota if the documentation is large.

### Step 5
Run the existing application.

Understand:
- what already works
- what is incomplete
- what previous agents changed
- what your quota requires

---

## 5. DO NOT BREAK PREVIOUS WORK

Before modifying an existing component, determine:
- who uses it
- what props it accepts
- what functionality depends on it
- whether it is shared
- whether it is used on mobile
- whether it is used on desktop

Prefer extending existing components over creating duplicate components.

For example:
If ProductCard already exists:
DO: reuse ProductCard
DO NOT: create ProductCard2, NewProductCard, PremiumProductCard, ShopProductCard unless there is a legitimate architectural reason.

---

## 6. ARCHITECTURE RULES

Do not change the project's technology stack.
Do not introduce a new framework because it is personally preferred.

Do not replace:
- Next.js
- TypeScript
- PostgreSQL
- Prisma
- Supabase
- Tailwind
- existing authentication
- existing payment architecture

unless the assigned quota explicitly requires it.

If a structural change is genuinely necessary:
1. Explain why.
2. Check existing dependencies.
3. Update documentation.
4. Preserve compatibility with existing features.

---

## 7. CODE QUALITY

Write production-quality code.
Use:
- TypeScript
- strong typing
- reusable components
- clear naming
- small focused functions
- server-side validation
- proper error handling

Avoid:
- any
- unnecessary duplication
- giant components
- hardcoded business logic
- magic numbers
- dead code
- unused imports
- console.log debugging left in production

Do not silence TypeScript errors just to make the build pass.

---

## 8. UI / DESIGN RULES

The website must feel like a premium eyewear brand.

Design characteristics:
- premium
- clean
- modern
- minimal
- editorial
- fashion-oriented
- trustworthy
- commercially realistic

Avoid:
- generic AI-generated layouts
- excessive gradients
- excessive glassmorphism
- excessive rounded cards
- excessive shadows
- huge unnecessary typography
- excessive animations
- inconsistent spacing

Use whitespace intentionally.

Maintain a consistent:
- spacing system
- typography hierarchy
- button style
- border radius
- color system
- card system
- responsive system

---

## 9. RESPONSIVE DESIGN

Every feature must work on:
320px, 375px, 390px, 414px, 768px, 1024px, 1280px, 1440px, 1920px.

Mobile is a first-class experience.
Never implement desktop-only functionality unless explicitly required.
Do not rely on hover for functionality.

---

## 10. DATA RULES

Do not hardcode production data into UI components.
Prefer: database, server-side data fetching, API, server action, seed data.
Development seed data is acceptable.

---

## 11. DATABASE RULES

Do not modify the database schema casually.
Before changing Prisma schema:
1. Inspect the existing schema.
2. Check whether the required entity already exists.
3. Reuse existing relationships when possible.
4. Create a proper migration.
5. Update /docs/DATABASE.md.

Never delete existing data structures simply because a different structure seems cleaner.

---

## 12. API RULES

All APIs must:
- validate input
- authenticate when required
- authorize when required
- return predictable responses
- handle errors
- avoid exposing sensitive information

Never trust client-side values for:
- price
- discount
- stock
- payment status
- admin privileges
- order status

Server-side values are authoritative.

---

## 13. SECURITY

Never expose secrets in client-side code.
Never commit: .env, .env.local, API keys, database passwords, payment credentials, service-role keys.

Sensitive operations must run server-side:
- payment verification
- order creation
- admin operations
- database mutations
- webhook processing
- privileged storage operations

---

## 14. PAYMENT RULES

Payment status must NEVER be trusted from the browser.

For SSLCommerz:
- initialize server-side
- verify payment server-side
- validate transaction
- protect against duplicate payments
- process IPN/webhooks securely
- update order only after verification

Never mark an order as paid simply because the client redirected to a success URL.

---

## 15. PRESCRIPTION DATA

Prescription information is sensitive customer data. Treat it carefully.
Do not expose prescription data publicly.
Do not include prescriptions in: public URLs, public API responses, client-side logs, analytics events, console logs.
Only authorized users/admins should access prescription information.
Validate uploaded prescription files.

---

## 16. FILE UPLOADS

Never trust uploaded file extensions.
Validate: MIME type, file size, allowed formats.
Allowed prescription formats: PDF, JPG, JPEG, PNG.
Do not allow arbitrary executable files.

---

## 17. ADMIN SECURITY

Admin UI visibility is NOT security.
Every admin operation must also be protected server-side.
Never rely only on `if (user.isAdmin)` in a client component.
Verify authorization on the server.

---

## 18. ERROR HANDLING

Every feature must handle: loading, success, empty, error, unauthorized, not found, out of stock.
Do not leave blank screens.
Do not expose stack traces to customers.
Provide useful user-facing error messages.

---

## 19. ACCESSIBILITY

Use semantic HTML.
Provide: alt text, labels, keyboard navigation, focus states, accessible dialogs, accessible buttons, sufficient contrast.
Do not use clickable divs when a button/link is appropriate.

---

## 20. SEO

Public pages should use proper: metadata, title, description, canonical URL, OpenGraph, structured data.
Products should use appropriate Product schema.
Do not expose private pages to search engines.

---

## 21. PERFORMANCE

Avoid unnecessary: client components, JavaScript, API requests, database queries, image downloads, dependencies.
Prefer server rendering where appropriate.
Use optimized images.
Do not load every product image at full resolution.

---

## 22. TESTING

Before declaring your quota complete:
Run:
- lint
- typecheck
- build

Also manually test the feature you changed on both Desktop and Mobile.

---

## 23. DO NOT HIDE ERRORS

Never use `// @ts-ignore` just to make the build pass.
Never remove a failing test without understanding the reason.
Never disable lint rules globally to hide problems.
Never suppress errors that should actually be fixed.

---

## 24. GIT / CHANGE MANAGEMENT

Keep changes focused.
Do not modify unrelated files.
Do not reformat the entire project unnecessarily.
Do not rename files unless required.
Do not delete previous functionality.

---

## 25. HANDOFF SYSTEM

When your quota is complete, update:
`/docs/AGENT_HANDOFF.md`

Use this structure:
- Previous Agent
- Status
- Completed
- Files Created
- Files Modified
- Database Changes
- API Changes
- Important Implementation Details
- Known Issues
- Next Agent
- Verification (Lint, Typecheck, Build, Desktop, Mobile)

---

## 26. HANDOFF RULE

The next agent must be able to continue without asking: "What did the previous agent do?"
Everything necessary must be documented.

---

## 27. QUOTA COMPLETION RULE

A quota is COMPLETE only when:
- required functionality exists
- functionality works
- UI works
- mobile works
- existing functionality still works
- no new TypeScript errors exist
- no new lint errors exist
- production build succeeds
- handoff is documented

Once all conditions are satisfied: STOP. Do not continue into the next quota.

---

## 28. IF SOMETHING IS ALREADY COMPLETE

If your assigned feature is already implemented:
DO NOT rebuild it. Inspect it. Test it. Fix only genuine issues.
Then document: "Feature already existed; verified and/or fixed." Then STOP.

---

## 29. IF YOU DISCOVER AN UNRELATED BUG

Do not automatically fix unrelated bugs.
Record it in `/docs/TODO.md` unless it prevents your quota from functioning or breaks build.

---

## 30. FINAL PRINCIPLE

Think of yourself as one engineer in a large engineering team.
You are responsible for your assigned quota.
You are NOT responsible for rebuilding the entire application.
Preserve previous work. Build carefully. Test thoroughly. Document clearly. Then STOP.

---

## 31. ANTI-GENERIC / ANTI-AI DESIGN RULE

This project MUST NOT look like a generic AI-generated website.

The final website should look like it was designed and built by an experienced product designer and professional e-commerce development team.

The reference website:
https://shop.glassesbd.com/

should be used to understand the level of polish, density, hierarchy, commerce UX, product presentation, and overall professionalism.

Do NOT blindly copy its branding, assets, text, or proprietary design.
Instead, create an ORIGINAL premium eyewear brand with a similarly high-quality commercial experience.

### Never Use Generic AI Design Patterns
Avoid layouts that look like:
- generic SaaS landing pages
- generic Tailwind templates
- default shadcn demos
- AI-generated ecommerce templates
- "modern website" boilerplate
- excessive glassmorphism
- excessive gradients
- giant centered headings
- oversized rounded cards
- excessive pill-shaped buttons
- random floating blobs
- unnecessary glowing effects
- excessive drop shadows
- excessive animations
- arbitrary decorative shapes
- repetitive card grids
- excessive empty space
- identical sections repeated down the page
- generic stock-photo hero sections
- meaningless statistics
- fake testimonials
- unnecessary badges
- random icons used only for decoration

If a design element does not serve a real UX or business purpose, do not add it.

### The Site Must Feel Human-Designed
Every page should have intentional:
- visual hierarchy
- spacing
- typography
- alignment
- proportions
- image composition
- content density
- interaction patterns
- responsive behavior

Do not make every section look identical. Different sections should have different visual purposes:
- Hero: Strong visual impact.
- Product section: Dense and shopping-oriented.
- Category section: Visual discovery.
- Product detail: Information-rich but organized.
- Checkout: Focused and distraction-free.
- Account: Functional and compact.
- Admin: Information-dense and operational.

### Avoid "AI Template Syndrome"
Do NOT repeatedly generate structures like:
[Large Heading] -> [Paragraph] -> [Three Cards] -> [Button] -> [Three More Cards] -> [Large Gradient Section]
The website should have natural variation.

### Typography & Spacing
- Use different type scales for navigation, category titles, product names, prices, descriptions, technical information, buttons, and metadata.
- Product names and prices should receive appropriate visual priority.
- Spacing should respond intentionally to content density.

### Product Cards & Imagery
- Prioritize product photography, frame proportions, product name, price, discount, availability, wishlist, and quick actions.
- Do not turn every product into a giant rounded rectangle. Avoid unnecessary decorative UI.
- Use consistent aspect ratios, background treatments, image sizing, and crop behavior.

### Colors & Animation
- Primary: Deep Navy `#0B1F3A`, Accent: Luxury Champagne Gold `#C9A96E`, Surfaces: Clean warm whites and neutral tones.
- Avoid rainbow gradients, neon gradients, purple-blue AI aesthetics, and excessive glowing colors.
- Use subtle animations for interaction feedback (image transitions, drawer slides, modal reveals) without slowing down the shopping experience.

### Responsive Design & Content Realism
- Mobile must be designed intentionally: 2-column compact grid, mobile filter drawer, compact search and cart bar.
- Content must contain authentic technical specifications: frame material (Titanium, Acetate, TR90), optical measurements (Lens/Bridge/Temple mm), lens compatibility (Single Vision, Bifocal, Progressive), warranty, and local delivery details.
