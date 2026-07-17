function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}) {
  return (
    <div className="space-y-2">

      {label && (
        <label className="font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-4 rounded-2xl border border-pink-100 bg-white focus:outline-none focus:ring-2 focus:ring-pink-300"
      />

    </div>
  );
}

export default Input;