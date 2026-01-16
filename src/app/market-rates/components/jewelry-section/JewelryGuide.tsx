const JewelryGuide = () => {
  const purityGuide = [
    { purity: 24, description: "طلای خالص (99.9٪)", color: "#FFD700" },
    { purity: 22, description: "طلای 91.6٪", color: "#E6BE8A" },
    { purity: 18, description: "طلای 75٪", color: "#DAA520" },
    { purity: 14, description: "طلای 58.3٪", color: "#B8860B" },
    { purity: 10, description: "طلای 41.7٪", color: "#8B7500" },
  ];

  return (
    <div className="mt-8 p-5 bg-surface border border-border rounded-2xl animate-slide-up">
      
      {/* Title */}
      <h3 className="text-lg font-bold mb-4 text-primary-700">
        راهنمای عیارهای طلا
      </h3>

      {/* Guide */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {purityGuide.map((item) => (
          <div
            key={item.purity}
            className="flex items-center gap-3 text-sm text-text-primary"
          >
            <div
              className="w-3.5 h-3.5 rounded-full border border-primary-300"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-text-secondary">
              عیار {item.purity}: {item.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JewelryGuide;
