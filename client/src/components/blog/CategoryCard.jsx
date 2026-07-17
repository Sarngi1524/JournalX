function CategoryCard({ title }) {
  return (
    <button className="px-6 py-3 bg-pink-100 hover:bg-pink-300 rounded-full transition">
      {title}
    </button>
  );
}

export default CategoryCard;