import veg1 from "../../Assets/veg1.png";
import veg2 from "../../Assets/veg2.png";
import toy from "../../Assets/toy1.png";
import yougurt from "../../Assets/best-seller-icecream.png";
import lays from "../../Assets/lays.png";
import sun from "../../Assets/suns.png";
import gatorade from "../../Assets/gatorade.png";

const featureLeft = [
  {
    id: 1,
    image: veg1,
    category: "Vegetables",
    priceMin: "₱49.00",
    priceMax: "₱70.00",
    discount: -23,
    description: "Whole Foods Market, Organic Trimmed Green Beans, 12 oz",
    rating: 1,
  },
  {
    id: 2,
    image: veg2,
    category: "Vegetables",
    priceMin: "₱65.00",
    priceMax: "₱95.00",
    discount: -12,
    description: "Whole Foods Market, Roamine Hearts Salad Bag Organic",
    rating: 3,
  },
  {
    id: 3,
    image: toy,
    category: "Toys",
    priceMin: "₱199.00",
    discount: -50,
    description:
      "Baby Learning Toys Puppy's Music Player with Lights & Fine Motor Activities for Ages 6+ Months, Blue",
    rating: 4,
  },
];

const featureCenter = [
  {
    image: yougurt,
    category: "Desserts",
    flavor: "chocolate",
    priceDiscount: "₱210.00",
    priceOrig: "₱313.43",
    discount: -33,
    description:
      "The Greek Gods Probiotic Plain Traditional Greek Yogurt, 32 oz",
    rating: 3,
  },
];

const featureRight = [
  {
    id: 1,
    image: lays,
    category: "Beverage",
    priceMin: "₱12.00",
    priceMax: "₱20.00",
    discount: -23,
    description: "Delicious Lay's Potato Chips, Classic, 8 oz Bag",
    rating: 5,
  },
  {
    id: 2,
    image: sun,
    category: "Beverage",
    priceMin: "₱55.00",
    priceMax: "₱75.00",
    discount: -12,
    description:
      "SunChips Minis, Garden Salsa Flavored Canister, Multigrain Chips, 3.75 oz Canister",
    rating: 4,
  },
  {
    id: 3,
    image: gatorade,
    category: "Beverage",
    priceMin: "₱35.00",
    priceMax: "99.00",
    discount: -5,
    description:
      "Gatorade G Zero Sugar Thirst Quencher Sports Drink, Variety Pack, 12 fl oz, 18 Pack Bottles",
    rating: 5,
  },
];

export { featureLeft, featureCenter, featureRight };
