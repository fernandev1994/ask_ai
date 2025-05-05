import Chat from '../components/Chat';
import '../styles/globals.css'

export default function Home() {
  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Poppy AI Search</h1>
      <Chat />
    </main>
  );
}
