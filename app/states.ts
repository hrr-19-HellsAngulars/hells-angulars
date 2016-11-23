import { About }                 from "./components/about/about";
import { Google }                from "./components/google/google.component";
import { Home }                  from "./components/home/home";
import { Products }              from "./components/products/products";
import { ProductDetails }        from "./components/product-details/product-details";
import { ProductDetailsService } from "./components/product-details/product-details.service";
import { ProfileComponent }      from "./components/profile/profile.component";
import { Transition }            from "ui-router-ng2";

/** States */
export const googleState = {
  component: Google,
  name: "google",
  url: "/google",
};

export const homeState = {
  component: Home,
  name: "home",
  url: "/",
};

export const aboutState = {
  component: About,
  name: "about",
  url: "/about",
};

export const productsState = {
  component: Products,
  name: "products",
  url: "/products",
};

export const productDetailsState = {
  component: ProductDetails,
  name: "productDetails",
  url: "/product/:productId",
  resolve: [
    {
      token: "product",
      deps: [Transition, ProductDetailsService],
      resolveFn: (trans, productDetailsSvc) => productDetailsSvc.getProductDetails(trans.params().productId),
    },
  ],
};

export const profileState = {
  component: ProfileComponent,
  name: "profile",
  url: "/profile",
};

export const searchState = {
  component: Products,
  name: "products-search",
  url: "/products/search",
};
