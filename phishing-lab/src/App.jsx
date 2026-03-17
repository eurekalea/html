import React, { useState, useEffect, useRef } from 'react';

// 模擬圖片連結
const IMGS = {
  banner: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200",
  pubg: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400",
  points: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400"
};

export default function PhishingApp() {
  const [view, setView] = useState('home'); 
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([{ s: 'b', t: '您好！這裡是 036 在線客服，請問有什麼可以幫您？' }]);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);

  useEffect(() => { chatRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendChat = () => {
    if (!input.trim()) return;
    const newMsgs = [...messages, { s: 'u', t: input }];
    setMessages(newMsgs);
    setInput('');
    setTimeout(() => {
      let reply = "請確認您的帳戶狀態。";
      if (input.includes('要怎麼做') || input.includes('提現')) {
        reply = "【系統提示】您的資金已被凍結。請先辦理「解凍業務」，儲值相同金額保證金，系統方可自動識別並連同解凍金一併退還 [cite: 208, 209]。";
      }
      setMessages(prev => [...prev, { s: 'b', t: reply }]);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#f2f2f2] font-sans text-gray-800">
      {/* 跑馬燈警告 [cite: 3, 113, 177] */}
      <div className="bg-red-600 text-white text-[11px] py-1 overflow-hidden whitespace-nowrap border-b border-red-800">
        <div className="inline-block px-4 animate-pulse">
          提現充值超過100幣時注意附帶零頭0.1-0.9或1-9以免系統無法識別凍結！ [cite: 3, 113]
        </div>
      </div>

      {/* 頂部工具欄 */}
      <div className="bg-white border-b py-2 px-4 shadow-sm text-xs text-gray-500">
        <div className="max-w-6xl mx-auto flex justify-between">
          <div>您好,歡迎來到! <span className="text-red-600 font-bold">MOMG實物遊戲商場</span> [登錄] [免費注冊] [cite: 4, 114, 178]</div>
          <div className="flex gap-4">
            <span className="hover:text-orange-600 cursor-pointer">買家中心</span>
            <span className="text-orange-600 font-bold cursor-pointer">充值提現 [cite: 6, 119]</span>
          </div>
        </div>
      </div>

      {/* Header 與 搜索 [cite: 11, 122, 183] */}
      <div className="bg-white py-6 border-b">
        <div className="max-w-6xl mx-auto flex items-center gap-10 px-4">
          <div className="text-4xl font-black text-[#00a29a] italic cursor-pointer" onClick={() => setView('home')}>MOMG [cite: 5, 115, 179]</div>
          <div className="flex-1 flex border-2 border-[#00a29a] rounded-sm overflow-hidden">
            <input type="text" className="flex-1 p-2 outline-none text-sm" placeholder="请输入关键字 [cite: 11, 122]" />
            <button className="bg-[#00a29a] text-white px-10 font-bold">搜索 [cite: 142, 159, 184]</button>
          </div>
        </div>
      </div>

      {/* 導覽列 - 修正回我要提現 [cite: 130, 189] */}
      <nav className="bg-[#00a29a] text-white shadow-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex text-sm font-bold">
          {['首頁', '我的帳戶', '我要買', '我要員', '我要提現', '代練服務'].map((item, idx) => (
            <div key={idx} onClick={() => setView(item === '我要提現' ? 'withdraw' : 'home')} 
                 className={`px-8 py-3 hover:bg-[#008d85] cursor-pointer border-r border-[#008a82] ${item === '我要員' ? 'text-gray-200 opacity-80' : ''}`}>
              {item === '我要員' ? '我要員 ' : item}
            </div>
          ))}
        </div>
      </nav>

      {/* 主內容區 */}
      <main className="max-w-6xl mx-auto w-full py-6 px-4 grid grid-cols-12 gap-6">
        <aside className="col-span-3 space-y-4 text-sm">
          <div className="bg-white border rounded shadow-sm">
            <div className="bg-gray-100 p-3 font-bold border-b text-teal-800">遊戲交易專區 [cite: 37, 158]</div>
            <ul className="divide-y">
              {['台灣專區', '香港交易專區', '日本專區', '馬來西亞專區'].map(z => (
                <li key={z} onClick={() => setView('home')} className="p-3 hover:bg-orange-50 cursor-pointer">{z} [cite: 12, 123]</li>
              ))}
            </ul>
          </div>
        </aside>

        <section className="col-span-9">
          {view === 'home' && (
            <div className="space-y-6">
              <img src={IMGS.banner} className="w-full h-48 object-cover rounded shadow" alt="banner" />
              <div className="bg-white border-2 border-orange-200 p-5 rounded-sm">
                <h3 className="text-orange-700 font-bold border-b pb-2 mb-3">【公告】解凍業務 [cite: 197, 203]</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  申請辦理解凍業務需要充值和凍結金額相同的解凍資金附加零頭，系統方可自動識別操作。若不在規定期限內處理，資金將被永久凍結，賣家需要承擔司法刑事責任 [cite: 208, 214, 215]。
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white border p-3">
                  <img src={IMGS.pubg} className="w-full h-32 object-cover mb-2" />
                  <div className="text-sm font-bold">絕地求生限賬號快速賣 [cite: 91]</div>
                  <div className="text-red-600 font-bold">$2,450 TWD [cite: 89]</div>
                </div>
              </div>
            </div>
          )}

          {view === 'withdraw' && (
            <div className="bg-white border p-12 max-w-lg mx-auto shadow-lg text-center">
              <h2 className="text-2xl font-bold mb-6">提現中心 [cite: 130, 189]</h2>
              <div className="bg-gray-50 p-8 rounded mb-6">
                <p className="text-gray-500 text-sm">當前可用餘額</p>
                <p className="text-4xl font-black text-red-600 mt-2">$10,000.52</p>
              </div>
              <button onClick={() => { setShowChat(true); alert('帳戶異常！請聯絡客服 [cite: 216]'); }}
                      className="w-full bg-orange-500 text-white py-4 rounded font-bold hover:bg-orange-600">
                申請辦理解凍提現 [cite: 216]
              </button>
            </div>
          )}
        </section>
      </main>

      {/* 客服聊天視窗 [cite: 83, 132, 191] */}
      {showChat && (
        <div className="fixed bottom-24 right-8 w-80 h-96 bg-white shadow-2xl rounded-t-xl border-2 border-[#00a29a] flex flex-col z-50">
          <div className="bg-[#00a29a] text-white p-3 flex justify-between font-bold">
            <span>在線客服 [cite: 83]</span>
            <button onClick={() => setShowChat(false)}>✕</button>
          </div>
          <div className="flex-1 p-4 bg-gray-50 overflow-y-auto text-xs space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.s === 'u' ? 'justify-end' : 'justify-start'}`}>
                <div className={`p-2 rounded-lg ${m.s === 'u' ? 'bg-[#00a29a] text-white' : 'bg-white border'}`}>{m.t}</div>
              </div>
            ))}
            <div ref={chatRef}></div>
          </div>
          <div className="p-2 border-t flex">
            <input className="flex-1 border rounded-l px-2 py-1 text-xs" value={input} onChange={e => setInput(e.target.value)} onKeyPress={e => e.key === 'Enter' && sendChat()} placeholder="輸入問題..." />
            <button onClick={sendChat} className="bg-[#00a29a] text-white px-3 rounded-r text-xs">發送</button>
          </div>
        </div>
      )}

      {/* 客服按鈕 [cite: 83, 191] */}
      <button onClick={() => setShowChat(!showChat)} className="fixed bottom-8 right-8 bg-[#00a29a] text-white p-4 rounded-full shadow-2xl font-bold">
        在線客服 [cite: 83]
      </button>

      <footer className="bg-white border-t mt-20 py-10 text-[10px] text-gray-400">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-4 gap-4">
          <div>如何出售 | 如何購買 [cite: 98, 218]</div>
          <div>如何充值 | 如何提現 [cite: 99, 219]</div>
          <div>客服中心 | 安全中心 [cite: 100, 220]</div>
          <div className="text-right">© 2026 MOMG實物遊戲商場 [cite: 102, 222]</div>
        </div>
      </footer>
    </div>
  );
}