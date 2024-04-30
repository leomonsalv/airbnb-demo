import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LargeCard from "@/components/LargeCard";
import MediumCard from "@/components/MediumCard";
import SmallCard from "@/components/SmallCard";
import Head from "next/head";

export default function Home({ exploreData, cardsData }) {
  return (
    <div>
      <Head>
        <title>PetCare V1</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>

          {/* pull some data from the server - API endpoints */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
          xl:grid-cols-4">
            {exploreData?.map(({ id, location, distance, img }) => (
                <SmallCard 
                  key={id}
                  location={location}
                  distance={distance}
                  img={img}
                />
              ))}
          </div>
        </section>

        <section>
            <h2 className="text-4xl font-semibold py-10">Live Anywhere</h2>
            
            <div className="flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3">
              {cardsData?.map(({id, img, title}) => (
                <MediumCard key={id} img={img} title={title} />
              ))}
            </div>
            
        </section>
        <LargeCard 
          img="https://links.papareact.com/4cj"
          title="The Greatest Outdoors"
          description="Wishlists curated by Airbnb."
          buttonText="Get Inspired"
        />
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  try {
    const response = await fetch("https://66302b28c92f351c03d92ea9.mockapi.io/homeCards"); // Replace with your endpoint
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    const exploreData = await response.json();

    const cardsResponse = await fetch("https://66302b28c92f351c03d92ea9.mockapi.io/mediumCard"); // Use await here
    if (!cardsResponse.ok) {
      throw new Error(`Failed to fetch cards data: ${cardsResponse.status}`);  // Add specific error handling
    }
    const cardsData = await cardsResponse.json();

    return {
      props: {
        exploreData,
        cardsData,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle the error gracefully (e.g., return default data)
    return { props: { exploreData: [], cardsData: [] } }; // Return empty arrays for rendering
  }
}
