type FamilyMoviePlayerProps = {
  fileId: string;
  title: string;
};

export default function FamilyMoviePlayer({ fileId, title }: FamilyMoviePlayerProps) {
  const previewUrl = `https://drive.google.com/file/d/${fileId}/preview`;

  return (
    <section
      style={{
        position: 'relative',
        width: '100vw',
        height: '100dvh',
        flexShrink: 0,
        backgroundColor: '#000',
        overflow: 'hidden',
      }}
    >
      <iframe
        src={previewUrl}
        title={title}
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
        loading="eager"
        style={{
          display: 'block',
          width: '100%',
          height: 'calc(100% + 72px)',
          marginBottom: '-72px',
          border: 0,
        }}
      />
    </section>
  );
}
