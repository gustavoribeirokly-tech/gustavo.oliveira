
import React from 'react';
import MindMapCanvas from './components/MindMapCanvas';

const App: React.FC = () => {
  // CSS filter to convert any logo image to the brand color #008080 (Teal)
  // This filter works by:
  // 1. Making it black (brightness(0))
  // 2. Shifting black to the specific Teal hex using invert/sepia/hue-rotate
  const tealFilter = {
    filter: 'brightness(0) saturate(100%) invert(31%) sepia(87%) saturate(1476%) hue-rotate(143deg) brightness(91%) contrast(101%)'
  };

  const logoUrl = "https://media.zenfs.com/en/globenewswire.com/8e25793c387f15dc92c59c30b34df6c6";

  return (
    <div className="flex flex-col h-screen font-sans antialiased text-slate-900 overflow-hidden bg-slate-50">
      {/* Header - Contains Title and Logo */}
      <header className="absolute top-0 left-0 right-0 z-20 flex flex-col md:flex-row justify-between items-start p-6 pointer-events-none gap-4">
        {/* Title Box */}
        <div className="pointer-events-auto bg-white/90 p-5 rounded-2xl shadow-xl border border-slate-200 backdrop-blur-md transition-all hover:shadow-2xl">
          <h1 className="text-2xl font-black text-[#008080] tracking-tight leading-tight">RELATÓRIO DE INVESTIGAÇÃO</h1>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mt-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#008080] animate-pulse"></span>
            Incidente Operacional • TBSA
          </p>
        </div>
        
        {/* Logo Section - Top Right */}
        <div className="pointer-events-auto bg-white/95 px-8 py-5 rounded-2xl shadow-xl border border-slate-200 backdrop-blur-md self-end md:self-start">
           <div className="flex flex-col items-center justify-center min-w-[120px]">
             <img 
               src={logoUrl} 
               alt="ERO Copper Logo" 
               className="h-12 md:h-16 w-auto object-contain transition-all duration-500 hover:scale-110"
               style={tealFilter}
               onLoad={() => console.log("Logo loaded successfully")}
               onError={(e) => {
                 console.error("Logo failed to load from primary URL");
                 // Fallback to a text-based logo if the image is truly broken
                 const target = e.currentTarget;
                 const parent = target.parentElement;
                 if (parent) {
                    target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'text-[#008080] font-black text-2xl tracking-tighter';
                    fallback.innerText = 'ERO COPPER';
                    parent.appendChild(fallback);
                 }
               }}
             />
           </div>
        </div>
      </header>

      {/* Mind Map Area - Full Screen Canvas */}
      <main className="flex-1 relative z-10">
        <MindMapCanvas />
      </main>

      {/* Footer / Status bar */}
      <footer className="absolute bottom-0 right-0 p-4 z-20 pointer-events-none">
        <div className="bg-[#008080] text-white text-[10px] px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-white/20 backdrop-blur-lg pointer-events-auto">
          <div className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-200"></span>
          </div>
          <span className="font-bold tracking-[0.15em] uppercase">Visualização de Causa Raiz • Mapa Interativo</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
