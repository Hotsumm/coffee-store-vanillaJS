import ProductListPage from './components/ProductListPage.js';
import ProductDetailPage from './components/ProductDetailPage.js';
import { routeChangeCallback } from './router.js';

function App($app) {
  this.route = () => {
    window.addEventListener('popstate', this.route);
    console.log(location);
    const { pathname } = location;
    if (pathname === '/web/') {
      new ProductListPage({
        $app,
      });
    } else if (pathname.indexOf('/web/products/') !== -1) {
      const [, , , productId] = pathname.split('/');
      new ProductDetailPage({
        $app,
        productId,
      });
    } else if (pathname === '/web/cart/') {
    }
  };

  routeChangeCallback(this.route);

  this.route();
}

export default App;
