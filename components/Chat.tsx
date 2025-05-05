'use client';

import { useState } from 'react';
import { searchExa } from '../lib/exaClient';
import { chatWithOpenRouter } from '../lib/openAiClient';

type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]); // Use the correct type for messages
  const [results, setResults] = useState<any[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async () => {
    const newMessages: ChatMessage[] = [
      ...messages,
      { role: 'user', content: input },
    ];

    try {
      // Call the OpenAI API only once
      const reply = await chatWithOpenRouter(newMessages);
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
      setInput('');
    } catch (err) {
      console.error('OpenAI error:', err);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await searchExa(input);
      setResults(res);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto p-4">
      <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask a question..."
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Chat
        </button>
        <button
          type="button"
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      <div className="space-y-2">
        {messages.map((m, i) => (
          <div key={i} className="p-2 bg-gray-100 rounded">
            <strong>{m.role === 'user' ? 'You' : 'AI'}:</strong> {m.content}
          </div>
        ))}
      </div>

      <div className="space-y-4 mt-6">
        {results.map((item: any, idx: number) => (
          <div key={idx} className="p-4 bg-white rounded shadow">
            <a href={item.url} target="_blank" rel="noreferrer" className="text-blue-600 font-semibold">{item.title}</a>
            <p className="text-sm text-gray-700">{item.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
}