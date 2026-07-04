export const formatPrice = (price) => {
  if (price === 0) return 'Free';
  return `₹${Number(price).toLocaleString('en-IN')}`;
};
