import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { LayoutGrid, List, Filter } from "lucide-react";
import Header from "../Layout/header.jsx";

function Books() {
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState("grid");
  const [showFilter, setShowFilter] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState("");
  const [stickButtons, setStickButtons] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

  const filterSectionRef = useRef(null);

  const categories = [
    {
      id: uuidv4(),
      title: "Fiction",
      desc: "Explore imaginative narratives and stories.",
      img: "https://fivebooks.com/images/brjfwPAq69-IDEX2/plain/fb/2022/11/fiction-books-category-share-image.jpg",
      categorieNumber: 1,
    },
    {
      id: uuidv4(),
      title: "Brave",
      desc: "Exciting adventures and bold stories.",
      img: "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs3/383529886/original/f50501b38d0f444b321dd5487a02a66184f09305.png",
      categorieNumber: 2,
    },
    {
      id: uuidv4(),
      title: "Sikhism",
      desc: "A Journey of Faith, Courage, and Equality.",
      img: "https://cdn.sketchbubble.com/pub/media/catalog/product/optimized1/6/7/67a516d4c9ff802bfe8f83ce25167b6133878538464802294f4341989827780c/sikh-history-slide1.png",
      categorieNumber: 3,
    },
    {
      id: uuidv4(),
      title: "History",
      desc: "Connections between past events and contemporary society.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSylzvW1jxbfqNvrWC39FKsdue7ttaMhwjCkA&s",
      categorieNumber: 4,
    },
    {
      id: uuidv4(),
      title: "Animal Things",
      desc: "The rise and fall of a rebellion that mirrors human society.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYkHVGvQHNJe_3pCVW1_AMkwV9IIiC-3d2ACRxhCfR8iBXzkKk5LWbZP0BR_gskjbcrZs&usqp=CAU",
      categorieNumber: 5,
    },
    {
      id: uuidv4(),
      title: "Food Recipes",
      desc: "A variety of recipes for breakfast, lunch, dinner, and snacks.",
      img: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/fea9c0119666285.60a2b5b9ebea0.jpg",
      categorieNumber: 6,
    },
    {
      id: uuidv4(),
      title: "Philosophy",
      desc: "Deep thoughts and insights.",
      img: "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg",
      categorieNumber: 7,
    },
    {
      id: uuidv4(),
      title: "Business & Finance",
      desc: "Books on money and management.",
      img: "https://cdn.educba.com/academy/wp-content/uploads/2016/01/Business-and-Finance.jpg",
      categorieNumber: 8,
    },
  ];

  useEffect(() => setFilteredCategories(categories), []);

  useEffect(() => {
    const handleScroll = () => setStickButtons(window.scrollY > 150);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  useEffect(() => {
    let filtered = categories;
    if (selectedLetter)
      filtered = filtered.filter((cat) =>
        cat.title.toLowerCase().startsWith(selectedLetter.toLowerCase())
      );
    if (search)
      filtered = filtered.filter(
        (cat) =>
          cat.title.toLowerCase().includes(search.toLowerCase()) ||
          (cat.author &&
            cat.author.toLowerCase().includes(search.toLowerCase())) ||
          (cat.desc && cat.desc.toLowerCase().includes(search.toLowerCase()))
      );
    setFilteredCategories(filtered);
  }, [selectedLetter, search]);

  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 min-h-screen px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24 py-6 sm:py-8">
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        stickButtons={stickButtons}
        search={search}
        setSearch={setSearch}
        selectedLetter={selectedLetter}
        setSelectedLetter={setSelectedLetter}
        scrollToFilterRef={filterSectionRef}
        openPageFilter={() => setShowFilter(true)}
      />

      {/* Filter + View Buttons */}
      <div className="flex justify-end gap-2 mb-5 sm:mb-6 items-center">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className={`p-2 sm:p-2.5 rounded-xl ${
            showFilter
              ? "bg-amber-400 text-white"
              : "bg-white text-amber-600 border border-amber-300 hover:bg-amber-100"
          } cursor-pointer transition`}
        >
          <Filter size={18} />
        </button>
        <button
          onClick={() => setViewMode("grid")}
          className={`p-2 sm:p-2.5 rounded-xl ${
            viewMode === "grid"
              ? "bg-amber-400 text-white shadow"
              : "bg-white text-amber-600 border border-amber-300 hover:bg-amber-100"
          } cursor-pointer transition`}
        >
          <LayoutGrid size={18} />
        </button>
        <button
          onClick={() => setViewMode("list")}
          className={`p-2 sm:p-2.5 rounded-xl ${
            viewMode === "list"
              ? "bg-amber-400 text-white shadow"
              : "bg-white text-amber-600 border border-amber-300 hover:bg-amber-100"
          } cursor-pointer transition`}
        >
          <List size={18} />
        </button>
      </div>

      {/* Alphabet Filter Section */}
      {showFilter && (
        <div
          ref={filterSectionRef}
          className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-6"
        >
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() =>
                setSelectedLetter(selectedLetter === letter ? "" : letter)
              }
              className={`px-2.5 sm:px-3 py-1 rounded-lg border text-sm sm:text-base transition-all ${
                selectedLetter === letter
                  ? "bg-amber-400 text-white border-amber-400"
                  : "bg-white text-amber-600 border border-amber-300 hover:bg-amber-100"
              } cursor-pointer`}
            >
              {letter}
            </button>
          ))}
        </div>
      )}

      {/* GRID VIEW */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-2">
          {filteredCategories.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md border border-amber-100 hover:shadow-xl transition duration-300 hover:scale-[1.02]"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-44 sm:h-52 md:h-56 object-cover rounded-t-2xl"
              />
              <div className="p-4 sm:p-5">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-sm mt-1 line-clamp-1">
                  {item.author}
                </p>
                <p className="text-gray-600 text-sm mt-2 min-h-[48px] line-clamp-2">
                  {item.desc}
                </p>
                <button
                  onClick={() =>
                    navigate(`/categories/${item.categorieNumber}`)
                  }
                  className="mt-4 w-full py-2 text-sm sm:text-base rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-white font-semibold hover:from-amber-500 hover:to-orange-500 transition-all shadow cursor-pointer"
                >
                  View Books
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // LIST VIEW
        <div className="space-y-4 mt-2">
          {filteredCategories.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row items-center bg-white p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-lg border border-amber-100 transition duration-300 hover:scale-[1.01]">
              <img
                src={item.img}
                alt={item.title}
                className="w-full sm:w-32 h-20 object-cover rounded-xl"
              />
              <div className="sm:ml-5 mt-3 sm:mt-0 flex-1 text-center sm:text-left">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Author: {item.author}
                </p>
                <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
              </div>
              <button
                onClick={() =>
                  navigate(`/categories/${item.categorieNumber}`)
                }
                className="mt-3 sm:mt-0 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 sm:px-5 py-2 rounded-xl hover:from-amber-500 hover:to-orange-500 transition-all shadow cursor-pointer text-sm sm:text-base"
              >
                View Books
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Books;





 {
  1: [
    { id: "book1.1", title: "To Kill a Mockingbird – Harper Lee", img: "https://d3525k1ryd2155.cloudfront.net/h/112/127/1081127112.0.x.4.jpg", desc: "A powerful novel about racial injustice and moral growth in the Deep South, seen through the eyes of a young girl.", price: 200, },
    { id: "book1.2", title: "1984 – George Orwell", img: "https://www.eourmart.com/cdn/shop/products/51OiP9ZQ1tL.jpg?v=1639834548&width=1445", desc: "A chilling vision of a totalitarian future where Big Brother watches everyone.", price: 300, },
    { id: "book1.3", title: "Harry Potter and the Sorcerer’s Stone — J.K. Rowling", img: "https://substackcdn.com/image/fetch/$s_!fxEI!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3317a341-8447-4104-a37a-88db2301f07b_2912x2096.png", desc: "An orphan discovers he’s a wizard and enters a world of magic, friendship, and destiny.", price: 250, },
    { id: "book1.4", title: "The Girl on the Train — Paula Hawkins", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTczZ1P8PeJxdj-SO01NWxh1HWux94QA-dAbw&s", desc: "A woman’s daily commute turns into a psychological thriller when she witnesses something shocking.", price: 100, },
    { id: "book1.5", title: "Train to Pakistan – Khushwant Singh", img: "https://www.esplanade.com/-/media/Esplanade/Images/Whats-On/festival-and-series/2024/kalaa-utsavam/train-to-pakistan-01.ashx", desc: "A moving portrayal of love and humanity amid the horrors of the Partition.", price: 450, },
    { id: "book1.6", title: "The White Tiger – Aravind Adiga", img: "https://images.squarespace-cdn.com/content/v1/6023b47e6c992a7aded9b1bd/2df6dd9f-6643-4a67-89d1-9af832b68c64/Book+cover+mock+up+the+white+tiger+novel+by+Aravind+Adiga+by+kiyary+do.jpg", desc: "A darkly comic story about an ambitious driver’s rise from poverty to wealth in modern India.", price: 220, },
    { id: "book1.7", title: "Five Point Someone – Chetan Bhagat", img: "https://ik.imagekit.io/shortpedia/Voices/wp-content/uploads/2021/05/five-points-of-someone.jpg", desc: "A humorous and emotional tale about three friends struggling through IIT life.", price: 130, },
    { id: "book1.8", title: "The Lord of the Rings – J.R.R. Tolkien", img: "https://compote.slate.com/images/c011d20f-dfa5-48d8-baa3-ecc93a57023f.jpg", desc: "An epic quest to destroy a powerful ring that could doom the world.", price: 230, }
  ],
  2: [
    { id: "book2.1", title: "The War That Saved My Life – Kimberly Brubaker Bradley", img: "https://images.penguinrandomhouse.com/cover/9780147510488", desc: "A disabled girl escapes her abusive home during WWII and discovers her own courage and freedom.", price: 230, },
    { id: "book2.2", title: "As Brave As You – Jason Reynolds", img: "https://m.media-amazon.com/images/I/817pEwSwkmL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "Two brothers from Brooklyn spend a summer in rural Virginia, learning about family, identity, and bravery.", price: 230, },
    { id: "book2.3", title: "She Persisted – Chelsea Clinton", img: "https://images.penguinrandomhouse.com/cover/9781524741723", desc: "A collection of inspiring stories of 13 American women who showed courage and perseverance.", price: 230, },
    { id: "book2.4", title: "She Persisted Around the World – Chelsea Clinton", img: "https://images.penguinrandomhouse.com/cover/9780525516996", desc: "Thirteen stories of women from around the world who changed history through bravery and determination.", price: 230, },
    { id: "book2.5", title: "Courage: Eight Portraits – Gordon Brown", img: "https://cheltenhamrarebooks.co.uk/cdn/shop/products/brown-gordon-courage-signed-612331.jpg?v=1619938564&width=600", desc: "Profiles of eight remarkable figures like Mandela and MLK, exploring the meaning of moral courage.", price: 230, },
    { id: "book2.6", title: "Why Courage Matters – John McCain & Mark Salter", img: "https://images.pangobooks.com/book_images/5heNRC71SKdOm0rbk7LjJp8EbdA2/1669494746982_5heNRC71SKdOm0rbk7LjJp8EbdA2?width=800&quality=85&crop=1%3A1", desc: "An inspiring look at what true courage means, featuring stories from history and McCain’s own life.", price: 230, },
    { id: "book2.7", title: "The Auschwitz Volunteer – Witold Pilecki", img: "https://m.media-amazon.com/images/I/61FtyUQwQHL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "The true story of a man who volunteered to enter Auschwitz to organize resistance and report on atrocities.", price: 230, },
    { id: "book2.8", title: "Igraine the Brave – Cornelia Funke", img: "https://asylumbookstore.com/cdn/shop/products/igraine-the-brave-paperback-by-cornelia-funke-811985.jpg?v=1697954448&width=1946", desc: "A fun fantasy tale of a young girl who dreams of becoming a knight and proves her bravery against invaders.", price: 230, }
  ],
  3: [
    { id: "book3.1", title: "A History of the Sikhs – Khushwant Singh", img: "https://kitabhut.in/cdn/shop/files/IMG20240521100627.jpg?v=1716280390", desc: "A two-volume masterpiece tracing Sikh history from Guru Nanak’s time to post-independence India, offering deep insights into Sikh identity and evolution.", price: 230, },
    { id: "book3.2", title: "The Sikh Religion: Its Gurus, Sacred Writings and Authors – Max Arthur Macauliffe", img: "https://m.media-amazon.com/images/I/61iK+OF8jrL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "A monumental six-volume work exploring the lives and teachings of the Sikh Gurus with historical detail and reverence.", price: 230, },
    { id: "book3.3", title: "Ranjit Singh: Maharaja of the Punjab - Khushwant Singh", img: "https://www.tallengestore.com/cdn/shop/products/AnEquestrianPortraitOfMaharajaRanjitSingh-VintageIndianMiniatureArtSikhPainting_74c0d1d8-1473-4d65-9118-8ae85ecde10b.jpg?v=1603354245", desc: "The book charts the life of Maharaja Ranjit Singh — “from being a petty chieftain to becoming the most powerful Indian ruler of his time. His empire extended from Tibet to the deserts of Sindh and from the Khyber Pass to the Sutlej.", price: 230, },
    { id: "book3.4", title: "The Sikh Gurus and the Sikh Religion – Harbans Singh", img: "https://sikhizm.com/wp-content/uploads/2023/02/The-Encyclopaedia-of-Sikhism-Vol.4.webp", desc: "An insightful overview of the lives, philosophies, and spiritual legacies of the ten Sikh Gurus.", price: 230, },
    { id: "book3.5", title: "The Evolution of the Sikh Community – W. H. McLeod", img: "https://m.media-amazon.com/images/I/41HK8HW21RL._AC_CR0%2C0%2C0%2C0_SY315_.jpg", desc: "A historical study of how the Sikh community developed its identity, institutions, and religious practices.", price: 230, },
    { id: "book3.6", title: "The Sikhs in History – Dr. Sangat Singh", img: "https://m.media-amazon.com/images/I/316K5-263QL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "Covers the political, social, and cultural evolution of Sikh society, with special focus on key historical turning points.", price: 230, },
    { id: "book3.7", title: "Guru Nanak: His Life and Teachings – Dr. Surinder Singh Kohli", img: "https://fatehnama.com/wp-content/uploads/2019/11/Guru-Nanak-dev-ji-by-Harshinder-Kaur.jpg", desc: "A detailed account of Guru Nanak Dev Ji’s life, travels, and spiritual message that shaped Sikh philosophy.", price: 230, },
    { id: "book3.8", title: "The Punjab Story – Edited by Khushwant Singh", img: "https://m.media-amazon.com/images/I/71JbWYhc34L._AC_UF1000,1000_QL80_.jpg", desc: "A collection of essays and personal accounts narrating Punjab’s turbulent modern history, including the 1947 Partition and 1984 events.", price: 230, }
  ],
  4: [
    { id: "book4.1", title: "Sapiens: A Brief History of Humankind – Yuval Noah Harari", img: "https://static-01.shop.com.mm/p/7b87021301ba936ccf5e34b7a1e43015.jpg", desc: "A sweeping exploration of human evolution and how biology and history have defined societies, cultures, and economies.", price: 230, },
    { id: "book4.2", title: "Guns, Germs, and Steel – Jared Diamond", img: "https://www.bookxcess.com/cdn/shop/products/2202cdb1e2ab452c8ae9a1b07463d401.thumbnail.0000000000_1500x.jpg?v=1679986000", desc: "An award-winning study of how geography, agriculture, and environment shaped civilizations’ destinies across history.", price: 230, },
    { id: "book4.3", title: "A People’s History of the United States – Howard Zinn", img: "https://is1-ssl.mzstatic.com/image/thumb/Publication19/v4/6a/c4/c5/6ac4c574-2865-1e26-1242-4b9682ae603f/mzm.happsmes.jpg/1200x675wz.jpg", desc: "A groundbreaking retelling of American history through the eyes of workers, women, and marginalized communities.", price: 230, },
    { id: "book4.4", title: "The Pursuit of Glory: Europe 1648–1815 – Tim Blanning", img: "https://images4.penguinrandomhouse.com/smedia/9780143113898", desc: "A fascinating chronicle of Europe’s transformation during a time of empires, revolutions, and enlightenment.", price: 230, },
    { id: "book4.5", title: "Postwar: A History of Europe Since 1945 – Tony Judt", img: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/4b/43/90/4b4390ee-fcf4-f3e7-b222-f99df21a8916/6157-square.jpg/1200x600wp.png", desc: "A comprehensive narrative of Europe’s recovery, division, and reinvention after the devastation of World War II.", price: 230, },
    { id: "book4.6", title: "The Story of Civilization – Will Durant & Ariel Durant", img: "https://i.ebayimg.com/images/g/kkAAAOSwFcJmptfu/s-l400.jpg", desc: "A monumental 11-volume masterpiece tracing humanity’s philosophical, cultural, and political evolution.", price: 230, },
    { id: "book4.7", title: "The Language of History – Audrey Truschke", img: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202508/india-5-000-years-of-history-on-the-subcontinent-by-audrey-truschke--princeton-university-press-164827233-16x9_0.jpg?VersionId=IrFvnH_jIAM.Ywf9D0Yhy6d8CuKBwqdC&size=690:388", desc: "Explores Indo-Persian chronicles and Sanskrit traditions to reinterpret medieval Indian history.", price: 230, },
    { id: "book4.8", title: "The Spartans: An Epic History by Paul Cartledge", img: "https://img-cdn.heureka.group/v1/f21d2928-4bb9-4eca-8541-09632017e05a.jpg?width=400&height=400", desc: "A comprehensive and elegant history of Sparta, from about 480 to 360 BC, giving broad coverage of society, politics and culture.", price: 230, }
  ],
  5: [
    { id: "book5.1", title: "The Jungle Book – Rudyard Kipling", img: "https://shrihindpublications.in/wp-content/uploads/2025/05/Copy-of-THE-JUNGLE-BOOK.png", desc: "A timeless collection of stories about Mowgli, a boy raised by wolves, and his adventures among the animals of the jungle.", price: 230, },
    { id: "book5.2", title: "Tarka the Otter – Henry Williamson", img: "https://www.buyusedbooks.in/image/cache/books/new_model5/9780140366211-f-500x500.jpg", desc: "A beautifully written nature novel that follows the life, struggles, and triumphs of an otter in the wild English countryside.", price: 230, },
    { id: "book5.3", title: "The Incredible Journey – Sheila Burnford", img: "https://images.ctfassets.net/qpn1gztbusu2/PxVUIGDFDEDonDZW3xlun/eca86b5e5c002f873f85fb3aa39a0a46/sheila-burnford-the-incredible-journey.webp", desc: "Two dogs and a cat embark on a perilous 300-mile journey through the Canadian wilderness to find their beloved owners.", price: 230, },
    { id: "book5.4", title: "The Exultant Ark – Jonathan Peter Balcombe", img: "https://static.vecteezy.com/system/resources/previews/030/178/569/large_2x/wallpaper-animals-the-forest-the-sun-the-animals-the-animals-the-animals-ai-generated-free-photo.jpg", desc: "A thought-provoking non-fiction book showcasing animals experiencing joy, play, and emotion — challenging human-centered views.", price: 230, },
    { id: "book5.5", title: "The White Giraffe – Lauren St John", img: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/9d2cc67a-f6ba-4c98-89f8-b79f08230066.__CR0,0,300,300_PT0_SX300_V1___.png", desc: "After losing her parents, Martine moves to Africa, where she discovers a magical connection with a legendary white giraffe.", price: 230, },
    { id: "book5.6", title: "A Sick Day for Amos McGee – Philip C. Stead", img: "https://www.heirloomartco.com/cdn/shop/products/IMG_2678.jpg?v=1607549389", desc: "When kind zookeeper Amos McGee falls ill, his animal friends visit him to return the love and care he’s always given them.", price: 230, },
    { id: "book5.7", title: "Animal Homes – Ashwitha Jayakumar", img: "https://m.media-amazon.com/images/I/51xIP7d-OmL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "A delightful educational book for young readers exploring the unique and surprising homes animals build and live in.", price: 230, },
    { id: "book5.8", title: "Migration: Incredible Animal Journeys – Mike Unwin", img: "https://ecsmedia.pl/c/16641801121416288-jpg-gallery.big-iext119655861.jpg", desc: "A visually stunning exploration of the epic journeys animals make across the planet — from whales to butterflies.", price: 230, }
  ],
  6: [
    { id: "book6.1", title: "Salt, Fat, Acid, Heat – Samin Nosrat", img: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,w_730/k%2FPhoto%2FLifestyle%2F2019-09-cookbook-club-salt-fat-acid-heat%2FSalt-Fat-Acid-Heat_125", desc: "A revolutionary cookbook that teaches cooking through the four essential elements — salt, fat, acid, and heat — so you can cook confidently without relying on recipes.", price: 230, },
    { id: "book6.2", title: "The Food Lab: Better Home Cooking Through Science – J. Kenji López-Alt", img: "https://blog.thermoworks.com/wp-content/uploads/2015/10/food_lab_z_b-1.jpg", desc: "Explores the science of home cooking, helping you master techniques and understand the 'why' behind great dishes.", price: 230, },
    { id: "book6.3", title: "Made in India: Recipes from an Indian Family Kitchen – Meera Sodha", img: "https://rootsandcook.com/wp-content/uploads/2022/11/Honest-Cookbook-reviews-Made-in-India-1-Edit-min.jpg", desc: "Over 130 easy and vibrant recipes celebrating authentic Indian home-cooked meals passed down through generations.", price: 230, },
    { id: "book6.4", title: "Indian-ish: Recipes and Antics from a Modern American Family – Priya Krishna", img: "https://strataportland.com/cdn/shop/products/P1010040_a1529dd7-122d-4f96-82b5-d99cc7551deb_1080x.jpg?v=1662657768", desc: "A fun and modern cookbook blending Indian traditions with contemporary American flavors, full of personality and creativity.", price: 230, },
    { id: "book6.5", title: "The Rangoon Sisters: Recipes from Our Burmese Family Kitchen – Amy & Emily Chung", img: "https://is1-ssl.mzstatic.com/image/thumb/Publication124/v4/47/2f/2b/472f2b60-5e6b-76e9-8ab8-919a11b1bc80/9781473573659.jpg/1200x630wz.png", desc: "A beautiful collection of Burmese family recipes bringing together authentic flavors and heartwarming stories.", price: 230, },
    { id: "book6.6", title: "Tiffin: 500 Authentic Recipes Celebrating India’s Regional Cuisine – Sonal Ved", img: "https://m.media-amazon.com/images/I/81tkoYAzV2L._AC_UF1000,1000_QL80_.jpg", desc: "An extensive cookbook featuring 500 regional Indian recipes—from temple food to tribal dishes—showcasing India’s incredible culinary diversity.", price: 230, },
    { id: "book6.7", title: "Gordon Ramsay’s Ultimate Fit Food – Gordon Ramsay", img: "https://static-ppimages.freetls.fastly.net/nielsens/9781444780789.jpg?canvas=600,600&fit=bounds&height=600&mode=max&width=600&404=default.jpg", desc: "Healthy yet delicious recipes categorized into 'Healthy', 'Energized', and 'Lean' meals by world-famous chef Gordon Ramsay.", price: 230, },
    { id: "book6.8", title: "The Bacon Cookbook – James Villas", img: "https://m.media-amazon.com/images/I/71WWfY6eagL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "A flavorful collection of over 150 bacon-inspired recipes from around the world for true bacon lovers.", price: 230, }
  ],
  7: [
    { id: "book7.1", title: "The Republic – Plato", img: "https://www.planksip.org/content/images/2021/05/585260_Plato_The-Republic_112110.jpg", desc: "A foundational text of Western philosophy exploring justice, morality, and the ideal society.", price: 230, },
    { id: "book7.2", title: "Nicomachean Ethics – Aristotle", img: "https://cdn.thecollector.com/wp-content/uploads/2024/03/what-are-the-nicomachean-ethics.jpg", desc: "Aristotle’s classic work on virtue, character, and how to live a good life.", price: 230, },
    { id: "book7.3", title: "Meditations – Marcus Aurelius", img: "https://m.media-amazon.com/images/I/41qDBtsEloL._SL500_.jpg", desc: "Personal reflections by a Roman emperor on Stoic philosophy, duty, and resilience.", price: 230, },
    { id: "book7.4", title: "The Problems of Philosophy – Bertrand Russell", img: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/d8/85/3d/d8853d61-0360-735c-cf8c-4225757b6846/9781998382460.png/1200x675wz.jpg", desc: "A clear and accessible introduction to core philosophical questions about knowledge and reality.", price: 230, },
    { id: "book7.5", title: "A Theory of Justice – John Rawls", img: "https://webdiag547.blob.core.windows.net/live/images%2Fbooks%2F100490.jpg?sv=2020-04-08&st=2025-10-19T23%3A13%3A37Z&se=2030-10-19T23%3A18%3A37Z&sr=c&sp=r&sig=DRdx9ml5FKEY6SoJtyqsyXI9ZSU2OuHKQ%2BGSk43O5yE%3D", desc: "A modern classic proposing fairness and equality as the foundation of a just society.", price: 230, },
    { id: "book7.6", title: "Beyond Good and Evil – Friedrich Nietzsche", img: "https://bluediarybooks.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-22-at-2.45.40-PM-450x415.jpeg", desc: "Nietzsche challenges traditional morality and urges the reader to create their own values.", price: 230, },
    { id: "book7.7", title: "Philosophical Investigations – Ludwig Wittgenstein", img: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/fb/93/de/fb93de41-b505-7b93-25b0-c7dda3fe2d0b/9781004134380.jpg/1200x675wf.jpg", desc: "A groundbreaking work exploring language, meaning, and how we understand the world.", price: 230, },
    { id: "book7.8", title: "The Story of Philosophy – Will Durant", img: "https://is1-ssl.mzstatic.com/image/thumb/Publication116/v4/8c/90/2a/8c902a11-0686-e6f0-ef64-5e3d679bcdde/b6fb5965-964c-4c3c-8b95-5571923b1df0_cover_image.jpg/1200x900wz.jpg", desc: "An engaging overview of major Western philosophers and their ideas, written for general readers.", price: 230, },
  ],
  8: [
    { id: "book8.1", title: "Rich Dad Poor Dad – Robert T. Kiyosaki", img: "https://icrrd.com/public/media/01-11-2020-083226richdad-poor-dad.jpg", desc: "A personal finance classic that contrasts two perspectives on money — one focused on earning and one on building wealth.", price: 230, },
    { id: "book8.2", title: "The Intelligent Investor – Benjamin Graham", img: "https://5.imimg.com/data5/SELLER/Default/2023/3/EB/QY/ND/147952517/the-intelligent-investor-by-benjamin-graham-warren-buffett-.jpeg", desc: "The definitive guide to value investing, teaching patience, discipline, and long-term financial thinking.", price: 230, },
    { id: "book8.3", title: "Principles of Corporate Finance – Richard A. Brealey & Stewart C. Myers", img: "https://m.media-amazon.com/images/I/51TYY78A8DL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "A comprehensive textbook on corporate finance, covering valuation, risk, capital structure, and strategic decision-making.", price: 230, },
    { id: "book8.4", title: "Profit First – Mike Michalowicz", img: "https://hookagency.com/wp-content/uploads/2024/08/profit-first-summary-book-review.jpg", desc: "A business finance method that ensures profitability by prioritizing profit before expenses.", price: 230, },
    { id: "book8.5", title: "The Wisdom of Finance – Mihir A. Desai", img: "https://static.getbookie.com/product/image/2022/12/full/1670341468-1890.44921875-00e289a5-350d-4cc7-b590-0005f9b14dc4.png", desc: "An engaging look at financial principles through the lens of literature, history, and philosophy.", price: 230, },
    { id: "book8.6", title: "The Total Money Makeover – Dave Ramsey", img: "https://media.licdn.com/dms/image/v2/D4D12AQEVJ3WqvyMUTg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1675277324928?e=2147483647&v=beta&t=WWw2ezlWWld31HxroxpxdMwcGqcBYEKsqG5co6VfjSc", desc: "A step-by-step plan to get out of debt, build savings, and take control of your financial life.", price: 230, },
    { id: "book8.7", title: "Too Big to Fail – Andrew Ross Sorkin", img: "https://fivebooks.com/book/too-big-fail-inside-story-how-wall-street-and-washington-fought-save-financial-system/shareimage.jpg", desc: "An inside account of the 2008 financial crisis, revealing how major institutions and governments responded to disaster.", price: 230, },
    { id: "book8.8", title: "The Customer-Funded Business – John Mullins", img: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/47/6014523/1.jpg?3172", desc: "Shows how entrepreneurs can grow their ventures using customer revenue instead of relying on investors.", price: 230, }
  ],

},





 2: [
    { id: "2", title: "The War That Saved My Life – Kimberly Brubaker Bradley", img: "https://images.penguinrandomhouse.com/cover/9780147510488", desc: "A disabled girl escapes her abusive home during WWII and discovers her own courage and freedom.", price: 230, },
    { id: "2", title: "As Brave As You – Jason Reynolds", img: "https://m.media-amazon.com/images/I/817pEwSwkmL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "Two brothers from Brooklyn spend a summer in rural Virginia, learning about family, identity, and bravery.", price: 230, },
    { id: "2", title: "She Persisted – Chelsea Clinton", img: "https://images.penguinrandomhouse.com/cover/9781524741723", desc: "A collection of inspiring stories of 13 American women who showed courage and perseverance.", price: 230, },
    { id: "2", title: "She Persisted Around the World – Chelsea Clinton", img: "https://images.penguinrandomhouse.com/cover/9780525516996", desc: "Thirteen stories of women from around the world who changed history through bravery and determination.", price: 230, },
    { id: "2", title: "Courage: Eight Portraits – Gordon Brown", img: "https://cheltenhamrarebooks.co.uk/cdn/shop/products/brown-gordon-courage-signed-612331.jpg?v=1619938564&width=600", desc: "Profiles of eight remarkable figures like Mandela and MLK, exploring the meaning of moral courage.", price: 230, },
    { id: "2", title: "Why Courage Matters – John McCain & Mark Salter", img: "https://images.pangobooks.com/book_images/5heNRC71SKdOm0rbk7LjJp8EbdA2/1669494746982_5heNRC71SKdOm0rbk7LjJp8EbdA2?width=800&quality=85&crop=1%3A1", desc: "An inspiring look at what true courage means, featuring stories from history and McCain’s own life.", price: 230, },
    { id: "2", title: "The Auschwitz Volunteer – Witold Pilecki", img: "https://m.media-amazon.com/images/I/61FtyUQwQHL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "The true story of a man who volunteered to enter Auschwitz to organize resistance and report on atrocities.", price: 230, },
    { id: "2", title: "Igraine the Brave – Cornelia Funke", img: "https://asylumbookstore.com/cdn/shop/products/igraine-the-brave-paperback-by-cornelia-funke-811985.jpg?v=1697954448&width=1946", desc: "A fun fantasy tale of a young girl who dreams of becoming a knight and proves her bravery against invaders.", price: 230, }
  ],












  import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Search as SearchIcon } from "lucide-react";
import Header from "../Layout/header.jsx";

// ✅ FIX: Import the exported variable name
import { allBooksData } from "./booksList";

// --- CATEGORY DEFINITION ---
const categories = [
  {
    id: uuidv4(),
    title: "Fiction",
    categoryID: "1",
    desc: "Explore imaginative narratives and stories.",
    img: "https://fivebooks.com/images/brjfwPAq69-IDEX2/plain/fb/2022/11/fiction-books-category-share-image.jpg",
    categorieNumber: 1,
  },
  {
    id: uuidv4(),
    title: "Brave",
    categoryID: "2",
    desc: "Exciting adventures and bold stories.",
    img: "https://fiverr-res.cloudinary.com/t_main1,q_auto,f_auto/gigs3/383529886/original/f50501b38d0f444b321dd5487a02a66184f09305.png",
    categorieNumber: 2,
  },
  {
    id: uuidv4(),
    title: "Sikhism",
    categoryID: "3",
    desc: "A Journey of Faith, Courage, and Equality.",
    img: "https://cdn.sketchbubble.com/pub/media/catalog/product/optimized1/6/7/67a516d4c9ff802bfe8f83ce25167b6133878538464802294f4341989827780c/sikh-history-slide1.png",
    categorieNumber: 3,
  },
  {
    id: uuidv4(),
    title: "History",
    categoryID: "4",
    desc: "Connections between past events and contemporary society.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSylzvW1jxbfqNvrWC39FKsdue7ttaMhwjCkA&s",
    categorieNumber: 4,
  },
  {
    id: uuidv4(),
    title: "Animal Things",
    categoryID: "5",
    desc: "The rise and fall of a rebellion that mirrors human society.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYkHVGvQHNJe_3pCVW1_AMkwV9IIiC-3d2ACRxhCfR8iBXzkKk5LWbZP0BR_gskjbcrZs&usqp=CAU",
    categorieNumber: 5,
  },
  {
    id: uuidv4(),
    title: "Food Recipes",
    categoryID: "6",
    desc: "A variety of recipes for breakfast, lunch, dinner, and snacks.",
    img: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/fea9c0119666285.60a2b5b9ebea0.jpg",
    categorieNumber: 6,
  },
  {
    id: uuidv4(),
    title: "Philosophy",
    categoryID: "7",
    desc: "Deep thoughts and insights.",
    img: "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg",
    categorieNumber: 7,
  },
  {
    id: uuidv4(),
    title: "Business & Finance",
    categoryID: "8",
    desc: "Books on money and management.",
    img: "https://cdn.educba.com/academy/wp-content/uploads/2016/01/Business-and-Finance.jpg",
    categorieNumber: 8,
  },
];
// --- END CATEGORY DEFINITION ---

// Helper function to flatten all books for global searching (memoized)
const allBooksArray = Object.values(allBooksData).flat();

function Books() {
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState("grid"); // ✅ Controlled by Header
  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [headerHeight, setHeaderHeight] = useState(0);
  const [showFilter, setShowFilter] = useState(false);

  const filterSectionRef = useRef(null);

  // --- GLOBAL SEARCH RESULTS ---
  const globalBookMatches = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return allBooksArray.filter(
      (book) =>
        book.title.toLowerCase().includes(q) ||
        (book.desc && book.desc.toLowerCase().includes(q))
    );
  }, [search]);

  // --- CATEGORY FILTERING ---
  const [filteredCategories, setFilteredCategories] = useState(categories);

  useEffect(() => {
    let filtered = categories;
    const q = search.toLowerCase();

    if (selectedLetter) {
      filtered = filtered.filter((cat) =>
        cat.title.toLowerCase().startsWith(selectedLetter.toLowerCase())
      );
    }

    if (q) {
      filtered = categories.filter((cat) => {
        const categoryMatch =
          cat.title.toLowerCase().includes(q) ||
          cat.desc.toLowerCase().includes(q);

        const categoryBooks = allBooksData[cat.categorieNumber] || [];
        const bookInsideMatch = categoryBooks.some(
          (book) =>
            book.title.toLowerCase().includes(q) ||
            (book.desc && book.desc.toLowerCase().includes(q))
        );

        return categoryMatch || bookInsideMatch;
      });
    }

    setFilteredCategories(filtered);
  }, [selectedLetter, search]);

  // Alphabet array
  // const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  // px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24
  return (
    <div className="bg-gradient-to-br from-amber-50 via-orange-100  to-amber-200 min-h-screen px-20 mt-[-70px] py-8">
      {/* <div className="text-4xl mb-[-40px] font-bold text-gray-700"> Books Categories</div> */}

      {/* ✅ Global Header */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        search={search}
        setSearch={setSearch}
        selectedLetter={selectedLetter}
        setSelectedLetter={setSelectedLetter}
        scrollToFilterRef={filterSectionRef}
        openPageFilter={() => setShowFilter(true)}
        setHeaderHeight={setHeaderHeight}
      />

      {/* Spacing for fixed header */}
      <div style={{ marginTop: headerHeight + 20 }} />

      {/* Alphabet Filter Section */}
      {/* {showFilter && (
        <div
          ref={filterSectionRef}
          className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-6"
        >
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() =>
                setSelectedLetter(selectedLetter === letter ? "" : letter)
              }
              className={`px-2.5 sm:px-3 py-1 rounded-lg border text-sm sm:text-base transition-all ${
                selectedLetter === letter
                  ? "bg-amber-400 text-white border-amber-400"
                  : "bg-white text-amber-600 border border-amber-300 hover:bg-amber-100"
              } cursor-pointer`}
            >
              {letter}
            </button>
          ))}
        </div>
      )} */}

      {/* --- GLOBAL BOOK MATCHES --- */}
      {search.length > 0 && globalBookMatches.length > 0 && (
        <div className="mb-8 p-4 bg-white rounded-xl shadow-lg border-l-4 border-amber-500">
          <h2 className="text-xl font-bold text-amber-700 mb-4 flex items-center">
            <SearchIcon size={20} className="mr-2" />
            {globalBookMatches.length} Matching Books Found Globally - (Click on
            a category card below to view the book.)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {console.log(globalBookMatches)
            }
            {globalBookMatches.map((item) => (
              <div
                onClick={() => navigate(`/categories/${item.mainid}`)}
                key={item.mainid}
                className="p-3 border rounded-lg bg-amber-50 hover:bg-amber-100 cursor-pointer transition"
              >
                <p className="font-semibold text-gray-800 line-clamp-1">
                  {item.title}
                </p>
                <p className="text-sm text-gray-500 line-clamp-1">
                  {item.desc}
                </p>
                <p className="text-xs text-amber-600 mt-1">
                  Category ID: {item.id.split(".")[0]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="text-4xl mb-10 font-bold text-gray-700"> Categories of Books</div>
      {/* --- CATEGORY DISPLAY --- */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 ">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/categories/${item.categorieNumber}`)}
                className="bg-white rounded-2xl shadow-md border border-amber-100 hover:shadow-xl transition duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-44 sm:h-52 md:h-56 object-cover rounded-t-2xl"
                />
                <div className="p-4 sm:p-5">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate">
                    {item.title}
                  </h2>
                  <h2 className="text-sm text-gray-800 truncate">
                   category ID: {item.categoryID}
                  </h2>
                  <p className="text-gray-600 text-sm mt-2 min-h-[48px] line-clamp-2">
                    {item.desc}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/categories/${item.categorieNumber}`);
                    }}
                    className="mt-4 w-full py-2 text-sm sm:text-base rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 text-white font-semibold hover:from-amber-500 hover:to-orange-500 transition-all shadow cursor-pointer"
                  >
                    View Books
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No matching categories found.
            </p>
          )}
        </div>
      ) : (
        // ✅ LIST VIEW
        <div className="space-y-4 ">
          {filteredCategories.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/categories/${item.categorieNumber}`)}
              className="flex flex-col sm:flex-row items-center bg-white p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-lg border border-amber-100 transition duration-300 hover:scale-[1.01] cursor-pointer"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full sm:w-32 h-20 object-cover rounded-xl"
              />
              <div className="sm:ml-5 mt-3 sm:mt-0 flex-1 text-center sm:text-left">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                  {item.title}
                </h2>
                <h2 className="text-sm text-gray-800 truncate">
                   category ID: {item.categoryID}
                  </h2>
                <p className="text-gray-600 text-sm mt-1">{item.desc}</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/categories/${item.categorieNumber}`);
                }}
                className="mt-3 sm:mt-0 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 sm:px-5 py-2 rounded-xl hover:from-amber-500 hover:to-orange-500 transition-all shadow cursor-pointer text-sm sm:text-base"
              >
                View Books
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Books;