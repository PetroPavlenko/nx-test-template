db.createUser(
  {
      user: "test-admin",
      pwd: "test-admin",
      roles: [
        { role: "userAdminAnyDatabase", db: "admin" },
        { role: "readWrite", db: "admin" }
      ]
  });