export const calculateCartTotals = (cartItems,quantities)=>{
    const subTotal = cartItems.reduce((acc,item) => acc+item.price*quantities[item.id]
    ,0);
    const shiping = cartItems.length > 0 ? 60 : 0;
    const tax = parseFloat((subTotal *0.1).toFixed(2));
    const total = subTotal + shiping + tax;

    return {subTotal,shiping,tax,total};
    }