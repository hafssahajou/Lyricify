import { useEffect, useState } from 'react';
import { getLyrics, search } from './api/service';
import { truncate } from './utils/truncate';

export default function App() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([])

    const query = async (query = 'animals') => {
        let response = await search(query)
        response = await Promise.all(
            response.map(async (track) => {
                const lyrics = await fetchLyrics(track.track.track_id)
                return {...track, lyrics}
            })
        )
        console.log(response)
        setResults(response)
    }

    const fetchLyrics = async (id = '77475678') => {
        const response = await getLyrics(id)
        return response
    }

    // console.log(fetchLyrics().then((res) => res))

    useEffect(() => {
        query()
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        query(searchTerm)
    }

    return (
        <div className="bg-zinc-900 text-white min-h-screen">
            <header className="bg-zinc-800 p-4 flex justify-between items-center">
                <div className="flex items-center">
                    <img src="https://placehold.co/50x50" alt="Logo" className="mr-2"/>
                    <h1 className="text-lg font-bold">Song Lyrics Search</h1>
                </div>
                <nav>
                    <a href="#" className="mr-4">Home</a>
                    <a href="#" className="mr-4">About</a>
                    <a href="#" className="mr-4">Contact</a>
                </nav>
            </header>

            <form onSubmit={handleSearch} className="flex justify-center items-center mt-8">
                <input
                    type="text"
                    placeholder="Search for songs..."
                    className="bg-zinc-700 text-white px-4 py-2 rounded-lg w-1/4 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    className="bg-purple-950 hover:bg-purple-400 text-white px-4 py-2 ml-2 rounded-lg"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </form>

            <div className="container mx-auto mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {results.length > 0 ? (
                        results.map((track, index) => (
                            <div key={index} className="bg-zinc-800 p-4 rounded-lg">
                                <h2 className="text-lg font-bold">{track.track.track_name}</h2>
                                <p className="text-sm text-zinc-400">{track.track.artist_name}</p>
                                <p className="mt-2">{truncate(track.lyrics)}</p>
                            </div>
                        ))
                    ) : (
                        <h1>No data found.</h1>
                    )}
                </div>
            </div>

            <div id="detailsPage" className="hidden">
                <div className="container mx-auto mt-8">
                    <h2 className="text-2xl font-bold">Song Title</h2>
                    <p className="text-lg text-zinc-400">Artist Name</p>
                    <p className="mt-4">Full Lyrics...</p>
                    <p className="mt-4">Artist Details, Album Info, Listen Link...</p>
                </div>
            </div>

            <footer className="bg-zinc-800 p-4 mt-8 text-center fixed bottom-0 w-full ">
                <div>
                    <a href="#" className="text-zinc-400 hover:text-white mr-4">Legal</a>
                    <a href="#" className="text-zinc-400 hover:text-white mr-4">Help</a>
                    <a href="#" className="text-zinc-400 hover:text-white">Social Media Icons</a>
                </div>
            </footer>
        </div>
    );
}
