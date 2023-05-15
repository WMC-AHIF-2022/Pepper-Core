import { DB } from "../database";
export async function addUser(user) {
    console.log("aaaaa");
    const db = await DB.createDBConnection();
    console.log("bbbb");
    const stmt = await db.prepare('INSERT INTO users(USERNAME, PASSWORD) VALUES (?1, ?2)');
    console.log("cccc");
    await stmt.bind({ 1: user.username, 2: user.password });
    console.log("dddd");
    const operationResult = await stmt.run();
    console.log("eeee");
    await stmt.finalize();
    await db.close();
    if (typeof operationResult.changes !== "number" || operationResult.changes !== 1) {
        throw new Error("Username is already known");
        console.log("yyyy");
    }
    else {
        user.id = operationResult.lastID;
    }
}
export async function getAllUsers() {
    const db = await DB.createDBConnection();
    const users = await db.all('SELECT * FROM users');
    await db.close();
    return users;
}
export async function isAuthorized(user) {
    const db = await DB.createDBConnection();
    const stmt = await db.prepare(`SELECT * FROM users WHERE username = ?1`);
    await stmt.bind({ 1: user.username });
    const result = await stmt.get();
    await stmt.finalize();
    await db.close();
    return typeof result !== "undefined" && result.password === user.password;
}
export async function getUserId(userName, userPassword) {
    console.log("Get user Id methode hineingegangen");
    const db = await DB.createDBConnection();
    const stmt = await db.prepare(`SELECT * FROM users WHERE username = ?1 && password = ?2`);
    await stmt.bind({ 1: userName, 2: userPassword });
    const result = await stmt.get();
    await stmt.finalize();
    await db.close();
    console.log("Get user id mehtode verlassen");
    if (result === undefined) {
        return -1;
    }
    else {
        return result.id;
    }
}
//# sourceMappingURL=user-repository.js.map