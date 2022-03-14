import { fetchProductDetail } from '../api/api.js';

function ProductDetailPage({ $app, productId }) {
  this.state = {
    productId,
    initState: null,
    totalPrice: 0,
  };
  const $target = document.createElement('div');
  $target.className = 'ProductDetailPage';

  this.setState = (nextState) => {
    this.state = nextState;
    console.log(this.state);
    this.render();
  };

  const init = async () => {
    const productDetail = await fetchProductDetail(this.state.productId);
    this.setState({
      ...this.state,
      initState: {
        productDetail,
        selectedOptions: [],
        totalPrice: 0,
      },
    });
  };

  const handleSelectOption = (e) => {
    const optionId = e.target.value;
    if (optionId === 'default') return;
    const productOptions = this.state.initState.productDetail.productOptions;
    const selectedOption = productOptions.filter((option) => {
      if (optionId === option.optionId) {
        return option;
      }
    });
    console.log(this.state.initState.totalPrice);
    console.log(selectedOption);
    this.setState({
      ...this.state,
      initState: {
        ...this.state.initState,
        selectedOptions: [
          ...this.state.initState.selectedOptions,
          selectedOption,
        ],
        totalPrice: this.state.initState.totalPrice + selectedOption.price,
      },
    });
    addSelectedOptions();
  };

  const addSelectedOptions = () => {
    //const totalPrice = initState.selecteOptions ? initState.selecteOptions.reduce((prev,curr)=> prev+curr) : 0
    const initState = this.state.initState;
    const selectedOptions = initState.selectedOptions;
    const selectedOptionsTemplate = `
     <h3>선택된 상품</h3>
        <ul>
        ${selectedOptions.map((option) => {
          `<li>
          ${initState.name} ${option.name} ${option.price}원 
          <div>
            <input type="number" value="1">개
          </div>
        </li>`;
        })}
        </ul> 
        <div class="ProductDetail__totalPrice">${initState.totalPrice.toLocaleString()}원</div>
        <button class="OrderButton">주문하기</button>
    `;
    const $selectOptions = document.querySelector(
      '.ProductDetail__selectedOptions'
    );
    $selectOptions.innerHTML = selectedOptionsTemplate;
  };

  this.render = () => {
    const initState = this.state.initState;
    console.log(initState);
    $app.innerHTML = '<div>...Loading</div>';
    if (!initState) return;

    $app.innerHTML = '';
    $app.appendChild($target);
    const $title = document.createElement('h1');
    $title.innerText = '커피잔 상품 정보';
    const optionTemplate = initState.productDetail.productOptions
      .map(
        (option) => `
      <option value="${option.id}" ${!option.stock ? 'disabled' : ''}>
      ${!option.stock ? '(품절)' : ''} ${initState.productDetail.name} ${
          option.name
        }
      </option>`
      )
      .join('');

    $target.innerHTML = `
        <div class="ProductDetail">
          <img src="${initState.productDetail.imageUrl}">
            <div class="ProductDetail__info">
                <h2>${initState.productDetail.name}</h2>
                <div class="ProductDetail__price">${initState.productDetail.price.toLocaleString()}원~</div>
                <select>
                  <option value="default">선택하세요...</option>${optionTemplate}</select>
                <div class="ProductDetail__selectedOptions">
                </div>
            </div>
        </div>
        `;

    const $productDetail = document.querySelector('.ProductDetail');
    $productDetail.addEventListener('change', handleSelectOption);
  };

  init();
  this.render();
}

export default ProductDetailPage;
