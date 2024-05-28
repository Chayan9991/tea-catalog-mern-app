
 export function Products(){

  const productCategory = [
    {
      id: 1,
      name: "Green Tea",
      image: "images/product-1.jpg",
      description:
        "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum",
    },
    {
      id: 2,
      name: "Black Tea",
      image: "images/product-2.jpg",
      description:
        "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum",
    },
    {
      id: 3,
      name: "Spiced Tea",
      image: "images/product-3.jpg",
      description:
        "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum",
    },
    {
      id: 4,
      name: "Organic Tea",
      image: "images/product-4.jpg",
      description:
        "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum",
    },
    {
      id: 5,
      name: "Herbal Tea",
      image: "images/about-1.jpg",
      description:
        "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum",
    },
    {
      id: 6,
      name: "Fruit Tea",
      image: "images/about-2.jpg",
      description:
        "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum",
    },
    {
      id: 7,
      name: "Chai Tea",
      image: "images/about-3.jpg",
      description:
        "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum",
    },
    {
      id: 8,
      name: "Matcha Tea",
      image: "images/about-4.jpg",
      description:
        "Diam dolor diam ipsum sit diam amet diam et eos. Clita erat ipsum",
    },
  ];


  const  topSellingProduct = [
    {
      id: 1,
      name: "Nature close tea",
      image: "images/store-product-1.jpg",
      description:
        "Aliqu diam amet diam et eos. Clita erat ipsum lorem erat ipsum lorem sit sed",
      price: "$19.00",
    },
    {
      id: 2,
      name: "Green tea tulsi",
      image: "images/store-product-2.jpg",
      description:
        "Aliqu diam amet diam et eos. Clita erat ipsum lorem erat ipsum lorem sit sed",
      price: "$19.00",
    },
    {
      id: 3,
      name: "Instant tea premix",
      image: "images/store-product-3.jpg",
      description:
        "Aliqu diam amet diam et eos. Clita erat ipsum lorem erat ipsum lorem sit sed",
      price: "$19.00",
    },
  ];

  const allProductData = [
    {
      id: 1,
      categoryId:7,
      stockStatus:true,
      image: "images/product-1.jpg",
      title: "Red Tea",
      description: "Description for item 1",
      price: 10,
      bestSelling: true,
    },
    {
      id: 2,
      categoryId:6,
      stockStatus:true,
      image: "images/product-2.jpg",
      title: "Green Tea",
      description: "Description for item 2",
      price: 20,
      bestSelling: false,
    },
    {
      id: 3,
      categoryId:5,
      stockStatus:true,
      image: "images/product-3.jpg",
      title: "Item 3",
      description: "Description for item 3",
      price: 15,
      bestSelling: true,
    },
    {
      id: 4,
      categoryId:5,
      stockStatus:true,
      image: "images/product-4.jpg",
      title: "Item 4",
      description: "Description for item 4",
      price: 30,
      bestSelling: false,
    },
    {
      id: 5,
      categoryId:4,
      stockStatus:false,
      image: "images/about-1.jpg",
      title: "Item 5",
      description: "Description for item 5",
      price: 5,
      bestSelling: true,
    },
    {
      id: 6,
      categoryId:3,
      stockStatus:true,
      image: "images/about-2.jpg",
      title: "Item 6",
      description: "Description for item 6",
      price: 25,
      bestSelling: false,
    },
    {
      id: 7,
      categoryId:1,
      stockStatus:true,
      image: "images/about-3.jpg",
      title: "Item 7",
      description: "Description for item 7",
      price: 50,
      bestSelling: true,
    },
    {
      id: 8,
      categoryId:2,
      stockStatus:true,
      image: "images/about-4.jpg",
      title: "Item 8",
      description: "Description for item 8",
      price: 35,
      bestSelling: false,
    },
    {
      id: 9,
      categoryId:2,
      stockStatus:true,
      image: "images/about-5.jpg",
      title: "Item 9",
      description: "Description for item 9",
      price: 45,
      bestSelling: true,
    },
    {
      id: 10,
      image: "images/about-6.jpg",
      title: "Item 10",
      description: "Description for item 10",
      price: 40,
      bestSelling: false,
    },
  ];

  return { productCategory, topSellingProduct, allProductData };
}


