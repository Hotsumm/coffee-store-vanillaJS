const BASE_URL =
  'https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev/products';

export const fetchProductList = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) {
      throw new Error('상품 목록을 가져오는데 실패하였습니다.');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchProductDetail = async (productId) => {
  try {
    const res = await fetch(`${BASE_URL}/${productId}`);
    if (!res.ok) {
      throw new Error('상품 상세목록을 가져오는데 실패하였습니다.');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
