import { connectMongo } from "@/lib/connectdb";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import { User } from "@/models/User";

export async function POST(request) {
  try {
    await connectMongo();

    const productData = await request.json();

    // Validation
    if (
      !productData.name ||
      !productData.price ||
      !productData.category ||
      !productData.seller
    ) {
      return Response.json(
        {
          error: "Name, price, category, and seller are required",
        },
        { status: 400 }
      );
    }

    // Verify category exists
    const category = await Category.findById(productData.category);
    if (!category) {
      return Response.json({ error: "Invalid category" }, { status: 400 });
    }

    // Verify seller exists
    const seller = await User.findById(productData.seller);
    if (!seller || seller.role !== "seller") {
      return Response.json({ error: "Invalid seller" }, { status: 400 });
    }

    // Create product
    const newProduct = await Product.create({
      ...productData,
      sku: productData.sku || `SKU-${Date.now()}`,
    });

    // Populate references for response
    await newProduct.populate("category", "name slug");
    await newProduct.populate("seller", "name sellerInfo.storeName");

    const formattedProduct = {
      id: newProduct._id,
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      originalPrice: newProduct.originalPrice,
      category: newProduct.category.name,
      categoryId: newProduct.category._id,
      images: newProduct.images,
      stock: newProduct.stock,
      sku: newProduct.sku,
      brand: newProduct.brand,
      tags: newProduct.tags,
      specifications: newProduct.specifications,
      features: newProduct.features,
      sellerId: newProduct.seller._id,
      sellerName:
        newProduct.seller.sellerInfo?.storeName || newProduct.seller.name,
      createdAt: newProduct.createdAt,
      updatedAt: newProduct.updatedAt,
    };

    return Response.json(
      {
        success: true,
        product: formattedProduct,
        message: "Product created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create product error:", error);

    // Handle mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return Response.json({ error: messages[0] }, { status: 400 });
    }

    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function GET(req) {
    try {
        await connectMongo()
        const product = await Product.find()
        return Response.json(product)
    } catch (error) {
        
    }
}