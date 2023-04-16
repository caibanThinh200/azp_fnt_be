import ENDPOINT from "../constant/urls";
import ProductRoute from "./product.route";
import AttributeRoute from "./attribute.route";
import ProductTypeRoute from "./product-type.route";
import CategoryTypeRoute from "./category.route";
import UploadRoute from "./upload.route";
import AuthRoute from "./auth.route";
import DiscountRoute from "./discount.route";
import OrderRoute from "./order.route";
import NewRoute from "./new.route";
import LayoutRoute from "./layout.route";

const indexRoute = (app) => {
  app.use(ENDPOINT.PRODUCT.base, ProductRoute);
  app.use(ENDPOINT.ATTRIBUTE.base, AttributeRoute);
  app.use(ENDPOINT.PRODUCT_TYPE.base, ProductTypeRoute);
  app.use(ENDPOINT.CATEGORY.base, CategoryTypeRoute);
  app.use(ENDPOINT.UPLOAD.base, UploadRoute);
  app.use(ENDPOINT.AUTH.base, AuthRoute);
  app.use(ENDPOINT.DISCOUNT.base, DiscountRoute);
  app.use(ENDPOINT.ORDER.base, OrderRoute);
  app.use(ENDPOINT.NEW.base, NewRoute);
  app.use(ENDPOINT.LAYOUT.base, LayoutRoute);
};

export default indexRoute;
