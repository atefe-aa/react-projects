export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Add items to your packing list 🚀</em>
      </p>
    );

  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((packedItems / numItems) * 100);

  return (
    <footer className="stats">
      {percentage === 100 ? (
        <em>All is ready to go ✈</em>
      ) : (
        <em>
          💼 You have {numItems} items in your list, And you already packed{" "}
          {packedItems} ({percentage}%)
        </em>
      )}
    </footer>
  );
}
