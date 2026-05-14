import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import SiteNavBar from '../utils/navbar';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const INITIAL_MESSAGES: Message[] = [
  { role: 'assistant', content: "Hi! I'm RyBot. Ask me anything about Ryan Abbott!" },
];

function RybotPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/.netlify/functions/rybot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? `Server error ${response.status}`);
      }

      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong.';
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${message}` }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100">
      <SiteNavBar />

      <div className="bg-slate-950/90 backdrop-blur-sm border-b border-slate-800 px-6 py-4 flex flex-col items-center">
        <span className="text-cyan-400/70 font-mono text-xs tracking-[0.2em] uppercase mb-1">AI Assistant</span>
        <h1 className="text-2xl font-bold tracking-tight">Ask RyBot</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 pt-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xl px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-cyan-500/15 border border-cyan-500/25 text-slate-100'
                  : 'bg-slate-900/70 border border-slate-800 text-slate-200'
              }`}
            >
              {msg.role === 'assistant' ? (
                <ReactMarkdown
                  components={{
                    p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                    em: ({ children }) => <em className="italic">{children}</em>,
                    ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                    li: ({ children }) => <li>{children}</li>,
                    code: ({ children }) => <code className="bg-slate-800 rounded px-1 font-mono text-xs text-cyan-300">{children}</code>,
                    pre: ({ children }) => <pre className="bg-slate-800 rounded p-2 overflow-x-auto mb-2 font-mono text-xs">{children}</pre>,
                    h1: ({ children }) => <h1 className="text-lg font-bold mb-1">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-base font-bold mb-1">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-900/70 border border-slate-800 px-4 py-3 rounded-2xl text-sm">
              <span className="text-cyan-400 animate-pulse">...</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="border-t border-slate-800 px-4 py-4 flex gap-3 items-end">
        <textarea
          className="flex-1 bg-slate-900 border border-slate-800 text-slate-100 rounded-xl px-4 py-3 text-sm resize-none outline-none placeholder-slate-500 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-colors"
          rows={1}
          placeholder="Ask something..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-500/60 disabled:opacity-30 px-5 py-3 rounded-xl text-sm font-medium transition-all"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default RybotPage;
