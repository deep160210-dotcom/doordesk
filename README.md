# DoorDesk — Door Shop Management PWA

A responsive starter app for Android, tablets and computers.

## Included
- Customer-facing door catalogue grouped by category
- Owner/staff dashboard, order creation and order tracking
- Door measurements in feet; square-foot and price calculations
- Multiple door lines per order
- Customer directory and payment balance
- Installable PWA shell
- Firebase Authentication + Firestore integration points
- Firestore security rules with owner/staff/customer roles

## Important modes
**Demo mode:** With the placeholder values in `config.js`, the app runs with sample designs and saves data only in the current browser using local storage. It does NOT sync across devices and must not be used for real customer information.

**Online mode:** To enable accounts and cross-device data, create a Firebase project on the free Spark plan, enable Email/Password Authentication and Firestore, paste the Firebase web config into `config.js`, publish `firestore.rules`, and host the folder on Firebase Hosting. Free-tier quotas and terms apply; usage above free quotas may require a paid plan or stop working.

## First-time Firebase setup
1. Create a Firebase project at https://console.firebase.google.com/ and choose the no-cost Spark plan.
2. Add a Web app and copy its config values into `config.js`.
3. In Authentication → Sign-in method, enable Email/Password.
4. Create a Cloud Firestore database.
5. Publish the included `firestore.rules`.
6. Create the first owner account using the app's sign-up flow (temporarily enable customer sign-up if needed), then in Firestore Console create `users/{OWNER_UID}` with `{ "role": "owner", "name": "Shop Owner" }`. Use the Authentication UID shown for that account. Then sign out and sign in again.
7. Owner can create staff/customer user accounts through Firebase Authentication Console; add a matching `users/{UID}` document with role `staff` or `customer`. Customers can also sign up in the app; owner must add their role document as `customer`.
8. Deploy the folder to Firebase Hosting using the Firebase CLI. The default `web.app` address is free; a custom domain is not included.

## Important limitations before real shop use
- This is a starter implementation, not a fully audited production system.
- The customer order/enquiry form and role provisioning need a final shop-specific pass before real customer rollout.
- The catalogue currently uses simple placeholder symbols rather than uploaded product photos.
- Do not store sensitive identity documents or payment-card data.
- Verify product specifications and outdoor/sunlight suitability with the manufacturer; do not rely on category labels alone.
- Set correct taxes, delivery charges, discounts, warranty and pricing rules for your shop before taking orders.
- Test permissions with separate owner, staff and customer accounts before adding real records.
