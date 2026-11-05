// Add your Firebase web-app configuration here after creating a free Firebase project.
// Do not paste private service-account keys here. These are public client configuration values.
export const firebaseConfig = {
  apiKey: "PASTE_API_KEY",
  authDomain: "PASTE_PROJECT.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  appId: "PASTE_APP_ID"
};
export const isConfigured = !Object.values(firebaseConfig).some(v => String(v).startsWith("PASTE_"));