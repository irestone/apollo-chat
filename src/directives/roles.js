import { SchemaDirectiveVisitor } from 'apollo-server-express'
import { defaultFieldResolver } from 'graphql'

import auth from '../auth'

// todo Create schema directives to control the access to data
// @auth - checks whether user is authenticated
// @access(require: Role = USER) - checks whether user has access
// to data (authorized). Roles: ADMIN, USER
// todo Might be useful to create scopes
// @scope(require: Scope)
// Scopes: write:comments, read:userInfo
// ? Or maybe make it this way...
// @access(role: Role = USER, scope: Scope)
// This will asume that the user is authenticated in the first place
// ? Or...
// @admin - client has an 'admin' role
// @user - client has an 'user' role
// @guest - client is not authorized
// @scope(includes: [Scope]) - client has required scopes

export class GuestDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = function (...args) {
      auth.ensure.signedOut(args[2])
      return resolve.apply(this, args)
    }
  }
}

export class UserDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field
    field.resolve = function (...args) {
      auth.ensure.signedIn(args[2])
      return resolve.apply(this, args)
    }
  }
}
