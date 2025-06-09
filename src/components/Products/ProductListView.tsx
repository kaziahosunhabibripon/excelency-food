import Image from "next/image";
import Link from "next/link";
import { Check, Star } from "react-feather";

type Product = {
  id: number;
  title: string;
  price: number;
  status?: string;
  currency: string;
  features: string[];
  image: string;
};

type ProductCardProps = {
  product: Product;
};

export default function ProductListView({ product }: ProductCardProps) {
  return (
    <div className="flex flex-col md:flex-row border border-gray-200 rounded-md p-4 w-full bg-white space-y-4 md:space-y-0 md:space-x-4 hover:scale-103 transition-all ease-in-out duration-500  hover:shadow-emerald-300 mx-auto text-center">
      <Link
        href={`/product/${product?.id}`}
        className="flex justify-center md:justify-start"
      >
        <div className="w-full h-48 md:w-40 md:h-40 relative">
          <Image
            src={product?.image || "/placeholder.svg"}
            alt={product?.title}
            fill
            className="object-cover border-r border-gray-400 pr-4"
          />
        </div>
      </Link>
      <div className="flex flex-col justify-between md:justify-center flex-grow">
        <Link href={`/product/${product?.id}`}>
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              {product?.title}
            </h2>

            <div className="mt-2 flex flex-wrap gap-2">
              {product?.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center text-sm text-gray-500 gap-1"
                >
                  <Check className="h-4 w-4 text-brand" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex mt-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-brand mr-1" />
              ))}
            </div>

            <p className="mt-2 text-base text-black font-bold">
              Start from {product?.currency} {product?.price}
            </p>
          </div>
        </Link>
      </div>
      <div className="mt-4 md:mt-0 md:ml-auto flex justify-center items-center ">
        <Link href={`/product/${product?.id}`}>
          <button
            role="button"
            tabIndex={0}
            className="cursor-pointer w-full md:w-auto px-6 py-2 border font-bold border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors"
          >
            BUY NOW
          </button>
        </Link>
      </div>
    </div>
  );
}
