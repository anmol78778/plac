// import {
//   SignedIn,
//   SignedOut,
//   SignUpButton,
//   UserButton,
//   useAuth
// } from "@clerk/react";

import { useAuth } from "@clerk/clerk-react";


import PageLoader from "./components/PageLoader";
import Layout from "./components/Layout";
import { Route, Routes ,Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import CheckoutReturnPage from "./pages/CheckoutReturnPage";
import ProductDetailPage from "./pages/ProductDetailPage";
// import SentryDemoPage from "./pages/SentryDemoPage";
import OrderDetailPage from "./pages/OrderDetailPage";
import OrderSummaryPage from "./pages/OrderSummaryPage";
import OrderChatPage from "./pages/OrderChatPage";

export default function App() {
  const { isLoaded,isSignedIn } = useAuth();

  if (!isLoaded) return <PageLoader />;

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/product/:slug" element={<ProductDetailPage/>}/>
        <Route path="/orders" element={isSignedIn ? <OrdersPage/> : <Navigate to={"/"}  replace/>}/>
        <Route path="/checkout/return" element={<CheckoutReturnPage/>}/>

        {/* <Route path="/demo-sentry" element={<SentryDemoPage />} /> */}

        <Route path="/orders/:id" element={<OrderDetailPage />}>
          <Route index element={<OrderSummaryPage />} />
          <Route path="chat" element={<OrderChatPage />} />
        </Route>

      </Routes>
    </Layout>
  );
}




// import { Show, SignInButton, SignUpButton, useAuth, UserButton } from "@clerk/react";
// import PageLoader from "./components/PageLoader";
// import Layout from "./components/Layout";


// export default function App() {
//    const { isLoaded } = useAuth();

//    if (!isLoaded) return <PageLoader />;
//   return (
//     <Layout>
//      <header>
//        <Show when="signed-in"> 
//          <SignInButton mode="modal"/>
//           <SignUpButton mode="modal"/>
//        </Show>
//        <Show>
//         <UserButton/>
//        </Show>
//      </header>
//     </Layout>
  
//   );
// }

// // export default App;