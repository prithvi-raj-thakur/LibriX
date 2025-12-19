import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const sellerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    shopName: { type: String, required: true },

    phone: {
      type: String,
      required: true,
      unique: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    shopAddress: { type: String, required: true },

    gstNumber: {
      type: String,
      default: null
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false
    },

    refreshToken: {
      type: String,
      select: false
    }
  },
  { timestamps: true }
);

/* 🔐 HASH PASSWORD BEFORE SAVE */
sellerSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});



/* 🔑 PASSWORD COMPARE METHOD */
sellerSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("Seller", sellerSchema);
