CREATE TABLE duty (
    id bigserial PRIMARY KEY,
    name varchar(255) not null,
    created_date timestamp with time zone not null DEFAULT current_timestamp,
    modified_date timestamp with time zone not null DEFAULT current_timestamp
);
CREATE INDEX created_date_idx ON duty (created_date);
CREATE INDEX modified_date_idx ON duty (modified_date);
