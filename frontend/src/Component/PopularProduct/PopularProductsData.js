import almond from "../Assets/almond.png";
import aptamilSlide from "../Assets/bs-slide4.png";
import goYogurt from "../Assets/go-yogurt.png";
import cashew from "../Assets/cashew.png";
import chocoYogurt from "../Assets/chocoolate-yogurt.png";
import suns from "../Assets/suns.png";
import lays from "../Assets/lays.png";
import greekYogurt from "../Assets/best-seller-icecream.png";
import aptamilFront from "../Assets/bs-slide1.png";
import veg1 from "../Assets/veg1.png";
import veg2 from "../Assets/veg2.png";
import veg3 from "../Assets/veges-r.png";
import avocado from "../Assets/avocado.png";
import avocado2 from "../Assets/avocado2.png";
import potato from "../Assets/basket-potato.png";
import berries from "../Assets/berries.png";
import watermelon from "../Assets/watermelon.png";
import papaya from "../Assets/papaya.png";

// dessert
export const dessert = [
  {
    category: "Desserts",
    image: almond,
    topOption: ["Sweet", "Bitter"],
    price: ["₱120.00", "₱150.00"],
    discountPrice: null,
    discount: -23,
    description:
      "The Greek Gods Probiotic Plain Traditional Greek Yogurt, 32 oz",
    rating: 3,
  },
  {
    category: "Desserts",
    image: goYogurt,
    topOption: ["375ml"],
    price: "₱99.00",
    discountPrice: "₱299.00",
    // discount: -34,
    description: "Healthy Nuts Great Value Cashew Halves & Pieces",
    rating: 2,
  },
  {
    category: "Desserts",
    image: cashew,
    topOption: ["Sweet"],
    price: "₱59.00",
    discountPrice: "₱109.00",
    discount: -50,
    description: "Healthy Nuts Great Value Cashew Halves & Pieces",
    rating: 3,
  },
  {
    category: "Desserts",
    image: aptamilSlide,
    topOption: ["250ml", "500ml"],
    price: ["₱699.00", "₱799.00"],
    discountPrice: null,
    discount: -15,
    description: "Healthy Nuts Great Value Cashew Halves & Pieces",
    rating: 3,
  },
  {
    category: "Desserts",
    image: chocoYogurt,
    topOption: ["Sweet"],
    price: "₱590.00",
    discountPrice: "₱890.00",
    discount: -20,
    description:
      "Oui by Yoplait Mocha & Chocolate Whole Milk Yogurt, French Style Yogurt Snack, 5 OZ Glass Yogurt Jar",
    rating: 5,
  },
  {
    category: "Desserts",
    image: greekYogurt,
    topOption: ["Chocolate"],
    price: "₱290.00",
    discountPrice: "₱590.00",
    discount: -65,
    description:
      "Oui by Yoplait Mocha & Chocolate Whole Milk Yogurt, French Style Yogurt Snack, 5 OZ Glass Yogurt Jar",
    rating: 5,
  },
  {
    category: "Desserts",
    image: suns,
    topOption: ["50g", "120g"],
    price: "₱12.00",
    discountPrice: "₱20.00",
    discount: -23,
    description:
      "SunChips Minis, Garden Salsa Flavored Canister, Multigrain Chips, 3.75 oz Canister",
    rating: 4,
  },
  {
    category: "Desserts",
    image: lays,
    topOption: ["50g", "120g"],
    price: "₱90.00",
    discountPrice: "₱190.00",
    discount: -15,
    description: "Delicious Lay's Potato Chips, Classic, 8 oz Bag",
    rating: 4,
  },
];

// Vegetables
export const vegetables = [
  {
    category: "Vegetables",
    image: veg1,
    topOption: ["100mg"],
    price: "₱120.00",
    discountPrice: "₱200.00",
    discount: -30,
    description: "Whole Foods Market, Romaine Hearts Salad Bag Organic",
    rating: 3,
  },
  {
    category: "Vegetables",
    image: veg3,
    topOption: ["1kg"],
    price: "₱500.00",
    discountPrice: "₱800.00",
    discount: -25,
    description: "Whole Foods Market, Romaine Hearts Salad Bag Organic",
    rating: 5,
  },
  {
    category: "Vegetables",
    image: veg2,
    topOption: ["150mg"],
    price: "₱150.00",
    discountPrice: "₱200.00",
    discount: -15,
    description: "Whole Foods Market, Romaine Hearts Salad Bag Organic",
    rating: 5,
  },
  {
    category: "Vegetables",
    image: aptamilFront,
    topOption: ["150mg"],
    price: "₱600.00",
    discountPrice: "₱900.00",
    discount: -15,
    description: "Aptamil Gold+ ProNutra Biotik Stage 1 Infant Formula 31.7",
    rating: 5,
  },
  {
    category: "Vegetables",
    image: almond,
    topOption: ["50mg"],
    price: "₱199.00",
    discountPrice: "₱250.00",
    discount: -10,
    description:
      "Sahale Snacks Maple Pecans Glazed Mix, Gluten-Free Snack, 4-Ounce Bag",
    rating: 5,
  },
  {
    category: "Vegetables",
    image: lays,
    topOption: ["10mg"],
    price: "₱99.00",
    discountPrice: "₱150.00",
    discount: -12,
    description:
      "SunChips Minis, Garden Salsa Flavored Canister, Multigrain Chips, 3.75 oz Canister",
    rating: 5,
  },
  {
    category: "Vegetables",
    image: papaya,
    topOption: ["120mg"],
    price: "90.00",
    discountPrice: "95.00",
    discount: -5,
    description: "Maxican Nature's Sweet Bounty Fresh Organic Giant Papaya",
    rating: 2,
  },
];

export const freshFruits = [
  {
    category: "Fresh Fruits",
    image: avocado,
    topOption: ["100mg"],
    price: "₱80.00",
    discountPrice: "₱100.00",
    discount: -12,
    description:
      "Avocado Creamy Elegance Pure, Fresh, and Irresistibly Delicious",
    rating: 5,
  },
  {
    category: "Fresh Fruits",
    image: watermelon,
    topOption: ["275mg"],
    price: "₱150.00",
    discountPrice: "₱180.00",
    discount: -10,
    description: "Fresh and Sweet Watermelon Delights for Your Taste Buds!",
    rating: 3,
  },
  {
    category: "Fresh Fruits",
    image: potato,
    topOption: ["375mg", "500mg"],
    price: ["₱200.00", "₱300.00"],
    discountPrice: null,
    discount: -22,
    description:
      "Russet Idaho Potatoes Fresh Premium Fruit and Produce Vegetables, 4 pound case",
    rating: 4,
  },
  {
    category: "Fresh Fruits",
    image: papaya,
    topOption: ["120mg"],
    price: "90.00",
    discountPrice: "95.00",
    discount: -5,
    description: "Maxican Nature's Sweet Bounty Fresh Organic Giant Papaya",
    rating: 2,
  },
  {
    category: "Fresh Fruits",
    image: avocado2,
    topOption: ["100mg"],
    price: "60.00",
    discountPrice: "90.00",
    discount: -25,
    description:
      "Avocado Creamy Elegance Pure, Fresh, and Irresistibly Delicious",
    rating: 3,
  },
  {
    category: "Fresh Fruits",
    image: berries,
    topOption: ["222g"],
    price: "120.00",
    discountPrice: "180.00",
    discount: -31,
    description:
      "Garden Fresh Juicy Grapes for a Burst of Sweetness in Every Bite",
    rating: 5,
  },
];
