The following steps need to be performed before starting your application.

## Sqlite

Ensure that `DATABASE_URL` is configured in `.env` file, then create the database:

```bash
pnpm sqlite:migrate # creates sqlite tables
```

