// encode-basic-auth.js

// 任意のユーザー名とパスワードを入力
const username = 'user';
const password = 'password123';

// "user:password123" の形式に連結してBase64エンコード
const token = Buffer.from(`${username}:${password}`).toString('base64');

// 結果を出力
console.log(`Authorization: Basic ${token}`);
