# TASTE_GUIDE.md - AICostPlanner Design and Content Taste Guide

## Design Philosophy

AICostPlanner embodies the **Agent Budget Console V2** aesthetic — a refined API cost control console that feels premium, functional, and serious.

## Visual Identity

### Color Palette

**Dark Palette (Hero/Console Areas)**
- Background: `#0a0d12` (near-black)
- Elevated: `#111520`
- Card: `#141824`
- Border: `#1e2535`
- Highlight: `#1a1f2e`

**Light Palette (Content Areas)**
- Background: `#f8f9fb` (off-white)
- Elevated: `#ffffff`
- Muted: `#f1f3f6`
- Border: `#e2e5ea`

**Accent Colors (Restrained Use)**
- Cyan: `#22d3ee` (functional signals)
- Blue: `#3b82f6` (CTAs)
- Green: `#10b981` (success/OK status)
- Yellow: `#f59e0b` (warning)
- Red: `#ef4444` (error)

### Typography

**Font Stack**
- Sans-serif: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI'
- Monospace: 'SF Mono', 'Fira Code', 'Fira Mono', ui-monospace

**Monospace Use (Only These)**
- `request_id`
- `tokens_in`
- `tokens_out`
- `tool_calls`
- `retries`
- `model`
- `pricing_unit`
- Code blocks
- Technical labels

**Never Monospace**
- Body paragraphs
- Headings
- Navigation
- CTAs

### Spacing

- Generous spacing in content areas
- Compact spacing in console/technical areas
- Clear visual hierarchy through size contrast

## Page Structure

### Homepage

**Hero (Dark)**
- H1: Dark background, light text
- Subtitle: Dark muted text
- CTAs: Gradient primary, outline secondary
- Right side: Console preview panel

**Console Preview (Right Side)**
- Dark elevated surface
- Grid dots (traffic light style)
- Monospace labels and values
- Color-coded status indicators
- Realistic request log appearance

**Problem Cards (Dark)**
- Compact cards
- Icon + title + description
- No excessive decoration
- Cyan accent for icons

**Cost Units (Dark)**
- Horizontal row of unit badges
- Monospace labels
- Cyan for active/highlighted

**Content Sections (Light)**
- Off-white background
- Clear section headers
- Card grid for page links
- Step-by-step frameworks
- AI Summary in bordered box

**FAQ (Light)**
- Clean list
- Question in bold
- Answer in muted text
- Border separators

**CTA (Light)**
- Centered
- Primary + secondary buttons
- Brief explanation

### Content Pages

**Hero (Dark)**
- Breadcrumb
- H1 title
- Last updated date (monospace)

**Content (Light)**
- Quick Answer box (blue left border)
- H2 sections with top border
- Lists and paragraphs
- Checklists with green checkmarks
- Internal link cards
- AI Summary block
- FAQ section

**CTA (Light)**
- Centered block
- Both CTAs

## Content Tone

### Voice
- Educational
- Informative
- Professional
- Actionable
- Clear

### Disclaimers (Required)
- "Pricing and model availability can change"
- "Check live provider pricing"
- "This is educational, not official [provider] pricing"
- "Not affiliated with [providers]"
- "Examples for educational purposes"

### Banned Language
- ❌ "cheapest"
- ❌ "lowest price"
- ❌ "guaranteed"
- ❌ "all models available"
- ❌ "unlimited"
- ❌ "no risk"
- ❌ "official partner"

### Safe Language
- ✅ "check live pricing"
- ✅ "model availability varies"
- ✅ "test small before scaling"
- ✅ "pricing can change"
- ✅ "examples for reference"

## Component Examples

### Console Log Entry
```
request_id      req_8f3k2m9n
model           claude-3-5-sonnet
tokens_in       24,891
tokens_out      3,247
tool_calls      12
retries         0
```

### Checklist Item
```
✓  Check tokens_in and tokens_out per request
✓  Review tool_calls count
✓  Look for retry patterns
✓  Compare against dashboard
```

### Unit Badge
```
[token] [credit] [second] [image] [video] [task]
```

### Problem Card
```
┌──────────────────────┐
│  [Icon - cyan]       │
│  Context Loading     │
│                      │
│  Coding agents load  │
│  project files...     │
└──────────────────────┘
```

## Rejection Criteria

Reject any output that:
- Looks like generic AI SaaS landing page
- Uses purple gradients
- Has cyberpunk neon overload
- Is too cluttered
- Uses fake metrics or fake dashboards
- Makes content hard to read
- Hides SEO content behind visual gimmicks
- Doesn't clearly communicate "cost planning" within 5 seconds

## Quality Gates

Before publishing, verify:
1. Hero feels like Agent Budget Console V2
2. Hero is dark but premium, not cyberpunk
3. Lower sections are light and readable
4. Request logs look realistic
5. No fake-looking metrics
6. Page clearly about cost planning
7. Page works as SEO/GEO content hub
