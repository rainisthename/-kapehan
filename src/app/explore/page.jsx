"use client"; // Keep this if you need client-side interactivity
import FilterBar from "../components/FilterBar";
import CoffeeCard from "../components/CoffeeCard";
import coffeeShop from "../../../public/images/coffeeshop.jpg";
import Link from "next/link"; // Import Link

export default function Explore() {
  const cards = [
    {
      id: 1,
      title: "Dream Coffee Shop",
      image: coffeeShop,
      rating: 4.5,
      address: "Pinagsama Village EP Housing 2",
      city: "Taguig",
    },
    {
      id: 2,
      title: "Malikhain Coffee Shop",
      image: coffeeShop,
      rating: 4.7,
      address: "Pinagsama Village EP Housing 2",
      city: "Makati",
    },
    {
      id: 3,
      title: "Rooftop Coffee Shop",
      image: coffeeShop,
      rating: 4.3,
      address: "Pinagsama Village EP Housing 2",
      city: "San Juan",
    },
    {
      id: 4,
      title: "Central Perk",
      image: coffeeShop,
      rating: 4.9,
      address: "Poblacion, Makati",
      city: "Makati",
    },
    {
      id: 5,
      title: "Café de Luna",
      image: coffeeShop,
      rating: 4.2,
      address: "Fort Bonifacio Global City",
      city: "Taguig",
    },
    {
      id: 6,
      title: "Java Dreams",
      image: coffeeShop,
      rating: 4.8,
      address: "Makati Avenue",
      city: "Makati",
    },
    {
      id: 7,
      title: "Sunset Brew",
      image: coffeeShop,
      rating: 4.6,
      address: "SM Mall of Asia",
      city: "Pasay",
    },
    {
      id: 8,
      title: "Green Beans Café",
      image: coffeeShop,
      rating: 4.4,
      address: "Quezon Memorial Circle",
      city: "Quezon City",
    },
    {
      id: 9,
      title: "Brewed Awakening",
      image: coffeeShop,
      rating: 4.1,
      address: "Eastwood City",
      city: "Quezon City",
    },
    {
      id: 10,
      title: "The Daily Grind",
      image: coffeeShop,
      rating: 4.7,
      address: "Taguig City",
      city: "Taguig",
    },
    {
      id: 11,
      title: "Café Aroma",
      image: coffeeShop,
      rating: 4.5,
      address: "Rizal Street",
      city: "Makati",
    },
    {
      id: 12,
      title: "Brew Lab",
      image: coffeeShop,
      rating: 4.3,
      address: "Pioneer Street",
      city: "Mandaluyong",
    },
    {
      id: 13,
      title: "Bean Scene",
      image: coffeeShop,
      rating: 4.8,
      address: "Greenhills",
      city: "San Juan",
    },
    {
      id: 14,
      title: "Mug Life",
      image: coffeeShop,
      rating: 4.6,
      address: "Cubao",
      city: "Quezon City",
    },
    {
      id: 15,
      title: "Cafe Vintage",
      image: coffeeShop,
      rating: 4.4,
      address: "Makati Central",
      city: "Makati",
    },
    {
      id: 16,
      title: "Mocha Breeze",
      image: coffeeShop,
      rating: 4.2,
      address: "Mall of Asia",
      city: "Pasay",
    },
  ];

  return (
    <div className="min-h-screen mx-4 sm:mx-6 md:mx-[5%] flex flex-col md:flex-row pt-5">
      {/* Filter Bar */}
      <FilterBar className="w-full md:w-[20%] hidden lg:block" />

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
          {cards.map((card) => (
            <Link
              key={card.id}
              href={`/explore/${encodeURIComponent(
                card.title.replace(/ /g, "-").toLowerCase()
              )}`}
              passHref
            >
              <CoffeeCard card={card} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
