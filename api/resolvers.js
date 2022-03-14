const products=[]
const resolvers = {
    Query: {
        getAllProducts() {
            return products
        }
    },

    Mutation: {
        addProduct(_, args) {
            const product = args
            product.id = products.length+1
            products.push(product)
            return product
        }
    }
}

module.exports={
    resolvers
}
