import FamilyMoviePlayer from './FamilyMoviePlayer';

const driveFileIds = (process.env.FAMILY_MOVIE_DRIVE_FILE_ID ?? '')
  .split(',')
  .map((id) => id.trim())
  .filter(Boolean);

export default function FamilyMoviePage() {
  if (driveFileIds.length === 0) {
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
          <p>FAMILY_MOVIE_DRIVE_FILE_ID is not configured.</p>
          <p>Add a Google Drive file ID to .env.local and restart the dev server.</p>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        margin: 0,
        padding: 0,
        width: '100vw',
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#000',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      {driveFileIds.map((fileId, index) => (
        <FamilyMoviePlayer
          key={fileId}
          fileId={fileId}
          title={driveFileIds.length > 1 ? `Family Movie ${index + 1}` : 'Family Movie'}
        />
      ))}
    </main>
  );
}
