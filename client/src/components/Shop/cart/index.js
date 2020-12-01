const cartWithoutItem = (cart, item) =>
  cart.filter(cartItem => cartItem._id !== item._id);

const itemInCart = (cart, item) =>
  cart.filter(cartItem => cartItem._id === item._id)[0];

export const addToCart = (cart, item) => {
  let cartItem = itemInCart(cart, item);
  return cartItem === undefined
    ? [...cartWithoutItem(cart, item), { ...item, count: 1 }]
    : [
        ...cartWithoutItem(cart, item),
        {
          ...cartItem,
          count: cartItem.count + 1,
          total: (cartItem.count + 1) * cartItem.price
        }
      ];
};
export const removeFromCart = (cart, item) => {
  return item.count === 1
    ? [...cartWithoutItem(cart, item)]
    : [
        ...cartWithoutItem(cart, item),
        { ...item, count: item.count - 1, total: (item.count - 1) * item.price }
      ];
};
export const removeAll = (cart, item) => {
  return [...cartWithoutItem(cart, item)];
};
