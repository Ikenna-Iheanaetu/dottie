# Migration from Azure SQL to Supabase

This guide explains how to migrate the Dottie Health application from Azure SQL to Supabase.

## Prerequisites

1. A Supabase account with a new project
2. The necessary environment variables
3. Node.js installed

## Steps to migrate

### 1. Environment Variables

Make sure you have the following environment variables in your `.env` file:

```
SUPABASE_ANON_PUBLIC=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
SUPABASE_JWT_SECRET=your_jwt_secret
```

### 2. Create Database Tables in Supabase Dashboard

Create the following tables in the Supabase dashboard:

#### Users Table
- id: uuid PRIMARY KEY
- username: text UNIQUE NOT NULL
- email: text UNIQUE NOT NULL
- password_hash: text NOT NULL
- age: text
- reset_token: text
- reset_token_expires: timestamp with time zone
- created_at: timestamp with time zone DEFAULT NOW()
- updated_at: timestamp with time zone DEFAULT NOW()

#### Period Logs Table
- id: serial PRIMARY KEY
- user_id: uuid REFERENCES users(id)
- start_date: date NOT NULL
- end_date: date
- flow_level: integer
- created_at: timestamp with time zone DEFAULT NOW()
- updated_at: timestamp with time zone DEFAULT NOW()

#### Conversations Table
- id: uuid PRIMARY KEY DEFAULT uuid_generate_v4()
- user_id: uuid REFERENCES users(id)
- title: text
- created_at: timestamp with time zone DEFAULT NOW()
- updated_at: timestamp with time zone DEFAULT NOW()

#### Chat Messages Table
- id: uuid PRIMARY KEY DEFAULT uuid_generate_v4()
- conversation_id: uuid REFERENCES conversations(id)
- role: text NOT NULL
- content: text NOT NULL
- created_at: timestamp with time zone DEFAULT NOW()

#### Assessments Table
- id: text PRIMARY KEY
- user_id: text NOT NULL
- created_at: text NOT NULL
- age: text
- cycle_length: text
- period_duration: text
- flow_heaviness: text
- pain_level: text

#### Symptoms Table
- id: serial PRIMARY KEY
- assessment_id: text NOT NULL REFERENCES assessments(id)
- symptom_name: text NOT NULL
- symptom_type: text NOT NULL

#### Temp Test CRUD Table (for testing)
- id: uuid PRIMARY KEY
- name: text
- created_at: timestamp with time zone DEFAULT NOW()

### 3. Run the Migration Script

Execute the migration script to install dependencies and update the codebase:

```
cd backend
npm run migrate:to-supabase
```

This script will:
1. Install Supabase client
2. Verify connection to Supabase
3. Run tests to ensure compatibility
4. Clean up Azure SQL related code

### 4. Migrate Data (if needed)

If you have existing data in Azure SQL, you can export it and import it into Supabase:

1. Export data from Azure SQL (using tools like SQL Server Management Studio)
2. Format the data as needed for Supabase (convert to PostgreSQL compatible formats)
3. Import the data into Supabase using:
   - Supabase dashboard UI
   - SQL INSERT statements via the SQL Editor
   - Programmatic API calls

### 5. Test the Application

Run the application tests to ensure everything is working with Supabase:

```
cd backend
npm test
```

### 6. Update Deployment Settings

If you're deploying to Vercel or another platform, make sure to update the environment variables.

## API Changes

The database service layer has been updated to use Supabase, but the API endpoints remain the same, ensuring backward compatibility.

## Troubleshooting

- If you encounter connection issues, check your Supabase URLs and API keys
- For table creation errors, make sure your tables match the required schema
- For data-related issues, examine the Supabase logs in the dashboard 