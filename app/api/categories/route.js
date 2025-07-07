import { connectMongo } from "@/lib/connectdb";
import { Category } from "@/models/Category";

export async function POST(req) {
  try {
    await connectMongo();

    const { name, slug, description, image } = await req.json();

    // Basic input validation
    if (!name || !slug) {
      return Response.json(
        { error: "Name and slug are required." },
        { status: 400 }
      );
    }

    const existingCategory = await Category.findOne({ slug });

    if (existingCategory) {
      return Response.json(
        { error: "Category with this slug already exists." },
        { status: 400 }
      );
    }

    const category = await Category.create({
      name,
      slug,
      description,
      image,
    });

    return Response.json(category, { status: 201 });
  } catch (error) {
    console.error("❌ Category creation failed:", error);
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}


export async function GET(req) {
  try {
    await connectMongo();

    const categories = await Category.find().sort({ sortOrder: 1 });

    return Response.json(categories, { status: 200 });
  } catch (error) {
    console.error("❌ Failed to fetch categories:", error);
    return Response.json({ error: "Internal server error." }, { status: 500 });
  }
}
