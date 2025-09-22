const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "author"],
    },
    // Blocca l'accesso per l'utente
    isActive: {
        type: Boolean,
        default: true,
    },
    // Rappresenta la verifica dell'email da parte dell'utente
    isVerified: {
        type: Boolean,
        default: true,
    },
    // 1. L'utente si registra
    // 2. Riceve l'email con un link da visitare
    //  2.1. http://localhost:3000/auth/verify?email=miaemail@example.com&token=[emailVerifyToken]
    //  2.2. Cerco sul DB un utente con email e emailVerifyToken passati tramite query params
    //  2.3. Se trova corrispondenza e il token è corretto, imposta isVerified come true ed elimina il emailVerifyToken, altrimenti manda un errore in output
    emailVerifyToken: {
        type: String,
        default: null,
    },
}, { timestamps: true, versionKey: false });

const User = model("User", UserSchema);

module.exports = User;