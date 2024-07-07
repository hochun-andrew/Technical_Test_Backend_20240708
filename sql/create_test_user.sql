CREATE USER web_app_user WITH PASSWORD 'p@ssw0rd';
GRANT CONNECT ON DATABASE web_app TO web_app_user;
GRANT pg_read_all_data TO web_app_user;
GRANT pg_write_all_data TO web_app_user;
