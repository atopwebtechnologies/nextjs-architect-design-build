# Folder Structure:

We’ll organize the project so it’s easy to follow and maintain, even though it’s just for demonstration:
bash

/mini-bank-blog

/public
/images - dashboard_final.png - dashboard_skeleton.png

/src
/components - Registration.jsx - Login.jsx - Dashboard.jsx - ProfileSettings.jsx
/styles - globals.css

- next.config.js
- package.json
- README.md

We’ll place our final and skeleton dashboard images in the public/images folder. Each feature (registration, login, dashboard, profile settings) will have its own React component in the components folder. The styles folder will hold our global Tailwind configuration.

## Colors

- Primary Color: A soft, warm blue (#4285F4) for buttons and key elements.
- Secondary Color: A light grey (#F1F3F4) for backgrounds and less prominent sections.
- Accent Color: A soft green (#34A853) to highlight positive actions or statuses.
- Neutral Text Color: A dark grey (#202124) to ensure good readability.

FILE STRUCTURE:
mini-bank/
├── app/
│ ├── globals.css
│ ├── layout.js
│ ├── page.js (Landing page)
│ ├── register/
│ │ └── page.js
│ ├── login/
│ │ └── page.js
│ ├── dashboard/
│ │ ├── page.js
│ │ └── loading.js
│ ├── profile/
│ │ └── page.js
│ └── api/
│ ├── auth/
│ │ ├── register/
│ │ │ └── route.js
│ │ └── login/
│ │ └── route.js
│ ├── user/
│ │ └── route.js
│ └── transactions/
│ └── route.js
├── components/
│ ├── ui/
│ │ ├── Button.js
│ │ ├── Input.js
│ │ └── Card.js
│ ├── TransactionList.js
│ ├── Navigation.js
│ └── AuthForm.js
├── lib/
│ ├── auth.js
│ ├── db.js (mock database)
│ └── utils.js
└── middleware.js
