import { useAuth, useUser, SignInButton, UserButton } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { apiFetch } from "../lib/api";
import { Link } from "react-router";

import {
  LogInIcon,
  PackageIcon,
  SettingsIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  StoreIcon,
} from "lucide-react";
import { useCart } from "../store/cart";

const Navbar = () => {
  const { getToken } = useAuth();
  const { isSignedIn } = useUser();

  const { data: meData } = useQuery({
    queryKey: ["me"],
    queryFn: () => apiFetch("/api/me", { getToken }),
    enabled: isSignedIn,
  });

  const role = meData?.user?.role;

  const cartCount = useCart(
    (s) => s.items.reduce((n, line) => n + line.quantity, 0)
  );

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/95 shadow-sm backdrop-blur-md">
      <div className="navbar mx-auto min-h-14 max-w-7xl px-4 py-2.5 md:px-6 md:py-3">

        {/* LEFT */}
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost gap-2 px-2 font-mono text-lg font-semibold uppercase tracking-wide md:text-xl">
            <StoreIcon className="size-8" />
            Northwind
          </Link>
        </div>

        {/* RIGHT */}
        <nav className="flex items-center gap-1 md:gap-1.5">

          <Link to="/" className="btn btn-ghost gap-2 font-medium">
            <ShoppingBagIcon className="size-6" />
            Shop
          </Link>

          {/* SIGNED IN */}
          {isSignedIn && (
            <>
              <Link to="/orders" className="btn btn-ghost gap-2 font-medium">
                <PackageIcon className="size-6" />
                Orders
              </Link>

              {role === "admin" && (
                <Link to="/admin" className="btn btn-ghost gap-2 font-medium text-secondary">
                  <SettingsIcon className="size-6" />
                  Admin
                </Link>
              )}
            </>
          )}

          {/* CART */}
          <Link to="/cart" className="btn btn-ghost gap-2 font-medium indicator">
            {cartCount > 0 && (
              <span className="indicator-item badge badge-sm badge-primary">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
            <ShoppingCartIcon className="size-6" />
            Cart
          </Link>

          {/* SIGNED OUT */}
          {!isSignedIn && (
            <SignInButton mode="modal">
              <button type="button" className="btn btn-primary btn-sm gap-1.5 px-3 shadow-md">
                <LogInIcon className="size-4" />
                Sign in
              </button>
            </SignInButton>
          )}

          {/* USER */}
          {isSignedIn && (
            <div className="flex items-center gap-2 border-l border-base-300 pl-3">
              <UserButton />
              {(role === "admin" || role === "support") && (
                <span className="badge badge-primary badge-sm capitalize">
                  {role}
                </span>
              )}
            </div>
          )}

        </nav>
      </div>
    </header>
  );
};

export default Navbar;