function Badge({ children }) {
  return (
    <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
      {children}
    </span>
  );
}

export default Badge;