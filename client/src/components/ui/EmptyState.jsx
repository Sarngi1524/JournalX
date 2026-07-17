import { FaRegSadCry } from "react-icons/fa";

function EmptyState({ message }) {
  return (
    <div className="text-center py-20">

      <FaRegSadCry
        className="mx-auto text-6xl text-pink-300"
      />

      <h2 className="text-2xl mt-6">

        {message}

      </h2>

    </div>
  );
}

export default EmptyState;