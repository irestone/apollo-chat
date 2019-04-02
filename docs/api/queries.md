# GraphQL query samples

## User

### Queries

```
{
  me {
    id
    email
    username
    name
  }
}

{
  users {
    id
    email
    username
    name
  }
}

{
  user(id: "5c9e26b5005f1c247452451a") {
    id
    email
    username
    name
  }
}
```

### Mutations

```
mutation {
  signUp(
    email: "admin@admin"
    password: "admin123"
    username: "admin123"
    name: "Admin"
  ) {
    id
    email
    username
    name
  }
}

mutation {
  signIn(email: "admin@admin", password: "admin123") {
    id
    email
    username
    name
  }
}

mutation {
  signOut
}
```
