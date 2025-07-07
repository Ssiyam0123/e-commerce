import { connectMongo } from "@/lib/connectdb";
import { Product } from "@/models/Product";

export async function DELETE(req, { params }) {
  try {
    await connectMongo();

    const { id } = await params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting product:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    await connectMongo();

    const { id } =await params;

    const product = await Product.findById(id);

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    return Response.json(product, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching product:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}