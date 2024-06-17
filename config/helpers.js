module.exports = () => {
    return {
        get_formatted_price: (price, options) => {
            return price.toLocaleString("pt-BR", {
                style: 'currency',
                currency: 'BRL'
            });
        }
    }
};