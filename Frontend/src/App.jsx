// import {
//   SignedIn,
//   SignedOut,
//   SignUpButton,
//   UserButton,
//   useAuth
// } from "@clerk/react";

import {

  useAuth
} from "@clerk/react";


import PageLoader from "./components/PageLoader";
import Layout from "./components/Layout";

export default function App() {
  const { isLoaded } = useAuth();

  if (!isLoaded) return <PageLoader />;

  return (
    <Layout>
      <header>
        {/* <SignedOut>
          <SignInButton mode="modal" />
          <SignUpButton mode="modal" />
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn> */}
      </header>
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