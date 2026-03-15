import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CategoryBar } from './components/CategoryBar';
import { ProductCard } from './components/ProductCard';
import { CreatorHub } from './components/CreatorHub';
import { RequestSystem } from './components/RequestSystem';
import { Profile } from './components/Profile';
import { Chat } from './components/Chat';
import { Login } from './components/Login';
import { KujaKwako } from './components/KujaKwako';
import { FirebaseProvider, useFirebase } from './contexts/FirebaseContext';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDocFromServer, collection, getDocs, query, limit, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { Search } from 'lucide-react';
import { db } from './firebase';

// Error Boundary Component
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center space-y-4 bg-stone-50">
          <h1 className="text-2xl font-black text-stone-800">Samahani, kuna tatizo limetokea.</h1>
          <p className="text-stone-500 text-sm max-w-xs mx-auto">Tunaomba radhi kwa usumbufu huu. Tafadhali jaribu tena baadae.</p>
          <pre className="text-[10px] text-stone-400 bg-white p-4 rounded-xl border border-stone-200 overflow-auto max-w-full">
            {JSON.stringify(this.state.error, null, 2)}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-orange-600 text-white rounded-2xl font-bold text-sm"
          >
            Jaribu Tena
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, 'products'), limit(10));
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="space-y-6 pb-8">
      {/* Hero Section */}
      <section className="px-4 pt-4">
        <div className="relative h-48 rounded-[2rem] overflow-hidden bg-orange-600 flex items-center px-8">
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }} />
          <div className="relative z-10 space-y-2 max-w-[60%]">
            <h2 className="text-3xl font-black text-white leading-tight">Kutoka Kwangu Kuja Kwako</h2>
            <p className="text-orange-100 text-xs font-medium">Ungana na wabunifu na wafanyabiashara moja kwa moja.</p>
            <button className="bg-white text-orange-600 px-4 py-2 rounded-full text-xs font-bold mt-2 shadow-lg">Anza Sasa</button>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] w-48 h-48 bg-orange-500 rounded-full blur-3xl opacity-50" />
        </div>
      </section>

      {/* Search & Categories */}
      <div className="sticky top-[60px] z-40 bg-stone-50/80 backdrop-blur-md py-2 space-y-4">
        <div className="px-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input 
              type="text" 
              placeholder="Tafuta bidhaa, wasanii, au huduma..." 
              className="w-full bg-white border border-stone-200 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
            />
          </div>
        </div>
        <CategoryBar activeCategory={activeCategory} onSelect={setActiveCategory} />
      </div>

      {/* Featured Products */}
      <section className="px-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-black text-stone-800 tracking-tight">Kutoka Kwangu</h2>
          <button className="text-orange-600 text-sm font-bold">Ona Zote</button>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="aspect-square bg-stone-200 animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <ProductCard 
                key={product.id}
                title={product.name}
                price={product.price}
                image={product.image}
                sellerName={product.sellerName}
                sellerImage={`https://picsum.photos/seed/${product.sellerUid}/100/100`}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-[2rem] border border-dashed border-stone-200">
            <p className="text-stone-400 text-sm">Hakuna bidhaa bado.</p>
          </div>
        )}
      </section>
    </div>
  );
};

const MessagesList = ({ onSelectChat }: { onSelectChat: () => void }) => (
  <div className="p-4 space-y-4">
    <h2 className="text-2xl font-black text-stone-800">Ujumbe</h2>
    <div className="space-y-1">
      {[1, 2, 3, 4].map((i) => (
        <button 
          key={i} 
          onClick={onSelectChat}
          className="w-full flex items-center gap-4 p-4 hover:bg-stone-50 transition-colors rounded-2xl"
        >
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-stone-200 overflow-hidden">
              <img src={`https://picsum.photos/seed/user_${i}/100/100`} alt="User" referrerPolicy="no-referrer" />
            </div>
            {i === 1 && <div className="absolute top-0 right-0 w-4 h-4 bg-orange-600 border-2 border-white rounded-full" />}
          </div>
          <div className="flex-1 text-left">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-stone-800">Juma Hamisi {i}</h3>
              <span className="text-[10px] text-stone-400">10:30 AM</span>
            </div>
            <p className="text-xs text-stone-500 line-clamp-1">Je, hii kanzu bado ipo? Nahitaji kuiona...</p>
          </div>
        </button>
      ))}
    </div>
  </div>
);

const AppContent = () => {
  const { user, loading, auth } = useFirebase();
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    async function testConnection() {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration.");
        }
      }
    }
    testConnection();
  }, []);

  useEffect(() => {
    if (user) {
      const ensureUserProfile = async () => {
        try {
          const userRef = doc(db, 'users', user.uid);
          const userSnap = await getDoc(userRef);
          if (!userSnap.exists()) {
            await setDoc(userRef, {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              photoURL: user.photoURL,
              role: 'user',
              createdAt: serverTimestamp()
            });
          }
        } catch (error) {
          console.error("Error ensuring user profile:", error);
        }
      };
      ensureUserProfile();
    }
  }, [user]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-4xl font-black italic text-orange-600 animate-pulse">KUKWA</h1>
          <div className="w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<CreatorHub />} />
          <Route path="/kuja-kwako" element={<KujaKwako />} />
          <Route path="/requests" element={<RequestSystem />} />
          <Route path="/messages" element={
            isChatOpen ? <Chat onBack={() => setIsChatOpen(false)} /> : <MessagesList onSelectChat={() => setIsChatOpen(true)} />
          } />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default function App() {
  return (
    <ErrorBoundary>
      <FirebaseProvider>
        <AppContent />
      </FirebaseProvider>
    </ErrorBoundary>
  );
}
