import mongoose from "mongoose";
import TEXT_DEFINE from "../constant/textDefine";

const AuthSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    role: {
        type: String
    },
    permission: {
        type: [String]
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

const AuthModel = mongoose.model(TEXT_DEFINE.SCHEMA.auth, AuthSchema);

export default AuthModel;