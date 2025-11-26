import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Hand, 
  HelpCircle, 
  Bath, 
  Cake, 
  Clock, 
  Library, 
  Home, 
  Bike, 
  Gift, 
  Calendar, 
  Timer, 
  Heart, 
  Cat, 
  MessageCircle, 
  Hash, 
  Flag, 
  Music,
  CheckCircle2,
  AlertTriangle,
  Pizza,
  Maximize,
  Smile,
  Utensils,
  Globe2
} from 'lucide-react';

// --- Types ---

interface ExerciseItem {
  id: number;
  contextText?: string; // Header text
  template: string; // The text with blanks
  answers: string[]; // Correct answers
  hintIcon: React.ReactNode;
  placeholder?: string;
}

interface CheckResult {
  isCorrect: boolean;
  isExact: boolean;
  correctAnswer?: string;
}

// --- Data ---

const exercises: ExerciseItem[] = [
  {
    id: 1,
    contextText: "Greeting",
    template: "_________ señorita",
    answers: ["Hola"],
    hintIcon: <Hand className="w-12 h-12 text-blue-500" />,
    placeholder: "Hola"
  },
  {
    id: 2,
    contextText: "What is your name?",
    template: "¿_______ ______ _________?",
    answers: ["Cómo te llamas"],
    hintIcon: <HelpCircle className="w-12 h-12 text-orange-500" />,
    placeholder: "Cómo te llamas"
  },
  {
    id: 3,
    contextText: "“My name is Mike”",
    template: "_______ ____________ Mike (x2)",
    answers: ["Me llamo"],
    hintIcon: <div className="bg-blue-600 text-white px-3 py-1 rounded-lg font-bold text-center">HELLO<br/><span className="text-xs font-normal">my name is</span><br/>MIKE</div>,
    placeholder: "Me llamo"
  },
  {
    id: 4,
    contextText: "Bathroom location",
    template: "¿_________ ___________ el baño?",
    answers: ["Dónde está"],
    hintIcon: <div className="relative"><Bath className="w-12 h-12 text-cyan-600" /><HelpCircle className="w-6 h-6 absolute -top-2 -right-2 text-orange-500" /></div>,
    placeholder: "Dónde está"
  },
  {
    id: 5,
    contextText: "Happy birthday!",
    template: "¡____________ _____________!",
    answers: ["Feliz cumpleaños"],
    hintIcon: <Cake className="w-12 h-12 text-pink-500" />,
    placeholder: "Feliz cumpleaños"
  },
  {
    id: 6,
    contextText: "Ask for the time",
    template: "¿_______ ____________ ________?",
    answers: ["Qué hora es"],
    hintIcon: <Clock className="w-12 h-12 text-purple-600" />,
    placeholder: "Qué hora es"
  },
  {
    id: 7,
    contextText: "Library",
    template: "___ ____________ la biblioteca",
    answers: ["Me gusta"],
    hintIcon: <div className="flex gap-2 items-center"><Library className="w-10 h-10 text-emerald-600" /><div className="text-2xl">👍</div></div>,
    placeholder: "Me gusta"
  },
  {
    id: 8,
    contextText: "I live in the red house",
    template: "______ ___ ____ _______ _______",
    answers: ["vivo en la casa roja"],
    hintIcon: <Home className="w-12 h-12 text-red-600 fill-current" />,
    placeholder: "vivo en la casa roja"
  },
  {
    id: 9,
    contextText: "+ Tener + 2",
    template: "Yo_______ ______ bicicletas",
    answers: ["tengo dos"],
    hintIcon: <div className="flex items-center gap-1"><Bike className="w-8 h-8 text-slate-700" /><span className="text-xl font-bold">x2</span></div>,
    placeholder: "tengo dos"
  },
  // Split Thanks / Welcome
  {
    id: 101,
    contextText: "Thanks a lot",
    template: "_____________ ___________",
    answers: ["Muchas gracias"],
    hintIcon: <Gift className="w-12 h-12 text-yellow-500" />,
    placeholder: "Muchas gracias"
  },
  {
    id: 102,
    contextText: "… you are welcome",
    template: "______ ________________",
    answers: ["de nada", "sí de nada"],
    hintIcon: <Smile className="w-12 h-12 text-green-500" />,
    placeholder: "de nada"
  },
  {
    id: 11,
    contextText: "How old are you?",
    template: "¿_______ __________ __________?",
    answers: ["Cuántos años tienes"],
    hintIcon: <Calendar className="w-12 h-12 text-indigo-500" />,
    placeholder: "Cuántos años tienes"
  },
  {
    id: 12,
    contextText: "“One moment, please”",
    template: "______ __________, por favor",
    answers: ["Un momento"],
    hintIcon: <Timer className="w-12 h-12 text-gray-700" />,
    placeholder: "Un momento"
  },
  {
    id: 13,
    contextText: "My mother is beautiful",
    template: "___ _________ ____ bonita",
    answers: ["Mi mamá es"],
    hintIcon: <div className="flex items-center gap-2"><Heart className="w-10 h-10 text-pink-500 fill-pink-100" /></div>,
    placeholder: "Mi mamá es"
  },
  {
    id: 14,
    contextText: "My cat is very white",
    template: "_____ ___________ ____ _______ ______",
    answers: ["mi gato es muy blanco"],
    hintIcon: <div className="flex items-center gap-2 bg-slate-200 p-2 rounded"><Cat className="w-10 h-10 text-white fill-white drop-shadow-md" /></div>,
    placeholder: "mi gato es muy blanco"
  },
  {
    id: 15,
    contextText: "“Excuse me”",
    template: "Pe_______neme",
    answers: ["rdó"],
    hintIcon: <MessageCircle className="w-12 h-12 text-blue-400" />,
    placeholder: "rdó"
  },
  // Split Numbers
  {
    id: 161,
    contextText: "1, 2, 3 y 4",
    template: "___ ___ ____ _ ______",
    answers: ["Uno dos tres y cuatro"],
    hintIcon: <div className="flex gap-1 text-2xl font-bold text-green-600"><span>1</span><span>2</span><span>3</span><span>4</span></div>,
    placeholder: "Uno dos tres y cuatro"
  },
  {
    id: 162,
    contextText: "5, 6, 7, 8, 9, 10",
    template: "_____ ____ _____ ____ _____ ____",
    answers: ["cinco seis siete ocho nueve diez"],
    hintIcon: <div className="flex gap-1 text-2xl font-bold text-green-600"><span>5</span><span>-</span><span>10</span></div>,
    placeholder: "cinco seis siete..."
  },
  {
    id: 163,
    contextText: "No remembero how to say eleven",
    template: "____",
    answers: ["once"],
    hintIcon: <HelpCircle className="w-12 h-12 text-slate-400" />,
    placeholder: "once"
  },
  // Split Finale
  {
    id: 171,
    contextText: "Antonio",
    template: "Antonio ____________",
    answers: ["Banderas"],
    hintIcon: <div className="flex gap-1">
      <Flag className="w-8 h-8 text-red-500 fill-red-100" />
      <Flag className="w-8 h-8 text-yellow-500 fill-yellow-100" />
      <Flag className="w-8 h-8 text-red-500 fill-red-100" />
    </div>,
    placeholder: "Banderas"
  },
  {
    id: 172,
    contextText: "Nachos & Cinnamon",
    template: "nachos ______ y cinnamon twists",
    answers: ["grande"],
    hintIcon: <div className="relative">
      <Utensils className="w-10 h-10 text-orange-500" />
      <Maximize className="w-6 h-6 absolute -top-2 -right-2 text-slate-700 bg-white rounded-full" />
    </div>,
    placeholder: "grande"
  },
  {
    id: 18,
    contextText: "Farewell",
    template: "( Au ________ )",
    answers: ["revoir"],
    hintIcon: <div className="relative">
      <Globe2 className="w-12 h-12 text-blue-600" />
      <span className="absolute -bottom-2 -right-1 text-xl">🇫🇷</span>
    </div>,
    placeholder: "revoir"
  }
];

// --- Helpers ---

const normalize = (str: string) => {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents
    .replace(/[.,/#!$%^&*;:{}=\-_`~()¡¿]/g, "") // Remove punctuation
    .replace(/\s{2,}/g, " ") // Remove extra spaces
    .trim();
};

const checkAnswer = (user: string, answers: string[]): CheckResult => {
  const normalizedUser = normalize(user);
  
  // Find index of answer that matches roughly
  const matchIndex = answers.findIndex(ans => normalize(ans) === normalizedUser);
  
  if (matchIndex === -1) {
    return { isCorrect: false, isExact: false };
  }

  const correctAnswer = answers[matchIndex];
  // Check exact match (trim case but keep accents)
  const isExact = user.trim().toLowerCase() === correctAnswer.toLowerCase();

  return { isCorrect: true, isExact, correctAnswer };
};

// --- Components ---

const ExerciseCard: React.FC<{ 
  item: ExerciseItem;
  isCompleted: boolean;
  onCorrect: () => void;
}> = ({ 
  item, 
  isCompleted,
  onCorrect 
}) => {
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>(isCompleted ? 'correct' : 'idle');
  const [feedback, setFeedback] = useState<string | null>(null);

  // Sync internal state if external props change (e.g. after tab switch)
  useEffect(() => {
    if (isCompleted) {
      setStatus('correct');
      // Pre-fill with correct answer if previously completed
      setInput(item.answers[0]);
    }
  }, [isCompleted, item.answers]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = checkAnswer(input, item.answers);

    if (result.isCorrect) {
      setStatus('correct');
      if (!result.isExact && result.correctAnswer) {
        setFeedback(`¡Correcto! Pero ojo con las tildes: "${result.correctAnswer}"`);
      } else {
        setFeedback(null);
      }
      onCorrect();
    } else {
      setStatus('incorrect');
      setFeedback("Inténtalo de nuevo");
      setTimeout(() => {
        setStatus('idle');
        setFeedback(null);
      }, 1500);
    }
  };

  return (
    <div className={`
      relative overflow-hidden bg-white rounded-xl shadow-md border-b-4 transition-all duration-300
      ${status === 'correct' ? 'border-green-500 ring-2 ring-green-100' : 'border-slate-200'}
      ${status === 'incorrect' ? 'border-red-500 animate-[shake_0.5s_ease-in-out]' : ''}
    `}>
      {/* Visual Header */}
      <div className="bg-slate-50 p-6 flex flex-col items-center justify-center border-b border-slate-100 h-40">
        <div className="transform scale-110 transition-transform duration-500 hover:scale-125">
          {item.hintIcon}
        </div>
        {item.contextText && (
          <p className="mt-3 text-sm font-semibold text-slate-500 uppercase tracking-wide text-center">
            {item.contextText}
          </p>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="mb-4 text-slate-400 font-mono text-sm text-center select-none tracking-widest">
          {item.template}
        </p>

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              if (status !== 'idle' && status !== 'correct') setStatus('idle');
            }}
            disabled={status === 'correct'}
            placeholder="Escribe aquí..."
            className={`
              w-full px-4 py-3 text-lg text-center rounded-lg border-2 outline-none transition-colors
              ${status === 'correct' 
                ? 'bg-green-50 border-green-200 text-green-700 font-bold' 
                : 'bg-white border-slate-200 focus:border-spanish focus:ring-2 focus:ring-spanish-light text-slate-800'}
            `}
          />
          
          <div className="mt-4 flex flex-col items-center justify-center h-12">
            {status === 'correct' ? (
              <div className="text-center animate-bounce">
                <div className="flex items-center gap-2 text-green-600 font-bold justify-center">
                  <CheckCircle2 size={24} />
                  <span>¡Muy bien!</span>
                </div>
              </div>
            ) : (
              <button 
                type="submit"
                disabled={input.length === 0}
                className="bg-spanish hover:bg-spanish-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 px-8 rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
              >
                Comprobar
              </button>
            )}
          </div>
          
          {/* Feedback Message (Accent warning or error) */}
          {feedback && (
            <div className={`
              mt-2 text-xs text-center font-semibold rounded px-2 py-1
              ${status === 'correct' ? 'text-orange-600 bg-orange-50 border border-orange-100' : 'text-red-500'}
            `}>
              {status === 'correct' && !feedback.includes('Pero') ? null : (
                 <div className="flex items-center justify-center gap-1">
                   {status === 'correct' && <AlertTriangle size={12} />}
                   {feedback}
                 </div>
              )}
            </div>
          )}

        </form>
      </div>

      {status === 'correct' && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-green-500/5" />
        </div>
      )}
    </div>
  );
};

const LyricsView = () => (
  <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg border-t-8 border-spanish">
    <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
      <Music className="text-spanish" />
      Letra de la canción
    </h2>
    <div className="space-y-6 text-lg leading-relaxed text-slate-700 font-medium">
      <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-spanish-light">
        <p>Hola señorita, ¿cómo te llamas?</p>
        <p>Me llamo Mike, me llamo Mike</p>
        <p>¿Dónde está el baño? Feliz cumpleaños</p>
        <p>¿Qué hora es, qué hora es?</p>
        <p className="text-slate-400 italic">La la da da da</p>
      </div>

      <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-orange-200">
        <p>Me gusta la biblioteca, vivo en la casa roja</p>
        <p>Yo tengo dos bicicletas</p>
        <p>Muchas gracias, sí, de nada</p>
        <p>¿Cuántos años tienes? Un momento por favor</p>
        <p className="font-bold text-spanish-dark mt-2">It's the one semester of Spanish, Spanish love song</p>
      </div>

      <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-purple-200">
        <p>Mi mamá es bonita, mi gato es muy blanco</p>
        <p>Perdóname, perdóname</p>
        <p className="text-slate-400 italic">La la da da da</p>
      </div>

      <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-green-200">
        <p>Uno dos tres y cuatro, cinco seis siete ocho</p>
        <p>Nueve, diez, <span className="italic text-slate-500">no remembro how to say eleven</span></p>
        <p>Antonio Banderas, nachos grande y cinnamon twists</p>
        <p className="font-bold text-spanish-dark mt-2">It’s the one semester of Spanish, Spanish love song</p>
      </div>

      <div className="text-center text-slate-400 pt-4">
        ( Au revoir )
      </div>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [tab, setTab] = useState<'exercise' | 'lyrics'>('exercise');
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  const handleCorrect = (id: number) => {
    if (!completedIds.includes(id)) {
      setCompletedIds(prev => [...prev, id]);
    }
  };

  const isComplete = completedIds.length === exercises.length;
  const progress = Math.round((completedIds.length / exercises.length) * 100);

  useEffect(() => {
    if (isComplete) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#0ea5e9', '#facc15', '#f43f5e', '#a855f7']
      });
    }
  }, [isComplete]);

  return (
    <div className="min-h-screen bg-slate-100 font-sans pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-spanish text-white p-2 rounded-lg">
              <Music size={24} />
            </div>
            <h1 className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">
              The One Semester of <span className="text-spanish font-light">Spanish Spanish Love Song</span>
            </h1>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setTab('exercise')}
              className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${
                tab === 'exercise' ? 'bg-white text-spanish shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Ejercicios
            </button>
            <button
              onClick={() => setTab('lyrics')}
              className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${
                tab === 'lyrics' ? 'bg-white text-spanish shadow-sm' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Letra Completa
            </button>
          </div>
        </div>
        
        {/* Progress Bar (Only visible in exercise mode) */}
        {tab === 'exercise' && (
          <div className="h-1.5 w-full bg-slate-200">
            <div 
              className="h-full bg-gradient-to-r from-spanish to-purple-500 transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {tab === 'exercise' ? (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-700 mb-2">¡Completa la canción!</h2>
              <p className="text-slate-500">
                Mira los dibujos y completa la letra de la canción antes de escucharla.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm text-sm font-mono text-slate-600">
                <span>Progreso:</span>
                <span className="font-bold text-spanish">{completedIds.length}</span>
                <span className="text-slate-400">/</span>
                <span>{exercises.length}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {exercises.map((item) => (
                <ExerciseCard 
                  key={item.id} 
                  item={item} 
                  isCompleted={completedIds.includes(item.id)}
                  onCorrect={() => handleCorrect(item.id)}
                />
              ))}
            </div>

            {isComplete && (
              <div className="mt-12 p-8 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl border-2 border-yellow-300 text-center animate-bounce">
                <h3 className="text-4xl mb-4">🎉 ¡Felicidades! 🎉</h3>
                <p className="text-xl text-yellow-800 font-medium max-w-2xl mx-auto">
                  Thanks for working in SPAN1001 with us! Let's keep it up in SPAN1002!
                </p>
                <button 
                  onClick={() => setTab('lyrics')}
                  className="mt-6 bg-yellow-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-600 transition-colors"
                >
                  Ver la letra completa
                </button>
              </div>
            )}
          </div>
        ) : (
          <LyricsView />
        )}
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-slate-400 text-sm">
        Inspired by "One Semester of Spanish Love Song"
      </footer>

      {/* Global CSS for Animations */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
}
