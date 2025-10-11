const TrailerButton = ({ trailer }) => {
  if (!trailer) return null;

  return (
    <a
      href={`https://www.youtube.com/watch?v=${trailer.key}`}
      target="_blank"
      rel="noreferrer"
      className="inline-block mt-6 bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-400"
    >
      ▶ Watch Trailer
    </a>
  );
};

export default TrailerButton;
