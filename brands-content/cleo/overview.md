# Cleo

**Tagline:** With you for the everyday, cleo.

Cleo is a family agent with a memory, plus the focused apps that give it
something to remember. Parents reach it by text, from the AI they already use
over MCP, or out loud, and it answers from what they have logged and planned
rather than from nothing. The brand's job is to make the exhausting chaos of
new parenthood feel manageable, even a little joyful.

## Personality

Cleo is a calm, funny best friend who has already been through it. Warm without
being saccharine, playful without being loud, and never clinical. It reassures
as much as it informs, because a first-time parent at 3am needs a steady voice
more than another statistic.

## The agent and the apps

Cleo is one agent with one memory per family, and three focused apps that give
that memory something to hold. All of it sits under one parent brand (**Cleo.**):

- **Cleo** — the family agent. One memory per family, reached by text, through
  the MCP connector from any AI that speaks it, or out loud in Cleo Voice. It
  reads and writes Cleo Track and Cleo Plan. Free.
- **Cleo Track** — feeding, sleep, and diaper tracking (iOS + web; free, with
  optional Cleo+). Most of what the agent knows about a baby starts here.
- **Cleo Plan** — meals, lists, trips, and the week (web; free in beta). The
  half of the agent's context it can also write to.
- **Cleo Routine** — a child-operated morning routine for toddlers 2–5 (iOS;
  free). Stays on the child's device. The agent cannot read it.

**On naming:** the agent is just **Cleo**. "Cleo Connect" is retired as a
marketed name and should not appear in new copy. The repo and the API are still
called `cleo-connect` internally, which is fine — only the marketed name
changed. The public route is `/assistant`.

## At a glance

- **Category:** A family agent, plus the parenting apps that feed it (tracking, planning, routines)
- **Audience:** First-time parents — sleep-deprived, overwhelmed, looking for reassurance as much as data — and the household around them (partner, grandparents, caregivers)
- **Feeling to leave behind:** "I've got this, and someone's got me."
- **Three words:** Warm, calm, reassuring
- **Not:** Clinical, judgmental, urgent, cluttered

## What Cleo is not

- **Not a medical tool** — always points parents to a pediatrician for health concerns.
- **Not a parenting-advice platform** — it tracks and organizes, it doesn't prescribe.
- **Not overwhelming** — if a screen holds more than three pieces of information, simplify it.
- **Not a black box** — anything the agent does is visible and editable in the apps, on a phone or a laptop.
- **Not something that starts over** — the context lives with the family, not inside whichever tool they used last.

## Honesty constraints

These are the things copy about Cleo gets wrong. Check any new claim against
them.

- **The agent reads Cleo Track and Cleo Plan only.** Cleo Routine is sign-in
  only and syncs nothing, and Plan's routine charts have no mirror the agent can
  reach. Never imply the agent knows about a child's routines.
- **Texting Cleo is in beta, US numbers only, and Cleo Voice has no App Store
  build yet.** Badge both rather than promising them.
- **On data, claim only this:** it is never sold, never used for advertising or
  profiling, and the vendor models Cleo sends data to do not train on it (their
  commercial terms). Do not add a zero-retention claim or a no-aggregation
  claim — the privacy policy does not back either one yet, and marketing copy
  must not get ahead of it.
