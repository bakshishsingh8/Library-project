// import { useNavigate, useParams } from "react-router-dom";
// import { useState, useRef, useEffect, useMemo } from "react";
// import { LayoutGrid, List, Filter, Check, Plus, Search as SearchIcon } from "lucide-react";
// import { motion } from "framer-motion";
// import Header from "../Layout/header.jsx"; // <-- Header now used

// // =================================================================
// // ✅ EXPORTED BOOK DATA DEFINITION (unchanged)
// // This should remain exported so Books.jsx can import { allBooksData }.
// // =================================================================
// export const allBooksData = [

//     { id: "1.1", mainid: "1", title: "To Kill a Mockingbird – Harper Lee", img: "https://d3525k1ryd2155.cloudfront.net/h/112/127/1081127112.0.x.4.jpg", desc: "A powerful novel about racial injustice and moral growth in the Deep South, seen through the eyes of a young girl.", price: 200, },
//     { id: "1.2", mainid: "1", title: "1984 – George Orwell", img: "https://www.eourmart.com/cdn/shop/products/51OiP9ZQ1tL.jpg?v=1639834548&width=1445", desc: "A chilling vision of a totalitarian future where Big Brother watches everyone.", price: 300, },
//     { id: "1.3", mainid: "1", title: "Harry Potter and the Sorcerer’s Stone — J.K. Rowling", img: "https://substackcdn.com/image/fetch/$s_!fxEI!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3317a341-8447-4104-a37a-88db2301f07b_2912x2096.png", desc: "An orphan discovers he’s a wizard and enters a world of magic, friendship, and destiny.", price: 250, },
//     { id: "1.4", mainid: "1", title: "The Girl on the Train — Paula Hawkins", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTczZ1P8PeJxdj-SO01NWxh1HWux94QA-dAbw&s", desc: "A woman’s daily commute turns into a psychological thriller when she witnesses something shocking.", price: 100, },
//     { id: "1.5", mainid: "1", title: "Train to Pakistan – Khushwant Singh", img: "https://www.esplanade.com/-/media/Esplanade/Images/Whats-On/festival-and-series/2024/kalaa-utsavam/train-to-pakistan-01.ashx", desc: "A moving portrayal of love and humanity amid the horrors of the Partition.", price: 450, },
//     { id: "1.6", mainid: "1", title: "The White Tiger – Aravind Adiga", img: "https://images.squarespace-cdn.com/content/v1/6023b47e6c992a7aded9b1bd/2df6dd9f-6643-4a67-89d1-9af832b68c64/Book+cover+mock+up+the+white+tiger+novel+by+Aravind+Adiga+by+kiyary+do.jpg", desc: "A darkly comic story about an ambitious driver’s rise from poverty to wealth in modern India.", price: 220, },
//     { id: "1.7", mainid: "1", title: "Five Point Someone – Chetan Bhagat", img: "https://ik.imagekit.io/shortpedia/Voices/wp-content/uploads/2021/05/five-points-of-someone.jpg", desc: "A humorous and emotional tale about three friends struggling through IIT life.", price: 130, },
//     { id: "1.8", mainid: "1", title: "The Lord of the Rings – J.R.R. Tolkien", img: "https://compote.slate.com/images/c011d20f-dfa5-48d8-baa3-ecc93a57023f.jpg", desc: "An epic quest to destroy a powerful ring that could doom the world.", price: 230, },


//     { id: "2.1", mainid: "2", title: "The War That Saved My Life – Kimberly Brubaker Bradley", img: "https://images.penguinrandomhouse.com/cover/9780147510488", desc: "A disabled girl escapes her abusive home during WWII and discovers her own courage and freedom.", price: 230, },
//     { id: "2.2", mainid: "2", title: "As Brave As You – Jason Reynolds", img: "https://m.media-amazon.com/images/I/817pEwSwkmL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "Two brothers from Brooklyn spend a summer in rural Virginia, learning about family, identity, and bravery.", price: 230, },
//     { id: "2.3", mainid: "2", title: "She Persisted – Chelsea Clinton", img: "https://images.penguinrandomhouse.com/cover/9781524741723", desc: "A collection of inspiring stories of 13 American women who showed courage and perseverance.", price: 230, },
//     { id: "2.4", mainid: "2", title: "She Persisted Around the World – Chelsea Clinton", img: "https://images.penguinrandomhouse.com/cover/9780525516996", desc: "Thirteen stories of women from around the world who changed history through bravery and determination.", price: 230, },
//     { id: "2.5", mainid: "2", title: "Courage: Eight Portraits – Gordon Brown", img: "https://cheltenhamrarebooks.co.uk/cdn/shop/products/brown-gordon-courage-signed-612331.jpg?v=1619938564&width=600", desc: "Profiles of eight remarkable figures like Mandela and MLK, exploring the meaning of moral courage.", price: 230, },
//     { id: "2.6", mainid: "2", title: "Why Courage Matters – John McCain & Mark Salter", img: "https://images.pangobooks.com/book_images/5heNRC71SKdOm0rbk7LjJp8EbdA2/1669494746982_5heNRC71SKdOm0rbk7LjJp8EbdA2?width=800&quality=85&crop=1%3A1", desc: "An inspiring look at what true courage means, featuring stories from history and McCain’s own life.", price: 230, },
//     { id: "2.7", mainid: "2", title: "The Auschwitz Volunteer – Witold Pilecki", img: "https://m.media-amazon.com/images/I/61FtyUQwQHL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "The true story of a man who volunteered to enter Auschwitz to organize resistance and report on atrocities.", price: 230, },
//     { id: "2.8", mainid: "2", title: "Igraine the Brave – Cornelia Funke", img: "https://asylumbookstore.com/cdn/shop/products/igraine-the-brave-paperback-by-cornelia-funke-811985.jpg?v=1697954448&width=1946", desc: "A fun fantasy tale of a young girl who dreams of becoming a knight and proves her bravery against invaders.", price: 230, },


//     { id: "3.1", mainid: "3", title: "A History of the Sikhs – Khushwant Singh", img: "https://kitabhut.in/cdn/shop/files/IMG20240521100627.jpg?v=1716280390", desc: "A two-volume masterpiece tracing Sikh history from Guru Nanak’s time to post-independence India, offering deep insights into Sikh identity and evolution.", price: 230, },
//     { id: "3.2", mainid: "3", title: "The Sikh Religion: Its Gurus, Sacred Writings and Authors – Max Arthur Macauliffe", img: "https://m.media-amazon.com/images/I/61iK+OF8jrL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "A monumental six-volume work exploring the lives and teachings of the Sikh Gurus with historical detail and reverence.", price: 230, },
//     { id: "3.3", mainid: "3", title: "Ranjit Singh: Maharaja of the Punjab - Khushwant Singh", img: "https://www.tallengestore.com/cdn/shop/products/AnEquestrianPortraitOfMaharajaRanjitSingh-VintageIndianMiniatureArtSikhPainting_74c0d1d8-1473-4d65-9118-8ae85ecde10b.jpg?v=1603354245", desc: "The book charts the life of Maharaja Ranjit Singh — “from being a petty chieftain to becoming the most powerful Indian ruler of his time. His empire extended from Tibet to the deserts of Sindh and from the Khyber Pass to the Sutlej.", price: 230, },
//     { id: "3.4", mainid: "3", title: "The Sikh Gurus and the Sikh Religion – Harbans Singh", img: "https://sikhizm.com/wp-content/uploads/2023/02/The-Encyclopaedia-of-Sikhism-Vol.4.webp", desc: "An insightful overview of the lives, philosophies, and spiritual legacies of the ten Sikh Gurus.", price: 230, },
//     { id: "3.5", mainid: "3", title: "The Evolution of the Sikh Community – W. H. McLeod", img: "https://m.media-amazon.com/images/I/41HK8HW21RL._AC_CR0%2C0%2C0%2C0_SY315_.jpg", desc: "A historical study of how the Sikh community developed its identity, institutions, and religious practices.", price: 230, },
//     { id: "3.6", mainid: "3", title: "The Sikhs in History – Dr. Sangat Singh", img: "https://m.media-amazon.com/images/I/316K5-263QL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "Covers the political, social, and cultural evolution of Sikh society, with special focus on key historical turning points.", price: 230, },
//     { id: "3.7", mainid: "3", title: "Guru Nanak: His Life and Teachings – Dr. Surinder Singh Kohli", img: "https://fatehnama.com/wp-content/uploads/2019/11/Guru-Nanak-dev-ji-by-Harshinder-Kaur.jpg", desc: "A detailed account of Guru Nanak Dev Ji’s life, travels, and spiritual message that shaped Sikh philosophy.", price: 230, },
//     { id: "3.8", mainid: "3", title: "The Punjab Story – Edited by Khushwant Singh", img: "https://m.media-amazon.com/images/I/71JbWYhc34L._AC_UF1000,1000_QL80_.jpg", desc: "A collection of essays and personal accounts narrating Punjab’s turbulent modern history, including the 1947 Partition and 1984 events.", price: 230, },


//     { id: "4.1", mainid: "4", title: "Sapiens: A Brief History of Humankind – Yuval Noah Harari", img: "https://static-01.shop.com.mm/p/7b87021301ba936ccf5e34b7a1e43015.jpg", desc: "A sweeping exploration of human evolution and how biology and history have defined societies, cultures, and economies.", price: 230, },
//     { id: "4.2", mainid: "4", title: "Guns, Germs, and Steel – Jared Diamond", img: "https://www.bookxcess.com/cdn/shop/products/2202cdb1e2ab452c8ae9a1b07463d401.thumbnail.0000000000_1500x.jpg?v=1679986000", desc: "An award-winning study of how geography, agriculture, and environment shaped civilizations’ destinies across history.", price: 230, },
//     { id: "4.3", mainid: "4", title: "A People’s History of the United States – Howard Zinn", img: "https://is1-ssl.mzstatic.com/image/thumb/Publication19/v4/6a/c4/c5/6ac4c574-2865-1e26-1242-4b9682ae603f/mzm.happsmes.jpg/1200x675wz.jpg", desc: "A groundbreaking retelling of American history through the eyes of workers, women, and marginalized communities.", price: 230, },
//     { id: "4.4", mainid: "4", title: "The Pursuit of Glory: Europe 1648–1815 – Tim Blanning", img: "https://images4.penguinrandomhouse.com/smedia/9780143113898", desc: "A fascinating chronicle of Europe’s transformation during a time of empires, revolutions, and enlightenment.", price: 230, },
//     { id: "4.5", mainid: "4", title: "Postwar: A History of Europe Since 1945 – Tony Judt", img: "https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/4b/43/90/4b4390ee-fcf4-f3e7-b222-f99df21a8916/6157-square.jpg/1200x600wp.png", desc: "A comprehensive narrative of Europe’s recovery, division, and reinvention after the devastation of World War II.", price: 230, },
//     { id: "4.6", mainid: "4", title: "The Story of Civilization – Will Durant & Ariel Durant", img: "https://i.ebayimg.com/images/g/kkAAAOSwFcJmptfu/s-l400.jpg", desc: "A monumental 11-volume masterpiece tracing humanity’s philosophical, cultural, and political evolution.", price: 230, },
//     { id: "4.7", mainid: "4", title: "The Language of History – Audrey Truschke", img: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202508/india-5-000-years-of-history-on-the-subcontinent-by-audrey-truschke--princeton-university-press-164827233-16x9_0.jpg?VersionId=IrFvnH_jIAM.Ywf9D0Yhy6d8CuKBwqdC&size=690:388", desc: "Explores Indo-Persian chronicles and Sanskrit traditions to reinterpret medieval Indian history.", price: 230, },
//     { id: "4.8", mainid: "4", title: "The Spartans: An Epic History by Paul Cartledge", img: "https://img-cdn.heureka.group/v1/f21d2928-4bb9-4eca-8541-09632017e05a.jpg?width=400&height=400", desc: "A comprehensive and elegant history of Sparta, from about 480 to 360 BC, giving broad coverage of society, politics and culture.", price: 230, },


//     { id: "5.1", mainid: "5", title: "The Jungle Book – Rudyard Kipling", img: "https://shrihindpublications.in/wp-content/uploads/2025/05/Copy-of-THE-JUNGLE-BOOK.png", desc: "A timeless collection of stories about Mowgli, a boy raised by wolves, and his adventures among the animals of the jungle.", price: 230, },
//     { id: "5.2", mainid: "5", title: "Tarka the Otter – Henry Williamson", img: "https://www.buyusedbooks.in/image/cache/books/new_model5/9780140366211-f-500x500.jpg", desc: "A beautifully written nature novel that follows the life, struggles, and triumphs of an otter in the wild English countryside.", price: 230, },
//     { id: "5.3", mainid: "5", title: "The Incredible Journey – Sheila Burnford", img: "https://images.ctfassets.net/qpn1gztbusu2/PxVUIGDFDEDonDZW3xlun/eca86b5e5c002f873f85fb3aa39a0a46/sheila-burnford-the-incredible-journey.webp", desc: "Two dogs and a cat embark on a perilous 300-mile journey through the Canadian wilderness to find their beloved owners.", price: 230, },
//     { id: "5.4", mainid: "5", title: "The Exultant Ark – Jonathan Peter Balcombe", img: "https://static.vecteezy.com/system/resources/previews/030/178/569/large_2x/wallpaper-animals-the-forest-the-sun-the-animals-the-animals-the-animals-ai-generated-free-photo.jpg", desc: "A thought-provoking non-fiction book showcasing animals experiencing joy, play, and emotion — challenging human-centered views.", price: 230, },
//     { id: "5.5", mainid: "5", title: "The White Giraffe – Lauren St John", img: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/9d2cc67a-f6ba-4c98-89f8-b79f08230066.__CR0,0,300,300_PT0_SX300_V1___.png", desc: "After losing her parents, Martine moves to Africa, where she discovers a magical connection with a legendary white giraffe.", price: 230, },
//     { id: "5.6", mainid: "5", title: "A Sick Day for Amos McGee – Philip C. Stead", img: "https://www.heirloomartco.com/cdn/shop/products/IMG_2678.jpg?v=1607549389", desc: "When kind zookeeper Amos McGee falls ill, his animal friends visit him to return the love and care he’s always given them.", price: 230, },
//     { id: "5.7", mainid: "5", title: "Animal Homes – Ashwitha Jayakumar", img: "https://m.media-amazon.com/images/I/51xIP7d-OmL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "A delightful educational book for young readers exploring the unique and surprising homes animals build and live in.", price: 230, },
//     { id: "5.8", mainid: "5", title: "Migration: Incredible Animal Journeys – Mike Unwin", img: "https://ecsmedia.pl/c/16641801121416288-jpg-gallery.big-iext119655861.jpg", desc: "A visually stunning exploration of the epic journeys animals make across the planet — from whales to butterflies.", price: 230, },


//     { id: "6.1", mainid: "6", title: "Salt, Fat, Acid, Heat – Samin Nosrat", img: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,w_730/k%2FPhoto%2FLifestyle%2F2019-09-cookbook-club-salt-fat-acid-heat%2FSalt-Fat-Acid-Heat_125", desc: "A revolutionary cookbook that teaches cooking through the four essential elements — salt, fat, acid, and heat — so you can cook confidently without relying on recipes.", price: 230, },
//     { id: "6.2", mainid: "6", title: "The Food Lab: Better Home Cooking Through Science – J. Kenji López-Alt", img: "https://blog.thermoworks.com/wp-content/uploads/2015/10/food_lab_z_b-1.jpg", desc: "Explores the science of home cooking, helping you master techniques and understand the 'why' behind great dishes.", price: 230, },
//     { id: "6.3", mainid: "6", title: "Made in India: Recipes from an Indian Family Kitchen – Meera Sodha", img: "https://rootsandcook.com/wp-content/uploads/2022/11/Honest-Cookbook-reviews-Made-in-India-1-Edit-min.jpg", desc: "Over 130 easy and vibrant recipes celebrating authentic Indian home-cooked meals passed down through generations.", price: 230, },
//     { id: "6.4", mainid: "6", title: "Indian-ish: Recipes and Antics from a Modern American Family – Priya Krishna", img: "https://strataportland.com/cdn/shop/products/P1010040_a1529dd7-122d-4f96-82b5-d99cc7551deb_1080x.jpg?v=1662657768", desc: "A fun and modern cookbook blending Indian traditions with contemporary American flavors, full of personality and creativity.", price: 230, },
//     { id: "6.5", mainid: "6", title: "The Rangoon Sisters: Recipes from Our Burmese Family Kitchen – Amy & Emily Chung", img: "https://is1-ssl.mzstatic.com/image/thumb/Publication124/v4/47/2f/2b/472f2b60-5e6b-76e9-8ab8-919a11b1bc80/9781473573659.jpg/1200x630wz.png", desc: "A beautiful collection of Burmese family recipes bringing together authentic flavors and heartwarming stories.", price: 230, },
//     { id: "6.6", mainid: "6", title: "Tiffin: 500 Authentic Recipes Celebrating India’s Regional Cuisine – Sonal Ved", img: "https://m.media-amazon.com/images/I/81tkoYAzV2L._AC_UF1000,1000_QL80_.jpg", desc: "An extensive cookbook featuring 500 regional Indian recipes—from temple food to tribal dishes—showcasing India’s incredible culinary diversity.", price: 230, },
//     { id: "6.7", mainid: "6", title: "Gordon Ramsay’s Ultimate Fit Food – Gordon Ramsay", img: "https://static-ppimages.freetls.fastly.net/nielsens/9781444780789.jpg?canvas=600,600&fit=bounds&height=600&mode=max&width=600&404=default.jpg", desc: "Healthy yet delicious recipes categorized into 'Healthy', 'Energized', and 'Lean' meals by world-famous chef Gordon Ramsay.", price: 230, },
//     { id: "6.8", mainid: "6", title: "The Bacon Cookbook – James Villas", img: "https://m.media-amazon.com/images/I/71WWfY6eagL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "A flavorful collection of over 150 bacon-inspired recipes from around the world for true bacon lovers.", price: 230, },


//     { id: "7.1", mainid: "7", title: "The Republic – Plato", img: "https://www.planksip.org/content/images/2021/05/585260_Plato_The-Republic_112110.jpg", desc: "A foundational text of Western philosophy exploring justice, morality, and the ideal society.", price: 230, },
//     { id: "7.2", mainid: "7", title: "Nicomachean Ethics – Aristotle", img: "https://cdn.thecollector.com/wp-content/uploads/2024/03/what-are-the-nicomachean-ethics.jpg", desc: "Aristotle’s classic work on virtue, character, and how to live a good life.", price: 230, },
//     { id: "7.3", mainid: "7", title: "Meditations – Marcus Aurelius", img: "https://m.media-amazon.com/images/I/41qDBtsEloL._SL500_.jpg", desc: "Personal reflections by a Roman emperor on Stoic philosophy, duty, and resilience.", price: 230, },
//     { id: "7.4", mainid: "7", title: "The Problems of Philosophy – Bertrand Russell", img: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/d8/85/3d/d8853d61-0360-735c-cf8c-4225757b6846/9781998382460.png/1200x675wz.jpg", desc: "A clear and accessible introduction to core philosophical questions about knowledge and reality.", price: 230, },
//     { id: "7.5", mainid: "7", title: "A Theory of Justice – John Rawls", img: "https://webdiag547.blob.core.windows.net/live/images%2Fbooks%2F100490.jpg?sv=2020-04-08&st=2025-10-19T23%3A13%3A37Z&se=2030-10-19T23%3A18%3A37Z&sr=c&sp=r&sig=DRdx9ml5FKEY6SoJtyqsyXI9ZSU2OuHKQ%2BGSk43O5yE%3D", desc: "A modern classic proposing fairness and equality as the foundation of a just society.", price: 230, },
//     { id: "7.6", mainid: "7", title: "Beyond Good and Evil – Friedrich Nietzsche", img: "https://bluediarybooks.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-22-at-2.45.40-PM-450x415.jpeg", desc: "Nietzsche challenges traditional morality and urges the reader to create their own values.", price: 230, },
//     { id: "7.7", mainid: "7", title: "Philosophical Investigations – Ludwig Wittgenstein", img: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/fb/93/de/fb93de41-b505-7b93-25b0-c7dda3fe2d0b/9781004134380.jpg/1200x675wf.jpg", desc: "A groundbreaking work exploring language, meaning, and how we understand the world.", price: 230, },
//     { id: "7.8", mainid: "7", title: "The Story of Philosophy – Will Durant", img: "https://is1-ssl.mzstatic.com/image/thumb/Publication116/v4/8c/90/2a/8c902a11-0686-e6f0-ef64-5e3d679bcdde/b6fb5965-964c-4c3c-8b95-5571923b1df0_cover_image.jpg/1200x900wz.jpg", desc: "An engaging overview of major Western philosophers and their ideas, written for general readers.", price: 230, },


//     { id: "8.1", mainid:"8", title: "Rich Dad Poor Dad – Robert T. Kiyosaki", img: "https://icrrd.com/public/media/01-11-2020-083226richdad-poor-dad.jpg", desc: "A personal finance classic that contrasts two perspectives on money — one focused on earning and one on building wealth.", price: 230, },
//     { id: "8.2", mainid:"8", title: "The Intelligent Investor – Benjamin Graham", img: "https://5.imimg.com/data5/SELLER/Default/2023/3/EB/QY/ND/147952517/the-intelligent-investor-by-benjamin-graham-warren-buffett-.jpeg", desc: "The definitive guide to value investing, teaching patience, discipline, and long-term financial thinking.", price: 230, },
//     { id: "8.3", mainid:"8", title: "Principles of Corporate Finance – Richard A. Brealey & Stewart C. Myers", img: "https://m.media-amazon.com/images/I/51TYY78A8DL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "A comprehensive textbook on corporate finance, covering valuation, risk, capital structure, and strategic decision-making.", price: 230, },
//     { id: "8.4", mainid:"8", title: "Profit First – Mike Michalowicz", img: "https://hookagency.com/wp-content/uploads/2024/08/profit-first-summary-book-review.jpg", desc: "A business finance method that ensures profitability by prioritizing profit before expenses.", price: 230, },
//     { id: "8.5", mainid:"8", title: "The Wisdom of Finance – Mihir A. Desai", img: "https://static.getbookie.com/product/image/2022/12/full/1670341468-1890.44921875-00e289a5-350d-4cc7-b590-0005f9b14dc4.png", desc: "An engaging look at financial principles through the lens of literature, history, and philosophy.", price: 230, },
//     { id: "8.6", mainid:"8", title: "The Total Money Makeover – Dave Ramsey", img: "https://media.licdn.com/dms/image/v2/D4D12AQEVJ3WqvyMUTg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1675277324928?e=2147483647&v=beta&t=WWw2ezlWWld31HxroxpxdMwcGqcBYEKsqG5co6VfjSc", desc: "A step-by-step plan to get out of debt, build savings, and take control of your financial life.", price: 230, },
//     { id: "8.7", mainid:"8", title: "Too Big to Fail – Andrew Ross Sorkin", img: "https://fivebooks.com/book/too-big-fail-inside-story-how-wall-street-and-washington-fought-save-financial-system/shareimage.jpg", desc: "An inside account of the 2008 financial crisis, revealing how major institutions and governments responded to disaster.", price: 230, },
//     { id: "8.8", mainid:"8", title: "The Customer-Funded Business – John Mullins", img: "https://ke.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/47/6014523/1.jpg?3172", desc: "Shows how entrepreneurs can grow their ventures using customer revenue instead of relying on investors.", price: 230, }

//   ]

// function AllBooks() {
//   const navigate = useNavigate();
//   const [books, setBooks] = useState([]);

//   // Load all books
//   useEffect(() => {
//     setBooks(allBooksData);
//   }, []);

//   // Go to book detail
//   const handleBookClick = (book) => {
//     navigate(`/book/${book.id}`, { state: { book } });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
//       {/* Global Header */}
//       <Header />

//       <div className="container mx-auto px-6 py-12">
//         <motion.h1
//           className="text-4xl font-bold text-center mb-10 text-gray-800"
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           All Books
//         </motion.h1>

//         {/* Book Grid */}
//         <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//           {books.map((book, index) => (
//             <motion.div
//               key={book.id}
//               className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl cursor-pointer transition-all"
//               onClick={() => handleBookClick(book)}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: index * 0.1 }}
//             >
//               <img
//                 src={book.img}
//                 alt={book.title}
//                 className="w-full h-56 object-cover"
//               />
//               <div className="p-4 text-center">
//                 <h2 className="text-lg font-semibold text-gray-800">{book.title}</h2>
//                 <p className="text-gray-500 text-sm mt-1">{book.author}</p>
//                 <span className="inline-block mt-2 px-3 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
//                   {book.category}
//                 </span>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AllBooks;



// import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef, useEffect, useMemo } from "react";
import { LayoutGrid, List, Filter, Check, Plus, MinusCircle, Search as SearchIcon } from "lucide-react";
import { motion } from "framer-motion";
import Header from "../Layout/header.jsx"; // <-- Header now used
import { useDispatch, useSelector } from "react-redux";
import { addBook, removeBook } from "../Redux/issueBooksSlice.js";

// =================================================================
// ✅ CORRECT BOOK DATA (OBJECT)
// Using the structured object data from your BooksList component.
// This should ideally be in one shared file, but is kept here
// to match your original structure.
// =================================================================
export const allBooksData = {
    1: [
        { id: "1.1", mainid: "1", title: "To Kill a Mockingbird – Harper Lee", img: "https://d3525k1ryd2155.cloudfront.net/h/112/127/1081127112.0.x.4.jpg", desc: "A powerful novel about racial injustice and moral growth in the Deep South, seen through the eyes of a young girl.", price: 200, },
        { id: "1.2", mainid: "1", title: "1984 – George Orwell", img: "https://www.eourmart.com/cdn/shop/products/51OiP9ZQ1tL.jpg?v=1639834548&width=1445", desc: "A chilling vision of a totalitarian future where Big Brother watches everyone.", price: 300, },
        { id: "1.3", mainid: "1", title: "Harry Potter and the Sorcerer’s Stone — J.K. Rowling", img: "https://substackcdn.com/image/fetch/$s_!fxEI!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3317a341-8447-4104-a37a-88db2301f07b_2912x2096.png", desc: "An orphan discovers he’s a wizard and enters a world of magic, friendship, and destiny.", price: 250, },
        { id: "1.4", mainid: "1", title: "The Girl on the Train — Paula Hawkins", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTczZ1P8PeJxdj-SO01NWxh1HWux94QA-dAbw&s", desc: "A woman’s daily commute turns into a psychological thriller when she witnesses something shocking.", price: 100, },
        { id: "1.5", mainid: "1", title: "Train to Pakistan – Khushwant Singh", img: "https://www.esplanade.com/-/media/Esplanade/Images/Whats-On/festival-and-series/2024/kalaa-utsavam/train-to-pakistan-01.ashx", desc: "A moving portrayal of love and humanity amid the horrors of the Partition.", price: 450, },
        { id: "1.6", mainid: "1", title: "The White Tiger – Aravind Adiga", img: "https://images.squarespace-cdn.com/content/v1/6023b47e6c992a7aded9b1bd/2df6dd9f-6643-4a67-89d1-9af832b68c64/Book+cover+mock+up+the+white+tiger+novel+by+Aravind+Adiga+by+kiyary+do.jpg", desc: "A darkly comic story about an ambitious driver’s rise from poverty to wealth in modern India.", price: 220, },
        { id: "1.7", mainid: "1", title: "Five Point Someone – Chetan Bhagat", img: "https://ik.imagekit.io/shortpedia/Voices/wp-content/uploads/2021/05/five-points-of-someone.jpg", desc: "A humorous and emotional tale about three friends struggling through IIT life.", price: 130, },
        { id: "1.8", mainid: "1", title: "The Lord of the Rings – J.R.R. Tolkien", img: "https://compote.slate.com/images/c011d20f-dfa5-48d8-baa3-ecc93a57023f.jpg", desc: "An epic quest to destroy a powerful ring that could doom the world.", price: 230, }
    ],
    2: [
        { id: "2.1", mainid: "2", title: "The War That Saved My Life – Kimberly Brubaker Bradley", img: "https://images.penguinrandomhouse.com/cover/9780147510488", desc: "A disabled girl escapes her abusive home during WWII and discovers her own courage and freedom.", price: 230, },
        { id: "2.2", mainid: "2", title: "As Brave As You – Jason Reynolds", img: "https://m.media-amazon.com/images/I/817pEwSwkmL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "Two brothers from Brooklyn spend a summer in rural Virginia, learning about family, identity, and bravery.", price: 230, },
        { id: "2.3", mainid: "2", title: "She Persisted – Chelsea Clinton", img: "https://images.penguinrandomhouse.com/cover/9781524741723", desc: "A collection of inspiring stories of 13 American women who showed courage and perseverance.", price: 230, },
        { id: "2.4", mainid: "2", title: "She Persisted Around the World – Chelsea Clinton", img: "https://images.penguinrandomhouse.com/cover/9780525516996", desc: "Thirteen stories of women from around the world who changed history through bravery and determination.", price: 230, },
        { id: "2.5", mainid: "2", title: "Courage: Eight Portraits – Gordon Brown", img: "https://cheltenhamrarebooks.co.uk/cdn/shop/products/brown-gordon-courage-signed-612331.jpg?v=1619938564&width=600", desc: "Profiles of eight remarkable figures like Mandela and MLK, exploring the meaning of moral courage.", price: 230, },
        { id: "2.6", mainid: "2", title: "Why Courage Matters – John McCain & Mark Salter", img: "https://images.pangobooks.com/book_images/5heNRC71SKdOm0rbk7LjJp8EbdA2/1669494746982_5heNRC71SKdOm0rbk7LjJp8EbdA2?width=800&quality=85&crop=1%3A1", desc: "An inspiring look at what true courage means, featuring stories from history and McCain’s own life.", price: 230, },
        { id: "2.7", mainid: "2", title: "The Auschwitz Volunteer – Witold Pilecki", img: "https://m.media-amazon.com/images/I/61FtyUQwQHL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "The true story of a man who volunteered to enter Auschwitz to organize resistance and report on atrocities.", price: 230, },
        { id: "2.8", mainid: "2", title: "Igraine the Brave – Cornelia Funke", img: "https://asylumbookstore.com/cdn/shop/products/igraine-the-brave-paperback-by-cornelia-funke-811985.jpg?v=1697954448&width=1946", desc: "A fun fantasy tale of a young girl who dreams of becoming a knight and proves her bravery against invaders.", price: 230, }
    ],
    3: [
        { id: "3.1", mainid: "3", title: "A History of the Sikhs – Khushwant Singh", img: "https://kitabhut.in/cdn/shop/files/IMG20240521100627.jpg?v=1716280390", desc: "A two-volume masterpiece tracing Sikh history from Guru Nanak’s time to post-independence India, offering deep insights into Sikh identity and evolution.", price: 230, },
        { id: "3.2", mainid: "3", title: "The Sikh Religion: Its Gurus, Sacred Writings and Authors – Max Arthur Macauliffe", img: "https://m.media-amazon.com/images/I/61iK+OF8jrL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "A monumental six-volume work exploring the lives and teachings of the Sikh Gurus with historical detail and reverence.", price: 230, },
        { id: "3.3", mainid: "3", title: "Ranjit Singh: Maharaja of the Punjab - Khushwant Singh", img: "https://www.tallengestore.com/cdn/shop/products/AnEquestrianPortraitOfMaharajaRanjitSingh-VintageIndianMiniatureArtSikhPainting_74c0d1d8-1473-4d65-9118-8ae85ecde10b.jpg?v=1603354245", desc: "The book charts the life of Maharaja Ranjit Singh — “from being a petty chieftain to becoming the most powerful Indian ruler of his time. His empire extended from Tibet to the deserts of Sindh and from the Khyber Pass to the Sutlej.", price: 230, },
        { id: "3.4", mainid: "3", title: "The Sikh Gurus and the Sikh Religion – Harbans Singh", img: "https://sikhizm.com/wp-content/uploads/2023/02/The-Encyclopaedia-of-Sikhism-Vol.4.webp", desc: "An insightful overview of the lives, philosophies, and spiritual legacies of the ten Sikh Gurus.", price: 230, },
        { id: "3.5", mainid: "3", title: "The Evolution of the Sikh Community – W. H. McLeod", img: "https://m.media-amazon.com/images/I/41HK8HW21RL._AC_CR0%2C0%2C0%2C0_SY315_.jpg", desc: "A historical study of how the Sikh community developed its identity, institutions, and religious practices.", price: 230, },
        { id: "3.6", mainid: "3", title: "The Sikhs in History – Dr. Sangat Singh", img: "https://m.media-amazon.com/images/I/316K5-263QL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "Covers the political, social, and cultural evolution of Sikh society, with special focus on key historical turning points.", price: 230, },
        { id: "3.7", mainid: "3", title: "Guru Nanak: His Life and Teachings – Dr. Surinder Singh Kohli", img: "https://fatehnama.com/wp-content/uploads/2019/11/Guru-Nanak-dev-ji-by-Harshinder-Kaur.jpg", desc: "A detailed account of Guru Nanak Dev Ji’s life, travels, and spiritual message that shaped Sikh philosophy.", price: 230, },
        { id: "3.8", mainid: "3", title: "The Punjab Story – Edited by Khushwant Singh", img: "https://m.media-amazon.com/images/I/71JbWYhc34L._AC_UF1000,1000_QL80_.jpg", desc: "A collection of essays and personal accounts narrating Punjab’s turbulent modern history, including the 1947 Partition and 1984 events.", price: 230, }
    ],
    4: [
        { id: "4.1", mainid: "4", title: "Sapiens: A Brief History of Humankind – Yuval Noah Harari", img: "https://static-01.shop.com.mm/p/7b87021301ba936ccf5e34b7a1e43015.jpg", desc: "A sweeping exploration of human evolution and how biology and history have defined societies, cultures, and economies.", price: 230, },
        { id: "4.2", mainid: "4", title: "Guns, Germs, and Steel – Jared Diamond", img: "https://www.bookxcess.com/cdn/shop/products/2202cdb1e2ab452c8ae9a1b07463d401.thumbnail.0000000000_1500x.jpg?v=1679986000", desc: "An award-winning study of how geography, agriculture, and environment shaped civilizations’ destinies across history.", price: 230, },
        { id: "4.3", mainid: "4", title: "A People’s History of the United States – Howard Zinn", img: "https://is1-ssl.mzstatic.com/image/thumb/Publication19/v4/6a/c4/c5/6ac4c574-2865-1e26-1242-4b9682ae603f/mzm.happsmes.jpg/1200x675wz.jpg", desc: "A groundbreaking retelling of American history through the eyes of workers, women, and marginalized communities.", price: 230, },
        { id: "4.4", mainid: "4", title: "The Pursuit of Glory: Europe 1648–1815 – Tim Blanning", img: "https://images4.penguinrandomhouse.com/smedia/9780143113898", desc: "A fascinating chronicle of Europe’s transformation during a time of empires, revolutions, and enlightenment.", price: 230, },
        { id: "4.5", mainid: "4", title: "Postwar: A History of Europe Since 1945 – Tony Judt", img: "https://fivebooks.com/book/postwar-history-europe-1945-by-tony-judt/shareimage.jpg", desc:"A comprehensive narrative of Europe’s recovery, division, and reinvention after the devastation of World War II.", price: 230, },
        { id: "4.6", mainid: "4", title: "The Story of Civilization – Will Durant & Ariel Durant", img: "https://i.ebayimg.com/images/g/kkAAAOSwFcJmptfu/s-l400.jpg", desc: "A monumental 11-volume masterpiece tracing humanity’s philosophical, cultural, and political evolution.", price: 230, },
        { id: "4.7", mainid: "4", title: "The Language of History – Audrey Truschke", img: "https://akm-img-a-in.tosshub.com/indiatoday/images/story/202508/india-5-000-years-of-history-on-the-subcontinent-by-audrey-truschke--princeton-university-press-164827233-16x9_0.jpg?VersionId=IrFvnH_jIAM.Ywf9D0Yhy6d8CuKBwqdC&size=690:388", desc: "Explores Indo-Persian chronicles and Sanskrit traditions to reinterpret medieval Indian history.", price: 230, },
        { id: "4.8", mainid: "4", title: "The Spartans: An Epic History by Paul Cartledge", img: "https://img-cdn.heureka.group/v1/f21d2928-4bb9-4eca-8541-09632017e05a.jpg?width=400&height=400", desc: "A comprehensive and elegant history of Sparta, from about 480 to 360 BC, giving broad coverage of society, politics and culture.", price: 230, }
    ],
    5: [
        { id: "5.1", mainid: "5", title: "The Jungle Book – Rudyard Kipling", img: "https://shrihindpublications.in/wp-content/uploads/2025/05/Copy-of-THE-JUNGLE-BOOK.png", desc: "A timeless collection of stories about Mowgli, a boy raised by wolves, and his adventures among the animals of the jungle.", price: 230, },
        { id: "5.2", mainid: "5", title: "Tarka the Otter – Henry Williamson", img: "https://www.buyusedbooks.in/image/cache/books/new_model5/9780140366211-f-500x500.jpg", desc: "A beautifully written nature novel that follows the life, struggles, and triumphs of an otter in the wild English countryside.", price: 230, },
        { id: "5.3", mainid: "5", title: "The Incredible Journey – Sheila Burnford", img: "https://images.ctfassets.net/qpn1gztbusu2/PxVUIGDFDEDonDZW3xlun/eca86b5e5c002f873f85fb3aa39a0a46/sheila-burnford-the-incredible-journey.webp", desc: "Two dogs and a cat embark on a perilous 300-mile journey through the Canadian wilderness to find their beloved owners.", price: 230, },
        { id: "5.4", mainid: "5", title: "The Exultant Ark – Jonathan Peter Balcombe", img: "https://static.vecteezy.com/system/resources/previews/030/178/569/large_2x/wallpaper-animals-the-forest-the-sun-the-animals-the-animals-the-animals-ai-generated-free-photo.jpg", desc: "A thought-provoking non-fiction book showcasing animals experiencing joy, play, and emotion — challenging human-centered views.", price: 230, },
        { id: "5.5", mainid: "5", title: "The White Giraffe – Lauren St John", img: "https://m.media-amazon.com/images/S/aplus-media-library-service-media/9d2cc67a-f6ba-4c98-89f8-b79f08230066.__CR0,0,300,300_PT0_SX300_V1___.png", desc: "After losing her parents, Martine moves to Africa, where she discovers a magical connection with a legendary white giraffe.", price: 230, },
        { id: "5.6", mainid: "5", title: "A Sick Day for Amos McGee – Philip C. Stead", img: "https://www.heirloomartco.com/cdn/shop/products/IMG_2678.jpg?v=1607549389", desc: "When kind zookeeper Amos McGee falls ill, his animal friends visit him to return the love and care he’s always given them.", price: 230, },
        { id: "5.7", mainid: "5", title: "Animal Homes – Ashwitha Jayakumar", img: "https://m.media-amazon.com/images/I/51xIP7d-OmL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "A delightful educational book for young readers exploring the unique and surprising homes animals build and live in.", price: 230, },
        { id: "5.8", mainid: "5", title: "Migration: Incredible Animal Journeys – Mike Unwin", img: "https://ecsmedia.pl/c/16641801121416288-jpg-gallery.big-iext119655861.jpg", desc: "A visually stunning exploration of the epic journeys animals make across the planet — from whales to butterflies.", price: 230, }
    ],
    6: [
        { id: "6.1", mainid: "6", title: "Salt, Fat, Acid, Heat – Samin Nosrat", img: "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,w_730/k%2FPhoto%2FLifestyle%2F2019-09-cookbook-club-salt-fat-acid-heat%2FSalt-Fat-Acid-Heat_125", desc: "A revolutionary cookbook that teaches cooking through the four essential elements — salt, fat, acid, and heat — so you can cook confidently without relying on recipes.", price: 230, },
        { id: "6.2", mainid: "6", title: "The Food Lab: Better Home Cooking Through Science – J. Kenji López-Alt", img: "https://blog.thermoworks.com/wp-content/uploads/2015/10/food_lab_z_b-1.jpg", desc: "Explores the science of home cooking, helping you master techniques and understand the 'why' behind great dishes.", price: 230, },
        { id: "6.3", mainid: "6", title: "Made in India: Recipes from an Indian Family Kitchen – Meera Sodha", img: "https://rootsandcook.com/wp-content/uploads/2022/11/Honest-Cookbook-reviews-Made-in-India-1-Edit-min.jpg", desc: "Over 130 easy and vibrant recipes celebrating authentic Indian home-cooked meals passed down through generations.", price: 230, },
        { id: "6.4", mainid: "6", title: "Indian-ish: Recipes and Antics from a Modern American Family – Priya Krishna", img: "https://strataportland.com/cdn/shop/products/P1010040_a1529dd7-122d-4f96-82b5-d99cc7551deb_1080x.jpg?v=1662657768", desc: "A fun and modern cookbook blending Indian traditions with contemporary American flavors, full of personality and creativity.", price: 230, },
        { id: "6.5", mainid: "6", title: "The Rangoon Sisters: Recipes from Our Burmese Family Kitchen – Amy & Emily Chung", img: "https://is1-ssl.mzstatic.com/image/thumb/Publication124/v4/47/2f/2b/472f2b60-5e6b-76e9-8ab8-919a11b1bc80/9781473573659.jpg/1200x630wz.png", desc: "A beautiful collection of Burmese family recipes bringing together authentic flavors and heartwarming stories.", price: 230, },
        { id: "6.6", mainid: "6", title: "Tiffin: 500 Authentic Recipes Celebrating India’s Regional Cuisine – Sonal Ved", img: "https://images.indianexpress.com/2018/11/tiffin-759.jpg", price: 230, },
        { id: "6.7", mainid: "6", title: "Gordon Ramsay’s Ultimate Fit Food – Gordon Ramsay", img: "https://www.madrasshoppe.com/187239-large_default/gordon-ramsay-ultimate-fit-food-mouth-watering-recipes-to-fuel-you-for-life-ramsay-gordon.jpg", desc: "Healthy yet delicious recipes categorized into 'Healthy', 'Energized', and 'Lean' meals by world-famous chef Gordon Ramsay.", price: 230, },
        { id: "6.8", mainid: "6", title: "The Bacon Cookbook – James Villas", img: "https://m.media-amazon.com/images/I/71WWfY6eagL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "A flavorful collection of over 150 bacon-inspired recipes from around the world for true bacon lovers.", price: 230, }
    ],
    7: [
        { id: "7.1", mainid: "7", title: "The Republic – Plato", img: "https://www.planksip.org/content/images/2021/05/585260_Plato_The-Republic_112110.jpg", desc: "A foundational text of Western philosophy exploring justice, morality, and the ideal society.", price: 230, },
        { id: "7.2", mainid: "7", title: "Nicomachean Ethics – Aristotle", img: "https://cdn.thecollector.com/wp-content/uploads/2024/03/what-are-the-nicomachean-ethics.jpg", desc: "Aristotle’s classic work on virtue, character, and how to live a good life.", price: 230, },
        { id: "7.3", mainid: "7", title: "Meditations – Marcus Aurelius", img: "https://m.media-amazon.com/images/I/41qDBtsEloL._SL500_.jpg", desc: "Personal reflections by a Roman emperor on Stoic philosophy, duty, and resilience.", price: 230, },
        { id: "7.4", mainid: "7", title: "The Problems of Philosophy – Bertrand Russell", img: "https://is1-ssl.mzstatic.com/image/thumb/Publication221/v4/d8/85/3d/d8853d61-0360-735c-cf8c-4225757b6846/9781998382460.png/1200x675wz.jpg", desc: "A clear and accessible introduction to core philosophical questions about knowledge and reality.", price: 230, },
        { id: "7.5", mainid: "7", title: "A Theory of Justice – John Rawls", img: "https://webdiag547.blob.core.windows.net/live/images%2Fbooks%2F100490.jpg?sv=2020-04-08&st=2025-10-19T23%3A13%3A37Z&se=2030-10-19T23%3A18%3A37Z&sr=c&sp=r&sig=DRdx9ml5FKEY6SoJtyqsyXI9ZSU2OuHKQ%2BGSk43O5yE%3D", desc: "A modern classic proposing fairness and equality as the foundation of a just society.", price: 230, },
        { id: "7.6", mainid: "7", title: "Beyond Good and Evil – Friedrich Nietzsche", img: "https://bluediarybooks.com/wp-content/uploads/2025/06/WhatsApp-Image-2025-06-22-at-2.45.40-PM-450x415.jpeg", desc: "Nietzsche challenges traditional morality and urges the reader to create their own values.", price: 230, },
        { id: "7.7", mainid: "7", title: "Philosophical Investigations – Ludwig Wittgenstein", img: "https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/fb/93/de/fb93de41-b505-7b93-25b0-c7dda3fe2d0b/9781004134380.jpg/1200x675wf.jpg", desc: "A groundbreaking work exploring language, meaning, and how we understand the world.", price: 230, },
        { id: "7.8", mainid: "7", title: "The Story of Philosophy – Will Durant", img: "https://is1-ssl.mzstatic.com/image/thumb/Publication116/v4/8c/90/2a/8c902a11-0686-e6f0-ef64-5e3d679bcdde/b6fb5965-964c-4c3c-8b95-5571923b1df0_cover_image.jpg/1200x900wz.jpg", desc: "An engaging overview of major Western philosophers and their ideas, written for general readers.", price: 230, },
    ],
    8: [
        { id: "8.1", mainid: "8", title: "Rich Dad Poor Dad – Robert T. Kiyosaki", img: "https://icrrd.com/public/media/01-11-2020-083226richdad-poor-dad.jpg", desc: "A personal finance classic that contrasts two perspectives on money — one focused on earning and one on building wealth.", price: 230, },
        { id: "8.2", mainid: "8", title: "The Intelligent Investor – Benjamin Graham", img: "https://5.imimg.com/data5/SELLER/Default/2023/3/EB/QY/ND/147952517/the-intelligent-investor-by-benjamin-graham-warren-buffett-.jpeg", desc: "The definitive guide to value investing, teaching patience, discipline, and long-term financial thinking.", price: 230, },
        { id: "8.3", mainid: "8", title: "Principles of Corporate Finance – Richard A. Brealey & Stewart C. Myers", img: "https://m.media-amazon.com/images/I/51TYY78A8DL.jpg_BO30,255,255,255_UF900,850_SR1910,1000,0,C_QL100_.jpg", desc: "A comprehensive textbook on corporate finance, covering valuation, risk, capital structure, and strategic decision-making.", price: 230, },
        { id: "8.4", mainid: "8", title: "Profit First – Mike Michalowicz", img: "https://hookagency.com/wp-content/uploads/2024/08/profit-first-summary-book-review.jpg", desc: "A business finance method that ensures profitability by prioritizing profit before expenses.", price: 230, },
        { id: "8.5", mainid: "8", title: "The Wisdom of Finance – Mihir A. Desai", img: "https://static.getbookie.com/product/image/2022/12/full/1670341468-1890.44921875-00e289a5-350d-4cc7-b590-0005f9b14dc4.png", desc: "An engaging look at financial principles through the lens of literature, history, and philosophy.", price: 230, },
        { id: "8.6", mainid: "8", title: "The Total Money Makeover – Dave Ramsey", img: "https://media.licdn.com/dms/image/v2/D4D12AQEVJ3WqvyMUTg/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1675277324928?e=2147483647&v=beta&t=WWw2ezlWWld31HxroxpxdMwcGqcBYEKsqG5co6VfjSc", desc: "A step-by-step plan to get out of debt, build savings, and take control of your financial life.", price: 230, },
        { id: "8.7", mainid: "8", title: "Too Big to Fail – Andrew Ross Sorkin", img: "https://fivebooks.com/book/too-big-fail-inside-story-how-wall-street-and-washington-fought-save-financial-system/shareimage.jpg", desc: "An inside account of the 2008 financial crisis, revealing how major institutions and governments responded to disaster.", price: 230, },
        { id: "8.8", mainid: "8", title: "The Customer-Funded Business – John Mullins", img: "https://www.scalabl.com/bibliografia/img/portadas/042536-the-customer-funded-business-start-finance-or-grow-your-company-with-your-customers-cash.png", desc: "Shows how entrepreneurs can grow their ventures using customer revenue instead of relying on investors.", price: 230, }
    ],
};


function AllBooks({
  issueBooks: issueBooksFromProps = undefined,
  setIssueBooks: setIssueBooksFromProps = undefined,
}) {
  // ---------------- UI States ----------------
  const [viewMode, setViewMode] = useState("grid");
  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortAz, setSortAz] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  // ---------------- Redux Setup ----------------
  const dispatch = useDispatch();
  const reduxIssueBooks = useSelector((state) => state.issueBooks.books);

  // ---------------- Local fallback ----------------
  const [localIssueBooks, setLocalIssueBooks] = useState([]);
  const issueBooks =
    typeof issueBooksFromProps !== "undefined"
      ? issueBooksFromProps
      : reduxIssueBooks && Array.isArray(reduxIssueBooks)
      ? reduxIssueBooks
      : localIssueBooks;

  const setIssueBooks =
    typeof setIssueBooksFromProps === "function"
      ? setIssueBooksFromProps
      : setLocalIssueBooks;

  // ---------------- Refs ----------------
  const filterSectionRef = useRef(null);

  // ---------------- Flatten all books ----------------
  const books = useMemo(() => {
    if (!allBooksData || typeof allBooksData !== "object") return [];
    return Object.entries(allBooksData)
      .flatMap(([catId, list]) =>
        list.map((book) => ({ ...book, mainid: catId }))
      );
  }, []);

  // ---------------- Categories ----------------
  const categories = useMemo(() => {
    const keys = Object.keys(allBooksData || {});
    return ["all", ...keys];
  }, []);

  // ---------------- Filtering & Sorting ----------------
  const filteredBooks = useMemo(() => {
    if (!Array.isArray(books)) return [];
    const q = (search || "").trim().toLowerCase();

    let list = books.filter((book) => {
      const catMatch =
        selectedCategory === "all"
          ? true
          : String(book.mainid) === String(selectedCategory);

      const letterMatch = selectedLetter
        ? (book.title || "")
            .toLowerCase()
            .startsWith(selectedLetter.toLowerCase())
        : true;

      const searchMatch =
        q === "" ||
        (book.title || "").toLowerCase().includes(q) ||
        (book.desc || "").toLowerCase().includes(q);

      return catMatch && letterMatch && searchMatch;
    });

    if (sortAz) {
      list = list.slice().sort((a, b) => {
        const at = (a.title || "").toLowerCase();
        const bt = (b.title || "").toLowerCase();
        return at.localeCompare(bt);
      });
    }

    return list;
  }, [books, search, selectedLetter, selectedCategory, sortAz]);

  // ---------------- Add / Remove ----------------
  const handleAddBook = (book) => {
    if (!issueBooks.find((b) => b.id === book.id)) {
      dispatch(addBook(book));
      setIssueBooks([...issueBooks, book]);
    }
  };

  const handleRemoveBook = (book) => {
    dispatch(removeBook(book.id));
    setIssueBooks(issueBooks.filter((b) => b.id !== book.id));
  };

  const isAdded = (book) => !!issueBooks.find((b) => b.id === book.id);

  // ---------------- Category handler ----------------
  const handleCategoryClick = (catId) => {
    setSelectedCategory(catId);
  };

  // ---------------- Alphabet buttons ----------------
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    // ---------------- Render ----------------
    return (
        <div className="bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 min-h-screen pb-24 md:pb-15 mt-[-160px] md:mt-[-30px] px-6 ">
            <Header
                viewMode={viewMode}
                setViewMode={setViewMode}
                search={search}
                setSearch={setSearch}
                selectedLetter={selectedLetter}
                setSelectedLetter={setSelectedLetter}
                scrollToFilterRef={filterSectionRef}
                openPageFilter={() => setShowFilter(true)}
                issueBooks={issueBooks}
                setHeaderHeight={setHeaderHeight}
            />

            <div style={{ height: headerHeight ? headerHeight + 12 : 96 }} />

            <div className="max-w-7xl mx-auto px-">
                {/* Title and Toolbar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-800">All Books</h1>
                        <p className="text-sm text-gray-600 mt-1">
                            Browse the collection — use the search, A→Z or category filters.
                        </p>
                    </div>

                    {/* Toolbar */}
                    <div className="flex items-center gap-3">
                        {/* Categories */}
                        <div
                            ref={filterSectionRef}
                            className="hidden sm:flex items-center gap-2 bg-white/60 p-1 rounded-xl shadow-sm"
                        >
                            <button
                                onClick={() => handleCategoryClick("all")}
                                className={`px-3 py-1 rounded-lg text-sm font-medium ${selectedCategory === "all"
                                        ? "bg-amber-500 text-white shadow"
                                        : "bg-white text-amber-700 border border-amber-200 hover:bg-amber-50 cursor-pointer"
                                    }`}
                            >
                                All
                            </button>
                            {Object.keys(allBooksData).map((k) => (
                                <button
                                    key={k}
                                    onClick={() => handleCategoryClick(k)}
                                    className={`px-3 py-1 rounded-lg text-sm font-medium ${selectedCategory === k
                                            ? "bg-amber-500 text-white shadow"
                                            : "bg-white text-amber-700 border border-amber-200 hover:bg-amber-50 cursor-pointer"
                                        }`}
                                >
                                    Category {k}
                                </button>
                            ))}
                        </div>

                        {/* Sort */}
                        <button
                            onClick={() => setSortAz((s) => !s)}
                            className={`cursor-pointer px-3 py-2 rounded-lg text-sm font-medium ${sortAz
                                    ? "bg-amber-600 text-white shadow"
                                    : "bg-white text-amber-700 border border-amber-200 hover:bg-amber-50"
                                }`}
                        >
                            {sortAz ? "A → Z" : "Default"}
                        </button>

                        {/* View Mode */}
                        <div className="flex items-center gap-2 bg-white p-1 rounded-xl">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-2 rounded-lg ${viewMode === "grid"
                                        ? "bg-amber-600 text-white shadow"
                                        : "text-amber-600 cursor-pointer"
                                    }`}
                                aria-label="Grid view"
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-2 rounded-lg ${viewMode === "list"
                                        ? "bg-amber-600 text-white shadow"
                                        : "text-amber-600 cursor-pointer"
                                    }`}
                                aria-label="List view"
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* BOOK DISPLAY */}
                {Array.isArray(filteredBooks) && filteredBooks.length > 0 ? (
                    <div
                        className={`mt-2 ${viewMode === "grid"
                                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 "
                                : "space-y-4 "
                            }`}
                    >
                        {filteredBooks.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.18 }}
                                
                                className={`bg-white rounded-2xl shadow-md border border-amber-100 hover:shadow-xl transition-transform duration-300 ${viewMode === "grid"
                                        ? "flex flex-col"
                                        : "flex flex-col sm:flex-row items-center p-4 sm:p-5 hover:scale-1.1"
                                    }`}
                            >
                                {/* Grid view */}
                                {viewMode === "grid" ? (
                                    <>
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-full h-48 sm:h-56 object-cover rounded-t-2xl"
                                        />
                                        <div className="p-4 flex flex-col flex-1 justify-between">
                                            <h2 className="text-base sm:text-lg h-25 font-bold text-gray-800">
                                                {item.title}
                                            </h2>
                                            <p
                                                className="text-gray-600 text-sm mt-2 h-15 overflow-y-auto pr-2"
                                                style={{ maxHeight: 80 }}
                                            >
                                                {item.desc}
                                            </p>
                                            <div className="mt-3 flex items-center justify-between gap-3">
                                                <p className="text-amber-700 font-semibold text-lg">
                                                    ₹ {item.price}
                                                </p>
                                                <div className="flex-1 ml-3">
                                                    {isAdded(item) ? (
                                                        <div className="flex gap-2">
                                                            <button className="flex-1 py-2 rounded-xl flex items-center justify-center gap-2 text-white font-semibold w-20 px-2 bg-green-500 shadow">
                                                                <Check size={16} /> Added
                                                            </button>
                                                            <button
                                                                onClick={() =>
                                                                    handleRemoveBook(item)
                                                                }
                                                                className="flex-1 py-2 px-2 rounded-xl flex items-center justify-center gap-2 text-white font-semibold bg-red-500 hover:bg-red-600 shadow hover:scale-105 transition-transform cursor-pointer"
                                                            >
                                                              <MinusCircle size={16} />  Remove
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() =>
                                                                handleAddBook(item)
                                                            }
                                                            className="w-full py-2 rounded-xl flex items-center cursor-pointer justify-center gap-2 text-white font-semibold bg-amber-400 hover:bg-amber-500 shadow hover:scale-105 transition-transform"
                                                        >
                                                            <Plus size={16} /> Add
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    // List view
                                    <>
                                        <img
                                            src={item.img}
                                            alt={item.title}
                                            className="w-full sm:w-32 h-20 object-cover rounded-xl"
                                        />
                                        <div className="sm:ml-5 mt-3 sm:mt-0 flex-1 text-center sm:text-left">
                                            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                                                {item.title}
                                            </h2>
                                            <p className="text-gray-600 text-sm mt-1 max-h-10 overflow-y-auto pr-2">
                                                {item.desc}
                                            </p>
                                            <p className="text-amber-700 font-semibold text-lg mt-2">
                                                ₹ {item.price}
                                            </p>
                                        </div>
                                        <div className="ml-3 mt-3 sm:mt-0">
                                            {isAdded(item) ? (
                                                <div className="flex gap-2">
                                                    <button className="py-2 rounded-xl flex items-center px-3 justify-center gap-2 text-white font-semibold bg-green-500 shadow">
                                                        <Check size={16} /> Added
                                                    </button>
                                                    <button
                                                        onClick={() =>
                                                            handleRemoveBook(item)
                                                        }
                                                        className="py-2 rounded-xl flex items-center px-3 justify-center cursor-pointer gap-2 text-white font-semibold bg-red-500 hover:bg-red-600 shadow hover:scale-105 transition-transform"
                                                    >
                                                     <MinusCircle size={16} />   Remove
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    onClick={() => handleAddBook(item)}
                                                    className="py-2 rounded-xl flex items-center px-3 justify-center cursor-pointer gap-2 text-white font-semibold bg-amber-400 hover:bg-amber-500 shadow hover:scale-105 transition-transform"
                                                    // className="bg-amber-400 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-amber-500 shadow hover:scale-105 transition-transform"
                                                >
                                                <Plus size={16} />    Add
                                                </button>
                                            )}
                                        </div>
                                    </>
                                )}
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <p
                        className={`text-gray-500 text-center ${viewMode === "grid" ? "col-span-full" : ""
                            }`}
                    >
                        No books found.
                    </p>
                )}
            </div>
        </div>
    );
}

export default AllBooks;





// Renamed to AllBooks

// function AllBooks({
//     // The page may be called with these props from a parent.
//     issueBooks: issueBooksFromProps = undefined,
//     setIssueBooks: setIssueBooksFromProps = undefined,
// }) {
//     // ---------------- Local/shared UI state ----------------
//     const [viewMode, setViewMode] = useState("grid"); // grid | list
//     const [search, setSearch] = useState(""); // Owned here so Header input controls list
//     const [selectedLetter, setSelectedLetter] = useState("");
//     const [showFilter, setShowFilter] = useState(false);
//     const [headerHeight, setHeaderHeight] = useState(0);

//     // Category & sorting
//     const [selectedCategory, setSelectedCategory] = useState("all"); // 'all' or '1','2',...
//     const [sortAz, setSortAz] = useState(false); // false = default order, true = A → Z

    

//     // ---------------- Issue-books: use parent props if provided, otherwise local fallback ----------------
//     const [localIssueBooks, setLocalIssueBooks] = useState([]);
//     // Decide what to use for reading/writing issueBooks
//     const issueBooks = typeof issueBooksFromProps !== "undefined" ? issueBooksFromProps : localIssueBooks;
//     const setIssueBooks =
//         typeof setIssueBooksFromProps === "function" ? setIssueBooksFromProps : setLocalIssueBooks;

//     // ---------------- Refs ----------------
//     const filterSectionRef = useRef(null);

//     // ---------------- Books flattening ----------------
//     // Use memo with dependency on allBooksData in case you move it to a separate file
//     const books = useMemo(() => {
//         if (!allBooksData || typeof allBooksData !== "object") return [];
//         return Object.values(allBooksData).flat();
//     }, [/* no deps: allBooksData is static; keep empty if it's declared above */]);

//     // ---------------- Derived categories (auto) ----------------
//     const categories = useMemo(() => {
//         // Build an array of { id: "1", label: "Category 1" } or if you have names, replace labels accordingly.
//         const keys = Object.keys(allBooksData || {});
//         return ["all", ...keys];
//     }, []);

//     // ---------------- Filtering + search + sorting ----------------
//     const filteredBooks = useMemo(() => {
//         const q = (search || "").trim().toLowerCase();
//         let list = books.filter((book) => {
//             // Category match
//             const catMatch = selectedCategory === "all" ? true : String(book.mainid) === String(selectedCategory);
//             if (!catMatch) return false;

//             // Letter match
//             const letterMatch = selectedLetter
//                 ? (book.title || "").toLowerCase().startsWith(selectedLetter.toLowerCase())
//                 : true;
//             if (!letterMatch) return false;

//             // Search match across title & desc
//             const searchMatch =
//                 q === "" ||
//                 (book.title || "").toLowerCase().includes(q) ||
//                 (book.desc || "").toLowerCase().includes(q);

//             return searchMatch;
//         });

//         if (sortAz) {
//             list = list.slice().sort((a, b) => {
//                 const at = (a.title || "").toLowerCase();
//                 const bt = (b.title || "").toLowerCase();
//                 return at < bt ? -1 : at > bt ? 1 : 0;
//             });
//         }

//         return list;
//     }, [books, search, selectedLetter, selectedCategory, sortAz]);

//     // ---------------- Scroll behaviour for sticky UI (small UX polish) ----------------
//     useEffect(() => {
//         const onScroll = () => {
//             // example: do nothing for now; kept for future stick buttons behavior if needed
//         };
//         window.addEventListener("scroll", onScroll);
//         return () => window.removeEventListener("scroll", onScroll);
//     }, []);

//     // ---------------- Add / Remove book helpers ----------------
//     const handleAddBook = (book) => {
//         if (!issueBooks.find((b) => b.id === book.id)) {
//             setIssueBooks([...issueBooks, book]);
//         }
//     };

//     const handleRemoveBook = (book) => {
//         setIssueBooks(issueBooks.filter((b) => b.id !== book.id));
//     };

//     const isAdded = (book) => !!issueBooks.find((b) => b.id === book.id);

//     // ---------------- small helpers ----------------
//     const handleCategoryClick = (catId) => {
//         setSelectedCategory(catId);
//     };

//     // ---------------- Render ----------------
//     return (
//         <div className="bg-gradient-to-br from-amber-50 via-orange-100 to-amber-200 min-h-screen pb-12 mt-[-30px]">
//             {/* Header: pass shared state and handlers */}
//             <Header
//                 viewMode={viewMode}
//                 setViewMode={setViewMode}
//                 search={search}
//                 setSearch={setSearch}
//                 selectedLetter={selectedLetter}
//                 setSelectedLetter={setSelectedLetter}
//                 scrollToFilterRef={filterSectionRef}
//                 openPageFilter={() => setShowFilter(true)}
//                 issueBooks={issueBooks}
//                 setHeaderHeight={setHeaderHeight}
//             />

//             {/* spacer for fixed header */}
//             <div style={{ height: headerHeight ? headerHeight + 12 : 96 }} />

//             <div className="max-w-7xl mx-auto px-4 sm:px-8">
//                 {/* Title + toolbar */}
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
//                     <div>
//                         <h1 className="text-4xl font-bold text-gray-800">All Books</h1>
//                         <p className="text-sm text-gray-600 mt-1">
//                             Browse the collection — use the search, A→Z or category filters.
//                         </p>
//                     </div>

//                     {/* Toolbar */}
//                     <div className="flex items-center gap-3">
//                         {/* Category pills */}
//                         <div ref={filterSectionRef} className="hidden sm:flex items-center gap-2 bg-white/60 p-1 rounded-xl shadow-sm">
//                             <button
//                                 onClick={() => handleCategoryClick("all")}
//                                 className={` px-3 py-1 rounded-lg text-sm font-medium ${selectedCategory === "all" ? "bg-amber-500  text-white shadow" : "bg-white text-amber-700 border border-amber-200 hover:bg-amber-50 cursor-pointer"}`}
//                             >
//                                 All
//                             </button>
//                             {Object.keys(allBooksData).map((k) => (
//                                 <button
//                                     key={k}
//                                     onClick={() => handleCategoryClick(k)}
//                                     className={`px-3 py-1 rounded-lg text-sm font-medium ${selectedCategory === k ? "bg-amber-500 text-white shadow" : "bg-white text-amber-700 border border-amber-200 hover:bg-amber-50 cursor-pointer"}`}
//                                 >
//                                     Category {k}
//                                 </button>
//                             ))}
//                         </div>

//                         {/* Sort A -> Z */}
//                         <button
//                             onClick={() => setSortAz((s) => !s)}
//                             className={`cursor-pointer px-3 py-2 rounded-lg text-sm font-medium ${sortAz ? "bg-amber-600 text-white shadow" : "bg-white text-amber-700 border border-amber-200 hover:bg-amber-50"}`}
//                         >
//                             {sortAz ? "A → Z" : "Default"}
//                         </button>

//                         {/* View toggle (redundant with header but handy here too) */}
//                         <div className="flex items-center gap-2 bg-white p-1 rounded-xl">
//                             <button
//                                 onClick={() => setViewMode("grid")}
//                                 className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-amber-600 text-white shadow" : "text-amber-600 cursor-pointer "}`}
//                                 aria-label="Grid view"
//                             >
//                                 <LayoutGrid size={18} />
//                             </button>
//                             <button
//                                 onClick={() => setViewMode("list")}
//                                 className={`p-2 rounded-lg ${viewMode === "list" ? "bg-amber-600 text-white shadow" : "text-amber-600 cursor-pointer"}`}
//                                 aria-label="List view"
//                             >
//                                 <List size={18} />
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* BOOK DISPLAY */}
//                 {filteredBooks.length > 0 ? (
//                     <div className={`mt-2 ${viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-8" : "space-y-4 px-4 sm:px-8"}`}>
//                         {filteredBooks.map((item) => (
//                             <motion.div
//                                 key={item.id}
//                                 initial={{ opacity: 0, y: 6 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ duration: 0.18 }}
//                                 className={`bg-white rounded-2xl shadow-md border border-amber-100 hover:shadow-xl transition-transform duration-300 ${viewMode === "grid" ? "flex flex-col" : "flex flex-col sm:flex-row items-center p-4 sm:p-5 hover:scale-[1.01]"}`}
//                             >
//                                 {/* Grid view structure */}
//                                 {viewMode === "grid" ? (
//                                     <>
//                                         <img src={item.img} alt={item.title} className="w-full h-48 sm:h-56 object-cover rounded-t-2xl" />
//                                         <div className="p-4 flex flex-col flex-1 justify-between">
//                                             <h2 className="text-base sm:text-lg h-20 font-bold text-gray-800">{item.title}</h2>
//                                             <p className="text-gray-600 text-sm mt-2 h-15 overflow-y-auto pr-2" style={{ maxHeight: 80 }}>{item.desc}</p>
//                                             <div className="mt-3 flex items-center justify-between gap-3">
//                                                 <p className="text-amber-700 font-semibold text-lg">₹ {item.price}</p>
//                                                 <div className="flex-1 ml-3">
//                                                     {isAdded(item) ? (
//                                                         <div className="flex gap-2">
//                                                             <button className="flex-1 py-2 rounded-xl flex items-center justify-center gap-2 text-white font-semibold bg-green-500 shadow"><Check size={16} /> Added</button>
//                                                             <button onClick={() => handleRemoveBook(item)} className="flex-1 py-2 rounded-xl flex items-center justify-center gap-2 text-white font-semibold bg-red-500 hover:bg-red-600 shadow hover:scale-105 transition-transform cursor-pointer">Remove</button>
//                                                         </div>
//                                                     ) : (
//                                                         <button onClick={() => handleAddBook(item)} className="w-full py-2 rounded-xl flex items-center cursor-pointer justify-center gap-2 text-white font-semibold bg-amber-400 hover:bg-amber-500 shadow hover:scale-105 transition-transform"><Plus size={16} /> Add</button>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </>
//                                 ) : (
//                                     // List view structure
//                                     <>
//                                         <img src={item.img} alt={item.title} className="w-full sm:w-32 h-20 object-cover rounded-xl" />
//                                         <div className="sm:ml-5 mt-3 sm:mt-0 flex-1 text-center sm:text-left">
//                                             <h2 className="text-lg sm:text-xl font-bold text-gray-800">{item.title}</h2>
//                                             <p className="text-gray-600 text-sm mt-1 max-h-10 overflow-y-auto pr-2">{item.desc}</p>
//                                             <p className="text-amber-700 font-semibold text-lg mt-2">₹ {item.price}</p>
//                                         </div>
//                                         <div className="ml-3 mt-3 sm:mt-0">
//                                             {isAdded(item) ? (
//                                                 <div className="flex gap-2">
//                                                     <button className="py-2 rounded-xl flex items-center px-3 justify-center gap-2 text-white font-semibold bg-green-500 shadow"><Check size={16} /> Added</button>
//                                                     <button onClick={() => handleRemoveBook(item)} className="py-2 rounded-xl flex items-center px-3 justify-center cursor-pointer gap-2 text-white font-semibold bg-red-500 hover:bg-red-600 shadow hover:scale-105 transition-transform">Remove</button>
//                                                 </div>
//                                             ) : (
//                                                 <button onClick={() => handleAddBook(item)} className="bg-amber-400 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-amber-500 shadow hover:scale-105 transition-transform">Add</button>
//                                             )}
//                                         </div>
//                                     </>
//                                 )}
//                             </motion.div>
//                         ))}
//                     </div>
//                 ) : (
//                     <p className={`text-gray-500 text-center ${viewMode === "grid" ? "col-span-full" : ""}`}>No books found.</p>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default AllBooks;
