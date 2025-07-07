import { connectMongo } from "@/lib/connectdb";
import { User } from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectMongo();

    const { name, email, password } = await req.json();

    const user = await User.findOne({ email });

    if (user)
      return Response.json(
        { error: "User already exists with this email" },
        { status: 400 }
      );

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    const userResponse = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      avatar: newUser.avatar,
      isVerified: newUser.isVerified,
      createdAt: newUser.createdAt,
    };

    return Response.json(
      {
        success: true,
        user: userResponse,
        message: "Registration successful",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
