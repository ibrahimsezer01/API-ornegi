const Product = require("../models/product")

const populate = async () => {
    try {
        const products = await Product.create({
            name: "Mutfak Takimi",
            price: 55799,
            description: "Mutfağinizi baştan aşşağa eksiksiz bir şekilde satin alabilirsiniz",
            image: "1.jpg",
            isActive: true
        })

        console.log(products);

    } catch (error) {
        console.log(error);
    }
}

module.exports = populate