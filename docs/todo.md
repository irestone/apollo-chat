- Directives on OBJECT

```
type User @auth(requires: USER) {
  name: String
  banned: Boolean @auth(requires: ADMIN)
  canPost: Boolean @auth(requires: REVIEWER)
}
```

- `auth.ensure.not.signedIn(ctx)`
- update .env
- update api/queries
