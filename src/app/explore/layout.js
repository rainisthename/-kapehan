export const metadata = {
  title: "Explore - Kapehan",
  description: "Discover and explore exciting coffee shops near you. Read reviews, find locations, and enjoy a cup of coffee!",
  openGraph: {
    title: "Explore the Best Coffee Shops - Kapehan",
    description: "Find the best coffee shops with great reviews. Enjoy a cup of coffee at your favorite place!",
    keywords: "coffee shops in the metro manila, best coffee shops in metro manila, explore coffee shops in metro manila, coffee shop reviews in metro manila, find coffee shops near me in metro manila",
    url: "https://www.yourwebsite.com/explore",
    images: [
      {
        url: "https://www.yourwebsite.com/images/coffeeshop.jpg",
        width: 800,
        height: 600,
        alt: "Best Coffee Shops",
      },
    ],
    site_name: "Kapehan",
  },
};

  export default function ExploreLayout({ children }) {
    return (
      <div>
        {children}
      </div>
    );
  }
  