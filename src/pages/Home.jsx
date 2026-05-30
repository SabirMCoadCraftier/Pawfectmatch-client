import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import PetCard from '../components/PetCard';
import LoadingSpinner from '../components/LoadingSpinner';
import {
  FaPaw,
  FaHeart,
  FaHome,
  FaShieldAlt,
  FaHandHoldingHeart,
  FaSmile,
  FaQuoteLeft,
  FaArrowRight,
  FaSyringe,
  FaBone,
  FaBath,
  FaDog,
  FaCat,
  FaCode,
  FaExternalLinkAlt,
} from 'react-icons/fa';

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const Home = () => {
  const { data: featuredPets, isLoading } = useQuery({
    queryKey: ['featuredPets'],
    queryFn: () =>
      axiosInstance.get('/api/pets/featured').then((res) => res.data),
  });

  const benefits = [
    {
      icon: <FaHeart className="text-3xl text-pink-500" />,
      title: 'Unconditional Love',
      desc: 'Pets give endless affection and companionship that brightens every day.',
    },
    {
      icon: <FaShieldAlt className="text-3xl text-blue-500" />,
      title: 'Save a Life',
      desc: 'Give a second chance to an animal in need. Adoption saves lives.',
    },
    {
      icon: <FaSmile className="text-3xl text-green-500" />,
      title: 'Improve Health',
      desc: 'Pet owners often have lower blood pressure, less stress, and more exercise.',
    },
    {
      icon: <FaHome className="text-3xl text-purple-500" />,
      title: 'Complete Your Home',
      desc: 'A pet turns a house into a warm, loving home filled with joy.',
    },
  ];

  const tips = [
    {
      icon: <FaSyringe />,
      title: 'Vaccinations First',
      desc: 'Always keep your pet up-to-date on vaccinations and vet checkups.',
    },
    {
      icon: <FaBone />,
      title: 'Proper Nutrition',
      desc: 'Feed your pet a balanced diet appropriate for their age, size, and breed.',
    },
    {
      icon: <FaBath />,
      title: 'Regular Grooming',
      desc: 'Brush, bathe, and groom your pet regularly to keep them healthy and happy.',
    },
    {
      icon: <FaDog />,
      title: 'Exercise Daily',
      desc: 'Provide at least 30 minutes of exercise daily for a healthy, happy pet.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Adopted Max, a Golden Retriever',
      image: 'https://i.pravatar.cc/100?img=1',
      quote:
        'Adopting Max from PawfectMatch was the best decision I ever made. He brought so much joy into our home. The process was smooth and the team was incredibly supportive throughout.',
    },
    {
      name: 'Michael Chen',
      role: 'Adopted Luna, a Persian Cat',
      image: 'https://i.pravatar.cc/100?img=3',
      quote:
        'I was nervous about adopting at first, but the team guided me through every step. Luna has been my companion for 2 years now and I cant imagine life without her.',
    },
    {
      name: 'Emily Rodriguez',
      role: 'Adopted Rocky, a Beagle',
      image: 'https://i.pravatar.cc/100?img=5',
      quote:
        'Rocky was rescued and needed a loving home. PawfectMatch made sure we were a perfect match. The adoption process was transparent, ethical, and very professional.',
    },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-pink-50 via-white to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-full text-sm font-medium">
                <FaPaw /> Welcome to PawfectMatch
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
                <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 bg-clip-text text-transparent">
                  Find Your
                </span>
                <br />
                <span className="text-gray-900 dark:text-white">Perfect Companion</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                Give a loving home to a pet in need. Browse hundreds of adorable
                pets waiting for their forever families.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/pets"
                  className="btn bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 px-8 py-3 h-auto rounded-full text-lg hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/25"
                >
                  <FaHeart className="mr-2" /> Browse Pets
                </Link>
                <Link
                  to="/add-pet"
                  className="btn btn-outline border-2 border-gray-300 dark:border-gray-600 px-8 py-3 h-auto rounded-full text-lg hover:bg-pink-50 dark:hover:bg-gray-800"
                >
                  List a Pet
                </Link>
              </div>
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">500+</span>
                  <p className="text-sm text-gray-500">Pets Adopted</p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">98%</span>
                  <p className="text-sm text-gray-500">Happy Matches</p>
                </div>
                <div>
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">50+</span>
                  <p className="text-sm text-gray-500">Partner Shelters</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative w-full h-[500px]">
                <img
                  src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600"
                  alt="Happy pets"
                  className="rounded-2xl shadow-2xl object-cover w-full h-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <FaPaw className="text-2xl text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">New Pets Added</p>
                      <p className="text-xs text-gray-500">Updated daily</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Pets */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
              <FaPaw /> Featured Pets
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Lovely Pets
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              These wonderful pets are looking for their forever homes. Could you be the one?
            </p>
          </motion.div>

          {isLoading ? (
            <div className="flex justify-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPets?.map((pet, index) => (
                <PetCard key={pet._id} pet={pet} index={index} />
              ))}
            </div>
          )}

          <motion.div {...fadeInUp} className="text-center mt-12">
            <Link
              to="/pets"
              className="btn bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 px-8 rounded-full hover:from-pink-600 hover:to-rose-600"
            >
              View All Pets <FaArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* NEW SECTION: Crazy Adventures Partner */}
      <section className="py-20 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-pink-50/50 to-rose-50/50 dark:from-gray-900 dark:to-gray-900 shadow-xl border border-pink-100/50 dark:border-gray-700"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-10 flex items-center gap-3 text-gray-900 dark:text-white">
              Ready for an Unforgettable Journey Together? <FaPaw className="text-pink-500 animate-bounce" />
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-white dark:bg-gray-800 p-6 md:p-8 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700">
              <div className="overflow-hidden rounded-xl bg-gradient-to-tr from-pink-200 via-rose-300 to-blue-200 p-1.5 max-w-sm mx-auto md:max-w-full">
                <img 
                  src="https://images.unsplash.com/photo-1534361960057-19889db9621e?w=600" 
                  alt="Goofy Dog with sunglasses" 
                  className="w-full h-72 md:h-96 object-cover rounded-lg shadow-sm"
                />
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500 dark:from-pink-400 dark:to-rose-400">
                  I'm Fluffy, Funny, and Ready to Turn Your Life Upside Down!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base md:text-lg">
                  Hi hooman! Yeah, you! Need someone to interrupt Zoom meetings, 
                  steal your snacks, and warm your heart all at once? Adopt me, and 
                  let's make life paw-some together!
                </p>
                <div className="pt-2">
                  <Link
                    to="/pets"
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold py-3.5 px-8 rounded-full shadow-lg shadow-pink-500/25 hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Adopt This Goofy Floof! <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* BRANDING SECTION: Meet The Developer */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 border-t border-b border-gray-100 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-white dark:bg-slate-900/60 p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200/60 dark:border-slate-800 backdrop-blur-sm"
          >
            <div className="md:col-span-8 space-y-4 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-pink-500/10 to-rose-500/10 dark:from-pink-500/20 dark:to-rose-500/20 text-pink-600 dark:text-pink-400 rounded-lg text-xs font-bold uppercase tracking-wider mx-auto md:mx-0">
                <FaCode /> Behind the Architecture
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white">
                Looking for a Full-Stack Web Solution?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl text-sm md:text-base">
                This platform is engineered by <span className="font-semibold text-slate-800 dark:text-slate-200">Sabir Mahmud</span>. I build robust, production-ready applications with highly scalable architectures and polished, user-centric interactive interfaces.
              </p>
            </div>
            
            <div className="md:col-span-4 flex justify-center md:justify-end w-full">
              <motion.a 
                href="https://my-personal-portfolio-five-woad.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileActive={{ scale: 0.98 }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-pink-500 dark:to-rose-500 text-white font-bold py-4 px-7 rounded-2xl shadow-lg transition-all duration-300 group"
              >
                Visit My Portfolio
                <FaExternalLinkAlt size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Adopt Section */}
      <section className="py-20 bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full text-sm font-medium mb-4">
              <FaHandHoldingHeart /> Why Adopt?
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Adoption?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Adoption is not just about giving a pet a home — it's about gaining a family member.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="card bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-5">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-sm font-medium mb-4">
              <FaQuoteLeft /> Success Stories
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Happy Tails & Happy Hearts
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="card bg-gray-50 dark:bg-gray-700 p-8 rounded-2xl relative"
              >
                <FaQuoteLeft className="text-3xl text-pink-200 dark:text-pink-800 absolute top-6 left-6" />
                <div className="relative z-10">
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 italic">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{t.name}</h4>
                      <p className="text-sm text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pet Care Tips */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
              <FaBone /> Pet Care Tips
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              How to Care for Your Pet
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tips.map((tip, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="card bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-white text-2xl mx-auto mb-4">
                  {tip.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{tip.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Section 1 - Stats */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-rose-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { num: '500+', label: 'Pets Adopted', icon: <FaPaw /> },
              { num: '98%', label: 'Success Rate', icon: <FaHeart /> },
              { num: '50+', label: 'Shelters', icon: <FaHome /> },
              { num: '1000+', label: 'Happy Families', icon: <FaSmile /> },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl mb-2 flex justify-center">{stat.icon}</div>
                <div className="text-4xl font-extrabold mb-1">{stat.num}</div>
                <div className="text-pink-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra Section 2 - CTA */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center mx-auto mb-6">
              <FaCat className="text-4xl text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Find Your New Best Friend?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
              Every pet deserves a loving home. Start your adoption journey today
              and make a difference in a furry friend's life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/pets"
                className="btn bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 px-10 py-3 h-auto rounded-full text-lg hover:from-pink-600 hover:to-rose-600 shadow-lg shadow-pink-500/25"
              >
                <FaHeart className="mr-2" /> Start Browsing
              </Link>
              <Link
                to="/register"
                className="btn btn-outline border-2 border-gray-300 dark:border-gray-600 px-10 py-3 h-auto rounded-full text-lg"
              >
                Create Account
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;