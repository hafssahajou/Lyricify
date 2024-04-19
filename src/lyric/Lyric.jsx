export default function Lyric() {
    return (
        <div className="bg-zinc-900 text-white min-h-screen flex flex-col items-center justify-center">
            <div className="max-w-md mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-4">Song Title</h1>
                <img src="https://placehold.co/400" alt="Song Cover" className="rounded-lg mb-4"/>
                    <p className="text-center">Artist Name</p>
                    <p className="text-center text-sm mb-4">Genre</p>
                    <div className="mb-4">
                        <p className="text-center">Song Lyrics go here...</p>
                    </div>
                    <p className="text-center text-sm">Released Year</p>
            </div>
        </div>
)
}