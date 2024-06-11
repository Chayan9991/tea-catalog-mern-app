export const currencyConversion=(amount, currency)=>{
    switch(currency){
      case "inr": return amount; 
      case "usd": return (amount * 0.012) 
      case "gbp": return (amount * 0.0094); 
      default: return amount;   
    }
}


export const getCurrencySymbol = (currency) => {
    switch (currency) {
      case 'inr':
        return '₹';
      case 'usd':
        return '$';
      case 'gbp':
        return '£';
      default:
        return '';
    }
  };