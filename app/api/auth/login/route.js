
import bcrypt from "bcryptjs"
import { connectMongo } from "@/lib/connectdb"
import { User } from "@/models/User"


export async function POST(req) {
  try {
    await connectMongo()

    const { email, password } = await req.json()

    // Validation
    if (!email || !password) {
      return Response.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Find user with password field
    const user = await User.findOne({ email }).select("+password")
    // console.log(user)
    if (!user) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Check if user is active
    if (!user.isActive) {
      return Response.json({ error: "Account is deactivated" }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Update last login
    user.lastLogin = new Date()
    await user.save()

    // Generate JWT token
   

    // Remove password from response
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    }

    return Response.json({
      success: true,
      user: userResponse,
      message: "Login successful",
    })
  } catch (error) {
    console.error("Login error:", error)
    return Response.json({ error: "Internal server error" }, { status: 500 })
  }
}
