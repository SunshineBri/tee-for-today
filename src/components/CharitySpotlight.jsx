import { useMemo, useRef, useEffect, useState } from "react";

const charities = [
  {
    name: "UNICEF",
    logo:
      "https://www.unicef.org/sites/default/files/styles/logo/public/English_9.png.webp?itok=KaPGNxiU",
    description:
      "UNICEF works in more than 190 countries and territories to protect the rights of every child. Today, a portion of your purchase supports their vital programs worldwide.",
    url: "https://www.unicef.org",
    bgColor: "bg-indigo-900/70",
    btnColor:
      "bg-indigo-500 hover:bg-indigo-600 focus-visible:outline-indigo-300",
    image:
      "https://www.unicef.org/indonesia/sites/unicef.org.indonesia/files/styles/hero_extended/public/After%20session%20photo%201.webp?itok=UoN75OSg",
  },
  {
    name: "Direct Relief",
    logo:
      "https://idf.org/media/uploads/2024/01/Direct-Relief-340px.png",
    description:
      "Direct Relief improves the health and lives of people affected by poverty and emergencies. Your support helps deliver critical medical aid worldwide.",
    url: "https://www.directrelief.org",
    bgColor: "bg-red-900/70",
    btnColor: "bg-red-500 hover:bg-red-600 focus-visible:outline-red-300",
    image:
      "https://i0.wp.com/www.directrelief.org/wp-content/uploads/2022/11/1981BF-H9-272-1-e1671223811363.webp?w=1018&ssl=1",
  },
  {
    name: "World Wildlife Fund",
    logo:
      "https://circularcomputing.com/wp-content/uploads/2024/06/wwf-logo.webp",
    description:
      "WWF works to conserve nature and reduce the most pressing threats to the diversity of life on Earth. Your purchase helps protect endangered species and habitats.",
    url: "https://www.worldwildlife.org",
    bgColor: "bg-green-900/70",
    btnColor: "bg-green-500 hover:bg-green-600 focus-visible:outline-green-300",
    image:
      "https://files.worldwildlife.org/wwfcmsprod/images/Pandas_204718/story_full_width/87o81dodvo_HI_204718.jpg",
  },
];

const getTodaysCharity = () => {
  const dayIndex = Math.floor(
    (new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86_400_000
  );
  return charities[dayIndex % charities.length];
};

export default function CharitySpotlight() {
  const charity = useMemo(getTodaysCharity, []);
  const spotRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = spotRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
    id="charity"
      ref={spotRef}
      className={`scroll-mt-20 mx-auto my-24 flex min-h-[80vh] items-center justify-center px-4 transition-opacity duration-700 ${
        visible ? "opacity-100 animate-fadeIn" : "opacity-0"
      }`}
    >
      <div className="relative w-full max-w-6xl rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-[3px] shadow-2xl backdrop-blur-md">
        <div
          className={`rounded-[inherit] ${charity.bgColor} px-8 py-14 text-white text-center sm:px-14 sm:py-18`}
        >
          <div className="mb-12 flex justify-center">
            <img
              src={charity.logo}
              alt={`${charity.name} logo`}
              className="h-20 w-auto object-contain drop-shadow-md"
            />
          </div>

          <div className="mx-auto flex max-w-5xl flex-col gap-10 sm:flex-row sm:items-center sm:text-left">
            <div className="sm:w-1/2 self-center">
              <h2 className="mb-4 text-3xl sm:text-4xl font-extrabold tracking-tight">
                {charity.name}
              </h2>
              <p className="text-lg leading-relaxed text-gray-200">
                {charity.description}
              </p>
            </div>

            <img
              src={charity.image}
              alt={`${charity.name} focus`}
              className="sm:w-1/2 max-h-72 w-full rounded-lg object-cover shadow-lg ring-1 ring-white/10"
            />
          </div>

          <div className="mt-12 flex justify-center">
            <a
              href={charity.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block rounded-lg px-8 py-3 text-base font-semibold text-white transition-all duration-300 ${charity.btnColor} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
