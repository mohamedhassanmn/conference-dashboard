DO
$$
BEGIN
    IF register_patch(
        'create_users_table',
        'Hassan',
        'Create users table for auth with timestamp trigger',
        NOW()
    ) THEN

        -- Create table
        CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL PRIMARY KEY,
            first_name VARCHAR(100) NOT NULL,
            last_name VARCHAR(100) NOT NULL,
            affiliation VARCHAR(255),
            region VARCHAR(100),
            email VARCHAR(255) NOT NULL,
            password_hash TEXT NOT NULL,
            is_verified BOOLEAN NOT NULL DEFAULT FALSE,
            is_active BOOLEAN NOT NULL DEFAULT TRUE,
            role VARCHAR(50) NOT NULL DEFAULT 'user',
            last_login_at TIMESTAMP,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        );

        CREATE UNIQUE INDEX IF NOT EXISTS UX_users_email
        ON users(email);

        -- Create trigger for auto-updating `updated_at`
        CREATE TRIGGER set_timestamp
        BEFORE UPDATE ON users
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_timestamp();

    END IF;
END;
$$
LANGUAGE plpgsql;