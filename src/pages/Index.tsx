import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface DayData {
  day: number;
  message: string;
  emoji: string;
}

const adventMessages: DayData[] = [
  { day: 1, message: 'Первый день зимы! Пусть декабрь принесет радость и волшебство ✨', emoji: '🎄' },
  { day: 2, message: 'Время украшать дом! Создайте уютную атмосферу 🏠', emoji: '🎀' },
  { day: 3, message: 'Напишите письмо Деду Морозу! Мечты сбываются 💌', emoji: '✉️' },
  { day: 4, message: 'День горячего какао с зефиром! Согрейтесь ☕', emoji: '☕' },
  { day: 5, message: 'Слепите снеговика или сделайте снежного ангела! ⛄', emoji: '⛄' },
  { day: 6, message: 'Испеките имбирное печенье! Дом наполнится ароматом праздника 🍪', emoji: '🍪' },
  { day: 7, message: 'Посмотрите новогодний фильм с семьей! 🎬', emoji: '🎬' },
  { day: 8, message: 'Украсьте елку вместе с близкими! 🎄', emoji: '🎄' },
  { day: 9, message: 'Сделайте открытку своими руками для друзей! 💝', emoji: '💝' },
  { day: 10, message: 'День добрых дел! Помогите тем, кто нуждается 💗', emoji: '💗' },
  { day: 11, message: 'Спойте новогодние песни! В лесу родилась елочка 🎵', emoji: '🎵' },
  { day: 12, message: 'Устройте семейную фотосессию в праздничных нарядах! 📸', emoji: '📸' },
  { day: 13, message: 'Прогуляйтесь по зимнему лесу или парку! Красота природы 🌲', emoji: '🌲' },
  { day: 14, message: 'Сделайте гирлянду из бумаги или мандаринов! 🍊', emoji: '🎨' },
  { day: 15, message: 'Середина декабря! Половина пути к празднику пройдена! 🎉', emoji: '🎉' },
  { day: 16, message: 'Приготовьте традиционное блюдо вашей семьи! 🍽️', emoji: '🍽️' },
  { day: 17, message: 'Почитайте зимние сказки у камина или под пледом! 📚', emoji: '📚' },
  { day: 18, message: 'Покатайтесь на коньках или санках! Зимние забавы ⛸️', emoji: '⛸️' },
  { day: 19, message: 'Упакуйте подарки красивой бумагой и лентами! 🎁', emoji: '🎁' },
  { day: 20, message: 'Сделайте кормушку для птиц! Помогите пернатым друзьям 🐦', emoji: '🐦' },
  { day: 21, message: 'Самая длинная ночь в году! Зажгите свечи 🕯️', emoji: '🕯️' },
  { day: 22, message: 'Составьте список целей на новый год! 📝', emoji: '📝' },
  { day: 23, message: 'Устройте вечер настольных игр с семьей! 🎲', emoji: '🎲' },
  { day: 24, message: 'Сочельник! Последние приготовления к празднику! ⭐', emoji: '⭐' },
  { day: 25, message: 'Рождество Христово! Мир и радость вашему дому! 🌟', emoji: '🌟' },
  { day: 26, message: 'Время отдыха после праздников! Наслаждайтесь покоем 😌', emoji: '😌' },
  { day: 27, message: 'Повторите любимые моменты праздника! 💫', emoji: '💫' },
  { day: 28, message: 'Подведите итоги года! Что было хорошего? 📊', emoji: '📊' },
  { day: 29, message: 'Генеральная уборка перед Новым годом! 🧹', emoji: '🧹' },
  { day: 30, message: 'Приготовьте праздничный стол! Оливье и шампанское 🥂', emoji: '🥂' },
  { day: 31, message: 'С Новым Годом! Пусть сбудутся все мечты! 🎆', emoji: '🎆' },
];

const Snowflakes = () => {
  const snowflakes = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${Math.random() * 10 + 10}s`,
    animationDelay: `${Math.random() * 10}s`,
    fontSize: `${Math.random() * 10 + 10}px`,
  }));

  return (
    <>
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: flake.left,
            animationDuration: flake.animationDuration,
            animationDelay: flake.animationDelay,
            fontSize: flake.fontSize,
          }}
        >
          ❄
        </div>
      ))}
    </>
  );
};

const Index = () => {
  const [openedDays, setOpenedDays] = useState<number[]>([]);
  const [selectedDay, setSelectedDay] = useState<DayData | null>(null);
  const [currentDate] = useState(new Date());

  useEffect(() => {
    const saved = localStorage.getItem('adventOpened');
    if (saved) {
      setOpenedDays(JSON.parse(saved));
    }
  }, []);

  const handleDayClick = (dayData: DayData) => {
    const today = currentDate.getDate();
    const currentMonth = currentDate.getMonth();

    if (currentMonth !== 11) {
      alert('Адвент календарь доступен только в декабре! 🎄');
      return;
    }

    if (dayData.day > today) {
      alert('Этот день еще не наступил! Наберитесь терпения 🎅');
      return;
    }

    if (!openedDays.includes(dayData.day)) {
      const newOpenedDays = [...openedDays, dayData.day];
      setOpenedDays(newOpenedDays);
      localStorage.setItem('adventOpened', JSON.stringify(newOpenedDays));
    }

    setSelectedDay(dayData);
  };

  const isUnlocked = (day: number) => {
    const today = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    return currentMonth === 11 && day <= today;
  };

  const isOpened = (day: number) => openedDays.includes(day);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#1a3a2e] via-[#1f4d3a] to-[#0f2419]">
      <Snowflakes />

      <div className="absolute top-0 left-0 w-full h-32 opacity-20">
        <div className="flex justify-around items-start">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="text-accent text-2xl glow" style={{ animationDelay: `${i * 0.2}s` }}>
              💡
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-accent mb-4 drop-shadow-lg">
            🎄 Адвент Календарь 🎄
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90">
            Открывайте по одному окошку каждый день декабря!
          </p>
          <p className="text-lg text-muted-foreground mt-2">
            31 день волшебства и праздничного настроения ✨
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 max-w-7xl mx-auto">
          {adventMessages.map((dayData) => {
            const unlocked = isUnlocked(dayData.day);
            const opened = isOpened(dayData.day);

            return (
              <Card
                key={dayData.day}
                className={`
                  relative h-32 cursor-pointer transition-all duration-300
                  ${unlocked ? 'hover:scale-105 hover:shadow-2xl' : 'opacity-50 cursor-not-allowed'}
                  ${opened ? 'bg-primary/30 border-primary' : 'bg-card border-2'}
                  ${!unlocked ? 'grayscale' : ''}
                `}
                onClick={() => unlocked && handleDayClick(dayData)}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                  {opened ? (
                    <>
                      <div className="text-4xl mb-2">{dayData.emoji}</div>
                      <div className="text-sm font-semibold text-center">{dayData.day} дек</div>
                    </>
                  ) : (
                    <>
                      <div className="text-5xl mb-2">
                        {unlocked ? '🎁' : '🔒'}
                      </div>
                      <div className="text-2xl font-bold">{dayData.day}</div>
                    </>
                  )}
                </div>

                {!unlocked && (
                  <div className="absolute top-2 right-2">
                    <Icon name="Lock" size={16} className="text-muted-foreground" />
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-card/80 backdrop-blur-sm px-8 py-4 rounded-lg border-2 border-accent">
            <p className="text-lg">
              <span className="text-accent font-bold">
                {openedDays.length}
              </span>
              {' '}из 31 дня открыто
            </p>
            <div className="w-full bg-muted h-2 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-accent h-full transition-all duration-500"
                style={{ width: `${(openedDays.length / 31) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedDay} onOpenChange={() => setSelectedDay(null)}>
        <DialogContent className="sm:max-w-md bg-card border-accent">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              {selectedDay && (
                <>
                  <div className="text-6xl mb-4">{selectedDay.emoji}</div>
                  <div>{selectedDay.day} декабря</div>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-6">
            <p className="text-lg leading-relaxed">{selectedDay?.message}</p>
          </div>
        </DialogContent>
      </Dialog>

      <div className="fixed bottom-0 left-0 w-full h-24 pointer-events-none opacity-30">
        <div className="flex justify-around items-end h-full">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="text-6xl" style={{ transform: `translateY(${Math.random() * 20}px)` }}>
              🌲
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
