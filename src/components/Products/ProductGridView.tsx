import Image from "next/image";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
type Product = {
  id: number;
  title: string;
  status?: string;
  price: number;
  features: string[];
  currency: string;
  image: string;
};

type ProductCardProps = {
  product: Product;
  viewMode: "grid" | "list";
};

export default function ProductGridView({
  product,
  viewMode,
}: ProductCardProps) {
  return (
    <div
      className={`overflow-hidden bg-white hover:shadow-md ${
        viewMode === "list" ? "flex" : ""
      } hover:scale-103 transition-all ease-in-out duration-500   mx-auto text-center`}
    >
      <Link href={`/product/${product?.id}`}>
        <div className={`${viewMode === "list" ? "w-1/3" : "w-full"} `}>
          <div className="aspect-square relative ">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.title}
              fill
              className="object-contain p-4 border-r"
            />
          </div>
        </div>
        <div
          className={`p-4 flex flex-col ${viewMode === "list" ? "w-2/3" : ""}`}
        >
          <h3
            className="text-md font-medium mb-2 text-center"
            title={product?.title}
          >
            {product?.title && product.title.length > 20 ? ( // for title shortener and hover effect name
              <span className="inline-flex items-center">
                {product.title.slice(0, 20)}
                <BsThreeDots className="ml-1" />
              </span>
            ) : (
              product?.title
            )}
          </h3>

          <div className="mt-auto mx-auto">
            <p className="block mb-2 text-[1.2rem] font-semibold text-brand hover:text-blue-500">
              Start form {product.currency} {product.price}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
