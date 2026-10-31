# T-04: Translations, CSS & Verification

**Status:** ready-for-agent  
**Blocked by:** T-02, T-03  
**Assigned:** unassigned  

## Goal
Wire all new labels into `translations.ts` for both `th` and `en`, style popovers and buttons in `src/index.css`, and verify clean build with `npm run build` and `npm run lint`.

## Acceptance Criteria
- [ ] Both Thai and English translation dictionaries updated.
- [ ] Popovers styled with mobile-friendly touch targets (min 44px) and clean z-index hierarchy.
- [ ] `npm run build` passes with 0 errors.
- [ ] `npm run lint` passes with 0 errors.
