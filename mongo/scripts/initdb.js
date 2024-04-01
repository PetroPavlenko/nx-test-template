// Function to check if a user already exists
function doesUserExist(username, database) {
    var users = database.getUsers();
    for (var i = 0; i < users.length; i++) {
        if (users[i].user === username) {
            return true;
        }
    }
    return false;
}

// User configuration array
var usersToCreate = [
    { username: "admin-account", pwd: "admin", dbName: "account", role: "readWrite" },
    { username: "admin-auth", pwd: "admin", dbName: "account", role: "readWrite" },
    { username: "test2", pwd: "test2", dbName: "test2", role: "readWrite" },
    // Add more users as needed
];

// Connect to the admin database
var adminDb = db.getSiblingDB('admin');


if (!doesUserExist("test-admin", adminDb)) {
  db.createUser({
    user: "test-admin",
    pwd: "test-admin",
    roles: [
      { role: "userAdminAnyDatabase", db: "admin" },
      { role: "readWrite", db: "admin" }
    ]
  });
}

// Loop through the users and create them if they don't exist
usersToCreate.forEach(function(user) {
    if (!doesUserExist(user.username, adminDb)) {
        // Create user if not exists
        adminDb.createUser({
            user: user.username,
            pwd: user.pwd,  // Use a secure password
            roles: [{ role: user.role, db: user.dbName }]
        });
        print('User ' + user.username + ' created');
    } else {
        print('User ' + user.username + ' already exists');
    }

    // Connect to the target database and create a collection
    var userDb = db.getSiblingDB(user.dbName);
    userDb.createCollection('deleteMe_' + user.username);
});

print('User creation script executed');