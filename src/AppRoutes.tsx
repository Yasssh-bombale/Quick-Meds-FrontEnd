import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import MedicalStorePage from "./pages/MedicalStorePage";
import ServicesPage from "./pages/ServicesPage";
import { Toaster } from "sonner";
import ProtectedRoute from "./pages/ProtectedRoute";
import CreateStorePage from "./pages/CreateStorePage";
import FormPagesLayout from "./layout/FormPagesLayout";
import StoreDetailsPage from "./pages/StoreDetailsPage";
import ManageStorePage from "./pages/ManageStorePage";
import OrdersPage from "./pages/OrdersPage";
import ManageStoreRoute from "./components/ManageStoreRoute";
import OwnerConversations from "./pages/OwnerConversation";
import CheckoutPage from "./pages/CheckoutPage";
import ScrollToTop from "./components/ScrollToTop";
import UpdateStorePage from "./pages/UpdateStorePage";
import AdminRoute from "./pages/AdminRoute";
import ApplicationsPage from "./pages/ApplicationsPage";
import ApplicationDetailsPage from "./pages/ApplicationDetailsPage";
import Test from "./pages/Test";
import LandingPage from "./pages/LandingPage";

const AppRoutes = () => {
  // const { setSocketId } = useAppContext();
  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("connected", socket.id);
  //     setSocketId(socket.id!);
  //   });
  // }, []);

  return (
    <Router>
      <ScrollToTop />
      <Toaster visibleToasts={1} position="top-center" richColors />
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/home"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />

        {/* AuthRoutes */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />

        {/* Dynamic routes */}
        <Route
          path="/medicalstores/:id"
          element={
            <Layout>
              <StoreDetailsPage />
            </Layout>
          }
        />

        <Route path="/test" element={<Test />} />

        {/* NavBar links page routes */}
        <Route
          path="/explore"
          element={
            <Layout noPading>
              <MedicalStorePage />
            </Layout>
          }
        />
        <Route
          path="/services"
          element={
            <Layout>
              <ServicesPage />
            </Layout>
          }
        />
        {/* admin routes */}
        <Route element={<AdminRoute />}>
          <Route
            path="/applications"
            element={
              <Layout>
                <ApplicationsPage />
              </Layout>
            }
          />
        </Route>
        <Route element={<AdminRoute />}>
          <Route
            path="/applications/:storeId"
            element={
              <Layout>
                <ApplicationDetailsPage />
              </Layout>
            }
          />
        </Route>

        {/* Protected Routes */}

        <Route element={<ProtectedRoute />}>
          {/* create-store page */}
          <Route
            path="/create-store"
            element={
              <FormPagesLayout heading="Create store">
                <CreateStorePage />
              </FormPagesLayout>
            }
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          {/* create-store page */}
          <Route
            path="/manage-store"
            element={
              <FormPagesLayout heading="Manage store">
                <UpdateStorePage />
              </FormPagesLayout>
            }
          />
        </Route>

        {/* checkout page */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/checkout/:storeId/:conversationId"
            element={<CheckoutPage />}
          />
        </Route>
        {/* conversation route */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/conversations"
            element={
              <Layout>
                <OwnerConversations />
              </Layout>
            }
          />
        </Route>

        <Route element={<ProtectedRoute />}>
          {/* ManageStorePage */}
          {/* <Route path="/manage-store" element={<ManageStorePage />} /> */}

          {/* testing */}
          <Route element={<ManageStoreRoute />}>
            <Route path="/manage-store" element={<ManageStorePage />} />
          </Route>
          {/* testing^^ */}
        </Route>
        <Route element={<ProtectedRoute />}>
          {/* orders page */}
          <Route
            path="/orders"
            element={
              <Layout>
                <OrdersPage />
              </Layout>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
