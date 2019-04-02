**Relations**:
[User](#User) `<-hasMany->` [Chat](#Chat) `-hasMany->` [Message](#Message)

---

### User

- \_id: `ObjectId`
- email: `String`
- password: `String`
- username: `String`
- name: `String`
- chats: [`ObjectId`] -> [Chat](#Chat)
- createdAt:`Date`
- updatedAt:`Date`

### Chat

- \_id: `ObjectId`
- title: `String`
- users: [`ObjectId`] -> [User](#User)
- lastMessage: `ObjectId` -> [Message](#Message)
- createdAt:`Date`
- updatedAt:`Date`

### Message

- \_id: `ObjectId`
- body: `String`
- sender: `ObjectId` -> [User](#User)
- chat: `ObjectId` -> [Chat](#Chat)
- createdAt:`Date`
- updatedAt:`Date`
