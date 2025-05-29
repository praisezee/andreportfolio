# Portfolio Website

A professional portfolio website for a UI/UX designer built with Next.js, Tailwind CSS, and Prisma ORM with SQLite.

## Features

- Responsive design with light/dark mode
- Portfolio showcase with filtering
- Skills and testimonials sections
- Admin dashboard for content management
- Prisma ORM with SQLite database for data persistence
- Type-safe database operations

## Getting Started

### Prerequisites

- Node.js 18.18.0 or later
- npm or yarn

### Installation

1. Clone the repository:

\`\`\`bash
git clone https://github.com/yourusername/portfolio-website.git
cd portfolio-website
\`\`\`

2. Install dependencies:

\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. Set up the database:

\`\`\`bash
# Generate Prisma client
npm run db:generate

# Push the schema to the database
npm run db:push

# Seed the database with sample data
npm run db:seed
\`\`\`

4. Start the development server:

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Admin Access

The default admin credentials are:

- Username: \`admin\`
- Password: \`admin123\`

You can access the admin dashboard at [http://localhost:3000/admin](http://localhost:3000/admin).

## Database Management

### Prisma Commands

- \`npm run db:generate\` - Generate Prisma client
- \`npm run db:push\` - Push schema changes to database
- \`npm run db:migrate\` - Create and apply migrations
- \`npm run db:seed\` - Seed database with sample data
- \`npm run db:studio\` - Open Prisma Studio (database GUI)

### Schema Changes

When you modify the Prisma schema (\`prisma/schema.prisma\`):

1. Run \`npm run db:push\` to apply changes to the database
2. Run \`npm run db:generate\` to update the Prisma client

## Environment Variables

Create a \`.env.local\` file in the root directory with the following variables:

\`\`\`
JWT_SECRET=your-super-secret-key
DATABASE_URL="file:./dev.db"
\`\`\`

## Project Structure

\`\`\`
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Database seeding script
├── lib/
│   ├── prisma.ts        # Prisma client configuration
│   └── data-store.ts    # Database operations
├── components/          # React components
├── app/                 # Next.js app directory
└── public/              # Static assets
\`\`\`

## Deployment

This project can be deployed on Vercel:

1. Push your code to a GitHub repository.
2. Import the project in Vercel.
3. Set the environment variables.
4. The database will be created automatically on first deployment.

For production, consider using a hosted database like PlanetScale or Neon.

## License

This project is licensed under the MIT License.
