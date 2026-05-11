import { useState, useRef, useEffect, KeyboardEvent } from 'react';

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

  function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "I'm RyBot! API integration coming soon." },
      ]);
      setLoading(false);
    }, 800);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div className="flex flex-col h-screen bg-indigo-900 text-white">
      <div className="text-center py-5 text-2xl font-semibold tracking-wide border-b border-indigo-700">
        Ask RyBot About Me
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xl px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-700'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 px-4 py-3 rounded-2xl text-sm">
              <span className="animate-pulse">...</span>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="border-t border-indigo-700 px-4 py-4 flex gap-3 items-end">
        <textarea
          className="flex-1 bg-indigo-800 text-white rounded-xl px-4 py-3 text-sm resize-none outline-none placeholder-indigo-400"
          rows={1}
          placeholder="Ask something..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-3 rounded-xl text-sm font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default RybotPage;
