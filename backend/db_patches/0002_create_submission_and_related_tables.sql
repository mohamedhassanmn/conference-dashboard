-- ============================================================
-- Submission Status ENUM
-- ============================================================
DO
$$
BEGIN
    IF register_patch(
        'create_submission_status_enum',
        'Hassan',
        'Create submission_status enum type',
        NOW()
    ) THEN

        CREATE TYPE submission_status AS ENUM (
            'draft',
            'submitted',
            'under_review',
            'accepted',
            'rejected',
            'withdrawn'
        );

    END IF;
END;
$$
LANGUAGE plpgsql;


-- ============================================================
-- Submissions Table
-- ============================================================
DO
$$
BEGIN
    IF register_patch(
        'create_submissions_table',
        'Hassan',
        'Create submissions table linked to users, stores MinIO file object keys',
        NOW()
    ) THEN

        CREATE TABLE IF NOT EXISTS submissions (
            submission_id          SERIAL PRIMARY KEY,
            user_id                INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
            title                  VARCHAR(500) NOT NULL,
            abstract_file_key      TEXT,
            supplementary_file_key TEXT,
            keywords               TEXT[] NOT NULL DEFAULT '{}',
            status                 submission_status NOT NULL DEFAULT 'draft',
            submitted_at           TIMESTAMP,
            created_at             TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at             TIMESTAMP NOT NULL DEFAULT NOW()
        );

        -- One submission per user
        CREATE UNIQUE INDEX IF NOT EXISTS UX_submissions_user_id
        ON submissions(user_id);

        CREATE INDEX IF NOT EXISTS IX_submissions_status
        ON submissions(status);

        CREATE TRIGGER set_timestamp
        BEFORE UPDATE ON submissions
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_timestamp();

    END IF;
END;
$$
LANGUAGE plpgsql;


-- ============================================================
-- Submission Authors Table
-- ============================================================
DO
$$
BEGIN
    IF register_patch(
        'create_submission_authors_table',
        'Hassan',
        'Create submission_authors table — ordered list of authors per submission',
        NOW()
    ) THEN

        CREATE TABLE IF NOT EXISTS submission_authors (
            author_id     SERIAL PRIMARY KEY,
            submission_id INTEGER NOT NULL REFERENCES submissions(submission_id) ON DELETE CASCADE,
            first_name    VARCHAR(100) NOT NULL,
            last_name     VARCHAR(100) NOT NULL,
            email         VARCHAR(255) NOT NULL,
            country       VARCHAR(100) NOT NULL,
            organization  VARCHAR(255) NOT NULL,
            webpage       TEXT,
            author_order  INTEGER NOT NULL DEFAULT 0,
            created_at    TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at    TIMESTAMP NOT NULL DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS IX_submission_authors_submission_id
        ON submission_authors(submission_id);

        CREATE TRIGGER set_timestamp
        BEFORE UPDATE ON submission_authors
        FOR EACH ROW
        EXECUTE PROCEDURE trigger_set_timestamp();

    END IF;
END;
$$
LANGUAGE plpgsql;