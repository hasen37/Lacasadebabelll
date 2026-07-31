import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, CheckCircle2, Clock, Plus, Trash2, Award, Sparkles, Volume2, Flame, Brain, Target } from 'lucide-react';
import confetti from 'canvas-confetti';
import { StudyTask } from '../types';

interface StudyHeistRoomProps {
  initialTasks: StudyTask[];
  audioEnabled: boolean;
}

export const StudyHeistRoom: React.FC<StudyHeistRoomProps> = ({ initialTasks, audioEnabled }) => {
  // Pomodoro States
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [mode, setMode] = useState<'study' | 'break'>('study');
  const [sessionCount, setSessionCount] = useState<number>(0);

  // Tasks States
  const [tasks, setTasks] = useState<StudyTask[]>(initialTasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskStage, setNewTaskStage] = useState<'متوسطة' | 'إعدادية (سادس)' | 'جامعي'>('إعدادية (سادس)');
  const [newTaskSubject, setNewTaskSubject] = useState('عام');

  // Professor Quotes
  const quotes = [
    "النجاح في السادس ليس محض صدفة، بل خطة محكمة منفذة بتركيز عالي وانضباط تام.",
    "تذكر: كل دقيقة تقضيها بتركيز اليوم، تقربك خطوات جبارة نحو التخصص الذي تحلم به.",
    "لا تدع التشتت والخاص يسرقان منك حلم سنوات طويلة. ركز على ورقتك وامتحانك الوزاري!",
    "سرقة معدل 100% تحتاج إلى إصرار يومي ومتابعة متواصلة بدون استسلام.",
  ];
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Timer Effect
  useEffect(() => {
    let interval: any = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (mode === 'study') {
        setSessionCount((prev) => prev + 1);
        confetti({
          particleCount: 80,
          spread: 90,
          origin: { y: 0.6 },
          colors: ['#d90429', '#ff4d6d', '#ffffff'],
        });
        alert('🎉 أحسنت! اكتملت جلسة المذاكرة بنجاح. حان وقت الاستراحة لمدة 5 دقائق!');
        setMode('break');
        setTimeLeft(5 * 60);
      } else {
        alert('🔔 انتهت الاستراحة! لنعد إلى المهمة الدراسية بتركيز جبار.');
        setMode('study');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = (minutes: number = mode === 'study' ? 25 : 5) => {
    setIsRunning(false);
    setTimeLeft(minutes * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Task Management
  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((t) => {
        if (t.id === id) {
          const updated = !t.completed;
          if (updated) {
            confetti({
              particleCount: 30,
              spread: 50,
              origin: { y: 0.7 },
            });
          }
          return { ...t, completed: updated };
        }
        return t;
      })
    );
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: StudyTask = {
      id: Date.now().toString(),
      title: newTaskTitle.trim(),
      stage: newTaskStage,
      subject: newTaskSubject || 'عام',
      completed: false,
      minutes: 30,
    };
    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <section id="study-vault" className="py-16 bg-[#0b0c10] border-b border-red-950/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 bg-red-950 border border-red-600 text-red-400 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
            <Brain className="w-4 h-4 text-red-500" />
            <span>غرفة التحكم والتحدي العلمي</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white font-['Readex_Pro']">
            غرفة المذاكرة ومؤقت الخطة ⏱️
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            استخدم مؤقت البومودورو المخصص لضبط جلسات دراستك، وسجّل إنجازاتك اليومية لمشاركتها في قناة الإنجازات!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Pomodoro Timer Vault */}
          <div className="lg:col-span-5 bg-[#12141c] border-2 border-red-700/60 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-red-950/50 space-y-6 text-center relative overflow-hidden">
            
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <span className="text-xs font-extrabold text-red-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-red-500" />
                مؤقت الخطة ({mode === 'study' ? 'جلسة مذاكرة' : 'استراحة'})
              </span>
              <span className="bg-red-950 text-red-300 text-[11px] font-bold px-2.5 py-1 rounded-md border border-red-700/50">
                الجلسات المكتملة: {sessionCount} 🏆
              </span>
            </div>

            {/* Quick Mode Switches */}
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={() => {
                  setMode('study');
                  resetTimer(25);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === 'study' ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-900 text-gray-400'
                }`}
              >
                مذاكرة (25 دقيقة)
              </button>
              <button
                onClick={() => {
                  setMode('study');
                  resetTimer(50);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === 'study' && timeLeft === 50 * 60 ? 'bg-red-600 text-white shadow-lg' : 'bg-gray-900 text-gray-400'
                }`}
              >
                تحدي مكثف (50 دقيقة)
              </button>
              <button
                onClick={() => {
                  setMode('break');
                  resetTimer(5);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === 'break' ? 'bg-emerald-700 text-white shadow-lg' : 'bg-gray-900 text-gray-400'
                }`}
              >
                استراحة (5 دقائق)
              </button>
            </div>

            {/* Visual Circular Timer */}
            <div className="relative w-56 h-56 mx-auto flex items-center justify-center my-4">
              {/* Outer Ring Glow */}
              <div
                className={`absolute inset-0 rounded-full blur-xl transition-opacity ${
                  isRunning ? 'bg-red-600/30 opacity-100' : 'opacity-0'
                }`}
              ></div>

              <div className="relative w-52 h-52 rounded-full bg-[#0b0c10] border-4 border-red-600 flex flex-col items-center justify-center shadow-inner">
                <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-wider">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-xs text-red-400 font-bold mt-2">
                  {isRunning ? '🔥 المهمة قيد التنفيذ...' : 'متوقف مؤقتاً'}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                onClick={toggleTimer}
                className={`py-3.5 px-8 rounded-2xl text-sm font-extrabold flex items-center gap-2 shadow-xl transition-all transform hover:scale-105 ${
                  isRunning
                    ? 'bg-amber-600 hover:bg-amber-500 text-white'
                    : 'bg-red-600 hover:bg-red-500 text-white shadow-red-950'
                }`}
              >
                {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                <span>{isRunning ? 'إيقاف مؤقت' : 'ابدأ المذاكرة الآن'}</span>
              </button>

              <button
                onClick={() => resetTimer()}
                className="p-3.5 bg-gray-900 hover:bg-gray-800 border border-gray-700 text-gray-300 rounded-2xl"
                title="إعادة ضبط"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            {/* Motivational Quote Box */}
            <div className="p-4 bg-red-950/40 border border-red-900/50 rounded-2xl text-right space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-red-400">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-red-500" />
                  حكمة البروفيسور الدراسي:
                </span>
                <button
                  onClick={() => setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length)}
                  className="text-[11px] text-gray-400 hover:text-white underline"
                >
                  حكمة أخرى 🔄
                </button>
              </div>
              <p className="text-xs text-gray-200 leading-relaxed font-semibold">
                "{quotes[currentQuoteIndex]}"
              </p>
            </div>

          </div>

          {/* Right Column: Daily Study Challenge & Task Checklist */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-[#12141c] border border-red-900/40 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-2 font-['Readex_Pro']">
                    <Target className="w-5 h-5 text-red-500" />
                    تحديات وقائمة المذاكرة اليومية
                  </h3>
                  <p className="text-xs text-gray-400 mt-1">
                    أضف مهامك الدراسية لليوم وسجل إنجازاتك
                  </p>
                </div>

                <div className="text-right sm:text-left bg-gray-900 p-3 rounded-xl border border-gray-800">
                  <div className="text-xs text-gray-400 font-bold mb-1">
                    نسبة الإنجاز: <span className="text-red-400">{progressPercent}%</span>
                  </div>
                  <div className="w-32 h-2.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Add New Task Form */}
              <form onSubmit={handleAddTask} className="space-y-3 bg-gray-900/80 p-4 rounded-2xl border border-gray-800">
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-7">
                    <input
                      type="text"
                      placeholder="أدخل عنوان المهمة الدراسية (مثلاً: حل وزاريات الفصل الأول فيزياء)..."
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      className="w-full bg-[#0b0c10] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <select
                      value={newTaskStage}
                      onChange={(e) => setNewTaskStage(e.target.value as any)}
                      className="w-full bg-[#0b0c10] border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                    >
                      <option value="إعدادية (سادس)">سادس إعدادي</option>
                      <option value="متوسطة">متوسطة</option>
                      <option value="جامعي">جامعي</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1 shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      إضافة
                    </button>
                  </div>
                </div>
              </form>

              {/* Tasks List */}
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      task.completed
                        ? 'bg-emerald-950/30 border-emerald-800/50 text-gray-400'
                        : 'bg-gray-900/60 border-gray-800 hover:border-red-900/60 text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleToggleTask(task.id)}
                        className={`p-1 rounded-lg transition-colors ${
                          task.completed ? 'text-emerald-400' : 'text-gray-500 hover:text-red-500'
                        }`}
                      >
                        <CheckCircle2 className={`w-6 h-6 ${task.completed ? 'fill-emerald-950' : ''}`} />
                      </button>

                      <div>
                        <div
                          className={`text-sm font-bold ${
                            task.completed ? 'line-through text-gray-500' : 'text-white'
                          }`}
                        >
                          {task.title}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                          <span className="bg-red-950/80 text-red-400 px-2 py-0.5 rounded text-[10px] font-bold">
                            {task.stage}
                          </span>
                          {task.subject && <span>• المادة: {task.subject}</span>}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                      title="حذف المهمة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                {tasks.length === 0 && (
                  <div className="text-center py-8 text-gray-500 text-xs">
                    لا توجد مهام دراسية حالياً. أضف مهمتك الأولى للتحدي اليوم!
                  </div>
                )}
              </div>

              {/* Share Achievements to Telegram CTA */}
              <div className="p-4 bg-gradient-to-r from-red-950 to-gray-900 rounded-2xl border border-red-800/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-right">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-red-500" />
                    شارِك إنجازاتك في قناة السرقات (Robbery)!
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">
                    توثيق التحديات يزيد من حماسك وحماس بقية الطلاب.
                  </div>
                </div>

                <a
                  href="https://t.me/Robbery_lacasa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 flex-shrink-0"
                >
                  <span>قناة الإنجازات</span>
                  <Sparkles className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
