# Firebase App Check setup

The app initializes App Check only when VITE_FIREBASE_APPCHECK_SITE_KEY is set. The key is public; it is a site key, not a secret.
reCAPTCHA Enterprise assessments may incur charges above the applicable no-cost quota; review the current Google Cloud pricing for the project before enabling it.

1. In the Google Cloud project linked to Firebase, create a reCAPTCHA Enterprise Web key for mustafa-dev-portfolio.web.app and any custom production domain. Do not add localhost to this production key.
2. In Firebase Console, open Security > App Check, register the web app with the same reCAPTCHA Enterprise key, and initially leave Cloud Firestore in monitoring mode.
3. Add the key as the GitHub repository variable VITE_FIREBASE_APPCHECK_SITE_KEY under Settings > Secrets and variables > Actions > Variables. For local testing, put it in the ignored .env.local file.
4. Push a new commit to rebuild and deploy the site. Verify that Firestore requests appear as valid in App Check metrics and test the live contact form.
5. Only after confirming real traffic is attested, enable Cloud Firestore enforcement in Firebase Console. Enforcement rejects unverified requests, so monitor before turning it on.

For local development after enforcement, use Firebase's App Check debug provider and a locally scoped debug token; do not add localhost to the production reCAPTCHA key.
