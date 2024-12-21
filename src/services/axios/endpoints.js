import { addToWishlist } from "./actions/WishlistAction";

export const API_ENDPOINTS = {

    login: "/user/login",
    register: "/user/register",
    logout:"/user/logout",

    products: '/product',
    category: "/category",
    search:  '/product/search',
    addCart: "/cart/add",
    wishlish: "/wishlist",
    addToWishlist: "/wishlist/add-to-wishlist/",
    deleteWishlist: "/wishlist/remove-from-wishlist/",

    // userCart: "/carts/",
}