# PostHog post-wizard report

The wizard has completed a PostHog integration for the DevEvent app — a developer events hub built with Next.js 16.2.12 (App Router). PostHog is initialized via `instrumentation-client.ts` (the recommended approach for Next.js 15.3+), with a reverse proxy configured in `next.config.ts` to route events through `/ingest` and reduce tracking-blocker interference. Two client-side events were instrumented across the interactive components, capturing user engagement with the events listing page.

| Event name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicks the 'Explore Events' button on the home page to scroll to the events list. | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicks an event card to navigate to the event detail page. | `components/EventCard.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard**: [Analytics basics (wizard)](https://us.posthog.com/project/535011/dashboard/1929142)
- **Insight**: [Explore Events clicks (wizard)](https://us.posthog.com/project/535011/insights/BUzo63Zc) — Daily trend of Explore Events button clicks
- **Insight**: [Event card clicks by event (wizard)](https://us.posthog.com/project/535011/insights/ExLW2tmd) — Which events users click most, broken down by event title
- **Insight**: [Event engagement funnel (wizard)](https://us.posthog.com/project/535011/insights/Mizr7GMo) — Conversion from Explore Events click to event card click

## Verify before merging

- [ ] Run a full production build (the wizard only verified the files it touched) and fix any lint or type errors introduced by the generated code.
- [ ] Run the test suite — call sites that were rewritten or instrumented may need updated mocks or fixtures.
- [ ] Add `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` to `.env.example` and any monorepo/bootstrap scripts so collaborators know what to set.
- [ ] Wire source-map upload (`posthog-cli sourcemap` or your bundler's upload step) into CI so production stack traces de-minify.

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
