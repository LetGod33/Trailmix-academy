import React, { useState, useEffect } from "react";
import {
  Heart, Flame, Gem, Lock, Check, X, Star, Sparkles,
  Calculator, FlaskConical, Landmark, Globe2, ChevronLeft, RotateCcw, Loader2, Mail, LogOut
} from "lucide-react";
import { supabase } from "./supabaseClient";

const WORLDS = [
  {
    id: "math", name: "Numeria", tagline: "Math Kingdom", icon: Calculator,
    color: "#12B8A6", dark: "#0D8F80", light: "#D7F5F0",
    nodes: [
      { title: "Counting & Addition", questions: [
        { q: "7 + 8 = ?", options: ["13", "15", "16", "14"], correct: 1 },
        { q: "What comes next: 2, 4, 6, 8, ?", options: ["9", "10", "12", "11"], correct: 1 },
        { q: "12 + 9 = ?", options: ["20", "21", "22", "19"], correct: 1 },
      ]},
      { title: "Subtraction Safari", questions: [
        { q: "15 − 6 = ?", options: ["9", "8", "10", "7"], correct: 0 },
        { q: "30 − 12 = ?", options: ["16", "18", "17", "19"], correct: 1 },
        { q: "50 − 25 = ?", options: ["20", "24", "25", "26"], correct: 2 },
      ]},
      { title: "Multiplication Jungle", questions: [
        { q: "6 × 7 = ?", options: ["42", "36", "48", "40"], correct: 0 },
        { q: "9 × 8 = ?", options: ["63", "72", "81", "64"], correct: 1 },
        { q: "12 × 5 = ?", options: ["50", "55", "60", "65"], correct: 2 },
      ]},
      { title: "Division Docks", questions: [
        { q: "36 ÷ 6 = ?", options: ["5", "6", "7", "8"], correct: 1 },
        { q: "81 ÷ 9 = ?", options: ["8", "9", "10", "11"], correct: 1 },
        { q: "100 ÷ 4 = ?", options: ["20", "25", "30", "24"], correct: 1 },
      ]},
      { title: "Fraction Falls", questions: [
        { q: "Which fraction is bigger?", options: ["1/2", "1/4", "Equal", "Can't tell"], correct: 0 },
        { q: "1/2 + 1/4 = ?", options: ["2/6", "3/4", "1/6", "2/4"], correct: 1 },
        { q: "3/6 simplified is?", options: ["1/3", "2/3", "1/2", "3/1"], correct: 2 },
      ]},
      { title: "Decimal Dunes", questions: [
        { q: "0.5 is the same as?", options: ["1/5", "1/2", "5", "1/4"], correct: 1 },
        { q: "1.25 + 0.5 = ?", options: ["1.30", "1.75", "1.50", "2.00"], correct: 1 },
        { q: "Which is largest?", options: ["0.3", "0.09", "0.25", "0.199"], correct: 0 },
      ]},
      { title: "Geometry Grove", questions: [
        { q: "How many sides does a hexagon have?", options: ["5", "6", "7", "8"], correct: 1 },
        { q: "A right angle measures?", options: ["45°", "90°", "180°", "360°"], correct: 1 },
        { q: "A triangle has how many angles?", options: ["2", "3", "4", "5"], correct: 1 },
      ]},
      { title: "Percent Peak", questions: [
        { q: "50% of 20 is?", options: ["5", "10", "15", "20"], correct: 1 },
        { q: "25% is the same as which fraction?", options: ["1/2", "1/4", "1/3", "3/4"], correct: 1 },
        { q: "100% of a number is?", options: ["Half the number", "The number itself", "Double the number", "Zero"], correct: 1 },
      ]},
    ],
  },
  {
    id: "science", name: "Bio-Dome", tagline: "Science Lab", icon: FlaskConical,
    color: "#FF6F59", dark: "#DB4F3B", light: "#FFE3DE",
    nodes: [
      { title: "Living Things", questions: [
        { q: "Which of these is NOT alive?", options: ["Tree", "Rock", "Bird", "Mushroom"], correct: 1 },
        { q: "What do plants need to make food?", options: ["Sunlight", "Moonlight", "Sand", "Ice"], correct: 0 },
        { q: "Which animal is a mammal?", options: ["Shark", "Frog", "Dolphin", "Eagle"], correct: 2 },
      ]},
      { title: "States of Matter", questions: [
        { q: "Ice is which state of matter?", options: ["Liquid", "Gas", "Solid", "Plasma"], correct: 2 },
        { q: "What happens when water boils?", options: ["Freezes", "Becomes gas", "Becomes solid", "Disappears"], correct: 1 },
        { q: "Which is a gas at room temp?", options: ["Oxygen", "Iron", "Water", "Wood"], correct: 0 },
      ]},
      { title: "Space Explorers", questions: [
        { q: "Closest planet to the Sun?", options: ["Venus", "Earth", "Mercury", "Mars"], correct: 2 },
        { q: "Earth's natural satellite is called?", options: ["Mars", "The Moon", "Titan", "Europa"], correct: 1 },
        { q: "Which planet is the Red Planet?", options: ["Jupiter", "Mars", "Saturn", "Venus"], correct: 1 },
      ]},
      { title: "Human Body", questions: [
        { q: "How many bones in an adult body?", options: ["106", "206", "306", "406"], correct: 1 },
        { q: "Which organ pumps blood?", options: ["Lungs", "Liver", "Heart", "Kidney"], correct: 2 },
        { q: "What do lungs help you do?", options: ["Digest", "Breathe", "Think", "Hear"], correct: 1 },
      ]},
    ],
  },
  {
    id: "history", name: "Chronicle Isles", tagline: "History Voyage", icon: Landmark,
    color: "#8B5CF6", dark: "#6D3FD1", light: "#E9E1FF",
    nodes: [
      { title: "Ancient Civilizations", questions: [
        { q: "Which river was central to Ancient Egypt?", options: ["Amazon", "Nile", "Yangtze", "Danube"], correct: 1 },
        { q: "The Great Wall was built in which country?", options: ["Japan", "India", "China", "Egypt"], correct: 2 },
        { q: "Who built the pyramids at Giza?", options: ["Romans", "Greeks", "Egyptians", "Aztecs"], correct: 2 },
      ]},
      { title: "Explorers & Empires", questions: [
        { q: "Who reached the Americas in 1492?", options: ["Marco Polo", "Columbus", "Vasco da Gama", "Magellan"], correct: 1 },
        { q: "The Roman Empire centered in modern-day?", options: ["Greece", "Spain", "Italy", "France"], correct: 2 },
        { q: "Which empire was ruled by Pharaohs?", options: ["Persian", "Egyptian", "Ottoman", "Mongol"], correct: 1 },
      ]},
      { title: "Revolutions", questions: [
        { q: "American Revolution won independence from?", options: ["France", "Spain", "Britain", "Portugal"], correct: 2 },
        { q: "The French Revolution began in which century?", options: ["17th", "18th", "19th", "16th"], correct: 1 },
        { q: "'We hold these truths...' opens which document?", options: ["Magna Carta", "Declaration of Independence", "Bill of Rights", "Constitution"], correct: 1 },
      ]},
      { title: "Modern World", questions: [
        { q: "Which war ended in 1945?", options: ["WWI", "WWII", "Cold War", "Vietnam War"], correct: 1 },
        { q: "The United Nations was formed to promote?", options: ["Trade only", "World peace", "Sports", "Tourism"], correct: 1 },
        { q: "Which wall fell in 1989?", options: ["Great Wall", "Berlin Wall", "Hadrian's Wall", "Western Wall"], correct: 1 },
      ]},
    ],
  },
  {
    id: "geo", name: "Terra", tagline: "Geography Trek", icon: Globe2,
    color: "#4CC94B", dark: "#379C36", light: "#DFF6DE",
    nodes: [
      { title: "Continents & Oceans", questions: [
        { q: "How many continents are there?", options: ["5", "6", "7", "8"], correct: 2 },
        { q: "Largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: 3 },
        { q: "The Sahara Desert is on which continent?", options: ["Asia", "Africa", "Australia", "South America"], correct: 1 },
      ]},
      { title: "Countries & Capitals", questions: [
        { q: "Capital of France?", options: ["Lyon", "Paris", "Marseille", "Nice"], correct: 1 },
        { q: "Capital of Japan?", options: ["Osaka", "Kyoto", "Tokyo", "Yokohama"], correct: 2 },
        { q: "Country with the largest population?", options: ["USA", "India", "Russia", "Brazil"], correct: 1 },
      ]},
      { title: "Landforms", questions: [
        { q: "A large area of flat, raised land is a?", options: ["Valley", "Plateau", "Canyon", "Delta"], correct: 1 },
        { q: "Tallest mountain in the world?", options: ["K2", "Kilimanjaro", "Everest", "Denali"], correct: 2 },
        { q: "A narrow strip of land joining two larger areas?", options: ["Peninsula", "Isthmus", "Plateau", "Delta"], correct: 1 },
      ]},
      { title: "Climate & Biomes", questions: [
        { q: "Extreme heat, little rainfall — which biome?", options: ["Tundra", "Desert", "Rainforest", "Grassland"], correct: 1 },
        { q: "Rainforests are typically found near the?", options: ["Poles", "Equator", "Arctic Circle", "Prime Meridian"], correct: 1 },
        { q: "Shortest days in the N. Hemisphere occur in?", options: ["Summer", "Spring", "Winter", "Autumn"], correct: 2 },
      ]},
    ],
  },
];

const MAX_HEARTS = 5;
const STORAGE_KEY = "trailmix-state-v1";

function defaultProgress() {
  const p = {};
  WORLDS.forEach((w) => (p[w.id] = w.nodes.map((_, i) => i === 0)));
  return p;
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function sendLink(e) {
    e.preventDefault();
    setError("");
    setSending(true);
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin },
    });
    setSending(false);
    if (error) setError(error.message);
    else setSent(true);
  }

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#EAF6FF", minHeight: "100vh" }} className="flex flex-col items-center justify-center px-6">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Nunito:wght@500;700;800&display=swap'); .heading { font-family: 'Baloo 2', sans-serif; }`}</style>
      <div className="text-6xl mb-4">🦊</div>
      <div className="heading text-3xl font-extrabold mb-2" style={{ color: "#2B2250" }}>Trailmix Academy</div>
      <div className="text-sm font-semibold mb-8 text-center" style={{ color: "#6B7280" }}>
        Sign in to save your progress across every device
      </div>

      {!sent ? (
        <form onSubmit={sendLink} className="w-full max-w-sm flex flex-col gap-3">
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 rounded-2xl border-2 font-semibold"
            style={{ borderColor: "#DDE3EA", color: "#2B2250" }}
          />
          <button
            type="submit"
            disabled={sending}
            className="heading font-bold text-white px-5 py-3 rounded-2xl flex items-center justify-center gap-2"
            style={{ background: "#12B8A6", opacity: sending ? 0.7 : 1 }}
          >
            <Mail size={18} /> {sending ? "Sending..." : "Send me a login link"}
          </button>
          {error && <div className="text-sm font-semibold text-center" style={{ color: "#DB4F3B" }}>{error}</div>}
        </form>
      ) : (
        <div className="w-full max-w-sm rounded-2xl px-5 py-4 text-center" style={{ background: "#DFF6DE" }}>
          <div className="heading font-bold mb-1" style={{ color: "#379C36" }}>Check your email!</div>
          <div className="text-sm font-semibold" style={{ color: "#379C36" }}>
            Tap the link we sent to {email} to finish signing in.
          </div>
        </div>
      )}
    </div>
  );
}

export default function TrailmixAcademy() {
  const [session, setSession] = useState(undefined); // undefined = checking, null = logged out
  const [loaded, setLoaded] = useState(false);
  const [worldId, setWorldId] = useState("math");
  const [progress, setProgress] = useState(defaultProgress);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [xp, setXp] = useState(0);
  const [gems, setGems] = useState(12);
  const [streak, setStreak] = useState(0);
  const [lastVisit, setLastVisit] = useState(null);

  const [quiz, setQuiz] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [result, setResult] = useState(null);
  const [saveError, setSaveError] = useState(false);

  // Watch auth state
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  // Load saved progress from Supabase once logged in
  useEffect(() => {
    if (!session) return;
    setLoaded(false);
    (async () => {
      const userId = session.user.id;
      const { data, error } = await supabase
        .from("progress")
        .select("state")
        .eq("user_id", userId)
        .maybeSingle();

      let stateData = data && data.state ? data.state : null;

      if (!error && !stateData) {
        // First time this user has logged in — create their row
        const initial = { progress: defaultProgress(), hearts: MAX_HEARTS, xp: 0, gems: 12, streak: 1, lastVisit: todayStr() };
        await supabase.from("progress").upsert({ user_id: userId, state: initial });
        stateData = initial;
      }

      if (stateData) {
        const mergedProgress = { ...defaultProgress(), ...(stateData.progress || {}) };
        setProgress(mergedProgress);
        setHearts(typeof stateData.hearts === "number" ? stateData.hearts : MAX_HEARTS);
        setXp(stateData.xp || 0);
        setGems(typeof stateData.gems === "number" ? stateData.gems : 12);

        const today = todayStr();
        const last = stateData.lastVisit;
        let newStreak = stateData.streak || 0;
        if (last) {
          const lastDate = new Date(last);
          const diffDays = Math.round((new Date(today) - lastDate) / 86400000);
          if (diffDays === 1) newStreak = newStreak + 1;
          else if (diffDays > 1) newStreak = 1;
        } else {
          newStreak = 1;
        }
        setStreak(newStreak);
        setLastVisit(today);
      }
      setLoaded(true);
    })();
  }, [session]);

  // Save progress to Supabase whenever core state changes (after initial load)
  useEffect(() => {
    if (!loaded || !session) return;
    (async () => {
      try {
        const payload = { progress, hearts, xp, gems, streak, lastVisit: lastVisit || todayStr() };
        const { error } = await supabase
          .from("progress")
          .upsert({ user_id: session.user.id, state: payload, updated_at: new Date().toISOString() });
        setSaveError(!!error);
      } catch (e) {
        setSaveError(true);
      }
    })();
  }, [progress, hearts, xp, gems, streak, lastVisit, loaded, session]);

  function signOut() {
    supabase.auth.signOut();
    setLoaded(false);
  }

  const world = WORLDS.find((w) => w.id === worldId);

  function openNode(nodeIndex) {
    if (!progress[worldId][nodeIndex]) return;
    if (hearts <= 0) setHearts(MAX_HEARTS);
    setQuiz({ worldId, nodeIndex });
    setQIndex(0);
    setSelected(null);
    setFeedback(null);
    setCorrectCount(0);
    setResult(null);
  }

  function closeQuiz() {
    setQuiz(null);
    setResult(null);
  }

  function pickAnswer(idx) {
    if (feedback) return;
    const node = world.nodes[quiz.nodeIndex];
    const q = node.questions[qIndex];
    setSelected(idx);
    if (idx === q.correct) {
      setFeedback("correct");
      setCorrectCount((c) => c + 1);
    } else {
      setFeedback("wrong");
      setHearts((h) => Math.max(0, h - 1));
    }
  }

  function nextQuestion() {
    const node = world.nodes[quiz.nodeIndex];
    if (hearts <= 0 && feedback === "wrong") {
      setResult("outofhearts");
      return;
    }
    if (qIndex + 1 < node.questions.length) {
      setQIndex((i) => i + 1);
      setSelected(null);
      setFeedback(null);
    } else {
      const earnedXp = 10 + correctCount * 5;
      setXp((x) => x + earnedXp);
      setGems((g) => g + 3);
      setProgress((p) => {
        const arr = [...p[worldId]];
        arr[quiz.nodeIndex] = true;
        if (quiz.nodeIndex + 1 < arr.length) arr[quiz.nodeIndex + 1] = true;
        return { ...p, [worldId]: arr };
      });
      setResult("win");
    }
  }

  function resetProgress() {
    setProgress(defaultProgress());
    setHearts(MAX_HEARTS);
    setXp(0);
    setGems(12);
    setStreak(1);
    setLastVisit(todayStr());
    closeQuiz();
  }

  const offsets = [0, 56, 0, -56];

  if (session === undefined) {
    return (
      <div style={{ fontFamily: "'Nunito', sans-serif", background: "#EAF6FF", minHeight: "100vh" }} className="flex items-center justify-center">
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Nunito:wght@500;700;800&display=swap');`}</style>
        <Loader2 size={32} color="#12B8A6" className="animate-spin" />
      </div>
    );
  }

  if (session === null) {
    return <LoginScreen />;
  }

  if (!loaded) {
    return (
      <div style={{ fontFamily: "'Nunito', sans-serif", background: "#EAF6FF", minHeight: "100vh" }} className="flex items-center justify-center">
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Nunito:wght@500;700;800&display=swap');`}</style>
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={32} color="#12B8A6" className="animate-spin" />
          <span style={{ color: "#2B2250" }} className="font-bold">Loading your progress...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#EAF6FF", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;700;800&family=Nunito:wght@500;700;800&display=swap');
        .heading { font-family: 'Baloo 2', sans-serif; }
        @keyframes popIn { 0% { transform: scale(0.7); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
        .pop { animation: popIn 0.25s ease-out; }
        @keyframes bounce2 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .bouncey { animation: bounce2 1.4s ease-in-out infinite; }
        button { cursor: pointer; }
      `}</style>

      {/* Top bar */}
      <div style={{ background: "#2B2250" }} className="w-full px-4 py-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: 26 }}>🦊</span>
          <span className="heading text-white text-lg font-bold">Trailmix Academy</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1">
            <Flame size={18} color="#FFC53D" fill="#FFC53D" />
            <span className="text-white font-bold text-sm">{streak}</span>
          </div>
          <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1">
            <Gem size={18} color="#5EE0D0" fill="#5EE0D0" />
            <span className="text-white font-bold text-sm">{gems}</span>
          </div>
          <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1">
            <Heart size={18} color="#FF6F59" fill={hearts > 0 ? "#FF6F59" : "none"} />
            <span className="text-white font-bold text-sm">{hearts}/{MAX_HEARTS}</span>
          </div>
          <button onClick={signOut} className="bg-white/10 rounded-full p-2">
            <LogOut size={16} color="#fff" />
          </button>
        </div>
      </div>

      {saveError && (
        <div className="text-center text-xs font-bold py-1" style={{ background: "#FFE3DE", color: "#DB4F3B" }}>
          Couldn't save progress right now — keep playing, we'll retry automatically.
        </div>
      )}

      {/* World tabs */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto">
        {WORLDS.map((w) => {
          const Icon = w.icon;
          const active = w.id === worldId;
          return (
            <button
              key={w.id}
              onClick={() => setWorldId(w.id)}
              className="heading flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm whitespace-nowrap border-2 transition-transform"
              style={{
                background: active ? w.color : "#FFFFFF",
                color: active ? "#FFFFFF" : w.dark,
                borderColor: w.color,
                transform: active ? "scale(1.05)" : "scale(1)",
              }}
            >
              <Icon size={16} />
              {w.name}
            </button>
          );
        })}
      </div>

      {/* World header */}
      <div className="px-4 mb-2">
        <div className="rounded-3xl px-5 py-4 flex items-center justify-between" style={{ background: world.light }}>
          <div>
            <div className="heading font-extrabold text-xl" style={{ color: world.dark }}>{world.name}</div>
            <div className="text-sm font-semibold" style={{ color: world.dark, opacity: 0.75 }}>{world.tagline}</div>
          </div>
          <div className="text-3xl bouncey">
            {worldId === "math" && "🧮"}
            {worldId === "science" && "🧪"}
            {worldId === "history" && "🏛️"}
            {worldId === "geo" && "🌍"}
          </div>
        </div>
      </div>

      {/* Path */}
      <div className="px-4 pb-24 pt-4 flex flex-col items-center gap-8">
        {world.nodes.map((node, i) => {
          const unlocked = progress[worldId][i];
          const completedNode = unlocked && (i === world.nodes.length - 1 ? false : progress[worldId][i + 1]);
          return (
            <div key={i} style={{ transform: `translateX(${offsets[i % 4]}px)` }} className="flex flex-col items-center">
              <button
                onClick={() => openNode(i)}
                disabled={!unlocked}
                className="rounded-full flex items-center justify-center shadow-md relative"
                style={{
                  width: 76,
                  height: 76,
                  background: unlocked ? world.color : "#C9CDD6",
                  border: completedNode ? `4px solid ${world.dark}` : "4px solid rgba(0,0,0,0.06)",
                }}
              >
                {unlocked ? (
                  completedNode ? <Star size={30} color="#fff" fill="#fff" /> : <world.icon size={28} color="#fff" />
                ) : (
                  <Lock size={26} color="#8A8F98" />
                )}
              </button>
              <div className="heading text-center font-bold text-sm mt-2" style={{ color: unlocked ? "#2B2250" : "#8A8F98", maxWidth: 120 }}>
                {node.title}
              </div>
            </div>
          );
        })}
        {worldId !== "math" && (
          <div className="heading text-center font-bold text-sm mt-2 px-4 py-2 rounded-2xl" style={{ color: world.dark, background: world.light }}>
            More {world.name} lessons coming soon ✨
          </div>
        )}
      </div>

      {/* XP footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-2 flex items-center justify-center gap-3" style={{ borderColor: "#E5E7EB" }}>
        <div className="flex items-center gap-2">
          <Sparkles size={16} color={world.color} />
          <span className="heading font-bold text-sm" style={{ color: "#2B2250" }}>{xp} XP earned</span>
        </div>
        <button onClick={resetProgress} className="flex items-center gap-1 text-xs font-bold" style={{ color: "#9CA3AF" }}>
          <RotateCcw size={12} /> Reset progress
        </button>
      </div>

      {/* Quiz modal */}
      {quiz && (() => {
        const node = world.nodes[quiz.nodeIndex];
        const q = node.questions[qIndex];
        return (
          <div className="fixed inset-0 z-30 flex flex-col" style={{ background: "#EAF6FF" }}>
            <div className="flex items-center gap-3 px-4 py-3">
              <button onClick={closeQuiz} className="p-1"><ChevronLeft size={26} color="#8A8F98" /></button>
              <div className="flex-1 flex gap-1">
                {node.questions.map((_, i) => (
                  <div key={i} className="h-3 flex-1 rounded-full" style={{ background: i <= qIndex ? world.color : "#DDE3EA" }} />
                ))}
              </div>
              <div className="flex items-center gap-1">
                <Heart size={20} color="#FF6F59" fill={hearts > 0 ? "#FF6F59" : "none"} />
                <span className="heading font-bold" style={{ color: "#2B2250" }}>{hearts}</span>
              </div>
            </div>

            {!result && (
              <div className="flex-1 flex flex-col px-5 pt-6">
                <div className="heading text-xs font-bold uppercase tracking-wide mb-2" style={{ color: world.dark }}>{node.title}</div>
                <div className="heading text-2xl font-extrabold mb-6" style={{ color: "#2B2250" }}>{q.q}</div>
                <div className="flex flex-col gap-3">
                  {q.options.map((opt, idx) => {
                    let bg = "#FFFFFF", border = "#DDE3EA", textColor = "#2B2250";
                    if (feedback && idx === selected) {
                      if (feedback === "correct") { bg = "#DFF6DE"; border = "#4CC94B"; }
                      else { bg = "#FFE3DE"; border = "#FF6F59"; }
                    } else if (feedback === "wrong" && idx === q.correct) {
                      bg = "#DFF6DE"; border = "#4CC94B";
                    }
                    return (
                      <button
                        key={idx}
                        onClick={() => pickAnswer(idx)}
                        className="text-left px-4 py-3 rounded-2xl border-2 font-bold heading flex items-center justify-between"
                        style={{ background: bg, borderColor: border, color: textColor }}
                      >
                        {opt}
                        {feedback && idx === selected && feedback === "correct" && <Check size={20} color="#4CC94B" />}
                        {feedback && idx === selected && feedback === "wrong" && <X size={20} color="#FF6F59" />}
                        {feedback === "wrong" && idx === q.correct && <Check size={20} color="#4CC94B" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {!result && (
              <div className="px-5 pb-8 pt-3">
                {feedback ? (
                  <div className="pop rounded-2xl px-4 py-3 flex items-center justify-between" style={{ background: feedback === "correct" ? "#DFF6DE" : "#FFE3DE" }}>
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: 22 }}>{feedback === "correct" ? "🎉" : "😅"}</span>
                      <span className="heading font-extrabold" style={{ color: feedback === "correct" ? "#379C36" : "#DB4F3B" }}>
                        {feedback === "correct" ? "Nice one!" : "Not quite!"}
                      </span>
                    </div>
                    <button
                      onClick={nextQuestion}
                      className="heading font-bold text-white px-5 py-2 rounded-xl"
                      style={{ background: feedback === "correct" ? "#4CC94B" : "#FF6F59" }}
                    >
                      Continue
                    </button>
                  </div>
                ) : (
                  <button disabled className="w-full heading font-bold text-white px-5 py-3 rounded-xl opacity-40" style={{ background: world.color }}>
                    Pick an answer
                  </button>
                )}
              </div>
            )}

            {result === "win" && (
              <div className="flex-1 flex flex-col items-center justify-center px-6 pop">
                <div className="text-6xl mb-3">🏆</div>
                <div className="heading text-2xl font-extrabold mb-1" style={{ color: "#2B2250" }}>World Complete!</div>
                <div className="text-sm font-semibold mb-6" style={{ color: "#6B7280" }}>{node.title}</div>
                <div className="flex gap-4 mb-8">
                  <div className="rounded-2xl px-5 py-3 flex flex-col items-center" style={{ background: "#FFF6DD" }}>
                    <Sparkles size={20} color="#FFC53D" />
                    <span className="heading font-bold" style={{ color: "#2B2250" }}>+{10 + correctCount * 5} XP</span>
                  </div>
                  <div className="rounded-2xl px-5 py-3 flex flex-col items-center" style={{ background: "#E6FBF8" }}>
                    <Gem size={20} color="#12B8A6" />
                    <span className="heading font-bold" style={{ color: "#2B2250" }}>+3 gems</span>
                  </div>
                </div>
                <button onClick={closeQuiz} className="heading font-bold text-white px-8 py-3 rounded-2xl" style={{ background: world.color }}>
                  Continue
                </button>
              </div>
            )}

            {result === "outofhearts" && (
              <div className="flex-1 flex flex-col items-center justify-center px-6 pop">
                <div className="text-6xl mb-3">💔</div>
                <div className="heading text-2xl font-extrabold mb-1" style={{ color: "#2B2250" }}>Out of hearts!</div>
                <div className="text-sm font-semibold mb-8 text-center" style={{ color: "#6B7280" }}>
                  No worries — take a breath and try this lesson again.
                </div>
                <button
                  onClick={() => { setHearts(MAX_HEARTS); closeQuiz(); }}
                  className="heading font-bold text-white px-6 py-3 rounded-2xl flex items-center gap-2"
                  style={{ background: "#FF6F59" }}
                >
                  <RotateCcw size={18} /> Refill hearts & retry
                </button>
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}
