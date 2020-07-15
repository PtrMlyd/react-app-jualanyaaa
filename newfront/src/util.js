export default function formatCurrency(num) {
    return  "IDR " + Number(num.toFixed(1)).toLocaleString() + " "; 
  }