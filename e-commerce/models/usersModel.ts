import { Schema, model } from 'mongoose';
import { Users } from '../interfaces/users';
import bcrypt from 'bcryptjs';

const usersSchema: Schema = new Schema<Users>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['manager', 'admin', 'user'], default: 'user' },
    image: String,
    active: { type: Boolean, default: true },
    phone: { type: String },
    wishlist: [{ type: Schema.Types.ObjectId, ref: 'products' }],
    address: [
      {
        street: String,
        city: String,
        state: String,
        postalCode: String,
      },
    ],
    resetCode: String,
    passwordChangedAt: Date,
    resetCodeExpireTime: Date,
    resetCodeVerify: Boolean,
  },
  { timestamps: true }
);

usersSchema.pre<Users>('save', async function (next) {
  if (!this.isModified('password')) next();
  this.password = await bcrypt.hash(this.password, 13);
  next();
});

export default model<Users>('users', usersSchema);
