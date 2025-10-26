import type { Product } from "../../types/Product";
import { Icon } from "../Icons/Icon";

export const ProductCard = ({
  title,
  vendor,
  tags,
  url,
  image_src,
  option_value,
  price,
  subscription_discount,
  subscription,
  published
}: Product) => {
  return (
    <div>
      <div className="flex">
        <img className="rounded-xl relative" src={image_src} alt={title} />
        <div className="flex space-x-2 mt-4 ml-4 absolute">
          {tags && tags.length > 0 && tags.map((tag) => <Icon key={tag} name={tag} />)}
        </div>
      </div>

      <div className="my-4">
        <h2 className="font-semibold text-blue-900">{title}</h2>
         <p className="text-xs text-blue-900">{option_value}</p>
        <div className="flex flex-row mt-4">
          <a
            className="border-radius-sm p-2 border border-blue-900 inline-block rounded-3xl hover:cursor-pointer text-blue-900 text-xs"
            href={url}
          >
            View Product
          </a>
          <a className="border-radius-sm p-2 ml-2 border bg-blue-900 inline-block rounded-3xl hover:cursor-pointer text-white text-xs">
            Add to cart: ${price.toFixed(2)}
          </a>
        </div>
         {published === true  && <p className="text-xs text-blue-900 p-2 ">In stock and ready to deliver by {vendor} </p>}
        {subscription && (
          <p className="text-xs text-blue-900 px-2 py-4">Subscribe and save: ${typeof subscription_discount === 'number' ? subscription_discount.toFixed(2) : subscription_discount}</p>
        )}
       
      </div>
    </div>
  );
};
