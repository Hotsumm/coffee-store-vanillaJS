import { fetchProductList } from '../api/api.js';
import { urlChange } from '../router.js';

function ProductListPage({ $app }) {
  this.state = { productList: null };
  const $target = document.createElement('div');
  $target.className = 'ProductListPage';
  $app.innerHTML = '';
  $app.appendChild($target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const init = async () => {
    const productList = await fetchProductList();
    this.setState({
      productList,
    });
  };

  const handleProductClick = (e) => {
    const $li = e.target.closest('li');
    const { productId } = $li.dataset;
    if (!productId) return;

    urlChange(`products/${productId}`);
  };

  this.render = () => {
    if (!this.state.productList) {
      $target.innerHTML = `<div>Loading...</div>`;
      return;
    }
    $target.innerHTML = '';
    const productTemplate = this.state.productList
      .map(
        (product) =>
          `<li class="Product" data-product-id=${product.id}>              
                    <img src=${product.imageUrl}>
                    <div class="Product__info">
                    <div>${product.name}</div>
                    <div>${product.price}~</div>
                    </div>
            </li>`
      )
      .join('');

    $target.innerHTML = `<h1>상품목록</h1><ul>${productTemplate}</ul>`;
    $target.addEventListener('click', handleProductClick);
  };

  init();
  this.render();
}

export default ProductListPage;
