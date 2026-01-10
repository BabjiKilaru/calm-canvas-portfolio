const circleColor = 'rgba(148, 163, 184, 0.22)'; // soft slate

const PortraitAccent = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      {/* Soft arch / capsule */}
      <div
        className="absolute inset-x-12 md:inset-x-14 lg:inset-x-16"
        style={{
          top: '38%',
          bottom: '0%',
          borderRadius: '9999px',
          background: circleColor,
          filter: 'blur(0.5px)',
        }}
        aria-hidden
      />
    </div>
  );
};

export default PortraitAccent;
