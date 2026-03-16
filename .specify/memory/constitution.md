<!--
Sync Impact Report
- Version change: 0.0.0-template -> 1.0.0
- Modified principles:
	- [PRINCIPLE_1_NAME] -> I. User Value First
	- [PRINCIPLE_2_NAME] -> II. Spec-Driven Delivery
	- [PRINCIPLE_3_NAME] -> III. Quality Gates (Non-Negotiable)
	- [PRINCIPLE_4_NAME] -> IV. Security and Privacy by Default
	- [PRINCIPLE_5_NAME] -> V. Simplicity and Operability
- Added sections:
	- Engineering Standards
	- Workflow and Review Gates
- Removed sections:
	- None
- Templates requiring updates:
	- ✅ .specify/templates/plan-template.md
	- ✅ .specify/templates/spec-template.md
	- ✅ .specify/templates/tasks-template.md
	- ⚠ pending: .specify/templates/commands/*.md (directory not present in this repository)
- Runtime docs reviewed:
	- ✅ README.md (no conflicting references found)
- Deferred TODOs:
	- None
-->

# AI Expense Tracker Constitution

## Core Principles

### I. User Value First
Every feature MUST map to at least one independently testable user story and at
least one measurable success criterion before implementation starts. Features
without clear user value or measurable outcome MUST NOT enter implementation.
Rationale: explicit value and metrics keep delivery focused and prevent scope
drift.

### II. Spec-Driven Delivery
Work MUST follow the artifact chain `spec.md -> plan.md -> tasks.md -> implementation`.
Each artifact MUST be complete and internally consistent before moving forward.
Optional quality steps (`/speckit.clarify`, `/speckit.analyze`, `/speckit.checklist`)
SHOULD be used for medium-to-high complexity changes.
Rationale: staged decision-making reduces rework and increases implementation
predictability.

### III. Quality Gates (Non-Negotiable)
Before merge, code MUST pass lint, type checks, and relevant tests. New
functional behavior MUST include automated tests for core business logic and
critical user flows. Bug fixes MUST include a regression test that fails before
the fix and passes after.
Rationale: enforceable quality gates protect stability as features iterate.

### IV. Security and Privacy by Default
All user input MUST be validated and sanitized at trust boundaries. Secrets MUST
NOT be committed to source control. Access to sensitive data and operations MUST
follow least-privilege principles and auditable error handling.
Rationale: preventive security controls are cheaper and safer than post-incident
remediation.

### V. Simplicity and Operability
Designs MUST choose the simplest architecture that satisfies current
requirements. Any added complexity (new infrastructure, abstraction layers, or
cross-cutting tooling) MUST be justified in the plan's complexity tracking.
Production-impacting failures MUST be diagnosable via clear logging and error
messages.
Rationale: simple systems change faster, fail less, and are easier to operate.

## Engineering Standards

- Primary stack MUST remain aligned with this repository setup: Next.js (App
	Router), TypeScript, and Node.js LTS.
- TypeScript strictness MUST be preserved for new modules.
- UI work MUST preserve accessibility semantics (labels, focus behavior, and
	keyboard operability for interactive controls).
- Performance-sensitive paths (dashboard aggregation, filtering, and CSV export)
	MUST define measurable targets in `spec.md` success criteria.
- Developer-facing specs and plans SHOULD be written in Vietnamese for team
	clarity unless external stakeholders require English.

## Workflow and Review Gates

- Feature work MUST start from `/speckit.specify` and proceed through
	`/speckit.plan` and `/speckit.tasks` before `/speckit.implement`.
- If the constitution is amended, active plans/tasks for impacted features MUST
	be revalidated before further implementation.
- Pull requests MUST include: linked spec/plan/tasks artifacts, evidence of
	quality gates passing, and a concise risk summary.
- Reviewers MUST block merges when any constitutional gate is unmet.

## Governance

This constitution supersedes ad-hoc process decisions for this repository.

Amendment policy:
- Amendments MUST be proposed via pull request with explicit rationale,
	migration impact, and template sync changes.
- Approval requires maintainer review and confirmation that dependent templates
	remain aligned.

Versioning policy:
- MAJOR: incompatible governance changes or principle removals/redefinitions.
- MINOR: new principle/section or materially expanded guidance.
- PATCH: clarifications and wording improvements without semantic change.

Compliance review expectations:
- Every feature PR MUST confirm constitution compliance in review notes.
- Violations MUST be documented in plan complexity tracking and explicitly
	approved before merge.

**Version**: 1.0.0 | **Ratified**: 2026-03-14 | **Last Amended**: 2026-03-14
