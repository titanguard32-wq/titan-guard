# TITAN GUARD CORPORATE — Black Gold 3D

Starter project for a real Supabase-backed recruitment and corporate security-services website.

## Included
- Premium black/gold responsive landing page.
- Applicant registration for Front Service, Intelligent Service, Cyber Service, and Eyes Service.
- Exam UI gated behind successful registration.
- 20-question cognitive aptitude assessment, 20-minute timer, automatic score display.
- Client inquiry form with a minimum requested service value of Rp10,000,000.
- HRD dashboard starter view.
- Supabase SQL schema with role-aware RLS policies.
- Edge Function starter endpoints for exam start, exam submission, and member-card issuance.

## Important production notes
1. This is a deployable starter, not a certified hiring/psychometric platform.
2. The assessment is an aptitude screening exercise, **not a clinical IQ test** and cannot establish an IQ of 120.
3. Do not publish service claims, licenses, client logos, or accreditations unless verified by TITAN GUARD.
4. HRD accounts must be provisioned by an administrator. Never expose service-role keys in browser code.
5. Configure Supabase Auth, Storage buckets, Edge Functions, and SMTP before accepting real applicants.
6. Run the migration in `supabase/migrations/001_initial_schema.sql`.
7. Add the Supabase project URL and anon key to `public/config.js`.
8. Deploy Edge Functions with Supabase CLI. The supplied functions are secure-structure starters and require environment configuration and final review before production.
9. For production exam integrity, keep question bank and answer keys server-side, enforce one active attempt per applicant, and use server timestamps. The sample UI includes demo questions only when explicitly configured for local preview.

## Local preview
Open `public/index.html` in a browser. To connect Supabase, edit `public/config.js`.
For a production deployment, serve the `public/` directory over HTTPS.

## Supabase setup
- Project name already chosen: `titan-guard-prod`
- Region: Singapore
- Add an `hrd` role to authorized users in `profiles`.
- Create a private Storage bucket named `applicant-documents`.
- Configure Edge Function secrets: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
- Review RLS and test with applicant, client, HRD, and unauthenticated sessions.

## Member card lifecycle
A registration confirmation is not membership approval. Member cards are issued only after HRD marks an applicant approved and the server-side issuance function succeeds. Barcode values should be opaque random verification tokens, not personal data.
