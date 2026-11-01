import FamilyMoviePlayer from './FamilyMoviePlayer';

const familyMovieUrl = (process.env.FAMILY_MOVIE_URL ?? '').trim();

export default function FamilyMoviePage() {
  if (!familyMovieUrl) {
    return (
      <main
        style={{
          minHeight: '100dvh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: '#000',
          color: '#fff',
        }}
      >
        <div>
          <p>The family movie link is not configured for this build.</p>
        </div>
      </main>
    );
  }

  return <FamilyMoviePlayer url={familyMovieUrl} />;
}
